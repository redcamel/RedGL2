"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	console.log(RedScene(tRedGL))
	redSuite(
		"RedScene Test",
		redGroup(
			"생성 확인 ( <b>redGL</b>, <b>backgroundColor</b> ) ",
			redTest("성공테스트 : new 생성확인", function (unit, title) {
				unit.run(new RedScene(tRedGL) instanceof RedScene)
			}, true),
			redTest("성공테스트 : 함수실행 생성확인", function (unit, title) {
				unit.run(RedScene(tRedGL) instanceof RedScene)
			}, true),
			redTest("실패테스트 : redGL - RedGL Instance만 허용", function (unit, title) {
				try {
					RedScene()
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("성공테스트 : backgroundColor : hex형식 or 미지정만 허용", function (unit, title) {
				var t0 = RedScene(tRedGL, '#ff0000');
				unit.run(t0['backgroundColor'])
			}, '#ff0000')
		),
		redGroup(
			"(RedScene Instance).useBackgroundColor = value",
			redTest("초기값 확인 : true", function (unit, title) {
				var t0 = RedScene(tRedGL);
				unit.run(t0['useBackgroundColor'])
			}, true),
			redTest("성공테스트 : false 설정", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0['useBackgroundColor'] = false
				unit.run(t0['useBackgroundColor'])
			}, false),
			redTest("성공테스트 : true 설정", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0['useBackgroundColor'] = true
				unit.run(t0['useBackgroundColor'])
			}, true),
			redTest("실패테스트 : boolean 만 허용", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					t0['useBackgroundColor'] = 1
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"(RedScene Instance).backgroundColor = value",
			redTest("초기값 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				unit.run(t0['backgroundColor'])
			}, '#000000'),
			redTest("성공테스트 : #777", function (unit, title) {
				var t0 = RedScene(tRedGL, '#777');
				unit.run(t0['backgroundColor'])
			}, '#777'),
			redTest("성공테스트 : #xxx 형식이 통과하는지", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					unit.run(t0['backgroundColor'] = '#343')
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, '#343'),
			redTest("성공테스트 : #xxxxxx 형식이 통과하는지", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					unit.run(t0['backgroundColor'] = '#343222')
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, '#343222'),
			redTest("실패테스트 : 잘못된 hex형식이 들어올경우 #xxxx", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					t0['backgroundColor'] = '#ff22'
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("실패테스트 : 일반 문자열이 막히는지 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					unit.run(t0['backgroundColor'] = 'color')
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("실패테스트 : 숫자형식이 막히는지 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					unit.run(t0['backgroundColor'] = 1)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"(RedScene Instance).useFog = value",
			redTest("초기값", function (unit, title) {
				var t0 = RedScene(tRedGL);
				unit.run(t0['useFog'])
			}, false),
			redTest("성공테스트 : true", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0['useFog'] = true
				unit.run(t0['useFog'])
			}, true),
			redTest("성공테스트 : false", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0['useFog'] = false
				unit.run(t0['useFog'])
			}, false),
			redTest("실패테스트 : boolean만 허용", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					t0['useFog'] = 1
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"(RedScene Instance).fogDensity = value",
			redTest("성공테스트 : 1", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0['fogDensity'] = 1
				unit.run(t0['fogDensity'])
			}, 1),
			redTest("성공테스트 : 2", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0['fogDensity'] = 2
				unit.run(t0['fogDensity'])
			}, 2),
			redTest("성공테스트 : 최소값 0 처리되는지 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0['fogDensity'] = -1
				unit.run(t0['fogDensity'])
			}, 0),
			redTest("실패테스트 : 숫자만 허용하는지 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					t0['fogDensity'] = 'test'
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"(RedScene Instance).fogDistance = value",
			redTest("성공테스트 : 1", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0['fogDistance'] = 1
				unit.run(t0['fogDistance'])
			}, 1),
			redTest("성공테스트 : 2", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0['fogDistance'] = 2
				unit.run(t0['fogDistance'])
			}, 2),
			redTest("성공테스트 : 최소값 0 처리되는지 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0['fogDistance'] = -1
				unit.run(t0['fogDistance'])
			}, 0),
			redTest("실패테스트 : 숫자만 허용하는지 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					t0['fogDistance'] = 'test'
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"(RedScene Instance).fogColor = value",
			redTest("초기값 : #ffffff", function (unit, title) {
				var t0 = RedScene(tRedGL);
				unit.run(t0['fogColor'])
			}, '#ffffff'),
			redTest("성공테스트 : #777", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0['fogColor'] = '#777'
				unit.run(t0['fogColor'])
			}, '#777'),
			redTest("성공테스트 : #xxx 형식이 통과하는지", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					unit.run(t0['fogColor'] = '#343')
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, '#343'),
			redTest("성공테스트 : #xxxxxx 형식이 통과하는지", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					unit.run(t0['fogColor'] = '#343222')
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, '#343222'),
			redTest("실패테스트 : 잘못된 hex형식이 들어올경우 #xxxx", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					t0['fogColor'] = '#ff22'
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("실패테스트 : 일반 문자열이 막히는지 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					unit.run(t0['fogColor'] = 'color')
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("실패테스트 : 숫자형식이 막히는지 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					unit.run(t0['fogColor'] = 1)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"(RedScene Instance).grid = value",
			redTest("성공테스트 : RedGrid Instance만  허용하는지 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0['grid'] = RedGrid(tRedGL);
				unit.run(t0['grid'] instanceof RedGrid)
			}, true),
			redTest("실패테스트 : RedGrid Instance만  허용하는지 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					t0['grid'] = RedMesh(tRedGL);
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("성공테스트 : null 세팅확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0['grid'] = RedGrid(tRedGL);
				t0['grid'] = null;
				unit.run(t0['grid'])
			}, null)
		),
		redGroup(
			"(RedScene Instance).axis = value",
			redTest("성공테스트 : RedAxis Instance만  허용하는지 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0['axis'] = RedAxis(tRedGL);
				unit.run(t0['axis'] instanceof RedAxis)
			}, true),
			redTest("실패테스트 : RedAxis Instance만  허용하는지 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					t0['axis'] = RedMesh(tRedGL);
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("성공테스트 : null 세팅확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0['axis'] = RedAxis(tRedGL);
				t0['axis'] = null;
				unit.run(t0['axis'])
			}, null)
		),
		redGroup(
			"(RedScene Instance).axis = value",
			redTest("성공테스트 : RedSkyBox Instance만  허용하는지 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
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
			redTest("실패테스트 : RedSkyBox Instance만  허용하는지 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					t0['skyBox'] = RedMesh(tRedGL);
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("성공테스트 : null 세팅확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
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
		redGroup(
			"(RedScene Instance).addLight( <b>value</b> ) : RedAmbientLight",
			redTest("성공테스트 : addLight - RedAmbientLight 설정", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0.addLight(RedAmbientLight(tRedGL));
				unit.run(true)
			}, true),
			redTest("성공테스트 : addLight - RedAmbientLight 설정데이터 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				var t1 = RedAmbientLight(tRedGL)
				t0.addLight(t1);
				unit.run(t0['_lightInfo']['RedAmbientLight'] == t1)
			}, true),
			redTest("성공테스트 : addLight - RedAmbientLight 설정데이터 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				var t1 = RedAmbientLight(tRedGL)
				t0.addLight(t1);
				t0.removeLight(t1);
				unit.run(t0['_lightInfo']['RedAmbientLight'] == null)
			}, true),
			redTest("실패테스트 : addLight - RedAmbientLight가 아닌 데이터 입력", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					t0.addLight('test');
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"(RedScene Instance).addLight( <b>value</b> ) : RedDirectionalLight",
			redTest("성공테스트 : addLight - RedDirectionalLight 설정", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0.addLight(RedDirectionalLight(tRedGL));
				unit.run(true)
			}, true),
			redTest("성공테스트 : addLight - RedDirectionalLight 설정데이터 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				var t1 = RedDirectionalLight(tRedGL)
				t0.addLight(t1);
				unit.run(t0['_lightInfo']['RedDirectionalLight'][0] == t1)
			}, true),
			redTest("성공테스트 : addLight - RedDirectionalLight 설정데이터 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				var t1 = RedDirectionalLight(tRedGL)
				t0.addLight(t1);
				t0.removeLight(t1);
				unit.run(t0['_lightInfo']['RedDirectionalLight'].length == 0)
			}, true),
			redTest("성공테스트 : addLight - MAX 갯수 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				var i = RedSystemShaderCode.MAX_DIRECTIONAL_LIGHT
				while ( i-- ) {
					var t1 = RedDirectionalLight(tRedGL)
					t0.addLight(t1);
				}
				unit.run(t0['_lightInfo']['RedDirectionalLight'].length == RedSystemShaderCode.MAX_DIRECTIONAL_LIGHT)
			}, true),
			redTest("성공테스트 : addLight - MAX 갯수 확인 - 초과시 에러 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				var i = RedSystemShaderCode.MAX_DIRECTIONAL_LIGHT + 1
				try {
					while ( i-- ) {
						var t1 = RedDirectionalLight(tRedGL)
						t0.addLight(t1);
					}
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("실패테스트 : addLight - RedDirectionalLight가 아닌 데이터 입력", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					t0.addLight('test');
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"(RedScene Instance).addLight( <b>value</b> ) : RedPointLight",
			redTest("성공테스트 : addLight - RedPointLight 설정", function (unit, title) {
				var t0 = RedScene(tRedGL);
				t0.addLight(RedPointLight(tRedGL));
				unit.run(true)
			}, true),
			redTest("성공테스트 : addLight - RedPointLight 설정데이터 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				var t1 = RedPointLight(tRedGL)
				t0.addLight(t1);
				unit.run(t0['_lightInfo']['RedPointLight'][0] == t1)
			}, true),
			redTest("성공테스트 : addLight - RedPointLight 설정데이터 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				var t1 = RedPointLight(tRedGL)
				t0.addLight(t1);
				t0.removeLight(t1);
				unit.run(t0['_lightInfo']['RedPointLight'].length == 0)
			}, true),
			redTest("성공테스트 : addLight - MAX 갯수 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				var i = RedSystemShaderCode.MAX_POINT_LIGHT
				while ( i-- ) {
					var t1 = RedPointLight(tRedGL)
					t0.addLight(t1);
				}
				unit.run(t0['_lightInfo']['RedPointLight'].length == RedSystemShaderCode.MAX_POINT_LIGHT)
			}, true),
			redTest("성공테스트 : addLight - MAX 갯수 확인 - 초과시 에러 확인", function (unit, title) {
				var t0 = RedScene(tRedGL);
				var i = RedSystemShaderCode.MAX_POINT_LIGHT + 1
				try {
					while ( i-- ) {
						var t1 = RedPointLight(tRedGL)
						t0.addLight(t1);
					}
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("실패테스트 : addLight - RedPointLight가 아닌 데이터 입력", function (unit, title) {
				var t0 = RedScene(tRedGL);
				try {
					t0.addLight('test');
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