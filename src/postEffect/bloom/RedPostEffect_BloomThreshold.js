"use strict";
var RedPostEffect_BloomThreshold;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME;
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
			 if(0.2126 * finalColor.r + 0.7152 * finalColor.g + 0.0722 * finalColor.b < u_threshold_value)  finalColor.r = finalColor.g = finalColor.b = 0.0;
			 gl_FragColor = finalColor;
		 }
		 */
	};
	PROGRAM_NAME = 'RedPostEffectBloomThresholdProgram';
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_BloomThreshold`,
		 description : `
			 RedPostEffect_BloomThreshold Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_BloomThreshold Instance'
	 }
	 :DOC*/
	RedPostEffect_BloomThreshold = function (redGL) {
		if ( !(this instanceof RedPostEffect_BloomThreshold) ) return new RedPostEffect_BloomThreshold(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_BloomThreshold : RedGL Instance만 허용.', redGL);
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
	RedPostEffect_BloomThreshold.prototype = new RedBasePostEffect();
	RedPostEffect_BloomThreshold.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototype('RedPostEffect_BloomThreshold', 'diffuseTexture', 'sampler2D');
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
	RedDefinePropertyInfo.definePrototype('RedPostEffect_BloomThreshold', 'threshold', 'number', {
		min: 0, max: 255, callback: function (v) {
			this['_threshold_value'] = v / 255
		}
	});
	Object.freeze(RedPostEffect_BloomThreshold);
})();