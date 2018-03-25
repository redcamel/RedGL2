"use strict";
var RedGLUtil;
(function () {
    RedGLUtil = {
        throwFunc: function () { throw Array.prototype.slice.call(arguments).join(' ') },
        extendsProto: function (target, from) {
            for (var k in from.prototype) target.prototype[k] = from.prototype[k]
        },
        hexToRGB: function (hex, alpha) {
            var t0;
            if (alpha == undefined) alpha = 1;
            if (typeof alpha != 'number') RedGLUtil.throwFunc('RedGLUtil.hexToRGB : 잘못된 alpha값입니다.', alpha);
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                t0 = hex.substring(1).split('');
                if (t0.length == 3) t0 = [t0[0], t0[0], t0[1], t0[1], t0[2], t0[2]];
                t0 = '0x' + t0.join('');
                this['r'] = ((t0 >> 16) & 255) / 255;
                this['g'] = ((t0 >> 8) & 255) / 255;
                this['b'] = (t0 & 255) / 255;
                this['alpha'] = alpha == undefined ? 1 : alpha
            } else RedGLUtil.throwFunc('RedGLUtil.hexToRGB : 잘못된 hex값입니다.', hex)
        }
    }
    Object.freeze(RedGLUtil)

})();