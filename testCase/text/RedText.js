/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedText TEST";
RedGL(document.createElement('canvas'), function () {
        var tRedGL;
        tRedGL = this;

        RedTest.testGroup(
            "RedText( redGL )",
            function () {
                RedTest.test(
                    "성공테스트 : 기본생성확인",
                    function () {
                        var t0;
                        t0 = RedText(tRedGL);
                        RedTest.run(t0 instanceof RedText)
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : RedGL Instance만 허용하는지",
                    function () {
                        try {
                            RedText();
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                )
            }
        );
        RedTest.testGroup(
            "(RedText Instance).<b>width</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 반영되는지",
                    function () {
                        var t0 = RedText(tRedGL, 123);
                        console.log(t0);
                        RedTest.run(t0['width'])
                    }, 123);
                RedTest.test(
                    "성공테스트 : 2보다 작은 숫자입력시 2로 치환되는지",
                    function () {
                        var t0 = RedText(tRedGL, 1, 512);
                        RedTest.run(t0['width'])
                    }, 2);
                RedTest.test(
                    "성공테스트 : 2보다 큰 숫자만 허용",
                    function () {
                        var t0 = RedText(tRedGL, 123, 512);
                        console.log(t0);
                        RedTest.run(t0['height'])
                    },
                    512
                );
                RedTest.testListRun(
                    "2이상의 uint만 허용(2보다 작은 숫자입력시 2로 치환)",
                    [
                        [2, true],
                        [-1.1, true],
                        [-1, true],
                        ['1', false],
                        [true, false],
                        ['문자테스트', false],
                        [function () {
                        }, false],
                        [[], false],
                        [{}, false]
                    ],
                    function (v) {
                        try {
                            var t0 = RedText(tRedGL, v[0], 512);
                            RedTest.run(t0['width'] === 2)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
            }
        );
        RedTest.testGroup(
            "(RedText Instance).<b>height</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 반영되는지",
                    function () {
                        var t0 = RedText(tRedGL, 123, 512);
                        console.log(t0);
                        RedTest.run(t0['height'])
                    }, 512);
                RedTest.test(
                    "성공테스트 : 2보다 작은 숫자입력시 2로 치환되는지",
                    function () {
                        var t0 = RedText(tRedGL, 512, 1);
                        RedTest.run(t0['height'])
                    }, 2);
                RedTest.test(
                    "성공테스트 : 2보다 큰 숫자만 허용",
                    function () {
                        var t0 = RedText(tRedGL, 123, 512);
                        console.log(t0);
                        RedTest.run(t0['height'])
                    }, 512);
                RedTest.testListRun(
                    "2이상의 uint만 허용(2보다 작은 숫자입력시 2로 치환)",
                    [
                        [2, true],
                        [-1.1, true],
                        [-1, true],
                        ['1', false],
                        [true, false],
                        ['문자테스트', false],
                        [function () {
                        }, false],
                        [[], false],
                        [{}, false]
                    ],
                    function (v) {
                        try {
                            var t0 = RedText(tRedGL, 512, v[0]);
                            RedTest.run(t0['height'] === 2)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                )
            }
        );
        RedTest.testGroup(
            "재질과 사이즈 연동되는지 체크",
            function () {
                RedTest.testListRun(
                    "재질과 사이즈 연동되는지 체크(width)",
                    [
                        [2, true],
                        [4, true],
                        [128, true],
                        [111, true],
                        [135, true]
                    ],
                    function (v) {
                        try {
                            var t0 = RedText(tRedGL, v[0], 512);
                            RedTest.run(t0['material']['width'] === v[0])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
                RedTest.testListRun(
                    "재질과 사이즈 연동되는지 체크(height)",
                    [
                        [2, true],
                        [4, true],
                        [128, true],
                        [111, true],
                        [135, true]
                    ],
                    function (v) {
                        try {
                            var t0 = RedText(tRedGL, 512, v[0]);
                            RedTest.run(t0['material']['height'] === v[0])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
            }
        );
        RedTest.testGroup(
            "(RedText Instance).<b>perspectiveScale</b> = value",
            function () {
                RedTest.testListRun(
                    "Boolean만 허용",
                    RedTest.ONLY_BOOLEAN,
                    function (v) {
                        try {
                            var t0 = RedText(tRedGL);
                            t0['perspectiveScale'] = v[0];
                            RedTest.run(t0['perspectiveScale'] === v[0])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                )
            }
        );
        RedTest.testGroup(
            "(RedText Instance).<b>sprite3DYn</b> = value",
            function () {
                RedTest.testListRun(
                    "Boolean만 허용",
                    RedTest.ONLY_BOOLEAN,
                    function (v) {
                        try {
                            var t0 = RedText(tRedGL);
                            t0['sprite3DYn'] = v[0];
                            RedTest.run(t0['sprite3DYn'] === v[0])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                )
            }
        );
        RedTest.testGroup(
            "(RedText Instance).<b>text</b> = value",
            function () {
                RedTest.test(
                    "성공테스트",
                    function () {
                        var t0 = RedText(tRedGL);
                        t0['text'] = 'test';
                        RedTest.run(t0['text'])
                    }, 'test')
            }
        )
    }
);
