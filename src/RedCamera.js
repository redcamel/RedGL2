"use strict";
var RedCamera;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedCamera`,
        description : `
            RedCamera 인스턴스 생성자.
        `,
        return : 'RedCamera Instance'
    }
	:DOC*/
    RedCamera = function () {
        if (!(this instanceof RedCamera)) return new RedCamera();
        this.x = this.y = this.z = 0;
        this.rotationX = this.rotationY = this.rotationZ = 0;

        this.fov = Math.PI / 2;
        this.nearClipping = 0.1;
        this.farClipping = 10000;
        this.orthographic = false;

        this.matrix = mat4.create();

        this['_UUID'] = RedGL['makeUUID']();
    };
    RedCamera.prototype = {
        updateMatrix: (function () {
            var t0;
            return function () {
                t0 = mat4.identity(this.matrix);
                mat4.translate(t0, t0, [this.x, this.y, this.z]);
                mat4.rotateX(t0, t0, this.rotationX);
                mat4.rotateY(t0, t0, this.rotationY);
                mat4.rotateZ(t0, t0, this.rotationZ);
                console.log(this.matrix);
            }
        })()
    }
    RedGL['extendsProto'](RedCamera, RedBaseObject3D);
    Object.freeze(RedCamera);
})();
