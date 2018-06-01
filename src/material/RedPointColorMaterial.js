"use strict";
var RedPointColorMaterial;
(function () {
	var makeProgram;
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
	RedPointColorMaterial = function ( redGL ) {
		if ( !(this instanceof RedPointColorMaterial) ) return new RedPointColorMaterial( redGL );
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc( 'RedPointColorMaterial : RedGL Instance만 허용됩니다.', redGL )
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = makeProgram( redGL );
		this['_UUID'] = RedGL['makeUUID']();
		this.checkUniformAndProperty()
		// Object.seal(this)
		console.log( this )
	}
	makeProgram = (function () {
		var vSource, fSource;
		var PROGRAM_NAME;
		vSource = function () {
			/* @preserve
			 varying vec4 vColor;
			 void main(void) {
				 gl_PointSize = aPointSize;
				 vColor = aVertexColor;
				 gl_Position = uPMatrix * uCameraMatrix* uMMatrix * vec4(aVertexPosition, 1.0);
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
				 if(uUseFog) gl_FragColor = fog( fogFactor(uFogDistance, uFogDensity), uFogColor, finalColor);
				 else gl_FragColor = finalColor;
			 }
			 */
		}
		vSource = RedGLUtil.getStrFromComment( vSource.toString() );
		fSource = RedGLUtil.getStrFromComment( fSource.toString() );
		// console.log(vSource, fSource)
		PROGRAM_NAME = 'pointColorProgram';
		return function ( redGL ) {
			return RedProgram( redGL, PROGRAM_NAME, vSource, fSource )

		}
	})();
	RedPointColorMaterial.prototype = RedBaseMaterial.prototype
	Object.freeze( RedPointColorMaterial )
})();