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
        this['ssaoTexture'] = null;

        /////////////////////////////////////////
        // 일반 프로퍼티
        var point;

        point = RedPostEffect_SSAO_PointMaker(redGL)
      
        this['process'] = [
            point
        ]
      
        this['mode'] = RedPostEffect_SSAO.COLOR_SSAO
       
        Object.defineProperty(this, 'blur', (function () {
            var _v = 1
            return {
                get: function () {
                    return _v
                },
                set: function (v) {
                    _v = v;
                    point['subFrameBufferInfo']['process'][0]['size'] = _v;
                    point['subFrameBufferInfo']['process'][1]['size'] = _v;
                }
            }
        })());
        this['blur'] = 5
       
        Object.defineProperty(this, 'range', (function () {

            return {
                get: function () {
                    return point['range']
                },
                set: function (v) {
                    point['range'] = v;
                }
            }
        })());
        this['range'] = 15
        Object.defineProperty(this, 'factor2', (function () {
            return {
                get: function () {
                    return point['factor2']
                },
                set: function (v) {
                    point['factor2'] = v;
                }
            }
        })());
        this['factor2'] = 0.4

        this['program'] = makeProgram(this, redGL);
        this['_UUID'] = RedGL['makeUUID']();

        this.updateTexture = function (lastFrameBufferTexture, parentFramBufferTexture) {
            this['diffuseTexture'] = parentFramBufferTexture;
            this['ssaoTexture'] = lastFrameBufferTexture;
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
            uniform sampler2D uSsaoTexture;   
            uniform float uMode;
            void main() {
                vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord);
                vec4 ssaoColor = texture2D(uSsaoTexture, vTexcoord);  
                if(uMode == 0.0) gl_FragColor = ssaoColor;
                else if(uMode == 1.0) gl_FragColor = finalColor;
                else if(uMode == 2.0) {
                    finalColor.rgb *= ssaoColor.r;
                    gl_FragColor = finalColor;
                };
                
                
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
    RedPostEffect_SSAO['ONLY_SSAO'] = 0
    RedPostEffect_SSAO['ONLY_COLOR'] = 1
    RedPostEffect_SSAO['COLOR_SSAO'] = 2
    RedPostEffect_SSAO.prototype = RedBaseMaterial.prototype;
    Object.freeze(RedPostEffect_SSAO);
})();