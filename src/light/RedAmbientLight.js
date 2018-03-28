"use strict";
var RedAmbientLight;
(function () {
    RedAmbientLight = function (redGL, hex, alpha) {
        if (!(this instanceof RedAmbientLight)) return new RedAmbientLight(redGL, hex, alpha);
        // 유니폼 프로퍼티
        this['color'] = new Float32Array(4)
        this['intensity'] = 1
        // 일반 프로퍼티
        this.setColor(hex ? hex : '#ff0000', alpha == undefined ? 0.1 : alpha)
        this['_UUID'] = RedGL['makeUUID']();
        Object.defineProperty(this, 'type', {
            configurable: false,
            writable: false,
            value: 'RedAmbientLight'
        })
        console.log(this)
    }
    RedAmbientLight.prototype = RedBaseLight.prototype
    RedGLUtil['extendsProto'](RedAmbientLight, RedBaseLight);
    Object.freeze(RedAmbientLight)

})();