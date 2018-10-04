"use strict";
var RedSystemShaderCode;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedSystemShaderCode`,
		 description : `
			 쉐이더 기본 정의 코드.
		 `,
		 return : 'RedSystemShaderCode'
	 }
     :DOC*/
    RedSystemShaderCode = {};
    RedSystemShaderCode['init'] = function () {
        var maxDirectionalLight = 3;
        var maxPointLight = 5;
        RedSystemShaderCode = {
            /**DOC:
             {
				 code: 'CONST',
				 title :`RedSystemShaderCode.vertexShareDeclare`,
				 description : `
					 버텍스 쉐이더 기본 생성코드 리스트
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
                'attribute vec4 aVertexTangent',
                'varying vec4 vVertexPosition',
                'varying vec3 vVertexNormal',
                'varying vec4 vVertexTangent',
                'attribute float aPointSize',
                'uniform float uPointSize',
                'attribute vec2 aTexcoord',
                'attribute vec2 aTexcoord1',
                'varying vec2 vTexcoord',
                'varying vec2 vTexcoord1',


                'uniform mat4 uJointMatrix[64]',
                'uniform mat4 uInverseBindMatrixForJoint[64]',
                'uniform mat4 uGlobalTransformOfNodeThatTheMeshIsAttachedTo',


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
                // shadow
                'uniform mat4 uDirectionalShadowLightMatrix',
                'varying highp vec4 vShadowPos',
                'const mat4 cTexUnitConverter = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0)'
            ],
            /**DOC:
             {
				 code: 'CONST',
				 title :`RedSystemShaderCode.fragmentShareDeclare`,
				 description : `
					 프레그먼트 쉐이더 기본 생성코드 리스트
				 `,
				 return : 'Array'
			 }
             :DOC*/
            fragmentShareDeclare: [
                'varying vec4 vVertexPosition',
                'varying vec3 vVertexNormal',
                'varying vec4 vVertexTangent',
                'varying vec2 vTexcoord',
                'varying vec2 vTexcoord1',
                'varying float vTime',
                'varying vec2 vResolution',
                'uniform vec3 uCameraPosition',

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
            systemUniform: {},
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
            fragmentShareFunc: {
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
                        '             specular = pow( max(dot( reflect(L, N), -L), 0.0), shininess) * specularPower * specularTextureValue;',
                        '             ls +=  specularLightColor * specular * uPointLightIntensityList[i]  * uPointLightColorList[i].a ;',
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
                        '   fragmentDepth.z -= 0.03; // cShadowAcneRemover',
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
                getPerturbNormal2Arb:
                    [
                        'vec3 getPerturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec4 normalColor , vec2 vUv) {',
                        '   vec3 q0 = dFdx( eye_pos.xyz );',
                        '   vec3 q1 = dFdy( eye_pos.xyz );',
                        '   vec2 st0 = dFdx( vUv.st );',
                        '   vec2 st1 = dFdy( vUv.st );',

                        '   vec3 S = normalize(  q0 * st1.t - q1 * st0.t );',
                        '   vec3 T = normalize( -q0 * st1.s + q1 * st0.s );',
                        '   vec3 N = normalize( surf_norm );',

                        '   vec3 nmap = normalColor.xyz;',
                        '   // nmap.y = 1.0 - nmap.y;',
                        '   vec3 mapN = nmap * 2.0 - 1.0;',
                        '   mapN.xy = u_normalPower * mapN.xy;',
                        '   mat3 tsn = mat3( S, T, N );',
                        '   return normalize( tsn * mapN );',
                        '}'
                    ].join('\n')
            }
        };
        /**DOC:
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
        /**DOC:
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
        [RedSystemShaderCode.vertexShareDeclare, RedSystemShaderCode.fragmentShareDeclare].forEach(function (data) {
            data.forEach(function (v) {
                v = v.split(' ')
                if (v[0] == 'uniform') {
                    RedSystemShaderCode.systemUniform[v[2]] = 1
                }
            })
        });
        console.log(RedSystemShaderCode)
        Object.freeze(RedSystemShaderCode)
    };
})
();