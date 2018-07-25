"use strict";
var RedBaseLight;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBaseLight`,
		 description : `
			 RedBaseLight 기저층
		 `,
		 return : 'void'
	 }
	 :DOC*/
	RedBaseLight = function () {};
	RedBaseLight.prototype = {};
	/**DOC:
	 {
		 title :`intensity`,
		 description : `
			 라이트 강도
			 기본값 : 1
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedBaseLight', 'intensity', 'number', {'min': 0});
	/**DOC:
	 {
		 title :`alpha`,
		 description : `
			 기본값 : 0.1
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedBaseLight', 'alpha', 'number', {
		'min': 0, 'max': 1,
		callback: function (v) {
			this['_lightColor'][3] = this['_alpha'] = v
		}
	});
	/**DOC:
	 {
		 title :`color`,
		 description : `
			색상
		 `,
		 return : 'hex'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedBaseLight', 'color', 'hex', {
		callback: (function () {
			var t0;
			return function () {
				t0 = RedGLUtil.hexToRGB_ZeroToOne.call(this, this['_color']);
				this['_lightColor'][0] = t0[0];
				this['_lightColor'][1] = t0[1];
				this['_lightColor'][2] = t0[2];
				this['_lightColor'][3] = this['_alpha'];
			}
		})()
	});
	Object.freeze(RedBaseLight);
})();