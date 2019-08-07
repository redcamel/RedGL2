/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.2 18:16:21
 *
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedMesh TEST";
RedGL(document.createElement('canvas'), function () {
		var tRedGL = this;
		var tMaterial = RedColorMaterial(tRedGL);
		RedTest.testGroup(
			"RedMesh( redGL, geometry, material )",
			function () {
				RedTest.test(
					"성공테스트 : 기본 생성 테스트",
					function () {

						try {
							var t0 = RedMesh(
								tRedGL,
								RedBox(tRedGL),
								RedColorMaterial(tRedGL)
							);
							console.log(t0);
							RedTest.run(true);

						} catch (error) {
							RedTest.run(false, error);

						}

					},
					true
				);

				RedTest.testGroup(
					"RedMesh( <b>redGL</b>, geometry, material )",
					function () {
						RedTest.test(
							"실패테스트 : RedGL Instance만 허용하는지.",
							function () {

								try {
									var t0 = RedMesh(
										1,
										RedBox(tRedGL),
										RedColorMaterial(tRedGL)
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
					"RedMesh( redGL, <b>geometry</b>, material )",
					function () {
						RedTest.test(
							"성공테스트 : 미입력 했을경우 : 빈 메쉬를 활용할수도 있으므로 허용함.",
							function () {

								try {
									var t0 = RedMesh(
										tRedGL,
										null,
										RedColorMaterial(tRedGL)
									);
									console.log(t0);
									RedTest.run(true);

								} catch (error) {
									RedTest.run(false, error);

								}

							},
							true
						);
						RedTest.test(
							"실패테스트 : RedGeometry Instance가 아닌경우 ",
							function () {

								try {
									var t0 = RedMesh(
										tRedGL,
										1,
										RedColorMaterial(tRedGL)
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
							"성공테스트 : get 테스트",
							function () {

								var tGeometry = RedBox(tRedGL);
								var t0 = RedMesh(
									tRedGL,
									tGeometry,
									RedColorMaterial(tRedGL)
								);
								RedTest.run(t0['geometry'] === tGeometry);


							},
							true
						);
						RedTest.test(
							"성공테스트 : get 테스트",
							function () {

								var tGeometry = RedBox(tRedGL);
								var t0 = RedMesh(
									tRedGL,
									tGeometry,
									RedColorMaterial(tRedGL)
								);
								RedTest.run(t0['_geometry'] === tGeometry);


							},
							true
						);
						RedTest.test(
							"성공테스트 : set 테스트",
							function () {

								var tPlaneGeometry = RedPlane(tRedGL);
								var t0 = RedMesh(
									tRedGL,
									RedBox(tRedGL),
									RedColorMaterial(tRedGL)
								);
								t0['geometry'] = tPlaneGeometry;
								RedTest.run(t0['geometry'] === tPlaneGeometry);


							},
							true
						);
					}
				);
				RedTest.testGroup(
					"RedMesh( redGL, geometry, <b>material</b> )",
					function () {
						RedTest.test(
							"성공테스트 : 미입력 허용함 - 지오메트리 계산만 하고싶을수도 있으니까..(뼈대같은거)",
							function () {

								try {
									var t0 = RedMesh(
										tRedGL,
										RedBox(tRedGL)
									);
									console.log(t0);
									RedTest.run(true);

								} catch (error) {
									RedTest.run(false, error);

								}

							},
							true
						);
						RedTest.test(
							"실패테스트 : RedBaseMaterial Instance가 아닌경우",
							function () {

								try {
									var t0 = RedMesh(
										tRedGL,
										RedBox(tRedGL),
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
							"성공테스트 : get 테스트",
							function () {

								var t0 = RedMesh(
									tRedGL,
									RedBox(tRedGL),
									tMaterial
								);
								RedTest.run(t0['material'] === tMaterial);


							},
							true
						);
						RedTest.test(
							"성공테스트 : set 테스트",
							function () {

								var t0 = RedMesh(
									tRedGL,
									RedBox(tRedGL),
									RedColorMaterial(tRedGL)
								);
								t0['material'] = tMaterial;
								RedTest.run(t0['material'] === tMaterial);

								tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
							},
							true
						);
					}
				);
				RedTest.testGroup(
					"(RedBaseObject3D extended Instance).<b>addFilter</b>( filter )",
					function () {
						RedTest.test(
							"실패테스트 : 미입력",
							function () {

								var t0 = RedMesh(
									tRedGL,
									RedBox(tRedGL),
									RedColorMaterial(tRedGL)
								);
								try {
									t0.addFilter(null);
									RedTest.run(true);

								} catch (error) {
									RedTest.run(false, error);

								}

							},
							false
						);
						RedTest.test(
							"성공테스트 : RedBaseFilter 확장 인스턴스 입력",
							function () {

								var t0 = RedMesh(
									tRedGL,
									RedBox(tRedGL),
									RedColorMaterial(tRedGL)
								);
								var tFilter0 = RedFilter_Gray(tRedGL);
								t0.addFilter(tFilter0);
								RedTest.run(t0['_filterList'][0] === tFilter0);


							},
							true
						);
						RedTest.test(
							"실패테스트 : 문자입력",
							function () {

								var t0 = RedMesh(
									tRedGL,
									RedBox(tRedGL),
									RedColorMaterial(tRedGL)
								);
								try {
									t0.addFilter('failTest');
									RedTest.run(true);

								} catch (error) {
									RedTest.run(false, error);

								}

							},
							false
						);
						RedTest.test(
							"성공테스트 : 추가후 _filterList.length 정상적으로 늘어나는지 확인",
							function () {

								var t0 = RedMesh(
									tRedGL,
									RedBox(tRedGL),
									RedColorMaterial(tRedGL)
								);
								var tFilter0 = RedFilter_Gray(tRedGL);
								t0.addFilter(tFilter0);
								t0.addFilter(tFilter0);
								RedTest.run(t0['_filterList'].length);


							}, 2)
					}
				);
				RedTest.testGroup(
					"(RedBaseObject3D extended Instance).<b>removeFilter</b>( filter )",
					function () {
						RedTest.test(
							"성공테스트 : 동작 확인",
							function () {

								var t0 = RedMesh(
									tRedGL,
									RedBox(tRedGL),
									RedColorMaterial(tRedGL)
								);
								var tFilter0 = RedFilter_Gray(tRedGL);
								t0.addFilter(tFilter0);
								t0.removeFilter(tFilter0);
								RedTest.run(t0['_filterList'].length);


							}, 0);
						RedTest.test(
							"성공테스트 : 미입력 해도 에러가 안나야함",
							function () {

								var t0 = RedMesh(
									tRedGL,
									RedBox(tRedGL),
									RedColorMaterial(tRedGL)
								);
								try {
									t0.removeFilter();
									RedTest.run(true);

								} catch (error) {
									RedTest.run(false, error);

								}

							},
							true
						);
						RedTest.test(
							"성공테스트 : _filterList에 없는 녀석을 제거를 시도해도 에러가 안나야함",
							function () {

								var t0 = RedMesh(
									tRedGL,
									RedBox(tRedGL),
									RedColorMaterial(tRedGL)
								);
								var tFilter0 = RedFilter_Gray(tRedGL);
								t0.addFilter(tFilter0);
								t0.removeFilter(RedFilter_Threshold(tRedGL));
								RedTest.run(t0['_filterList'].length);


							}, 1)
					}
				);
				RedTest.testGroup(
					"(RedBaseObject3D extended Instance).<b>removeAllFilter</b>()",
					function () {
						RedTest.test(
							"동작 확인",
							function () {

								var t0 = RedMesh(
									tRedGL,
									RedBox(tRedGL),
									RedColorMaterial(tRedGL)
								);
								var tFilter0 = RedFilter_Gray(tRedGL);
								t0.addFilter(tFilter0);
								t0.addFilter(tFilter0);
								t0.addFilter(tFilter0);
								t0.addFilter(tFilter0);
								t0.addFilter(tFilter0);
								t0.addFilter(tFilter0);
								t0.addFilter(tFilter0);
								t0.addFilter(tFilter0);
								t0.addFilter(tFilter0);
								console.log(t0['_filterList'].length);
								t0.removeAllFilter();
								RedTest.run(t0['_filterList'].length);


							}, 0)
					}
				);
			}
		);
	}
);
