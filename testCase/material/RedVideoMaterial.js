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
		var testVideoTexture = RedVideoTexture(tRedGL, '../../asset/mov_bbb.mp4');

		RedTest.testGroup(
			"RedVideoMaterial( redGL, diffuseTexture )",
			function () {
				RedTest.test(
					"성공테스트 : 기본 생성 테스트",
					function () {
						try {
							RedVideoMaterial(tRedGL, testVideoTexture);
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
							RedVideoMaterial(1);
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
			"RedVideoMaterial( redGL, <b>diffuseTexture</b> )",
			function () {
				RedTest.test(
					"실패테스트 : 미입력",
					function () {
						try {
							RedVideoMaterial(tRedGL);
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
							RedVideoMaterial(tRedGL, 1);
							RedTest.run(true)
						} catch (error) {
							RedTest.run(false, error)
						}
					},
					false
				);
				RedTest.test(
					"성공테스트 : RedVideoTexture Instance 입력",
					function () {
						try {
							RedVideoMaterial(tRedGL, testVideoTexture);
							RedTest.run(true)
						} catch (error) {
							RedTest.run(false, error)
						}
					},
					true
				);
				RedTest.test(
					"실패테스트 : RedBitmapTexture Instance 입력",
					function () {
						try {
							RedVideoMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
							RedTest.run(true)
						} catch (error) {
							RedTest.run(false, error)
						}
					},
					false
				);
				RedTest.test(
					"실패테스트 : RedBitmapCubeTexture Instance 입력",
					function () {
						try {
							RedVideoMaterial(tRedGL, tRedGL._datas.emptyTexture['3d']);
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
			"(RedVideoMaterial Instance).<b>alpha</b> = value",
			function () {
				RedTest.test(
					"성공테스트 : 초기값",
					function () {
						var t0 = RedVideoMaterial(tRedGL, testVideoTexture);
						RedTest.run(t0['alpha'])
					},
					1
				);
				RedTest.test(
					"성공테스트 : 초기값",
					function () {
						var t0 = RedVideoMaterial(tRedGL, testVideoTexture);
						RedTest.run(t0['_alpha'])
					},
					1
				);
				RedTest.test(
					"성공테스트 : 0.5입력",
					function () {
						var t0 = RedVideoMaterial(tRedGL, testVideoTexture);
						t0['alpha'] = 0.5;
						RedTest.run(t0['alpha'])
					},
					0.5
				);
				RedTest.test(
					"성공테스트 : 1이상을 입력하면 1로 치환되는지",
					function () {
						var t0 = RedVideoMaterial(tRedGL, testVideoTexture);
						t0.alpha = 11111;
						RedTest.run(t0['alpha'])
					},
					1
				);
				RedTest.test(
					"성공테스트 : 0이하를 입력하면 0으로 치환되는지",
					function () {
						var t0 = RedVideoMaterial(tRedGL, testVideoTexture);
						t0.alpha = -11111;
						RedTest.run(t0['alpha']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					},
					0
				)
			}
		)

	}
);
//
// RedGL( document.createElement( 'canvas' ), function ( v ) {
// 	var tRedGL = this;
// 	redSuite(
// 		"RedVideoMaterial 테스트",
// 		RedTest.testGroup(
// 			"생성 확인",
// 			RedTest.test( "기본 생성 테스트", function ( unit, title ) {
// 				try {
// 					RedVideoMaterial( tRedGL, testVideoTexture );
// 					RedTest.run( true )
// 				} catch ( error ) {
// 					console.log( '///////////////////////////////////////////////////////////' )
// 					console.log( title, '\n', error )
// 					RedTest.run( false )
// 				}
// 			}, true )
// 		),
// 		RedTest.testGroup(
// 			"인자테스트 - redGL",
// 			RedTest.test( "인자테스트 ( redGL, videoTexture ) : redGL - RedGL instance만 허용.", function ( unit, title ) {
// 				try {
// 					RedVideoMaterial( 1 );
// 					RedTest.run( true )
// 				} catch ( error ) {
// 					console.log( '///////////////////////////////////////////////////////////' )
// 					console.log( title, '\n', error )
// 					RedTest.run( false )
// 				}
// 			}, false )
// 		),
// 		RedTest.testGroup(
// 			"인자테스트 - videoTexture",
// 			RedTest.test( "인자테스트 ( redGL, videoTexture ) : RedVideoTexture Instance 만 허용 - 미입력시", function ( unit, title ) {
// 				try {
// 					RedVideoMaterial( tRedGL );
// 					RedTest.run( true )
// 				} catch ( error ) {
// 					console.log( '///////////////////////////////////////////////////////////' )
// 					console.log( title, '\n', error )
// 					RedTest.run( false )
// 				}
// 			}, false ),
// 			RedTest.test( "인자테스트 ( redGL, videoTexture ) : RedVideoTexture Instance 만 허용 - 숫자입력시", function ( unit, title ) {
// 				try {
// 					RedVideoMaterial( tRedGL, 1 );
// 					RedTest.run( true )
// 				} catch ( error ) {
// 					console.log( '///////////////////////////////////////////////////////////' )
// 					console.log( title, '\n', error )
// 					RedTest.run( false )
// 				}
// 			}, false ),
// 			RedTest.test( "인자테스트 ( redGL, videoTexture ) : RedVideoTexture Instance 만 허용 - RedVideoTexture Instance 입력시", function ( unit, title ) {
// 				try {
// 					RedVideoMaterial( tRedGL, testVideoTexture );
// 					RedTest.run( true )
// 				} catch ( error ) {
// 					console.log( '///////////////////////////////////////////////////////////' )
// 					console.log( title, '\n', error )
// 					RedTest.run( false )
// 				}
// 			}, true ),
// 			RedTest.test( "인자테스트 ( redGL, videoTexture ) : RedVideoTexture Instance 만 허용 - RedBitmapTexture Instance 입력시", function ( unit, title ) {
// 				try {
// 					RedVideoMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'] );
// 					RedTest.run( true )
// 				} catch ( error ) {
// 					console.log( '///////////////////////////////////////////////////////////' )
// 					console.log( title, '\n', error )
// 					RedTest.run( false )
// 				}
// 			}, false ),
// 			RedTest.test( "인자테스트 ( redGL, videoTexture ) : RedVideoTexture Instance 만 허용 - RedBitmapCubeTexture Instance 입력시", function ( unit, title ) {
// 				try {
// 					RedVideoMaterial( tRedGL, tRedGL._datas.emptyTexture['3d'] );
// 					RedTest.run( true )
// 				} catch ( error ) {
// 					console.log( '///////////////////////////////////////////////////////////' )
// 					console.log( title, '\n', error )
// 					RedTest.run( false )
// 				}
// 			}, false )
// 		)
// 	)
// } )
