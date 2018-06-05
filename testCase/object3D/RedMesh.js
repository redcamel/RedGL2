"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	redSuite(
		"RedMesh 테스트",
		redGroup(
			"생성 확인",
			redTest("기본 생성 테스트", function (unit, title) {
				try {
					var t0 = RedMesh(tRedGL, RedBox(tRedGL), RedColorMaterial(tRedGL));
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
					var t0 = RedMesh(1, RedBox(tRedGL), RedColorMaterial(tRedGL));
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
			redTest("미입력 했을경우 : 빈 메쉬를 활용할수도 있으므로 허용함.", function (unit, title) {
				try {
					var t0 = RedMesh(tRedGL, null, RedColorMaterial(tRedGL));
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("RedGeometry Intance가 아닌경우 : 실패테스트", function (unit, title) {
				try {
					var t0 = RedMesh(tRedGL, 1, RedColorMaterial(tRedGL));
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("get 테스트", function (unit, title) {
				var tGeometry = RedBox(tRedGL)
				var t0 = RedMesh(tRedGL, tGeometry, RedColorMaterial(tRedGL));
				unit.run(t0['geometry'] == tGeometry)
			}, true),
			redTest("get 테스트", function (unit, title) {
				var tGeometry = RedBox(tRedGL)
				var t0 = RedMesh(tRedGL, tGeometry, RedColorMaterial(tRedGL));
				unit.run(t0['_geometry'] == tGeometry)
			}, true),
			redTest("set 테스트", function (unit, title) {
				var tPlaneGeometry = RedPlane(tRedGL)
				var t0 = RedMesh(tRedGL, RedBox(tRedGL), RedColorMaterial(tRedGL));
				t0['geometry'] = tPlaneGeometry
				unit.run(t0['geometry'] == tPlaneGeometry)
			}, true),
			redTest("set 테스트", function (unit, title) {
				var tPlaneGeometry = RedPlane(tRedGL)
				var t0 = RedMesh(tRedGL, RedBox(tRedGL), RedColorMaterial(tRedGL));
				t0['geometry'] = tPlaneGeometry
				unit.run(t0['_geometry'] == tPlaneGeometry)
			}, true)
		),
		redGroup(
			"인자확인 : material",
			redTest("미입력 했을경우 : 허용함", function (unit, title) {
				try {
					var t0 = RedMesh(tRedGL, RedBox(tRedGL));
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("RedBaseMaterial Intance가 아닌경우 : 실패테스트", function (unit, title) {
				try {
					var t0 = RedMesh(tRedGL, RedBox(tRedGL), 1);
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("get 테스트", function (unit, title) {
				var tMaterial = RedColorMaterial(tRedGL)
				var t0 = RedMesh(tRedGL, RedBox(tRedGL), tMaterial);
				unit.run(t0['material'] == tMaterial)
			}, true),
			redTest("get 테스트", function (unit, title) {
				var tMaterial = RedColorMaterial(tRedGL)
				var t0 = RedMesh(tRedGL, RedBox(tRedGL), tMaterial);
				unit.run(t0['_material'] == tMaterial)
			}, true),
			redTest("set 테스트", function (unit, title) {
				var tMaterial = RedColorMaterial(tRedGL)
				var t0 = RedMesh(tRedGL, RedBox(tRedGL), RedColorMaterial(tRedGL));
				t0['material'] = tMaterial
				unit.run(t0['material'] == tMaterial)
			}, true),
			redTest("set 테스트", function (unit, title) {
				var tMaterial = RedColorMaterial(tRedGL)
				var t0 = RedMesh(tRedGL, RedBox(tRedGL), RedColorMaterial(tRedGL));
				t0['material'] = tMaterial
				unit.run(t0['_material'] == tMaterial)
			}, true)
		)
	)
})
