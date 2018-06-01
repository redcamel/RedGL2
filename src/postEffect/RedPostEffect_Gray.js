"use strict";
var RedPostEffect_Gray;
(function () {
	var makeProgram;
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_Gray`,
		 description : `
			 RedPostEffect_Gray Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_Gray Instance'
	 }
	 :DOC*/
	RedPostEffect_Gray = function ( redGL ) {
		if ( !(this instanceof RedPostEffect_Gray) ) return new RedPostEffect_Gray( redGL );
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc( 'RedPostEffect_Gray : RedGL Instance만 허용됩니다.', redGL );
		this['frameBuffer'] = RedFrameBuffer( redGL );
		this['diffuseTexture'] = null;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = makeProgram( redGL );
		this['_UUID'] = RedGL['makeUUID']();
		this.updateTexture = function ( lastFrameBufferTexture ) {
			this['diffuseTexture'] = lastFrameBufferTexture;
		}
		this['bind'] = RedPostEffectManager.prototype['bind'];
		this['unbind'] = RedPostEffectManager.prototype['unbind'];
		this.checkUniformAndProperty();;
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
			 void main(void) {
			 vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord);
			 highp float gray = (finalColor.r  + finalColor.g + finalColor.b)/3.0;
			 gl_FragColor = vec4( gray, gray, gray, 1.0);
			 }
			 */
		}
		vSource = RedGLUtil.getStrFromComment( vSource.toString() );
		fSource = RedGLUtil.getStrFromComment( fSource.toString() );
		PROGRAM_NAME = 'RedPostEffect_Gray_Program';
		return function ( redGL ) {
			return RedProgram( redGL, PROGRAM_NAME, vSource, fSource );
		}
	})();
	RedPostEffect_Gray.prototype = RedBaseMaterial.prototype;
	Object.freeze( RedPostEffect_Gray );
})();