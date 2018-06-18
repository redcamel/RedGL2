"use strict";
var RedPointBitmapMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'pointBitmapProgram';
	vSource = function () {
		/* @preserve

		 void main(void) {
			 gl_Position = uPMatrix * uCameraMatrix* uMMatrix * vec4(aVertexPosition, 1.0);
		     gl_PointSize = aPointSize;
		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D u_diffuseTexture;
		 uniform float uAlphaTest;
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
			 if(finalColor.a < uAlphaTest) discard;
			 if(uUseFog) gl_FragColor = fog( fogFactor(uFogDistance, uFogDensity), uFogColor, finalColor);
			 else gl_FragColor = finalColor;
		 }
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPointBitmapMaterial`,
		 description : `
			 RedPointBitmapMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 diffuseTexture : [
				 {type:'RedBitmapTexture'}
			 ]
		 },
		 return : 'RedPointBitmapMaterial Instance'
	 }
	 :DOC*/
	RedPointBitmapMaterial = function (redGL, diffuseTexture) {
		if ( !(this instanceof RedPointBitmapMaterial) ) return new RedPointBitmapMaterial(redGL, diffuseTexture);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedPointBitmapMaterial : RedGL Instance만 허용됩니다.', redGL)
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
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
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
		this['alphaTest'] = 0.1
		this['_UUID'] = RedGL['makeUUID']();
		this.checkUniformAndProperty();
		console.log(this)
	}
	RedPointBitmapMaterial.prototype = new RedBaseMaterial()
	RedDefinePropertyInfo.definePrototype('RedPointBitmapMaterial', 'diffuseTexture', 'sampler2D', {essential: true});
	Object.freeze(RedPointBitmapMaterial)
})();