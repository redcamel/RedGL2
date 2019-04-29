/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var RedGridMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedGridMaterialProgram';
    var checked;
    vSource = function () {
        /* @preserve
         void main(void) {
             vVertexColor = aVertexColor;
             gl_Position = uPMatrix * uCameraMatrix* uMMatrix * vec4(aVertexPosition, 1.0);
         }
         */
    };
    fSource = function () {
        /* @preserve
         precision mediump float;
        // 안개
        //#REDGL_DEFINE#fragmentShareFunc#fogFactor#
        //#REDGL_DEFINE#fragmentShareFunc#fog#

         void main(void) {
             vec4 finalColor = vVertexColor;
             //#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
             //#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedGridMaterial`,
		 description : `
			 RedGrid Instance 새성시 내부적으로 자동으로 생성됨.
			 시스템적으로 사용됨
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 extends : ['RedBaseMaterial'],
		 return : 'RedGridMaterial Instance'
	 }
     :DOC*/
    RedGridMaterial = function (redGL) {
        if (!(this instanceof RedGridMaterial)) return new RedGridMaterial(redGL);
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource);
        // 유니폼 프로퍼티
        // 일반 프로퍼티
        this['_UUID'] = RedGL.makeUUID();
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this);
    };
    RedGridMaterial.prototype = new RedBaseMaterial();
    Object.freeze(RedGridMaterial);
})();