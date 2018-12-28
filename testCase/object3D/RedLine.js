"use strict";
RedGL.setDoNotPrepareProgram();
RedGL(document.createElement('canvas'), function (v) {
    var tRedGL = this;
    redSuite(
        "RedLine 테스트",
        redGroup(
            "RedLine( redGL, material )",
            redTest("성공테스트 : 기본 생성 테스트", function (unit, title) {
                try {
                    var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true)
        ),
        redGroup(
            "RedLine( <b>redGL</b>, material )",
            redTest("실패테스트 : RedGL Instance만 허용하는지.", function (unit, title) {
                try {
                    var t0 = RedLine(1, RedColorMaterial(tRedGL));
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedLine Instance).<b>geometry</b> = value",
            redTest("실패테스트 : 임의설정을 허용하지 않음", function (unit, title) {
                try {
                    var tGeo = RedBox(tRedGL)
                    var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
                    t0['geometry'] = tGeo
                    unit.run(t0['_geometry'] == tGeo)
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "RedLine( redGL, <b>material</b> )",
            redTest("성공테스트 : 미입력 했을경우 자동으로 RedColorMaterial 생성", function (unit, title) {
                try {
                    var t0 = RedLine(tRedGL);
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedColorMaterial Instance가 아닌경우", function (unit, title) {
                try {
                    var t0 = RedLine(tRedGL, 1);
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : get 테스트", function (unit, title) {
                var tMaterial = RedColorMaterial(tRedGL)
                var t0 = RedLine(tRedGL, tMaterial);
                unit.run(t0['material'] == tMaterial)
            }, true),
            redTest("성공테스트 : get 테스트", function (unit, title) {
                var tMaterial = RedColorMaterial(tRedGL)
                var t0 = RedLine(tRedGL, tMaterial);
                unit.run(t0['_material'] == tMaterial)
            }, true),
            redTest("성공테스트 : set 테스트", function (unit, title) {
                var tMaterial = RedColorMaterial(tRedGL)
                var t0 = RedLine(tRedGL, tMaterial);
                t0['material'] = tMaterial
                unit.run(t0['material'] == tMaterial)
            }, true),
            redTest("성공테스트 : set 테스트", function (unit, title) {
                var tMaterial = RedColorMaterial(tRedGL)
                var t0 = RedLine(tRedGL, tMaterial);
                t0['material'] = tMaterial
                unit.run(t0['_material'] == tMaterial)
            }, true),
            redTest("실패테스트 : RedColorMaterial Instance가 아닌 값입력시 에러", function (unit, title) {
                var tMaterial = RedColorPhongMaterial(tRedGL)
                try {
                    var t0 = RedLine(tRedGL, tMaterial);
                    unit.run(true)
                } catch (error) {
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedLine Instance).<b>addPoint</b>( x, y, z )",
            redTest("성공테스트 : 동작확인", function (unit, title) {
                var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
                t0.addPoint(1, 2, 3)
                unit.run(t0['_interleaveData'][0] + '_' + t0['_interleaveData'][1] + '_' + t0['_interleaveData'][2])
            }, '1_2_3'),
            redTest("성공테스트 : 버퍼데이터에 잘적용되나 확인", function (unit, title) {
                var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
                t0.addPoint(1, 2, 3)
                unit.run(t0['_interleaveBuffer']['data'][0] + '_' + t0['_interleaveBuffer']['data'][1] + '_' + t0['_interleaveBuffer']['data'][2])
            }, '1_2_3'),
            redTest("실패테스트 : x값 숫자만 허용", function (unit, title) {
                try {
                    var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
                    t0.addPoint('failTest', 2, 3)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : y값 숫자만 허용", function (unit, title) {
                try {
                    var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
                    t0.addPoint(1, 'failTest', 3)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : y값 숫자만 허용", function (unit, title) {
                try {
                    var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
                    t0.addPoint(1, 2, 'failTest')
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedLine Instance).<b>removeAllPoint</b>()",
            redTest("성공테스트 : 동작확인", function (unit, title) {
                var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
                t0.addPoint(1, 2, 3)
                t0.removeAllPoint()
                unit.run(t0['_interleaveData'].length)
            }, 0),
            redTest("성공테스트 : 버퍼데이터에 잘적용되나 확인", function (unit, title) {
                var t0 = RedLine(tRedGL, RedColorMaterial(tRedGL));
                t0.addPoint(1, 2, 3)
                t0.removeAllPoint()
                unit.run(t0['_interleaveBuffer']['data'].length)
            }, 0)
        )
    )
})
