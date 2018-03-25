"use strict";
var RedBaseLight;
(function () {
    RedBaseLight = {}
    RedBaseLight.prototype = {
        setColor: function (color, alpha) {
            alpha = alpha!=undefined ? alpha : 1
            RedGLUtil.hexToRGB.call(this, color, alpha)
            this['color'][0] = this.r
            this['color'][1] = this.g
            this['color'][2] = this.b
            this['color'][3] = this.alpha
        }
    }
    Object.freeze(RedBaseLight)

})();