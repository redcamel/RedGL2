/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
var RedLathe;
(function () {
    // https://webglfundamentals.org/webgl/lessons/webgl-3d-geometry-lathe.html
    var makeData;
    var parsePathString;
    var lerp;
    var lathePoints;
    var makeIndexedIndicesFn;
    var makeUnindexedIndicesFn;
    var makeIndiceIterator;
    var generateNormals;
    parsePathString = function (svg, flipX, flipY) {
        var points = [];
        var delta = false;
        var keepNext = false;
        var need = 0;
        var value = '';
        var values = [];
        var lastValues = [0, 0];
        var nextLastValues = [0, 0];
        var mode;

        function addValue() {
            if (value.length > 0) {
                var v = parseFloat(value);
                // if (v > 1000) debugger;  // eslint-disable-line
                values.push(v);
                if (values.length === 2) {
                    if (delta) values[0] += lastValues[0], values[1] += lastValues[1];
                    points.push(values);
                    if (keepNext) nextLastValues = values.slice();
                    --need;
                    if (!need) {
                        if (mode === 'l') {
                            var m4 = points.pop();
                            var m1 = points.pop();
                            var m2 = vec2.lerp([0, 0], m1, m4, 0.25);
                            var m3 = vec2.lerp([0, 0], m1, m4, 0.75);
                            points.push(m1, m2, m3, m4);
                        }
                        lastValues = nextLastValues;
                    }
                    values = [];
                }
                value = '';
            }
        }

        var i, len;
        var pathSplitData = svg.split('');
        var targetStr;
        i = 0, len = pathSplitData.length;
        for (i; i < len; i++) {
            targetStr = pathSplitData[i];
            if ((targetStr >= '0' && targetStr <= '9') || targetStr === '.') value += targetStr;
            else if (targetStr === '-') addValue(), value = '-';
            else if (targetStr === 'm') addValue(), keepNext = true, need = 1, delta = true, mode = 'm';
            else if (targetStr === 'c') addValue(), keepNext = true, need = 3, delta = true, mode = 'c';
            else if (targetStr === 'l') addValue(), keepNext = true, need = 1, delta = false, mode = 'l';
            else if (targetStr === 'M') addValue(), keepNext = true, need = 1, delta = false, mode = 'm';
            else if (targetStr === 'C') addValue(), keepNext = true, need = 3, delta = false, mode = 'c';
            else if (targetStr === 'L') addValue(), keepNext = true, need = 1, delta = false, mode = 'l';
            else if (targetStr === 'Z') {
            }// close the loop
            else if (targetStr === ',') addValue();
            else if (targetStr === ' ') addValue();
            // else debugger;  // eslint-disable-line
        }
        addValue();
        var min = points[0].slice();
        var max = points[0].slice();
        i = 1, len = points.length;
        for (i; i < len; ++i) min = vec2.min([0, 0], min, points[i]), max = vec2.max([0, 0], max, points[i]);
        var range = vec2.sub([0, 0], max, min);
        var halfRange = vec2.scale([0, 0], range, .5);
        i = 0;
        var targetPoint;
        for (i; i < len; ++i) {
            targetPoint = points[i];
            if (flipX) targetPoint[0] = max[0] - targetPoint[0];
            else targetPoint[0] = targetPoint[0] - min[0];
            if (flipY) targetPoint[1] = halfRange[1] - (targetPoint[1] - min[0]);
            else targetPoint[1] = (targetPoint[1] - min[0]) - halfRange[1];
        }
        return points;
    };


    lerp = function (a, b, t) {
        return a + (b - a) * t;
    };

    var makeTexcoord_vList;
    var makePositionAndTexcoordData;
    var makeIndexData;
    makeTexcoord_vList = (function () {
        var texcoord_vList;
        var length;
        var i;
        var len;
        return function (points) {
            texcoord_vList = [];
            // 포인트의 길이를 일단 구한다.
            length = 0;
            i = 0;
            len = points.length;
            for (i; i < len - 1; ++i) {
                texcoord_vList[i] = length;
                length += vec2.distance(points[i], points[i + 1]);
            }
            texcoord_vList.push(length);
            // 각 포인트를 전체 길이로 나눈 값을 개별 코디네이트 Y로 정한다.
            texcoord_vList = texcoord_vList.map(function (v) {
                return v / length;
            });
            return texcoord_vList
        }
    })();
    makePositionAndTexcoordData = (function () {
        var i;
        var len;
        var divisionIndex;
        var tempMAT4 = mat4.create();
        var texcoord_u;
        var angle;
        var angleMTX;
        return function (points, texcoord_vList, startAngle, endAngle, numDivisions, capStart, capEnd) {
            var positions = [];
            var texcoords = [];
            divisionIndex = 0;
            for (divisionIndex; divisionIndex <= numDivisions; ++divisionIndex) {
                texcoord_u = divisionIndex / numDivisions; // 분할갯수를 근거로 코디네이트 X를 정한다.
                angle = lerp(startAngle, endAngle, texcoord_u) % (Math.PI * 2); // texcoord_u는 0~1이므로 보간 인자값으로 활용가능
                angleMTX = mat4.fromYRotation(tempMAT4, angle);
                if (capStart) {
                    // 상단을 닫을 경우
                    positions.push(0, points[0][1], 0);
                    texcoords.push(texcoord_u, 0);
                }
                var targetPoint;
                i = 0;
                len = points.length;
                for (i; i < len; i++) {
                    targetPoint = points[i];
                    targetPoint = vec3.transformMat4([0, 0, 0], [targetPoint[0], targetPoint[1], 0], angleMTX);
                    positions.push(targetPoint[0], targetPoint[1], targetPoint[2]);
                    texcoords.push(texcoord_u, texcoord_vList[i]);
                }
                if (capEnd) {
                    // 하단을 닫을 경우
                    positions.push(0, points[points.length - 1][1], 0);
                    texcoords.push(texcoord_u, 1);
                }
            }
            return {
                positions: positions,
                texcoords: texcoords
            }
        }
    })();
    makeIndexData = (function () {
        var division = 0;
        var column1Offset;
        var column2Offset;
        var quad;
        return function (numDivisions, pointsPerColumn, quadsDown) {
            var indices = [];
            division = 0;
            for (division; division < numDivisions; ++division) {
                column1Offset = division * pointsPerColumn;
                column2Offset = column1Offset + pointsPerColumn;
                quad = 0;
                for (quad; quad < quadsDown; ++quad) {
                    indices.push(column1Offset + quad, column1Offset + quad + 1, column2Offset + quad);
                    indices.push(column1Offset + quad + 1, column2Offset + quad + 1, column2Offset + quad);
                }
            }
            return indices;
        }
    })();
    lathePoints = function (points,
                            startAngle,   // 시작각도
                            endAngle,     // 종료각도
                            numDivisions, // 분할갯수
                            capStart,     // 상단닫기
                            capEnd,  // 하단닫기
                            flipY
    ) {
        var positions;
        var texcoords;
        var indices;

        var vOffset = capStart ? 1 : 0;
        var pointsPerColumn = points.length + vOffset + (capEnd ? 1 : 0);
        var quadsDown = pointsPerColumn - 1;

        // 세로 코디네이트 생성
        var texcoord_vList = makeTexcoord_vList(points);

        // 분할 갯수만큼 포인틀를 생성해 나간다.
        var temp = makePositionAndTexcoordData(points, texcoord_vList, startAngle, endAngle, numDivisions, capStart, capEnd);
        positions = temp['positions'];
        texcoords = temp['texcoords'];
        // 인덱스 생성
        indices = makeIndexData(numDivisions, pointsPerColumn, quadsDown, flipY);
        return {
            position: positions,
            texcoord: texcoords,
            indices: indices
        };
    };
    makeIndexedIndicesFn = function (arrays) {
        var indices = arrays.indices;
        var ndx = 0;
        var fn = function () {
            return indices[ndx++];
        };
        fn.reset = function () {
            ndx = 0;
        };
        fn.numElements = indices.length;
        return fn;
    };

    makeUnindexedIndicesFn = function (arrays) {
        console.log('여기로오는일이 있냐');
        var ndx = 0;
        var fn = function () {
            return ndx++;
        };
        fn.reset = function () {
            ndx = 0;
        };
        fn.numElements = arrays['positions'].length / 3;
        return fn;
    };

    makeIndiceIterator = function (arrays) {
        return arrays.indices ? makeIndexedIndicesFn(arrays) : makeUnindexedIndicesFn(arrays);
    };

    generateNormals = function (arrays, maxAngle) {
        var positions = arrays['position'];
        var texcoords = arrays['texcoord'];
        // first compute the normal of each face
        var getNextIndex = makeIndiceIterator(arrays);
        var numFaceVerts = getNextIndex['numElements'];
        var numVerts = arrays['position'].length;
        var numFaces = numFaceVerts / 3;
        var faceNormals = [];
        // Compute the normal for every face.
        // While doing that, create a new vertex for every face vertex
        var i = 0;
        var j;
        for (i; i < numFaces; ++i) {
            var n1 = getNextIndex() * 3;
            var n2 = getNextIndex() * 3;
            var n3 = getNextIndex() * 3;
            var v1 = positions.slice(n1, n1 + 3);
            var v2 = positions.slice(n2, n2 + 3);
            var v3 = positions.slice(n3, n3 + 3);
            faceNormals.push(
                vec3.normalize(
                    [0, 0, 0],
                    vec3.cross(
                        [0, 0, 0],
                        vec3.sub([0, 0, 0], v1, v2),
                        vec3.sub([0, 0, 0], v3, v2)
                    )
                )
            );
        }
        var tempVerts = {};
        var tempVertNdx = 0;

        // this assumes vertex positions are an exact match
        function getVertIndex(v) {
            var vertId = v;
            var ndx = tempVerts[vertId];
            if (ndx !== undefined) return ndx;
            var newNdx = tempVertNdx++;
            tempVerts[vertId] = newNdx;
            return newNdx;
        }

        // We need to figure out the shared vertices.
        // It's not as simple as looking at the faces (triangles)
        // because for example if we have a standard cylinder
        //
        //
        //      3-4
        //     /   \
        //    2     5   Looking down a cylinder starting at S
        //    |     |   and going around to E, E and S are not
        //    1     6   the same vertex in the data we have
        //     \   /    as they don't share UV coords.
        //      S/E
        //
        // the vertices at the start and end do not share vertices
        // since they have different UVs but if you don't consider
        // them to share vertices they will get the wrong normals

        var vertIndices = [];
        for (i = 0; i < numVerts; ++i) {
            var offset = i * 3;
            var vert = positions.slice(offset, offset + 3);
            vertIndices.push(getVertIndex(vert));
        }

        // go through every vertex and record which faces it's on
        var vertFaces = [];
        getNextIndex.reset();
        for (i = 0; i < numFaces; ++i) {
            for (j = 0; j < 3; ++j) {
                var ndx = getNextIndex();
                var sharedNdx = vertIndices[ndx];
                var faces = vertFaces[sharedNdx];
                if (!faces) {
                    faces = [];
                    vertFaces[sharedNdx] = faces;
                }
                faces.push(i);
            }
        }

        // now go through every face and compute the normals for each
        // vertex of the face. Only include faces that aren't more than
        // maxAngle different. Add the result to arrays of newPositions,
        // newTexcoords and newNormals, discarding any vertices that
        // are the same.
        tempVerts = {};
        tempVertNdx = 0;
        var newPositions = [];
        var newTexcoords = [];
        var newNormals = [];

        function getNewVertIndex(x, y, z, nx, ny, nz, u, v) {
            var vertId =
                x + "," + y + "," + z + "," +
                nx + "," + ny + "," + nz + "," +
                u + "," + v;

            var ndx = tempVerts[vertId];
            if (ndx !== undefined) return ndx;
            var newNdx = tempVertNdx++;
            tempVerts[vertId] = newNdx;
            newPositions.push(x, y, z);
            newNormals.push(nx, ny, nz);
            newTexcoords.push(u, v);
            return newNdx;
        }

        var newVertIndices = [];
        getNextIndex.reset();
        var maxAngleCos = Math.cos(maxAngle);
        // for each face
        for (i = 0; i < numFaces; ++i) {
            // var thisFaceVertexNormals = [];
            // get the normal for this face
            var thisFaceNormal = faceNormals[i];
            // for each vertex on the face
            for (j = 0; j < 3; ++j) {
                var ndx = getNextIndex();
                var sharedNdx = vertIndices[ndx];
                var faces = vertFaces[sharedNdx];
                var norm = [0, 0, 0];
                faces.forEach(function (faceNdx) {
                    // is this face facing the same way
                    var otherFaceNormal = faceNormals[faceNdx];
                    var dot = vec3.dot(thisFaceNormal, otherFaceNormal);
                    if (dot > maxAngleCos) {
                        vec3.add(norm, norm, otherFaceNormal);
                    }
                });
                vec3.normalize(norm, norm);
                var poffset = ndx * 3;
                var toffset = ndx * 2;


                newVertIndices.push(
                    getNewVertIndex(
                        positions[poffset + 0], positions[poffset + 1], positions[poffset + 2],
                        norm[0], norm[1], norm[2],
                        texcoords[toffset + 0], texcoords[toffset + 1]
                    )
                );

            }
        }
        return {
            position: newPositions,
            texcoord: newTexcoords,
            normal: newNormals,
            indices: newVertIndices
        };
    };

    makeData = function (redGL, type, finalData) {
        ////////////////////////////////////////////////////////////////////////////
        // 데이터 생성!
        // buffers Data
        var interleaveData = [];
        var indexData;
        var positions = finalData['position'];
        var normals = finalData['normal'];
        var texcoords = finalData['texcoord'];
        indexData = finalData['indices'];
        var i = 0, len = positions.length / 3;
        var offset;
        for (i; i < len; i++) {
            offset = i * 3;
            interleaveData.push(positions[offset + 0], positions[offset + 1], positions[offset + 2]);
            interleaveData.push(normals[offset + 0], normals[offset + 1], normals[offset + 2]);
            offset = i * 2;
            interleaveData.push(texcoords[offset + 0], texcoords[offset + 1])
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
    };
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
			 pathString : [
				 {type:'string'},
				 'path 문자열',
				  `<code>"m44,434c18,-33 19,-66 15,-111c-4,-45 -37,-104 -39,-132c-2,-28 11,-51 16,-81c5,-30 3,-63 -36,-63"</code>`
			 ],
			 numDivisions : [
				 {type:'uint'},
				 '기본값 : 16'
			 ],
			 capStart : [
				 {type:'boolean'},
				 '기본값 : false'
			 ],
			 capEnd : [
				 {type:'boolean'},
				 '기본값 : false'
			 ],
			 startAngle : [
				 {type:'number'},
				 '기본값 : 0.0'
			 ],
			 endAngle : [
				 {type:'Boolean'},
				 '기본값 : Math.PI * 2'
			 ],
			 maxAngle : [
				 {type:'number'},
				 '기본값 : Math.PI / 180 * 30'
			 ],
			 tolerance : [
				 {type:'number'},
				 '기본값 : 0.15'
			 ],
			 flipX : [
			    {type:'boolean'},
				'기본값 : false'
			 ],
			 flipY : [
			    {type:'boolean'},
				'기본값 : false'
			 ]
		 },
		 extends : [
		    'RedGeometry'
		 ],
		 demo : '../example/object3D/RedLatheMesh.html',
		 return : 'RedLathe Instance'
	 }
     :DOC*/
    RedLathe = function (redGL, pathString, numDivisions, capStart, capEnd, startAngle, endAngle, maxAngle, distance, tolerance, flipX, flipY) {
        if (!(this instanceof RedLathe)) return new RedLathe(redGL, pathString, numDivisions, capStart, capEnd, startAngle, endAngle, maxAngle, distance, tolerance, flipX, flipY);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedLathe : RedGL Instance만 허용.', redGL);
        // 기본값 정의
        var tType, tPrimitiveData;
        numDivisions = Math.floor(numDivisions) || 16;
        capStart = capStart !== undefined ? capStart : false;
        capEnd = capEnd !== undefined ? capEnd : false;
        startAngle = startAngle !== undefined ? startAngle : 0.0;
        endAngle = endAngle !== undefined ? endAngle : Math.PI * 2;
        distance = distance !== undefined ? distance : 0.4;
        maxAngle = maxAngle !== undefined ? maxAngle : Math.PI / 180 * 30;
        tolerance = tolerance !== undefined ? tolerance : 0.15;
        if (tolerance < 0.1) tolerance = 0.1;
        // 키생성
        tType = 'RedLathe' + '_' + pathString + '_' + numDivisions + '_' + capStart + '_' + capEnd + '_' + startAngle + '_' + endAngle + '_' + maxAngle + '_' + distance + '_' + tolerance + '_' + flipX + '_' + flipY;
        // console.log(tType)
        // 유일키 방어
        if (!redGL['_datas']['Primitives']) redGL['_datas']['Primitives'] = {};
        if (redGL['_datas']['Primitives'][tType]) return redGL['_datas']['Primitives'][tType];
        else redGL['_datas']['Primitives'][tType] = this;

        // path 문자 해석
        var parsedPoints = parsePathString(pathString, flipX, flipY);
        // 베지어 포인트 해석
        var tempPoints = RedLine.prototype['_getPointsOnBezierCurves'](parsedPoints, tolerance);
        // 단순화
        var points = RedLine.prototype['_simplifyPoints'](tempPoints, 0, tempPoints.length, distance);
        // 레이스 계산
        var parsedLathePoints = lathePoints(points, startAngle, endAngle, numDivisions, capStart, capEnd);
        // 노말생성 및 데이터 생성
        tPrimitiveData = makeData(redGL, tType, generateNormals(parsedLathePoints, maxAngle), numDivisions, capStart, capEnd, startAngle, endAngle);
        this['interleaveBuffer'] = tPrimitiveData['interleaveBuffer'];
        this['indexBuffer'] = tPrimitiveData['indexBuffer'];
        this['interleaveBuffer']['isPrimitiveBuffer'] = true;
        this['indexBuffer']['isPrimitiveBuffer'] = true;
        this['_UUID'] = RedGL.makeUUID();
        console.log(this)
    };
    RedLathe.prototype = Object.create(RedGeometry.prototype);
    Object.freeze(RedLathe);
})();