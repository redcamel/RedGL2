/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.2 18:16:21
 *
 */

"use strict";
var RedFilterMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedFilterMaterialProgram';
	var checked;
	vSource = function () {
		/* @preserve
		 void main(void) {
			 vTexcoord = aTexcoord;
			 gl_Position = uPMatrix * uCameraMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
			 vResolution = uResolution;
		 }
		 */
	};
	fSource = function () {
		/* @preserve
		 precision lowp float;
		 uniform sampler2D u_diffuseTexture;
		 void main(void) {
			 gl_FragColor = texture2D(u_diffuseTexture, gl_FragCoord.xy/vResolution.xy);
			 // gl_FragColor.r = 1.0;
			 // gl_FragColor.a = 0.5;
			 if(gl_FragColor.a == 0.0) discard;

		 }
		 */
	};
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedFilterMaterial`,
		 description : `
			 메쉬 필터 최종 이미지를 생성하기 위한재질.
			 시스템적으로 사용됨.
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
		 extends : ['RedBaseMaterial'],
		 return : 'RedFilterMaterial Instance'
	 }
	 :DOC*/
	RedFilterMaterial = function (redGL, diffuseTexture) {
		if (!(this instanceof RedFilterMaterial)) return new RedFilterMaterial(redGL, diffuseTexture);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedFilterMaterial : RedGL Instance만 허용.', redGL);
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		this['diffuseTexture'] = diffuseTexture;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL.makeUUID();
		if (!checked) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	RedFilterMaterial.prototype = new RedBaseMaterial();
	/*DOC:
	 {
	     code : 'PROPERTY',
		 title :`diffuseTexture`,
		 description :`diffuseTexture`,
		 return : 'RedFilterMaterial'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedFilterMaterial', 'diffuseTexture', 'sampler2D', {essential: true});
	Object.freeze(RedFilterMaterial);
})();