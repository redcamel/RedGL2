/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.2 18:16:21
 *
 */
"use strict";
var RedBaseFilter;
(function () {
	var tPrototype;
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedBaseFilter`,
		 description : `
			 메쉬 필터 정의 사용되는 기저층
		 `,
		 extends:['RedBaseMaterial'],
		 return : 'RedBaseFilter Instance'
	 }
	 :DOC*/
	RedBaseFilter = function () {};
	tPrototype = RedBaseFilter.prototype = new RedBaseMaterial();
	tPrototype['bind'] = RedFilterEffectManager.prototype['bind'];
	tPrototype['unbind'] = RedFilterEffectManager.prototype['unbind'];
	/*DOC:
	 {
		title :`updateTexture`,
		code : 'METHOD',
		description : `
			메쉬 필터 정의시 반드시 재정의 되어야함.
			메쉬 필터 내부에서 사용되는 텍스쳐를 업데이트함.
		`,
		return : 'void'
	}
	 :DOC*/
	tPrototype['updateTexture'] = function () {
		RedGLUtil.throwFunc('RedBaseFilter - updateTexture : 반드시 재정의해야함')
	};
	/*DOC:
	 {
		title :`_process`,
		code : 'PROPERTY',
		description : `
			해당메쉬 필터 처리전 전처리과정이 필요할 경우 사용.
		`,
		return : 'void'
	}
	 :DOC*/
	tPrototype['_process'] = [];
	RedBaseFilter['baseVertexShaderSource1'] = function () {
		/* @preserve
		 void main(void) {
			 vTexcoord = aTexcoord;
			 vResolution = uResolution;
			 vTime = uTime;
			 gl_Position = uPMatrix * uCameraMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		 }
		 */
	};
	Object.freeze(RedBaseFilter);
})();