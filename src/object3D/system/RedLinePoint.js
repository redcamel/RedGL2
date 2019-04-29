/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var RedLinePoint;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedLinePoint`,
		 description : `
			 RedLinePoint 객체.
			 RedLine 내부에서 자동 생성됨.
		 `,
		 params : {
			 x : [
				 {type:'Number'}
			 ],
			 y : [
				 {type:'Number'}
			 ],
			 z : [
				 {type:'Number'}
			 ],
			 inX : [
				 {type:'Number'},
				 '기본값 : 0',
				 'inPointX 값',
				 'RedLine.LINEAR 모드에서는 사용되지않음',
				 'RedLine.CATMULL_ROM 모드에서는 자동 생성됨'
			 ],
			 inY : [
				 {type:'Number'},
				 '기본값 : 0',
				 'inPointY 값',
				 'RedLine.LINEAR 모드에서는 사용되지않음',
				 'RedLine.CATMULL_ROM 모드에서는 자동 생성됨'
			 ],
			 inZ : [
				 {type:'Number'},
				 '기본값 : 0',
				 'inPointZ 값',
				 'RedLine.LINEAR 모드에서는 사용되지않음',
				 'RedLine.CATMULL_ROM 모드에서는 자동 생성됨'
			 ],
			 outX : [
				 {type:'Number'},
				 '기본값 : 0',
				 'outPointX 값',
				 'RedLine.LINEAR 모드에서는 사용되지않음',
				 'RedLine.CATMULL_ROM 모드에서는 자동 생성됨'
			 ],
			 outY : [
				 {type:'Number'},
				 '기본값 : 0',
				 'outPointY 값',
				 'RedLine.LINEAR 모드에서는 사용되지않음',
				 'RedLine.CATMULL_ROM 모드에서는 자동 생성됨'
			 ],
			 outZ : [
				 {type:'Number'},
				 '기본값 : 0',
				 'outPointZ 값',
				 'RedLine.LINEAR 모드에서는 사용되지않음',
				 'RedLine.CATMULL_ROM 모드에서는 자동 생성됨'
			 ]
		 },
		 return : 'RedLinePoint Instance'
	 }
     :DOC*/
    RedLinePoint = function (x, y, z, inX, inY, inZ, outX, outY, outZ) {
        if (!(this instanceof RedLinePoint)) return new RedLinePoint(x, y, z, inX, inY, inZ, outX, outY, outZ);
        this['_inPoint'] = [inX || 0, inY || 0, inZ || 0];
        this['_point'] = [x || 0, y || 0, z || 0];
        this['_outPoint'] = [outX || 0, outY || 0, outZ || 0];
        this['_UUID'] = RedGL.makeUUID();
        console.log(this)
    };
    /**DOC:
     {
		code : 'PROPERTY',
		title :`_point`,
		description : `
			포인트 위치 배열
		`,
		return : 'Boolean'
	}
     :DOC*/
    /**DOC:
     {
		code : 'PROPERTY',
		title :`_inPoint`,
		description : `
			컨트롤 포인트1 위치 배열
		`,
		return : 'Boolean'
	}
     :DOC*/
    /**DOC:
     {
		code : 'PROPERTY',
		title :`_outPoint`,
		description : `
			컨트롤 포인트2 위치 배열
		`,
		return : 'Boolean'
	}
     :DOC*/
    Object.freeze(RedLinePoint);
})();