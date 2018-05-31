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
			 color : [
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
	RedColorPhongMaterial = function (redGL, hex, alpha) {
		if (!(this instanceof RedColorPhongMaterial)) return new RedColorPhongMaterial(redGL, hex, alpha);
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		/**DOC:
		 {
			 title :`color`,
			 description : `
				 RedProgram Instance
				 직접설정하지 않도록 유의해야함!
			 `,
			 return : 'RedProgram Instance'
		 }
		 :DOC*/
		this['color'] = new Float32Array(4);
		this['shininess'] = 16
		/**DOC:
		 {
			 title :`specularPower`,
			 description : `기본값 : 1`,
			 return : 'uint'
		 }
		 :DOC*/
		this['specularPower'] = 1
		this.setColor(hex ? hex : '#ff0000', alpha == undefined ? 1 : alpha);
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = makeProgram(redGL);
		this['_UUID'] = RedGL['makeUUID']();
		this.checkProperty()
		// Object.seal(this);
		console.log(this);
	}
	makeProgram = (function () {
		var vSource, fSource;
		var PROGRAM_NAME;
		vSource = function () {
			/* @preserve
			 uniform vec4 uColor;
			 varying vec4 vColor;

			 varying vec4 vVertexPositionEye4;
			 void main(void) {
			 vColor = uColor;
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

			 uniform float uShininess;
			 uniform float uSpecularPower;

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
			 specular = pow( max(dot(R, -L), 0.0), uShininess);
			 ls +=  specularLightColor * specular * uSpecularPower * specularTextureValue * uDirectionalLightIntensity[i];
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
			 specular = pow( max(dot(R, -L), 0.0), uShininess);
			 ls +=  specularLightColor * specular * uSpecularPower * specularTextureValue * uPointLightIntensity[i] ;
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
	/**DOC:
	 {
		 code : 'METHOD',
		 title :`setColor`,
		 description : `
			 컬러설정
		 `,
		 params : {
			 hex : [
				 {type: 'hex'},
				 'ex) #fff, #ffffff'
			 ]
		 },
		 example : `// TODO:`,
		 return : 'RedProgram Instance'
	 }
	 :DOC*/
	RedColorPhongMaterial.prototype['setColor'] = RedColorMaterial.prototype['setColor'];
	Object.freeze(RedColorPhongMaterial)
})();