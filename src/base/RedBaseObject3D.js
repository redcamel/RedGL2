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
    Object.freeze(RedBaseObject3D);
})();
