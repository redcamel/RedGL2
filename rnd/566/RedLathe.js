"use strict";
var RedLathe;
(function () {
    var makeData;
    makeData = (function () {
        function lerp(a, b, t) {
            return a + (b - a) * t;
        }

        function flatness(points, offset) {
            const p1 = points[offset + 0];
            const p2 = points[offset + 1];
            const p3 = points[offset + 2];
            const p4 = points[offset + 3];

            let ux = 3 * p2[0] - 2 * p1[0] - p4[0];
            ux *= ux;
            let uy = 3 * p2[1] - 2 * p1[1] - p4[1];
            uy *= uy;
            let vx = 3 * p3[0] - 2 * p4[0] - p1[0];
            vx *= vx;
            let vy = 3 * p3[1] - 2 * p4[1] - p1[1];
            vy *= vy;

            if (ux < vx) {
                ux = vx;
            }

            if (uy < vy) {
                uy = vy;
            }

            return ux + uy;
        }

        function getPointsOnBezierCurveWithSplitting(points, offset, tolerance, newPoints) {
            const outPoints = newPoints || [];
            if (flatness(points, offset) < tolerance) {

                // just add the end points of this curve
                outPoints.push(points[offset + 0]);
                outPoints.push(points[offset + 3]);

            } else {

                // subdivide
                const t = .5;
                const p1 = points[offset + 0];
                const p2 = points[offset + 1];
                const p3 = points[offset + 2];
                const p4 = points[offset + 3];

                const q1 = vec2.lerp([], p1, p2, t);
                const q2 = vec2.lerp([], p2, p3, t);
                const q3 = vec2.lerp([], p3, p4, t);

                const r1 = vec2.lerp([], q1, q2, t);
                const r2 = vec2.lerp([], q2, q3, t);

                const red = vec2.lerp([], r1, r2, t);

                // do 1st half
                getPointsOnBezierCurveWithSplitting([p1, q1, r1, red], 0, tolerance, outPoints);
                // do 2nd half
                getPointsOnBezierCurveWithSplitting([red, r2, q3, p4], 0, tolerance, outPoints);

            }
            return outPoints;
        }

        function getPointsOnBezierCurves(points, tolerance) {
            const newPoints = [];
            const numSegments = (points.length - 1) / 3;
            for (let i = 0; i < numSegments; ++i) {
                const offset = i * 3;
                getPointsOnBezierCurveWithSplitting(points, offset, tolerance, newPoints);
            }
            return newPoints;
        }

        function simplifyPoints(points, start, end, epsilon, newPoints) {
            const outPoints = newPoints || [];

            // find the most distant point from the line formed by the endpoints
            const s = points[start];
            const e = points[end - 1];
            let maxDistSq = 0;
            let maxNdx = 1;
            for (let i = start + 1; i < end - 1; ++i) {
                const distSq = distanceToSegmentSq(points[i], s, e);
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

            } else {

                // add the 2 end points
                outPoints.push(s, e);
            }

            return outPoints;
        }

        function distanceSq(a, b) {
            const dx = a[0] - b[0];
            const dy = a[1] - b[1];
            return dx * dx + dy * dy;
        }

        function distanceToSegmentSq(p, v, w) {
            const l2 = distanceSq(v, w);
            if (l2 === 0) {
                return distanceSq(p, v);
            }
            let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
            t = Math.max(0, Math.min(1, t));
            return distanceSq(p, lerp(v, w, t));
        }

        function generateNormals(positions, texcoords, indexData, maxAngle) {

            // first compute the normal of each face
            let getNextIndex = makeIndiceIterator(indexData);
            const numFaceVerts = getNextIndex.numElements;
            const numVerts = positions.length;
            const numFaces = numFaceVerts / 3;
            const faceNormals = [];

            // Compute the normal for every face.
            // While doing that, create a new vertex for every face vertex
            for (let i = 0; i < numFaces; ++i) {
                const n1 = getNextIndex() * 3;
                const n2 = getNextIndex() * 3;
                const n3 = getNextIndex() * 3;

                const v1 = positions.slice(n1, n1 + 3);
                const v2 = positions.slice(n2, n2 + 3);
                const v3 = positions.slice(n3, n3 + 3);
                faceNormals.push(
                    vec3.normalize(
                        [0, 0, 0],
                        vec3.cross(
                            [0, 0, 0],
                            vec3.subtract([0, 0, 0], v1, v2),
                            vec3.subtract([0, 0, 0], v3, v2))
                    )
                );
            }

            let tempVerts = {};
            let tempVertNdx = 0;

            // this assumes vertex positions are an exact match

            function getVertIndex(x, y, z) {

                const vertId = x + "," + y + "," + z;
                const ndx = tempVerts[vertId];
                if (ndx !== undefined) {
                    return ndx;
                }
                const newNdx = tempVertNdx++;
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

            const vertIndices = [];
            for (let i = 0; i < numVerts; ++i) {
                const offset = i * 3;
                const vert = positions.slice(offset, offset + 3);
                vertIndices.push(getVertIndex(vert));
            }

            // go through every vertex and record which faces it's on
            const vertFaces = [];
            getNextIndex.reset();
            for (let i = 0; i < numFaces; ++i) {
                for (let j = 0; j < 3; ++j) {
                    const ndx = getNextIndex();
                    const sharedNdx = vertIndices[ndx];
                    let faces = vertFaces[sharedNdx];
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
            const newPositions = [];
            const newTexcoords = [];
            const newNormals = [];

            function getNewVertIndex(x, y, z, nx, ny, nz, u, v) {
                const vertId =
                    x + "," + y + "," + z + "," +
                    nx + "," + ny + "," + nz + "," +
                    u + "," + v;

                const ndx = tempVerts[vertId];
                if (ndx !== undefined) {
                    return ndx;
                }
                const newNdx = tempVertNdx++;
                tempVerts[vertId] = newNdx;
                newPositions.push(x, y, z);
                newNormals.push(nx, ny, nz);
                newTexcoords.push(u, v);
                return newNdx;
            }

            const newVertIndices = [];
            getNextIndex.reset();
            const maxAngleCos = Math.cos(maxAngle);
            // for each face
            for (let i = 0; i < numFaces; ++i) {
                // get the normal for this face
                const thisFaceNormal = faceNormals[i];
                // for each vertex on the face
                for (let j = 0; j < 3; ++j) {
                    const ndx = getNextIndex();
                    const sharedNdx = vertIndices[ndx];
                    const faces = vertFaces[sharedNdx];
                    const norm = [0, 0, 0];
                    faces.forEach(faceNdx => {
                        // is this face facing the same way
                        const otherFaceNormal = faceNormals[faceNdx];
                        const dot = vec3.dot(thisFaceNormal, otherFaceNormal);
                        // if (dot > maxAngleCos) {
                        vec3.add(norm, otherFaceNormal, norm);
                        // }
                    });
                    vec3.normalize(norm, norm);
                    const poffset = ndx * 3;
                    const toffset = ndx * 2;
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

        function makeIndexedIndicesFn(indices) {
            let ndx = 0;
            const fn = function () {
                return indices[ndx++];
            };
            fn.reset = function () {
                ndx = 0;
            };
            fn.numElements = indices.length;
            return fn;
        }

        function makeUnindexedIndicesFn(arrays) {
            let ndx = 0;
            const fn = function () {
                return ndx++;
            };
            fn.reset = function () {
                ndx = 0;
            }
            fn.numElements = arrays.length / 3;
            return fn;
        }

        function makeIndiceIterator(indices) {
            return indices
                ? makeIndexedIndicesFn(indices)
                : makeUnindexedIndicesFn(indices);
        }

        //TODO 정리
        return function (redGL, type, points, radialSegments, capStart, capEnd, thetaStart, thetaLength) {
            ////////////////////////////////////////////////////////////////////////////
            // 데이터 생성!
            // buffers Data
            var interleaveData = [];
            var indexData = [];
            var normals
            //
            var lathePoints

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
            var slope = (bottomY - topY);
            lathePoints = function (points,
                                    startAngle,   // angle to start at (ie 0)
                                    endAngle,     // angle to end at (ie Math.PI * 2)
                                    numDivisions, // how many quads to make around
                                    capStart,     // true to cap the top
                                    capEnd) {     // true to cap the bottom
                var positions = [];
                var texcoords = [];


                var vOffset = capStart ? 1 : 0;
                var pointsPerColumn = points.length + vOffset + (capEnd ? 1 : 0);
                var quadsDown = pointsPerColumn - 1;

                // generate v coordniates
                let vcoords = [];
                // first compute the length of the points
                let length = 0;
                for (let i = 0; i < points.length - 1; ++i) {
                    vcoords.push(length);
                    length += vec2.distance(points[i], points[i + 1]);
                }
                vcoords.push(length);  // the last point


                // now divide each by the total length;
                vcoords = vcoords.map(v => v / length);


                // generate points
                for (let division = 0; division <= numDivisions; ++division) {
                    var u = division / numDivisions;
                    var angle = lerp(startAngle, endAngle, u) % (Math.PI * 2);
                    var mat = mat4.fromYRotation(mat4.create(), angle);
                    if (capStart) {
                        // add point on Y axis at start
                        positions.push(0, -points[0][1], 0);
                        texcoords.push(u, 0);
                    }
                    points.forEach(function (p, ndx) {
                        var tp = vec3.transformMat4([], [p[0], -p[1], 0], mat);
                        positions.push(tp[0], tp[1], tp[2]);
                        texcoords.push(u, 1.0 - vcoords[ndx]);
                    });
                    if (capEnd) {
                        // add point on Y axis at end
                        positions.push(0, -points[points.length - 1][1], 0);
                        texcoords.push(u, 1);
                    }

                }

                // generate indexData
                for (let division = 0; division < numDivisions; ++division) {
                    var column1Offset = division * pointsPerColumn;
                    var column2Offset = column1Offset + pointsPerColumn;

                    for (var quad = 0; quad < quadsDown; ++quad) {
                        indexData.push(column1Offset + quad, column1Offset + quad + 1, column2Offset + quad);
                        indexData.push(column1Offset + quad + 1, column2Offset + quad + 1, column2Offset + quad);
                    }
                }

                var t0 = generateNormals(positions, texcoords, indexData, thetaLength)
                positions = t0['position']
                normals = t0['normal']
                texcoords = t0['texcoord']
                indexData = t0['indices']
                // normals = RedGLUtil.calculateNormals(positions, indexData)
                var i = 0, len = positions.length / 3
                for (i; i < len; i++) {
                    interleaveData.push(positions[i * 3 + 0], positions[i * 3 + 1], positions[i * 3 + 2])
                    interleaveData.push(normals[i * 3 + 0], normals[i * 3 + 1], normals[i * 3 + 2])
                    interleaveData.push(texcoords[i * 2 + 0], texcoords[i * 2 + 1])
                }

            }
            var tolerance = 0.15;
            var distance = 0.6
            var tempPoints = getPointsOnBezierCurves(points, tolerance)

            lathePoints(simplifyPoints(tempPoints, 0, tempPoints.length, distance), thetaStart, thetaLength, radialSegments, capStart, capEnd)
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
		 varructorYn : true,
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
    RedLathe = function (redGL, points, radialSegments, capStart, capEnd, thetaStart, thetaLength) {
        if (!(this instanceof RedLathe)) return new RedLathe(redGL, points, radialSegments, capStart, capEnd, thetaStart, thetaLength);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPrimitive : RedGL Instance만 허용.', redGL);
        var tType, tPrimitiveData;
        radialSegments = Math.floor(radialSegments) || 8;
        capStart = capStart !== undefined ? capStart : false;
        capEnd = capEnd !== undefined ? capEnd : false;
        thetaStart = thetaStart !== undefined ? thetaStart : 0.0;
        thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;
        tType = 'RedLathe' + '_' + points + '_' + radialSegments + '_' + capStart + '_' + capEnd + '_' + thetaStart + '_' + thetaLength;
        // 유일키 방어
        if (!redGL['_datas']['Primitives']) redGL['_datas']['Primitives'] = {};
        if (redGL['_datas']['Primitives'][tType]) return redGL['_datas']['Primitives'][tType];
        else redGL['_datas']['Primitives'][tType] = this;
        //
        tPrimitiveData = makeData(redGL, tType, points, radialSegments, capStart, capEnd, thetaStart, thetaLength);
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