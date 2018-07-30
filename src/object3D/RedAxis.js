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
		 example : `
			 var tScene;
			 tScene = RedScene();
			 tScene['axis'] = RedAxis(redGL Instance)
		 `,
		 return : 'RedAxis Instance'
	 }
	 :DOC*/
	RedAxis = function (redGL) {
		if ( !(this instanceof RedAxis) ) return new RedAxis(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedAxis : RedGL Instance만 허용됩니다.', redGL);
		var tRoot;
		var tAxis;
		var tBox;
		var tMatX, tMatY, tMatZ;
		RedBaseObject3D['build'].call(this, redGL.gl);
		tBox = RedBox(redGL);
		tMatX = RedColorMaterial(redGL, '#ff0000');
		tMatY = RedColorMaterial(redGL, '#00ff00');
		tMatZ = RedColorMaterial(redGL, '#0000ff');
		////////////////////////////////////////////
		// xAxis
		tRoot = RedMesh(redGL, tBox, tMatX);
		tAxis = RedMesh(redGL, tBox, tMatX);
		tAxis.scaleX = tAxis.scaleY = tAxis.scaleZ = 0.5;
		tAxis.scaleX = 10;
		tRoot.x = 5;
		tAxis.x = -5;
		tRoot['children'].push(tAxis);
		this['children'].push(tRoot);
		////////////////////////////////////////////
		// yAxis
		tRoot = RedMesh(redGL, tBox, tMatY);
		tAxis = RedMesh(redGL, tBox, tMatY);
		tAxis.scaleX = tAxis.scaleY = tAxis.scaleZ = 0.5;
		tAxis.scaleY = 10;
		tRoot.y = 5;
		tAxis.y = -5;
		tRoot['children'].push(tAxis);
		this['children'].push(tRoot);
		////////////////////////////////////////////
		// zAxis
		tRoot = RedMesh(redGL, tBox, tMatZ);
		tAxis = RedMesh(redGL, tBox, tMatZ);
		tAxis.scaleX = tAxis.scaleY = tAxis.scaleZ = 0.5;
		tAxis.scaleZ = 10;
		tRoot.z = 5;
		tAxis.z = -5;
		tRoot['children'].push(tAxis);
		this['children'].push(tRoot);
		////////////////////////////////////////////
		this['_UUID'] = RedGL.makeUUID();
	};
	RedAxis.prototype = new RedBaseContainer();
	RedDefinePropertyInfo.definePrototype_GEOMETRY(RedAxis);
	RedDefinePropertyInfo.definePrototype_MATERIAL(RedAxis);
	Object.freeze(RedAxis);
})();