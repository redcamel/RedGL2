/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

RedTest.title = "RedGL TEST";
RedGL.setDoNotPrepareProgram();
RedTest.testGroup(
	"기본 생성 테스트",
	function () {
		RedTest.test(
			"성공 테스트 : 콜백에서 this가 RedGL 인스턴스인지 확인",
			function () {
				RedGL
				(document.createElement('canvas'),
					function () {
						var tRedGL = this;
						console.log(this);
						RedTest.run(this instanceof RedGL);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					}
				)
			},
			true
		);
		RedTest.test(
			"성공 테스트 : 콜백인자 true 확인",
			function () {
				RedGL(
					document.createElement('canvas'),
					function (v) {
						var tRedGL = this;
						RedTest.run(v);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					}
				)
			},
			true
		)
		;
		RedTest.test(
			"실패 테스트 : canvas 엘리먼트만 허용하는지",
			function () {
				try {
					RedGL(
						document.createElement('div'),
						function () {
							var tRedGL = this;
							RedTest.run(true);
							tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
						}
					)
				} catch (error) {
					RedTest.run(false, error);
				}
			},
			false
		);
	}
);
RedTest.testGroup(
	"명시적 컨텍스트 테스트",
	function () {
		RedTest.test(
			"성공 테스트 : 명시적 컨텍스트 테스트 - webgl",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						RedTest.run(this['gl']['version']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					},
					null,
					'webgl'
				)
			},
			'webgl'
		);
		RedTest.test(
			"실패 테스트 : 명시적 컨텍스트 테스트 - redCamel : 콜백인자 false 확인",
			function () {
				RedGL(
					document.createElement('canvas'),
					function (v) {
						RedTest.run(v)
					},
					null,
					'redCamel'
				)
			},
			false
		);
	}
);
RedTest.testGroup(
	"컨텍스트 생성 옵션 테스트",
	function () {
		RedTest.test(
			"성공 테스트 : 명시적 컨텍스트 테스트 : alpha = true",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						RedTest.run(this.gl.getContextAttributes()['alpha']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					},
					{alpha: true}
				)
			},
			true
		);
		RedTest.test(
			"성공 테스트 : 명시적 컨텍스트 테스트 : alpha = false",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						RedTest.run(this.gl.getContextAttributes()['alpha']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					},
					{alpha: false}
				)
			},
			false
		);
		RedTest.test(
			"성공 테스트 : 명시적 컨텍스트 테스트 : depth = true",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						RedTest.run(this.gl.getContextAttributes()['depth']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					},
					{depth: true}
				)
			},
			true
		);
		RedTest.test(
			"성공 테스트 : 명시적 컨텍스트 테스트 : depth = false",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						RedTest.run(this.gl.getContextAttributes()['depth']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					},
					{depth: false}
				)
			},
			false
		);
		RedTest.test(
			"성공 테스트 : 명시적 컨텍스트 테스트 : stencil = true",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						RedTest.run(this.gl.getContextAttributes()['stencil']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					},
					{stencil: true}
				)
			},
			true
		);
		RedTest.test(
			"성공 테스트 : 명시적 컨텍스트 테스트 : stencil = false",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						RedTest.run(this.gl.getContextAttributes()['stencil']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					},
					{stencil: false}
				)
			},
			false
		);
		RedTest.test(
			"성공 테스트 : 명시적 컨텍스트 테스트 : antialias = true",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						RedTest.run(this.gl.getContextAttributes()['antialias']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					},
					{antialias: true}
				)
			},
			true
		);
		RedTest.test(
			"성공 테스트 : 명시적 컨텍스트 테스트 : antialias = false",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						RedTest.run(this.gl.getContextAttributes()['antialias']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					},
					{antialias: false}
				)
			},
			false
		);
	}
);
RedTest.testGroup(
	"RedGL Instance).renderScale 테스트",
	function () {
		RedTest.test(
			"성공 테스트 : 기본값 확인",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						RedTest.run(tRedGL['renderScale']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					}
				)
			},
			1
		);
		RedTest.test(
			"성공 테스트 : 1보다 큰수가 들어왔을때",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						tRedGL['renderScale'] = 2;
						RedTest.run(tRedGL['renderScale']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					}
				)
			},
			1
		);
		RedTest.test(
			"성공 테스트 : 0.1보다 작은수가 들어왔을때",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						tRedGL['renderScale'] = 0;
						RedTest.run(tRedGL['renderScale']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					}
				)
			},
			0.1
		);
	}
);
RedTest.testGroup(
	"(RedGL Instance).setSize( <b>width</b>, <b>height</b> )",
	function () {
		RedTest.test(
			"성공테스트 : 숫자형 확인",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						tRedGL.setSize(100, 100);
						RedTest.run(tRedGL['_width'] + '_' + tRedGL['_height']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					}
				);
			},
			'100_100'
		);

		RedTest.test(
			"성공테스트 : %형 확인",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						tRedGL.setSize('100%', '100%');
						RedTest.run(tRedGL['_width'] + '_' + tRedGL['_height']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					}
				);
			},
			'100%_100%'
		);

		RedTest.test(
			"성공테스트 : 숫자형 + %형 확인",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						tRedGL.setSize('100%', 100);
						RedTest.run(tRedGL['_width'] + '_' + tRedGL['_height']);
						tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
					}
				);
			},
			'100%_100'
		);
		RedTest.test(
			"실패테스트 : 문자 입력 했을떄",
			function () {
				RedGL(
					document.createElement('canvas'),
					function () {
						var tRedGL = this;
						try {
							tRedGL.setSize('100%', 'failTest');
							RedTest.run(true);
							tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
						} catch (error) {
							RedTest.run(false, error);
							tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
						}
					}
				)
			},
			false
		);
	}
);