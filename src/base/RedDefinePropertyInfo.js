"use strict";
var RedDefinePropertyInfo;
(function () {
	RedDefinePropertyInfo = {
		width: {
			get: function () { return this['_width']; },
			set: function (v) {
				if ( typeof v != 'number' ) RedGLUtil.throwFunc('width : 숫자만 허용함.')
				if ( v < 0 ) v = 0;
				this['_width'] = v
			}
		},
		height: {
			get: function () { return this['_height']; },
			set: function (v) {
				if ( typeof v != 'number' ) RedGLUtil.throwFunc('height : 숫자만 허용함.')
				if ( v < 0 ) v = 0;
				this['_height'] = v
			}
		},
		size: {
			get: function () { return this['_size']; },
			set: function (v) {
				if ( typeof v != 'number' ) RedGLUtil.throwFunc('size : 숫자만 허용함.')
				if ( v < 0 ) v = 0;
				this['_size'] = v
			}
		},
		intensity: {
			get: function () { return this['_intensity']; },
			set: function (v) {
				if ( typeof v != 'number' ) RedGLUtil.throwFunc('intensity : 숫자만 허용함.')
				if ( v < 0 ) v = 0;
				this['_intensity'] = v
			}
		},
		shininess: (function () {
			return {
				get: function () { return this['_shininess']; },
				set: function (v) {
					if ( typeof v != 'number' ) RedGLUtil.throwFunc('shininess : 숫자만 허용함.')
					this['_shininess'] = v
				}
			}
		})(),
		specularPower: (function () {
			return {
				get: function () { return this['_specularPower']; },
				set: function (v) {
					if ( typeof v != 'number' ) RedGLUtil.throwFunc('specularPower : 숫자만 허용함.')
					this['_specularPower'] = v
				}
			}
		})(),
		reflectionPower: (function () {
			return {
				get: function () { return this['_reflectionPower']; },
				set: function (v) {
					if ( typeof v != 'number' ) RedGLUtil.throwFunc('reflectionPower : 숫자만 허용함.')
					this['_reflectionPower'] = v
				}
			}
		})(),
		displacementPower: (function () {
			return {
				get: function () { return this['_displacementPower']; },
				set: function (v) {
					if ( typeof v != 'number' ) RedGLUtil.throwFunc('displacementPower : 숫자만 허용함.')
					this['_displacementPower'] = v
				}
			}
		})(),
		diffuseTexture: (function () {
			return {
				get: function () { return this['_diffuseTexture']; },
				set: function (v) {
					if ( v && !(v instanceof RedBitmapTexture) ) RedGLUtil.throwFunc('diffuseTexture : RedBitmapTexture Instance만 허용됩니다.', '입력값 : ' + v)
					this['_diffuseTexture'] = v
				}
			}
		})(),
		diffuseTextureMust: (function () {
			return {
				get: function () { return this['_diffuseTexture']; },
				set: function (v) {
					if ( !(v instanceof RedBitmapTexture) ) RedGLUtil.throwFunc('diffuseTexture : RedBitmapTexture Instance만 허용됩니다.', '입력값 : ' + v)
					this['_diffuseTexture'] = v
				}
			}
		})(),
		environmentTexture: (function () {
			return {
				get: function () { return this['_environmentTexture']; },
				set: function (v) {
					if ( v && !(v instanceof RedBitmapCubeTexture) ) RedGLUtil.throwFunc('environmentTexture : RedBitmapCubeTexture Instance만 허용됩니다.', '입력값 : ' + v)
					this['_environmentTexture'] = v
				}
			}
		})(),
		environmentTextureMust: (function () {
			return {
				get: function () { return this['_environmentTexture']; },
				set: function (v) {
					if ( !(v instanceof RedBitmapCubeTexture) ) RedGLUtil.throwFunc('environmentTexture : RedBitmapCubeTexture Instance만 허용됩니다.', '입력값 : ' + v)
					this['_environmentTexture'] = v
				}
			}
		})(),
		normalTexture: (function () {
			return {
				get: function () { return this['_normalTexture']; },
				set: function (v) {
					if ( v && !(v instanceof RedBitmapTexture) ) RedGLUtil.throwFunc('normalTexture : RedBitmapTexture Instance만 허용됩니다.', '입력값 : ' + v)
					this['_normalTexture'] = v
				}
			}
		})(),
		specularTexture: (function () {
			return {
				get: function () { return this['_specularTexture']; },
				set: function (v) {
					if ( v && !(v instanceof RedBitmapTexture) ) RedGLUtil.throwFunc('specularTexture : RedBitmapTexture Instance만 허용됩니다.', '입력값 : ' + v)
					this['_specularTexture'] = v
				}
			}
		})(),
		displacementTexture: (function () {
			return {
				get: function () { return this['_displacementTexture']; },
				set: function (v) {
					if ( v && !(v instanceof RedBitmapTexture) ) RedGLUtil.throwFunc('displacementTexture : RedBitmapTexture Instance만 허용됩니다.', '입력값 : ' + v)
					this['_displacementTexture'] = v
				}
			}
		})(),
		videoTextureMust: (function () {
			return {
				get: function () { return this['_videoTexture']; },
				set: function (v) {
					if ( !(v instanceof RedVideoTexture) ) RedGLUtil.throwFunc('videoTexture : RedVideoTexture Instance만 허용됩니다.', '입력값 : ' + v)
					this['_videoTexture'] = v
				}
			}
		})(),
		skyBoxTexture: (function () {
			return {
				get: function () { return this['_skyBoxTexture']; },
				set: function (v) {
					if ( v && !(v instanceof RedBitmapCubeTexture) ) RedGLUtil.throwFunc('skyBoxTexture : RedBitmapCubeTexture Instance만 허용됩니다.', '입력값 : ' + v)
					this['_skyBoxTexture'] = v
				}
			}
		})(),
		//Object3D
		geometry: (function () {
			return {
				get: function () { return this['_geometry']; },
				set: function (v) {
					if ( this instanceof RedSkyBox ) {
						if ( !(v instanceof RedBox) ) RedGLUtil.throwFunc('RedSkyBox : geometry - RedBox Instance만 허용됩니다.', '입력값 : ' + v)
					} else {
						if ( v && !(v instanceof RedGeometry) ) RedGLUtil.throwFunc('geometry : RedGeometry Instance만 허용됩니다.', '입력값 : ' + v)
					}
					this['_geometry'] = v
				}
			}
		})(),
		material: (function () {
			return {
				get: function () { return this['_material']; },
				set: function (v) {
					if ( this instanceof RedSprite3D ) {
						if ( !(v instanceof RedColorMaterial) && !(v instanceof RedBitmapMaterial) ) {
							RedGLUtil.throwFunc('RedSprite3D : RedColorMaterial or RedBitmapMaterial Instance만 허용됩니다.', '입력값 : ' + v)
						}
					} else if ( this instanceof RedSkyBox ) {
						if ( !(v instanceof RedSkyBoxMaterial) ) {
							RedGLUtil.throwFunc('RedSkyBox : RedSkyBoxMaterial Instance만 허용됩니다.', '입력값 : ' + v)
						}
					} else if ( this instanceof RedPointUnit ) {
						if ( !(v instanceof RedPointColorMaterial) && !(v instanceof RedPointBitmapMaterial) ) {
							RedGLUtil.throwFunc('RedPointUnit : material - RedPointColorMaterial Instance or RedPointBitmapMaterial Instance만 허용됩니다.')
						}
					} else {
						if ( v && !(v instanceof RedBaseMaterial) ) RedGLUtil.throwFunc('material : RedBaseMaterial Instance만 허용됩니다.', '입력값 : ' + v)
					}
					this['_material'] = v
				}
			}
		})(),
	}
	Object.defineProperty(RedDefinePropertyInfo, 'color', {
		get: function () {
			var _v = '#ff2211'
			return {
				get: function () { return _v },
				set: (function () {
					var t0;
					return function (hex) {
						_v = hex ? hex : '#ff2211';
						console.log(_v)
						t0 = RedGLUtil.hexToRGB.call(this, _v);
						this['_color'][0] = t0[0];
						this['_color'][1] = t0[1];
						this['_color'][2] = t0[2];
						this['_color'][3] = this['alpha'];
					}
				})()
			}
		}
	})
	Object.defineProperty(RedDefinePropertyInfo, 'alpha', {
		get: function () {
			var _v = 1
			return {
				get: function () { return _v; },
				set: function (v) {
					if ( typeof v != 'number' ) RedGLUtil.throwFunc('alpha : 0~1 숫자만 허용함.')
					if ( v < 0 ) v = 0;
					if ( v > 1 ) v = 1
					this['_color'][3] = _v = v
				}
			}
		}
	})
	Object.freeze(RedDefinePropertyInfo);
})();
