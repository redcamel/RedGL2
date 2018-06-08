"use strict";
var RedPostEffect_FXAA;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffect_FXAA_Program';
	vSource = function () {
		/* @preserve
		 void main(void) {
			 vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
			 vResolution = uResolution;
			 gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D uDiffuseTexture;
		 const float cFXAA_REDUCE_MIN = 1.0/ 128.0;
		 const float cFXAA_REDUCE_MUL = 1.0 / 8.0;
		 const float cFXAA_SPAN_MAX = 8.0;
		 void main() {
			 vec4 finalColor;
			 vec2 inverseVP = vec2(1.0 / vResolution.x, 1.0 / vResolution.y);
			 vec2 fragCoord = gl_FragCoord.xy;
			 vec3 rgbNW = texture2D(uDiffuseTexture, (fragCoord + vec2(-1.0, -1.0)) * inverseVP).xyz;
			 vec3 rgbNE = texture2D(uDiffuseTexture, (fragCoord + vec2(1.0, -1.0)) * inverseVP).xyz;
			 vec3 rgbSW = texture2D(uDiffuseTexture, (fragCoord + vec2(-1.0, 1.0)) * inverseVP).xyz;
			 vec3 rgbSE = texture2D(uDiffuseTexture, (fragCoord + vec2(1.0, 1.0)) * inverseVP).xyz;
			 vec3 rgbM  = texture2D(uDiffuseTexture, fragCoord  * inverseVP).xyz;
			 vec3 luma = vec3(0.299, 0.587, 0.114);
			 float lumaNW = dot(rgbNW, luma);
			 float lumaNE = dot(rgbNE, luma);
			 float lumaSW = dot(rgbSW, luma);
			 float lumaSE = dot(rgbSE, luma);
			 float lumaM  = dot(rgbM,  luma);
			 float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
			 float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

			 vec2 dir;
			 dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
			 dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

			 float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * cFXAA_REDUCE_MUL), cFXAA_REDUCE_MIN);

			 float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);
			 dir = min(
				 vec2(cFXAA_SPAN_MAX, cFXAA_SPAN_MAX),
				 max( vec2(-cFXAA_SPAN_MAX, -cFXAA_SPAN_MAX), dir * rcpDirMin)
			 ) * inverseVP;

			 vec3 rgbA = 0.5 * (
				 texture2D(uDiffuseTexture, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +
				 texture2D(uDiffuseTexture, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz
			 );
			 vec3 rgbB = rgbA * 0.5 + 0.25 * (
				 texture2D(uDiffuseTexture, fragCoord * inverseVP + dir * -0.5).xyz +
				 texture2D(uDiffuseTexture, fragCoord * inverseVP + dir * 0.5).xyz
			 );

			 float lumaB = dot(rgbB, luma);
			 if ((lumaB < lumaMin) || (lumaB > lumaMax)) finalColor = vec4(rgbA, 1.0);
			 else finalColor = vec4(rgbB, 1.0);

			 gl_FragColor = finalColor;
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_FXAA`,
		 description : `
			 RedPostEffect_FXAA Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_FXAA Instance'
	 }
	 :DOC*/
	RedPostEffect_FXAA = function (redGL) {
		if ( !(this instanceof RedPostEffect_FXAA) ) return new RedPostEffect_FXAA(redGL);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedPostEffect_FXAA : RedGL Instance만 허용됩니다.', redGL)
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
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
	RedPostEffect_FXAA.prototype = new RedBaseMaterial();
	RedPostEffect_FXAA.prototype['bind'] = RedPostEffectManager.prototype['bind'];
	RedPostEffect_FXAA.prototype['unbind'] = RedPostEffectManager.prototype['unbind'];
	Object.freeze(RedPostEffect_FXAA);
})();