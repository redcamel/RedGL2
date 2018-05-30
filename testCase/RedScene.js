"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	console.log(RedScene(tRedGL))
	redSuite(
		"RedScene Test",
		redGroup(
			"생성 확인",
			redTest("new 생성확인", function (unit) {
				unit.run(new RedScene(tRedGL) instanceof RedScene)
			}, true),
			redTest("함수실행 생성확인", function (unit) {
				unit.run(RedScene(tRedGL) instanceof RedScene)
			}, true),
			redTest("인자확인 - redGL : RedGL Instance만 허용", function (unit) {
				try {
					RedScene()
					unit.run(true)
				} catch (error) {
					unit.run(false)
				}
			}, false),
			redTest("인자확인 - backgroundColor : hex형식 or 미지정만 허용", function (unit) {
				var t0 = new RedScene(tRedGL, '#ff0000');
				unit.run(t0['backgroundColor'])
			}, '#ff0000')
		),
		redGroup(
			"useBackgroundColor 관련 확인",
			redTest("useBackgroundColor 초기값", function (unit) {
				var t0 = new RedScene(tRedGL);
				unit.run(t0['useBackgroundColor'])
			}, true),
			redTest("useBackgroundColor 설정 : false", function (unit) {
				var t0 = new RedScene(tRedGL);
				t0['useBackgroundColor'] = false
				unit.run(t0['useBackgroundColor'])
			}, false),
			redTest("useBackgroundColor 설정 : true", function (unit) {
				var t0 = new RedScene(tRedGL);
				t0['useBackgroundColor'] = true
				unit.run(t0['useBackgroundColor'])
			}, true)
		),
		redGroup(
			"backgroundColor 관련 확인",
			redTest("backgroundColor 초기값", function (unit) {
				var t0 = new RedScene(tRedGL);
				unit.run(t0['backgroundColor'])
			}, '#000000'),
			redTest("backgroundColor 설정 : #777", function (unit) {
				var t0 = new RedScene(tRedGL, '#777');
				unit.run(t0['backgroundColor'])
			}, '#777'),
			redTest("backgroundColor 설정 : #xxx 형식이 통과하는지", function (unit) {
				var t0 = new RedScene(tRedGL);
				try {
					unit.run(t0['backgroundColor'] = '#343')
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, '#343'),
			redTest("backgroundColor 설정 : #xxxxxx 형식이 통과하는지", function (unit) {
				var t0 = new RedScene(tRedGL);
				try {
					unit.run(t0['backgroundColor'] = '#343222')
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, '#343222'),
			redTest("backgroundColor 설정 : 잘못된 hex형식이 들어올경우 #xxxx", function (unit) {
				var t0 = new RedScene(tRedGL);
				try {
					t0['backgroundColor'] = '#ff22'
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("backgroundColor 설정 : 일반 문자열이 막히는지 확인", function (unit) {
				var t0 = new RedScene(tRedGL);
				try {
					unit.run(t0['backgroundColor'] = 'color')
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("backgroundColor 설정 : 숫자형식이 막히는지 확인", function (unit) {
				var t0 = new RedScene(tRedGL);
				try {
					unit.run(t0['backgroundColor'] = 1)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"useFog 관련 확인",
			redTest("useFog 초기값", function (unit) {
				var t0 = new RedScene(tRedGL);
				unit.run(t0['useFog'])
			}, false),
			redTest("useFog 설정 : true", function (unit) {
				var t0 = new RedScene(tRedGL);
				t0['useFog'] = true
				unit.run(t0['useFog'])
			}, true),
			redTest("useFog 설정 : false", function (unit) {
				var t0 = new RedScene(tRedGL);
				t0['useFog'] = false
				unit.run(t0['useFog'])
			}, false)
		),
		redGroup(
			"fogDensity 관련 확인",
			redTest("fogDensity 설정 : 1", function (unit) {
				var t0 = new RedScene(tRedGL);
				t0['fogDensity'] = 1
				unit.run(t0['fogDensity'])
			}, 1),
			redTest("fogDensity 설정 : 2", function (unit) {
				var t0 = new RedScene(tRedGL);
				t0['fogDensity'] = 2
				unit.run(t0['fogDensity'])
			}, 2),
			redTest("fogDensity 설정 : 숫자만 허용하는지 확인", function (unit) {
				var t0 = new RedScene(tRedGL);
				try {
					t0['fogDensity'] = 'test'
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
		),
		redGroup(
			"fogDistance 관련 확인",
			redTest("fogDistance 설정 : 1", function (unit) {
				var t0 = new RedScene(tRedGL);
				t0['fogDistance'] = 1
				unit.run(t0['fogDistance'])
			}, 1),
			redTest("fogDistance 설정 : 2", function (unit) {
				var t0 = new RedScene(tRedGL);
				t0['fogDistance'] = 2
				unit.run(t0['fogDistance'])
			}, 2),
			redTest("fogDistance 설정 : 숫자만 허용하는지 확인", function (unit) {
				var t0 = new RedScene(tRedGL);
				try {
					t0['fogDistance'] = 'test'
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
		),
		redGroup(
			"fogColor 관련 확인",
			redTest("fogColor 초기값", function (unit) {
				var t0 = new RedScene(tRedGL);
				unit.run(t0['fogColor'])
			}, '#ffffff'),
			redTest("fogColor 설정 : #777", function (unit) {
				var t0 = new RedScene(tRedGL);
				t0['fogColor'] = '#777'
				unit.run(t0['fogColor'])
			}, '#777'),
			redTest("fogColor 설정 : #xxx 형식이 통과하는지", function (unit) {
				var t0 = new RedScene(tRedGL);
				try {
					unit.run(t0['fogColor'] = '#343')
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, '#343'),
			redTest("fogColor 설정 : #xxxxxx 형식이 통과하는지", function (unit) {
				var t0 = new RedScene(tRedGL);
				try {
					unit.run(t0['fogColor'] = '#343222')
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, '#343222'),
			redTest("fogColor 설정 : 잘못된 hex형식이 들어올경우 #xxxx", function (unit) {
				var t0 = new RedScene(tRedGL);
				try {
					t0['fogColor'] = '#ff22'
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("fogColor 설정 : 일반 문자열이 막히는지 확인", function (unit) {
				var t0 = new RedScene(tRedGL);
				try {
					unit.run(t0['fogColor'] = 'color')
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("fogColor 설정 : 숫자형식이 막히는지 확인", function (unit) {
				var t0 = new RedScene(tRedGL);
				try {
					unit.run(t0['fogColor'] = 1)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"grid 설정 확인",
			redTest("grid 설정 : RedGrid Instance만  허용하는지 확인", function (unit) {
				var t0 = new RedScene(tRedGL);
				t0['grid'] = RedGrid(tRedGL);
				unit.run(t0['grid'] instanceof RedGrid)
			}, true),
			redTest("grid 설정 : RedGrid Instance만  허용하는지 확인", function (unit) {
				var t0 = new RedScene(tRedGL);
				try {
					t0['grid'] = RedMesh(tRedGL);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("grid 설정 : null 세팅확인", function (unit) {
				var t0 = new RedScene(tRedGL);
				t0['grid'] = RedGrid(tRedGL);
				t0['grid'] = null;
				unit.run(t0['grid'])
			}, null)
		),
		redGroup(
			"axis 설정 확인",
			redTest("axis 설정 : RedAxis Instance만  허용하는지 확인", function (unit) {
				var t0 = new RedScene(tRedGL);
				t0['axis'] = RedAxis(tRedGL);
				unit.run(t0['axis'] instanceof RedAxis)
			}, true),
			redTest("axis 설정 : RedAxis Instance만  허용하는지 확인", function (unit) {
				var t0 = new RedScene(tRedGL);
				try {
					t0['axis'] = RedMesh(tRedGL);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("axis 설정 : null 세팅확인", function (unit) {
				var t0 = new RedScene(tRedGL);
				t0['axis'] = RedAxis(tRedGL);
				t0['axis'] = null;
				unit.run(t0['axis'])
			}, null)
		),
		redGroup(
			"skyBox 설정 확인",
			redTest("skyBox 설정 : RedSkyBox Instance만  허용하는지 확인", function (unit) {
				var t0 = new RedScene(tRedGL);
				t0['skyBox'] = RedSkyBox(tRedGL, [
					'../asset/cubemap/posx.png',
					'../asset/cubemap/negx.png',
					'../asset/cubemap/posy.png',
					'../asset/cubemap/negy.png',
					'../asset/cubemap/posz.png',
					'../asset/cubemap/negz.png'
				])
				unit.run(t0['skyBox'] instanceof RedSkyBox)
			}, true),
			redTest("skyBox 설정 : RedSkyBox Instance만  허용하는지 확인", function (unit) {
				var t0 = new RedScene(tRedGL);
				try {
					t0['skyBox'] = RedMesh(tRedGL);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("skyBox 설정 : null 세팅확인", function (unit) {
				var t0 = new RedScene(tRedGL);
				t0['skyBox'] = RedSkyBox(tRedGL, [
					'../asset/cubemap/posx.png',
					'../asset/cubemap/negx.png',
					'../asset/cubemap/posy.png',
					'../asset/cubemap/negy.png',
					'../asset/cubemap/posz.png',
					'../asset/cubemap/negz.png'
				])
				t0['skyBox'] = null;
				unit.run(t0['skyBox'])
			}, null)
		),
	)
})