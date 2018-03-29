"use strict";
var RedBaseMaterial;
(function () {
    RedBaseMaterial = function () {
        RedGLUtil.throwFunc('RedBaseMaterial : 생성자/직접실행으로 사용 할 수 없습니다.')
    }
    RedBaseMaterial.prototype = {
        checkProperty: function () {
            var i2
            var tUniformGroup, tUniformLocationInfo, tWebGLUniformLocation
            tUniformGroup = this['program']['uniformLocation'];
            i2 = tUniformGroup.length
            while (i2--) {
                tUniformLocationInfo = tUniformGroup[i2];
                tWebGLUniformLocation = tUniformLocationInfo['location'];
                if (tWebGLUniformLocation) {
                    this.hasOwnProperty(tUniformLocationInfo['materialPropertyName']) ? 0 : RedGLUtil.throwFunc('Material에 ', tUniformLocationInfo['materialPropertyName'], '이 정의 되지않았습니다.');
                }
            }
        }
    }
    Object.freeze(RedBaseMaterial)

})();