"use strict";
var RedPostEffect_Threshold;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffect_Threshold_Program';
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
		 precision highp float;
		 uniform sampler2D uDiffuseTexture;
		 uniform float u_threshold;
		 void main() {
			 vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord);
			 float v;
			 if(0.2126 * finalColor.r + 0.7152 * finalColor.g + 0.0722 * finalColor.b >= u_threshold) v = 1.0;
			 else v = 0.0;
			 finalColor.r = finalColor.g = finalColor.b = v;
			 gl_FragColor = finalColor;
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_Threshold`,
		 description : `
			 RedPostEffect_Threshold Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_Threshold Instance'
	 }
	 :DOC*/
	RedPostEffect_Threshold = function (redGL) {
		if ( !(this instanceof RedPostEffect_Threshold) ) return new RedPostEffect_Threshold(redGL);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedPostEffect_Threshold : RedGL Instance만 허용됩니다.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL['makeUUID']();
		/**DOC:
		 {
			 title :`threshold`,
			 description : `
				 최소 유효값
				 기본값 : 128
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['_threshold'] = null;
		Object.defineProperty(this, 'threshold', (function () {
			var _v = 128
			return {
				get: function () { return _v },
				set: function (v) {
					if ( typeof v != 'number' ) RedGLUtil.throwFunc('RedPostEffect_Threshold : threshold 숫자만허용함', '입력값 : ' + v);
					_v = v;
					if ( _v < 1 ) _v = 1
					if ( _v > 255 ) _v = 255
					this['_threshold'] = _v / 255
				}
			}
		})())
		this['threshold'] = 128
		this.updateTexture = function (lastFrameBufferTexture) {
			this['diffuseTexture'] = lastFrameBufferTexture;
		}
		this.checkUniformAndProperty();
		console.log(this);
	}
	RedPostEffect_Threshold.prototype = new RedBaseMaterial();
	RedPostEffect_Threshold.prototype['bind'] = RedPostEffectManager.prototype['bind'];
	RedPostEffect_Threshold.prototype['unbind'] = RedPostEffectManager.prototype['unbind'];
	Object.freeze(RedPostEffect_Threshold);
})();