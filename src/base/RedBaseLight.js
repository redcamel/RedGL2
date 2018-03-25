"use strict";
var RedBaseLight;
(function () {
    RedBaseLight = {}
    RedBaseLight.prototype = {
        setColor: function (color) {
            RedGLUtil.hexToRGB.call(this,color)
            this['color'][0] = this.r
            this['color'][1] = this.g
            this['color'][2] = this.b
            this['color'][3] = this.alpha
        }
    }
    Object.freeze(RedBaseLight)

})();