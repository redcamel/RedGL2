"use strict";
var RedBaseObject3D;
(function () {
    RedBaseObject3D = function () { }
    RedBaseObject3D.prototype = {
        lookAt: (function () {
            var deltaX, deltaY, deltaZ;
            var rotX;
            var HPI;
            var TO_DEGREE;
            TO_DEGREE = 180/Math.PI;
            HPI = 0.5 * Math.PI;
            return function (x, y, z) {
                deltaX = x - this.x;
                deltaY = y - this.y;
                deltaZ = z - this.z;
                rotX = Math.atan2(deltaZ, Math.sqrt(deltaX * deltaX + deltaY * deltaY));
                this.rotationX = (rotX - HPI)*TO_DEGREE;
                this.rotationY = 0;
                this.rotationZ = (-Math.atan2(deltaX, deltaY))*TO_DEGREE;
            }
        })()
    };
    Object.freeze(RedBaseObject3D);
})();
