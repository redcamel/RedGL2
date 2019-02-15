"use strict";
var RedCylinder;
(function () {
    var makeData;
    makeData = (function () {
        var generateTorso;
        var generateCap;
        //TODO 정리
        return function (redGL, type, radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
            ////////////////////////////////////////////////////////////////////////////
            // 데이터 생성!
            // buffers Data
            var interleaveData = [];
            var indexData = [];
            //
            var index = 0;
            var indexArray = [];
            var halfHeight = height / 2;
            var groupStart = 0;

            generateTorso = function () {
                var x, y;
                var normal = [];
                var vertex = [];
                var groupCount = 0;
                // this will be used to calculate the normal
                var slope = (radiusBottom - radiusTop) / height;
                // generate vertices, normals and uvs
                for (y = 0; y <= heightSegments; y++) {
                    var indexRow = [];
                    var v = y / heightSegments;
                    // calculate the radius of the current row
                    var radius = v * (radiusBottom - radiusTop) + radiusTop;
                    for (x = 0; x <= radialSegments; x++) {
                        var u = x / radialSegments;
                        var theta = u * thetaLength + thetaStart;
                        var sinTheta = Math.sin(theta);
                        var cosTheta = Math.cos(theta);
                        // vertex
                        vertex[0] = radius * sinTheta;
                        vertex[1] = -v * height + halfHeight;
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
                var radius = (top === true) ? radiusTop : radiusBottom;
                var sign = (top === true) ? 1 : -1;
                // save the index of the first center vertex
                centerIndexStart = index;
                // first we generate the center vertex data of the cap.
                // because the geometry needs one set of uvs per face,
                // we must generate a center vertex per face/segment
                for (x = 1; x <= radialSegments; x++) {
                    // vertex
                    interleaveData.push(0, halfHeight * sign, 0);
                    // normal
                    interleaveData.push(0, sign, 0);
                    // uv
                    interleaveData.push(0.5, 0.5);
                    // increase index
                    index++;
                }
                // save the index of the last center vertex
                centerIndexEnd = index;
                // now we generate the surrounding vertices, normals and uvs
                for (x = 0; x <= radialSegments; x++) {
                    var u = x / radialSegments;
                    var theta = u * thetaLength + thetaStart;
                    var cosTheta = Math.cos(theta);
                    var sinTheta = Math.sin(theta);
                    // vertex
                    vertex[0] = radius * sinTheta;
                    vertex[1] = halfHeight * sign;
                    vertex[2] = radius * cosTheta;
                    interleaveData.push(vertex[0], vertex[1], vertex[2]);
                    // normal
                    interleaveData.push(0, sign, 0);
                    // uv
                    uv[0] = (cosTheta * 0.5) + 0.5;
                    uv[1] = (sinTheta * 0.5 * sign) + 0.5;
                    interleaveData.push(uv[0], 1-uv[1]);
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
                if (radiusTop > 0) generateCap(true);
                if (radiusBottom > 0) generateCap(false);
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
		 title :`RedCylinder`,
		 description : `
			 RedCylinder 형태의 RedGeometry 생성
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
		 demo : '../example/primitives/RedCylinder.html',
		 return : 'RedCylinder Instance'
	 }
     :DOC*/
    RedCylinder = function (redGL, radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
        if (!(this instanceof RedCylinder)) return new RedCylinder(redGL, radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPrimitive : RedGL Instance만 허용.', redGL);
        var tType, tPrimitiveData;
        radiusTop = radiusTop !== undefined ? radiusTop : 1;
        radiusBottom = radiusBottom !== undefined ? radiusBottom : 1;
        height = height !== undefined ? height : 1;
        radialSegments = Math.floor(radialSegments) || 8;
        heightSegments = Math.floor(heightSegments) || 1;
        openEnded = openEnded !== undefined ? openEnded : false;
        thetaStart = thetaStart !== undefined ? thetaStart : 0.0;
        thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;
        tType = 'RedCylinder' + '_' + radiusTop + '_' + radiusBottom + '_' + height + '_' + radialSegments + '_' + heightSegments + '_' + openEnded + '_' + thetaStart + '_' + thetaLength;
        // 유일키 방어
        if (!redGL['_datas']['Primitives']) redGL['_datas']['Primitives'] = {};
        if (redGL['_datas']['Primitives'][tType]) return redGL['_datas']['Primitives'][tType];
        else redGL['_datas']['Primitives'][tType] = this;
        //
        tPrimitiveData = makeData(redGL, tType, radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
        this['interleaveBuffer'] = tPrimitiveData['interleaveBuffer'];
        this['indexBuffer'] = tPrimitiveData['indexBuffer'];
        this['interleaveBuffer']['isPrimitiveBuffer'] = true
        this['indexBuffer']['isPrimitiveBuffer'] = true
        this['_UUID'] = RedGL.makeUUID();
        console.log(this)
    };
    RedCylinder.prototype = Object.create(RedGeometry.prototype);
    Object.freeze(RedCylinder);
})();