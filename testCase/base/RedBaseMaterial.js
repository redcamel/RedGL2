"use strict";
RedGL(document.createElement('canvas'), function (v) {
    var tRedGL = this;
    redSuite(
        "checkUniformAndProperty 테스트",
        redGroup(
            "생성 확인",
            redTest("기본 생성 테스트", function (unit, title) {
                var TestMaterial;
                (function () {
                    var makeProgram;
                    TestMaterial = function (redGL) {
                        if (!(this instanceof TestMaterial)) return new TestMaterial(redGL);
                        /////////////////////////////////////////
                        // 유니폼 프로퍼티
                        /////////////////////////////////////////
                        // 일반 프로퍼티
                        this['program'] = makeProgram(redGL);
                        this['_UUID'] = RedGL['makeUUID']();
                        this.checkUniformAndProperty();
                    }
                    makeProgram = (function () {
                        var vSource, fSource;
                        var PROGRAM_NAME;
                        vSource = function () {
                            /* @preserve
                            void main(void) {
                                gl_Position = vec4(1.0);
                            }
                             */
                        }
                        fSource = function () {
                            /* @preserve
                             precision mediump float;
                             void main(void) {
                                 gl_FragColor = vec4(1.0);
                             }
                             */
                        }
                        vSource = RedGLUtil.getStrFromComment(vSource.toString());
                        fSource = RedGLUtil.getStrFromComment(fSource.toString());
                        PROGRAM_NAME = 'testProgram' + RedGL.makeUUID();
                        return function (redGL) {
                            return RedProgram(redGL, PROGRAM_NAME, vSource, fSource)
                        }
                    })()
                    TestMaterial.prototype = new RedBaseMaterial()
                    Object.freeze(TestMaterial)
                })();
                try {
                    var t0 = TestMaterial(tRedGL)
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("유니폼 매칭 성공 테스트 : uXxxx가 쉐이더에 선언/사용되고 있으면 재질내의 xxxx 속성키가 있는지 / ex) uColor는 재질의 color속성이 있는지 매칭함", function (unit, title) {
                var TestMaterial;
                (function () {
                    var makeProgram;
                    TestMaterial = function (redGL) {
                        if (!(this instanceof TestMaterial)) return new TestMaterial(redGL);
                        /////////////////////////////////////////
                        // 유니폼 프로퍼티
                        this['testFloat'] = 1;
                        /////////////////////////////////////////
                        // 일반 프로퍼티
                        this['program'] = makeProgram(redGL);
                        this['_UUID'] = RedGL['makeUUID']();
                        this.checkUniformAndProperty();
                    }
                    makeProgram = (function () {
                        var vSource, fSource;
                        var PROGRAM_NAME;
                        vSource = function () {
                            /* @preserve
                            uniform float uTestFloat;
                            void main(void) {
                                uTestFloat;
                                gl_Position = vec4(1.0);
                            }
                             */
                        }
                        fSource = function () {
                            /* @preserve
                             precision mediump float;
                             void main(void) {
                                 gl_FragColor = vec4(1.0);
                             }
                             */
                        }
                        vSource = RedGLUtil.getStrFromComment(vSource.toString());
                        fSource = RedGLUtil.getStrFromComment(fSource.toString());
                        PROGRAM_NAME = 'testProgram' + RedGL.makeUUID();
                        return function (redGL) {
                            return RedProgram(redGL, PROGRAM_NAME, vSource, fSource)
                        }
                    })()
                    TestMaterial.prototype = new RedBaseMaterial()
                    Object.freeze(TestMaterial)
                })();
                try {
                    var t0 = TestMaterial(tRedGL)
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("유니폼 매칭 실패 테스트 : uXxxx가 쉐이더에 선언/사용되고 있으면 재질내의 xxxx 속성키가 있는지 / ex) uColor는 재질의 color속성이 있는지 매칭함", function (unit, title) {
                var TestMaterial;
                (function () {
                    var makeProgram;
                    TestMaterial = function (redGL) {
                        if (!(this instanceof TestMaterial)) return new TestMaterial(redGL);
                        /////////////////////////////////////////
                        // 유니폼 프로퍼티
                        /////////////////////////////////////////
                        // 일반 프로퍼티
                        this['program'] = makeProgram(redGL);
                        this['_UUID'] = RedGL['makeUUID']();
                        this.checkUniformAndProperty();

                    }
                    makeProgram = (function () {
                        var vSource, fSource;
                        var PROGRAM_NAME;
                        vSource = function () {
                            /* @preserve
                            uniform float uTestFloat;
                            void main(void) {
                                gl_Position = vec4(uTestFloat);
                            }
                             */
                        }
                        fSource = function () {
                            /* @preserve
                             precision mediump float;
                             void main(void) {
                                 gl_FragColor = vec4(1.0);
                             }
                             */
                        }
                        vSource = RedGLUtil.getStrFromComment(vSource.toString());
                        fSource = RedGLUtil.getStrFromComment(fSource.toString());
                        PROGRAM_NAME = 'testProgram' + RedGL.makeUUID();
                        return function (redGL) {
                            return RedProgram(redGL, PROGRAM_NAME, vSource, fSource)
                        }
                    })()
                    TestMaterial.prototype = new RedBaseMaterial()
                    Object.freeze(TestMaterial)
                })();
                try {
                    var t0 = TestMaterial(tRedGL)
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        )
    )
})
