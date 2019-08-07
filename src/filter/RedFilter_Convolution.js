/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.7 11:32:14
 *
 */

"use strict";
var RedFilter_Convolution;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedFilterConvolutionProgram';
	var checked;
	vSource = RedBaseFilter['baseVertexShaderSource1']
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D u_diffuseTexture;
		 uniform mat3 u_kernel;
		 uniform float uKernelWeight;
		 void main(void) {
			 vec2 perPX = vec2(1.0/vResolution.x, 1.0/vResolution.y);
			   vec2 testCoord = gl_FragCoord.xy/vResolution.xy;
			 vec4 finalColor = vec4(0.0);
			 finalColor += texture2D(u_diffuseTexture, testCoord + perPX * vec2(-1.0, -1.0)) * u_kernel[0][0] ;
			 finalColor += texture2D(u_diffuseTexture, testCoord + perPX * vec2( 0.0, -1.0)) * u_kernel[0][1] ;
			 finalColor += texture2D(u_diffuseTexture, testCoord + perPX * vec2( 1.0, -1.0)) * u_kernel[0][2] ;
			 finalColor += texture2D(u_diffuseTexture, testCoord + perPX * vec2(-1.0,  0.0)) * u_kernel[1][0] ;
			 finalColor += texture2D(u_diffuseTexture, testCoord + perPX * vec2( 0.0,  0.0)) * u_kernel[1][1] ;
			 finalColor += texture2D(u_diffuseTexture, testCoord + perPX * vec2( 1.0,  0.0)) * u_kernel[1][2] ;
			 finalColor += texture2D(u_diffuseTexture, testCoord + perPX * vec2(-1.0,  1.0)) * u_kernel[2][0] ;
			 finalColor += texture2D(u_diffuseTexture, testCoord + perPX * vec2( 0.0,  1.0)) * u_kernel[2][1] ;
			 finalColor += texture2D(u_diffuseTexture, testCoord + perPX * vec2( 1.0,  1.0)) * u_kernel[2][2] ;
			 gl_FragColor = vec4((finalColor / uKernelWeight).rgb, finalColor.a);
		 }
		 */
	};
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedFilter_Convolution`,
		 description : `
			 Convolution 이펙트
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
		 demo : '../example/postEffect/RedFilter_Convolution.html',
		 example : `
            var effect;
            effect = RedFilter_DoF(RedGL Instance, RedFilter_Convolution.SHARPEN); // 포스트이펙트 생성
            // postEffectManager는 RedView 생성시 자동생성됨.
            (RedView Instance)['postEffectManager'].addEffect(effect); // 뷰에 이펙트 추가
		 `,
		 return : 'RedFilter_Convolution Instance'
	 }
	 :DOC*/
	RedFilter_Convolution = function (redGL, kernel) {
		if (!(this instanceof RedFilter_Convolution)) return new RedFilter_Convolution(redGL, kernel);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedFilter_Convolution : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFilterFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['kernel'] = kernel;
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
	RedFilter_Convolution.prototype = new RedBaseFilter();
	RedFilter_Convolution.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototype('RedFilter_Convolution', 'diffuseTexture', 'sampler2D');
	/*DOC:
	 {
	     code : 'PROPERTY',
		 title :`kernel`,
		 description : `
			 커널값.
			 3 * 3 매트릭스 형식의 배열
		 `,
		 return : 'Array'
	 }
	 :DOC*/
	Object.defineProperty(RedFilter_Convolution.prototype, 'kernel', {
		get: function () {
			if (!this['_kernel']) this['_kernel'] = RedFilter_Convolution['NORMAL'];
			return this['_kernel']
		},
		set: function (v) {
			this['_kernel'] = v
		}
	});
	Object.defineProperty(RedFilter_Convolution.prototype, 'kernelWeight', (function () {
		var sum;
		var k;
		return {
			get: function () {
				sum = 0;
				for (k in this['kernel']) sum += this['kernel'][k];
				return sum;
			}
		}
	})());
	/*DOC:
	 {
		 title :`RedFilter_Convolution.NORMAL`,
		 code : 'CONST',
		 description : `
			 <code>
			 [
				 0, 0, 0,
				 0, 1, 0,
				 0, 0, 0
			 ]
			 </code>
		 `,
		 return : 'Array'
	 }
	 :DOC*/
	RedFilter_Convolution['NORMAL'] = [
		0, 0, 0,
		0, 1, 0,
		0, 0, 0
	];
	/*DOC:
	 {
		 title :`RedFilter_Convolution.SHARPEN`,
		 code : 'CONST',
		 description : `
			 <code>
			 [
				 0, -1, 0,
				 -1, 5, -1,
				 0, -1, 0
			 ]
			 </code>
		 `,
		 return : 'Array'
	 }
	 :DOC*/
	RedFilter_Convolution['SHARPEN'] = [
		0, -1, 0,
		-1, 5, -1,
		0, -1, 0
	];
	/*DOC:
	 {
		 title :`RedFilter_Convolution.BLUR`,
		 code : 'CONST',
		 description : `
			 <code>
			 [
				 1, 1, 1,
				 1, 1, 1,
				 1, 1, 1
			 ]
			 </code>
		 `,
		 return : 'Array'
	 }
	 :DOC*/
	RedFilter_Convolution['BLUR'] = [
		1, 1, 1,
		1, 1, 1,
		1, 1, 1
	];
	/*DOC:
	 {
		 title :`RedFilter_Convolution.EDGE`,
		 code : 'CONST',
		 description : `
			 <code>
			 [
				 0, 1, 0,
				 1, -4, 1,
				 0, 1, 0
			 ]
			 </code>
		 `,
		 return : 'Array'
	 }
	 :DOC*/
	RedFilter_Convolution['EDGE'] = [
		0, 1, 0,
		1, -4, 1,
		0, 1, 0
	];
	/*DOC:
	 {
		 title :`RedFilter_Convolution.EMBOSS`,
		 code : 'CONST',
		 description : `
			 <code>
			 [
				 -2, -1, 0,
				 -1, 1, 1,
				 0, 1, 2
			 ]
			 </code>
		 `,
		 return : 'Array'
	 }
	 :DOC*/
	RedFilter_Convolution['EMBOSS'] = [
		-2, -1, 0,
		-1, 1, 1,
		0, 1, 2
	];
	Object.freeze(RedFilter_Convolution);
})();