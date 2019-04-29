/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var RedTextMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedTextMaterialProgram';
    var PROGRAM_OPTION_LIST = [];
    var checked;
    vSource = function () {
        /* @preserve
            // Sprite3D
            //#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
            const mat4 c3dScale = mat4(
                1.0/1024.0, 0.0, 0.0, 0.0,
                0.0, 1.0/1024.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0
            );

            uniform float u_width;
            uniform float u_height;

            void main(void) {
                gl_PointSize = uPointSize;

                vTexcoord = aTexcoord;

                // position 계산
                mat4 targetMatrix;
                if(uOrthographicYn){
                      targetMatrix = uMMatrix * mat4(
                        u_width, 0.0, 0.0, 0.0,
                        0.0, u_height, 0.0, 0.0,
                        0.0, 0.0, 1.0, 0.0,
                        0.0, 0.0, 0.0, 1.0
                    ) ;
                    gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);
                }else{
                    targetMatrix = uMMatrix * mat4(
                        u_width/uResolution.y, 0.0, 0.0, 0.0,
                        0.0, u_height/uResolution.y, 0.0, 0.0,
                        0.0, 0.0, 1.0, 0.0,
                        0.0, 0.0, 0.0, 1.0
                    ) ;
                    //#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
                    //#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
                    //#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
                    //#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
                    //#REDGL_DEFINE#sprite3D#true# }
                    //#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);
                }


                //#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
                //#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter  *  uDirectionalShadowLightMatrix * targetMatrix * vec4(aVertexPosition, 1.0);
            }
         */
    };
    fSource = function () {
        /* @preserve
         precision mediump float;
        // 안개
        //#REDGL_DEFINE#fragmentShareFunc#fogFactor#
        //#REDGL_DEFINE#fragmentShareFunc#fog#

        // 그림자
        //#REDGL_DEFINE#fragmentShareFunc#decodeFloatShadow#
        //#REDGL_DEFINE#fragmentShareFunc#getShadowColor#

         uniform sampler2D u_diffuseTexture;
         uniform float u_alpha;

         void main(void) {
             vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
             finalColor.a *= u_alpha;
             if(finalColor.a == 0.0) discard;

             //#REDGL_DEFINE#directionalShadow#true# finalColor.rgb *= getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture);
             //#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
             //#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedTextMaterial`,
		 description : `
			 RedTextMaterial Instance 생성자.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 diffuseTexture : [
				 {type:'RedBitmapTexture'}
			 ]
		 },
		 extends : ['RedBaseMaterial'],
		 demo : '../example/material/RedTextMaterial.html',
		 example : `
			 RedTextMaterial( RedGL Instance, RedBitmapTexture(RedGL Instance, src) )
		 `,
		 return : 'RedTextMaterial Instance'
	 }
     :DOC*/
    RedTextMaterial = function (redGL, diffuseTexture) {
        if (!(this instanceof RedTextMaterial)) return new RedTextMaterial(redGL, diffuseTexture);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedTextMaterial : RedGL Instance만 허용.', redGL);
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['diffuseTexture'] = diffuseTexture;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['alpha'] = 1;
        this['width'] = 2;
        this['height'] = 2;
        this['_UUID'] = RedGL.makeUUID();
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this);
    };
    RedTextMaterial.prototype = new RedBaseMaterial();
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`diffuseTexture`,
		 description : `diffuseTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedTextMaterial', 'diffuseTexture', 'sampler2D', {essential: true});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedTextMaterial', 'alpha', 'number', {min: 0, max: 1});
    RedDefinePropertyInfo.definePrototype('RedTextMaterial', 'width', 'number', {
        min: 2,
        callback: function (v) {
            this['_width'] = v;
        }
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`height`,
		 description : `세로영역크기`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedTextMaterial', 'height', 'number', {
        min: 2,
        callback: function (v) {
            this['_height'] = v;
        }
    });
    Object.freeze(RedTextMaterial);
})();