"use strict";
var RedPostEffect_ZoomBlur;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffect_ZoomBlur_Program';
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
		 uniform float uCenterX;
		 uniform float uCenterY;
		 uniform float u_amount;
		 float random(vec3 scale, float seed) {
		    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
		 }
		 void main(void) {
			 vec4 finalColor = vec4(0.0);
			 vec2 center = vec2(uCenterX+0.5,-uCenterY+0.5);
			 vec2 toCenter = center - vTexcoord ;
			 float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
			 float total = 0.0;

			 for (float t = 0.0; t <= 30.0; t++) {
				 float percent = (t + offset) / 30.0;
				 float weight = 3.0 * (percent - percent * percent);
				 vec4 sample = texture2D(uDiffuseTexture, vTexcoord + toCenter * percent * u_amount );
				 sample.rgb *= sample.a;
				 finalColor += sample * weight;
				 total += weight;
			 }
			 gl_FragColor = finalColor / total;
			 gl_FragColor.rgb /= gl_FragColor.a + 0.00001;
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_ZoomBlur`,
		 description : `
			 RedPostEffect_ZoomBlur Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_ZoomBlur Instance'
	 }
	 :DOC*/
	RedPostEffect_ZoomBlur = function (redGL) {
		if ( !(this instanceof RedPostEffect_ZoomBlur) ) return new RedPostEffect_ZoomBlur(redGL);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedPostEffect_ZoomBlur : RedGL Instance만 허용됩니다.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		/**DOC:
		 {
			 title :`centerX`,
			 description : `
				 정중앙 중심의 가로 위치
				 기본값 : 0.0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['centerX'] = 0.0;
		/**DOC:
		 {
			 title :`centerY`,
			 description : `
				 정중앙 중심의 세로 위치
				 기본값 : 0.0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['centerY'] = 0.0;
		/**DOC:
		 {
			 title :`amount`,
			 description : `
				 강도
				 기본값 : 0.15
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['_amount'] = null;
		Object.defineProperty(this, 'amount', (function () {
			var _v = 0
			return {
				get: function () { return _v },
				set: function (v) {
					if ( typeof v != 'number' ) RedGLUtil.throwFunc('RedPostEffect_ZoomBlur : amount 숫자만허용함', '입력값 : ' + v);
					_v = v;
					if ( _v < 1 ) _v = 1
					if ( _v > 100 ) _v = 100
					this['_amount'] = _v / 100
				}
			}
		})());
		this['amount'] = 38
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL['makeUUID']();
		this.updateTexture = function (lastFrameBufferTexture) {
			this['diffuseTexture'] = lastFrameBufferTexture
		}
		this.checkUniformAndProperty();
		console.log(this);
	}
	RedPostEffect_ZoomBlur.prototype = new RedBaseMaterial();
	RedPostEffect_ZoomBlur.prototype['bind'] = RedPostEffectManager.prototype['bind'];
	RedPostEffect_ZoomBlur.prototype['unbind'] = RedPostEffectManager.prototype['unbind'];
	RedDefinePropertyInfo.definePrototype('RedPostEffect_ZoomBlur', 'centerX', 'number')
	RedDefinePropertyInfo.definePrototype('RedPostEffect_ZoomBlur', 'centerY', 'number')
	RedDefinePropertyInfo.definePrototype('RedPostEffect_ZoomBlur', 'size', 'number',{'min': 0})
	Object.freeze(RedPostEffect_ZoomBlur);
})();