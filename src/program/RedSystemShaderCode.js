/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.7.10 15:43:31
 *
 */

"use strict";
var RedSystemShaderCode;
(function () {
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedSystemShaderCode`,
		 description : `
			 쉐이더 기본 정의 코드.
			 RedGL이 Instance 화 되면 RedSystemShaderCode.init 가 자동으로 실행되며 RedSystemShaderCode 를 실질적으로 구성한다.
		 `,
		 return : 'RedSystemShaderCode'
	 }
	 :DOC*/
	RedSystemShaderCode = {};
	RedSystemShaderCode['init'] = function (redGL) {
		var maxDirectionalLight = 3;
		var maxPointLight;
		var maxJoint;
		var tDETECT = redGL.detect;
		console.time('RedSystemShaderCode');
		console.group('RedSystemShaderCode');
		maxJoint = parseInt(Math.floor(Math.min((tDETECT.vertexShader.MAX_VERTEX_UNIFORM_VECTORS - 64) / 8, 128)));
		maxPointLight = parseInt(Math.floor(Math.min((tDETECT.fragmentShader.MAX_FRAGMENT_UNIFORM_VECTORS - 64) / 4, 128)));
		console.group('detect info');
		console.log(tDETECT);
		console.log('maxDirectionalLight', maxDirectionalLight);
		console.log('maxJoint', maxJoint);
		console.log('maxPointLight', maxPointLight);
		console.groupEnd();
		// if (RedGLDetect.BROWSER_INFO.browser == 'ie' && RedGLDetect.BROWSER_INFO.browserVer == 11) maxJoint = 50
		// else if (RedGLDetect.BROWSER_INFO.browser == 'iphone' || RedGLDetect.BROWSER_INFO.browser == 'ipad') maxJoint = 8
		// else maxJoint = RedGLDetect.BROWSER_INFO.isMobile ? 64 : 1024
		RedSystemShaderCode = {
			/*DOC:
			 {
				 code: 'CONST',
				 title :`RedSystemShaderCode.vertexShareDeclare`,
				 description : `
					 버텍스 쉐이더 공용 정의 리스트
				 `,
				 return : 'Array'
			 }
			 :DOC*/
			vertexShareDeclare: [
				'attribute vec3 aVertexPosition',
				'attribute vec3 aVertexNormal',
				'attribute vec4 aVertexColor',
				'attribute vec4 aVertexWeight',
				'attribute vec4 aVertexJoint',

				'varying vec4 vVertexPosition',
				'varying vec3 vVertexNormal',

				'varying vec4 vVertexColor',
				'attribute float aPointSize',
				'uniform float uPointSize',
				'attribute vec2 aTexcoord',
				'attribute vec2 aTexcoord1',
				'varying vec2 vTexcoord',
				'varying vec2 vTexcoord1',

				'uniform bool uMode2DYn',

				// 'uniform vec4 uAtlascoord',
				'uniform float uTime',
				'varying float vTime',
				'uniform vec2 uResolution',
				'varying vec2 vResolution',
				'uniform mat4 uMMatrix',
				'uniform mat4 uNMatrix',
				'uniform mat4 uPMatrix',
				'uniform mat4 uCameraMatrix',
				'uniform bool u_PerspectiveScale',
				'uniform float uOutlineThickness',

				// shadow
				'uniform mat4 uDirectionalShadowLightMatrix',
				'varying highp vec4 vShadowPos',
				'const mat4 cTexUnitConverter = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0)',

				'uniform mat4 uJointMatrix[' + maxJoint + ']',
				'uniform mat4 uInverseBindMatrixForJoint[' + maxJoint + ']',
				'uniform mat4 uGlobalTransformOfNodeThatTheMeshIsAttachedTo'
			],
			/*DOC:
			 {
				 code: 'CONST',
				 title :`RedSystemShaderCode.fragmentShareDeclare`,
				 description : `
					 프레그먼트 쉐이더 공용 정의 리스트
				 `,
				 return : 'Array'
			 }
			 :DOC*/
			fragmentShareDeclare: [
				'varying vec4 vVertexPosition',
				'varying vec3 vVertexNormal',

				'varying vec4 vVertexColor',
				'varying vec2 vTexcoord',
				'varying vec2 vTexcoord1',
				'varying float vTime',
				'varying vec2 vResolution',
				'uniform vec3 uCameraPosition',

				'uniform vec4 uOutlineColor',

				// fog
				'uniform float u_FogDistance',
				'uniform float u_FogDensity',
				'uniform vec4 uFogColor',
				// 디렉셔널
				'const int cDIRETIONAL_MAX = ' + maxDirectionalLight,
				'uniform vec3 uDirectionalLightPositionList[' + maxDirectionalLight + ']',
				'uniform vec4 uDirectionalLightColorList[' + maxDirectionalLight + ']',
				'uniform float uDirectionalLightIntensityList[' + maxDirectionalLight + ']',
				'uniform int uDirectionalLightNum',
				//포인트라이트
				'const int cPOINT_MAX = ' + maxPointLight,
				'uniform vec3 uPointLightPositionList[' + maxPointLight + ']',
				'uniform vec4 uPointLightColorList[' + maxPointLight + ']',
				'uniform float uPointLightRadiusList[' + maxPointLight + ']',
				'uniform float uPointLightIntensityList[' + maxPointLight + ']',
				'uniform int uPointLightNum',
				// 암비안트
				'uniform vec4 uAmbientLightColor',
				'uniform float uAmbientIntensity',
				// shadow
				'uniform sampler2D uDirectionalShadowTexture',
				'varying highp vec4 vShadowPos'
			],
			/*DOC:
			 {
				 code: 'CONST',
				 title :`RedSystemShaderCode.systemUniform`,
				 description : `
					 시스템 유니폼 정보
				 `,
				 return : 'Object'
			 }
			 :DOC*/
			systemUniform: {},
			/*DOC:
			 {
				 code: 'CONST',
				 title :`RedSystemShaderCode.vertexShareFunc`,
				 description : `
					 버텍스 쉐이더 공용 함수 리스트
				 `,
				 return : 'Object'
			 }
			 :DOC*/
			vertexShareFunc: {
				getSkinMatrix:
					[
						'//#REDGL_DEFINE#skin#true#  mat4 getSkinMatrix(){',
						'//#REDGL_DEFINE#skin#true#      mat4 skinMat =',
						'//#REDGL_DEFINE#skin#true#      aVertexWeight.x * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.x) ] * uInverseBindMatrixForJoint[int(aVertexJoint.x)]+',
						'//#REDGL_DEFINE#skin#true#      aVertexWeight.y * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.y) ] * uInverseBindMatrixForJoint[int(aVertexJoint.y)]+',
						'//#REDGL_DEFINE#skin#true#      aVertexWeight.z * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.z) ] * uInverseBindMatrixForJoint[int(aVertexJoint.z)]+',
						'//#REDGL_DEFINE#skin#true#      aVertexWeight.w * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.w) ] * uInverseBindMatrixForJoint[int(aVertexJoint.w)];',
						'//#REDGL_DEFINE#skin#true#      return skinMat;',
						'//#REDGL_DEFINE#skin#true#  }'
					].join('\n'),
				getSprite3DMatrix:
					[
						'mat4 getSprite3DMatrix(mat4 cameraMTX, mat4 mvMatrix){',
						'   mat4 cacheScale = mat4(',
						'      mvMatrix[0][0], 0.0, 0.0, 0.0,',
						'       0.0, mvMatrix[1][1], 0.0, 0.0,',
						'      0.0, 0.0, 1.0, mvMatrix[2][2],',
						'      0.0, 0.0, 0.0, 1.0',
						'   );',
						'   mat4 tMTX = cameraMTX * mvMatrix;',
						'   tMTX[0][0] = 1.0, tMTX[0][1] = 0.0, tMTX[0][2] = 0.0,',
						'   tMTX[1][0] = 0.0, tMTX[1][1] = 1.0, tMTX[1][2] = 0.0,',
						'   tMTX[2][0] = 0.0, tMTX[2][1] = 0.0, tMTX[2][2] = 1.0;',
						'   return tMTX * cacheScale;',
						'}'
					].join('\n')

			},
			/*DOC:
			 {
				 code: 'CONST',
				 title :`RedSystemShaderCode.vertexShareFunc`,
				 description : `
					 프레그먼트 쉐이더 공용 함수 리스트
				 `,
				 return : 'Object'
			 }
			 :DOC*/
			fragmentShareFunc: {
				getFlatNormal: [
					'vec3 getFlatNormal(vec3 vertexPosition){',
					'   vec3 dx = dFdx(vVertexPosition.xyz);',
					'   vec3 dy = dFdy(vVertexPosition.xyz);',
					'   return normalize(cross(normalize(dx), normalize(dy)));',
					'}'
				].join('\n'),
				getDirectionalLightColor:
					[
						'vec4 getDirectionalLightColor(' +
						'      vec4 texelColor,' +
						'      vec3 N,' +
						'      float shininess,' +
						'      vec4 specularLightColor,' +
						'      float specularTextureValue,' +
						'      float specularPower' +
						') {',
						'   vec3 L;',
						'   float specular;',
						'   float lambertTerm;',
						'   vec4 ld = vec4(0.0, 0.0, 0.0, 1.0);',
						'   vec4 ls = vec4(0.0, 0.0, 0.0, 1.0);',
						'   for(int i=0; i<cDIRETIONAL_MAX; i++){',
						'      if(i == uDirectionalLightNum) break;',
						'      L = normalize(-uDirectionalLightPositionList[i]);',
						'      lambertTerm = dot(N,-L);',
						'      if(lambertTerm > 0.0){',
						'         ld += uDirectionalLightColorList[i] * texelColor * lambertTerm * uDirectionalLightIntensityList[i];',
						'         specular = pow( max(dot(reflect(L, N), -L), 0.0), shininess) * specularPower * specularTextureValue;',
						'         ls +=  specularLightColor * specular * uDirectionalLightIntensityList[i] * uDirectionalLightColorList[i].a;',
						'      }',
						'   }',
						'   return ld + ls;',
						'}'
					].join('\n'),
				getPointLightColor:
					[
						'vec4 getPointLightColor(' +
						'      vec4 texelColor,' +
						'      vec3 N,' +
						'      float shininess,' +
						'      vec4 specularLightColor,' +
						'      float specularTextureValue,' +
						'      float specularPower' +
						') {',
						'   vec3 L;',
						'   float specular;',
						'   float lambertTerm;',
						'   vec4 ld = vec4(0.0, 0.0, 0.0, 1.0);',
						'   vec4 ls = vec4(0.0, 0.0, 0.0, 1.0);',
						'   float distanceLength;',
						'   float attenuation;',
						'   for(int i=0;i<cPOINT_MAX;i++){',
						'      if(i== uPointLightNum) break;',
						'      L =  -uPointLightPositionList[i] + vVertexPosition.xyz;',
						'      distanceLength = abs(length(L));',
						'      if(uPointLightRadiusList[i]> distanceLength){',
						'          attenuation = 1.0 / (0.01 + 0.02 * distanceLength + 0.03 * distanceLength * distanceLength) * 0.5;',
						'          L = normalize(L);',
						'          lambertTerm = dot(N,-L);',
						'          if(lambertTerm > 0.0){',
						'             ld += uPointLightColorList[i] * texelColor * lambertTerm * attenuation * uPointLightIntensityList[i] ;',
						'             specular = pow( max(dot( reflect(L, N), -N), 0.0), shininess) * specularPower * specularTextureValue;',
						'             ls +=  specularLightColor * specular  * uPointLightIntensityList[i]  * uPointLightColorList[i].a ;',
						'          }',
						'      }',
						'   }',
						'   return ld + ls;',
						'}'
					].join('\n'),
				fogFactor:
					[
						'float fogFactor(float perspectiveFar, float density){',
						'   float flog_cord = gl_FragCoord.z / gl_FragCoord.w / perspectiveFar;',
						'   float fog = flog_cord * density;',
						'   if(1.0 - fog < 0.0) discard;',
						'   return clamp(1.0 - fog, 0.0,  1.0);',
						'}'
					].join('\n'),
				fog:
					[
						'vec4 fog(float fogFactor, vec4 fogColor, vec4 currentColor) {',
						'   return mix(fogColor, currentColor, fogFactor);',
						'}'
					].join('\n'),
				decodeFloatShadow:
					[
						'float decodeFloatShadow (vec4 color) {',
						'   const vec4 cBitShift = vec4(',
						'       1.0 / (256.0 * 256.0 * 256.0),',
						'       1.0 / (256.0 * 256.0),',
						'       1.0 / 256.0,',
						'       1.0',
						'   );',
						'   return dot(color, cBitShift);',
						'}'
					].join('\n'),
				getShadowColor:
					[
						'float getShadowColor ( vec4 shadowPos, vec2 resolution, sampler2D directionalShadowTexture ) {',
						'   vec3 fragmentDepth = shadowPos.xyz;',
						'   fragmentDepth.z -= 0.007; // cShadowAcneRemover',
						'   float amountInLight = 0.0;',
						'   for (int x = -1; x <= 1; x++) {',
						'       for (int y = -1; y <= 1; y++) {',
						'           vec2 tUV = fragmentDepth.xy + vec2( float(x)/resolution.x, float(y)/resolution.y );',
						'           if(tUV.x<0.0) return 1.0;',
						'           if(tUV.x>1.0) return 1.0;',
						'           if(tUV.y<0.0) return 1.0;',
						'           if(tUV.y>1.0) return 1.0;',
						'           float texelDepth = decodeFloatShadow( texture2D(directionalShadowTexture, tUV) );',
						'           if (fragmentDepth.z < texelDepth ) amountInLight += 1.0;',
						'      }',
						'   }',
						'   amountInLight /= 9.0;',
						'   amountInLight =  amountInLight;',
						'   return amountInLight;',
						'}'
					].join('\n'),
				cotangent_frame: [
					'mat3 cotangent_frame(vec3 N, vec3 p, vec2 uv)',
					'{',
					'   vec3 dp1 = dFdx( p );',
					'   vec3 dp2 = dFdy( p );',
					'   vec2 duv1 = dFdx( uv );',
					'   vec2 duv2 = dFdy( uv );',
					'   ',
					'   vec3 dp2perp = cross( dp2, N );',
					'   vec3 dp1perp = cross( N, dp1 );',
					'   vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;',
					'   vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;',
					'   ',
					'   float invmax = inversesqrt( max( dot(T,T), dot(B,B) ) );',
					'   return mat3( T * invmax, B * invmax, N );',
					'}'
				].join('\n'),
				perturb_normal: [
					'vec3 perturb_normal( vec3 N, vec3 V, vec2 texcoord, vec3 normalColor )',
					'   {',
					'   ',
					'   vec3 map = normalColor;',
					'   map =  map * 255./127. - 128./127.;',
					'   map.xy *= u_normalPower;',
					'   mat3 TBN = cotangent_frame(N, V, texcoord);',
					'   return normalize(TBN * map);',
					'}'
				].join('\n')
			}
		};
		/*DOC:
		 {
			 code: 'CONST',
			 title :`RedSystemShaderCode.MAX_DIRECTIONAL_LIGHT`,
			 description : `
				 최대 허용 직사광 갯수
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		RedSystemShaderCode['MAX_DIRECTIONAL_LIGHT'] = maxDirectionalLight;
		/*DOC:
		 {
			 code: 'CONST',
			 title :`RedSystemShaderCode.MAX_POINT_LIGHT`,
			 description : `
				 최대 허용 점광 갯수
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		RedSystemShaderCode['MAX_POINT_LIGHT'] = maxPointLight;
		RedSystemShaderCode['MAX_JOINT'] = maxJoint;
		[RedSystemShaderCode.vertexShareDeclare, RedSystemShaderCode.fragmentShareDeclare].forEach(function (data) {
			data.forEach(function (v) {
				v = v.split(' ');
				if (v[0] === 'uniform') {
					RedSystemShaderCode.systemUniform[v[2]] = 1
				}
			})
		});

		// 맥스갯수를 찾아보자..
		var tVertexUniform = [];
		var tVertexVecNum = 0;
		var tFragmentUniform = [];
		var tFragmentVecNum = 0;
		var testMap = {
			bool: 4, float: 4, int: 4, uint: 4,
			sampler2D: 4, samplerCube: 4,
			vec2: 4, vec3: 4, vec4: 4,
			mat2: 4, mat3: 8, mat4: 16
		};
		console.group('RedSystemShaderCode.vertexShareDeclare');
		console.table(RedSystemShaderCode.vertexShareDeclare);
		RedSystemShaderCode.vertexShareDeclare.forEach(function (v) {
			v = v.split(' ');
			if (v[0] === 'uniform') {
				var tNum;
				var tInfo;
				tInfo = {
					value: v,
					type: v[1],
					num: tNum = v[2].indexOf('[') > -1 ? +(v[2].split('[')[1].replace(']', '')) * testMap[v[1]] : testMap[v[1]]
				};
				tVertexUniform.push(tInfo);
				tVertexVecNum += tNum
			}
		});
		console.log('target vertexUniform');
		console.table(tVertexUniform);
		console.log('target vertexVecNum', tVertexVecNum / 4);
		console.groupEnd('RedSystemShaderCode.vertexShareDeclare');


		console.group('RedSystemShaderCode.fragmentShareDeclare');
		console.table(RedSystemShaderCode.fragmentShareDeclare);
		tFragmentUniform = [];
		tFragmentVecNum = 0;
		RedSystemShaderCode.fragmentShareDeclare.forEach(function (v) {
			v = v.split(' ');
			if (v[0] === 'uniform') {
				var tNum;
				var tInfo;
				tInfo = {
					value: v,
					type: v[1],
					num: tNum = v[2].indexOf('[') > -1 ? +(v[2].split('[')[1].replace(']', '')) * testMap[v[1]] : testMap[v[1]]
				};
				tFragmentUniform.push(tInfo);
				tFragmentVecNum += tNum
			}
		});
		console.log('target fragmentUniform');
		console.table(tFragmentUniform);
		console.log('target fragmentVecNum', tFragmentVecNum / 4);
		console.groupEnd('RedSystemShaderCode.fragmentShareDeclare');
		console.log(RedSystemShaderCode);
		console.timeEnd('RedSystemShaderCode');
		console.groupEnd('RedSystemShaderCode');
		Object.freeze(RedSystemShaderCode)
	};
})();