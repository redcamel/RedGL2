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
    RedBaseObject3D['build'] = function (gl) {
        this['useCullFace'] = true
        this['cullFace'] = gl.BACK
        this['useDepthTest'] = true
        this['depthTestFunc'] = gl.LEQUAL
        this['useBlendMode'] = true
        this['blendSrc'] = gl.ONE
        this['blendDst'] = gl.ONE_MINUS_SRC_ALPHA
        //
        this['drawMode'] = gl.TRIANGLES
        //
        this['x'] = this['y'] = this['z'] = 0;
        this['rotationX'] = this['rotationY'] = this['rotationZ'] = 0;
        this['scaleX'] = this['scaleY'] = this['scaleZ'] = 1;
        //
        this['matrix'] = mat4.create();
        this['normalMatrix'] = mat4.create();
        //
        this['children'] = []
    }
    RedBaseObject3D.prototype = {
        localToWorld: (function () {
            var t0;
            t0 = mat4.create()
            return function (x, y, z) {
                x = x || 0
                y = y || 0
                z = z || 0
                mat4.identity(t0);
                mat4.translate(t0, t0, [x, y, z])
                mat4.multiply(t0, this['matrix'], t0)
                return [
                    t0[12],
                    t0[13],
                    t0[14]
                ]
            }
        })(),
        worldToLocal: (function () {
            var t0,t1;
            t0 = mat4.create() // 이동
            t1 = mat4.create()
            return function (x, y, z) {
                x = x || 0
                y = y || 0
                z = z || 0
                mat4.translate(t0, t0, [x, y, z])
                // mat4.invert(t1, this['matrix'])
                mat4.multiply(t1, t0,this['matrix'])
                return [
                    t1[0] * x + t1[1] * y + t1[2] * z + t1[3],
                    t1[4] * x + t1[5] * y + t1[6] * z + t1[7],
                    t1[8] * x + t1[9] * y + t1[10] * z + t1[11]
                ]
            }
        })()
    }
    Object.freeze(RedBaseObject3D);
})();
