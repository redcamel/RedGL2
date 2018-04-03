"use strict";
var RedOmniLight;
(function () {
    RedOmniLight = function (color) {
        if (!(this instanceof RedOmniLight)) return new RedOmniLight();
        // 유니폼 프로퍼티
        this['color'] = new Float32Array(4)
        this['intensity'] = 1.0
        // 일반 프로퍼티
        this.setColor(color)
        this['x'] = this['y'] = this['z'] = 0;        
        this['_UUID'] = RedGL['makeUUID']();
        Object.defineProperty(this, 'type', {
            configurable: false,
            writable: false,
            value: RedOmniLight['type']
        })
        console.log(this)
    }
    RedOmniLight['type'] = 'RedOmniLight'
    RedGLUtil['extendsProto'](RedOmniLight, RedBaseLight);
    RedGLUtil['extendsProto'](RedOmniLight, RedBaseObject3D);
    Object.freeze(RedOmniLight)

})()