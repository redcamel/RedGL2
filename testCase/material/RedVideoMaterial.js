"use strict";
RedGL.setDoNotPrepareProgram();
"use strict";
RedGL.setDoNotPrepareProgram();
RedGL(document.createElement('canvas'), function (v) {
    var tRedGL = this;
    var testVideoTexture = RedVideoTexture(tRedGL, '../../asset/mov_bbb.mp4')
    redSuite(
        "RedVideoMaterial 테스트",
        redGroup(
            "RedVideoMaterial( redGL, diffuseTexture )",
            redTest("성공테스트 : 기본 생성 테스트", function (unit, title) {
                try {
                    RedVideoMaterial(tRedGL, testVideoTexture);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedGL instance만 허용.", function (unit, title) {
                try {
                    RedVideoMaterial(1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "RedVideoMaterial( redGL, <b>diffuseTexture</b> )",
            redTest("실패테스트 : 미입력", function (unit, title) {
                try {
                    RedVideoMaterial(tRedGL);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    RedVideoMaterial(tRedGL, 1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedVideoTexture Instance 입력", function (unit, title) {
                try {
                    RedVideoMaterial(tRedGL, testVideoTexture);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    RedVideoMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    RedVideoMaterial(tRedGL, tRedGL._datas.emptyTexture['3d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedVideoMaterial Instance).<b>alpha</b> = value",
            redTest("성공테스트 : 초기값", function (unit, title) {
                var t0 = RedVideoMaterial(tRedGL, testVideoTexture);
                unit.run(t0['alpha'])
            }, 1),
            redTest("성공테스트 : 초기값", function (unit, title) {
                var t0 = RedVideoMaterial(tRedGL, testVideoTexture);
                unit.run(t0['_alpha'])
            }, 1),
            redTest("성공테스트 : 0.5입력", function (unit, title) {
                var t0 = RedVideoMaterial(tRedGL, testVideoTexture);
                t0['alpha'] = 0.5
                unit.run(t0['alpha'])
            }, 0.5),
            redTest("성공테스트 : 1이상을 입력하면 1로 치환되는지", function (unit, title) {
                var t0 = RedVideoMaterial(tRedGL, testVideoTexture);
                t0.alpha = 11111
                unit.run(t0['alpha'])
            }, 1),
            redTest("성공테스트 : 0이하를 입력하면 0으로 치환되는지", function (unit, title) {
                var t0 = RedVideoMaterial(tRedGL, testVideoTexture);
                t0.alpha = -11111
                unit.run(t0['alpha'])
            }, 0)
        )
    )
})
//
// RedGL( document.createElement( 'canvas' ), function ( v ) {
// 	var tRedGL = this;
// 	redSuite(
// 		"RedVideoMaterial 테스트",
// 		redGroup(
// 			"생성 확인",
// 			redTest( "기본 생성 테스트", function ( unit, title ) {
// 				try {
// 					RedVideoMaterial( tRedGL, testVideoTexture );
// 					unit.run( true )
// 				} catch ( error ) {
// 					console.log( '///////////////////////////////////////////////////////////' )
// 					console.log( title, '\n', error )
// 					unit.run( false )
// 				}
// 			}, true )
// 		),
// 		redGroup(
// 			"인자테스트 - redGL",
// 			redTest( "인자테스트 ( redGL, videoTexture ) : redGL - RedGL instance만 허용.", function ( unit, title ) {
// 				try {
// 					RedVideoMaterial( 1 );
// 					unit.run( true )
// 				} catch ( error ) {
// 					console.log( '///////////////////////////////////////////////////////////' )
// 					console.log( title, '\n', error )
// 					unit.run( false )
// 				}
// 			}, false )
// 		),
// 		redGroup(
// 			"인자테스트 - videoTexture",
// 			redTest( "인자테스트 ( redGL, videoTexture ) : RedVideoTexture Instance 만 허용 - 미입력시", function ( unit, title ) {
// 				try {
// 					RedVideoMaterial( tRedGL );
// 					unit.run( true )
// 				} catch ( error ) {
// 					console.log( '///////////////////////////////////////////////////////////' )
// 					console.log( title, '\n', error )
// 					unit.run( false )
// 				}
// 			}, false ),
// 			redTest( "인자테스트 ( redGL, videoTexture ) : RedVideoTexture Instance 만 허용 - 숫자입력시", function ( unit, title ) {
// 				try {
// 					RedVideoMaterial( tRedGL, 1 );
// 					unit.run( true )
// 				} catch ( error ) {
// 					console.log( '///////////////////////////////////////////////////////////' )
// 					console.log( title, '\n', error )
// 					unit.run( false )
// 				}
// 			}, false ),
// 			redTest( "인자테스트 ( redGL, videoTexture ) : RedVideoTexture Instance 만 허용 - RedVideoTexture Instance 입력시", function ( unit, title ) {
// 				try {
// 					RedVideoMaterial( tRedGL, testVideoTexture );
// 					unit.run( true )
// 				} catch ( error ) {
// 					console.log( '///////////////////////////////////////////////////////////' )
// 					console.log( title, '\n', error )
// 					unit.run( false )
// 				}
// 			}, true ),
// 			redTest( "인자테스트 ( redGL, videoTexture ) : RedVideoTexture Instance 만 허용 - RedBitmapTexture Instance 입력시", function ( unit, title ) {
// 				try {
// 					RedVideoMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'] );
// 					unit.run( true )
// 				} catch ( error ) {
// 					console.log( '///////////////////////////////////////////////////////////' )
// 					console.log( title, '\n', error )
// 					unit.run( false )
// 				}
// 			}, false ),
// 			redTest( "인자테스트 ( redGL, videoTexture ) : RedVideoTexture Instance 만 허용 - RedBitmapCubeTexture Instance 입력시", function ( unit, title ) {
// 				try {
// 					RedVideoMaterial( tRedGL, tRedGL._datas.emptyTexture['3d'] );
// 					unit.run( true )
// 				} catch ( error ) {
// 					console.log( '///////////////////////////////////////////////////////////' )
// 					console.log( title, '\n', error )
// 					unit.run( false )
// 				}
// 			}, false )
// 		)
// 	)
// } )
