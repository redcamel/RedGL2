"use strict";
var RedEnvironmentMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'environmentProgram';
	vSource = function () {
		/* @preserve
		 varying vec4 vVertexPositionEye4;
		 varying vec3 vReflectionCubeCoord;
		 uniform sampler2D u_displacementTexture;
		 uniform float u_displacementPower;
	     uniform float u_displacementFlowSpeedX;
		 uniform float u_displacementFlowSpeedY;

		 void main(void) {
			 vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
			 vVertexNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0));
			 vVertexPositionEye4 = uMMatrix * vec4(aVertexPosition, 1.0);
			  vVertexPositionEye4.xyz += normalize(vVertexNormal) * texture2D(u_displacementTexture, vTexcoord + vec2(
			    u_displacementFlowSpeedX * (uTime/1000.0),
			    u_displacementFlowSpeedY * (uTime/1000.0)
		    )).x * u_displacementPower ;
			 vReflectionCubeCoord = -vVertexPositionEye4.xyz;

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
		 uniform samplerCube u_environmentTexture;

         uniform float u_normalPower;
		 uniform float u_shininess;
		 uniform float u_specularPower;
		 uniform float u_reflectionPower;

		 varying vec4 vVertexPositionEye4;
		 varying vec3 vReflectionCubeCoord;
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
			 if(normalColor.a != 0.0) N = normalize(2.0 * (N + normalColor.rgb * u_normalPower  - 0.5));

			 vec4 reflectionColor = textureCube(u_environmentTexture, 2.0 * dot(vReflectionCubeCoord,vVertexNormal) * vVertexNormal - vReflectionCubeCoord);
			 texelColor = texelColor * (1.0 - u_reflectionPower) + reflectionColor * u_reflectionPower;

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
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedEnvironmentMaterial`,
		 description : `
			 RedEnvironmentMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 diffuseTexture : [
				 {type:'RedBitmapTexture'}
			 ],
			 environmentTexture : [
				 {type:'RedBitmapCubeTexture'}
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
			 RedEnvironmentMaterial(
				 RedGL Instance,
				 RedBitmapTexture(RedGL Instance, src), // diffuseTexture
				 RedBitmapCubeTexture(RedGL Instance, srcList),
				 RedBitmapTexture(RedGL Instance, src), // normalTexture
				 RedBitmapTexture(RedGL Instance, src), // specularTexture
				 RedBitmapTexture(RedGL Instance, src)  // displacementTexture
			 )
		 `,
		 return : 'RedEnvironmentMaterial Instance'
	 }
	 :DOC*/
	RedEnvironmentMaterial = function (redGL,
	                                   diffuseTexture,
	                                   environmentTexture,
	                                   normalTexture,
	                                   specularTexture,
	                                   displacementTexture) {
		if ( !(this instanceof RedEnvironmentMaterial) ) return new RedEnvironmentMaterial(
			redGL,
			diffuseTexture,
			environmentTexture,
			normalTexture,
			specularTexture,
			displacementTexture
		);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedEnvironmentMaterial : RedGL Instance만 허용됩니다.', redGL)
		if ( environmentTexture && !(environmentTexture instanceof RedBitmapCubeTexture) ) RedGLUtil.throwFunc('RedEnvironmentMaterial : environmentTexture - RedBitmapCubeTexture Instance만 허용됩니다.')
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		/**DOC:
		 {
			 title :`diffuseTexture`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		this['diffuseTexture'] = diffuseTexture;
		/**DOC:
		 {
			 title :`environmentTexture`,
			 return : 'RedBitmapCubeTexture'
		 }
		 :DOC*/
		this['environmentTexture'] = environmentTexture;
		/**DOC:
		 {
			 title :`normalTexture`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		this['normalTexture'] = normalTexture;
		/**DOC:
		 {
			 title :`specularTexture`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		this['specularTexture'] = specularTexture;
		/**DOC:
		 {
			 title :`shininess`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		this['displacementTexture'] = displacementTexture;
		/**DOC:
		 {
			 title :`normalPower`,
			 description : `기본값 : 1`,
			 return : 'number'
		 }
		 :DOC*/
		this['normalPower'] = 1
		/**DOC:
		 {
			 title :`shininess`,
			 description : `기본값 : 16`,
			 return : 'Number'
		 }
		 :DOC*/
		this['shininess'] = 8
		/**DOC:
		 {
			 title :`specularPower`,
			 description : `기본값 : 1`,
			 return : 'Number'
		 }
		 :DOC*/
		this['specularPower'] = 1
		/**DOC:
		 {
			 title :`reflectionPower`,
			 description : `기본값 : 1`,
			 return : 'Number'
		 }
		 :DOC*/
		this['reflectionPower'] = 1
		/**DOC:
		 {
			 title :`displacementPower`,
			 description : `기본값 : 0`,
			 return : 'Number'
		 }
		 :DOC*/
		this['displacementPower'] = 0
		this['displacementFlowSpeedX'] = 0
		this['displacementFlowSpeedY'] = 0
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL['makeUUID']();
		this.checkUniformAndProperty();
		console.log(this)
	}
	RedEnvironmentMaterial.prototype = new RedBaseMaterial()
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'diffuseTexture', 'sampler2D');
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'environmentTexture', 'samplerCube', {essential: true});
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'normalTexture', 'sampler2D');
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'specularTexture', 'sampler2D');
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'displacementTexture', 'sampler2D');
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'normalPower', 'number', {'min': 0});
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'shininess', 'number', {'min': 0});
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'specularPower', 'number', {'min': 0});
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'reflectionPower', 'number', {'min': 0});
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'displacementPower', 'number', {'min': 0});
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'displacementFlowSpeedX', 'number');
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'displacementFlowSpeedY', 'number');
	Object.freeze(RedEnvironmentMaterial)
})();