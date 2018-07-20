"use strict";
var RedGeometry;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedGeometry`,
		 description : `
			 RedGeometry Instance 생성자
		 `,
		 params : {
			 interleaveBuffer : [
				 {type:'RedBuffer'},
				 `필수`
			 ],
			 indexBuffer : [
				 {type:'RedBuffer'},
				 `필수아님`
			 ]
		 },
		 example : `
			 RedGeometry(interleaveBuffer,indexBuffer)
		 `,
		 return : 'RedGeometry Instance'
	 }
	 :DOC*/
	RedGeometry = function (interleaveBuffer, indexBuffer) {
		if ( !(this instanceof RedGeometry) ) return new RedGeometry(interleaveBuffer, indexBuffer)
		if ( !(interleaveBuffer instanceof RedBuffer) ) RedGLUtil.throwFunc('RedGeometry : interleaveBuffer - RedBuffer Instance만 허용.', interleaveBuffer)
		if ( !(interleaveBuffer['bufferType'] == RedBuffer.ARRAY_BUFFER) ) RedGLUtil.throwFunc('RedGeometry : interleaveBuffer - RedBuffer.ARRAY_BUFFER 타입만 허용.', interleaveBuffer)
		if ( indexBuffer ) {
			if ( !interleaveBuffer ) RedGLUtil.throwFunc('RedGeometry : indexBuffer는 반드시 interleaveBuffer와 쌍으로 입력되어야함.', indexBuffer)
			if ( !(indexBuffer instanceof RedBuffer) ) RedGLUtil.throwFunc('RedGeometry : indexBuffer - RedBuffer Instance만 허용.', indexBuffer)
			if ( !(indexBuffer['bufferType'] == RedBuffer.ELEMENT_ARRAY_BUFFER) ) RedGLUtil.throwFunc('RedGeometry : indexBuffer - RedBuffer.ELEMENT_ARRAY_BUFFER 타입만 허용.', indexBuffer)
		}
		/**DOC:
		 {
			 title :`interleaveBuffer`,
			 return : 'RedBuffer Instance'
		 }
		 :DOC*/
		this['interleaveBuffer'] = interleaveBuffer
		/**DOC:
		 {
			 title :`indexBuffer`,
			 return : 'RedBuffer Instance'
		 }
		 :DOC*/
		this['indexBuffer'] = indexBuffer
		this['_UUID'] = RedGL['makeUUID']();
		// Object.freeze(this)
	}
	RedGeometry.calculateNormals = function (vs, ind) {
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
	Object.freeze(RedGeometry);
})()