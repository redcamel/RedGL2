"use strict";
var RedPostEffect_Vignetting;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffectVignettingProgram';
	vSource = function () {
		/* @preserve
		 void main(void) {
		    vTexcoord = aTexcoord;
		    gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D uDiffuseTexture;
		 uniform float u_size;
		 uniform float u_intensity;
		 void main(void) {
			 vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord );
			 float dist = distance(vTexcoord, vec2(0.5, 0.5));
			 finalColor.rgb *= smoothstep(0.8, u_size * 0.799, dist * (u_intensity + u_size));
			 gl_FragColor = finalColor;
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_Vignetting`,
		 description : `
			 RedPostEffect_Vignetting Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_Vignetting Instance'
	 }
	 :DOC*/
	RedPostEffect_Vignetting = function (redGL) {
		if ( !(this instanceof RedPostEffect_Vignetting) ) return new RedPostEffect_Vignetting(redGL);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedPostEffect_Vignetting : RedGL Instance만 허용됩니다.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		/**DOC:
		 {
			 title :`size`,
			 description : `
				 비네팅사이즈
				 기본값 : 0.1
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['size'] = 0.1
		/**DOC:
		 {
			 title :`_intensity`,
			 description : `
				 비네팅 강도
				 기본값 : 0.85
		 `,
		 return : 'Number'
		 }
		 :DOC*/
		this['intensity'] = 0.85;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL['makeUUID']();
		this.updateTexture = function (lastFrameBufferTexture) {
			this['diffuseTexture'] = lastFrameBufferTexture;
		}
		this.checkUniformAndProperty();
		console.log(this);
	}
	RedPostEffect_Vignetting.prototype = new RedBaseMaterial();
	RedPostEffect_Vignetting.prototype['bind'] = RedPostEffectManager.prototype['bind'];
	RedPostEffect_Vignetting.prototype['unbind'] = RedPostEffectManager.prototype['unbind'];
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Vignetting', 'intensity', 'number', {'min': 0});
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Vignetting', 'size', 'number', {'min': 0});
	Object.freeze(RedPostEffect_Vignetting);
})();