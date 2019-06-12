/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
var RedBox;
(function () {
	var makeData;
	makeData = (function () {
		var numberOfVertices;
		var groupStart;
		var buildPlane;
		buildPlane = function (interleaveData, indexData, u, v, w, udir, vdir, width, height, depth, gridX, gridY) {
			var segmentWidth = width / gridX;
			var segmentHeight = height / gridY;
			var widthHalf = width / 2, heightHalf = height / 2;
			var depthHalf = depth / 2;
			var gridX1 = gridX + 1, gridY1 = gridY + 1;
			var vertexCounter = 0;
			var groupCount = 0;
			var ix, iy;
			var vector = [];
			for (iy = 0; iy < gridY1; iy++) {
				var y = iy * segmentHeight - heightHalf;
				for (ix = 0; ix < gridX1; ix++) {
					var x = ix * segmentWidth - widthHalf;
					// set values to correct vector component
					vector[u] = x * udir, vector[v] = y * vdir, vector[w] = depthHalf,
						interleaveData.push(vector.x, vector.y, vector.z), // position
						vector[u] = 0, vector[v] = 0, vector[w] = depth > 0 ? 1 : -1,
						interleaveData.push(vector.x, vector.y, vector.z), // normal
						interleaveData.push(ix / gridX, (iy / gridY)), // texcoord
						vertexCounter += 1; // counters
				}
			}
			// indices
			for (iy = 0; iy < gridY; iy++) {
				for (ix = 0; ix < gridX; ix++) {
					var a = numberOfVertices + ix + gridX1 * iy;
					var b = numberOfVertices + ix + gridX1 * (iy + 1);
					var c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
					var d = numberOfVertices + (ix + 1) + gridX1 * iy;
					indexData.push(a, b, d, b, c, d);
					groupCount += 6;
				}
			}
			groupStart += groupCount;
			numberOfVertices += vertexCounter;
		};
		return function (redGL, type, width, height, depth, wSegments, hSegments, dSegments) {
			////////////////////////////////////////////////////////////////////////////
			// 데이터 생성!
			// buffers Data
			var interleaveData = [];
			var indexData = [];
			numberOfVertices = 0;
			groupStart = 0;
			buildPlane(interleaveData, indexData, 'z', 'y', 'x', -1, -1, depth, height, width, dSegments, hSegments, 0); // px
			buildPlane(interleaveData, indexData, 'z', 'y', 'x', 1, -1, depth, height, -width, dSegments, hSegments, 1); // nx
			buildPlane(interleaveData, indexData, 'x', 'z', 'y', 1, 1, width, depth, height, wSegments, dSegments, 2); // py
			buildPlane(interleaveData, indexData, 'x', 'z', 'y', 1, -1, width, depth, -height, wSegments, dSegments, 3); // ny
			buildPlane(interleaveData, indexData, 'x', 'y', 'z', 1, -1, width, height, depth, wSegments, hSegments, 4); // pz
			buildPlane(interleaveData, indexData, 'x', 'y', 'z', -1, -1, width, height, -depth, wSegments, hSegments, 5); // nz
			////////////////////////////////////////////////////////////////////////////
			// console.log(redGL['__datas']['RedPrimitive'])
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
					new Uint16Array(indexData)
				)
			}
		}
	})();
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedBox`,
		 description : `
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
		 extends : [
		    'RedGeometry'
		 ],
		 demo : '../example/primitives/RedBox.html',
		 example : `
			 RedBox(RedGL Instance);
			 RedBox(RedGL Instance, 1, 1, 1);
			 RedBox(RedGL Instance, 1, 1, 1, 16, 16, 16);
		 `,
		 return : 'RedBox Instance'
	 }
	 :DOC*/
	RedBox = function (redGL, width, height, depth, wSegments, hSegments, dSegments) {
		if (!(this instanceof RedBox)) return new RedBox(redGL, width, height, depth, wSegments, hSegments, dSegments);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedBox : RedGL Instance만 허용.', redGL);
		var tType, tPrimitiveData;
		width = width || 1;
		height = height || 1;
		depth = depth || 1;
		wSegments = wSegments || 1;
		hSegments = hSegments || 1;
		dSegments = dSegments || 1;
		tType = 'RedBox' + '_' + width + '_' + height + '_' + depth + '_' + wSegments + '_' + hSegments + '_' + dSegments;
		// 유일키 방어
		if (!redGL['_datas']['Primitives']) redGL['_datas']['Primitives'] = {};
		if (redGL['_datas']['Primitives'][tType]) return redGL['_datas']['Primitives'][tType];
		else redGL['_datas']['Primitives'][tType] = this;
		//
		tPrimitiveData = makeData(redGL, tType, width, height, depth, wSegments, hSegments, dSegments);
		this['interleaveBuffer'] = tPrimitiveData['interleaveBuffer'];
		this['indexBuffer'] = tPrimitiveData['indexBuffer'];
		this['interleaveBuffer']['isPrimitiveBuffer'] = true;
		this['indexBuffer']['isPrimitiveBuffer'] = true;
		this['_makeInfo'] = {
			width: width,
			height: height,
			depth: depth,
			wSegments: wSegments,
			hSegments: hSegments,
			dSegments: dSegments
		};
		this['_UUID'] = RedGL.makeUUID();
		console.log(this)
	};
	RedBox.prototype = Object.create(RedGeometry.prototype);
	Object.freeze(RedBox);
})();
