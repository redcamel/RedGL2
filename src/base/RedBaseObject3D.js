"use strict";
var RedBaseObject3D;
(function () {
    /**DOC:
        {
            constructorYn : true,
            title :`RedBaseObject3D`,
            description : `
                RedBaseObject3D 기저층
                프로토타입 확장을 통해서만 사용가능(RedGLUtil.extendsProto 사용)
            `,
            return : 'void'
        }
    :DOC*/
    RedBaseObject3D = function () {
        RedGLUtil.throwFunc('RedBaseObject3D : 생성자/직접실행으로 사용 할 수 없습니다.')
    }
    // RedBaseObject3D.prototype['lookAt'] = (function () {
    //     var up = new Float32Array([0, 1, 0]);
    //     return function (x, y, z) {
    //         //out, eye, center, up
    //         mat4.targetTo(this['matrix'], [this.x, this.y, this.z], [x, y, z], up);
    //         var tQuat = quat.create()
    //         var tVec3 = vec3.create()
    //         mat4.getRotation(tQuat, this['matrix'])
    //         quat.getAxisAngle(tVec3, tQuat)
    //         console.log(this['matrix'])
    //         this['rotationX'] = tVec3[0] * 180 / Math.PI
    //         this['rotationY'] = tVec3[1] * 180 / Math.PI
    //         this['rotationZ'] = tVec3[2] * 180 / Math.PI
    //     }
    // })();
    Object.freeze(RedBaseObject3D);
})();
