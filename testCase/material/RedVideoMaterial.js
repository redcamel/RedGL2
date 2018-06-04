"use strict";
RedGL( document.createElement( 'canvas' ), function ( v ) {
	var tRedGL = this;
	var testVideoTexture = RedVideoTexture( tRedGL, '../../asset/mov_bbb.mp4' )
	redSuite(
		"RedVideoMaterial 테스트",
		redGroup(
			"생성 확인",
			redTest( "기본 생성 테스트", function ( unit, title ) {
				try {
					RedVideoMaterial( tRedGL, testVideoTexture );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true )
		),
		redGroup(
			"인자테스트 - redGL",
			redTest( "인자테스트 ( redGL, videoTexture ) : redGL - RedGL instance만 허용.", function ( unit, title ) {
				try {
					RedVideoMaterial( 1 );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false )
		),
		redGroup(
			"인자테스트 - videoTexture",
			redTest( "인자테스트 ( redGL, videoTexture ) : RedVideoTexture Instance 만 허용 - 미입력시", function ( unit, title ) {
				try {
					RedVideoMaterial( tRedGL );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 ( redGL, videoTexture ) : RedVideoTexture Instance 만 허용 - 숫자입력시", function ( unit, title ) {
				try {
					RedVideoMaterial( tRedGL, 1 );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 ( redGL, videoTexture ) : RedVideoTexture Instance 만 허용 - RedVideoTexture Instance 입력시", function ( unit, title ) {
				try {
					RedVideoMaterial( tRedGL, testVideoTexture );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 ( redGL, videoTexture ) : RedVideoTexture Instance 만 허용 - RedBitmapTexture Instance 입력시", function ( unit, title ) {
				try {
					RedVideoMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 ( redGL, videoTexture ) : RedVideoTexture Instance 만 허용 - RedBitmapCubeTexture Instance 입력시", function ( unit, title ) {
				try {
					RedVideoMaterial( tRedGL, tRedGL._datas.emptyTexture['3d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false )
		)
	)
} )
