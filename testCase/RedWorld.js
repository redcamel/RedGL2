"use strict";
redSuite(
    "RedWorld Test",
    redGroup(
        "생성 확인",
        redTest("생성확인", function (unit) {
            var t0;
            t0 = new RedWorld();
            unit.run(t0 instanceof RedWorld)
        }, true)
    ),
    redGroup(
        "get/set"
    )
)
