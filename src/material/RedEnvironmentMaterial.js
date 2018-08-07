"use strict";
var RedEnvironmentMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedEnvironmentMaterialProgram';
	var PROGRAM_OPTION_LIST = ['diffuseTexture', 'normalTexture', 'specularTexture', 'displacementTexture'];
	var checked;
	vSource = function () {
		/* @preserve
		 varying vec4 vVertexPositionEye4;
		 varying vec3 vReflectionCubeCoord;
		 //#define#displacementTexture# uniform sampler2D u_displacementTexture;
		 //#define#displacementTexture# uniform float u_displacementPower;
	     //#define#displacementTexture# uniform float u_displacementFlowSpeedX;
		 //#define#displacementTexture# uniform float u_displacementFlowSpeedY;

		 void main(void) {
			 vTexcoord = aTexcoord;
			 vVertexNormal = (uNMatrix * vec4(aVertexNormal,1.0)).xyz;
			 vVertexPositionEye4 = uMMatrix * vec4(aVertexPosition, 1.0);

			 //#define#displacementTexture# vVertexPositionEye4.xyz += normalize(vVertexNormal) * texture2D(u_displacementTexture, vTexcoord + vec2(
			 //#define#displacementTexture#    u_displacementFlowSpeedX * (uTime/1000.0),
			 //#define#displacementTexture#    u_displacementFlowSpeedY * (uTime/1000.0)
		     //#define#displacementTexture# )).x * u_displacementPower ;

			 vReflectionCubeCoord = -vVertexPositionEye4.xyz;

			 gl_PointSize = uPointSize;
			 gl_Position = uPMatrix * uCameraMatrix * vVertexPositionEye4;
		 }
		 */
	};
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 //#define#diffuseTexture# uniform sampler2D u_diffuseTexture;
		 //#define#normalTexture# uniform sampler2D u_normalTexture;
		 //#define#specularTexture# uniform sampler2D u_specularTexture;
		 uniform samplerCube u_environmentTexture;

         //#define#normalTexture# uniform float u_normalPower;
		 uniform float u_shininess;
		 uniform float u_specularPower;
		 uniform float u_reflectionPower;
		 uniform float u_alpha;

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

		 vec4 la;
		 vec4 ld;
		 vec4 ls;
		 vec4 texelColor= vec4(0.0,0.0,0.0,0.0);
		 vec4 reflectionColor;
		 vec4 specularLightColor= vec4(1.0, 1.0, 1.0, 1.0);
		 vec4 finalColor;
		 vec3 N;
		 vec3 L;
	     float lambertTerm;
	     float specular;
	     float specularTextureValue;
         float distanceLength;
		 float attenuation;
		 void main(void) {
			 la = uAmbientLightColor * uAmbientLightColor.a;
			 ld = vec4(0.0, 0.0, 0.0, 1.0);
			 ls = vec4(0.0, 0.0, 0.0, 1.0);

			 texelColor = vec4(0.0,0.0,0.0,0.0);
			 //#define#diffuseTexture# texelColor = texture2D(u_diffuseTexture, vTexcoord);
			 //#define#diffuseTexture# texelColor.rgb *= texelColor.a;
			 //#define#diffuseTexture# if(texelColor.a ==0.0) discard;

			 N = normalize(vVertexNormal);
			 //#define#normalTexture# vec4 normalColor = texture2D(u_normalTexture, vTexcoord);
			 //#define#normalTexture# if(normalColor.a != 0.0) N = normalize(2.0 * (N + normalColor.rgb * u_normalPower  - 0.5));

			 reflectionColor = textureCube(u_environmentTexture, 2.0 * dot(vReflectionCubeCoord, N) * N - vReflectionCubeCoord);
			 texelColor = mix(texelColor,reflectionColor ,u_reflectionPower);

			 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
			 specularTextureValue = 1.0;
			 //#define#specularTexture#  specularTextureValue = texture2D(u_specularTexture, vTexcoord).r;

			 for(int i=0; i<cDIRETIONAL_MAX; i++){
				 if(i == uDirectionalLightNum) break;
				 L = normalize(-uDirectionalLightPositionList[i]);
				 lambertTerm = dot(N,-L);
				 if(lambertTerm > 0.0){
					 ld += uDirectionalLightColorList[i] * texelColor * lambertTerm * uDirectionalLightIntensityList[i] * uDirectionalLightColorList[i].a;
					 specular = pow( max(dot(reflect(L, N), -L), 0.0), u_shininess);
					 ls +=  specularLightColor * pow( max(dot(reflect(L, N), -L), 0.0), u_shininess) * u_specularPower * specularTextureValue * uDirectionalLightIntensityList[i];
				 }
			 }

			 for(int i=0;i<cPOINT_MAX;i++){
				 if(i== uPointLightNum) break;
				 L =  -uPointLightPositionList[i] + vVertexPositionEye4.xyz;
				 distanceLength = length(L);
				 if(uPointLightRadiusList[i]> distanceLength){
					 attenuation = 1.0 / (0.01 + 0.02 * distanceLength + 0.03 * distanceLength * distanceLength);
					 L = normalize(L);
					 lambertTerm = dot(N,-L);
					 if(lambertTerm > 0.0){
						 ld += uPointLightColorList[i] * texelColor * lambertTerm * attenuation * uPointLightIntensityList[i] * uPointLightColorList[i].a;
						 specular = pow( max(dot(reflect(L, N), -L), 0.0), u_shininess);
						 ls +=  specularLightColor * specular * u_specularPower * specularTextureValue * uPointLightIntensityList[i] ;
					 }
				 }
			 }

			 finalColor = la * uAmbientIntensity + ld + ls;
			 finalColor.rgb *= texelColor.a;
			 finalColor.a = texelColor.a * u_alpha;
			 //#define#fog#false# gl_FragColor = finalColor;
			 //#define#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
		 }
		 */
	};
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
		 extends : [
		    'RedBaseMaterial'
		 ],
		 demo : '../example/material/RedEnvironmentMaterial.html',
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
		redGL instanceof RedGL ||  RedGLUtil.throwFunc('RedEnvironmentMaterial : RedGL Instance만 허용.', redGL);
		environmentTexture instanceof RedBitmapCubeTexture || RedGLUtil.throwFunc('RedEnvironmentMaterial : environmentTexture - RedBitmapCubeTexture Instance만 허용.');
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		this['diffuseTexture'] = diffuseTexture;
		this['environmentTexture'] = environmentTexture;
		this['normalTexture'] = normalTexture;
		this['specularTexture'] = specularTexture;
		this['displacementTexture'] = displacementTexture;
		this['normalPower'] = 1;
		this['shininess'] = 8;
		this['specularPower'] = 1;
		this['reflectionPower'] = 1;
		this['displacementPower'] = 0;
		this['displacementFlowSpeedX'] = 0;
		this['displacementFlowSpeedY'] = 0;
		this['alpha'] = 1;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['_UUID'] = RedGL.makeUUID();
		if ( !checked ) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	RedEnvironmentMaterial.prototype = new RedBaseMaterial();
	var samplerOption = {
		callback: function () {
			this._searchProgram(PROGRAM_NAME, PROGRAM_OPTION_LIST)
		}
	};
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'alpha', 'number', {min: 0, max: 1});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`diffuseTexture`,
		 return : 'RedBitmapTexture'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'diffuseTexture', 'sampler2D', samplerOption);
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`environmentTexture`,
		 return : 'RedBitmapCubeTexture'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'environmentTexture', 'samplerCube', {
		essential: true,
		callback: samplerOption.callback
	});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`normalTexture`,
		 return : 'RedBitmapTexture'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'normalTexture', 'sampler2D', samplerOption);
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`specularTexture`,
		 return : 'RedBitmapTexture'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'specularTexture', 'sampler2D', samplerOption);
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`displacementTexture`,
		 return : 'RedBitmapTexture'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'displacementTexture', 'sampler2D', samplerOption);
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`normalPower`,
		 description : `기본값 : 1`,
		 return : 'number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'normalPower', 'number', {'min': 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`shininess`,
		 description : `기본값 : 16`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'shininess', 'number', {'min': 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`specularPower`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'specularPower', 'number', {'min': 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`reflectionPower`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'reflectionPower', 'number', {'min': 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`displacementPower`,
		 description : `기본값 : 0`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'displacementPower', 'number', {'min': 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`displacementFlowSpeedX`,
		 description : `기본값 : 0`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'displacementFlowSpeedX', 'number');
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`displacementFlowSpeedY`,
		 description : `기본값 : 0`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'displacementFlowSpeedY', 'number');
	Object.freeze(RedEnvironmentMaterial);
})();