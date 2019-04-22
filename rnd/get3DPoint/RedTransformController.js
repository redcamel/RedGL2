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
        var tArrowMesh;
        var tAxis;
        var tBox, tArrow;
        var tMatX, tMatY, tMatZ;
        RedBaseObject3D['build'].call(this, redGL.gl);
        tBox = RedBox(redGL);
        tArrow = RedCylinder(redGL, 0, 0.5);
        tMatX = RedColorMaterial(redGL, '#ff0000');
        tMatY = RedColorMaterial(redGL, '#00ff00');
        tMatZ = RedColorMaterial(redGL, '#0000ff');
        ////////////////////////////////////////////
        // xAxis
        tArrowMesh = RedMesh(redGL, tArrow, tMatX);
        tAxis = RedMesh(redGL, tBox, tMatX);
        tAxis.scaleX = tAxis.scaleY = tAxis.scaleZ = 0.1;
        tAxis.scaleX = 5;
        tArrowMesh.x = 5;
        tArrowMesh.rotationZ = 90;
        tAxis.x = 2.5;
        this['arrowX'] = tArrowMesh
        this['children'].push(tAxis);
        this['children'].push(tArrowMesh);
        ////////////////////////////////////////////
        // yAxis
        tArrowMesh = RedMesh(redGL, tArrow, tMatY);
        tAxis = RedMesh(redGL, tBox, tMatY);
        tAxis.scaleX = tAxis.scaleY = tAxis.scaleZ = 0.1;
        tAxis.scaleY = 5;
        tArrowMesh.y = 5;
        tAxis.y = 2.5;
        this['arrowY'] = tArrowMesh
        this['children'].push(tAxis);
        this['children'].push(tArrowMesh);
        ////////////////////////////////////////////
        // zAxis
        tArrowMesh = RedMesh(redGL, tArrow, tMatZ);
        tAxis = RedMesh(redGL, tBox, tMatZ);
        tAxis.scaleX = tAxis.scaleY = tAxis.scaleZ = 0.1;
        tAxis.scaleZ = 5;
        tArrowMesh.z = 5;
        tArrowMesh.rotationX = -90;
        tAxis.z = 2.5;
        this['arrowZ'] = tArrowMesh
        this['children'].push(tAxis);
        this['children'].push(tArrowMesh);
        ////////////////////////////////////////////
        this['children'].push(RedMesh(redGL, RedSphere(redGL, 0.25, 16, 16, 16), RedColorMaterial(redGL, '#ff00ff')));

        this['_UUID'] = RedGL.makeUUID();
    };
    RedTransformController.prototype = new RedBaseContainer();

    RedTransformController.prototype.init = function (tView, tMesh) {
        var tTransformController = this
        var tScene = tView['scene'];
        var tController = tView['camera'];
        var tDirection = 0
        var gap = []
        var startPosition2 = []
        var hd_move = function (e) {
            var t0 = RedGLUtil.screenToWorld(
                [
                    e.layerX, e.layerY,
                    tView['_viewRect'][2], tView['_viewRect'][3]
                ],
                tController
            )
            if (tDirection === 0) tTransformController.x = tMesh.x = startPosition2[0] + (t0[0] - gap[0])
            if (tDirection === 1) tTransformController.y = tMesh.y = startPosition2[1] + (t0[1] - gap[1])
            if (tDirection === 2) tTransformController.z = tMesh.z = startPosition2[2] + (t0[2] - gap[2])
        }
        tScene.mouseManager.add(tTransformController['arrowX'], 'down', function (e) {

            tScene.addChild(tTransformController)
            tDirection = 0
            tTransformController.x = tMesh.x
            tTransformController.y = tMesh.y
            tTransformController.z = tMesh.z
            console.log(e)

            gap = RedGLUtil.screenToWorld(
                [
                    e.nativeEvent.layerX, e.nativeEvent.layerY,
                    tView['_viewRect'][2], tView['_viewRect'][3]
                ],
                tController
            )
            startPosition2 = [tTransformController.x, tTransformController.y, tTransformController.z]

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
        tScene.mouseManager.add(tTransformController['arrowY'], 'down', function (e) {
            tScene.addChild(tTransformController)
            tDirection = 1
            tTransformController.x = tMesh.x
            tTransformController.y = tMesh.y
            tTransformController.z = tMesh.z
            console.log(e)

            gap = RedGLUtil.screenToWorld(
                [
                    e.nativeEvent.layerX, e.nativeEvent.layerY,
                    tView['_viewRect'][2], tView['_viewRect'][3]
                ],
                tController
            )
            startPosition2 = [tTransformController.x, tTransformController.y, tTransformController.z]
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
        tScene.mouseManager.add(tTransformController['arrowZ'], 'down', function (e) {
            tScene.addChild(tTransformController)
            tDirection = 2
            tTransformController.x = tMesh.x
            tTransformController.y = tMesh.y
            tTransformController.z = tMesh.z
            console.log(e)

            gap = RedGLUtil.screenToWorld(
                [
                    e.nativeEvent.layerX, e.nativeEvent.layerY,
                    tView['_viewRect'][2], tView['_viewRect'][3]
                ],
                tController
            )
            startPosition2 = [tTransformController.x, tTransformController.y, tTransformController.z]
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
        })
    }
    Object.freeze(RedTransformController);
})();