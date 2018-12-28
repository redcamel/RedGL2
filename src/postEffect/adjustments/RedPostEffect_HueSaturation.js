"use strict";
var RedPostEffect_HueSaturation;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedPostEffectHueSaturationProgram';
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
         uniform float u_hue_value;
         uniform float u_saturation_value;
         void main(void) {
             vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord );
             float angle = u_hue_value * 3.1415926535897932384626433832795;
             float s = sin(angle), c = cos(angle);
             vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;
             float len = length(finalColor.rgb);

             finalColor.rgb = vec3(
                 dot(finalColor.rgb, weights.xyz),
                 dot(finalColor.rgb, weights.zxy),
                 dot(finalColor.rgb, weights.yzx)
             );

             float average = (finalColor.r + finalColor.g + finalColor.b) / 3.0;
             if (u_saturation_value > 0.0) finalColor.rgb += (average - finalColor.rgb) * (1.0 - 1.0 / (1.001 - u_saturation_value));
             else finalColor.rgb += (average - finalColor.rgb) * (-u_saturation_value);
             gl_FragColor = finalColor;
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedPostEffect_HueSaturation`,
		 description : `
			 HueSaturation 이펙트
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
		 demo : '../example/postEffect/adjustments/RedPostEffect_HueSaturation.html',
		 example : `
            var effect;
            effect = RedPostEffect_HueSaturation(RedGL Instance); // 포스트이펙트 생성
            // postEffectManager는 RedView 생성시 자동생성됨.
            (RedView Instance)['postEffectManager'].addEffect(effect); // 뷰에 이펙트 추가
		 `,
		 return : 'RedPostEffect_HueSaturation Instance'
	 }
     :DOC*/
    RedPostEffect_HueSaturation = function (redGL) {
        if (!(this instanceof RedPostEffect_HueSaturation)) return new RedPostEffect_HueSaturation(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_HueSaturation : RedGL Instance만 허용.', redGL);
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        this['hue'] = 0;
        this['saturation'] = 0;
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
    RedPostEffect_HueSaturation.prototype = new RedBasePostEffect();
    RedPostEffect_HueSaturation.prototype['updateTexture'] = function (lastFrameBufferTexture) {
        this['diffuseTexture'] = lastFrameBufferTexture;
    };
    RedDefinePropertyInfo.definePrototype('RedPostEffect_HueSaturation', 'diffuseTexture', 'sampler2D');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`hue`,
		 description : `
			 색조
			 기본값 : 0
			 min: -180
			 max: 180
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPostEffect_HueSaturation', 'hue', 'number', {
        min: -180, max: 180, callback: function (v) {
            this['_hue_value'] = v / 180
        }
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`saturation`,
		 description : `
			 채도
			 기본값 : 0
			 min: -100
			 max: 100
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPostEffect_HueSaturation', 'saturation', 'number', {
        min: -100, max: 100, callback: function (v) {
            this['_saturation_value'] = v / 100
        }
    });
    Object.freeze(RedPostEffect_HueSaturation);
})();