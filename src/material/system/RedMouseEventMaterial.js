"use strict";
var RedMouseEventMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedMouseEventMaterialProgram';
    var checked;
    vSource = function () {
        /* @preserve
        // 스키닝
        //#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#

        // Sprite3D
        //#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
        void main(void) {
            gl_PointSize = uPointSize;

            // position 계산
            //#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
            //#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;

            //#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
            //#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
            //#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
            //#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2(targetMatrix[0][0],targetMatrix[1][1] * uResolution.x/uResolution.y);
            //#REDGL_DEFINE#sprite3D#true# }
            //#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);

        }
         */
    };
    fSource = function () {
        /* @preserve
        precision mediump float;
        uniform vec4 uColor;
        void main(void) {
            gl_FragColor = uColor / 255.0;
        }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedMouseEventMaterial`,
		 description : `
			 RedMouseEventMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 extends : [
		    'RedBaseMaterial'
		 ],
		 example : `
			 RedMouseEventMaterial(RedGL Instance, RedBitmapTexture(RedGL Instance, src))
		 `,
		 return : 'RedMouseEventMaterial Instance'
	 }
     :DOC*/
    RedMouseEventMaterial = function (redGL) {
        if (!(this instanceof RedMouseEventMaterial)) return new RedMouseEventMaterial(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedMouseEventMaterial : RedGL Instance만 허용.', redGL);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['_RedMouseEventMaterialYn'] = true;
        this['color'] = null
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource);
        this['_UUID'] = RedGL.makeUUID();
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this);
    };
    RedMouseEventMaterial.prototype = new RedBaseMaterial();
    Object.freeze(RedMouseEventMaterial)
})();