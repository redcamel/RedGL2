"use strict";
var RedStandardMaterial;
(function () {
	var makeProgram;
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedStandardMaterial`,
		 description : `
			 RedStandardMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 diffuseTexture : [
				 {type:'RedBitmapTexture'}
			 ],
			 normalTexture : [
				 {type:'RedBitmapTexture'}
			 ],
			 specularTexture : [
				 {type:'RedBitmapTexture'}
			 ],
			 displacementTexture : [
				 {type:'RedBitmapTexture'}
			 ]
		 },
		 example : `
			 RedStandardMaterial(
				 RedGL Instance,
				 RedBitmapTexture(RedGL Instance, src), // diffuseTexture
				 RedBitmapTexture(RedGL Instance, src), // normalTexture
				 RedBitmapTexture(RedGL Instance, src), // specularTexture
				 RedBitmapTexture(RedGL Instance, src)  // displacementTexture
			 )
		 `,
		 return : 'RedStandardMaterial Instance'
	 }
	 :DOC*/
	RedStandardMaterial = function (redGL, diffuseTexture, normalTexture, specularTexture, displacementTexture) {
		if (!(this instanceof RedStandardMaterial)) return new RedStandardMaterial(redGL, diffuseTexture, normalTexture, specularTexture, displacementTexture);
		if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedStandardMaterial : RedGL Instance만 허용됩니다.', redGL)
		if (!(diffuseTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedStandardMaterial : diffuseTexture - RedBitmapTexture Instance만 허용됩니다.')
		if (normalTexture && !(normalTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedStandardMaterial : normalTexture - RedBitmapTexture Instance만 허용됩니다.')
		if (specularTexture && !(specularTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedStandardMaterial : specularTexture - RedBitmapTexture Instance만 허용됩니다.')
		if (displacementTexture && !(displacementTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedStandardMaterial : displacementTexture - RedBitmapTexture Instance만 허용됩니다.')

		/////////////////////////////////////////
		// 유니폼 프로퍼티
		/**DOC:
		 {
			 title :`diffuseTexture`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		this['_diffuseTexture'] = diffuseTexture;
		/**DOC:
		 {
			 title :`normalTexture`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		this['_normalTexture'] = normalTexture;
		/**DOC:
		 {
			 title :`specularTexture`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		this['_specularTexture'] = specularTexture;
		/**DOC:
		 {
			 title :`shininess`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		this['_displacementTexture'] = displacementTexture;
		/**DOC:
		 {
			 title :`shininess`,
			 description : `기본값 : 16`,
			 return : 'number'
		 }
		 :DOC*/
		this['_shininess'] = 16
		/**DOC:
		 {
			 title :`specularPower`,
			 description : `기본값 : 1`,
			 return : 'number'
		 }
		 :DOC*/
		this['_specularPower'] = 1
		/**DOC:
		 {
			 title :`displacementPower`,
			 description : `기본값 : 0`,
			 return : 'Number'
		 }
		 :DOC*/
		this['_displacementPower'] = 0
		/////////////////////////////////////////
		// 일반 프로퍼티
		Object.defineProperty(this, 'diffuseTexture', RedDefinePropertyInfo['diffuseTexture']);
		Object.defineProperty(this, 'normalTexture', RedDefinePropertyInfo['normalTexture']);
		Object.defineProperty(this, 'specularTexture', RedDefinePropertyInfo['specularTexture']);
		Object.defineProperty(this, 'displacementTexture', RedDefinePropertyInfo['displacementTexture']);
		Object.defineProperty(this, 'shininess', RedDefinePropertyInfo['shininess']);
		Object.defineProperty(this, 'specularPower', RedDefinePropertyInfo['specularPower']);
		Object.defineProperty(this, 'displacementPower', RedDefinePropertyInfo['displacementPower']);
		this['program'] = makeProgram(redGL);
		this['_UUID'] = RedGL['makeUUID']();
		this.checkUniformAndProperty();
		console.log(this)
		// Object.seal(this)
	}
	makeProgram = (function () {
		var vSource, fSource;
		var PROGRAM_NAME;
		vSource = function () {
			/* @preserve
			 uniform sampler2D u_displacementTexture;
			 uniform float uDisplacementPower;

			 varying vec4 vVertexPositionEye4;
			 void main(void) {
				 vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
				 vVertexNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0));
				 vVertexPositionEye4 = uMMatrix * vec4(aVertexPosition, 1.0);
				 vVertexPositionEye4.xyz += normalize(vVertexNormal) * texture2D(u_displacementTexture, vTexcoord).x * uDisplacementPower ;

				 gl_PointSize = uPointSize;
				 gl_Position = uPMatrix * uCameraMatrix * vVertexPositionEye4;
			 }
			 */
		}
		fSource = function () {
			/* @preserve
			 precision mediump float;
			 uniform sampler2D u_diffuseTexture;
			 uniform sampler2D u_normalTexture;
			 uniform sampler2D u_specularTexture;

			 uniform float uShininess;
			 uniform float uSpecularPower;

			 varying vec4 vVertexPositionEye4;
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

				 vec4 texelColor = texture2D(u_diffuseTexture, vTexcoord);
				 texelColor.rgb *= texelColor.a;
				 if(texelColor.a ==0.0) discard;

				 vec3 N = normalize(vVertexNormal);
				 vec4 normalColor = texture2D(u_normalTexture, vTexcoord);
				 if(normalColor.a != 0.0) N = normalize(2.0 * (N + normalColor.rgb  - 0.5));

				 vec4 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
				 float specularTextureValue = 1.0;
				 specularTextureValue = texture2D(u_specularTexture, vTexcoord).r;
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
		PROGRAM_NAME = 'standardProgram';
		return function (redGL) {
			return RedProgram(redGL, PROGRAM_NAME, vSource, fSource)

		}
	})();
	RedStandardMaterial.prototype = RedBaseMaterial.prototype
	Object.freeze(RedStandardMaterial)
})();