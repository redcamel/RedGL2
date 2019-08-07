/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.7 15:37:40
 *
 */

"use strict";
var RedFilter_HueSaturation;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedFilterHueSaturationProgram';
	var checked;
	vSource = RedBaseFilter['baseVertexShaderSource1']
	fSource = function () {
		/* @preserve
		 precision lowp float;
		 uniform sampler2D u_diffuseTexture;
		 uniform float u_hue_value;
		 uniform float u_saturation_value;
		 void main(void) {
		   vec2 testCoord = gl_FragCoord.xy/vResolution.xy;
			 vec4 finalColor = texture2D(u_diffuseTexture, testCoord );
			 float angle = u_hue_value * 3.1415926535897932384626433832795;
			 float s = sin(angle), c = cos(angle);
			 vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;
			 float len = length(finalColor.rgb);

			 finalColor.rgb = vec3(
				 dot(finalColor.rgb, weights.xyz),
				 dot(finalColor.rgb, weights.zxy),
				 dot(finalColor.rgb, weights.yzx)
			 );

			 float average = (finalColor.r + finalColor.g + finalColor.b) / 3.0;
			 if (u_saturation_value > 0.0) finalColor.rgb += (average - finalColor.rgb) * (1.0 - 1.0 / (1.001 - u_saturation_value));
			 else finalColor.rgb += (average - finalColor.rgb) * (-u_saturation_value);
			 gl_FragColor = finalColor;
		 }
		 */
	};
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedFilter_HueSaturation`,
		 description : `
			 HueSaturation 이펙트
			 filterManager.addEffect( effect Instance ) 로 추가.
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
		 demo : '../example/filter/adjustments/RedFilter_HueSaturation.html',

		 return : 'RedFilter_HueSaturation Instance'
	 }
	 :DOC*/
	RedFilter_HueSaturation = function (redGL) {
		if (!(this instanceof RedFilter_HueSaturation)) return new RedFilter_HueSaturation(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedFilter_HueSaturation : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFilterFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['hue'] = 0;
		this['saturation'] = 0;
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
	RedFilter_HueSaturation.prototype = new RedBaseFilter();
	RedFilter_HueSaturation.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototypes(
		'RedFilter_HueSaturation',
		['diffuseTexture', 'sampler2D'],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`hue`,
			 description : `
				 색조
				 기본값 : 0
				 min: -180
				 max: 180
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['hue', 'number', {
			min: -180, max: 180, callback: function (v) {
				this['_hue_value'] = v / 180
			}
		}],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`saturation`,
			 description : `
				 채도
				 기본값 : 0
				 min: -100
				 max: 100
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['saturation', 'number', {
			min: -100, max: 100, callback: function (v) {
				this['_saturation_value'] = v / 100
			}
		}]
	);
	Object.freeze(RedFilter_HueSaturation);
})();