"use strict";
var tWorld, tScene, tCamera;
var tRenderItem1, tRenderItem2;
tWorld = new RedWorld();
tScene = new RedScene();
tCamera = new RedCamera();
tRenderItem1 = new RedRenderItem("test_1", tScene, tCamera)
tRenderItem2 = new RedRenderItem("test_2", tScene, tCamera)
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
        "RedRenderItem 관리 확인",
        redTest("addRenderItem - 인자확인", function (unit) {
            try {
                tWorld.addRenderItem(tRenderItem1)
                tWorld.addRenderItem(tRenderItem2)
                unit.run(true)
            } catch (error) {
                unit.run(false)
            }
        }, true),
        redTest("addRenderItem - 인자확인", function (unit) {
            try {
                tWorld.addRenderItem(1)
                unit.run(true)
            } catch (error) {
                unit.run(false)
            }
        }, false),
        redTest("getRenderItem", function (unit) {
            unit.run(tWorld.getRenderItem("test_1")['key'])
        }, 'test_1'),
        redTest("getRenderItem", function (unit) {
            unit.run(tWorld.getRenderItem("test_2")['key'])
        }, 'test_2'),
        redTest("hasRenderItem", function (unit) {
            unit.run(tWorld.hasRenderItem("test_2"))
        }, true),
        redTest("hasRenderItem", function (unit) {
            unit.run(tWorld.hasRenderItem("test_3"))
        }, false),
        redTest("delRenderItem", function (unit) {
            tWorld.delRenderItem("test_2")
            unit.run(tWorld.getRenderItem("test_2"))
        }, undefined),
        redTest("hasRenderItem", function (unit) {
            unit.run(tWorld.hasRenderItem("test_2"))
        }, false),
        redTest("getRenderItemList", function (unit) {
            unit.run(tWorld.getRenderItemList()[0] == tRenderItem1)
        }, true)

    )
)
