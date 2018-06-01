"use strict";
var RedDefinePropertyInfo;
(function () {
	RedDefinePropertyInfo = {
		/**DOC:
		 {
			 code : 'PROPERTY',
			 title :`color`,
			 description : `
				 컬러설정
			 `,
			 return : 'hex'
		 }
		 :DOC*/
		color: (function () {
			var _v = '#ff2211'
			return {
				get: function () { return _v },
				set: (function () {
					var t0;
					return function ( hex ) {
						_v = hex ? hex : '#ff2211';
						t0 = RedGLUtil.hexToRGB.call( this, _v );
						this['_color'][0] = t0[0];
						this['_color'][1] = t0[1];
						this['_color'][2] = t0[2];
						this['_color'][3] = this['alpha'];
					}
				})()
			}
		})(),
		alpha: (function () {
			var _v = '#ff2211'
			return {
				get: function () { return _v; },
				set: function ( v ) {
					if ( typeof v != 'number' ) RedGLUtil.throwFunc( 'alpha : 0~1 숫자만 허용함.' )
					if ( v < 0 ) v = 0;
					if ( v > 1 ) v = 1
					this['_color'][3] = _v = v
				}
			}
		})()
	}
	Object.freeze( RedDefinePropertyInfo );
})();
