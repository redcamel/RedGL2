"use strict";
var RedBezier;
(function () {
    //https://webglfundamentals.org/webgl/lessons/webgl-3d-geometry-lathe.html
    var makeData;


    makeData = (function () {

        //TODO 정리
        return function (redGL, type, points) {
            ////////////////////////////////////////////////////////////////////////////
            // 데이터 생성!
            console.log(points)

            // buffers Data
            var interleaveData = [];

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
		 title :`RedBezier`,
		 description : `
			 RedBezier 형태의 RedGeometry 생성
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
		 demo : '../example/primitives/RedBezier.html',
		 return : 'RedBezier Instance'
	 }
     :DOC*/
    RedBezier = function (redGL, points, numDivisions, capStart, capEnd, startAngle, endAngle, maxAngle, distance, tolerance, flipX, flipY) {
        if (!(this instanceof RedBezier)) return new RedBezier(redGL, points, numDivisions, capStart, capEnd, startAngle, endAngle, maxAngle, distance, tolerance, flipX, flipY);
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


        // svg 해석
        var parsedPointList;
        var parsePoints;
        var flatness = function (points, offset) {
            var p1 = points[offset + 0];
            var c1 = points[offset + 1];
            var c2 = points[offset + 2];
            var p4 = points[offset + 3];
            var ux = 3 * c1[0] - 2 * p1[0] - p4[0];
            var uy = 3 * c1[1] - 2 * p1[1] - p4[1];
            var vx = 3 * c2[0] - 2 * p4[0] - p1[0];
            var vy = 3 * c2[1] - 2 * p4[1] - p1[1];
            ux *= ux, uy *= uy, vx *= vx, vy *= vy;
            if (ux < vx) ux = vx;
            if (uy < vy) uy = vy;
            return ux + uy;
        };

        var getPointsOnBezierCurveWithSplitting = function (points, offset, tolerance, newPoints) {
            var outPoints = newPoints || [];
            if (flatness(points, offset) < tolerance) {
                // just add the end points of this curve
                outPoints.push(points[offset + 0]);
                outPoints.push(points[offset + 3]);
            } else {
                // subdivide
                var t = .5;
                var p1 = points[offset + 0];
                var c1 = points[offset + 1];
                var c2 = points[offset + 2];
                var p2 = points[offset + 3];

                var q1 = vec3.lerp([0, 0], p1, c1, t);
                var q2 = vec3.lerp([0, 0], c1, c2, t);
                var q3 = vec3.lerp([0, 0], c2, p2, t);

                var r1 = vec3.lerp([0, 0], q1, q2, t);
                var r2 = vec3.lerp([0, 0], q2, q3, t);

                var red = vec3.lerp([0, 0], r1, r2, t);

                // do 1st half
                getPointsOnBezierCurveWithSplitting([p1, q1, r1, red], 0, tolerance, outPoints);
                // do 2nd half
                getPointsOnBezierCurveWithSplitting([red, r2, q3, p2], 0, tolerance, outPoints);

            }
            return outPoints;
        };

        // gets points across all segments
        var getPointsOnBezierCurves = function (points, tolerance) {
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
        var vec2_distanceToSegmentSq = function (p, v, w) {
            var l2 = vec2.sqrDist(v, w);
            if (l2 === 0) return vec2.sqrDist(p, v);
            var t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
            t = Math.max(0, Math.min(1, t));
            return vec2.sqrDist(p, vec2.lerp([0, 0], v, w, t));
        };

        var simplifyPoints = function (points, start, end, epsilon, newPoints) {
            var outPoints = newPoints || [];
            // find the most distant point from the line formed by the endpoints
            var s = points[start];
            var e = points[end - 1];
            var maxDistSq = 0;
            var maxNdx = 1;
            var i = start + 1
            for (i; i < end - 1; ++i) {
                var distSq = vec2_distanceToSegmentSq(points[i], s, e);
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
        parsePoints = function (pointList) {
            return getPointsOnBezierCurves(pointList, tolerance)
        }
        var newPointList = []
        var debugMeshList = []
        points.forEach(function (v, index) {
            console.log(v)
            debugMeshList.push(v['debugMesh'])
            if (index == 0) {
                // debugMeshList.push(v['debugInPointMesh'])
                // debugMeshList.push(v['debugOutPointMesh'])
                newPointList.push(
                    v['point'],
                    v['outPoint']
                )
                debugMeshList.push(v['debugOutPointMesh'])
                console.log(v['debugOutPointMesh'].getChildAt(0))
                v['debugOutPointMesh'].getChildAt(0).addPoint(
                    -v['outPoint'][0] + v['point'][0],
                    -v['outPoint'][1] + v['point'][1],
                    -v['outPoint'][2] + v['point'][2]
                )
                v['debugOutPointMesh'].getChildAt(0).addPoint(0, 0, 0)
            } else {
                if (points[index + 1]) {
                    newPointList.push(
                        v['inPoint'], v['point'], v['outPoint']
                    )
                    debugMeshList.push(v['debugInPointMesh'])
                    debugMeshList.push(v['debugOutPointMesh'])


                    v['debugInPointMesh'].getChildAt(0).addPoint(
                        -v['inPoint'][0] + v['point'][0],
                        -v['inPoint'][1] + v['point'][1],
                        -v['inPoint'][2] + v['point'][2]
                    )
                    v['debugInPointMesh'].getChildAt(0).addPoint(0, 0, 0)

                    v['debugOutPointMesh'].getChildAt(0).addPoint(
                        -v['outPoint'][0] + v['point'][0],
                        -v['outPoint'][1] + v['point'][1],
                        -v['outPoint'][2] + v['point'][2]
                    )
                    v['debugOutPointMesh'].getChildAt(0).addPoint(0, 0, 0)


                } else {
                    newPointList.push(
                        v['inPoint'], v['point']
                    )
                    debugMeshList.push(v['debugInPointMesh'])
                    v['debugInPointMesh'].getChildAt(0).addPoint(
                        -v['inPoint'][0] + v['point'][0],
                        -v['inPoint'][1] + v['point'][1],
                        -v['inPoint'][2] + v['point'][2]
                    )
                    v['debugInPointMesh'].getChildAt(0).addPoint(0, 0, 0)
                }

            }

        })
        console.log(newPointList)
        tType = 'RedBezier' + '_' + newPointList + '_' + numDivisions + '_' + capStart + '_' + capEnd + '_' + startAngle + '_' + endAngle + '_' + maxAngle + '_' + distance + '_' + tolerance + '_' + flipX + '_' + flipY;
        // 유일키 방어
        if (!redGL['_datas']['Primitives']) redGL['_datas']['Primitives'] = {};
        if (redGL['_datas']['Primitives'][tType]) return redGL['_datas']['Primitives'][tType];
        else redGL['_datas']['Primitives'][tType] = this;


        parsedPointList = parsePoints(newPointList)
        parsedPointList = simplifyPoints(parsedPointList, 0, parsedPointList.length, distance)
        //

        console.log(parsedPointList)
        tPrimitiveData = makeData(redGL, tType, parsedPointList, numDivisions, capStart, capEnd, startAngle, endAngle);
        this['interleaveBuffer'] = tPrimitiveData['interleaveBuffer'];
        this['indexBuffer'] = tPrimitiveData['indexBuffer'];
        this['interleaveBuffer']['isPrimitiveBuffer'] = true
        this['debugMeshList'] = debugMeshList
        // this['indexBuffer']['isPrimitiveBuffer'] = true
        this['_UUID'] = RedGL.makeUUID();
        console.log(this)
    };
    RedBezier.prototype = Object.create(RedGeometry.prototype);
    Object.freeze(RedBezier);
})
();