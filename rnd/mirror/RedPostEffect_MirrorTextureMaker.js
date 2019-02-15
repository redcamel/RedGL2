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
                vVertexNormal = aVertexNormal;
                //#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
			    //#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;

                //#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
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

    Object.freeze(RedPostEffect_MirrorTextureMaker)
})();