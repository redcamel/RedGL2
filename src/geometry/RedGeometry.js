"use strict";
var RedGeometry;
(function () {
    RedGeometry = function (interleaveBuffer, indexBuffer) {
        // bufferType, key, shaderPointerKey, typedArrayData, pointSize, pointNum, glArrayType, normalize, stride, offset, drawMode
        if (!(this instanceof RedGeometry)) return new RedGeometry(interleaveBuffer, indexBuffer)
        /*
         {
             aVertexPosition: {
                 size: 3,
                 dataType: tGL.FLOAT
             }
         }
     */
        //TODO: 
        this['interleaveBuffer'] = interleaveBuffer
        this['indexBuffer'] = indexBuffer
    }
    Object.freeze(RedGeometry);
})()