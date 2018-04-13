"use strict";
var RedPointColorMaterial;
(function () {
    var makeProgram;
    /**DOC:
        {
            constructorYn : true,
            title :`RedPointColorMaterial`,
            description : `
                RedPointColorMaterial Instance 생성
            `,
            params : {
                redGL : [
                    {type:'RedGL'}
                ]
            },
            return : 'RedPointColorMaterial Instance'
        }
    :DOC*/
    RedPointColorMaterial = function (redGL) {
        if (!(this instanceof RedPointColorMaterial)) return new RedPointColorMaterial(redGL);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPointColorMaterial : RedGL Instance만 허용됩니다.', redGL)
        /////////////////////////////////////////
        // 유니폼 프로퍼티
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
            varying vec4 vColor;
            void main(void) {
                gl_PointSize = aPointSize;
                vColor = aVertexColor;
                gl_Position = uPMatrix * uCameraMatrix* uMVMatrix * vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            varying vec4 vColor;
            void main(void) {
                gl_FragColor = vColor;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        // console.log(vSource, fSource)
        PROGRAM_NAME = 'pointColorProgram';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })();
    RedPointColorMaterial.prototype = RedBaseMaterial.prototype
    Object.freeze(RedPointColorMaterial)
})();