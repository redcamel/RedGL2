/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.7 15:42:44
 *
 */

"use strict";
var RedFilter_BloomThreshold;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME;
	var checked;
	vSource = RedBaseFilter['baseVertexShaderSource1']
	fSource = function () {
		/* @preserve
		 precision lowp float;
		 uniform sampler2D u_diffuseTexture;
		 uniform float u_threshold_value;

		 void main() {
			 vec4 finalColor = texture2D(u_diffuseTexture, gl_FragCoord.xy/vResolution.xy);
			 if(0.2126 * finalColor.r + 0.7152 * finalColor.g + 0.0722 * finalColor.b < u_threshold_value)  finalColor.r = finalColor.g = finalColor.b = 0.0;
			 gl_FragColor = finalColor;
		 }
		 */
	};
	PROGRAM_NAME = 'RedFilterBloomThresholdProgram';
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedFilter_BloomThreshold`,
		 description : `
			 BloomThreshold 필터
			 RedFilter_Bloom 내부에서 사용하는 절차 필터
			 시스템적으로 사용됨.
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

		 return : 'RedFilter_BloomThreshold Instance'
	 }
	 :DOC*/
	RedFilter_BloomThreshold = function (redGL) {
		if (!(this instanceof RedFilter_BloomThreshold)) return new RedFilter_BloomThreshold(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedFilter_BloomThreshold : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFilterFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['renderScale'] = 0.5
		this['threshold'] = 128;
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
	RedFilter_BloomThreshold.prototype = new RedBaseFilter();
	RedFilter_BloomThreshold.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototypes(
		'RedFilter_BloomThreshold',
		['diffuseTexture', 'sampler2D'],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`threshold`,
			 description : `
				 최소 유효값
				 기본값 : 128
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		[
			'threshold', 'number',
			{
				min: 0, max: 255, callback: function (v) {
					this['_threshold_value'] = v / 255
				}
			}
		]
	);
	Object.freeze(RedFilter_BloomThreshold);
})();