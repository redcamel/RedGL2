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
		this['_lightColor'] = new Float32Array(4);
		// 일반 프로퍼티
		this['intensity'] = 1;
		this['alpha'] = alpha == undefined ? 0.1 : alpha;
		this['color'] = hexColor ? hexColor : '#fff';
		this['_UUID'] = RedGL.makeUUID();
		console.log(this);
	};
	/**DOC:
	 {
		 title :`RedAmbientLight.type`,
		 code : 'CONST',
		 description : `RedAmbientLight 타입상수`,
		 return : 'String'
	 }
	 :DOC*/
	RedAmbientLight['TYPE'] = 'RedAmbientLight';
	RedAmbientLight.prototype = new RedBaseLight();
	/**DOC:
	 {
		 title :`type`,
		 description : `RedAmbientLight['TYPE']`,
		 return : 'String'
	 }
	 :DOC*/
	Object.defineProperty(RedAmbientLight.prototype, 'TYPE', {
		configurable: false,
		writable: false,
		value: RedAmbientLight['TYPE']
	});
	Object.freeze(RedAmbientLight);
})();