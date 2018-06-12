"use strict";
var RedPostEffect_HalfTone;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffect_HalfTone_Program';
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
		 uniform float u_centerX;
		 uniform float u_centerY;
		 uniform float u_angle;
		 uniform float u_radius;
		 uniform bool uGrayMode;
		 float pattern(float angle) {
			 angle = angle * 3.141592653589793/180.0;
			 float s = sin(angle), c = cos(angle);
			 vec2 tex = vTexcoord;
			 tex.x -= u_centerX + 0.5;
			 tex.y -= u_centerY + 0.5;
			 vec2 point = vec2(
			 c * tex.x - s * tex.y,
			 s * tex.x + c * tex.y
			 ) * vResolution / u_radius;
			 return (sin(point.x) * sin(point.y)) * 4.0;
		 }
		 void main(void) {
			 vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord);
			 if(uGrayMode) {
				 float average = (finalColor.r + finalColor.g + finalColor.b) / 3.0;
				 gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern(u_angle)), finalColor.a);
			 }else{
				 vec3 cmy = 1.0 - finalColor.rgb;
				 float k = min(cmy.x, min(cmy.y, cmy.z));
				 cmy = (cmy - k) / (1.0 - k);
				 cmy = clamp(cmy * 10.0 - 3.0 + vec3(pattern(u_angle + 0.26179), pattern(u_angle + 1.30899), pattern(u_angle)), 0.0, 1.0);
				 k = clamp(k * 10.0 - 5.0 + pattern(u_angle + 0.78539), 0.0, 1.0);
				 gl_FragColor = vec4(1.0 - cmy - k, finalColor.a);
		    }
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_HalfTone`,
		 description : `
			 RedPostEffect_HalfTone Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_HalfTone Instance'
	 }
	 :DOC*/
	//TODO: 각각의 값을 정의해봐야겠군....의미가 아리까리..
	RedPostEffect_HalfTone = function (redGL) {
		if ( !(this instanceof RedPostEffect_HalfTone) ) return new RedPostEffect_HalfTone(redGL);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedPostEffect_HalfTone : RedGL Instance만 허용됩니다.', redGL)
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['centerX'] = 0.0;
		this['centerY'] = 0.0;
		this['angle'] = 0;
		this['radius'] = 2;
		this['grayMode'] = false;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL['makeUUID']();
		this.updateTexture = function (lastFrameBufferTexture) {
			this['diffuseTexture'] = lastFrameBufferTexture
		}
		this.checkUniformAndProperty();
		console.log(this);
	}
	RedPostEffect_HalfTone.prototype = new RedBaseMaterial();
	RedPostEffect_HalfTone.prototype['bind'] = RedPostEffectManager.prototype['bind'];
	RedPostEffect_HalfTone.prototype['unbind'] = RedPostEffectManager.prototype['unbind'];
	RedDefinePropertyInfo.definePrototype('RedPostEffect_HalfTone', 'centerX', 'number')
	RedDefinePropertyInfo.definePrototype('RedPostEffect_HalfTone', 'centerY', 'number')
	RedDefinePropertyInfo.definePrototype('RedPostEffect_HalfTone', 'angle', 'number')
	RedDefinePropertyInfo.definePrototype('RedPostEffect_HalfTone', 'radius', 'number', {'min': 0})
	Object.freeze(RedPostEffect_HalfTone);
})();