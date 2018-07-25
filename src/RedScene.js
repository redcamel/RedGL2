"use strict";
var RedScene;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedScene`,
		 description : `RedScene Instance 생성자.`,
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
		if ( !(this instanceof RedScene) ) return new RedScene(redGL, backgroundColor);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedScene : RedGL Instance만 허용됩니다.', redGL);
		this['backgroundColor'] = backgroundColor ? backgroundColor : '#000000';
		this['useBackgroundColor'] = true;
		this['useFog'] = false;
		this['fogDensity'] = 0.5;
		this['fogDistance'] = 25;
		this['fogColor'] = '#ffffff';
		/**DOC:
		 {
			 title :`children`,
			 description : `자식 리스트`,
			 return : 'Array'
		 }
		 :DOC*/
		this['children'] = [];
		/**DOC:
		 {
			 title :`shadowManager`,
			 description : `
				 그림자 매니저.
				 RedScene Instance생성시 자동생성.
			 `,
			 return : 'Array'
		 }
		 :DOC*/
		this['shadowManager'] = RedShadowManager(redGL);
		this['_lightInfo'] = {
			RedAmbientLight: null,
			RedDirectionalLight: [],
			RedPointLight: []
		};
		this['_UUID'] = RedGL.makeUUID();
		console.log(this);
	};
	var prototypeData = {
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
			switch ( v['TYPE'] ) {
				case RedAmbientLight['TYPE']:
					this['_lightInfo'][v['TYPE']] = v;
					break;
				case RedDirectionalLight['TYPE']:
					if ( this['_lightInfo'][v['TYPE']].length == RedSystemShaderCode.MAX_DIRECTIONAL_LIGHT ) RedGLUtil.throwFunc('RedScene : RedDirectionalLight ' + RedSystemShaderCode.MAX_DIRECTIONAL_LIGHT + '개 까지 허용.');
					this['_lightInfo'][v['TYPE']].push(v);
					break;
				case RedPointLight['TYPE']:
					if ( this['_lightInfo'][v['TYPE']].length == RedSystemShaderCode.MAX_POINT_LIGHT ) RedGLUtil.throwFunc('RedScene : RedPointLight ' + RedSystemShaderCode.MAX_POINT_LIGHT + '개 까지 허용.');
					this['_lightInfo'][v['TYPE']].push(v);
					break;
				default:
					RedGLUtil.throwFunc('RedScene : RedBaseLight 인스턴스만 가능');
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
				switch ( v['TYPE'] ) {
					case RedAmbientLight['TYPE']:
						if ( this['_lightInfo'][v['TYPE']] == v ) this['_lightInfo'][v['TYPE']] = null;
						break;
					case RedDirectionalLight['TYPE']:
						tIndex = this['_lightInfo'][v['TYPE']].indexOf(v);
						if ( tIndex > -1 ) this['_lightInfo'][v['TYPE']].splice(tIndex, 1);
						break;
					case RedPointLight['TYPE']:
						tIndex = this['_lightInfo'][v['TYPE']].indexOf(v);
						if ( tIndex > -1 ) this['_lightInfo'][v['TYPE']].splice(tIndex, 1);
						break;
					default:
						RedGLUtil.throwFunc('RedScene : RedBaseLight 인스턴스만 가능')
				}
			}
		})()
	};
	RedScene.prototype = new RedBaseContainer();
	for ( var k in prototypeData ) RedScene.prototype[k] = prototypeData[k];
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
	RedDefinePropertyInfo.definePrototype('RedScene', 'backgroundColor', 'hex', {
		callback: (function () {
			var t0;
			return function () {
				t0 = RedGLUtil.hexToRGB_ZeroToOne.call(this, this['_backgroundColor']);
				this['_r'] = t0[0];
				this['_g'] = t0[1];
				this['_b'] = t0[2];
			}
		})()
	});
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
	RedDefinePropertyInfo.definePrototype('RedScene', 'useBackgroundColor', 'boolean', true);
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
	RedDefinePropertyInfo.definePrototype('RedScene', 'useFog', 'boolean', true);
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
	RedDefinePropertyInfo.definePrototype('RedScene', 'fogDensity', 'number', {'min': 0});
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
	RedDefinePropertyInfo.definePrototype('RedScene', 'fogDistance', 'number', {'min': 0});
	/**DOC:
	 {
		 title :`fogColor`,
		 description : `
			 초기값 '#ffffff
		 `,
		 return : 'hex'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedScene', 'fogColor', 'hex', {
		callback: (function () {
			var t0;
			return function () {
				t0 = RedGLUtil.hexToRGB_ZeroToOne.call(this, this['_fogColor']);
				this['_fogR'] = t0[0];
				this['_fogG'] = t0[1];
				this['_fogB'] = t0[2];
			}
		})()
	})
	/**DOC:
	 {
		 title :`skyBox`,
		 description : `
			 skyBox get/set
		 `,
		 return : 'RedSkyBox Instance'
	 }
	 :DOC*/
	Object.defineProperty(RedScene.prototype, 'skyBox', {
		get: function () { return this['_skyBoxMesh'] },
		set: function (v) {
			if ( v && !(v instanceof RedSkyBox) ) RedGLUtil.throwFunc('RedScene : RedSkyBox Instance만 허용됩니다.');
			this['_skyBoxMesh'] = v;
			return this['_skyBoxMesh']
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
	Object.defineProperty(RedScene.prototype, 'grid', {
		get: function () { return this['_gridMesh'] },
		set: function (v) {
			if ( v && !(v instanceof RedGrid) ) RedGLUtil.throwFunc('RedScene : RedGrid Instance만 허용됩니다.');
			this['_gridMesh'] = v;
			return this['_gridMesh'];
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
	Object.defineProperty(RedScene.prototype, 'axis', {
		get: function () { return this['_axisMesh'] },
		set: function (v) {
			if ( v && !(v instanceof RedAxis) ) RedGLUtil.throwFunc('RedScene : RedAxis Instance만 허용됩니다.');
			this['_axisMesh'] = v;
			return this['_axisMesh'];
		}
	});
	Object.freeze(RedScene);
})();
