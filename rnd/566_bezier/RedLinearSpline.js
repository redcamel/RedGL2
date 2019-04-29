/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var RedSpline;
(function () {
    //https://webglfundamentals.org/webgl/lessons/webgl-3d-geometry-lathe.html
    var makeData;
    var parseSVGPath;
    var flatness;
    var getPointsOnBezierCurveWithSplitting;
    var getPointsOnBezierCurves;
    var vec3_distanceToSegmentSq;
    var simplifyPoints;
    var lerp;
    var lathePoints;
    var makeIndexedIndicesFn;
    var makeUnindexedIndicesFn;
    var makeIndiceIterator;
    var generateNormals;
    parseSVGPath = function (svg, flipX, flipY) {
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
                if (v > 1000) debugger;  // eslint-disable-line
                values.push(v);
                if (values.length === 2) {
                    if (delta) values[0] += lastValues[0], values[1] += lastValues[1]
                    points.push(values);
                    if (keepNext) nextLastValues = values.slice();
                    --need;
                    if (!need) {
                        if (mode === 'l') {
                            var m4 = points.pop();
                            var m1 = points.pop();
                            var m2 = vec3.lerp([0, 0], m1, m4, 0.25);
                            var m3 = vec3.lerp([0, 0], m1, m4, 0.75);
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
        var svgSplitData = svg.split('');
        var targetStr;
        i = 0, len = svgSplitData.length;
        for (i; i < len; i++) {
            targetStr = svgSplitData[i];
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
            else debugger;  // eslint-disable-line
        }
        addValue();
        var min = points[0].slice();
        var max = points[0].slice();
        i = 1, len = points.length;
        for (i; i < len; ++i) min = vec3.min([0, 0], min, points[i]), max = vec3.max([0, 0], max, points[i]);
        var range = vec3.sub([0, 0], max, min);
        var halfRange = vec3.scale([0, 0], range, .5);
        i = 0;
        var targetPoint
        for (i; i < len; ++i) {
            targetPoint = points[i];
            if (flipX) targetPoint[0] = max[0] - targetPoint[0];
            else targetPoint[0] = targetPoint[0] - min[0];
            if (flipY) targetPoint[1] = halfRange[1] - (targetPoint[1] - min[0]);
            else targetPoint[1] = (targetPoint[1] - min[0]) - halfRange[1];
        }
        return points;
    };

    flatness = function (points, offset) {
        var p1 = points[offset + 0];
        var p2 = points[offset + 1];
        var p3 = points[offset + 2];
        var p4 = points[offset + 3];
        var ux = 3 * p2[0] - 2 * p1[0] - p4[0];
        var uy = 3 * p2[1] - 2 * p1[1] - p4[1];
        var vx = 3 * p3[0] - 2 * p4[0] - p1[0];
        var vy = 3 * p3[1] - 2 * p4[1] - p1[1];
        ux *= ux, uy *= uy, vx *= vx, vy *= vy;
        if (ux < vx) ux = vx;
        if (uy < vy) uy = vy;
        return ux + uy;
    };

    getPointsOnBezierCurveWithSplitting = function (points, offset, tolerance, newPoints) {
        var outPoints = newPoints || [];
        if (flatness(points, offset) < tolerance) {
            // just add the end points of this curve
            outPoints.push(points[offset + 0]);
            outPoints.push(points[offset + 3]);
        } else {
            // subdivide
            var t = .5;
            var p1 = points[offset + 0];
            var p2 = points[offset + 1];
            var p3 = points[offset + 2];
            var p4 = points[offset + 3];

            var q1 = vec3.lerp([0, 0], p1, p2, t);
            var q2 = vec3.lerp([0, 0], p2, p3, t);
            var q3 = vec3.lerp([0, 0], p3, p4, t);

            var r1 = vec3.lerp([0, 0], q1, q2, t);
            var r2 = vec3.lerp([0, 0], q2, q3, t);

            var red = vec3.lerp([0, 0], r1, r2, t);

            // do 1st half
            getPointsOnBezierCurveWithSplitting([p1, q1, r1, red], 0, tolerance, outPoints);
            // do 2nd half
            getPointsOnBezierCurveWithSplitting([red, r2, q3, p4], 0, tolerance, outPoints);

        }
        return outPoints;
    };

    // gets points across all segments
    getPointsOnBezierCurves = function (points, tolerance) {
        var newPoints = [];
        var numSegments = (points.length - 1) / 3;
        var i = 0;
        var offset
        for (i; i < numSegments; ++i) {
            offset = i * 3;
            getPointsOnBezierCurveWithSplitting(points, offset, tolerance, newPoints);
        }

        return newPoints;
    };

    // Ramer Douglas Peucker algorithm
    vec3_distanceToSegmentSq = function (p, v, w) {
        var l2 = vec3.sqrDist(v, w);
        if (l2 === 0) return vec3.sqrDist(p, v);
        var t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
        t = Math.max(0, Math.min(1, t));
        return vec3.sqrDist(p, vec3.lerp([0, 0], v, w, t));
    };

    simplifyPoints = function (points, start, end, epsilon, newPoints) {
        var outPoints = newPoints || [];
        // find the most distant point from the line formed by the endpoints
        var s = points[start];
        var e = points[end - 1];
        var maxDistSq = 0;
        var maxNdx = 1;
        var i = start + 1
        for (i; i < end - 1; ++i) {
            var distSq = vec3_distanceToSegmentSq(points[i], s, e);
            if (distSq > maxDistSq) {
                maxDistSq = distSq;
                maxNdx = i;
            }
        }
        // if that point is too far
        if (Math.sqrt(maxDistSq) > epsilon) {
            // split
            simplifyPoints(points, start, maxNdx + 1, epsilon, outPoints);
            simplifyPoints(points, maxNdx, end, epsilon, outPoints);
        } else outPoints.push(s, e);// add the 2 end points
        return outPoints;
    };

    lerp = function (a, b, t) {
        return a + (b - a) * t;
    };

    lathePoints = function (points,
                            startAngle,   // angle to start at (ie 0)
                            endAngle,     // angle to end at (ie Math.PI * 2)
                            numDivisions, // how many quads to make around
                            capStart,     // true to cap the top
                            capEnd) {     // true to cap the bottom
        var positions = [];
        var texcoords = [];
        var indices = [];

        var vOffset = capStart ? 1 : 0;
        var pointsPerColumn = points.length + vOffset + (capEnd ? 1 : 0);
        var quadsDown = pointsPerColumn - 1;

        // generate v coordniates
        var vcoords = [];

        // first compute the length of the points
        var length = 0;
        var i = 0;
        for (i; i < points.length - 1; ++i) {
            vcoords.push(length);
            length += vec3.distance(points[i], points[i + 1]);
        }
        vcoords.push(length);  // the last point

        // now divide each by the total length;
        vcoords = vcoords.map(v = > v / length
    )
        ;

        // generate points
        var division = 0;
        var tempMAT4 = mat4.create()
        for (division; division <= numDivisions; ++division) {
            var u = division / numDivisions;
            var angle = lerp(startAngle, endAngle, u) % (Math.PI * 2);
            var angleMTX = mat4.fromYRotation(tempMAT4, angle);
            if (capStart) {
                // add point on Y access at start
                positions.push(0, points[0][1], 0);
                texcoords.push(u, 0);
            }
            var i2, len2;
            var targetPoint;
            i2 = 0;
            len2 = points.length
            for (i2; i2 < len2; i2++) {
                targetPoint = points[i2];
                targetPoint = vec3.transformMat4([0, 0, 0], [targetPoint[0], targetPoint[1], targetPoint[2]], angleMTX);
                positions.push(targetPoint[0], targetPoint[1], targetPoint[2]);
                texcoords.push(u, vcoords[i2]);
            }
            if (capEnd) {
                // add point on Y access at end
                positions.push(0, points[points.length - 1][1], 0);
                texcoords.push(u, 1);
            }
        }

        // generate indices
        var division = 0
        var column1Offset;
        var column2Offset;
        var quad;
        for (division; division < numDivisions; ++division) {
            column1Offset = division * pointsPerColumn;
            column2Offset = column1Offset + pointsPerColumn;
            quad = 0;
            for (quad; quad < quadsDown; ++quad) {
                indices.push(column1Offset + quad, column1Offset + quad + 1, column2Offset + quad);
                indices.push(column1Offset + quad + 1, column2Offset + quad + 1, column2Offset + quad);
            }
        }
        return {
            position: positions,
            texcoord: texcoords,
            indices: indices,
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
        function getVertIndex(x, y, z) {
            var vertId = x + "," + y + "," + z;
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
            var thisFaceVertexNormals = [];
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
                newVertIndices.push(getNewVertIndex(
                    positions[poffset + 0], positions[poffset + 1], positions[poffset + 2],
                    norm[0], norm[1], norm[2],
                    texcoords[toffset + 0], texcoords[toffset + 1]));
            }
        }

        return {
            position: newPositions,
            texcoord: newTexcoords,
            normal: newNormals,
            indices: newVertIndices,
        };
    }

    makeData = (function () {

        //TODO 정리
        return function (redGL, type, points) {
            ////////////////////////////////////////////////////////////////////////////
            // 데이터 생성!
            // buffers Data
            var interleaveData = [];
            var indexData;
            // console.log(points)
            // var positions = points['position']
            // var normals = points['normal']
            // var texcoords = points['texcoord']
            // indexData = points['indices']
            var i = 0, len = points.length
            for (i; i < len; i++) {
                interleaveData.push(points[i][0], points[i][1], points[i][2])
                // interleaveData.push(normals[i * 3 + 0], normals[i * 3 + 1], normals[i * 3 + 2])
                // interleaveData.push(texcoords[i * 2 + 0], texcoords[i * 2 + 1])
            }
            ////////////////////////////////////////////////////////////////////////////
            // console.log(redGL['__datas']['RedPrimitive'])
            return {
                interleaveData: interleaveData,
                // indexData: indexData,
                type: type,
                interleaveBuffer: RedBuffer(
                    redGL,
                    type + '_interleaveBuffer',
                    RedBuffer.ARRAY_BUFFER,
                    new Float32Array(interleaveData),
                    [
                        RedInterleaveInfo('aVertexPosition', 3)
                        // RedInterleaveInfo('aVertexNormal', 3),
                        // RedInterleaveInfo('aTexcoord', 2)
                    ]
                )
                // ,
                // indexBuffer: RedBuffer(
                //     redGL,
                //     type + '_indexBuffer',
                //     RedBuffer.ELEMENT_ARRAY_BUFFER,
                //     new Uint16Array(indexData)
                // )
            }
        }
    })();

    /**DOC:
     {
		 varructorYn : true,
		 title :`RedSpline`,
		 description : `
			 RedSpline 형태의 RedGeometry 생성
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
			 startAngle : [
				 {type:'number'},
				 'startAngle'
			 ],
			 endAngle : [
				 {type:'number'},
				 'endAngle'
			 ]
		 },
		 extends : [
		    'RedGeometry'
		 ],
		 demo : '../example/primitives/RedSpline.html',
		 return : 'RedSpline Instance'
	 }
     :DOC*/
    RedSpline = function (redGL, svgStr, numDivisions, capStart, capEnd, startAngle, endAngle, maxAngle, distance, tolerance, flipX, flipY) {
        if (!(this instanceof RedSpline)) return new RedSpline(redGL, svgStr, numDivisions, capStart, capEnd, startAngle, endAngle, maxAngle, distance, tolerance, flipX, flipY);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPrimitive : RedGL Instance만 허용.', redGL);

        var tType, tPrimitiveData;
        numDivisions = Math.floor(numDivisions) || 16;
        capStart = capStart !== undefined ? capStart : false;
        capEnd = capEnd !== undefined ? capEnd : false;
        startAngle = startAngle !== undefined ? startAngle : 0.0;
        endAngle = endAngle !== undefined ? endAngle : Math.PI * 2;
        distance = distance !== undefined ? distance : 0.4;
        maxAngle = maxAngle !== undefined ? maxAngle : Math.PI / 180 * 30
        tolerance = tolerance !== undefined ? tolerance : 0.15
        if (tolerance < 0.1) tolerance = 0.1

        tType = 'RedSpline' + '_' + svgStr + '_' + numDivisions + '_' + capStart + '_' + capEnd + '_' + startAngle + '_' + endAngle + '_' + maxAngle + '_' + distance + '_' + tolerance + '_' + flipX + '_' + flipY;
        // 유일키 방어
        if (!redGL['_datas']['Primitives']) redGL['_datas']['Primitives'] = {};
        if (redGL['_datas']['Primitives'][tType]) return redGL['_datas']['Primitives'][tType];
        else redGL['_datas']['Primitives'][tType] = this;

        // svg 해석
        var curvePoints = svgStr;
        // console.log(curvePoints)
        // // 베지어 포인트 해석
        var tempPoints = getPointsOnBezierCurves(curvePoints, tolerance);
        // console.log(tempPoints)
        // // 단순화
        // var points = simplifyPoints(tempPoints, 0, tempPoints.length, distance);
        // console.log(points)
        // 레이스 계산
        // var tempArrays = lathePoints(points, startAngle, endAngle, numDivisions, capStart, capEnd);
        // 노말생성
        // var finalData = generateNormals(tempArrays, maxAngle);
        //
        console.log(tempPoints)
        tPrimitiveData = makeData(redGL, tType, tempPoints, numDivisions, capStart, capEnd, startAngle, endAngle);
        this['interleaveBuffer'] = tPrimitiveData['interleaveBuffer'];
        this['indexBuffer'] = tPrimitiveData['indexBuffer'];
        this['interleaveBuffer']['isPrimitiveBuffer'] = true
        // this['indexBuffer']['isPrimitiveBuffer'] = true
        this['_UUID'] = RedGL.makeUUID();
        console.log(this)
    };
    RedSpline.prototype = Object.create(RedGeometry.prototype);
    Object.freeze(RedSpline);
})
();