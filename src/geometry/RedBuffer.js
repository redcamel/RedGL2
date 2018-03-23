"use strict";
var RedBuffer;
(function () {
    var tGL;
    var checkDataType;
    var tBuffer
    var tBufferType
    checkDataType = function (bufferType, v) {
        switch (bufferType) {
            case RedBuffer.ARRAY_BUFFER:
                tBufferType = tGL.ARRAY_BUFFER
                if (v instanceof Float32Array || v instanceof Float64Array) {
                    if (v instanceof Float32Array) return tGL.FLOAT;
                    if (v instanceof Float64Array) return tGL.FLOAT;
                } else RedGL.throwFunc('RedBuffer : 올바른 TypedArray(RedBuffer.ARRAY_BUFFER)형식을 사용해야합니다.')
                break
            case RedBuffer.ELEMENT_ARRAY_BUFFER:
                tBufferType = tGL.ELEMENT_ARRAY_BUFFER
                if (
                    v instanceof Uint8Array || v instanceof Uint16Array || v instanceof Uint32Array
                    || v instanceof Int8Array || v instanceof Int16Array || v instanceof Int32Array
                ) {
                    if (v instanceof Int8Array) return tGL.BYTE
                    if (v instanceof Uint8Array) return tGL.UNSIGNED_BYTE
                    if (v instanceof Uint16Array) return tGL.UNSIGNED_SHORT
                    if (v instanceof Uint32Array) return tGL.UNSIGNED_INT
                    if (v instanceof Int16Array) return tGL.SHORT
                    if (v instanceof Int32Array) return tGL.INT
                } else RedGL.throwFunc('RedBuffer : 올바른 TypedArray(RedBuffer.ELEMENT_ARRAY_BUFFER)형식을 사용해야합니다.')
                break
            default:
                RedGL.throwFunc('RedBuffer : bufferType - 지원하지 않는 버퍼타입입니다. ')
        }
    }
    RedBuffer = function (redGL, key, data, bufferType, interleaveInfo) {
        var t0;
        // bufferType, key, shaderPointerKey, typedArrayData, pointSize, pointNum, glArrayType, normalize, stride, offset, drawMode
        if (!(this instanceof RedBuffer)) return new RedBuffer(redGL, key, data, bufferType, interleaveInfo)
        if (!(redGL instanceof RedGL)) RedGL.throwFunc('RedBuffer : RedGL 인스턴스만 허용됩니다.')
        if (typeof bufferType != 'string') RedGL.throwFunc('RedBuffer : bufferType - 문자열만 허용됩니다.')
        if (typeof key != 'string') RedGL.throwFunc('RedBuffer : key - 문자열만 허용됩니다.')

        t0 = 0
        tGL = redGL.gl;

        this.key = key
        this.data = data
        //
        this.glArrayType = checkDataType(bufferType, data);
        this.bufferType = tBufferType;
        this.drawMode = tGL.STATIC_DRAW
        if (interleaveInfo) {
            this.interleaveInfo = interleaveInfo

            for (var k in interleaveInfo) {
                interleaveInfo[k]['offset'] = t0
                t0 += interleaveInfo[k]['size']
            }
            this.stride = t0;
            this.pointNum = data.length / t0;
        } else {
            this.pointNum = data.length;
        }

        this['webglBuffer'] = tGL.createBuffer()
        tGL.bindBuffer(tBufferType, this['webglBuffer']);
        tGL.bufferData(tBufferType, this.data, this.drawMode);

        this['_UUID'] = RedGL['makeUUID']();
        console.log(this)
        this.updateData = function (v) {
           
            this.data = v
            tGL.bindBuffer(this.bufferType, this['webglBuffer']);
            tGL.bufferData(this.bufferType, this.data, this.drawMode);
        }
    }
    RedBuffer.dataMake = function () {
        //TODO: 
    }
    RedBuffer.ARRAY_BUFFER = 'arrayBuffer';
    RedBuffer.ELEMENT_ARRAY_BUFFER = 'elementArrayBuffer';
    Object.freeze(RedBuffer);
})()