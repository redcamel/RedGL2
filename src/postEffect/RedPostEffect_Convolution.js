"use strict";
//TODO: 좀더 정리해야함
var RedPostEffect_Convolution;
(function () {
    var makeProgram;

    RedPostEffect_Convolution = function (redGL, kernel) {
        if (!(this instanceof RedPostEffect_Convolution)) return new RedPostEffect_Convolution(redGL, kernel);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffect_Convolution : RedGL Instance만 허용됩니다.', redGL)
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        this['kernel'] = kernel;
        Object.defineProperty(this, 'kernelWeight', {
            get: function () {
                var sum = 0
                for (var k in this['kernel']) sum += this['kernel'][k]

                return sum
            }
        });
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(this, redGL);
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        // Object.seal(this)
        console.log(this)

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
                vResolution = uResolution;
                gl_Position = uPMatrix * uCameraMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform sampler2D uDiffuseTexture;    
            uniform mat3 uKernel;  
            uniform float uKernelWeight;  
            
            void main(void) {
                vec2 perPX = vec2(1.0/vResolution.x, 1.0/vResolution.y);
                vec4 finalColor = vec4(0.0);              
                finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2(-1.0, -1.0)) * uKernel[0][0] ; 
                finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2( 0.0, -1.0)) * uKernel[0][1] ;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2( 1.0, -1.0)) * uKernel[0][2] ;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2(-1.0,  0.0)) * uKernel[1][0] ;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2( 0.0,  0.0)) * uKernel[1][1] ;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2( 1.0,  0.0)) * uKernel[1][2] ;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2(-1.0,  1.0)) * uKernel[2][0] ;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2( 0.0,  1.0)) * uKernel[2][1] ;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2( 1.0,  1.0)) * uKernel[2][2] ;
                highp float weight;
                weight = uKernelWeight;
                if (0.01 > weight) {
                        weight = 1.0;
                }

                gl_FragColor = vec4((finalColor / uKernelWeight).rgb, 1.0);
                
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'RedPostEffect_Convolution_Program';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })();
    RedPostEffect_Convolution.prototype = RedBaseMaterial.prototype
    RedPostEffect_Convolution['NORMAL'] = [
        0, 0, 0,
        0, 1, 0,
        0, 0, 0
    ]
    RedPostEffect_Convolution['SHARPEN'] = [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0

    ]
    RedPostEffect_Convolution['BLUR'] = [
        1, 1, 1,
        1, 1, 1,
        1, 1, 1
    ]
    RedPostEffect_Convolution['EDGE'] = [
        0, 1, 0,
        1, -4, 1,
        0, 1, 0
    ]
    RedPostEffect_Convolution['EMBOSS'] = [
        -2, -1, 0,
        -1, 1, 1,
        0, 1, 2
    ]
    Object.freeze(RedPostEffect_Convolution)
})();