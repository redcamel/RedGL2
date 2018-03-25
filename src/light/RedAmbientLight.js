"use strict";
var RedAmbientLight;
(function () {
    RedAmbientLight = function (color) {
        if (!(this instanceof RedAmbientLight)) return new RedAmbientLight();
        // 유니폼 프로퍼티
        this['color'] = new Float32Array(4)
        this['intensity'] = 1.0
        // 일반 프로퍼티
        this.setColor('#111')
        this['_UUID'] = RedGL['makeUUID']();
        Object.seal(this)
        console.log(this)
    }
    RedAmbientLight.prototype = {}
    RedGLUtil['extendsProto'](RedAmbientLight, RedBaseLight);
    Object.freeze(RedAmbientLight)

})();