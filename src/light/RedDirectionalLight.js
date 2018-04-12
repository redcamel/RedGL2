"use strict";
var RedDirectionalLight;
(function () {
    /**DOC:
        {
            constructorYn : true,
            title :`RedDirectionalLight`,
            description : `
                RedDirectionalLight Instance 생성
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
                RedDirectionalLight(RedGL Instance, hex, alpha)
            `,
            return : 'RedDirectionalLight Instance'
        }
    :DOC*/
    RedDirectionalLight = function (redGL, hex, alpha) {
        if (!(this instanceof RedDirectionalLight)) return new RedDirectionalLight(redGL, hex, alpha);
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
                description : `
                기본값 : 0
                포지션값은 광원계산시 0,0,0을 바라보는 방향벡터로 계산됨
                `,
                return : 'Number'
            }
        :DOC*/
        this['x'] = 0
        /**DOC:
            {
                title :`y`,
                description : `
                기본값 : 0
                포지션값은 광원계산시 0,0,0을 바라보는 방향벡터로 계산됨
                `,
                return : 'Number'
            }
        :DOC*/
        this['y'] = -1
        /**DOC:
            {
                title :`z`,
                description : `
                기본값 : 0
                포지션값은 광원계산시 0,0,0을 바라보는 방향벡터로 계산됨
                `,
                return : 'Number'
            }
        :DOC*/
        this['z'] = 0;
        this['_UUID'] = RedGL['makeUUID']();

        /**DOC:
            {
                title :`type`,
                description : `RedDirectionalLight['type']`,
                return : 'String'
            }
        :DOC*/
        Object.defineProperty(this, 'type', {
            configurable: false,
            writable: false,
            value: RedDirectionalLight['type']
        })
        this['debugObject'] = RedMesh(redGL, RedBox(redGL, 1, 1, 1), RedColorMaterial(redGL))
        this['debugObject']['drawMode'] = redGL.gl.LINE_STRIP
        console.log(this)
    }
    /**DOC:
        {
            title :`RedDirectionalLight.type`,
            code : 'CONST',
            description : `RedDirectionalLight 타입상수`,
            return : 'String'
        }
    :DOC*/
    RedDirectionalLight['type'] = 'RedDirectionalLight'
    RedGLUtil['copyProto'](RedDirectionalLight, RedBaseLight);
    Object.defineProperty(RedDirectionalLight.prototype, 'alpha', {
        get: function () {
            return this['color'][3]
        },
        set: function (v) {
            this['color'][3] = v
        }
    })
    Object.freeze(RedDirectionalLight)

})()