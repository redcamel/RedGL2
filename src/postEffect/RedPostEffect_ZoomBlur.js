"use strict";
var RedPostEffect_ZoomBlur;
(function () {
    var makeProgram;

    RedPostEffect_ZoomBlur = function (redGL) {
        if (!(this instanceof RedPostEffect_ZoomBlur)) return new RedPostEffect_ZoomBlur(redGL);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffect_ZoomBlur : RedGL Instance만 허용됩니다.', redGL)
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        this['centerX'] = 0.0
        this['centerY'] = 0.0
        this['strength'] = 0.15
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
                gl_Position = uPMatrix * uCameraMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform sampler2D uDiffuseTexture;      
            uniform float uCenterX;
            uniform float uCenterY;
            uniform float uStrength;
            float random(vec3 scale, float seed) {
                return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
            }
            void main(void) {
                vec4 finalColor = vec4(0.0);
                vec2 center = vec2(uCenterX+0.5,-uCenterY+0.5);
                vec2 toCenter = center - vTexcoord ;
                float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
                float total = 0.0;
                
                for (float t = 0.0; t <= 40.0; t++) {
                    float percent = (t + offset) / 40.0;
                    float weight = 4.0 * (percent - percent * percent);
                    vec4 sample = texture2D(uDiffuseTexture, vTexcoord + toCenter * percent * uStrength );
                    sample.rgb *= sample.a;
                    finalColor += sample * weight;
                    total += weight;
                }
                gl_FragColor = finalColor / total;
                gl_FragColor.rgb /= gl_FragColor.a + 0.00001;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'RedPostEffect_ZoomBlur_Program';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })();
    RedPostEffect_ZoomBlur.prototype = RedBaseMaterial.prototype
    Object.freeze(RedPostEffect_ZoomBlur)
})();