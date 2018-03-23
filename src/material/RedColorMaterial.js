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
        this.hexToRGB(color ? color : '#ff0000')
        this['alpha'] = 1;
        this['color'][0] = this.r
        this['color'][1] = this.g
        this['color'][2] = this.b
        this['color'][3] = this.alpha


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
        hexToRGB: function (hex) {
            var c;
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                c = hex.substring(1).split('');
                if (c.length == 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                c = '0x' + c.join('');
                this['r'] = ((c >> 16) & 255) / 255;
                this['g'] = ((c >> 8) & 255) / 255;
                this['b'] = (c & 255 / 255);
            }
        }
    }
    Object.freeze(RedColorMaterial)
})();