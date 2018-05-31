"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	var testInterleaveData = new Float32Array(
		[
			0, 1, 2,
			1, 2, 3,
			3, 2, 1
		]
	)
	redSuite(
		"RedBuffer Test",
		redGroup(
			"생성 확인",
			redTest("기본 생성 테스트", function (unit, title) {
				try {
					var t0 = RedBuffer(tRedGL, 'testBufferName' + RedGL.makeUUID(), testInterleaveData, RedBuffer.ARRAY_BUFFER, []);
					console.log(t0)
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("인자확인 ( redGL, key, typedArrayData, bufferType, interleaveDefineInfoList, drawMode )\nredGL : 실패테스트", function (unit, title) {
				try {
					RedBuffer(1, 'testBufferName' + RedGL.makeUUID(), testInterleaveData, RedBuffer.ARRAY_BUFFER, []);
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("인자확인 ( redGL, key, typedArrayData, bufferType, interleaveDefineInfoList, drawMode )\ntypedArrayData : typedArray만 허용 테스트 ", function (unit, title) {
				try {
					RedBuffer(tRedGL, 'testBufferName' + RedGL.makeUUID(), [], RedBuffer.ARRAY_BUFFER, []);
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("인자확인 ( redGL, key, typedArrayData, bufferType, interleaveDefineInfoList, drawMode )\ntypedArrayData : typedArray만 허용 테스트2 ", function (unit, title) {
				try {
					RedBuffer(tRedGL, 'testBufferName' + RedGL.makeUUID(), null, RedBuffer.ARRAY_BUFFER, []);
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("인자확인 ( redGL, key, typedArrayData, bufferType, interleaveDefineInfoList, drawMode )\nkey : 문자만 허용 테스트 ", function (unit, title) {
				try {
					RedBuffer(tRedGL, 1, testInterleaveData, RedBuffer.ARRAY_BUFFER, []);
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("인자확인 ( redGL, key, typedArrayData, bufferType, interleaveDefineInfoList, drawMode )\nbufferType : RedBuffer.ARRAY_BUFFER or RedBuffer.ELEMENT_ARRAY_BUFFER 만 허용 테스트 ", function (unit, title) {
				try {
					RedBuffer(tRedGL, 'testBufferName' + RedGL.makeUUID(), testInterleaveData, '이상한키를 넣어봄', []);
					unit.run(true)
				} catch (error) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("인자확인 ( redGL, key, typedArrayData, bufferType, interleaveDefineInfoList, drawMode )\ninterleaveDefineInfoList : 미정의시 체크 테스트 ", function (unit, title) {
				try {
					RedBuffer(tRedGL, 'testBufferName' + RedGL.makeUUID(), testInterleaveData, RedBuffer.ARRAY_BUFFER);
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
				var t0 = RedBuffer(tRedGL, testKey, testInterleaveData, RedBuffer.ARRAY_BUFFER, []);
				var t1 = RedBuffer(tRedGL, testKey, null, RedBuffer.ARRAY_BUFFER);
				unit.run(t0 == t1)
			}, true)
		)
	)
})
