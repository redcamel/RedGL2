"use strict";
var RedPostEffect_DoF_DepthMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedPostEffectDoFdepthProgram';
    var checked;
    vSource = function () {
        /* @preserve
            //#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
            // 스키닝
            //#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#
            void main(void) {
                gl_PointSize = uPointSize;

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
         uniform float u_focusLength;
         void main(void) {
             float depth = 1.0 - gl_FragCoord.z / gl_FragCoord.w / u_focusLength;
             gl_FragColor = vec4(depth, depth, depth, 1.0);
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedPostEffect_DoF_DepthMaterial`,
		 description : `
			 RedPostEffect_DoF_DepthMaterial Instance 생성
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
			 RedPostEffect_DoF_DepthMaterial(RedGL Instance)
		 `,
		 return : 'RedPostEffect_DoF_DepthMaterial Instance'
	 }
     :DOC*/
    RedPostEffect_DoF_DepthMaterial = function (redGL) {
        if (!(this instanceof RedPostEffect_DoF_DepthMaterial)) return new RedPostEffect_DoF_DepthMaterial(redGL);
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
    RedPostEffect_DoF_DepthMaterial.prototype = new RedBasePostEffect();
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`focusLength`,
		 description : `
			 focusLength
			 기본값 : 15
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPostEffect_DoF_DepthMaterial', 'focusLength', 'number', {'min': 0});
    Object.freeze(RedPostEffect_DoF_DepthMaterial)
})();