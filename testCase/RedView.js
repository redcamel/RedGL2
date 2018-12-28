"use strict";
RedGL.setDoNotPrepareProgram();
"use strict";
RedGL.setDoNotPrepareProgram();
RedGL(document.createElement('canvas'), function (v) {
    var tWorld, tScene, tCamera;
    var tView;
    var tRedGL = this
    tScene = new RedScene(this);
    tCamera = new RedCamera();
    tView = new RedView('tView', this, tScene, tCamera)
    console.log(tView)
    redSuite(
        "RedView Test",
        redGroup(
            "RedView( key, redGL, scene, camera )",
            redTest("성공테스트 : new 생성확인", function (unit, title) {
                var t0;
                t0 = new RedView('testView', tRedGL, tScene, tCamera)
                unit.run(t0 instanceof RedView)
            }, true),
            redTest("성공테스트 : 함수실행 생성확인", function (unit, title) {
                var t0;
                t0 = RedView('testView2', tRedGL, tScene, tCamera)
                unit.run(t0 instanceof RedView)
            }, true),
            redTest("성공테스트 : 키 중복 방지확인", function (unit, title) {
                try {
                    RedView('testView2', tRedGL, tScene, tCamera)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : scene이 RedScene이 아닐떄", function (unit, title) {
                try {
                    RedView('testScene', tRedGL, 1, tCamera)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : camera가 RedCameara가 아닐떄", function (unit, title) {
                try {
                    RedView('testScene', tRedGL, tScene, 1)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "RedView( <b>key</b> ) : 키로 검색 확인",
            redTest("성공테스트 : 키로 찾기 확인", function (unit, title) {
                unit.run(RedView('tView'))
            }, tView),
            redTest("실패테스트 : 키가 문자열이 아닐떄", function (unit, title) {
                try {
                    RedView(1, tScene, tCamera)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedView Instance).setSize( <b>width</b>, <b>height</b> )",
            redTest("성공테스트 : Number, Number", function (unit, title) {
                var t0;
                t0 = RedView('testSetSize', tRedGL, tScene, tCamera)
                t0.setSize(50, 50)
                unit.run(t0['_width'] + '_' + t0['_height'])
            }, '50_50'),
            redTest("성공테스트 : %, %", function (unit, title) {
                var t0;
                t0 = RedView('testSetSize')
                t0.setSize('50%', '50%')
                unit.run(t0['_width'] + '_' + t0['_height'])
            }, '50%_50%'),
            redTest("성공테스트 : Number, %", function (unit, title) {
                var t0;
                t0 = RedView('testSetSize')
                t0.setSize(50, '50%')
                unit.run(t0['_width'] + '_' + t0['_height'])
            }, '50_50%'),
            redTest("성공테스트 : %, Number", function (unit, title) {
                var t0;
                t0 = RedView('testSetSize')
                t0.setSize('50%', 50)
                unit.run(t0['_width'] + '_' + t0['_height'])
            }, '50%_50'),
            redTest("실패테스트 : 'testString', 100 - width가 문자일때", function (unit, title) {
                var t0;
                t0 = RedView('testSetSize')
                try {
                    t0.setSize('testString', 100)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 100, 'testString' - height가 문자일때", function (unit, title) {
                var t0;
                t0 = RedView('testSetSize')
                try {
                    t0.setSize(100, 'testString')
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : -1, 100 - width가 0보다 작을때 0으로 보정", function (unit, title) {
                var t0;
                t0 = RedView('testSetSize')
                t0.setSize(-1, 100)
                unit.run(t0['_width'])
            }, 0),
            redTest("성공테스트 : 100, -1 - height가 0보다 작을때 0으로 보정", function (unit, title) {
                var t0;
                t0 = RedView('testSetSize')
                t0.setSize(100, -1)
                unit.run(t0['_height'])
            }, 0)
        ),
        redGroup(
            "(RedView Instance).setLocation( <b>x</b>, <b>y</b> )",
            redTest("성공테스트 : Number, Number", function (unit, title) {
                var t0;
                t0 = RedView('testSetLocation', tRedGL, tScene, tCamera)
                t0.setLocation(30, 30)
                unit.run(t0['_x'] + '_' + t0['_y'])
            }, '30_30'),
            redTest("성공테스트 : %, %", function (unit, title) {
                var t0;
                t0 = RedView('testSetLocation')
                t0.setLocation('30%', '30%')
                unit.run(t0['_x'] + '_' + t0['_y'])
            }, '30%_30%'),
            redTest("성공테스트 : Number, %", function (unit, title) {
                var t0;
                t0 = RedView('testSetLocation')
                t0.setLocation(30, '30%')
                unit.run(t0['_x'] + '_' + t0['_y'])
            }, '30_30%'),
            redTest("성공테스트 : %, Number", function (unit, title) {
                var t0;
                t0 = RedView('testSetLocation')
                t0.setLocation('30%', 30)
                unit.run(t0['_x'] + '_' + t0['_y'])
            }, '30%_30'),
            redTest("실패테스트 : 'testLocation', 100 - x가 문자일때", function (unit, title) {
                var t0;
                t0 = RedView('testSetSize')
                try {
                    t0.setLocation('testLocation', 100)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : 100, 'testLocation' - y가 문자일때", function (unit, title) {
                var t0;
                t0 = RedView('testSetSize')
                try {
                    t0.setLocation(100, 'testLocation')
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : -1, 100 - x가 0보다 작을때 0으로 보정", function (unit, title) {
                var t0;
                t0 = RedView('testSetSize')
                t0.setLocation(-1, 100)
                unit.run(t0['_x'])
            }, 0),
            redTest("성공테스트 : 100, -1 - y가 0보다 작을때 0으로 보정", function (unit, title) {
                var t0;
                t0 = RedView('testSetSize')
                t0.setLocation(100, -1)
                unit.run(t0['_y'])
            }, 0)
        )
    )
})
