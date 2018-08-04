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
	     code : 'PROPERTY',
		 title :`intensity`,
		 description : `
			 기본값 : 1
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedBaseLight', 'intensity', 'number', {'min': 0});
	/**DOC:
	 {
         code : 'PROPERTY',
		 title :`alpha`,
		 description : `
			 기본값 : 1
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
	     code : 'PROPERTY',
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