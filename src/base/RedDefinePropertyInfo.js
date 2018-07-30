"use strict";
var RedDefinePropertyInfo;
(function () {
	RedDefinePropertyInfo = {};
	var maker;
	maker = function (targetObject, clsName, name, type, option) {
		var result;
		var samplerTypeKey
		if ( targetObject.hasOwnProperty(name) ) RedGLUtil.throwFunc(clsName + ' - ' + name + ' : 이미 정의된 속성')
		switch ( type ) {
			case 'hex' :
				result = {
					get: function () { return this['_' + name]; },
					set: function (v) {
						typeof v == 'string' || RedGLUtil.throwFunc(clsName + ' - ' + name + ' 문자열만 허용함', '입력값 : ' + v);
						RedGLUtil.regHex(v) || RedGLUtil.throwFunc(clsName + ' - ' + name + ' : hex 형식만 허용함.' + v)
						this['_' + name] = v
						if ( option && option['callback'] ) option['callback'].call(this, v)
					}
				}
				break
			case 'boolean' :
				option = option != undefined ? option : true
				result = {
					get: function () { return this['_' + name]; },
					set: function (v) {
						if ( typeof v != 'boolean' ) RedGLUtil.throwFunc(clsName + ' - ' + name + ' : boolean만 허용함.' + v)
						this['_' + name] = v
						if ( option && option['callback'] ) option['callback'].call(this, v)
					}
				}
				break
			case 'number' :
				if ( option ) {
					var min = option['min']
					var max = option['max']
					if ( option.hasOwnProperty('min') && option.hasOwnProperty('max') ) {
						result = {
							get: function () { return this['_' + name]; },
							set: function (v) {
								if ( typeof v != 'number' ) RedGLUtil.throwFunc(clsName + ' - ' + name + ' : 숫자만 허용함.', '입력값 : ' + v)
								if ( v < min ) v = min;
								if ( v > max ) v = max;
								this['_' + name] = v
								if ( option && option['callback'] ) option['callback'].call(this, v)
							}
						}
					} else {
						if ( option.hasOwnProperty('min') ) {
							result = {
								get: function () { return this['_' + name]; },
								set: function (v) {
									if ( typeof v != 'number' ) RedGLUtil.throwFunc(clsName + ' - ' + name + ' : 숫자만 허용함.', '입력값 : ' + v)
									if ( v < min ) v = min;
									this['_' + name] = v
									if ( option && option['callback'] ) option['callback'].call(this, v)
								}
							}
						} else if ( option.hasOwnProperty('max') ) {
							result = {
								get: function () { return this['_' + name]; },
								set: function (v) {
									if ( typeof v != 'number' ) RedGLUtil.throwFunc(clsName + ' - ' + name + ' : 숫자만 허용함.', '입력값 : ' + v)
									if ( v > max ) v = max;
									this['_' + name] = v
									if ( option && option['callback'] ) option['callback'].call(this, v)
								}
							}
						}
					}
				} else {
					result = {
						get: function () { return this['_' + name]; },
						set: function (v) {
							if ( typeof v != 'number' ) RedGLUtil.throwFunc(clsName + ' - ' + name + ' : 숫자만 허용함.', '입력값 : ' + v)
							this['_' + name] = v
						}
					}
				}
				break
			case 'sampler2D' :
				samplerTypeKey = 'RedBaseTexture';
				break
			case 'samplerCube' :
				samplerTypeKey = 'RedBitmapCubeTexture';
				break
			case 'samplerVideo' :
				samplerTypeKey = 'RedVideoTexture';
				break
			default :
				RedGLUtil.throwFunc(name + ' - ' + 'type : ' + type + ' / ' + name + ' : 정의할수없는 타입입니다.')
				break
		}
		if ( samplerTypeKey ) {
			var samplerCls = window[samplerTypeKey]
			// console.log(samplerTypeKey, samplerCls)
			if ( option && option['essential'] ) {
				result = {
					get: function () { return this['_' + name]; },
					set: function (v) {
						if ( !(v instanceof samplerCls) ) RedGLUtil.throwFunc(clsName + ' - ' + name + ' : ' + samplerTypeKey + ' Instance만 허용.', '입력값 : ' + v)
						this['_' + name] = v
						if ( option && option['callback'] ) option['callback'].call(this)
					}
				}
			} else {
				result = {
					get: function () { return this['_' + name]; },
					set: function (v) {
						if ( v && !(v instanceof samplerCls) ) RedGLUtil.throwFunc(clsName + ' - ' + name + ' : ' + samplerTypeKey + ' Instance만 허용.', '입력값 : ' + v)
						this['_' + name] = v
						if ( option && option['callback'] ) option['callback'].call(this)
					}
				}
			}
		}
		targetObject['_' + name] = null
		Object.defineProperty(targetObject, name, result)
	}
	RedDefinePropertyInfo['definePrototype'] = function (clsName, name, type, option) {
		maker(window[clsName]['prototype'], clsName, name, type, option)
	}
	Object.freeze(RedDefinePropertyInfo);
})();
