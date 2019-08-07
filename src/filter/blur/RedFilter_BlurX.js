/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.7 15:37:41
 *
 */

"use strict";
var RedFilter_BlurX;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedFilterBlurXProgram';
	var checked;
	vSource = RedBaseFilter['baseVertexShaderSource1']
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D u_diffuseTexture;
		 uniform float u_size;
		 float random(vec3 scale, float seed) {
			return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
		 }
		 void main() {
			 vec4 finalColor = vec4(0.0);
			 vec2 delta;
			 float total = 0.0;
			 float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
			 delta = vec2(u_size/vResolution.x,0.0);
			vec2 testCoord = gl_FragCoord.xy/vResolution.xy;
			float percent;
			float weight;
			 for (float t = -4.0; t <= 4.0; t+=1.0) {
				 float percent = (t + offset - 0.5) / 4.0;
				 float weight = 1.0 - abs(percent);
				 vec4 sample = texture2D(u_diffuseTexture, testCoord + delta * percent);
				 sample.rgb *= sample.a;
				 finalColor += sample * weight;
				 total += weight;
			 }
			 finalColor = finalColor / total;
			 finalColor.rgb /= finalColor.a + 0.00001;
			 gl_FragColor =  finalColor ;
		 }
		 */
	};
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedFilter_BlurX`,
		 description : `
			 X축 블러 이펙트
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
		 demo : '../example/filter/blur/RedFilter_BlurX.html',

		 return : 'RedFilter_BlurX Instance'
	 }
	 :DOC*/
	RedFilter_BlurX = function (redGL) {
		if (!(this instanceof RedFilter_BlurX)) return new RedFilter_BlurX(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedFilter_BlurX : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFilterFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['size'] = 50;
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
	RedFilter_BlurX.prototype = new RedBaseFilter();
	RedFilter_BlurX.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototypes(
		'RedFilter_BlurX',
		['diffuseTexture', 'sampler2D'],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`size`,
			 description : `
				 블러 사이즈
				 기본값 : 50
				 min : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['size', 'number', {'min': 0}]
	);
	Object.freeze(RedFilter_BlurX);
})();