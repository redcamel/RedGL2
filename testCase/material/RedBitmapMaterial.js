"use strict";
RedGL(document.createElement('canvas'), function (v) {
    var tRedGL = this;
    redSuite(
        "RedBitmapMaterial 테스트",
        redGroup(
            "RedBitmapMaterial( redGL, diffuseTexture )",
            redTest("성공테스트 : 기본 생성 테스트", function (unit, title) {
                try {
                    RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedGL instance만 허용.", function (unit, title) {
                try {
                    RedBitmapMaterial(1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "RedBitmapMaterial( redGL, <b>diffuseTexture</b> )",
            redTest("실패테스트 : 미입력", function (unit, title) {
                try {
                    RedBitmapMaterial(tRedGL);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    RedBitmapMaterial(tRedGL, 1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedBitmapTexture Instance 입력", function (unit, title) {
                try {
                    RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedBitmapCubeTexture Instance 입력", function (unit, title) {
                try {
                    RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['3d']);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedBitmapMaterial Instance).<b>alpha</b> = value",
            redTest("성공테스트 : 초기값", function (unit, title) {
                var t0 = RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                unit.run(t0['alpha'])
            }, 1),
            redTest("성공테스트 : 초기값", function (unit, title) {
                var t0 = RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                unit.run(t0['_alpha'])
            }, 1),
            redTest("성공테스트 : 0.5입력", function (unit, title) {
                var t0 = RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                t0['alpha'] = 0.5
                unit.run(t0['alpha'])
            }, 0.5),
            redTest("성공테스트 : 1이상을 입력하면 1로 치환되는지", function (unit, title) {
                var t0 = RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                t0.alpha = 11111
                unit.run(t0['alpha'])
            }, 1),
            redTest("성공테스트 : 0이하를 입력하면 0으로 치환되는지", function (unit, title) {
                var t0 = RedBitmapMaterial(tRedGL, tRedGL._datas.emptyTexture['2d']);
                t0.alpha = -11111
                unit.run(t0['alpha'])
            }, 0)
        )
    )
})
