"use strict";
var RedMesh;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedMesh`,
		 description : `
			 RedMesh Instance 생성기
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 geometry : [
				 {type:'RedGeometry'}
			 ],
			 material : [
				 {type:'RedBaseMaterial 확장 Instance'}
			 ]
		 },
		 extends : [
		    'RedBaseContainer',
		    'RedBaseObject3D'
		 ],
		 example : `
			 var tScene;
			 var tMesh;
			 tScene = RedScene();
			 tMesh = RedMesh( RedGL Instance, RedBox(RedGL Instance), RedColorMaterial(RedGL Instance, '#ff0000' ));
			 tScene.addChild(tMesh);
		 `,
		 return : 'RedMesh Instance'
	 }
	 :DOC*/
	RedMesh = function (redGL, geometry, material) {
		if ( !(this instanceof RedMesh) ) return new RedMesh(redGL, geometry, material);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedMesh : RedGL Instance만 허용.', redGL);
		RedBaseObject3D['build'].call(this, redGL.gl);
		/**DOC:
		 {
		     code : 'PROPERTY',
			 title :`geometry`,
			 description : `geometry`,
			 return : 'RedGeometry'
		 }
		 :DOC*/
		this['geometry'] = geometry;
		/**DOC:
		 {
		     code : 'PROPERTY',
			 title :`material`,
			 description : `material`,
			 return : 'RedBaseMaterial 확장 Instance'
		 }
		 :DOC*/
		this['material'] = material;
		this['_UUID'] = RedGL.makeUUID();
	};
	RedMesh.prototype = new RedBaseContainer();
	Object.freeze(RedMesh);
})();