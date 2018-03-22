"use strict";
var RedSystemShaderCode;
(function () {
    RedSystemShaderCode = {
        vShareSource: [
            'uniform float uTime',
            'varying float vTime',

            'uniform vec2 uResolution',

            'uniform mat4 uMVMatrix',
            'uniform mat4 uPMatrix',
            'uniform mat4 uCameraMatrix'
        ],
        fShareSource: [
            'varying float vTime'
        ],
        systemUniform: {}
    }
    RedSystemShaderCode.vShareSource.forEach(function (v) {
        v = v.split(' ')
        if (v[0] == 'uniform') {
            RedSystemShaderCode.systemUniform[v[2]] = 1
        }
    })
    console.log(RedSystemShaderCode)
    Object.freeze(RedSystemShaderCode)
})();