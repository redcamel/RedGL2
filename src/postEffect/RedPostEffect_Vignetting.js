/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.6.20 11:36
 */

"use strict";
var RedPostEffect_Vignetting;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffectVignettingProgram';
	var checked;
	vSource = RedBasePostEffect['baseVertexShaderSource1']
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D u_diffuseTexture;
		 uniform float u_size;
		 uniform float u_intensity;
		 void main(void) {
			 vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord );
			 float dist = distance(vTexcoord, vec2(0.5, 0.5));
			 finalColor.rgb *= smoothstep(0.8, u_size * 0.799, dist * (u_intensity + u_size));
			 gl_FragColor = finalColor;
		 }
		 */
	};
	/*DOC:
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
		 extends : [
		    'RedBasePostEffect',
		    'RedBaseMaterial'
		 ],
		 demo : '../example/postEffect/RedPostEffect_Vignetting.html',
		 example : `
            var effect;
            effect = RedPostEffect_Vignetting(RedGL Instance); // 포스트이펙트 생성
            // postEffectManager는 RedView 생성시 자동생성됨.
            (RedView Instance)['postEffectManager'].addEffect(effect); // 뷰에 이펙트 추가
		 `,
		 return : 'RedPostEffect_Vignetting Instance'
	 }
	 :DOC*/
	RedPostEffect_Vignetting = function (redGL) {
		if (!(this instanceof RedPostEffect_Vignetting)) return new RedPostEffect_Vignetting(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_Vignetting : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['size'] = 0.1;
		this['intensity'] = 0.85;
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
	RedPostEffect_Vignetting.prototype = new RedBasePostEffect();
	RedPostEffect_Vignetting.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototypes(
		'RedPostEffect_Vignetting',
		['diffuseTexture', 'sampler2D'],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`intensity`,
			 description : `
				 비네팅 강도
				 기본값 : 0.85
				 min : 0
		 `,
		 return : 'Number'
		 }
		 :DOC*/
		['intensity', 'number', {'min': 0}],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`size`,
			 description : `
				 비네팅사이즈
				 기본값 : 0.1
				 min : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['size', 'number', {'min': 0}]
	);
	Object.freeze(RedPostEffect_Vignetting);
})();