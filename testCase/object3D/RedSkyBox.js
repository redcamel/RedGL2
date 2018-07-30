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
			"RedSkyBox( redGL, srcList )",
			redTest("성공테스트 : 기본 생성 테스트", function (unit, title) {
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
			"RedSkyBox( <b>redGL</b>, srcList )",
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
			"RedSkyBox( redGL, <b>srcList</b> )",
			redTest("실패테스트 : 미입력", function (unit, title) {
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
			redTest("실패테스트 : srcList가 배열이 아닌경우", function (unit, title) {
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
			redTest("실패테스트 : srcList.length 가 6개가 아닌 경우", function (unit, title) {
				try {
					var t0 = RedSkyBox(tRedGL, ['1', '2', '3']);
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
			"(RedSkyBox Instance).<b>geometry</b> = value",
			redTest("성공테스트 : set 테스트", function (unit, title) {
				var tGeo = RedBox(tRedGL)
				var t0 = RedSkyBox(tRedGL, tSrcList);
				t0['geometry'] = tGeo
				unit.run(t0['geometry'] == tGeo)
			}, true),
			redTest("성공테스트 : set 테스트", function (unit, title) {
				var tGeo = RedBox(tRedGL)
				var t0 = RedSkyBox(tRedGL, tSrcList);
				t0['geometry'] = tGeo
				unit.run(t0['_geometry'] == tGeo)
			}, true),
			redTest("실패테스트 : set 테스트 : RedBox Instance가 아닌녀석을 지오메트리로 입력 할 경우", function (unit, title) {
				try {
					var tGeo = RedPlane(tRedGL)
					var t0 = RedSkyBox(tRedGL, tSrcList);
					t0['geometry'] = tGeo
					unit.run(t0['_geometry'] == tGeo)
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
			"(RedSkyBox Instance).<b>material</b> = value",
			redTest("성공테스트 : set 테스트", function (unit, title) {
				var tMaterial = RedSkyBoxMaterial(tRedGL, RedBitmapCubeTexture(tRedGL, tSrcList))
				var t0 = RedSkyBox(tRedGL, tSrcList);
				t0['material'] = tMaterial
				unit.run(t0['material'] == tMaterial)
			}, true),
			redTest("성공테스트 : set 테스트", function (unit, title) {
				var tMaterial = RedSkyBoxMaterial(tRedGL, RedBitmapCubeTexture(tRedGL, tSrcList))
				var t0 = RedSkyBox(tRedGL, tSrcList);
				t0['material'] = tMaterial
				unit.run(t0['_material'] == tMaterial)
			}, true),
			redTest("실패테스트 : set 테스트 : RedSkyBoxMaterial Instance가 아닌녀석을 재질로 입력 할 경우", function (unit, title) {
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
