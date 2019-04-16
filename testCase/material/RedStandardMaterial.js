"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedStandardMaterial TEST";
RedGL(document.createElement('canvas'), function () {
        var tRedGL = this;
        RedTest.testGroup(
            "RedStandardMaterial( redGL, diffuseTexture, normalTexture, specularTexture, displacementTexture )",
            function () {
                RedTest.test(
                    "성공테스트 : 기본 생성 테스트",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
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
                            RedStandardMaterial(1);
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
            "(RedStandardMaterial Instance).<b>diffuseTexture</b> = value",
            function () {
                RedTest.test(
                    "실패테스트 : 미입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : 숫자입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, 1);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : RedBitmapTexture Instance 입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 RedBitmapCubeTexture Instance 입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['3d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : RedBitmapTexture Instance 입력",
                    function () {
                        try {
                            var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            t0.diffuseTexture = tRedGL._datas.emptyTexture['2d'];
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : RedBitmapCubeTexture Instance 입력",
                    function () {
                        try {
                            var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            t0.diffuseTexture = tRedGL._datas.emptyTexture['3d'];
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
            "(RedStandardMaterial Instance).<b>normalTexture</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 미입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : 숫자입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], 1);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : RedBitmapTexture Instance 입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 RedBitmapCubeTexture Instance 입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : RedBitmapTexture Instance 입력",
                    function () {
                        try {
                            var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            t0.normalTexture = tRedGL._datas.emptyTexture['2d'];
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : RedBitmapCubeTexture Instance 입력",
                    function () {
                        try {
                            var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            t0.normalTexture = tRedGL._datas.emptyTexture['3d'];
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
            "(RedStandardMaterial Instance).<b>specularTexture</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 미입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : 숫자입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], null, 1);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : RedBitmapTexture Instance 입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], null, tRedGL._datas.emptyTexture['2d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 RedBitmapCubeTexture Instance 입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], null, tRedGL._datas.emptyTexture['3d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : RedBitmapTexture Instance 입력",
                    function () {
                        try {
                            var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            t0.specularTexture = tRedGL._datas.emptyTexture['2d'];
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : RedBitmapCubeTexture Instance 입력",
                    function () {
                        try {
                            var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            t0.specularTexture = tRedGL._datas.emptyTexture['3d'];
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
            "(RedStandardMaterial Instance).<b>displacementTexture</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 미입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : 숫자입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], null, null, 1);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : RedBitmapTexture Instance 입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], null, null, tRedGL._datas.emptyTexture['2d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 RedBitmapCubeTexture Instance 입력",
                    function () {
                        try {
                            RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], null, null, tRedGL._datas.emptyTexture['3d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : RedBitmapTexture Instance 입력",
                    function () {
                        try {
                            var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            t0.displacementTexture = tRedGL._datas.emptyTexture['2d'];
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : RedBitmapCubeTexture Instance 입력",
                    function () {
                        try {
                            var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            t0.displacementTexture = tRedGL._datas.emptyTexture['3d'];
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
            "(RedStandardMaterial Instance).<b>normalPower</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                        t0['normalPower'] = -1;
                        RedTest.run(t0['normalPower'])
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
                            var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            t0['normalPower'] = v[0];
                            RedTest.run(t0['normalPower'] === v[0])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
            }
        );
        RedTest.testGroup(
            "(RedStandardMaterial Instance).<b>emissiveFactor</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                        t0['emissiveFactor'] = -1;
                        RedTest.run(t0['emissiveFactor'])
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
                            var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            t0['emissiveFactor'] = v[0];
                            RedTest.run(t0['emissiveFactor'] === v[0])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
            }
        );
        RedTest.testGroup(
            "(RedStandardMaterial Instance).<b>shininess</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
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
                            var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
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
            "(RedStandardMaterial Instance).<b>specularPower</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                        t0['specularPower'] = -1;
                        RedTest.run(t0['specularPower'])
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
                            var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            t0['specularPower'] = v[0];
                            RedTest.run(t0['specularPower'] === v[0])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
            }
        );
        RedTest.testGroup(
            "(RedStandardMaterial Instance).<b>displacementPower</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                        t0['displacementPower'] = -1;
                        RedTest.run(t0['displacementPower'])
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
                            var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            t0['displacementPower'] = v[0];
                            RedTest.run(t0['displacementPower'] === v[0])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
            }
        );
        RedTest.testGroup(
            "(RedStandardMaterial Instance).<b>displacementFlowSpeedX</b> = value",
            function () {
                RedTest.testListRun(
                    "Number만 허용",
                    RedTest.ONLY_NUMBER,
                    function (v) {
                        try {
                            var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            t0['displacementFlowSpeedX'] = v[0];
                            RedTest.run(t0['displacementFlowSpeedX'] === v[0])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
            }
        );
        RedTest.testGroup(
            "(RedStandardMaterial Instance).<b>displacementFlowSpeedY</b> = value",
            function () {
                RedTest.testListRun(
                    "Number만 허용",
                    RedTest.ONLY_NUMBER,
                    function (v) {
                        try {
                            var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                            t0['displacementFlowSpeedY'] = v[0];
                            RedTest.run(t0['displacementFlowSpeedY'] === v[0])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
            }
        );
        RedTest.testGroup(
            "(RedStandardMaterial Instance).<b>alpha</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 초기값",
                    function () {
                        var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                        RedTest.run(t0['alpha'])
                    }, 1
                );
                RedTest.test(
                    "성공테스트 : 1이상을 입력하면 1로 치환되는지",
                    function () {
                        var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                        t0.alpha = 11111;
                        RedTest.run(t0['alpha'])
                    },
                    1
                );
                RedTest.test(
                    "성공테스트 : 0이하를 입력하면 0으로 치환되는지",
                    function () {
                        var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                        t0.alpha = -11111;
                        RedTest.run(t0['alpha']);
                    },
                    0
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
                        var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                        try {
                            t0['alpha'] = v[0];
                            RedTest.run(t0['alpha'] === v[0])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
            }
        );
        RedTest.testGroup(
            "(RedStandardMaterial Instance).<b>useFlatMode</b> = value",
            function () {
                RedTest.testListRun(
                    "Boolean만 허용",
                    RedTest.ONLY_BOOLEAN,
                    function (v) {
                        var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                        try {
                            t0['useFlatMode'] = v[0];
                            RedTest.run(t0['useFlatMode'] === v[0])

                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
                RedTest.test(
                    "성공테스트 : 초기값",
                    function () {
                        var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                        RedTest.run(t0['useFlatMode'])

                    },
                    false
                );
            }
        );
        RedTest.testGroup(
            "(RedStandardMaterial Instance).<b>usePreMultiply</b> = value",
            function () {
                RedTest.testListRun(
                    "Boolean만 허용",
                    RedTest.ONLY_BOOLEAN,
                    function (v) {
                        var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                        try {
                            t0['usePreMultiply'] = v[0];
                            RedTest.run(t0['usePreMultiply'] === v[0])

                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
                RedTest.test(
                    "성공테스트 : 초기값",
                    function () {
                        var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                        RedTest.run(t0['usePreMultiply']);
                        tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                    },
                    false
                );
            }
        );

    }
);
