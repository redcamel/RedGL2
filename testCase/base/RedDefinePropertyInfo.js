/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedDefinePropertyInfo TEST";
var UUID = 0;
window['testObject'] = function () {
};
RedTest.testGroup(
	"생성 확인",
	function () {
		RedTest.test(
			"성공Test : 기본정의 Test",
			function () {
				RedDefinePropertyInfo.definePrototype('testObject', 'checkKey', 'number');
				var testInstance = new window['testObject']();
				testInstance.checkKey = 1;
				RedTest.run(testInstance.checkKey)
			},
			1
		);
		RedTest.test(
			"성공Test : 프로토타입에 해당 키가 잘 생성되었는지 확인",
			function () {
				RedTest.run(window['testObject'].prototype.hasOwnProperty('checkKey'))
			},
			true
		);
		RedTest.test(
			"실패Test : 중복정의 불가 확인",
			function () {
				try {
					RedDefinePropertyInfo.definePrototype('testObject', 'checkKey', 'number');
					RedTest.run(true)
				} catch (error) {
					RedTest.run(false, error)
				}
			},
			false
		)
	}
);
RedTest.testGroup(
	"boolean 정의확인",
	function () {
		RedTest.test(
			"성공Test : boolean - 기본생성",
			function () {
				RedDefinePropertyInfo.definePrototype('testObject', 'booleanTest', 'boolean');
				var testInstance = new window['testObject']();
				testInstance['booleanTest'] = true;
				RedTest.run(testInstance.booleanTest)
			},
			true
		);
		RedTest.test(
			"성공Test : boolean - 프로토타입에 해당 키가 잘 생성되었는지 확인",
			function () {
				RedTest.run(window['testObject'].prototype.hasOwnProperty('booleanTest'))
			},
			true
		);
		RedTest.testListRun(
			"Boolean만 허용",
			RedTest.ONLY_BOOLEAN,
			function (v) {
				var tKey = 'booleanTest_' + UUID++;
				RedDefinePropertyInfo.definePrototype('testObject', tKey, 'boolean');
				var testInstance = new window['testObject']();
				try {
					testInstance[tKey] = v[0];
					RedTest.run(true)
				} catch (error) {
					RedTest.run(false, error)
				}
			}
		);
		RedTest.test(
			"성공테스트 : boolean - 생성옵션에 callback 존재시 잘 잘동하는지",
			function () {
				var pass = false;
				RedDefinePropertyInfo.definePrototype('testObject', 'booleanCallbackTest', 'boolean', {
					callback: function () {
						pass = true
					}
				});
				var testInstance = new window['testObject']();
				testInstance.booleanCallbackTest = false;
				RedTest.run(pass);
			},
			true
		)
	}
);
RedTest.testGroup(
	"hex 정의확인",
	function () {
		RedTest.test(
			"성공Test : hex - 기본생성",
			function () {
				RedDefinePropertyInfo.definePrototype('testObject', 'hexTest', 'hex');
				var testInstance = new window['testObject']();
				testInstance['hexTest'] = '#eee';
				RedTest.run(testInstance.hexTest)
			},
			'#eee'
		);
		RedTest.test(
			"성공Test : hex - 프로토타입에 해당 키가 잘 생성되었는지 확인",
			function () {
				RedTest.run(window['testObject'].prototype.hasOwnProperty('hexTest'))
			},
			true
		);
		RedTest.testListRun(
			"hex만 허용",
			RedTest.ONLY_HEX,
			function (v) {
				var tKey = 'hexTest_' + UUID++;
				RedDefinePropertyInfo.definePrototype('testObject', tKey, 'hex');
				var testInstance = new window['testObject']();
				try {
					testInstance[tKey] = v[0];
					RedTest.run(true)
				} catch (error) {
					RedTest.run(false, error)
				}
			}
		);
		RedTest.test(
			"성공Test : hex - 생성옵션에 callback 존재시 잘 잘동하는지",
			function () {
				var pass = false;
				RedDefinePropertyInfo.definePrototype('testObject', 'hexCallbackTest', 'hex', {
					callback: function () {
						pass = true
					}
				});
				var testInstance = new window['testObject']();
				testInstance.hexCallbackTest = '#eeffee';
				RedTest.run(pass);
			},
			true
		)
	}
);
RedTest.testGroup(
	"number 정의확인",
	function () {
		RedTest.test(
			"성공Test : number - 기본생성",
			function () {
				RedDefinePropertyInfo.definePrototype('testObject', 'numberTest', 'number');
				var testInstance = new window['testObject']();
				testInstance['numberTest'] = 11;
				RedTest.run(testInstance.numberTest);
			},
			11
		);
		RedTest.test(
			"성공Test : number - 프로토타입에 해당 키가 잘 생성되었는지 확인",
			function () {
				RedTest.run(window['testObject'].prototype.hasOwnProperty('numberTest'))
			},
			true
		);
		RedTest.testListRun(
			"Number만 허용",
			RedTest.ONLY_NUMBER,
			function (v) {
				var tKey = 'numberTest_' + UUID++;
				RedDefinePropertyInfo.definePrototype('testObject', tKey, 'number');
				var testInstance = new window['testObject']();
				try {
					testInstance[tKey] = v[0];
					RedTest.run(true)
				} catch (error) {
					RedTest.run(false, error)
				}
			}
		);
		RedTest.test(
			"성공Test : number - 생성옵션에 callback 존재시 잘 잘동하는지",
			function () {
				var pass = false;
				RedDefinePropertyInfo.definePrototype('testObject', 'numberCallbackTest', 'number', {
					callback: function () {
						pass = true
					}
				});
				var testInstance = new window['testObject']();
				testInstance.numberCallbackTest = 2;
				RedTest.run(pass);
			},
			true
		);
		RedTest.test(
			"성공Test : number - min 옵션 동작확인",
			function () {

				RedDefinePropertyInfo.definePrototype('testObject', 'numberMinTest', 'number', {
					min: 0
				});
				var testInstance = new window['testObject']();
				testInstance.numberMinTest = -1;
				RedTest.run(testInstance.numberMinTest);
			},
			0
		);
		RedTest.test(
			"성공Test : number - max 옵션 동작확인",
			function () {

				RedDefinePropertyInfo.definePrototype('testObject', 'numberMaxTest', 'number', {
					max: 10
				});
				var testInstance = new window['testObject']();
				testInstance.numberMaxTest = 20;
				RedTest.run(testInstance.numberMaxTest);
			},
			10
		)
	}
);
RedTest.testGroup(
	"uint 정의확인",
	function () {
		RedTest.test(
			"성공Test : uint - 기본생성",
			function () {
				RedDefinePropertyInfo.definePrototype('testObject', 'uintTest', 'uint');
				var testInstance = new window['testObject']();
				testInstance['uintTest'] = 11;
				RedTest.run(testInstance.uintTest);
			},
			11
		);
		RedTest.test(
			"성공Test : uint - 프로토타입에 해당 키가 잘 생성되었는지 확인",
			function () {
				RedTest.run(window['testObject'].prototype.hasOwnProperty('uintTest'))
			},
			true
		);
		RedTest.testListRun(
			"uint만 허용",
			RedTest.ONLY_UINT,
			function (v) {
				var tKey = 'uintTest_' + UUID++;
				RedDefinePropertyInfo.definePrototype('testObject', tKey, 'uint');
				var testInstance = new window['testObject']();
				try {
					testInstance[tKey] = v[0];
					RedTest.run(true)
				} catch (error) {
					RedTest.run(false, error)
				}
			}
		);
		RedTest.test(
			"성공Test : uint - 생성옵션에 callback 존재시 잘 잘동하는지",
			function () {
				var pass = false;
				RedDefinePropertyInfo.definePrototype('testObject', 'uintCallbackTest', 'uint', {
					callback: function () {
						pass = true
					}
				});
				var testInstance = new window['testObject']();
				testInstance.uintCallbackTest = 2;
				RedTest.run(pass);
			},
			true
		);
		RedTest.test(
			"성공Test : uint - min 옵션 동작확인",
			function () {

				RedDefinePropertyInfo.definePrototype('testObject', 'uintMinTest', 'uint', {
					min: 0
				});
				var testInstance = new window['testObject']();
				testInstance.uintMinTest = -1;
				RedTest.run(testInstance.uintMinTest);
			},
			0
		);
		RedTest.test(
			"성공Test : uint - min 옵션 동작확인2",
			function () {


				try {
					RedDefinePropertyInfo.definePrototype('testObject', 'uintMinTest2', 'uint', {
						min: -1
					});
					RedTest.run(true)
				} catch (error) {
					RedTest.run(false, error)
				}
			},
			0
		);
		RedTest.test(
			"성공Test : uint - max 옵션 동작확인",
			function () {

				RedDefinePropertyInfo.definePrototype('testObject', 'uintMaxTest', 'uint', {
					max: 10
				});
				var testInstance = new window['testObject']();
				testInstance.uintMaxTest = 20;
				RedTest.run(testInstance.uintMaxTest);
			},
			10
		);
		RedTest.test(
			"성공Test : uint - max 옵션 동작확인2",
			function () {


				try {
					RedDefinePropertyInfo.definePrototype('testObject', 'uintMinTest2', 'uint', {
						max: -1
					});
					RedTest.run(true)
				} catch (error) {
					RedTest.run(false, error)
				}
			},
			0
		);
		RedTest.test(
			"성공Test : uint - min, max 옵션 동작확인",
			function () {


				try {
					RedDefinePropertyInfo.definePrototype('testObject', 'uintMinMaxTest', 'uint', {
						min: 3,
						max: 3
					});
					RedTest.run(true)
				} catch (error) {
					RedTest.run(false, error)
				}
			},
			0
		)
	}
);
RedTest.testGroup(
	"int 정의확인",
	function () {
		RedTest.test(
			"성공Test : int - 기본생성 11입력",
			function () {
				RedDefinePropertyInfo.definePrototype('testObject', 'intTest', 'int');
				var testInstance = new window['testObject']();
				testInstance['intTest'] = 11;
				RedTest.run(testInstance.intTest);
			},
			11
		);
		RedTest.test(
			"성공Test : int - 기본생성 -11입력",
			function () {
				RedDefinePropertyInfo.definePrototype('testObject', 'intTest_2', 'int');
				var testInstance = new window['testObject']();
				testInstance['intTest'] = -11;
				RedTest.run(testInstance.intTest);
			},
			-11
		);
		RedTest.test(
			"성공Test : int - 프로토타입에 해당 키가 잘 생성되었는지 확인",
			function () {
				RedTest.run(window['testObject'].prototype.hasOwnProperty('intTest'))
			},
			true
		);
		RedTest.testListRun(
			"int만 허용",
			RedTest.ONLY_INT,
			function (v) {
				var tKey = 'intTest_' + UUID++;
				RedDefinePropertyInfo.definePrototype('testObject', tKey, 'int');
				var testInstance = new window['testObject']();
				try {
					testInstance[tKey] = v[0];
					RedTest.run(true)
				} catch (error) {
					RedTest.run(false, error)
				}
			}
		);
		RedTest.test(
			"성공Test : int - 생성옵션에 callback 존재시 잘 잘동하는지",
			function () {
				var pass = false;
				RedDefinePropertyInfo.definePrototype('testObject', 'intCallbackTest', 'int', {
					callback: function () {
						pass = true
					}
				});
				var testInstance = new window['testObject']();
				testInstance.intCallbackTest = 2;
				RedTest.run(pass);
			},
			true
		);
		RedTest.test(
			"성공Test : int - min 옵션 동작확인",
			function () {

				RedDefinePropertyInfo.definePrototype('testObject', 'intMinTest', 'int', {
					min: 0
				});
				var testInstance = new window['testObject']();
				testInstance.intMinTest = -1;
				RedTest.run(testInstance.intMinTest);
			},
			0
		);
		RedTest.test(
			"성공Test : int - max 옵션 동작확인",
			function () {

				RedDefinePropertyInfo.definePrototype('testObject', 'intMaxTest', 'int', {
					max: 10
				});
				var testInstance = new window['testObject']();
				testInstance.intMaxTest = 20;
				RedTest.run(testInstance.intMaxTest);
			},
			10
		);
		RedTest.test(
			"성공Test : int - min, max 옵션 동작확인",
			function () {


				try {
					RedDefinePropertyInfo.definePrototype('testObject', 'intMinMaxTest', 'int', {
						min: 3,
						max: 3
					});
					RedTest.run(true)
				} catch (error) {
					RedTest.run(false, error)
				}
			},
			0
		)
	}
);
