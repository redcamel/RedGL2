"use strict";
var RedBitmapMaterial;
(function () {
    var makeProgram;
    RedBitmapMaterial = function (redGL, texture) {
        var _color;
        if (!(this instanceof RedBitmapMaterial)) return new RedBitmapMaterial(redGL, texture);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwfunc('RedBitmapMaterial : RedGL Instance만 허용됩니다.')
        if (!(texture instanceof RedBitmapTexture)) RedGLUtil.throwfunc('RedBitmapMaterial : RedBitmapTexture Instance만 허용됩니다.')
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

    RedBitmapMaterial.prototype = {}
    Object.freeze(RedBitmapMaterial)
})();