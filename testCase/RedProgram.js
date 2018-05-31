"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	var vSource1, fSource1;
	vSource1 = function () {
		/* @preserve
		 void main(void) {
		 gl_Position = vec4(1.0);
		 }
		 */
	}
	fSource1 = function () {
		/* @preserve
		 precision mediump float;
		 void main(void) {
		 gl_FragColor = vec4(1.0);
		 }
		 */
	};
	vSource1 = RedGLUtil.getStrFromComment(vSource1.toString());
	fSource1 = RedGLUtil.getStrFromComment(fSource1.toString());
	console.log(RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource1, fSource1));
	redSuite(
		"RedProgram Test",
		redGroup(
			"생성 확인",
			redTest("기본 파싱 테스트", function (unit) {
				try {
					RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource1, fSource1);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, true),
			redTest("인자확인(redGL, key, vertexShaderSource, fragmentShaderSource) : 실패테스트 - RedGL Instance만 허용", function (unit) {
				try {
					RedProgram(null, 'testShaderProgram' + RedGL.makeUUID(), vSource1, fSource1);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"키관련 확인",
			redTest("인자확인(redGL, key, vertexShaderSource, fragmentShaderSource) : 실패테스트 key는 문자열만 허용", function (unit) {
				try {
					RedProgram(tRedGL, 1, vSource1, fSource1);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("키가 같을 경우 기존것을 리턴하는지 체크 : 키로 찾기", function (unit) {
				var t0 = RedProgram(tRedGL, 'testShaderProgram', vSource1, fSource1);
				var t1 = RedProgram(tRedGL, 'testShaderProgram');
				unit.run(t0 == t1)
			}, true),
			redTest("키가 같을 경우 기존것을 리턴하는지 체크 :  기존키가 있으면 입력된 소스를 무시한다.", function (unit) {
				var t0 = RedProgram(tRedGL, 'testShaderProgram', vSource1, fSource1);
				var t1 = RedProgram(tRedGL, 'testShaderProgram', vSource1, fSource1);
				unit.run(t0 == t1)
			}, true),
			redTest("존재하지 않는키를 찾으려할때 테스트", function (unit) {
				try {
					RedProgram(tRedGL, 'xxxxxxxx');
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"쉐이더 소스 확인",
			redTest("쉐이더 소스를 둘다 입력하지 않을경우 + 기존에 키가 존재하지않을떄 : 실패테스트 vertexShaderSource, fragmentShaderSource 문자열이나 falsy만 허용", function (unit) {
				try {
					RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID());
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("fragmentShader Source 입력안한경우 + 기존에 키가 존재하지않을떄 : 실패테스트 ", function (unit) {
				try {
					RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource1);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("vertexShaderSource 입력안한경우 + 기존에 키가 존재하지않을떄 : 실패테스트 ", function (unit) {
				try {
					RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), false, fSource1);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("쉐이더 소스를 둘다 입력하지 않을경우 + 기존에 키가 존재할경우 :  기존 캐시된값이 돌아오는지 ", function (unit) {
				var t0 = RedProgram(tRedGL, 'testShaderProgram_checkSource', vSource1, fSource1);
				var t1 = RedProgram(tRedGL, 'testShaderProgram_checkSource');
				unit.run(t0 == t1)
			}, true),
			redTest("vertexShader 소스에 fragmentShader 소스를 입력할경우 : 실패테스트 ", function (unit) {
				try {
					RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), fSource1, fSource1);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("fragmentShader 소스에 vertexShader 소스를 입력할경우 : 실패테스트 ", function (unit) {
				try {
					RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource1, vSource1);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
		),
		redGroup(
			"uniform 정보 파싱 확인 : uniformLocation",
			redTest("uniformLocation에 uniform 이름정보가 잘들어가나 확인 : uUniformParsingTest", function (unit) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform float uUniformParsingTest;
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
				};
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				var t0 = RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource, fSource);
				unit.run(t0['uniformLocation']['uUniformParsingTest']['name'])
				console.log(t0)
			}, 'uUniformParsingTest'),
			redTest("uniform이 선언은 되었지만 main함수에서 사용되지않을경우 로케이션이 없어야함", function (unit) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform float uUniformParsingTest;
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
				};
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				var t0 = RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource, fSource);
				unit.run(t0['uniformLocation']['uUniformParsingTest']['location'] == null)
				console.log(t0)
			}, true),
			redTest("uniform이 선언되고 main함수에서 사용될경우 WebGLUniformLocation Instance 를 할당받아야함", function (unit) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform float uUniformParsingTest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 uUniformParsingTest;					 }
					 */
				}
				fSource = function () {
					/* @preserve
					 precision mediump float;
					 void main(void) {
					 gl_FragColor = vec4(1.0);
					 }
					 */
				};
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				var t0 = RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource, fSource);
				unit.run(t0['uniformLocation']['uUniformParsingTest']['location'] instanceof WebGLUniformLocation)
				console.log(t0)
			}, true),
			redTest("uniformLocation에 uniform 이름에 매칭되는 재질 프로퍼티 이름 정보가 잘들어가나 확인 : uUniformParsingTest / uniformParsingTest", function (unit) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform float uUniformParsingTest;
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
				};
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				var t0 = RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource, fSource);
				unit.run(t0['uniformLocation']['uUniformParsingTest']['materialPropertyName'])
				console.log(t0)
			}, 'uniformParsingTest')
		),
		redGroup(
			"uniform 배열 정보 파싱 확인 : uniformLocation",
			redTest("uniformLocation에 uniform 이름정보가 잘들어가나 확인 : uUniformParsingTest[3]", function (unit) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform float uUniformParsingTest[3];
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
				};
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				var t0 = RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource, fSource);
				unit.run(t0['uniformLocation']['uUniformParsingTest']['name'])
				console.log(t0)
			}, 'uUniformParsingTest'),
			redTest("uniformLocation에 uniform 배열 length가  잘들어가나 확인 : uUniformParsingTest[3]", function (unit) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform float uUniformParsingTest[3];
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
				};
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				var t0 = RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource, fSource);
				unit.run(t0['uniformLocation']['uUniformParsingTest']['arrayNum'])
				console.log(t0)
			}, 3),
			redTest("uniform이 배열이 선언은 되었지만 main함수에서 사용되지않을경우 로케이션이 없어야함", function (unit) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform float uUniformParsingTest[3];
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
				};
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				var t0 = RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource, fSource);
				unit.run(t0['uniformLocation']['uUniformParsingTest']['location'] == null)
				console.log(t0)
			}, true),
			redTest("uniform이 배열이 선언되고 main함수에서 사용될경우 WebGLUniformLocation Instance 를 할당받아야함", function (unit) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform float uUniformParsingTest[3];
					 void main(void) {
					 gl_Position = vec4(1.0);
					 uUniformParsingTest[2];
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
				};
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				var t0 = RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource, fSource);
				console.log(t0)
				unit.run(t0['uniformLocation']['uUniformParsingTest']['location'] instanceof WebGLUniformLocation)
				console.log(t0)
			}, true),

			redTest("uniformLocation에 uniform 이름에 매칭되는 재질 프로퍼티 이름 정보가 잘들어가나 확인 : uUniformParsingTest[3] / uniformParsingTest", function (unit) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform float uUniformParsingTest[3];
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
				};
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				var t0 = RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource, fSource);
				unit.run(t0['uniformLocation']['uUniformParsingTest']['materialPropertyName'])
				console.log(t0)
			}, 'uniformParsingTest')
		),
		redGroup(
			"attribute 정보 파싱 확인 : attributeLocation",
			redTest("attributeLocation에  attribute 이름정보가 잘들어가나 확인 : aAttributeTest", function (unit) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 attribute float aAttributeTest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 aAttributeTest;
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
				};
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				var t0 = RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource, fSource);
				console.log(t0)
				unit.run(t0['attributeLocation']['aAttributeTest']['name'])
			}, 'aAttributeTest'),
			redTest("attributeLocation에  attribute가 선언되었지만 main함수에서 사용되지않을경우 키자체가 없어야함", function (unit) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 attribute float aAttributeTest;
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
				};
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				var t0 = RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource, fSource);
				console.log(t0)
				unit.run(t0['attributeLocation']['aAttributeTest'] == null)
			}, true),
			redTest("attributeLocation에  attribute가 선언되고 main함수에서 사용될경우 location을 숫자형식으로 할당받아야함", function (unit) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 attribute float aAttributeTest;
					 void main(void) {
					 aAttributeTest;
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
				};
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				var t0 = RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource, fSource);
				console.log(t0)
				unit.run(typeof t0['attributeLocation']['aAttributeTest']['location'] == 'number')
			}, true)
		)
	)
})
