"use strict";
var RedPostEffect_DoF;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffect_DoF_Program';
	vSource = function () {
		/* @preserve

		 void main(void) {
		 vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
		 gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);

		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D uDiffuseTexture;
		 uniform sampler2D uBlurTexture;
		 uniform sampler2D uDepthTexture;



		 uniform float uDistance;
		 void main() {
		 vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord);
		 vec4 blurColor = texture2D(uBlurTexture, vTexcoord);
		 vec4 depthColor = texture2D(uDepthTexture, vTexcoord);
		 finalColor.rgb *= (depthColor.r);
		 blurColor.rgb *= (1.0-depthColor.r);
		 gl_FragColor =  (finalColor + blurColor) ;


		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_DoF`,
		 description : `
			 RedPostEffect_DoF Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_DoF Instance'
	 }
	 :DOC*/
	RedPostEffect_DoF = function ( redGL ) {
		if ( !(this instanceof RedPostEffect_DoF) ) return new RedPostEffect_DoF( redGL );
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc( 'RedPostEffect_DoF : RedGL Instance만 허용됩니다.', redGL )

		this['subFrameBufferInfo'] = {
			frameBuffer: RedFrameBuffer( redGL ),
			renderMaterial: RedPostEffect_DoF_DepthMaterial( redGL ),
			process: []
		}

		this['frameBuffer'] = RedFrameBuffer( redGL );

		this['diffuseTexture'] = null;
		this['blurTexture'] = null;
		this['depthTexture'] = null;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram']( redGL, PROGRAM_NAME, vSource, fSource );
		this['_UUID'] = RedGL['makeUUID']();
		this['process'] = [
			RedPostEffect_BlurX( redGL ),
			RedPostEffect_BlurY( redGL )
		]
		/**DOC:
		 {
			 title :`focusLength`,
			 description : `
				 focusLength
				 기본값 : 15
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		Object.defineProperty( this, 'focusLength', (function () {
			return {
				get: function () {
					return this['subFrameBufferInfo']['renderMaterial']['focusLength']
				},
				set: function ( v ) {
					this['subFrameBufferInfo']['renderMaterial']['focusLength'] = v
				}
			}
		})() );
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
		Object.defineProperty( this, 'blur', (function () {
			var _v = 1
			return {
				get: function () {
					return _v
				},
				set: function ( v ) {
					_v = v;
					this['process'][0]['size'] = _v;
					this['process'][1]['size'] = _v;
				}
			}
		})() );
		this['blur'] = 10
		this.updateTexture = function ( lastFrameBufferTexture, parentFramBufferTexture ) {
			this['diffuseTexture'] = parentFramBufferTexture;
			this['blurTexture'] = lastFrameBufferTexture;
			this['depthTexture'] = this['subFrameBufferInfo']['frameBuffer']['texture']
		}
		this['bind'] = RedPostEffectManager.prototype['bind'];
		this['unbind'] = RedPostEffectManager.prototype['unbind'];

		this.checkUniformAndProperty();
		;
		console.log( this );
	}
	RedPostEffect_DoF.prototype = RedBaseMaterial.prototype;
	Object.freeze( RedPostEffect_DoF );
})();