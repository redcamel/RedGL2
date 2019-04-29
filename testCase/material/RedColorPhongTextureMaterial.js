/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedColorPhongTextureMaterial TEST";
RedGL(document.createElement('canvas'), function () {
        var tRedGL = this;
        console.log(tRedGL);
        RedTest.testGroup(
            "RedColorPhongTextureMaterial( redGL, hexColor, alpha )",
            function () {
                RedTest.test(
                    "성공테스트 : 기본 생성 테스트",
                    function () {
                        try {
                            RedColorPhongTextureMaterial(tRedGL);
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
                            RedColorPhongTextureMaterial(1);
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
            "RedColorPhongTextureMaterial( redGL, <b>hexColor</b>, alpha )",
            function () {
                RedTest.test(
                    "성공테스트 :  미입력시 초기값이 hex형태로 입력되어있는지",
                    function () {
                        var t0 = RedColorPhongTextureMaterial(tRedGL);
                        RedTest.run(RedGLUtil.regHex(t0.color))
                    },
                    true
                );
                RedTest.testListRun(
                    "Hex만 허용",
                    RedTest.ONLY_HEX,
                    function (v) {
                        try {
                            var t0 = RedColorPhongTextureMaterial(tRedGL, v[0]);
                            RedTest.run(v[0] === t0['color'])
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
                RedTest.test(
                    "성공테스트 : zeroToOne rgb 컬러로 변환되어 반영되는지 확인",
                    function () {
                        var t0 = RedColorPhongTextureMaterial(tRedGL, '#00ff00');
                        RedTest.run(t0['_color'][0] + '_' + t0['_color'][1] + '_' + t0['_color'][2])
                    },
                    '0_1_0'
                )
            }
        );
        RedTest.testGroup(
            "RedColorPhongTextureMaterial( redGL, hexColor, <b>alpha</b> )",
            function () {
                RedTest.test(
                    "성공테스트 : 초기값",
                    function () {
                        var t0 = RedColorPhongTextureMaterial(tRedGL);
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
                        var t0 = RedColorPhongTextureMaterial(tRedGL);
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
                        var t0 = RedColorPhongTextureMaterial(tRedGL);
                        t0.alpha = 11111;
                        RedTest.run(t0['alpha'])
                    },
                    1
                );
                RedTest.test(
                    "성공테스트 : 0이하를 입력하면 0으로 치환되는지",
                    function () {
                        var t0 = RedColorPhongTextureMaterial(tRedGL);
                        t0.alpha = -11111;
                        RedTest.run(t0['alpha']);

                    },
                    0
                );
            }
        );
        RedTest.testGroup(
            "(RedColorPhongTextureMaterial Instance).<b>normalPower</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedColorPhongTextureMaterial(tRedGL);
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
                            var t0 = RedColorPhongTextureMaterial(tRedGL);
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
            "(RedColorPhongTextureMaterial Instance).<b>shininess</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedColorPhongTextureMaterial(tRedGL);
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
                            var t0 = RedColorPhongTextureMaterial(tRedGL);
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
            "(RedColorPhongTextureMaterial Instance).<b>specularPower</b> = value",
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
                            var t0 = RedColorPhongTextureMaterial(tRedGL);
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
                        var t0 = RedColorPhongTextureMaterial(tRedGL);
                        t0['specularPower'] = -1;
                        RedTest.run(t0['specularPower']);

                    },
                    0
                )
            }
        );
        RedTest.testGroup(
            "(RedColorPhongTextureMaterial Instance).<b>displacementPower</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedColorPhongTextureMaterial(tRedGL);
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
                            var t0 = RedColorPhongTextureMaterial(tRedGL);
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
            "(RedColorPhongTextureMaterial Instance).<b>normalTexture</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 생성인자 테스트 - RedBitmapTexture Instance 입력",
                    function () {
                        var t0 = RedColorPhongTextureMaterial(tRedGL, '#fff', 1, tRedGL._datas.emptyTexture['2d']);
                        RedTest.run(t0['normalTexture'])
                    }, tRedGL._datas.emptyTexture['2d']);
                RedTest.test(
                    "실패테스트 : 생성인자 테스트 - 문자입력 ",
                    function () {
                        try {
                            RedColorPhongTextureMaterial(tRedGL, '#fff', 1, 'failTest');
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : 생성인자 테스트 - RedBitmapCubeTexture Instance 입력 ",
                    function () {
                        try {
                            RedColorPhongTextureMaterial(tRedGL, '#fff', 1, tRedGL._datas.emptyTexture['3d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : RedBitmapTexture Instance 입력 ",
                    function () {
                        try {
                            var t0 = RedColorPhongTextureMaterial(tRedGL);
                            t0['normalTexture'] = tRedGL._datas.emptyTexture['2d'];
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : 문자입력 ",
                    function () {
                        try {
                            var t0 = RedColorPhongTextureMaterial(tRedGL);
                            t0['normalTexture'] = 'failTest';
                            console.log(t0);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : RedBitmapCubeTexture Instance 입력 ",
                    function () {
                        try {
                            var t0 = RedColorPhongTextureMaterial(tRedGL);
                            t0['normalTexture'] = tRedGL._datas.emptyTexture['3d'];
                            console.log(t0);
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
            "(RedColorPhongTextureMaterial Instance).<b>specularTexture</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 생성인자 테스트 - RedBitmapTexture Instance 입력",
                    function () {
                        var t0 = RedColorPhongTextureMaterial(tRedGL, '#fff', 1, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d']);
                        RedTest.run(t0['specularTexture'])
                    }, tRedGL._datas.emptyTexture['2d']);
                RedTest.test(
                    "실패테스트 : 생성인자 테스트 - 문자입력 ",
                    function () {
                        try {
                            RedColorPhongTextureMaterial(tRedGL, '#fff', 1, 'failTest');
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : 생성인자 테스트 - RedBitmapCubeTexture Instance 입력 ",
                    function () {
                        try {
                            RedColorPhongTextureMaterial(tRedGL, '#fff', 1, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : RedBitmapTexture Instance 입력 ",
                    function () {
                        try {
                            var t0 = RedColorPhongTextureMaterial(tRedGL);
                            t0['specularTexture'] = tRedGL._datas.emptyTexture['2d'];
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : 문자입력 ",
                    function () {
                        try {
                            var t0 = RedColorPhongTextureMaterial(tRedGL);
                            t0['specularTexture'] = 'failTest';
                            console.log(t0);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : RedBitmapCubeTexture Instance 입력 ",
                    function () {
                        try {
                            var t0 = RedColorPhongTextureMaterial(tRedGL);
                            t0['specularTexture'] = tRedGL._datas.emptyTexture['3d'];
                            console.log(t0);
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
            "(RedColorPhongTextureMaterial Instance).<b>displacementTexture</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : 생성인자 테스트 - RedBitmapTexture Instance 입력",
                    function () {
                        var t0 = RedColorPhongTextureMaterial(tRedGL, '#fff', 1, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d']);
                        RedTest.run(t0['displacementTexture'])
                    }, tRedGL._datas.emptyTexture['2d']);
                RedTest.test(
                    "실패테스트 : 생성인자 테스트 - 문자입력 ",
                    function () {
                        try {
                            RedColorPhongTextureMaterial(tRedGL, '#fff', 1, 'failTest');
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : 생성인자 테스트 - RedBitmapCubeTexture Instance 입력 ",
                    function () {
                        try {
                            RedColorPhongTextureMaterial(tRedGL, '#fff', 1, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : RedBitmapTexture Instance 입력 ",
                    function () {
                        try {
                            var t0 = RedColorPhongTextureMaterial(tRedGL);
                            t0['displacementTexture'] = tRedGL._datas.emptyTexture['2d'];
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : 문자입력 ",
                    function () {
                        try {
                            var t0 = RedColorPhongTextureMaterial(tRedGL);
                            t0['displacementTexture'] = 'failTest';
                            console.log(t0);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : RedBitmapCubeTexture Instance 입력 ",
                    function () {
                        try {
                            var t0 = RedColorPhongTextureMaterial(tRedGL);
                            t0['displacementTexture'] = tRedGL._datas.emptyTexture['3d'];
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
        )
    }
);
