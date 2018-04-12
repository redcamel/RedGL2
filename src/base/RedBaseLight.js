"use strict";
var RedBaseLight;
(function () {
    RedBaseLight =function () {
        RedGLUtil.throwFunc('RedBaseLight : 생성자/직접실행으로 사용 할 수 없습니다.')
    }
    RedBaseLight.prototype = {
        setColor: (function () {
            var t0;
            return function (hex, alpha) {
                hex = hex ? hex : '#fff';
                if (alpha == undefined) alpha = 1;
                if (alpha > 1) alpha = 1
                t0 = RedGLUtil.hexToRGB.call(this, hex);
                this['color'][0] = t0[0];
                this['color'][1] = t0[1];
                this['color'][2] = t0[2];
                this['color'][3] = alpha;
            }
        })(),
    }
    Object.freeze(RedBaseLight)

})();