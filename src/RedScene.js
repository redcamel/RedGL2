"use strict";
var RedScene;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedScene`,
        description : `
            RedScene Instance 생성자.
        `,
        return : 'RedScene Instance'
    }
	:DOC*/
    RedScene = function () {
        if (!(this instanceof RedScene)) return new RedScene();
        /**DOC:
            {
                title :`children`,
                description : `
                    자식 리스트
                `,
                return : 'Array'
            }
        :DOC*/
        this['children'] = []
        this['_UUID'] = RedGL['makeUUID']();
        Object.seal(this)
    };
    RedScene.prototype = {};
    RedGLUtil['extendsProto'](RedScene, RedBaseContainer)
    Object.freeze(RedScene);
})();
