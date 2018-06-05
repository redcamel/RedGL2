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

		 float PHI = 1.61803398874989484820459 * 00000.1; // Golden Ratio
		 float PI  = 3.14159265358979323846264 * 00000.1; // PI
		 float SQ2 = 1.41421356237309504880169 * 10000.0; // Square Root of Two


		 highp float unpack_depth( const in highp vec4 rgba_depth ) {
		 const highp vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );
		 highp float depth = dot( rgba_depth, bit_shift );
		 return 1.0 - depth;
		 }

		 //http://www.nutty.ca/?page_id=352&amp;link=shadow_map
		 highp float unpack_depth2 (highp vec4 colour)
		 {
		 const highp vec4 bitShifts = vec4(
		 1.0,
		 1.0 / 255.0,
		 1.0 / (255.0 * 255.0),
		 1.0 / (255.0 * 255.0 * 255.0)
		 );
		 return 1.0 - dot(colour, bitShifts);
		 }


		 float random(vec3 scale, float seed) {
		 return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
		 }
		 void main() {

		 vec2 tLocation = gl_FragCoord.xy/vResolution ;
		 vec2 px = vec2(1.0/vResolution.x, 1.0/vResolution.y);

		 vec4 depthColor = texture2D(uDepthTexture, vTexcoord);
		 float depth = unpack_depth2(depthColor);
		 const int SAMPLES = 8;
		 float ao = 0.0;
		 float rand = random(vec3(tLocation, 0.0), 0.0) * uRange  ;
		 for (int i = 0; i < SAMPLES; ++i) {

		 vec2 offset;


		 float x;
		 float y;
		 float per = 3.14/(float(SAMPLES) ) * float(i);
		 x = rand * sin(per) / 3.14;
		 y = rand * cos(per) / 3.14;

		 offset = vec2(x*px.x, y*px.y);

		 vec2 tLocation2 = tLocation + offset   ;

		 if(tLocation2.x <0.0) continue;
		 else if(tLocation2.x >1.0) continue;
		 else if(tLocation2.y <0.0) continue;
		 else if(tLocation2.y >1.0) continue;
		 else {
		 float sampleDepth = unpack_depth2(texture2D(uDepthTexture, tLocation2));
		 // if(sampleDepth < 0.9){
		 if(abs((sampleDepth - depth)) < 0.01){
		 if(sampleDepth > depth) ao+= 1.0/(float(SAMPLES)) * abs(normalize(sampleDepth - depth)) ;

		 }
		 // }

		 }
		 }

		 ao = 1.0 - ao;
		 ao = pow(ao, uFactor2);
		 gl_FragColor = vec4(ao,ao,ao,1.0);
		 // gl_FragColor = depthColor;

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
		this['subFrameBufferInfo'] = {
			frameBuffer: RedFrameBuffer(redGL),
			renderMaterial: RedPostEffect_SSAO_DepthMaterial(redGL),
			process: [
				RedPostEffect_BlurX(redGL),
				RedPostEffect_BlurY(redGL)
			]
		}
		this['depthTexture'] = null;
		this['range'] = 10;
		this['factor2'] = 0.2;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL['makeUUID']();
		this.updateTexture = function (lastFrameBufferTexture, parentFramBufferTexture) {
			this['depthTexture'] = this['subFrameBufferInfo']['frameBuffer']['texture'];
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