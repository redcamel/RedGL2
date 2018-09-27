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
		 extends : [
		    'RedBaseLight'
		 ],
		 demo : '../example/light/RedPointLight.html',
		 example: `
			 RedPointLight(RedGL Instance, hex, alpha)
		 `,
		 return : 'RedPointLight Instance'
	 }
     :DOC*/
    RedPointLight = function (redGL, hexColor, alpha) {
        if (!(this instanceof RedPointLight)) return new RedPointLight(redGL, hexColor, alpha);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPointLight : RedGL Instance만 허용.', '입력값 : ' + redGL);
        // 유니폼 프로퍼티
        this['_lightColor'] = new Float32Array(4);
        // 일반 프로퍼티
        this['intensity'] = 1;
        this['alpha'] = alpha == undefined ? 1 : alpha;
        this['color'] = hexColor ? hexColor : '#fff';
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`x`,
			 description : `기본값 : 0`,
			 return : 'Number'
		 }
         :DOC*/
        this['x'] = 0;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`y`,
			 description : `기본값 : 0`,
			 return : 'Number'
		 }
         :DOC*/
        this['y'] = 0;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`z`,
			 description : `기본값 : 0`,
			 return : 'Number'
		 }
         :DOC*/
        this['z'] = 0;
        this['radius'] = 1;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`debug`,
			 description : `디버그오브젝트 활성화 여부`,
			 return : 'Boolean'
		 }
         :DOC*/
        this['debug'] = false;
        this['_debugObject'] = RedMesh(redGL, RedSphere(redGL, 1, 16, 16, 16), RedColorMaterial(redGL));
        this['_debugObject']['drawMode'] = redGL.gl.LINE_STRIP;
        this['_UUID'] = RedGL.makeUUID();
        console.log(this);
    };
    /**DOC:
     {
		 title :`RedPointLight.TYPE`,
		 code : 'CONST',
		 description : `RedPointLight 타입상수`,
		 return : 'String'
	 }
     :DOC*/
    RedPointLight['TYPE'] = 'RedPointLight';
    RedPointLight.prototype = new RedBaseLight;
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`type`,
		 description : `RedPointLight['TYPE']`,
		 return : 'String'
	 }
     :DOC*/
    Object.defineProperty(RedPointLight.prototype, 'TYPE', {
        configurable: false,
        writable: false,
        value: RedPointLight['TYPE']
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`radius`,
		 description : `
		 점광의 반지름
		 기본값 : 1
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPointLight', 'radius', 'number', {'min': 0});
    Object.freeze(RedPointLight);
})();