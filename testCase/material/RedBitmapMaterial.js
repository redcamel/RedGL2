/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedBitmapMaterial TEST";
RedGL(document.createElement('canvas'), function () {
		var tRedGL = this;
		RedTest.testGroup(
			"RedBitmapMaterial( redGL, diffuseTexture )",
			function () {
				RedTest.test(
					"성공테스트 : 기본 생성 테스트",
					function () {
						try {
							RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
							RedTest.run(true)
						} catch (error) {
							RedTest.run(false, error)
						}
					},
					true
				);
				RedTest.test(
					"실패테스트 : RedGL instance만 허용.",
					function () {
						try {
							RedBitmapMaterial(1);
							RedTest.run(true)
						} catch (error) {
							RedTest.run(false, error)
						}
					},
					false
				)
			}
		);
		RedTest.testGroup(
			"RedBitmapMaterial( redGL, <b>diffuseTexture</b> )",
			function () {
				RedTest.test(
					"실패테스트 : 미입력",
					function () {
						try {
							RedBitmapMaterial(tRedGL);
							RedTest.run(true)
						} catch (error) {
							RedTest.run(false, error)
						}
					},
					false
				);
				RedTest.test(
					"실패테스트 : 숫자입력",
					function () {
						try {
							RedBitmapMaterial(tRedGL, 1);
							RedTest.run(true)
						} catch (error) {
							RedTest.run(false, error)
						}
					},
					false
				);
				RedTest.test(
					"성공테스트 : RedBitmapTexture Instance 입력",
					function () {
						try {
							RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
							RedTest.run(true)
						} catch (error) {
							RedTest.run(false, error)
						}
					},
					true
				);
				RedTest.test(
					"실패테스트 : RedBitmapCubeTexture Instance 입력",
					function () {
						try {
							RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['3d']);
							RedTest.run(true)
						} catch (error) {
							RedTest.run(false, error)
						}
					},
					false
				)
			}
		);
		RedTest.testGroup(
			"(RedBitmapMaterial Instance).<b>diffuseTexture</b> = value",
			function () {
				RedTest.test(
					"성공테스트 : 설정테스트",
					function () {
						var tTexture = RedBitmapTexture(tRedGL, '~~');
						var t0 = RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
						t0['diffuseTexture'] = tTexture;
						RedTest.run(t0['diffuseTexture'] === tTexture)
					},
					true
				);
				RedTest.test(
					"실패테스트 : RedBitmapTexture만 허용",
					function () {
						try {
							RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['3d']);
							RedTest.run(true)
						} catch (error) {
							RedTest.run(false, error)
						}
					},
					false
				);
				RedTest.test(
					"실패테스트 : null 허용하지 않음",
					function () {
						var t0 = RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
						try {
							t0['diffuseTexture'] = null;
							RedTest.run(true)
						} catch (error) {
							RedTest.run(false, error)
						}
					},
					false
				);
			}
		);
		RedTest.testGroup(
			"(RedBitmapMaterial Instance).<b>alpha</b> = value",
			function () {
				RedTest.test(
					"성공테스트 : 초기값",
					function () {
						var t0 = RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
						RedTest.run(t0['alpha'])
					}, 1
				);
				RedTest.test(
					"성공테스트 : 1이상을 입력하면 1로 치환되는지",
					function () {
						var t0 = RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
						t0.alpha = 11111;
						RedTest.run(t0['alpha'])
					},
					1
				);
				RedTest.test(
					"성공테스트 : 0이하를 입력하면 0으로 치환되는지",
					function () {
						var t0 = RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
						t0.alpha = -11111;
						RedTest.run(t0['alpha']);
					},
					0
				);
				RedTest.testListRun(
					"0~1만허용",
					[
						[0, true],
						[1, true],
						[0.1, true],
						['1', false],
						[true, false],
						[false, false],
						[null, false],
						[undefined, false],
						['문자테스트', false],
						[function () {
						}, false],
						[[], false],
						[{}, false]
					],
					function (v) {
						var t0 = RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
						try {
							t0['alpha'] = v[0];
							RedTest.run(t0['alpha'] === v[0])
						} catch (error) {
							RedTest.run(false, error)
						}
					}
				);
			}
		);
		RedTest.testGroup(
			"(RedBitmapMaterial Instance).<b>usePreMultiply</b> = value",
			function () {
				RedTest.testListRun(
					"Boolean만 허용",
					RedTest.ONLY_BOOLEAN,
					function (v) {
						var t0 = RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
						try {
							t0['usePreMultiply'] = v[0];
							RedTest.run(t0['usePreMultiply'] === v[0])

						} catch (error) {
							RedTest.run(false, error)
						}
					}
				);
				RedTest.test(
					"성공테스트 : 초기값",
					function () {
						var t0 = RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
						RedTest.run(t0['usePreMultiply']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					},
					false
				);


			}
		);
	}
);
