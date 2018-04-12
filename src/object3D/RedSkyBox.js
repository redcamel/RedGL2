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
                redGL : [
                    {type:'RedGL'}
                ],
                srcList : [
                    {type:'Array'},
                    `스카이박스 이미지 리스트`
                ]
            },
            example : `
                var tScene3D;
                tScene3D = RedScene()
                tScene3D.skyBox = RedSkyBox(RedGL Instance, [
                    'asset/cubemap/posx.png',
                    'asset/cubemap/negx.png',
                    'asset/cubemap/posy.png',
                    'asset/cubemap/negy.png',
                    'asset/cubemap/posz.png',
                    'asset/cubemap/negz.png'
                ])
            `,
            return : 'RedSkyBox Instance'
        }
    :DOC*/
    RedSkyBox = function (redGL, srcList) {
        if (!(this instanceof RedSkyBox)) return new RedSkyBox(redGL, srcList);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedSkyBox : RedGL Instance만 허용됩니다.')
        var tGL;
        tGL = redGL.gl;
        RedBaseObject3D['build'].call(this, tGL)
        this['geometry'] = RedBox(redGL);
        this['material'] = RedSkyBoxMaterial(redGL, RedBitmapCubeTexture(redGL, srcList));
        this['_UUID'] = RedGL['makeUUID']();
        // Object.seal(this)
    }
    /**DOC:
        {
            extendDoc : 'RedBaseObject3D'
        }
    :DOC*/
    RedGLUtil['extendsProto'](RedSkyBox, RedBaseObject3D);
    Object.freeze(RedSkyBox);
})();