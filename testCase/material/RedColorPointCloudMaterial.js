"use strict";
RedGL.setDoNotPrepareProgram();
RedGL(document.createElement('canvas'), function (v) {
    var tRedGL = this;
    redSuite(
        "RedColorPointCloudMaterial 테스트",
        redGroup(
            "RedColorPointCloudMaterial( redGL )",
            redTest("성공테스트 : 기본 생성 테스트", function (unit, title) {
                try {
                    RedColorPointCloudMaterial(tRedGL);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : RedGL instance만 허용.", function (unit, title) {
                try {
                    RedColorPointCloudMaterial(1);
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedColorPointCloudMaterial Instance).<b>alpha</b> = value",
            redTest("실패테스트  : 생성인자 반영되는지 체크 : 숫자만 허용하는지", function (unit, title) {
                try {
                    var t0 = RedColorPointCloudMaterial(tRedGL);
                    t0.alpha = 'failTest'
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : 0.5", function (unit, title) {
                var t0 = RedColorPointCloudMaterial(tRedGL);
                t0.alpha = 0.5
                unit.run(t0['alpha'])
            }, 0.5),
            redTest("성공테스트 : 1이상을 입력하면 1로 치환되는지", function (unit, title) {
                var t0 = RedColorPointCloudMaterial(tRedGL);
                t0.alpha = 1000
                unit.run(t0['alpha'])
            }, 1),
            redTest("성공테스트 : 0이하를 입력하면 0으로 치환되는지", function (unit, title) {
                var t0 = RedColorPointCloudMaterial(tRedGL);
                t0.alpha = -1000
                unit.run(t0['alpha'])
            }, 0)
        )
    )
})
