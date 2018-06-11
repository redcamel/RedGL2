"use strict";
var RedPostEffect_BlurX;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffect_BlurX_Program';
	vSource = function () {
		/* @preserve
		 void main(void) {
			 vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
			 vResolution = uResolution;
		     gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D uDiffuseTexture;
		 uniform float u_size;
		 float random(vec3 scale, float seed) {
		    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
		 }
		 void main() {
			 vec4 finalColor = vec4(0.0);
			 vec2 delta;
			 float total = 0.0;
			 float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
			 delta = vec2(u_size/vResolution.x,0.0);
			 for (float t = -10.0; t <= 10.0; t++) {
				 float percent = (t + offset - 0.5) / 10.0;
				 float weight = 1.0 - abs(percent);
				 vec4 sample = texture2D(uDiffuseTexture, vTexcoord + delta * percent);
				 sample.rgb *= sample.a;
				 finalColor += sample * weight;
				 total += weight;
			 }
			 finalColor = finalColor / total;
			 finalColor.rgb /= finalColor.a + 0.00001;
			 gl_FragColor =  finalColor ;
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_BlurX`,
		 description : `
			 RedPostEffect_BlurX Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_BlurX Instance'
	 }
	 :DOC*/
	RedPostEffect_BlurX = function (redGL) {
		if ( !(this instanceof RedPostEffect_BlurX) ) return new RedPostEffect_BlurX(redGL);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedPostEffect_BlurX : RedGL Instance만 허용됩니다.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
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
		this['_size'] = null;
		this['size'] = 50
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
	RedPostEffect_BlurX.prototype = new RedBaseMaterial();
	RedPostEffect_BlurX.prototype['bind'] = RedPostEffectManager.prototype['bind'];
	RedPostEffect_BlurX.prototype['unbind'] = RedPostEffectManager.prototype['unbind'];
	Object.defineProperty(RedPostEffect_BlurX.prototype, 'size', RedDefinePropertyInfo['size']);
	Object.freeze(RedPostEffect_BlurX);
})();