/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";

var RedTransformController;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedTransformController`,
		 description : `
			 RedTransformController Instance 생성기
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
		 },
		 extends : [
		    'RedBaseContainer',
		    'RedBaseObject3D'
		 ],
		 demo : '../example/object3D/RedTransformController.html',
		 example : `
			 var tScene;
			 tScene = RedScene();
			 tScene['axis'] = RedTransformController(redGL Instance)
		 `,
		 return : 'RedTransformController Instance'
	 }
     :DOC*/
    var calBoundBox = function (tTransformController, tMesh) {

        var minX, minY, minZ, maxX, maxY, maxZ, vx, vy, vz, t, i, len;
        var stride = tMesh.geometry['interleaveBuffer']['stride'];
        // if (!volume[this]) {
        minX = minY = minZ = maxX = maxY = maxZ = 0;
        t = tMesh.geometry['interleaveBuffer']['data'];
        i = 0;
        len = tMesh.geometry['interleaveBuffer']['pointNum'];
        for (i; i < len; i++) {
            vx = i * stride , vy = vx + 1, vz = vx + 2;
            var transform = tMesh.matrix;
            var x = transform[0] * t[vx] + transform[4] * t[vy] + transform[8] * t[vz];
            var y = transform[1] * t[vx] + transform[5] * t[vy] + transform[9] * t[vz];
            var z = transform[2] * t[vx] + transform[6] * t[vy] + transform[10] * t[vz];
            minX = x < minX ? x : minX;
            maxX = x > maxX ? x : maxX;
            minY = y < minY ? y : minY;
            maxY = y > maxY ? y : maxY;
            minZ = z < minZ ? z : minZ;
            maxZ = z > maxZ ? z : maxZ;
        }
        tMesh.geometry['_volume'] = [maxX - minX, maxY - minY, maxZ - minZ];
        tMesh.geometry['_volume'].minX = minX;
        tMesh.geometry['_volume'].maxX = maxX;
        tMesh.geometry['_volume'].minY = minY;
        tMesh.geometry['_volume'].maxY = maxY;
        tMesh.geometry['_volume'].minZ = minZ;
        tMesh.geometry['_volume'].maxZ = maxZ;


        var tMTX = mat4.create();
        mat4.translate(tMTX, tMTX, tMesh.localToWorld(0, 0, 0));
        mat4.scale(tMTX, tMTX, tMesh.geometry['_volume']);
        var tScale = 0;
        if (tScale < tMesh.geometry['_volume'][0]) tScale = tMesh.geometry['_volume'][0];
        if (tScale < tMesh.geometry['_volume'][1]) tScale = tMesh.geometry['_volume'][1];
        if (tScale < tMesh.geometry['_volume'][2]) tScale = tMesh.geometry['_volume'][2];
        if (_useScale) tTransformController.rotationGroup.scaleX = tTransformController.rotationGroup.scaleY = tTransformController.rotationGroup.scaleZ = tScale;
        tTransformController['boundBox'].matrix = tMTX
    };
    var calBoundBox2 = function (tTransformController, tMesh) {
        var tVolume = tMesh.geometry.volume;
        console.log(tVolume);
        var tMTX = mat4.create();
        mat4.translate(tMTX, tMTX, tMesh.localToWorld(0, 0, 0));
        mat4.rotateX(tMTX, tMTX, -tMesh.rotationX * Math.PI / 180);
        mat4.rotateY(tMTX, tMTX, -tMesh.rotationY * Math.PI / 180);
        mat4.rotateZ(tMTX, tMTX, -tMesh.rotationZ * Math.PI / 180);
        mat4.scale(tMTX, tMTX, tVolume);
        mat4.scale(tMTX, tMTX, [tMesh.scaleX, tMesh.scaleY, tMesh.scaleZ]);


        var tScale = 0;
        if (tScale < tMesh.scaleX) tScale = tMesh.scaleX;
        if (tScale < tMesh.scaleY) tScale = tMesh.scaleY;
        if (tScale < tMesh.scaleZ) tScale = tMesh.scaleZ;
        if (_useScale) tTransformController.rotationGroup.scaleX = tTransformController.rotationGroup.scaleY = tTransformController.rotationGroup.scaleZ = tScale;
        tTransformController['boundBox'].matrix = tMTX
    };
    var instanceList = [];
    RedTransformController = function (redGL) {
        if (!(this instanceof RedTransformController)) return new RedTransformController(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedTransformController : RedGL Instance만 허용.', redGL);
        RedBaseObject3D['build'].call(this, redGL.gl);
        this['setRotationGroup'](redGL);
        this['setScaleGroup'](redGL);
        this['setPositionGroup'](redGL);
        ////////////////////////////////////////////
        this['boundBox'] = RedBoundBox(redGL);
        this['children'].push(this['boundBox']);
        ///////////////////////////////////////////
        instanceList.push(this)
        this['_UUID'] = RedGL.makeUUID();
    };
    RedTransformController.prototype = new RedBaseContainer();
    var _useScale = true;
    var _usePosition = true;
    var _useRotation = true
    Object.defineProperty(RedTransformController, 'useScale', {
        get: function () {
            return _useScale
        },
        set: function (v) {
            _useScale = v
            instanceList.forEach(function (tGroup) {
                tGroup['scaleGroup'].scaleX = tGroup['scaleGroup'].scaleY = tGroup['scaleGroup'].scaleZ = v ? 1 : 0
            })
        }
    });
    Object.defineProperty(RedTransformController, 'usePosition', {
        get: function () {
            return _usePosition
        },
        set: function (v) {
            _usePosition = v
            instanceList.forEach(function (tGroup) {
                tGroup['positionGroup'].scaleX = tGroup['positionGroup'].scaleY = tGroup['positionGroup'].scaleZ = v ? 1 : 0
            })
        }
    });
    Object.defineProperty(RedTransformController, 'useRotation', {
        get: function () {
            return _useRotation
        },
        set: function (v) {
            _useRotation = v
            instanceList.forEach(function (tGroup) {
                tGroup['rotationGroup'].scaleX = tGroup['rotationGroup'].scaleY = tGroup['rotationGroup'].scaleZ = v ? 1 : 0
            })
        }
    })
    RedTransformController.prototype['setScaleGroup'] = function (redGL) {
        var tScaleMesh;
        var tSphere;
        var tMatX = RedColorMaterial(redGL, '#ff0000', 0.5);
        var tMatY = RedColorMaterial(redGL, '#00ff00', 0.5);
        var tMatZ = RedColorMaterial(redGL, '#0000ff', 0.5);
        tSphere = RedSphere(redGL, 0.25);
        ////////////////////////////////////////////
        this['scaleGroup'] = RedMesh(redGL);
        this['children'].push(this['scaleGroup']);
        // xAxis
        tScaleMesh = RedMesh(redGL, tSphere, tMatX);
        tScaleMesh.x = 4;
        tScaleMesh['useCullFace'] = false;
        tScaleMesh['depthTestFunc'] = redGL.gl.ALWAYS;
        this['scalePointX'] = tScaleMesh;
        this['scaleGroup'].addChild(tScaleMesh);
        ////////////////////////////////////////////
        // yAxis
        tScaleMesh = RedMesh(redGL, tSphere, tMatY);
        tScaleMesh.y = 4;
        tScaleMesh['useCullFace'] = false;
        tScaleMesh['depthTestFunc'] = redGL.gl.ALWAYS;
        this['scalePointY'] = tScaleMesh;
        this['scaleGroup'].addChild(tScaleMesh);
        ////////////////////////////////////////////
        // zAxis
        tScaleMesh = RedMesh(redGL, tSphere, tMatZ);
        tScaleMesh.z = 4;
        tScaleMesh['useCullFace'] = false;
        tScaleMesh['depthTestFunc'] = redGL.gl.ALWAYS;
        this['scalePointZ'] = tScaleMesh;
        this['scaleGroup'].addChild(tScaleMesh);
    };
    RedTransformController.prototype ['setRotationGroup'] = function (redGL) {
        var rotationXLine;
        var rotationYLine;
        var rotationZLine;
        var tMatX = RedColorMaterial(redGL, '#ff0000', 0.5);
        var tMatY = RedColorMaterial(redGL, '#00ff00', 0.5);
        var tMatZ = RedColorMaterial(redGL, '#0000ff', 0.5);
        this['rotationGroup'] = RedMesh(redGL);
        this['children'].push(this['rotationGroup']);
        rotationXLine = RedMesh(redGL, RedSphere(redGL, 1, 32, 32, 32), tMatX);
        rotationXLine.scaleZ = 0;
        rotationXLine.rotationX = 90;
        rotationXLine.rotationY = 90;
        this['rotationGroup'].addChild(rotationXLine);
        rotationYLine = RedMesh(redGL, RedSphere(redGL, 1, 32, 32, 32), tMatY);
        rotationYLine.scaleZ = 0;
        rotationYLine.rotationZ = 90;
        rotationYLine.rotationX = 90;
        this['rotationGroup'].addChild(rotationYLine);
        rotationZLine = RedMesh(redGL, RedSphere(redGL, 1, 32, 32, 32), tMatZ);
        rotationZLine.scaleZ = 0;
        this['rotationGroup'].addChild(rotationZLine);
        this['rotationXLine'] = rotationXLine;
        this['rotationYLine'] = rotationYLine;
        this['rotationZLine'] = rotationZLine;
    };
    RedTransformController.prototype['setPositionGroup'] = function (redGL) {
        var tArrowMesh;
        var tAxis;
        var tBox, tArrow;
        var tMatX, tMatY, tMatZ;
        this['positionGroup'] = RedMesh(redGL);
        this.addChild(this['positionGroup']);
        tBox = RedBox(redGL);
        tArrow = RedCylinder(redGL, 0, 0.5);
        tMatX = RedColorMaterial(redGL, '#ff0000', 0.5);
        tMatY = RedColorMaterial(redGL, '#00ff00', 0.5);
        tMatZ = RedColorMaterial(redGL, '#0000ff', 0.5);
        ////////////////////////////////////////////

        // xAxis
        tArrowMesh = RedMesh(redGL, tArrow, tMatX);
        tAxis = RedMesh(redGL, tBox, tMatX);
        tAxis['depthTestFunc'] = redGL.gl.ALWAYS;
        tArrowMesh['depthTestFunc'] = redGL.gl.ALWAYS;
        tAxis.scaleX = tAxis.scaleY = tAxis.scaleZ = 0.01;
        tAxis.scaleX = 5;
        tArrowMesh.x = 5;
        tArrowMesh.rotationZ = 90;
        tAxis.x = 2.5;
        this['arrowX'] = tArrowMesh;
        this['positionGroup'].addChild(tAxis);
        this['positionGroup'].addChild(tArrowMesh);
        ////////////////////////////////////////////
        // yAxis
        tArrowMesh = RedMesh(redGL, tArrow, tMatY);
        tAxis = RedMesh(redGL, tBox, tMatY);
        tAxis['depthTestFunc'] = redGL.gl.ALWAYS;
        tArrowMesh['depthTestFunc'] = redGL.gl.ALWAYS;
        tAxis.scaleX = tAxis.scaleY = tAxis.scaleZ = 0.01;
        tAxis.scaleY = 5;
        tArrowMesh.y = 5;
        tAxis.y = 2.5;
        this['arrowY'] = tArrowMesh;
        this['positionGroup'].addChild(tAxis);
        this['positionGroup'].addChild(tArrowMesh);
        ////////////////////////////////////////////
        // zAxis
        tArrowMesh = RedMesh(redGL, tArrow, tMatZ);
        tAxis = RedMesh(redGL, tBox, tMatZ);
        tAxis['depthTestFunc'] = redGL.gl.ALWAYS;
        tArrowMesh['depthTestFunc'] = redGL.gl.ALWAYS;
        tAxis.scaleX = tAxis.scaleY = tAxis.scaleZ = 0.01;
        tAxis.scaleZ = 5;
        tArrowMesh.z = 5;
        tArrowMesh.rotationX = -90;
        tAxis.z = 2.5;
        this['arrowZ'] = tArrowMesh;
        this['positionGroup'].addChild(tAxis);
        this['positionGroup'].addChild(tArrowMesh);
        ////////////////////////////////////////////
        var t0 = RedMesh(redGL, RedSphere(redGL, 0.1, 32, 32, 32), RedColorMaterial(redGL, '#5b52aa', 1));
        t0['depthTestFunc'] = redGL.gl.ALWAYS;
        this['move'] = t0;
        this['positionGroup'].addChild(t0);
    };

    RedTransformController.prototype['setTarget'] = (function () {
        return function (tView, tMesh) {
            var tTransformController = this;
            var tScene = tView['scene'];
            var tController = tView['camera'];
            var tDirection = 0;
            var startPosition = [];
            var startControllerPosition = [];
            var startControllerScale = [];
            var startRotation;
            var startLocalMTX;
            var startMouseX = 0;
            var startMouseY = 0;
            tTransformController.scaleGroup.rotationX = tMesh.rotationX;
            tTransformController.scaleGroup.rotationY = tMesh.rotationY;
            tTransformController.scaleGroup.rotationZ = tMesh.rotationZ;
            tTransformController.rotationGroup.rotationX = tMesh.rotationX;
            tTransformController.rotationGroup.rotationY = tMesh.rotationY;
            tTransformController.rotationGroup.rotationZ = tMesh.rotationZ;
            tTransformController.x = tMesh.x;
            tTransformController.y = tMesh.y;
            tTransformController.z = tMesh.z;

            var hd_move = function (e) {
                var currentPosition = RedGLUtil.screenToWorld(
                    [
                        e.layerX, e.layerY,
                        tView['_viewRect'][2], tView['_viewRect'][3]
                    ],
                    tController
                );
                // position
                if (_usePosition) {
                    if (tDirection === 0) tTransformController.x = tMesh.x = startControllerPosition[0] + (currentPosition[0] - startPosition[0]);
                    if (tDirection === 1) tTransformController.y = tMesh.y = startControllerPosition[1] + (currentPosition[1] - startPosition[1]);
                    if (tDirection === 2) tTransformController.z = tMesh.z = startControllerPosition[2] + (currentPosition[2] - startPosition[2]);
                    if (tDirection === 3) {
                        tTransformController.x = tMesh.x = startControllerPosition[0] + (currentPosition[0] - startPosition[0]);
                        tTransformController.y = tMesh.y = startControllerPosition[1] + (currentPosition[1] - startPosition[1]);
                        tTransformController.z = tMesh.z = startControllerPosition[2] + (currentPosition[2] - startPosition[2]);
                    }
                }
                // scale
                if (_useScale) {
                    if (tDirection === 7) tMesh.scaleX = startControllerScale[0] + (currentPosition[0] - startPosition[0]);
                    if (tDirection === 8) tMesh.scaleY = startControllerScale[1] + (currentPosition[1] - startPosition[1]);
                    if (tDirection === 9) tMesh.scaleZ = startControllerScale[2] + (currentPosition[2] - startPosition[2]);
                }
                // rotation
                if (_useRotation) {
                    if (tDirection === 4 || tDirection === 5 || tDirection === 6) {
                        tTransformController.scaleGroup.rotationX = tMesh.rotationX;
                        tTransformController.scaleGroup.rotationY = tMesh.rotationY;
                        tTransformController.scaleGroup.rotationZ = tMesh.rotationZ;
                        tTransformController.rotationGroup.rotationX = tMesh.rotationX;
                        tTransformController.rotationGroup.rotationY = tMesh.rotationY;
                        tTransformController.rotationGroup.rotationZ = tMesh.rotationZ
                    }

                    var tAxis;
                    var tDot, tDot2;
                    var localMTX;
                    var resultRotation;
                    if (startMouseX < tView['_viewRect'][2] / 2) tAxis = [0, 0, -1];
                    else tAxis = [0, 0, 1];
                    if (tDirection === 4) {
                        tDot = vec3.dot(tAxis, currentPosition);
                        tDot2 = vec3.dot(tAxis, startPosition);
                        localMTX = mat4.clone(startLocalMTX);
                        mat4.scale(localMTX, localMTX, [1 / tMesh.scaleX, 1 / tMesh.scaleY, 1 / tMesh.scaleZ]);
                        mat4.rotateX(localMTX, localMTX, -startRotation[0] * Math.PI / 180);
                        mat4.rotateY(localMTX, localMTX, -startRotation[1] * Math.PI / 180);
                        mat4.rotateZ(localMTX, localMTX, -startRotation[2] * Math.PI / 180);
                        mat4.rotateZ(localMTX, localMTX, startRotation[2] * Math.PI / 180);
                        mat4.rotateY(localMTX, localMTX, startRotation[1] * Math.PI / 180);
                        mat4.rotateX(localMTX, localMTX, (startRotation[0] * Math.PI / 180 + tDot - tDot2));
                        RedGLUtil.quaternionToRotationMat4(mat4.getRotation(quat.create(), localMTX), localMTX);
                        resultRotation = RedGLUtil.mat4ToEuler(localMTX, []);
                        console.log(resultRotation);
                        tMesh.rotationX = -resultRotation[0] * 180 / Math.PI;
                        tMesh.rotationY = -resultRotation[1] * 180 / Math.PI;
                        tMesh.rotationZ = -resultRotation[2] * 180 / Math.PI;
                    } else if (tDirection === 5) {
                        tDot = vec3.dot(tAxis, currentPosition);
                        tDot2 = vec3.dot(tAxis, startPosition);
                        localMTX = mat4.clone(startLocalMTX);
                        mat4.scale(localMTX, localMTX, [1 / tMesh.scaleX, 1 / tMesh.scaleY, 1 / tMesh.scaleZ]);
                        mat4.rotateY(localMTX, localMTX, -startRotation[1] * Math.PI / 180);
                        mat4.rotateZ(localMTX, localMTX, -startRotation[2] * Math.PI / 180);
                        mat4.rotateZ(localMTX, localMTX, startRotation[2] * Math.PI / 180);
                        mat4.rotateY(localMTX, localMTX, startRotation[1] * Math.PI / 180 + tDot - tDot2);
                        RedGLUtil.quaternionToRotationMat4(mat4.getRotation(quat.create(), localMTX), localMTX);
                        resultRotation = RedGLUtil.mat4ToEuler(localMTX, []);
                        tMesh.rotationX = -resultRotation[0] * 180 / Math.PI;
                        tMesh.rotationY = -resultRotation[1] * 180 / Math.PI;
                        tMesh.rotationZ = -resultRotation[2] * 180 / Math.PI;
                    } else if (tDirection === 6) {
                        tDot = vec3.dot(tAxis, currentPosition) * 180 / Math.PI;
                        tDot2 = vec3.dot(tAxis, startPosition) * 180 / Math.PI;
                        console.log(tDot);
                        tMesh.rotationZ += tDot - tDot2;
                        startPosition = JSON.parse(JSON.stringify(currentPosition))
                    }
                }

                calBoundBox(tTransformController, tMesh)
            };
            // 이벤트 작성
            [
                tTransformController['arrowX'], tTransformController['arrowY'], tTransformController['arrowZ'], tTransformController['move'],
                tTransformController['rotationXLine'], tTransformController['rotationYLine'], tTransformController['rotationZLine'],
                tTransformController['scalePointX'], tTransformController['scalePointY'], tTransformController['scalePointZ']

            ].forEach(function (v, index) {
                tScene.mouseManager.remove(v, 'down')
                tScene.mouseManager.add(v, 'down', function (e) {
                    tDirection = index;
                    startControllerPosition = [tTransformController.x, tTransformController.y, tTransformController.z];
                    startControllerScale = [tMesh.scaleX, tMesh.scaleY, tMesh.scaleZ];
                    startRotation = [tMesh.rotationX, tMesh.rotationY, tMesh.rotationZ];
                    startLocalMTX = mat4.clone(tMesh.localMatrix);
                    startPosition = RedGLUtil.screenToWorld(
                        [
                            e.nativeEvent.layerX, e.nativeEvent.layerY,
                            tView['_viewRect'][2], tView['_viewRect'][3]
                        ],
                        tController
                    );
                    startMouseX = e.nativeEvent.layerX;
                    startMouseY = e.nativeEvent.layerY;

                    if (tController.camera) tController.needUpdate = false;
                    document.body.addEventListener(
                        'mousemove', hd_move
                    );
                    window.addEventListener('click', function () {
                        if (tController.camera) tController.needUpdate = true;
                        document.body.removeEventListener(
                            'mousemove', hd_move
                        )
                    })
                });
            });
            calBoundBox(tTransformController, tMesh)
        }
    })();
    Object.freeze(RedTransformController);
})();