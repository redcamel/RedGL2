"use strict";
RedGL(document.createElement('canvas'), function () {
	var tWorld, tScene, tCamera;
	var tView1, tView2;
	tWorld = new RedWorld();
	console.log(this)
	tScene = new RedScene(this);
	tCamera = new RedCamera();
	tView1 = new RedView("test_1", this, tScene, tCamera)
	tView2 = new RedView("test_2", this, tScene, tCamera)
	redSuite(
		"RedWorld Test",
		redGroup(
			"생성 확인",
			redTest("new 생성확인", function (unit, title) {
				unit.run(new RedWorld() instanceof RedWorld)
			}, true),
			redTest("함수실행 생성확인", function (unit, title) {
				unit.run(RedWorld() instanceof RedWorld)
			}, true)
		),
		redGroup(
			"RedView 관리 확인 - addView",
			redTest("addView - RedView Instance 만 허용하는지 체크", function (unit, title) {
				try {
					tWorld.addView(tView1)
					tWorld.addView(tView2)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("addView - RedView Instance 만 허용하는지 체크 : 숫자입력시 에러확인", function (unit, title) {
				try {
					tWorld.addView(1)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("addView - RedView Instance 만 허용하는지 체크 : 문자입력시 에러확인", function (unit, title) {
				try {
					tWorld.addView('문자')
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"RedView 관리 확인 - getView ",
			redTest("getView : 키는 문자열만 허용", function (unit, title) {
				try {
					tWorld.getView(1)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("getView : 존재하는 키로 검색할경우", function (unit, title) {
				unit.run(tWorld.getView("test_1")['key'])
			}, 'test_1'),
			redTest("getView : 존재하는 키로 검색할경우2", function (unit, title) {
				unit.run(tWorld.getView("test_2")['key'])
			}, 'test_2'),
			redTest("getView : 존재하지 않는 키로 검색할경우", function (unit, title) {
				unit.run(tWorld.getView("없는키"))
			}, undefined)
		),
		redGroup(
			"RedView 관리 확인 - hasView ",
			redTest("hasView : 키는 문자열만 허용", function (unit, title) {
				try {
					tWorld.hasView(1)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("hasView : 존재하는 키로 검색할경우", function (unit, title) {
				unit.run(tWorld.hasView("test_2"))
			}, true),
			redTest("hasView : 존재하지 않는  키로 검색할경우", function (unit, title) {
				unit.run(tWorld.hasView("없는키"))
			}, false)
		),
		redGroup(
			"RedView 관리 확인 - delView ",
			redTest("delView : 키는 문자열만 허용", function (unit, title) {
				try {
					tWorld.delView(1)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("delView : 존재하는 키로 삭제시도", function (unit, title) {
				tWorld.delView("test_1")
				unit.run(tWorld.getView("test_1"))
			}, undefined),
			redTest("hasView : 잘 삭제되었는지 확인", function (unit, title) {
				unit.run(tWorld.hasView("test_1"))
			}, false),
			redTest("getViewList", function (unit, title) {
				unit.run(tWorld.getViewList()[0] == tView2)
			}, true)
		)
	)
})
