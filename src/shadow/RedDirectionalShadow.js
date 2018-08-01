"use strict";
var RedDirectionalShadow;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedDirectionalShadow`,
		 description : `
			 RedDirectionalShadow Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedDirectionalShadow Instance'
	 }
	 :DOC*/
	RedDirectionalShadow = function (redGL, light) {
		if ( !(this instanceof RedDirectionalShadow) ) return new RedDirectionalShadow(redGL, light);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedDirectionalShadow : RedGL Instance만 허용.', redGL);
		this['_directionalShadowMaterial'] = RedDirectionalShadowMaterial(redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['light'] = light;
		this['width'] = 2048;
		this['height'] = 2048;
		this['size'] = 20;
		this['_UUID'] = RedGL.makeUUID();
		this['_castingList'] = [];
		console.log(this);
	};
	RedDirectionalShadow.prototype['addCasting'] = function (v) {
		if ( !(v instanceof RedBaseObject3D ) ) RedGLUtil.throwFunc('addCasting', 'RedBaseObject3D Instance만 가능', '입력값 : ' + v);
		this['_castingList'].push(v)
	};
	RedDirectionalShadow.prototype['removeCasting'] = (function () {
		var t0;
		return function (v) {
			t0 = this['_castingList'].indexOf(v);
			if ( t0 == -1 ) RedGLUtil.throwFunc('removeCasting', '존재하지 않는 대상을 삭제하려고 함');
			else this['_castingList'].splice(t0, 1);
		}
	})();
	Object.defineProperty(RedDirectionalShadow.prototype, 'light', {
		get: function () { return this['_light']},
		set: function (v) {
			(v && v instanceof RedDirectionalLight) || RedGLUtil.throwFunc('RedDirectionalShadow - light : RedDirectionalLight Instance만 허용.', v);
			this['_light'] = v;
		}
	});
	RedDefinePropertyInfo.definePrototype('RedDirectionalShadow', 'width', 'number', {'min': 1});
	RedDefinePropertyInfo.definePrototype('RedDirectionalShadow', 'height', 'number', {'min': 1});
	RedDefinePropertyInfo.definePrototype('RedDirectionalShadow', 'size', 'number', {'min': 1});
	Object.freeze(RedDirectionalShadow);
})();