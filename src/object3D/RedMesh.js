"use strict";
var RedMesh;
(function () {
    RedMesh = function (geometry, material) {
        if (!(this instanceof RedMesh)) return new RedMesh(geometry, material);
        this['geometry'] = geometry;
        this['material'] = material;
        
        this.x = this.y = this.z = 0;
        this.rotationX = this.rotationY = this.rotationZ = 0;
        this.scaleX = this.scaleY = this.scaleZ = 1;
        this['_UUID'] = RedGL['makeUUID']();
    }
    RedGLUtil['extendsProto'](RedMesh, RedBaseContainer);
    RedGLUtil['extendsProto'](RedMesh, RedBaseObject3D);
    Object.freeze(RedMesh);
})();