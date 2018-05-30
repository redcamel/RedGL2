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
	RedAmbientLight = function (redGL, hex, alpha) {
		if (!(this instanceof RedAmbientLight)) return new RedAmbientLight(redGL, hex, alpha);
		// 유니폼 프로퍼티
		this['color'] = new Float32Array(4)
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
		this['alpha'] = alpha == undefined ? 0.1 : alpha
		this.setColor(hex ? hex : '#fff', this['alpha'])
		this['_UUID'] = RedGL['makeUUID']();
		/**DOC:
		 {
			 title :`type`,
			 description : `RedAmbientLight['type']`,
			 return : 'String'
		 }
		 :DOC*/
		Object.defineProperty(this, 'type', {
			configurable: false,
			writable: false,
			value: RedAmbientLight['type']
		})
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
	RedGLUtil['copyProto'](RedAmbientLight, RedBaseLight);
	Object.defineProperty(RedAmbientLight.prototype, 'alpha', {
		get: function () {
			return this['color'][3]
		},
		set: function (v) {
			this['color'][3] = v
		}
	})
	Object.freeze(RedAmbientLight)
})();