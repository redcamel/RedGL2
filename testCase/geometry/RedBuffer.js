"use strict";
RedGL( document.createElement( 'canvas' ), function ( v ) {
	var tRedGL = this;
	var testArrayData = [
		0, 1, 2,
		1, 2, 3,
		3, 2, 1
	]
	var testTypedArrayBufferData = new Float32Array( testArrayData )
	var testTypedElementArrayBufferData = new Uint8Array( testArrayData )
	redSuite(
		"RedBuffer Test",
		redGroup(
			"생성 확인",
			redTest( "기본 생성 테스트", function ( unit, title ) {
				try {
					var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testTypedArrayBufferData, [RedInterleaveInfo( 'aTest', 3 )] );
					console.log( t0 )
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, true ),
			redTest( "인자확인 ( redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )\nredGL : 실패테스트", function ( unit, title ) {
				try {
					RedBuffer( 1, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testTypedArrayBufferData, [] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자확인 ( redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )\ntypedArrayData : typedArray만 허용 테스트 ", function ( unit, title ) {
				try {
					RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ELEMENT_ARRAY_BUFFER, [] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자확인 ( redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )\nkey : 문자만 허용 테스트 ", function ( unit, title ) {
				try {
					RedBuffer( tRedGL, 1, RedBuffer.ARRAY_BUFFER, RedBuffer.ARRAY_BUFFER, testTypedArrayBufferData );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자확인 ( redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )\n신규생성 - bufferType : RedBuffer.ARRAY_BUFFER or RedBuffer.ELEMENT_ARRAY_BUFFER 만 허용 테스트 ", function ( unit, title ) {
				try {
					RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), '이상한 bufferType키를 넣어봄', testTypedArrayBufferData );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자확인 ( redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )\n신규생성 - interleaveDefineInfoList : 미정의의경우  체크 테스트 ", function ( unit, title ) {
				try {
					RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testTypedArrayBufferData );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
			redTest( "인자확인 ( redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )\n신규생성 - interleaveDefineInfoList : 내부 데이터가 RedInterleaveInfo Instance가 아닌경우 체크 테스트 ", function ( unit, title ) {
				try {
					RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testTypedArrayBufferData, [] );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),

			redTest( "인자확인 ( redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )\n최소 인자 확인테스트", function ( unit, title ) {
				try {
					RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID() );
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false )
		),
		redGroup(
			"중복 정의 방지 확인",
			redTest( "같은키가 발견될경우 기존케쉬된값 리턴", function ( unit, title ) {
				var testKey = "checkCacheKey"
				var t0 = RedBuffer( tRedGL, testKey, RedBuffer.ARRAY_BUFFER, testTypedArrayBufferData, [RedInterleaveInfo( 'aTest', 3 )] );
				var t1 = RedBuffer( tRedGL, testKey, RedBuffer.ARRAY_BUFFER );
				unit.run( t0 == t1 )
			}, true )
		),
		redGroup(
			"데이터확인",
			redTest( "키네임이 잘 물리는지", function ( unit, title ) {
				var t0 = RedBuffer( tRedGL, 'testkeyName', RedBuffer.ARRAY_BUFFER, testTypedArrayBufferData, [RedInterleaveInfo( 'aTest', 3 )] );
				unit.run( t0['key'] )
			}, 'testkeyName' ),
			redTest( "버퍼타입이 잘 물리는지 : RedBuffer.ARRAY_BUFFER", function ( unit, title ) {
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testTypedArrayBufferData, [RedInterleaveInfo( 'aTest', 3 )] );
				unit.run( t0['bufferType'] )
			}, RedBuffer.ARRAY_BUFFER ),
			redTest( "버퍼타입이 실제 GL 상수로 잘 물리는지 : RedBuffer.ARRAY_BUFFER => glBufferType", function ( unit, title ) {
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testTypedArrayBufferData, [RedInterleaveInfo( 'aTest', 3 )] );
				unit.run( t0['glBufferType'] )
			}, tRedGL.gl.ARRAY_BUFFER ),
			redTest( "버퍼타입이 잘 물리는지 : RedBuffer.ELEMENT_ARRAY_BUFFER", function ( unit, title ) {
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ELEMENT_ARRAY_BUFFER, testTypedElementArrayBufferData, [RedInterleaveInfo( 'aTest', 3 )] );
				unit.run( t0['bufferType'] )
			}, RedBuffer.ELEMENT_ARRAY_BUFFER ),
			redTest( "버퍼타입이 실제 GL 상수로 잘 물리는지 : RedBuffer.ELEMENT_ARRAY_BUFFER => glBufferType", function ( unit, title ) {
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ELEMENT_ARRAY_BUFFER, testTypedElementArrayBufferData, [RedInterleaveInfo( 'aTest', 3 )] );
				unit.run( t0['glBufferType'] )
			}, tRedGL.gl.ELEMENT_ARRAY_BUFFER ),
			redTest( "데이터가 잘들어가나고 버퍼데이터로 물리는지", function ( unit, title ) {
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testTypedArrayBufferData, [RedInterleaveInfo( 'aTest', 3 )] );
				unit.run( t0['data'] == testTypedArrayBufferData )
			}, true ),
			redTest( "인터리브데이터 리스트가 잘 들어가는지", function ( unit, title ) {
				var testInterleaveInfoList = [RedInterleaveInfo( 'aTest', 3 )]
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testTypedArrayBufferData, testInterleaveInfoList );
				unit.run( t0['interleaveDefineInfoList'] == testInterleaveInfoList )
			}, true )
		),
		redGroup(
			"데이터 타입 확인",
			redTest( "glArrayType - Float32Array : gl.FLOAT", function ( unit, title ) {
				var testData = new Float32Array( [
					0, 1, 2,
					1, 2, 3,
					3, 2, 1
				] )
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testData, [RedInterleaveInfo( 'aTest', 3 )] );
				unit.run( t0['glArrayType'] )
			}, tRedGL.gl.FLOAT ),
			redTest( "glArrayType - Float64Array : gl.FLOAT", function ( unit, title ) {
				var testData = new Float64Array( [
					0, 1, 2,
					1, 2, 3,
					3, 2, 1
				] )
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testData, [RedInterleaveInfo( 'aTest', 3 )] );
				unit.run( t0['glArrayType'] )
			}, tRedGL.gl.FLOAT ),
			redTest( "glArrayType - Uint8Array : gl.UNSIGNED_BYTE", function ( unit, title ) {
				var testData = new Uint8Array( [
					0, 1, 2,
					1, 2, 3,
					3, 2, 1
				] )
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ELEMENT_ARRAY_BUFFER, testData );
				unit.run( t0['glArrayType'] )
			}, tRedGL.gl.UNSIGNED_BYTE ),
			redTest( "glArrayType - Uint16Array : gl.UNSIGNED_SHORT", function ( unit, title ) {
				var testData = new Uint16Array( [
					0, 1, 2,
					1, 2, 3,
					3, 2, 1
				] )
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ELEMENT_ARRAY_BUFFER, testData );
				unit.run( t0['glArrayType'] )
			}, tRedGL.gl.UNSIGNED_SHORT ),
			redTest( "glArrayType - Uint32Array : gl.UNSIGNED_INT", function ( unit, title ) {
				var testData = new Uint32Array( [
					0, 1, 2,
					1, 2, 3,
					3, 2, 1
				] )
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ELEMENT_ARRAY_BUFFER, testData );
				unit.run( t0['glArrayType'] )
			}, tRedGL.gl.UNSIGNED_INT ),
			redTest( "glArrayType - Int8Array : gl.BYTE", function ( unit, title ) {
				var testData = new Int8Array( [
					0, 1, 2,
					1, 2, 3,
					3, 2, 1
				] )
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ELEMENT_ARRAY_BUFFER, testData );
				unit.run( t0['glArrayType'] )
			}, tRedGL.gl.BYTE ),
			redTest( "glArrayType - Int16Array : gl.SHORT", function ( unit, title ) {
				var testData = new Int16Array( [
					0, 1, 2,
					1, 2, 3,
					3, 2, 1
				] )
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ELEMENT_ARRAY_BUFFER, testData );
				unit.run( t0['glArrayType'] )
			}, tRedGL.gl.SHORT ),
			redTest( "glArrayType - Int32Array : gl.INT", function ( unit, title ) {
				var testData = new Int32Array( [
					0, 1, 2,
					1, 2, 3,
					3, 2, 1
				] )
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ELEMENT_ARRAY_BUFFER, testData );
				unit.run( t0['glArrayType'] )
			}, tRedGL.gl.INT )
		),
		redGroup(
			"pointNum / stride 계산확인",
			redTest( "RedBuffer.ARRAY_BUFFER 타입 - pointNum 계산확인", function ( unit, title ) {
				var testData = new Float32Array( [
					0, 1, 2,
					1, 2, 3,
					3, 2, 1
				] )
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testData,
					[
						RedInterleaveInfo( 'aTest', 3 )
					]
				);
				unit.run( t0['pointNum'] )
			}, 3 ),
			redTest( "RedBuffer.ARRAY_BUFFER 타입 - pointNum 계산확인", function ( unit, title ) {
				var testData = new Float32Array( [
					0, 1, 2, 5, 5, 5,
					1, 2, 3, 5, 5, 5,
					3, 2, 1, 5, 5, 5
				] )
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testData,
					[
						RedInterleaveInfo( 'aTest', 3 )
					]
				);
				unit.run( t0['pointNum'] )
			}, 6 ),
			redTest( "RedBuffer.ARRAY_BUFFER 타입 - pointNum 계산확인", function ( unit, title ) {
				var testData = new Float32Array( [
					0, 1, 2, 5, 5, 5,
					1, 2, 3, 5, 5, 5,
					3, 2, 1, 5, 5, 5
				] )
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testData,
					[
						RedInterleaveInfo( 'aTest', 3 ),
						RedInterleaveInfo( 'aTest2', 3 )
					]
				);
				unit.run( t0['pointNum'] )
			}, 3 ),
			redTest( "RedBuffer.ARRAY_BUFFER 타입 - stride 계산확인", function ( unit, title ) {
				var testData = new Float32Array( [
					0, 1, 2,
					1, 2, 3,
					3, 2, 1
				] )
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testData,
					[
						RedInterleaveInfo( 'aTest', 3 )
					]
				);
				unit.run( t0['stride'] )
			}, 0 ),
			redTest( "RedBuffer.ARRAY_BUFFER 타입 - stride 계산확인", function ( unit, title ) {
				var testData = new Float32Array( [
					0, 1, 2, 5, 5, 5,
					1, 2, 3, 5, 5, 5,
					3, 2, 1, 5, 5, 5
				] )
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testData,
					[
						RedInterleaveInfo( 'aTest', 3 ),
						RedInterleaveInfo( 'aTest2', 3 )
					]
				);
				unit.run( t0['stride'] )
			}, 6 ),
			redTest( "RedBuffer.ARRAY_BUFFER 타입 - interleaveDefineInfoList내의 interleaveDefineInfo의 offset이 잘 계산되나 확인", function ( unit, title ) {
				var testData = new Float32Array( [
					0, 1, 2, 5, 5,
					1, 2, 3, 5, 5,
					3, 2, 1, 5, 5
				] )
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testData,
					[
						RedInterleaveInfo( 'aTest', 3 ),
						RedInterleaveInfo( 'aTest2', 2 )
					]
				);
				unit.run( t0['interleaveDefineInfoList'][0]['offset'] )
			}, 0 ),
			redTest( "RedBuffer.ARRAY_BUFFER 타입 - interleaveDefineInfoList내의 interleaveDefineInfo의 offset이 잘 계산되나 확인", function ( unit, title ) {
				var testData = new Float32Array( [
					0, 1, 2, 5, 5,
					1, 2, 3, 5, 5,
					3, 2, 1, 5, 5
				] )
				var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testData,
					[
						RedInterleaveInfo( 'aTest', 3 ),
						RedInterleaveInfo( 'aTest2', 2 )
					]
				);
				unit.run( t0['interleaveDefineInfoList'][1]['offset'] )
			}, 3 ),
			redTest( "RedBuffer.ARRAY_BUFFER 타입 - pointNum 계산확인 : 정수로 떨어지지 않을때 체크 확인", function ( unit, title ) {
				var testData = new Float32Array( [
					0, 1, 2,
					1, 2, 3,
					3, 2
				] )
				try {
					var t0 = RedBuffer( tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testData,
						[
							RedInterleaveInfo( 'aTest', 3 )
						]
					);
					console.log( t0 )
					unit.run( true )
				} catch ( error ) {
					console.log( '///////////////////////////////////////////////////////////' )
					console.log( title, '\n', error )
					unit.run( false )
				}
			}, false ),
		)
	)
} )
