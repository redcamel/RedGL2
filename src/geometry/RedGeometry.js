"use strict";
var RedGeometry;
(function () {
    RedGeometry = function (buffer) {
        // bufferType, key, shaderPointerKey, typedArrayData, pointSize, pointNum, glArrayType, normalize, stride, offset, drawMode
        if (!(this instanceof RedGeometry)) return new RedGeometry(buffer)
        /*
         {
             aVertexPosition: {
                 size: 3,
                 dataType: tGL.FLOAT
             }
         }
     */
        //TODO: 
        this['buffer'] = buffer
    }
    Object.freeze(RedGeometry);
})()