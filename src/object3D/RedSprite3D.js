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
                geometry : [
                    {type:'RedGeometry'},
                    `geometry`
                ],
                material : [
                    {type:'RedBaseMaterial 확장 Instance'},
                    `material`
                ]
            },
            return : 'RedProgram Instance'
        }
    :DOC*/
    RedSprite3D = function (redGL, geometry, material) {
        if (!(this instanceof RedSprite3D)) return new RedSprite3D(redGL, geometry, material);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedSprite3D : RedGL Instance만 허용됩니다.')
        if (!(geometry instanceof RedGeometry)) RedGLUtil.throwFunc('RedSprite3D : RedGeometry Instance만 허용됩니다.')
        if (!(material instanceof RedBaseMaterial)) RedGLUtil.throwFunc('RedSprite3D : RedBaseMaterial 확장 Instance만 허용됩니다.')
        var tGL;
        tGL = redGL.gl;
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
        /**DOC:
		{
            title :`drawMode`,
            description : `drawMode`,
            return : 'gl 상수'
		}
	    :DOC*/
        this['drawMode'] = tGL.TRIANGLES
        /**DOC:
		{
            title :`x`,
            description : `x`,
            return : 'Number'
		}
        :DOC*/
        /**DOC:
		{
            title :`y`,
            description : `y`,
            return : 'Number'
		}
        :DOC*/
        /**DOC:
		{
            title :`z`,
            description : `z`,
            return : 'Number'
		}
	    :DOC*/
        this['x'] = this['y'] = this['z'] = 0;
        /**DOC:
		{
            title :`rotationX`,
            description : `rotationX`,
            return : 'Number'
		}
        :DOC*/
        /**DOC:
		{
            title :`rotationY`,
            description : `rotationY`,
            return : 'Number'
		}
        :DOC*/
        /**DOC:
		{
            title :`rotationZ`,
            description : `rotationZ`,
            return : 'Number'
		}
	    :DOC*/
        this['rotationX'] = this['rotationY'] = this['rotationZ'] = 0;
        /**DOC:
		{
            title :`scaleX`,
            description : `scaleX`,
            return : 'Number'
		}
        :DOC*/
        /**DOC:
		{
            title :`scaleY`,
            description : `scaleY`,
            return : 'Number'
		}
        :DOC*/
        /**DOC:
		{
            title :`scaleZ`,
            description : `scaleZ`,
            return : 'Number'
		}
	    :DOC*/
        this['scaleX'] = this['scaleY'] = this['scaleZ'] = 1;
        this['matrix'] = mat4.create();
        this['normalMatrix'] = mat4.create();
        this['children'] = []
        this['_UUID'] = RedGL['makeUUID']();
        // Object.seal(this)
    }
    RedGLUtil['extendsProto'](RedSprite3D, RedBaseContainer);
    RedGLUtil['extendsProto'](RedSprite3D, RedBaseObject3D);
    Object.freeze(RedSprite3D);
})();