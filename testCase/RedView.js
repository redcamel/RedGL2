"use strict";
var tScene, tCamera, tView;
tScene = new RedScene();
tCamera = new RedCamera();
tView = new RedView('tView', tScene, tCamera)
console.log(tScene, tCamera);
redSuite(
    "RedView Test",
    redGroup(
        "생성 확인",
        redTest("new 생성확인", function (unit) {
            var t0;
            t0 = new RedView('testView', tScene, tCamera)
            unit.run(t0 instanceof RedView)
        }, true),
        redTest("함수실행 생성확인", function (unit) {
            var t0;
            t0 = RedView('testView2', tScene, tCamera)
            unit.run(t0 instanceof RedView)
        }, true),
        redTest("중복키 방지확인", function (unit) {
            try {
                RedView('testView2', tScene, tCamera)
                unit.run(true)
            } catch (error) {
                unit.run(false)
            }
        }, false),
        redTest("키로 찾기 확인", function (unit) {
            unit.run(RedView('tView'))
        }, tView),
        redTest("키가 문자열이 아닐떄", function (unit) {
            try {
                RedView(1, tScene, tCamera)
                unit.run(true)
            } catch (error) {
                unit.run(false)
            }
        }, false),
        redTest("scene이 RedScene이 아닐떄", function (unit) {
            try {
                RedView('testScene', 1, tCamera)
                unit.run(true)
            } catch (error) {
                unit.run(false)
            }
        }, false),
        redTest("camera가 RedCameara가 아닐떄", function (unit) {
            try {
                RedView('testScene', tScene, 1)
                unit.run(true)
            } catch (error) {
                unit.run(false)
            }
        }, false)
    ),
    redGroup(
        "set",
        redTest("setSize : Number", function (unit) {
            var t0;
            t0 = RedView('testSetSize', tScene, tCamera)
            t0.setSize(50, 50)
            unit.run(t0['_width'] + '_' + t0['_height'])
        }, '50_50'),
        redTest("setSize : %", function (unit) {
            var t0;
            t0 = RedView('testSetSize2', tScene, tCamera)
            t0.setSize('50%', '50%')
            unit.run(t0['_width'] + '_' + t0['_height'])
        }, '50%_50%'),
        redTest("setLocation : Number", function (unit) {
            var t0;
            t0 = RedView('testSetLocation', tScene, tCamera)
            t0.setLocation(30, 30)
            unit.run(t0['_x'] + '_' + t0['_y'])
        }, '30_30'),
        redTest("setLocation : %", function (unit) {
            var t0;
            t0 = RedView('testSetLocation2', tScene, tCamera)
            t0.setLocation('30%', '30%')
            unit.run(t0['_x'] + '_' + t0['_y'])
        }, '30%_30%')
    )
)
