"use strict";
var RedLinePoint;
(function () {
    RedLinePoint = function (x, y, z, inX, inY, inZ, outX, outY, outZ) {
        if (!(this instanceof RedLinePoint)) return new RedLinePoint(x, y, z, inX, inY, inZ, outX, outY, outZ);
        this['_inPoint'] = [inX || 0, inY || 0, inZ || 0];
        this['_point'] = [x || 0, y || 0, z || 0];
        this['_outPoint'] = [outX || 0, outY || 0, outZ || 0];
        this['_UUID'] = RedGL.makeUUID();
        console.log(this)
    };
    Object.freeze(RedLinePoint);
})();