/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
var RedLatheMesh;
(function () {

    /**DOC:
     {
		 constructorYn : true,
		 title :`RedLatheMesh`,
		 description : `
			 RedLatheMesh 객체
		 `,
		params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 pathString : [
				 {type:'string'},
				 'path 문자열',
				  `<code>"m44,434c18,-33 19,-66 15,-111c-4,-45 -37,-104 -39,-132c-2,-28 11,-51 16,-81c5,-30 3,-63 -36,-63"</code>`
			 ],
			 numDivisions : [
				 {type:'uint'},
				 '기본값 : 16'
			 ],
			 capStart : [
				 {type:'boolean'},
				 '기본값 : false'
			 ],
			 capEnd : [
				 {type:'boolean'},
				 '기본값 : false'
			 ],
			 startAngle : [
				 {type:'number'},
				 '기본값 : 0.0'
			 ],
			 endAngle : [
				 {type:'Boolean'},
				 '기본값 : Math.PI * 2'
			 ],
			 maxAngle : [
				 {type:'number'},
				 '기본값 : Math.PI / 180 * 30'
			 ],
			 tolerance : [
				 {type:'number'},
				 '기본값 : 0.15'
			 ],
			 flipX : [
			    {type:'boolean'},
				'기본값 : false'
			 ],
			 flipY : [
			    {type:'boolean'},
				'기본값 : false'
			 ]
		 },
		 extends : [
		    'RedGeometry'
		 ],
		 demo : '../example/object3D/RedLatheMesh.html',
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
        this['numDivisions'] = numDivisions = Math.floor(numDivisions) || 16;
        this['capStart'] = capStart !== undefined ? capStart : false;
        this['capEnd'] = capEnd !== undefined ? capEnd : false;
        this['startAngle'] = startAngle !== undefined ? startAngle : 0.0;
        this['endAngle'] = endAngle !== undefined ? endAngle : Math.PI * 2;
        this['distance'] = distance !== undefined ? distance : 0.4;
        this['maxAngle'] = maxAngle !== undefined ? maxAngle : Math.PI / 180 * 30;
        this['tolerance'] = tolerance !== undefined ? tolerance : 0.15;
        this['flipX'] = flipX ? true : false;
        this['flipY'] = flipY ? true : false;
        if (this['_tolerance'] < 0.1) this['_tolerance'] = 0.1;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`geometry`,
			 description : `geometry`,
			 return : 'RedGeometry'
		 }
         :DOC*/
        resetGeometry.call(this);
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
    var resetGeometry = function () {
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
    };
    Object.defineProperty(RedLatheMesh.prototype, 'pathString', {
        get: function () {
            return this['_pathString'];
        },
        set: function (v) {
            this['_pathString'] = v;
            resetGeometry.call(this)
        }
    });
    /**DOC:
     {
            code : 'PROPERTY',
            title :`numDivisions`,
            description : `분할갯수`,
            return : 'uint'
        }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'numDivisions', 'number', {min: 0, callback: resetGeometry});
    /**DOC:
     {
            code : 'PROPERTY',
            title :`capStart`,
            description : `상단 닫기`,
            return : 'boolean'
        }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'capStart', 'boolean', {callback: resetGeometry});
    /**DOC:
     {
            code : 'PROPERTY',
            title :`capEnd`,
            description : `하단 닫기`,
            return : 'boolean'
        }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'capEnd', 'boolean', {callback: resetGeometry});
    /**DOC:
     {
            code : 'PROPERTY',
            title :`startAngle`,
            description : `시작 앵글`,
            return : 'number'
        }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'startAngle', 'number', {min: 0, callback: resetGeometry});
    /**DOC:
     {
            code : 'PROPERTY',
            title :`endAngle`,
            description : `종료 앵글`,
            return : 'number'
        }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'endAngle', 'number', {min: 0, callback: resetGeometry});
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'maxAngle', 'number', {min: 0, callback: resetGeometry});
    /**DOC:
     {
            code : 'PROPERTY',
            title :`distance`,
            description : `분할 거리`,
            return : 'number'
        }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'distance', 'number', {min: 0, callback: resetGeometry});
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'tolerance', 'number', {min: 0, callback: resetGeometry});
    /**DOC:
     {
            code : 'PROPERTY',
            title :`flipX`,
            description : `좌우반전`,
            return : 'boolean'
        }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'flipX', 'boolean', {callback: resetGeometry});
    /**DOC:
     {
            code : 'PROPERTY',
            title :`flipY`,
            description : `상하반전`,
            return : 'boolean'
        }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedLatheMesh', 'flipY', 'boolean', {callback: resetGeometry});
    Object.freeze(RedLatheMesh);
})
();