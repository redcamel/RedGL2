"use strict";
RedGL(document.createElement('canvas'), function (v) {
    var tRedGL = this;
    redSuite(
        "RedBaseContainer Method 테스트",
        redGroup(
            "(RedBaseContainer 확장 객체 인스턴스).<b>addChild</b>( child )",
            redTest("성공테스트 : child - RedBaseObject3D Instance만 허용하는지.", function (unit, title) {
                try {
                    var rootMesh = RedMesh(tRedGL);
                    rootMesh.addChild(RedMesh(tRedGL))
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트  : child - 미입력", function (unit, title) {
                try {
                    var rootMesh = RedMesh(tRedGL);
                    rootMesh.addChild(1)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트  : child - 숫자입력", function (unit, title) {
                try {
                    var rootMesh = RedMesh(tRedGL);
                    rootMesh.addChild(1)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트  : 기존에 존재하는 자식을 다시 추가할경우 : 기존을 제거하고 후방추가함", function (unit, title) {
                var rootMesh = RedMesh(tRedGL);
                var t1 = RedMesh(tRedGL)
                rootMesh.addChild(t1)
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(t1)
                unit.run(rootMesh['children'][2] == t1)
            }, true)
        ),
        redGroup(
            "(RedBaseContainer 확장 객체 인스턴스).<b>addChildAt</b>( child, index )",
            redTest("성공테스트 : child - RedBaseObject3D Instance만 허용하는지.", function (unit, title) {
                try {
                    var rootMesh = RedMesh(tRedGL);
                    rootMesh.addChildAt(RedMesh(tRedGL), 0)
                    console.log(rootMesh)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : child - 숫자입력", function (unit, title) {
                try {
                    var rootMesh = RedMesh(tRedGL);
                    rootMesh.addChildAt(1, 0)
                    console.log(rootMesh)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트  : index - 미입력", function (unit, title) {
                try {
                    var rootMesh = RedMesh(tRedGL);
                    rootMesh.addChildAt(RedMesh(tRedGL))
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트  : index - 문자입력", function (unit, title) {
                try {
                    var rootMesh = RedMesh(tRedGL);
                    rootMesh.addChildAt(RedMesh(tRedGL), 'failTest')
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),

            redTest("성공테스트 : index - index위치에 정확히 들어가는지", function (unit, title) {
                var rootMesh = RedMesh(tRedGL);
                var t1 = RedLine(tRedGL, RedColorMaterial(tRedGL));
                rootMesh.addChild(RedMesh(tRedGL));
                rootMesh.addChild(RedMesh(tRedGL));
                rootMesh.addChild(RedMesh(tRedGL));
                rootMesh.addChild(RedMesh(tRedGL));
                rootMesh.addChildAt(t1, 2);
                console.log(rootMesh);
                unit.run(rootMesh['children'][2] == t1);
            }, true),
            redTest("성공테스트 : index - index위치에 정확히 들어가는지", function (unit, title) {
                var rootMesh = RedMesh(tRedGL);
                var t1 = RedLine(tRedGL, RedColorMaterial(tRedGL));
                rootMesh.addChild(RedMesh(tRedGL));
                rootMesh.addChild(RedMesh(tRedGL));
                rootMesh.addChild(RedMesh(tRedGL));
                rootMesh.addChild(RedMesh(tRedGL));
                rootMesh.addChildAt(t1, 4);
                console.log(rootMesh);
                unit.run(rootMesh['children'][4] == t1);
            }, true),
            redTest("성공테스트 : index - 추가후 기존자식들은 유지하면서 길이가 늘어나는지", function (unit, title) {
                var rootMesh = RedMesh(tRedGL);
                var t1 = RedLine(tRedGL, RedColorMaterial(tRedGL));
                rootMesh.addChild(RedMesh(tRedGL));
                rootMesh.addChild(RedMesh(tRedGL));
                rootMesh.addChild(RedMesh(tRedGL));
                rootMesh.addChild(RedMesh(tRedGL));
                rootMesh.addChildAt(t1, 1);
                console.log(rootMesh);
                unit.run(rootMesh['children'][1] == t1 && rootMesh['children'].length == 5);
            }, true),
            redTest("성공테스트  : 기존에 존재하는 자식을 다시 추가할경우 : 기존을 제거하고 후방추가함", function (unit, title) {
                var rootMesh = RedMesh(tRedGL);
                var t1 = RedMesh(tRedGL)
                rootMesh.addChild(t1)
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChildAt(t1, 3)
                console.log(rootMesh['children'])
                unit.run(rootMesh['children'][2] == t1)
            }, true),
            redTest("성공테스트 : index - 범위를 벗어나는 인덱스를 마지막순서에 입력", function (unit, title) {
                var rootMesh = RedMesh(tRedGL);
                var t1 = RedMesh(tRedGL);
                rootMesh.addChildAt(t1, 10);
                unit.run(rootMesh['children'][0] == t1)
                console.log(rootMesh['children'])
            }, true)
        ),
        redGroup(
            "(RedBaseContainer 확장 객체 인스턴스).<b>removeChild</b>( child )",
            redTest("성공테스트 : 기본 동작 확인", function (unit, title) {
                try {
                    var rootMesh = RedMesh(tRedGL);
                    var t1 = RedMesh(tRedGL);
                    rootMesh.addChild(t1)
                    rootMesh.removeChild(t1)
                    console.log(rootMesh)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : children에 존재하지않는 녀석을 삭제하려할때", function (unit, title) {
                try {
                    var rootMesh = RedMesh(tRedGL);
                    var t1 = RedMesh(tRedGL);
                    rootMesh.addChild(t1)
                    rootMesh.removeChild(0)
                    console.log(rootMesh)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : 삭제후 children.length가 잘줄어드는지", function (unit, title) {
                var rootMesh = RedMesh(tRedGL);
                var t1 = RedLine(tRedGL, RedColorMaterial(tRedGL));
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(t1)
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.removeChild(t1)
                console.log(rootMesh)
                unit.run(rootMesh['children'].length)
            }, 4)
        ),
        redGroup(
            "(RedBaseContainer 확장 객체 인스턴스).<b>removeChildAt</b>( index )",
            redTest("성공테스트 : 기본 동작확인", function (unit, title) {
                var rootMesh = RedMesh(tRedGL);
                var t1 = RedMesh(tRedGL);
                rootMesh.addChild(t1)
                rootMesh.removeChildAt(0)
                console.log(rootMesh)
                unit.run(rootMesh.children.length)
            }, 0),
            redTest("성공테스트 : 삭제후 children.length가 잘줄어드는지", function (unit, title) {
                var rootMesh = RedMesh(tRedGL);
                var t1 = RedLine(tRedGL, RedColorMaterial(tRedGL));
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(t1)
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.removeChildAt(2)
                console.log(rootMesh)
                unit.run(rootMesh['children'].length)
            }, 4),
            redTest("실패테스트  : 해당인덱스에 자식이 존재하지않을때", function (unit, title) {
                try {
                    var rootMesh = RedMesh(tRedGL);
                    var t1 = RedLine(tRedGL, RedColorMaterial(tRedGL));
                    rootMesh.addChild(RedMesh(tRedGL))
                    rootMesh.addChild(RedMesh(tRedGL))
                    rootMesh.addChild(t1)
                    rootMesh.addChild(RedMesh(tRedGL))
                    rootMesh.addChild(RedMesh(tRedGL))
                    rootMesh.removeChildAt(10)
                    console.log(rootMesh)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedBaseContainer 확장 객체 인스턴스).<b>removeChildAll</b>( index )",
            redTest("성공테스트 : 기본 동작 확인", function (unit, title) {
                var rootMesh = RedMesh(tRedGL);
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.removeChildAll()
                console.log(rootMesh)
                unit.run(rootMesh.children.length)
            }, 0)
        ),
        redGroup(
            "(RedBaseContainer 확장 객체 인스턴스).<b>numChildren</b>( index )",
            redTest("성공테스트 : 기본 동작 확인", function (unit, title) {
                var rootMesh = RedMesh(tRedGL);
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(RedMesh(tRedGL))
                rootMesh.addChild(RedMesh(tRedGL))
                console.log(rootMesh)
                unit.run(rootMesh.numChildren())
            }, 5)
        )
    )
})
