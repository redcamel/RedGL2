"use strict";
"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	redSuite(
		"RedShader Test",
		redGroup(
			"생성 확인",
			redTest("기본 파싱 테스트", function (unit) {
				var testMaterial;
				(function () {
					var makeProgram;
					testMaterial = function (redGL) {
						if (!(this instanceof testMaterial)) return new testMaterial(redGL);
						/////////////////////////////////////////
						// 유니폼 프로퍼티
						/////////////////////////////////////////
						// 일반 프로퍼티
						this['program'] = makeProgram(this, redGL);
						this['_UUID'] = RedGL['makeUUID']();
						this.checkProperty()
						console.log(this);
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
						PROGRAM_NAME = 'testShaderProgram' + RedGL.makeUUID();
						return function (target, redGL) {
							return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

						}
					})()
					testMaterial.prototype = RedBaseMaterial.prototype
					Object.freeze(testMaterial)
				})();
				try {
					testMaterial(tRedGL);
					unit.run(true)
				} catch (error) {
					console.log(error)
					unit.run(false)
				}
			}, true)
		)
	)
})
