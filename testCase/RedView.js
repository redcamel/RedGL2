"use strict";
"use strict";
RedGL( document.createElement( 'canvas' ), function ( v ) {
	var tWorld, tScene, tCamera;
	var tView;
	tScene = new RedScene( this );
	tCamera = new RedCamera();
	tView = new RedView( 'tView', tScene, tCamera )
	console.log( tView )
	redSuite(
		"RedView Test",
		redGroup(
			"생성 확인",
			redTest( "new 생성확인", function ( unit, title ) {
				var t0;
				t0 = new RedView( 'testView', tScene, tCamera )
				unit.run( t0 instanceof RedView )
			}, true ),
			redTest( "함수실행 생성확인", function ( unit, title ) {
				var t0;
				t0 = RedView( 'testView2', tScene, tCamera )
				unit.run( t0 instanceof RedView )
			}, true ),
			redTest( "인자확인 : 생성키 중복 방지확인", function ( unit, title ) {
				try {
					RedView( 'testView2', tScene, tCamera )
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )

					unit.run( false )
				}
			}, false ),

			redTest( "인자확인 : scene이 RedScene이 아닐떄", function ( unit, title ) {
				try {
					RedView( 'testScene', 1, tCamera )
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )

					unit.run( false )
				}
			}, false ),
			redTest( "인자확인 : camera가 RedCameara가 아닐떄", function ( unit, title ) {
				try {
					RedView( 'testScene', tScene, 1 )
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false )
		),
		redGroup(
			"키로 검색 확인",
			redTest( "키로 찾기 확인", function ( unit, title ) {
				unit.run( RedView( 'tView' ) )
			}, tView ),
			redTest( "키가 문자열이 아닐떄", function ( unit, title ) {
				try {
					RedView( 1, tScene, tCamera )
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )

					unit.run( false )
				}
			}, false )
		),
		redGroup(
			"setSize",
			redTest( "setSize : Number, Number", function ( unit, title ) {
				var t0;
				t0 = RedView( 'testSetSize', tScene, tCamera )
				t0.setSize( 50, 50 )
				unit.run( t0['_width'] + '_' + t0['_height'] )
			}, '50_50' ),
			redTest( "setSize : %, %", function ( unit, title ) {
				var t0;
				t0 = RedView( 'testSetSize' )
				t0.setSize( '50%', '50%' )
				unit.run( t0['_width'] + '_' + t0['_height'] )
			}, '50%_50%' ),
			redTest( "setSize : Number, %", function ( unit, title ) {
				var t0;
				t0 = RedView( 'testSetSize' )
				t0.setSize( 50, '50%' )
				unit.run( t0['_width'] + '_' + t0['_height'] )
			}, '50_50%' ),
			redTest( "setSize : %, Number", function ( unit, title ) {
				var t0;
				t0 = RedView( 'testSetSize' )
				t0.setSize( '50%', 50 )
				unit.run( t0['_width'] + '_' + t0['_height'] )
			}, '50%_50' )
		),
		redGroup(
			"setLocation",
			redTest( "setLocation : Number, Number", function ( unit, title ) {
				var t0;
				t0 = RedView( 'testSetLocation', tScene, tCamera )
				t0.setLocation( 30, 30 )
				unit.run( t0['_x'] + '_' + t0['_y'] )
			}, '30_30' ),
			redTest( "setLocation : %, %", function ( unit, title ) {
				var t0;
				t0 = RedView( 'testSetLocation' )
				t0.setLocation( '30%', '30%' )
				unit.run( t0['_x'] + '_' + t0['_y'] )
			}, '30%_30%' ),
			redTest( "setLocation : Number, %", function ( unit, title ) {
				var t0;
				t0 = RedView( 'testSetLocation' )
				t0.setLocation( 30, '30%' )
				unit.run( t0['_x'] + '_' + t0['_y'] )
			}, '30_30%' ),
			redTest( "setLocation : %, Number", function ( unit, title ) {
				var t0;
				t0 = RedView( 'testSetLocation' )
				t0.setLocation( '30%', 30 )
				unit.run( t0['_x'] + '_' + t0['_y'] )
			}, '30%_30' )
		)
	)
} )
