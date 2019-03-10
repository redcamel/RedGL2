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

                const q1 = vec2.lerp([],p1, p2, t);
                const q2 = vec2.lerp([],p2, p3, t);
                const q3 = vec2.lerp([],p3, p4, t);

                const r1 = vec2.lerp([],q1, q2, t);
                const r2 = vec2.lerp([],q2, q3, t);

                const red = vec2.lerp([],r1, r2, t);

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

        //TODO 정리
        return function (redGL, type, points, radialSegments, openEnded, thetaStart, thetaLength) {
            ////////////////////////////////////////////////////////////////////////////
            // 데이터 생성!
            // buffers Data
            var interleaveData = [];
            var indexData = [];
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
                var normals = []

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
                console.log(vcoords,length)

                // generate points
                for (let division = 0; division <= numDivisions; ++division) {
                    var u = division / numDivisions;
                    var angle = lerp(startAngle, endAngle, u) % (Math.PI * 2);
                    var mat = mat4.fromYRotation(mat4.create(), angle);
                    if (capStart) {
                        // add point on Y axis at start
                        positions.push(0, points[0][1], 0);
                        texcoords.push(u, 0);
                    }
                    var theta = u * thetaLength + thetaStart;
                    var sinTheta = Math.sin(theta);
                    var cosTheta = Math.cos(theta);
                    points.forEach(function (p, ndx) {
                        var tp = vec3.transformMat4([], [p[0], p[1], 0], mat);

                        positions.push(tp[0], tp[1], tp[2]);
                        texcoords.push(u, vcoords[ndx]);
                        normals.push(sinTheta,slope,cosTheta)
                    });
                    if (capEnd) {
                        // add point on Y axis at end
                        positions.push(0, points[points.length - 1][1], 0);
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

                // var normals = RedGLUtil.calculateNormals(positions, indexData)
                var i = 0, len = positions.length / 3
                for (i; i < len; i++) {
                    interleaveData.push(positions[i * 3 + 0], positions[i * 3 + 1], positions[i * 3 + 2])
                    interleaveData.push(normals[i * 3 + 0], normals[i * 3 + 1], normals[i * 3 + 2])
                    interleaveData.push(texcoords[i * 2 + 0], texcoords[i * 2 + 1])
                }
                console.log(texcoords)
            }
            var tolerance = 0.15;
            var distance = 0.4
            var tempPoints = getPointsOnBezierCurves(points, tolerance)

            lathePoints(simplifyPoints(tempPoints, 0, tempPoints.length, distance), thetaStart, thetaLength, radialSegments, openEnded, openEnded)
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