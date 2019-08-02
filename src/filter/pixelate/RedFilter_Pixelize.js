/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.2 18:16:21
 *
 */

"use strict";
var RedFilter_Pixelize;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedFilterPixelizeProgram';
	var checked;
	vSource = RedBaseFilter['baseVertexShaderSource1']
	fSource = function () {
		/* @preserve
		 precision lowp float;
		 uniform sampler2D u_diffuseTexture;
		 uniform float u_width;
		 uniform float u_height;
		 void main(void) {
			 vec4 finalColor;
			 float dx = 1.0/vResolution.x * u_width;
			 float dy = 1.0/vResolution.y * u_height;
			    vec2 testCoord = gl_FragCoord.xy/vResolution.xy;
			 vec2 coord = vec2(
				 dx * (floor(testCoord.x / dx) + 0.5),
				 dy * (floor(testCoord.y / dy) + 0.5)
			 );
			 finalColor = texture2D(u_diffuseTexture, coord);
			 gl_FragColor = finalColor;
		 }
		 */
	};
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedFilter_Pixelize`,
		 description : `
			 Pixelize 효과
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
		 demo : '../example/postEffect/pixelate/RedFilter_Pixelize.html',
		 example : `
            var effect;
            effect = RedFilter_Pixelize(RedGL Instance); // 포스트이펙트 생성
            // postEffectManager는 RedView 생성시 자동생성됨.
            (RedView Instance)['postEffectManager'].addEffect(effect); // 뷰에 이펙트 추가
		 `,
		 return : 'RedFilter_Pixelize Instance'
	 }
	 :DOC*/
	RedFilter_Pixelize = function (redGL) {
		if (!(this instanceof RedFilter_Pixelize)) return new RedFilter_Pixelize(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedFilter_Pixelize : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFilterFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['width'] = 5;
		this['height'] = 5;
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
	RedFilter_Pixelize.prototype = new RedBaseFilter();
	RedFilter_Pixelize.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototypes(
		'RedFilter_Pixelize',
		['diffuseTexture', 'sampler2D'],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`width`,
			 description : `
				 픽셀화 가로 크기
				 기본값 : 5
				 min : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['width', 'number', {'min': 0}],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`height`,
			 description : `
				 픽셀화 세로 크기
				 기본값 : 5
				 min : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['height', 'number', {'min': 0}]
	);
	Object.freeze(RedFilter_Pixelize);
})();