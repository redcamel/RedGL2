"use strict";
RedGL.setDoNotPrepareProgram();
RedGL(document.createElement('canvas'), function (v) {
    redSuite(
        "RedInterleaveInfo Test",
        redGroup(
            "RedInterleaveInfo( attributeKey, size, normalize )",
            redTest("성공테스트 : 기본 생성 테스트", function (unit, title) {
                try {
                    var t0 = RedInterleaveInfo('aTest', 3);
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
            "RedInterleaveInfo( <b>attributeKey</b>, size, normalize )",
            redTest("성공테스트  : 설정 확인", function (unit, title) {
                var t0 = RedInterleaveInfo('aTest', 3);
                console.log(t0)
                unit.run(t0['attributeKey'])
            }, 'aTest'),
            redTest("실패테스트 : 문자만허용", function (unit, title) {
                try {
                    var t0 = RedInterleaveInfo(1, 3);
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 첫 글자는 소문자 a만 허용", function (unit, title) {
                try {
                    var t0 = RedInterleaveInfo('ATest', 3);
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 두번째 글자는 대문자만 허용", function (unit, title) {
                try {
                    var t0 = RedInterleaveInfo('Atest', 3);
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
            "RedInterleaveInfo( attributeKey, <b>size</b>, normalize )",
            redTest("size 설정 확인", function (unit, title) {
                var t0 = RedInterleaveInfo('aTest', 3);
                console.log(t0)
                unit.run(t0['size'])
            }, 3),
            redTest("성공테스트 : 숫자만허용", function (unit, title) {
                try {
                    var t0 = RedInterleaveInfo('aTest', 3);
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : 숫자만허용", function (unit, title) {
                try {
                    var t0 = RedInterleaveInfo('aTest', 'aaa');
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
            "RedInterleaveInfo( attributeKey, size, <b>normalize</b> )",
            redTest("성공테스트 : 기본값 확인", function (unit, title) {
                var t0 = RedInterleaveInfo('aTest', 3);
                console.log(t0)
                unit.run(t0['normalize'])
            }, false),
            redTest("성공테스트 : 설정 확인", function (unit, title) {
                var t0 = RedInterleaveInfo('aTest', 3, true);
                console.log(t0)
                unit.run(t0['normalize'])
            }, true)
        )
    )
})
