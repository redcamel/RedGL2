"use strict";
var RedGridMaterial;
(function () {
    var makeProgram;
    /**DOC:
        {
            constructorYn : true,
            title :`RedGridMaterial`,
            description : `
                RedGridMaterial Instance 생성.
                RedGrid Instance 새성시 내부적으로 자동으로 생성됨.
            `,
            params : {
                redGL : [
                    {type:'RedGL'}
                ]
            },
            example : `
                RedGridMaterial(RedGL Instance)
            `,
            return : 'RedGridMaterial Instance'
        }
    :DOC*/
    RedGridMaterial = function (redGL) {
        if (!(this instanceof RedGridMaterial)) return new RedGridMaterial(redGL);
        // 유니폼 프로퍼티
        // 일반 프로퍼티
        this['program'] = makeProgram(this, redGL)
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        Object.seal(this)
        console.log(this)
    }
    makeProgram = (function () {
        var vSource, fSource;
        var PROGRAM_NAME;
        vSource = function () {
            /*
            varying vec4 vColor;
            void main(void) {
                vColor = aVertexColor;
                gl_Position = uPMatrix * uCameraMatrix* uMMatrix * vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            vec4 fog(float perspectiveFar, float density, vec4 fogColor, vec4 currentColor) {
              float flog_cord = gl_FragCoord.z / gl_FragCoord.w / perspectiveFar;
              float fog = flog_cord * density;
              float fogFactor = clamp(1.0 - fog, 0.0,  1.0);
              return mix(fogColor, currentColor, fogFactor);
            }
            varying vec4 vColor;
            void main(void) {
                vec4 finalColor = vColor;
                finalColor.rgb *= vColor.a;
                if(uUseFog == 1.0) gl_FragColor = fog(uFogDistance, uFogDensity, uFogColor, finalColor);
                else gl_FragColor = finalColor;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'gridMaterialProgram';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })();

    RedGridMaterial.prototype = RedBaseMaterial.prototype
    Object.freeze(RedGridMaterial)
})();