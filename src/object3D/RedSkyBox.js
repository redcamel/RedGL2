"use strict";
var RedSkyBox;
(function () {
    /**DOC:
        {
            constructorYn : true,
            title :`RedSkyBox`,
            description : `
                RedSkyBox Instance 생성기
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
    RedSkyBox = function (redGL, srcList) {
        if (!(this instanceof RedSkyBox)) return new RedSkyBox(redGL, srcList);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedSkyBox : RedGL Instance만 허용됩니다.')
        var tGL;
        tGL = redGL.gl;
        /**DOC:
		{
            title :`geometry`,
            description : `geometry`,
			return : 'RedGeometry'
		}
	    :DOC*/
        this['geometry'] = RedBox(redGL);
        /**DOC:
		{
            title :`material`,
            description : `material`,
            return : 'RedBaseMaterial 확장 Instance'
		}
        :DOC*/

        this['material'] = RedSkyBoxMaterial(redGL, RedBitmapCubeTexture(redGL, srcList));
        /**DOC:
		{
            title :`drawMode`,
            description : `drawMode`,
            return : 'gl 상수'
		}
	    :DOC*/
        this['drawMode'] = tGL.TRIANGLES
        this['x'] = this['y'] = this['z'] = 0;
        this['rotationX'] = this['rotationY'] = this['rotationZ'] = 0;
        this['scaleX'] = this['scaleY'] = this['scaleZ'] = 1;
        this['matrix'] = mat4.create();
        this['normalMatrix'] = mat4.create();
        this['children'] = []
        this['_UUID'] = RedGL['makeUUID']();
        // Object.seal(this)
    }
    RedGLUtil['extendsProto'](RedSkyBox, RedBaseObject3D);
    Object.freeze(RedSkyBox);
})();