"use strict";
var RedBaseObject3D;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBaseObject3D`,
		 description : `
			 RedBaseObject3D 기저층
			 프로토타입 확장을 통해서만 사용가능( RedGLUtil.copyProto 사용 )

		 `,
		 return : 'void'
	 }
	 :DOC*/
	RedBaseObject3D = function () {
		RedGLUtil.throwFunc('RedBaseObject3D : 생성자/직접실행으로 사용 할 수 없습니다.')
	}
	/**DOC:
	 {
		 title :`RedBaseObject3D.build`,
		 code : 'STATIC',
		 description : `
			RedBaseObject3D가 가지고있는 속성을 해당 인스턴스에 복사하기위해사용
		 `,
		 params : {
			 gl : [
				 {type : 'glContext' }
			 ]
		 },
		 example : `
		 var testMesh = function (redGL) {
			 var tGL;
			 tGL = redGL.gl;
			 RedBaseObject3D['build'].call(this, tGL)
		 }
		 `,
		 return : 'void'
	 }
	 :DOC*/
	RedBaseObject3D['build'] = function (gl) {
		/**DOC:
		 {
			 title :`useCullFace`,
			 description : `
				 컬링 사용여부
				 기본값 : true
			 `,
			 return : 'Boolean'
		 }
		 :DOC*/
		this['useCullFace'] = true
		/**DOC:
		 {
			 title :`cullFace`,
			 description : `
				 컬링 페이스 설정
				 기본값 : gl.BACK
			 `,
			 return : 'gl 상수'
		 }
		 :DOC*/
		this['cullFace'] = gl.BACK
		/**DOC:
		 {
			 title :`useDepthTest`,
			 description : `
				 뎁스 테스트 사용여부
				 기본값 : true
			 `,
			 return : 'Boolean'
		 }
		 :DOC*/
		this['useDepthTest'] = true
		/**DOC:
		 {
			 title :`depthTestFunc`,
			 description : `
				 뎁스 테스트 함수 설정
				 기본값 : gl.LEQUAL
			 `,
			 return : 'gl 상수'
		 }
		 :DOC*/
		this['depthTestFunc'] = gl.LEQUAL
		/**DOC:
		 {
			 title :`useBlendMode`,
			 description : `
				 블렌드 모드 사용여부
				 기본값 : true
			 `,
			 return : 'Boolean'
		 }
		 :DOC*/
		this['useBlendMode'] = true
		/**DOC:
		 {
			 title :`blendSrc`,
			 description : `
				 블렌드 소스값 factor
				 기본값 : gl.ONE
			 `,
			 return : 'gl 상수'
		 }
		 :DOC*/
		this['blendSrc'] = gl.ONE
		/**DOC:
		 {
			 title :`blendDst`,
			 description : `
				 블렌드 목표값 factor
				 기본값 : gl.ONE_MINUS_SRC_ALPHA
			 `,
			 return : 'gl 상수'
		 }
		 :DOC*/
		this['blendDst'] = gl.ONE_MINUS_SRC_ALPHA
		/**DOC:
		 {
			 title :`drawMode`,
			 description : `
				 기본값 : gl.TRIANGLES
				 drawCall시 적용한 드로잉 모드
			 `,
			 return : 'gl 상수'
		 }
		 :DOC*/
		this['drawMode'] = gl.TRIANGLES
		/**DOC:
		 {
			 title :`pointSize`,
			 description : `
				 기본값 : 1
				 gl.POINTS로 그릴경우 반영될 포인트 사이즈.
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['pointSize'] = 1


		/**DOC:
		 {
			 title :`x`,
			 return : 'Number'
		 }
		 :DOC*/
		/**DOC:
		 {
			 title :`y`,
			 return : 'Number'
		 }
		 :DOC*/
		/**DOC:
		 {
			 title :`z`,
			 return : 'Number'
		 }
		 :DOC*/
		this['x'] = this['y'] = this['z'] = 0;
		/**DOC:
		 {
			 title :`rotationX`,
			 return : 'Number'
		 }
		 :DOC*/
		/**DOC:
		 {
			 title :`rotationY`,
			 return : 'Number'
		 }
		 :DOC*/
		/**DOC:
		 {
			 title :`rotationZ`,
			 return : 'Number'
		 }
		 :DOC*/
		this['rotationX'] = this['rotationY'] = this['rotationZ'] = 0;
		/**DOC:
		 {
			 title :`scaleX`,
			 return : 'Number'
		 }
		 :DOC*/
		/**DOC:
		 {
			 title :`scaleY`,
			 return : 'Number'
		 }
		 :DOC*/
		/**DOC:
		 {
			 title :`scaleZ`,
			 return : 'Number'
		 }
		 :DOC*/
		this['scaleX'] = this['scaleY'] = this['scaleZ'] = 1;
		/**DOC:
		 {
			title :`matrix`,
			description : `
			matrix 렌더링시 자동계산
			`,
			return : 'mat4'
		 }
		 :DOC*/
		this['matrix'] = mat4.create();
		/**DOC:
		 {
			title :`normalMatrix`,
			description : `
			normalMatrix 렌더링시 자동계산
			`,
			return : 'mat4'
		 }
		 :DOC*/
		this['normalMatrix'] = mat4.create();
		/**DOC:
		 {
			 title :`children`,
			 return : 'Array'
		 }
		 :DOC*/
		this['children'] = []
	}
	RedBaseObject3D.prototype = {
		/**DOC:
		 {
			 title :`localToWorld`,
			 code : 'METHOD',
			 description : `
				 로컬좌표를 RedWorld 좌표로 변경
			 `,
			 return : 'Array'
		 }
		 :DOC*/
		localToWorld: (function () {
			var t0;
			t0 = mat4.create()
			return function (x, y, z) {
				x = x || 0
				y = y || 0
				z = z || 0
				mat4.identity(t0);
				mat4.translate(t0, t0, [x, y, z])
				mat4.multiply(t0, this['matrix'], t0)
				return [
					t0[12],
					t0[13],
					t0[14]
				]
			}
		})(),
		/**DOC:
		 {
			 title :`worldToLocal`,
			 code : 'METHOD',
			 description : `
				 RedWorld좌료를 로컬좌료로 변환
			 `,
			 return : 'Array'
		 }
		 :DOC*/
		worldToLocal: (function () {
			var t0, t1;
			t0 = mat4.create() // 이동
			t1 = mat4.create()
			return function (x, y, z) {
				x = x || 0
				y = y || 0
				z = z || 0
				mat4.translate(t0, t0, [x, y, z])
				// mat4.invert(t1, this['matrix'])
				mat4.multiply(t1, t0, this['matrix'])
				return [
					t1[0] * x + t1[1] * y + t1[2] * z + t1[3],
					t1[4] * x + t1[5] * y + t1[6] * z + t1[7],
					t1[8] * x + t1[9] * y + t1[10] * z + t1[11]
				]
			}
		})()
	}
	Object.freeze(RedBaseObject3D);
})();
