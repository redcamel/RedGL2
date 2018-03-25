"use strict";
var RedDirectionalLight;
(function () {
    RedDirectionalLight = function (color) {
        if (!(this instanceof RedDirectionalLight)) return new RedDirectionalLight();
        // 유니폼 프로퍼티
        this['color'] = new Float32Array(4)
        this['intensity'] = 1.0
        // 일반 프로퍼티
        this.setColor(color ? color : '#fff')
        this['x'] = this['y'] = this['z'] = 0;
        this['rotationX'] = this['rotationY'] = this['rotationZ'] = 0;

        this['_UUID'] = RedGL['makeUUID']();
        Object.seal(this)
        console.log(this)
    }
    RedDirectionalLight.prototype = {}
    RedGLUtil['extendsProto'](RedDirectionalLight, RedBaseLight);
    RedGLUtil['extendsProto'](RedDirectionalLight, RedBaseObject3D);
    Object.freeze(RedDirectionalLight)

})()