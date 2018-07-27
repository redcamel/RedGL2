"use strict";
var RedGLUtil;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedGLUtil`,
		 description : `
			 이것저것모음
		 `,
		 return : 'void'
	 }
	 :DOC*/
	RedGLUtil = {
		/**DOC:
		 {
			 constructorYn : true,
			 title :`RedGLUtil.throwFunc`,
			 description : `
				 에러생성기
			 `,
			 return : 'void'
		 }
		 :DOC*/
		throwFunc: function () {
			throw 'RedGL Error : ' + Array.prototype.slice.call(arguments).join(' ')
		},
		/**DOC:
		 {
			 constructorYn : true,
			 title :`RedGLUtil.copyProto`,
			 description : `
				 프로토타입 내용을 복사
			 `,
			 params : {
				 target : [
					 {type : 'Object'},
					 '확장할 대상'
				 ],
				 from : [
					 {type : 'Object'},
					 '가져올 대상'
				 ]
			 },
			 example : `
				 var a = function(){};
				 var b = function(){};
				 a.prototype.test = function(){
					 console.log('test')
				 };
				 RedGLUtil.copyProto(b,a);
				 (new b()).test(); // test
			 `,
			 return : 'void'
		 }
		 :DOC*/
		copyProto: function (target, from) {
			for ( var k in from.prototype ) target.prototype[k] = from.prototype[k]//,console.log(k)
		},
		/**DOC:
		 {
			 constructorYn : true,
			 title :`RedGLUtil.hexToRGB_ZeroToOne`,
			 description : `
				 hex값을 RGB로 변환
			 `,
			 params : {
				 hex : [
					 {type : 'hex'}
				 ]
			 },
			 example : `
				 RedGLUtil.hexToRGB_ZeroToOne('#fff') // [1,1,1]
			 `,
			 return : 'Array'
		 }
		 :DOC*/
		hexToRGB_ZeroToOne: function (hex) {
			var t0, t1;
			if ( /^#([A-Fa-f0-9]{3}){1,2}$/.test(hex) ) {
				t1 = [];
				t0 = hex.substring(1).split('');
				if ( t0.length == 3 ) t0 = [t0[0], t0[0], t0[1], t0[1], t0[2], t0[2]];
				t0 = '0x' + t0.join('');
				t1[0] = ((t0 >> 16) & 255) / 255;
				t1[1] = ((t0 >> 8) & 255) / 255;
				t1[2] = (t0 & 255) / 255;
				return t1
			} else RedGLUtil.throwFunc('RedGLUtil.hexToRGB_ZeroToOne : 잘못된 hex값입니다.', hex)
		},
		rgb2hex: function (red, green, blue) {
			var rgb = blue | (green << 8) | (red << 16);
			return '#' + (0x1000000 + rgb).toString(16).slice(1)
		},
		regHex: (function () {
			var reg = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
			return function (hex) {
				return reg.test(hex);
			}
		})(),
		/**DOC:
		 {
			 constructorYn : true,
			 title :`RedGLUtil.getStrFromComment`,
			 description : `
			 문자열중 멀티 라인 코멘트 사이값을 반환함.
			 프로그램 생성기에서 사용
			 `,
			 params : {
				 source : [
					 {type : 'String'}
				 ]
			 },
			 return : 'String'
		 }
		 :DOC*/
		getStrFromComment: (function () {
			var t0;
			return function (source) {
				if ( typeof source != 'string' ) RedGLUtil.throwFunc('getStrFromComment : 해석할 값은 문자열만 가능', source)
				t0 = source.replace('@preserve', '').toString().trim().match(/(\/\*)[\s\S]+(\*\/)/g);
				if ( t0 ) return t0[0].replace(/\/\*|\*\//g, '').trim();
				else RedGLUtil.throwFunc('getStrFromComment : 해석할 불가능한 값', source)
			}
		})(),
		isPowerOf2: function (v) { return (v & (v - 1)) == 0; },
		nextHighestPowerOfTwo: (function () {
			var i;
			return function (v) {
				--v;
				for ( i = 1; i < 32; i <<= 1 ) v = v | v >> i;
				return v + 1;
			}
		})(),
		calculateNormals: function (vertexArray, indexArray) {
			//TODO: 이함수 정리
			var i, j;
			var x = 0;
			var y = 1;
			var z = 2;
			var result = [];
			for ( i = 0; i < vertexArray.length; i = i + 3 ) {
				//for each vertex, initialize normal x, normal y, normal z
				result[i + x] = 0.0;
				result[i + y] = 0.0;
				result[i + z] = 0.0;
			}
			for ( i = 0; i < indexArray.length; i = i + 3 ) { //we work on triads of vertices to calculate normals so i = i+3 (i = indices index)
				var v1 = [];
				var v2 = [];
				var normal = [];
				var index0, index1, index2, indexJ;
				index0 = 3 * indexArray[i];
				index1 = 3 * indexArray[i + 1];
				index2 = 3 * indexArray[i + 2];
				//p2 - p1
				v1[x] = vertexArray[index2 + x] - vertexArray[index1 + x];
				v1[y] = vertexArray[index2 + y] - vertexArray[index1 + y];
				v1[z] = vertexArray[index2 + z] - vertexArray[index1 + z];
				//p0 - p1
				v2[x] = vertexArray[index0 + x] - vertexArray[index1 + x];
				v2[y] = vertexArray[index0 + y] - vertexArray[index1 + y];
				v2[z] = vertexArray[index0 + z] - vertexArray[index1 + z];
				//cross product by Sarrus Rule
				normal[x] = v1[y] * v2[z] - v1[z] * v2[y];
				normal[y] = v1[z] * v2[x] - v1[x] * v2[z];
				normal[z] = v1[x] * v2[y] - v1[y] * v2[x];
				for ( j = 0; j < 3; j++ ) { //update the normals of that triangle: sum of vectors
					indexJ = 3 * indexArray[i + j];
					result[indexJ + x] = result[indexJ + x] + normal[x];
					result[indexJ + y] = result[indexJ + y] + normal[y];
					result[indexJ + z] = result[indexJ + z] + normal[z];
				}
			}
			//normalize the result
			for ( i = 0; i < vertexArray.length; i = i + 3 ) { //the increment here is because each vertex occurs with an offset of 3 in the array (due to x, y, z contiguous values)
				var nn = [];
				nn[x] = result[i + x];
				nn[y] = result[i + y];
				nn[z] = result[i + z];
				var len = Math.sqrt((nn[x] * nn[x]) + (nn[y] * nn[y]) + (nn[z] * nn[z]));
				if ( len == 0 ) len = 1.0;
				nn[x] = nn[x] / len;
				nn[y] = nn[y] / len;
				nn[z] = nn[z] / len;
				result[i + x] = nn[x];
				result[i + y] = nn[y];
				result[i + z] = nn[z];
			}
			return result;
		}
	};
	Object.freeze(RedGLUtil);
})();