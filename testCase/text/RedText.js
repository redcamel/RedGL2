"use strict";
RedGL.setDoNotPrepareProgram();
var tRedGL
RedGL(document.createElement('canvas'), function (v) {
    tRedGL = this
    redSuite(
        "RedText Test",
        redGroup(
            "RedText( redGL )",
            redTest("성공테스트 : 기본생성확인", function (unit, title) {
                var t0;
                t0 = RedText(tRedGL)
                unit.run(t0 instanceof RedText)
            }, true),
            redTest("실패테스트 : RedGL Instance만 허용하는지", function (unit, title) {
                try {
                    RedText()
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedText Instance).<b>width</b> = value",
            redTest("성공테스트 : 반영되는지", function (unit, title) {
                var t0 = RedText(tRedGL, 123)
                console.log(t0)
                unit.run(t0['width'])
            }, 123),
            redTest("성공테스트 : 2보다 작은 숫자입력시 2로 치환되는지", function (unit, title) {
                var t0 = RedText(tRedGL, 1, 512)
                unit.run(t0['width'])
            }, 2),
            redTest("성공테스트 : 2보다 큰 숫자만 허용", function (unit, title) {
                var t0 = RedText(tRedGL, 123, 512)
                console.log(t0)
                unit.run(t0['height'])
            }, 512),
            redTest("실패테스트 : width - 문자입력시", function (unit, title) {
                try {
                    var t0 = RedText(tRedGL, 'failTest', 512)
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedText Instance).<b>height</b> = value",
            redTest("성공테스트 : 반영되는지", function (unit, title) {
                var t0 = RedText(tRedGL, 123, 512)
                console.log(t0)
                unit.run(t0['height'])
            }, 512),
            redTest("성공테스트 : 2보다 작은 숫자입력시 2로 치환되는지", function (unit, title) {
                var t0 = RedText(tRedGL, 512, 1)
                unit.run(t0['height'])
            }, 2),
            redTest("성공테스트 : 2보다 큰 숫자만 허용", function (unit, title) {
                var t0 = RedText(tRedGL, 123, 512)
                console.log(t0)
                unit.run(t0['height'])
            }, 512),
            redTest("실패테스트 : height - 문자입력시", function (unit, title) {
                try {
                    var t0 = RedText(tRedGL, 512, 'failTest')
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedText Instance).<b>perspectiveScale</b> = value",
            redTest("성공테스트 : true 입력", function (unit, title) {
                var t0 = RedText(tRedGL);
                t0['perspectiveScale'] = true
                unit.run(t0['perspectiveScale'])
            }, true),
            redTest("성공테스트 : false 입력", function (unit, title) {
                var t0 = RedText(tRedGL);
                t0['perspectiveScale'] = false
                unit.run(t0['perspectiveScale'])
            }, false),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    var t0 = RedText(tRedGL);
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
                    var t0 = RedText(tRedGL);
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
            "(RedText Instance).<b>sprite3DYn</b> = value",
            redTest("성공테스트 : true 입력", function (unit, title) {
                var t0 = RedText(tRedGL);
                t0['sprite3DYn'] = true
                unit.run(t0['sprite3DYn'])
            }, true),
            redTest("성공테스트 : false 입력", function (unit, title) {
                var t0 = RedText(tRedGL);
                t0['sprite3DYn'] = false
                unit.run(t0['sprite3DYn'])
            }, false),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    var t0 = RedText(tRedGL);
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
                    var t0 = RedText(tRedGL);
                    t0['sprite3DYn'] = 'failTest'
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
            "(RedText Instance).<b>text</b> = value",
            redTest("성공테스트", function (unit, title) {
                var t0 = RedText(tRedGL);
                t0['text'] = 'test'
                unit.run(t0['text'])
            }, 'test')
        )
    )
})
