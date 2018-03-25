"use strict";
var RedBaseLight;
(function () {
    RedBaseLight = {}
    RedBaseLight.prototype = {
        setColor: (function(){
            var t0;
            return function (color, alpha) {
                color = color ? color : '#ff2211'
                t0 = RedGLUtil.hexToRGB.call(this, color, alpha);
                this['color'][0] = t0[0]
                this['color'][1] = t0[1]
                this['color'][2] = t0[2]
                this['color'][3] = t0[3]
            }
        })()
    }
    Object.freeze(RedBaseLight)

})();