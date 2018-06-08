"use strict";
var RedPostEffect_Film;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffect_Film_Program';
	vSource = function () {
		/* @preserve
		 void main(void) {
			 vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
			 vTime = uTime;
			 gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform bool uGrayMode;
		 uniform sampler2D uDiffuseTexture;
		 // noise effect intensity value (0 = no effect, 1 = full effect)
		 uniform float u_noiseIntensity;
		 // scanlines effect intensity value (0 = no effect, 1 = full effect)
		 uniform float u_scanlineIntensity;
		 // scanlines effect count value (0 = no effect, 4096 = full effect)
		 uniform float u_scanlineCount;

		 void main() {
		 // sample the source
		 vec4 diffuseColor = texture2D( uDiffuseTexture, vTexcoord );

		 // make some noise
		 float x = vTexcoord.x * vTexcoord.y * vTime;
		 x = mod( x, 13.0 ) * mod( x, 123.0 );
		 float dx = mod( x, 0.01 );

		 // add noise
		 vec3 finalColor = diffuseColor.rgb + diffuseColor.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );

		 // get us a sine and cosine
		 vec2 sc = vec2( sin( vTexcoord.y * u_scanlineCount ), cos( vTexcoord.y * u_scanlineCount ) );

		 // add scanlines
		 finalColor += diffuseColor.rgb * vec3( sc.x, sc.y, sc.x ) * u_scanlineIntensity;

		 // interpolate between source and result by intensity
		 finalColor = diffuseColor.rgb + clamp( u_noiseIntensity, 0.0, 1.0 ) * ( finalColor - diffuseColor.rgb );

		 // convert to grayscale if desired
		 if( uGrayMode ) finalColor = vec3( finalColor.r * 0.3 + finalColor.g * 0.59 + finalColor.b * 0.11 );
		 gl_FragColor =  vec4( finalColor, diffuseColor.a );
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_Film`,
		 description : `
			 RedPostEffect_Film Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_Film Instance'
	 }
	 :DOC*/
	RedPostEffect_Film = function (redGL) {
		if ( !(this instanceof RedPostEffect_Film) ) return new RedPostEffect_Film(redGL);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedPostEffect_Film : RedGL Instance만 허용됩니다.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		/**DOC:
		 {
			 title :`grayMode`,
			 description : `
				 그레이모드
				 기본값 : false
			 `,
			 return : 'Boolean'
		 }
		 :DOC*/
		this['grayMode'] = false;
		/**DOC:
		 {
			 title :`scanlineIntensity`,
			 description : `
				 스캔라인강도
				 기본값 : 0.5
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['_scanlineIntensity'] = null, this['scanlineIntensity'] = 0.5;
		/**DOC:
		 {
			 title :`noiseIntensity`,
			 description : `
				 노이즈강도
				 기본값 : 0.5
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['_noiseIntensity'] = null, this['noiseIntensity'] = 0.5;
		/**DOC:
		 {
			 title :`scanlineCount`,
			 description : `
				 스캔라인 수
				 기본값 : 2048
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['_scanlineCount'] = null, this['scanlineCount'] = 2048;
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
	RedPostEffect_Film.prototype = new RedBaseMaterial();
	RedPostEffect_Film.prototype['bind'] = RedPostEffectManager.prototype['bind'];
	RedPostEffect_Film.prototype['unbind'] = RedPostEffectManager.prototype['unbind'];
	Object.defineProperty(RedPostEffect_Film.prototype, 'scanlineIntensity', {
		get: function () { return this['_scanlineIntensity'] },
		set: function (v) {
			if ( typeof v != 'number' ) RedGLUtil.throwFunc('RedPostEffect_Film : scanlineIntensity 숫자만허용함', '입력값 : ' + v);
			if ( v < 0 ) v = 0;
			this['_scanlineIntensity'] = v;
		}
	});
	Object.defineProperty(RedPostEffect_Film.prototype, 'noiseIntensity', {
		get: function () { return this['_noiseIntensity'] },
		set: function (v) {
			if ( typeof v != 'number' ) RedGLUtil.throwFunc('RedPostEffect_Film : noiseIntensity 숫자만허용함', '입력값 : ' + v);
			if ( v < 0 ) v = 0;
			this['_noiseIntensity'] = v;
		}
	});
	Object.defineProperty(RedPostEffect_Film.prototype, 'scanlineCount', {
		get: function () { return this['_scanlineCount'] },
		set: function (v) {
			if ( typeof v != 'number' ) RedGLUtil.throwFunc('RedPostEffect_Film : scanlineCount 숫자만허용함', '입력값 : ' + v);
			if ( v < 0 ) v = 0;
			this['_scanlineCount'] = v;
		}
	});
	Object.freeze(RedPostEffect_Film);
})();