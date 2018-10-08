"use strict";
var RedPointColorMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'pointColorProgram';
    var checked;
    vSource = function () {
        /* @preserve
         void main(void) {
             vVertexColor = aVertexColor;
             gl_Position = uPMatrix * uCameraMatrix* uMMatrix * vec4(aVertexPosition, 1.0);
             gl_PointSize = aPointSize/gl_Position.w * uResolution.y;
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
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedPointColorMaterial`,
		 description : `
			 RedPointColorMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 demo : '../example/material/RedPointColorMaterial.html',
		 extends : [
		    'RedBaseMaterial'
		 ],
		 return : 'RedPointColorMaterial Instance'
	 }
     :DOC*/
    RedPointColorMaterial = function (redGL) {
        if (!(this instanceof RedPointColorMaterial)) return new RedPointColorMaterial(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPointColorMaterial : RedGL Instance만 허용.', redGL);
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
    RedPointColorMaterial.prototype = new RedBaseMaterial();
    /**DOC:
     {
 	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPointColorMaterial', 'alpha', 'number', {min: 0, max: 1});
    Object.freeze(RedPointColorMaterial);
})();