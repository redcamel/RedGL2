"use strict";
var RedPostEffect_DoF;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedPostEffectDoFProgram';
    var checked;
    vSource = function () {
        /* @preserve
         void main(void) {
             vTexcoord = aTexcoord;
             gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
         }
         */
    };
    fSource = function () {
        /* @preserve
         precision mediump float;
         uniform sampler2D u_diffuseTexture;
         uniform sampler2D u_blurTexture;
         uniform sampler2D u_depthTexture;
         void main() {
             vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
             vec4 blurColor = texture2D(u_blurTexture, vTexcoord);
             vec4 depthColor = texture2D(u_depthTexture, vTexcoord);
             finalColor.rgb *= (depthColor.r);
             blurColor.rgb *= (1.0-depthColor.r);
             gl_FragColor =  (finalColor + blurColor) ;
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedPostEffect_DoF`,
		 description : `
			 피사계 심도 이펙트
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 extends : [
		    'RedBasePostEffect',
		    'RedBaseMaterial'
		 ],
		 demo : '../example/postEffect/dof/RedPostEffect_DoF.html',
		 example : `
            var effect;
            effect = RedPostEffect_DoF(RedGL Instance); // 포스트이펙트 생성
            // postEffectManager는 RedView 생성시 자동생성됨.
            (RedView Instance)['postEffectManager'].addEffect(effect); // 뷰에 이펙트 추가
		 `,
		 return : 'RedPostEffect_DoF Instance'
	 }
     :DOC*/
    RedPostEffect_DoF = function (redGL) {
        if (!(this instanceof RedPostEffect_DoF)) return new RedPostEffect_DoF(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_DoF : RedGL Instance만 허용.', redGL);
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        this['blurTexture'] = null;
        this['depthTexture'] = null;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['_subFrameBufferList'] = [
            {
                frameBuffer: RedFrameBuffer(redGL),
                renderMaterial: RedPostEffect_DoF_DepthMaterial(redGL),
                process: []
            }
        ];
        this['_process'] = [
            RedPostEffect_BlurX(redGL),
            RedPostEffect_BlurY(redGL)
        ];
        this['focusLength'] = 15;
        this['blur'] = 10;
        this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
        this['_UUID'] = RedGL.makeUUID();
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this);
    };
    RedPostEffect_DoF.prototype = new RedBasePostEffect();
    RedPostEffect_DoF.prototype['updateTexture'] = function (lastFrameBufferTexture, parentFrameBufferTexture) {
        this['diffuseTexture'] = parentFrameBufferTexture;
        this['blurTexture'] = lastFrameBufferTexture;
        this['depthTexture'] = this['_subFrameBufferList'][0]['frameBuffer']['texture']
    };
    RedDefinePropertyInfo.definePrototype('RedPostEffect_DoF', 'diffuseTexture', 'sampler2D');
    RedDefinePropertyInfo.definePrototype('RedPostEffect_DoF', 'blurTexture', 'sampler2D');
    RedDefinePropertyInfo.definePrototype('RedPostEffect_DoF', 'depthTexture', 'sampler2D');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`blur`,
		 description : `
			 blur
			 기본값 : 50
			 min : 0
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPostEffect_DoF', 'blur', 'number', {
        min: 0, callback: function (v) {
            this['_process'][0]['size'] = v;
            this['_process'][1]['size'] = v;
        }
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`focusLength`,
		 description : `
			 focusLength
			 기본값 : 15
		 `,
		 return : 'Number'
	 }
     :DOC*/
    Object.defineProperty(RedPostEffect_DoF.prototype, 'focusLength', (function () {
        return {
            get: function () {
                return this['_subFrameBufferList'][0]['renderMaterial']['focusLength']
            },
            set: function (v) {
                this['_subFrameBufferList'][0]['renderMaterial']['focusLength'] = v
            }
        }
    })());
    Object.freeze(RedPostEffect_DoF);
})();