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
    RedScene = function (backgroundColor) {
        if (!(this instanceof RedScene)) return new RedScene(backgroundColor);
        var _skyBox, _grid, _axis;
        this['r'] = 0
        this['g'] = 0
        this['b'] = 0
        this.setBackgroundColor(backgroundColor ? backgroundColor : '#000')
        /**DOC:
            {
                title :`useBackgroundColor`,
                description : `
                    배경색 사용여부
                `,
                return : 'Boolean'
            }
        :DOC*/
        this['useBackgroundColor'] = true
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
        this['lightInfo'] = {
            RedAmbientLight: null,
            RedDirectionalLight: [],
            RedOmniLight: []
        };

        
        Object.defineProperty(this, 'skyBox', {
            get: function () { return _skyBox },
            set: function (v) {
                if (!(v instanceof RedSkyBox)) RedGLUtil.throwFunc('RedScene : RedSkyBox Instance만 허용됩니다.')
                _skyBox = v;
                return _skyBox
            }
        });
        Object.defineProperty(this, 'grid', {
            get: function () { return _grid },
            set: function (v) {
                if (!(v instanceof RedGrid)) RedGLUtil.throwFunc('RedScene : RedGrid Instance만 허용됩니다.')
                _grid = v;
                return _grid
            }
        });
        Object.defineProperty(this, 'axis', {
            get: function () { return _axis },
            set: function (v) {
                if (!(v instanceof RedAxis)) RedGLUtil.throwFunc('RedScene : RedAxis Instance만 허용됩니다.')
                _axis = v;
                return _axis
            }
        })
        this['_UUID'] = RedGL['makeUUID']();
        // Object.seal(this)
    };
    RedScene.prototype = {
        addLight: function (v) {
            switch (v['type']) {
                case RedAmbientLight['type']:
                    this['lightInfo'][v['type']] = v
                    break
                case RedDirectionalLight['type']:
                    this['lightInfo'][v['type']].push(v)
                    break
                case RedOmniLight['type']:
                    this['lightInfo'][v['type']].push(v)
                    break
                default:
                    RedGLUtil.throwFunc('RedBaseLight 확장객체만 가능')
            }

        },
        setSkyBox: function (v) {
            this['skyBox'] = v
        },
        removeLight: function () {

        }
    };
    /**DOC:
        {
            code : 'FUNCTION',
            title :`setBackgroundColor`,
            description : `
                배경 컬러설정
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
    RedGLUtil['extendsProto'](RedScene, RedBaseContainer)
    Object.freeze(RedScene);
})();
