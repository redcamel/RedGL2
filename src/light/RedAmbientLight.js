"use strict";
var RedAmbientLight;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedAmbientLight`,
		 description : `
			 RedAmbientLight Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 hex : [
				 {type:'hex'}
			 ],
			 alpha : [
				 {type:'number'},
				 '알파값'
			 ]
		 },
		 example: `
			 RedAmbientLight(RedGL Instance, hex, alpha)
		 `,
		 return : 'RedAmbientLight Instance'
	 }
	 :DOC*/
	RedAmbientLight = function (redGL, hexColor, alpha) {
		if ( !(this instanceof RedAmbientLight) ) return new RedAmbientLight(redGL, hexColor, alpha);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedAmbientLight : RedGL Instance만 허용됩니다.', '입력값 : ' + redGL);
		// 유니폼 프로퍼티
		this['_color'] = new Float32Array(4)
		/**DOC:
		 {
			 title :`intensity`,
			 description : `
				 라이트 강도
				 기본값 : 1
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['intensity'] = 1
		// 일반 프로퍼티
		/**DOC:
		 {
			 title :`alpha`,
			 description : `
				 기본값 : 0.1
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		Object.defineProperty(this, 'alpha', RedDefinePropertyInfo['alpha']);
		Object.defineProperty(this, 'color', RedDefinePropertyInfo['color']);
		this['alpha'] = alpha == undefined ? 0.1 : alpha
		this['color'] = hexColor ? hexColor : '#fff'
		this['_UUID'] = RedGL['makeUUID']();
		console.log(this)
	}
	/**DOC:
	 {
		 title :`RedAmbientLight.type`,
		 code : 'CONST',
		 description : `RedAmbientLight 타입상수`,
		 return : 'String'
	 }
	 :DOC*/
	RedAmbientLight['type'] = 'RedAmbientLight'
	RedAmbientLight.prototype = new RedBaseLight()
	/**DOC:
	 {
		 title :`type`,
		 description : `RedAmbientLight['type']`,
		 return : 'String'
	 }
	 :DOC*/
	Object.defineProperty(RedAmbientLight.prototype, 'type', {
		configurable: false,
		writable: false,
		value: RedAmbientLight['type']
	})
	Object.freeze(RedAmbientLight)
})();