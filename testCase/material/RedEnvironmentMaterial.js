"use strict";
RedGL( document.createElement( 'canvas' ), function ( v ) {
	var tRedGL = this;
	redSuite(
		"RedEnvironmentMaterial 테스트",
		redGroup(
			"생성 확인",
			redTest( "기본 생성 테스트", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'] );
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
			redTest( "인자테스트 : redGL - RedGL instance만 허용.", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( 1 );
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
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - 미입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, null, tRedGL._datas.emptyTexture['3d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - 숫자입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, 1, tRedGL._datas.emptyTexture['3d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - RedBitmapTexture Instance 입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - RedBitmapCubeTexture Instance 입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['3d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false )
		),
		redGroup(
			"인자테스트 - environmentTexture",
			redTest( "인자테스트 : RedBitmapCubeTexture 만 허용 - 미입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 : RedBitmapCubeTexture 만 허용 - 숫자입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], 1 );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 : RedBitmapCubeTexture 만 허용 - RedBitmapTexture Instance 입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 : RedBitmapCubeTexture 만 허용 - RedBitmapCubeTexture Instance 입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true )
		),
		redGroup(
			"인자테스트 - normalTexture",
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - 미입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - 숫자입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'], 1 );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - RedBitmapTexture Instance 입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['2d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - RedBitmapCubeTexture Instance 입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['3d'] );
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
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - 미입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['2d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - 숫자입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['2d'], 1 );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - RedBitmapTexture Instance 입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - RedBitmapCubeTexture Instance 입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'] );
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
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - 숫자입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'], 1 );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - RedBitmapTexture Instance 입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자테스트 : RedBitmapTextureInstance 만 허용 - RedBitmapCubeTexture Instance 입력시", function ( unit, title ) {
				try {
					RedEnvironmentMaterial( tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d'] );
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
