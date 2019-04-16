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
                    "성공테스트 : 미입력",
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
                )
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
            "(RedEnvironmentMaterial Instance).<b>normalPower</b> = value",
            function () {
                RedTest.test(
                    "실패테스트 : 숫자만 허용하는지 - 문자입력 ",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['normalPower'] = 'test'
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : 숫자만 허용하는지 :  Boolean입력 ",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['normalPower'] = true
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : 숫자만 허용하는지 : 숫자입력",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['normalPower'] = 32;
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                        t0['normalPower'] = -1;
                        RedTest.run(t0['normalPower'])
                    },
                    0
                )
            }
        );
        RedTest.testGroup(
            "(RedEnvironmentMaterial Instance).<b>shininess</b> = value",
            function () {
                RedTest.test(
                    "실패테스트 : 숫자만 허용하는지 - 문자입력 ",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['shininess'] = 'test'
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : 숫자만 허용하는지 :  Boolean입력 ",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['shininess'] = true
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : 숫자만 허용하는지 : 숫자입력",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['shininess'] = 32;
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                        t0['shininess'] = -1;
                        RedTest.run(t0['shininess'])
                    },
                    0
                )
            }
        );
        RedTest.testGroup(
            "(RedEnvironmentMaterial Instance).<b>specularPower</b> = value",
            function () {
                RedTest.test(
                    "실패테스트 : 숫자만 허용하는지 - 문자입력 ",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['specularPower'] = 'test'
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : 숫자만 허용하는지 :  Boolean입력 ",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['specularPower'] = true
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : 숫자만 허용하는지 : 숫자입력",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['specularPower'] = 32;
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                        t0['specularPower'] = -1;
                        RedTest.run(t0['specularPower'])
                    },
                    0
                )
            }
        );
        RedTest.testGroup(
            "(RedEnvironmentMaterial Instance).<b>displacementPower</b> = value",
            function () {
                RedTest.test(
                    "실패테스트 : 숫자만 허용하는지 - 문자입력 ",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['displacementPower'] = 'test'
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : 숫자만 허용하는지 :  Boolean입력 ",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['displacementPower'] = true
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : 숫자만 허용하는지 : 숫자입력",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['displacementPower'] = 32;
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                        t0['displacementPower'] = -1;
                        RedTest.run(t0['displacementPower'])
                    },
                    0
                )
            }
        );
        RedTest.testGroup(
            "(RedEnvironmentMaterial Instance).<b>reflectionPower</b> = value",
            function () {
                RedTest.test(
                    "실패테스트 : 숫자만 허용하는지 - 문자입력 ",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['reflectionPower'] = 'test'
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : 숫자만 허용하는지 :  Boolean입력 ",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['reflectionPower'] = true
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : 숫자만 허용하는지 : 숫자입력",
                    function () {
                        try {
                            var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                            t0['reflectionPower'] = 32;
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : 0이하입력시 0으로 치환되는지 확인",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                        t0['reflectionPower'] = -1;
                        RedTest.run(t0['reflectionPower'])
                    },
                    0
                )
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
                    },
                    1
                );
                RedTest.test(
                    "성공테스트 : 초기값",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                        RedTest.run(t0['_alpha'])
                    },
                    1
                );
                RedTest.test(
                    "성공테스트 : 0.5입력",
                    function () {
                        var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                        t0['alpha'] = 0.5;
                        RedTest.run(t0['alpha'])
                    },
                    0.5
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
                        tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                    },
                    0
                )
            }
        )

    }
);
