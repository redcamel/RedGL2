"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedBaseController TEST";
RedTest.testGroup(
    "(RedBaseController Instance).<b>addChild</b>( child )",
    function () {
        RedTest.test(
            "실패테스트 : update는 반드시 재정의 해야함",
            function () {
                try {
                    var testController = new RedBaseController();
                    testController.update();
                    RedTest.run(true)
                } catch (error) {
                    RedTest.run(false, error)
                }
            },
            false
        );
    }
);