"use strict";
var RedPointLight;
(function () {
    /**DOC:
        {
            constructorYn : true,
            title :`RedPointLight`,
            description : `
                RedPointLight Instance 생성
            `,
            params : {
                redGL : [
                    {type:'RedGL'}
                ],
                hex : [
                    {type:'hex'}
                ],
                alpha : [
                    {type:'number'},
                    '알파값'
                ]
            },
            example: `
                RedPointLight(RedGL Instance, hex, alpha)
            `,
            return : 'RedPointLight Instance'
        }
    :DOC*/
    RedPointLight = function (redGL, hex, alpha) {
        if (!(this instanceof RedPointLight)) return new RedPointLight(redGL, hex, alpha);
        // 유니폼 프로퍼티
        this['color'] = new Float32Array(4)
        /**DOC:
            {
                title :`intensity`,
                description : `
                    라이트 강도
                    기본값 : 1
                `,
                return : 'Number'
            }
        :DOC*/
        this['intensity'] = 1

        // 일반 프로퍼티
        /**DOC:
            {
                title :`alpha`,
                description : `
                    기본값 : 0.1
                `,
                return : 'Number'
            }
        :DOC*/
        this['alpha'] = alpha == undefined ? 1 : alpha
        this.setColor(hex ? hex : '#fff', this['alpha'])
        /**DOC:
            {
                title :`x`,
                description : `기본값 : 0`,
                return : 'Number'
            }
        :DOC*/
        this['x'] = 0
        /**DOC:
            {
                title :`y`,
                description : `기본값 : 0`,
                return : 'Number'
            }
        :DOC*/
        this['y'] = 0
        /**DOC:
            {
                title :`z`,
                description : `기본값 : 0`,
                return : 'Number'
            }
        :DOC*/
        this['z'] = 0;
        /**DOC:
            {
                title :`radius`,
                description : `
                점광의 반지름
                기본값 : 1
                `,
                return : 'Number'
            }
        :DOC*/
        this['radius'] = 1
        this['_UUID'] = RedGL['makeUUID']();
        /**DOC:
            {
                title :`type`,
                description : `RedPointLight['type']`,
                return : 'String'
            }
        :DOC*/
        Object.defineProperty(this, 'type', {
            configurable: false,
            writable: false,
            value: RedPointLight['type']
        })
        this['debugObject'] = RedMesh(redGL, RedSphere(redGL, 1, 16, 16, 16), RedColorMaterial(redGL))
        this['debugObject']['drawMode'] = redGL.gl.LINE_STRIP
        console.log(this)
    }
    /**DOC:
        {
            title :`RedPointLight.type`,
            code : 'CONST',
            description : `RedPointLight 타입상수`,
            return : 'String'
        }
    :DOC*/
    RedPointLight['type'] = 'RedPointLight'
    RedGLUtil['copyProto'](RedPointLight, RedBaseLight);
    Object.defineProperty(RedPointLight.prototype, 'alpha', {
        get: function () {
            return this['color'][3]
        },
        set: function (v) {
            this['color'][3] = v
        }
    })
    Object.freeze(RedPointLight)

})()