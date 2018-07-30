"use strict";
var RedSprite3D;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedSprite3D`,
		 description : `
			 RedSprite3D Instance 생성기
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 material : [
				 {type:'RedBaseMaterial 확장 Instance'}
			 ]
		 },
		 example : `
			 var tScene;
			 var tSprite3D;
			 tScene = RedScene();
			 tSprite3D = RedSprite3D(RedGL Instance, RedColorMaterial(RedGL Instance))
			 tScene.addChild(tSprite3D)
		 `,
		 return : 'RedSprite3D Instance'
	 }
	 :DOC*/
	RedSprite3D = function (redGL, material) {
		if ( !(this instanceof RedSprite3D) ) return new RedSprite3D(redGL, material);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedSprite3D : RedGL Instance만 허용됩니다.', redGL);
		RedBaseObject3D['build'].call(this, redGL.gl);
		this['geometry'] = RedPlane(redGL, 1, 1, 0);
		/**DOC:
		 {
			 title :`material`,
			 description : `material`,
			 return : 'RedBaseMaterial 확장 Instance'
		 }
		 :DOC*/
		this['material'] = material;
		/**DOC:
		 {
			 title :`perspectiveScale`,
			 description : `
			 퍼스펙티브에 스케일이 반응할것인가 여부
			 기본값 true
			 `,
			 return : 'Boolean'
		 }
		 :DOC*/
		this['perspectiveScale'] = true;
		this['sprite3DYn'] = true;
		this['useCullFace'] = false;
		this['_UUID'] = RedGL.makeUUID();
	};
	RedSprite3D.prototype = new RedBaseContainer();
	RedDefinePropertyInfo.definePrototype('RedSprite3D', 'perspectiveScale', 'boolean', true);
	RedDefinePropertyInfo.definePrototype('RedSprite3D', 'sprite3DYn', 'boolean', true);
	RedDefinePropertyInfo.definePrototype_GEOMETRY(RedSprite3D);
	RedDefinePropertyInfo.definePrototype_MATERIAL(RedSprite3D);
	Object.freeze(RedSprite3D);
})();