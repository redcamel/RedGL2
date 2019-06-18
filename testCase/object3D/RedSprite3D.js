/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedSprite TEST";
RedGL(document.createElement('canvas'), function () {
		var tRedGL = this;
		var tMaterial = RedColorMaterial(tRedGL);
		RedTest.testGroup(
			"RedSprite( redGL, material )",
			function () {
				RedTest.test(
					"성공테스트 : 기본 생성 테스트",
					function () {
						try {
							var t0 = RedSprite3D(
								tRedGL,
								tMaterial
							);
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
			"RedSprite( <b>redGL</b>, material )",
			function () {
				RedTest.test(
					"실패테스트 : RedGL Instance만 허용하는지.",
					function () {

						try {
							var t0 = RedSprite3D(
								1,
								tMaterial
							);
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
			"RedSprite( redGL, <b>material</b> )",
			function () {
				RedTest.test(
					"실패테스트 : 미입력",
					function () {

						try {
							var t0 = RedSprite3D(
								tRedGL);
							console.log(t0);
							RedTest.run(true);

						} catch (error) {
							RedTest.run(false, error);

						}

					},
					false
				);
				RedTest.test(
					"실패테스트 : RedColorMaterial or RedBitmapMaterial or RedSheetMaterial or RedVideoMaterial Instance가 아닌경우",
					function () {

						try {
							var t0 = RedSprite3D(
								tRedGL,
								{}
							);
							console.log(t0);
							RedTest.run(true);

						} catch (error) {
							RedTest.run(false, error);

						}

					},
					false
				);
				RedTest.test(
					"실패테스트 : RedColorMaterial or RedBitmapMaterial or RedSheetMaterial or RedVideoMaterial Instance가 아닌경우",
					function () {


						try {
							var t0 = RedSprite3D(
								tRedGL,
								1
							);
							console.log(t0);
							RedTest.run(true);

						} catch (error) {
							RedTest.run(false, error);

						}

					},
					false
				);
				RedTest.test(
					"실패테스트 : RedColorMaterial or RedBitmapMaterial or RedSheetMaterial or RedVideoMaterial Instance가 아닌경우",
					function () {


						try {
							var t0 = RedSprite3D(
								tRedGL,
								RedColorPhongMaterial(tRedGL)
							);
							console.log(t0);
							RedTest.run(true);

						} catch (error) {
							RedTest.run(false, error);

						}

					},
					false
				);
				RedTest.test(
					"성공테스트 : set 테스트 - RedColorMaterial",
					function () {


						var tColorMaterial = RedColorMaterial(tRedGL);
						var t0 = RedSprite3D(
							tRedGL,
							tMaterial
						);
						t0['material'] = tColorMaterial;
						RedTest.run(t0['material'] === tColorMaterial);


					},
					true
				);
				RedTest.test(
					"성공테스트 : set 테스트 - RedBitmapMaterial",
					function () {

						var tBitmapMaterial = RedBitmapMaterial(tRedGL, RedBitmapTexture(tRedGL, RedBaseTexture.EMPTY_BASE64));
						var t0 = RedSprite3D(
							tRedGL,
							tMaterial
						);
						t0['material'] = tBitmapMaterial;
						RedTest.run(t0['material'] === tBitmapMaterial);


					},
					true
				);
				RedTest.test(
					"성공테스트 : set 테스트 - RedSheetMaterial",
					function () {

						var tBitmapMaterial = RedSheetMaterial(tRedGL, RedBitmapTexture(tRedGL, RedBaseTexture.EMPTY_BASE64));
						var t0 = RedSprite3D(
							tRedGL,
							tMaterial
						);
						t0['material'] = tBitmapMaterial;
						RedTest.run(t0['_material'] === tBitmapMaterial);


					},
					true
				);

				RedTest.test(
					"성공테스트 : set 테스트 - RedVideoMaterial",
					function () {

						var tColorMaterial = RedVideoMaterial(tRedGL, RedVideoTexture(tRedGL, 'test'));
						var t0 = RedSprite3D(
							tRedGL,
							tMaterial
						);
						t0['material'] = tColorMaterial;
						RedTest.run(t0['_material'] === tColorMaterial);


					},
					true
				);
			}
		);
		RedTest.testGroup(
			"(RedSprite Instance).<b>perspectiveScale</b> = value",
			function () {
				RedTest.testListRun(
					"boolean만 허용",
					RedTest.ONLY_BOOLEAN,
					function (v) {
						try {
							var t0 = RedSprite3D(tRedGL, RedColorMaterial(tRedGL));
							t0['perspectiveScale'] = v[0];
							RedTest.run(t0['perspectiveScale'] === v[0]);
						} catch (e) {
							RedTest.run(false, e);
						}
					}
				);
			}
		);
		RedTest.testGroup(
			"(RedSprite Instance).<b>sprite3DYn</b> = value",
			function () {
				console.log(RedTest.ONLY_BOOLEAN);
				RedTest.testListRun(
					"boolean만 허용",
					RedTest.ONLY_BOOLEAN,
					function (v) {
						try {
							var t0 = RedSprite3D(tRedGL, RedColorMaterial(tRedGL));
							t0['sprite3DYn'] = v[0];
							RedTest.run(t0['sprite3DYn'] === v[0]);

						} catch (e) {
							RedTest.run(false);
						}
					}
				);
				RedTest.test(
					"컨텍스트 날리기용",
					function () {
						RedTest.run(true);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					},
					true
				);
			}
		);


	}
);

