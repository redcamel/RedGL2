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
				 title :`RedSystemShaderCode.vShareSource`,
				 description : `
					 버텍스 쉐이더 기본 생성코드 리스트
				 `,
				 return : 'Array'
			 }
			 :DOC*/
			vShareSource: [
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


				'uniform bool uUseSkin',
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
				 title :`RedSystemShaderCode.fShareSource`,
				 description : `
					 프레그먼트 쉐이더 기본 생성코드 리스트
				 `,
				 return : 'Array'
			 }
			 :DOC*/
			fShareSource: [
				'varying vec3 vVertexNormal',
				'varying vec2 vTexcoord',
				'varying vec2 vTexcoord1',
				'varying float vTime',
				'varying vec2 vResolution',
				//
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
			systemUniform: {}
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
		[RedSystemShaderCode.vShareSource, RedSystemShaderCode.fShareSource].forEach(function (data) {
			data.forEach(function (v) {
				v = v.split(' ')
				if ( v[0] == 'uniform' ) {
					RedSystemShaderCode.systemUniform[v[2]] = 1
				}
			})
		});
		console.log(RedSystemShaderCode)
		Object.freeze(RedSystemShaderCode)
	};
})();