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
		 extends : [
		    'RedBaseContainer',
		    'RedBaseObject3D'
		 ],
		 return : 'RedPointUnit Instance'
	 }
	 :DOC*/
	RedPointUnit = function (redGL, interleaveData, interleaveDefineInfoList, material) {
		if ( !(this instanceof RedPointUnit) ) return new RedPointUnit(redGL, interleaveData, interleaveDefineInfoList, material);
		interleaveData instanceof Array || RedGLUtil.throwFunc('RedLine : interleaveData - Array Instance만 허용.', '입력값 :', redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedLine : RedGL Instance만 허용.', redGL);
		var tGL;
		tGL = redGL.gl;
		RedBaseObject3D['build'].call(this, tGL);
		this['_UUID'] = RedGL.makeUUID();
		this['geometry'] = RedGeometry(
			RedBuffer(
				redGL,
				'RedPointUnit_' + this['_UUID'],
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
	RedPointUnit.prototype = new RedBaseContainer();
	RedPointUnit.prototype['update'] = function (interleaveData) {
		this['_geometry']['interleaveBuffer'].upload(new Float32Array(interleaveData));
	};
	Object.defineProperty(RedPointUnit.prototype, 'geometry', {
		get: function () { return this['_geometry']; },
		set: function (v) {
			if ( this['_geometry'] ) RedGLUtil.throwFunc('RedPointUnit : geometry - 임의 설정을 허용하지 않음', '입력값 : ' + v);
			this['_geometry'] = v;
		}
	});
	Object.defineProperty(RedPointUnit.prototype, 'material', {
		get: function () { return this['_material']; },
		set: function (v) {
			v instanceof RedPointColorMaterial
			|| v instanceof RedPointBitmapMaterial
			|| RedGLUtil.throwFunc('RedPointUnit : material - RedPointColorMaterial Instance or RedPointBitmapMaterial Instance만 허용.');
			this['_material'] = v;
		}
	});
	Object.freeze(RedPointUnit);
})();