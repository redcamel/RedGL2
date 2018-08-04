"use strict";
var RedPostEffect_Convolution;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffectConvolutionProgram';
	var checked;
	vSource = function () {
		/* @preserve
		 void main(void) {
			 vTexcoord = aTexcoord;
			 vResolution = uResolution;
			 gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		 }
		 */
	};
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D u_diffuseTexture;
		 uniform mat3 u_kernel;
		 uniform float uKernelWeight;
		 void main(void) {
			 vec2 perPX = vec2(1.0/vResolution.x, 1.0/vResolution.y);
			 vec4 finalColor = vec4(0.0);
			 finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2(-1.0, -1.0)) * u_kernel[0][0] ;
			 finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2( 0.0, -1.0)) * u_kernel[0][1] ;
			 finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2( 1.0, -1.0)) * u_kernel[0][2] ;
			 finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2(-1.0,  0.0)) * u_kernel[1][0] ;
			 finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2( 0.0,  0.0)) * u_kernel[1][1] ;
			 finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2( 1.0,  0.0)) * u_kernel[1][2] ;
			 finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2(-1.0,  1.0)) * u_kernel[2][0] ;
			 finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2( 0.0,  1.0)) * u_kernel[2][1] ;
			 finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2( 1.0,  1.0)) * u_kernel[2][2] ;
			 highp float weight;
			 weight = uKernelWeight;
			 if (0.01 > weight) {
			    weight = 1.0;
			 }
			 gl_FragColor = vec4((finalColor / uKernelWeight).rgb, 1.0);
		 }
		 */
	};
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_Convolution`,
		 description : `
			 RedPostEffect_Convolution Instance 생성.
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
		 demo : '../example/RedPostEffect_Convolution.html',
		 return : 'RedPostEffect_Convolution Instance'
	 }
	 :DOC*/
	RedPostEffect_Convolution = function (redGL, kernel) {
		if ( !(this instanceof RedPostEffect_Convolution) ) return new RedPostEffect_Convolution(redGL, kernel);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_Convolution : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['kernel'] = kernel;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL.makeUUID();
		if ( !checked ) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	RedPostEffect_Convolution.prototype = new RedBasePostEffect();
	RedPostEffect_Convolution.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Convolution', 'diffuseTexture', 'sampler2D');
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`kernel`,
		 description : `
			 커널값.
		 `,
		 return : 'Array'
	 }
	 :DOC*/
	Object.defineProperty(RedPostEffect_Convolution.prototype, 'kernel', {
		get: function () {
			if ( !this['_kernel'] ) this['_kernel'] = RedPostEffect_Convolution['NORMAL'];
			return this['_kernel']
		},
		set: function (v) { this['_kernel'] = v }
	});
	Object.defineProperty(RedPostEffect_Convolution.prototype, 'kernelWeight', (function () {
		var sum;
		var k;
		return {
			get: function () {
				sum = 0;
				for ( k in this['kernel'] ) sum += this['kernel'][k];
				return sum;
			}
		}
	})());
	/**DOC:
	 {
		 title :`RedPostEffect_Convolution.NORMAL`,
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
	RedPostEffect_Convolution['NORMAL'] = [
		0, 0, 0,
		0, 1, 0,
		0, 0, 0
	];
	/**DOC:
	 {
		 title :`RedPostEffect_Convolution.SHARPEN`,
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
	RedPostEffect_Convolution['SHARPEN'] = [
		0, -1, 0,
		-1, 5, -1,
		0, -1, 0
	];
	/**DOC:
	 {
		 title :`RedPostEffect_Convolution.BLUR`,
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
	RedPostEffect_Convolution['BLUR'] = [
		1, 1, 1,
		1, 1, 1,
		1, 1, 1
	];
	/**DOC:
	 {
		 title :`RedPostEffect_Convolution.EDGE`,
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
	RedPostEffect_Convolution['EDGE'] = [
		0, 1, 0,
		1, -4, 1,
		0, 1, 0
	];
	/**DOC:
	 {
		 title :`RedPostEffect_Convolution.EMBOSS`,
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
	RedPostEffect_Convolution['EMBOSS'] = [
		-2, -1, 0,
		-1, 1, 1,
		0, 1, 2
	];
	Object.freeze(RedPostEffect_Convolution);
})();