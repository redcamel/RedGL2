"use strict";
var RedPointUnit;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPointUnit`,
		 description : `
			 RedPointUnit Instance 생성기
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
				 {type : 'RedPointColorMaterial or RedPointBitmapMaterial'}
			 ]
		 },
		 return : 'RedProgram Instance'
	 }
	 :DOC*/
	RedPointUnit = function (redGL, interleaveData, interleaveDefineInfoList, material) {
		if ( !(this instanceof RedPointUnit) ) return new RedPointUnit(redGL, interleaveData, interleaveDefineInfoList, material);
		if ( !(material instanceof RedPointColorMaterial) && !(material instanceof RedPointBitmapMaterial) ) RedGLUtil.throwFunc('RedPointUnit : material - RedPointColorMaterial Instance or RedPointBitmapMaterial Instance만 허용됩니다.')
		var tGL;
		var interleaveBuffer;
		tGL = redGL.gl
		RedBaseObject3D['build'].call(this, tGL)
		this['_UUID'] = RedGL['makeUUID']();
		interleaveBuffer = RedBuffer(
			redGL,
			'RedPointUnit_' + this['_UUID'],
			RedBuffer.ARRAY_BUFFER,
			interleaveData,
			interleaveDefineInfoList
		)
		this['geometry'] = RedGeometry(interleaveBuffer)
		this['material'] = material
		this['drawMode'] = tGL.POINTS
	}
	RedSprite3D.prototype = new RedBaseContainer()
	RedPointUnit.prototype['update'] = function () {
		//TODO
	}
	Object.freeze(RedPointUnit);
})();