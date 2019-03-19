"use strict";
var RedLatheMesh;
(function () {

    /**DOC:
     {
		 varructorYn : true,
		 title :`RedLatheMesh`,
		 description : `
			 RedLatheMesh 형태의 RedGeometry 생성
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
		 demo : '../example/primitives/RedLatheMesh.html',
		 return : 'RedLatheMesh Instance'
	 }
     :DOC*/
    RedLatheMesh = function (redGL, pathString, material, numDivisions, capStart, capEnd, startAngle, endAngle, maxAngle, distance, tolerance, flipX, flipY) {
        if (!(this instanceof RedLatheMesh)) return new RedLatheMesh(redGL, pathString, material, numDivisions, capStart, capEnd, startAngle, endAngle, maxAngle, distance, tolerance, flipX, flipY);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPrimitive : RedGL Instance만 허용.', redGL);
        RedBaseObject3D['build'].call(this, redGL.gl);
        // 기본값 정의
        this['_pathString'] = pathString;
        this['_redGL'] = redGL;
        this['_numDivisions'] = numDivisions = Math.floor(numDivisions) || 16;
        this['_capStart'] = capStart !== undefined ? capStart : false;
        this['_capEnd'] = capEnd !== undefined ? capEnd : false;
        this['_startAngle'] = startAngle !== undefined ? startAngle : 0.0;
        this['_endAngle'] = endAngle !== undefined ? endAngle : Math.PI * 2;
        this['_distance'] = distance !== undefined ? distance : 0.4;
        this['_maxAngle'] = maxAngle !== undefined ? maxAngle : Math.PI / 180 * 30
        this['_tolerance'] = tolerance !== undefined ? tolerance : 0.15
        this['_flipX'] = flipX ? true : false;
        this['_flipY'] = flipY ? true : false;
        if (this['_tolerance'] < 0.1) this['_tolerance'] = 0.1
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`geometry`,
			 description : `geometry`,
			 return : 'RedGeometry'
		 }
         :DOC*/
        this['geometry'] = RedLathe(
            this._redGL,
            this._pathString,
            this._numDivisions,
            this._capStart, this._capEnd,
            this._startAngle, this._endAngle, this._maxAngle,
            this._distance,
            this._tolerance,
            this._flipX, this._flipY
        );
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`material`,
			 description : `material`,
			 return : 'RedBaseMaterial 확장 Instance'
		 }
         :DOC*/
        this['material'] = material;
        this['useCullFace'] = false;
        this['_UUID'] = RedGL.makeUUID();
        console.log(this)
    };
    RedLatheMesh.prototype = new RedBaseContainer;
    var callback = function () {
        console.log(this)
        this['_geometry'] = RedLathe(
            this._redGL,
            this._pathString,
            this._numDivisions,
            this._capStart, this._capEnd,
            this._startAngle, this._endAngle, this._maxAngle,
            this._distance,
            this._tolerance,
            this._flipX, this._flipY
        );
    }
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'numDivisions', 'number', {min: 0, callback: callback});
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'capStart', 'boolean', {callback: callback});
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'capEnd', 'boolean', {callback: callback});
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'startAngle', 'number', {min: 0, callback: callback});
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'endAngle', 'number', {min: 0, callback: callback});
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'maxAngle', 'number', {min: 0, callback: callback});
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'distance', 'number', {min: 0, callback: callback});
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'tolerance', 'number', {min: 0, callback: callback});
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'flipX', 'boolean', {callback: callback});
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'flipY', 'boolean', {callback: callback});
    Object.freeze(RedLatheMesh);
})
();