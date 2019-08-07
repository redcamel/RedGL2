/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.7 15:37:40
 *
 */

"use strict";
var RedFilter_Bloom;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedFilterBloomProgram';
	var checked;
	vSource = RedBaseFilter['baseVertexShaderSource1']
	fSource = function () {
		/* @preserve
		 precision lowp float;
		 uniform sampler2D u_diffuseTexture;
		 uniform sampler2D u_blurTexture;
		 uniform float u_exposure;
		 uniform float u_bloomStrength;

		 void main() {
			 vec4 finalColor = texture2D(u_diffuseTexture, gl_FragCoord.xy/vResolution.xy);
			 vec4 thresholdColor = finalColor;
			 vec4 blurColor = texture2D(u_blurTexture, gl_FragCoord.xy/vResolution.xy);
			 finalColor.rgb = (finalColor.rgb  + blurColor.rgb * u_bloomStrength) * u_exposure;
			 gl_FragColor = finalColor ;
		 }
		 */
	};
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedFilter_Bloom`,
		 description : `
			 Bloom 이펙트
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
		 demo : '../example/filter/bloom/RedFilter_Bloom.html',

		 return : 'RedFilter_Bloom Instance'
	 }
	 :DOC*/
	RedFilter_Bloom = function (redGL) {
		if (!(this instanceof RedFilter_Bloom)) return new RedFilter_Bloom(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedFilter_Bloom : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFilterFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['blurTexture'] = null;
		this['exposure'] = 1;
		this['bloomStrength'] = 1.2;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['_process'] = [
			RedFilter_BloomThreshold(redGL),
			RedFilter_BlurX(redGL),
			RedFilter_BlurY(redGL)
		];
		this['blur'] = 20;
		this['threshold'] = 75;
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL.makeUUID();
		if (!checked) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	RedFilter_Bloom.prototype = new RedBaseFilter();
	RedFilter_Bloom.prototype['updateTexture'] = function (lastFrameBufferTexture, parentFrameBufferTexture) {
		this['diffuseTexture'] = parentFrameBufferTexture;
		this['blurTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototypes(
		'RedFilter_Bloom',
		['diffuseTexture', 'sampler2D'],
		['blurTexture', 'sampler2D'],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`exposure`,
			 description : `
				 확산 강도.
				 기본값 : 1
				 min : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['exposure', 'number', {'min': 0}],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`bloomStrength`,
			 description : `
				 블룸 강도
				 기본값 : 1.2
				 min : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['bloomStrength', 'number', {'min': 0}],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`threshold`,
			 description : `
				 최소 유효값
				 기본값 : 75
				 min : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['threshold', 'number', {
			min: 0,
			callback: function (v) {
				this['_process'][0]['threshold'] = v;
				this['_threshold'] = this['_process'][0]['threshold']
			}
		}],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`blur`,
			 description : `
				 blur 정도.
				 기본값 : 20
				 min : 0
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['blur', 'number', {
			min: 0, callback: function (v) {
				this['_process'][1]['size'] = v;
				this['_process'][2]['size'] = v;
			}
		}]
	);
	Object.freeze(RedFilter_Bloom);
})();