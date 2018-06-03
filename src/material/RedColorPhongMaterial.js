"use strict";
var RedColorPhongMaterial;
(function () {
	var makeProgram;
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedColorPhongMaterial`,
		 description : `
			 RedColorPhongMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 hexColor : [
				 {type:'hex'}
			 ],
			 alpha : [
				 {type:'number'},
				 '알파값'
			 ]
		 },
		 example: `
		 RedColorPhongMaterial(RedGL Instance, hex, alpha)
		 `,
		 return : 'RedColorPhongMaterial Instance'
	 }
	 :DOC*/
	RedColorPhongMaterial = function (redGL, hexColor, alpha) {
		if (!(this instanceof RedColorPhongMaterial)) return new RedColorPhongMaterial(redGL, hexColor, alpha);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedColorPhongMaterial : RedGL Instance만 허용됩니다.', '입력값 : ' + redGL);
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		this['_color'] = new Float32Array(4);
		/**DOC:
		 {
			 title :`shininess`,
			 description : `기본값 : 16`,
			 return : 'shininess'
		 }
		 :DOC*/
		this['_shininess'] = 16
		/**DOC:
		 {
			 title :`specularPower`,
			 description : `기본값 : 1`,
			 return : 'Number'
		 }
		 :DOC*/
		this['_specularPower'] = 1
		/////////////////////////////////////////
		// 일반 프로퍼티
		Object.defineProperty(this, 'color', RedDefinePropertyInfo['color']);
		Object.defineProperty(this, 'alpha', RedDefinePropertyInfo['alpha']);
		Object.defineProperty(this, 'shininess', RedDefinePropertyInfo['shininess']);
		Object.defineProperty(this, 'specularPower', RedDefinePropertyInfo['specularPower']);
		this['alpha'] = alpha == undefined ? 1 : alpha;
		this['color'] = hexColor ? hexColor : '#ff0000'
		this['program'] = makeProgram(redGL);
		this['_UUID'] = RedGL['makeUUID']();
		this.checkUniformAndProperty();
		console.log(this);
	}
	makeProgram = (function () {
		var vSource, fSource;
		var PROGRAM_NAME;
		vSource = function () {
			/* @preserve
			 uniform vec4 u_color;
			 varying vec4 vColor;
			 varying vec4 vVertexPositionEye4;
			 void main(void) {
				 vColor = u_color;
				 vVertexNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0));
				 vVertexPositionEye4 = uMMatrix * vec4(aVertexPosition, 1.0);
				 gl_PointSize = uPointSize;
				 gl_Position = uPMatrix * uCameraMatrix* vVertexPositionEye4;
			 }
			 */
		}
		fSource = function () {
			/* @preserve
			 precision mediump float;
			 uniform float u_shininess;
			 uniform float u_specularPower;
			 varying vec4 vVertexPositionEye4;
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
				 vec4 la = uAmbientLightColor * uAmbientLightColor.a;
				 vec4 ld = vec4(0.0, 0.0, 0.0, 1.0);
				 vec4 ls = vec4(0.0, 0.0, 0.0, 1.0);

				 vec4 texelColor = vColor;
				 // texelColor.rgb *= texelColor.a;
				 vec3 N = normalize(vVertexNormal);

				 vec4 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
				 float specularTextureValue = 1.0;
				 float specular;

				 vec3 L;
				 vec3 R;
				 highp float lambertTerm;
				 for(int i=0; i<cDIRETIONAL_MAX; i++){
					 if(i == uDirectionalLightNum) break;
					 L = normalize(-uDirectionalLightPosition[i]);
					 lambertTerm = dot(N,-L);
					 if(lambertTerm > 0.0){
						 ld += (uDirectionalLightColor[i] * texelColor * lambertTerm * uDirectionalLightIntensity[i]) * uDirectionalLightColor[i].a;
						 R = reflect(L, N);
						 specular = pow( max(dot(R, -L), 0.0), u_shininess);
						 ls +=  specularLightColor * specular * u_specularPower * specularTextureValue * uDirectionalLightIntensity[i];
					 }
				 }
				 vec3 pointDirection;
				 highp float distanceLength;
				 highp float attenuation;
				 for(int i=0;i<cPOINT_MAX;i++){
					 if(i== uPointLightNum) break;
					 pointDirection =  -uPointLightPosition[i] + vVertexPositionEye4.xyz;
					 distanceLength = length(pointDirection);
					 if(uPointLightRadius[i]> distanceLength){
						 attenuation = 1.0 / (0.01 + 0.02 * distanceLength + 0.03 * distanceLength * distanceLength);
						 L = normalize(pointDirection);
						 lambertTerm = dot(N,-L);
						 if(lambertTerm > 0.0){
							 ld += (uPointLightColor[i] * texelColor * lambertTerm * attenuation * uPointLightIntensity[i]) * uPointLightColor[i].a;
							 R = reflect(L, N);
							 specular = pow( max(dot(R, -L), 0.0), u_shininess);
							 ls +=  specularLightColor * specular * u_specularPower * specularTextureValue * uPointLightIntensity[i] ;
						 }
					 }
				 }
				 vec4 finalColor = la * uAmbientIntensity + ld + ls;
				 finalColor.rgb *= texelColor.a;
				 finalColor.a = texelColor.a;
				 if(uUseFog) gl_FragColor = fog( fogFactor(uFogDistance, uFogDensity), uFogColor, finalColor);
				 else gl_FragColor = finalColor;
			 }
			 */
		}
		vSource = RedGLUtil.getStrFromComment(vSource.toString());
		fSource = RedGLUtil.getStrFromComment(fSource.toString());
		// console.log(vSource, fSource)
		PROGRAM_NAME = 'colorPhongProgram';
		return function (redGL) {
			return RedProgram(redGL, PROGRAM_NAME, vSource, fSource)

		}
	})();
	RedColorPhongMaterial.prototype = RedBaseMaterial.prototype
	Object.freeze(RedColorPhongMaterial)
})();