"use strict";
var RedColorMaterial;
(function () {
    var makeProgram;
    RedColorMaterial = function (redGL, color, alpha) {

        if (!(this instanceof RedColorMaterial)) return new RedColorMaterial(redGL, color, alpha);
        this['program'] = makeProgram(redGL)
        // 유니폼 프로퍼티
        this['color'] = new Float32Array(4)
        // 일반 프로퍼티
        this.setColor(color, 0.5)
        console.log(this['color'])

        this['_UUID'] = RedGL['makeUUID']();
        Object.seal(this)
        console.log(this)
    }
    makeProgram = function (redGL) {

        var vSource, fSource;
        vSource =
            `
attribute vec3 aVertexPosition;
uniform vec4 uColor;
varying vec4 vColor;
void main(void) {
    vColor = uColor;
    gl_Position = uPMatrix * uCameraMatrix* uMVMatrix * vec4(aVertexPosition, 1.0);
}
            `
        fSource =
            `
precision mediump float;
varying vec4 vColor;
void main(void) {
    gl_FragColor = vColor;
}
            `
        return RedProgram(
            redGL,
            'colorProgram',
            RedShader(redGL, 'colorVs', RedShader.VERTEX, vSource),
            RedShader(redGL, 'colorFS', RedShader.FRAGMENT, fSource)
        )

    }

    RedColorMaterial.prototype = {
        setColor: (function(){
            var t0;
            return function (color, alpha) {
                color = color ? color : '#ff2211'
                t0 = RedGLUtil.hexToRGB.call(this, color, alpha);
                this['color'][0] = t0[0]
                this['color'][1] = t0[1]
                this['color'][2] = t0[2]
                this['color'][3] = t0[3]
            }
        })()
    }
    Object.freeze(RedColorMaterial)
})();