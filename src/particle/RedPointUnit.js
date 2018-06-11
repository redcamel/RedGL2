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
	RedPointUnit.prototype = new RedBaseContainer()
	Object.freeze(RedPointUnit);
})();