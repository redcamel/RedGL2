"use strict";
var RedMaterial;
(function () {
    RedMaterial = function (redProgram) {
        if (!(this instanceof RedMaterial)) return new RedMaterial(redProgram);
        if (!(redProgram instanceof RedProgram)) RedGL.throwFunc('RedProgram만 허용')
        this['program'] = redProgram
        this['attributeLocation'] = redProgram.attributeLocation;
        this['uniformLocation'] = redProgram.uniformLocation;
        this['_UUID'] = RedGL['makeUUID']();
        Object.freeze(this)
    }
    RedMaterial.prototype = {}
    Object.freeze(RedMaterial)
})();