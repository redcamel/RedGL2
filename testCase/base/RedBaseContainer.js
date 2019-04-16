"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedBaseContainer TEST";
RedTest.testGroup(
    "(RedBaseContainer 확장 객체 인스턴스).<b>addChild</b>( child )",
    function () {
        RedTest.test(
            "성공테스트 : child - RedBaseObject3D Instance만 허용하는지.",
            function () {

                try {
                    var rootContainer = RedBaseContainer();
                    rootContainer.addChild(RedBaseContainer());
                    RedTest.run(true)
                } catch (error) {
                    RedTest.run(false, error)
                }

            },
            true
        );
        RedTest.test(
            "실패테스트  : child - 미입력",
            function () {

                try {
                    var rootContainer = RedBaseContainer();
                    rootContainer.addChild(1);
                    RedTest.run(true)
                } catch (error) {

                    RedTest.run(false, error)
                }

            },
            false
        );
        RedTest.test(
            "실패테스트  : child - 숫자입력",
            function () {

                try {
                    var rootContainer = RedBaseContainer();
                    rootContainer.addChild(1);
                    RedTest.run(true)
                } catch (error) {

                    RedTest.run(false, error)
                }

            },
            false
        );
        RedTest.test(
            "성공테스트  : 기존에 존재하는 자식을 다시 추가할경우 : 기존을 제거하고 후방추가함",
            function () {

                var rootContainer = RedBaseContainer();
                var t1 = RedBaseContainer();
                rootContainer.addChild(t1);
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(t1);
                RedTest.run(rootContainer['children'][2] === t1)

            }, true
        )
    }
);
RedTest.testGroup(
    "(RedBaseContainer 확장 객체 인스턴스).<b>addChildAt</b>( <b>child</b>, index )",
    function () {
        RedTest.test(
            "성공테스트 : child - RedBaseObject3D Instance만 허용하는지.",
            function () {

                try {
                    var rootContainer = RedBaseContainer();
                    rootContainer.addChildAt(RedBaseContainer(), 0);
                    console.log(rootContainer);
                    RedTest.run(true)
                } catch (error) {
                    RedTest.run(false, error)
                }

            },
            true
        );
        RedTest.test(
            "실패테스트 : child - 숫자입력",
            function () {
                try {
                    var rootContainer = RedBaseContainer();
                    rootContainer.addChildAt(1, 0);
                    console.log(rootContainer);
                    RedTest.run(true)
                } catch (error) {

                    RedTest.run(false, error)
                }
            }, false
        );
    }
);
RedTest.testGroup(
    "(RedBaseContainer 확장 객체 인스턴스).<b>addChildAt</b>( child, <b>index</b> )",
    function () {
        RedTest.testListRun(
            "UINT만 허용",
            RedTest.ONLY_UINT,
            function (v) {

                try {
                    var rootContainer = RedBaseContainer();
                    rootContainer.addChildAt(RedBaseContainer(), v[0]);
                    RedTest.run(true)
                } catch (error) {
                    RedTest.run(false, error)
                }

            },
            true
        );
        RedTest.test(
            "성공테스트 : index - index위치에 정확히 들어가는지",
            function () {

                var rootContainer = RedBaseContainer();
                var t1 = RedBaseContainer();
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChildAt(t1, 2);
                console.log(rootContainer);
                RedTest.run(rootContainer['children'][2] === t1);

            },
            true
        );
        RedTest.test(
            "성공테스트 : index - index위치에 정확히 들어가는지",
            function () {

                var rootContainer = RedBaseContainer();
                var t1 = RedBaseContainer();
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChildAt(t1, 4);
                console.log(rootContainer);
                RedTest.run(rootContainer['children'][4] === t1);

            },
            true
        );
        RedTest.test(
            "성공테스트 : index - 추가후 기존자식들은 유지하면서 길이가 늘어나는지",
            function () {

                var rootContainer = RedBaseContainer();
                var t1 = RedBaseContainer();
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChildAt(t1, 1);
                console.log(rootContainer);
                RedTest.run(rootContainer['children'][1] === t1 && rootContainer['children'].length === 5);

            },
            true
        );
        RedTest.test(
            "성공테스트  : 기존에 존재하는 자식을 다시 추가할경우 : 기존을 제거하고 후방추가함",
            function () {

                var rootContainer = RedBaseContainer();
                var t1 = RedBaseContainer();
                rootContainer.addChild(t1);
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChildAt(t1, 3);
                console.log(rootContainer['children']);
                RedTest.run(rootContainer['children'][2] === t1)

            },
            true
        );
        RedTest.test(
            "성공테스트 : index - 범위를 벗어나는 인덱스는 마지막순서에 입력",
            function () {

                var rootContainer = RedBaseContainer();
                var t1 = RedBaseContainer();
                rootContainer.addChildAt(t1, 10);
                RedTest.run(rootContainer['children'][0] === t1);
                console.log(rootContainer['children'])

            },
            true
        )
    }
);

