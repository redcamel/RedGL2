"use strict";
var RedPostEffect_Film;
(function () {
    var makeProgram;
    RedPostEffect_Film = function (redGL, width, height) {
        if (!(this instanceof RedPostEffect_Film)) return new RedPostEffect_Film(redGL);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffect_Film : RedGL Instance만 허용됩니다.', redGL);
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        this['gray'] = false;
        this['scanlineIntensity'] = 0.5;
        this['noiseIntensity'] = 0.5;
        this['scanlineCount'] = 2048;
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
                vTime = uTime;
                gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform bool uGray;
            uniform sampler2D uDiffuseTexture;     
            // noise effect intensity value (0 = no effect, 1 = full effect)
            uniform float uNoiseIntensity;
            // scanlines effect intensity value (0 = no effect, 1 = full effect)
            uniform float uScanlineIntensity;
            // scanlines effect count value (0 = no effect, 4096 = full effect)
            uniform float uScanlineCount;
           
            void main() {
                // sample the source
                vec4 diffuseColor = texture2D( uDiffuseTexture, vTexcoord );

                // make some noise
                float x = vTexcoord.x * vTexcoord.y * vTime;
                x = mod( x, 13.0 ) * mod( x, 123.0 );
                float dx = mod( x, 0.01 );

                // add noise
                vec3 finalColor = diffuseColor.rgb + diffuseColor.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );
                
                // get us a sine and cosine
                vec2 sc = vec2( sin( vTexcoord.y * uScanlineCount ), cos( vTexcoord.y * uScanlineCount ) );
               
                // add scanlines
                finalColor += diffuseColor.rgb * vec3( sc.x, sc.y, sc.x ) * uScanlineIntensity;
               
                // interpolate between source and result by intensity
                finalColor = diffuseColor.rgb + clamp( uNoiseIntensity, 0.0, 1.0 ) * ( finalColor - diffuseColor.rgb );
               
                // convert to grayscale if desired
                if( uGray ) finalColor = vec3( finalColor.r * 0.3 + finalColor.g * 0.59 + finalColor.b * 0.11 );
                gl_FragColor =  vec4( finalColor, diffuseColor.a );
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'RedPostEffect_Film_Program';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource);

        }
    })();
    RedPostEffect_Film.prototype = RedBaseMaterial.prototype;
    Object.freeze(RedPostEffect_Film);
})();