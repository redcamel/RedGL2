"use strict";
var RedParticleBitmapMaterial;
//////////////////////////////////////////////////////////
// 연구중
//////////////////////////////////////////////////////////
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'particleBitmapProgram';
	vSource = function () {
		/* @preserve
		 varying vec4 vColor;
		 void main(void) {
	        gl_Position = uPMatrix * uCameraMatrix * vec4(aVertexPosition, 1.0);
			gl_PointSize = aPointSize;
			vColor = aVertexColor;
		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D u_diffuseTexture;
		 uniform float uAlphaTest;
	     varying vec4 vColor;
		 float fogFactor(float perspectiveFar, float density){
			 float flog_cord = gl_FragCoord.z / gl_FragCoord.w / perspectiveFar;
			 float fog = flog_cord * density;
			 if(1.0 - fog < 0.0) discard;
			 return clamp(1.0 - fog, 0.0,  1.0);
		 }
		 vec4 fog(float fogFactor, vec4 fogColor, vec4 currentColor) {
			return mix(fogColor, currentColor, fogFactor);
		 }
		 void main(void) {
			 vec4 finalColor = texture2D(u_diffuseTexture, vec2(gl_PointCoord.x, - gl_PointCoord.y));
		     finalColor.rgb *= finalColor.a;
			 finalColor.rgb += vColor.rgb;
			 finalColor.rgb *= vColor.a;
			 finalColor.a = finalColor.a;
			 if(finalColor.a < uAlphaTest) discard;

			 //#define#fog#false# gl_FragColor = finalColor;
			 //#define#fog#true# gl_FragColor = fog( fogFactor(uFogDistance, uFogDensity), uFogColor, finalColor);
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedParticleBitmapMaterial`,
		 description : `
			 RedParticleBitmapMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 diffuseTexture : [
				 {type:'RedBitmapTexture'}
			 ]
		 },
		 return : 'RedParticleBitmapMaterial Instance'
	 }
	 :DOC*/
	RedParticleBitmapMaterial = function (redGL, diffuseTexture) {
		if ( !(this instanceof RedParticleBitmapMaterial) ) return new RedParticleBitmapMaterial(redGL, diffuseTexture);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedParticleBitmapMaterial : RedGL Instance만 허용됩니다.', redGL)
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource)
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		/**DOC:
		 {
			 title :`diffuseTexture`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		this['diffuseTexture'] = diffuseTexture;
		/////////////////////////////////////////
		// 일반 프로퍼티
		/**DOC:
		 {
			 title :`alphaTest`,
			 description : `
			 기본값 : 0.0001
			 해당값보다 알파값이 작을경우 discard 처리됨.
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['alphaTest'] = 0.01
		this['_UUID'] = RedGL['makeUUID']();
		this.checkUniformAndProperty();
		console.log(this)
	}
	RedParticleBitmapMaterial.prototype = new RedBaseMaterial()
	RedDefinePropertyInfo.definePrototype('RedParticleBitmapMaterial', 'diffuseTexture', 'sampler2D', {essential: true});
	Object.freeze(RedParticleBitmapMaterial)
})();