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
					return function (hex) {
						_v = hex ? hex : '#ff2211';
						t0 = RedGLUtil.hexToRGB.call(this, _v);
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
				set: function (v) {
					if (typeof v != 'number') RedGLUtil.throwFunc('alpha : 0~1 숫자만 허용함.')
					if (v < 0) v = 0;
					if (v > 1) v = 1
					this['_color'][3] = _v = v
				}
			}
		})(),
		shininess: (function () {
			return {
				get: function () { return this['_shininess']; },
				set: function (v) {
					if (typeof v != 'number') RedGLUtil.throwFunc('shininess : 숫자만 허용함.')
					this['_shininess'] = v
				}
			}
		})(),
		specularPower: (function () {
			return {
				get: function () { return this['_specularPower']; },
				set: function (v) {
					if (typeof v != 'number') RedGLUtil.throwFunc('specularPower : 숫자만 허용함.')
					this['_specularPower'] = v
				}
			}
		})(),
        reflectionPower: (function () {
            return {
                get: function () { return this['_reflectionPower']; },
                set: function (v) {
                    if (typeof v != 'number') RedGLUtil.throwFunc('reflectionPower : 숫자만 허용함.')
                    this['_reflectionPower'] = v
                }
            }
        })(),
		displacementPower: (function () {
			return {
				get: function () { return this['_displacementPower']; },
				set: function (v) {
					if (typeof v != 'number') RedGLUtil.throwFunc('displacementPower : 숫자만 허용함.')
					this['_displacementPower'] = v
				}
			}
		})(),
		diffuseTexture: (function () {
			return {
				get: function () { return this['_diffuseTexture']; },
				set: function (v) {
					if (v && !(v instanceof RedBitmapTexture)) RedGLUtil.throwFunc('diffuseTexture : RedBitmapTexture Instance만 허용됩니다.', '입력값 : ' + v)
					this['_diffuseTexture'] = v
				}
			}
		})(),
        environmentTexture: (function () {
            return {
                get: function () { return this['_environmentTexture']; },
                set: function (v) {
                    if (v && !(v instanceof RedBitmapCubeTexture)) RedGLUtil.throwFunc('environmentTexture : RedBitmapCubeTexture Instance만 허용됩니다.', '입력값 : ' + v)
                    this['_environmentTexture'] = v
                }
            }
        })(),
		normalTexture: (function () {
			return {
				get: function () { return this['_normalTexture']; },
				set: function (v) {
					if (v && !(v instanceof RedBitmapTexture)) RedGLUtil.throwFunc('normalTexture : RedBitmapTexture Instance만 허용됩니다.', '입력값 : ' + v)
					this['_normalTexture'] = v
				}
			}
		})(),
		specularTexture: (function () {
			return {
				get: function () { return this['_specularTexture']; },
				set: function (v) {
					if (v && !(v instanceof RedBitmapTexture)) RedGLUtil.throwFunc('specularTexture : RedBitmapTexture Instance만 허용됩니다.', '입력값 : ' + v)
					this['_specularTexture'] = v
				}
			}
		})(),
		displacementTexture: (function () {
			return {
				get: function () { return this['_displacementTexture']; },
				set: function (v) {
					if (v && !(v instanceof RedBitmapTexture)) RedGLUtil.throwFunc('displacementTexture : RedBitmapTexture Instance만 허용됩니다.', '입력값 : ' + v)
					this['_displacementTexture'] = v
				}
			}
		})(),
		skyBoxTexture: (function () {
			return {
				get: function () { return this['_skyBoxTexture']; },
				set: function (v) {
					if (v && !(v instanceof RedBitmapCubeTexture)) RedGLUtil.throwFunc('skyBoxTexture : RedBitmapCubeTexture Instance만 허용됩니다.', '입력값 : ' + v)
					this['_skyBoxTexture'] = v
				}
			}
		})(),

	}
	Object.freeze(RedDefinePropertyInfo);
})();
