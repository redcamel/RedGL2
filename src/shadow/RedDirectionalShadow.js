"use strict";
var RedDirectionalShadow;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedDirectionalShadow`,
		 description : `
			 RedDirectionalShadow Instance 생성.
			 RedScene 생성시 내부속성으로 자동생성됨.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedDirectionalShadow Instance'
	 }
	 :DOC*/
	RedDirectionalShadow = function (redGL,light) {
		if ( !(this instanceof RedDirectionalShadow) ) return new RedDirectionalShadow(redGL,light);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedDirectionalShadow : RedGL Instance만 허용됩니다.', redGL);
		/**DOC:
		 {
			title :`lightList`,
			code : 'PROPERTY',
			description : `
				이펙트 리스트
			`,
			return : 'Array'
		}
		 :DOC*/
		this['_directionalShadowMaterial'] = RedDirectionalShadowMaterial(redGL)
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['light'] = light;
		this['width'] = 2048
		this['height'] = 2048
		this['_UUID'] = RedGL['makeUUID']();
		this['_castingList'] = []
		console.log(this);
	}
	RedDirectionalShadow.prototype['addCasting'] = function(v){
		if ( !(v instanceof RedBaseObject3D ) ) RedGLUtil.throwFunc('addCasting', 'RedBaseObject3D Instance만 가능', '입력값 : ' + v);
		this['_castingList'].push(v)
		v['_directionalShadowCastingYn'] = true
	}
	RedDirectionalShadow.prototype['removeCasting'] = function(v){
		v['_directionalShadowCastingYn'] = false
		//TODO:
	}

	Object.defineProperty(RedDirectionalShadow.prototype, 'light', {
		get: function () { return this['_light']},
		set: function (v) {
			(v && v instanceof RedDirectionalLight) || RedGLUtil.throwFunc('RedDirectionalShadow - light : RedDirectionalLight Instance만 허용됩니다.', v);
			this['_light'] = v
		}
	})
	RedDefinePropertyInfo.definePrototype('RedDirectionalShadow', 'width', 'number', {'min': 0});
	RedDefinePropertyInfo.definePrototype('RedDirectionalShadow', 'height', 'number', {'min': 0});
	Object.freeze(RedDirectionalShadow);
})();