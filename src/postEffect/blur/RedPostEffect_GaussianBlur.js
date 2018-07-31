"use strict";
var RedPostEffect_GaussianBlur;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_GaussianBlur`,
		 description : `
			 RedPostEffect_GaussianBlur Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_GaussianBlur Instance'
	 }
	 :DOC*/
	RedPostEffect_GaussianBlur = function (redGL) {
		if ( !(this instanceof RedPostEffect_GaussianBlur) ) return new RedPostEffect_GaussianBlur(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_GaussianBlur : RedGL Instance만 허용됩니다.', redGL);
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['_UUID'] = RedGL.makeUUID();
		this['process'] = [
			RedPostEffect_BlurX(redGL),
			RedPostEffect_BlurY(redGL)
		];
		this['radius'] = 1;
		console.log(this);
	};
	RedPostEffect_GaussianBlur.prototype = new RedBasePostEffect();
	RedPostEffect_GaussianBlur.prototype['updateTexture'] = function () {};
	/**DOC:
	 {
		 title :`radius`,
		 description : `
			 가우시간 블러강도
			 기본값 : 1
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPostEffect_GaussianBlur', 'radius', 'number', {
		min: 0.1, max: 255, callback: function (v) {
			this['process'][0]['size'] = v;
			this['process'][1]['size'] = v;
		}
	});
	Object.freeze(RedPostEffect_GaussianBlur);
})();