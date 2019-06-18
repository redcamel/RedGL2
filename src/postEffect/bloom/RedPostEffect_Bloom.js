/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.6.13 12:41
 */

"use strict";
var RedPostEffect_Bloom;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffectBloomProgram';
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
		 uniform float u_exposure;
		 uniform float u_bloomStrength;

		 void main() {
			 vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
			 vec4 thresholdColor = finalColor;
			 vec4 blurColor = texture2D(u_blurTexture, vTexcoord);
			 finalColor.rgb = (finalColor.rgb  + blurColor.rgb * u_bloomStrength) * u_exposure;
			 gl_FragColor = finalColor ;
		 }
		 */
	};
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_Bloom`,
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
		 demo : '../example/postEffect/bloom/RedPostEffect_Bloom.html',
		 example : `
            var effect;
            effect = RedPostEffect_Bloom(RedGL Instance); // 포스트이펙트 생성
            // postEffectManager는 RedView 생성시 자동생성됨.
            (RedView Instance)['postEffectManager'].addEffect(effect); // 뷰에 이펙트 추가
		 `,
		 return : 'RedPostEffect_Bloom Instance'
	 }
	 :DOC*/
	RedPostEffect_Bloom = function (redGL) {
		if (!(this instanceof RedPostEffect_Bloom)) return new RedPostEffect_Bloom(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_Bloom : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['blurTexture'] = null;
		this['exposure'] = 1;
		this['bloomStrength'] = 1.2;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['_process'] = [
			RedPostEffect_BloomThreshold(redGL),
			RedPostEffect_BlurX(redGL),
			RedPostEffect_BlurY(redGL)
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
	RedPostEffect_Bloom.prototype = new RedBasePostEffect();
	RedPostEffect_Bloom.prototype['updateTexture'] = function (lastFrameBufferTexture, parentFrameBufferTexture) {
		this['diffuseTexture'] = parentFrameBufferTexture;
		this['blurTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototypes(
		'RedPostEffect_Bloom',
		['diffuseTexture', 'sampler2D'],
		['blurTexture', 'sampler2D'],
		/*DOC:
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
		['exposure', 'number', {'min': 0}],
		/*DOC:
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
		['bloomStrength', 'number', {'min': 0}],
		/*DOC:
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
		['threshold', 'number', {
			min: 0,
			callback: function (v) {
				this['_process'][0]['threshold'] = v;
				this['_threshold'] = this['_process'][0]['threshold']
			}
		}],
		/*DOC:
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
		['blur', 'number', {
			min: 0, callback: function (v) {
				this['_process'][1]['size'] = v;
				this['_process'][2]['size'] = v;
			}
		}]
	);
	Object.freeze(RedPostEffect_Bloom);
})();