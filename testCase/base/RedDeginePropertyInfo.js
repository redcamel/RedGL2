"use strict";
window['testObject'] = function () {
}
redSuite(
    "RedDeginePropertyInfo Test",
    redGroup(
        "생성 확인",
        redTest(
            "성공Test : 기본정의 Test",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'checkKey', 'number')
                var testInstance = new window['testObject']();
                testInstance.checkKey = 1
                unit.run(testInstance.checkKey)
            },
            1
        ),
        redTest(
            "성공Test : 프로토타입에 해당 키가 잘 생성되었는지 확인",
            function (unit, title) {
                unit.run(window['testObject'].prototype.hasOwnProperty('checkKey'))
            },
            true
        ),
        redTest(
            "실패Test : 중복정의 불가 확인",
            function (unit, title) {
                try {
                    RedDefinePropertyInfo.definePrototype('testObject', 'checkKey', 'number')
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            false
        )
    ),
    redGroup(
        "boolean 정의확인",
        redTest(
            "성공Test : boolean - 기본생성",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'booleanTest', 'boolean')
                var testInstance = new window['testObject']();
                testInstance['booleanTest'] = true
                unit.run(testInstance.booleanTest)
            },
            true
        ),
        redTest(
            "성공Test : boolean - 프로토타입에 해당 키가 잘 생성되었는지 확인",
            function (unit, title) {
                unit.run(window['testObject'].prototype.hasOwnProperty('booleanTest'))
            },
            true
        ),
        redTest(
            "실패Test : boolean - 허용 되지않는 값 방어되는지 : 올바르지않은 boolean입력",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'booleanTest2', 'boolean')
                var testInstance = new window['testObject']();
                try {
                    testInstance['booleanTest2'] = '#e1ee'
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            false
        ),
        redTest(
            "실패Test : boolean - 허용 되지않는 값 방어되는지 : 숫자 입력",
            function (unit, title) {
                var testInstance = new window['testObject']();
                try {
                    testInstance['booleanTest2'] = 1
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            false
        ),
        redTest(
            "성공Test : boolean - 생성옵션에 callback 존재시 잘 잘동하는지",
            function (unit, title) {
                var pass = false
                RedDefinePropertyInfo.definePrototype('testObject', 'booleanCallbackTest', 'boolean', {
                    callback: function () {
                        pass = true
                    }
                });
                var testInstance = new window['testObject']();
                testInstance.booleanCallbackTest = false;
                unit.run(pass);
            },
            true
        )
    ),
    redGroup(
        "hex 정의확인",
        redTest(
            "성공Test : hex - 기본생성",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'hexTest', 'hex')
                var testInstance = new window['testObject']();
                testInstance['hexTest'] = '#eee'
                unit.run(testInstance.hexTest)
            },
            '#eee'
        ),
        redTest(
            "성공Test : hex - 프로토타입에 해당 키가 잘 생성되었는지 확인",
            function (unit, title) {
                unit.run(window['testObject'].prototype.hasOwnProperty('hexTest'))
            },
            true
        ),
        redTest(
            "실패Test : hex - 허용 되지않는 값 방어되는지 : 올바르지않은 hex입력",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'hexTest2', 'hex')
                var testInstance = new window['testObject']();
                try {
                    testInstance['hexTest2'] = '#e1ee'
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            false
        ),
        redTest(
            "실패Test : hex - 허용 되지않는 값 방어되는지 : 숫자 입력",
            function (unit, title) {
                var testInstance = new window['testObject']();
                try {
                    testInstance['hexTest2'] = 1
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            false
        ),
        redTest(
            "성공Test : hex - 생성옵션에 callback 존재시 잘 잘동하는지",
            function (unit, title) {
                var pass = false
                RedDefinePropertyInfo.definePrototype('testObject', 'hexCallbackTest', 'hex', {
                    callback: function () {
                        pass = true
                    }
                });
                var testInstance = new window['testObject']();
                testInstance.hexCallbackTest = '#eeffee';
                unit.run(pass);
            },
            true
        )
    ),
    redGroup(
        "number 정의확인",
        redTest(
            "성공Test : number - 기본생성",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'numberTest', 'number')
                var testInstance = new window['testObject']();
                testInstance['numberTest'] = 11;
                unit.run(testInstance.numberTest);
            },
            11
        ),
        redTest(
            "성공Test : number - 프로토타입에 해당 키가 잘 생성되었는지 확인",
            function (unit, title) {
                unit.run(window['testObject'].prototype.hasOwnProperty('numberTest'))
            },
            true
        ),
        redTest(
            "실패Test : number - 허용 되지않는 값 방어되는지확인",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'numberTest2', 'number')
                var testInstance = new window['testObject']();
                try {
                    testInstance['numberTest2'] = '#e1ee'
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            false
        ),
        redTest(
            "실패Test : number - 허용 되지않는 값 방어되는지 : 문자 숫자 입력",
            function (unit, title) {
                var testInstance = new window['testObject']();
                try {
                    testInstance['numberTest2'] = '1'
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            false
        ),
        redTest(
            "성공Test : number - 생성옵션에 callback 존재시 잘 잘동하는지",
            function (unit, title) {
                var pass = false
                RedDefinePropertyInfo.definePrototype('testObject', 'numberCallbackTest', 'number', {
                    callback: function () {
                        pass = true
                    }
                });
                var testInstance = new window['testObject']();
                testInstance.numberCallbackTest = 2;
                unit.run(pass);
            },
            true
        ),
        redTest(
            "성공Test : number - min 옵션 동작확인",
            function (unit, title) {
                var pass = false
                RedDefinePropertyInfo.definePrototype('testObject', 'numberMinTest', 'number', {
                    min: 0
                });
                var testInstance = new window['testObject']();
                testInstance.numberMinTest = -1;
                unit.run(testInstance.numberMinTest);
            },
            0
        ),
        redTest(
            "성공Test : number - max 옵션 동작확인",
            function (unit, title) {
                var pass = false
                RedDefinePropertyInfo.definePrototype('testObject', 'numberMaxTest', 'number', {
                    max: 10
                });
                var testInstance = new window['testObject']();
                testInstance.numberMaxTest = 20;
                unit.run(testInstance.numberMaxTest);
            },
            10
        )
    ),
    redGroup(
        "uint 정의확인",
        redTest(
            "성공Test : uint - 기본생성",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'uintTest', 'uint')
                var testInstance = new window['testObject']();
                testInstance['uintTest'] = 11;
                unit.run(testInstance.uintTest);
            },
            11
        ),
        redTest(
            "성공Test : uint - 프로토타입에 해당 키가 잘 생성되었는지 확인",
            function (unit, title) {
                unit.run(window['testObject'].prototype.hasOwnProperty('uintTest'))
            },
            true
        ),
        redTest(
            "실패Test : uint - 허용 되지않는 값 방어되는지확인 : 문자입력",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'uintTest2', 'uint')
                var testInstance = new window['testObject']();
                try {
                    testInstance['uintTest2'] = '#e1ee'
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            false
        ),
        redTest(
            "실패Test : uint - 허용 되지않는 값 방어되는지확인 : 소수점입력",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'uintTest3', 'uint')
                var testInstance = new window['testObject']();
                try {
                    testInstance['uintTest3'] = 1.1
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            false
        ),
        redTest(
            "실패Test : uint - 허용 되지않는 값 방어되는지확인 : 소수점입력",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'uintTest4', 'uint')
                var testInstance = new window['testObject']();
                try {
                    testInstance['uintTest4'] = -1.1
                    console.log(testInstance['uintTest4'])
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            false
        ),
        redTest(
            "실패Test : uint - 허용 되지않는 값 방어되는지 : 문자 숫자 입력",
            function (unit, title) {
                var testInstance = new window['testObject']();
                try {
                    testInstance['uintTest2'] = '1'
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            false
        ),
        redTest(
            "성공Test : uint - 생성옵션에 callback 존재시 잘 잘동하는지",
            function (unit, title) {
                var pass = false
                RedDefinePropertyInfo.definePrototype('testObject', 'uintCallbackTest', 'uint', {
                    callback: function () {
                        pass = true
                    }
                });
                var testInstance = new window['testObject']();
                testInstance.uintCallbackTest = 2;
                unit.run(pass);
            },
            true
        ),
        redTest(
            "성공Test : uint - min 옵션 동작확인",
            function (unit, title) {
                var pass = false
                RedDefinePropertyInfo.definePrototype('testObject', 'uintMinTest', 'uint', {
                    min: 0
                });
                var testInstance = new window['testObject']();
                testInstance.uintMinTest = -1;
                unit.run(testInstance.uintMinTest);
            },
            0
        ),
        redTest(
            "성공Test : uint - min 옵션 동작확인2",
            function (unit, title) {
                var pass = false

                try {
                    RedDefinePropertyInfo.definePrototype('testObject', 'uintMinTest2', 'uint', {
                        min: -1
                    });
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            0
        ),
        redTest(
            "성공Test : uint - max 옵션 동작확인",
            function (unit, title) {
                var pass = false
                RedDefinePropertyInfo.definePrototype('testObject', 'uintMaxTest', 'uint', {
                    max: 10
                });
                var testInstance = new window['testObject']();
                testInstance.uintMaxTest = 20;
                unit.run(testInstance.uintMaxTest);
            },
            10
        ),
        redTest(
            "성공Test : uint - max 옵션 동작확인2",
            function (unit, title) {
                var pass = false

                try {
                    RedDefinePropertyInfo.definePrototype('testObject', 'uintMinTest2', 'uint', {
                        max: -1
                    });
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            0
        ),
        redTest(
            "성공Test : uint - min, max 옵션 동작확인",
            function (unit, title) {
                var pass = false

                try {
                    RedDefinePropertyInfo.definePrototype('testObject', 'uintMinMaxTest', 'uint', {
                        min: 3,
                        max: 3
                    });
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            0
        )
    ),
    redGroup(
        "int 정의확인",
        redTest(
            "성공Test : int - 기본생성 11입력",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'intTest', 'int')
                var testInstance = new window['testObject']();
                testInstance['intTest'] = 11;
                unit.run(testInstance.intTest);
            },
            11
        ),
        redTest(
            "성공Test : int - 기본생성 -11입력",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'intTest_2', 'int')
                var testInstance = new window['testObject']();
                testInstance['intTest'] = -11;
                unit.run(testInstance.intTest);
            },
            -11
        ),
        redTest(
            "성공Test : int - 프로토타입에 해당 키가 잘 생성되었는지 확인",
            function (unit, title) {
                unit.run(window['testObject'].prototype.hasOwnProperty('intTest'))
            },
            true
        ),
        redTest(
            "실패Test : int - 허용 되지않는 값 방어되는지확인 : 문자입력",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'intTest2', 'int')
                var testInstance = new window['testObject']();
                try {
                    testInstance['intTest2'] = '#e1ee'
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            false
        ),
        redTest(
            "실패Test : int - 허용 되지않는 값 방어되는지확인 : 소수점입력",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'intTest3', 'int')
                var testInstance = new window['testObject']();
                try {
                    testInstance['intTest3'] = 1.1
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            false
        ),
        redTest(
            "실패Test : int - 허용 되지않는 값 방어되는지확인 : 소수점입력",
            function (unit, title) {
                RedDefinePropertyInfo.definePrototype('testObject', 'intTest4', 'int')
                var testInstance = new window['testObject']();
                try {
                    testInstance['intTest4'] = -1.1
                    console.log(testInstance['intTest4'])
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            false
        ),
        redTest(
            "실패Test : int - 허용 되지않는 값 방어되는지 : 문자 숫자 입력",
            function (unit, title) {
                var testInstance = new window['testObject']();
                try {
                    testInstance['intTest2'] = '1'
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            false
        ),
        redTest(
            "성공Test : int - 생성옵션에 callback 존재시 잘 잘동하는지",
            function (unit, title) {
                var pass = false
                RedDefinePropertyInfo.definePrototype('testObject', 'intCallbackTest', 'int', {
                    callback: function () {
                        pass = true
                    }
                });
                var testInstance = new window['testObject']();
                testInstance.intCallbackTest = 2;
                unit.run(pass);
            },
            true
        ),
        redTest(
            "성공Test : int - min 옵션 동작확인",
            function (unit, title) {
                var pass = false
                RedDefinePropertyInfo.definePrototype('testObject', 'intMinTest', 'int', {
                    min: 0
                });
                var testInstance = new window['testObject']();
                testInstance.intMinTest = -1;
                unit.run(testInstance.intMinTest);
            },
            0
        ),

        redTest(
            "성공Test : int - max 옵션 동작확인",
            function (unit, title) {
                var pass = false
                RedDefinePropertyInfo.definePrototype('testObject', 'intMaxTest', 'int', {
                    max: 10
                });
                var testInstance = new window['testObject']();
                testInstance.intMaxTest = 20;
                unit.run(testInstance.intMaxTest);
            },
            10
        ),

        redTest(
            "성공Test : int - min, max 옵션 동작확인",
            function (unit, title) {
                var pass = false

                try {
                    RedDefinePropertyInfo.definePrototype('testObject', 'intMinMaxTest', 'int', {
                        min: 3,
                        max: 3
                    });
                    unit.run(true)
                } catch (error) {
                    unit.run(false, error)
                }
            },
            0
        )
    )
);