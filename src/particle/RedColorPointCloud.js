/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
var RedColorPointCloud;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedColorPointCloud`,
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
				 {type : 'RedColorPointCloudMaterial'}
			 ]
		 },
		 demo : '../example/particle/RedColorPointCloud.html',
		 extends : [
		    'RedBaseContainer',
		    'RedBaseObject3D'
		 ],
		 return : 'RedColorPointCloud Instance'
	 }
     :DOC*/
    RedColorPointCloud = function (redGL, interleaveData, interleaveDefineInfoList) {
        if (!(this instanceof RedColorPointCloud)) return new RedColorPointCloud(redGL, interleaveData, interleaveDefineInfoList);
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
                'RedColorPointCloud_' + this['_UUID'],
                RedBuffer.ARRAY_BUFFER,
                new Float32Array(interleaveData),
                interleaveDefineInfoList,
                redGL.gl.DYNAMIC_DRAW
            )
        );
        this['_material'] = RedColorPointCloudMaterial(redGL);
        this['drawMode'] = tGL.POINTS;
        this['useDepthMask'] = false;
    };
    RedColorPointCloud.prototype = new RedPointCloud();
    /**DOC:
     {
		 code : 'PROPERTY',
		 title :`material`,
		 description : `material`,
		 return : 'RedColorPointCloudMaterial or RedBitmapPointCloudMaterial Instance'
	 }
     :DOC*/
    Object.defineProperty(RedColorPointCloud.prototype, 'material', {
        get: function () {
            return this['_material'];
        },
        set: function (v) {
            v instanceof RedColorPointCloudMaterial
            || RedGLUtil.throwFunc('RedColorPointCloud : material - RedColorPointCloudMaterial Instance 만 허용.');
            this['_material'] = v;
        }
    });
    Object.freeze(RedColorPointCloud);
})();