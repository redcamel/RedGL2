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
			'varying vec3 vVertexNormal',
			'attribute float aPointSize',
			'uniform float uPointSize',
			'attribute vec2 aTexcoord',
			'varying vec2 vTexcoord',
			'uniform vec4 uAtlascoord',
			'uniform float uTime',
			'varying float vTime',
			'uniform vec2 uResolution',
			'varying vec2 vResolution',
			'uniform mat4 uMMatrix',
			'uniform mat4 uNMatrix',
			'uniform mat4 uPMatrix',
			'uniform mat4 uCameraMatrix',
			'uniform bool uSprite3DYn', // sprite3d인지 아닌지
			'uniform bool uPerspectiveScale'
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
			'varying float vTime',
			'varying vec2 vResolution',
			// fog
			'uniform bool uUseFog',
			'uniform float uFogDistance',
			'uniform float uFogDensity',
			'uniform vec4 uFogColor',
			// 디렉셔널
			'const int cDIRETIONAL_MAX = 3',
			'uniform vec3 uDirectionalLightPosition[3]',
			'uniform vec4 uDirectionalLightColor[3]',
			'uniform float uDirectionalLightIntensity[3]',
			'uniform int uDirectionalLightNum',
			//포인트라이트
			'const int cPOINT_MAX = 5',
			'uniform vec3 uPointLightPosition[5]',
			'uniform vec4 uPointLightColor[5]',
			'uniform float uPointLightRadius[5]',
			'uniform float uPointLightIntensity[5]',
			'uniform int uPointLightNum',
			// 암비안트
			'uniform vec4 uAmbientLightColor',
			'uniform float uAmbientIntensity',
		],
		systemUniform: {}
	};
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
})();