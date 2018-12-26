"use strict";
RedGL(document.createElement('canvas'), function (v) {
    var tRedGL = this;
    var tMaterial = RedColorMaterial(tRedGL)
    redSuite(
        "RedSprite3D 테스트",
        redGroup(
            "RedSprite( redGL, material )",
            redTest("성공테스트 : 기본 생성 테스트", function (unit, title) {
                try {
                    var t0 = RedSprite3D(tRedGL, tMaterial);
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
            "RedSprite( <b>redGL</b>, material )",
            redTest("실패테스트 : RedGL Instance만 허용하는지.", function (unit, title) {
                try {
                    var t0 = RedSprite3D(1, tMaterial);
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
            "RedSprite( redGL, <b>material</b> )",
            redTest("실패테스트 : 미입력", function (unit, title) {
                try {
                    var t0 = RedSprite3D(tRedGL);
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : RedColorMaterial or RedBitmapMaterial Instance가 아닌경우", function (unit, title) {
                try {
                    var t0 = RedSprite3D(tRedGL, {});
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : RedColorMaterial or RedBitmapMaterial Instance가 아닌경우", function (unit, title) {
                try {
                    var t0 = RedSprite3D(tRedGL, 1);
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : set 테스트", function (unit, title) {
                var tBitmapMaterial = RedBitmapMaterial(tRedGL, RedBitmapTexture(tRedGL, RedBaseTexture.EMPTY_BASE64))
                var t0 = RedSprite3D(tRedGL, tMaterial);
                t0['material'] = tBitmapMaterial
                unit.run(t0['material'] == tBitmapMaterial)
            }, true),
            redTest("성공테스트 : set 테스트", function (unit, title) {
                var tBitmapMaterial = RedBitmapMaterial(tRedGL, RedBitmapTexture(tRedGL, RedBaseTexture.EMPTY_BASE64))
                var t0 = RedSprite3D(tRedGL, tMaterial);
                t0['material'] = tBitmapMaterial
                unit.run(t0['_material'] == tBitmapMaterial)
            }, true),
            redTest("성공테스트 : set 테스트", function (unit, title) {
                var tColorMaterial = RedColorMaterial(tRedGL)
                var t0 = RedSprite3D(tRedGL, tMaterial);
                t0['material'] = tColorMaterial
                unit.run(t0['material'] == tColorMaterial)
            }, true),
            redTest("성공테스트 : set 테스트", function (unit, title) {
                var tColorMaterial = RedColorMaterial(tRedGL)
                var t0 = RedSprite3D(tRedGL, tMaterial);
                t0['material'] = tColorMaterial
                unit.run(t0['_material'] == tColorMaterial)
            }, true),
            redTest("실패테스트 : set 테스트 : RedColorMaterial or RedBitmapMaterial Instance가 아닌경우", function (unit, title) {
                try {
                    var tMaterial = RedStandardMaterial(tRedGL, RedBitmapTexture(tRedGL, RedBaseTexture.EMPTY_BASE64))
                    var t0 = RedSprite3D(tRedGL, tMaterial);
                    t0['material'] = tMaterial
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
            "(RedSprite Instance).<b>perspectiveScale</b> = value",
            redTest("성공테스트 : true 입력", function (unit, title) {
                var t0 = RedSprite3D(tRedGL, RedColorMaterial(tRedGL));
                t0['perspectiveScale'] = true
                unit.run(t0['perspectiveScale'])
            }, true),
            redTest("성공테스트 : false 입력", function (unit, title) {
                var t0 = RedSprite3D(tRedGL, RedColorMaterial(tRedGL));
                t0['perspectiveScale'] = false
                unit.run(t0['perspectiveScale'])
            }, false),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    var t0 = RedSprite3D(tRedGL, RedColorMaterial(tRedGL));
                    t0['perspectiveScale'] = 1
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 문자입력", function (unit, title) {
                try {
                    var t0 = RedSprite3D(tRedGL, RedColorMaterial(tRedGL));
                    t0['perspectiveScale'] = 'failTest'
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
            "(RedSprite Instance).<b>sprite3DYn</b> = value",
            redTest("성공테스트 : true 입력", function (unit, title) {
                var t0 = RedSprite3D(tRedGL, RedColorMaterial(tRedGL));
                t0['sprite3DYn'] = true
                unit.run(t0['sprite3DYn'])
            }, true),
            redTest("성공테스트 : false 입력", function (unit, title) {
                var t0 = RedSprite3D(tRedGL, RedColorMaterial(tRedGL));
                t0['sprite3DYn'] = false
                unit.run(t0['sprite3DYn'])
            }, false),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    var t0 = RedSprite3D(tRedGL, RedColorMaterial(tRedGL));
                    t0['sprite3DYn'] = 1
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 문자입력", function (unit, title) {
                try {
                    var t0 = RedSprite3D(tRedGL, RedColorMaterial(tRedGL));
                    t0['sprite3DYn'] = 'failTest'
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        )
    )
})
