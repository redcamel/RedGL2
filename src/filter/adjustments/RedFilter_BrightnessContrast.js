/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.7 15:42:44
 *
 */

"use strict";
var RedFilter_BrightnessContrast;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedFilterBrightnessContrastProgram';
	var checked;
	vSource = RedBaseFilter['baseVertexShaderSource1']
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D u_diffuseTexture;
		 uniform float u_brightness_value;
		 uniform float u_contrast_value;
		 void main(void) {
			 vec4 finalColor = texture2D(u_diffuseTexture, gl_FragCoord.xy/vResolution );
			 if (u_contrast_value > 0.0) finalColor.rgb = (finalColor.rgb - 0.5) / (1.0 - u_contrast_value) + 0.5;
			 else finalColor.rgb = (finalColor.rgb - 0.5) * (1.0 + u_contrast_value) + 0.5;
			 finalColor.rgb += u_brightness_value;
			 gl_FragColor = finalColor;
		 }
		 */
	};
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedFilter_BrightnessContrast`,
		 description : `
			 BrightnessContrast 필터

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
		 demo : '../example/filter/adjustments/RedFilter_BrightnessContrast.html',

		 return : 'RedFilter_BrightnessContrast Instance'
	 }
	 :DOC*/
	RedFilter_BrightnessContrast = function (redGL) {
		if (!(this instanceof RedFilter_BrightnessContrast)) return new RedFilter_BrightnessContrast(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedFilter_BrightnessContrast : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFilterFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['brightness'] = 0;
		this['contrast'] = 0;
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
	RedFilter_BrightnessContrast.prototype = new RedBaseFilter();
	RedFilter_BrightnessContrast.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototypes(
		'RedFilter_BrightnessContrast',
		['diffuseTexture', 'sampler2D'],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`brightness`,
			 description : `
				 밝기
				 기본값 : 0
				 min : -150
				 max : 150
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['brightness', 'number', {
			min: -150, max: 150, callback: function (v) {
				this['_brightness_value'] = v / 255
			}
		}],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`contrast`,
			 description : `
				 대조
				 기본값 : 0
				 min: -50
				 max: 100
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['contrast', 'number', {
			min: -50, max: 100, callback: function (v) {
				this['_contrast_value'] = v / 255
			}
		}]
	);
	Object.freeze(RedFilter_BrightnessContrast);
})();