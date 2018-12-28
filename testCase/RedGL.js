"use strict";

redSuite(
    "RedGL Test",
    redGroup(
        "생성 확인 ( canvas, callback, option, targetContext ) ",
        redTest("성공 테스트 : 콜백에서 this가 RedGL 인스턴스인지 확인", function (unit, title) {
            RedGL(document.createElement('canvas'), function (v) {
                unit.run(this instanceof RedGL)
            })
        }, true),
        redTest("성공 테스트 : 콜백인자 true 확인", function (unit, title) {
            RedGL(document.createElement('canvas'), function (v) {
                unit.run(v)
            })
        }, true),
        redTest("실패 테스트 : canvas 엘리먼트만 허용하는지", function (unit, title) {
            try {
                RedGL(document.createElement('div'), function (v) {
                    unit.run(this instanceof RedGL)
                })
            } catch (error) {
                console.log('///////////////////////////////////////////////////////////')
                console.log(title, '\n', error)
                unit.run(false, error)
            }
        }, false)
    ),
    redGroup(
        "명시적 컨텍스트 테스트 ( canvas, callback, option, <b>targetContext</b> ) ",
        redTest("성공 테스트 : 명시적 컨텍스트 테스트 - webgl", function (unit, title) {
            RedGL(document.createElement('canvas'), function (v) {
                unit.run(this['gl']['version'])
            }, null, 'webgl')
        }, 'webgl'),
        redTest("실패 테스트 : 명시적 컨텍스트 테스트 - redCamel : 콜백인자 false 확인", function (unit, title) {
            RedGL(document.createElement('canvas'), function (v) {
                unit.run(v)
            }, null, 'redCamel')
        }, false)
    ),
    redGroup(
        "생성 옵션확인 ( canvas, callback, <b>option</b>, targetContext ) ",
        redTest("옵션생성이 반영되는지 확인 : getContextAttributes", function (unit, title) {
            RedGL(
                document.createElement('canvas'),
                function (v) {
                    unit.run(this.gl.getContextAttributes()['alpha'])
                    console.log(this.gl.getContextAttributes())
                },
                {
                    alpha: true
                }
            )
        }, true),
        redTest("옵션생성이 반영되는지 확인2 : getContextAttributes", function (unit, title) {
            RedGL(
                document.createElement('canvas'),
                function (v) {
                    unit.run(this.gl.getContextAttributes()['antialias'])
                    console.log(this.gl.getContextAttributes())
                },
                {
                    antialias: false
                }
            )
        }, false)
    ),
    redGroup(
        "(RedGL Instance).renderScale = <b>value</b> ",
        redTest("성공테스트 : 기본값 1", function (unit, title) {
            RedGL(document.createElement('canvas'), function () {
                unit.run(this['renderScale'])
            })
        }, 1),
        redTest("성공테스트 : 1보다 큰수가 들어왔을때", function (unit, title) {
            RedGL(document.createElement('canvas'), function () {
                this['renderScale'] = 2
                unit.run(this['renderScale'])
            })
        }, 1),
        redTest("성공테스트 : 0.1보다 작은 수가 들어왔을때", function (unit, title) {
            RedGL(document.createElement('canvas'), function () {
                this['renderScale'] = 0
                unit.run(this['renderScale'])
            })
        }, 0.1),
        redTest("실패테스트 : 문자가 들어왔을때", function (unit, title) {
            RedGL(document.createElement('canvas'), function () {
                try {
                    this['renderScale'] = 'test'
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false, error)
                }
            })
        }, false)
    ),
    redGroup(
        "(RedGL Instance).setSize( <b>width</b>, <b>height</b> )",
        redTest("성공테스트 : 숫자형 확인", function (unit, title) {
            RedGL(document.createElement('canvas'), function () {
                this.setSize(100, 100)
                unit.run(this['_width'] + '_' + this['_height'])
            })
        }, '100_100'),
        redTest("성공테스트 : %형 확인", function (unit, title) {
            RedGL(document.createElement('canvas'), function () {
                this.setSize('100%', '100%')
                unit.run(this['_width'] + '_' + this['_height'])
            })
        }, '100%_100%'),
        redTest("성공테스트 : 숫자형 + %형 확인", function (unit, title) {
            RedGL(document.createElement('canvas'), function () {
                this.setSize('100%', 100)
                unit.run(this['_width'] + '_' + this['_height'])
            })
        }, '100%_100'),
        redTest("실패테스트 : 문자입력했을떄", function (unit, title) {
            RedGL(document.createElement('canvas'), function () {
                try {
                    this.setSize('100%', 'failTest')
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false, error)
                }
            })
        }, false)
    )
)
