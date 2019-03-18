"use strict";
var RedLinePoint;
(function () {
    RedLinePoint = function (x, y, z) {
        if (!(this instanceof RedLinePoint)) return new RedLinePoint(x, y, z);
        this['_inPoint'] = [0, 0, 0];
        this['_point'] = [x, y, z];
        this['_outPoint'] = [0, 0, 0];
        this['_UUID'] = RedGL.makeUUID();
        console.log(this)
    };
    Object.freeze(RedLinePoint);
})();