/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedColorPhongMaterial TEST";
RedGL(document.createElement('canvas'), function () {
        var tRedGL = this;
        RedTest.testGroup(
            "RedColorPhongMaterial( redGL, hexColor, alpha )",
            function () {
                RedTest.test(
                    "성공테스트 : 기본 생성 테스트",
                    function () {
                        try {
                            RedColorPhongMaterial(tRedGL);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : RedGL instance만 허용.",
                    function () {
                        try {
                            RedColorPhongMaterial(1);
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
            "RedColorPhongMaterial( redGL, <b>hexColor</b>, alpha )",
            function () {
                RedTest.test(
                    "성공테스트 :  미입력시 초기값이 hex형태로 입력되어있는지",
                    function () {
                        var t0 = RedColorPhongMaterial(tRedGL);
                        RedTest.run(RedGLUtil.regHex(t0.color))
                    },
                    true
                );
                RedTest.testListRun(
                    "Hex만 허용",
                    RedTest.ONLY_HEX,
                    function (v) {
                        try {
                            var t0 = RedColorPhongMaterial(tRedGL, v[0]);
                            RedTest.run(v[0] === t0['color'])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
                RedTest.test(
                    "성공테스트 : zeroToOne rgb 컬러로 변환되어 반영되는지 확인",
                    function () {
                        var t0 = RedColorPhongMaterial(tRedGL, '#00ff00');
                        RedTest.run(t0['_color'][0] + '_' + t0['_color'][1] + '_' + t0['_color'][2])
                    },
                    '0_1_0'
                )
            }
        );
        RedTest.testGroup(
            "RedColorPhongMaterial( redGL, hexColor, <b>alpha</b> )",
            function () {
                RedTest.test(
                    "성공테스트 : 초기값",
                    function () {
                        var t0 = RedColorPhongMaterial(tRedGL);
                        RedTest.run(t0['alpha'])
                    }, 1
                );

                RedTest.testListRun(
                    "0~1만허용",
                    [
                        [0, true],
                        [1, true],
                        [0.1, true],
                        ['1', false],
                        [true, false],
                        [false, false],
                        [null, false],
                        [undefined, false],
                        ['문자테스트', false],
                        [function () {
                        }, false],
                        [[], false],
                        [{}, false]
                    ],
                    function (v) {
                        var t0 = RedColorPhongMaterial(tRedGL);
                        try {
                            t0['alpha'] = v[0];
                            RedTest.run(t0['alpha'] === v[0])
                        } catch (error) {
                            RedTest.run(false, error)

                        }
                    }
                );
                RedTest.test(
                    "성공테스트 : 1이상을 입력하면 1로 치환되는지",
                    function () {
                        var t0 = RedColorPhongMaterial(tRedGL);
                        t0.alpha = 11111;
                        RedTest.run(t0['alpha'])
                    },
                    1
                );
                RedTest.test(
                    "성공테스트 : 0이하를 입력하면 0으로 치환되는지",
                    function () {
                        var t0 = RedColorPhongMaterial(tRedGL);
                        t0.alpha = -11111;
                        RedTest.run(t0['alpha']);

                    },
                    0
                );
            }
        );
        RedTest.testGroup(
            "(RedColorPhongMaterial Instance).<b>shininess</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedColorPhongMaterial(tRedGL);
                        t0['shininess'] = -1;
                        RedTest.run(t0['shininess'])
                    },
                    0
                );
                RedTest.testListRun(
                    "0이상만 허용",
                    [
                        [1, true],
                        [1.1, true],
                        [0, true],
                        [true, false],
                        [false, false],
                        [null, false],
                        [undefined, false],
                        ['문자테스트', false],
                        [function () {
                        }, false],
                        [[], false],
                        [{}, false]
                    ],
                    function (v) {
                        try {
                            var t0 = RedColorPhongMaterial(tRedGL);
                            t0['shininess'] = v[0];
                            RedTest.run(t0['shininess'] === v[0])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
            }
        );
        RedTest.testGroup(
            "(RedColorPhongMaterial Instance).<b>specularPower</b> = value",
            function () {
                RedTest.testListRun(
                    "0이상만 허용",
                    [
                        [1, true],
                        [1.1, true],
                        [0, true],
                        [true, false],
                        [false, false],
                        [null, false],
                        [undefined, false],
                        ['문자테스트', false],
                        [function () {
                        }, false],
                        [[], false],
                        [{}, false]
                    ],
                    function (v) {
                        try {
                            var t0 = RedColorPhongMaterial(tRedGL);
                            t0['specularPower'] = v[0];
                            RedTest.run(t0['specularPower'] === v[0])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedColorPhongMaterial(tRedGL);
                        t0['specularPower'] = -1;
                        RedTest.run(t0['specularPower']);

                    },
                    0
                )
            }
        )

    }
);
