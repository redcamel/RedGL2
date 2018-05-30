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
		return function (redGL, width, height, widthSegments, heightSegments) {
			width = width || 1, height = height || 1
			widthSegments = widthSegments || 1, heightSegments = heightSegments || 1
			width_half = width / 2, height_half = height / 2
			gridX = Math.floor(widthSegments) || 1, gridY = Math.floor(heightSegments) || 1
			gridX1 = gridX + 1, gridY1 = gridY + 1
			segment_width = width / gridX, segment_height = height / gridY

			// TODO: 중복방지

			// 기존에 생성된 녀석이면 생성된 프리미티브 정보를 넘긴다.
			tType = 'RedPlane' + '_' + width + '_' + height + '_' + widthSegments + '_' + heightSegments

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
						interleaveData.push(tX, -tY, 0) // position
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
					RedBuffer.ARRAY_BUFFER,
					[
						RedInterleaveInfo('aVertexPosition', 3),
						RedInterleaveInfo('aVertexNormal', 3),
						RedInterleaveInfo('aTexcoord', 2)
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
		 example : `
			 RedPlane(RedGL Instance);
			 RedPlane(RedGL Instance, 1, 1);
			 RedPlane(RedGL Instance, 1, 1, 16, 16);
		 `,
		 return : 'RedPlane Instance'
	 }
	 :DOC*/
	RedPlane = function (redGL, width, height, widthSegments, heightSegments) {
		if (!(this instanceof RedPlane)) return new RedPlane(redGL, width, height, widthSegments, heightSegments)
		if (!(redGL instanceof RedGL)) throw 'RedPrimitive : RedGL 인스턴스만 허용됩니다.'
		var t0;
		t0 = makeData(redGL, width, height, widthSegments, heightSegments);
		// 유일키 방어
		if (!redGL['_datas']['Primitives']) redGL['_datas']['Primitives'] = {};
		if (redGL['_datas']['Primitives'][t0['type']]) return redGL['_datas']['Primitives'][t0['type']]
		else redGL['_datas']['Primitives'][t0['type']] = this
		this['interleaveBuffer'] = t0['interleaveBuffer']
		this['indexBuffer'] = t0['indexBuffer']
		this['_UUID'] = RedGL['makeUUID']();
		// Object.freeze(this)
		// console.log(this)
	}
	RedPlane.prototype = RedGeometry.prototype;
	Object.freeze(RedPlane);
})()