"use strict";
var RedPostEffect_DoF_DepthMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedPostEffectDoFdepthProgram';
    var checked;
    vSource = function () {
        /* @preserve
         mat4 calSprite3D(mat4 cameraMTX, mat4 mvMatrix){
             mat4 cacheScale = mat4(
                 mvMatrix[0][0], 0.0, 0.0, 0.0,
                 0.0, mvMatrix[1][1], 0.0, 0.0,
                 0.0, 0.0, 1.0, mvMatrix[2][2],
                 0.0, 0.0, 0.0, 1.0
             );
             mat4 tMTX = cameraMTX * mvMatrix;
             tMTX[0][0] = 1.0, tMTX[0][1] = 0.0, tMTX[0][2] = 0.0,
             tMTX[1][0] = 0.0, tMTX[1][1] = 1.0, tMTX[1][2] = 0.0,
             tMTX[2][0] = 0.0, tMTX[2][1] = 0.0, tMTX[2][2] = 1.0;
             return tMTX * cacheScale;
         }
         void main(void) {
            gl_PointSize = uPointSize;
            vec4 tPosition;
            //#REDGL_DEFINE#skin#true# mat4 skinMat =
            //#REDGL_DEFINE#skin#true# aVertexWeight.x * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.x) ] * uInverseBindMatrixForJoint[int(aVertexJoint.x)]+
            //#REDGL_DEFINE#skin#true# aVertexWeight.y * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.y) ] * uInverseBindMatrixForJoint[int(aVertexJoint.y)]+
            //#REDGL_DEFINE#skin#true# aVertexWeight.z * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.z) ] * uInverseBindMatrixForJoint[int(aVertexJoint.z)]+
            //#REDGL_DEFINE#skin#true# aVertexWeight.w * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.w) ] * uInverseBindMatrixForJoint[int(aVertexJoint.w)];
            //#REDGL_DEFINE#skin#true# tPosition = uMMatrix * skinMat * vec4(aVertexPosition, 1.0);
            //#REDGL_DEFINE#skin#false# tPosition = uMMatrix * vec4(aVertexPosition, 1.0);

            //#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * calSprite3D(uCameraMatrix , uMMatrix) *  vec4(aVertexPosition, 1.0);
            //#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
            //#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
            //#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2(uMMatrix[0][0],uMMatrix[1][1] * uResolution.x/uResolution.y);
            //#REDGL_DEFINE#sprite3D#true# }
            //#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * tPosition;
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