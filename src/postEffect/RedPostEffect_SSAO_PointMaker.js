"use strict";
var RedPostEffect_SSAO_PointMaker;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffectSSAOPointMakerProgram';
	vSource = function () {
		/* @preserve

		 void main(void) {
			 vTexcoord = aTexcoord;
			 vResolution = uResolution;
			 vTime = uTime;
			 gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);

		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;


		 uniform sampler2D uDepthTexture;

		 uniform float uRange;
		 uniform float uFactor2;

		 highp float unpack_depth( highp vec4 rgba_depth ) {
			 const highp vec4 cBit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );
			 highp float depth = dot( rgba_depth, cBit_shift );
			 return 1.0 - depth;
		 }

		 //http://www.nutty.ca/?page_id=352&amp;link=shadow_map
		 highp float unpack_depth2 (highp vec4 colour)
		 {
			 const highp vec4 cBitShifts = vec4(
			 1.0,
			 1.0 / 255.0,
			 1.0 / (255.0 * 255.0),
			 1.0 / (255.0 * 255.0 * 255.0)
			 );
			 return 1.0 - dot(colour, cBitShifts);
		 }


		 float random(vec3 scale, float seed) {
			 return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
		 }
		 void main() {

             vec2 perPX = vec2(1.0/vResolution.x, 1.0/vResolution.y);
             vec2 tTexcoord = gl_FragCoord.xy * perPX ;


		     // 일단 뎁스산출
			 vec4 depthColor = texture2D(uDepthTexture, tTexcoord);
			 float depth = unpack_depth2(depthColor);

		     // 샘플추출
			 const int cSAMPLES = 24;
			 float ao = 0.0;

			for (int i = 0; i < cSAMPLES; ++i) {
				vec2 offset;
				float x;
				float y;
				x = sin(6.28/float(cSAMPLES) * float(i))/3.14 * uRange * random(vec3(tTexcoord+gl_FragCoord.xy,gl_FragCoord.z),0.0) ;
				y = cos(6.28/float(cSAMPLES) * float(i))/3.14 * uRange * random(vec3(tTexcoord+gl_FragCoord.xy,gl_FragCoord.z),0.0);
				offset = vec2(x,y) * perPX ;
				vec2 tLocation2 = tTexcoord + offset  ;
				// if(tLocation2.x <0.0) continue;
				// else if(tLocation2.x >1.0) continue;
				// else if(tLocation2.y <0.0) continue;
				// else if(tLocation2.y >1.0) continue;
				// else {
					float sampleDepth = unpack_depth2(texture2D(uDepthTexture, tLocation2));
					if((abs(sampleDepth - depth)) < 0.3){
						float distanceLength = abs(sampleDepth - depth);
						float attenuation = 1.0 + 1.0 / (0.01 + 0.02 * distanceLength + 0.03 * distanceLength * distanceLength);
						if(sampleDepth > depth) ao+=  1.0;

					}
				// }
			}
			 ao /= float(cSAMPLES);
			 ao = pow(ao, uFactor2);
			 ao = 1.0 - ao;
			 vec4 finalColor = vec4(ao,ao,ao,1.0);
			 float u_contrast = 0.75;
			 if (u_contrast > 0.0) finalColor.rgb = (finalColor.rgb - 0.5) / (1.0 - u_contrast) + 0.5;
			 else finalColor.rgb = (finalColor.rgb - 0.5) * (1.0 + u_contrast) + 0.5;

			 if(depth<0.1) gl_FragColor = finalColor;
			 else gl_FragColor = vec4(1.0);
			 // gl_FragColor += depthColor;

		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_SSAO_PointMaker`,
		 description : `
			 RedPostEffect_SSAO_PointMaker Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_SSAO_PointMaker Instance'
	 }
	 :DOC*/
	RedPostEffect_SSAO_PointMaker = function (redGL) {
		if ( !(this instanceof RedPostEffect_SSAO_PointMaker) ) return new RedPostEffect_SSAO_PointMaker(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_SSAO_PointMaker : RedGL Instance만 허용.', redGL)
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['_subFrameBufferList'] = [
			{
				frameBuffer: RedFrameBuffer(redGL),
				renderMaterial: RedPostEffect_SSAO_DepthMaterial(redGL),
				process: []
			}
		]
		this['depthTexture'] = null;
		this['normalTexture'] = null;
		this['range'] = 10;
		this['factor2'] = 0.2;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL.makeUUID();
		this.updateTexture = function (lastFrameBufferTexture, parentFrameBufferTexture) {
			this['depthTexture'] = this['_subFrameBufferList'][0]['frameBuffer']['texture'];
		}
		this['bind'] = RedPostEffectManager.prototype['bind'];
		this['unbind'] = RedPostEffectManager.prototype['unbind'];
		this.checkUniformAndProperty();
		console.log(this);
	}
	RedPostEffect_SSAO_PointMaker.prototype = new RedBasePostEffect();
	Object.freeze(RedPostEffect_SSAO_PointMaker);
})();