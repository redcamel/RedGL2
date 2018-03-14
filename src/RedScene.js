"use strict";
var RedScene;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedScene`,
        description : `
            RedScene 인스턴스 생성자.
        `,
        return : 'RedScene Instance'
    }
	:DOC*/
    RedScene = function () {
        if (!(this instanceof RedScene)) return new RedScene();
        this['_UUID'] = RedGL['makeUUID']();
    };
    RedScene.prototype = {
    };
    Object.freeze(RedScene);
})();
