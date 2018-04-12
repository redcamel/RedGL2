"use strict";
var RedColorMaterial;
(function () {
    var makeProgram;
    /**DOC:
        {
            constructorYn : true,
            title :`RedColorMaterial`,
            description : `
                RedColorMaterial Instance 생성
            `,
            params : {
                redGL : [
                    {type:'RedGL'}
                ],
                hex : [
                    {type:'hex'}
                ],
                alpha : [
                    {type:'number'},
                    '알파값'
                ]
            },
            example : `
                RedColorMaterial(RedGL Instance, hex)
            `,
            return : 'RedColorMaterial Instance'
        }
    :DOC*/
    RedColorMaterial = function (redGL, hex, alpha) {
        if (!(this instanceof RedColorMaterial)) return new RedColorMaterial(redGL, hex, alpha);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        /**DOC:
            {
                title :`color`,
                description : `
                    RedProgram Instance
                    직접설정하지 않도록 유의해야함!
                `,
                return : 'Float32Array'
            }
        :DOC*/
        this['color'] = new Float32Array(4);
        this.setColor(hex ? hex : '#ff0000', alpha == undefined ? 1 : alpha);
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(redGL);
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        // Object.seal(this);
        console.log(this);
    }
    makeProgram = function (redGL) {
        var vSource, fSource;
        vSource = function () {
            /*
            uniform vec4 uColor;
            varying vec4 vColor;
            void main(void) {
                vColor = uColor; 
                gl_PointSize = uPointSize;
                gl_Position = uPMatrix * uCameraMatrix* uMVMatrix * vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            varying vec4 vColor;
            void main(void) {
                vec4 finalColor = vColor * vColor.a;
                gl_FragColor = finalColor;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        // console.log(vSource, fSource)
        return RedProgram(
            redGL,
            'colorProgram',
            RedShader(redGL, 'colorVs', RedShader.VERTEX, vSource),
            RedShader(redGL, 'colorFS', RedShader.FRAGMENT, fSource)
        )
    }
    RedColorMaterial.prototype = RedBaseMaterial.prototype
    /**DOC:
        {
            code : 'METHOD',
            title :`setColor`,
            description : `
                컬러설정
            `,
            params : {
                hex : [
                    {type: 'hex'},
                    'ex) #fff, #ffffff'
                ]
            },
            example : `// TODO:`,
            return : 'RedProgram Instance'
        }
    :DOC*/
    RedColorMaterial.prototype['setColor'] = (function () {
        var t0;
        return function (hex, alpha) {
            hex = hex ? hex : '#ff2211';
            if (alpha == undefined) alpha = 1;
            if (alpha > 1) alpha = 1
            t0 = RedGLUtil.hexToRGB.call(this, hex);
            this['color'][0] = t0[0];
            this['color'][1] = t0[1];
            this['color'][2] = t0[2];
            this['color'][3] = alpha;
        }
    })();
    Object.freeze(RedColorMaterial)
})();