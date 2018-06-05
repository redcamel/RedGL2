"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	var tMaterial = RedColorMaterial(tRedGL)
	redSuite(
		"RedSprite3D 테스트",
		redGroup(
			"생성 확인",
			redTest("기본 생성 테스트", function (unit, title) {
				try {
					var t0 = RedSprite3D(tRedGL, tMaterial);
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
			"인자확인 : redGL",
			redTest("RedGL Instance만 허용하는지.", function (unit, title) {
				try {
					var t0 = RedSprite3D(1, tMaterial);
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
			"인자확인 : mateiral",
			redTest("미입력 했을경우 : 허용하지않음", function (unit, title) {
				try {
					var t0 = RedSprite3D(tRedGL);
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("mateiral 가 RedColorMaterial or RedBitmapMaterial이 아닌경우: 실패테스트", function (unit, title) {
				try {
					var t0 = RedSprite3D(tRedGL, {});
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("mateiral가 문자가 아닌경우 : 실패테스트", function (unit, title) {
				try {
					var t0 = RedSprite3D(tRedGL, 1);
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("set 테스트", function (unit, title) {
				var tBitmapMaterial = RedBitmapMaterial(tRedGL, RedBitmapTexture(tRedGL, '../../asset/alphaTest.png'))
				var t0 = RedSprite3D(tRedGL, tMaterial);
				t0['material'] = tBitmapMaterial
				unit.run(t0['material'] == tBitmapMaterial)
			}, true),
			redTest("set 테스트", function (unit, title) {
				var tBitmapMaterial = RedBitmapMaterial(tRedGL, RedBitmapTexture(tRedGL, '../../asset/alphaTest.png'))
				var t0 = RedSprite3D(tRedGL, tMaterial);
				t0['material'] = tBitmapMaterial
				unit.run(t0['_material'] == tBitmapMaterial)
			}, true),
			redTest("set 테스트 : RedColorMaterial or RedBitmapMaterial Instance가 아닌녀석을 재질로 할 경우", function (unit, title) {
				try {
					var tMaterial = RedStandardMaterial(tRedGL, RedBitmapTexture(tRedGL, '../../asset/alphaTest.png'))
					var t0 = RedSprite3D(tRedGL, tMaterial);
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
