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
         void main(void) {
            //#REDGL_DEFINE#skin#true# gl_Position =  uDirectionalShadowLightMatrix *  uMMatrix * getSkinMatrix() * vec4(aVertexPosition, 1.0);
            //#REDGL_DEFINE#skin#false# gl_Position =  uDirectionalShadowLightMatrix *  uMMatrix * vec4(aVertexPosition, 1.0);
         }
         */
    };
    fSource = function () {
        /* @preserve
        precision mediump float;
        vec4 encodeFloat (float depth) {
            const vec4 cBitShift = vec4(
                256 * 256 * 256,
                256 * 256,
                256,
                1.0
            );
            const vec4 cBitMask = vec4(
                0,
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
            if(finalColor.a < 0.5) finalColor = vec4(0.0, 0.0, 0.0, 1.0);
            gl_FragColor = finalColor;
        }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedDirectionalShadowMaterial`,
		 description : `
			 RedDirectionalShadowMaterial Instance 생성
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
			 RedDirectionalShadowMaterial(RedGL Instance, RedBitmapTexture(RedGL Instance, src))
		 `,
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