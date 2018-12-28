"use strict";
RedGL.setDoNotPrepareProgram();
var tRedGL
RedGL(document.createElement('canvas'), function (v) {
    tRedGL = this
    redSuite(
        "RedVideoTexture Test",
        redGroup(
            "RedVideoTexture( redGL, src, callBack )",
            redTest("성공테스트 : 기본생성확인", function (unit, title) {
                var t0;
                t0 = RedVideoTexture(tRedGL, '../../asset/mov_bbb.mp4')
                unit.run(t0 instanceof RedVideoTexture)
            }, true)
        ),
        redGroup(
            "RedVideoTexture( redGL, <b>src</b>, callBack )",
            redTest("성공테스트 : 미입력", function (unit, title) {
                try {
                    RedVideoTexture(tRedGL)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    RedVideoTexture(tRedGL, 1)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : HTMLVideoElement 이외 Element입력", function (unit, title) {
                try {
                    RedVideoTexture(tRedGL, document.createElement('div'))
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : HTMLVideoElement 입력", function (unit, title) {
                try {
                    var t0 = document.createElement('video')
                    t0.src = '../../asset/mov_bbb.mp4'
                    console.log(t0)
                    RedVideoTexture(tRedGL, t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true)
        ),
        redGroup(
            "RedVideoTexture( redGL, src, <b>callBack</b> )",
            redTest("성공테스트 : 미입력", function (unit, title) {
                try {
                    RedVideoTexture(tRedGL)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : 콜백함수 입력", function (unit, title) {
                RedVideoTexture(tRedGL, '../../asset/mov_bbb.mp4', function () {
                    unit.run(true)
                })
            }, true),
            redTest("실패테스트 : 콜백에 함수외 다른것을 입력했을떄", function (unit, title) {
                try {
                    RedVideoTexture(tRedGL, '../../asset/mov_bbb.mp4', 1)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : callback : 미입력", function (unit, title) {
                try {
                    RedVideoTexture(tRedGL, '../../asset/mov_bbb.mp4')
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : src로드 성공시 callback", function (unit, title) {
                RedVideoTexture(tRedGL, '../../asset/mov_bbb.mp4', function (v) {
                    unit.run(v)
                })
            }, true),
            redTest("실패테스트 : src로드 실패시 callback", function (unit, title) {
                RedVideoTexture(tRedGL, '~~~', function (v) {
                    unit.run(v)
                })
            }, false)
        )
    )
})
