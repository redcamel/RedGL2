"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	var tGL = tRedGL.gl
	redSuite(
		"RedPostEffectManager 테스트",
		redGroup(
			"생성 확인",
			redTest("인자확인 - RedGL Instance만 허용", function (unit, title) {
				try {
					var t0 = RedPostEffectManager(tRedGL)
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("인자확인 - RedGL Instance만 허용", function (unit, title) {
				try {
					var t0 = RedPostEffectManager(1)
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("RedScene instance 생성시 postEffectManager속성에 RedPostEffectManager Instance가 생김 ", function (unit, title) {
				var t0 = RedView('test',tRedGL,RedScene(tRedGL),RedCamera())
				unit.run(t0['postEffectManager'] instanceof RedPostEffectManager)
			}, true)
		),
		redGroup(
			"addEffect",
			redTest("동작 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				var tEffect0 = RedPostEffect_Gray(tRedGL);
				t0.addEffect(tEffect0)
				unit.run(t0['postEffectList'][0] == tEffect0)
			}, true),
			redTest("추가후 postEffectList.length 정상적으로 늘어나는지 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				var tEffect0 = RedPostEffect_Gray(tRedGL);
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				unit.run(t0['postEffectList'].length)
			}, 2),
			redTest("RedBaseMaterial Instance가 아닌녀석을 등록했을떄", function (unit, title) {
				try {
					var t0 = RedPostEffectManager(tRedGL);
					var tEffect0 = 1;
					t0.addEffect(tEffect0)
					unit.run(t0['postEffectList'].length)
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"removeEffect",
			redTest("동작 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				var tEffect0 = RedPostEffect_Gray(tRedGL);
				t0.addEffect(tEffect0)
				t0.removeEffect(tEffect0)
				unit.run(t0['postEffectList'].length)
			}, 0),
			redTest("postEffectList에 없는 녀석을 제거하면", function (unit, title) {
				try {
					var t0 = RedPostEffectManager(tRedGL);
					var tEffect0 = RedPostEffect_Gray(tRedGL);
					t0.removeEffect(tEffect0)
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true)
		),
		redGroup(
			"removeAllEffect",
			redTest("동작 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				var tEffect0 = RedPostEffect_Gray(tRedGL);
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				console.log(t0['postEffectList'].length)
				t0.removeAllEffect()
				unit.run(t0['postEffectList'].length)
			}, 0)
		),
		redGroup(
			"antialiasing",
			redTest("antialiasing 설정확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				var tEffect0 = RedPostEffect_FXAA(tRedGL);
				t0['antialiasing'] = tEffect0
				unit.run(t0['antialiasing'] == tEffect0)
			}, true),
			redTest("RedPostEffect_FXAA Instance 만 허용", function (unit, title) {
				try {
					var t0 = RedPostEffectManager(tRedGL);
					t0['antialiasing'] = 1
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("null 설정확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				t0['antialiasing'] = null
				unit.run(t0['antialiasing'])
			}, null),
		),
		redGroup(
			"bind, unbind",
			redTest("bind - 소유하고있는 webglFrameBuffer가 등록되는지 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL)
				t0.bind(tGL)
				console.log(tGL.getParameter(tGL.FRAMEBUFFER_BINDING))
				unit.run(tGL.getParameter(tGL.FRAMEBUFFER_BINDING) == t0['frameBuffer']['webglFrameBuffer'])
				t0.unbind(tGL)
			}, true),
			redTest("unbind - unbind시 webglFrameBuffer가 unbind 되는지 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL)
				t0.bind(tGL)
				t0.unbind(tGL)
				unit.run(tGL.getParameter(tGL.FRAMEBUFFER_BINDING) == t0['frameBuffer']['webglFrameBuffer'])
			}, false),
			redTest("bind - 소유하고있는 webglFrameBuffer가 등록되는지 확인2", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL)
				t0.bind(tGL)
				unit.run(tGL.getParameter(tGL.FRAMEBUFFER_BINDING) == t0['frameBuffer']['webglFrameBuffer'])
				t0.unbind(tGL)
			}, true),
			redTest("bind - 소유하고있는 webglTexture가 등록되는지 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL)
				t0.bind(tGL)
				console.log(tGL.getParameter(tGL.TEXTURE_BINDING_2D) == t0['frameBuffer']['texture']['webglTexture'])
				unit.run(tGL.getParameter(tGL.TEXTURE_BINDING_2D) == t0['frameBuffer']['texture']['webglTexture'])
				t0.unbind(tGL)
			}, true),
			redTest("unbind - unbind시 소유하고있는 webglTexture가 unbind 되는지 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL)
				t0.bind(tGL)
				t0.unbind(tGL)
				console.log(t0['frameBuffer']['texture']['webglTexture'])
				unit.run(tGL.getParameter(tGL.TEXTURE_BINDING_2D) == t0['frameBuffer']['texture']['webglTexture'])
			}, false),
			redTest("bind - 소유하고있는 webglRenderBuffer가 등록되는지 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL)
				t0.bind(tGL)
				console.log(tGL.getParameter(tGL.RENDERBUFFER_BINDING))
				unit.run(tGL.getParameter(tGL.RENDERBUFFER_BINDING) == t0['frameBuffer']['webglRenderBuffer'])
				t0.unbind(tGL)
			}, true),
			redTest("unbind - unbind시 소유하고있는 webglRenderBuffer가 unbind 되는지 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL)
				t0.bind(tGL)
				console.log(tGL.getParameter(tGL.RENDERBUFFER_BINDING))
				unit.run(tGL.getParameter(tGL.RENDERBUFFER_BINDING) == t0['frameBuffer']['webglRenderBuffer'])
				t0.unbind(tGL)
			}, true),
		)
	)
})
