/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var RedCatmullRomPoint;
(function () {

    /**DOC:
     {
		 varructorYn : true,
		 title :`RedCatmullRomPoint`,
		 description : `
			 RedCatmullRomPoint 형태의 RedGeometry 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 radiusTop : [
				 {type:'number'},
				 '기본값 : 1'
			 ],
			 radiusBottom : [
				 {type:'number'},
				 '기본값 : 1'
			 ],
			 height : [
				 {type:'number'},
				 '기본값 : 1'
			 ],
			 radialSegments : [
				 {type:'uint'},
				 '기본값 : 8'
			 ],
			 heightSegments : [
				 {type:'uint'},
				 '기본값 : 1'
			 ],
			 openEnded : [
				 {type:'Boolean'},
				 '기본값 : false'
			 ],
			 startAngle : [
				 {type:'number'},
				 'startAngle'
			 ],
			 endAngle : [
				 {type:'number'},
				 'endAngle'
			 ]
		 },
		 extends : [
		    'RedGeometry'
		 ],
		 demo : '../example/primitives/RedCatmullRomPoint.html',
		 return : 'RedCatmullRomPoint Instance'
	 }
     :DOC*/
    RedCatmullRomPoint = function (redGL, x, y, z) {
        var t0;
        this['debugMesh'] = RedMesh(redGL, RedBox(redGL, 3, 3, 3), RedColorMaterial(redGL, '#00ff00'))
        this['debugMesh'].x = x
        this['debugMesh'].y = y
        this['debugMesh'].z = z
        this['point'] = [x, y, z]

        this['debugInPointMesh'] = RedMesh(redGL, RedBox(redGL, 3, 3, 3), RedColorMaterial(redGL, '#0000ff'))
        t0 = RedLine(redGL, RedColorMaterial(redGL, '#fff', 0.5))
        this['debugInPointMesh'].addChild(t0)
        this['debugInPointMesh'].x = 0
        this['debugInPointMesh'].y = 0
        this['debugInPointMesh'].z = 0
        this['inPoint'] = [0, 0, 0]

        this['debugOutPointMesh'] = RedMesh(redGL, RedBox(redGL, 3, 3, 3), RedColorMaterial(redGL, '#ff0000'))
        t0 = RedLine(redGL, RedColorMaterial(redGL, '#fff', 0.5))
        this['debugOutPointMesh'].addChild(t0)
        this['debugOutPointMesh'].x = 0
        this['debugOutPointMesh'].y = 0
        this['debugOutPointMesh'].z = 0
        this['outPoint'] = [0, 0, 0]

        // this['indexBuffer']['isPrimitiveBuffer'] = true
        this['_UUID'] = RedGL.makeUUID();
        console.log(this)
    };
    Object.freeze(RedCatmullRomPoint);
})
();