/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.7.8 16:23
 */

"use strict";
RedTest.title = "RedWorld TEST";
RedGL.setDoNotPrepareProgram();
RedGL(document.createElement('canvas'), function () {
	var tRedGL = this;
	var tWorld, tScene, tCamera;
	var tView1, tView2, tView3;
	tWorld = new RedWorld();
	console.log(this);
	tScene = new RedScene(this);
	tCamera = new RedCamera();
	tView1 = new RedView(this, tScene, tCamera);
	tView2 = new RedView(this, tScene, tCamera);
	tView3 = new RedView(this, tScene, tCamera);
	console.log(tWorld)
	RedTest.testGroup(
		"생성 확인",
		function () {
			RedTest.test(
				"성공테스트 : new 생성",
				function () {
					RedTest.run(new RedWorld() instanceof RedWorld)
				},
				true
			);
			RedTest.test(
				"성공테스트  : 함수실행 생성확인",
				function () {
					RedTest.run(RedWorld() instanceof RedWorld)
				},
				true
			)
		}
	);
	RedTest.testGroup(
		"(RedWorld Instance).addView( <b>redView</b>, key - optional )",
		function () {
			RedTest.test(
				"성공테스트 - RedView Instance 만 허용하는지 체크",
				function () {
					try {
						tWorld.addView(tView1, 'test_1');
						tWorld.addView(tView2, 'test_2');
						RedTest.run(true)
					} catch (error) {
						RedTest.run(false)
					}
				},
				true
			);
			RedTest.test(
				"실패테스트 : 숫자입력시 에러확인",
				function () {
					try {
						tWorld.addView(1);
						RedTest.run(true)
					} catch (error) {
						RedTest.run(false)
					}
				},
				false
			);
			RedTest.test(
				"실패테스트 : 문자입력시 에러확인",
				function () {
					try {
						tWorld.addView('문자');
						RedTest.run(true)
					} catch (error) {
						RedTest.run(false)
					}
				},
				false
			);
			RedTest.test(
				"성공테스트 - 고유키 등록확인",
				function () {
					try {
						tWorld.addView(tView2, 'test_3');
						RedTest.run(true)
					} catch (error) {
						RedTest.run(false)
					}
				},
				true
			);
			RedTest.test(
				"실패테스트 - 고유키 중복 방지 확인",
				function () {
					try {
						tWorld.addView(tView2, 'test_3');
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
		"(RedWorld Instance).getView( <b>key</b> )",
		function () {
			RedTest.testListRun(
				"문자열만 허용",
				RedTest.ONLY_STRING,
				function (v) {
					try {
						tWorld.getView(v[0]);
						RedTest.run(true)
					} catch (error) {
						RedTest.run(false, error)
					}
				}
			);
			RedTest.test(
				"성공테스트 : 존재하는 키로 검색할경우",
				function () {
					RedTest.run(tWorld.getView("test_1") == tView1)
				},
				true
			);
			RedTest.test(
				"성공테스트 : 존재하는 키로 검색할경우2",
				function () {
					RedTest.run(tWorld.getView("test_2") == tView2)
				},
				true
			);
			RedTest.test(
				"실패테스트 : 존재하지 않는 키로 검색할경우",
				function () {
					RedTest.run(tWorld.getView("없는키"))
				},
				undefined
			);
			RedTest.test(
				"실패테스트 : 존재하지 않는 키로 검색할경우",
				function () {
					RedTest.run(tWorld.getView("없는키"))
				},
				undefined
			);
		}
	);
	RedTest.testGroup(
		"(RedWorld Instance).hasView( <b>value</b> )",
		function () {
			RedTest.testListRun(
				"문자열만 허용",
				RedTest.ONLY_STRING,
				function (v) {
					try {
						tWorld.hasView(v[0]);
						RedTest.run(true);
					} catch (error) {
						RedTest.run(false, error);
					}
				}
			);
			RedTest.test(
				"성공테스트 : 존재하는 키로 검색할경우",
				function () {
					RedTest.run(tWorld.hasView("test_2"));
				},
				true
			);
			RedTest.test(
				"실패테스트 : 존재하지 않는  키로 검색할경우",
				function () {
					RedTest.run(tWorld.hasView("없는키"));
				},
				false
			);
			RedTest.test(
				"성공테스트 : 등록했던 뷰로 검색할경우",
				function () {
					RedTest.run(tWorld.hasView(tView2));
				},
				true
			);
			RedTest.test(
				"실패테스트 : 등록하지 않은 뷰로 검색할경우",
				function () {
					RedTest.run(tWorld.hasView(tView3));
				},
				false
			);
		}
	);
	RedTest.testGroup(
		"(RedWorld Instance).delView( <b>value</b> )",
		function () {
			RedTest.testListRun(
				"문자열만 허용",
				RedTest.ONLY_STRING,
				function (v) {
					try {

						tWorld.delView(v[0]);
						RedTest.run(true);
					} catch (error) {
						console.log(error)
						RedTest.run(false, error);
					}
				}
			);

			RedTest.test(
				"성공테스트 : 존재하는 키로 삭제시도",
				function () {
					tWorld.delView("test_1");
					RedTest.run(tWorld.getView("test_1"))
				},
				undefined
			);
			RedTest.test(
				"hasView : 잘 삭제되었는지 확인",
				function () {
					RedTest.run(tWorld.hasView("test_1"))
				},
				false
			);
			RedTest.test(
				"hasView : 키로 삭제시 잘 삭제되었는지 확인",
				function () {
					tWorld.addView(tView1,"test_11")
					tWorld.delView('test_11')
					RedTest.run(tWorld.hasView("test_11"))
				},
				false
			);
			RedTest.test(
				"getView : 뷰로 삭제시 잘 삭제되었는지 확인",
				function () {
					tWorld.addView(tView1,"test_1")
					tWorld.delView(tView1)
					RedTest.run(tWorld.getView("test_1"))
				},
				undefined
			);
			RedTest.test(
				"getView : 뷰로 삭제시 잘 삭제되었는지 확인",
				function () {
					tWorld.addView(tView1,"test_1")
					tWorld.delView(tView1)
					RedTest.run(tWorld.getView("test_1"))
				},
				undefined
			);
			RedTest.test(
				"getViewList : 리스트가 잘관리 되는지 확인",
				function () {
					RedTest.run(tWorld.getViewList()[0] === tView2);
					tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
				},
				true
			);
		}
	);
});