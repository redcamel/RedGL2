"use strict";
var RedPostEffect_Blur;
(function () {
    var makeProgram;

    RedPostEffect_Blur = function (redGL) {
        if (!(this instanceof RedPostEffect_Blur)) return new RedPostEffect_Blur(redGL);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffect_Blur : RedGL Instance만 허용됩니다.', redGL)
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
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
                gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform sampler2D uDiffuseTexture;      
            void main(void) {
                vec2 px = vec2(1.0/vResolution.x, 1.0/vResolution.y);
                vec4 finalColor = vec4(0.0);
                finalColor += texture2D(uDiffuseTexture, vTexcoord + vec2(-7.0*px.x, -7.0*px.y))*0.0044299121055113265;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + vec2(-6.0*px.x, -6.0*px.y))*0.00895781211794;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + vec2(-5.0*px.x, -5.0*px.y))*0.0215963866053;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + vec2(-4.0*px.x, -4.0*px.y))*0.0443683338718;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + vec2(-3.0*px.x, -3.0*px.y))*0.0776744219933;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + vec2(-2.0*px.x, -2.0*px.y))*0.115876621105;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + vec2(-1.0*px.x, -1.0*px.y))*0.147308056121;
                finalColor += texture2D(uDiffuseTexture, vTexcoord                             )*0.159576912161;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + vec2( 1.0*px.x,  1.0*px.y))*0.147308056121;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + vec2( 2.0*px.x,  2.0*px.y))*0.115876621105;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + vec2( 3.0*px.x,  3.0*px.y))*0.0776744219933;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + vec2( 4.0*px.x,  4.0*px.y))*0.0443683338718;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + vec2( 5.0*px.x,  5.0*px.y))*0.0215963866053;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + vec2( 6.0*px.x,  6.0*px.y))*0.00895781211794;
                finalColor += texture2D(uDiffuseTexture, vTexcoord + vec2( 7.0*px.x,  7.0*px.y))*0.0044299121055113265;
                gl_FragColor = finalColor;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'RedPostEffect_Blur_Program';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })();
    RedPostEffect_Blur.prototype = RedBaseMaterial.prototype
    Object.freeze(RedPostEffect_Blur)
})();