"use strict";
var RedScene;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedScene`,
		 description : `
			 RedScene Instance 생성자.
		 `,
		 params : {
			 redGL : [
				 {type: 'RedGL Instance'}
			 ],
			 backgroundColor : [
				 {type: 'hex'},
				 '초기값 #000000'
			 ]
		 },
		 return : 'RedScene Instance'
	 }
	 :DOC*/
	RedScene = function (redGL, backgroundColor) {
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedScene : RedGL Instance만 허용됩니다.', redGL);
		if ( !(this instanceof RedScene) ) return new RedScene(redGL, backgroundColor);
		var _skyBoxMesh, _gridMesh, _axisMesh;
		/**DOC:
		 {
			 code : 'property',
			 title :`backgroundColor`,
			 description : `
				 배경 컬러설정.
				 알파설정은 불가능
			 `,
			 params : {
				 hex : [
					 {type: 'hex'},
					 'ex) #fff, #ffffff'
				 ]
			 },
			 return : 'void'
		 }
		 :DOC*/
		Object.defineProperty(this, 'backgroundColor', (function () {
			var _v = '#000000'
			var t0;
			return {
				get: function () {
					return _v
				},
				set: function (hex) {
					_v = hex ? hex : '#000000';
					if ( typeof _v != 'string' ) RedGLUtil.throwFunc('RedScene : backgroundColor hex 문자열만 허용함', '입력값 : ' + _v)
					if ( !RedGLUtil.regHex(_v) ) RedGLUtil.throwFunc('RedScene : backgroundColor hex 형식을 사용해야함', '입력값 : ' + _v)
					t0 = RedGLUtil.hexToRGB.call(this, _v);
					this['_r'] = t0[0];
					this['_g'] = t0[1];
					this['_b'] = t0[2];
				}
			}
		})());
		this['backgroundColor'] = backgroundColor ? backgroundColor : '#000000';
		/**DOC:
		 {
			 title :`useBackgroundColor`,
			 description : `
				 배경색 사용여부.
				 초기값 true
			 `,
			 return : 'Boolean'
		 }
		 :DOC*/
		this['useBackgroundColor'] = true
		/**DOC:
		 {
			 title :`useFog`,
			 description : `
				 안개 사용여부
				 초기값 true
			 `,
			 return : 'Boolean'
		 }
		 :DOC*/
		this['useFog'] = false
		/**DOC:
		 {
			 title :`fogDensity`,
			 description : `
				 안개농도
				 초기값 0.5
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['fogDensity'] = 0.5
		/**DOC:
		 {
			 title :`fogDistance`,
			 description : `
				 가시거리
				 초기값 25.0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['fogDistance'] = 25
		/**DOC:
		 {
			 title :`fogColor`,
			 description : `
				 초기값 '#ffffff
			 `,
			 return : 'hex'
		 }
		 :DOC*/
		Object.defineProperty(this, 'fogColor', (function () {
			var _v = '#ffffff'
			var t0;
			return {
				get: function () { return _v },
				set: function (hex) {
					_v = hex ? hex : '#ffffff';
					if ( typeof _v != 'string' ) RedGLUtil.throwFunc('RedScene : fogColor hex 문자열만 허용함', '입력값 : ' + _v)
					if ( !RedGLUtil.regHex(_v) ) RedGLUtil.throwFunc('RedScene : fogColor hex 형식을 사용해야함', '입력값 : ' + _v)
					t0 = RedGLUtil.hexToRGB.call(this, _v);
					this['_fogR'] = t0[0];
					this['_fogG'] = t0[1];
					this['_fogB'] = t0[2];
				}
			}
		})());
		this['fogColor'] = '#ffffff';
		/**DOC:
		 {
			 title :`children`,
			 description : `
				 자식 리스트
			 `,
			 return : 'Array'
		 }
		 :DOC*/
		this['children'] = []
		/**DOC:
		 {
			 title :`skyBox`,
			 description : `
				 skyBox get/set
			 `,
			 return : 'RedSkyBox Instance'
		 }
		 :DOC*/
		Object.defineProperty(this, 'skyBox', {
			get: function () { return _skyBoxMesh },
			set: function (v) {
				if ( !(v instanceof RedSkyBox) && v ) RedGLUtil.throwFunc('RedScene : RedSkyBox Instance만 허용됩니다.')
				_skyBoxMesh = v;
				return _skyBoxMesh
			}
		});
		/**DOC:
		 {
			 title :`grid`,
			 description : `
				 grid get/set
			 `,
			 return : 'RedGrid Instance'
		 }
		 :DOC*/
		Object.defineProperty(this, 'grid', {
			get: function () { return _gridMesh },
			set: function (v) {
				if ( !(v instanceof RedGrid) && v ) RedGLUtil.throwFunc('RedScene : RedGrid Instance만 허용됩니다.')
				_gridMesh = v;
				return _gridMesh
			}
		});
		/**DOC:
		 {
			 title :`axis`,
			 description : `
				 axis get/set
			 `,
			 return : 'RedAxis Instance'
		 }
		 :DOC*/
		Object.defineProperty(this, 'axis', {
			get: function () { return _axisMesh },
			set: function (v) {
				if ( !(v instanceof RedAxis) && v ) RedGLUtil.throwFunc('RedScene : RedAxis Instance만 허용됩니다.')
				_axisMesh = v;
				return _axisMesh
			}
		})
		/**DOC:
		 {
			 title :`postEffectManager`,
			 description : `
				 postEffectManager
			 `,
			 return : 'RedPostEffectManager Instance'
		 }
		 :DOC*/
		this['postEffectManager'] = RedPostEffectManager(redGL)
		this['shadowManager'] = RedShadowManager(redGL)
		this['_lightInfo'] = {
			RedAmbientLight: null,
			RedDirectionalLight: [],
			RedPointLight: []
		};
		this['_UUID'] = RedGL['makeUUID']();
		console.log(this)
	};
	var prototypeData = {
		_r: 0,
		_g: 0,
		_b: 0,
		_fogR: 1,
		_fogG: 1,
		_fogB: 1,
		/**DOC:
		 {
			 title :`addLight`,
			 code : 'METHOD',
			 description : `
				 라이트 추가 매서드.
				 RedBaseLight 확장객체만 등록가능.
			 `,
			 return : 'void'
		 }
		 :DOC*/
		addLight: function (v) {
			switch ( v['type'] ) {
				//TODO: 맥스제한을 어떻게 줄지 결정해야함
				case RedAmbientLight['type']:
					this['_lightInfo'][v['type']] = v
					break
				case RedDirectionalLight['type']:
					this['_lightInfo'][v['type']].push(v)
					break
				case RedPointLight['type']:
					this['_lightInfo'][v['type']].push(v)
					break
				default:
					RedGLUtil.throwFunc('RedScene : RedAmbientLight,RedDirectionalLight,RedPointLight 인스턴스만 가능')
			}
		},
		/**DOC:
		 {
			 title :`removeLight`,
			 code : 'METHOD',
			 description : `
				 라이트 제거 매서드.
				 RedBaseLight 확장객체만 사용가능.
			 `,
			 return : 'void'
		 }
		 :DOC*/
		removeLight: (function () {
			var tIndex;
			return function (v) {
				//TODO:검증해야함
				switch ( v['type'] ) {
					case RedAmbientLight['type']:
						if ( this['_lightInfo'][v['type']] == v ) this['_lightInfo'][v['type']] = null
						break
					case RedDirectionalLight['type']:
						tIndex = this['_lightInfo'][v['type']].indexOf(v)
						if ( tIndex > -1 ) this['_lightInfo'][v['type']].splice(tIndex, 1)
						break
					case RedPointLight['type']:
						tIndex = this['_lightInfo'][v['type']].indexOf(v)
						if ( tIndex > -1 ) this['_lightInfo'][v['type']].splice(tIndex, 1)
						break
					default:
						RedGLUtil.throwFunc('RedScene : RedAmbientLight,RedDirectionalLight,RedPointLight 인스턴스만 가능')
				}
			}
		})()
	};
	RedScene.prototype = new RedBaseContainer();
	for ( var k in prototypeData ) RedScene.prototype[k] = prototypeData[k];
	RedDefinePropertyInfo.definePrototype('RedScene', 'fogDensity', 'number', {'min': 0});
	RedDefinePropertyInfo.definePrototype('RedScene', 'fogDistance', 'number', {'min': 0})
	Object.freeze(RedScene);
})();
