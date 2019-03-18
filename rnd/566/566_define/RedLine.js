"use strict";
var RedLine;
(function () {
    var solveCatmullRomPoint;
    var getPointsOnBezierCurves;
    var serializePoints;
    var parsePointsByType;
    var setDebugMeshs;
    solveCatmullRomPoint = function (points, tension) {
        if (tension == null) tension = 1;
        var size = points.length;
        var last = size - 2;
        var i = 0;
        var p0, p1, p2, p3;
        for (i; i < size - 1; i++) {
            // 이전 포인트를 구함
            p0 = i ? points[i - 1]['_point'] : points[i]['_point'];
            // 현재 포인트를 구함
            p1 = points[i]['_point'];
            // 다음 포인트를 구함
            p2 = points[i + 1]['_point'];
            // 다다음 포인트를 구함
            p3 = i == last ? p2 : points[i + 2]['_point'];

            points[i]['_outPoint'][0] = p1[0] + (p2[0] - p0[0]) / 6 * tension;
            points[i]['_outPoint'][1] = p1[1] + (p2[1] - p0[1]) / 6 * tension;
            points[i]['_outPoint'][2] = p1[2] + (p2[2] - p0[2]) / 6 * tension;

            points[i + 1]['_inPoint'][0] = p2[0] - (p3[0] - p1[0]) / 6 * tension;
            points[i + 1]['_inPoint'][1] = p2[1] - (p3[1] - p1[1]) / 6 * tension;
            points[i + 1]['_inPoint'][2] = p2[2] - (p3[2] - p1[2]) / 6 * tension;
        }
        return points;
    };
    serializePoints = function (points) {
        var newPointList = [];
        var i, len;
        var index = 0;
        var targetPoint;

        i = 0;
        len = points.length;
        for (i; i < len; i++) {
            targetPoint = points[i];

            if (index == 0) {
                newPointList[index++] = targetPoint['_point']
                newPointList[index++] = targetPoint['_outPoint']
                //
            } else {
                newPointList[index++] = targetPoint['_inPoint']
                newPointList[index++] = targetPoint['_point']
                if (points[i + 1]) newPointList[index++] = targetPoint['_outPoint']

            }
        }
        return newPointList;
    };
    getPointsOnBezierCurves = (function () {
        var flatness
        var getPointsOnBezierCurveWithSplitting
        var simplifyPoints;
        var vec2_distanceToSegmentSq;
        vec2_distanceToSegmentSq = function (p, v, w) {
            var l2 = vec2.sqrDist(v, w);
            if (l2 === 0) return vec2.sqrDist(p, v);
            var t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
            t = Math.max(0, Math.min(1, t));
            return vec2.sqrDist(p, vec2.lerp([0, 0], v, w, t));
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
        flatness = function (points, offset) {
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
                var c1 = points[offset + 1];
                var c2 = points[offset + 2];
                var p2 = points[offset + 3];
                //
                var q1 = vec3.lerp([0, 0], p1, c1, t);
                var q2 = vec3.lerp([0, 0], c1, c2, t);
                var q3 = vec3.lerp([0, 0], c2, p2, t);
                //
                var r1 = vec3.lerp([0, 0], q1, q2, t);
                var r2 = vec3.lerp([0, 0], q2, q3, t);
                //
                var red = vec3.lerp([0, 0], r1, r2, t);
                // do 1st half
                getPointsOnBezierCurveWithSplitting([p1, q1, r1, red], 0, tolerance, outPoints);
                // do 2nd half
                getPointsOnBezierCurveWithSplitting([red, r2, q3, p2], 0, tolerance, outPoints);
            }
            return outPoints;
        };
        return function (target, points, tolerance) {
            var newPoints = [];
            var numSegments = (points.length - 1) / 3;
            numSegments = Math.floor(numSegments)
            var i = 0;
            var offset
            for (i; i < numSegments; ++i) {
                offset = i * 3;
                getPointsOnBezierCurveWithSplitting(points, offset, tolerance, newPoints);
            }
            return newPoints;
        }
    })();
    setDebugMeshs = function (target) {
        var debugSize = 3
        var tDebugMesh;
        var redGL = target['_redGL'];
        var tDebugRoot;
        var t1;
        target['points'].forEach(function (tPoint) {
            if (!tPoint['_debugObjectPointMesh']) {
                tPoint['_debugObjectPointMesh'] = RedMesh(redGL, RedBox(redGL, debugSize, debugSize, debugSize), RedColorMaterial(redGL, '#00ff00'));
                target.addChild(tPoint['_debugObjectPointMesh']);
            }
            tDebugRoot = tPoint['_debugObjectPointMesh'];
            if (target['_type'] == RedLine.LINEAR) {
                if (tPoint['_debugObjectInPointMesh']) {
                    tPoint['_debugObjectPointMesh'].removeChild(tPoint['_debugObjectInPointMesh'])
                    tPoint['_debugObjectInPointMesh'] = null
                }
                if (tPoint['_debugObjectOutPointMesh']) {
                    tPoint['_debugObjectPointMesh'].removeChild(tPoint['_debugObjectOutPointMesh'])
                    tPoint['_debugObjectOutPointMesh'] = null
                }
            } else {
                // 인포인트
                if (!tPoint['_debugObjectInPointMesh']) {
                    tPoint['_debugObjectInPointMesh'] = RedMesh(redGL, RedBox(redGL, debugSize, debugSize, debugSize), RedColorMaterial(redGL, '#0000ff'));
                    t1 = RedLine(redGL, RedColorMaterial(redGL, '#fff', 0.5))
                    tDebugRoot.addChild(tPoint['_debugObjectInPointMesh'])
                    tPoint['_debugObjectInPointMesh'].addChild(t1)
                }
                if (!tPoint['_debugObjectOutPointMesh']) {
                    // 아웃포인트
                    tPoint['_debugObjectOutPointMesh'] = RedMesh(redGL, RedBox(redGL, debugSize, debugSize, debugSize), RedColorMaterial(redGL, '#ff0000'));
                    t1 = RedLine(redGL, RedColorMaterial(redGL, '#fff', 0.5))
                    tDebugRoot.addChild(tPoint['_debugObjectOutPointMesh'])
                    tPoint['_debugObjectOutPointMesh'].addChild(t1)
                }

            }
            if (tPoint['_debugObjectPointMesh']) {
                tDebugMesh = tPoint['_debugObjectPointMesh']
                tDebugMesh['x'] = tPoint['_point'][0]
                tDebugMesh['y'] = tPoint['_point'][1]
                tDebugMesh['z'] = tPoint['_point'][2]
            }

            // 아웃 포인트 디버깅
            if (tPoint['_debugObjectOutPointMesh']) {
                tPoint['_debugObjectOutPointMesh']['x'] = tPoint['_outPoint'][0] - tPoint['_point'][0]
                tPoint['_debugObjectOutPointMesh']['y'] = tPoint['_outPoint'][1] - tPoint['_point'][1]
                tPoint['_debugObjectOutPointMesh']['z'] = tPoint['_outPoint'][2] - tPoint['_point'][2]
            }

            // 인 포인트 디버깅
            if (tPoint['_debugObjectInPointMesh']) {
                tPoint['_debugObjectInPointMesh']['x'] = tPoint['_inPoint'][0] - tPoint['_point'][0]
                tPoint['_debugObjectInPointMesh']['y'] = tPoint['_inPoint'][1] - tPoint['_point'][1]
                tPoint['_debugObjectInPointMesh']['z'] = tPoint['_inPoint'][2] - tPoint['_point'][2]
            }

        });
    }
    parsePointsByType = function (target, tension, tolerance) {
        // 타입별로 파서 분기
        console.log(target)
        target['_interleaveData'].length = 0;

        switch (target['_type']) {
            case RedLine['CATMULL_ROM'] :
                // if (target['points'].length > 3) {
                var newPointList = solveCatmullRomPoint(target['points'], tension);
                console.log(newPointList)
                target['_serializedPoints'] = serializePoints(newPointList);
                newPointList = getPointsOnBezierCurves(target, target['_serializedPoints'], tolerance);
                target['_interleaveData'].length = 0
                var i = 0, len = newPointList.length
                for (i; i < len; i++) {
                    target['_interleaveData'].push(newPointList[i][0], newPointList[i][1], newPointList[i][2])
                }
                // }
                break;
            case RedLine['BEZIER'] :
                target['_serializedPoints'] = serializePoints(target['points']);
                newPointList = getPointsOnBezierCurves(target, target['_serializedPoints'], tolerance);
                target['_interleaveData'].length = 0
                var i = 0, len = newPointList.length
                for (i; i < len; i++) {
                    target['_interleaveData'].push(newPointList[i][0], newPointList[i][1], newPointList[i][2])
                }
                break;
            default :
                target['points'].forEach(function (v) {
                    target['_interleaveData'].push(v['_point'][0], v['_point'][1], v['_point'][2]);
                })
        }
        setDebugMeshs(target)
        console.log(target['_interleaveData'])
        // target['_indexData'].push(tIndex);
        target['_upload']();
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedLine`,
		 description : `
			 RedLine Instance 생성기
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 material : [
				 {type:'RedColorMaterial Instance'}
			 ]
		 },
		 extends : [
		    'RedBaseContainer',
		    'RedBaseObject3D'
		 ],
		 demo : '../example/object3D/RedLine.html',
		 example : `
            var tLine;
            var tX, tY, tZ;
            var i;
            tLine = RedLine(RedGL Instance, RedColorMaterial( RedGL Instance ) ); // RedLine Instance 생성
            i = 60;
            tX = tY = tZ = 0;
            while (i--) {
                tX += Math.random() * 0.5;
                tY += Math.random() * 0.5;
                tZ += Math.random() * 0.5;
                tLine.addPoint(tX, tY, tZ); // 포인트 추가
            }
		 `,
		 return : 'RedLine Instance'
	 }
     :DOC*/
    RedLine = function (redGL, type, material) {
        if (!(this instanceof RedLine)) return new RedLine(redGL, type, material);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedLine : RedGL Instance만 허용.', redGL);
        material = material || RedColorMaterial(redGL);
        material instanceof RedColorMaterial || RedGLUtil.throwFunc('RedLine : RedColorMaterial Instance만 허용.');
        var tGL;
        tGL = redGL.gl;
        RedBaseObject3D['build'].call(this, tGL);
        this['_redGL'] = redGL;
        this['_interleaveData'] = [0, 0, 0];
        // this['_indexData'] = [];
        this['_UUID'] = RedGL.makeUUID();
        this['_interleaveBuffer'] = RedBuffer(
            redGL,
            'RedLine_InterleaveBuffer_' + this['_UUID'],
            RedBuffer.ARRAY_BUFFER,
            new Float32Array(this['_interleaveData']),
            [
                RedInterleaveInfo('aVertexPosition', 3)
            ]
        );
        this['geometry'] = RedGeometry(this['_interleaveBuffer'] /*,this['_indexBuffer']*/);
        this['material'] = material;
        this['drawMode'] = tGL.LINE_STRIP;
        //
        this['points'] = []; // 오리지널 포인트
        this['_serializedPoints'] = []; //직렬화된 포인트
        this['_tension'] = 1
        this['tolerance'] = 0.1
        this['type'] = type || RedLine['LINEAR'];
        console.log(this)
    };
    RedLine['LINEAR'] = 'linear';
    RedLine['CATMULL_ROM'] = 'catmullRom';
    RedLine['BEZIER'] = 'bezier';

    RedLine.prototype = new RedBaseContainer();
    /**DOC:
     {
	     code : 'METHOD',
		 title :`addPoint`,
		 description : `
			 라인 포인트 추가
		 `,
		 parmas : {
			 x : [{type:'Number'}],
			 y : [{type:'Number'}],
			 z : [{type:'Number'}]
		 },
		 return : 'void'
	 }
     :DOC*/
    RedLine.prototype['addPoint'] = function (x, y, z, inX, inY, inZ, outX, outY, outZ) {
        var tPoint;
        typeof x == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - x값은 숫자만 허용', '입력값 : ' + x);
        typeof y == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - y값은 숫자만 허용', '입력값 : ' + y);
        typeof z == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - z값은 숫자만 허용', '입력값 : ' + z);
        //
        inX = inX || 0;
        inY = inY || 0;
        inZ = inZ || 0;
        typeof inX == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - inX값은 숫자만 허용', '입력값 : ' + inX);
        typeof inY == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - inY값은 숫자만 허용', '입력값 : ' + inY);
        typeof inZ == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - inZ값은 숫자만 허용', '입력값 : ' + inZ);
        //
        outX = inX || 0;
        outY = inY || 0;
        outZ = inZ || 0;
        typeof outX == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - outX값은 숫자만 허용', '입력값 : ' + outX);
        typeof outY == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - outY값은 숫자만 허용', '입력값 : ' + outY);
        typeof outZ == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - outZ값은 숫자만 허용', '입력값 : ' + outZ);
        this['points'].push(tPoint = RedLinePoint(x, y, z));

        parsePointsByType(this, this['tension'], this['tolerance']);
    };
    /**DOC:
     {
	     code : 'METHOD',
		 title :`removeAllPoint`,
		 description : `
			 라인 포인트 전체 제거
		 `,
		 return : 'void'
	 }
     :DOC*/
    RedLine.prototype['removeAllPoint'] = function () {
        this['points'].length = 0;
        this['_interleaveData'].length = 0;
        // indexData.length = 0;
        this['_upload']();
    };
    RedLine.prototype['_upload'] = function () {
        this['_interleaveBuffer'].upload(new Float32Array(this['_interleaveData']));
        // this['_indexBuffer']['upload'](new Uint16Array(this['_indexData']));
    };
    Object.defineProperty(RedLine.prototype, 'geometry', {
        get: function () {
            return this['_geometry'];
        },
        set: function (v) {
            if (this['_geometry']) RedGLUtil.throwFunc('RedLine : geometry - 임의로 설정을 허용하지 않음', '입력값 : ' + v);
            this['_geometry'] = v;
        }
    });
    Object.defineProperty(RedLine.prototype, 'material', {
        get: function () {
            return this['_material'];
        },
        set: function (v) {
            v instanceof RedColorMaterial || RedGLUtil.throwFunc('RedLine : RedColorMaterial Instance만 허용.', '입력값 : ' + v);
            this['_material'] = v;
        }
    });
    Object.defineProperty(RedLine.prototype, 'type', {
        get: function () {
            return this['_type'];
        },
        set: function (v) {
            this['_type'] = v;
            parsePointsByType(this, this['_tension'], this['tolerance']);
        }
    });
    Object.defineProperty(RedLine.prototype, 'tension', {
        get: function () {
            return this['_tension'];
        },
        set: function (v) {
            this['_tension'] = v;
            parsePointsByType(this, this['_tension'], this['tolerance']);
        }
    });
    Object.freeze(RedLine);
})();