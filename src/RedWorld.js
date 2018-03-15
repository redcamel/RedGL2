"use strict";
var RedWorld;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedWorld`,
        description : `
            RedWorld 인스턴스 생성자.
            RedWorld는 RedRenderItem를 소유하며 이는 렌더리스트로서 작동한다.. 
        `,
        params : {
            key :[
                {type:'String'},
                '고유키'
            ]
        },
        example : `
            // TODO       
        `,
        return : 'RedWorld Instance'
    }
	:DOC*/
    RedWorld = function () {
        if (!(this instanceof RedWorld)) return new RedWorld();
        this['_renderList'] = [];
        this['_renderMap'] = {};
        this['_UUID'] = RedGL['makeUUID']();
        Object.seal(this)
    };
    RedWorld.prototype = {
        /**DOC:
            {
                code:`FUNCTION`,
                title :`render`,
                description : `
                    등록된 RedRenderItem을 기반으로 렌더링을 실행함
                `,
                return : 'void'
            }
        :DOC*/
        render: (function () {
            var worldRect;
            var valueParser;
            // 숫자면 숫자로 %면 월드대비 수치로 변경해줌
            valueParser = function (rect) {
                rect.forEach(function (v, index) {
                    if (typeof v == 'number') worldRect[index] = v;
                    else worldRect[index] *= parseFloat(v) / 100;
                })
                return rect;
            }
            return function () {
                worldRect = [0, 0, document.body.clientWidth, document.body.clientHeight];
                console.log('--렌더시작')
                this['_renderList'].forEach(function (v) {
                    // 렌더할 사이즈와 위치 정보를 생성하고
                    console.log("render", v['key'], v['_x'], v['_y'], v['_width'], v['_height'])
                    console.log(valueParser(worldRect))
                    // TODO: 카메라 퍼스펙티브를 먹여준뒤..
                    // TODO: 씬의 자식들을 렌더링한다.
                })
                console.log('--렌더종료')
            }
        })(),
        /**DOC:
            {
                code:`FUNCTION`,
                title :`addRenderItem`,
                description : `
                    렌더정보 추가.
                    정상처리된다면 내부적으로 <b>RedRenderItem</b>이 생성됨.
                `,
                params : {
                    renderItem :[
                        {type:'RedRenderItem'},
                        '추가할 RedRenderItem Instance'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'RedWorld Instance'
            }
        :DOC*/
        addRenderItem: function (renderItem) {
            if (!(renderItem instanceof RedRenderItem)) RedGL['throwFunc']('RedRenderItem 인스턴스만 허용함.')
            this['_renderMap'][renderItem['key']] = renderItem;
            this['_renderList'].push(renderItem);
            return this;
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`getRenderItem`,
                description : `고유키 기반 렌더정보 검색`,
                params : {
                    key :[
                        {type:'String'},
                        '고유키'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'RedRenderItem'
            }
        :DOC*/
        getRenderItem: function (key) {
            return this['_renderMap'][key]
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`delRenderItem`,
                description : `렌더정보 삭제`,
                params : {
                    key :[
                        {type:'String'},
                        '고유키'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'RedWorld Instance'
            }
        :DOC*/
        delRenderItem: function (key) {
            var t0, t1
            if (t0 = this['_renderMap'][key]) {
                t1 = this['_renderList'].indexOf(t0);
                this['_renderList'].splice(t1, 1)
                delete this['_renderMap'][key]
            }
            return this;
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`hasRenderItem`,
                description : `고유키 기반 렌더정보 존재여부`,
                params : {
                    key :[
                        {type:'String'},
                        '고유키'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'Boolean'
            }
        :DOC*/
        hasRenderItem: function (key) {
            return this['_renderMap'][key] ? true : false
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`getRenderItemList`,
                description : `고유키 기반 렌더정보 검색`,
                params : {
                    key :[
                        {type:'String'},
                        '고유키'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'Array'
            }
        :DOC*/
        getRenderItemList: function () {
            return this['_renderList'].concat();
        }
    };
    Object.freeze(RedWorld);
})();
