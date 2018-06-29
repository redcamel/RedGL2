"use strict";
var RedPostEffect_SSAO_PointMaker;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffect_SSAO_PointMaker_Program';
	vSource = function () {
		/* @preserve

		 void main(void) {
			 vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
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
			 const int cSAMPLES = 20;
			 float ao = 0.0;
			 float rand = random(vec3(tTexcoord, 0.0), depth) * uRange  ;

			for (int i = 0; i < cSAMPLES; ++i) {
				vec2 offset;
				float x;
				float y;
				x = random(vec3(tTexcoord, 0.0), depth) * uRange ;
				y = random(vec3(tTexcoord, 0.0), depth) * uRange ;
				offset = vec2(x,y) * perPX;
				vec2 tLocation2 = tTexcoord + offset   ;
				// if(tLocation2.x <0.0) continue;
				// else if(tLocation2.x >1.0) continue;
				// else if(tLocation2.y <0.0) continue;
				// else if(tLocation2.y >1.0) continue;
				// else {
					float sampleDepth = unpack_depth2(texture2D(uDepthTexture, tLocation2));
					if(abs((sampleDepth - depth)) < 0.1){
						if(sampleDepth > depth) ao+= 1.0/(float(cSAMPLES)) * (normalize(sampleDepth - depth));
					}
				// }
			}
			 ao = 1.0 - ao;
			 ao = pow(ao, uFactor2);
			 gl_FragColor = vec4(ao,ao,ao,1.0);
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
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedPostEffect_SSAO_PointMaker : RedGL Instance만 허용됩니다.', redGL)
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['subFrameBufferList'] = [
			{
				frameBuffer: RedFrameBuffer(redGL),
				renderMaterial: RedPostEffect_SSAO_DepthMaterial(redGL),
				process: []
			}
		]
		this['depthTexture'] = null;
		this['range'] = 10;
		this['factor2'] = 0.2;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL['makeUUID']();
		this.updateTexture = function (lastFrameBufferTexture, parentFrameBufferTexture) {
			this['depthTexture'] = this['subFrameBufferList'][0]['frameBuffer']['texture'];
		}
		this['bind'] = RedPostEffectManager.prototype['bind'];
		this['unbind'] = RedPostEffectManager.prototype['unbind'];
		this.checkUniformAndProperty();
		console.log(this);
	}
	RedPostEffect_SSAO_PointMaker.prototype = new RedBaseMaterial();
	RedPostEffect_SSAO_PointMaker.prototype['bind'] = RedPostEffectManager.prototype['bind'];
	RedPostEffect_SSAO_PointMaker.prototype['unbind'] = RedPostEffectManager.prototype['unbind'];
	Object.freeze(RedPostEffect_SSAO_PointMaker);
})();