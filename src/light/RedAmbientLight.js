/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var RedAmbientLight;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedAmbientLight`,
		 description : `
		    기본 환경광.
			RedAmbientLight Instance 생성자.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 hex : [
				 {type:'hex'},
				 '기본값 : #fff'
			 ],
			 alpha : [
				 {type:'number'},
				 '기본값 : 0.1',
				 'range : 0 ~ 1'
			 ],
			 intensity : [
				 {type:'number'},
				 '기본값 : 1',
				 'range : 0 ~ 1'
			 ]
		 },
		 extends : [
		    'RedBaseLight'
		 ],
		 demo : '../example/light/RedAmbientLight.html',
		 example: `
			 RedAmbientLight(RedGL Instance, '#fff', 1);
		 `,
		 return : 'RedAmbientLight Instance'
	 }
     :DOC*/
    RedAmbientLight = function (redGL, hexColor, alpha, intensity) {
        if (!(this instanceof RedAmbientLight)) return new RedAmbientLight(redGL, hexColor, alpha, intensity);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedAmbientLight : RedGL Instance만 허용.', '입력값 : ' + redGL);
        // 유니폼 프로퍼티
        this['_lightColor'] = new Float32Array(4);
        // 일반 프로퍼티
        this['intensity'] = intensity == undefined ? 1 : intensity;
        this['alpha'] = alpha == undefined ? 0.1 : alpha;
        this['color'] = hexColor ? hexColor : '#fff';
        this['_UUID'] = RedGL.makeUUID();
        console.log(this);
    };
    /**DOC:
     {
		 title :`RedAmbientLight.TYPE`,
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
		 code : 'PROPERTY',
		 description : `인스턴스 생성시 RedAmbientLight['TYPE']값이 자동 주입됨`,
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