"use strict";
var RedPointBitmapMaterial;
(function () {
    var makeProgram;
    /**DOC:
        {
            constructorYn : true,
            title :`RedPointBitmapMaterial`,
            description : `
                RedPointBitmapMaterial Instance 생성
            `,
            params : {
                redGL : [
                    {type:'RedGL'}
                ],
                diffuseTexture : [
                    {type:'RedBitmapTexture'}
                ]
            },
            return : 'RedPointBitmapMaterial Instance'
        }
    :DOC*/
    RedPointBitmapMaterial = function (redGL, diffuseTexture) {
        if (!(this instanceof RedPointBitmapMaterial)) return new RedPointBitmapMaterial(redGL, diffuseTexture);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPointBitmapMaterial : RedGL Instance만 허용됩니다.', redGL)
        if (!(diffuseTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedPointBitmapMaterial : RedBitmapTexture Instance만 허용됩니다.')
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        /**DOC:
            {
                title :`diffuseTexture`,
                return : 'RedBitmapTexture'
            }
        :DOC*/
        this['diffuseTexture'] = diffuseTexture;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(this,redGL);
        /**DOC:
            {
                title :`alphaTest`,
                description : `
                기본값 : 0.0001
                해당값보다 알파값이 작을경우 discard 처리됨.
                `,
                return : 'Number'
            }
        :DOC*/
        this['alphaTest'] = 0.00001
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        // Object.seal(this)
        console.log(this)
    }
    makeProgram = (function () {
        var vSource, fSource;
        var PROGRAM_NAME;
        vSource = function () {
            /*
            void main(void) {
                gl_PointSize = aPointSize;
                gl_Position = uPMatrix * uCameraMatrix* uMMatrix * vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform sampler2D uDiffuseTexture;
            uniform float uAlphaTest;
            vec4 fog(float perspectiveFar, float density, vec4 fogColor, vec4 currentColor) {
                float flog_cord = gl_FragCoord.z / gl_FragCoord.w / perspectiveFar;
                float fog = flog_cord * density;
                float fogFactor = clamp(1.0 - fog, 0.0,  1.0);
                return mix(fogColor, currentColor, fogFactor);
            }
            void main(void) {
                vec4 finalColor = texture2D(uDiffuseTexture, vec2(gl_PointCoord.x, - gl_PointCoord.y));
                finalColor.rgb *= finalColor.a;
                if(finalColor.a < uAlphaTest) discard;
                if(uUseFog == 1.0) gl_FragColor = fog(uFogDistance, uFogDensity, uFogColor, finalColor);
                else gl_FragColor = finalColor;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        // console.log(vSource, fSource)
        PROGRAM_NAME = 'pointBitmapProgram';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })();
    RedPointBitmapMaterial.prototype = RedBaseMaterial.prototype
    Object.freeze(RedPointBitmapMaterial)
})();