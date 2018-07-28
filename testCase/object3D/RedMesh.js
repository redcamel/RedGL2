"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	redSuite(
		"RedMesh 테스트",
		redGroup(
			"RedMesh( redGL, geometry, material )",
			redTest("성공테스트 : 기본 생성 테스트", function (unit, title) {
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
			"RedMesh( <b>redGL</b>, geometry, material )",
			redTest("실패테스트 : RedGL Instance만 허용하는지.", function (unit, title) {
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
			"RedMesh( redGL, <b>geometry</b>, material )",
			redTest("성공테스트 : 미입력 했을경우 : 빈 메쉬를 활용할수도 있으므로 허용함.", function (unit, title) {
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
			redTest("실패테스트 : RedGeometry Instance가 아닌경우 ", function (unit, title) {
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
			redTest("성공테스트 : get 테스트", function (unit, title) {
				var tGeometry = RedBox(tRedGL)
				var t0 = RedMesh(tRedGL, tGeometry, RedColorMaterial(tRedGL));
				unit.run(t0['geometry'] == tGeometry)
			}, true),
			redTest("성공테스트 : get 테스트", function (unit, title) {
				var tGeometry = RedBox(tRedGL)
				var t0 = RedMesh(tRedGL, tGeometry, RedColorMaterial(tRedGL));
				unit.run(t0['_geometry'] == tGeometry)
			}, true),
			redTest("성공테스트 : set 테스트", function (unit, title) {
				var tPlaneGeometry = RedPlane(tRedGL)
				var t0 = RedMesh(tRedGL, RedBox(tRedGL), RedColorMaterial(tRedGL));
				t0['geometry'] = tPlaneGeometry
				unit.run(t0['geometry'] == tPlaneGeometry)
			}, true),
			redTest("성공테스트 : set 테스트", function (unit, title) {
				var tPlaneGeometry = RedPlane(tRedGL)
				var t0 = RedMesh(tRedGL, RedBox(tRedGL), RedColorMaterial(tRedGL));
				t0['geometry'] = tPlaneGeometry
				unit.run(t0['_geometry'] == tPlaneGeometry)
			}, true)
		),
		redGroup(
			"RedMesh( redGL, geometry, <b>material</b> )",
			redTest("성공테스트 : 미입력 허용함 - 지오메트리 계산만 하고싶을수도 있으니까..(뼈대같은거)", function (unit, title) {
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
			redTest("실패테스트 : RedBaseMaterial Instance가 아닌경우", function (unit, title) {
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
			redTest("성공테스트 : get 테스트", function (unit, title) {
				var tMaterial = RedColorMaterial(tRedGL)
				var t0 = RedMesh(tRedGL, RedBox(tRedGL), tMaterial);
				unit.run(t0['material'] == tMaterial)
			}, true),
			redTest("성공테스트 : get 테스트", function (unit, title) {
				var tMaterial = RedColorMaterial(tRedGL)
				var t0 = RedMesh(tRedGL, RedBox(tRedGL), tMaterial);
				unit.run(t0['_material'] == tMaterial)
			}, true),
			redTest("성공테스트 : set 테스트", function (unit, title) {
				var tMaterial = RedColorMaterial(tRedGL)
				var t0 = RedMesh(tRedGL, RedBox(tRedGL), RedColorMaterial(tRedGL));
				t0['material'] = tMaterial
				unit.run(t0['material'] == tMaterial)
			}, true),
			redTest("성공테스트 : set 테스트", function (unit, title) {
				var tMaterial = RedColorMaterial(tRedGL)
				var t0 = RedMesh(tRedGL, RedBox(tRedGL), RedColorMaterial(tRedGL));
				t0['material'] = tMaterial
				unit.run(t0['_material'] == tMaterial)
			}, true)
		)
	)
})