RedTest.testGroup(
    "(RedBaseContainer 확장 객체 인스턴스).<b>getChildAt</b>( <b>index</b> )",
    function () {
        RedTest.test(
            "성공테스트  : 정상 작동확인",
            function () {

                try {
                    var rootContainer = RedBaseContainer();
                    var t0 = RedBaseContainer();
                    rootContainer.addChild(t0);
                    RedTest.run(rootContainer.getChildAt(0) === t0)
                } catch (error) {

                    RedTest.run(false, error)
                }

            },
            true
        );
        RedTest.test(
            "성공테스트  : 정상 작동확인",
            function () {

                try {
                    var rootContainer = RedBaseContainer();
                    var t0 = RedBaseContainer();
                    var t1 = RedBaseContainer();
                    rootContainer.addChild(t0);
                    rootContainer.addChild(t1);
                    RedTest.run(rootContainer.getChildAt(1) === t1)
                } catch (error) {
                    RedTest.run(false, error)
                }

            },
            true
        );
        RedTest.test(
            "실패테스트  : index - 미입력",
            function () {
                try {
                    var rootContainer = RedBaseContainer();
                    rootContainer.addChild(RedBaseContainer());
                    rootContainer.getChildAt(RedBaseContainer());
                    RedTest.run(true)
                } catch (error) {

                    RedTest.run(false, error)
                }
            },
            false
        );
        RedTest.testListRun(
            "UINT만 허용",
            RedTest.ONLY_UINT,
            function (v) {

                try {
                    var rootContainer = RedBaseContainer();
                    rootContainer.addChild(RedBaseContainer());
                    rootContainer.getChildAt(v[0]);
                    RedTest.run(true)
                } catch (error) {
                    RedTest.run(false, error)
                }

            },
            true
        );

    }
);
RedTest.testGroup(
    "(RedBaseContainer 확장 객체 인스턴스).<b>getChildIndex</b>( child )",
    function () {
        RedTest.test(
            "성공테스트 : 기본 동작 확인",
            function () {

                try {
                    var rootContainer = RedBaseContainer();
                    var t1 = RedBaseContainer();
                    rootContainer.addChild(t1);
                    RedTest.run(rootContainer.getChildIndex(t1))
                } catch (error) {
                    RedTest.run(false, error)
                }

            },
            0
        );
        RedTest.test(
            "실패테스트 : children에 존재하지않는 녀석을 삭제하려할때",
            function () {

                try {
                    var rootContainer = RedBaseContainer();
                    var t1 = RedBaseContainer();
                    rootContainer.getChildIndex(t1);
                    console.log(rootContainer);
                    RedTest.run(-1)
                } catch (error) {

                    RedTest.run(false, error)
                }

            },
            -1
        )
    }
);
RedTest.testGroup(
    "(RedBaseContainer 확장 객체 인스턴스).<b>removeChild</b>( child )",
    function () {
        RedTest.test(
            "성공테스트 : 기본 동작 확인",
            function () {

                try {
                    var rootContainer = RedBaseContainer();
                    var t1 = RedBaseContainer();
                    rootContainer.addChild(t1);
                    rootContainer.removeChild(t1);
                    console.log(rootContainer);
                    RedTest.run(true)
                } catch (error) {
                    RedTest.run(false, error)
                }

            },
            true
        );
        RedTest.test(
            "실패테스트 : children에 존재하지않는 녀석을 삭제하려할때",
            function () {

                try {
                    var rootContainer = RedBaseContainer();
                    var t1 = RedBaseContainer();
                    rootContainer.addChild(t1);
                    rootContainer.removeChild(0);
                    console.log(rootContainer);
                    RedTest.run(true)
                } catch (error) {

                    RedTest.run(false, error)
                }

            },
            false
        );
        RedTest.test(
            "성공테스트 : 삭제후 children.length가 잘줄어드는지",
            function () {

                var rootContainer = RedBaseContainer();
                var t1 = RedBaseContainer();
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(t1);
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.removeChild(t1);
                console.log(rootContainer);
                RedTest.run(rootContainer['children'].length)

            },
            4
        );
    }
);
RedTest.testGroup(
    "(RedBaseContainer 확장 객체 인스턴스).<b>removeChildAt</b>( index )",
    function () {
        // noinspection CommaExpressionJS
        RedTest.test(
            "성공테스트 : 기본 동작확인",
            function () {

                var rootContainer = RedBaseContainer();
                var t1 = RedBaseContainer();
                rootContainer.addChild(t1);
                rootContainer.removeChildAt(0);
                console.log(rootContainer);
                RedTest.run(rootContainer.children.length)

            }, 0);
        RedTest.test(
            "성공테스트 : 삭제후 children.length가 잘줄어드는지",
            function () {

                var rootContainer = RedBaseContainer();
                var t1 = RedBaseContainer();
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(t1);
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.removeChildAt(2);
                console.log(rootContainer);
                RedTest.run(rootContainer['children'].length)

            }, 4);
        RedTest.test(
            "실패테스트  : 해당인덱스에 자식이 존재하지않을때",
            function () {

                try {
                    var rootContainer = RedBaseContainer();
                    var t1 = RedBaseContainer();
                    rootContainer.addChild(RedBaseContainer());
                    rootContainer.addChild(RedBaseContainer());
                    rootContainer.addChild(t1);
                    rootContainer.addChild(RedBaseContainer());
                    rootContainer.addChild(RedBaseContainer());
                    rootContainer.removeChildAt(10);
                    console.log(rootContainer);
                    RedTest.run(true)
                } catch (error) {
                    RedTest.run(false, error)
                }

            },
            false
        );
        RedTest.testListRun(
            "UINT만 허용",
            RedTest.ONLY_UINT,
            function (v) {

                try {
                    var rootContainer = RedBaseContainer();
                    rootContainer.addChild(RedBaseContainer());
                    rootContainer.addChild(RedBaseContainer());
                    rootContainer.removeChildAt(v[0]);
                    console.log(rootContainer);
                    RedTest.run(true)
                } catch (error) {
                    RedTest.run(false, error)
                }

            }
        );
    }
);
RedTest.testGroup(
    "(RedBaseContainer 확장 객체 인스턴스).<b>removeChildAll</b>()",
    function () {
        RedTest.test(
            "성공테스트 : 기본 동작 확인",
            function () {

                var rootContainer = RedBaseContainer();
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.removeChildAll();
                console.log(rootContainer);
                RedTest.run(rootContainer.children.length)

            },
            0
        )
    }
);
RedTest.testGroup(
    "(RedBaseContainer 확장 객체 인스턴스).<b>numChildren</b>(  )",
    function () {
        RedTest.test(
            "성공테스트 : 기본 동작 확인",
            function () {

                var rootContainer = RedBaseContainer();
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                rootContainer.addChild(RedBaseContainer());
                console.log(rootContainer);
                RedTest.run(rootContainer.numChildren())

            },
            5
        )
    }
);
