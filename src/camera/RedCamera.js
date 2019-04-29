/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var RedCamera;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedCamera`,
		 description : `
			 RedCamera Instance 생성자.
		 `,
		 demo : '../example/camera/RedCamera.html',
		 example : `
			 RedCamera()
		 `,
		 return : 'RedCamera Instance'
	 }
     :DOC*/
    RedCamera = function () {
        if (!(this instanceof RedCamera)) return new RedCamera();
        /**DOC:
         {
			 code:`PROPERTY`,
			 title :`x`,
			 description : `기본값 : 0`,
			 return : 'Number'
		 }
         :DOC*/
        /**DOC:
         {
			 code:`PROPERTY`,
			 title :`y`,
			 description : `기본값 : 0`,
			 return : 'Number'
		 }
         :DOC*/
        /**DOC:
         {
			 code:`PROPERTY`,
			 title :`z`,
			 description : `기본값 : 0`,
			 return : 'Number'
		 }
         :DOC*/
        this['x'] = this['y'] = this['z'] = 0;
        /**DOC:
         {
			 code:`PROPERTY`,
			 title :`targetX`,
			 description : `
			 카메라가 바라볼 X위치
			 기본값 : 0
			 `,
			 return : 'Number'
		 }
         :DOC*/
        /**DOC:
         {
			 code:`PROPERTY`,
			 title :`targetY`,
			 description : `
			 카메라가 바라볼 Y위치
			 기본값 : 0
			 `,
			 return : 'Number'
		 }
         :DOC*/
        /**DOC:
         {
			 code:`PROPERTY`,
			 title :`targetZ`,
			 description : `
			 카메라가 바라볼 Z위치
			 기본값 : 0
			 `,
			 return : 'Number'
		 }
         :DOC*/
        this['targetX'] = this['targetY'] = this['targetZ'] = 0;
        /**DOC:
         {
			 code:`PROPERTY`,
			 title :`fov`,
			 description : `기본값 : 45degree`,
			 return : 'Number'
		 }
         :DOC*/
        this['fov'] = 60;
        /**DOC:
         {
			 code:`PROPERTY`,
			 title :`nearClipping`,
			 description : `기본값 : 0.1`,
			 return : 'Number'
		 }
         :DOC*/
        this['nearClipping'] = 0.1;
        /**DOC:
         {
			 code:`PROPERTY`,
			 title :`farClipping`,
			 description : `기본값 : 100000`,
			 return : 'Number'
		 }
         :DOC*/
        this['farClipping'] = 100000;
        /**DOC:
         {
			 code:`PROPERTY`,
			 title :`orthographicYn`,
			 description : `기본값 : false`,
			 return : 'Boolean'
		 }
         :DOC*/
        this['orthographicYn'] = false;
        /**DOC:
         {
			 code:`PROPERTY`,
			 title :`matrix`,
			 description : `
			 카메라 매트릭스
			 `,
			 return : 'mat4'
		 }
         :DOC*/
        this['matrix'] = mat4.create();
        /**DOC:
         {
			 code:`PROPERTY`,
			 title :`perspectiveMTX`,
			 description : `
			 orthographicYn값에따라 렌더링시 퍼스펙티브 or 오쏘고날 매트릭스로 자동 변경됨
			 `,
			 return : 'mat4'
		 }
         :DOC*/
        this['perspectiveMTX'] = mat4.create();
        this['autoUpdateMatrix'] = true;
        this['_UUID'] = RedGL.makeUUID();
    };
    RedCamera.prototype['update'] = function () {
        this.lookAt(this['targetX'], this['targetY'], this['targetZ']);
    };
    /**DOC:
     {
		 code:`PROPERTY`,
		 title :`lookAt`,
		 description : `
			 대상 위치를 바라보도록 matrix 설정.
			 실행시 targetX, targetY, targetZ, matrix가 변경됨.
		 `,
		 params : {
			 x : [{type : "Number"}],
			 y : [{type : "Number"}],
			 z : [{type : "Number"}]
		 },
		 example:`
		    RedCamera().lookAt(0,0,0); // 0,0,0을 바라보도록 설정
		 `,
		 return : 'mat4'
	 }
     :DOC*/
    RedCamera.prototype['lookAt'] = (function () {
        var up = new Float32Array([0, 1, 0]);
        var tPosition = [];
        return function (x, y, z) {
            tPosition[0] = this['targetX'] = x;
            tPosition[1] = this['targetY'] = y;
            tPosition[2] = this['targetZ'] = z;
            //out, eye, center, up
            mat4.identity(this['matrix']);
            mat4.lookAt(this['matrix'], [this.x, this.y, this.z], tPosition, up);
        }
    })();
    Object.freeze(RedCamera);
})();
