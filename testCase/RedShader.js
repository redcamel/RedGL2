"use strict";
"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	var vSource, fSource;
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
	var checkhaderVertex = RedShader(tRedGL, 'vertexTestShader', RedShader.VERTEX, RedGLUtil.getStrFromComment(vSource.toString()));
	var checkShaderFragment = RedShader(tRedGL, 'fragmentTestShader', RedShader.FRAGMENT, RedGLUtil.getStrFromComment(fSource.toString()));
	redSuite(
		"RedShader Test",
		redGroup(
			"생성 확인",
			redTest("기본 파싱 테스트 : vertex shader", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, true),
			redTest("기본 파싱 테스트 : fragment shader", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 precision mediump float;
					 void main(void) {
					 gl_FragColor = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.FRAGMENT, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, true),
			redTest("쉐이더 타입 확인 : vertex shader", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				unit.run(t0['type'])
			}, RedShader.VERTEX),
			redTest("쉐이더 타입 확인 : fragment shader", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 precision mediump float;
					 void main(void) {
					 gl_FragColor = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.FRAGMENT, source);
				unit.run(t0['type'])
			}, RedShader.FRAGMENT),
			redTest("key는 문자열만 허용함 : 숫자 테스트 ", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 precision mediump float;
					 void main(void) {
					 gl_FragColor = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, 1, RedShader.FRAGMENT, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("key는 문자열만 허용함 : Boolean 테스트 ", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 precision mediump float;
					 void main(void) {
					 gl_FragColor = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, true, RedShader.FRAGMENT, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("키와 타입으로 찾기 확인 : 키와 타입만  입력시 해당키로 등록된 녀석을 가지고오는지 - 올바른검샘", function (unit) {
				var t0 = RedShader(tRedGL, 'fragmentTestShader', RedShader.FRAGMENT);
				console.log(t0)
				unit.run(t0)
			}, checkShaderFragment),
			redTest("키와 타입으로 찾기 확인 : 키와 타입만  입력시 해당키로 등록된 녀석을 가지고오는지 - 다른 타입형식키로 검색", function (unit) {
				try {
					var t0 = RedShader(tRedGL, 'fragmentTestShader', RedShader.VERTEX);
					console.log(t0)
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("키 중복 방지확인 : 키, 타입, 소스 모두 입력시 생성으로 판단함. 이때 키 타입별로 키중복을 확인함", function (unit) {
				try {
					var source;
					source = function () {
						/* @preserve
						 precision mediump float;
						 void main(void) {
						 gl_FragColor = vec4(1.0);
						 }
						 */
					}
					source = RedGLUtil.getStrFromComment(source.toString());
					var t0 = RedShader(tRedGL, 'fragmentTestShader', RedShader.FRAGMENT, source);
					console.log(t0)
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"쉐이더 타입 확인",
			redTest("쉐이더 타입 확인 : type과 다른 형식의 소스가 들어왔을때 vertexShaderType + fragmentSource", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 void main(void) {
					 gl_FragColor = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("쉐이더 타입 확인 : type과 다른 형식의 소스가 들어왔을때 fragmentShaderType + vertexSource", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 precision mediump float;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.FRAGMENT, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("쉐이더 타입 확인 : 존재하지 않는 type을 입력했을떄", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 precision mediump float;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.NO_TYPE_TEST, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("쉐이더 타입 확인 : fragmentShaderType인데 소스에 precision가 정의되어있지 않은경우", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 void main(void) {
					 gl_FragColor = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.FRAGMENT, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"유니폼 체크 확인",
			redTest("유니폼 이름 형식 확인 : 유니폼은 uXxxxx형태로 선언되어야함. - 실패테스트( uniform vec3 test; )", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform vec3 test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("유니폼 이름 형식 확인 : 유니폼은 uXxxxx형태로 선언되어야함. - 실패테스트( uniform vec3 Utest; ) / 대문자로 시작해도 안됨", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform vec3 Utest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("유니폼 이름 형식 확인 : 유니폼은 uXxxxx형태로 선언되어야함. - 성공테스트( varying vec3 utest; )", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform vec3 utest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, true),
			redTest("유니폼 선언 형식 확인 : float", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform float uFloatTest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uFloatTest') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'float'),
			redTest("유니폼 선언 형식 확인 : int", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform int uIntTest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uIntTest') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'int'),
			redTest("유니폼 선언 형식 확인 : bool", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform bool uBoolTest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uBoolTest') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'bool'),
			redTest("유니폼 선언 형식 확인 : vec2", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform vec2 uVec2Test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uVec2Test') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'vec2'),
			redTest("유니폼 선언 형식 확인 : vec3", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform vec3 uVec3Test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uVec3Test') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'vec3'),
			redTest("유니폼 선언 형식 확인 : vec4", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform vec4 uVec4Test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uVec4Test') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'vec4'),
			redTest("유니폼 선언 형식 확인 : ivec2", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform ivec2 uIvec2Test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uIvec2Test') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'ivec2'),
			redTest("유니폼 선언 형식 확인 : ivec3", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform ivec3 uIvec3Test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uIvec3Test') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'ivec3'),
			redTest("유니폼 선언 형식 확인 : ivec4", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform ivec4 uIvec4Test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uIvec4Test') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'ivec4'),
			redTest("유니폼 선언 형식 확인 : bvec2", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform bvec2 uBvec2Test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uBvec2Test') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'bvec2'),
			redTest("유니폼 선언 형식 확인 : bvec3", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform bvec3 uBvec3Test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uBvec3Test') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'bvec3'),
			redTest("유니폼 선언 형식 확인 : bvec4", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform bvec4 uBvec4Test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uBvec4Test') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'bvec4'),
			redTest("유니폼 선언 형식 확인 : mat2", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform mat2 uMat2Test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uMat2Test') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'mat2'),
			redTest("유니폼 선언 형식 확인 : mat3", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform mat3 uMat3Test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uMat3Test') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'mat3'),
			redTest("유니폼 선언 형식 확인 : mat4", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform mat4 uMat4Test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uMat4Test') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'mat4'),
			redTest("유니폼 선언 형식 확인 : sampler2D", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform sampler2D uSampler2DTest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uSampler2DTest') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'sampler2D'),
			redTest("유니폼 선언 형식 확인 : samplerCube", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform samplerCube uSamplerCubeTest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uSamplerCubeTest') return true
				})[0];
				unit.run(t1['uniformType'])
				console.log(t0)
				console.log(t1)
			}, 'samplerCube')
		),
		redGroup(
			"베어링 체크 확인",
			redTest("베어링 이름 형식 확인 : 베어링은 vXxxxx형태로 선언되어야함. - 실패테스트( varying vec3 test; )", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 varying vec3 test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, 'varyingTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("베어링 이름 형식 확인 : 베어링은 vXxxxx형태로 선언되어야함. - 실패테스트( varying vec3 Vtest; ) / 대문자로 시작해도 안됨", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 varying vec3 Vtest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, 'varyingTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("베어링 이름 형식 확인 : 베어링은 vXxxxx형태로 선언되어야함. - 성공테스트( varying vec3 vtest; )", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 varying vec3 vtest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, 'varyingTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, true)
		),
		redGroup(
			"어트리뷰트 체크 확인",
			redTest("어트리뷰트 이름 형식 확인 : 어트리뷰트은 aXxxxx형태로 선언되어야함. - 실패테스트( attribute vec3 test; )", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 attribute vec3 test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					var t0 = RedShader(tRedGL, 'attributeTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("어트리뷰트 이름 형식 확인 : 어트리뷰트은 aXxxxx형태로 선언되어야함. - 실패테스트( attribute vec3 Vtest; ) / 대문자로 시작해도 안됨", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 attribute vec3 Atest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					var t0 = RedShader(tRedGL, 'attributeTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("어트리뷰트 이름 형식 확인 : 어트리뷰트은 aXxxxx형태로 선언되어야함. - 성공테스트( attribute vec3 vtest; )", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 attribute vec3 aTest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					var t0 = RedShader(tRedGL, 'attributeTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, true)
		),
		redGroup(
			"상수 체크 확인",
			redTest("상수 이름 형식 확인 : 상수는 cXxxxx형태로 선언되어야함. - 실패테스트( const vec3 test; )", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 const vec3 test;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, 'constTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("상수 이름 형식 확인 : 상수는 cXxxxx형태로 선언되어야함. - 실패테스트( const vec3 Vtest; ) / 대문자로 시작해도 안됨", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 const vec3 Ctest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, 'constTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("상수 이름 형식 확인 : 상수는 cXxxxx형태로 선언되어야함. - 성공테스트( const vec3 vtest; )", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 const vec3 cTest = vec3(1.0);
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				try {
					RedShader(tRedGL, 'constTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, true)
		),
		redGroup(
			"배열 형식 체크 확인",
			redTest("유니폼 선언 형식 확인 : uFloatArray[3]", function (unit) {
					var source;
					source = function () {
						/* @preserve
						 uniform float uFloatArray[3];
						 void main(void) {
						 gl_Position = vec4(1.0);
						 }
						 */
					}
					source = RedGLUtil.getStrFromComment(source.toString());
					var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					var t1;
					t1 = t0['parseData']['uniform']['list'].filter(function (v) {
						if (v['name'] == 'uFloatArray') return true
					})[0];
					unit.run(t1['uniformType'] + '_' + t1['arrayNum'])
					console.log(t0)
					console.log(t1)
				}, 'float_3'
			),
			redTest("유니폼 선언 형식 확인 : uIntArray[3]", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform int uIntArray[3];
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());
				var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
				var t1;
				t1 = t0['parseData']['uniform']['list'].filter(function (v) {
					if (v['name'] == 'uIntArray') return true
				})[0];
				unit.run(t1['uniformType'] + '_' + t1['arrayNum'])
				console.log(t0)
				console.log(t1)
			}, 'int_3')
		),
		redGroup(
			"중복소스 확인",
			redTest("중복선언", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform int uTest;
					 uniform int uTest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());

				try {
					var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					console.log(t0)
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("시스템 선언과 중복일경우 : RedSystemShaderCode.vShareSource", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform vec4 uResolution;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());

				try {
					var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
					console.log(t0)
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false),
			redTest("시스템 선언과 중복일경우 : RedSystemShaderCode.vShareSource", function (unit) {
				var source;
				source = function () {
					/* @preserve
					 uniform float uUseFog;
					 void main(void) {
					 gl_FragColor = vec4(1.0);
					 }
					 */
				}
				source = RedGLUtil.getStrFromComment(source.toString());

				try {
					var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.FRAGMENT, source);
					console.log(t0)
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, false)
		)
	)
})
