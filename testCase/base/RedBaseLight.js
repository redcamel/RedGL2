"use strict";
RedGL.setDoNotPrepareProgram();
RedGL(document.createElement('canvas'), function (v) {

    redSuite(
        "RedBaseLight Test",
        redGroup(
            "(RedBaseLight Instance).intensity = <b>value</b>",
            redTest("성공테스트 : 1 입력", function (unit, title) {
                try {
                    var t0 = RedBaseLight();
                    t0['intensity'] = 1
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : 1.1 입력", function (unit, title) {
                try {
                    var t0 = RedBaseLight();
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
                    var t0 = RedBaseLight();
                    t0['intensity'] = -1
                    unit.run(t0['intensity'])
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, 0),
            redTest("실패테스트 : 문자 입력", function (unit, title) {
                try {
                    var t0 = RedBaseLight();
                    t0['intensity'] = 'test'
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : true 입력", function (unit, title) {
                try {
                    var t0 = RedBaseLight();
                    t0['intensity'] = true
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : false 입력", function (unit, title) {
                try {
                    var t0 = RedBaseLight();
                    t0['intensity'] = true
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
