"use strict";
var RedAtlasTexture;
(function () {
    
    RedAtlasTexture = function (redGL, key) {
        var gl;
        if (!(this instanceof RedAtlasTexture)) return new RedAtlasTexture(redGL, key);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedAtlasTexture : RedGL Instance만 허용됩니다.');
        gl = redGL.gl;
        this['webglTexture'] = redGL['_datas']['RedAtlas']['atlasMap'][key]['atlas']['texture']['webglTexture']
        this['atlascoord'] = RedAtlasUV(redGL,redGL['_datas']['RedAtlas']['atlasMap'][key]['rect'])
        this['_UUID'] = redGL['_datas']['RedAtlas']['atlasMap'][key]['atlas']['_UUID']

        if (redGL['_datas']['emptyTexture']) {
            //TODO: 이거 렌더러쪽으로 옮겨야함
            gl.activeTexture(gl.TEXTURE0)
            gl.bindTexture(gl.TEXTURE_2D, redGL['_datas']['emptyTexture']['2d']['webglTexture'])
        }

        console.log(this)
    }
    RedAtlasTexture.prototype = {};
    Object.freeze(RedAtlasTexture);
})();
