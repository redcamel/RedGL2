/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
var RedBasePostEffect;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedBasePostEffect`,
		 description : `
			 포스트 이펙트 정의 사용되는 기저층
		 `,
		 extends:['RedBaseMaterial'],
		 return : 'RedBasePostEffect Instance'
	 }
     :DOC*/
    RedBasePostEffect = function () {
    };
    RedBasePostEffect.prototype = new RedBaseMaterial();
    RedBasePostEffect.prototype['bind'] = RedPostEffectManager.prototype['bind'];
    RedBasePostEffect.prototype['unbind'] = RedPostEffectManager.prototype['unbind'];
    /**DOC:
     {
		title :`updateTexture`,
		code : 'METHOD',
		description : `
			포스트이펙트 정의시 반드시 재정의 되어야함.
			포스트 이펙트 내부에서 사용되는 텍스쳐를 업데이트함.
		`,
		return : 'void'
	}
     :DOC*/
    RedBasePostEffect.prototype['updateTexture'] = function () {
        RedGLUtil.throwFunc('RedBasePostEffect - updateTexture : 반드시 재정의해야함')
    };
    /**DOC:
     {
		title :`_process`,
		code : 'PROPERTY',
		description : `
			해당포스트 이펙트 처리전 전처리과정이 필요할 경우 사용.
		`,
		return : 'void'
	}
     :DOC*/
    RedBasePostEffect.prototype['_process'] = [];
    /**DOC:
     {
		title :`_subFrameBufferList`,
		code : 'PROPERTY',
		description : `
			해당포스트 이펙트에서 개별적인 프레임 버퍼가 추가로 필요할 경우 사용.
		`,
		return : 'void'
	}
     :DOC*/
    RedBasePostEffect.prototype['_subFrameBufferList'] = [];
    Object.freeze(RedBasePostEffect);
})();