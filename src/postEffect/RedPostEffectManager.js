"use strict";
var RedPostEffectManager;
(function () {
    RedPostEffectManager = function (redGL) {
        if (!(this instanceof RedPostEffectManager)) return new RedPostEffectManager(redGL);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffectManager : RedGL Instance만 허용됩니다.', redGL)
        var tGL;
        tGL = redGL.gl;
        this['redGL'] = redGL;
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['postEffectList'] = [];
        this['_UUID'] = RedGL['makeUUID']();
        this['finalMaterial'] = RedBitmapMaterial(redGL, this['frameBuffer']['texture'])
        this['children'] = [RedMesh(redGL, RedPlane(redGL), this['finalMaterial'])]

        this['children'][0]['useCullFace'] = false
        // Object.seal(this)
    }
    RedPostEffectManager.prototype = {
        addEffect: function (v) {
            this['postEffectList'].push(v)
        },
        removeEffect: function (v) {
            var t0;
            t0 = this['postEffectList'].indexOf(v)
            if (t0 != -1) this['postEffectList'].splice(t0, 1)
        },
        bind: function (gl) {
            this['frameBuffer'].bind(gl);
        },
        unbind: function (gl) {
            this['frameBuffer'].unbind(gl);
        }
    }
    Object.freeze(RedPostEffectManager);
})();