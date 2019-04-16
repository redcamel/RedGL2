"use strict";
var RedLine;
(function () {
    var solveCatmullRomPoint;
    var getPointsOnBezierCurves;
    var serializePoints;
    var parsePointsByType;
    var setDebugMeshs, destroyDebugMesh;
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
        console.log(newPointList)
        return newPointList;
    };
    getPointsOnBezierCurves = (function () {
        var flatness
        var getPointsOnBezierCurveWithSplitting

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
        return function (points, tolerance) {
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
    destroyDebugMesh = function (target) {
        target['points'].forEach(function (tPoint, index) {
            var t0;
            if (tPoint['_debugObjectInPointMesh']) {
                tPoint['_debugObjectPointMesh'].removeChild(t0 = tPoint['_debugObjectInPointMesh'])
                t0.disposeAll()
                tPoint['_debugObjectInPointMesh'] = null
            }
            if (tPoint['_debugObjectOutPointMesh']) {
                tPoint['_debugObjectPointMesh'].removeChild(t0 = tPoint['_debugObjectOutPointMesh'])
                t0.disposeAll()
                tPoint['_debugObjectOutPointMesh'] = null
            }
            if (tPoint['_debugObjectPointMesh']) {
                target.removeChild(t0 = tPoint['_debugObjectPointMesh'])
                t0.disposeAll()
                tPoint['_debugObjectPointMesh'] = null
            }

        })
    };
    setDebugMeshs = function (target) {
        var debugSize = 1
        var tDebugMesh;
        var redGL = target['_redGL'];
        var tDebugRoot;
        var t1;
        destroyDebugMesh(target)
        target['points'].forEach(function (tPoint, index) {
            if (!tPoint['_debugObjectPointMesh']) {
                tPoint['_debugObjectPointMesh'] = RedMesh(redGL, RedBox(redGL, debugSize, debugSize, debugSize), RedColorMaterial(redGL, '#00ff00'));
                target.addChild(tPoint['_debugObjectPointMesh']);
            }
            tDebugRoot = tPoint['_debugObjectPointMesh'];
            if (target['_type'] == RedLine.LINEAR) {

            } else {
                // 인포인트
                if (index) {
                    if (!tPoint['_debugObjectInPointMesh']) {
                        tPoint['_debugObjectInPointMesh'] = RedMesh(
                            redGL,
                            RedBox(redGL, debugSize * 0.5, debugSize * 0.5, debugSize * 0.5),
                            RedColorMaterial(
                                redGL,
                                target['_type'] == RedLine.BEZIER ? '#0000ff' : '#fff',
                                target['_type'] == RedLine.BEZIER ? 1 : 0.5
                            )
                        );
                        t1 = RedLine(redGL, RedColorMaterial(redGL, '#fff', 0.5))
                        t1.drawMode = redGL.gl.LINES
                        tDebugRoot.addChild(tPoint['_debugObjectInPointMesh'])
                        tPoint['_debugObjectInPointMesh'].addChild(t1)
                    }
                    t1 = tPoint['_debugObjectInPointMesh'].getChildAt(0);
                    t1['_interleaveData'].length = 0;
                    t1['_interleaveData'].push(0, 0, 0);
                    t1['_interleaveData'].push(
                        tPoint['_point'][0] - tPoint['_inPoint'][0],
                        tPoint['_point'][1] - tPoint['_inPoint'][1],
                        tPoint['_point'][2] - tPoint['_inPoint'][2]
                    );
                    t1['_upload']();
                }
                if (index != target['points'].length - 1) {
                    if (!tPoint['_debugObjectOutPointMesh']) {
                        // 아웃포인트
                        tPoint['_debugObjectOutPointMesh'] = RedMesh(
                            redGL,
                            RedBox(redGL, debugSize * 0.5, debugSize * 0.5, debugSize * 0.5),
                            RedColorMaterial(
                                redGL,
                                target['_type'] == RedLine.BEZIER ? '#ff0000' : '#fff',
                                target['_type'] == RedLine.BEZIER ? 1 : 0.5
                            )
                        );
                        t1 = RedLine(redGL, RedColorMaterial(redGL, '#fff', 0.5))
                        t1.drawMode = redGL.gl.LINES
                        tDebugRoot.addChild(tPoint['_debugObjectOutPointMesh'])
                        tPoint['_debugObjectOutPointMesh'].addChild(t1)
                    }
                    t1 = tPoint['_debugObjectOutPointMesh'].getChildAt(0);
                    t1['_interleaveData'].length = 0;
                    t1['_interleaveData'].push(0, 0, 0);
                    t1['_interleaveData'].push(
                        tPoint['_point'][0] - tPoint['_outPoint'][0],
                        tPoint['_point'][1] - tPoint['_outPoint'][1],
                        tPoint['_point'][2] - tPoint['_outPoint'][2]
                    );
                    t1['_upload']();
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
    parsePointsByType = function (target, tension, tolerance, distance) {
        // 타입별로 파서 분기
        console.log(target)
        target['_interleaveData'].length = 0;

        switch (target['_type']) {
            case RedLine['CATMULL_ROM'] :
                if (target['points'].length > 1) {
                    var newPointList = solveCatmullRomPoint(target['points'], tension);
                    console.log(newPointList)
                    target['_serializedPoints'] = serializePoints(newPointList);
                    newPointList = getPointsOnBezierCurves(target['_serializedPoints'], tolerance);
                    newPointList = simplifyPoints(newPointList, 0, newPointList.length, distance)

                    var i = 0, len = newPointList.length
                    for (i; i < len; i++) {
                        target['_interleaveData'].push(newPointList[i][0], newPointList[i][1], newPointList[i][2])
                    }
                } else {
                    target['_interleaveData'].push(0, 0, 0)
                }
                break;
            case RedLine['BEZIER'] :
                if (target['points'].length > 1) {
                    target['_serializedPoints'] = serializePoints(target['points']);
                    newPointList = getPointsOnBezierCurves(target['_serializedPoints'], tolerance);
                    newPointList = simplifyPoints(newPointList, 0, newPointList.length, distance)

                    var i = 0, len = newPointList.length
                    for (i; i < len; i++) {
                        target['_interleaveData'].push(newPointList[i][0], newPointList[i][1], newPointList[i][2])
                    }
                } else {
                    target['_interleaveData'].push(0, 0, 0)
                }
                break;
            default :
                target['points'].forEach(function (v) {
                    target['_interleaveData'].push(v['_point'][0], v['_point'][1], v['_point'][2]);
                })
        }
        if (target['debug']) setDebugMeshs(target)
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
			 ],
			 type : [
				 {type:'RedLine.LINEAR or RedLine.CATMULL_ROM or RedLine.BEZIER - default : RedLine.LINEAR'}
			 ]
		 },
		 extends : [
		    'RedBaseContainer',
		    'RedBaseObject3D'
		 ],
		 demo : '../example/object3D/RedLine.html',
		 example : `

		 `,
		 return : 'RedLine Instance'
	 }
     :DOC*/
    RedLine = function (redGL, material, type) {
        if (!(this instanceof RedLine)) return new RedLine(redGL, material, type);
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
        this['_tolerance'] = 0.01
        this['_distance'] = 0.1
        this['type'] = type || RedLine['LINEAR'];
        this['_debug'] = false
        console.log(this)
    };
    /**DOC:
     {
		 title :`RedLine.LINEAR`,
		 code : 'CONST',
		 description : `RedLine 타입상수`,
		 return : 'String'
	 }
     :DOC*/
    RedLine['LINEAR'] = 'linear';
    /**DOC:
     {
		 title :`RedLine.CATMULL_ROM`,
		 code : 'CONST',
		 description : `RedLine 타입상수`,
		 return : 'String'
	 }
     :DOC*/
    RedLine['CATMULL_ROM'] = 'catmullRom';
    /**DOC:
     {
		 title :`RedLine.BEZIER`,
		 code : 'CONST',
		 description : `RedLine 타입상수`,
		 return : 'String'
	 }
     :DOC*/
    RedLine['BEZIER'] = 'bezier';

    RedLine.prototype = new RedBaseContainer();
    /**DOC:
     {
	     code : 'METHOD',
		 title :`addPoint`,
		 description : `
			 라인 포인트 추가
		 `,
		 params : {
			 x : [{type:'Number'}],
			 y : [{type:'Number'}],
			 z : [{type:'Number'}],
			 inX : [{type:'Number'}],
			 inY : [{type:'Number'}],
			 inZ : [{type:'Number'}],
			 outX : [{type:'Number'}],
			 outY : [{type:'Number'}],
			 outZ : [{type:'Number'}]
		 },
		 return : 'void'
	 }
     :DOC*/
    RedLine.prototype['addPoint'] = function (x, y, z, inX, inY, inZ, outX, outY, outZ) {

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
        outX = outX || 0;
        outY = outY || 0;
        outZ = outZ || 0;
        typeof outX == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - outX값은 숫자만 허용', '입력값 : ' + outX);
        typeof outY == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - outY값은 숫자만 허용', '입력값 : ' + outY);
        typeof outZ == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - outZ값은 숫자만 허용', '입력값 : ' + outZ);
        this['points'].push(RedLinePoint(x, y, z, inX, inY, inZ, outX, outY, outZ));
        parsePointsByType(this, this['_tension'], this['_tolerance'], this['_distance']);
    };
    /**DOC:
     {
	     code : 'METHOD',
		 title :`addPointAt`,
		 description : `
			 해당인덱스에 포인트 추가
		 `,
		 params : {
		     index : [{type:'Number'}],
			 x : [{type:'Number'}],
			 y : [{type:'Number'}],
			 z : [{type:'Number'}],
			 inX : [{type:'Number'}],
			 inY : [{type:'Number'}],
			 inZ : [{type:'Number'}],
			 outX : [{type:'Number'}],
			 outY : [{type:'Number'}],
			 outZ : [{type:'Number'}]
		 },
		 return : 'void'
	 }
     :DOC*/
    RedLine.prototype['addPointAt'] = function (index, x, y, z, inX, inY, inZ, outX, outY, outZ) {

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
        outX = outX || 0;
        outY = outY || 0;
        outZ = outZ || 0;
        typeof outX == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - outX값은 숫자만 허용', '입력값 : ' + outX);
        typeof outY == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - outY값은 숫자만 허용', '입력값 : ' + outY);
        typeof outZ == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - outZ값은 숫자만 허용', '입력값 : ' + outZ);

        typeof index == 'number' || RedGLUtil.throwFunc('addPointAt', 'index는 숫자만 입력가능', '입력값 : ' + index);
        if (this['points'].length < index) index = this['points'].length;
        if (index != undefined) this['points'].splice(index, 0, RedLinePoint(x, y, z, inX, inY, inZ, outX, outY, outZ));
        else this['points'].push(RedLinePoint(x, y, z, inX, inY, inZ, outX, outY, outZ));
        parsePointsByType(this, this['_tension'], this['_tolerance'], this['_distance']);
    };
    /**DOC:
     {
	     code : 'METHOD',
		 title :`removePointAt`,
		 description : `
			 인덱스에 해당하는 포인트 제거
		 `,
		 params : {
		     index : [{type:'Number'}]
         },
		 return : 'void'
	 }
     :DOC*/
    RedLine.prototype['removePointAt'] = function (index) {
        if (typeof index != 'number') RedGLUtil.throwFunc('removeChildAt', 'index가 Number형이 아님 ', '입력값 : ' + index);
        if (this['points'][index]) this['points'].splice(index, 1);
        else RedGLUtil.throwFunc('removeChildAt', 'index 해당인덱스에 위치한 포인트가 없음.', '입력값 : ' + index);
        parsePointsByType(this, this['_tension'], this['_tolerance'], this['_distance']);
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
        parsePointsByType(this, this['_tension'], this['_tolerance'], this['_distance']);
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
    /**DOC:
     {
		 code : 'PROPERTY',
		 title :`type`,
		 description : `
             라인 타입
             기본값 : RedLine.LINEAR
             허용값 : RedLine.LINEAR, RedLine.CATMULL_ROM, RedLine.BEZIER
		 `,
		 return : 'string'
	 }
     :DOC*/
    Object.defineProperty(RedLine.prototype, 'type', {
        get: function () {
            return this['_type'];
        },
        set: function (v) {
            if (!(v == RedLine.LINEAR || v == RedLine.CATMULL_ROM || v == RedLine.BEZIER)) RedGLUtil.throwFunc('RedLine : 허용하지 않는 타입', '입력값 : ' + v);
            this['_type'] = v;
            parsePointsByType(this, this['_tension'], this['_tolerance'], this['_distance']);
        }
    });
    /**DOC:
     {
		 code : 'PROPERTY',
		 title :`tension`,
		 description : `
		 type이 RedLine.CATMULL_ROM 일 경우의 장력
		 기본값 1
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedLine', 'tension', 'number', {
        callback: function (v) {
            parsePointsByType(this, this['_tension'], this['_tolerance'], this['_distance']);
        }
    });
    /**DOC:
     {
		 code : 'PROPERTY',
		 title :`distance`,
		 description : `
		 포인트간 최소 간격
		 기본값 0.1
		 최소값 0
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedLine', 'distance', 'number', {
        min: 0,
        callback: function (v) {
            parsePointsByType(this, this['_tension'], this['_tolerance'], this['_distance']);
        }
    });
    /**DOC:
     {
		 code : 'PROPERTY',
		 title :`debug`,
		 description : `
		 debug 모드 사용 여부
		 기본값 false
		 `,
		 return : 'Boolean'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedLine', 'debug', 'boolean', {
        callback: function (v) {
            if (v) setDebugMeshs(this)
            else destroyDebugMesh(this)
        }
    });
    RedLine.prototype['_simplifyPoints'] = simplifyPoints;
    RedLine.prototype['_getPointsOnBezierCurves'] = getPointsOnBezierCurves;
    Object.freeze(RedLine);
})();