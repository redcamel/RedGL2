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
                    {type:'*어떻게 처리를해야할까..'},
                    `material`
                ]
            },
            return : 'RedProgram Instance'
        }
    :DOC*/
    RedMesh = function (geometry, material) {
        if (!(this instanceof RedMesh)) return new RedMesh(geometry, material);
        if (!(geometry instanceof RedGeometry)) RedGLUtil.throwFunc('RedMesh : RedGeometry Instance만 허용됩니다.')
        // TODO: 재질을 어떻게 벨리데이션 체크를 하는게 좋을까
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
            description : `material`
		}
	    :DOC*/
        this['material'] = material;
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
        this['_UUID'] = RedGL['makeUUID']();
    }
    RedGLUtil['extendsProto'](RedMesh, RedBaseContainer);
    RedGLUtil['extendsProto'](RedMesh, RedBaseObject3D);
    Object.freeze(RedMesh);
})();