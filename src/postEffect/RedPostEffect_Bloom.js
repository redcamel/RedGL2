"use strict";
var RedPostEffect_Bloom;
(function () {
    var makeProgram;

    RedPostEffect_Bloom = function (redGL) {
        if (!(this instanceof RedPostEffect_Bloom)) return new RedPostEffect_Bloom(redGL);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffect_Bloom : RedGL Instance만 허용됩니다.', redGL)
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        this['blurTexture'] = null;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(this, redGL);
        this['_UUID'] = RedGL['makeUUID']();

        // Object.seal(this)
        console.log(this)

        this['filter'] = [
            RedPostEffect_BlurX(redGL),
            RedPostEffect_BlurY(redGL)
        ]

        Object.defineProperty(this, 'blur', (function () {
            var _v = 1
            return {
                get: function () {
                    return _v
                },
                set: function (v) {
                    _v = v
                    this['filter'][0]['radius'] = _v
                    this['filter'][1]['radius'] = _v
                }
            }
        })())
        this['blur'] = 20
        this['exposure'] = 1
        this['bloomStrength'] = 1
        
        this.checkProperty()
        this.updateTexture = function (lastFrameBufferTexture, parentFramBufferTexture) {
            this['diffuseTexture'] = parentFramBufferTexture;
            this['blurTexture'] = lastFrameBufferTexture;
        }
        this.bind = function (gl) {
            this['frameBuffer'].bind(gl);
        }
        this.unbind = function (gl) {
            this['frameBuffer'].unbind(gl);
        }
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
            uniform sampler2D uBlurTexture;         
            uniform float uExposure;            
            uniform float uBloomStrength;            
            
            void main() {
                vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord);
                vec4 blurColor = texture2D(uBlurTexture, vTexcoord);
                gl_FragColor = (finalColor  + blurColor * uBloomStrength) * uExposure ;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'RedPostEffect_Bloom_Program';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })();
    RedPostEffect_Bloom.prototype = RedBaseMaterial.prototype
    Object.freeze(RedPostEffect_Bloom)
})();