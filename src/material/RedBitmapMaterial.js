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
                    {type:'RedGL'}
                ],
                diffuseTexture : [
                    {type:'RedBitmapTexture'},
                    'RedBitmapTexture Instance'
                ]
            },
            example : `
                RedBitmapMaterial(RedGL Instance, RedBitmapTexture(RedGL Instance, src))
            `,
            return : 'RedBitmapMaterial Instance'
        }
    :DOC*/
    RedBitmapMaterial = function (redGL, diffuseTexture) {
        if (!(this instanceof RedBitmapMaterial)) return new RedBitmapMaterial(redGL, diffuseTexture);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedBitmapMaterial : RedGL Instance만 허용됩니다.', redGL)
        if (!(diffuseTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedBitmapMaterial : RedBitmapTexture Instance만 허용됩니다.')
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        /**DOC:
            {
                title :`diffuseTexture`,
                return : 'RedBitmapMaterial'
            }
        :DOC*/
        this['diffuseTexture'] = diffuseTexture;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(this, redGL);
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
                vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
                gl_PointSize = uPointSize;
                gl_Position = uPMatrix * uCameraMatrix* uMVMatrix * vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform sampler2D uDiffuseTexture;
            void main(void) {
                vec4 texelColor = texture2D(uDiffuseTexture, vTexcoord);
                texelColor.rgb *= texelColor.a;
                if(texelColor.a ==0.0) discard;
                gl_FragColor = texelColor;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'bitmapProgram';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })();
    RedBitmapMaterial.prototype = RedBaseMaterial.prototype
    Object.freeze(RedBitmapMaterial)
})();