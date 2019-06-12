/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedLine TEST";
RedTest.mode = RedTest.REQUEST_MODE;
RedGL(document.createElement('canvas'), function () {
		var tRedGL = this;

		RedTest.testGroup(
			"RedLine( redGL, material, type )",
			function () {
				RedTest.test(
					"성공테스트 : 기본 생성 테스트",
					function () {

						try {
							var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
							console.log(t0);
							RedTest.run(true);

						} catch (error) {
							RedTest.run(false, error);

						}

					},
					true
				)
			}
		);
		RedTest.testGroup(
			"RedLine( <b>redGL</b>, material, type )",
			function () {
				RedTest.test(
					"실패테스트 : RedGL Instance만 허용하는지.",
					function () {

						try {
							var t0 = RedLine(1, RedColorMaterial(tRedGL));
							console.log(t0);
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
			"RedLine( redGL, <b>material</b>, type )",
			function () {
				RedTest.test(
					"성공테스트 : 미입력 했을경우 자동으로 RedColorMaterial 생성",
					function () {

						try {
							var t0 = RedLine(tRedGL);
							console.log(t0);
							RedTest.run(true);

						} catch (error) {
							RedTest.run(false, error);

						}

					},
					true
				);

				RedTest.test(
					"성공테스트 : set 테스트",
					function () {

						var tMaterial = RedColorMaterial(tRedGL);
						var t0 = RedLine(tRedGL, tMaterial);
						RedTest.run(t0['material'] === tMaterial);


					},
					true
				);
				RedTest.test(
					"실패테스트 : RedColorMaterial Instance만 허용",
					function () {

						var tMaterial = RedColorPhongMaterial(tRedGL);
						try {
							RedLine(tRedGL, tMaterial);
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
			"RedLine( redGL, material, <b>type</b> )",
			function () {
				RedTest.test(
					"기본값확인",
					function () {

						var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
						RedTest.run(t0.type);


					},
					RedLine.LINEAR
				);
				RedTest.testListRun(
					"RedLine.LINEAR or RedLine.CATMULL_ROM or RedLine.BEZIER 만 허용",
					[
						[RedLine.LINEAR, true],
						[RedLine.CATMULL_ROM, true],
						[RedLine.BEZIER, true],
						['failTest', false]
					],
					function (v) {

						try {
							var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL), v[0]);
							RedTest.run(v[0] === t0['type'])

						} catch (error) {
							RedTest.run(false, error);

						}

					}
				)
			}
		);
		RedTest.testGroup(
			"(RedLine Instance).<b>geometry</b> = value",
			function () {
				RedTest.test(
					"실패테스트 : 임의설정을 허용하지 않음",
					function () {

						try {
							var tGeo = RedBox(tRedGL);
							var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
							t0['geometry'] = tGeo;
							RedTest.run(t0['_geometry'] === tGeo);
							console.log(t0);

						} catch (error) {
							RedTest.run(false, error);

						}

					},
					false
				)
			}
		);
		RedTest.testGroup(
			"(RedLine Instance).<b>material</b> = value",
			function () {
				RedTest.test(
					"성공테스트 : get/set 테스트",
					function () {

						var tMaterial = RedColorMaterial(tRedGL);
						var t0 = RedLine(tRedGL, tMaterial);
						t0['material'] = tMaterial;
						RedTest.run(t0['material'] === tMaterial);


					},
					true
				);
			}
		);
		RedTest.testGroup(
			"(RedLine Instance).<b>tension</b> = value",
			function () {
				RedTest.testListRun(
					"숫자만허용",
					RedTest.ONLY_NUMBER,
					function (v) {

						try {
							var t0 = RedLine(tRedGL);
							t0['tension'] = v[0];
							RedTest.run(t0['tension'] === v[0]);

						} catch (error) {
							RedTest.run(false, error);

						}

					}
				)
			}
		);
		RedTest.testGroup(
			"(RedLine Instance).<b>distance</b> = value",
			function () {
				RedTest.testListRun(
					"0이상만 허용",
					RedTest.NUMBER_POSITIVE_AND_ZERO,
					function (v) {
						try {
							var t0 = RedLine(tRedGL);
							t0['distance'] = v[0];
							RedTest.run(t0['distance'] === v[0]);

						} catch (error) {
							RedTest.run(false, error);

						}

					}
				)
			}
		);
		RedTest.testGroup(
			"(RedLine Instance).<b>debug</b> = value",
			function () {
				RedTest.testListRun(
					"Boolean만 허용",
					RedTest.ONLY_BOOLEAN,
					function (v) {

						try {
							var t0 = RedLine(tRedGL);
							t0['debug'] = v[0];
							RedTest.run(t0['debug'] === v[0]);

						} catch (error) {
							RedTest.run(false, error);

						}

					}
				)
			}
		);
		RedTest.testGroup(
			"(RedLine Instance).<b>addPoint</b>( x, y, z )",
			function () {
				RedTest.test(
					"성공테스트 : 동작확인",
					function () {
						var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
						t0.addPoint(1, 2, 3);
						RedTest.run(t0['_interleaveData'][0] + '_' + t0['_interleaveData'][1] + '_' + t0['_interleaveData'][2]);


					}, '1_2_3');
				RedTest.test(
					"성공테스트 : 버퍼데이터에 잘적용되나 확인",
					function () {

						var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
						t0.addPoint(1, 2, 3);
						RedTest.run(t0['_interleaveBuffer']['data'][0] + '_' + t0['_interleaveBuffer']['data'][1] + '_' + t0['_interleaveBuffer']['data'][2]);


					}, '1_2_3');
				RedTest.testListRun(
					"x값 숫자만 허용",
					RedTest.ONLY_NUMBER,
					function (v) {

						try {
							var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
							t0.addPoint(v[0], 2, 3);
							RedTest.run(v[1]);

						} catch (error) {
							RedTest.run(false, error);

						}

					}
				);
				RedTest.testListRun(
					"y값 숫자만 허용",
					RedTest.ONLY_NUMBER,
					function (v) {

						try {
							var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
							t0.addPoint(1, v[0], 3);
							RedTest.run(v[1]);

						} catch (error) {
							RedTest.run(false, error);

						}

					}
				);
				RedTest.testListRun(
					"z값 숫자만 허용",
					RedTest.ONLY_NUMBER,
					function (v) {

						try {
							var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
							t0.addPoint(1, 2, v[0]);
							RedTest.run(v[1]);

						} catch (error) {
							RedTest.run(false, error);

						}

					}
				);
			}
		);
		RedTest.testGroup(
			"(RedLine Instance).<b>addPointAt</b>( index, x, y, z )",
			function () {
				RedTest.test(
					"성공테스트 : 동작확인",
					function () {

						var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
						t0.addPoint(1, 2, 3);
						t0.addPointAt(0, 11, 22, 33);
						RedTest.run(t0['_interleaveData'][0] + '_' + t0['_interleaveData'][1] + '_' + t0['_interleaveData'][2]);


					},
					'11_22_33'
				);
				RedTest.test(
					"성공테스트 : 버퍼데이터에 잘적용되나 확인",
					function () {

						var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
						t0.addPoint(1, 2, 3);
						t0.addPointAt(0, 11, 22, 33);
						RedTest.run(t0['_interleaveBuffer']['data'][0] + '_' + t0['_interleaveBuffer']['data'][1] + '_' + t0['_interleaveBuffer']['data'][2]);


					},
					'11_22_33'
				);
				RedTest.test(
					"성공테스트 : 버퍼데이터에 잘적용되나 확인",
					function () {

						var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
						t0.addPoint(1, 2, 3);
						t0.addPoint(4, 5, 6);
						t0.addPointAt(1, 11, 22, 33);
						RedTest.run(t0['_interleaveBuffer']['data'][3] + '_' + t0['_interleaveBuffer']['data'][4] + '_' + t0['_interleaveBuffer']['data'][5]);


					},
					'11_22_33'
				);
				RedTest.testListRun(
					"x값 숫자만 허용",
					RedTest.ONLY_NUMBER,
					function (v) {

						try {
							var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
							t0.addPoint(0, v[0], 2, 3);
							RedTest.run(v[1]);

						} catch (error) {
							RedTest.run(false, error);

						}

					}
				);
				RedTest.testListRun(
					"y값 숫자만 허용",
					RedTest.ONLY_NUMBER,
					function (v) {

						try {
							var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
							t0.addPoint(0, 1, v[0], 3);
							RedTest.run(v[1]);

						} catch (error) {
							RedTest.run(false, error);

						}

					}
				);
				RedTest.testListRun(
					"z값 숫자만 허용",
					RedTest.ONLY_NUMBER,
					function (v) {

						try {
							var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
							t0.addPoint(0, 1, 2, v[0]);
							RedTest.run(v[1]);

						} catch (error) {
							RedTest.run(false, error);

						}

					}
				);
			}
		);
		RedTest.testGroup(
			"(RedLine Instance).<b>removePointAt</b>()",
			function () {
				RedTest.test(
					"성공테스트 : 동작확인",
					function () {

						var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
						t0.addPoint(1, 2, 3);
						t0.removePointAt(0);
						RedTest.run(t0['_interleaveData'].length);


					},
					0
				);
				RedTest.test(
					"성공테스트 : 버퍼데이터에 잘적용되나 확인",
					function () {

						var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
						t0.addPoint(1, 2, 3);
						t0.addPoint(4, 5, 6);
						t0.removePointAt(1);
						RedTest.run(t0['_interleaveBuffer']['data'][0] + '_' + t0['_interleaveBuffer']['data'][1] + '_' + t0['_interleaveBuffer']['data'][2]);


					},
					'1_2_3'
				);
				RedTest.test(
					"성공테스트 : 버퍼데이터 길이 확인",
					function () {

						var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
						t0.addPoint(1, 2, 3);
						t0.addPoint(4, 5, 6);
						t0.removePointAt(1);
						RedTest.run(t0['_interleaveBuffer']['data'].length);


					},
					3
				)
			}
		);
		RedTest.testGroup(
			"(RedLine Instance).<b>removeAllPoint</b>()",
			function () {
				RedTest.test(
					"성공테스트 : 동작확인",
					function () {

						var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
						t0.addPoint(1, 2, 3);
						t0.removeAllPoint();
						RedTest.run(t0['_interleaveData'].length);


					},
					0
				);
				RedTest.test(
					"성공테스트 : 버퍼데이터에 잘적용되나 확인",
					function () {

						var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
						t0.addPoint(1, 2, 3);
						t0.removeAllPoint();
						RedTest.run(t0['_interleaveBuffer']['data'].length);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();

					},
					0
				)
			}
		);
	}
);

