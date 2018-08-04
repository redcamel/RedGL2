"use strict";
var RedPostEffect_Film;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffectFilmProgram';
	var checked;
	vSource = function () {
		/* @preserve
		 void main(void) {
			 vTexcoord = aTexcoord;
			 vTime = uTime;
			 gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		 }
		 */
	};
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform bool u_grayMode;
		 uniform sampler2D u_diffuseTexture;
		 uniform float u_noiseIntensity; // noise effect intensity value (0 = no effect, 1 = full effect)
		 uniform float u_scanlineIntensity; // scanlines effect intensity value (0 = no effect, 1 = full effect)
		 uniform float u_scanlineCount; // scanlines effect count value (0 = no effect, 4096 = full effect)

		 void main() {
			 // sample the source
			 vec4 diffuseColor = texture2D( u_diffuseTexture, vTexcoord );
	
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
			 if( u_grayMode ) finalColor = vec3( finalColor.r * 0.3 + finalColor.g * 0.59 + finalColor.b * 0.11 );
			 gl_FragColor =  vec4( finalColor, diffuseColor.a );
		 }
		 */
	};
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
		 extends : [
		    'RedBasePostEffect',
		    'RedBaseMaterial'
		 ],
		 demo : '../example/RedPostEffect_Film.html',
		 return : 'RedPostEffect_Film Instance'
	 }
	 :DOC*/
	RedPostEffect_Film = function (redGL) {
		if ( !(this instanceof RedPostEffect_Film) ) return new RedPostEffect_Film(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_Film : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['grayMode'] = false;
		this['scanlineIntensity'] = 0.5;
		this['noiseIntensity'] = 0.5;
		this['scanlineCount'] = 2048;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL.makeUUID();
		if ( !checked ) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	RedPostEffect_Film.prototype = new RedBasePostEffect();
	RedPostEffect_Film.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Film', 'diffuseTexture', 'sampler2D');
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`grayMode`,
		 description : `
			 그레이모드
			 기본값 : false
		 `,
		 return : 'Boolean'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Film', 'grayMode', 'boolean');
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`scanlineIntensity`,
		 description : `
			 스캔라인강도
			 기본값 : 0.5
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Film', 'scanlineIntensity', 'number', {'min': 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`noiseIntensity`,
		 description : `
			 노이즈강도
			 기본값 : 0.5
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Film', 'noiseIntensity', 'number', {'min': 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`scanlineCount`,
		 description : `
			 스캔라인 수
			 기본값 : 2048
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Film', 'scanlineCount', 'number', {'min': 0});
	Object.freeze(RedPostEffect_Film);
})();