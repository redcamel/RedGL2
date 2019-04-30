/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
var RedPostEffect_BloomThreshold;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME;
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
         precision highp float;
         uniform sampler2D u_diffuseTexture;
         uniform float u_threshold_value;

         void main() {
             vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
             if(0.2126 * finalColor.r + 0.7152 * finalColor.g + 0.0722 * finalColor.b < u_threshold_value)  finalColor.r = finalColor.g = finalColor.b = 0.0;
             gl_FragColor = finalColor;
         }
         */
    };
    PROGRAM_NAME = 'RedPostEffectBloomThresholdProgram';
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedPostEffect_BloomThreshold`,
		 description : `
			 BloomThreshold 이펙트
			 RedPostEffect_Bloom 내부에서 사용하는 절차 이펙트
			 시스템적으로 사용됨.
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
		 example : `
            var effect;
            effect = RedPostEffect_BloomThreshold(RedGL Instance); // 포스트이펙트 생성
            // postEffectManager는 RedView 생성시 자동생성됨.
            (RedView Instance)['postEffectManager'].addEffect(effect); // 뷰에 이펙트 추가
		 `,
		 return : 'RedPostEffect_BloomThreshold Instance'
	 }
     :DOC*/
    RedPostEffect_BloomThreshold = function (redGL) {
        if (!(this instanceof RedPostEffect_BloomThreshold)) return new RedPostEffect_BloomThreshold(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_BloomThreshold : RedGL Instance만 허용.', redGL);
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        this['threshold'] = 128;
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
    RedPostEffect_BloomThreshold.prototype = new RedBasePostEffect();
    RedPostEffect_BloomThreshold.prototype['updateTexture'] = function (lastFrameBufferTexture) {
        this['diffuseTexture'] = lastFrameBufferTexture;
    };
    RedDefinePropertyInfo.definePrototype('RedPostEffect_BloomThreshold', 'diffuseTexture', 'sampler2D');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`threshold`,
		 description : `
			 최소 유효값
			 기본값 : 128
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPostEffect_BloomThreshold', 'threshold', 'number', {
        min: 0, max: 255, callback: function (v) {
            this['_threshold_value'] = v / 255
        }
    });
    Object.freeze(RedPostEffect_BloomThreshold);
})();