"use strict";
RedGL(document.createElement('canvas'), function (v) {
	redSuite(
		"RedInterleaveInfo Test",
		redGroup(
			"생성 확인",
			redTest("기본 생성 테스트", function (unit, title) {
				try {
					var t0 = RedInterleaveInfo('aTest', 3);
					console.log(t0)
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true)
		),
		redGroup(
			"attributeKey 인자 확인",
			redTest("attributeKey 설정 확인", function (unit, title) {
				var t0 = RedInterleaveInfo('aTest', 3);
				console.log(t0)
				unit.run(t0['attributeKey'])
			}, 'aTest'),
			redTest("attributeKey 인자 형식확인 : 문자만허용", function (unit, title) {
				try {
					var t0 = RedInterleaveInfo(1, 3);
					console.log(t0)
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("attributeKey 인자 형식확인 : 첫 글자는 소문자 a만 허용", function (unit, title) {
				try {
					var t0 = RedInterleaveInfo('ATest', 3);
					console.log(t0)
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("attributeKey 인자 형식확인 : 두번째 글자는 대문자만 허용", function (unit, title) {
				try {
					var t0 = RedInterleaveInfo('Atest', 3);
					console.log(t0)
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			'size 인자 확인',
			redTest("size 설정 확인", function (unit, title) {
				var t0 = RedInterleaveInfo('aTest', 3);
				console.log(t0)
				unit.run(t0['size'])
			}, 3),
			redTest("size 인자 형식확인 : 숫자만허용", function (unit, title) {
				try {
					var t0 = RedInterleaveInfo('aTest', 3);
					console.log(t0)
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("size 인자 형식확인 : 숫자만허용", function (unit, title) {
				try {
					var t0 = RedInterleaveInfo('aTest', 'aaa');
					console.log(t0)
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			'normalize 인자 확인',
			redTest("normalize 기본값 확인", function (unit, title) {
				var t0 = RedInterleaveInfo('aTest', 3);
				console.log(t0)
				unit.run(t0['normalize'])
			}, false),
			redTest("normalize 설정 확인", function (unit, title) {
				var t0 = RedInterleaveInfo('aTest', 3, true);
				console.log(t0)
				unit.run(t0['normalize'])
			}, true)
		)
	)
})
