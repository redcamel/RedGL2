"use strict";
var RedGLUtil;
(function () {
    /**DOC:
        {
            constructorYn : true,
            title :`RedGLUtil`,
            description : `
                이것저것모음
            `,
            return : 'void'
        }
    :DOC*/
    RedGLUtil = {
        /**DOC:
            {
                constructorYn : true,
                title :`RedGLUtil.throwFunc`,
                description : `
                    에러생성기
                `,
                return : 'void'
            }
        :DOC*/
        throwFunc: function () { throw Array.prototype.slice.call(arguments).join(' ') },
        /**DOC:
            {
                constructorYn : true,
                title :`RedGLUtil.extendsProto`,
                description : `
                    프로토타입 내용을 복사
                `,
                params : {
                    target : [
                        {type : 'Object'},
                        '확장할 대상'
                    ],
                    from : [
                        {type : 'Object'},
                        '가져올 대상'
                    ]
                },
                example : `
                    var a = function(){};
                    var b = function(){};
                    a.prototype.test = function(){
                        console.log('test')
                    };
                    RedGLUtil.extendsProto(b,a);
                    (new b()).test(); // test
                `,
                return : 'void'
            }
        :DOC*/
        extendsProto: function (target, from) {
            for (var k in from.prototype) target.prototype[k] = from.prototype[k]//,console.log(k)
        },
        /**DOC:
            {
                constructorYn : true,
                title :`RedGLUtil.hexToRGB`,
                description : `
                    hex값을 RGB로 변환
                `,
                params : {
                    hex : [
                        {type : 'hex'}
                    ]
                },
                example : `
                    RedGLUtil.hexToRGB('#fff') // [1,1,1]
                `,
                return : 'Array'
            }
        :DOC*/
        hexToRGB: function (hex) {
            var t0, t1;
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                t1 = [];
                t0 = hex.substring(1).split('');
                if (t0.length == 3) t0 = [t0[0], t0[0], t0[1], t0[1], t0[2], t0[2]];
                t0 = '0x' + t0.join('');
                t1[0] = ((t0 >> 16) & 255) / 255;
                t1[1] = ((t0 >> 8) & 255) / 255;
                t1[2] = (t0 & 255) / 255;
                return t1
            } else RedGLUtil.throwFunc('RedGLUtil.hexToRGB : 잘못된 hex값입니다.', hex)
        },
        /**DOC:
            {
                constructorYn : true,
                title :`RedGLUtil.getStrFromComment`,
                description : `
                문자열중 멀티 라인 코멘트 사이값을 반환함.
                프로그램 생성기에서 사용
                `,
                params : {
                    source : [
                        {type : 'String'}
                    ]
                },
                return : 'String'
            }
        :DOC*/
        getStrFromComment: (function () {
            var t0;
            return function (source) {
                if (typeof source != 'string') RedGLUtil.throwFunc('getStrFromComment : 해석할 값은 문자열만 가능', source)
                t0 = source.toString().trim().match(/(\/\*)[\s\S]+(\*\/)/g)
                if (t0) return t0[0].replace(/\/\*|\*\//g, '').trim();
                else RedGLUtil.throwFunc('getStrFromComment : 해석할 불가능한 값', source)
            }
        })()
    };
    Object.freeze(RedGLUtil);
})();