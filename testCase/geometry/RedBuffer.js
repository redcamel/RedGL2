/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedBuffer TEST";
RedGL(document.createElement('canvas'), function () {
        var tRedGL = this;
        var testGL = this.gl;
        var TEST_INT = testGL.INT;
        var TEST_UNSIGNED_SHORT = testGL.UNSIGNED_SHORT;
        var TEST_UNSIGNED_BYTE = testGL.UNSIGNED_BYTE;
        var TEST_UNSIGNED_INT = testGL.UNSIGNED_INT;
        var TEST_FLOAT = testGL.FLOAT;
        var TEST_BYTE = testGL.BYTE;
        var TEST_SHORT = testGL.SHORT;
        var TEST_ARRAY_BUFFER = testGL.ARRAY_BUFFER;
        var TEST_ELEMENT_ARRAY_BUFFER = testGL.ELEMENT_ARRAY_BUFFER;
        var testArrayData = [
            0, 1, 2,
            1, 2, 3,
            3, 2, 1
        ];
        var testArrayBufferData = new Float32Array(testArrayData);
        var testElementArrayBufferData = new Uint8Array(testArrayData);
        var testInterleaveDefineInfoList = [RedInterleaveInfo('aTest', 3)];
        RedTest.testGroup(
            "RedBuffer( <b>redGL</b>, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )",
            function () {
                RedTest.test(
                    "실패테스트 : RedGL Instance만 허용.",
                    function () {

                        try {
                            RedBuffer(
                                1,
                                'testBufferName' + RedGL.makeUUID(),
                                RedBuffer.ARRAY_BUFFER,
                                testArrayBufferData,
                                testInterleaveDefineInfoList
                            );
                            RedTest.run(true);
                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);
                        }

                    },
                    false
                )
            }
        );
        RedTest.testGroup(
            "RedBuffer( redGL, <b>key</b>, bufferType, typedArrayData, interleaveDefineInfoList, drawMode )",
            /////////////////
            function () {
                RedTest.test(
                    "성공테스트 : 미입력",
                    function () {


                        try {
                            RedBuffer(
                                tRedGL,
                                null,
                                RedBuffer.ARRAY_BUFFER,
                                testArrayBufferData,
                                testInterleaveDefineInfoList
                            );
                            RedTest.run(true);

                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.testListRun(
                    "문자만 허용",
                    RedTest.ONLY_STRING,
                    function (v) {


                        try {
                            var t0 = RedBuffer(
                                tRedGL,
                                v[0],
                                RedBuffer.ARRAY_BUFFER,
                                testArrayBufferData,
                                testInterleaveDefineInfoList
                            );
                            RedTest.run(v[0] === t0['key']);

                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    }
                )
            }
        );

        /////////////////
        RedTest.testGroup(
            "RedBuffer( redGL, key, <b>bufferType</b>, typedArrayData, interleaveDefineInfoList, drawMode )",
            function () {
                RedTest.test(
                    "성공테스트 : RedBuffer.ARRAY_BUFFER",
                    function () {


                        try {
                            var t0 = RedBuffer(
                                tRedGL,
                                'testBufferName' + RedGL.makeUUID(),
                                RedBuffer.ARRAY_BUFFER,
                                testArrayBufferData,
                                testInterleaveDefineInfoList
                            );
                            console.log(t0);
                            RedTest.run(true);

                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : RedBuffer.ELEMENT_ARRAY_BUFFER",
                    function () {


                        try {
                            var t0 = RedBuffer(
                                tRedGL,
                                'testBufferName' + RedGL.makeUUID(),
                                RedBuffer.ELEMENT_ARRAY_BUFFER,
                                testElementArrayBufferData
                            );
                            console.log(t0);
                            RedTest.run(true);

                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : 미입력",
                    function () {


                        try {
                            var t0 = RedBuffer(
                                tRedGL,
                                'testBufferName' + RedGL.makeUUID(),
                                null,
                                testArrayBufferData,
                                testInterleaveDefineInfoList
                            );
                            console.log(t0);
                            RedTest.run(true);

                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.test(
                    "실패테스트 - RedBuffer.ARRAY_BUFFER or RedBuffer.ELEMENT_ARRAY_BUFFER 만 허용 테스트 ",
                    function () {


                        try {
                            RedBuffer(
                                tRedGL,
                                'testBufferName' + RedGL.makeUUID(),
                                '이상한 bufferType키를 넣어봄',
                                testArrayBufferData
                            );
                            RedTest.run(true);

                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    },
                    false
                )
            }
        );
        /////////////////
        RedTest.testGroup(
            "RedBuffer( redGL, key, bufferType, <b>typedArrayData</b>, interleaveDefineInfoList, drawMode )",
            function () {
                RedTest.test(
                    "실패테스트 : 미입력",
                    function () {


                        try {
                            RedBuffer(
                                tRedGL,
                                'testBufferName' + RedGL.makeUUID(),
                                RedBuffer.ARRAY_BUFFER,
                                null,
                                testInterleaveDefineInfoList
                            );
                            RedTest.run(true);

                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : 미입력",
                    function () {


                        try {
                            RedBuffer(
                                tRedGL,
                                'testBufferName' + RedGL.makeUUID(),
                                RedBuffer.ELEMENT_ARRAY_BUFFER,
                                null
                            );
                            RedTest.run(true);

                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : typedArray만 허용 테스트 ",
                    function () {


                        try {
                            RedBuffer(
                                tRedGL,
                                'testBufferName' + RedGL.makeUUID(),
                                RedBuffer.ARRAY_BUFFER,
                                [],
                                testInterleaveDefineInfoList
                            );
                            RedTest.run(true);

                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : typedArray만 허용 테스트 ",
                    function () {


                        try {
                            RedBuffer(
                                tRedGL,
                                'testBufferName' + RedGL.makeUUID(),
                                RedBuffer.ELEMENT_ARRAY_BUFFER,
                                [],
                                testInterleaveDefineInfoList
                            );
                            RedTest.run(true);

                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.test(
                    "성공 : typedArray만 허용 테스트 ",
                    function () {


                        try {
                            RedBuffer(
                                tRedGL,
                                'testBufferName' + RedGL.makeUUID(),
                                RedBuffer.ARRAY_BUFFER, testArrayBufferData,
                                testInterleaveDefineInfoList
                            );
                            RedTest.run(true);

                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    },
                    true
                );
                RedTest.test(
                    "성공 : typedArray만 허용 테스트 ",
                    function () {


                        try {
                            RedBuffer(
                                tRedGL,
                                'testBufferName' + RedGL.makeUUID(),
                                RedBuffer.ELEMENT_ARRAY_BUFFER,
                                testElementArrayBufferData
                            );
                            RedTest.run(true);

                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    },
                    true
                )
            }
        );

        RedTest.testGroup(
            "RedBuffer( redGL, key, bufferType, typedArrayData, <b>interleaveDefineInfoList</b>, drawMode )",
            function () {
                RedTest.test(
                    "실패테스트 : 미정의",
                    function () {


                        try {
                            RedBuffer(
                                tRedGL,
                                'testBufferName' + RedGL.makeUUID(),
                                RedBuffer.ARRAY_BUFFER,
                                testArrayBufferData
                            );
                            RedTest.run(true);

                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : 내부 데이터가 RedInterleaveInfo Instance가 아닌경우",
                    function () {


                        try {
                            RedBuffer(
                                tRedGL,
                                'testBufferName' + RedGL.makeUUID(),
                                RedBuffer.ARRAY_BUFFER,
                                testArrayBufferData,
                                [1, 2]
                            );
                            RedTest.run(true);

                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    },
                    false
                )
            }
        );

        RedTest.testGroup(
            "중복 정의 방지 확인",
            function () {
                RedTest.test(
                    "성공테스트 : 같은키가 발견될경우 기존케쉬된값 리턴",
                    function () {


                        var testKey = "checkCacheKey";
                        var t0 = RedBuffer(
                            tRedGL,
                            testKey,
                            RedBuffer.ARRAY_BUFFER,
                            testArrayBufferData,
                            testInterleaveDefineInfoList
                        );
                        var t1 = RedBuffer(
                            tRedGL,
                            testKey,
                            RedBuffer.ARRAY_BUFFER
                        );
                        RedTest.run(t0 === t1);


                    },
                    true
                )
            }
        );

        RedTest.testGroup(
            "데이터확인",
            function () {
                RedTest.test(
                    "성공테스트 : 키네임이 잘 물리는지",
                    function () {


                        var t0 = RedBuffer(
                            tRedGL,
                            'testkeyName',
                            RedBuffer.ARRAY_BUFFER,
                            testArrayBufferData,
                            testInterleaveDefineInfoList
                        );
                        RedTest.run(t0['key']);


                    },
                    'testkeyName'
                );
                RedTest.test(
                    "성공테스트 : 키네임이 잘 물리는지",
                    function () {


                        var t0 = RedBuffer(
                            tRedGL,
                            'testkeyName2',
                            RedBuffer.ELEMENT_ARRAY_BUFFER,
                            testElementArrayBufferData
                        );
                        RedTest.run(t0['key']);


                    },
                    'testkeyName2'
                );
                RedTest.test(
                    "성공테스트 : 버퍼타입이 잘 물리는지 : RedBuffer.ARRAY_BUFFER",
                    function () {


                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ARRAY_BUFFER,
                            testArrayBufferData,
                            testInterleaveDefineInfoList
                        );
                        RedTest.run(t0['bufferType']);


                    },
                    RedBuffer.ARRAY_BUFFER
                );
                RedTest.test(
                    "성공테스트 : 버퍼타입이 잘 물리는지 : RedBuffer.ELEMENT_ARRAY_BUFFER",
                    function () {


                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ELEMENT_ARRAY_BUFFER,
                            testElementArrayBufferData
                        );
                        RedTest.run(t0['bufferType']);


                    },
                    RedBuffer.ELEMENT_ARRAY_BUFFER
                );
                RedTest.test(
                    "성공테스트 : 버퍼타입이 실제 GL 상수로 잘 물리는지 : RedBuffer.ARRAY_BUFFER => glBufferType",
                    function () {


                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ARRAY_BUFFER,
                            testArrayBufferData,
                            testInterleaveDefineInfoList
                        );
                        RedTest.run(t0['glBufferType']);


                    },
                    TEST_ARRAY_BUFFER
                );
                RedTest.test(
                    "성공테스트 : 버퍼타입이 실제 GL 상수로 잘 물리는지 : RedBuffer.ELEMENT_ARRAY_BUFFER => glBufferType",
                    function () {


                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ELEMENT_ARRAY_BUFFER,
                            testElementArrayBufferData,
                            testInterleaveDefineInfoList
                        );
                        RedTest.run(t0['glBufferType']);


                    },
                    TEST_ELEMENT_ARRAY_BUFFER
                );

                RedTest.test(
                    "성공테스트 : 데이터가 잘들어가고 버퍼데이터로 물리는지 : RedBuffer.ARRAY_BUFFER",
                    function () {


                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ARRAY_BUFFER, testArrayBufferData,
                            testInterleaveDefineInfoList
                        );
                        RedTest.run(t0['data'] === testArrayBufferData);


                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : 데이터가 잘들어가고 버퍼데이터로 물리는지 : RedBuffer.ELEMENT_ARRAY_BUFFER",
                    function () {


                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ELEMENT_ARRAY_BUFFER, testElementArrayBufferData,
                            testInterleaveDefineInfoList
                        );
                        RedTest.run(t0['data'] === testElementArrayBufferData);


                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : 인터리브데이터 리스트가 잘 들어가는지",
                    function () {


                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ARRAY_BUFFER,
                            testArrayBufferData,
                            testInterleaveDefineInfoList
                        );
                        RedTest.run(t0['interleaveDefineInfoList']);


                    },
                    testInterleaveDefineInfoList
                )
            }
        );

        RedTest.testGroup(
            "데이터 타입 확인",
            function () {
                RedTest.test(
                    "glArrayType - Float32Array : gl.FLOAT",
                    function () {


                        var testData = new Float32Array([
                            0, 1, 2,
                            1, 2, 3,
                            3, 2, 1
                        ]);
                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ARRAY_BUFFER,
                            testData,
                            testInterleaveDefineInfoList
                        );
                        RedTest.run(t0['glArrayType']);


                    },
                    TEST_FLOAT
                );
                RedTest.test(
                    "glArrayType - Float64Array : gl.FLOAT",
                    function () {


                        var testData = new Float64Array([
                            0, 1, 2,
                            1, 2, 3,
                            3, 2, 1
                        ]);
                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ARRAY_BUFFER,
                            testData,
                            testInterleaveDefineInfoList
                        );
                        RedTest.run(t0['glArrayType']);


                    },
                    TEST_FLOAT
                );
                RedTest.test(
                    "glArrayType - Uint8Array : gl.UNSIGNED_BYTE",
                    function () {


                        var testData = new Uint8Array([
                            0, 1, 2,
                            1, 2, 3,
                            3, 2, 1
                        ]);
                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ELEMENT_ARRAY_BUFFER,
                            testData
                        );
                        RedTest.run(t0['glArrayType']);


                    },
                    TEST_UNSIGNED_BYTE
                );
                RedTest.test(
                    "glArrayType - Uint16Array : gl.UNSIGNED_SHORT",
                    function () {


                        var testData = new Uint16Array([
                            0, 1, 2,
                            1, 2, 3,
                            3, 2, 1
                        ]);
                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ELEMENT_ARRAY_BUFFER,
                            testData
                        );
                        RedTest.run(t0['glArrayType']);


                    },
                    TEST_UNSIGNED_SHORT
                );
                RedTest.test(
                    "glArrayType - Uint32Array : gl.UNSIGNED_INT",
                    function () {


                        var testData = new Uint32Array([
                            0, 1, 2,
                            1, 2, 3,
                            3, 2, 1
                        ]);
                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ELEMENT_ARRAY_BUFFER,
                            testData
                        );
                        RedTest.run(t0['glArrayType']);


                    },
                    TEST_UNSIGNED_INT
                );
                RedTest.test(
                    "glArrayType - Int8Array : gl.BYTE",
                    function () {


                        var testData = new Int8Array([
                            0, 1, 2,
                            1, 2, 3,
                            3, 2, 1
                        ]);
                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ELEMENT_ARRAY_BUFFER,
                            testData
                        );
                        RedTest.run(t0['glArrayType']);


                    },
                    TEST_BYTE
                );
                RedTest.test(
                    "glArrayType - Int16Array : gl.SHORT",
                    function () {


                        var testData = new Int16Array([
                            0, 1, 2,
                            1, 2, 3,
                            3, 2, 1
                        ]);
                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ELEMENT_ARRAY_BUFFER,
                            testData
                        );
                        RedTest.run(t0['glArrayType']);


                    },
                    TEST_SHORT
                );
                RedTest.test(
                    "glArrayType - Int32Array : gl.INT",
                    function () {


                        var testData = new Int32Array([
                            0, 1, 2,
                            1, 2, 3,
                            3, 2, 1
                        ]);
                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ELEMENT_ARRAY_BUFFER,
                            testData
                        );
                        RedTest.run(t0['glArrayType']);


                    },
                    TEST_INT
                )
            }
        );

        RedTest.testGroup(
            "pointNum / stride 계산확인",
            function () {
                RedTest.test(
                    "RedBuffer.ARRAY_BUFFER 타입 - pointNum 계산확인",
                    function () {


                        var testData = new Float32Array([
                            0, 1, 2,
                            1, 2, 3,
                            3, 2, 1
                        ]);
                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ARRAY_BUFFER,
                            testData,
                            [
                                RedInterleaveInfo('aTest', 3)
                            ]
                        );
                        RedTest.run(t0['pointNum']);


                    },
                    3
                );
                RedTest.test(
                    "RedBuffer.ARRAY_BUFFER 타입 - pointNum 계산확인",
                    function () {


                        var testData = new Float32Array([
                            0, 1, 2, 5, 5, 5,
                            1, 2, 3, 5, 5, 5,
                            3, 2, 1, 5, 5, 5
                        ]);
                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ARRAY_BUFFER,
                            testData,
                            [
                                RedInterleaveInfo('aTest', 3)
                            ]
                        );
                        RedTest.run(t0['pointNum']);


                    },
                    6
                );
                RedTest.test(
                    "RedBuffer.ARRAY_BUFFER 타입 - pointNum 계산확인",
                    function () {


                        var testData = new Float32Array([
                            0, 1, 2, 5, 5, 5,
                            1, 2, 3, 5, 5, 5,
                            3, 2, 1, 5, 5, 5
                        ]);
                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ARRAY_BUFFER,
                            testData,
                            [
                                RedInterleaveInfo('aTest', 3),
                                RedInterleaveInfo('aTest2', 3)
                            ]
                        );
                        RedTest.run(t0['pointNum']);


                    },
                    3
                );
                RedTest.test(
                    "RedBuffer.ARRAY_BUFFER 타입 - stride 계산확인",
                    function () {


                        var testData = new Float32Array([
                            0, 1, 2,
                            1, 2, 3,
                            3, 2, 1
                        ]);
                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ARRAY_BUFFER,
                            testData,
                            [
                                RedInterleaveInfo('aTest', 3)
                            ]
                        );
                        RedTest.run(t0['stride']);


                    },
                    0
                );
                RedTest.test(
                    "RedBuffer.ARRAY_BUFFER 타입 - stride 계산확인",
                    function () {


                        var testData = new Float32Array([
                            0, 1, 2, 5, 5, 5,
                            1, 2, 3, 5, 5, 5,
                            3, 2, 1, 5, 5, 5
                        ]);
                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ARRAY_BUFFER,
                            testData,
                            [
                                RedInterleaveInfo('aTest', 3),
                                RedInterleaveInfo('aTest2', 3)
                            ]
                        );
                        RedTest.run(t0['stride']);


                    },
                    6
                );
                RedTest.test(
                    "RedBuffer.ARRAY_BUFFER 타입 - interleaveDefineInfoList내의 interleaveDefineInfo의 offset이 잘 계산되나 확인",
                    function () {


                        var testData = new Float32Array([
                            0, 1, 2, 5, 5,
                            1, 2, 3, 5, 5,
                            3, 2, 1, 5, 5
                        ]);
                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ARRAY_BUFFER,
                            testData,
                            [
                                RedInterleaveInfo('aTest', 3),
                                RedInterleaveInfo('aTest2', 2)
                            ]
                        );
                        RedTest.run(t0['interleaveDefineInfoList'][0]['offset']);


                    },
                    0
                );
                RedTest.test(
                    "RedBuffer.ARRAY_BUFFER 타입 - interleaveDefineInfoList내의 interleaveDefineInfo의 offset이 잘 계산되나 확인",
                    function () {


                        var testData = new Float32Array([
                            0, 1, 2, 5, 5,
                            1, 2, 3, 5, 5,
                            3, 2, 1, 5, 5
                        ]);
                        var t0 = RedBuffer(
                            tRedGL,
                            'testBufferName' + RedGL.makeUUID(),
                            RedBuffer.ARRAY_BUFFER,
                            testData,
                            [
                                RedInterleaveInfo('aTest', 3),
                                RedInterleaveInfo('aTest2', 2)
                            ]
                        );
                        RedTest.run(t0['interleaveDefineInfoList'][1]['offset']);


                    },
                    3
                );
                RedTest.test(
                    "RedBuffer.ARRAY_BUFFER 타입 - pointNum 계산확인 : 정수로 떨어지지 않을때 체크 확인",
                    function () {


                        var testData = new Float32Array([
                            0, 1, 2,
                            1, 2, 3,
                            3, 2
                        ]);
                        try {
                            var t0 = RedBuffer(
                                tRedGL,
                                'testBufferName' + RedGL.makeUUID(),
                                RedBuffer.ARRAY_BUFFER,
                                testData,
                                [
                                    RedInterleaveInfo('aTest', 3)
                                ]
                            );
                            console.log(t0);
                            RedTest.run(true);
                            tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);
                            tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                        }

                    },
                    false
                )
            }
        );
    }
);