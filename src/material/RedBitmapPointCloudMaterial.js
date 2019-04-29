/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var RedBitmapPointCloudMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'bitmapPointCloudProgram';
    var PROGRAM_OPTION_LIST = ['usePreMultiply'];

    var checked;
    vSource = function () {
        /* @preserve

         void main(void) {
            if(uOrthographicYn){

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

         uniform sampler2D u_diffuseTexture;
         uniform float u_cutOff;
         uniform float u_alpha;
         void main(void) {
             vec4 finalColor = texture2D(u_diffuseTexture, gl_PointCoord.xy);
             //#REDGL_DEFINE#usePreMultiply# finalColor.rgb *= finalColor.a;
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
		 title :`RedBitmapPointCloudMaterial`,
		 description : `
			 RedBitmapPointCloudMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 diffuseTexture : [
				 {type:'RedBitmapTexture'}
			 ]
		 },
		 demo : '../example/material/RedBitmapPointCloudMaterial.html',
		 extends : ['RedBaseMaterial'],
		 example : `
		     RedBitmapPointCloudMaterial(RedGL Instance, RedBitmapTexture(RedGL Instance, src));
		 `,
		 return : 'RedBitmapPointCloudMaterial Instance'
	 }
     :DOC*/
    RedBitmapPointCloudMaterial = function (redGL, diffuseTexture) {
        if (!(this instanceof RedBitmapPointCloudMaterial)) return new RedBitmapPointCloudMaterial(redGL, diffuseTexture);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedBitmapPointCloudMaterial : RedGL Instance만 허용.', redGL);
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['diffuseTexture'] = diffuseTexture;
        this['alpha'] = 1;
        this['cutOff'] = 0.1;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['usePreMultiply'] = false;
        this['_UUID'] = RedGL.makeUUID();
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this)
    };
    RedBitmapPointCloudMaterial.prototype = new RedBaseMaterial();
    var samplerOption = {
        callback: function () {
            this._searchProgram(PROGRAM_NAME, PROGRAM_OPTION_LIST)
        }
    };
    /**DOC:
     {
 	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedBitmapPointCloudMaterial', 'alpha', 'number', {min: 0, max: 1});
    /**DOC:
     {
 	     code : 'PROPERTY',
		 title :`cutOff`,
		 description : `
		 기본값 : 0.1
		 해당값보다 알파값이 작을경우 discard 처리됨.
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedBitmapPointCloudMaterial', 'cutOff', 'number', {min: 0, max: 1});
    /**DOC:
     {
 	     code : 'PROPERTY',
		 title :`diffuseTexture`,
		 description : `diffuseTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedBitmapPointCloudMaterial', 'diffuseTexture', 'sampler2D', {essential: true});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`usePreMultiply`,
		 description : `
		    usePreMultiply 사용여부
		    기본값 : false
		 `,
		 return : 'boolean'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedBitmapPointCloudMaterial', 'usePreMultiply', 'boolean', samplerOption);
    Object.freeze(RedBitmapPointCloudMaterial)
})();