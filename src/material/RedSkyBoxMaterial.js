"use strict";
var RedSkyBoxMaterial;
(function () {
    var makeProgram;

    RedSkyBoxMaterial = function (redGL, skyboxTexture) {
        if (!(this instanceof RedSkyBoxMaterial)) return new RedSkyBoxMaterial(redGL, skyboxTexture);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedSkyBoxMaterial : RedGL Instance만 허용됩니다.')
        if (skyboxTexture && !(skyboxTexture instanceof RedBitmapCubeTexture)) RedGLUtil.throwFunc('RedSkyBoxMaterial : skyboxTexture - RedBitmapCubeTexture Instance만 허용됩니다.')
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        /**DOC:
            {
                title :`skyboxTexture`,
                description : `skyboxTexture`,
                example : `// TODO:`,
                return : 'RedBitmapCubeTexture'
            }
        :DOC*/
        this['skyboxTexture'] = skyboxTexture;
        /////////////////////////////////////////
        // 일반 프로퍼티
        /**DOC:
            {
                title :`program`,
                description : `RedProgram Instance`,
                example : `// TODO:`,
                return : 'RedProgram Instance'
            }
        :DOC*/
        this['program'] = makeProgram(redGL);
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        console.log(this)
        // Object.seal(this)
    }
    makeProgram = function (redGL) {
        var vSource, fSource;
        vSource = function () {
            /*
            varying vec3 vReflectionCubeCoord;
            void main(void) {
                vReflectionCubeCoord = (uMVMatrix *vec4(-aVertexPosition, 0.0)).xyz;
                gl_Position = uPMatrix * uCameraMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform samplerCube uSkyboxTexture;
            
            varying vec3 vReflectionCubeCoord;
            void main(void) {
                vec4 texelColor = textureCube(uSkyboxTexture, vReflectionCubeCoord);
                gl_FragColor = texelColor;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        // console.log(vSource, fSource)
        return RedProgram(
            redGL,
            'skyboxProgram',
            RedShader(redGL, 'skyboxProgramVs', RedShader.VERTEX, vSource),
            RedShader(redGL, 'skyboxProgramFS', RedShader.FRAGMENT, fSource)
        )
    }
    RedSkyBoxMaterial.prototype = RedBaseMaterial.prototype
    Object.freeze(RedSkyBoxMaterial)
})();