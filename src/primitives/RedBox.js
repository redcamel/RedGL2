"use strict";
var RedBox;
(function () {
	var makeData;
	makeData = (function () {
		var numberOfVertices;
		var groupStart;
		var buildPlane;
		var tType;
		buildPlane = function (interleaveData, indexData, u, v, w, udir, vdir, width, height, depth, gridX, gridY) {
			var segmentWidth = width / gridX;
			var segmentHeight = height / gridY;
			var widthHalf = width / 2;
			var heightHalf = height / 2;
			var depthHalf = depth / 2;
			var gridX1 = gridX + 1;
			var gridY1 = gridY + 1;
			var vertexCounter = 0;
			var groupCount = 0;
			var ix, iy;
			var vector = []
			// generate vertices, normals and uvs
			for (iy = 0; iy < gridY1; iy++) {
				var y = iy * segmentHeight - heightHalf;
				for (ix = 0; ix < gridX1; ix++) {
					var x = ix * segmentWidth - widthHalf;
					// set values to correct vector component
					vector[u] = x * udir;
					vector[v] = y * vdir;
					vector[w] = depthHalf;
					// now apply vector to vertex buffer
					interleaveData.push(vector.x, vector.y, vector.z);
					// set values to correct vector component
					vector[u] = 0;
					vector[v] = 0;
					vector[w] = depth > 0 ? 1 : -1;
					// now apply vector to normal buffer
					interleaveData.push(vector.x, vector.y, vector.z);
					// uvs
					interleaveData.push(ix / gridX, 1 - (iy / gridY));
					// counters
					vertexCounter += 1;
				}
			}
			// indices
			// 1. you need three indices to draw a single face
			// 2. a single segment consists of two faces
			// 3. so we need to generate six (2*3) indices per segment
			for (iy = 0; iy < gridY; iy++) {
				for (ix = 0; ix < gridX; ix++) {
					var a = numberOfVertices + ix + gridX1 * iy;
					var b = numberOfVertices + ix + gridX1 * (iy + 1);
					var c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
					var d = numberOfVertices + (ix + 1) + gridX1 * iy;
					// faces
					indexData.push(a, b, d, b, c, d);
					// increase counter
					groupCount += 6;
				}
			}
			// calculate new start value for groups
			groupStart += groupCount;
			// update total number of vertices
			numberOfVertices += vertexCounter;

		}
		return function (redGL, width, height, depth, widthSegments, heightSegments, depthSegments) {
			width = width || 1;
			height = height || 1;
			depth = depth || 1;
			// segments
			widthSegments = widthSegments || 1;
			heightSegments = heightSegments || 1;
			depthSegments = depthSegments || 1;

			// TODO: 중복방지
			// 기존에 생성된 녀석이면 생성된 프리미티브 정보를 넘긴다.
			tType = 'RedBox' + '_' + width + '_' + height + '_' + depth + '_' + widthSegments + '_' + heightSegments + '_' + depthSegments
			console.log(tType)

			////////////////////////////////////////////////////////////////////////////
			// 데이터 생성!

			// buffers Data
			var interleaveData = [];
			var indexData = [];
			numberOfVertices = 0;
			groupStart = 0;
			buildPlane(interleaveData, indexData, 'z', 'y', 'x', -1, -1, depth, height, width, depthSegments, heightSegments, 0); // px
			buildPlane(interleaveData, indexData, 'z', 'y', 'x', 1, -1, depth, height, -width, depthSegments, heightSegments, 1); // nx
			buildPlane(interleaveData, indexData, 'x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2); // py
			buildPlane(interleaveData, indexData, 'x', 'z', 'y', 1, -1, width, depth, -height, widthSegments, depthSegments, 3); // ny
			buildPlane(interleaveData, indexData, 'x', 'y', 'z', 1, -1, width, height, depth, widthSegments, heightSegments, 4); // pz
			buildPlane(interleaveData, indexData, 'x', 'y', 'z', -1, -1, width, height, -depth, widthSegments, heightSegments, 5); // nz
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
		 title :`RedBox`,
		 description : `
			 RedBox Instance 생성기.
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
			 depth : [
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
			 ],
			 depthSegments : [
				 {type:'uint'},
				 '기본값 : 1'
			 ]
		 },
		 example : `
			 RedBox(RedGL Instance);
			 RedBox(RedGL Instance, 1, 1, 1);
			 RedBox(RedGL Instance, 1, 1, 1, 16, 16, 16);
		 `,
		 return : 'RedBox Instance'
	 }
	 :DOC*/
	RedBox = function (redGL, width, height, depth, widthSegments, heightSegments, depthSegments) {
		if (!(this instanceof RedBox)) return new RedBox(redGL, width, height, depth, widthSegments, heightSegments, depthSegments)
		if (!(redGL instanceof RedGL)) throw 'RedPrimitive : RedGL 인스턴스만 허용됩니다.'

		var t0;
		t0 = makeData(redGL, width, height, depth, widthSegments, heightSegments, depthSegments);

		// 유일키방어
		if (!redGL['_datas']['Primitives']) redGL['_datas']['Primitives'] = {};
		if (redGL['_datas']['Primitives'][t0['type']]) return redGL['_datas']['Primitives'][t0['type']];
		else redGL['_datas']['Primitives'][t0['type']] = this;
		//
		this['interleaveBuffer'] = t0['interleaveBuffer']
		this['indexBuffer'] = t0['indexBuffer']
		this['_UUID'] = RedGL['makeUUID']();
		// Object.freeze(this)
		// console.log(this)
	}
	RedBox.prototype = RedGeometry.prototype;
	Object.freeze(RedBox);
})()
