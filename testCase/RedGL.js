"use strict";
var testGL = RedGL(document.createElement('canvas'))
redSuite(
	"RedGL Test",
	redGroup(
		"생성 확인",
		redTest("생성확인", function (unit, title) {
			var t0;
			t0 = RedGL(document.createElement('canvas'), function (v) {
				unit.run(t0 instanceof RedGL)
			})
		}, true),
		redTest("인자확인 : canvas 엘리먼트만 허용하는지", function (unit, title) {
			try {
				RedGL(document.createElement('div'), function (v) {
					unit.run(t0 instanceof RedGL)
				})
			} catch ( error ) {
				console.log('///////////////////////////////////////////////////////////')
				console.log(title, '\n', error)
				unit.run(false)
			}
		}, false),
		redTest("콜백동작확인 : 성공/실패여부가 잘들어오는지 : 성공케이스확인", function (unit, title) {
			RedGL(document.createElement('canvas'), function (v) {
				console.log(this)
				console.log('초기화 성공여부', v)
				unit.run(v == (this['gl'] ? true : false))
			})
		}, true)
	),
	redGroup(
		"property",
		redTest("renderScale : 기본값 1", function (unit, title) {
			RedGL(document.createElement('canvas'), function () {
				unit.run(this['renderScale'])
			})
		}, 1),
		redTest("renderScale : 1보다 큰수가 들어왔을때", function (unit, title) {
			RedGL(document.createElement('canvas'), function () {
				this['renderScale'] = 2
				unit.run(this['renderScale'])
			})
		}, 1),
		redTest("renderScale : 0.1보다 작은 수가 들어왔을때", function (unit, title) {
			RedGL(document.createElement('canvas'), function () {
				this['renderScale'] = 0
				unit.run(this['renderScale'])
			})
		}, 0.1),
		redTest("renderScale : 문자가 들어왔을때", function (unit, title) {
			RedGL(document.createElement('canvas'), function () {
				try {
					this['renderScale'] = 'test'
					unit.run(true)
				} catch ( error ) {
					unit.run(false)
				}
			})
		}, false)
	)
)
