"use strict";
var RedSkyBoxMaterial;
(function () {
    var makeProgram;
    /**DOC:
        {
            constructorYn : true,
            title :`RedSkyBoxMaterial`,
            description : `
                RedSkyBoxMaterial Instance 생성.
                RedSkyBox Instance 생성시 내부적으로 자동으로 생성됨.
            `,
            params : {
                redGL : [
                    {type:'RedGL'}
                ],
                skyboxTexture : [
                    {type:'RedBitmapCubeTexture'}
                ]
            },
            example : `
                RedSkyBoxMaterial(
                    RedGL Instance,
                    RedBitmapCubeTexture Instance
                )
            `,
            return : 'RedSkyBoxMaterial Instance'
        }
    :DOC*/
    RedSkyBoxMaterial = function (redGL, skyboxTexture) {
        if (!(this instanceof RedSkyBoxMaterial)) return new RedSkyBoxMaterial(redGL, skyboxTexture);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedSkyBoxMaterial : RedGL Instance만 허용됩니다.', redGL)
        if (skyboxTexture && !(skyboxTexture instanceof RedBitmapCubeTexture)) RedGLUtil.throwFunc('RedSkyBoxMaterial : skyboxTexture - RedBitmapCubeTexture Instance만 허용됩니다.')
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        /**DOC:
            {
                title :`skyboxTexture`,
                return : 'RedBitmapCubeTexture'
            }
        :DOC*/
        this['skyboxTexture'] = skyboxTexture;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(this, redGL);
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        console.log(this)
        // Object.seal(this)
    }
    makeProgram = (function () {
        var vSource, fSource;
        var PROGRAM_NAME;
        vSource = function () {
            /*
            varying vec3 vReflectionCubeCoord;
            void main(void) {
                vReflectionCubeCoord = (uMMatrix *vec4(-aVertexPosition, 0.0)).xyz;
                gl_Position = uPMatrix * uCameraMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform samplerCube uSkyboxTexture;
            
            float fogFactor(float perspectiveFar, float density){
                float flog_cord = gl_FragCoord.z / gl_FragCoord.w / perspectiveFar;
                float fog = flog_cord * density;
                return clamp(1.0 - fog, 0.0,  1.0);
            }
            vec4 fog(float fogFactor, vec4 fogColor, vec4 currentColor) {
                return mix(fogColor, currentColor, fogFactor);
            }

            varying vec3 vReflectionCubeCoord;
            void main(void) {
                vec4 finalColor = textureCube(uSkyboxTexture, vReflectionCubeCoord);
                if(uUseFog == 1.0) gl_FragColor = fog( fogFactor(uFogDistance, uFogDensity), uFogColor, finalColor);
                else gl_FragColor = finalColor;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        // console.log(vSource, fSource)
        PROGRAM_NAME = 'skyboxProgram';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })();
    RedSkyBoxMaterial.prototype = RedBaseMaterial.prototype
    Object.freeze(RedSkyBoxMaterial)
})();