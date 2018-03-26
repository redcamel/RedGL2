"use strict";
var RedWorld;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedWorld`,
        description : `
            RedWorld Instance 생성자.
            RedWorld는 RedView를 소유하며 이는 렌더리스트로서 작동한다.. 
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
        this['_viewList'] = [];
        this['_viewMap'] = {};
        this['_UUID'] = RedGL['makeUUID']();
        Object.seal(this)
    };
    RedWorld.prototype = {
        /**DOC:
            {
                code:`FUNCTION`,
                title :`addView`,
                description : `
                    렌더정보 추가.
                    정상처리된다면 내부적으로 <b>RedView</b>이 생성됨.
                `,
                params : {
                    View :[
                        {type:'RedView'},
                        '추가할 RedView Instance'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'RedWorld Instance'
            }
        :DOC*/
        addView: function (View) {
            if (!(View instanceof RedView)) RedGLUtil.throwFunc('RedView Instance만 허용함.')
            this['_viewMap'][View['key']] = View;
            this['_viewList'].push(View);
            return this;
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`getView`,
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
                return : 'RedView'
            }
        :DOC*/
        getView: function (key) {
            return this['_viewMap'][key]
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`delView`,
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
        delView: function (key) {
            var t0, t1
            if (t0 = this['_viewMap'][key]) {
                t1 = this['_viewList'].indexOf(t0);
                this['_viewList'].splice(t1, 1)
                delete this['_viewMap'][key]
            }
            return this;
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`hasView`,
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
        hasView: function (key) {
            return this['_viewMap'][key] ? true : false
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`getViewList`,
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
        getViewList: function () {
            return this['_viewList'].concat();
        }
    };
    Object.freeze(RedWorld);
})();
