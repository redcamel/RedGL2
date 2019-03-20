"use strict";
var RedBezierPoint;
(function () {

    /**DOC:
     {
		 varructorYn : true,
		 title :`RedBezierPoint`,
		 description : `
			 RedBezierPoint 형태의 RedGeometry 생성
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
		 demo : '../example/primitives/RedBezierPoint.html',
		 return : 'RedBezierPoint Instance'
	 }
     :DOC*/
    RedBezierPoint = function (redGL, x, y, z, inX, inY, inZ, outX, outY, outZ) {
        var t0;
        this['debugMesh'] = RedMesh(redGL, RedBox(redGL, 3, 3, 3), RedColorMaterial(redGL, '#00ff00'))
        this['debugMesh'].x = x
        this['debugMesh'].y = y
        this['debugMesh'].z = z
        this['point'] = [x, y, z]

        this['debugInPointMesh'] = RedMesh(redGL, RedBox(redGL, 3, 3, 3), RedColorMaterial(redGL, '#0000ff'))
        t0 = RedLine(redGL, RedColorMaterial(redGL, '#fff', 0.5))
        this['debugInPointMesh'].addChild(t0)
        this['debugInPointMesh'].x = inX
        this['debugInPointMesh'].y = inY
        this['debugInPointMesh'].z = inZ
        this['inPoint'] = [inX, inY, inZ]

        this['debugOutPointMesh'] = RedMesh(redGL, RedBox(redGL, 3, 3, 3), RedColorMaterial(redGL, '#ff0000'))
        t0 = RedLine(redGL, RedColorMaterial(redGL, '#fff', 0.5))
        this['debugOutPointMesh'].addChild(t0)
        this['debugOutPointMesh'].x = outX
        this['debugOutPointMesh'].y = outY
        this['debugOutPointMesh'].z = outZ
        this['outPoint'] = [outX, outY, outZ]
        // this['indexBuffer']['isPrimitiveBuffer'] = true
        this['_UUID'] = RedGL.makeUUID();
        console.log(this)
    };
    Object.freeze(RedBezierPoint);
})
();