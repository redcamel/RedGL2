"use strict";
var RedSkyBoxMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedSkyBoxMaterialProgram';
    var checked;
    vSource = function () {
        /* @preserve
         varying vec3 vReflectionCubeCoord;
         void main(void) {
             vReflectionCubeCoord = (uMMatrix *vec4(aVertexPosition, 0.0)).xyz;
             gl_Position = uPMatrix * uCameraMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
         }
         */
    };
    fSource = function () {
        /* @preserve
         precision mediump float;
        // 안개
        //#REDGL_DEFINE#fragmentShareFunc#fogFactor#
        //#REDGL_DEFINE#fragmentShareFunc#fog#

         uniform samplerCube u_skyBoxTexture;
         varying vec3 vReflectionCubeCoord;
         uniform float u_alpha;
         void main(void) {
             vec4 finalColor = textureCube(u_skyBoxTexture, vReflectionCubeCoord);
             //#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
             //#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
             gl_FragColor.a = u_alpha;
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedSkyBoxMaterial`,
		 description : `
			 RedSkyBox Instance 생성시 내부적으로 자동으로 생성됨.
			 시스템적으로 사용됨.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 skyBoxTexture : [
				 {type:'RedBitmapCubeTexture'}
			 ],
			 alpha : [
			    {type:Number},
			    '기본값 : 1',
			    '범위 : 0 ~ 1'
			 ]
		 },
		 extends : [
		    'RedBaseMaterial'
		 ],
		 return : 'RedSkyBoxMaterial Instance'
	 }
     :DOC*/
    RedSkyBoxMaterial = function (redGL, skyBoxTexture, alpha) {
        if (!(this instanceof RedSkyBoxMaterial)) return new RedSkyBoxMaterial(redGL, skyBoxTexture, alpha);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedSkyBoxMaterial : RedGL Instance만 허용.', redGL);
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['skyBoxTexture'] = skyBoxTexture;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['_UUID'] = RedGL.makeUUID();
        this['alpha'] = alpha == undefined ? 1 : alpha;
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this);
    };
    RedSkyBoxMaterial.prototype = new RedBaseMaterial();
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`skyBoxTexture`,
		 description :`skyBoxTexture`,
		 return : 'RedBitmapCubeTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedSkyBoxMaterial', 'skyBoxTexture', 'samplerCube', {essential: true});
    RedDefinePropertyInfo.definePrototype('RedSkyBoxMaterial', 'alpha', 'number', {min: 0, max: 1});
    Object.freeze(RedSkyBoxMaterial)
})();