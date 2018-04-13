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
        /**DOC:
            {
                title :`debug`,
                description : `디버그오브젝트 활성화 여부`,
                return : 'Boolean'
            }
        :DOC*/
        this['debug'] = false
        this['debugObject'] = RedSprite3D(
            redGL,
            RedBitmapMaterial(
                redGL,
                RedBitmapTexture(
                    redGL,
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEY3MkNCREQzRUMwMTFFODkxOUZBQUY2QzI1MUMxRkYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEY3MkNCREUzRUMwMTFFODkxOUZBQUY2QzI1MUMxRkYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RjcyQ0JEQjNFQzAxMUU4OTE5RkFBRjZDMjUxQzFGRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4RjcyQ0JEQzNFQzAxMUU4OTE5RkFBRjZDMjUxQzFGRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnFzHU0AABcbSURBVHja5Ft7lCRV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'
                )
            )
        )
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