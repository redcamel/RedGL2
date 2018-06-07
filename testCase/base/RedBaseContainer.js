"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	redSuite(
		"RedBaseContainer Method 테스트",
		redGroup(
			"생성 확인",
			redTest("기본 생성 테스트", function (unit, title) {
				try {
					var t0 = new RedMesh(tRedGL);
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
			"addChild",
			redTest("RedBaseObject3D Instance만 허용하는지.", function (unit, title) {
				try {
					var t0 = new RedMesh(tRedGL);
					t0.addChild(RedMesh(tRedGL))
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("RedBaseObject3D Instance만 허용하는지 : 실패테스트(숫자입력)", function (unit, title) {
				try {
					var t0 = new RedMesh(tRedGL);
					t0.addChild(1)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"addChildAt",
			redTest("RedBaseObject3D Instance만 허용하는지.", function (unit, title) {
				try {
					var t0 = new RedMesh(tRedGL);
					t0.addChildAt(RedMesh(tRedGL), 0)
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("RedBaseObject3D Instance만 허용하는지 : 실패테스트(숫자입력)", function (unit, title) {
				try {
					var t0 = new RedMesh(tRedGL);
					t0.addChildAt(1, 1)
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("index위치에 정확히 들어가는지", function (unit, title) {
				var t0 = new RedMesh(tRedGL);
				var t1 = RedLine(tRedGL, RedColorMaterial(tRedGL));
				t0.addChild(RedMesh(tRedGL));
				t0.addChild(RedMesh(tRedGL));
				t0.addChild(RedMesh(tRedGL));
				t0.addChild(RedMesh(tRedGL));
				t0.addChildAt(t1, 2);
				console.log(t0);
				unit.run(t0['children'][2] == t1);
			}, true),
			redTest("index위치에 정확히 들어가는지", function (unit, title) {
				var t0 = new RedMesh(tRedGL);
				var t1 = RedLine(tRedGL, RedColorMaterial(tRedGL));
				t0.addChild(RedMesh(tRedGL));
				t0.addChild(RedMesh(tRedGL));
				t0.addChild(RedMesh(tRedGL));
				t0.addChild(RedMesh(tRedGL));
				t0.addChildAt(t1, 4);
				console.log(t0);
				unit.run(t0['children'][4] == t1);
			}, true),
			redTest("추가후 기존자식들은 유지하면서 길이가 늘어나는지", function (unit, title) {
				var t0 = new RedMesh(tRedGL);
				var t1 = RedLine(tRedGL, RedColorMaterial(tRedGL));
				t0.addChild(RedMesh(tRedGL));
				t0.addChild(RedMesh(tRedGL));
				t0.addChild(RedMesh(tRedGL));
				t0.addChild(RedMesh(tRedGL));
				t0.addChildAt(t1, 1);
				console.log(t0);
				unit.run(t0['children'][1] == t1 && t0['children'].length == 5);
			}, true),
			redTest("범위를 벗어나는 인덱스를 입력했을때 방어하는지", function (unit, title) {
				try {
					var t0 = new RedMesh(tRedGL);
					var t1 = RedLine(tRedGL, RedColorMaterial(tRedGL));
					t0.addChildAt(t1, 10);
					console.log(t0);
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"removeChild",
			redTest("기본 작동확인", function (unit, title) {
				try {
					var t0 = new RedMesh(tRedGL);
					var t1 = RedMesh(tRedGL);
					t0.addChild(t1)
					t0.removeChild(t1)
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("children에 존재하지않는 녀석을 삭제하려할때", function (unit, title) {
				try {
					var t0 = new RedMesh(tRedGL);
					var t1 = RedMesh(tRedGL);
					t0.addChild(t1)
					t0.removeChild(0)
					console.log(t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("삭제후 children.length가 잘줄어드는지", function (unit, title) {
				var t0 = new RedMesh(tRedGL);
				var t1 = RedLine(tRedGL, RedColorMaterial(tRedGL));
				t0.addChild(RedMesh(tRedGL))
				t0.addChild(RedMesh(tRedGL))
				t0.addChild(t1)
				t0.addChild(RedMesh(tRedGL))
				t0.addChild(RedMesh(tRedGL))
				t0.removeChild(t1)
				console.log(t0)
				unit.run(t0['children'].length)
			}, 4)
		),
		redGroup(
			"removeChildAt",
			redTest("기본 작동확인", function (unit, title) {
				var t0 = new RedMesh(tRedGL);
				var t1 = RedMesh(tRedGL);
				t0.addChild(t1)
				t0.removeChildAt(0)
				console.log(t0)
				unit.run(t0.children.length)
			}, 0),
			redTest("삭제후 children.length가 잘줄어드는지", function (unit, title) {
				var t0 = new RedMesh(tRedGL);
				var t1 = RedLine(tRedGL, RedColorMaterial(tRedGL));
				t0.addChild(RedMesh(tRedGL))
				t0.addChild(RedMesh(tRedGL))
				t0.addChild(t1)
				t0.addChild(RedMesh(tRedGL))
				t0.addChild(RedMesh(tRedGL))
				t0.removeChildAt(2)
				console.log(t0)
				unit.run(t0['children'].length)
			}, 4),
			redTest("해당인덱스에 자식이 존재하지않을때", function (unit, title) {
				try {
					var t0 = new RedMesh(tRedGL);
					var t1 = RedLine(tRedGL, RedColorMaterial(tRedGL));
					t0.addChild(RedMesh(tRedGL))
					t0.addChild(RedMesh(tRedGL))
					t0.addChild(t1)
					t0.addChild(RedMesh(tRedGL))
					t0.addChild(RedMesh(tRedGL))
					t0.removeChildAt(10)
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
			"removeChildAll",
			redTest("기본 작동확인", function (unit, title) {
				var t0 = new RedMesh(tRedGL);
				t0.addChild(RedMesh(tRedGL))
				t0.addChild(RedMesh(tRedGL))
				t0.addChild(RedMesh(tRedGL))
				t0.addChild(RedMesh(tRedGL))
				t0.addChild(RedMesh(tRedGL))
				t0.removeChildAll()
				console.log(t0)
				unit.run(t0.children.length)
			}, 0)
		),
		redGroup(
			"numChildren",
			redTest("기본 작동확인", function (unit, title) {
				var t0 = new RedMesh(tRedGL);
				t0.addChild(RedMesh(tRedGL))
				t0.addChild(RedMesh(tRedGL))
				t0.addChild(RedMesh(tRedGL))
				t0.addChild(RedMesh(tRedGL))
				t0.addChild(RedMesh(tRedGL))
				console.log(t0)
				unit.run(t0.numChildren())
			}, 5)
		)
	)
})
