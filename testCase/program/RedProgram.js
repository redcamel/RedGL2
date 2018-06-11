"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	var vSource1, fSource1;
	var getValueStr;
	getValueStr = function (v) {
		var t0 = []
		var i,len;
		if ( v.buffer ) {
			i = 0
			len = v.length
			for(i;i<len;i++) t0.push(v[i])
			t0 = t0.join(',')
			console.log(v)
			return t0
		} else {
			return v
		}
	}
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
			redTest("기본 파싱 테스트", function (unit, title) {
				try {
					RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource1, fSource1);
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("인자확인(redGL, key, vertexShaderSource, fragmentShaderSource) : 실패테스트 - RedGL Instance만 허용", function (unit, title) {
				try {
					RedProgram(null, 'testShaderProgram' + RedGL.makeUUID(), vSource1, fSource1);
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"키관련 확인",
			redTest("인자확인(redGL, key, vertexShaderSource, fragmentShaderSource) : 실패테스트 key는 문자열만 허용", function (unit, title) {
				try {
					RedProgram(tRedGL, 1, vSource1, fSource1);
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("키가 같을 경우 기존것을 리턴하는지 체크 : 키로 찾기", function (unit, title) {
				var t0 = RedProgram(tRedGL, 'testShaderProgram', vSource1, fSource1);
				var t1 = RedProgram(tRedGL, 'testShaderProgram');
				unit.run(t0 == t1)
			}, true),
			redTest("키가 같을 경우 기존것을 리턴하는지 체크 :  기존키가 있으면 입력된 소스를 무시한다.", function (unit, title) {
				var t0 = RedProgram(tRedGL, 'testShaderProgram', vSource1, fSource1);
				var t1 = RedProgram(tRedGL, 'testShaderProgram', vSource1, fSource1);
				unit.run(t0 == t1)
			}, true),
			redTest("존재하지 않는키를 찾으려할때 테스트", function (unit, title) {
				try {
					RedProgram(tRedGL, 'xxxxxxxx');
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"쉐이더 소스 확인",
			redTest("쉐이더 소스를 둘다 입력하지 않을경우 + 기존에 키가 존재하지않을떄 : 실패테스트 vertexShaderSource, fragmentShaderSource 문자열이나 falsy만 허용", function (unit, title) {
				try {
					RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID());
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("fragmentShader Source 입력안한경우 + 기존에 키가 존재하지않을떄 : 실패테스트 ", function (unit, title) {
				try {
					RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource1);
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("vertexShaderSource 입력안한경우 + 기존에 키가 존재하지않을떄 : 실패테스트 ", function (unit, title) {
				try {
					RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), false, fSource1);
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("쉐이더 소스를 둘다 입력하지 않을경우 + 기존에 키가 존재할경우 :  기존 캐시된값이 돌아오는지 ", function (unit, title) {
				var t0 = RedProgram(tRedGL, 'testShaderProgram_checkSource', vSource1, fSource1);
				var t1 = RedProgram(tRedGL, 'testShaderProgram_checkSource');
				unit.run(t0 == t1)
			}, true),
			redTest("vertexShader 소스에 fragmentShader 소스를 입력할경우 : 실패테스트 ", function (unit, title) {
				try {
					RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), fSource1, fSource1);
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("fragmentShader 소스에 vertexShader 소스를 입력할경우 : 실패테스트 ", function (unit, title) {
				try {
					RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource1, vSource1);
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("vertexShader와 fragmentShader에 중복된 유니폼 선언  : 실패 테스트 ", function (unit, title) {
				var vSource = function () {
					/* @preserve
				     uniform float uTestFloat;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 }
					 */
				}
				var fSource = function () {
					/* @preserve
					 precision mediump float;
					 uniform float uTestFloat;
					 void main(void) {
					 	gl_FragColor = vec4(1.0);
					 }
					 */
				};
				vSource = RedGLUtil.getStrFromComment(vSource.toString());
				fSource = RedGLUtil.getStrFromComment(fSource.toString());
				try {
					RedProgram(tRedGL, 'testShaderProgram' + RedGL.makeUUID(), vSource, fSource);
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"uniform 정보 파싱 확인 : uniformLocation",
			redTest("uniformLocation에 uniform 이름정보가 잘들어가나 확인 : uUniformParsingTest", function (unit, title) {
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
			redTest("uniform이 선언은 되었지만 main함수에서 사용되지않을경우 로케이션이 없어야함", function (unit, title) {
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
			redTest("uniform이 선언되고 main함수에서 사용될경우 WebGLUniformLocation Instance 를 할당받아야함", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform float uUniformParsingTest;
					 void main(void) {
						 gl_Position = vec4(uUniformParsingTest);
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
				unit.run(t0['uniformLocation']['uUniformParsingTest']['location'] instanceof WebGLUniformLocation)
				console.log(t0)
			}, true),
			redTest("uniformLocation에 uniform 이름에 매칭되는 재질 프로퍼티 이름 정보가 잘들어가나 확인 : uUniformParsingTest / uniformParsingTest", function (unit, title) {
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
			"uniform 정보 파싱 확인 : uniformType, renderType, renderMethod, 조회비교",
			redTest("uniformType : float / renderType : float / renderMethod : uniform1f", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform float uFloatTest;
					 void main(void) {
						 gl_Position = vec4(uFloatTest);
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
				// 값리턴 테스트
				var returnValue, returnValueArray;
				var tInfo = t0['uniformLocation']['uFloatTest']
				tRedGL.gl.useProgram(t0.webglProgram)
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], 1.5)
				returnValue = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], -1.5)
				returnValueArray = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				// 유닛테스트
				unit.run(tInfo['uniformType'] + '_' + tInfo['renderType'] + '_' + tInfo['renderMethod'] + '_' + getValueStr(returnValue) + '_' + getValueStr(returnValueArray))
			}, 'float_float_uniform1f_1.5_-1.5'),
			redTest("uniformType : float / renderType : float / renderMethod : uniform1fv", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform float uFloatTest[5];
					 void main(void) {
						 gl_Position = vec4(uFloatTest[0]);
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
				// 값리턴 테스트
				var returnValue, returnValueArray;
				var tInfo = t0['uniformLocation']['uFloatTest']
				tRedGL.gl.useProgram(t0.webglProgram)
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [1.5])
				returnValue = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [-1.5])
				returnValueArray = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				// 유닛테스트
				unit.run(tInfo['uniformType'] + '_' + tInfo['renderType'] + '_' + tInfo['renderMethod'] + '_' + getValueStr(returnValue) + '_' + getValueStr(returnValueArray))
			}, 'float_float_uniform1fv_1.5_-1.5'),
			redTest("uniformType : bool / renderType : bool  / renderMethod : uniform1i", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform bool uBoolTest;
					 void main(void) {
					    if(uBoolTest) gl_Position = vec4(1.0);
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
				// 값리턴 테스트
				var returnValue, returnValueArray;
				var tInfo = t0['uniformLocation']['uBoolTest']
				tRedGL.gl.useProgram(t0.webglProgram)
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], true)
				returnValue = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], false)
				returnValueArray = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				// 유닛테스트
				unit.run(tInfo['uniformType'] + '_' + tInfo['renderType'] + '_' + tInfo['renderMethod'] + '_' + getValueStr(returnValue) + '_' + getValueStr(returnValueArray))
			}, 'bool_bool_uniform1i_true_false'),
			redTest("uniformType : bool / renderType : bool  / renderMethod : uniform1i", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform bool uBoolTest[4];
					 void main(void) {
					    if(uBoolTest[0]) gl_Position = vec4(1.0);
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
				// 값리턴 테스트
				var returnValue, returnValueArray;
				var tInfo = t0['uniformLocation']['uBoolTest']
				tRedGL.gl.useProgram(t0.webglProgram)
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [true])
				returnValue = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [false])
				returnValueArray = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				// 유닛테스트
				unit.run(tInfo['uniformType'] + '_' + tInfo['renderType'] + '_' + tInfo['renderMethod'] + '_' + getValueStr(returnValue) + '_' + getValueStr(returnValueArray))
			}, 'bool_bool_uniform1iv_true_false'),
			redTest("uniformType : vec2 / renderType : vec / renderMethod : uniform2fv", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform vec2 uVec2Test;
					 void main(void) {
					    gl_Position = vec4(1.0);
					    gl_Position.xy = uVec2Test;
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
				// 값리턴 테스트
				var returnValue, returnValueArray;
				var tInfo = t0['uniformLocation']['uVec2Test']
				tRedGL.gl.useProgram(t0.webglProgram)
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [1.5, 2.5])
				returnValue = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [2.5, 3.5])
				returnValueArray = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				// 유닛테스트
				unit.run(tInfo['uniformType'] + '_' + tInfo['renderType'] + '_' + tInfo['renderMethod'] + '_' + getValueStr(returnValue) + '_' + getValueStr(returnValueArray))
			}, 'vec2_vec_uniform2fv_1.5,2.5_2.5,3.5'),
			redTest("uniformType : vec3 / renderType : vec  / renderMethod : uniform3fv", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform vec3 uVec3Test;
					 void main(void) {
					    gl_Position = vec4(1.0);
					    gl_Position.xyz = uVec3Test;
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
				// 값리턴 테스트
				var returnValue, returnValueArray;
				var tInfo = t0['uniformLocation']['uVec3Test']
				tRedGL.gl.useProgram(t0.webglProgram)
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [1.5, 2.5, 3.5])
				returnValue = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [2.5, 3.5, 4.5])
				returnValueArray = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				// 유닛테스트
				unit.run(tInfo['uniformType'] + '_' + tInfo['renderType'] + '_' + tInfo['renderMethod'] + '_' + getValueStr(returnValue) + '_' + getValueStr(returnValueArray))
			}, 'vec3_vec_uniform3fv_1.5,2.5,3.5_2.5,3.5,4.5'),
			redTest("uniformType : vec4 / renderType : vec / renderMethod : uniform4fv", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform vec4 uVec4Test;
					 void main(void) {
					 gl_Position = uVec4Test;
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
				// 값리턴 테스트
				var returnValue, returnValueArray;
				var tInfo = t0['uniformLocation']['uVec4Test']
				tRedGL.gl.useProgram(t0.webglProgram)
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [1.5, 2.5, 3.5, 4.5])
				returnValue = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [2.5, 3.5, 4.5, 5.5])
				returnValueArray = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				// 유닛테스트
				unit.run(tInfo['uniformType'] + '_' + tInfo['renderType'] + '_' + tInfo['renderMethod'] + '_' + getValueStr(returnValue) + '_' + getValueStr(returnValueArray))
			}, 'vec4_vec_uniform4fv_1.5,2.5,3.5,4.5_2.5,3.5,4.5,5.5'),
			redTest("uniformType : ivec2 / renderType : vec / renderMethod : uniform2iv", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform ivec2 uIvec2Test;
					 void main(void) {
					    gl_Position = vec4(uIvec2Test,1.0,1.0);
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
				// 값리턴 테스트
				var returnValue, returnValueArray;
				var tInfo = t0['uniformLocation']['uIvec2Test']
				tRedGL.gl.useProgram(t0.webglProgram)
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [1.1, 2.1])
				returnValue = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [2, 3])
				returnValueArray = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				// 유닛테스트
				unit.run(tInfo['uniformType'] + '_' + tInfo['renderType'] + '_' + tInfo['renderMethod'] + '_' + getValueStr(returnValue) + '_' + getValueStr(returnValueArray))
			}, 'ivec2_vec_uniform2iv_1,2_2,3'),
			redTest("uniformType : ivec3 / renderType : vec / renderMethod : uniform3iv", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform ivec3 uIvec3Test;
					 void main(void) {
					    gl_Position = vec4(uIvec3Test,1.0);
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
				// 값리턴 테스트
				var returnValue, returnValueArray;
				var tInfo = t0['uniformLocation']['uIvec3Test']
				tRedGL.gl.useProgram(t0.webglProgram)
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [1.1, 2.1, 3.1])
				returnValue = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [2, 3, 4])
				returnValueArray = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				// 유닛테스트
				unit.run(tInfo['uniformType'] + '_' + tInfo['renderType'] + '_' + tInfo['renderMethod'] + '_' + getValueStr(returnValue) + '_' + getValueStr(returnValueArray))
				console.log(t0)
			}, 'ivec3_vec_uniform3iv_1,2,3_2,3,4'),
			redTest("uniformType : ivec4 / renderType : vec / renderMethod : uniform4iv", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform ivec4 uIVec4Test;
					 void main(void) {
					    gl_Position = vec4(uIVec4Test);
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
				// 값리턴 테스트
				var returnValue, returnValueArray;
				var tInfo = t0['uniformLocation']['uIVec4Test']
				tRedGL.gl.useProgram(t0.webglProgram)
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [1.1, 2.1, 3.1, 4.1])
				returnValue = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [2, 3, 4, 5])
				returnValueArray = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				// 유닛테스트
				unit.run(tInfo['uniformType'] + '_' + tInfo['renderType'] + '_' + tInfo['renderMethod'] + '_' + getValueStr(returnValue) + '_' + getValueStr(returnValueArray))
			}, 'ivec4_vec_uniform4iv_1,2,3,4_2,3,4,5'),
			redTest("uniformType : bvec2 / renderType : vec / renderMethod : uniform2iv", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform bvec2 uBvec2Test;
					 void main(void) {
					    gl_Position = vec4(uBvec2Test,1.0,1.0);
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
				// 값리턴 테스트
				var returnValue, returnValueArray;
				var tInfo = t0['uniformLocation']['uBvec2Test']
				tRedGL.gl.useProgram(t0.webglProgram)
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [true, false])
				returnValue = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [false, true])
				returnValueArray = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				// 유닛테스트
				unit.run(tInfo['uniformType'] + '_' + tInfo['renderType'] + '_' + tInfo['renderMethod'] + '_' + getValueStr(returnValue) + '_' + getValueStr(returnValueArray))
			}, 'bvec2_vec_uniform2iv_true,false_false,true'),
			redTest("uniformType : bvec3 / renderType : vec / renderMethod : uniform3iv", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform bvec3 uBvec3Test;
					 void main(void) {
						 gl_Position = vec4(uBvec3Test,1.0);
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
				// 값리턴 테스트
				var returnValue, returnValueArray;
				var tInfo = t0['uniformLocation']['uBvec3Test']
				tRedGL.gl.useProgram(t0.webglProgram)
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [true, false, false])
				returnValue = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [false, false, true])
				returnValueArray = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				// 유닛테스트
				unit.run(tInfo['uniformType'] + '_' + tInfo['renderType'] + '_' + tInfo['renderMethod'] + '_' + getValueStr(returnValue) + '_' + getValueStr(returnValueArray))
			}, 'bvec3_vec_uniform3iv_true,false,false_false,false,true'),
			redTest("uniformType : bvec4 / renderType : vec / renderMethod : uniform4iv", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform bvec4 uBvec4Test;
					 void main(void) {
					    gl_Position = vec4(uBvec4Test);
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
				// 값리턴 테스트
				var returnValue, returnValueArray;
				var tInfo = t0['uniformLocation']['uBvec4Test']
				tRedGL.gl.useProgram(t0.webglProgram)
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [true, false, false, 1])
				returnValue = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				tRedGL.gl[tInfo['renderMethod']](tInfo['location'], [true, false, false, 0])
				returnValueArray = tRedGL.gl.getUniform(t0.webglProgram, tInfo['location'])
				// 유닛테스트
				unit.run(tInfo['uniformType'] + '_' + tInfo['renderType'] + '_' + tInfo['renderMethod'] + '_' + getValueStr(returnValue) + '_' + getValueStr(returnValueArray))
			}, 'bvec4_vec_uniform4iv_true,false,false,true_true,false,false,false'),
			redTest("uniformType : sampler2D / renderType : sampler2D / renderMethod : uniform1i", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform sampler2D uSampler2DTest;
					 void main(void) {
					 gl_Position = vec4(1.0);
					 uSampler2DTest;
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
				unit.run(t0['uniformLocation']['uSampler2DTest']['uniformType'] + '_' + t0['uniformLocation']['uSampler2DTest']['renderType'] + '_' + t0['uniformLocation']['uSampler2DTest']['renderMethod'])
				console.log(t0)
				//tRedGL.gl.useProgram(t0.webglProgram)
				//tRedGL.gl.activeTexture(tRedGL.gl.TEXTURE0 + t0['uniformLocation']['uSampler2DTest']['samplerIndex']);
				//tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, tRedGL._datas.emptyTexture['2d']['webglTexture']);
				//console.log(tRedGL.gl.getUniform(t0.webglProgram, t0['uniformLocation']['uSampler2DTest']['location']))
			}, 'sampler2D_sampler2D_uniform1i'),
			redTest("uniformType : samplerCube / renderType : samplerCube / renderMethod : uniform1i", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform samplerCube uSamplerCubeTest;
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
				unit.run(t0['uniformLocation']['uSamplerCubeTest']['uniformType'] + '_' + t0['uniformLocation']['uSamplerCubeTest']['renderType'] + '_' + t0['uniformLocation']['uSamplerCubeTest']['renderMethod'])
				console.log(t0)
			}, 'samplerCube_samplerCube_uniform1i')
		),
		redGroup(
			"uniform 배열 정보 파싱 확인 : uniformLocation",
			redTest("uniformLocation에 uniform 이름정보가 잘들어가나 확인 : uUniformParsingTest[3]", function (unit, title) {
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
			redTest("uniformLocation에 uniform 배열 length가  잘들어가나 확인 : uUniformParsingTest[3]", function (unit, title) {
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
			redTest("uniform이 배열이 선언은 되었지만 main함수에서 사용되지않을경우 로케이션이 없어야함", function (unit, title) {
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
			redTest("uniform이 배열이 선언되고 main함수에서 사용될경우 WebGLUniformLocation Instance 를 할당받아야함", function (unit, title) {
				var vSource, fSource;
				vSource = function () {
					/* @preserve
					 uniform float uUniformParsingTest[3];
					 void main(void) {
					    gl_Position = vec4(uUniformParsingTest[2]);
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
			redTest("uniformLocation에 uniform 이름에 매칭되는 재질 프로퍼티 이름 정보가 잘들어가나 확인 : uUniformParsingTest[3] / uniformParsingTest", function (unit, title) {
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
			redTest("attributeLocation에  attribute 이름정보가 잘들어가나 확인 : aAttributeTest", function (unit, title) {
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
			redTest("attributeLocation에  attribute가 선언되었지만 main함수에서 사용되지않을경우 로케이션 정보는 -1이어야함", function (unit, title) {
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
				unit.run(t0['attributeLocation']['aAttributeTest']['location'] == -1)
			}, true),
			redTest("attributeLocation에  attribute가 선언되고 main함수에서 사용될경우 location을 숫자형식으로 할당받아야함", function (unit, title) {
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
