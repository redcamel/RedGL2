"use strict";
var tWorld, tScene, tCamera;
var tView1, tView2;
tWorld = new RedWorld();
tScene = new RedScene();
tCamera = new RedCamera();
tView1 = new RedView("test_1", tScene, tCamera)
tView2 = new RedView("test_2", tScene, tCamera)
redSuite(
    "RedWorld Test",
    redGroup(
        "생성 확인",
        redTest("new 생성확인", function (unit) {
            unit.run(new RedWorld() instanceof RedWorld)
        }, true),
        redTest("함수실행 생성확인", function (unit) {
            unit.run(RedWorld() instanceof RedWorld)
        }, true)
    ),
    redGroup(
        "RedView 관리 확인",
        redTest("addView - 인자확인", function (unit) {
            try {
                tWorld.addView(tView1)
                tWorld.addView(tView2)
                unit.run(true)
            } catch (error) {
                unit.run(false)
            }
        }, true),
        redTest("addView - 인자확인", function (unit) {
            try {
                tWorld.addView(1)
                unit.run(true)
            } catch (error) {
                unit.run(false)
            }
        }, false),
        redTest("getView", function (unit) {
            unit.run(tWorld.getView("test_1")['key'])
        }, 'test_1'),
        redTest("getView", function (unit) {
            unit.run(tWorld.getView("test_2")['key'])
        }, 'test_2'),
        redTest("hasView", function (unit) {
            unit.run(tWorld.hasView("test_2"))
        }, true),
        redTest("hasView", function (unit) {
            unit.run(tWorld.hasView("test_3"))
        }, false),
        redTest("delView", function (unit) {
            tWorld.delView("test_2")
            unit.run(tWorld.getView("test_2"))
        }, undefined),
        redTest("hasView", function (unit) {
            unit.run(tWorld.hasView("test_2"))
        }, false),
        redTest("getViewList", function (unit) {
            unit.run(tWorld.getViewList()[0] == tView1)
        }, true)

    )
)
