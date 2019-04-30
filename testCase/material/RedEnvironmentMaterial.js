/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedEnvironmentMaterial TEST";
RedGL(document.createElement('canvas'), function () {
        var tRedGL = this;

        RedTest.testGroup(
            "생성 확인",
            function () {
                RedTest.test(
                    "기본 생성 테스트",
                    function () {
                        try {
                            RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                )
            }
        );
        RedTest.testGroup(
            "인자테스트 - redGL",
            function () {
                RedTest.test(
                    "인자테스트 : redGL - RedGL instance만 허용.",
                    function () {
                        try {
                            RedEnvironmentMaterial(1);
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
            "(RedEnvironmentMaterial Instance).<b>normalPower</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
            "(RedEnvironmentMaterial Instance).<b>shininess</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
            "(RedEnvironmentMaterial Instance).<b>specularPower</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
            "(RedEnvironmentMaterial Instance).<b>displacementPower</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
            "(RedEnvironmentMaterial Instance).<b>displacementFlowSpeedX</b> = value",
            function () {
                RedTest.testListRun(
                    "Number만 허용",
                    RedTest.ONLY_NUMBER,
                    function (v) {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
            "(RedEnvironmentMaterial Instance).<b>displacementFlowSpeedX</b> = value",
            function () {
                RedTest.testListRun(
                    "Number만 허용",
                    RedTest.ONLY_NUMBER,
                    function (v) {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
            "(RedEnvironmentMaterial Instance).<b>emissiveFactor</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
            "(RedEnvironmentMaterial Instance).<b>reflectionPower</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                        t0['reflectionPower'] = -1;
                        RedTest.run(t0['reflectionPower'])
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
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['reflectionPower'] = v[0];
                            RedTest.run(t0['reflectionPower'] === v[0])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
            }
        );

        RedTest.testGroup(
            "(RedEnvironmentMaterial Instance).<b>alpha</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 초기값",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                        RedTest.run(t0['alpha'])
                    }, 1
                );
                RedTest.test(
                    "성공테스트 : 1이상을 입력하면 1로 치환되는지",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                        t0.alpha = 11111;
                        RedTest.run(t0['alpha'])
                    },
                    1
                );
                RedTest.test(
                    "성공테스트 : 0이하를 입력하면 0으로 치환되는지",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
            "(RedEnvironmentMaterial Instance).<b>diffuseTexture</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 미입력",
                    function () {
                        try {
                            RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
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
                            RedEnvironmentMaterial(tRedGL, 1, tRedGL._datas.emptyTexture['3d']);
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
                            RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
                            RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['3d']);
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
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
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
            "(RedEnvironmentMaterial Instance).<b>environmentTexture</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : RedBitmapCubeTexture Instance 입력",
                    function () {
                        try {
                            RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : RedBitmapCubeTexture Instance 입력",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                            t0.environmentTexture = tRedGL._datas.emptyTexture['3d'];
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : 미입력",
                    function () {
                        try {
                            RedEnvironmentMaterial(tRedGL, null, null);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : null 허용하지않음",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                            t0['environmentTexture'] = null;
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
                            RedEnvironmentMaterial(tRedGL, null, 1);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : RedBitmapTexture Instance 입력",
                    function () {
                        try {
                            RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['2d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );

                RedTest.test(
                    "실패테스트 : RedBitmapTexture Instance 입력",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                            t0.environmentTexture = tRedGL._datas.emptyTexture['2d'];
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );

            }
        );
        RedTest.testGroup(
            "(RedEnvironmentMaterial Instance).<b>normalTexture</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 미입력",
                    function () {
                        try {
                            RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null);
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
                            RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], 1);
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
                            RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['2d']);
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
                            RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['3d']);
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
                            var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
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
                            var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
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
            "(RedEnvironmentMaterial Instance).<b>specularTexture</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 미입력",
                    function () {
                        try {
                            RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, null);
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
                            RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, 1);
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
                            RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, tRedGL._datas.emptyTexture['2d']);
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
                            RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, tRedGL._datas.emptyTexture['3d']);
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
                            var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
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
                            var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
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
            "(RedEnvironmentMaterial Instance).<b>displacementTexture </b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 미입력",
                    function () {
                        try {
                            RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, null, null);
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
                            RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, null, 1);
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
                            RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, null, tRedGL._datas.emptyTexture['2d']);
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
                            RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, null, tRedGL._datas.emptyTexture['3d']);
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
                            var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
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
                            var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
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
            "(RedEnvironmentMaterial Instance).<b>useFlatMode</b> = value",
            function () {
                RedTest.testListRun(
                    "Boolean만 허용",
                    RedTest.ONLY_BOOLEAN,
                    function (v) {
                        var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
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
                        var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                        RedTest.run(t0['useFlatMode'])

                    },
                    false
                );
            }
        );
        RedTest.testGroup(
            "(RedEnvironmentMaterial Instance).<b>usePreMultiply</b> = value",
            function () {
                RedTest.testListRun(
                    "Boolean만 허용",
                    RedTest.ONLY_BOOLEAN,
                    function (v) {
                        var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
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
                        var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                        RedTest.run(t0['usePreMultiply']);
                        tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                    },
                    false
                );
            }
        );
    }
);
