"use strict";

var RedPostEffect_HueSaturation;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffect_HueSaturation_Program';
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
		 uniform float uHue;
		 uniform float uSaturation;
		 void main(void) {
		 vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord );
		 float angle = uHue * 3.14159265;
		 float s = sin(angle), c = cos(angle);
		 vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;
		 float len = length(finalColor.rgb);
		 finalColor.rgb = vec3(
		 dot(finalColor.rgb, weights.xyz),
		 dot(finalColor.rgb, weights.zxy),
		 dot(finalColor.rgb, weights.yzx)
		 );

		 float average = (finalColor.r + finalColor.g + finalColor.b) / 3.0;
		 if (uSaturation > 0.0) finalColor.rgb += (average - finalColor.rgb) * (1.0 - 1.0 / (1.001 - uSaturation));
		 else finalColor.rgb += (average - finalColor.rgb) * (-uSaturation);
		 gl_FragColor = finalColor;
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_HueSaturation`,
		 description : `
			 RedPostEffect_HueSaturation Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_HueSaturation Instance'
	 }
	 :DOC*/
	RedPostEffect_HueSaturation = function ( redGL ) {
		if ( !(this instanceof RedPostEffect_HueSaturation) ) return new RedPostEffect_HueSaturation( redGL );
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc( 'RedPostEffect_HueSaturation : RedGL Instance만 허용됩니다.', redGL );
		this['frameBuffer'] = RedFrameBuffer( redGL );
		this['diffuseTexture'] = null;
		/**DOC:
		 {
			 title :`hue`,
			 description : `
				 색조
				 기본값 : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['hue'] = 0;
		/**DOC:
		 {
			 title :`saturation`,
			 description : `
				 채도
				 기본값 : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['saturation'] = 0;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram']( redGL, PROGRAM_NAME, vSource, fSource );
		this['_UUID'] = RedGL['makeUUID']();
		this.updateTexture = function ( lastFrameBufferTexture ) {
			this['diffuseTexture'] = lastFrameBufferTexture;
		}
		this['bind'] = RedPostEffectManager.prototype['bind'];
		this['unbind'] = RedPostEffectManager.prototype['unbind'];
		this.checkUniformAndProperty();
		;
		console.log( this );
	}
	RedPostEffect_HueSaturation.prototype = RedBaseMaterial.prototype
	Object.freeze( RedPostEffect_HueSaturation );
})();