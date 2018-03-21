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
        /**DOC:
        {
            code:`PROPERTY`,
            title :`x`,
            description : `x - 기본값 : 0`,
            return : 'Number'
        }
        :DOC*/
        /**DOC:
        {
            code:`PROPERTY`,
            title :`y`,
            description : `y - 기본값 : 0`,
            return : 'Number'
        }
        :DOC*/
        /**DOC:
        {
            code:`PROPERTY`,
            title :`z`,
            description : `z - 기본값 : 0`,
            return : 'Number'
        }
        :DOC*/
        this.x = this.y = this.z = 0;
        /**DOC:
        {
            code:`PROPERTY`,
            title :`rotationX`,
            description : `rotationX - 기본값 : 0`,
            return : 'Number'
        }
        :DOC*/
        /**DOC:
        {
            code:`PROPERTY`,
            title :`rotationY`,
            description : `rotationY - 기본값 : 0`,
            return : 'Number'
        }
        :DOC*/
        /**DOC:
        {
            code:`PROPERTY`,
            title :`rotationZ`,
            description : `rotationZ - 기본값 : 0`,
            return : 'Number'
        }
        :DOC*/
        this.rotationX = this.rotationY = this.rotationZ = 0;

        /**DOC:
        {
            code:`PROPERTY`,
            title :`fov`,
            description : `fov - 기본값 : Math.PI / 2`,
            return : 'Number'
        }
        :DOC*/
        this.fov = 45;
        /**DOC:
        {
            code:`PROPERTY`,
            title :`nearClipping`,
            description : `nearClipping - 0.01`,
            return : 'Number'
        }
        :DOC*/
        this.nearClipping = 0.1;
        /**DOC:
        {
            code:`PROPERTY`,
            title :`farClipping`,
            description : `farClipping - 기본값 : 10000`,
            return : 'Number'
        }
        :DOC*/
        this.farClipping = 100000;
        /**DOC:
        {
            code:`PROPERTY`,
            title :`orthographic`,
            description : `orthographic - false`,
            return : 'Boolean'
        }
        :DOC*/
        this.orthographic = false;
        /**DOC:
        {
            code:`PROPERTY`,
            title :`matrix`,
            description : `matrix`,
            return : 'mat4'
        }
        :DOC*/
        this.matrix = mat4.create();
        this['_UUID'] = RedGL['makeUUID']();
    };
    RedCamera.prototype = {
        /**DOC:
        {
            code:`FUNCTION`,
            title :`updateMatrix`,
            description : `
                x, y, z, rotationX, rotationY, rotationZ 를 기반으로한 matrix 업데이트
            `,
            return : 'mat4'
        }
        :DOC*/
        updateMatrix: (function () {
            var t0;
            var TO_RAD = Math.PI/180
            return function () {
                t0 = mat4.identity(this.matrix);
                mat4.translate(t0, t0, [this.x, this.y, this.z]);
                mat4.rotateX(t0, t0, this.rotationX*TO_RAD);
                mat4.rotateY(t0, t0, this.rotationY*TO_RAD);
                mat4.rotateZ(t0, t0, this.rotationZ*TO_RAD);
                // console.log(this.matrix);
            }
        })()
    }
    RedGL['extendsProto'](RedCamera, RedBaseObject3D);
    /**DOC:
    {
        code:`PROPERTY`,
        title :`lookAt`,
        description : `
            대상 위치를 바라보는 matrix 생성
        `,
        params : {
            x : [{type : "Number"}],
            y : [{type : "Number"}],
            z : [{type : "Number"}]
        },
        return : 'mat4'
    }
    :DOC*/
    Object.freeze(RedCamera);
})();
