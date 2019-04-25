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
    RedTransformController = function (redGL) {
        if (!(this instanceof RedTransformController)) return new RedTransformController(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedTransformController : RedGL Instance만 허용.', redGL);
        var tArrowMesh, tPlaneMesh, tScaleMesh;
        var tAxis;
        var tBox, tBox2, tArrow;
        var tMatX, tMatY, tMatZ;
        RedBaseObject3D['build'].call(this, redGL.gl);
        tBox = RedBox(redGL);
        tBox2 = RedBox(redGL, 0.25, 0.25, 0.25);
        tArrow = RedCylinder(redGL, 0, 0.5);
        tMatX = RedColorMaterial(redGL, '#ff0000');
        tMatY = RedColorMaterial(redGL, '#00ff00');
        tMatZ = RedColorMaterial(redGL, '#0000ff');
        ////////////////////////////////////////////
        this['scaleGroup'] = RedMesh(redGL)
        this['children'].push(this['scaleGroup']);
        // xAxis
        tArrowMesh = RedMesh(redGL, tArrow, tMatX);
        tScaleMesh = RedMesh(redGL, tBox2, tMatX);
        tScaleMesh.x = 4;
        tAxis = RedMesh(redGL, tBox, tMatX);
        tScaleMesh['depthTestFunc'] = redGL.gl.ALWAYS
        tAxis['depthTestFunc'] = redGL.gl.ALWAYS
        tArrowMesh['depthTestFunc'] = redGL.gl.ALWAYS
        tAxis.scaleX = tAxis.scaleY = tAxis.scaleZ = 0.01;
        tAxis.scaleX = 5;
        tArrowMesh.x = 5;
        tArrowMesh.rotationZ = 90;
        tAxis.x = 2.5;
        this['arrowX'] = tArrowMesh
        this['scalePointX'] = tScaleMesh
        this['children'].push(tAxis);
        this['children'].push(tArrowMesh);
        this['scaleGroup']['children'].push(tScaleMesh);
        ////////////////////////////////////////////
        // yAxis
        tArrowMesh = RedMesh(redGL, tArrow, tMatY);
        tScaleMesh = RedMesh(redGL, tBox2, tMatX);
        tScaleMesh.y = 4;
        tAxis = RedMesh(redGL, tBox, tMatY);

        tScaleMesh['depthTestFunc'] = redGL.gl.ALWAYS
        tAxis['depthTestFunc'] = redGL.gl.ALWAYS
        tArrowMesh['depthTestFunc'] = redGL.gl.ALWAYS
        tAxis.scaleX = tAxis.scaleY = tAxis.scaleZ = 0.01;
        tAxis.scaleY = 5;
        tArrowMesh.y = 5;
        tAxis.y = 2.5;
        this['arrowY'] = tArrowMesh
        this['scalePointY'] = tScaleMesh
        this['children'].push(tAxis);
        this['children'].push(tArrowMesh);
        this['scaleGroup']['children'].push(tScaleMesh);
        ////////////////////////////////////////////
        // zAxis
        tArrowMesh = RedMesh(redGL, tArrow, tMatZ);
        tScaleMesh = RedMesh(redGL, tBox2, tMatX);
        tScaleMesh.z = 4;
        tAxis = RedMesh(redGL, tBox, tMatZ);

        tScaleMesh['depthTestFunc'] = redGL.gl.ALWAYS
        tAxis['depthTestFunc'] = redGL.gl.ALWAYS
        tArrowMesh['depthTestFunc'] = redGL.gl.ALWAYS
        tAxis.scaleX = tAxis.scaleY = tAxis.scaleZ = 0.01;
        tAxis.scaleZ = 5;
        tArrowMesh.z = 5;
        tArrowMesh.rotationX = -90;
        tAxis.z = 2.5;
        this['arrowZ'] = tArrowMesh
        this['scalePointZ'] = tScaleMesh
        this['children'].push(tAxis);
        this['children'].push(tArrowMesh);
        this['scaleGroup']['children'].push(tScaleMesh);
        ////////////////////////////////////////////

        tPlaneMesh = RedMesh(redGL, RedPlane(redGL), RedColorMaterial(redGL, '#ef8d39', 0.5));
        tPlaneMesh.x = 0.55;
        tPlaneMesh.y = 0.55;
        tPlaneMesh['useCullFace'] = false;
        tPlaneMesh['depthTestFunc'] = redGL.gl.ALWAYS
        this['moveXY'] = tPlaneMesh
        // this['children'].push(tPlaneMesh)
        tPlaneMesh = RedMesh(redGL, RedPlane(redGL), RedColorMaterial(redGL, '#ef8d39', 0.5));
        tPlaneMesh.rotationY = 90
        tPlaneMesh.z = 0.55;
        tPlaneMesh.y = 0.55;
        tPlaneMesh['useCullFace'] = false;
        tPlaneMesh['depthTestFunc'] = redGL.gl.ALWAYS
        // this['children'].push(tPlaneMesh)
        this['moveYZ'] = tPlaneMesh
        tPlaneMesh = RedMesh(redGL, RedPlane(redGL), RedColorMaterial(redGL, '#ef8d39', 0.5));
        tPlaneMesh.rotationX = 90
        tPlaneMesh.x = 0.55;
        tPlaneMesh.z = 0.55;
        tPlaneMesh['useCullFace'] = false;
        tPlaneMesh['depthTestFunc'] = redGL.gl.ALWAYS
        // this['children'].push(tPlaneMesh)
        this['moveXZ'] = tPlaneMesh
        //
        tPlaneMesh = RedMesh(redGL, RedSphere(redGL, 0.1, 32, 32, 32), RedColorMaterial(redGL, '#5b52aa', 1));
        tPlaneMesh['depthTestFunc'] = redGL.gl.ALWAYS
        this['move'] = tPlaneMesh
        this['children'].push(tPlaneMesh)
        ////////////////////////////////////////////

        var rotationXLine = RedLine(redGL, RedColorMaterial(redGL, '#ff0000', 0));
        var rotationYLine = RedLine(redGL, RedColorMaterial(redGL, '#00ff00', 0));
        var rotationZLine = RedLine(redGL, RedColorMaterial(redGL, '#0000ff', 0));
        var i = 36;
        var PER = Math.PI * 2 / i
        i = 36
        while (i--) rotationXLine.addPoint(0, Math.sin(PER * i), Math.cos(PER * i));
        rotationXLine.addPoint(0, Math.sin(PER * i), Math.cos(PER * i));
        i = 36
        while (i--) rotationYLine.addPoint(Math.sin(PER * i), 0, Math.cos(PER * i));
        rotationYLine.addPoint(Math.sin(PER * i), 0, Math.cos(PER * i));
        i = 36
        while (i--) rotationZLine.addPoint(Math.sin(PER * i), Math.cos(PER * i), 0);
        rotationZLine.addPoint(Math.sin(PER * i), Math.cos(PER * i), 0);
        var tSphereMesh
        tSphereMesh = RedMesh(redGL, RedBox(redGL, 2, 2, 2), RedColorMaterial(redGL, '#ff0000', 0.5));
        tSphereMesh.scaleZ = 0
        tSphereMesh.rotationX = 90
        tSphereMesh.rotationY = 90
        // tSphereMesh.rotation = 90
        rotationXLine.addChild(tSphereMesh)
        tSphereMesh = RedMesh(redGL, RedBox(redGL, 2, 2, 2), RedColorMaterial(redGL, '#00ff00', 0.5));
        tSphereMesh.scaleZ = 0
        // tSphereMesh.rotationZ = 90

        tSphereMesh.rotationZ = 90
        tSphereMesh.rotationX = 90
        rotationYLine.addChild(tSphereMesh)
        tSphereMesh = RedMesh(redGL, RedBox(redGL, 2, 2, 2), RedColorMaterial(redGL, '#0000ff', 0.5));
        tSphereMesh.scaleZ = 0
        rotationZLine.addChild(tSphereMesh)
        this['rotationXLine'] = rotationXLine
        this['rotationYLine'] = rotationYLine
        this['rotationZLine'] = rotationZLine


        this['rotationGroup'] = RedMesh(redGL)

        this['rotationGroup']['children'].push(rotationXLine)
        this['rotationGroup']['children'].push(rotationYLine)
        this['rotationGroup']['children'].push(rotationZLine)
        this['children'].push(this['rotationGroup'])
        ///////////////////////////////////////////

        this['_UUID'] = RedGL.makeUUID();
    };
    RedTransformController.prototype = new RedBaseContainer();

    RedTransformController.prototype.init = function (tView, tMesh) {
        var tTransformController = this
        var tScene = tView['scene'];
        var tController = tView['camera'];
        var tDirection = 0
        var startMeshPosition
        var startPosition = []
        var startControllerPosition = []
        var startControllerScale = []

        var startMouseX = 0
        var startMouseY = 0
        var hd_move = function (e) {


            var currentPosition = RedGLUtil.screenToWorld(
                [
                    e.layerX, e.layerY,
                    tView['_viewRect'][2], tView['_viewRect'][3]
                ],
                tController
            );

            if (tDirection === 0) tTransformController.x = tMesh.x = startControllerPosition[0] + (currentPosition[0] - startPosition[0]);
            if (tDirection === 1) tTransformController.y = tMesh.y = startControllerPosition[1] + (currentPosition[1] - startPosition[1]);
            if (tDirection === 2) tTransformController.z = tMesh.z = startControllerPosition[2] + (currentPosition[2] - startPosition[2]);
            if (tDirection === 3) {
                tTransformController.x = tMesh.x = startControllerPosition[0] + (currentPosition[0] - startPosition[0]);
                tTransformController.y = tMesh.y = startControllerPosition[1] + (currentPosition[1] - startPosition[1]);
                tTransformController.z = tMesh.z = startControllerPosition[2] + (currentPosition[2] - startPosition[2]);
            }

            if (tDirection === 7) tMesh.scaleX = startControllerScale[0] + (currentPosition[0] - startPosition[0]);
            if (tDirection === 8) tMesh.scaleY = startControllerScale[1] + (currentPosition[1] - startPosition[1]);
            if (tDirection === 9) tMesh.scaleZ = startControllerScale[2] + (currentPosition[2] - startPosition[2]);

            if (tDirection === 4 || tDirection === 5 || tDirection === 6) {

                tTransformController.scaleGroup.rotationX = tMesh.rotationX
                tTransformController.scaleGroup.rotationY = tMesh.rotationY
                tTransformController.scaleGroup.rotationZ = tMesh.rotationZ
                tTransformController.rotationGroup.rotationX = tMesh.rotationX
                tTransformController.rotationGroup.rotationY = tMesh.rotationY
                tTransformController.rotationGroup.rotationZ = tMesh.rotationZ
            }

            if (tDirection === 4) {
                // var t0;
                // var tDot, tDot2
                // if (startMouseX < tView['_viewRect'][2] / 2) t0 = [1, 0, 0]
                // else t0 = [-1, 0, 0]
                //
                // tDot = vec3.dot(t0, currentPosition)
                // tDot2 = vec3.dot(t0, startPosition)
                //
                // console.log(tDot)
                // tMesh.rotationX += tDot - tDot2
                // startPosition = JSON.parse(JSON.stringify(currentPosition))
            } else if (tDirection === 5) {
                // var t0;
                // var tDot, tDot2
                // if (startMouseX < tView['_viewRect'][2] / 2) t0 = [0, -1, 0]
                // else t0 = [0, 1, 0]
                // tDot = vec3.dot(t0, currentPosition) * 180 / Math.PI
                // tDot2 = vec3.dot(t0, startPosition) * 180 / Math.PI
                // console.log(tDot)
                // tMesh.rotationY += tDot - tDot2
                // startPosition = JSON.parse(JSON.stringify(currentPosition))
            } else if (tDirection === 6) {
                var t0;
                var tDot, tDot2
                if (startMouseX < tView['_viewRect'][2] / 2) t0 = [0, 0, -1]
                else t0 = [0, 0, 1]
                tDot = vec3.dot(t0, currentPosition) * 180 / Math.PI
                tDot2 = vec3.dot(t0, startPosition) * 180 / Math.PI
                console.log(tDot)
                tMesh.rotationZ += tDot - tDot2
                startPosition = JSON.parse(JSON.stringify(currentPosition))
            }
        };


        [
            tTransformController['arrowX'], tTransformController['arrowY'], tTransformController['arrowZ'], tTransformController['move'],
            tTransformController['rotationXLine'].getChildAt(0), tTransformController['rotationYLine'].getChildAt(0), tTransformController['rotationZLine'].getChildAt(0),
            tTransformController['scalePointX'], tTransformController['scalePointY'], tTransformController['scalePointZ']

        ].forEach(function (v, index) {
            tScene.mouseManager.add(v, 'down', function (e) {

                tDirection = index
                tTransformController.x = tMesh.x
                tTransformController.y = tMesh.y
                tTransformController.z = tMesh.z


                console.log(e)
                startMeshPosition = tMesh.localToWorld(0, 0, 0)

                startControllerScale = [tMesh.scaleX, tMesh.scaleY, tMesh.scaleZ]

                startPosition = RedGLUtil.screenToWorld(
                    [
                        e.nativeEvent.layerX, e.nativeEvent.layerY,
                        tView['_viewRect'][2], tView['_viewRect'][3]
                    ],
                    tController
                );
                console.log('startMeshPosition', startMeshPosition)
                console.log('startPosition', startPosition)
                startMouseX = e.nativeEvent.layerX
                startMouseY = e.nativeEvent.layerY
                startControllerPosition = [tTransformController.x, tTransformController.y, tTransformController.z]

                if (tController.camera) tController.needUpdate = false
                document.body.addEventListener(
                    'mousemove', hd_move
                )
                window.addEventListener('click', function () {
                    if (tController.camera) tController.needUpdate = true
                    document.body.removeEventListener(
                        'mousemove', hd_move
                    )
                })
            });
        })

    }
    Object.freeze(RedTransformController);
})();