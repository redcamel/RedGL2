"use strict";
//TODO: 좀더 정리해야함
var RedPostEffect_BrightnessContrast;
(function () {
    var makeProgram;

    RedPostEffect_BrightnessContrast = function (redGL) {
        if (!(this instanceof RedPostEffect_BrightnessContrast)) return new RedPostEffect_BrightnessContrast(redGL);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffect_BrightnessContrast : RedGL Instance만 허용됩니다.', redGL)
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        this['brightness'] = 0;
        this['contrast'] = 0;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(this, redGL);
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        // Object.seal(this)
        console.log(this)
        this.updateTexture = function (lastFrameBufferTexture) {
            this['diffuseTexture'] = lastFrameBufferTexture
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
            uniform float uBrightness;
            uniform float uContrast;            
            void main(void) {
                vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord );
                finalColor.rgb += uBrightness;
                if (uContrast > 0.0) finalColor.rgb = (finalColor.rgb - 0.5) / (1.0 - uContrast) + 0.5;
                else finalColor.rgb = (finalColor.rgb - 0.5) * (1.0 + uContrast) + 0.5;
                gl_FragColor = finalColor;
                    
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'RedPostEffect_BrightnessContrast_Program';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })();
    RedPostEffect_BrightnessContrast.prototype = RedBaseMaterial.prototype
    RedPostEffect_BrightnessContrast['NORMAL'] = [
        0, 0, 0,
        0, 1, 0,
        0, 0, 0
    ]
    RedPostEffect_BrightnessContrast['SHARPEN'] = [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0

    ]
    RedPostEffect_BrightnessContrast['BLUR'] = [
        1, 1, 1,
        1, 1, 1,
        1, 1, 1
    ]
    RedPostEffect_BrightnessContrast['EDGE'] = [
        0, 1, 0,
        1, -4, 1,
        0, 1, 0
    ]
    RedPostEffect_BrightnessContrast['EMBOSS'] = [
        -2, -1, 0,
        -1, 1, 1,
        0, 1, 2
    ]
    Object.freeze(RedPostEffect_BrightnessContrast)
})();