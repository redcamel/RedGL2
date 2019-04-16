"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedGeometry TEST";
RedGL(document.createElement('canvas'), function () {
    var tRedGL = this;
    var testInterleaveBuffer, testIndexBuffer;
    testInterleaveBuffer = RedBuffer(
        tRedGL,
        'test',
        RedBuffer.ARRAY_BUFFER,
        new Float32Array([0, 1, 2, 0, 1, 2, 0, 1, 2]),
        [RedInterleaveInfo('aTest', 3)]
    );
    testIndexBuffer = RedBuffer(
        tRedGL,
        'test',
        RedBuffer.ELEMENT_ARRAY_BUFFER,
        new Uint16Array([0, 1, 2])
    );
    RedTest.testGroup(
        "RedGeometry( interleaveBuffer, indexBuffer )",
        function () {
            RedTest.test(
                "성공테스트 : 기본 생성 테스트",
                function () {
                    try {
                        var t0 = RedGeometry(testInterleaveBuffer, testIndexBuffer);
                        console.log(t0);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                true
            );
            RedTest.test(
                "실패테스트 : interleaveBuffer는 RedBuffer Instance만 허용",
                function () {
                    try {
                        var t0 = RedGeometry(1, testIndexBuffer);
                        console.log(t0);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            );
            RedTest.test(
                "실패테스트 : indexBuffer는 RedBuffer Instance만 허용",
                function () {
                    try {
                        var t0 = RedGeometry(testInterleaveBuffer, 1);
                        console.log(t0);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            );
            RedTest.test(
                "실패테스트  : interleaveBuffer에 ELEMENT_ARRAY_BUFFER타입의 RedBuffer Instance가 올 경우 방어",
                function () {
                    try {
                        var t0 = RedGeometry(testIndexBuffer, testIndexBuffer);
                        console.log(t0);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            );
            RedTest.test(
                "실패테스트 : indexBuffer에 ARRAY_BUFFER타입의 RedBuffer Instance가 올 경우 방어",
                function () {
                    try {
                        var t0 = RedGeometry(testInterleaveBuffer, testInterleaveBuffer);
                        console.log(t0);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            );
            RedTest.test(
                "성공테스트 : interleaveBuffer만 입력하는건 허용",
                function () {
                    try {
                        var t0 = RedGeometry(testInterleaveBuffer);
                        console.log(t0);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                true
            );
            RedTest.test(
                "실패테스트 : indexBuffer만 입력하는건 허용 안함",
                function () {
                    try {
                        var t0 = RedGeometry(null, testInterleaveBuffer);
                        console.log(t0);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            );
            RedTest.test(
                "실패테스트 : 둘다 입력안하는경우 방어",
                function () {
                    try {
                        var t0 = RedGeometry();
                        console.log(t0);
                        RedTest.run(true);
                        tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                    } catch (error) {
                        RedTest.run(false, error);
                        tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                    }
                },
                false
            );
        }
    )
});
