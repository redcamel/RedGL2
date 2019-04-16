"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedDirectionalLight TEST";
RedGL(document.createElement('canvas'), function () {
        var tRedGL = this;

        RedTest.testGroup(
            "RedDirectionalLight( redGL, hexColor, alpha, intensity )",
            function () {
                RedTest.test(
                    "성공테스트 : 기본 생성 테스트",
                    function () {

                        try {
                            var t0 = RedDirectionalLight(tRedGL);
                            console.log(t0);
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : TYPE 확인",
                    function () {

                        var t0 = RedDirectionalLight(tRedGL);
                        RedTest.run(t0['TYPE']);


                    }, RedDirectionalLight['TYPE']);
                RedTest.test(
                    "실패테스트 : TYPE 확인은 불변",
                    function () {

                        try {
                            var t0 = RedDirectionalLight(tRedGL);
                            t0['TYPE'] = 1;
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
            "RedDirectionalLight( <b>redGL</b>, hexColor, alpha, intensity )",
            function () {
                RedTest.test(
                    "인자테스트 ( redGL, hexColor, alpha ) : redGL - RedGL instance만 허용.",
                    function () {

                        try {
                            RedDirectionalLight(1);
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
            "RedDirectionalLight( redGL, <b>hexColor</b>, alpha, intensity )",
            function () {
                RedTest.testListRun(
                    "hex만 허용",
                    RedTest.ONLY_HEX,
                    function (v) {

                        try {
                            var t0 = RedDirectionalLight(tRedGL, v[0]);
                            RedTest.run(v[0] === t0['color']);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    }
                );
                RedTest.test(
                    "성공테스트 : hexColor - #00ff00",
                    function () {

                        var t0 = RedDirectionalLight(tRedGL, '#00ff00');
                        RedTest.run(t0['_lightColor'][0] + '_' + t0['_lightColor'][1] + '_' + t0['_lightColor'][2]);


                    },
                    '0_1_0'
                )
            }
        );
        RedTest.testGroup(
            "RedDirectionalLight( redGL, hexColor, <b>alpha</b>, intensity )",
            function () {
                RedTest.test(
                    "성공테스트 : alpha - 0.5",
                    function () {

                        var t0 = RedDirectionalLight(tRedGL, '#556677', 0.5);
                        RedTest.run(t0['alpha']);


                    },
                    0.5
                );
                RedTest.test(
                    "성공테스트 : alpha - 0.5",
                    function () {

                        var t0 = RedDirectionalLight(tRedGL, '#556677', 0.5);
                        RedTest.run(t0['_lightColor'][3]);


                    },
                    0.5
                );
                RedTest.test(
                    "성공테스트 : hexColor & alpha",
                    function () {

                        var t0 = RedDirectionalLight(tRedGL, '#fff', 0.5);
                        RedTest.run(t0['_lightColor'][0] + '_' + t0['_lightColor'][1] + '_' + t0['_lightColor'][2] + '_' + t0['_lightColor'][3]);


                    },
                    '1_1_1_0.5'
                );
                RedTest.testListRun(
                    "0~1만허용",
                    RedTest.NUMBER_ZERO_TO_ONE,
                    function (v) {

                        try {
                            var t0 = RedDirectionalLight(tRedGL, '#fff', v[0]);
                            RedTest.run(v[0] === t0['alpha']);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    }
                );
                RedTest.test(
                    "성공테스트 : 1이상을 입력하면 1로 치환되는지",
                    function () {

                        var t0 = RedDirectionalLight(tRedGL, '#fff', 1111);
                        RedTest.run(t0['alpha']);


                    },
                    1
                );
                RedTest.test(
                    "성공테스트 : 0이하를 입력하면 0으로 치환되는지",
                    function () {

                        var t0 = RedDirectionalLight(tRedGL, '#fff', -12345);
                        RedTest.run(t0['alpha']);


                    },
                    0
                )
            }
        );
        RedTest.testGroup(
            "(RedDirectionalLight Instance).intensity = <b>value</b>",
            function () {
                RedTest.testListRun(
                    "0이상만 허용",
                    RedTest.NUMBER_POSITIVE_AND_ZERO,
                    function (v) {

                        try {
                            var t0 = RedDirectionalLight(tRedGL);
                            t0['intensity'] = v[0];
                            RedTest.run(v[0] === t0['intensity']);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    }
                );
                RedTest.test(
                    "성공테스트 : 0이하를 입력하면 0으로 치환되는지",
                    function () {

                        try {
                            var t0 = RedDirectionalLight(tRedGL);
                            t0['intensity'] = -1;
                            RedTest.run(t0['intensity']);
                            tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                        } catch (error) {
                            RedTest.run(false, error);
                            tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                        }

                    },
                    0
                )
            }
        );
    }
);