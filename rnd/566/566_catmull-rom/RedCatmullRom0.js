/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var RedCatmullRom;
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
		 title :`RedCatmullRom`,
		 description : `
			 RedCatmullRom 형태의 RedGeometry 생성
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
		 demo : '../example/primitives/RedCatmullRom.html',
		 return : 'RedCatmullRom Instance'
	 }
     :DOC*/
    RedCatmullRom = function (redGL, points, tension, distance, tolerance, flipX, flipY) {
        if (!(this instanceof RedCatmullRom)) return new RedCatmullRom(redGL, points, tension, distance, tolerance, flipX, flipY);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPrimitive : RedGL Instance만 허용.', redGL);

        var tType, tPrimitiveData;
        distance = distance !== undefined ? distance : 0.4;
        tension = tension !== undefined ? tension : 1;

        tolerance = tolerance !== undefined ? tolerance : 0.15
        if (tolerance < 0.1) tolerance = 0.1
        tolerance = 0.1

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
                p1[2] = 0
                p2[2] = 0
                c1[2] = 0
                c2[2] = 0

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

        var solve = function (data, k) {

            if (k == null) k = 1;

            var size = data.length;
            var last = size - 4;

            var path = "M" + [data[0], data[1]];

            for (var i = 0; i < size - 2; i += 2) {

                var x0 = i ? data[i - 2] : data[0];
                var y0 = i ? data[i - 1] : data[1];

                var x1 = data[i + 0];
                var y1 = data[i + 1];

                var x2 = data[i + 2];
                var y2 = data[i + 3];

                var x3 = i !== last ? data[i + 4] : x2;
                var y3 = i !== last ? data[i + 5] : y2;

                var cp1x = x1 + (x2 - x0) / 6 * k;
                var cp1y = y1 + (y2 - y0) / 6 * k;

                var cp2x = x2 - (x3 - x1) / 6 * k;
                var cp2y = y2 - (y3 - y1) / 6 * k;

                path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2];
            }
            console.log(path)
            return path;
        }


        // points = parseSVGPath(solve(points))
        // points = solve(points)
        // console.log(points)
        var parseSVGPath = function (svg, flipX, flipY) {
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
                        if (delta) values[0] += lastValues[0], values[1] += lastValues[1], values[2] += lastValues[2]
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
            for (i; i < len; ++i) min = vec2.min([0, 0], min, points[i]), max = vec2.max([0, 0], max, points[i]);
            var range = vec2.sub([0, 0], max, min);
            var halfRange = vec2.scale([0, 0], range, .5);
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
        var tList = []
        points.forEach(function (v) {
            tList.push(v['point'][0], v['point'][1])
        })

        console.log(solve(tList, tension))

        newPointList = parseSVGPath(solve(tList, tension), flipX, flipY)
        console.log(newPointList)
        tType = 'RedCatmullRom' + '_' + newPointList + '_' + tension + '_' + distance + '_' + tolerance + '_' + flipX + '_' + flipY;
        // 유일키 방어
        if (!redGL['_datas']['Primitives']) redGL['_datas']['Primitives'] = {};
        if (redGL['_datas']['Primitives'][tType]) return redGL['_datas']['Primitives'][tType];
        else redGL['_datas']['Primitives'][tType] = this;


        parsedPointList = parsePoints(newPointList)
        parsedPointList = simplifyPoints(parsedPointList, 0, parsedPointList.length, distance)
        //

        console.log(parsedPointList)
        tPrimitiveData = makeData(redGL, tType, parsedPointList, tension);
        this['interleaveBuffer'] = tPrimitiveData['interleaveBuffer'];
        this['indexBuffer'] = tPrimitiveData['indexBuffer'];
        this['interleaveBuffer']['isPrimitiveBuffer'] = true
        this['debugMeshList'] = debugMeshList
        // this['indexBuffer']['isPrimitiveBuffer'] = true
        this['_UUID'] = RedGL.makeUUID();
        console.log(this)
    };
    RedCatmullRom.prototype = Object.create(RedGeometry.prototype);
    Object.freeze(RedCatmullRom);
})
();