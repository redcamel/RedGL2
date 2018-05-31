"use strict";
var RedPostEffectMaterial;
(function () {
	var makeProgram;
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffectMaterial`,
		 description : `
			 RedPostEffectMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 diffuseTexture : [
				 {type:'RedBitmapTexture'},
				 'RedBitmapTexture Instance'
			 ]
		 },
		 example : `
			 RedPostEffectMaterial(RedGL Instance, RedBitmapTexture(RedGL Instance, src))
		 `,
		 return : 'RedPostEffectMaterial Instance'
	 }
	 :DOC*/
	RedPostEffectMaterial = function (redGL, diffuseTexture) {
		if (!(this instanceof RedPostEffectMaterial)) return new RedPostEffectMaterial(redGL, diffuseTexture);
		if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffectMaterial : RedGL Instance만 허용됩니다.', redGL)
		if (!(diffuseTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedPostEffectMaterial : RedBitmapTexture Instance만 허용됩니다.')
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		/**DOC:
		 {
			 title :`diffuseTexture`,
			 return : 'RedPostEffectMaterial'
		 }
		 :DOC*/
		this['diffuseTexture'] = diffuseTexture;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = makeProgram(redGL);
		this['_UUID'] = RedGL['makeUUID']();
		this.checkProperty()
		// Object.seal(this)
		console.log(this)
	}
	makeProgram = (function () {
		var vSource, fSource;
		var PROGRAM_NAME;
		vSource = function () {
			/* @preserve
			 void main(void) {
			 vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
			 gl_Position = uPMatrix * uCameraMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
			 }
			 */
		}
		fSource = function () {
			/* @preserve
			 precision mediump float;
			 uniform sampler2D uDiffuseTexture;
			 void main(void) {
			 vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord);
			 gl_FragColor = finalColor;
			 }
			 */
		}
		vSource = RedGLUtil.getStrFromComment(vSource.toString());
		fSource = RedGLUtil.getStrFromComment(fSource.toString());
		PROGRAM_NAME = 'RedPostEffectMaterial_Program';
		return function (redGL) {
			return RedProgram(redGL, PROGRAM_NAME, vSource, fSource)

		}
	})();
	RedPostEffectMaterial.prototype = RedBaseMaterial.prototype
	Object.freeze(RedPostEffectMaterial)
})();