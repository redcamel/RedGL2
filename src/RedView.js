/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.7.8 15:3
 */

"use strict";
var RedView;
(function () {
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedView`,
		 description : `
			 <b>RedScene</b>과 <b>RedCamera를</b> 쌍으로 하는 정보를 소유.
			 <b>RedWorld</b>에 등록되어지며 실제 렌더링시 필요한 그려질 <b>크기</b>와 <b>위치</b>를 결정한다.
		 `,
		 params : {
			 redGL : [
			    {type:'RedGL'},
			 ],
			 scene :[
				 {type:'RedScene'},
				 'RedScene Instance'
			 ],
			 camera :[
				 {type:'RedCamera'},
				 'RedCamera or RedController Instance'
			 ]
		 },
		 demo : '../example/etc/RedView.html',
		 example : `
			 var tWorld;
			 RedView( RedGL Instance, RedScene Instance, RedCamera Instance); // "테스트뷰1" 라는 키값을 가진 RedView 생성
			 RedView( RedGL Instance, RedScene Instance, RedCamera Instance); // "테스트뷰2" 라는 키값을 가진 RedView 생성
		 `,
		 return : 'RedView Instance'
	 }
	 :DOC*/
	RedView = function (redGL, scene, camera) {
		if (!(this instanceof RedView)) return new RedView(redGL, scene, camera);
		if (scene && !(scene instanceof RedScene)) RedGLUtil.throwFunc('RedView : RedScene Instance만 허용', '입력값 : ' + scene);
		if (camera) {
			if (camera && !(camera instanceof RedCamera) && !(camera instanceof RedBaseController)) RedGLUtil.throwFunc('RedView : RedCamera or XXController Instance만 허용');
		} else RedGLUtil.throwFunc('RedView : RedCamera or XXController Instance만 허용', '입력값 : ' + camera);
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`scene`,
			 description : `그려질 RedScene`,
			 return : 'RedScene'
		 }
		 :DOC*/
		this['scene'] = scene;
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`postEffectManager`,
			 description : `
				 포스트 이펙트 매니저.
				 RedView 생성시 기본적으로 생성되어있음.
			 `,
			 return : 'RedPostEffectManager Instance'
		 }
		 :DOC*/
		this['postEffectManager'] = RedPostEffectManager(redGL);
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`camera`,
			 description : `대상 RedScene을 관찰할 카메라`,
			 return : 'RedCamera or RedController'
		 }
		 :DOC*/
		this['camera'] = camera;
		this['_width'] = '100%';
		this['_height'] = '100%';
		this['_x'] = 0;
		this['_y'] = 0;
		this['_viewRect'] = [0, 0, 0, 0];
		this['_UUID'] = RedGL.makeUUID();
		console.log(this);
	};
	RedView.prototype = {
		/*DOC:
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
				  RedView('테스트뷰', RedGL Instance, RedScene Instance, RedCamera Instance); // "테스트뷰" 라는 키값을 가진 RedView 생성
				  RedView('테스트뷰').setSize(100,100); // 가로,세로 100px * 100px 설정
				  RedView('테스트뷰').setSize('50%',100); // 가로,세로 50% * 100px 설정 (RedGL이 소유하고 있는 캔버스 사이즈 기준으로 % 계산됨)
			 `,
			 return : 'void'
		 }
		 :DOC*/
		setSize: function (width, height) {
			if (width == undefined) RedGLUtil.throwFunc('RedView setSize : width가 입력되지 않았습니다.');
			if (height == undefined) RedGLUtil.throwFunc('RedView setSize : height가 입력되지 않았습니다.');
			if (typeof width == 'number') this['_width'] = width < 0 ? 0 : width;
			else {
				if (width.indexOf('%') > -1 && (+width.replace('%', '') >= 0)) this['_width'] = width;
				else RedGLUtil.throwFunc('RedView setSize : width는 0이상의 숫자나 %만 허용.', width);
			}
			if (typeof height == 'number') this['_height'] = height < 0 ? 0 : height;
			else {
				if (height.indexOf('%') > -1 && (+height.replace('%', '') >= 0)) this['_height'] = height;
				else RedGLUtil.throwFunc('RedView setSize : height는 0이상의 숫자나 %만 허용.', height);
			}
		},
		/*DOC:
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
				  RedView('테스트뷰', RedGL Instance, RedScene Instance, RedCamera Instance); // "테스트뷰" 라는 키값을 가진 RedView 생성
				  RedView('테스트뷰').setLocation(100,100); // x,y 100px * 100px 설정
				  RedView('테스트뷰').setLocation('50%',100); // x,y 50% * 100px 설정 (RedGL이 소유하고 있는 캔버스 사이즈 기준으로 % 계산됨)
			 `,
			 return : 'void'
		 }
		 :DOC*/
		setLocation: function (x, y) {
			if (x == undefined) RedGLUtil.throwFunc('RedView setLocation : x가 입력되지 않았습니다.');
			if (y == undefined) RedGLUtil.throwFunc('RedView setLocation : y가 입력되지 않았습니다.');
			if (typeof x == 'number') this['_x'] = x < 0 ? 0 : x;
			else {
				if (x.indexOf('%') > -1 && (+x.replace('%', '') >= 0)) this['_x'] = x;
				else RedGLUtil.throwFunc('RedView setLocation : x는 0이상의 숫자나 %만 허용.', x);
			}
			if (typeof y == 'number') this['_y'] = y < 0 ? 0 : y;
			else {
				if (y.indexOf('%') > -1 && (+y.replace('%', '') >= 0)) this['_y'] = y;
				else RedGLUtil.throwFunc('RedView setLocation : y는 0이상의 숫자나 %만 허용.', y);
			}
		}
	};
	Object.freeze(RedView);
})();
