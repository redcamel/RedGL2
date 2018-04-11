"use strict";
var RedAtlasTexture;
(function () {
    var gl;
    var t0;
    RedAtlasTexture = function (redGL, key) {
        if (!(this instanceof RedAtlasTexture)) return new RedAtlasTexture(redGL, key);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedAtlasTexture : RedGL Instance만 허용됩니다.');
        gl = redGL.gl;
        t0 = redGL['_datas']['RedAtlas']['atlasMap'][key]
        this['webglTexture'] = t0['atlas']['texture']['webglTexture']
        this['atlascoord'] = RedAtlasUV(redGL, t0['rect'])
        this['_UUID'] = t0['atlas']['_UUID']

        if (redGL['_datas']['emptyTexture']) {
            gl.activeTexture(gl.TEXTURE0)
            gl.bindTexture(gl.TEXTURE_2D, redGL['_datas']['emptyTexture']['2d']['webglTexture'])
        }

        console.log(this)
    }
    RedAtlasTexture.prototype = RedBitmapTexture.prototype;
    Object.freeze(RedAtlasTexture);
})();
