"use strict";
var RedPointLight;
(function () {
    RedPointLight = function (redGL, hex, alpha) {
        if (!(this instanceof RedPointLight)) return new RedPointLight(redGL, hex, alpha);
        // 유니폼 프로퍼티
        this['color'] = new Float32Array(4)
        this['intensity'] = 1.0
        // 일반 프로퍼티
        this.setColor(hex ? hex : '#fff', alpha==undefined ? 1 : alpha)
        this['x'] = this['y'] = this['z'] = 0;    
        this['radius'] = 1    
        this['_UUID'] = RedGL['makeUUID']();
        Object.defineProperty(this, 'type', {
            configurable: false,
            writable: false,
            value: RedPointLight['type']
        })
        this['debugObject'] = RedMesh(redGL, RedSphere(redGL,1,16,16,16), RedColorMaterial(redGL))
        this['debugObject']['drawMode'] = redGL.gl.LINE_STRIP
        console.log(this)
    }
    RedPointLight['type'] = 'RedPointLight'
    RedGLUtil['extendsProto'](RedPointLight, RedBaseLight);
    Object.freeze(RedPointLight)

})()