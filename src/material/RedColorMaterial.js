"use strict";
var RedColorMaterial;
(function () {
    var makeProgram;
    RedColorMaterial = function (redGL, color) {
        var _color;
        if (!(this instanceof RedColorMaterial)) return new RedColorMaterial(redGL, color);
        this['program'] = makeProgram(redGL)
        // 유니폼 프로퍼티
        this['color'] = new Float32Array(4)
        // 일반 프로퍼티
        this.setColor(color)
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
        setColor: function (color) {
            color = color ? color : '#ff2211'
            RedGLUtil.hexToRGB.call(this,color)
            this['color'][0] = this.r
            this['color'][1] = this.g
            this['color'][2] = this.b
            this['color'][3] = this.alpha
        }
    }
    Object.freeze(RedColorMaterial)
})();