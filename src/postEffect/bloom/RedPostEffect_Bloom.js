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
			 gl_FragColor = (finalColor  + blurColor * u_bloomStrength) * u_exposure ;
		 }
		 */
	};
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_Bloom`,
		 description : `
			 RedPostEffect_Bloom Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_Bloom Instance'
	 }
	 :DOC*/
	RedPostEffect_Bloom = function (redGL) {
		if ( !(this instanceof RedPostEffect_Bloom) ) return new RedPostEffect_Bloom(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_Bloom : RedGL Instance만 허용됩니다.', redGL);
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
		if ( !checked ) {
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
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Bloom', 'diffuseTexture', 'sampler2D');
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Bloom', 'blurTexture', 'sampler2D');
	/**DOC:
	 {
		 title :`exposure`,
		 description : `
			 확산 강도.
			 기본값 : 1
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Bloom', 'exposure', 'number', {'min': 0});
	/**DOC:
	 {
		 title :`bloomStrength`,
		 description : `
			 블룸 강도
			 기본값 : 1.2
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Bloom', 'bloomStrength', 'number', {'min': 0});
	/**DOC:
	 {
		 title :`threshold`,
		 description : `
			 최소 유효값
			 기본값 : 75
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Bloom', 'threshold', 'number', {
		min: 0,
		callback: function (v) {
			this['_process'][0]['threshold'] = v;
			this['_threshold'] = this['_process'][0]['threshold']
		}
	});
	/**DOC:
	 {
		 title :`blur`,
		 description : `
			 blur 정도.
			 기본값 : 20
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Bloom', 'blur', 'number', {
		min: 0, callback: function (v) {
			this['_process'][1]['size'] = v;
			this['_process'][2]['size'] = v;
		}
	});
	Object.freeze(RedPostEffect_Bloom);
})();