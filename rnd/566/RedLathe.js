"use strict";
var RedLathe;
(function () {
    var makeData;
    makeData = (function () {
        var generateTorso;
        var generateCap;
        //TODO 정리
        return function (redGL, type, points, radialSegments, openEnded, thetaStart, thetaLength) {
            ////////////////////////////////////////////////////////////////////////////
            // 데이터 생성!
            // buffers Data
            var interleaveData = [];
            var indexData = [];
            //
            var index = 0;
            var indexArray = [];
            var groupStart = 0;

            var topY, bottomY
            var i;
            var t0;
            i = points.length;
            topY = 0;
            bottomY = 0;
            while (i--) {
                t0 = points[i][1]
                if (t0 > topY) topY = t0
                if (t0 < bottomY) bottomY = t0
            }

            generateTorso = function () {


                var heightSegments = points.length - 1

                var x, y;
                var normal = [];
                var vertex = [];
                var groupCount = 0;
                // this will be used to calculate the normal
                var slope = (bottomY - topY);
                // generate vertices, normals and uvs
                for (y = 0; y <= heightSegments; y++) {
                    var indexRow = [];
                    var v = y / heightSegments;
                    // calculate the radius of the current row
                    var radius = points[y][0];
                    for (x = 0; x <= radialSegments; x++) {
                        var u = x / radialSegments;
                        var theta = u * thetaLength + thetaStart;
                        var sinTheta = Math.sin(theta);
                        var cosTheta = Math.cos(theta);
                        // vertex
                        vertex[0] = radius * sinTheta;
                        vertex[1] = points[y][1];
                        vertex[2] = radius * cosTheta;
                        interleaveData.push(vertex[0], vertex[1], vertex[2]);
                        // normal
                        normal[0] = sinTheta;
                        normal[1] = slope;
                        normal[2] = cosTheta;
                        vec3.normalize(normal, normal);
                        interleaveData.push(normal[0], normal[1], normal[2]);
                        // uv
                        interleaveData.push(u, v);
                        // save index of vertex in respective row
                        indexRow.push(index++);
                    }
                    // now save vertices of the row in our index array
                    indexArray.push(indexRow);
                }
                // generate indices
                for (x = 0; x < radialSegments; x++) {
                    for (y = 0; y < heightSegments; y++) {
                        // we use the index array to access the correct indices
                        var a = indexArray [y][x];
                        var b = indexArray[y + 1][x];
                        var c = indexArray[y + 1][x + 1];
                        var d = indexArray[y][x + 1];
                        // faces
                        indexData.push(a, b, d);
                        indexData.push(b, c, d);
                        // update group counter
                        groupCount += 6;
                    }
                }
                groupStart += groupCount;
            };
            generateCap = function (top) {
                var x, centerIndexStart, centerIndexEnd;
                var uv = [];
                var vertex = [];
                var groupCount = 0;
                var radius = (top === true) ? points[0][0] : points[points.length - 1][0];
                var sign = (top === true) ? 1 : -1;
                centerIndexStart = index;
                for (x = 1; x <= radialSegments; x++) {
                    // vertex
                    interleaveData.push(0, top ? topY : bottomY, 0);
                    // normal
                    interleaveData.push(0, sign, 0);
                    // uv
                    interleaveData.push(0.5, 0.5);
                    // increase index
                    index++;
                }
                centerIndexEnd = index;
                for (x = 0; x <= radialSegments; x++) {
                    var u = x / radialSegments;
                    var theta = u * thetaLength + thetaStart;
                    var cosTheta = Math.cos(theta);
                    var sinTheta = Math.sin(theta);
                    // vertex
                    vertex[0] = radius * sinTheta;
                    vertex[1] = top ? topY : bottomY;
                    vertex[2] = radius * cosTheta;
                    interleaveData.push(vertex[0], vertex[1], vertex[2]);
                    // normal
                    interleaveData.push(0, sign, 0);
                    // uv
                    uv[0] = (cosTheta * 0.5) + 0.5;
                    uv[1] = (sinTheta * 0.5 * sign) + 0.5;
                    interleaveData.push(uv[0], 1 - uv[1]);
                    // increase index
                    index++;
                }
                // generate indices
                for (x = 0; x < radialSegments; x++) {
                    var c = centerIndexStart + x;
                    var i = centerIndexEnd + x;
                    if (top === true) {
                        // face top
                        indexData.push(i, i + 1, c);
                    } else {
                        // face bottom
                        indexData.push(i + 1, i, c);
                    }
                    groupCount += 3;
                }
                // calculate new start value for groups
                groupStart += groupCount;

            }
            generateTorso();
            if (openEnded === false) {
                generateCap(true);
                generateCap(false);
            }

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
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedLathe`,
		 description : `
			 RedLathe 형태의 RedGeometry 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 radiusTop : [
				 {type:'number'},
				 '기본값 : 1'
			 ],
			 radiusBottom : [
				 {type:'number'},
				 '기본값 : 1'
			 ],
			 height : [
				 {type:'number'},
				 '기본값 : 1'
			 ],
			 radialSegments : [
				 {type:'uint'},
				 '기본값 : 8'
			 ],
			 heightSegments : [
				 {type:'uint'},
				 '기본값 : 1'
			 ],
			 openEnded : [
				 {type:'Boolean'},
				 '기본값 : false'
			 ],
			 thetaStart : [
				 {type:'number'},
				 'thetaStart'
			 ],
			 thetaLength : [
				 {type:'number'},
				 'thetaLength'
			 ]
		 },
		 extends : [
		    'RedGeometry'
		 ],
		 demo : '../example/primitives/RedLathe.html',
		 return : 'RedLathe Instance'
	 }
     :DOC*/
    RedLathe = function (redGL, points, radialSegments, openEnded, thetaStart, thetaLength) {
        if (!(this instanceof RedLathe)) return new RedLathe(redGL, points, radialSegments, openEnded, thetaStart, thetaLength);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPrimitive : RedGL Instance만 허용.', redGL);
        var tType, tPrimitiveData;
        radialSegments = Math.floor(radialSegments) || 8;
        openEnded = openEnded !== undefined ? openEnded : false;
        thetaStart = thetaStart !== undefined ? thetaStart : 0.0;
        thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;
        tType = 'RedLathe' + '_' + points + '_' + radialSegments + '_' + openEnded + '_' + thetaStart + '_' + thetaLength;
        // 유일키 방어
        if (!redGL['_datas']['Primitives']) redGL['_datas']['Primitives'] = {};
        if (redGL['_datas']['Primitives'][tType]) return redGL['_datas']['Primitives'][tType];
        else redGL['_datas']['Primitives'][tType] = this;
        //
        tPrimitiveData = makeData(redGL, tType, points, radialSegments, openEnded, thetaStart, thetaLength);
        this['interleaveBuffer'] = tPrimitiveData['interleaveBuffer'];
        this['indexBuffer'] = tPrimitiveData['indexBuffer'];
        this['interleaveBuffer']['isPrimitiveBuffer'] = true
        this['indexBuffer']['isPrimitiveBuffer'] = true
        this['_UUID'] = RedGL.makeUUID();
        console.log(this)
    };
    RedLathe.prototype = Object.create(RedGeometry.prototype);
    Object.freeze(RedLathe);
})();