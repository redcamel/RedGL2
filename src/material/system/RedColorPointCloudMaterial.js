/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.5.2 12:46
 */

"use strict";
var RedColorPointCloudMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'colorPointCloudProgram';
	var checked;
	vSource = function () {
		/* @preserve

		 void main(void) {
			vVertexColor = aVertexColor;
			if(uMode2DYn){
				gl_Position = uPMatrix * uCameraMatrix * uMMatrix * vec4(aVertexPosition.x, -aVertexPosition.y, aVertexPosition.z, 1.0);
				gl_PointSize = abs(aPointSize)/gl_Position.w;
			}else {
				gl_Position = uPMatrix * uCameraMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
				gl_PointSize = abs(aPointSize)/gl_Position.w * uResolution.y;
			}
		 }
		 */
	};
	fSource = function () {
		/* @preserve
		 precision mediump float;
		// 안개
		//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
		//#REDGL_DEFINE#fragmentShareFunc#fog#

		 uniform float u_alpha;
		 void main(void) {
			 vec4 finalColor = vVertexColor;
			 finalColor.a *= u_alpha;
			 //#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
			 //#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
		 }
		 */
	};
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedColorPointCloudMaterial`,
		 description : `
			 RedColorPointCloudMaterial.
			 속성으로 컬러를 가지 않는다.
			 단순히 RedPointCloud의 interleave 버퍼의 aVertexColor 값을 처리해 주는 역할을 한다.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 demo : '../example/material/RedColorPointCloudMaterial.html',
		 extends : ['RedBaseMaterial'],
		 example : `
		     RedColorPointCloudMaterial(RedGL Instance));
		 `,
		 return : 'RedColorPointCloudMaterial Instance'
	 }
	 :DOC*/
	RedColorPointCloudMaterial = function (redGL) {
		if (!(this instanceof RedColorPointCloudMaterial)) return new RedColorPointCloudMaterial(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedColorPointCloudMaterial : RedGL Instance만 허용.', redGL);
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource);
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		this['alpha'] = 1;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['_UUID'] = RedGL.makeUUID();
		if (!checked) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	RedColorPointCloudMaterial.prototype = new RedBaseMaterial();
	/*DOC:
	 {
 	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedColorPointCloudMaterial', 'alpha', 'number', {min: 0, max: 1});
	Object.freeze(RedColorPointCloudMaterial);
})();