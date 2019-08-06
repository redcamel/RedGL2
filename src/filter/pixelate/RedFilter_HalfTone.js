/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.6 14:20:40
 *
 */

"use strict";
var RedFilter_HalfTone;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedFilterHalfToneProgram';
	var checked;
	vSource = RedBaseFilter['baseVertexShaderSource1']
	fSource = function () {
		/* @preserve
		 precision lowp float;
		 uniform sampler2D u_diffuseTexture;
		 uniform float u_centerX;
		 uniform float u_centerY;
		 uniform float u_angle;
		 uniform float u_radius;
		 uniform bool u_grayMode;

		 float pattern(float angle, vec2 testCoord) {
			 angle = angle * 3.141592653589793/180.0;
			 float s = sin(angle), c = cos(angle);
			 vec2 tex = testCoord;
			 tex.x -= u_centerX + 0.5;
			 tex.y -= u_centerY + 0.5;
			 vec2 point = vec2(
			 c * tex.x - s * tex.y,
			 s * tex.x + c * tex.y
			 ) * vResolution / u_radius;
			 return (sin(point.x) * sin(point.y)) * 4.0;
		 }
		 void main(void) {
		     vec2 testCoord = gl_FragCoord.xy/vResolution.xy;
			 vec4 finalColor = texture2D(u_diffuseTexture, testCoord);
			 if(u_grayMode) {
				 float average = (finalColor.r + finalColor.g + finalColor.b) / 3.0;
				 gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern(u_angle,testCoord)), finalColor.a);
			 }else{
				 vec3 cmy = 1.0 - finalColor.rgb;
				 float k = min(cmy.x, min(cmy.y, cmy.z));
				 cmy = (cmy - k) / (1.0 - k);
				 cmy = clamp(cmy * 10.0 - 3.0 + vec3(pattern(u_angle + 0.26179,testCoord), pattern(u_angle + 1.30899,testCoord), pattern(u_angle,testCoord)), 0.0, 1.0);
				 k = clamp(k * 10.0 - 5.0 + pattern(u_angle + 0.78539,testCoord), 0.0, 1.0);
				 gl_FragColor = vec4(1.0 - cmy - k, finalColor.a);
			}
		 }
		 */
	};
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedFilter_HalfTone`,
		 description : `
			 HalfTone 이펙트
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
		 demo : '../example/postEffect/pixelate/RedFilter_HalfTone.html',
		 example : `
            var effect;
            effect = RedFilter_HalfTone(RedGL Instance); // 포스트이펙트 생성
            // postEffectManager는 RedView 생성시 자동생성됨.
            (RedView Instance)['postEffectManager'].addEffect(effect); // 뷰에 이펙트 추가
		 `,
		 return : 'RedFilter_HalfTone Instance'
	 }
	 :DOC*/
	RedFilter_HalfTone = function (redGL) {
		if (!(this instanceof RedFilter_HalfTone)) return new RedFilter_HalfTone(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedFilter_HalfTone : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFilterFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['centerX'] = 0.0;
		this['centerY'] = 0.0;
		this['angle'] = 0;
		this['radius'] = 2;
		this['grayMode'] = false;
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
	RedFilter_HalfTone.prototype = new RedBaseFilter();
	RedFilter_HalfTone.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototypes(
		'RedFilter_HalfTone',
		['diffuseTexture', 'sampler2D'],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`centerX`,
			 description : `
				 기본값 0.0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['centerX', 'number'],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`centerY`,
			 description : `
				 기본값 0.0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['centerY', 'number'],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`angle`,
			 description : `
				 기본값 0.0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['angle', 'number'],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`grayMode`,
			 description : `
				 기본값 false
			 `,
			 return : 'Boolean'
		 }
		 :DOC*/
		['grayMode', 'boolean'],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`radius`,
			 description : `
				 기본값 2
				 min : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['radius', 'number', {'min': 0}]
	);
	Object.freeze(RedFilter_HalfTone);
})();