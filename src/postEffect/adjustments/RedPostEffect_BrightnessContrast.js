"use strict";
var RedPostEffect_BrightnessContrast;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedPostEffectBrightnessContrastProgram';
    var checked;
    vSource = function () {
        /* @preserve
         void main(void) {
             vTexcoord = aTexcoord;
             gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
         }
         */
    }
    fSource = function () {
        /* @preserve
         precision mediump float;
         uniform sampler2D u_diffuseTexture;
         uniform float u_brightness_value;
         uniform float u_contrast_value;
         void main(void) {
             vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord );
             if (u_contrast_value > 0.0) finalColor.rgb = (finalColor.rgb - 0.5) / (1.0 - u_contrast_value) + 0.5;
             else finalColor.rgb = (finalColor.rgb - 0.5) * (1.0 + u_contrast_value) + 0.5;
             finalColor.rgb += u_brightness_value;
             gl_FragColor = finalColor;
         }
         */
    }
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedPostEffect_BrightnessContrast`,
		 description : `
			 BrightnessContrast 이펙트
			 postEffectManager.addEffect( effect Instance ) 로 추가.
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
		 demo : '../example/postEffect/adjustments/RedPostEffect_BrightnessContrast.html',
		 example : `
            var effect;
            effect = RedPostEffect_BrightnessContrast(RedGL Instance); // 포스트이펙트 생성
            // postEffectManager는 RedView 생성시 자동생성됨.
            (RedView Instance)['postEffectManager'].addEffect(effect); // 뷰에 이펙트 추가
		 `,
		 return : 'RedPostEffect_BrightnessContrast Instance'
	 }
     :DOC*/
    RedPostEffect_BrightnessContrast = function (redGL) {
        if (!(this instanceof RedPostEffect_BrightnessContrast)) return new RedPostEffect_BrightnessContrast(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_BrightnessContrast : RedGL Instance만 허용.', redGL);
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        this['brightness'] = 0;
        this['contrast'] = 0;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
        this['_UUID'] = RedGL.makeUUID();
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this);
    };
    RedPostEffect_BrightnessContrast.prototype = new RedBasePostEffect();
    RedPostEffect_BrightnessContrast.prototype['updateTexture'] = function (lastFrameBufferTexture) {
        this['diffuseTexture'] = lastFrameBufferTexture;
    };
    RedDefinePropertyInfo.definePrototype('RedPostEffect_BrightnessContrast', 'diffuseTexture', 'sampler2D');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`brightness`,
		 description : `
			 밝기
			 기본값 : 0
			 min : -150
			 max : 150
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPostEffect_BrightnessContrast', 'brightness', 'number', {
        min: -150, max: 150, callback: function (v) {
            this['_brightness_value'] = v / 255
        }
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`contrast`,
		 description : `
			 대조
			 기본값 : 0
			 min: -50
			 max: 100
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPostEffect_BrightnessContrast', 'contrast', 'number', {
        min: -50, max: 100, callback: function (v) {
            this['_contrast_value'] = v / 255
        }
    });
    Object.freeze(RedPostEffect_BrightnessContrast);
})();