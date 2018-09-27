"use strict";
var RedParticleColorMaterial;
//////////////////////////////////////////////////////////
// 연구중
//////////////////////////////////////////////////////////
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'particleColorProgram';
    var checked;
    vSource = function () {
        /* @preserve
         varying vec4 vColor;
         void main(void) {
             gl_PointSize = aPointSize/gl_Position.w * uResolution.y;
             vColor = aVertexColor;
             gl_Position = uPMatrix * uCameraMatrix * vec4(aVertexPosition, 1.0);
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
         varying vec4 vColor;
         void main(void) {
             vec4 finalColor = vColor;
             finalColor.a *= u_alpha;
             //#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
             //#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedParticleColorMaterial`,
		 description : `
			 RedParticleColorMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 demo : '../example/particle/RedParticleEmitter.html',
		 extends : [
		    'RedBaseMaterial'
		 ],
		 return : 'RedParticleColorMaterial Instance'
	 }
     :DOC*/
    RedParticleColorMaterial = function (redGL) {
        if (!(this instanceof RedParticleColorMaterial)) return new RedParticleColorMaterial(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedParticleColorMaterial : RedGL Instance만 허용.', redGL);
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
    RedParticleColorMaterial.prototype = new RedBaseMaterial();
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedParticleColorMaterial', 'alpha', 'number', {min: 0, max: 1});
    Object.freeze(RedParticleColorMaterial);
})();