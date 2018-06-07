"use strict";
var tRedGL
RedGL( document.createElement( 'canvas' ), function ( v ) {
	tRedGL = this

	redSuite(
		"RedVideoTexture Test",
		redGroup(
			"생성 확인",
			redTest( "생성확인", function ( unit, title ) {
				var t0;
				t0 = RedVideoTexture( tRedGL, '../../asset/mov_bbb.mp4' )
				unit.run( t0 instanceof RedVideoTexture )
			}, true )
		),
		redGroup(
			"src",
			redTest( "src : 미입력", function ( unit, title ) {
				try {
					RedVideoTexture( tRedGL )
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "src : 숫자입력", function ( unit, title ) {
				try {
					RedVideoTexture( tRedGL, 1 )
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "src : HTMLVideoElement 이외 Element입력", function ( unit, title ) {
				try {
					RedVideoTexture( tRedGL, document.createElement( 'div' ) )
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "src : HTMLVideoElement 입력", function ( unit, title ) {
				try {
					var t0 = document.createElement( 'video' )
					t0.src = '../../asset/mov_bbb.mp4'
					console.log(t0)
					RedVideoTexture( tRedGL,t0  )
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true )
		),
		redGroup(
			"callback",
			redTest( "callback : 미입력", function ( unit, title ) {
				try {
					RedVideoTexture( tRedGL, '../../asset/mov_bbb.mp4' )
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "callback : 성공테스트", function ( unit, title ) {
				RedVideoTexture( tRedGL, '../../asset/mov_bbb.mp4', function ( v ) {
					unit.run( v )
				} )
			}, true ),
			redTest( "callback : 실패테스트", function ( unit, title ) {
				RedVideoTexture( tRedGL, '~~~', function ( v ) {
					unit.run( v )
				} )
			}, false )
		)
	)
} )
