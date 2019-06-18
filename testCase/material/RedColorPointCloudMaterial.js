/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedColorPointCloudMaterial TEST";
RedGL(document.createElement('canvas'), function () {
		var tRedGL = this;
		RedTest.testGroup(
			"RedColorPointCloudMaterial( redGL )",
			function () {
				RedTest.test(
					"성공테스트 : 기본 생성 테스트",
					function () {
						try {
							RedColorPointCloudMaterial(tRedGL);
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
							RedColorPointCloudMaterial(1);
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
			"(RedColorPointCloudMaterial Instance).<b>alpha</b> = value",
			function () {
				RedTest.test(
					"실패테스트  : 생성인자 반영되는지 체크 : 숫자만 허용하는지",
					function () {
						try {
							var t0 = RedColorPointCloudMaterial(tRedGL);
							t0.alpha = 'failTest'
						} catch (error) {
							RedTest.run(false, error)
						}
					},
					false
				);
				RedTest.test(
					"성공테스트 : 0.5",
					function () {
						var t0 = RedColorPointCloudMaterial(tRedGL);
						t0.alpha = 0.5;
						RedTest.run(t0['alpha'])
					},
					0.5
				);
				RedTest.test(
					"성공테스트 : 1이상을 입력하면 1로 치환되는지",
					function () {
						var t0 = RedColorPointCloudMaterial(tRedGL);
						t0.alpha = 1000;
						RedTest.run(t0['alpha'])
					},
					1
				);
				RedTest.test(
					"성공테스트 : 0이하를 입력하면 0으로 치환되는지",
					function () {
						var t0 = RedColorPointCloudMaterial(tRedGL);
						t0.alpha = -1000;
						RedTest.run(t0['alpha']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					},
					0
				)
			}
		)
	}
);
