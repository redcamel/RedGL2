"use strict";
var RedPlane;
(function () {
    var makeData;
    makeData = (function () {
        var width_half, height_half;
        var gridX, gridY;
        var gridX1, gridY1;
        var segment_width, segment_height;
        var ix, iy;
        var tX, tY;
        var a, b, c, d;
        return function (redGL, type, width, height, wSegments, hSegments, flipY) {
            width_half = width / 2;
            height_half = height / 2;
            gridX = Math.floor(wSegments) || 1;
            gridY = Math.floor(hSegments) || 1;
            gridX1 = gridX + 1;
            gridY1 = gridY + 1;
            segment_width = width / gridX;
            segment_height = height / gridY;
            ////////////////////////////////////////////////////////////////////////////
            // 데이터 생성!
            // buffers Datas
            var interleaveData = [];
            var indexData = [];
            // interleaveData
            for (iy = 0; iy < gridY1; iy++) {
                tY = iy * segment_height - height_half;
                for (ix = 0; ix < gridX1; ix++) {
                    tX = ix * segment_width - width_half;
                    // position, normal, texcoord
                    interleaveData.push(tX, -tY, 0, 0, 0, 1, ix / gridX, flipY ? (1 - (iy / gridY)) : (iy / gridY));
                }
            }
            // indexData
            for (iy = 0; iy < gridY; iy++) {
                for (ix = 0; ix < gridX; ix++) {
                    a = ix + gridX1 * iy;
                    b = ix + gridX1 * (iy + 1);
                    c = (ix + 1) + gridX1 * (iy + 1);
                    d = (ix + 1) + gridX1 * iy;
                    indexData.push(a, b, d, b, c, d)
                }
            }
            ////////////////////////////////////////////////////////////////////////////
            return {
                interleaveData: interleaveData,
                indexData: indexData,
                type: type,
                interleaveBuffer: RedBuffer(
                    redGL,
                    type + '_interleaveBuffer',
                    RedBuffer.ARRAY_BUFFER,
                    new Float32Array(interleaveData),
                    [
                        RedInterleaveInfo('aVertexPosition', 3),
                        RedInterleaveInfo('aVertexNormal', 3),
                        RedInterleaveInfo('aTexcoord', 2)
                    ]
                ),
                indexBuffer: RedBuffer(
                    redGL,
                    type + '_indexBuffer',
                    RedBuffer.ELEMENT_ARRAY_BUFFER,
                    new Uint32Array(indexData)
                )
            }
        }
    })();
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedPlane`,
		 description : `
			 RedPlane Instance 생성기.
			 Box 형태의 RedGeometry 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 width : [
				 {type:'uint'},
				 '기본값 : 1'
			 ],
			 height : [
				 {type:'uint'},
				 '기본값 : 1'
			 ],
			 widthSegments : [
				 {type:'uint'},
				 '기본값 : 1'
			 ],
			 heightSegments : [
				 {type:'uint'},
				 '기본값 : 1'
			 ]
		 },
		 extends : [
		    'RedGeometry'
		 ],
		 demo : '../example/primitives/RedPlane.html',
		 example : `
			 RedPlane(RedGL Instance);
			 RedPlane(RedGL Instance, 1, 1);
			 RedPlane(RedGL Instance, 1, 1, 16, 16);
		 `,
		 return : 'RedPlane Instance'
	 }
     :DOC*/
    RedPlane = function (redGL, width, height, wSegments, hSegments, flipY) {
        if (!(this instanceof RedPlane)) return new RedPlane(redGL, width, height, wSegments, hSegments, flipY);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPlane : RedGL Instance만 허용.', redGL);
        var tType, tPrimitiveData;
        width = width || 1;
        height = height || 1;
        wSegments = wSegments || 1;
        hSegments = hSegments || 1;
        tType = 'RedPlane' + '_' + width + '_' + height + '_' + wSegments + '_' + hSegments+'_'+flipY;
        // 유일키 방어
        if (!redGL['_datas']['Primitives']) redGL['_datas']['Primitives'] = {};
        if (redGL['_datas']['Primitives'][tType]) return redGL['_datas']['Primitives'][tType];
        else redGL['_datas']['Primitives'][tType] = this;
        //
        tPrimitiveData = makeData(redGL, tType, width, height, wSegments, hSegments, flipY);
        this['interleaveBuffer'] = tPrimitiveData['interleaveBuffer'];
        this['indexBuffer'] = tPrimitiveData['indexBuffer'];
        this['interleaveBuffer']['isPrimitiveBuffer'] = true
        this['indexBuffer']['isPrimitiveBuffer'] = true
        this['_UUID'] = RedGL.makeUUID();
        console.log(this);
    };
    RedPlane.prototype = Object.create(RedGeometry.prototype);
    Object.freeze(RedPlane);
})();