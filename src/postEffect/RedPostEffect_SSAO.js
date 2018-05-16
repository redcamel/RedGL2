"use strict";
var RedPostEffect_SSAO;
(function () {
    var makeProgram;
    /**DOC:
       {
           constructorYn : true,
           title :`RedPostEffect_SSAO`,
           description : `
               RedPostEffect_SSAO Instance 생성.
           `,
           params : {
               redGL : [
                   {type:'RedGL'}
               ]
           },
           return : 'RedPostEffect_SSAO Instance'
       }
   :DOC*/
    RedPostEffect_SSAO = function (redGL) {
        if (!(this instanceof RedPostEffect_SSAO)) return new RedPostEffect_SSAO(redGL);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffect_SSAO : RedGL Instance만 허용됩니다.', redGL)
        this['frameBuffer'] = RedFrameBuffer(redGL);
       
        this['diffuseTexture'] = null;
        this['pointTexture'] = null;


        /////////////////////////////////////////
        // 일반 프로퍼티
        var blurX,blurY ;
        var point;
        blurX = RedPostEffect_BlurX(redGL)
        blurY = RedPostEffect_BlurY(redGL)
        point = RedPostEffect_SSAO_PointMaker(redGL)
        this['process'] = [
          
            blurX,
            blurY
        ]
        Object.defineProperty(this, 'blur', (function () {
            var _v = 1
            return {
                get: function () { return _v },
                set: function (v) {
                    _v = v;
                    blurX['size'] = _v;
                    blurY['size'] = _v;
                }
            }
        })());
        this['blur'] = 3;  

        Object.defineProperty(this, 'factor', (function () {
        
            return {
                get: function () { return point['factor'] },
                set: function (v) {
                    point['factor'] = v;
                }
            }
        })());
        
        Object.defineProperty(this, 'factor2', (function () {
            return {
                get: function () { return point['factor2'] },
                set: function (v) {
                    point['factor2'] = v;
                }
            }
        })());

        this['program'] = makeProgram(this, redGL);
        this['_UUID'] = RedGL['makeUUID']();

        this.updateTexture = function (lastFrameBufferTexture, parentFramBufferTexture) {
            this['diffuseTexture'] = parentFramBufferTexture;
            this['pointTexture'] =  point['frameBuffer']['texture'];
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
                vTime = uTime;
                gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);

            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform sampler2D uDiffuseTexture;      
            uniform sampler2D uPointTexture;   
            
            void main() {
                vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord);
                vec4 pointColor = texture2D(uPointTexture, vTexcoord);  
                         
                gl_FragColor = finalColor * pointColor;
                
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'RedPostEffect_SSAO_Program';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource);
        }
    })();
    RedPostEffect_SSAO.prototype = RedBaseMaterial.prototype;
    Object.freeze(RedPostEffect_SSAO);
})();