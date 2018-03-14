"use strict";
var RedRenderItem;
(function () {
    var renderItemMap;
    renderItemMap = {};
    RedRenderItem = function (key, scene, camera) {
        if (renderItemMap[key]) return renderItemMap[key]
        if (!(scene instanceof RedScene)) RedGL['throwFunc']('RedWorld 인스턴스만 허용')
        if (!(camera instanceof RedCamera)) RedGL['throwFunc']('RedCamera 인스턴스만 허용')
        this['scene'] = scene;
        this['camera'] = camera;
        renderItemMap[key] = this;
    };
    RedRenderItem['getList'] = function () {
        return renderItemMap
    }
    Object.freeze(RedRenderItem);
})();
