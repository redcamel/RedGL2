"use strict";
var RedAxis;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedAxis`,
		 description : `
			 RedAxis Instance 생성기
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
		 demo : '../example/object3D/RedAxis.html',
		 example : `
			 var tScene;
			 tScene = RedScene();
			 tScene['axis'] = RedAxis(redGL Instance)
		 `,
		 return : 'RedAxis Instance'
	 }
     :DOC*/
    RedAxis = function (redGL) {
        if (!(this instanceof RedAxis)) return new RedAxis(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedAxis : RedGL Instance만 허용.', redGL);
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
        tArrowMesh.rotationZ = 90
        tAxis.x = 2.5;
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
        this['children'].push(tAxis);
        this['children'].push(tArrowMesh);
        ////////////////////////////////////////////
        // zAxis
        tArrowMesh = RedMesh(redGL, tArrow, tMatZ);
        tAxis = RedMesh(redGL, tBox, tMatZ);
        tAxis.scaleX = tAxis.scaleY = tAxis.scaleZ = 0.1;
        tAxis.scaleZ = 5;
        tArrowMesh.z = 5;
        tArrowMesh.rotationX = -90
        tAxis.z = 2.5;
        this['children'].push(tAxis);
        this['children'].push(tArrowMesh);
        ////////////////////////////////////////////
        this['children'].push(RedMesh(redGL, RedSphere(redGL, 0.25, 16, 16, 16), RedColorMaterial(redGL, '#ff00ff')));
        this['_UUID'] = RedGL.makeUUID();
    };
    RedAxis.prototype = new RedBaseContainer();
    Object.freeze(RedAxis);
})();