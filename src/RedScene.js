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
        return : 'RedScene Instance'
    }
	:DOC*/
    RedScene = function (redGL, backgroundColor) {
        if (!(this instanceof RedScene)) return new RedScene(redGL, backgroundColor);
        var _skyBox, _grid, _axis;
        this['r'] = 0
        this['g'] = 0
        this['b'] = 0
        this.setBackgroundColor(backgroundColor ? backgroundColor : '#000')
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
        this['fogDistance'] = 25.0
        Object.defineProperty(this, 'fogColor', (function () {
            var v = [1, 1, 1, 1]
            var t0;
            return {
                get: function () {
                    return v
                },
                set: function (hex) {
                    hex = hex ? hex : '#fff';
                    t0 = RedGLUtil.hexToRGB.call(this, hex);
                    v[0] = t0[0];
                    v[1] = t0[1];
                    v[2] = t0[2];
                }
            }
        })());
        this['fogColor'] = '#fff'
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
                return : 'RedSkyBox'
            }
        :DOC*/
        Object.defineProperty(this, 'skyBox', {
            get: function () { return _skyBox },
            set: function (v) {
                if (!(v instanceof RedSkyBox) && v) RedGLUtil.throwFunc('RedScene : RedSkyBox Instance만 허용됩니다.')
                _skyBox = v;
                return _skyBox
            }
        });
        /**DOC:
            {
                title :`grid`,
                description : `
                    grid get/set
                `,
                return : 'RedGrid'
            }
        :DOC*/
        Object.defineProperty(this, 'grid', {
            get: function () { return _grid },
            set: function (v) {
                if (!(v instanceof RedGrid) && v) RedGLUtil.throwFunc('RedScene : RedGrid Instance만 허용됩니다.')
                _grid = v;
                return _grid
            }
        });
        /**DOC:
            {
                title :`axis`,
                description : `
                    axis get/set
                `,
                return : 'RedAxis'
            }
        :DOC*/
        Object.defineProperty(this, 'axis', {
            get: function () { return _axis },
            set: function (v) {
                if (!(v instanceof RedAxis) && v) RedGLUtil.throwFunc('RedScene : RedAxis Instance만 허용됩니다.')
                _axis = v;
                return _axis
            }
        })
        this['postEffectManager'] = RedPostEffectManager(redGL)
        this['_lightInfo'] = {
            RedAmbientLight: null,
            RedDirectionalLight: [],
            RedPointLight: []
        };
        this['_UUID'] = RedGL['makeUUID']();
        // Object.seal(this)
    };
    RedScene.prototype = {
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
            switch (v['type']) {
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
                    RedGLUtil.throwFunc('RedBaseLight 확장객체만 가능')
            }

        },
        removeLight: function () {

        }
    };
    /**DOC:
        {
            code : 'METHOD',
            title :`setBackgroundColor`,
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
            example : `// TODO:`,
            return : 'void'
        }
    :DOC*/
    RedScene.prototype['setBackgroundColor'] = (function () {
        var t0;
        return function (hex) {
            hex = hex ? hex : '#000';
            t0 = RedGLUtil.hexToRGB.call(this, hex);
            this['r'] = t0[0];
            this['g'] = t0[1];
            this['b'] = t0[2];
        }
    })();
    /**DOC:
        {
            extendDoc : 'RedBaseContainer'
        }
    :DOC*/
    RedGLUtil['copyProto'](RedScene, RedBaseContainer)
    Object.freeze(RedScene);
})();
