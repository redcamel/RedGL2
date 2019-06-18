/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
RedGL.setDoNotPrepareProgram();
var tRedGL;
RedTest.title = "RedVideoTexture TEST";
RedGL(document.createElement('canvas'), function () {
	tRedGL = this;

	RedTest.testGroup(
		"RedVideoTexture( redGL, src, callBack )",
		function () {
			RedTest.test(
				"성공테스트 : 기본생성확인",
				function () {
					var t0;
					t0 = RedVideoTexture(tRedGL, '../../asset/mov_bbb.mp4');
					RedTest.run(t0 instanceof RedVideoTexture)
				},
				true
			)
		}
	);
	RedTest.testGroup(
		"RedVideoTexture( redGL, <b>src</b>, callBack )",
		function () {
			RedTest.test(
				"성공테스트 : 미입력",
				function () {
					try {
						RedVideoTexture(tRedGL);
						RedTest.run(true)
					} catch (error) {
						RedTest.run(false, error)
					}
				},
				true
			);
			RedTest.test(
				"실패테스트 : 숫자입력",
				function () {
					try {
						RedVideoTexture(tRedGL, 1);
						RedTest.run(true)
					} catch (error) {
						RedTest.run(false, error)
					}
				},
				false
			);
			RedTest.test(
				"실패테스트 : HTMLVideoElement 이외 Element입력",
				function () {
					try {
						RedVideoTexture(tRedGL, document.createElement('div'));
						RedTest.run(true)
					} catch (error) {
						RedTest.run(false, error)
					}
				},
				false
			);
			RedTest.test(
				"성공테스트 : HTMLVideoElement 입력",
				function () {
					try {
						var t0 = document.createElement('video');
						t0.src = '../../asset/mov_bbb.mp4';
						console.log(t0);
						RedVideoTexture(tRedGL, t0);
						RedTest.run(true)
					} catch (error) {
						RedTest.run(false, error)
					}
				},
				true
			)
		}
	);
	RedTest.testGroup(
		"RedVideoTexture( redGL, src, <b>callBack</b> )",
		function () {
			RedTest.test(
				"성공테스트 : 미입력",
				function () {
					try {
						RedVideoTexture(tRedGL);
						RedTest.run(true)
					} catch (error) {
						RedTest.run(false, error)
					}
				},
				true
			);
			RedTest.test(
				"성공테스트 : 콜백함수 입력",
				function () {
					RedVideoTexture(tRedGL, '../../asset/mov_bbb.mp4', function () {
						RedTest.run(true)
					})
				},
				true
			);
			RedTest.testListRun(
				"함수 or falsy 허용",
				[
					[function () {
					}, true],
					[null, true],
					[undefined, true],
					[0, true],
					[1, false],
					[1.1, false],
					[-1, false],
					[-1.1, false],

					['문자테스트', false],
					[[], false],
					[{}, false]
				],
				function (v) {
					try {
						RedVideoTexture(tRedGL, '../../asset/mov_bbb.mp4', v[0]);
						RedTest.run(true)
					} catch (error) {
						RedTest.run(false, error)
					}
				}
			);
			RedTest.test(
				"성공테스트 : callback : 미입력",
				function () {
					try {
						RedVideoTexture(tRedGL, '../../asset/mov_bbb.mp4');
						RedTest.run(true)
					} catch (error) {
						RedTest.run(false, error)
					}
				},
				true
			);
			RedTest.test(
				"성공테스트 : src로드 성공시 callback",
				function () {
					RedVideoTexture(tRedGL, '../../asset/mov_bbb.mp4', function (v) {
						RedTest.run(v)
					})
				},
				true
			);
			RedTest.test(
				"실패테스트 : src로드 실패시 callback",
				function () {
					RedVideoTexture(tRedGL, '~~~', function (v) {
						RedTest.run(v)
					})
				},
				false
			)
		}
	)

});
