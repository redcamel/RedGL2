"use strict";
var RedPostEffect_Pixelize;
(function () {
    var makeProgram;
    /**DOC:
       {
           constructorYn : true,
           title :`RedPostEffect_Pixelize`,
           description : `
               RedPostEffect_Pixelize Instance 생성.
           `,
           params : {
               redGL : [
                   {type:'RedGL'}
               ]
           },
           return : 'RedPostEffect_Pixelize Instance'
       }
   :DOC*/
    RedPostEffect_Pixelize = function (redGL) {
        if (!(this instanceof RedPostEffect_Pixelize)) return new RedPostEffect_Pixelize(redGL);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffect_Pixelize : RedGL Instance만 허용됩니다.', redGL);
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        /**DOC:
           {
               title :`width`,
               description : `
                   픽셀화 가로 크기
                   기본값 : 5
               `,
               return : 'Number'
           }
       :DOC*/
        this['width'] = 5;
        /**DOC:
           {
               title :`height`,
               description : `
                   픽셀화 세로 크기
                   기본값 : 5
               `,
               return : 'Number'
           }
       :DOC*/
        this['height'] = 5;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(this, redGL);
        this['_UUID'] = RedGL['makeUUID']();
        this.updateTexture = function (lastFrameBufferTexture) {
            this['diffuseTexture'] = lastFrameBufferTexture;
        }
        this['bind'] = RedPostEffectManager.prototype['bind'];
        this['unbind'] = RedPostEffectManager.prototype['unbind'];
        this.checkProperty();
        console.log(this);
    }
    makeProgram = (function () {
        var vSource, fSource;
        var PROGRAM_NAME;
        vSource = function () {
            /*
            void main(void) {
                vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
                vResolution = uResolution;
                gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform sampler2D uDiffuseTexture;
            uniform float uWidth;
            uniform float uHeight;
            void main(void) {
               vec4 finalColor;
               float dx = 1.0/vResolution.x * uWidth;
               float dy = 1.0/vResolution.y * uHeight;
               vec2 coord = vec2(
                    dx * (floor(vTexcoord.x / dx) + 0.5),
                    dy * (floor(vTexcoord.y / dy) + 0.5)
                );
                finalColor = texture2D(uDiffuseTexture, coord);
                gl_FragColor = finalColor;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'RedPostEffect_Pixelize_Program';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource);
        }
    })();
    RedPostEffect_Pixelize.prototype = RedBaseMaterial.prototype;
    Object.freeze(RedPostEffect_Pixelize);
})();