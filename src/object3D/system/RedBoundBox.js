/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var RedBoundBox;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedBoundBox`,
		 description : `
			 RedBoundBox Instance 생성기
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 demo : '../example/object3D/RedBoundBox.html',
		 extends : [
		    'RedBaseContainer',
		    'RedBaseObject3D'
		 ],
		 example : `
			 var tScene;
			 var tMesh;
			 tScene = RedScene();
			 tMesh = RedBoundBox( RedGL Instance);
			 tScene.addChild(tMesh);
		 `,
		 return : 'RedBoundBox Instance'
	 }
     :DOC*/
    RedBoundBox = function (redGL) {
        if (!(this instanceof RedBoundBox)) return new RedBoundBox(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedBoundBox : RedGL Instance만 허용.', redGL);
        RedBaseObject3D['build'].call(this, redGL.gl);
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`geometry`,
			 description : `geometry`,
			 return : 'RedGeometry'
		 }
         :DOC*/
        this['geometry'] = RedBox(redGL);
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`material`,
			 description : `material`,
			 return : 'RedBaseMaterial 확장 Instance'
		 }
         :DOC*/
        this['material'] = RedColorMaterial(redGL,'#00ff00');
        this.drawMode = redGL.gl.LINE_LOOP
        this['_UUID'] = RedGL.makeUUID();
    };
    RedBoundBox.prototype = new RedBaseContainer();
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
    RedDefinePropertyInfo.definePrototype('RedBoundBox', 'perspectiveScale', 'boolean');
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
    RedDefinePropertyInfo.definePrototype('RedBoundBox', 'sprite3DYn', 'boolean');
    Object.freeze(RedBoundBox);
})();