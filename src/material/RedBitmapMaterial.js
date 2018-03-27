"use strict";
var RedBitmapMaterial;
(function () {
    var makeProgram;
    /**DOC:
        {
            constructorYn : true,
            title :`RedBitmapMaterial`,
            description : `
                RedBitmapMaterial Instance 생성
            `,
            params : {
                redGL : [
                    {type:'RedGL Instance'}
                ],
                texture : [
                    {type:'RedBitmapMaterial'},
                    'RedBitmapMaterial'
                ]
            },
            return : 'RedBitmapMaterial Instance'
        }
    :DOC*/
    RedBitmapMaterial = function (redGL, diffuseTexture) {
        if (!(this instanceof RedBitmapMaterial)) return new RedBitmapMaterial(redGL, diffuseTexture);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedBitmapMaterial : RedGL Instance만 허용됩니다.')
        if (!(diffuseTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedBitmapMaterial : RedBitmapTexture Instance만 허용됩니다.')
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        /**DOC:
            {
                title :`diffuseTexture`,
                description : `diffuseTexture`,
                example : `// TODO:`,
                return : 'RedBitmapMaterial'
            }
        :DOC*/
        this['diffuseTexture'] = diffuseTexture;
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
        // Object.seal(this)
        console.log(this)
    }
    makeProgram = function (redGL) {
        var vSource, fSource;
        vSource = function () {
            /*
            void main(void) {
                vTexcoord = aTexcoord;
                gl_Position = uPMatrix * uCameraMatrix* uMVMatrix * vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform sampler2D uDiffuseTexture;
            void main(void) {
                gl_FragColor = texture2D(uDiffuseTexture, vTexcoord);
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        // console.log(vSource, fSource)
        return RedProgram(
            redGL,
            'bitmapProgram',
            RedShader(redGL, 'bitmapVs', RedShader.VERTEX, vSource),
            RedShader(redGL, 'bitmapFS', RedShader.FRAGMENT, fSource)
        )
    }
    RedBitmapMaterial.prototype = RedBaseMaterial.prototype
    Object.freeze(RedBitmapMaterial)
})();