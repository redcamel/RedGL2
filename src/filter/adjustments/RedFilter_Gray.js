/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.6 14:20:40
 *
 */

"use strict";
var RedFilter_Gray;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedFilterGrayProgram';
	var checked;
	vSource = RedBaseFilter['baseVertexShaderSource1']
	fSource = function () {
		/* @preserve
		 precision lowp float;
		 uniform sampler2D u_diffuseTexture;
		 void main(void) {
			 vec4 finalColor = texture2D(u_diffuseTexture, gl_FragCoord.xy/vResolution);
			 highp float gray = (finalColor.r  + finalColor.g + finalColor.b)/3.0;
			 gl_FragColor = vec4( gray, gray, gray, finalColor.a);
		 }
		 */
	};
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedFilter_Gray`,
		 description : `
			 Gray 이펙트
			 postEffectManager.addEffect( effect Instance ) 로 추가.
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
		 demo : '../example/postEffect/adjustments/RedFilter_Gray.html',
		 example : `
			var effect;
			effect = RedFilter_Gray(RedGL Instance); // 포스트이펙트 생성
			// postEffectManager는 RedView 생성시 자동생성됨.
			(RedView Instance)['postEffectManager'].addEffect(effect); // 뷰에 이펙트 추가
		 `,
		 return : 'RedFilter_Gray Instance'
	 }
	 :DOC*/
	RedFilter_Gray = function (redGL) {
		if (!(this instanceof RedFilter_Gray)) return new RedFilter_Gray(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedFilter_Gray : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFilterFrameBuffer(redGL);
		this['diffuseTexture'] = null;
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
	RedFilter_Gray.prototype = new RedBaseFilter();
	RedFilter_Gray.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototype('RedFilter_Gray', 'diffuseTexture', 'sampler2D');
	Object.freeze(RedFilter_Gray);
})();