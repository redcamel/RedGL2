"use strict";
RedGL( document.createElement( 'canvas' ), function ( v ) {
	var tRedGL = this;
	redSuite(
		"RedColorPhongTextureMaterial 테스트",
		redGroup(
			"생성 확인",
			redTest( "기본 생성 테스트", function ( unit, title ) {
				try {
					RedColorPhongTextureMaterial( tRedGL );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true )
		),
		redGroup(
			"인자테스트",
			redTest( "인자테스트 ( redGL, hexColor, alpha ) : redGL - RedGL instance만 허용.", function ( unit, title ) {
				try {
					RedColorPhongTextureMaterial( 1 );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),

			redTest( "인자테스트 ( redGL, hexColor, alpha ) : hexColor - #xxxxxx or #xxx 만 허용 - 1", function ( unit, title ) {
				try {
					RedColorPhongTextureMaterial( tRedGL, 1 );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 ( redGL, hexColor, alpha ) : hexColor - #xxxxxx or #xxx 만 허용 - '#2233'", function ( unit, title ) {
				try {
					RedColorPhongTextureMaterial( tRedGL, '#2233' );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "생성인자 반영되는지 체크 : hexColor - #556677", function ( unit, title ) {
				var t0 = RedColorPhongTextureMaterial( tRedGL, '#556677' );
				unit.run( t0['color'] )
			}, '#556677' ),
			redTest( "생성인자 반영되는지 체크 : hexColor - #fff", function ( unit, title ) {
				var t0 = RedColorPhongTextureMaterial( tRedGL, '#fff' );
				unit.run( t0['color'] )
			}, '#fff' ),
			redTest( "생성인자 반영되는지 체크 : hexColor - #fff", function ( unit, title ) {
				var t0 = RedColorPhongTextureMaterial( tRedGL, '#fff' );
				unit.run( t0['_color'][0] + '_' + t0['_color'][1] + '_' + t0['_color'][2] )
			}, '1_1_1' ),
			redTest( "생성인자 반영되는지 체크 : alpha - 0.5", function ( unit, title ) {
				var t0 = RedColorPhongTextureMaterial( tRedGL, '#556677', 0.5 );
				unit.run( t0['alpha'] )
			}, 0.5 ),
			redTest( "생성인자 반영되는지 체크 : alpha - 0.5", function ( unit, title ) {
				var t0 = RedColorPhongTextureMaterial( tRedGL, '#556677', 0.5 );
				unit.run( t0['_color'][3] )
			}, 0.5 ),
			redTest( "생성인자 반영되는지 체크 : hexColor & alpha", function ( unit, title ) {
				var t0 = RedColorPhongTextureMaterial( tRedGL, '#fff', 0.5 );
				unit.run( t0['_color'][0] + '_' + t0['_color'][1] + '_' + t0['_color'][2] + '_' + t0['_color'][3] )
			}, '1_1_1_0.5' )
		)
	)
} )
