"use strict";
RedGL(document.createElement('canvas'), function (v) {
    var tRedGL = this;
    redSuite(
        "RedPointLight Test",
        redGroup(
            "RedPointLight( redGL, hexColor, alpha )",
            redTest("성공테스트 : 기본 생성 테스트", function (unit, title) {
                try {
                    var t0 = RedPointLight(tRedGL);
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : TYPE 확인", function (unit, title) {
                var t0 = RedPointLight(tRedGL);
                unit.run(t0['TYPE'])
            }, RedPointLight['TYPE']),
            redTest("실패테스트 : TYPE 확인은 불변", function (unit, title) {
                try {
                    var t0 = RedPointLight(tRedGL);
                    t0['TYPE'] = 1
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "RedPointLight( <b>redGL</b>, hexColor, alpha )",
            redTest("실패테스트 : redGL - RedGL instance만 허용.", function (unit, title) {
                try {
                    RedPointLight(1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "RedPointLight( redGL, <b>hexColor</b>, alpha )",
            redTest("실패테스트 : hexColor - #xxxxxx or #xxx 만 허용 - 1", function (unit, title) {
                try {
                    RedPointLight(tRedGL, 1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : hexColor - #xxxxxx or #xxx 만 허용 - '#2233'", function (unit, title) {
                try {
                    RedPointLight(tRedGL, '#2233');
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : hexColor - #556677", function (unit, title) {
                var t0 = RedPointLight(tRedGL, '#556677');
                unit.run(t0['color'])
            }, '#556677'),
            redTest("성공테스트 : hexColor - #fff", function (unit, title) {
                var t0 = RedPointLight(tRedGL, '#fff');
                unit.run(t0['color'])
            }, '#fff'),
            redTest("성공테스트 : hexColor - #0000ff", function (unit, title) {
                var t0 = RedPointLight(tRedGL, '#0000ff');
                unit.run(t0['_lightColor'][0] + '_' + t0['_lightColor'][1] + '_' + t0['_lightColor'][2])
            }, '0_0_1')
        ),
        redGroup(
            "RedPointLight( redGL, hexColor, <b>alpha</b> )",
            redTest("성공테스트 : alpha - 0.5", function (unit, title) {
                var t0 = RedPointLight(tRedGL, '#556677', 0.5);
                unit.run(t0['alpha'])
            }, 0.5),
            redTest("성공테스트 : alpha - 0.5", function (unit, title) {
                var t0 = RedPointLight(tRedGL, '#556677', 0.5);
                unit.run(t0['_lightColor'][3])
            }, 0.5),
            redTest("성공테스트 : hexColor & alpha", function (unit, title) {
                var t0 = RedPointLight(tRedGL, '#fff', 0.5);
                unit.run(t0['_lightColor'][0] + '_' + t0['_lightColor'][1] + '_' + t0['_lightColor'][2] + '_' + t0['_lightColor'][3])
            }, '1_1_1_0.5'),
            redTest("실패테스트 : 숫자만 허용하는지", function (unit, title) {
                try {
                    RedPointLight(tRedGL, '#fff', 'test');
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : 1이상을 입력하면 1로 치환되는지", function (unit, title) {
                var t0 = RedPointLight(tRedGL, '#fff', 1111);
                unit.run(t0['alpha'])
            }, 1),
            redTest("성공테스트 : 0이하를 입력하면 0으로 치환되는지", function (unit, title) {
                var t0 = RedPointLight(tRedGL, '#fff', -12345);
                unit.run(t0['alpha'])
            }, 0)
        ),
        redGroup(
            "(RedPointLight Instance).intensity = <b>value</b>",
            redTest("실패테스트 : 숫자만 허용하는지", function (unit, title) {
                try {
                    var t0 = RedPointLight(tRedGL);
                    t0['intensity'] = 'test'
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : 숫자만 허용하는지", function (unit, title) {
                try {
                    var t0 = RedPointLight(tRedGL);
                    t0['intensity'] = 1
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : 0이하를 입력하면 0으로 치환되는지", function (unit, title) {
                try {
                    var t0 = RedPointLight(tRedGL);
                    t0['intensity'] = -1
                    unit.run(t0['intensity'])
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, 0)
        ),
        redGroup(
            "(RedPointLight Instance).radius = <b>value</b>",
            redTest("실패테스트 : 숫자만 허용하는지", function (unit, title) {
                try {
                    var t0 = RedPointLight(tRedGL);
                    t0['radius'] = 'test'
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : 숫자만 허용하는지", function (unit, title) {
                try {
                    var t0 = RedPointLight(tRedGL);
                    t0['radius'] = 1
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : 0이하를 입력하면 0으로 치환되는지", function (unit, title) {
                try {
                    var t0 = RedPointLight(tRedGL);
                    t0['radius'] = -1
                    unit.run(t0['radius'])
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, 0)
        )
    )
})
