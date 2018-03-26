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
    RedBaseObject3D.prototype = {
        /**DOC:
            {
                code : 'FUNCTION',
                title :`lookAt`,
                description : `lookAt`,
                params : {
                    x : [
                        {type:'Number'}
                    ],
                    y : [
                        {type:'Number'}
                    ],
                    z : [
                        {type:'Number'}
                    ]
                },
                example : `// TODO:`,
                return : 'void'
            }
        :DOC*/
        lookAt: (function () {
            var deltaX, deltaY, deltaZ;
            var rotX;
            var HPI;
            var TO_DEGREE;
            TO_DEGREE = 180 / Math.PI;
            HPI = 0.5 * Math.PI;
            return function (x, y, z) {
                deltaX = x - this.x;
                deltaY = y - this.y;
                deltaZ = z - this.z;
                rotX = Math.atan2(deltaZ, Math.sqrt(deltaX * deltaX + deltaY * deltaY));
                this.rotationX = (rotX - HPI) * TO_DEGREE;
                this.rotationY = 0;
                this.rotationZ = (-Math.atan2(deltaX, deltaY)) * TO_DEGREE;
            }
        })()
    };
    Object.freeze(RedBaseObject3D);
})();
