"use strict";
var RedView;
(function () {
	var ViewMap;
	ViewMap = {};
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedView`,
		 description : `
			 고유 키를 기반으로 <b>RedScene</b>과 <b>RedCamera를</b> 쌍으로 하는 정보를 소유.
			 <b>RedWorld</b>에 등록되어지며 실제 렌더링시 필요한 그려질 크기와 위치를 결정한다.
		 `,
		 params : {
			 key :[
				 {type:'String'},
				 '고유키',
				 '기존에 존재하는 키일경우 <b>캐쉬된 Instance</b>를 반환'
			 ],
			 redGL : [
			    {type:'RedGL'},
			 ],
			 scene :[
				 {type:'RedScene'},
				 'RedScene'
			 ],
			 camera :[
				 {type:'RedCamera'},
				 'RedCamera'
			 ]
		 },
		 example : `
			 var tWorld;
			 RedView('test', RedGL Instance, RedScene Instance, RedCamera Instance); // test라는 키값을 가진 RedView 생성
			 RedView('test2',RedGL Instance, RedScene Instance, RedCamera Instance); // test2라는 키값을 가진 RedView 생성
		 `,
		 return : 'RedView Instance'
	 }
	 :DOC*/
	RedView = function (key, redGL, scene, camera) {
		if ( ViewMap[key] ) {
			if ( scene || camera ) RedGLUtil.throwFunc('RedView : ' + key, '는 이미 생성된 RedView key입니다.', '입력값 : ' + key);
			else return ViewMap[key];
		}
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedScene : RedGL Instance만 허용.', redGL);
		if ( !(this instanceof RedView) ) return new RedView(key, redGL, scene, camera);
		typeof key == 'string' || RedGLUtil.throwFunc('RedView : key : 문자열만 허용', '입력값 : ' + key);
		if ( !scene && !camera ) RedGLUtil.throwFunc('RedView : 존재하지 않는 key입니다.', '입력값 : ' + key);
		if ( scene && !(scene instanceof RedScene) ) RedGLUtil.throwFunc('RedView : RedScene Instance만 허용', '입력값 : ' + scene);
		if ( camera ) {
			if ( camera && !(camera instanceof RedCamera) && !(camera instanceof RedBaseController) ) RedGLUtil.throwFunc('RedView : RedCamera or XXController Instance만 허용');
		}
		else RedGLUtil.throwFunc('RedView : RedCamera or XXController Instance만 허용', '입력값 : ' + camera);
		/**DOC:
		 {
		     code : 'PROPERTY',
			 title :`key`,
			 description : `고유키`,
			 return : 'String'
		 }
		 :DOC*/
		this['key'] = key;
		/**DOC:
		 {
		     code : 'PROPERTY',
			 title :`scene`,
			 description : `scene`,
			 return : 'RedScene'
		 }
		 :DOC*/
		this['scene'] = scene;
		/**DOC:
		 {
		     code : 'PROPERTY',
			 title :`postEffectManager`,
			 description : `
				 postEffectManager
			 `,
			 return : 'RedPostEffectManager Instance'
		 }
		 :DOC*/
		this['postEffectManager'] = RedPostEffectManager(redGL);
		/**DOC:
		 {
		     code : 'PROPERTY',
			 title :`camera`,
			 description : `camera`,
			 return : 'RedCamera'
		 }
		 :DOC*/
		this['camera'] = camera;
		this['_width'] = '100%';
		this['_height'] = '100%';
		this['_x'] = 0;
		this['_y'] = 0;
		this['_viewRect'] = [0, 0, 0, 0];
		ViewMap[key] = this;
		console.log(this);
	};
	RedView.prototype = {
		/**DOC:
		 {
			 code : 'METHOD',
			 title :`setSize`,
			 description : `
				  씬의 사이즈를 결정.
				  px, % 단위를 받음.
			 `,
			 params : {
			    width : [
			        { type : 'Number or %' }
			    ],
			    height : [
			        { type : 'Number or %' }
			    ]
			 },
			 example : `
				  var tWorld;
				  RedView('test', RedGL Instance, RedScene Instance, RedCamera Instance); // test라는 키값을 가진 RedView 생성
				  RedView('test').setSize(100,100);
				  RedView('test').setSize('50%',100);
			 `,
			 return : 'void'
		 }
		 :DOC*/
		setSize: function (width, height) {
			if ( width == undefined ) RedGLUtil.throwFunc('RedView setSize : width가 입력되지 않았습니다.');
			if ( height == undefined ) RedGLUtil.throwFunc('RedView setSize : height가 입력되지 않았습니다.');
			if ( typeof width == 'number' ) this['_width'] = width < 0 ? 0 : width;
			else {
				if ( width.indexOf('%') > -1 && (+width.replace('%', '') >= 0) ) this['_width'] = width;
				else RedGLUtil.throwFunc('RedView setSize : width는 0이상의 숫자나 %만 허용.', width);
			}
			if ( typeof height == 'number' ) this['_height'] = height < 0 ? 0 : height;
			else {
				if ( height.indexOf('%') > -1 && (+height.replace('%', '') >= 0) ) this['_height'] = height;
				else RedGLUtil.throwFunc('RedView setSize : height는 0이상의 숫자나 %만 허용.', height);
			}
		},
		/**DOC:
		 {
			 code : 'METHOD',
			 title :`setLocation`,
			 description : `
				 씬의 위치를 결정.
				 px, % 단위를 받음.
			 `,
			 params : {
			    x : [
			        { type : 'Number or %' }
			    ],
			    y : [
			        { type : 'Number or %' }
			    ]
			 },
			 example : `
				  var tWorld;
				  tCamera = RedCamera(); // 카메라생성
				  RedView('test', RedGL Instance, RedScene Instance, RedCamera Instance); // test라는 키값을 가진 RedView 생성
				  RedView('test').setLocation(100,100);
				  RedView('test').setLocation('50%',100);
			 `,
			 return : 'void'
		 }
		 :DOC*/
		setLocation: function (x, y) {
			if ( x == undefined ) RedGLUtil.throwFunc('RedView setLocation : x가 입력되지 않았습니다.');
			if ( y == undefined ) RedGLUtil.throwFunc('RedView setLocation : y가 입력되지 않았습니다.');
			if ( typeof x == 'number' ) this['_x'] = x < 0 ? 0 : x;
			else {
				if ( x.indexOf('%') > -1 && (+x.replace('%', '') >= 0) ) this['_x'] = x;
				else RedGLUtil.throwFunc('RedView setLocation : x는 0이상의 숫자나 %만 허용.', x);
			}
			if ( typeof y == 'number' ) this['_y'] = y < 0 ? 0 : y;
			else {
				if ( y.indexOf('%') > -1 && (+y.replace('%', '') >= 0) ) this['_y'] = y;
				else RedGLUtil.throwFunc('RedView setLocation : y는 0이상의 숫자나 %만 허용.', y);
			}
		}
	};
	Object.freeze(RedView);
})();
