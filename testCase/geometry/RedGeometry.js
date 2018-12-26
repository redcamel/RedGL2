"use strict";
RedGL(document.createElement('canvas'), function (v) {
    var testInterleaveBuffer, testIndexBuffer
    testInterleaveBuffer = RedBuffer(this, 'test', RedBuffer.ARRAY_BUFFER, new Float32Array([0, 1, 2, 0, 1, 2, 0, 1, 2]), [RedInterleaveInfo('aTest', 3)])
    testIndexBuffer = RedBuffer(this, 'test', RedBuffer.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]))
    redSuite(
        "RedGeometry Test",
        redGroup(
            "RedGeometry( interleaveBuffer, indexBuffer )",
            redTest("성공테스트 : 기본 생성 테스트", function (unit, title) {
                try {
                    var t0 = RedGeometry(testInterleaveBuffer, testIndexBuffer)
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : interleaveBuffer는 RedBuffer Instance만 허용", function (unit, title) {
                try {
                    var t0 = RedGeometry(1, testIndexBuffer)
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : indexBuffer는 RedBuffer Instance만 허용", function (unit, title) {
                try {
                    var t0 = RedGeometry(testInterleaveBuffer, 1)
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트  : interleaveBuffer에 ELEMENT_ARRAY_BUFFER타입의 RedBuffer Instance가 올경우 방어", function (unit, title) {
                try {
                    var t0 = RedGeometry(testIndexBuffer, testIndexBuffer)
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : indexBuffer에 ARRAY_BUFFER타입의 RedBuffer Instance가 올경우 방어", function (unit, title) {
                try {
                    var t0 = RedGeometry(testInterleaveBuffer, testInterleaveBuffer)
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : interleaveBuffer만 입력하는건 허용", function (unit, title) {
                try {
                    var t0 = RedGeometry(testInterleaveBuffer)
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : indexBuffer만 입력하는건 허용 안함", function (unit, title) {
                try {
                    var t0 = RedGeometry(null, testInterleaveBuffer)
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 둘다 입력안하는경우 방어", function (unit, title) {
                try {
                    var t0 = RedGeometry()
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        )
    )
})
