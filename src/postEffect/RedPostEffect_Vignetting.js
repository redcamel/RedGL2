"use strict";

var RedPostEffect_Vignetting;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffect_Vignetting_Program';
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
		 uniform float uSize;
		 uniform float uIndensity;
		 void main(void) {
		 vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord );
		 float dist = distance(vTexcoord, vec2(0.5, 0.5));
		 finalColor.rgb *= smoothstep(0.8, uSize * 0.799, dist * (uIndensity + uSize));
		 gl_FragColor = finalColor;
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_Vignetting`,
		 description : `
			 RedPostEffect_Vignetting Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_Vignetting Instance'
	 }
	 :DOC*/
	RedPostEffect_Vignetting = function ( redGL ) {
		if ( !(this instanceof RedPostEffect_Vignetting) ) return new RedPostEffect_Vignetting( redGL );
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc( 'RedPostEffect_Vignetting : RedGL Instance만 허용됩니다.', redGL );
		this['frameBuffer'] = RedFrameBuffer( redGL );
		this['diffuseTexture'] = null;
		/**DOC:
		 {
			 title :`size`,
			 description : `
				 비네팅사이즈
				 기본값 : 0.1
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['size'] = 0.1;
		/**DOC:
		 {
			 title :`size`,
			 description : `
				 비네팅 강도
				 기본값 : 0.85
		 `,
		 return : 'Number'
		 }
		 :DOC*/
		this['indensity'] = 0.85;
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
	RedPostEffect_Vignetting.prototype = RedBaseMaterial.prototype;
	Object.freeze( RedPostEffect_Vignetting );
})();