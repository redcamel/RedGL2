"use strict";
var RedPostEffect_BlurY;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffectBlurYProgram';
	var checked;
	vSource = function () {
		/* @preserve
		 void main(void) {
			 vTexcoord = aTexcoord;
			 vResolution = uResolution;
			 gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		 }
		 */
	};
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D u_diffuseTexture;
		 uniform float u_size;
		 float random(vec3 scale, float seed) {
			 return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
		 }
		 void main() {
			 vec4 finalColor = vec4(0.0);
			 vec2 delta;
			 float total = 0.0;
			 float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
			 delta = vec2(0.0, u_size/vResolution.y);
			 for (float t = -10.0; t <= 10.0; t++) {
				 float percent = (t + offset - 0.5) / 10.0;
				 float weight = 1.0 - abs(percent);
				 vec4 sample = texture2D(u_diffuseTexture, vTexcoord + delta * percent);
				 sample.rgb *= sample.a;
				 finalColor += sample * weight;
				 total += weight;
			 }
			 finalColor = finalColor / total;
			 finalColor.rgb /= finalColor.a + 0.00001;
			 gl_FragColor =   finalColor ;
		 }
		 */
	};
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_BlurY`,
		 description : `
			 RedPostEffect_BlurY Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_BlurY Instance'
	 }
	 :DOC*/
	RedPostEffect_BlurY = function (redGL) {
		if ( !(this instanceof RedPostEffect_BlurY) ) return new RedPostEffect_BlurY(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_BlurY : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['size'] = 50;
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
	RedPostEffect_BlurY.prototype = new RedBasePostEffect();
	RedPostEffect_BlurY.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototype('RedPostEffect_BlurY', 'diffuseTexture', 'sampler2D');
	/**DOC:
	 {
		 title :`size`,
		 description : `
			 블러 사이즈
			 기본값 : 50
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPostEffect_BlurY', 'size', 'number', {'min': 0});
	Object.freeze(RedPostEffect_BlurY);
})();