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
                'varying vec3 vVertexNormal',
                'attribute float aPointSize',
                'uniform float uPointSize',
                'attribute vec2 aTexcoord',
                'attribute vec2 aTexcoord1',
                'varying vec2 vTexcoord',
                'varying vec2 vTexcoord1',


                'uniform mat4 uJointMatrix[100]',
                'uniform mat4 uInverseBindMatrixForJoint[100]',
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
                'varying vec3 vVertexNormal',
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
                        '   fragmentDepth.z -= 0.0007; // cShadowAcneRemover',
                        '   float amountInLight = 0.0;',
                        '   for (int x = -1; x <= 1; x++) {',
                        '       for (int y = -1; y <= 1; y++) {',
                        '           vec2 tUV = fragmentDepth.xy + vec2( float(x)/resolution.x, float(y)/resolution.y );',
                        '           if(tUV.x<0.0) continue;',
                        '           if(tUV.x>1.0) continue;',
                        '           if(tUV.y<0.0) continue;',
                        '           if(tUV.y>1.0) continue;',
                        '           float texelDepth = decodeFloatShadow( texture2D(directionalShadowTexture, tUV) );',
                        '           if (fragmentDepth.z < texelDepth ) amountInLight += 0.5;',
                        '      }',
                        '   }',
                        '   amountInLight /= 9.0;',
                        '   return 1.0 - amountInLight;',
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