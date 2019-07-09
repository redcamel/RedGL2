/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.7.8 16:20
 */

"use strict";
var RedWorld;
(function () {
	/*DOC:
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
		/*DOC:
		 {
			 code:`METHOD`,
			 title :`addView`,
			 description : `getViewList`,
			 params : {
				 redView :[
					 {type:'RedView'},
					 '추가할 RedView Instance'
				 ],
				 key :[
					 {type:'String'},
					 '키 등록시 고유키로 동작하고 미등록시 무시함'
				 ]
			 },
			 example : `
				 var testWorld = RedWorld(); // 월드생성
				 var testView = RedView( RedGL Instance, RedScene Instance, RedCamera Instance ); // 뷰생성
				 testWorld.addView( testView ); // 뷰등록
			`,
			 return : 'void'
		 }
		 :DOC*/
		addView: function (redView, key) {
			redView instanceof RedView || RedGLUtil.throwFunc('RedWorld :addView Instance만 허용함.', '입력값 : ' + redView);
			if (key) {
				if(this['_viewMap'][key]){
					RedGLUtil.throwFunc('RedWorld :key 중복', '입력값 : ' + key);
				}else{
					this['_viewMap'][key] = redView;
				}
			}
			this['_viewList'].push(redView);
		},
		/*DOC:
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
				 var testView = RedView( RedGL Instance, RedScene Instance, RedCamera Instance ); // 뷰생성
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
		/*DOC:
		 {
			 code:`METHOD`,
			 title :`delView`,
			 description : `고유키 기반 or RedView 인스턴스 기반 뷰 삭제`,
			 params : {
				 value :[
					 {type:'String or RedView'},
					 '고유키'
				 ]
			 },
			 example : `
				 var testWorld = RedWorld(); // 월드생성
				 var testView = RedView( RedGL Instance, RedScene Instance, RedCamera Instance ); // 뷰생성
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
			return function (value) {
				if (!(typeof value == 'string' || value instanceof RedView)) RedGLUtil.throwFunc('RedWorld :delView 문자열이나 RedView 만 허용함.', '입력값 : ' + value);
				if (typeof value == 'string') {
					if (t0 = this['_viewMap'][value]) {
						t1 = this['_viewList'].indexOf(t0);
						this['_viewList'].splice(t1, 1);
						delete this['_viewMap'][value];
					}
				} else {
					t1 = this['_viewList'].indexOf(value);
					this['_viewList'].splice(t1, 1);
					for(var k in this['_viewMap']){
						if(this['_viewMap'][k] == value) delete this['_viewMap'][k];
					}
				}

			}
		})(),
		/*DOC:
		 {
			 code:`METHOD`,
			 title :`hasView`,
			 description : `고유키 기반 or RedView 인스턴스 기반 존재여부 반환.`,
			 params : {
				 value :[
					 {type:'String'},
					 '고유키'
				 ]
			 },
			 example : `
				 var testWorld = RedWorld(); // 월드생성
				 var testView = RedView( RedGL Instance, RedScene Instance, RedCamera Instance ); // 뷰생성
				 testWorld.addView( testView ); // 뷰등록
				 console.log(testWorld.hasView('뷰이름')) // true 반환
			`,
			 return : 'Boolean'
		 }
		 :DOC*/
		hasView: function (value) {
			if (!(typeof value == 'string' || value instanceof RedView)) RedGLUtil.throwFunc('RedWorld :hasView 문자열이나 RedView 만 허용함.', '입력값 : ' + value);
			if(typeof value == 'string' ){
				return this['_viewMap'][value] ? true : false;
			}else{
				var t1 = this['_viewList'].indexOf(value);
				return this['_viewList'][t1] ? true : false;
			}

		},
		/*DOC:
		 {
			 code:`METHOD`,
			 title :`getViewList`,
			 description : `고유키 기반 렌더정보 검색`,
			 params : {
				 value :[
					 {type:'String'},
					 '고유키'
				 ]
			 },
			 example : `
				 var testWorld = RedWorld(); // 월드생성
				 var testView = RedView( RedGL Instance, RedScene Instance, RedCamera Instance ); // 뷰생성
				 var testView2 = RedView(  RedGL Instance, RedScene Instance, RedCamera Instance ); // 뷰생성
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
