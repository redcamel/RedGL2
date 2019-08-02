/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.2 18:16:21
 *
 */

"use strict";
var RedFilter_Threshold;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedFilterThresholdProgram';
	var checked;
	vSource = RedBaseFilter['baseVertexShaderSource1']
	fSource = function () {
		/* @preserve
		 precision lowp float;
		 uniform sampler2D u_diffuseTexture;
		 uniform float u_threshold_value;
		 void main() {
			 vec4 finalColor = texture2D(u_diffuseTexture,  gl_FragCoord.xy/vResolution.xy);
			 float v;
			 if(0.2126 * finalColor.r + 0.7152 * finalColor.g + 0.0722 * finalColor.b >= u_threshold_value) v = 1.0;
			 else v = 0.0;
			 finalColor.r = finalColor.g = finalColor.b = v;
			 gl_FragColor = finalColor;
		 }
		 */
	};
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedFilter_Threshold`,
		 description : `
			 Threshold 이펙트
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
		 demo : '../example/postEffect/adjustments/RedFilter_Threshold.html',
		 example : `
            var effect;
            effect = RedFilter_Threshold(RedGL Instance); // 포스트이펙트 생성
            // postEffectManager는 RedView 생성시 자동생성됨.
            (RedView Instance)['postEffectManager'].addEffect(effect); // 뷰에 이펙트 추가
		 `,
		 return : 'RedFilter_Threshold Instance'
	 }
	 :DOC*/
	RedFilter_Threshold = function (redGL) {
		if (!(this instanceof RedFilter_Threshold)) return new RedFilter_Threshold(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedFilter_Threshold : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFilterFrameBuffer(redGL);
		this['diffuseTexture'] = null;
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
	RedFilter_Threshold.prototype = new RedBaseFilter();
	RedFilter_Threshold.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototypes(
		'RedFilter_Threshold',
		['diffuseTexture', 'sampler2D'],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`threshold`,
			 description : `
				 최소 유효값
				 기본값 : 128
				 min: 1
				 max: 255
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		[
			'threshold', 'number',
			{
				min: 1, max: 255, callback: function (v) {
					this['_threshold_value'] = v / 255
				}
			}
		]
	);

	Object.freeze(RedFilter_Threshold);
})();