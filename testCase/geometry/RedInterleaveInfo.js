/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedInterleaveInfo TEST";

RedTest.testGroup(
	"RedInterleaveInfo( attributeKey, size, normalize )",
	function () {
		RedTest.test(
			"성공테스트 : 기본 생성 테스트",
			function () {
				try {
					var t0 = RedInterleaveInfo('aTest', 3);
					console.log(t0);
					RedTest.run(true);
				} catch (error) {
					RedTest.run(false);
				}
			},
			true
		);
	}
);
RedTest.testGroup(
	"RedInterleaveInfo( <b>attributeKey</b>, size, normalize )",
	function () {
		RedTest.test(
			"성공테스트  : 설정 확인",
			function () {
				var t0 = RedInterleaveInfo('aTest', 3);
				console.log(t0);
				RedTest.run(t0['attributeKey']);
			},
			'aTest'
		);
		RedTest.test(
			"실패테스트 : 문자만허용",
			function () {
				try {
					var t0 = RedInterleaveInfo(1, 3);
					console.log(t0);
					RedTest.run(true);
				} catch (error) {
					RedTest.run(false);
				}
			},
			false
		);
		RedTest.test(
			"실패테스트 : 첫 글자는 소문자 a만 허용",
			function () {
				try {
					var t0 = RedInterleaveInfo('ATest', 3);
					console.log(t0);
					RedTest.run(true);
				} catch (error) {

					RedTest.run(false);
				}
			},
			false
		);
		RedTest.test(
			"실패테스트 : 두번째 글자는 대문자만 허용",
			function () {
				try {
					var t0 = RedInterleaveInfo('Atest', 3);
					console.log(t0);
					RedTest.run(true);
				} catch (error) {
					RedTest.run(false);
				}
			},
			false
		);
	}
);
RedTest.testGroup(
	"RedInterleaveInfo( attributeKey, <b>size</b>, normalize )",
	function () {
		RedTest.test(
			"size 설정 확인",
			function () {
				var t0 = RedInterleaveInfo('aTest', 3);
				console.log(t0);
				RedTest.run(t0['size'])
			},
			3
		);
		RedTest.test(
			"성공테스트 : 숫자만허용",
			function () {
				try {
					var t0 = RedInterleaveInfo('aTest', 3);
					console.log(t0);
					RedTest.run(true)
				} catch (error) {

					RedTest.run(false)
				}
			},
			true
		);
		RedTest.test(
			"실패테스트 : 숫자만허용",
			function () {
				try {
					var t0 = RedInterleaveInfo('aTest', 'aaa');
					console.log(t0);
					RedTest.run(true)
				} catch (error) {

					RedTest.run(false)
				}
			},
			false
		);
	}
);
RedTest.testGroup(
	"RedInterleaveInfo( attributeKey, size, <b>normalize</b> )",
	function () {
		RedTest.test(
			"성공테스트 : 기본값 확인",
			function () {
				var t0 = RedInterleaveInfo('aTest', 3);
				console.log(t0);
				RedTest.run(t0['normalize'])
			},
			false
		);
		RedTest.test(
			"성공테스트 : 설정 확인",
			function () {
				var t0 = RedInterleaveInfo('aTest', 3, true);
				console.log(t0);
				RedTest.run(t0['normalize'])
			},
			true
		);
	}
);

