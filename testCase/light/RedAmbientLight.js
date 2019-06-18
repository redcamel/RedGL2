/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedAmbientLight TEST";
RedGL(document.createElement('canvas'), function () {
		var tRedGL = this;

		RedTest.testGroup(
			"RedAmbientLight( redGL, hexColor, alpha, intensity )",
			function () {
				RedTest.test(
					"성공테스트 : new 생성 테스트",
					function () {

						try {
							var t0 = new RedAmbientLight(tRedGL);
							console.log(t0);
							RedTest.run(true);

						} catch (error) {
							RedTest.run(false, error);

						}

					},
					true
				);
				RedTest.test(
					"성공테스트 : 기본 생성 테스트",
					function () {

						try {
							var t0 = RedAmbientLight(tRedGL);
							console.log(t0);
							RedTest.run(true);

						} catch (error) {
							RedTest.run(false, error);

						}

					},
					true
				);
				RedTest.test(
					"성공테스트 : TYPE 확인",
					function () {

						var t0 = RedAmbientLight(tRedGL);
						RedTest.run(t0['TYPE']);


					},
					RedAmbientLight['TYPE']
				);
				RedTest.test(
					"성공테스트 : TYPE 확인은 불변확인",
					function () {

						try {
							var t0 = RedAmbientLight(tRedGL);
							t0['TYPE'] = 1;
							RedTest.run(true);

						} catch (error) {
							RedTest.run(false, error);

						}

					},
					false
				)
			}
		);
		RedTest.testGroup(
			"RedAmbientLight( <b>redGL</b>, hexColor, alpha, intensity )",
			function () {
				RedTest.test(
					"성공테스트 : RedGL Instance만 허용.",
					function () {

						try {
							RedAmbientLight(1);
							RedTest.run(true);

						} catch (error) {
							RedTest.run(false, error);

						}

					},
					false
				)
			}
		);
		RedTest.testGroup(
			"RedAmbientLight( redG, <b>hexColor</b>, alpha, intensity )",
			function () {
				RedTest.testListRun(
					"hex만 허용",
					RedTest.ONLY_HEX,
					function (v) {

						try {
							var t0 = RedAmbientLight(tRedGL, v[0]);
							RedTest.run(v[0] === t0['color']);

						} catch (error) {
							RedTest.run(false, error);

						}

					}
				);
				RedTest.test(
					"성공테스트 : hexColor - #ff0000 / _lightColor 잘반영되는지 확인",
					function () {

						var t0 = RedAmbientLight(tRedGL, '#ff0000');
						RedTest.run(t0['_lightColor'][0] + '_' + t0['_lightColor'][1] + '_' + t0['_lightColor'][2]);


					},
					'1_0_0'
				)
			}
		);
		RedTest.testGroup(
			"RedAmbientLight( redG, hexColor, <b>alpha</b>, intensity )",
			function () {
				RedTest.test(
					"성공테스트 : alpha - 0.5",
					function () {

						var t0 = RedAmbientLight(tRedGL, '#556677', 0.5);
						RedTest.run(t0['alpha']);


					},
					0.5
				);
				RedTest.test(
					"성공테스트 : alpha - 0.5",
					function () {

						var t0 = RedAmbientLight(tRedGL, '#556677', 0.5);
						RedTest.run(t0['_lightColor'][3]);


					},
					0.5
				);
				RedTest.test(
					"성공테스트 : hexColor & alpha",
					function () {

						var t0 = RedAmbientLight(tRedGL, '#fff', 0.5);
						RedTest.run(t0['_lightColor'][0] + '_' + t0['_lightColor'][1] + '_' + t0['_lightColor'][2] + '_' + t0['_lightColor'][3]);


					},
					'1_1_1_0.5'
				);
				RedTest.testListRun(
					"0~1만허용",
					RedTest.NUMBER_ZERO_TO_ONE,
					function (v) {

						try {
							var t0 = RedAmbientLight(tRedGL, '#fff', v[0]);
							RedTest.run(v[0] === t0['alpha']);

						} catch (error) {
							RedTest.run(false, error);

						}

					}
				);
				RedTest.test(
					"성공테스트 : 1이상을 입력하면 1로 치환되는지",
					function () {

						var t0 = RedAmbientLight(tRedGL, '#fff', 1111);
						RedTest.run(t0['alpha']);


					},
					1
				);
				RedTest.test(
					"성공테스트 : 0이하를 입력하면 0으로 치환되는지",
					function () {

						var t0 = RedAmbientLight(tRedGL, '#fff', -12345);
						RedTest.run(t0['alpha']);


					},
					0
				)
			}
		);
		RedTest.testGroup(
			"(RedAmbientLight Instance).intensity = <b>value</b>",
			function () {
				RedTest.testListRun(
					"0이상만 허용",
					RedTest.NUMBER_POSITIVE_AND_ZERO,
					function (v) {

						try {
							var t0 = RedAmbientLight(tRedGL);
							t0['intensity'] = v[0];
							RedTest.run(v[0] === t0['intensity']);

						} catch (error) {
							RedTest.run(false, error);

						}

					}
				);
				RedTest.test(
					"성공테스트 : 0이하를 입력하면 0으로 치환되는지",
					function () {

						try {
							var t0 = RedAmbientLight(tRedGL);
							t0['intensity'] = -1;
							RedTest.run(t0['intensity']);
							tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
						} catch (error) {
							RedTest.run(false, error);
							tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
						}

					},
					0
				)
			}
		);
	}
);
