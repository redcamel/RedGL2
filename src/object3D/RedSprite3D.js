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
        if (!(this instanceof RedSprite3D)) return new RedSprite3D(redGL, material);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedSprite3D : RedGL Instance만 허용됩니다.')
        if (!(material instanceof RedBaseMaterial)) RedGLUtil.throwFunc('RedSprite3D : RedBaseMaterial 확장 Instance만 허용됩니다.')
        var tGL;
        tGL = redGL.gl;
        RedBaseObject3D['build'].call(this, tGL)
        this['geometry'] = RedBox(redGL, 1, 1, 0);
        /**DOC:
		{
            title :`material`,
            description : `material`,
            return : 'RedBaseMaterial 확장 Instance'
		}
	    :DOC*/
        this['material'] = material;
        this['_UUID'] = RedGL['makeUUID']();
        // Object.seal(this)
    }
    /**DOC:
        {
            extendDoc : 'RedBaseContainer'
        }
    :DOC*/
    RedGLUtil['extendsProto'](RedSprite3D, RedBaseContainer);
    /**DOC:
        {
            extendDoc : 'RedBaseObject3D'
        }
    :DOC*/
    RedGLUtil['extendsProto'](RedSprite3D, RedBaseObject3D);
    Object.freeze(RedSprite3D);
})();