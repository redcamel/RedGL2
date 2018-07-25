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

		return function (redGL, type, width, height, wSegments, hSegments, seed, seedX, seedY, maxHeight, locationX, locationZ) {
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
			var noise = new RedNoise(seed)
			locationX = locationX || 0
			locationZ = locationZ || 0
			console.log('~location', locationZ)
			for ( ii = 0; ii < gridY1; ii++ ) {
				tZ = (ii) * segment_height - height_half;
				for ( jj = 0; jj < gridX1; jj++ ) {
					tX = jj * segment_width - width_half
					// position, normal, texcoord
					// persistence 지속성
					// frequency 진동수
					var tZ2 = tZ+ locationZ
					var tX2 = tX+ locationX
					var tY = noise.noise2D((tX2) / Math.pow(seedY, 2), (tZ2) / Math.pow(seedY, 4))
					var si = 0, si2 = 1
					for ( si; si < seedX; si++ ) {
						si2 *= 2
						tY += noise.noise2D(((tX2) + seedY * si2) / (seedY / si2), (tZ2) / (seedY / si2)) * Math.pow(0.5, si + 1)
					}
					// tY +=  noise.noise2D((ii + wSegments* 2)  / (hSegments/2), jj / (hSegments/2)) * Math.pow(0.5, 1)
					// tY += noise.noise2D((ii + wSegments * 4) / (hSegments/4), jj / (hSegments/4)) * Math.pow(0.5, 2)
					// tY += noise.noise2D((ii + wSegments * 8) / (hSegments/8), jj / (hSegments/8)) * Math.pow(0.5, 3)
					// tY += noise.noise2D((ii + wSegments* 16)  /(hSegments/16), jj / (hSegments/16)) * Math.pow(0.5, 4)
					tY *= maxHeight
					_v.push(tX, tY, tZ)
					interleaveData.push(tX, tY, tZ, 0, 0, 1, (jj) / gridX, 1 - (ii ) / gridY)
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
			_n = RedGeometry.calculateNormals(_v, indexData)
			var i = 0, len = indexData.length
			for ( i; i < len; i++ ) {
				var tIndex = indexData[i]
				interleaveData[tIndex * 8 + 3] = _n[tIndex * 3 + 0]
				interleaveData[tIndex * 8 + 4] = _n[tIndex * 3 + 1]
				interleaveData[tIndex * 8 + 5] = _n[tIndex * 3 + 2]
			}
			// console.log(interleaveData)
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
	RedGround = function (redGL, width, height, wSegments, hSegments, seed, seedX, seedY, maxHeight, locationX, locationZ) {
		if ( !(this instanceof RedGround) ) return new RedGround(redGL, width, height, wSegments, hSegments, seed, seedX, seedY, maxHeight, locationX, locationZ);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedGround : RedGL Instance만 허용됩니다.', redGL);
		var tType, tPrimitiveData;
		width = width || 1, height = height || 1;
		wSegments = wSegments || 1, hSegments = hSegments || 1;
		seed = seed || 1
		seedX = seedX || 0.4
		seedY = seedY || 1
		maxHeight = maxHeight || 500
		tType = 'RedGround' + '_' + width + '_' + height + '_' + wSegments + '_' + hSegments + '_' + seed + '_' + seedX + '_' + seedY + '_' + maxHeight + '_' + locationX + '_' + locationZ+'_'+Math.random();
		// 유일키 방어
		if ( !redGL['_datas']['Primitives'] ) redGL['_datas']['Primitives'] = {};
		if ( redGL['_datas']['Primitives'][tType] ) return redGL['_datas']['Primitives'][tType];
		else redGL['_datas']['Primitives'][tType] = this;
		//
		tPrimitiveData = makeData(redGL, tType, width, height, wSegments, hSegments, seed, seedX, seedY, maxHeight, locationX,locationZ);
		this['interleaveBuffer'] = tPrimitiveData['interleaveBuffer'];
		this['indexBuffer'] = tPrimitiveData['indexBuffer'];
		this['_UUID'] = RedGL.makeUUID();
		// console.log(this);
	}
	RedGround.prototype = RedGeometry.prototype;
	Object.freeze(RedGround);
})()