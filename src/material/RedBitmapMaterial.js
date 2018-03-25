"use strict";
var RedBitmapMaterial;
(function () {
    var makeProgram;
    RedBitmapMaterial = function (redGL, texture) {
        var _color;
        if (!(this instanceof RedBitmapMaterial)) return new RedBitmapMaterial(redGL, texture);
        if (!(redGL instanceof RedGL)) throw 'RedBitmapMaterial : RedGL 인스턴스만 허용됩니다.'
        if (!(texture instanceof RedBitmapTexture)) throw 'RedBitmapMaterial : RedBitmapTexture 인스턴스만 허용됩니다.'
        this['program'] = makeProgram(redGL)
        // 유니폼 프로퍼티
        this['diffuse'] = texture
        // 일반 프로퍼티

        this['_UUID'] = RedGL['makeUUID']();
        Object.seal(this)
        console.log(this)
    }
    makeProgram = function (redGL) {

        var vSource, fSource;
        vSource =
            `
attribute vec3 aVertexPosition;
attribute vec2 aTexcoord;
varying vec2 vTexcoord;
void main(void) {
    vTexcoord = aTexcoord;
    gl_Position = uPMatrix * uCameraMatrix* uMVMatrix * vec4(aVertexPosition, 1.0);
}
            `
        fSource =
            `
precision mediump float;
uniform sampler2D uDiffuse;
varying vec2 vTexcoord;
void main(void) {
    gl_FragColor = texture2D(uDiffuse, vTexcoord);
}
            `
        return RedProgram(
            redGL,
            'bitmapProgram',
            RedShader(redGL, 'bitmapVs', RedShader.VERTEX, vSource),
            RedShader(redGL, 'bitmapFS', RedShader.FRAGMENT, fSource)
        )

    }

    RedBitmapMaterial.prototype = {
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
    Object.freeze(RedBitmapMaterial)
})();