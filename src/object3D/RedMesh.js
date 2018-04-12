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
                    {type:'RedGeometry'},
                    `geometry`
                ],
                material : [
                    {type:'RedBaseMaterial 확장 Instance'},
                    `material`
                ]
            },
            example : `
                var tScene;
                var tMesh;
                tScene = RedScene();
                tMesh = RedMesh(RedGL Instance, RedBox(RedGL Instance), RedColorMaterial(RedGL Instance, '#ff0000'));
                tScene.addChild(tMesh);
            `,
            return : 'RedMesh Instance'
        }
    :DOC*/
    RedMesh = function (redGL, geometry, material) {
        if (!(this instanceof RedMesh)) return new RedMesh(redGL, geometry, material);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedMesh : RedGL Instance만 허용됩니다.')
        if (!(geometry instanceof RedGeometry)) RedGLUtil.throwFunc('RedMesh : RedGeometry Instance만 허용됩니다.')
        if (!(material instanceof RedBaseMaterial)) RedGLUtil.throwFunc('RedMesh : RedBaseMaterial 확장 Instance만 허용됩니다.')
        var tGL;
        tGL = redGL.gl;
        RedBaseObject3D['build'].call(this, tGL)
        /**DOC:
		{
            title :`geometry`,
            description : `geometry`,
			return : 'RedGeometry'
		}
	    :DOC*/
        this['geometry'] = geometry;
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
    RedGLUtil['copyProto'](RedMesh, RedBaseContainer);
    /**DOC:
        {
            extendDoc : 'RedBaseObject3D'
        }
    :DOC*/
    RedGLUtil['copyProto'](RedMesh, RedBaseObject3D);
    Object.freeze(RedMesh);
})();