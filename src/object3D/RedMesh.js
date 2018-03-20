"use strict";
var RedMesh;
(function () {
    RedMesh = function (buffer, testProgram) {
        if (!(this instanceof RedMesh)) return new RedMesh(buffer, testProgram);
        this['program'] = testProgram;
        this['buffer'] = buffer;
        this.matrix = mat4.create()
        mat4.translate(this.matrix, this.matrix, [0, 0, -100])
        this['_UUID'] = RedGL['makeUUID']();
    }
    RedGL['extendsProto'](RedMesh, RedBaseContainer);
    RedGL['extendsProto'](RedMesh, RedBaseObject3D);
    Object.freeze(RedMesh);
})();