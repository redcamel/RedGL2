"use strict";
RedGL( document.createElement( 'canvas' ), function ( v ) {
	var tRedGL = this;
	redSuite(
		"RedStandardMaterial 테스트",
		redGroup(
			"생성 확인",
			redTest( "기본 생성 테스트", function ( unit, title ) {
				try {
					RedStandardMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'] );
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
			redTest( "인자테스트 ( redGL, diffuseTexture ) : redGL - RedGL instance만 허용.", function ( unit, title ) {
				try {
					RedStandardMaterial( 1 );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false )
		),
		redGroup(
			"인자테스트 - diffuseTexture",
			redTest( "인자테스트 ( redGL, diffuseTexture ) : RedBitmapTextureInstance 만 허용 - 미입력시", function ( unit, title ) {
				try {
					RedBitmapMaterial( tRedGL );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 ( redGL, diffuseTexture ) : RedBitmapTextureInstance 만 허용 - 숫자입력시", function ( unit, title ) {
				try {
					RedStandardMaterial( tRedGL, 1 );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 ( redGL, diffuseTexture ) : RedBitmapTextureInstance 만 허용 - RedBitmapTexture Instance 입력시", function ( unit, title ) {
				try {
					RedStandardMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 ( redGL, diffuseTexture ) : RedBitmapTextureInstance 만 허용 - RedBitmapCubeTexture Instance 입력시", function ( unit, title ) {
				try {
					RedStandardMaterial( tRedGL, tRedGL._datas.emptyTexture['3d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false )
		),
		redGroup(
			"인자테스트 - normalTexture",
			redTest( "인자테스트 ( redGL, normalTexture ) : RedBitmapTextureInstance 만 허용 - 미입력시", function ( unit, title ) {
				try {
					RedBitmapMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 ( redGL, normalTexture ) : RedBitmapTextureInstance 만 허용 - 숫자입력시", function ( unit, title ) {
				try {
					RedStandardMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], 1 );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 ( redGL, normalTexture ) : RedBitmapTextureInstance 만 허용 - RedBitmapTexture Instance 입력시", function ( unit, title ) {
				try {
					RedStandardMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 ( redGL, normalTexture ) : RedBitmapTextureInstance 만 허용 - RedBitmapCubeTexture Instance 입력시", function ( unit, title ) {
				try {
					RedStandardMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false )
		),
		redGroup(
			"인자테스트 - specularTexture",
			redTest( "인자테스트 ( redGL, specularTexture ) : RedBitmapTextureInstance 만 허용 - 미입력시", function ( unit, title ) {
				try {
					RedBitmapMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 ( redGL, specularTexture ) : RedBitmapTextureInstance 만 허용 - 숫자입력시", function ( unit, title ) {
				try {
					RedStandardMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'], 1 );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 ( redGL, specularTexture ) : RedBitmapTextureInstance 만 허용 - RedBitmapTexture Instance 입력시", function ( unit, title ) {
				try {
					RedStandardMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 ( redGL, specularTexture ) : RedBitmapTextureInstance 만 허용 - RedBitmapCubeTexture Instance 입력시", function ( unit, title ) {
				try {
					RedStandardMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false )
		),
		redGroup(
			"인자테스트 - displacementTexture",
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - 미입력시", function ( unit, title ) {
				try {
					RedBitmapMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - 숫자입력시", function ( unit, title ) {
				try {
					RedStandardMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'], 1 );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - RedBitmapTexture Instance 입력시", function ( unit, title ) {
				try {
					RedStandardMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - RedBitmapCubeTexture Instance 입력시", function ( unit, title ) {
				try {
					RedStandardMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'] );
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
