"use strict";
var RedPostEffect_Mirror;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedPostEffectMirrorProgram';
    var checked;
    vSource = function () {
        /* @preserve
        varying mat4 vPMatrix;
         void main(void) {
            vTexcoord = aTexcoord;

            vPMatrix = uPMatrix ;

            vVertexPosition =  uMMatrix *  vec4(aVertexPosition, 1.0);
            vResolution = uResolution;
            gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
         }
         */
    };
    fSource = function () {
        /* @preserve
         precision mediump float;
            varying mat4 vPMatrix;
         uniform sampler2D u_diffuseTexture;
         uniform sampler2D u_depthTexture;
         uniform sampler2D u_normalTexture;
         uniform float u_exposure;
         uniform float u_bloomStrength;

vec2 viewSpaceToScreenSpaceTexCoord(vec3 p) {
  vec4 projectedPos = vec4(p, 1.0);
  vec2 ndcPos = projectedPos.xy / projectedPos.w; //normalized device coordinates
  vec2 coord = ndcPos * 0.5 + 0.5;
  return coord;
}

 float random(vec3 scale, float seed) {
             return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
         }

        //#REDGL_DEFINE#fragmentShareFunc#decodeFloatShadow#
        //#REDGL_DEFINE#fragmentShareFunc#getShadowColor#
         void main() {


             vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord); // 기본컬러
             vec4 normalColor = texture2D(u_normalTexture, vTexcoord); // 뎁스
             vec4 depthColor = vec4(vec3(decodeFloatShadow(texture2D(u_depthTexture,vTexcoord))),1.0); // 노말


             vec3 R = reflect(uCameraPosition - normalColor);

             vec4 finalColor2 = texture2D(u_diffuseTexture, coord);

             gl_FragColor = mix(finalColor2,finalColor2, normalColor.g) ;
             // gl_FragColor = finalColor2;
             // gl_FragColor = depthColor;
             // gl_FragColor = vec4(normalize(uCameraPosition),1.0);
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedPostEffect_Mirror`,
		 description : `
			 Bloom 이펙트
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
		 demo : '../example/postEffect/bloom/RedPostEffect_Mirror.html',
		 example : `
            var effect;
            effect = RedPostEffect_Mirror(RedGL Instance); // 포스트이펙트 생성
            // postEffectManager는 RedView 생성시 자동생성됨.
            (RedView Instance)['postEffectManager'].addEffect(effect); // 뷰에 이펙트 추가
		 `,
		 return : 'RedPostEffect_Mirror Instance'
	 }
     :DOC*/
    RedPostEffect_Mirror = function (redGL) {
        if (!(this instanceof RedPostEffect_Mirror)) return new RedPostEffect_Mirror(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_Mirror : RedGL Instance만 허용.', redGL);
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        this['depthTexture'] = null;
        this['exposure'] = 1;
        this['bloomStrength'] = 1.2;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['_subFrameBufferList'] = [
            {
                frameBuffer: RedFrameBuffer(redGL),
                renderMaterial: RedPostEffectMirrorNormal(redGL),
                process: []
            },
            {
                frameBuffer: RedFrameBuffer(redGL),
                renderMaterial: RedPostEffect_MirrorTextureMaker(redGL),
                process: []
            }
        ];
        this['_process'] = [
            RedPostEffect_MirrorTextureMaker(redGL)
        ];
        this['blur'] = 20;
        this['threshold'] = 75;
        this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
        this['_UUID'] = RedGL.makeUUID();
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this);
    };
    RedPostEffect_Mirror.prototype = new RedBasePostEffect();
    RedPostEffect_Mirror.prototype['updateTexture'] = function (lastFrameBufferTexture, parentFrameBufferTexture) {
        this['diffuseTexture'] = parentFrameBufferTexture;
        this['normalTexture'] = this['_subFrameBufferList'][0]['frameBuffer']['texture']
        this['depthTexture'] = this['_subFrameBufferList'][1]['frameBuffer']['texture'];
    };
    RedDefinePropertyInfo.definePrototype('RedPostEffect_Mirror', 'diffuseTexture', 'sampler2D');
    RedDefinePropertyInfo.definePrototype('RedPostEffect_Mirror', 'depthTexture', 'sampler2D');
    RedDefinePropertyInfo.definePrototype('RedPostEffect_Mirror', 'normalTexture', 'sampler2D');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`exposure`,
		 description : `
			 확산 강도.
			 기본값 : 1
			 min : 0
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPostEffect_Mirror', 'exposure', 'number', {'min': 0});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`bloomStrength`,
		 description : `
			 블룸 강도
			 기본값 : 1.2
			 min : 0
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPostEffect_Mirror', 'bloomStrength', 'number', {'min': 0});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`threshold`,
		 description : `
			 최소 유효값
			 기본값 : 75
			 min : 0
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPostEffect_Mirror', 'threshold', 'number', {
        min: 0,
        callback: function (v) {
            // this['_process'][0]['threshold'] = v;
            // this['_threshold'] = this['_process'][0]['threshold']
        }
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`blur`,
		 description : `
			 blur 정도.
			 기본값 : 20
			 min : 0
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPostEffect_Mirror', 'blur', 'number', {
        min: 0, callback: function (v) {
            // this['_process'][1]['size'] = v;
            // this['_process'][2]['size'] = v;
        }
    });
    Object.freeze(RedPostEffect_Mirror);
})();