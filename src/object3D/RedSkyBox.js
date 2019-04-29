/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

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
			 ],
			 alpha : [
			    {type:Number},
			    '기본값 : 1',
			    '범위 : 0 ~ 1'
			 ]
		 },
         extends : [
		    'RedBaseObject3D'
		 ],
		 demo : '../example/object3D/RedSkyBox.html',
		 example : `
            var tScene3D;
            tScene3D = RedScene( RedGL Instance );
            tScene3D.skyBox = RedSkyBox(
                RedGL Instance,
                [
                'asset/cubemap/SwedishRoyalCastle/px.jpg',
                'asset/cubemap/SwedishRoyalCastle/nx.jpg',
                'asset/cubemap/SwedishRoyalCastle/ny.jpg',
                'asset/cubemap/SwedishRoyalCastle/py.jpg',
                'asset/cubemap/SwedishRoyalCastle/pz.jpg',
                'asset/cubemap/SwedishRoyalCastle/nz.jpg'
                ]
            );
		 `,
		 return : 'RedSkyBox Instance'
	 }
     :DOC*/
    RedSkyBox = function (redGL, srcList, alpha) {
        if (!(this instanceof RedSkyBox)) return new RedSkyBox(redGL, srcList, alpha);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedSkyBox : RedGL Instance만 허용.', redGL);
        RedBaseObject3D['build'].call(this, redGL.gl);
        this['geometry'] = RedBox(redGL);
        this['material'] = RedSkyBoxMaterial(redGL, RedBitmapCubeTexture(redGL, srcList));
        this['cullFace'] = redGL.gl.FRONT;
        this['alpha'] = alpha == undefined ? 1 : alpha;
        this['_UUID'] = RedGL.makeUUID();
        console.log(this);
    };
    RedSkyBox.prototype = new RedBaseObject3D();
    RedDefinePropertyInfo.definePrototype('RedSkyBox', 'alpha', 'number', {
        min: 0, max: 1, callback: function (v) {
            this['material'].alpha = v
        }
    });
    Object.defineProperty(RedSkyBox.prototype, 'geometry', {
        get: function () {
            return this['_geometry'];
        },
        set: function (v) {
            if (this['_geometry']) RedGLUtil.throwFunc('RedSkyBox : geometry - 임의로 설정을 허용하지 않음', '입력값 : ' + v);
            this['_geometry'] = v;
        }
    });
    Object.defineProperty(RedSkyBox.prototype, 'material', {
        get: function () {
            return this['_material'];
        },
        set: function (v) {
            v instanceof RedSkyBoxMaterial || RedGLUtil.throwFunc('RedSkyBox : RedSkyBoxMaterial Instance만 허용.', '입력값 : ' + v);
            this['_material'] = v;
        }
    });
    Object.freeze(RedSkyBox);
})();