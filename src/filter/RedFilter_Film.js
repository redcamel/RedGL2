/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.2 18:16:21
 *
 */

"use strict";
var RedFilter_Film;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedFilterFilmProgram';
	var checked;
	vSource = RedBaseFilter['baseVertexShaderSource1']
	fSource = function () {
		/* @preserve
		 precision lowp float;
		 uniform bool u_grayMode;
		 uniform sampler2D u_diffuseTexture;
		 uniform float u_noiseIntensity; // noise effect intensity value (0 = no effect, 1 = full effect)
		 uniform float u_scanlineIntensity; // scanlines effect intensity value (0 = no effect, 1 = full effect)
		 uniform float u_scanlineCount; // scanlines effect count value (0 = no effect, 4096 = full effect)

		 void main() {
			 // sample the source
			   vec2 testCoord = gl_FragCoord.xy/vResolution.xy;
			 vec4 diffuseColor = texture2D( u_diffuseTexture, testCoord );

			 // make some noise
			 float x = testCoord.x * testCoord.y * vTime;
			 x = mod( x, 13.0 ) * mod( x, 123.0 );
			 float dx = mod( x, 0.01 );

			 // add noise
			 vec3 finalColor = diffuseColor.rgb + diffuseColor.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );

			 // get us a sine and cosine
			 vec2 sc = vec2( sin( testCoord.y * u_scanlineCount ), cos( testCoord.y * u_scanlineCount ) );

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
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedFilter_Film`,
		 description : `
			 Film 이펙트
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 extends : [
		    'RedBaseFilter',
		    'RedBaseMaterial'
		 ],
		 demo : '../example/postEffect/RedFilter_Film.html',
		 example : `
            var effect;
            effect = RedFilter_Film(RedGL Instance); // 포스트이펙트 생성
            // postEffectManager는 RedView 생성시 자동생성됨.
            (RedView Instance)['postEffectManager'].addEffect(effect); // 뷰에 이펙트 추가
		 `,
		 return : 'RedFilter_Film Instance'
	 }
	 :DOC*/
	RedFilter_Film = function (redGL) {
		if (!(this instanceof RedFilter_Film)) return new RedFilter_Film(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedFilter_Film : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFilterFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['grayMode'] = false;
		this['scanlineIntensity'] = 0.5;
		this['noiseIntensity'] = 0.5;
		this['scanlineCount'] = 2048;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL.makeUUID();
		if (!checked) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	RedFilter_Film.prototype = new RedBaseFilter();
	RedFilter_Film.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototypes(
		'RedFilter_Film',
		[ 'diffuseTexture', 'sampler2D'],
		/*DOC:
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
		[ 'grayMode', 'boolean'],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`scanlineIntensity`,
			 description : `
				 스캔라인강도
				 기본값 : 0.5
				 min : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		[ 'scanlineIntensity', 'number', {'min': 0}],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`noiseIntensity`,
			 description : `
				 노이즈강도
				 기본값 : 0.5
				 min : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		[ 'noiseIntensity', 'number', {'min': 0}],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`scanlineCount`,
			 description : `
				 스캔라인 수
				 기본값 : 2048
				 min : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		[ 'scanlineCount', 'number', {'min': 0}]
	);
	Object.freeze(RedFilter_Film);
})();