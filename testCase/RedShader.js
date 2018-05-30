"use strict";
"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	redSuite(
		"RedShader Test",
		redGroup(
			"생성 확인",
			redTest("기본 파싱 테스트 : vertex shader", function (unit) {
				var vSource;
				vSource = function () {
					/* @preserve
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				try {
					RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.VERTEX, vSource);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, true),
			redTest("기본 파싱 테스트 : fragment shader", function (unit) {
				var fSource;
				fSource = function () {
					/* @preserve
					 precision mediump float;
					 void main(void) {
					 gl_FragColor = vec4(1.0);
					 }
					 */
				}
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				try {
					RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.FRAGMENT, fSource);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, true)
		), redGroup(
			"쉐이더 타입 확인",
			redTest("쉐이더 타입 확인 : type과 다른 형식의 소스가 들어왔을때 vertexShaderType + fragmentSource", function (unit) {
				var fSource;
				fSource = function () {
					/* @preserve
					 void main(void) {
					 gl_FragColor = vec4(1.0);
					 }
					 */
				}
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				try {
					RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.VERTEX, fSource);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("쉐이더 타입 확인 : type과 다른 형식의 소스가 들어왔을때 fragmentShaderType + vertexSource", function (unit) {
				var vSource;
				vSource = function () {
					/* @preserve
					 precision mediump float;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				try {
					RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.FRAGMENT, vSource);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("쉐이더 타입 확인 : 존재하지 않는 type을 입력했을떄", function (unit) {
				var vSource;
				vSource = function () {
					/* @preserve
					 precision mediump float;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				try {
					RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.NO_TYPE_TEST, vSource);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("쉐이더 타입 확인 : fragmentShaderType인데 소스에 precision가 정의되어있지 않은경우", function (unit) {
				var fSource;
				fSource = function () {
					/* @preserve
					 void main(void) {
					 gl_FragColor = vec4(1.0);
					 }
					 */
				}
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				try {
					RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.FRAGMENT, fSource);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false)
		)
	)
})
