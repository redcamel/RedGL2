"use strict";
var RedWorld;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedWorld`,
        description : `
            RedWorld 인스턴스 생성자.
            월드는 RedScene과 RedCamera를 쌍으로 하는 정보를 소유하며 렌더리스트로서 작동한다.. 
        `,
        params : {
            key :[
                {type:'String'},
                '고유키'
            ]
        },
        return : 'RedWorld Instance'
    }
	:DOC*/
    RedWorld = function () {
        if (!(this instanceof RedWorld)) return new RedWorld();
        this['_renderList'] = [];
        this['_renderMap'] = {};
        this['_uuid'] = RedGL['makeUUID']();
    };
    RedWorld.prototype = {
        /**DOC:
            {
                code:`FUNCTION`,
                title :`addRenderItem`,
                description : `
                    렌더정보 추가.
                    정상처리된다면 내부적으로 RedRenderItem이 생성됨.
                `,
                params : {
                    key :[
                        {type:'String'},
                        '고유키'
                    ],
                    scene :[
                        {type:'RedScene'},
                        'RedScene'
                    ],
                    camera :[
                        {type:'RedCamera'},
                        'RedCamera'
                    ]
                },
                return : 'RedWorld Instance'
            }
        :DOC*/
        addRenderItem: function (key, scene, camera) {
            var t0;
            this['_renderMap'][key] = t0 = new RedRenderItem(key, scene, camera);
            this['_renderList'].push(t0);
            return this;
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
                description : `고유키 기반 렌더정보 검색`,
                params : {
                    key :[
                        {type:'String'},
                        '고유키'
                    ]
                },
                return : 'RedRenderItem Instance'
            }
        :DOC*/
        hasRenderItem: function (key) {
            return this['_renderMap'][key] ? true : false
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`hasRenderItem`,
                description : `고유키 기반 렌더정보 검색`,
                params : {
                    key :[
                        {type:'String'},
                        '고유키'
                    ]
                },
                return : 'RedRenderItem Instance'
            }
        :DOC*/
        getRenderItemList: function () {
            return this['_renderList'].concat();
        }
    };
    Object.freeze(RedWorld);
})();
