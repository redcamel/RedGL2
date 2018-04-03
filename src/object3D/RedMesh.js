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
        /**DOC:
		{
            title :`drawMode`,
            description : `drawMode`,
            return : 'gl 상수'
		}
	    :DOC*/

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
        
        this['_UUID'] = RedGL['makeUUID']();
        // Object.seal(this)
    }
    RedGLUtil['extendsProto'](RedMesh, RedBaseContainer);
    RedGLUtil['extendsProto'](RedMesh, RedBaseObject3D);
    Object.freeze(RedMesh);
})();