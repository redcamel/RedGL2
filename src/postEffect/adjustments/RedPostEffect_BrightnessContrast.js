"use strict";
var RedPostEffect_BrightnessContrast;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffect_BrightnessContrast_Program';
	vSource = function () {
		/* @preserve
		 void main(void) {
			 vTexcoord = aTexcoord;
			 gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D uDiffuseTexture;
		 uniform float u_brightness;
		 uniform float u_contrast;
		 void main(void) {
			 vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord );
			 if (u_contrast > 0.0) finalColor.rgb = (finalColor.rgb - 0.5) / (1.0 - u_contrast) + 0.5;
			 else finalColor.rgb = (finalColor.rgb - 0.5) * (1.0 + u_contrast) + 0.5;
			 finalColor.rgb += u_brightness;
			 gl_FragColor = finalColor;
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_BrightnessContrast`,
		 description : `
			 RedPostEffect_BrightnessContrast Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_BrightnessContrast Instance'
	 }
	 :DOC*/
	RedPostEffect_BrightnessContrast = function (redGL) {
		if ( !(this instanceof RedPostEffect_BrightnessContrast) ) return new RedPostEffect_BrightnessContrast(redGL);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedPostEffect_BrightnessContrast : RedGL Instance만 허용됩니다.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		/**DOC:
		 {
			 title :`brightness`,
			 description : `
				 밝기
				 기본값 : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['_brightness'] = 0;
		Object.defineProperty(this, 'brightness', (function () {
			var _v = 0
			return {
				get: function () { return _v },
				set: function (v) {
					if ( typeof v != 'number' ) RedGLUtil.throwFunc('RedPostEffect_BrightnessContrast : brightness 숫자만허용함', '입력값 : ' + v);
					_v = v;
					if ( _v < -150 ) _v = -150
					if ( _v > 150 ) _v = 150
					this['_brightness'] = _v / 255
				}
			}
		})())
		/**DOC:
		 {
			 title :`contrast`,
			 description : `
				 대조
				 기본값 : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['_contrast'] = 0;
		Object.defineProperty(this, 'contrast', (function () {
			var _v = 0
			return {
				get: function () { return _v },
				set: function (v) {
					if ( typeof v != 'number' ) RedGLUtil.throwFunc('RedPostEffect_BrightnessContrast : contrast 숫자만허용함', '입력값 : ' + v);
					_v = v;
					if ( _v < -50 ) _v = 50
					if ( _v > 100 ) _v = 100
					this['_contrast'] = _v / 255
				}
			}
		})())
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL['makeUUID']();
		this.updateTexture = function (lastFrameBufferTexture) {
			this['diffuseTexture'] = lastFrameBufferTexture;
		}
		this.checkUniformAndProperty();
		console.log(this);
	}
	RedPostEffect_BrightnessContrast.prototype = new RedBaseMaterial();
	RedPostEffect_BrightnessContrast.prototype['bind'] = RedPostEffectManager.prototype['bind'];
	RedPostEffect_BrightnessContrast.prototype['unbind'] = RedPostEffectManager.prototype['unbind'];
	Object.freeze(RedPostEffect_BrightnessContrast);
})();