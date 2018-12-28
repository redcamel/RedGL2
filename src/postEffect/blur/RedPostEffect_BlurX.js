"use strict";
var RedPostEffect_BlurX;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedPostEffectBlurXProgram';
    var checked;
    vSource = function () {
        /* @preserve
         void main(void) {
             vTexcoord = aTexcoord;
             vResolution = uResolution;
             gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
         }
         */
    };
    fSource = function () {
        /* @preserve
         precision mediump float;
         uniform sampler2D u_diffuseTexture;
         uniform float u_size;
         float random(vec3 scale, float seed) {
            return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
         }
         void main() {
             vec4 finalColor = vec4(0.0);
             vec2 delta;
             float total = 0.0;
             float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
             delta = vec2(u_size/vResolution.x,0.0);
             for (float t = -10.0; t <= 10.0; t++) {
                 float percent = (t + offset - 0.5) / 10.0;
                 float weight = 1.0 - abs(percent);
                 vec4 sample = texture2D(u_diffuseTexture, vTexcoord + delta * percent);
                 sample.rgb *= sample.a;
                 finalColor += sample * weight;
                 total += weight;
             }
             finalColor = finalColor / total;
             finalColor.rgb /= finalColor.a + 0.00001;
             gl_FragColor =  finalColor ;
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedPostEffect_BlurX`,
		 description : `
			 X축 블러 이펙트
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
		 demo : '../example/postEffect/blur/RedPostEffect_BlurX.html',
		 example : `
            var effect;
            effect = RedPostEffect_BlurX(RedGL Instance); // 포스트이펙트 생성
            // postEffectManager는 RedView 생성시 자동생성됨.
            (RedView Instance)['postEffectManager'].addEffect(effect); // 뷰에 이펙트 추가
		 `,
		 return : 'RedPostEffect_BlurX Instance'
	 }
     :DOC*/
    RedPostEffect_BlurX = function (redGL) {
        if (!(this instanceof RedPostEffect_BlurX)) return new RedPostEffect_BlurX(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_BlurX : RedGL Instance만 허용.', redGL);
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        this['size'] = 50;
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
    RedPostEffect_BlurX.prototype = new RedBasePostEffect();
    RedPostEffect_BlurX.prototype['updateTexture'] = function (lastFrameBufferTexture) {
        this['diffuseTexture'] = lastFrameBufferTexture;
    };
    RedDefinePropertyInfo.definePrototype('RedPostEffect_BlurX', 'diffuseTexture', 'sampler2D');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`size`,
		 description : `
			 블러 사이즈
			 기본값 : 50
			 min : 0
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPostEffect_BlurX', 'size', 'number', {'min': 0});
    Object.freeze(RedPostEffect_BlurX);
})();