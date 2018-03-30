"use strict";
var RedCamera;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedCamera`,
        description : `
            RedCamera Instance 생성자.
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
    RedGLUtil['extendsProto'](RedCamera, RedBaseObject3D);
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
    RedCamera.prototype['lookAt'] =  (function () {
        var up = new Float32Array([0, 1, 0]);
        return function (x,y,z) {
            //out, eye, center, up
            mat4.lookAt(this['matrix'], [this.x, this.y, this.z], [x, y, z], up);
        }
    })();
    Object.freeze(RedCamera);
})();
