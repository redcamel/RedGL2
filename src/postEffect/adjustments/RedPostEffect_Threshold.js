"use strict";
var RedPostEffect_Threshold;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffectThresholdProgram';
	var checked;
	vSource = function () {
		/* @preserve
		 void main(void) {
			 vTexcoord = aTexcoord;
			 gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		 }
		 */
	};
	fSource = function () {
		/* @preserve
		 precision highp float;
		 uniform sampler2D u_diffuseTexture;
		 uniform float u_threshold_value;
		 void main() {
			 vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
			 float v;
			 if(0.2126 * finalColor.r + 0.7152 * finalColor.g + 0.0722 * finalColor.b >= u_threshold_value) v = 1.0;
			 else v = 0.0;
			 finalColor.r = finalColor.g = finalColor.b = v;
			 gl_FragColor = finalColor;
		 }
		 */
	};
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
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_Threshold : RedGL Instance만 허용됩니다.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['threshold'] = 128;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL.makeUUID();
		if ( !checked ) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	RedPostEffect_Threshold.prototype = new RedBasePostEffect();
	RedPostEffect_Threshold.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Threshold', 'diffuseTexture', 'sampler2D');
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
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Threshold', 'threshold', 'number', {
		min: 1, max: 255, callback: function (v) {
			this['_threshold_value'] = v / 255
		}
	});
	Object.freeze(RedPostEffect_Threshold);
})();