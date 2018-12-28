"use strict";
var RedPostEffect_Invert;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedPostEffectInvertProgram';
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

         void main(void) {
             vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
             finalColor.r = 1.0 - finalColor.r;
             finalColor.g = 1.0 - finalColor.g;
             finalColor.b = 1.0 - finalColor.b;
             gl_FragColor = finalColor;
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedPostEffect_Invert`,
		 description : `
			 Invert 이펙트
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
		 demo : '../example/postEffect/adjustments/RedPostEffect_Invert.html',
		 example : `
            var effect;
            effect = RedPostEffect_Invert(RedGL Instance); // 포스트이펙트 생성
            // postEffectManager는 RedView 생성시 자동생성됨.
            (RedView Instance)['postEffectManager'].addEffect(effect); // 뷰에 이펙트 추가
		 `,
		 return : 'RedPostEffect_Invert Instance'
	 }
     :DOC*/
    RedPostEffect_Invert = function (redGL) {
        if (!(this instanceof RedPostEffect_Invert)) return new RedPostEffect_Invert(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_Invert : RedGL Instance만 허용.', redGL);
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
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
    RedPostEffect_Invert.prototype = new RedBasePostEffect();
    RedPostEffect_Invert.prototype['updateTexture'] = function (lastFrameBufferTexture) {
        this['diffuseTexture'] = lastFrameBufferTexture;
    };
    RedDefinePropertyInfo.definePrototype('RedPostEffect_Invert', 'diffuseTexture', 'sampler2D');
    Object.freeze(RedPostEffect_Invert);
})();