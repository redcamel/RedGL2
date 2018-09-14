"use strict";
var RedStandardMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedStandardMaterialProgram';
	var PROGRAM_OPTION_LIST = ['normalTexture', 'specularTexture', 'emissiveTexture', 'displacementTexture'];
	var checked;
	vSource = function () {
		/* @preserve
		 //#REDGL_DEFINE#displacementTexture# uniform sampler2D u_displacementTexture;
		 //#REDGL_DEFINE#displacementTexture# uniform float u_displacementPower;
	     //#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedX;
		 //#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedY;

		 varying vec4 vVertexPositionEye4;

		 void main(void) {
			 vTexcoord = aTexcoord;
			 vVertexNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0));
			 vVertexPositionEye4 = uMMatrix * vec4(aVertexPosition, 1.0);

			 //#REDGL_DEFINE#displacementTexture# vVertexPositionEye4.xyz += normalize(vVertexNormal) * texture2D(u_displacementTexture, vTexcoord + vec2(
			 //#REDGL_DEFINE#displacementTexture#    u_displacementFlowSpeedX * (uTime/1000.0),
			 //#REDGL_DEFINE#displacementTexture#    u_displacementFlowSpeedY * (uTime/1000.0)
		     //#REDGL_DEFINE#displacementTexture# )).x * u_displacementPower ;

			 gl_PointSize = uPointSize;
			 gl_Position = uPMatrix * uCameraMatrix * vVertexPositionEye4;

		     //#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
			 //#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter  *  uDirectionalShadowLightMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
		 }
		 */
	};
	fSource = function () {
		/* @preserve
		 precision mediump float;
		// 안개
		//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
		//#REDGL_DEFINE#fragmentShareFunc#fog#

		// 그림자
		//#REDGL_DEFINE#fragmentShareFunc#decodeFloatShadow#
		//#REDGL_DEFINE#fragmentShareFunc#getShadowColor#


		// 텍스쳐
		 uniform sampler2D u_diffuseTexture;
		 //#REDGL_DEFINE#normalTexture# uniform sampler2D u_normalTexture;
		 //#REDGL_DEFINE#specularTexture# uniform sampler2D u_specularTexture;
		 //#REDGL_DEFINE#emissiveTexture# uniform sampler2D u_emissiveTexture;

		 //#REDGL_DEFINE#normalTexture# uniform float u_normalPower;
		 uniform float u_shininess;
		 uniform float u_specularPower;
		 uniform float u_alpha;

		 varying vec4 vVertexPositionEye4;

		 vec4 la;
		 vec4 ld;
		 vec4 ls;
		 vec4 texelColor;
		 vec4 emissiveColor;
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

			 texelColor = texture2D(u_diffuseTexture, vTexcoord);
			 texelColor.rgb *= texelColor.a;
			 if(texelColor.a ==0.0) discard;

			//#REDGL_DEFINE#emissiveTexture# emissiveColor = texture2D(u_emissiveTexture, vTexcoord);
			//#REDGL_DEFINE#emissiveTexture# emissiveColor.rgb *= texelColor.a;


			//#REDGL_DEFINE#directionalShadow#true#	texelColor.rgb *= getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture);


			 N = normalize(vVertexNormal);
			 //#REDGL_DEFINE#normalTexture# vec4 normalColor = texture2D(u_normalTexture, vTexcoord);
			 //#REDGL_DEFINE#normalTexture# if(normalColor.a != 0.0) N = normalize(2.0 * (N + normalColor.rgb * u_normalPower  - 0.5));

			 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
			 specularTextureValue = 1.0;
			 //#REDGL_DEFINE#specularTexture# specularTextureValue = texture2D(u_specularTexture, vTexcoord).r;


			for(int i=0; i<cDIRETIONAL_MAX; i++){
				 if(i == uDirectionalLightNum) break;
				 L = normalize(-uDirectionalLightPositionList[i]);
				 lambertTerm = dot(N,-L);
				 if(lambertTerm > 0.0){
					 ld += uDirectionalLightColorList[i] * texelColor * lambertTerm * uDirectionalLightIntensityList[i] * uDirectionalLightColorList[i].a;
					 specular = pow( max(dot(reflect(L, N), -L), 0.0), u_shininess);
					 ls +=  specularLightColor * specular * u_specularPower * specularTextureValue * uDirectionalLightIntensityList[i] * uDirectionalLightColorList[i].a;
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
						 ls +=  specularLightColor * specular * u_specularPower * specularTextureValue * uPointLightIntensityList[i]* uPointLightColorList[i].a ;
					 }
				 }
			 }

			 finalColor = la * uAmbientIntensity + ld + ls;
			  //#REDGL_DEFINE#emissiveTexture# finalColor.rgb += emissiveColor.rgb;
			 finalColor.rgb *= texelColor.a;
			 finalColor.a = texelColor.a * u_alpha;

			 //#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
			 //#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
		 }
		 */
	};
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
		 extends : [
		    'RedBaseMaterial'
		 ],
		 demo : '../example/material/RedStandardMaterial.html',
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
	RedStandardMaterial = function (redGL, diffuseTexture, normalTexture, specularTexture, displacementTexture, emissiveTexture) {
		if ( !(this instanceof RedStandardMaterial) ) return new RedStandardMaterial(redGL, diffuseTexture, normalTexture, specularTexture, displacementTexture, emissiveTexture);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedStandardMaterial : RedGL Instance만 허용.', redGL);
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		this['diffuseTexture'] = diffuseTexture;
		this['normalTexture'] = normalTexture;
		this['specularTexture'] = specularTexture;
		this['emissiveTexture'] = emissiveTexture;
		this['displacementTexture'] = displacementTexture;
		this['normalPower'] = 1;
		this['shininess'] = 16;
		this['specularPower'] = 1;
		this['displacementPower'] = 0;
		this['displacementFlowSpeedX'] = 0;
		this['displacementFlowSpeedY'] = 0;
		this['alpha'] = 1
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['_UUID'] = RedGL.makeUUID();
		if ( !checked ) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	var samplerOption = {
		callback: function () {
			this._searchProgram(PROGRAM_NAME, PROGRAM_OPTION_LIST)
		}
	};
	RedStandardMaterial.prototype = new RedBaseMaterial();
	/**DOC:
	 {
         code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'alpha', 'number', {min: 0, max: 1});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`diffuseTexture`,
		 return : 'RedBitmapTexture'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'diffuseTexture', 'sampler2D', {
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
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'normalTexture', 'sampler2D', samplerOption);
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`specularTexture`,
		 return : 'RedBitmapTexture'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'specularTexture', 'sampler2D', samplerOption);
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`specularTexture`,
		 return : 'RedBitmapTexture'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'emissiveTexture', 'sampler2D', samplerOption);
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`displacementTexture`,
		 return : 'RedBitmapTexture'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'displacementTexture', 'sampler2D', samplerOption);
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`normalPower`,
		 description : `기본값 : 1`,
		 return : 'number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'normalPower', 'number', {'min': 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`shininess`,
		 description : `기본값 : 16`,
		 return : 'number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'shininess', 'number', {'min': 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`specularPower`,
		 description : `기본값 : 1`,
		 return : 'number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'specularPower', 'number', {'min': 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`displacementPower`,
		 description : `기본값 : 0`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'displacementPower', 'number', {'min': 0});
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'displacementFlowSpeedX', 'number');
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'displacementFlowSpeedY', 'number');
	Object.freeze(RedStandardMaterial);
})();