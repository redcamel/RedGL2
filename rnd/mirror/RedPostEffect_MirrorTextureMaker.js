"use strict";
var RedPostEffect_MirrorTextureMaker;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedPostEffectMirrorTextureMakerProgram';
    var checked;
    vSource = function () {
        /* @preserve
            // 스키닝
            //#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#

            // Sprite3D
            //#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#

            void main(void) {

                gl_PointSize = uPointSize;

                //#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
			    //#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
			    vVertexPosition = targetMatrix * vec4(aVertexPosition, 1.0);
                vVertexNormal =  ( vec4(aVertexNormal, 1.0)).xyz;;


                //#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(-aVertexPosition, 1.0);
                //#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
                //#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
                //#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2(targetMatrix[0][0],targetMatrix[1][1] * uResolution.x/uResolution.y);
                //#REDGL_DEFINE#sprite3D#true# }
                //#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix * vec4(aVertexPosition, 1.0);


            }
        */
    };
    fSource = function () {
        /* @preserve
         precision mediump float;
         uniform float u_focusLength;
         void main(void) {
             gl_FragColor = vec4(normalize(vVertexNormal), 1.0);
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedPostEffect_MirrorTextureMaker`,
		 description : `
			 피사계 심도 뎁스 처리 재질
			 시스템적으로 사용됨
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 extends : [
		    'RedBasePostEffect',
		    'RedBaseMaterial'
		 ],
		 example : `
			 RedPostEffect_MirrorTextureMaker(RedGL Instance)
		 `,
		 return : 'RedPostEffect_MirrorTextureMaker Instance'
	 }
     :DOC*/
    RedPostEffect_MirrorTextureMaker = function (redGL) {
        if (!(this instanceof RedPostEffect_MirrorTextureMaker)) return new RedPostEffect_MirrorTextureMaker(redGL);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['focusLength'] = 15;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource);
        this['_UUID'] = RedGL.makeUUID();
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this);
    };
    RedPostEffect_MirrorTextureMaker.prototype = new RedBasePostEffect();
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`focusLength`,
		 description : `
			 focusLength
			 기본값 : 15
			 min : 0
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPostEffect_MirrorTextureMaker', 'focusLength', 'number', {'min': 0});
    Object.freeze(RedPostEffect_MirrorTextureMaker)
})();