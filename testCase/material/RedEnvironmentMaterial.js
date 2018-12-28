"use strict";
RedGL.setDoNotPrepareProgram();
RedGL(document.createElement('canvas'), function (v) {
    var tRedGL = this;
    redSuite(
        "RedEnvironmentMaterial 테스트",
        redGroup(
            "생성 확인",
            redTest("기본 생성 테스트", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true)
        ),
        redGroup(
            "인자테스트 - redGL",
            redTest("인자테스트 : redGL - RedGL instance만 허용.", function (unit, title) {
                try {
                    RedEnvironmentMaterial(1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedEnvironmentMaterial Instance).<b>diffuseTexture</b> = value",
            redTest("성공테스트 : 미입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, 1, tRedGL._datas.emptyTexture['3d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['3d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0.diffuseTexture = tRedGL._datas.emptyTexture['2d']
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0.diffuseTexture = tRedGL._datas.emptyTexture['3d']
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedEnvironmentMaterial Instance).<b>environmentTexture</b> = value",
            redTest("성공테스트 : 미입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, null);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, 1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['2d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                    t0.environmentTexture = tRedGL._datas.emptyTexture['2d']
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                    t0.environmentTexture = tRedGL._datas.emptyTexture['3d']
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true)
        ),
        redGroup(
            "(RedEnvironmentMaterial Instance).<b>normalTexture</b> = value",
            redTest("성공테스트 : 미입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], 1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['2d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], tRedGL._datas.emptyTexture['3d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                    t0.normalTexture = tRedGL._datas.emptyTexture['2d']
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                    t0.normalTexture = tRedGL._datas.emptyTexture['3d']
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedEnvironmentMaterial Instance).<b>specularTexture</b> = value",
            redTest("성공테스트 : 미입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, null);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, 1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, tRedGL._datas.emptyTexture['2d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, tRedGL._datas.emptyTexture['3d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                    t0.specularTexture = tRedGL._datas.emptyTexture['2d']
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                    t0.specularTexture = tRedGL._datas.emptyTexture['3d']
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedEnvironmentMaterial Instance).<b>displacementTexture </b> = value",
            redTest("성공테스트 : 미입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, null, null);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, null, 1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, null, tRedGL._datas.emptyTexture['2d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d'], null, null, tRedGL._datas.emptyTexture['3d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                    t0.displacementTexture = tRedGL._datas.emptyTexture['2d']
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, null, tRedGL._datas.emptyTexture['3d']);
                    t0.displacementTexture = tRedGL._datas.emptyTexture['3d']
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedEnvironmentMaterial Instance).<b>normalPower</b> = value",
            redTest("실패테스트 : 숫자만 허용하는지 - 문자입력 ", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0['normalPower'] = 'test'
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 숫자만 허용하는지 :  Boolean입력 ", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0['normalPower'] = true
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : 숫자만 허용하는지 : 숫자입력", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0['normalPower'] = 32
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : 0이하입력시 0으로 치환되는지 확인", function (unit, title) {
                var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                t0['normalPower'] = -1
                unit.run(t0['normalPower'])
            }, 0)
        ),
        redGroup(
            "(RedEnvironmentMaterial Instance).<b>shininess</b> = value",
            redTest("실패테스트 : 숫자만 허용하는지 - 문자입력 ", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0['shininess'] = 'test'
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 숫자만 허용하는지 :  Boolean입력 ", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0['shininess'] = true
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : 숫자만 허용하는지 : 숫자입력", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0['shininess'] = 32
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : 0이하입력시 0으로 치환되는지 확인", function (unit, title) {
                var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                t0['shininess'] = -1
                unit.run(t0['shininess'])
            }, 0)
        ),
        redGroup(
            "(RedEnvironmentMaterial Instance).<b>specularPower</b> = value",
            redTest("실패테스트 : 숫자만 허용하는지 - 문자입력 ", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0['specularPower'] = 'test'
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 숫자만 허용하는지 :  Boolean입력 ", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0['specularPower'] = true
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : 숫자만 허용하는지 : 숫자입력", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0['specularPower'] = 32
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : 0이하입력시 0으로 치환되는지 확인", function (unit, title) {
                var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                t0['specularPower'] = -1
                unit.run(t0['specularPower'])
            }, 0)
        ),
        redGroup(
            "(RedEnvironmentMaterial Instance).<b>displacementPower</b> = value",
            redTest("실패테스트 : 숫자만 허용하는지 - 문자입력 ", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0['displacementPower'] = 'test'
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 숫자만 허용하는지 :  Boolean입력 ", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0['displacementPower'] = true
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : 숫자만 허용하는지 : 숫자입력", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0['displacementPower'] = 32
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : 0이하입력시 0으로 치환되는지 확인", function (unit, title) {
                var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                t0['displacementPower'] = -1
                unit.run(t0['displacementPower'])
            }, 0)
        ),
        redGroup(
            "(RedEnvironmentMaterial Instance).<b>reflectionPower</b> = value",
            redTest("실패테스트 : 숫자만 허용하는지 - 문자입력 ", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0['reflectionPower'] = 'test'
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 숫자만 허용하는지 :  Boolean입력 ", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0['reflectionPower'] = true
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : 숫자만 허용하는지 : 숫자입력", function (unit, title) {
                try {
                    var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    t0['reflectionPower'] = 32
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : 0이하입력시 0으로 치환되는지 확인", function (unit, title) {
                var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                t0['reflectionPower'] = -1
                unit.run(t0['reflectionPower'])
            }, 0)
        ),
        redGroup(
            "(RedEnvironmentMaterial Instance).<b>alpha</b> = value",
            redTest("성공테스트 : 초기값", function (unit, title) {
                var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                unit.run(t0['alpha'])
            }, 1),
            redTest("성공테스트 : 초기값", function (unit, title) {
                var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                unit.run(t0['_alpha'])
            }, 1),
            redTest("성공테스트 : 0.5입력", function (unit, title) {
                var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                t0['alpha'] = 0.5
                unit.run(t0['alpha'])
            }, 0.5),
            redTest("성공테스트 : 1이상을 입력하면 1로 치환되는지", function (unit, title) {
                var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                t0.alpha = 11111
                unit.run(t0['alpha'])
            }, 1),
            redTest("성공테스트 : 0이하를 입력하면 0으로 치환되는지", function (unit, title) {
                var t0 = RedEnvironmentMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                t0.alpha = -11111
                unit.run(t0['alpha'])
            }, 0)
        )
    )
})
