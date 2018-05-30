"use strict";
var testGL = RedGL(document.createElement('canvas'))
redSuite(
	"RedGL Test",
	redGroup(
		"생성 확인",
		redTest("생성확인", function (unit) {
			var t0;
			t0 = RedGL(document.createElement('canvas'), function (v) {
				unit.run(t0 instanceof RedGL)
			})
		}, true),
		redTest("인자확인 : canvas 엘리먼트만 허용하는지", function (unit) {
			try {
				RedGL(document.createElement('div'), function (v) {
					unit.run(t0 instanceof RedGL)
				})
			} catch (e) {
				unit.run(false)
			}
		}, false),
		redTest("콜백동작확인 : 성공/실패여부가 잘들어오는지 : 성공케이스확인", function (unit) {
			RedGL(document.createElement('canvas'), function (v) {
				console.log(this)
				console.log('초기화 성공여부', v)
				unit.run(v == (this['gl'] ? true : false))
			})
		}, true)
	),
	redGroup(
		"property",
		redTest("renderScale", function (unit) {
			var t0;
			t0 = RedGL(document.createElement('canvas'), function (v) {
				unit.run(t0['renderScale'])
			})
		}, 1),
		redTest("renderScale", function (unit) {
			var t0;
			t0 = RedGL(document.createElement('canvas'), function (v) {
				t0['renderScale'] = 2
				unit.run(t0['renderScale'])
			})
		}, 2),
		redTest("renderScale", function (unit) {
			var t0;
			t0 = RedGL(document.createElement('canvas'), function (v) {
				t0['renderScale'] = 0
				unit.run(t0['renderScale'])
			})
		}, 0.1)
	)
)
