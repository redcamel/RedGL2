"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	var tSrcList = [
		'../../asset/cubemap/posx.png',
		'../../asset/cubemap/negx.png',
		'../../asset/cubemap/posy.png',
		'../../asset/cubemap/negy.png',
		'../../asset/cubemap/posz.png',
		'../../asset/cubemap/negz.png'
	]
	redSuite(
		"RedSkyBox 테스트",
		redGroup(
			"생성 확인",
			redTest("기본 생성 테스트", function (unit, title) {
				try {
					var t0 = RedSkyBox(tRedGL, tSrcList);
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
					var t0 = RedSkyBox(1, tSrcList);
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
			"인자확인 : geometry",
			redTest("미입력 했을경우 : 허용하지않음", function (unit, title) {
				try {
					var t0 = RedSkyBox(tRedGL);
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("srcList 가 배열이 아닌경우 : 실패테스트", function (unit, title) {
				try {
					var t0 = RedSkyBox(tRedGL, {});
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("srcList.length 가 6개가 아닌 경우 : 실패테스트", function (unit, title) {
				try {
					var t0 = RedSkyBox(tRedGL, ['1', '2', '3']);
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("set 테스트", function (unit, title) {
				var tMaterial = RedSkyBoxMaterial(tRedGL, RedBitmapCubeTexture(tRedGL, tSrcList))
				var t0 = RedSkyBox(tRedGL, tSrcList);
				t0['material'] = tMaterial
				unit.run(t0['material'] == tMaterial)
			}, true),
			redTest("set 테스트", function (unit, title) {
				var tMaterial = RedSkyBoxMaterial(tRedGL, RedBitmapCubeTexture(tRedGL, tSrcList))
				var t0 = RedSkyBox(tRedGL, tSrcList);
				t0['material'] = tMaterial
				unit.run(t0['_material'] == tMaterial)
			}, true),
			redTest("set 테스트 : RedSkyBoxMaterial Instance가 아닌녀석을 재질로 할 경우", function (unit, title) {
				try {
					var tMaterial = RedColorMaterial(tRedGL)
					var t0 = RedSkyBox(tRedGL, tSrcList);
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
