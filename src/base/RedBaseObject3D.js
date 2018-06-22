"use strict";
var RedBaseObject3D;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBaseObject3D`,
		 description : `
			 RedBaseObject3D 기저층
		 `,
		 return : 'void'
	 }
	 :DOC*/
	RedBaseObject3D = function () {}
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
		this['blendSrc'] = gl.SRC_ALPHA
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
		this['autoUpdateMatrix'] = true
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
		this['useLOD'] = false
		this['_lodLevels'] = {
			/* 1: {
				geometry : ~~,
				material : ~~~
				둘중하나는 있어야하며
				하나만 입력할경우 없는쪽은 오리지날 속성이 부여된다.
			}
			*/
		}
		this['_geometry'] = null;
		Object.defineProperty(this, 'geometry', RedDefinePropertyInfo['geometry']);
		this['_material'] = null;
		Object.defineProperty(this, 'material', RedDefinePropertyInfo['material']);
	}
	RedBaseObject3D.prototype = {
		addLOD: (function () {
			var tData;
			return function (level, distance, geometry, material) {
				geometry || material || RedGL.throwFunc('RedBaseObject3D - addLOD : geometry, material 둘중하나는 반드시 입력되어야함')
				tData = {
					level: level,
					distance: distance,
					geometry: geometry ? geometry : this['geometry'],
					material: material ? material : this['material']
				}
				this['_lodLevels'][level] = tData
			}
		})(),
		removeLOD: function (level) {
			delete this['_lodLevels'][level]
		},
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
		})(),
		/**DOC:
		 {
			 title :`getScreenPoint`,
			 code : 'METHOD',
			 description : `
				 스크린좌표반환
			 `,
			 return : 'Array'
		 }
		 :DOC*/
		getScreenPoint: (function () {
			var resultMTX = mat4.create()
			var tCamera, tViewRect
			var resultPosition;
			resultPosition = {
				x: 0,
				y: 0,
				z: 0,
				w: 0,
			}
			return function (redView) {
				mat4.identity(resultMTX);
				tCamera = redView['camera'];
				tViewRect = redView['_viewRect'];
				if ( !(tCamera instanceof RedCamera ) ) tCamera = tCamera.camera;
				mat4.multiply(resultMTX, tCamera.perspectiveMTX, tCamera.matrix);
				mat4.multiply(resultMTX, resultMTX, this['matrix']);
				resultPosition.x = resultMTX[12];
				resultPosition.y = resultMTX[13];
				resultPosition.z = resultMTX[14];
				resultPosition.w = resultMTX[15];
				resultPosition.x = resultPosition.x * 0.5 / resultPosition.w + 0.5;
				resultPosition.y = resultPosition.y * 0.5 / resultPosition.w + 0.5;
				return [tViewRect[0] + resultPosition.x * tViewRect[2], tViewRect[1] + (1 - resultPosition.y) * tViewRect[3]]
			}
		})()
	}
	Object.freeze(RedBaseObject3D);
})();
