"use strict";
var RedGround;
(function () {
	var makeData;
	makeData = (function () {
		var width_half, height_half;
		var gridX, gridY;
		var gridX1, gridY1;
		var segment_width, segment_height;
		var jj, ii;
		var tX, tZ;
		var a, b, c, d;
		var calculateNormals = function (vs, ind) {
			var j
			var x = 0;
			var y = 1;
			var z = 2;
			var ns = [];
			for ( var i = 0; i < vs.length; i = i + 3 ) ns[i + x] = 0.0, ns[i + y] = 0.0, ns[i + z] = 0.0 //for each vertex, initialize normal x, normal y, normal z
			for ( var i = 0; i < ind.length; i = i + 3 ) { //we work on triads of vertices to calculate normals so i = i+3 (i = indices index)
				var v1 = [];
				var v2 = [];
				var normal = [];
				//p2 - p1
				v1[x] = vs[3 * ind[i + 2] + x] - vs[3 * ind[i + 1] + x];
				v1[y] = vs[3 * ind[i + 2] + y] - vs[3 * ind[i + 1] + y];
				v1[z] = vs[3 * ind[i + 2] + z] - vs[3 * ind[i + 1] + z];
				//p0 - p1
				v2[x] = vs[3 * ind[i] + x] - vs[3 * ind[i + 1] + x];
				v2[y] = vs[3 * ind[i] + y] - vs[3 * ind[i + 1] + y];
				v2[z] = vs[3 * ind[i] + z] - vs[3 * ind[i + 1] + z];
				//cross product by Sarrus Rule
				normal[x] = v1[y] * v2[z] - v1[z] * v2[y];
				normal[y] = v1[z] * v2[x] - v1[x] * v2[z];
				normal[z] = v1[x] * v2[y] - v1[y] * v2[x];
				for ( j = 0; j < 3; j++ ) { //update the normals of that triangle: sum of vectors
					ns[3 * ind[i + j] + x] = ns[3 * ind[i + j] + x] + normal[x];
					ns[3 * ind[i + j] + y] = ns[3 * ind[i + j] + y] + normal[y];
					ns[3 * ind[i + j] + z] = ns[3 * ind[i + j] + z] + normal[z];
				}
			}
			//normalize the result
			for ( var i = 0; i < vs.length; i = i + 3 ) { //the increment here is because each vertex occurs with an offset of 3 in the array (due to x, y, z contiguous values)
				var nn = [];
				nn[x] = ns[i + x];
				nn[y] = ns[i + y];
				nn[z] = ns[i + z];
				var len = Math.sqrt((nn[x] * nn[x]) + (nn[y] * nn[y]) + (nn[z] * nn[z]));
				if ( len == 0 ) len = 1.0;
				nn[x] = nn[x] / len;
				nn[y] = nn[y] / len;
				nn[z] = nn[z] / len;
				ns[i + x] = nn[x];
				ns[i + y] = nn[y];
				ns[i + z] = nn[z];
			}
			return ns;
		}
		return function (redGL, type, width, height, wSegments, hSegments, seed, seedX, seedY, maxHeight) {
			width_half = width / 2, height_half = height / 2
			gridX = Math.floor(wSegments) || 1, gridY = Math.floor(hSegments) || 1
			gridX1 = gridX + 1, gridY1 = gridY + 1
			segment_width = width / gridX, segment_height = height / gridY
			////////////////////////////////////////////////////////////////////////////
			// 데이터 생성!
			// buffers Datas
			var interleaveData = [];
			var indexData = []
			// interleaveData
			var _v, _n, _i
			_v = []
			_n = []
			var noise = new RedNoise(seed)
			for ( ii = 0; ii < gridY1; ii++ ) {
				tZ = ii * segment_height - height_half;
				for ( jj = 0; jj < gridX1; jj++ ) {
					tX = jj * segment_width - width_half
					// position, normal, texcoord
					// persistence 지속성
					// frequency 진동수
					var tY = noise.noise2D(ii / wSegments, jj / hSegments)
					var si = 0,si2 = 1
					for ( si; si < seedX; si++ ) {
						si2 *= 2
						tY += noise.noise2D((ii + wSegments * si2) / (hSegments / si2), jj / (hSegments / si2)) * Math.pow(0.5, si+1)
					}
					// tY +=  noise.noise2D((ii + wSegments* 2)  / (hSegments/2), jj / (hSegments/2)) * Math.pow(0.5, 1)
					// tY += noise.noise2D((ii + wSegments * 4) / (hSegments/4), jj / (hSegments/4)) * Math.pow(0.5, 2)
					// tY += noise.noise2D((ii + wSegments * 8) / (hSegments/8), jj / (hSegments/8)) * Math.pow(0.5, 3)
					// tY += noise.noise2D((ii + wSegments* 16)  /(hSegments/16), jj / (hSegments/16)) * Math.pow(0.5, 4)
					tY *= maxHeight
					_v.push(tX, tY, tZ)
					interleaveData.push(tX, tY, tZ, 0, 0, 1, jj / gridX, 1 - (ii / gridY))
				}
			}
			// indexData
			for ( ii = 0; ii < gridY; ii++ ) {
				for ( jj = 0; jj < gridX; jj++ ) {
					a = jj + gridX1 * ii,
						b = jj + gridX1 * (ii + 1),
						c = (jj + 1) + gridX1 * (ii + 1),
						d = (jj + 1) + gridX1 * ii,
						indexData.push(b, c, d, a, b, d)
				}
			}
			_n = calculateNormals(_v, indexData)
			var i = 0, len = indexData.length
			for ( i; i < len; i++ ) {
				var tIndex = indexData[i]
				interleaveData[tIndex * 8 + 3] = _n[tIndex * 3 + 0]
				interleaveData[tIndex * 8 + 4] = _n[tIndex * 3 + 1]
				interleaveData[tIndex * 8 + 5] = _n[tIndex * 3 + 2]
			}
			console.log(interleaveData)
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
		 title :`RedGround`,
		 description : `
			 RedGround Instance 생성기.
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
			 RedGround(RedGL Instance);
			 RedGround(RedGL Instance, 1, 1);
			 RedGround(RedGL Instance, 1, 1, 16, 16);
		 `,
		 return : 'RedGround Instance'
	 }
	 :DOC*/
	RedGround = function (redGL, width, height, wSegments, hSegments, seed, seedX, seedY, maxHeight) {
		if ( !(this instanceof RedGround) ) return new RedGround(redGL, width, height, wSegments, hSegments, seed, seedX, seedY, maxHeight);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedGround : RedGL Instance만 허용됩니다.', redGL);
		var tType, tPrimitiveData;
		width = width || 1, height = height || 1;
		wSegments = wSegments || 1, hSegments = hSegments || 1;
		seed = seed || 1
		seedX = seedX || 0.4
		seedY = seedY || 1
		maxHeight = maxHeight || 500
		tType = 'RedGround' + '_' + width + '_' + height + '_' + wSegments + '_' + hSegments + '_' + seed + '_' + seedX + '_' + seedY + '_' + maxHeight;
		// 유일키 방어
		if ( !redGL['_datas']['Primitives'] ) redGL['_datas']['Primitives'] = {};
		if ( redGL['_datas']['Primitives'][tType] ) return redGL['_datas']['Primitives'][tType];
		else redGL['_datas']['Primitives'][tType] = this;
		//
		tPrimitiveData = makeData(redGL, tType, width, height, wSegments, hSegments, seed, seedX, seedY, maxHeight);
		this['interleaveBuffer'] = tPrimitiveData['interleaveBuffer'];
		this['indexBuffer'] = tPrimitiveData['indexBuffer'];
		this['_UUID'] = RedGL['makeUUID']();
		console.log(this);
	}
	RedGround.prototype = RedGeometry.prototype;
	Object.freeze(RedGround);
})()