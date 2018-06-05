"use strict";
var RedPostEffect_Convolution;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffect_Convolution_Program';
	vSource = function () {
		/* @preserve
		 void main(void) {
		 vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
		 vResolution = uResolution;
		 gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D uDiffuseTexture;
		 uniform mat3 uKernel;
		 uniform float uKernelWeight;
		 void main(void) {
		 vec2 perPX = vec2(1.0/vResolution.x, 1.0/vResolution.y);
		 vec4 finalColor = vec4(0.0);
		 finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2(-1.0, -1.0)) * uKernel[0][0] ;
		 finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2( 0.0, -1.0)) * uKernel[0][1] ;
		 finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2( 1.0, -1.0)) * uKernel[0][2] ;
		 finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2(-1.0,  0.0)) * uKernel[1][0] ;
		 finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2( 0.0,  0.0)) * uKernel[1][1] ;
		 finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2( 1.0,  0.0)) * uKernel[1][2] ;
		 finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2(-1.0,  1.0)) * uKernel[2][0] ;
		 finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2( 0.0,  1.0)) * uKernel[2][1] ;
		 finalColor += texture2D(uDiffuseTexture, vTexcoord + perPX * vec2( 1.0,  1.0)) * uKernel[2][2] ;
		 highp float weight;
		 weight = uKernelWeight;
		 if (0.01 > weight) {
		 weight = 1.0;
		 }
		 gl_FragColor = vec4((finalColor / uKernelWeight).rgb, 1.0);
		 }
		 */
	}
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
		 return : 'RedPostEffect_Convolution Instance'
	 }
	 :DOC*/
	RedPostEffect_Convolution = function (redGL, kernel) {
		if ( !(this instanceof RedPostEffect_Convolution) ) return new RedPostEffect_Convolution(redGL, kernel);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedPostEffect_Convolution : RedGL Instance만 허용됩니다.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		/**DOC:
		 {
			 title :`kernel`,
			 description : `
				 커널값.
			 `,
			 return : 'Array'
		 }
		 :DOC*/
		this['kernel'] = kernel;
		Object.defineProperty(this, 'kernel', (function () {
			var _v;
			return {
				get: function () {
					if ( !_v ) _v = RedPostEffect_Convolution['NORMAL']
					return _v
				},
				set: function (v) {
					_v = v
				}
			}
		})());
		Object.defineProperty(this, 'kernelWeight', (function () {
			var sum;
			return {
				get: function () {
					sum = 0;
					for ( var k in this['kernel'] ) sum += this['kernel'][k];
					return sum;
				}
			}
		})());
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL['makeUUID']();
		this.updateTexture = function (lastFrameBufferTexture) {
			this['diffuseTexture'] = lastFrameBufferTexture;
		}
		this.checkUniformAndProperty();
		;
		console.log(this);
	}
	RedPostEffect_Convolution.prototype = new RedBaseMaterial();
	RedPostEffect_Convolution.prototype['bind'] = RedPostEffectManager.prototype['bind'];
	RedPostEffect_Convolution.prototype['unbind'] = RedPostEffectManager.prototype['unbind'];
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
	]
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
	]
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
	]
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
	]
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
	]
	Object.freeze(RedPostEffect_Convolution);
})();