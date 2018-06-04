"use strict";
var RedPointLight;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPointLight`,
		 description : `
			 RedPointLight Instance 생성
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
			 RedPointLight(RedGL Instance, hex, alpha)
		 `,
		 return : 'RedPointLight Instance'
	 }
	 :DOC*/
	RedPointLight = function ( redGL, hexColor, alpha ) {
		if ( !(this instanceof RedPointLight) ) return new RedPointLight( redGL, hexColor, alpha );
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc( 'RedPointLight : RedGL Instance만 허용됩니다.', '입력값 : ' + redGL );
		// 유니폼 프로퍼티
		this['_color'] = new Float32Array( 4 )
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
		this['_intensity'] = 1
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
		Object.defineProperty( this, 'alpha', RedDefinePropertyInfo['alpha'] );
		Object.defineProperty( this, 'color', RedDefinePropertyInfo['color'] );
		this['alpha'] = alpha == undefined ? 1 : alpha
		this['color'] = hexColor ? hexColor : '#fff'
		/**DOC:
		 {
			 title :`x`,
			 description : `기본값 : 0`,
			 return : 'Number'
		 }
		 :DOC*/
		this['x'] = 0
		/**DOC:
		 {
			 title :`y`,
			 description : `기본값 : 0`,
			 return : 'Number'
		 }
		 :DOC*/
		this['y'] = 0
		/**DOC:
		 {
			 title :`z`,
			 description : `기본값 : 0`,
			 return : 'Number'
		 }
		 :DOC*/
		this['z'] = 0;
		/**DOC:
		 {
			 title :`radius`,
			 description : `
			 점광의 반지름
			 기본값 : 1
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['_radius'] = 1
		/**DOC:
		 {
			 title :`debug`,
			 description : `디버그오브젝트 활성화 여부`,
			 return : 'Boolean'
		 }
		 :DOC*/
		this['debug'] = false
		this['debugObject'] = RedMesh( redGL, RedSphere( redGL, 1, 16, 16, 16 ), RedColorMaterial( redGL ) )
		this['debugObject']['drawMode'] = redGL.gl.LINE_STRIP
		this['_UUID'] = RedGL['makeUUID']();
		console.log( this )
	}
	/**DOC:
	 {
		 title :`RedPointLight.type`,
		 code : 'CONST',
		 description : `RedPointLight 타입상수`,
		 return : 'String'
	 }
	 :DOC*/
	RedPointLight['type'] = 'RedPointLight'
	RedPointLight.prototype = new RedBaseLight
	/**DOC:
	 {
		 title :`type`,
		 description : `RedPointLight['type']`,
		 return : 'String'
	 }
	 :DOC*/
	Object.defineProperty( RedPointLight.prototype, 'type', {
		configurable: false,
		writable: false,
		value: RedPointLight['type']
	} )
	Object.defineProperty( RedPointLight.prototype, 'radius', {
		get: function () { return this['_radius']; },
		set: function ( v ) {
			if ( typeof v != 'number' ) RedGLUtil.throwFunc( 'radius : 숫자만 허용함.' )
			if ( v < 0 ) v = 0;
			this['_radius'] = v
		}
	} );

	Object.freeze( RedPointLight )

})()