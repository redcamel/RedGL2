/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:42
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
    var calAABB = function (tTransformController, tMesh) {
        var t0 = tMesh.volumeCalculateAABB();
        console.log(t0);
        var tScale = 0;
        if (tScale < t0['volume'][0]) tScale = t0['volume'][0];
        if (tScale < t0['volume'][1]) tScale = t0['volume'][1];
        if (tScale < t0['volume'][2]) tScale = t0['volume'][2];
        if (tTransformController['useScale']) tTransformController.rotationGroup.scaleX = tTransformController.rotationGroup.scaleY = tTransformController.rotationGroup.scaleZ = tScale;
        tTransformController['boundBox'].matrix = t0.worldMatrix
    };
    var calOBB = function (tTransformController, tMesh) {
        var t0 = tMesh.volumeCalculateOBB();
        var tScale = 0;
        if (tScale < tMesh.scaleX) tScale = tMesh.scaleX;
        if (tScale < tMesh.scaleY) tScale = tMesh.scaleY;
        if (tScale < tMesh.scaleZ) tScale = tMesh.scaleZ;
        if (tTransformController['useScale']) tTransformController.rotationGroup.scaleX = tTransformController.rotationGroup.scaleY = tTransformController.rotationGroup.scaleZ = tScale;
        tTransformController['boundBox'].matrix = t0.worldMatrix


    };
    var callBoundBox = function (tTransformController, tMesh) {
        switch (tTransformController['boundBoxMode']) {
            case RedTransformController.AABB:
                calAABB(tTransformController, tMesh);
                break;
            case RedTransformController.OBB:
                calOBB(tTransformController, tMesh);
                break;
        }
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
        this['boundBox'] = RedMesh(redGL, RedBox(redGL), RedColorMaterial(redGL));
        this['boundBox'].drawMode = redGL.gl.LINE_LOOP;
        this['boundBox'].autoUpdateMatrix = false;
        this['children'].push(this['boundBox']);
        this['_boundBoxMode'] = RedTransformController.AABB;
        this['downed'] = false;

        this['useScale'] = true;
        this['usePosition'] = true;
        this['useRotation'] = true;
        ///////////////////////////////////////////
        instanceList.push(this);
        this['_UUID'] = RedGL.makeUUID();
    };
    RedTransformController.AABB = 'AABB';
    RedTransformController.OBB = 'OBB';
    RedTransformController.prototype = new RedBaseContainer();

    Object.defineProperty(RedTransformController.prototype, 'boundBoxMode', {
            get: function () {
                return this['_boundBoxMode']
            },
            set: function (v) {
                if (!(v === RedTransformController.AABB || v === RedTransformController.OBB)) RedGLUtil.throwFunc('RedTransformController : boundBoxMode는 RedTransformController.AABB or RedTransformController.OBB만 허용함');
                this['_boundBoxMode'] = v;
                callBoundBox(this, this['_targetMesh'])
            }
        }
    );
    RedDefinePropertyInfo.definePrototype('RedTransformController', 'useScale', 'boolean', {
        callback: function (v) {
            instanceList.forEach(function (tGroup) {
                tGroup['scaleGroup'].scaleX = tGroup['scaleGroup'].scaleY = tGroup['scaleGroup'].scaleZ = v ? 1 : 0
            })
        }
    });
    RedDefinePropertyInfo.definePrototype('RedTransformController', 'usePosition', 'boolean', {
        callback: function (v) {
            instanceList.forEach(function (tGroup) {
                tGroup['positionGroup'].scaleX = tGroup['positionGroup'].scaleY = tGroup['positionGroup'].scaleZ = v ? 1 : 0
            })
        }
    });
    RedDefinePropertyInfo.definePrototype('RedTransformController', 'useRotation', 'boolean', {
        callback: function (v) {
            instanceList.forEach(function (tGroup) {
                tGroup['rotationGroup'].scaleX = tGroup['rotationGroup'].scaleY = tGroup['rotationGroup'].scaleZ = v ? 1 : 0
            })
        }
    });

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
        var tMatX = RedColorMaterial(redGL, '#ff0000', 0.0);
        var tMatY = RedColorMaterial(redGL, '#00ff00', 0.0);
        var tMatZ = RedColorMaterial(redGL, '#0000ff', 0.0);
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
        // rotationXLine.useDepthMask = false
        // rotationYLine.useDepthMask = false
        // rotationZLine.useDepthMask = false

        rotationXLine = RedLine(redGL, RedColorMaterial(redGL, '#ff0000', 0.75));
        rotationYLine = RedLine(redGL, RedColorMaterial(redGL, '#00ff00', 0.75));
        rotationZLine = RedLine(redGL, RedColorMaterial(redGL, '#0000ff', 0.75));
        var i = 36;
        var PER = Math.PI * 2 / i;
        i = 36;
        while (i--) rotationXLine.addPoint(Math.sin(PER * i), Math.cos(PER * i), 0);
        rotationXLine.addPoint(Math.sin(PER * i), Math.cos(PER * i), 0);
        i = 36;
        while (i--) rotationYLine.addPoint(Math.sin(PER * i), Math.cos(PER * i), 0);
        rotationYLine.addPoint(Math.sin(PER * i), Math.cos(PER * i), 0);
        i = 36;
        while (i--) rotationZLine.addPoint(Math.sin(PER * i), Math.cos(PER * i), 0);
        rotationZLine.addPoint(Math.sin(PER * i), Math.cos(PER * i), 0);
        this['rotationXLine'].addChild(rotationXLine);
        this['rotationYLine'].addChild(rotationYLine);
        this['rotationZLine'].addChild(rotationZLine);


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
            tTransformController['_targetMesh'] = tMesh
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
                var t0 = [
                    startControllerPosition[0] + currentPosition[0] - startPosition[0],
                    startControllerPosition[1] + currentPosition[1] - startPosition[1],
                    startControllerPosition[2] + currentPosition[2] - startPosition[2]
                ];
                // position
                if (tTransformController['usePosition']) {
                    if (tDirection === 3) {
                        tTransformController.x = tMesh.x = t0[0];
                        tTransformController.y = tMesh.y = t0[1];
                        tTransformController.z = tMesh.z = t0[2];
                    } else {
                        if (tDirection === 0) tTransformController.x = tMesh.x = t0[0];
                        else if (tDirection === 1) tTransformController.y = tMesh.y = t0[1];
                        else if (tDirection === 2) tTransformController.z = tMesh.z = t0[2];
                    }
                }
                // scale
                if (tTransformController['useScale']) {
                    if (tDirection === 7) tMesh.scaleX = startControllerScale[0] + (currentPosition[0] - startPosition[0]);
                    if (tDirection === 8) tMesh.scaleY = startControllerScale[1] + (currentPosition[1] - startPosition[1]);
                    if (tDirection === 9) tMesh.scaleZ = startControllerScale[2] + (currentPosition[2] - startPosition[2]);
                }
                // rotation
                if (tTransformController['useRotation']) {
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

                    if (tDirection === 4) {
                        if (startMouseX < tView['_viewRect'][2] / 2) tAxis = tMesh.localToWorld(1, 0, 0);
                        else tAxis = tMesh.localToWorld(-1, 0, 0);
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
                        if (startMouseX < tView['_viewRect'][2] / 2) tAxis = tMesh.localToWorld(0, -1, 0);
                        else tAxis = tMesh.localToWorld(0, 1, 0);
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
                        if (startMouseX < tView['_viewRect'][2] / 2) tAxis = [0, 0, -1];
                        else tAxis = [0, 0, 1];
                        tDot = vec3.dot(tAxis, currentPosition) * 180 / Math.PI;
                        tDot2 = vec3.dot(tAxis, startPosition) * 180 / Math.PI;
                        console.log(tDot);
                        tMesh.rotationZ += tDot - tDot2;
                        startPosition = JSON.parse(JSON.stringify(currentPosition))
                    }
                }
                callBoundBox(tTransformController, tMesh)
            };
            [tTransformController['rotationXLine'], tTransformController['rotationYLine'], tTransformController['rotationZLine']].forEach(function (v) {
                tScene.mouseManager.add(v, 'over', function () {
                    if (!tTransformController['downed']) {
                        tTransformController['rotationXLine'].material.alpha = 0;
                        tTransformController['rotationYLine'].material.alpha = 0;
                        tTransformController['rotationZLine'].material.alpha = 0;
                        this.material.alpha = 0.25;
                    }
                });
                tScene.mouseManager.add(v, 'out', function () {
                    if (!tTransformController['downed']) {
                        tTransformController['rotationXLine'].material.alpha = 0;
                        tTransformController['rotationYLine'].material.alpha = 0;
                        tTransformController['rotationZLine'].material.alpha = 0;
                    }
                })
            });
            // 이벤트 작성
            [
                tTransformController['arrowX'], tTransformController['arrowY'], tTransformController['arrowZ'], tTransformController['move'],
                tTransformController['rotationXLine'], tTransformController['rotationYLine'], tTransformController['rotationZLine'],
                tTransformController['scalePointX'], tTransformController['scalePointY'], tTransformController['scalePointZ']

            ].forEach(function (v, index) {
                tScene.mouseManager.remove(v, 'down');
                tScene.mouseManager.add(v, 'down', function (e) {
                    tTransformController['downed'] = true;
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

                    if (tController.camera) tController.needUpdate = false;
                    document.body.addEventListener(
                        'mousemove', hd_move
                    );
                    window.addEventListener('click', function () {
                        if (tController.camera) tController.needUpdate = true;
                        tTransformController['downed'] = false;
                        tTransformController['rotationXLine'].material.alpha = 0;
                        tTransformController['rotationYLine'].material.alpha = 0;
                        tTransformController['rotationZLine'].material.alpha = 0;
                        document.body.removeEventListener(
                            'mousemove', hd_move
                        )
                    })
                });
            });
            callBoundBox(tTransformController, tMesh)
        }
    })();
    Object.freeze(RedTransformController);
})();