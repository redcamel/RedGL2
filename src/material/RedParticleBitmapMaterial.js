"use strict";
var RedParticleBitmapMaterial;
//////////////////////////////////////////////////////////
// 연구중
//////////////////////////////////////////////////////////
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'particleBitmapProgram';
    var checked;
    vSource = function () {
        /* @preserve
         void main(void) {
            gl_Position = uPMatrix * uCameraMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
            gl_PointSize = aPointSize/gl_Position.w * uResolution.y;
            vVertexColor = aVertexColor;
         }
         */
    };
    fSource = function () {
        //TODO: tint명확히 정의해야함
        /* @preserve
         precision mediump float;
        // 안개
        //#REDGL_DEFINE#fragmentShareFunc#fogFactor#
        //#REDGL_DEFINE#fragmentShareFunc#fog#

         uniform sampler2D u_diffuseTexture;
         uniform float u_cutOff;
         uniform float u_alpha;
         void main(void) {
             vec4 finalColor = texture2D(u_diffuseTexture, vec2(gl_PointCoord.x, - gl_PointCoord.y));
             finalColor.rgb *= finalColor.a;
             finalColor.rgb += vVertexColor.rgb * vVertexColor.a;
             finalColor.a *= vVertexColor.a;
             finalColor.a *= u_alpha;
             if(finalColor.a < u_cutOff) discard;

             //#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
             //#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedParticleBitmapMaterial`,
		 description : `
			 RedParticleBitmapMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 diffuseTexture : [
				 {type:'RedBitmapTexture'}
			 ]
		 },
		  demo : '../example/particle/RedParticleEmitter.html',
		 extends : ['RedBaseMaterial'],
		 return : 'RedParticleBitmapMaterial Instance'
	 }
     :DOC*/
    RedParticleBitmapMaterial = function (redGL, diffuseTexture) {
        if (!(this instanceof RedParticleBitmapMaterial)) return new RedParticleBitmapMaterial(redGL, diffuseTexture);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedParticleBitmapMaterial : RedGL Instance만 허용.', redGL);
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['diffuseTexture'] = diffuseTexture;
        this['alpha'] = 1;
        this['cutOff'] = 0;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['_UUID'] = RedGL.makeUUID();
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this)
    };
    RedParticleBitmapMaterial.prototype = new RedBaseMaterial();
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`diffuseTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedParticleBitmapMaterial', 'diffuseTexture', 'sampler2D', {essential: true});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedParticleBitmapMaterial', 'alpha', 'number', {min: 0, max: 1});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`cutOff`,
		 description : `기본값 : 0.01`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedParticleBitmapMaterial', 'cutOff', 'number', {min: 0, max: 1});
    Object.freeze(RedParticleBitmapMaterial);
})();