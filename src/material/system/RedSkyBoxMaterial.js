"use strict";
var RedSkyBoxMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'skyBoxProgram';
	vSource = function () {
		/* @preserve
		 varying vec3 vReflectionCubeCoord;
		 void main(void) {
			 vReflectionCubeCoord = (uMMatrix *vec4(-aVertexPosition, 0.0)).xyz;
			 gl_Position = uPMatrix * uCameraMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform samplerCube u_skyBoxTexture;
		 varying vec3 vReflectionCubeCoord;
		 float fogFactor(float perspectiveFar, float density){
			 float flog_cord = gl_FragCoord.z / gl_FragCoord.w / perspectiveFar;
			 float fog = flog_cord * density;
			 return clamp(1.0 - fog, 0.0,  1.0);
		 }
		 vec4 fog(float fogFactor, vec4 fogColor, vec4 currentColor) {
			return mix(fogColor, currentColor, fogFactor);
		 }
		 void main(void) {
			 vec4 finalColor = textureCube(u_skyBoxTexture, vReflectionCubeCoord);
			 if(uUseFog) gl_FragColor = fog( fogFactor(uFogDistance, uFogDensity), uFogColor, finalColor);
			 else gl_FragColor = finalColor;
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedSkyBoxMaterial`,
		 description : `
			 RedSkyBoxMaterial Instance 생성.
			 RedSkyBox Instance 생성시 내부적으로 자동으로 생성됨.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 skyBoxTexture : [
				 {type:'RedBitmapCubeTexture'}
			 ]
		 },
		 example : `
			 RedSkyBoxMaterial(
				 RedGL Instance,
				 RedBitmapCubeTexture Instance
			 )
		 `,
		 return : 'RedSkyBoxMaterial Instance'
	 }
	 :DOC*/
	RedSkyBoxMaterial = function ( redGL, skyBoxTexture ) {
		if ( !(this instanceof RedSkyBoxMaterial) ) return new RedSkyBoxMaterial( redGL, skyBoxTexture );
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc( 'RedSkyBoxMaterial : RedGL Instance만 허용됩니다.', redGL )
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		/**DOC:
		 {
			 title :`skyBoxTexture`,
			 return : 'RedBitmapCubeTexture'
		 }
		 :DOC*/
		this['_skyBoxTexture'] = null;
		/////////////////////////////////////////
		// 일반 프로퍼티
		Object.defineProperty( this, 'skyBoxTexture', RedDefinePropertyInfo['skyBoxTexture'] );
		this['skyBoxTexture'] = skyBoxTexture;
		this['program'] = RedProgram['makeProgram']( redGL, PROGRAM_NAME, vSource, fSource );
		this['_UUID'] = RedGL['makeUUID']();
		this.checkUniformAndProperty();
		console.log( this )
	}
	RedSkyBoxMaterial.prototype = RedBaseMaterial.prototype
	Object.freeze( RedSkyBoxMaterial )
})();