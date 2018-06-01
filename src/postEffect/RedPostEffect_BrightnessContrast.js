"use strict";

var RedPostEffect_BrightnessContrast;
(function () {
	var makeProgram;
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_BrightnessContrast`,
		 description : `
			 RedPostEffect_BrightnessContrast Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_BrightnessContrast Instance'
	 }
	 :DOC*/
	RedPostEffect_BrightnessContrast = function ( redGL ) {
		if ( !(this instanceof RedPostEffect_BrightnessContrast) ) return new RedPostEffect_BrightnessContrast( redGL );
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc( 'RedPostEffect_BrightnessContrast : RedGL Instance만 허용됩니다.', redGL );
		this['frameBuffer'] = RedFrameBuffer( redGL );
		this['diffuseTexture'] = null;
		/**DOC:
		 {
			 title :`brightness`,
			 description : `
				 밝기
				 기본값 : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['brightness'] = 0;
		/**DOC:
		 {
			 title :`contrast`,
			 description : `
				 대조
				 기본값 : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['contrast'] = 0;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = makeProgram( redGL );
		this['_UUID'] = RedGL['makeUUID']();
		this.updateTexture = function ( lastFrameBufferTexture ) {
			this['diffuseTexture'] = lastFrameBufferTexture;
		}
		this['bind'] = RedPostEffectManager.prototype['bind'];
		this['unbind'] = RedPostEffectManager.prototype['unbind'];
		this.checkProperty();
		console.log( this );
	}
	makeProgram = (function () {
		var vSource, fSource;
		var PROGRAM_NAME;
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
			 uniform float uBrightness;
			 uniform float uContrast;
			 void main(void) {
			 vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord );
			 finalColor.rgb += uBrightness;
			 if (uContrast > 0.0) finalColor.rgb = (finalColor.rgb - 0.5) / (1.0 - uContrast) + 0.5;
			 else finalColor.rgb = (finalColor.rgb - 0.5) * (1.0 + uContrast) + 0.5;
			 gl_FragColor = finalColor;
			 }
			 */
		}
		vSource = RedGLUtil.getStrFromComment( vSource.toString() );
		fSource = RedGLUtil.getStrFromComment( fSource.toString() );
		PROGRAM_NAME = 'RedPostEffect_BrightnessContrast_Program';
		return function ( redGL ) {
			return RedProgram( redGL, PROGRAM_NAME, vSource, fSource );
		}
	})();
	RedPostEffect_BrightnessContrast.prototype = RedBaseMaterial.prototype;
	RedPostEffect_BrightnessContrast['NORMAL'] = [
		0, 0, 0,
		0, 1, 0,
		0, 0, 0
	];
	RedPostEffect_BrightnessContrast['SHARPEN'] = [
		0, -1, 0,
		-1, 5, -1,
		0, -1, 0

	];
	RedPostEffect_BrightnessContrast['BLUR'] = [
		1, 1, 1,
		1, 1, 1,
		1, 1, 1
	];
	RedPostEffect_BrightnessContrast['EDGE'] = [
		0, 1, 0,
		1, -4, 1,
		0, 1, 0
	];
	RedPostEffect_BrightnessContrast['EMBOSS'] = [
		-2, -1, 0,
		-1, 1, 1,
		0, 1, 2
	];
	Object.freeze( RedPostEffect_BrightnessContrast );
})();