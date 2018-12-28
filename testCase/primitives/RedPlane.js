"use strict";
RedGL.setDoNotPrepareProgram();
RedGL(document.createElement('canvas'), function (v) {
    var tRedGL = this;
    redSuite(
        "RedPlane Test",
        redGroup(
            "생성 확인",
            redTest("기본 생성 테스트", function (unit, title) {
                try {
                    var t0 = RedPlane(tRedGL)
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("인자확인 redGL : RedGL Instance만 허용하는지", function (unit, title) {
                try {
                    var t0 = RedPlane(1)
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("캐싱확인 : 구성 정보가 같으면 캐싱된 정보가 넘어온다.", function (unit, title) {
                var t0 = RedPlane(tRedGL);
                var t1 = RedPlane(tRedGL);
                unit.run(t0 == t1)
            }, true),
            redTest("생성시 입력변수에 따른 interleaveBuffer 고유키값이 생성되는지 확인 : RedPlane( tRedGL, 2, 2 )", function (unit, title) {
                var t0 = RedPlane(tRedGL, 2, 2);
                unit.run(t0['interleaveBuffer']['key'])
            }, 'RedPlane_2_2_1_1_interleaveBuffer'),
            redTest("생성시 입력변수에 따른 interleaveBuffer 고유키값이 생성되는지 확인 : RedPlane( tRedGL, 2, 2, 3, 4 )", function (unit, title) {
                var t0 = RedPlane(tRedGL, 2, 2, 3, 4);
                unit.run(t0['interleaveBuffer']['key'])
            }, 'RedPlane_2_2_3_4_interleaveBuffer'),
            redTest("생성시 입력변수에 따른 indexBuffer 고유키값이 생성되는지 확인 : RedPlane( tRedGL, 2, 2 )", function (unit, title) {
                var t0 = RedPlane(tRedGL, 2, 2);
                unit.run(t0['indexBuffer']['key'])
            }, 'RedPlane_2_2_1_1_indexBuffer'),
            redTest("생성시 입력변수에 따른 indexBuffer 고유키값이 생성되는지 확인 : RedPlane( tRedGL, 2, 2, 3, 4 )", function (unit, title) {
                var t0 = RedPlane(tRedGL, 2, 2, 3, 4);
                unit.run(t0['indexBuffer']['key'])
            }, 'RedPlane_2_2_3_4_indexBuffer')
        )
    )
})
