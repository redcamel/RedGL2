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
			redTest("성공테스트 : new 생성", function (unit, title) {
				unit.run(new RedWorld() instanceof RedWorld)
			}, true),
			redTest("성공테스트  : 함수실행 생성확인", function (unit, title) {
				unit.run(RedWorld() instanceof RedWorld)
			}, true)
		),
		redGroup(
			"(RedWorld Instance).addView( <b>redView</b> )",
			redTest("성공테스트 - RedView Instance 만 허용하는지 체크", function (unit, title) {
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
			redTest("실패테스트 : 숫자입력시 에러확인", function (unit, title) {
				try {
					tWorld.addView(1)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("실패테스트 : 문자입력시 에러확인", function (unit, title) {
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
			"(RedWorld Instance).getView( <b>key</b> )",
			redTest("실패테스트 : 키는 문자열만 허용", function (unit, title) {
				try {
					tWorld.getView(1)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("성공테스트 : 존재하는 키로 검색할경우", function (unit, title) {
				unit.run(tWorld.getView("test_1")['key'])
			}, 'test_1'),
			redTest("성공테스트 : 존재하는 키로 검색할경우2", function (unit, title) {
				unit.run(tWorld.getView("test_2")['key'])
			}, 'test_2'),
			redTest("실패테스트 : 존재하지 않는 키로 검색할경우", function (unit, title) {
				unit.run(tWorld.getView("없는키"))
			}, undefined)
		),
		redGroup(
			"(RedWorld Instance).hasView( <b>key</b> )",
			redTest("실패테스트 : 키는 문자열만 허용", function (unit, title) {
				try {
					tWorld.hasView(1)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("성공테스트 : 존재하는 키로 검색할경우", function (unit, title) {
				unit.run(tWorld.hasView("test_2"))
			}, true),
			redTest("실패테스트 : 존재하지 않는  키로 검색할경우", function (unit, title) {
				unit.run(tWorld.hasView("없는키"))
			}, false)
		),
		redGroup(
			"(RedWorld Instance).delView( <b>key</b> )",
			redTest("실패테스트 : 키는 문자열만 허용", function (unit, title) {
				try {
					tWorld.delView(1)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("성공테스트 : 존재하는 키로 삭제시도", function (unit, title) {
				tWorld.delView("test_1")
				unit.run(tWorld.getView("test_1"))
			}, undefined),
			redTest("hasView : 잘 삭제되었는지 확인", function (unit, title) {
				unit.run(tWorld.hasView("test_1"))
			}, false),
			redTest("getViewList : 리스트가 잘관리 되는지 확인", function (unit, title) {
				unit.run(tWorld.getViewList()[0] == tView2)
			}, true)
		)
	)
})
