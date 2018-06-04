"use strict";
var RedPostEffect_BloomThreshold;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME;
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
		 uniform float uThreshold;

		 void main() {
		 vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord);
		 if(0.2126 * finalColor.r + 0.7152 * finalColor.g + 0.0722 * finalColor.b < uThreshold)  finalColor.r = finalColor.g = finalColor.b = 0.0;
		 gl_FragColor = finalColor;
		 }
		 */
	}
	PROGRAM_NAME = 'RedPostEffect_BloomThreshold_Program';
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
	RedPostEffect_BloomThreshold = function ( redGL ) {
		if ( !(this instanceof RedPostEffect_BloomThreshold) ) return new RedPostEffect_BloomThreshold( redGL );
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc( 'RedPostEffect_BloomThreshold : RedGL Instance만 허용됩니다.', redGL );
		this['frameBuffer'] = RedFrameBuffer( redGL );
		this['diffuseTexture'] = null;
		/**DOC:
		 {
			 title :`threshold`,
			 description : `
				 최소 유효값
				 기본값 : 0.24
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['threshold'] = 0.24;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram']( redGL, PROGRAM_NAME, vSource, fSource );
		this['_UUID'] = RedGL['makeUUID']();
		this.updateTexture = function ( lastFrameBufferTexture ) {
			this['diffuseTexture'] = lastFrameBufferTexture;
		}
		this['bind'] = RedPostEffectManager.prototype['bind'];
		this['unbind'] = RedPostEffectManager.prototype['unbind'];
		this.checkUniformAndProperty();
		;
		console.log( this );
	}
	RedPostEffect_BloomThreshold.prototype = RedBaseMaterial.prototype;
	Object.freeze( RedPostEffect_BloomThreshold );
})();