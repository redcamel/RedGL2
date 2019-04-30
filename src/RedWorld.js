/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
var RedWorld;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedWorld`,
		 description : `
			 RedWorld Instance 생성자.
			 RedGL Instance 에 설정가능함.
			 RedView 목록을 관리함.
			 RedWorld 내의 RedView 를 렌더링 대상으로 함.
		 `,
		 demo : '../example/etc/RedWorld.html',
		 example : `
			 RedWorld(); // RedWorld Instance 생성
		 `,
		 return : 'RedWorld Instance'
	 }
     :DOC*/
    RedWorld = function () {
        if (!(this instanceof RedWorld)) return new RedWorld();
        this['_viewList'] = [];
        this['_viewMap'] = {};
        this['_UUID'] = RedGL.makeUUID();
        //Object.seal(this)
        console.log(this);
    };
    RedWorld.prototype = {
        /**DOC:
         {
			 code:`METHOD`,
			 title :`addView`,
			 description : `getViewList`,
			 params : {
				 redView :[
					 {type:'RedView'},
					 '추가할 RedView Instance'
				 ]
			 },
			 example : `
				 var testWorld = RedWorld(); // 월드생성
				 var testView = RedView( '뷰이름', RedGL Instance, RedScene Instance, RedCamera Instance ); // 뷰생성
				 testWorld.addView( testView ); // 뷰등록
			`,
			 return : 'void'
		 }
         :DOC*/
        addView: function (redView) {
            redView instanceof RedView || RedGLUtil.throwFunc('RedWorld :addView Instance만 허용함.', '입력값 : ' + redView);
            this['_viewMap'][redView['key']] = redView;
            this['_viewList'].push(redView);
        },
        /**DOC:
         {
			 code:`METHOD`,
			 title :`getView`,
			 description : `고유키 기반 뷰 검색`,
			 params : {
				 key :[
					 {type:'String'},
					 '고유키'
				 ]
			 },
			 example : `
				 var testWorld = RedWorld(); // 월드생성
				 var testView = RedView( '뷰이름', RedGL Instance, RedScene Instance, RedCamera Instance ); // 뷰생성
				 testWorld.addView( testView ); // 뷰등록
				 console.log( testWorld.getView('뷰이름') ); // testView 반환
				 testWorld.delView('뷰이름');
				 console.log( testWorld.getView('뷰이름') ); // undefined 반환
			`,
			 return : 'RedView'
		 }
         :DOC*/
        getView: function (key) {
            typeof key == 'string' || RedGLUtil.throwFunc('RedWorld :getView 문자열만 허용함.', '입력값 : ' + key);
            return this['_viewMap'][key]
        },
        /**DOC:
         {
			 code:`METHOD`,
			 title :`delView`,
			 description : `고유키 기반 뷰 삭제`,
			 params : {
				 key :[
					 {type:'String'},
					 '고유키'
				 ]
			 },
			 example : `
				 var testWorld = RedWorld(); // 월드생성
				 var testView = RedView( '뷰이름', RedGL Instance, RedScene Instance, RedCamera Instance ); // 뷰생성
				 testWorld.addView( testView ); // 뷰등록
				 console.log( testWorld.getView('뷰이름') ); // testView 반환
				 testWorld.delView('뷰이름');
				 console.log( testWorld.getView('뷰이름') ); // undefined 반환
			`,
			 return : 'void'
		 }
         :DOC*/
        delView: (function () {
            var t0, t1;
            return function (key) {
                typeof key == 'string' || RedGLUtil.throwFunc('RedWorld :delView 문자열만 허용함.', '입력값 : ' + key);
                if (t0 = this['_viewMap'][key]) {
                    t1 = this['_viewList'].indexOf(t0);
                    this['_viewList'].splice(t1, 1);
                    delete this['_viewMap'][key];
                }
            }
        })(),
        /**DOC:
         {
			 code:`METHOD`,
			 title :`hasView`,
			 description : `고유키 기반 뷰 존재여부 반환.`,
			 params : {
				 key :[
					 {type:'String'},
					 '고유키'
				 ]
			 },
			 example : `
				 var testWorld = RedWorld(); // 월드생성
				 var testView = RedView( '뷰이름', RedGL Instance, RedScene Instance, RedCamera Instance ); // 뷰생성
				 testWorld.addView( testView ); // 뷰등록
				 console.log(testWorld.hasView('뷰이름')) // true 반환
			`,
			 return : 'Boolean'
		 }
         :DOC*/
        hasView: function (key) {
            typeof key == 'string' || RedGLUtil.throwFunc('RedWorld :hasView 문자열만 허용함.', '입력값 : ' + key);
            return this['_viewMap'][key] ? true : false;
        },
        /**DOC:
         {
			 code:`METHOD`,
			 title :`getViewList`,
			 description : `고유키 기반 렌더정보 검색`,
			 params : {
				 key :[
					 {type:'String'},
					 '고유키'
				 ]
			 },
			 example : `
				 var testWorld = RedWorld(); // 월드생성
				 var testView = RedView( '뷰이름', RedGL Instance, RedScene Instance, RedCamera Instance ); // 뷰생성
				 var testView2 = RedView( '뷰이름2', RedGL Instance, RedScene Instance, RedCamera Instance ); // 뷰생성
				 testWorld.addView( testView ); // 뷰등록
				 testWorld.addView( testView2 ); // 뷰등록
				 console.log(testWorld.getViewList()); // 뷰리스트 반환
			`,
			 return : 'Array'
		 }
         :DOC*/
        getViewList: function () {
            return this['_viewList'].concat();
        }
    };
    Object.freeze(RedWorld);
})();
