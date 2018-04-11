"use strict";
var RedAtlasUV;
(function () {
    var baseUV = new Float32Array([0, 0, 1, 1])
    var checkMap = {}
    var tKey
    var t0
    baseUV['_UUID'] = RedGL.makeUUID()
    RedAtlasUV = function (redGL, rect) {

        if (!(this instanceof RedAtlasUV)) return new RedAtlasUV(redGL, rect);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedAtlasUV : RedGL Instance만 허용됩니다.');
        if (rect) {
            t0 = [
                rect[0][0],
                1.0 - rect[2][1],
                (rect[1][0] - rect[0][0]),
                (rect[2][1] - rect[0][1])
            ]
            tKey = t0.toString()
            if (checkMap[tKey]) this['data'] = checkMap[tKey]
            else this['data'] = checkMap[tKey] = t0, this['data']['_UUID'] = RedGL.makeUUID()
        } else this['data'] = baseUV

      
        // console.log(this)
    }
    RedAtlasUV.prototype = {};
    Object.freeze(RedAtlasUV);
})();
