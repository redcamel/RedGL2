"use strict";
var RedPostEffectManager;
(function () {
    /**DOC:
       {
           constructorYn : true,
           title :`RedPostEffectManager`,
           description : `
               RedPostEffectManager Instance 생성.
               RedScene 생성시 내부속성으로 자동생성됨.
           `,
           params : {
               redGL : [
                   {type:'RedGL'}
               ]
           },
           return : 'RedPostEffectManager Instance'
       }
   :DOC*/
    RedPostEffectManager = function (redGL) {
        if (!(this instanceof RedPostEffectManager)) return new RedPostEffectManager(redGL);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffectManager : RedGL Instance만 허용됩니다.', redGL)
        var tGL;
        var quad;
        tGL = redGL['gl'];
        /**DOC:
             {
                title :`frameBuffer`,
                code : 'PROPERTY', 
                description : `
                    이펙트 렌더링시 사용될 프레임버퍼
                `,
                return : 'RedFrameBuffer Instance'
            }
        :DOC*/
        this['frameBuffer'] = RedFrameBuffer(redGL);
        (function () {
            tGL.activeTexture(tGL.TEXTURE0 + 0)
            tGL.bindTexture(tGL.TEXTURE_2D, tGL.createTexture());
            // tGL.texImage2D(tGL.TEXTURE_2D, 0, tGL.RGBA, tGL.RGBA, tGL.UNSIGNED_BYTE, source)
            tGL.pixelStorei(tGL.UNPACK_FLIP_Y_WEBGL, true);
            tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_MIN_FILTER, tGL.NEAREST);
            tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_MAG_FILTER, tGL.NEAREST);
            tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_WRAP_S, tGL.CLAMP_TO_EDGE);
            tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_WRAP_T, tGL.CLAMP_TO_EDGE);
            try {
                tGL.generateMipmap(tGL.TEXTURE_2D)
            } catch (error) {
                console.log('밉맵을 생성할수 없음', source)
            }
            tGL.bindTexture(tGL.TEXTURE_2D, null);
        })();
        /**DOC:
             {
                title :`postEffectList`,
                code : 'PROPERTY', 
                description : `
                    이펙트 리스트
                `,
                return : 'Array'
            }
        :DOC*/
        this['postEffectList'] = [];
        /**DOC:
            {
               title :`antialiasing`,
               code : 'PROPERTY', 
               description : `
                   안티알리어싱 모드 설정
               `,
               return : 'Array'
           }
       :DOC*/
        Object.defineProperty(this, 'antialiasing', (function () {
            var _v = undefined
            return {
                get: function () {
                    return _v
                },
                set: function (v) {
                    _v = v
                }
            }
        })())
        this['antialiasing'] = undefined
        /**DOC:
            {
               title :`finalMaterial`,
               code : 'PROPERTY', 
               description : `
                   최종 프레임버퍼 렌더링을 담당할 재질.
               `,
               return : 'Array'
           }
       :DOC*/
        this['finalMaterial'] = RedBitmapMaterial(redGL, this['frameBuffer']['texture']);
        //
        this['children'] = [];
        quad = RedMesh(redGL, RedPlane(redGL), this['finalMaterial']);
        quad['useCullFace'] = false;
        this['children'].push(quad);
        //
        this['_UUID'] = RedGL['makeUUID']();
        console.log(this);
    }
    RedPostEffectManager.prototype = {
        /**DOC:
             {
                title :`addEffect`,
                code : 'METHOD', 
                description : `
                    postEffect 추가
                `,
                params : {
                    postEffect : [
                        {type:'RedGL'}
                    ]
                },
                return : 'void'
            }
        :DOC*/
        addEffect: function (postEffect) {
            this['postEffectList'].push(postEffect)
        },
        /**DOC:
             {
                title :`removeEffect`,
                code : 'METHOD', 
                description : `
                    postEffect 제거
                `,
                params : {
                    postEffect : [
                        {type:'RedGL'}
                    ]
                },
                return : 'void'
            }
        :DOC*/
        removeEffect: (function () {
            var t0;
            return function (postEffect) {
                t0 = this['postEffectList'].indexOf(postEffect);
                if (t0 != -1) this['postEffectList'].splice(t0, 1);
            }
        })(),
        /**DOC:
             {
                title :`bind`,
                code : 'METHOD', 
                description : `
                    프레임 버퍼 바인딩.
                    렌더러에서 자동호출됨.
                `,
                params : {
                    gl : [
                        {type:'WebGL Context'}
                    ]
                },
                return : 'void'
            }
        :DOC*/
        bind: function (gl) {
            this['frameBuffer'].bind(gl);
        },
        /**DOC:
             {
                title :`unbind`,
                code : 'METHOD', 
                description : `
                    프레임 버퍼 언바인딩.
                    렌더러에서 자동호출됨.
                `,
                params : {
                    gl : [
                        {type:'WebGL Context'}
                    ]
                },
                return : 'void'
            }
        :DOC*/
        unbind: function (gl) {
            this['frameBuffer'].unbind(gl);
        }
    }
    Object.freeze(RedPostEffectManager);
})();