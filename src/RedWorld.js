"use strict";
var RedWorld;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedWorld`,
		 description : `
			 RedWorld Instance 생성자.
			 RedWorld는 RedView를 소유하며 이는 렌더리스트로서 작동한다..
		 `,
		 example : `
			 RedGL(document.getElementById('test'), function(v){
				 // 성공,실패에 따라 v값이 true or false.
				 if(v){
					 // 월드 생성
					 this['world'] = RedWorld();
				 }else{
					 // 초기화실패
				 }
			 })
		 `,
		 return : 'RedWorld Instance'
	 }
	 :DOC*/
	RedWorld = function () {
		if ( !(this instanceof RedWorld) ) return new RedWorld();
		this['_viewList'] = [];
		this['_viewMap'] = {};
		this['_UUID'] = RedGL['makeUUID']();
		//Object.seal(this)
		console.log(this);
	};
	RedWorld.prototype = {
		/**DOC:
		 {
			 code:`METHOD`,
			 title :`addView`,
			 description : `
				 렌더정보 추가.
				 정상처리된다면 내부적으로 <b>RedView</b>이 생성됨.
			 `,
			 params : {
				 View :[
					 {type:'RedView'},
					 '추가할 RedView Instance'
				 ]
			 },
			 example : `
				 var tWorld = RedWorld()
				 tWorld.addView(RedView('testView',RedScene(),RedCamera()))
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
			 description : `고유키 기반 렌더정보 검색`,
			 params : {
				 key :[
					 {type:'String'},
					 '고유키'
				 ]
			 },
			 example : `
				 var tWorld = RedWorld();
				 tWorld.addView(RedView('testView',RedScene(),RedCamera()));
				 console.log(tWorld.getView('testView')) // testView 반환
				 tWorld.delView('testView');
				 console.log(tWorld.getView('testView')) // undefined
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
			 description : `렌더정보 삭제`,
			 params : {
				 key :[
					 {type:'String'},
					 '고유키'
				 ]
			 },
			 example : `
				 var tWorld = RedWorld();
				 tWorld.addView(RedView('testView',RedScene(),RedCamera()));
				 console.log(tWorld.getView('testView')) // testView 반환
				 tWorld.delView('testView');
				 console.log(tWorld.getView('testView')) // undefined
			`,
			 return : 'void'
		 }
		 :DOC*/
		delView: (function () {
			var t0, t1;
			return function (key) {
				typeof key == 'string' || RedGLUtil.throwFunc('RedWorld :delView 문자열만 허용함.', '입력값 : ' + key);
				if ( t0 = this['_viewMap'][key] ) {
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
			 description : `고유키 기반 렌더정보 존재여부`,
			 params : {
				 key :[
					 {type:'String'},
					 '고유키'
				 ]
			 },
			 example : `
				 var tWorld = RedWorld();
				 tWorld.addView(RedView('testView',RedScene(),RedCamera()));
				 console.log(tWorld.hasView('testView')) // true
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
				// TODO
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
