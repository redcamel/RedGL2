/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedGrid TEST";
RedGL(
    document.createElement('canvas'),
    function () {
        var tRedGL = this;
        RedTest.testGroup(
            "RedGrid( redGL, size, divisions, color1, color2 )",
            function () {
                RedTest.test(
                    "성공테스트 : 기본 생성 테스트",
                    function () {

                        try {
                            var t0 = RedGrid(tRedGL);
                            console.log(t0);
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    true
                )
            }
        );
        RedTest.testGroup(
            "RedGrid( <b>redGL</b>, size, divisions, color1, color2 )",
            function () {
                RedTest.test(
                    "RedGL Instance만 허용하는지.",
                    function () {

                        try {
                            var t0 = RedGrid(1);
                            console.log(t0);
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    false
                )
            }
        );
        RedTest.testGroup(
            "RedGrid( redGL, <b>size</b>, divisions, color1, color2 )",
            function () {
                RedTest.test(
                    "성공테스트 : 미입력일 경우 100로 설정되는지",
                    function () {

                        var t0 = RedGrid(tRedGL);
                        console.log(t0);
                        RedTest.run(t0.size);


                    },
                    100
                );
                RedTest.test(
                    "성공테스트 : 설정값확인",
                    function () {

                        var t0 = RedGrid(tRedGL, 2);
                        console.log(t0);
                        RedTest.run(t0.size);


                    },
                    2
                );
                RedTest.testListRun(
                    "양수만 허용",
                    RedTest.NUMBER_POSITIVE,
                    function (v) {

                        try {
                            var t0 = RedGrid(tRedGL, v[0]);
                            RedTest.run(v[0] === t0['size']);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    }
                );
            }
        );
        RedTest.testGroup(
            "RedGrid( redGL, size, <b>divisions</b>, color1, color2 )",
            function () {
                RedTest.test(
                    "성공테스트 : 미입력일 경우 100로 설정되는지",
                    function () {

                        var t0 = RedGrid(tRedGL);
                        console.log(t0);
                        RedTest.run(t0.divisions);


                    },
                    100
                );
                RedTest.test(
                    "성공테스트 : 설정값확인",
                    function () {

                        var t0 = RedGrid(tRedGL, 100, 200);
                        console.log(t0);
                        RedTest.run(t0.divisions);


                    },
                    200
                );
                RedTest.testListRun(
                    "자연수만 허용",
                    RedTest.NUMBER_NATURAL,
                    function (v) {

                        try {
                            var t0 = RedGrid(tRedGL, 100, v[0]);
                            RedTest.run(v[0] === t0['divisions']);

                        } catch (error) {
                            RedTest.run(false, error);

                        }
                    }
                );
            }
        );

        RedTest.testGroup(
            "RedGrid( redGL, size, divisions, <b>color1</b>, color2 )",
            function () {
                RedTest.test(
                    "성공테스트 :  미입력시 초기값이 hex형태로 입력되어있는지",
                    function () {

                        var t0 = RedGrid(tRedGL);
                        console.log(t0);
                        RedTest.run(RedGLUtil.regHex(t0.color1));

                    },
                    true
                );
                RedTest.testListRun(
                    "hex만 허용",
                    RedTest.ONLY_HEX,
                    function (v) {

                        try {
                            var t0 = RedGrid(tRedGL, 100, 100, v[0]);
                            RedTest.run(v[0] === t0['color1']);

                        } catch (error) {
                            RedTest.run(false, error);

                        }
                    }
                );

                RedTest.testGroup(
                    "RedGrid( redGL, size, divisions, color1, <b>color2</b> )",
                    function () {
                        RedTest.test(
                            "성공테스트 :  미입력시 초기값이 hex형태로 입력되어있는지",
                            function () {
                                var t0 = RedGrid(tRedGL);
                                console.log(t0);
                                RedTest.run(RedGLUtil.regHex(t0.color1));
                            },
                            true
                        );
                        RedTest.testListRun(
                            "hex만 허용",
                            RedTest.ONLY_HEX,
                            function (v) {

                                try {
                                    var t0 = RedGrid(tRedGL, 100, 100, '#fff', v[0]);
                                    RedTest.run(v[0] === t0['color2']);

                                } catch (error) {
                                    RedTest.run(false, error);

                                }

                            }
                        );
                    }
                );
                RedTest.testGroup(
                    "(RedGrid Instance).<b>material</b> = value",
                    function () {
                        RedTest.test(
                            "성공테스트 : set 테스트",
                            function () {

                                var tMaterial = RedGridMaterial(tRedGL);
                                var t0 = RedGrid(tRedGL);
                                t0['material'] = tMaterial;
                                RedTest.run(t0['material'] === tMaterial);

                            },
                            true
                        );
                        RedTest.test(
                            "실패테스트 : set 테스트 : RedGridMaterial Instance가 아닌 녀석을 재질로 입력 할 경우",
                            function () {

                                try {
                                    var tMaterial = RedColorMaterial(tRedGL);
                                    var t0 = RedGrid(tRedGL);
                                    t0['material'] = tMaterial;
                                    console.log(t0);
                                    RedTest.run(true);
                                    tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                                } catch (error) {
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
    }
);

