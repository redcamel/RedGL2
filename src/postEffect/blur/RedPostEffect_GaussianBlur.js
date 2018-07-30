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
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedPostEffect_GaussianBlur : RedGL Instance만 허용됩니다.', redGL)
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['_UUID'] = RedGL.makeUUID();
		this['process'] = [
			RedPostEffect_BlurX(redGL),
			RedPostEffect_BlurY(redGL)
		];
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
		Object.defineProperty(this, 'radius', (function () {
			var _v = 1
			return {
				get: function () { return _v },
				set: function (v) {
					if ( typeof v != 'number' ) RedGLUtil.throwFunc('RedPostEffect_GaussianBlur : radius 숫자만허용함', '입력값 : ' + v);
					_v = v;
					if ( _v < 0.1 ) _v = 0.1;
					if ( _v > 255 ) _v = 255;
					this['process'][0]['size'] = _v;
					this['process'][1]['size'] = _v;
				}
			}
		})());
		this['radius'] = 1
		console.log(this);
	}
	RedPostEffect_GaussianBlur.prototype = new RedBasePostEffect();
	Object.freeze(RedPostEffect_GaussianBlur);
})();