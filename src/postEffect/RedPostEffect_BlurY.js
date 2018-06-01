"use strict";
var RedPostEffect_BlurY;
(function () {
	var makeProgram;
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
	RedPostEffect_BlurY = function ( redGL ) {
		if ( !(this instanceof RedPostEffect_BlurY) ) return new RedPostEffect_BlurY( redGL );
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc( 'RedPostEffect_BlurY : RedGL Instance만 허용됩니다.', redGL );
		this['frameBuffer'] = RedFrameBuffer( redGL );
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
		this['size'] = 50;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = makeProgram( redGL );
		this['_UUID'] = RedGL['makeUUID']();
		this.updateTexture = function ( lastFrameBufferTexture ) {
			this['diffuseTexture'] = lastFrameBufferTexture;
		}
		this['bind'] = RedPostEffectManager.prototype['bind'];
		this['unbind'] = RedPostEffectManager.prototype['unbind'];
		this.checkUniformAndProperty();
		console.log( this );
	}
	makeProgram = (function () {
		var vSource, fSource;
		var PROGRAM_NAME;
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
			 uniform float uSize;
			 float random(vec3 scale, float seed) {
			 return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
			 }
			 void main() {
			 vec4 finalColor = vec4(0.0);
			 vec2 delta;
			 float total = 0.0;
			 float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
			 delta = vec2(0.0, uSize/vResolution.y);
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
			 gl_FragColor =   finalColor ;
			 }
			 */
		}
		vSource = RedGLUtil.getStrFromComment( vSource.toString() );
		fSource = RedGLUtil.getStrFromComment( fSource.toString() );
		PROGRAM_NAME = 'RedPostEffect_BlurY_Program';
		return function ( redGL ) {
			return RedProgram( redGL, PROGRAM_NAME, vSource, fSource );
		}
	})();
	RedPostEffect_BlurY.prototype = RedBaseMaterial.prototype;
	Object.freeze( RedPostEffect_BlurY );
})();