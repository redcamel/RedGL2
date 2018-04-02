"use strict";
var RedGridMaterial;
(function () {
    var makeProgram;
    RedGridMaterial = function (redGL) {
        if (!(this instanceof RedGridMaterial)) return new RedGridMaterial(redGL);
        this['program'] = makeProgram(redGL)
        // 유니폼 프로퍼티
        // 일반 프로퍼티
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        Object.seal(this)
        console.log(this)
    }
    makeProgram = function (redGL) {
        var vSource, fSource;
        vSource = function () {
            /*
            attribute vec4 aVertexColor;
            varying vec4 vColor;
            void main(void) {
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
                gl_FragColor.rgb *= vColor.a;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        return RedProgram(
            redGL,
            'gridMaterialProgram',
            RedShader(redGL, 'gridMaterialVs', RedShader.VERTEX, vSource),
            RedShader(redGL, 'gridMaterialFS', RedShader.FRAGMENT, fSource)
        )

    }

    RedGridMaterial.prototype = RedBaseMaterial.prototype
    Object.freeze(RedGridMaterial)
})();