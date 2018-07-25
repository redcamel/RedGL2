"use strict";
var RedGridMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'gridMaterialProgram';
	var checked;
	vSource = function () {
		/* @preserve
		 varying vec4 vColor;
		 void main(void) {
			 vColor = aVertexColor;
			 gl_Position = uPMatrix * uCameraMatrix* uMMatrix * vec4(aVertexPosition, 1.0);
		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 float fogFactor(float perspectiveFar, float density){
			 float flog_cord = gl_FragCoord.z / gl_FragCoord.w / perspectiveFar;
			 float fog = flog_cord * density;
			 if(1.0 - fog < 0.0) discard;
			 return clamp(1.0 - fog, 0.0,  1.0);
		 }
		 vec4 fog(float fogFactor, vec4 fogColor, vec4 currentColor) {
			return mix(fogColor, currentColor, fogFactor);
		 }
		 varying vec4 vColor;
		 void main(void) {
			 vec4 finalColor = vColor;
			 finalColor.rgb *= vColor.a;
			 //#define#fog#false# gl_FragColor = finalColor;
			 //#define#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedGridMaterial`,
		 description : `
			 RedGridMaterial Instance 생성.
			 RedGrid Instance 새성시 내부적으로 자동으로 생성됨.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 example : `
			 RedGridMaterial(RedGL Instance)
		 `,
		 return : 'RedGridMaterial Instance'
	 }
	 :DOC*/
	RedGridMaterial = function (redGL) {
		if ( !(this instanceof RedGridMaterial) ) return new RedGridMaterial(redGL);
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource)
		// 유니폼 프로퍼티
		// 일반 프로퍼티
		this['_UUID'] = RedGL.makeUUID();
		if ( !checked ) this.checkUniformAndProperty(), checked = true;
		console.log(this)
	}
	RedGridMaterial.prototype = new RedBaseMaterial()
	Object.freeze(RedGridMaterial)
})();