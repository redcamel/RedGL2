/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedSphere TEST";
RedGL(
	document.createElement('canvas'),
	function () {
		var tRedGL = this;
		RedTest.testGroup(
			"생성 확인",
			function () {
				RedTest.test(
					"기본 생성 테스트",
					function () {
						try {
							var t0 = RedSphere(tRedGL);
							console.log(t0);
							RedTest.run(true);
						} catch (error) {
							RedTest.run(false, error);
						}

					},
					true
				);
				RedTest.test(
					"인자확인 redGL : RedGL Instance만 허용하는지",
					function () {
						try {
							var t0 = RedSphere(1);
							console.log(t0);
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
			"고유키 값 동작 확인",
			function () {
				RedTest.test(
					"캐싱확인 : 구성 정보가 같으면 캐싱된 정보가 넘어온다.",
					function () {
						var t0 = RedSphere(tRedGL);
						var t1 = RedSphere(tRedGL);
						RedTest.run(t0 === t1);


					},
					true
				);
				RedTest.test(
					"생성시 입력변수에 따른 interleaveBuffer 고유키값이 생성되는지 확인 : RedSphere( tRedGL, 2)",
					function () {
						var t0 = RedSphere(tRedGL, 2, 3, 4, 5, 6, 7, 8);
						RedTest.run(t0['interleaveBuffer']['key']);


					},
					'RedSphere_2_3_4_5_6_7_8_interleaveBuffer'
				);
				RedTest.test(
					"생성시 입력변수에 따른 indexBuffer 고유키값이 생성되는지 확인 : RedSphere( tRedGL, 2)",
					function () {
						var t0 = RedSphere(tRedGL, 2, 3, 4, 5, 6, 7, 8);
						RedTest.run(t0['indexBuffer']['key']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					},
					'RedSphere_2_3_4_5_6_7_8_indexBuffer'
				)
			}
		)
	}
);