"use strict";
var RedScene;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedScene`,
		 description : `
		    RedScene Instance 생성자.
		    장면 구성의 기본단위.
		    RedBaseObject3D 확장 객체등을 자식으로 입력하거나 fog 등을 설정 할 수 있다.
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
		 example : `
            var testScene;
            testScene = RedScene(RedGL Instance); // RedScene 생성 설정
            testScene.useBackgroundColor = true; // backgroundColor 사용여부 설정
            testScene.backgroundColor = '#fff; // backgroundColor (hex) 설정
            testScene.useFog = true; // fog 사용여부 설정
            testScene.fogDensity = 0.5; // fog 농도 설정
            testScene.fogDistance = 25; // fog 가시거리 설정
            testScene.fogColor = '#fff; // fog 컬러 설정
		 `,
		 demo : '../example/etc/RedScene.html',
		 extends : ['RedBaseContainer'],
		 return : 'RedScene Instance'
	 }
     :DOC*/
    RedScene = function (redGL, backgroundColor) {
        if (!(this instanceof RedScene)) return new RedScene(redGL, backgroundColor);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedScene : RedGL Instance만 허용.', redGL);
        this['backgroundColor'] = backgroundColor ? backgroundColor : '#000000';
        this['useBackgroundColor'] = true;
        this['useFog'] = false;
        this['fogDensity'] = 0.5;
        this['fogDistance'] = 25;
        this['fogColor'] = '#ffffff';
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`children`,
			 description : `자식 리스트`,
			 return : 'Array'
		 }
         :DOC*/
        this['children'] = [];
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`shadowManager`,
			 description : `
				 그림자 매니저.
				 RedScene Instance생성시 자동생성.
			 `,
			 return : 'RedShadowManager Instance'
		 }
         :DOC*/
        this['shadowManager'] = RedShadowManager(redGL);
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`mouseManager`,
			 description : `
				 마우스 이벤트 매니저.
				 RedScene Instance생성시 자동생성.
			 `,
			 return : 'RedMouseEventManager Instance'
		 }
         :DOC*/
        this['mouseManager'] = RedMouseEventManager(redGL);
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
				 RedBaseLight 확장객체만 등록가능. ( RedAmbientLight, RedDirectionalLight, RedPointLight ).
				 하드웨어 상황에 따른 라이트별 허용갯수까지만 등록가능.
				 RedSystemShaderCode.MAX_DIRECTIONAL_LIGHT
				 RedSystemShaderCode.MAX_POINT_LIGHT
			 `,
			 params : {
			    light : [
			        { type : 'RedBaseLight' }
			    ]
			 },
			 example : `
                var testScene;
                var testLight;
                testScene = RedScene(RedGL Instance); // RedScene 생성 설정
                testLight = RedDirectionalLight(RedGL Instance); // 라이트 생성
                testScene.addLight( testLight ); // 라이트 추가
             `,
			 return : 'void'
		 }
         :DOC*/
        addLight: function (light) {
            switch (light['TYPE']) {
                case RedAmbientLight['TYPE']:
                    this['_lightInfo'][light['TYPE']] = light;
                    break;
                case RedDirectionalLight['TYPE']:
                    if (this['_lightInfo'][light['TYPE']].length === RedSystemShaderCode.MAX_DIRECTIONAL_LIGHT) RedGLUtil.throwFunc('RedScene : RedDirectionalLight ' + RedSystemShaderCode.MAX_DIRECTIONAL_LIGHT + '개 까지 허용.');
                    this['_lightInfo'][light['TYPE']].push(light);
                    break;
                case RedPointLight['TYPE']:
                    if (this['_lightInfo'][light['TYPE']].length === RedSystemShaderCode.MAX_POINT_LIGHT) RedGLUtil.throwFunc('RedScene : RedPointLight ' + RedSystemShaderCode.MAX_POINT_LIGHT + '개 까지 허용.');
                    this['_lightInfo'][light['TYPE']].push(light);
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
				 RedBaseLight 확장객체만 등록가능. ( RedAmbientLight, RedDirectionalLight, RedPointLight )
			 `,
			 params : {
			    light : [
			        { type : 'RedBaseLight' }
			    ]
			 },
			 example : `
                var testScene;
                var testLight;
                testScene = RedScene(RedGL Instance); // RedScene 생성 설정
                testLight = RedDirectionalLight(RedGL Instance); // 라이트 생성
                testScene.addLight( testLight ); // 라이트 추가
                testScene.removeLight( testLight ); // 라이트 제거
             `,
			 return : 'void'
		 }
         :DOC*/
        removeLight: (function () {
            var tIndex;
            return function (light) {
                switch (light['TYPE']) {
                    case RedAmbientLight['TYPE']:
                        if (this['_lightInfo'][light['TYPE']] === light) this['_lightInfo'][light['TYPE']] = null;
                        break;
                    case RedDirectionalLight['TYPE']:
                        tIndex = this['_lightInfo'][light['TYPE']].indexOf(light);
                        if (tIndex > -1) this['_lightInfo'][light['TYPE']].splice(tIndex, 1);
                        break;
                    case RedPointLight['TYPE']:
                        tIndex = this['_lightInfo'][light['TYPE']].indexOf(light);
                        if (tIndex > -1) this['_lightInfo'][light['TYPE']].splice(tIndex, 1);
                        break;
                    default:
                        RedGLUtil.throwFunc('RedScene : RedBaseLight 인스턴스만 가능')
                }
            }
        })(),
        /**DOC:
         {
			 title :`removeLightAll`,
			 code : 'METHOD',
			 description : `
				 전체 라이트 제거 매서드.
			 `,
			 example : `
                var testScene;
                var testLight;
                testScene = RedScene(RedGL Instance); // RedScene 생성 설정
                testScene.addLight( RedAmbientLight(RedGL Instance); ); // 라이트 추가
                testScene.addLight( RedDirectionalLight(RedGL Instance); ); // 라이트 추가
                testScene.addLight( RedPointLight(RedGL Instance); ); // 라이트 추가
                testScene.removeLightAll(); // 라이트 제거
             `,
			 return : 'void'
		 }
         :DOC*/
        removeLightAll: function () {
            this['_lightInfo'][RedAmbientLight['TYPE']] = null;
            this['_lightInfo'][RedDirectionalLight['TYPE']].length = 0;
            this['_lightInfo'][RedPointLight['TYPE']].length = 0;
        }
    };
    RedScene.prototype = new RedBaseContainer();
    for (var k in prototypeData) RedScene.prototype[k] = prototypeData[k];
    /**DOC:
     {
		 code : 'PROPERTY',
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
		 example : `
            var testScene;
            testScene = RedScene(RedGL Instance); // RedScene 생성
            testScene.backgroundColor = '#fff';
         `,
		 return : 'hex'
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
	     code : 'PROPERTY',
		 title :`useBackgroundColor`,
		 description : `
			 backgroundColor 사용여부.
			 초기값 : true
		 `,
		 example : `
            var testScene;
            testScene = RedScene(RedGL Instance); // RedScene 생성
            testScene.useBackgroundColor = true;
         `,
		 return : 'Boolean'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedScene', 'useBackgroundColor', 'boolean');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`useFog`,
		 description : `
			 fog 사용여부
			 초기값 : true
		 `,
		 example : `
            var testScene;
            testScene = RedScene(RedGL Instance); // RedScene 생성
            testScene.fog = true;
         `,
		 return : 'Boolean'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedScene', 'useFog', 'boolean');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`fogDensity`,
		 description : `
			 fog 농도.
			 초기값 : 0.5
		 `,
		 example : `
            var testScene;
            testScene = RedScene(RedGL Instance); // RedScene 생성
            testScene.fogDensity = 0.5;
         `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedScene', 'fogDensity', 'number', {'min': 0});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`fogDistance`,
		 description : `
			 fog 가시거리.
			 초기값 : 25.0
		 `,
		 example : `
            var testScene;
            testScene = RedScene(RedGL Instance); // RedScene 생성
            testScene.fogDistance = 50;
         `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedScene', 'fogDistance', 'number', {'min': 0});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`fogColor`,
		 description : `
		     fog 컬러값.
			 초기값 : #ffffff
		 `,
		 example : `
            var testScene;
            testScene = RedScene(RedGL Instance); // RedScene 생성
            testScene.fogColor = '#ffffff';
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
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`skyBox`,
		 description : `
			 skyBox get/set
		 `,
         example : `
            var testScene;
            var testSkyBox;
            testScene = RedScene(RedGL Instance); // RedScene 생성 설정
            testSkyBox = RedSkyBox(RedGL Instance, srcList); // skyBox 생성
            testScene.skyBox = testSkyBox; // skyBox 추가
         `,
		 return : 'RedSkyBox Instance'
	 }
     :DOC*/
    Object.defineProperty(RedScene.prototype, 'skyBox', {
        get: function () {
            return this['_skyBoxMesh']
        },
        set: function (v) {
            if (v && !(v instanceof RedSkyBox)) RedGLUtil.throwFunc('RedScene : RedSkyBox Instance만 허용.');
            this['_skyBoxMesh'] = v;
            return this['_skyBoxMesh']
        }
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`grid`,
		 description : `
			 그리드 get/set
		 `,
         example : `
            var testScene;
            var testGrid;
            testScene = RedScene(RedGL Instance); // RedScene 생성 설정
            testGrid = RedGrid(RedGL Instance); // 그리드 생성
            testScene.grid = testGrid; // 그리드 설정
         `,
		 return : 'RedGrid Instance'
	 }
     :DOC*/
    Object.defineProperty(RedScene.prototype, 'grid', {
        get: function () {
            return this['_gridMesh']
        },
        set: function (v) {
            if (v && !(v instanceof RedGrid)) RedGLUtil.throwFunc('RedScene : RedGrid Instance만 허용.');
            this['_gridMesh'] = v;
            return this['_gridMesh'];
        }
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`axis`,
		 description : `
			 axis get/set
		 `,
         example : `
            var testScene;
            var testAxis;
            testScene = RedScene(RedGL Instance); // RedScene 생성 설정
            testAxis = RedAxis(RedGL Instance); // axis 생성
            testScene.axis = testAxis; // axis 설정
         `,
		 return : 'RedAxis Instance'
	 }
     :DOC*/
    Object.defineProperty(RedScene.prototype, 'axis', {
        get: function () {
            return this['_axisMesh']
        },
        set: function (v) {
            if (v && !(v instanceof RedAxis)) RedGLUtil.throwFunc('RedScene : RedAxis Instance만 허용.');
            this['_axisMesh'] = v;
            return this['_axisMesh'];
        }
    });
    Object.freeze(RedScene);
})();
