"use strict";
var RedPostEffectMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffectMaterialProgram';
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
		 precision mediump float;
		 uniform sampler2D u_diffuseTexture;
		 void main(void) {
			 gl_FragColor = texture2D(u_diffuseTexture, vTexcoord);
		 }
		 */
	};
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
		if ( !(this instanceof RedPostEffectMaterial) ) return new RedPostEffectMaterial(redGL, diffuseTexture);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffectMaterial : RedGL Instance만 허용.', redGL);
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		this['diffuseTexture'] = diffuseTexture;
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
	RedPostEffectMaterial.prototype = new RedBaseMaterial();
	/**DOC:
	 {
		 title :`diffuseTexture`,
		 return : 'RedPostEffectMaterial'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPostEffectMaterial', 'diffuseTexture', 'sampler2D', {essential: true});
	Object.freeze(RedPostEffectMaterial);
})();