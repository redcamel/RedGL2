"use strict";
var RedBasicShaderCode;
(function () {
    RedBasicShaderCode = {
        vShareSource: [
            'uniform float uTime',
            'varying float vTime',
            'uniform vec2 uResolution',
            'const vec4 uConstTest'
        ],
        fShareSource: [
            'varying float vTime'
        ]
    }
    Object.freeze(RedBasicShaderCode)
})();