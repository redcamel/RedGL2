"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	var testArrayData = [
		0, 1, 2,
		1, 2, 3,
		3, 2, 1
	]
	var testTypedArrayData = new Float32Array(testArrayData)
	redSuite(
		"RedBuffer Test",
		redGroup(
			"생성 확인",
			redTest("기본 생성 테스트", function (unit, title) {
				try {
					var t0 = RedBuffer(tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testTypedArrayData, [RedInterleaveInfo('aTest', 3)]);
					console.log(t0)
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("인자확인 ( redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )\nredGL : 실패테스트", function (unit, title) {
				try {
					RedBuffer(1, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testTypedArrayData, []);
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("인자확인 ( redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )\ntypedArrayData : typedArray만 허용 테스트 ", function (unit, title) {
				try {
					RedBuffer(tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testArrayData);
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("인자확인 ( redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )\nkey : 문자만 허용 테스트 ", function (unit, title) {
				try {
					RedBuffer(tRedGL, 1, RedBuffer.ARRAY_BUFFER, RedBuffer.ARRAY_BUFFER, testTypedArrayData);
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("인자확인 ( redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )\n신규생성 - bufferType : RedBuffer.ARRAY_BUFFER or RedBuffer.ELEMENT_ARRAY_BUFFER 만 허용 테스트 ", function (unit, title) {
				try {
					RedBuffer(tRedGL, 'testBufferName' + RedGL.makeUUID(), '이상한 bufferType키를 넣어봄', testTypedArrayData);
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("인자확인 ( redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )\n신규생성 - interleaveDefineInfoList : 미정의의경우  체크 테스트 ", function (unit, title) {
				try {
					RedBuffer(tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testTypedArrayData);
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("인자확인 ( redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )\n신규생성 - interleaveDefineInfoList : 내부 데이터가 RedInterleaveInfo Instance가 아닌경우 체크 테스트 ", function (unit, title) {
				try {
					RedBuffer(tRedGL, 'testBufferName' + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, testTypedArrayData, []);
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),

			redTest("인자확인 ( redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )\n최소 인자 확인테스트", function (unit, title) {
				try {
					RedBuffer(tRedGL, 'testBufferName' + RedGL.makeUUID());
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"중복 정의 방지 확인",
			redTest("같은키가 발견될경우 기존케쉬된값 리턴", function (unit, title) {
				var testKey = "checkCacheKey"
				var t0 = RedBuffer(tRedGL, testKey, RedBuffer.ARRAY_BUFFER, testTypedArrayData, [RedInterleaveInfo('aTest', 3)]);
				var t1 = RedBuffer(tRedGL, testKey, RedBuffer.ARRAY_BUFFER);
				unit.run(t0 == t1)
			}, true)
		)
	)
})
