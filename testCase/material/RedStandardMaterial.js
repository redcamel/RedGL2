"use strict";
RedGL(document.createElement('canvas'), function (v) {
    var tRedGL = this;
    redSuite(
        "RedStandardMaterial 테스트",
        redGroup(
            "RedStandardMaterial( redGL, diffuseTexture, normalTexture, specularTexture, displacementTexture )",
            redTest("성공테스트 : 기본 생성 테스트", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedGL instance만 허용.", function (unit, title) {
                try {
                    RedStandardMaterial(1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedStandardMaterial Instance).<b>diffuseTexture</b> = value",
            redTest("실패테스트 : 미입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, 1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['3d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
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
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
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
            "(RedStandardMaterial Instance).<b>normalTexture</b> = value",
            redTest("성공테스트 : 미입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], 1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['2d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], tRedGL._datas.emptyTexture['3d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
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
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
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
            "(RedStandardMaterial Instance).<b>specularTexture</b> = value",
            redTest("성공테스트 : 미입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], null, 1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], null, tRedGL._datas.emptyTexture['2d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], null, tRedGL._datas.emptyTexture['3d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
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
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
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
            "(RedStandardMaterial Instance).<b>displacementTexture</b> = value",
            redTest("성공테스트 : 미입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], null, null, 1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], null, null, tRedGL._datas.emptyTexture['2d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d'], null, null, tRedGL._datas.emptyTexture['3d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
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
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
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
            "(RedStandardMaterial Instance).<b>normalPower</b> = value",
            redTest("실패테스트 : 숫자만 허용하는지 - 문자입력 ", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    t0['normalPower'] = 'test'
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 숫자만 허용하는지 :  Boolean입력 ", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    t0['normalPower'] = true
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : 숫자만 허용하는지 : 숫자입력", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    t0['normalPower'] = 32
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : 0이하입력시 0으로 치환되는지 확인", function (unit, title) {
                var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                t0['normalPower'] = -1
                unit.run(t0['normalPower'])
            }, 0)
        ),
        redGroup(
            "(RedStandardMaterial Instance).<b>shininess</b> = value",
            redTest("실패테스트 : 숫자만 허용하는지 - 문자입력 ", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    t0['shininess'] = 'test'
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 숫자만 허용하는지 :  Boolean입력 ", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    t0['shininess'] = true
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : 숫자만 허용하는지 : 숫자입력", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    t0['shininess'] = 32
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : 0이하입력시 0으로 치환되는지 확인", function (unit, title) {
                var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                t0['shininess'] = -1
                unit.run(t0['shininess'])
            }, 0)
        ),
        redGroup(
            "(RedStandardMaterial Instance).<b>specularPower</b> = value",
            redTest("실패테스트 : 숫자만 허용하는지 - 문자입력 ", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    t0['specularPower'] = 'test'
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 숫자만 허용하는지 :  Boolean입력 ", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    t0['specularPower'] = true
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : 숫자만 허용하는지 : 숫자입력", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    t0['specularPower'] = 32
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : 0이하입력시 0으로 치환되는지 확인", function (unit, title) {
                var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                t0['specularPower'] = -1
                unit.run(t0['specularPower'])
            }, 0)
        ),
        redGroup(
            "(RedStandardMaterial Instance).<b>displacementPower</b> = value",
            redTest("실패테스트 : 숫자만 허용하는지 - 문자입력 ", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    t0['displacementPower'] = 'test'
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 숫자만 허용하는지 :  Boolean입력 ", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    t0['displacementPower'] = true
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : 숫자만 허용하는지 : 숫자입력", function (unit, title) {
                try {
                    var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    t0['displacementPower'] = 32
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : 0이하입력시 0으로 치환되는지 확인", function (unit, title) {
                var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                t0['displacementPower'] = -1
                unit.run(t0['displacementPower'])
            }, 0)
        ),
        redGroup(
            "(RedStandardMaterial Instance).<b>alpha</b> = value",
            redTest("성공테스트 : 초기값", function (unit, title) {
                var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                unit.run(t0['alpha'])
            }, 1),
            redTest("성공테스트 : 초기값", function (unit, title) {
                var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                unit.run(t0['_alpha'])
            }, 1),
            redTest("성공테스트 : 0.5입력", function (unit, title) {
                var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                t0['alpha'] = 0.5
                unit.run(t0['alpha'])
            }, 0.5),
            redTest("성공테스트 : 1이상을 입력하면 1로 치환되는지", function (unit, title) {
                var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                t0.alpha = 11111
                unit.run(t0['alpha'])
            }, 1),
            redTest("성공테스트 : 0이하를 입력하면 0으로 치환되는지", function (unit, title) {
                var t0 = RedStandardMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                t0.alpha = -11111
                unit.run(t0['alpha'])
            }, 0)
        )
    )
})
