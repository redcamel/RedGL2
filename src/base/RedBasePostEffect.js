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
	Object.freeze(RedBasePostEffect);
})();