"use strict";
var RedPlane;
(function () {
    var makeData;
    makeData = (function () {
        var width_half;
        var height_half;
        var gridX;
        var gridY;
        var gridX1;
        var gridY1;
        var segment_width;
        var segment_height;
        var ix, iy;
        var tX, tY;
        var a, b, c, d;
        var tType, tDatas
        return function (redGL, width, height, segmentW, segmentH) {
            width = width || 1, height = height || 1
            segmentW = segmentW || 1, segmentH = segmentH || 1
            width_half = width / 2, height_half = height / 2
            gridX = Math.floor(segmentW) || 1, gridY = Math.floor(segmentH) || 1
            gridX1 = gridX + 1, gridY1 = gridY + 1
            segment_width = width / gridX, segment_height = height / gridY

            // TODO: 중복방지

            // 기존에 생성된 녀석이면 생성된 프리미티브 정보를 넘긴다.
            tType = 'RedPlane' + '_' + width + '_' + height + '_' + segmentW + '_' + segmentH

            ////////////////////////////////////////////////////////////////////////////
            // 데이터 생성!
            // buffers Data
            var interleaveData = [];
            var indexData = []
            // generate vertices, normals and uvs
            for (iy = 0; iy < gridY1; iy++) {
                tY = iy * segment_height - height_half
                // position
                for (ix = 0; ix < gridX1; ix++) {
                    tX = ix * segment_width - width_half,
                        interleaveData.push(tX, - tY, 0) // position
                        interleaveData.push(0, 0, 1) // normal
                        interleaveData.push(ix / gridX, 1 - (iy / gridY)) // texcoord
                }
            }
            // indexData
            for (iy = 0; iy < gridY; iy++) {
                for (ix = 0; ix < gridX; ix++) {
                    a = ix + gridX1 * iy,
                        b = ix + gridX1 * (iy + 1),
                        c = (ix + 1) + gridX1 * (iy + 1),
                        d = (ix + 1) + gridX1 * iy,
                        // faces
                        indexData.push(a, b, d, b, c, d)
                }
            }
            ////////////////////////////////////////////////////////////////////////////
            // console.log(redGL['__datas']['RedPrimitive'])
            return {
                interleaveData: interleaveData,
                indexData: indexData,
                type: tType,
                interleaveBuffer: RedBuffer(
                    redGL,
                    tType + '_interleaveBuffer',
                    new Float32Array(interleaveData),
                    RedBuffer.ARRAY_BUFFER, [{
                        attributeKey: 'aVertexPosition',
                        size: 3,
                        normalize: false
                    },
                    {
                        attributeKey: 'aNormal',
                        size: 3,
                        normalize: false
                    },
                    {
                        attributeKey: 'aTexcoord',
                        size: 2,
                        normalize: false
                    }
                    ]
                ),
                indexBuffer: RedBuffer(
                    redGL,
                    tType + '_indexBuffer',
                    new Uint16Array(indexData),
                    RedBuffer.ELEMENT_ARRAY_BUFFER
                )
            }
        }
    })();
    RedPlane = function (redGL, width, height, segmentW, segmentH) {
        if (!(this instanceof RedPlane)) return new RedPlane(redGL, width, height, segmentW, segmentH)
        if (!(redGL instanceof RedGL)) throw 'RedPrimitive : RedGL 인스턴스만 허용됩니다.'
        /**DOC:
            {
                code : 'PROPERTY',
                title :`interleaveBuffer`,
                description : `
                    interleaveBuffer 정보
                `,
                example : `
                    // TODO:
                `,
                return : 'RedBuffer Instance'
            }
        :DOC*/
        var t0;
        t0 = makeData(redGL, width, height, segmentW, segmentH);
        this['interleaveBuffer'] = t0['interleaveBuffer']
        /**DOC:
            {
                code : 'PROPERTY',
                title :`indexBuffer`,
                description : `
                    indexBuffer 정보
                `,
                example : `
                    // TODO:
                `,
                return : 'RedBuffer Instance'
            }
        :DOC*/
        this['indexBuffer'] = t0['indexBuffer']
        this['_UUID'] = RedGL['makeUUID']();
        Object.freeze(this)
        console.log(this)
    }
    RedPlane.prototype = RedGeometry.prototype;
    Object.freeze(RedPlane);
})()