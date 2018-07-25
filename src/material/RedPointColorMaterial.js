"use strict";
var RedPointColorMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'pointColorProgram';
	var checked;
	vSource = function () {
		/* @preserve
		 varying vec4 vColor;
		 void main(void) {
			 vColor = aVertexColor;
			 gl_Position = uPMatrix * uCameraMatrix* uMMatrix * vec4(aVertexPosition, 1.0);
			 gl_PointSize = aPointSize/gl_Position.w * uResolution.y;
		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;
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
			 vec4 finalColor = vColor * vColor.a;

			 //#define#fog#false# gl_FragColor = finalColor;
			 //#define#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPointColorMaterial`,
		 description : `
			 RedPointColorMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPointColorMaterial Instance'
	 }
	 :DOC*/
	RedPointColorMaterial = function (redGL) {
		if ( !(this instanceof RedPointColorMaterial) ) return new RedPointColorMaterial(redGL);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedPointColorMaterial : RedGL Instance만 허용됩니다.', redGL)
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource)
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['_UUID'] = RedGL.makeUUID();
		if ( !checked ) this.checkUniformAndProperty(), checked = true;
		console.log(this)
	}
	RedPointColorMaterial.prototype = new RedBaseMaterial()
	Object.freeze(RedPointColorMaterial)
})();