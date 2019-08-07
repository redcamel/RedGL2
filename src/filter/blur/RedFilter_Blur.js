/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.7 15:42:44
 *
 */

"use strict";
var RedFilter_Blur;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedFilterBlurProgram';
	var checked;
	vSource = RedBaseFilter['baseVertexShaderSource1']
	fSource = function () {
		/* @preserve
		 precision lowp float;
		 uniform sampler2D u_diffuseTexture;
		 void main(void) {
			 vec2 px = vec2(1.0/vResolution.x, 1.0/vResolution.y);
			 vec4 finalColor = vec4(0.0);
			 vec2 testCoord = gl_FragCoord.xy/vResolution.xy;
			 finalColor += texture2D(u_diffuseTexture, testCoord + vec2(-7.0*px.x, -7.0*px.y))*0.0044299121055113265;
			 finalColor += texture2D(u_diffuseTexture, testCoord + vec2(-6.0*px.x, -6.0*px.y))*0.00895781211794;
			 finalColor += texture2D(u_diffuseTexture, testCoord + vec2(-5.0*px.x, -5.0*px.y))*0.0215963866053;
			 finalColor += texture2D(u_diffuseTexture, testCoord + vec2(-4.0*px.x, -4.0*px.y))*0.0443683338718;
			 finalColor += texture2D(u_diffuseTexture, testCoord + vec2(-3.0*px.x, -3.0*px.y))*0.0776744219933;
			 finalColor += texture2D(u_diffuseTexture, testCoord + vec2(-2.0*px.x, -2.0*px.y))*0.115876621105;
			 finalColor += texture2D(u_diffuseTexture, testCoord + vec2(-1.0*px.x, -1.0*px.y))*0.147308056121;
			 finalColor += texture2D(u_diffuseTexture, testCoord                             )*0.159576912161;
			 finalColor += texture2D(u_diffuseTexture, testCoord + vec2( 1.0*px.x,  1.0*px.y))*0.147308056121;
			 finalColor += texture2D(u_diffuseTexture, testCoord + vec2( 2.0*px.x,  2.0*px.y))*0.115876621105;
			 finalColor += texture2D(u_diffuseTexture, testCoord + vec2( 3.0*px.x,  3.0*px.y))*0.0776744219933;
			 finalColor += texture2D(u_diffuseTexture, testCoord + vec2( 4.0*px.x,  4.0*px.y))*0.0443683338718;
			 finalColor += texture2D(u_diffuseTexture, testCoord + vec2( 5.0*px.x,  5.0*px.y))*0.0215963866053;
			 finalColor += texture2D(u_diffuseTexture, testCoord + vec2( 6.0*px.x,  6.0*px.y))*0.00895781211794;
			 finalColor += texture2D(u_diffuseTexture, testCoord + vec2( 7.0*px.x,  7.0*px.y))*0.0044299121055113265;
			 gl_FragColor = finalColor;
		 }
		 */
	};
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedFilter_Blur`,
		 description : `
			 기본 블러 필터

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
		 demo : '../example/filter/blur/RedFilter_Blur.html',

		 return : 'RedFilter_Blur Instance'
	 }
	 :DOC*/
	RedFilter_Blur = function (redGL) {
		if (!(this instanceof RedFilter_Blur)) return new RedFilter_Blur(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedFilter_Blur : RedGL Instance만 허용.', redGL);
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
	RedFilter_Blur.prototype = new RedBaseFilter();
	RedFilter_Blur.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototype('RedFilter_Blur', 'diffuseTexture', 'sampler2D');
	Object.freeze(RedFilter_Blur);
})();