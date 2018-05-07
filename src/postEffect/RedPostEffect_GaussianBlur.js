"use strict";
var RedPostEffect_GaussianBlur;
(function () {
    var makeProgram;
    /**DOC:
       {
           constructorYn : true,
           title :`RedPostEffect_GaussianBlur`,
           description : `
               RedPostEffect_GaussianBlur Instance 생성.
           `,
           params : {
               redGL : [
                   {type:'RedGL'}
               ]
           },
           return : 'RedPostEffect_GaussianBlur Instance'
       }
   :DOC*/
    RedPostEffect_GaussianBlur = function (redGL) {
        if (!(this instanceof RedPostEffect_GaussianBlur)) return new RedPostEffect_GaussianBlur(redGL);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffect_GaussianBlur : RedGL Instance만 허용됩니다.', redGL)
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(this, redGL);
        this['_UUID'] = RedGL['makeUUID']();
        this['process'] = [
            RedPostEffect_BlurX(redGL),
            RedPostEffect_BlurY(redGL)
        ];
        /**DOC:
           {
               title :`radius`,
               description : `
                   가우시간 블러강도
                   기본값 : 20
               `,
               return : 'Number'
           }
       :DOC*/
        Object.defineProperty(this, 'radius', (function () {
            var _v = 1
            return {
                get: function () { return _v },
                set: function (v) {
                    _v = v;
                    this['process'][0]['size'] = _v;
                    this['process'][1]['size'] = _v;
                }
            }
        })());
        this['radius'] = 20;
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
            precision mediump float;
            uniform sampler2D uDiffuseTexture;     
            
            void main() {
                vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord);
                gl_FragColor = finalColor ;
          
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'RedPostEffect_GaussianBlur_Program';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource);
        }
    })();
    RedPostEffect_GaussianBlur.prototype = RedBaseMaterial.prototype;
    Object.freeze(RedPostEffect_GaussianBlur);
})();