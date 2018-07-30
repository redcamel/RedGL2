"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	redSuite(
		"RedGrid 테스트",
		redGroup(
			"RedGrid( redGL, size, divisions, color1, color2 )",
			redTest("성공테스트 : 기본 생성 테스트", function (unit, title) {
				try {
					var t0 = RedGrid(tRedGL);
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true)
		),
		redGroup(
			"RedGrid( <b>redGL</b>, size, divisions, color1, color2 )",
			redTest("RedGL Instance만 허용하는지.", function (unit, title) {
				try {
					var t0 = RedGrid(1);
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"RedGrid( redGL, <b>size</b>, divisions, color1, color2 )",
			redTest("성공테스트 : 미입력일 경우 100로 설정되는지", function (unit, title) {
				var t0 = RedGrid(tRedGL);
				console.log(t0)
				unit.run(t0.size)
			}, 100),
			redTest("성공테스트 : 설정값확인", function (unit, title) {
				var t0 = RedGrid(tRedGL, 2);
				console.log(t0)
				unit.run(t0.size)
			}, 2),
			redTest("실패테스트 : 숫자가 아닌경우", function (unit, title) {
				try {
					var t0 = RedGrid(tRedGL, 'failTest');
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"RedGrid( redGL, size, <b>divisions</b>, color1, color2 )",
			redTest("성공테스트 : 미입력일 경우 100로 설정되는지", function (unit, title) {
				var t0 = RedGrid(tRedGL);
				console.log(t0)
				unit.run(t0.divisions)
			}, 100),
			redTest("성공테스트 : 설정값확인", function (unit, title) {
				var t0 = RedGrid(tRedGL, 100, 200);
				console.log(t0)
				unit.run(t0.divisions)
			}, 200),
			redTest("실패테스트 : 숫자가 아닌경우", function (unit, title) {
				try {
					var t0 = RedGrid(tRedGL, 100, 'failTest');
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"RedGrid( redGL, size, divisions, <b>color1</b>, color2 )",
			redTest("성공테스트 :  미입력시 초기값이 hex형태로 입력되어있는지", function (unit, title) {
				var t0 = RedGrid(tRedGL);
				console.log(t0)
				unit.run(RedGLUtil.regHex(t0.color1))
			}, true),
			redTest("실패테스트 : #xxxxxx or #xxx 만 허용 - 숫자입력시", function (unit, title) {
				try {
					RedGrid(tRedGL, 100, 100, 1);
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("실패테스트 : hexColor - #xxxxxx or #xxx 만 허용 - '#2233'", function (unit, title) {
				try {
					RedGrid(tRedGL, 100, 100, '#2233');
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("성공테스트 : #556677", function (unit, title) {
				var t0 = RedGrid(tRedGL, 100, 100, '#556677');
				unit.run(t0['color1'])
			}, '#556677'),
			redTest("성공테스트 : #556677", function (unit, title) {
				var t0 = RedGrid(tRedGL, 100, 100, '#556677');
				unit.run(t0['_color1'])
			}, '#556677'),
			redTest("성공테스트 : #fff", function (unit, title) {
				var t0 = RedGrid(tRedGL, 100, 100, '#fff');
				unit.run(t0['color1'])
			}, '#fff'),
			redTest("성공테스트 : #fff", function (unit, title) {
				var t0 = RedGrid(tRedGL, 100, 100, '#fff');
				unit.run(t0['_color1'])
			}, '#fff')
		),
		redGroup(
			"RedGrid( redGL, size, divisions, color1, <b>color2</b> )",
			redTest("성공테스트 :  미입력시 초기값이 hex형태로 입력되어있는지", function (unit, title) {
				var t0 = RedGrid(tRedGL);
				console.log(t0)
				unit.run(RedGLUtil.regHex(t0.color1))
			}, true),
			redTest("실패테스트 : #xxxxxx or #xxx 만 허용 - 숫자입력시", function (unit, title) {
				try {
					RedGrid(tRedGL, 100, 100, null, 1);
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("실패테스트 : hexColor - #xxxxxx or #xxx 만 허용 - '#2233'", function (unit, title) {
				try {
					RedGrid(tRedGL, 100, 100, null, '#2233');
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("성공테스트 : #556677", function (unit, title) {
				var t0 = RedGrid(tRedGL, 100, 100, null, '#556677');
				unit.run(t0['color2'])
			}, '#556677'),
			redTest("성공테스트 : #556677", function (unit, title) {
				var t0 = RedGrid(tRedGL, 100, 100, null, '#556677');
				unit.run(t0['_color2'])
			}, '#556677'),
			redTest("성공테스트 : #fff", function (unit, title) {
				var t0 = RedGrid(tRedGL, 100, 100, null, '#fff');
				unit.run(t0['color2'])
			}, '#fff'),
			redTest("성공테스트 : #fff", function (unit, title) {
				var t0 = RedGrid(tRedGL, 100, 100, null, '#fff');
				unit.run(t0['_color2'])
			}, '#fff')
		),
		// redGroup(
		// 	"(RedGrid Instance).<b>geometry</b> = value",
		//TODO: 정의해야함
		// ),
		redGroup(
			"(RedGrid Instance).<b>material</b> = value",
			redTest("성공테스트 : set 테스트", function (unit, title) {
				var tMaterial = RedGridMaterial(tRedGL)
				var t0 = RedGrid(tRedGL);
				t0['material'] = tMaterial
				unit.run(t0['material'] == tMaterial)
			}, true),
			redTest("성공테스트 : set 테스트", function (unit, title) {
				var tMaterial = RedGridMaterial(tRedGL)
				var t0 = RedGrid(tRedGL);
				t0['material'] = tMaterial
				unit.run(t0['_material'] == tMaterial)
			}, true),
			redTest("실패테스트 : set 테스트 : RedGridMaterial Instance가 아닌녀석을 재질로 입력 할 경우", function (unit, title) {
				try {
					var tMaterial = RedColorMaterial(tRedGL)
					var t0 = RedGrid(tRedGL);
					t0['material'] = tMaterial
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		)
	)
})
