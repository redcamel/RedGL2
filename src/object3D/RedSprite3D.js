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
		 extends : [
		    'RedBaseContainer',
		    'RedBaseObject3D'
		 ],
		 demo : '../example/object3D/RedSprite3D.html',
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
        if (!(this instanceof RedSprite3D)) return new RedSprite3D(redGL, material);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedSprite3D : RedGL Instance만 허용.', redGL);
        RedBaseObject3D['build'].call(this, redGL.gl);
        this['geometry'] = RedPlane(redGL, 1, 1, 0);
        this['material'] = material;
        this['perspectiveScale'] = true;
        this['sprite3DYn'] = true;
        this['useCullFace'] = false;
        this['_UUID'] = RedGL.makeUUID();
    };
    RedSprite3D.prototype = new RedBaseContainer();
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
    RedDefinePropertyInfo.definePrototype('RedSprite3D', 'perspectiveScale', 'boolean', true);
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
    RedDefinePropertyInfo.definePrototype('RedSprite3D', 'sprite3DYn', 'boolean', true);
    /**DOC:
     {
		 code : 'PROPERTY',
		 title :`material`,
		 description : `material`,
		 return : 'RedBaseMaterial 확장 Instance'
	 }
     :DOC*/
    Object.defineProperty(RedSprite3D.prototype, 'material', {
        get: function () {
            return this['_material'];
        },
        set: function (v) {
            if (
                !(v instanceof RedColorMaterial)
                && !(v instanceof RedBitmapMaterial)
                && !(v instanceof RedSheetMaterial)
                && !(v instanceof RedVideoMaterial)
            ) {
                RedGLUtil.throwFunc('RedSprite3D : RedColorMaterial or RedBitmapMaterial or RedSheetMaterial Instance만 허용.', '입력값 : ' + v)
            }
            this['_material'] = v;
        }
    });
    Object.freeze(RedSprite3D);
})();