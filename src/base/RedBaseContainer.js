"use strict";
var RedBaseContainer;
(function () {
    /**DOC:
        {
            constructorYn : true,
            title :`RedBaseContainer`,
            description : `
                DisplayContainer 기저층
                프로토타입 확장을 통해서만 사용가능(RedGLUtil.extendsProto 사용)
            `,
            return : 'void'
        }
    :DOC*/
    RedBaseContainer = function () {
        RedGLUtil.throwFunc('RedBaseContainer : 생성자/직접실행으로 사용 할 수 없습니다.')
    }
    RedBaseContainer.prototype = {
        /**DOC:
            {
                code : 'METHOD',
                title :`addChild`,
                description : `addChild`,
                params:{
                    child : [
                        {type:'RedMesh,RedSprite3D,RedLine,RedPointUnit'}
                    ]
                },
                example : `//TODO:`,
                return : 'void'
            }
        :DOC*/
        addChild: (function () {
            var t0;
            return function (child) {
                if (
                    !(child instanceof RedMesh)
                    && !(child instanceof RedSprite3D)
                    && !(child instanceof RedLine)
                    && !(child instanceof RedPointUnit)
                ) RedGLUtil.throwFunc('addChild', 'RedMesh,RedSprite3D,RedLine,RedPointUnit Instance만 가능');
                t0 = this['children'].indexOf(child);
                if (t0 != -1) child = this['children'].splice(t0, 1);
                this['children'].push(child);
            }
        })(),
        /**DOC:
            {
                code : 'METHOD',
                title :`addChildAt`,
                description : `addChildAt`,
                params:{
                    child : [
                        {type:'RedMesh,RedSprite3D,RedLine,RedPointUnit'}
                    ],
                    index : [
                        {type:'uint'}
                    ]
                },
                example : `//TODO:`,
                return : 'void'
            }
        :DOC*/
        addChildAt: (function () {
            var t0;
            return function (child, index) {
                if (
                    !(child instanceof RedMesh)
                    && !(child instanceof RedSprite3D)
                    && !(child instanceof RedLine)
                    && !(child instanceof RedPointUnit)
                ) RedGLUtil.throwFunc('addChildAt', 'RedMesh,RedSprite3D,RedLine,RedPointUnit Instance만 가능');
                t0 = this['children'].indexOf(child);
                this['children'].splice(t0, 0, child);
            }
        })(),
        /**DOC:
            {
                code : 'METHOD',
                title :`removeChild`,
                description : `removeChild`,
                params:{
                    child : [
                        {type:'RedMesh,RedSprite3D,RedLine,RedPointUnit'}
                    ]
                },
                example : `//TODO:`,
                return : 'void'
            }
        :DOC*/
        removeChild: (function () {
            var t0;
            return function (child) {
                t0 = this['children'].indexOf(child);
                if (t0 == -1) RedGLUtil.throwFunc('removeChild', '존재하지 않는 RedMesh를 삭제하려고 함');
                else this['children'].splice(t0, 1);
            }
        })(),
        /**DOC:
            {
                code : 'METHOD',
                title :`removeChildAt`,
                description : `removeChildAt`,
                params:{
                    index : [
                        {type:'uint'}
                    ]
                },
                example : `//TODO:`,
                return : 'void'
            }
        :DOC*/
        removeChildAt: (function () {
            var t0;
            return function (index) {
                if (typeof index != 'number') RedGLUtil.throwFunc('removeChildAt', 'index가 Number형이 아님 ');
                this['children'].splice(t0, 1);
            }
        }),
        /**DOC:
            {
                code : 'METHOD',
                title :`removeChildAll`,
                description : `removeChildAll`,
                example : `//TODO:`,
                return : 'void'
            }
        :DOC*/
        removeChildAll: function () {
            this['children'].length = 0
        },
        /**DOC:
            {
                code : 'METHOD',
                title :`getChildAt`,
                description : `getChildAt`,
                params:{
                    index : [
                        {type:'uint'}
                    ]
                },
                example : `//TODO:`,
                return : 'RedMesh,RedSprite3D,RedLine,RedPointUnit'
            }
        :DOC*/
        getChildAt: function (index) {
            if (typeof index != 'number') RedGLUtil.throwFunc('getChildAt', 'index가 Number형이 아님 ');
            return this['children'][index];
        },
        /**DOC:
            {
                code : 'METHOD',
                title :`getChildIndex`,
                description : `getChildIndex`,
                params:{
                    child : [
                        {type:'RedMesh,RedSprite3D,RedLine,RedPointUnit'}
                    ]
                },
                example : `//TODO:`,
                return : 'int'
            }
        :DOC*/
        getChildIndex: function (child) {
            return this['children'].indexOf(child);
        },
        // getChildByName: function () {
        //     //TODO: 
        // },
        // setChildIndex: function (v) {
        //     //TODO: 
        // },
        /**DOC:
            {
                code : 'METHOD',
                title :`numChildren`,
                description : `numChildren`,
                params:{
                    target : [
                        {type:'RedMesh,RedSprite3D,RedLine,RedPointUnit'}
                    ]
                },
                example : `//TODO:`,
                return : 'uint'
            }
        :DOC*/
        numChildren: function (target) {
            return this['children'].length;
        }
    };
    Object.freeze(RedBaseContainer);
})();
