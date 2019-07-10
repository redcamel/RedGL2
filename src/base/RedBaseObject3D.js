/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.7.10 15:43:31
 *
 */
"use strict";
var RedBaseObject3D;
(function () {
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedBaseObject3D`,
		 description : `
			 RedBaseObject3D 기저층.
		 `,
		 return : 'RedBaseObject3D Instance'
	 }
	 :DOC*/
	RedBaseObject3D = function () {
		if (!(this instanceof RedBaseObject3D)) return new RedBaseObject3D();
	};
	/*DOC:
	 {
		 title :`RedBaseObject3D.build`,
		 code : 'STATIC METHOD',
		 description : `
			RedBaseObject3D가 가지고있는 속성을 해당 인스턴스에 복사하기위해사용.
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
		this['name'] = 'object3D_' + (RedGL.makeUUID() + 1);
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`useTransparentSort`,
			 description : `
				 투명도 소팅 여부. 
				 true 설정시 렌더링 진행과정중 최종적으로 모아서 그리게된다. (완벽하지 않지만 투명객체 소팅 효과를 얻을 수 있음)
				 기본값 : false
			 `,
			 example : `
                (RedMesh Instance).useTransparentSort = true;
                (RedMesh Instance).useTransparentSort = false;
             `,
			 return : 'Boolean'
		 }
		 :DOC*/
		this['useTransparentSort'] = false;
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`useCullFace`,
			 description : `
				 컬링 사용여부
				 기본값 : true
			 `,
			 example : `
                (RedMesh Instance).useCullFace = true;
                (RedMesh Instance).useCullFace = false;
             `,
			 return : 'Boolean'
		 }
		 :DOC*/
		this['useCullFace'] = true;
		/*DOC:
		 {
             code : 'PROPERTY',
			 title :`cullFace`,
			 description : `
				 컬링 페이스 설정
				 기본값 : gl.BACK
			 `,
			 example : `
			    var tGL = (RedGL Instance).gl;
                (RedMesh Instance).cullFace = tGL.BACK;
                (RedMesh Instance).cullFace = tGL.FRONT;
             `,
			 return : 'gl 상수'
		 }
		 :DOC*/
		this['cullFace'] = gl.BACK;
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`useDepthMask`,
			 description : `
				 뎁스 마스크 사용여부
				 기본값 : true
			 `,
			 example : `
                (RedMesh Instance).useDepthMask = true;
                (RedMesh Instance).useDepthMask = false;
             `,
			 return : 'Boolean'
		 }
		 :DOC*/
		this['useDepthMask'] = true;
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`useDepthTest`,
			 description : `
				 뎁스 테스트 사용여부
				 기본값 : true
			 `,
			 example : `
                (RedMesh Instance).useDepthTest = true;
                (RedMesh Instance).useDepthTest = false;
             `,
			 return : 'Boolean'
		 }
		 :DOC*/
		this['useDepthTest'] = true;
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`depthTestFunc`,
			 description : `
				 뎁스 테스트 함수 설정
				 기본값 : gl.LEQUAL
			 `,
			 example : `
			    var tGL = (RedGL Instance).gl;
                (RedMesh Instance).depthTestFunc = tGL.LEQUAL;
                (RedMesh Instance).depthTestFunc = tGL.LESS;
             `,
			 return : 'gl 상수'
		 }
		 :DOC*/
		this['depthTestFunc'] = gl.LEQUAL;
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`useBlendMode`,
			 description : `
				 블렌드 모드 사용여부
				 기본값 : true
			 `,
			 example : `
                (RedMesh Instance).useBlendMode = true;
                (RedMesh Instance).useBlendMode = false;
             `,
			 return : 'Boolean'
		 }
		 :DOC*/
		this['useBlendMode'] = true;
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`blendSrc`,
			 description : `
				 블렌드 소스값 factor
				 기본값 : gl.SRC_ALPHA
			 `,
			 example : `
			    var tGL = (RedGL Instance).gl;
                (RedMesh Instance).blendSrc = tGL.SRC_ALPHA;
                (RedMesh Instance).blendSrc = tGL.DST_ALPHA;
             `,
			 return : 'gl 상수'
		 }
		 :DOC*/
		this['blendSrc'] = gl.SRC_ALPHA;
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`blendDst`,
			 description : `
				 블렌드 목표값 factor
				 기본값 : gl.ONE_MINUS_SRC_ALPHA
			 `,
			 example : `
			    var tGL = (RedGL Instance).gl;
                (RedMesh Instance).blendDst = tGL.SRC_ALPHA;
                (RedMesh Instance).blendDst = tGL.DST_ALPHA;
             `,
			 return : 'gl 상수'
		 }
		 :DOC*/
		this['blendDst'] = gl.ONE_MINUS_SRC_ALPHA;
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`drawMode`,
			 description : `
				 기본값 : gl.TRIANGLES
				 drawCall시 적용한 드로잉 모드
			 `,
			 example : `
			    var tGL = (RedGL Instance).gl;
                (RedMesh Instance).drawMode = tGL.TRIANGLES;
                (RedMesh Instance).drawMode = tGL.LINES;
             `,
			 return : 'gl 상수'
		 }
		 :DOC*/
		this['drawMode'] = gl.TRIANGLES;
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`pointSize`,
			 description : `
				 기본값 : 1
				 gl.POINTS로 그릴경우 반영될 포인트 사이즈.
				 성능을 위해서 getter/setter 설정이 되어있지 않음
			 `,
			 example : `
                (RedMesh Instance).pointSize = 1;
                (RedMesh Instance).pointSize = 2;
             `,
			 return : 'Number'
		 }
		 :DOC*/
		this['pointSize'] = 1;
		this['x'] = this['y'] = this['z'] = 0;
		this['rotationX'] = this['rotationY'] = this['rotationZ'] = 0;
		this['scaleX'] = this['scaleY'] = this['scaleZ'] = 1;
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`pivotX`,
			 description : `
				 기본값 : 0
				 피벗 포인트 X
			 `,
			 example : `
                (RedMesh Instance).pivotX = 1;
             `,
			 return : 'Number'
		 }
		 :DOC*/
		this['pivotX'] = 0;
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`pivotY`,
			 description : `
				 기본값 : 0
				 피벗 포인트 Y
			 `,
			 example : `
                (RedMesh Instance).pivotY = 1;
             `,
			 return : 'Number'
		 }
		 :DOC*/
		this['pivotY'] = 0;
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`pivotZ`,
			 description : `
				 기본값 : 0
				 피벗 포인트 Z
			 `,
			 example : `
                (RedMesh Instance).pivotZ = 1;
             `,
			 return : 'Number'
		 }
		 :DOC*/
		this['pivotZ'] = 0;
		/*DOC:
		 {
		    code : 'PROPERTY',
			title :`autoUpdateMatrix`,
			description : `
			    matrix 자동계산여부.
			    true 설정시 이전에 계산된 매트릭스를 사용한다.
			    임의 매트릭스 설정도 가능
			`,
			example : `
                (RedMesh Instance).autoUpdateMatrix = true;
                (RedMesh Instance).autoUpdateMatrix = false;
            `,
			return : 'boolean'
		 }
		 :DOC*/
		this['autoUpdateMatrix'] = true;
		this['_renderAutoUpdateMatrix'] = true;
		/*DOC:
		 {
		    code : 'PROPERTY',
			title :`matrix`,
			description : `
			    계산된 누적 메트릭스
			    matrix 렌더링시 자동계산
			`,
			return : 'mat4'
		 }
		 :DOC*/
		this['matrix'] = mat4.create();
		/*DOC:
		 {
		    code : 'PROPERTY',
			title :`localMatrix`,
			description : `
			    계산된 로컬 메트릭스
			    matrix 렌더링시 자동계산
			`,
			return : 'mat4'
		 }
		 :DOC*/
		this['localMatrix'] = mat4.create();
		/*DOC:
		 {
		    code : 'PROPERTY',
			title :`normalMatrix`,
			description : `
			    계산된 노멀 메트릭스
			    normalMatrix 렌더링시 자동계산
			`,
			return : 'mat4'
		 }
		 :DOC*/
		this['normalMatrix'] = mat4.create();
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`children`,
			 description : `
			    자식 리스트
			 `,
			 return : 'Array'
		 }
		 :DOC*/
		this['children'] = [];
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`useLOD`,
			 description : `LOD사용여부`,
			 example : `
                (RedMesh Instance).useLOD = true;
                (RedMesh Instance).useLOD = false;
             `,
			 return : 'Boolean'
		 }
		 :DOC*/
		this['useLOD'] = false;
		this['_lodLevels'] = [
			/* 1: {
				geometry : ~~,
				material : ~~~
				둘중하나는 있어야하며
				하나만 입력할경우 없는쪽은 오리지날 속성이 부여된다.
			}
			*/
		];
		this['_mouseColorMaterial'] = null;
		this['_mouseColorID'] = new Float32Array([
			parseInt(Math.random() * 255),
			parseInt(Math.random() * 255),
			parseInt(Math.random() * 255),
			255
		]);
		// 아웃라인
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`outlineThickness`,
			 description : `
				기본값 : 0
				최소값 : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['outlineThickness'] = 0;
		this['_outlineAlpha'] = 1;
		this['_outlineColor'] = new Float32Array(4)
		this['outlineColor'] = '#ff0000';


	};
	RedBaseObject3D.prototype = {
		/*DOC:
		 {
			 title :`addLOD`,
			 code : 'METHOD',
			 description : `
				 LOD 추가.
				 추가시 geometry, material 둘중 하나는 반드시 입력되어야함.
			 `,
			 params : {
				 level : [
					  {type : 'Number' }
				 ],
				 distance : [
					 {type : 'Number' }
				 ],
				 geometry : [
					 {type : 'RedGeometry 확장 Instance' }
				 ],
				 material : [
					 {type : 'RedBaseMaterial 확장 Instance' }
				 ]
			 },
			 example : `
                var tMesh = RedBaseObject3D Instance;
                tMesh.useLOD = true; // LOD 사용 설정
                tMesh.addLOD(0, 5, RedSphere(this, 0.5, 32, 32, 32), RedColorMaterial(this, '#00ff00')); // 0레벨 LOD 추가
                tMesh.addLOD(1, 10, RedSphere(this, 0.5, 16, 16, 16), RedColorMaterial(this, '#00ff00')); // 1레벨 LOD 추가
                tMesh.addLOD(2, 15, RedSphere(this, 0.5, 8, 8, 8), RedColorMaterial(this, '#00ff00')); // 2레벨 LOD 추가
                tMesh.addLOD(3, 20, RedSphere(this, 0.5, 4, 4, 4), RedColorMaterial(this, '#00ff00')); // 3레벨 LOD 추가
                tMesh.addLOD(4, 25, RedSphere(this, 0.5, 3, 3, 3), RedColorMaterial(this, '#00ff00')); // 4레벨 LOD 추가
			 `,
			 return : 'void'
		 }
		 :DOC*/
		addLOD: (function () {
			var tData, needPush;
			var i;
			return function (level, distance, geometry, material) {
				geometry || material || RedGLUtil.throwFunc('RedBaseObject3D - addLOD : geometry, material 둘중하나는 반드시 입력되어야함');
				RedGLUtil['isUint'](level) || RedGLUtil.throwFunc('RedBaseObject3D - addLOD : level은 uint만 허용함');
				if (level > 4) RedGLUtil.throwFunc('RedBaseObject3D - addLOD : level은 0~4 level 까지 허용함');
				tData = {
					level: level,
					distance: distance,
					geometry: geometry ? geometry : this['geometry'],
					material: material ? material : this['material']
				};
				i = this['_lodLevels'].length;
				needPush = true;
				while (i--) {
					if (this['_lodLevels'][i]['level'] == level) {
						this['_lodLevels'][i] = tData;
						needPush = false;
					}
				}
				if (needPush) this['_lodLevels'].push(tData)
			}
		})(),
		/*DOC:
		 {
			 title :`removeLOD`,
			 code : 'METHOD',
			 description : `LOD 삭제`,
			 params : {
				 level : [
					 {type : 'int' }
				 ]
			 },
             example : `
                var tMesh = RedBaseObject3D Instance;
                tMesh.addLOD(0, 5, RedSphere(this, 0.5, 32, 32, 32), RedColorMaterial(this, '#00ff00')); // 0레벨 LOD 추가
                tMesh.removeLOD(0); // 0레벨 LOD 삭제
			 `,
			 return : 'void'
		 }
		 :DOC*/
		removeLOD: function (level) {
			RedGLUtil['isUint'](level) || RedGLUtil.throwFunc('RedBaseObject3D - removeLOD : level : uint만 허용함');
			var i = this['_lodLevels'].length;
			while (i--) {
				if (this['_lodLevels'][i]['level'] == level) {
					this['_lodLevels'].splice(i, 1);
					break
				}
			}
		},
		/*DOC:
		 {
			 title :`localToWorld`,
			 code : 'METHOD',
			 description : `
				 로컬좌표를 RedWorld 좌표로 변경
			 `,
			  params : {
				 x : [
					 {type : 'Number' }
				 ],
				 y : [
					 {type : 'Number' }
				 ],
				 z : [
					 {type : 'Number' }
				 ]
			 },
			 example : `
                (RedBaseObject3D Instance).localToWorld(0,0,0); // 해당메쉬의 0,0,0을  RedWorld 상의 좌표로 반환
			 `,
			 return : 'Array'
		 }
		 :DOC*/
		localToWorld: (function () {
			var t0;
			t0 = mat4.create();
			return function (x, y, z) {
				typeof x == 'number' || RedGLUtil.throwFunc('RedBaseObject3D - localToWorld : x - number만 허용함', '입력값 : ', x);
				typeof y == 'number' || RedGLUtil.throwFunc('RedBaseObject3D - localToWorld : y - number만 허용함', '입력값 : ', y);
				typeof z == 'number' || RedGLUtil.throwFunc('RedBaseObject3D - localToWorld : z - number만 허용함', '입력값 : ', z);
				x = x || 0;
				y = y || 0;
				z = z || 0;
				mat4.identity(t0);
				mat4.translate(t0, t0, [x, y, z]);
				mat4.multiply(t0, this['matrix'], t0);
				return [
					t0[12],
					t0[13],
					t0[14]
				]
			}
		})(),
		/*DOC:
		 {
			 title :`worldToLocal`,
			 code : 'METHOD',
			 description : `
				 RedWorld 좌표를 로컬좌표로 변환
			 `,
			 params : {
				 x : [
					 {type : 'Number' }
				 ],
				 y : [
					 {type : 'Number' }
				 ],
				 z : [
					 {type : 'Number' }
				 ]
			 },
			 example : `
                (RedBaseObject3D Instance).worldToLocal(0,0,0); // RedWorld 상의 0,0,0을  로컬 좌표로 반환
			 `,
			 return : 'Array'
		 }
		 :DOC*/
		worldToLocal: (function () {
			var t0, t1;
			t0 = mat4.create();
			t1 = mat4.create();
			return function (x, y, z) {
				typeof x == 'number' || RedGLUtil.throwFunc('RedBaseObject3D - worldToLocal : x - number만 허용함', '입력값 : ', x);
				typeof y == 'number' || RedGLUtil.throwFunc('RedBaseObject3D - worldToLocal : y - number만 허용함', '입력값 : ', y);
				typeof z == 'number' || RedGLUtil.throwFunc('RedBaseObject3D - worldToLocal : z - number만 허용함', '입력값 : ', z);
				x = x || 0;
				y = y || 0;
				z = z || 0;
				mat4.translate(t0, t0, [x, y, z]);
				mat4.multiply(t1, t0, this['matrix']);
				return [
					t1[0] * x + t1[1] * y + t1[2] * z + t1[3],
					t1[4] * x + t1[5] * y + t1[6] * z + t1[7],
					t1[8] * x + t1[9] * y + t1[10] * z + t1[11]
				]
			}
		})(),
		/*DOC:
		 {
			 title :`getScreenPoint`,
			 code : 'METHOD',
			 description : `
				 객체의 중심 좌표를 스크린 좌표로 반환
			 `,
			 params : {
				 redView : [
					 {type : 'RedView' }
				 ]
			 },
			 example : `
                (RedBaseObject3D Instance).getScreenPoint( RedView Instance );
			 `,
			 return : 'Array'
		 }
		 :DOC*/
		getScreenPoint: (function () {
			var resultMTX = mat4.create();
			var tCamera, tViewRect;
			var resultPosition;
			resultPosition = {
				x: 0,
				y: 0,
				z: 0,
				w: 0
			};
			return function (redView) {
				mat4.identity(resultMTX);
				redView instanceof RedView || RedGLUtil.throwFunc('RedBaseObject3D - getScreenPoint : redView - RedView Instance 만 허용함', '입력값 : ', redView);
				tCamera = redView['camera'];
				tViewRect = redView['_viewRect'];
				if (tCamera instanceof RedBaseController) tCamera = tCamera.camera;
				mat4.multiply(resultMTX, tCamera.perspectiveMTX, tCamera.matrix);
				mat4.multiply(resultMTX, resultMTX, this['matrix']);
				resultPosition.x = resultMTX[12];
				resultPosition.y = resultMTX[13];
				resultPosition.z = resultMTX[14];
				resultPosition.w = resultMTX[15];
				resultPosition.x = resultPosition.x * 0.5 / resultPosition.w + 0.5;
				resultPosition.y = resultPosition.y * 0.5 / resultPosition.w + 0.5;
				return [
					(tViewRect[0] + resultPosition.x * tViewRect[2]) / window.devicePixelRatio,
					(tViewRect[1] + (1 - resultPosition.y) * tViewRect[3]) / window.devicePixelRatio
				]
			}
		})(),
		/*DOC:
		 {
			 title :`disposeAll`,
			 code : 'METHOD',
			 description : `
				 텍스쳐와 버퍼모두 dispose
			 `,
			 return : 'void'
		 }
		 :DOC*/
		disposeAll: function () {
			this.disposeAllTexture();
			this.disposeAllBuffer()
		},
		/*DOC:
		 {
			 title :`disposeAllTexture`,
			 code : 'METHOD',
			 description : `
				 텍스쳐 전체 dispose
			 `,
			 return : 'void'
		 }
		 :DOC*/
		disposeAllTexture: function () {
			if (this['material']) this['material']['disposeAllTexture']()
		},
		/*DOC:
		 {
			 title :`disposeTexture`,
			 code : 'METHOD',
			 description : `
				 텍스쳐 dispose
			 `,
			 params : {
				 key : [
					 {type : 'String' },
					 'ex) diffuseTexture'
				 ]
			 },
			 return : 'void'
		 }
		 :DOC*/
		disposeTexture: function (key) {
			if (this['material']) this['material']['disposeTexture'](key)
		},
		/*DOC:
		 {
			 title :`disposeAllBuffer`,
			 code : 'METHOD',
			 description : `
				 버퍼 전체 dispose
			 `,
			 return : 'void'
		 }
		 :DOC*/
		disposeAllBuffer: function () {
			if (this['geometry']) this['geometry']['disposeAllBuffer']()
		},
		/*DOC:
		 {
			 title :`disposeBuffer`,
			 code : 'METHOD',
			 description : `
				 텍스쳐 dispose,
                 'ex) indexBuffer'
			 `,
			 params : {
				 key : [
					 {type : 'String' }
				 ]
			 },
			 return : 'void'
		 }
		 :DOC*/
		disposeBuffer: function (key) {
			if (this['geometry']) this['geometry']['disposeBuffer'](key)
		}
	};
	/*DOC:
	 {
	     code : 'PROPERTY',
		 title :`x`,
		 description : `
		    x 좌표값
		    성능을 위해서 getter/setter 설정이 되어있지 않음
        `,
		 example : `
            (RedMesh Instance).x = 0;
         `,
		 return : 'Number'
	 }
	 :DOC*/
	/*DOC:
	 {
	     code : 'PROPERTY',
		 title :`y`,
		 description : `
		    y 좌표값
		    성능을 위해서 getter/setter 설정이 되어있지 않음
         `,
		 example : `
            (RedMesh Instance).y = 0;
         `,
		 return : 'Number'
	 }
	 :DOC*/
	/*DOC:
	 {
	     code : 'PROPERTY',
		 title :`z`,
		 description : `
		    z 좌표값
		    성능을 위해서 getter/setter 설정이 되어있지 않음
		 `,
		 example : `
            (RedMesh Instance).z = 0;
         `,
		 return : 'Number'
	 }
	 :DOC*/
	/*DOC:
	 {
	     code : 'PROPERTY',
		 title :`rotationX`,
		 description : `
		    rotationX 값
		    성능을 위해서 getter/setter 설정이 되어있지 않음
		 `,
		 example : `
            (RedMesh Instance).rotationX = 0;
         `,
		 return : 'Number'
	 }
	 :DOC*/
	/*DOC:
	 {
	     code : 'PROPERTY',
		 title :`rotationY`,
		 description : `
		    rotationY 값
		    성능을 위해서 getter/setter 설정이 되어있지 않음
         `,
		 example : `
            (RedMesh Instance).rotationY = 0;
         `,
		 return : 'Number'
	 }
	 :DOC*/
	/*DOC:
	 {
	     code : 'PROPERTY',
		 title :`rotationZ`,
		 description : `
		    rotationZ 값
		    성능을 위해서 getter/setter 설정이 되어있지 않음
		 `,
		 example : `
            (RedMesh Instance).rotationZ = 0;
         `,
		 return : 'Number'
	 }
	 :DOC*/
	/*DOC:
	 {
	     code : 'PROPERTY',
		 title :`scaleX`,
		 description : `
		    scaleX 값
		    성능을 위해서 getter/setter 설정이 되어있지 않음
		 `,
		 example : `
            (RedMesh Instance).scaleX = 0;
         `,
		 return : 'Number'
	 }
	 :DOC*/
	/*DOC:
	 {
	     code : 'PROPERTY',
		 title :`scaleY`,
		 description : `
		    scaleY 값
		    성능을 위해서 getter/setter 설정이 되어있지 않음
         `,
		 example : `
            (RedMesh Instance).scaleY = 0;
         `,
		 return : 'Number'
	 }
	 :DOC*/
	/*DOC:
	 {
	     code : 'PROPERTY',
		 title :`scaleZ`,
		 description : `
		    scaleZ 값
		    성능을 위해서 getter/setter 설정이 되어있지 않음
		 `,
		 example : `
            (RedMesh Instance).scaleZ = 0;
         `,
		 return : 'Number'
	 }
	 :DOC*/
	(function () {
		var getAABB, getOBB, getTransformVolume;
		getTransformVolume = function (mesh) {
			var minX, minY, minZ, maxX, maxY, maxZ, vx, vy, vz, t, i, len;
			var tx, ty, tz;
			var volume;
			var transform = mesh.matrix;
			var stride = mesh.geometry['interleaveBuffer']['stride'];
			// if (!volume[this]) {
			minX = minY = minZ = maxX = maxY = maxZ = 0;
			t = mesh.geometry['interleaveBuffer']['data'];
			i = 0;
			len = mesh.geometry['interleaveBuffer']['pointNum'];
			for (i; i < len; i++) {
				vx = i * stride , vy = vx + 1, vz = vx + 2;
				tx = transform[0] * t[vx] + transform[4] * t[vy] + transform[8] * t[vz];
				ty = transform[1] * t[vx] + transform[5] * t[vy] + transform[9] * t[vz];
				tz = transform[2] * t[vx] + transform[6] * t[vy] + transform[10] * t[vz];
				minX = tx < minX ? tx : minX;
				maxX = tx > maxX ? tx : maxX;
				minY = ty < minY ? ty : minY;
				maxY = ty > maxY ? ty : maxY;
				minZ = tz < minZ ? tz : minZ;
				maxZ = tz > maxZ ? tz : maxZ;
			}
			volume = [maxX - minX, maxY - minY, maxZ - minZ];
			volume.minX = minX;
			volume.maxX = maxX;
			volume.minY = minY;
			volume.maxY = maxY;
			volume.minZ = minZ;
			volume.maxZ = maxZ;
			return volume
		};
		getAABB = function (mesh) {
			var volume = getTransformVolume(mesh);
			var tMTX = mat4.create();
			mat4.translate(tMTX, tMTX, mesh.localToWorld(0, 0, 0));
			mat4.scale(tMTX, tMTX, volume);
			return {
				worldMatrix: tMTX,
				volume: volume
			}
		};
		getOBB = function (mesh) {
			var tVolume = mesh.geometry.volume;
			var tMTX = mat4.create();
			mat4.translate(tMTX, tMTX, mesh.localToWorld(0, 0, 0));
			mat4.rotateX(tMTX, tMTX, -mesh.rotationX * Math.PI / 180);
			mat4.rotateY(tMTX, tMTX, -mesh.rotationY * Math.PI / 180);
			mat4.rotateZ(tMTX, tMTX, -mesh.rotationZ * Math.PI / 180);
			mat4.scale(tMTX, tMTX, tVolume);
			mat4.scale(tMTX, tMTX, [mesh.scaleX, mesh.scaleY, mesh.scaleZ]);
			var volume = getTransformVolume(mesh);
			return {
				worldMatrix: tMTX,
				volume: volume
			}
		};
		RedBaseObject3D.prototype['volumeCalculateAABB'] = function () {
			return this['volumeInfo'] = getAABB(this)
		};
		RedBaseObject3D.prototype['volumeCalculateOBB'] = function () {
			return this['volumeInfo'] = getOBB(this)
		};
	})();
	/*DOC:
	 {
		 code:`PROPERTY`,
		 title :`lookAt`,
		 description : `
            lookAt
		 `,
		 params : {
			 x : [{type : "Number"}],
			 y : [{type : "Number"}],
			 z : [{type : "Number"}]
		 },
		 return : 'void'
	 }
	 :DOC*/
	RedBaseObject3D.prototype['lookAt'] = (function () {
		var up = new Float32Array([0, 1, 0]);
		var tPosition = [];
		var tRotation = []
		return function (x, y, z) {
			tPosition[0] = x;
			tPosition[1] = y;
			tPosition[2] = z;
			//out, eye, center, up
			mat4.identity(this['matrix']);
			mat4.targetTo(this['matrix'], [this.x, this.y, this.z], tPosition, up);
			tRotation = RedGLUtil.mat4ToEuler(this['matrix'], []);
			this.rotationX = -tRotation[0] * 180 / Math.PI;
			this.rotationY = -tRotation[1] * 180 / Math.PI;
			this.rotationZ = -tRotation[2] * 180 / Math.PI;
		}
	})();
	/*DOC:
	 {
			 title :`geometry`,
			 code : 'PROPERTY',
			 description : `
				 geometry
			 `,
			 return : 'RedGeometry Instance'
		 }
	 :DOC*/
	Object.defineProperty(RedBaseObject3D.prototype, 'geometry', {
		get: function () {
			return this['_geometry'];
		},
		set: function (v) {
			if (v && !(v instanceof RedGeometry)) RedGLUtil.throwFunc('geometry : RedGeometry Instance만 허용.', '입력값 : ' + v);
			this['_geometry'] = v
		}
	});
	/*DOC:
	 {
			 title :`material`,
			 code : 'PROPERTY',
			 description : `
				 material
			 `,
			 return : 'RedMaterial Instance'
		 }
	 :DOC*/
	Object.defineProperty(RedBaseObject3D.prototype, 'material', {
		get: function () {
			return this['_material'];
		},
		set: function (v) {
			if (v && !(v instanceof RedBaseMaterial)) RedGLUtil.throwFunc('material : RedBaseMaterial Instance만 허용.', '입력값 : ' + v);
			this['_material'] = v
		}
	});
	/*DOC:
	 {
	     code : 'PROPERTY',
		 title :`outlineColor`,
		 description : `기본값 : #ff0000`,
		 return : 'hex'
	 }
	 :DOC*/
	Object.defineProperty(RedBaseObject3D.prototype, 'outlineColor', {
		get: function () {
			return this['_outlineColorHex']
		},
		set: (function () {
			var t0;
			return function (hex) {
				this['_outlineColorHex'] = hex ? hex : '#ff0000';
				t0 = RedGLUtil.hexToRGB_ZeroToOne.call(this, this['_outlineColorHex']);
				this['_outlineColor'][0] = t0[0];
				this['_outlineColor'][1] = t0[1];
				this['_outlineColor'][2] = t0[2];
				this['_outlineColor'][3] = this['_outlineAlpha'];
			}
		})()
	});
	/*DOC:
	 {
	     code : 'PROPERTY',
		 title :`outlineAlpha`,
		 description : `
		    기본값 : 1
		    최소값 : 0
		    최대값 : 1
         `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedBaseObject3D', 'outlineAlpha', 'number', {
		'min': 0, 'max': 1,
		callback: function (v) {
			this['_outlineColor'][3] = this['_outlineAlpha'] = v
		}
	});
	Object.freeze(RedBaseObject3D);
})();
