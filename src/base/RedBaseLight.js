"use strict";
var RedBaseLight;
(function () {
    /**DOC:
        {
            constructorYn : true,
            title :`RedBaseLight`,
            description : `
                RedBaseLight 기저층
                프로토타입 확장을 통해서만 사용가능( RedGLUtil.copyProto 사용 )
                
            `,
            return : 'void'
        }
    :DOC*/
    RedBaseLight = function () {
        RedGLUtil.throwFunc('RedBaseLight : 생성자/직접실행으로 사용 할 수 없습니다.')
    }
    RedBaseLight.prototype = {
        addCasting: (function () {
            var t0;
            return function (v) {
                t0 = this['_castingList'].indexOf(v)
                if (t0 == -1) this['_castingList'].push(v)
            }
        })(),
        removeCasting: (function () {
            var t0;
            return function (v) {
                t0 = this['_castingList'].indexOf(v)
                if (t0 > -1) this['_castingList'].splice
            }
        })(),
        _castingList: [

        ],
        /**DOC:
            {
                code : 'METHOD',
                title :`setColor`,
                description : `
                    hex로 컬러값 설정
                `,
                parmas : {
                    hex : [{type:'hex'}],
                    alpha : [{type:'Number'}, '알파값']
                },
                return : 'void'
            }
        :DOC*/
        setColor: (function () {
            var t0;
            return function (hex, alpha) {
                hex = hex ? hex : '#fff';
                if (alpha == undefined) alpha = this['alpha'];
                if (alpha > 1) alpha = 1
                this['alpha'] = alpha;
                t0 = RedGLUtil.hexToRGB.call(this, hex);
                this['color'][0] = t0[0];
                this['color'][1] = t0[1];
                this['color'][2] = t0[2];
                this['color'][3] = this['alpha'];
            }
        })()
    }
    Object.freeze(RedBaseLight)
})();