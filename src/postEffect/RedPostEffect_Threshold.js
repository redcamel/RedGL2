"use strict";
var RedPostEffect_Threshold;
(function () {
    var makeProgram;
    /**DOC:
       {
           constructorYn : true,
           title :`RedPostEffect_Threshold`,
           description : `
               RedPostEffect_Threshold Instance 생성.
           `,
           params : {
               redGL : [
                   {type:'RedGL'}
               ]
           },
           return : 'RedPostEffect_Threshold Instance'
       }
   :DOC*/
    RedPostEffect_Threshold = function (redGL) {
        if (!(this instanceof RedPostEffect_Threshold)) return new RedPostEffect_Threshold(redGL);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffect_Threshold : RedGL Instance만 허용됩니다.', redGL);
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(this, redGL);
        this['_UUID'] = RedGL['makeUUID']();
        /**DOC:
           {
               title :`threshold`,
               description : `
                   최소 유효값
                   기본값 : 0.24
               `,
               return : 'Number'
           }
       :DOC*/
        this['threshold'] = 0.24;
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
                gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision highp float;
            uniform sampler2D uDiffuseTexture;     
            uniform float uThreshold;
            void main() {
                vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord);
                float v;
                if(0.2126 * finalColor.r + 0.7152 * finalColor.g + 0.0722 * finalColor.b >= uThreshold) v = 1.0;
                else v = 0.0;
                finalColor.r = finalColor.g = finalColor.b = v;
                gl_FragColor = finalColor;          
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'RedPostEffect_Threshold_Program';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource);
        }
    })();
    RedPostEffect_Threshold.prototype = RedBaseMaterial.prototype;
    Object.freeze(RedPostEffect_Threshold);
})();