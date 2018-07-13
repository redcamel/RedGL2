"use strict";
var RedPostEffect_SSAO;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffectSSAOProgram';
	vSource = function () {
		/* @preserve

		 void main(void) {
			 vTexcoord = aTexcoord;
			 vTime = uTime;
			 gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D uDiffuseTexture;
		 uniform sampler2D uSsaoTexture;
		 uniform float uMode;
		 void main() {
			 vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord);
			 vec4 ssaoColor = texture2D(uSsaoTexture, vTexcoord);
			 if(uMode == 0.0) gl_FragColor = ssaoColor;
			 else if(uMode == 2.0) gl_FragColor = finalColor;
			 else if(uMode == 3.0) {
				 finalColor.rgb *= ssaoColor.r;
				 gl_FragColor = finalColor;
			 };
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_SSAO`,
		 description : `
			 RedPostEffect_SSAO Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_SSAO Instance'
	 }
	 :DOC*/
	RedPostEffect_SSAO = function (redGL) {
		if ( !(this instanceof RedPostEffect_SSAO) ) return new RedPostEffect_SSAO(redGL);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedPostEffect_SSAO : RedGL Instance만 허용됩니다.', redGL)
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['ssaoTexture'] = null;
		/////////////////////////////////////////
		// 일반 프로퍼티
		var point;
		point = RedPostEffect_SSAO_PointMaker(redGL)
		this['process'] = [
			point,
			RedPostEffect_GaussianBlur(redGL),
			RedPostEffect_Blur(redGL),
			RedPostEffect_Blur(redGL)
		]
		this['mode'] = RedPostEffect_SSAO.COLOR_SSAO
		Object.defineProperty(this, 'blur', (function () {
			var _v = 1
			return {
				get: function () {
					return _v
				},
				set: function (v) {
					_v = v;
					this['process'][1]['radius'] = _v;
				}
			}
		})());
		this['blur'] = 30
		Object.defineProperty(this, 'range', (function () {
			return {
				get: function () {
					return point['range']
				},
				set: function (v) {
					point['range'] = v;
				}
			}
		})());
		this['range'] = 300
		Object.defineProperty(this, 'factor2', (function () {
			return {
				get: function () {
					return point['factor2']
				},
				set: function (v) {
					point['factor2'] = v;
				}
			}
		})());
		this['factor2'] = 4.25
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL['makeUUID']();
		this.updateTexture = function (lastFrameBufferTexture, parentFrameBufferTexture) {
			this['diffuseTexture'] = parentFrameBufferTexture;
			this['ssaoTexture'] = lastFrameBufferTexture;
		}
		this.checkUniformAndProperty();
		console.log(this);
	}
	RedPostEffect_SSAO['ONLY_SSAO'] = 0
	RedPostEffect_SSAO['ONLY_NORMAL'] = 1
	RedPostEffect_SSAO['ONLY_COLOR'] = 2
	RedPostEffect_SSAO['COLOR_SSAO'] = 3
	RedPostEffect_SSAO.prototype = new RedBaseMaterial();
	RedPostEffect_SSAO.prototype['bind'] = RedPostEffectManager.prototype['bind'];
	RedPostEffect_SSAO.prototype['unbind'] = RedPostEffectManager.prototype['unbind'];
	Object.freeze(RedPostEffect_SSAO);
})();