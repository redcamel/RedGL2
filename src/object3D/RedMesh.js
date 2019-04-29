/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

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
		 demo : '../example/object3D/RedMesh.html',
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
        if (!(this instanceof RedMesh)) return new RedMesh(redGL, geometry, material);
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
    /**DOC:
     {
		 code : 'PROPERTY',
		 title :`perspectiveScale`,
		 description : `
		 퍼스펙티브에 스케일이 반응할것인가 여부
		 기본값 true
		 `,
		 return : 'Boolean'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedMesh', 'perspectiveScale', 'boolean');
    /**DOC:
     {
		 code : 'PROPERTY',
		 title :`sprite3DYn`,
		 description : `
		 sprite3D 모드 사용 여부
		 기본값 true
		 `,
		 return : 'Boolean'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedMesh', 'sprite3DYn', 'boolean');
    Object.freeze(RedMesh);
})();