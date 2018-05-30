"use strict";
var RedMaterial;
(function () {
    var makeProgram;
    RedMaterial = function (redGL) {
        if (!(this instanceof RedMaterial)) return new RedMaterial(redGL);
        this['program'] = makeProgram(this, redGL)
        // 유니폼 프로퍼티
        this['floatTest'] = 1
        this['floatTest2'] = [1, 2, 3, 4, 5]
        this['intTest'] = 1
        this['intTest2'] = [1, 2, 3, 4, 5]
        this['vec4Test'] = [0, 0, 0, 0]
        this['mat4Test'] = mat4.create()
        // 일반 프로퍼티
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        Object.seal(this)
        console.log(this)
    }
    makeProgram = (function () {
        var vSource, fSource;
        var PROGRAM_NAME;
        vSource = function () {
            /* @preserve
            varying vec4 vColor;
            uniform float uFloatTest;
            uniform float uFloatTest2[10];
            uniform int uIntTest;
            uniform int uIntTest2[10];
            uniform vec4 uVec4Test;
            uniform mat4 uMat4Test;
            void main(void) {
                vColor = aVertexColor;
                vColor.r= sin(uTime*0.01);
                uFloatTest;
                uFloatTest2;
                uIntTest;
                uIntTest2;
                uVec4Test;
                uMat4Test;
                uResolution;
                gl_PointSize = aPointSize;
                gl_Position = uPMatrix * uCameraMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /* @preserve
            precision mediump float;
            varying vec4 vColor;
            void main(void) {
                gl_FragColor = vColor;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'testrProgram';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })()

    RedMaterial.prototype = RedBaseMaterial.prototype
    Object.freeze(RedMaterial)
})();