"use strict";
var RedPostEffect_Invert;
(function () {
	var makeProgram;
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_Invert`,
		 description : `
			 RedPostEffect_Invert Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_Invert Instance'
	 }
	 :DOC*/
	RedPostEffect_Invert = function (redGL) {
		if (!(this instanceof RedPostEffect_Invert)) return new RedPostEffect_Invert(redGL);
		if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffect_Invert : RedGL Instance만 허용됩니다.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = makeProgram(redGL);
		this['_UUID'] = RedGL['makeUUID']();
		this.updateTexture = function (lastFrameBufferTexture) {
			this['diffuseTexture'] = lastFrameBufferTexture;
		}
		this['bind'] = RedPostEffectManager.prototype['bind'];
		this['unbind'] = RedPostEffectManager.prototype['unbind'];
		this.checkProperty();
		console.log(this);
	}
	makeProgram = (function () {
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
			 precision mediump float;
			 uniform sampler2D uDiffuseTexture;

			 void main(void) {
			 vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord);
			 finalColor.r = 1.0 - finalColor.r;
			 finalColor.g = 1.0 - finalColor.g;
			 finalColor.b = 1.0 - finalColor.b;
			 gl_FragColor = finalColor;
			 }
			 */
		}
		vSource = RedGLUtil.getStrFromComment(vSource.toString());
		fSource = RedGLUtil.getStrFromComment(fSource.toString());
		PROGRAM_NAME = 'RedPostEffect_Invert_Program';
		return function (redGL) {
			return RedProgram(redGL, PROGRAM_NAME, vSource, fSource);
		}
	})();
	RedPostEffect_Invert.prototype = RedBaseMaterial.prototype;
	Object.freeze(RedPostEffect_Invert);
})();