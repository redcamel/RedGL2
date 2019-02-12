"use strict";
var RedParticleMaterial;
//////////////////////////////////////////////////////////
// 연구중
//////////////////////////////////////////////////////////
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'particleProgram';
    var PROGRAM_OPTION_LIST = ['diffuseTexture','usePreMultiply'];

    var checked;
    vSource = function () {
        /* @preserve
         const mat4 cOrtho = mat4(
                0.5, 0.0, 0.0, 0.0,
                0.0, 0.5, 0.0, 0.0,
                0.0, 0.0, 0.5, 0.0,
                0.0, 0.0, 0.0, 1.0
        );
         void main(void) {
            if(uOrthographicYn){

                gl_Position = uPMatrix * uCameraMatrix * cOrtho * uMMatrix * vec4(aVertexPosition.x, -aVertexPosition.y, aVertexPosition.z, 1.0);
                gl_PointSize = abs(aPointSize)/gl_Position.w;
            }else {
                gl_Position = uPMatrix * uCameraMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
                gl_PointSize = abs(aPointSize)/gl_Position.w * uResolution.y;
            }
            vVertexColor = aVertexColor;
         }
         */
    };
    fSource = function () {
        /* @preserve
         precision mediump float;
        // 안개
        //#REDGL_DEFINE#fragmentShareFunc#fogFactor#
        //#REDGL_DEFINE#fragmentShareFunc#fog#

         //#REDGL_DEFINE#diffuseTexture# uniform sampler2D u_diffuseTexture;
         uniform float u_cutOff;
         uniform float u_alpha;
         void main(void) {
             vec4 finalColor = vVertexColor;
             //#REDGL_DEFINE#diffuseTexture# finalColor = texture2D(u_diffuseTexture, gl_PointCoord.xy);
             //#REDGL_DEFINE#diffuseTexture# //#REDGL_DEFINE#usePreMultiply# finalColor.rgb *= finalColor.a;
             //#REDGL_DEFINE#diffuseTexture# finalColor.rgb += vVertexColor.rgb * vVertexColor.a;
             //#REDGL_DEFINE#diffuseTexture# finalColor.a *= vVertexColor.a;
             finalColor.a *= u_alpha;
             //#REDGL_DEFINE#diffuseTexture# if(finalColor.a < u_cutOff) discard;

             //#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
             //#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedParticleMaterial`,
		 description : `
			 RedParticleMaterial Instance 생성
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
		 return : 'RedParticleMaterial Instance'
	 }
     :DOC*/
    RedParticleMaterial = function (redGL, diffuseTexture) {
        if (!(this instanceof RedParticleMaterial)) return new RedParticleMaterial(redGL, diffuseTexture);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedParticleMaterial : RedGL Instance만 허용.', redGL);
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['diffuseTexture'] = diffuseTexture;
        this['alpha'] = 1;
        this['cutOff'] = 0;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['usePreMultiply'] = true
        this['_UUID'] = RedGL.makeUUID();
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this)
    };
    var samplerOption = {
        callback: function () {
            this._searchProgram(PROGRAM_NAME, PROGRAM_OPTION_LIST)
        }
    };
    RedParticleMaterial.prototype = new RedBaseMaterial();
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`diffuseTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedParticleMaterial', 'diffuseTexture', 'sampler2D', {
        callback: function () {
            this._searchProgram(PROGRAM_NAME, PROGRAM_OPTION_LIST)
        }
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedParticleMaterial', 'alpha', 'number', {min: 0, max: 1});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`cutOff`,
		 description : `기본값 : 0.01`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedParticleMaterial', 'cutOff', 'number', {min: 0, max: 1});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`usePreMultiply`,
		 description : `
		    usePreMultiply 사용여부
		    기본값 : true
		 `,
		 return : 'boolean'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedParticleMaterial', 'usePreMultiply', 'boolean', samplerOption);
    Object.freeze(RedParticleMaterial);
})();