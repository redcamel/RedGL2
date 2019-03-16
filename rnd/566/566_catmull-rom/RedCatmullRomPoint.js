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
    RedCatmullRomPoint = function (redGL, x, y, z, inX, inY, inZ, outX, outY, outZ) {
        this['debugMesh'] = RedMesh(redGL, RedBox(redGL, 3, 3, 3), RedColorMaterial(redGL, '#00ff00'))
        this['debugMesh'].x = x
        this['debugMesh'].y = y
        this['debugMesh'].z = z
        this['point'] = [x, y, z]
        this['inPoint'] = [0,0,0]
        this['outPoint'] = [0,0,0]

        // this['indexBuffer']['isPrimitiveBuffer'] = true
        this['_UUID'] = RedGL.makeUUID();
        console.log(this)
    };
    Object.freeze(RedCatmullRomPoint);
})
();