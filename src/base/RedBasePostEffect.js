"use strict";
var RedBasePostEffect;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBasePostEffect`,
		 description : `
			 RedBasePostEffect 기저층

		 `,
		 return : 'void'
	 }
	 :DOC*/
	RedBasePostEffect = function () {};
	RedBasePostEffect.prototype = new RedBaseMaterial();
	RedBasePostEffect.prototype['bind'] = RedPostEffectManager.prototype['bind'];
	RedBasePostEffect.prototype['unbind'] = RedPostEffectManager.prototype['unbind'];
	RedBasePostEffect.prototype['updateTexture'] = function () {
		RedGLUtil.throwFunc('RedBasePostEffect - updateTexture : 반드시 재정의해야함')
	};
	RedBasePostEffect.prototype['process'] = [];
	RedBasePostEffect.prototype['subFrameBufferList'] = [];
	Object.freeze(RedBasePostEffect);
})();