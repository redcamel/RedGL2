"use strict";
var RedPostEffectMirrorNormal;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedPostEffectMirrorNormalProgram';
    var checked;
    vSource = function () {
        /* @preserve
            // 스키닝
            //#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#

            // Sprite3D
            //#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#

            varying vec4 vVertexPosition2;
            void main(void) {
                gl_PointSize = uPointSize;

                //#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
			    //#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
			    vVertexPosition = uPMatrix * uCameraMatrix * targetMatrix * vec4(aVertexPosition, 1.0);
			    vVertexPosition2 =uPMatrix * uCameraMatrix * targetMatrix * vec4(vec3(aVertexPosition.x,-aVertexPosition.y,aVertexPosition.z), 1.0);
                vVertexNormal = (vec3(aVertexNormal.x,-aVertexNormal.y,aVertexNormal.z) ).xyz;;
                vResolution = uResolution;




                //#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(-aVertexPosition, 1.0);
                //#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
                //#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
                //#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2(targetMatrix[0][0],targetMatrix[1][1] * uResolution.x/uResolution.y);
                //#REDGL_DEFINE#sprite3D#true# }

                //#REDGL_DEFINE#sprite3D#false# gl_Position =  uPMatrix *  uCameraMatrix * targetMatrix * vec4(vec3(aVertexPosition.x,-aVertexPosition.y,aVertexPosition.z), 1.0);
            }
        */
    };
    fSource = function () {
        /* @preserve
         precision mediump float;
         uniform float u_focusLength;
         varying vec4 vVertexPosition2;
         vec2 viewSpaceToScreenSpaceTexCoord(vec3 p) {
  vec4 projectedPos = vec4(p, 1.0);
  vec2 ndcPos = projectedPos.xy / projectedPos.w; //normalized device coordinates
  vec2 coord = ndcPos ;
  return coord;
}

         void main(void) {
            if(length(vVertexNormal.xz) == 0.0) discard;


             // gl_FragColor = vec4 (vVertexNormal,1.0 );
             vec2 test = vVertexPosition.xy/vVertexPosition.w;
             test.x = test.x* 0.5 + 0.5;
             test.y = test.y* 0.5 + 0.5;
             if(test.y>1.0) discard;
            gl_FragColor = vec4 (vVertexNormal,1.0);
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedPostEffectMirrorNormal`,
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
			 RedPostEffectMirrorNormal(RedGL Instance)
		 `,
		 return : 'RedPostEffectMirrorNormal Instance'
	 }
     :DOC*/
    RedPostEffectMirrorNormal = function (redGL) {
        if (!(this instanceof RedPostEffectMirrorNormal)) return new RedPostEffectMirrorNormal(redGL);
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
    RedPostEffectMirrorNormal.prototype = new RedBasePostEffect();
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
    RedDefinePropertyInfo.definePrototype('RedPostEffectMirrorNormal', 'focusLength', 'number', {'min': 0});
    Object.freeze(RedPostEffectMirrorNormal)
})();