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
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPointBitmapMaterial : RedGL Instance만 허용됩니다.')
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
        this['program'] = makeProgram(redGL);
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
    makeProgram = function (redGL) {
        var vSource, fSource;
        vSource = function () {
            /*
            void main(void) {
                gl_PointSize = aPointSize;
                gl_Position = uPMatrix * uCameraMatrix* uMVMatrix * vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform sampler2D uDiffuseTexture;
            uniform float uAlphaTest;
            void main(void) {
                vec4 texelColor = texture2D(uDiffuseTexture, vec2(gl_PointCoord.x, - gl_PointCoord.y));
                texelColor.rgb *= texelColor.a;
                if(texelColor.a < uAlphaTest) discard;
                gl_FragColor = texelColor;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        // console.log(vSource, fSource)
        return RedProgram(
            redGL,
            'pointBitmapProgram',
            RedShader(redGL, 'pointBitmapVs', RedShader.VERTEX, vSource),
            RedShader(redGL, 'pointBitmapFS', RedShader.FRAGMENT, fSource)
        )
    }
    RedPointBitmapMaterial.prototype = RedBaseMaterial.prototype
    Object.freeze(RedPointBitmapMaterial)
})();