/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var RedBitmapPointCloud;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedBitmapPointCloud`,
		 description : `
			 비트맵 포인트 클라우드
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 interleaveData : [
				 {type:'Array'}
			 ],
			 interleaveDefineInfoList : [
				 {type:'Array'}
			 ],
			 material : [
				 {type : 'RedBitmapPointCloudMaterial'}
			 ]
		 },
		 demo : '../example/particle/RedBitmapPointCloud.html',
		 extends : [
		    'RedBaseContainer',
		    'RedBaseObject3D'
		 ],
		 return : 'RedBitmapPointCloud Instance'
	 }
     :DOC*/
    RedBitmapPointCloud = function (redGL, interleaveData, interleaveDefineInfoList, material) {
        if (!(this instanceof RedBitmapPointCloud)) return new RedBitmapPointCloud(redGL, interleaveData, interleaveDefineInfoList, material);
        interleaveData instanceof Array || RedGLUtil.throwFunc('RedLine : interleaveData - Array Instance만 허용.', '입력값 :', redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedLine : RedGL Instance만 허용.', redGL);
        var tGL;
        tGL = redGL.gl;
        RedBaseObject3D['build'].call(this, tGL);
        this['_UUID'] = RedGL.makeUUID();
        //TODO interleaveDefineInfoList 검증강화
        this['geometry'] = RedGeometry(
            RedBuffer(
                redGL,
                'RedBitmapPointCloud_' + this['_UUID'],
                RedBuffer.ARRAY_BUFFER,
                new Float32Array(interleaveData),
                interleaveDefineInfoList,
                redGL.gl.DYNAMIC_DRAW
            )
        );
        this['material'] = material;
        this['drawMode'] = tGL.POINTS;
        this['useDepthMask'] = false;
    };
    RedBitmapPointCloud.prototype = new RedPointCloud();
    /**DOC:
     {
		 code : 'PROPERTY',
		 title :`material`,
		 description : `material`,
		 return : 'RedBitmapPointCloudMaterial Instance'
	 }
     :DOC*/
    Object.defineProperty(RedBitmapPointCloud.prototype, 'material', {
        get: function () {
            return this['_material'];
        },
        set: function (v) {
            v instanceof RedBitmapPointCloudMaterial
            || RedGLUtil.throwFunc('RedBitmapPointCloud : material - RedBitmapPointCloudMaterial Instance만 허용.');
            this['_material'] = v;
        }
    });
    Object.freeze(RedBitmapPointCloud);
})();