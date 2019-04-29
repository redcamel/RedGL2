/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var RedDirectionalShadowMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedDirectionalShadowMaterialProgram';
    var checked;
    vSource = function () {
        /* @preserve
        // 스키닝
        //#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#

        // Sprite3D
        //#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
         void main(void) {
            // position 계산
            //#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
            //#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;

            //#REDGL_DEFINE#sprite3D#true# gl_Position = getSprite3DMatrix(uDirectionalShadowLightMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
            //#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
            //#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
            //#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
            //#REDGL_DEFINE#sprite3D#true# }
            //#REDGL_DEFINE#sprite3D#false# gl_Position = uDirectionalShadowLightMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);

         }
         */
    };
    fSource = function () {
        /* @preserve
        precision mediump float;
        vec4 encodeFloat (float depth) {
            const vec4 cBitShift = vec4(
                256.0 * 256.0 * 256.0,
                256.0 * 256.0,
                256.0,
                1.0
            );
            const vec4 cBitMask = vec4(
                0.0,
                1.0 / 256.0,
                1.0 / 256.0,
                1.0 / 256.0
            );
            vec4 comp = fract(depth * cBitShift);
            comp -= comp.xxyz * cBitMask;
            return comp;
        }
        void main(void) {
            vec4 finalColor = encodeFloat(gl_FragCoord.z);
            // if(finalColor.a < 0.5) finalColor = vec4(0.0, 0.0, 0.0, 1.0);
            gl_FragColor = finalColor;
        }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedDirectionalShadowMaterial`,
		 description : `
			 RedDirectionalShadow 의 뎁스를 생성하기 위한 재질
			 시스템적으로 사용됨
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 extends : ['RedBaseMaterial'],
		 return : 'RedDirectionalShadowMaterial Instance'
	 }
     :DOC*/
    RedDirectionalShadowMaterial = function (redGL) {
        if (!(this instanceof RedDirectionalShadowMaterial)) return new RedDirectionalShadowMaterial(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedDirectionalShadowMaterial : RedGL Instance만 허용.', redGL);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['_RedDirectionalShadowYn'] = true;
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource);
        this['_UUID'] = RedGL.makeUUID();
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this);
    };
    RedDirectionalShadowMaterial.prototype = new RedBaseMaterial();
    Object.freeze(RedDirectionalShadowMaterial)
})();