"use strict";
var RedPostEffect_HueSaturation;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffect_HueSaturation_Program';
	vSource = function () {
		/* @preserve
		 void main(void) {
			 vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
			 gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D uDiffuseTexture;
		 uniform float u_hue;
		 uniform float u_saturation;
		 void main(void) {
			 vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord );
			 float angle = u_hue * 3.1415926535897932384626433832795;
			 float s = sin(angle), c = cos(angle);
			 vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;
			 float len = length(finalColor.rgb);

			 finalColor.rgb = vec3(
				 dot(finalColor.rgb, weights.xyz),
				 dot(finalColor.rgb, weights.zxy),
				 dot(finalColor.rgb, weights.yzx)
			 );

			 float average = (finalColor.r + finalColor.g + finalColor.b) / 3.0;
			 if (u_saturation > 0.0) finalColor.rgb += (average - finalColor.rgb) * (1.0 - 1.0 / (1.001 - u_saturation));
			 else finalColor.rgb += (average - finalColor.rgb) * (-u_saturation);
			 gl_FragColor = finalColor;
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_HueSaturation`,
		 description : `
			 RedPostEffect_HueSaturation Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_HueSaturation Instance'
	 }
	 :DOC*/
	RedPostEffect_HueSaturation = function (redGL) {
		if ( !(this instanceof RedPostEffect_HueSaturation) ) return new RedPostEffect_HueSaturation(redGL);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedPostEffect_HueSaturation : RedGL Instance만 허용됩니다.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		/**DOC:
		 {
			 title :`hue`,
			 description : `
				 색조
				 기본값 : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['_hue'] = 0;
		Object.defineProperty(this, 'hue', (function () {
			var _v = 0
			return {
				get: function () { return _v },
				set: function (v) {
					if ( typeof v != 'number' ) RedGLUtil.throwFunc('RedPostEffect_HueSaturation : hue 숫자만허용함', '입력값 : ' + v);
					_v = v;
					if ( _v < -180 ) _v = -180
					if ( _v > 180 ) _v = 180
					this['_hue'] = _v / 180
				}
			}
		})())
		/**DOC:
		 {
			 title :`saturation`,
			 description : `
				 채도
				 기본값 : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['_saturation'] = 0;
		Object.defineProperty(this, 'saturation', (function () {
			var _v = 0
			return {
				get: function () { return _v },
				set: function (v) {
					if ( typeof v != 'number' ) RedGLUtil.throwFunc('RedPostEffect_HueSaturation : saturation 숫자만허용함', '입력값 : ' + v);
					_v = v;
					if ( _v < -100 ) _v = -100
					if ( _v > 100 ) _v = 100
					this['_saturation'] = _v / 100
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
	RedPostEffect_HueSaturation.prototype = RedBaseMaterial.prototype
	RedPostEffect_HueSaturation.prototype['bind'] = RedPostEffectManager.prototype['bind'];
	RedPostEffect_HueSaturation.prototype['unbind'] = RedPostEffectManager.prototype['unbind'];
	Object.freeze(RedPostEffect_HueSaturation);
})();