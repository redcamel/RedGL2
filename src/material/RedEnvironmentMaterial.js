"use strict";
var RedEnvironmentMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedEnvironmentMaterialProgram';
	var PROGRAM_OPTION_LIST = ['diffuseTexture', 'normalTexture', 'specularTexture', 'displacementTexture','emissiveTexture'];
	var checked;
	vSource = function () {
		/* @preserve
		 varying vec4 vVertexPositionEye4;
		 //#REDGL_DEFINE#displacementTexture# uniform sampler2D u_displacementTexture;
		 //#REDGL_DEFINE#displacementTexture# uniform float u_displacementPower;
	     //#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedX;
		 //#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedY;

		 void main(void) {
			 vTexcoord = aTexcoord;
			 vVertexNormal = (uNMatrix * vec4(aVertexNormal,1.0)).xyz;
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

		 //#REDGL_DEFINE#diffuseTexture# uniform sampler2D u_diffuseTexture;
		 //#REDGL_DEFINE#normalTexture# uniform sampler2D u_normalTexture;
		 //#REDGL_DEFINE#specularTexture# uniform sampler2D u_specularTexture;
		 uniform samplerCube u_environmentTexture;
		 //#REDGL_DEFINE#emissiveTexture# uniform sampler2D u_emissiveTexture;

         //#REDGL_DEFINE#normalTexture# uniform float u_normalPower;
		 uniform float u_shininess;
		 uniform float u_specularPower;
		 uniform float u_reflectionPower;
		 uniform float u_alpha;

		 varying vec4 vVertexPositionEye4;

vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, sampler2D normalMap, vec2 vUv ) {
            vec3 q0 = dFdx( eye_pos.xyz );
            vec3 q1 = dFdy( eye_pos.xyz );
            vec2 st0 = dFdx( vUv.st );
            vec2 st1 = dFdy( vUv.st );

            vec3 S = normalize(  q0 * st1.t - q1 * st0.t );
            vec3 T = normalize( -q0 * st1.s + q1 * st0.s );
            vec3 N = normalize( surf_norm );

            vec3 nmap = texture2D( normalMap, vUv ).xyz;
            // nmap.y = 1.0 - nmap.y;
            vec3 mapN = nmap * 2.0 - 1.0;
            mapN.xy = u_normalPower * mapN.xy;
            mat3 tsn = mat3( S, T, N );
            return normalize( tsn * mapN );

        }

		 vec4 la;
		 vec4 ld;
		 vec4 ls;
		 vec4 texelColor= vec4(0.0,0.0,0.0,0.0);
		 vec4 emissiveColor;
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
			 //#REDGL_DEFINE#diffuseTexture# texelColor = texture2D(u_diffuseTexture, vTexcoord);
			 //#REDGL_DEFINE#diffuseTexture# texelColor.rgb *= texelColor.a;
			 //#REDGL_DEFINE#diffuseTexture# if(texelColor.a ==0.0) discard;
			 //#REDGL_DEFINE#directionalShadow#true# texelColor.rgb *= getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture);

			 //#REDGL_DEFINE#emissiveTexture# emissiveColor = texture2D(u_emissiveTexture, vTexcoord);
			 //#REDGL_DEFINE#emissiveTexture# emissiveColor.rgb *= texelColor.a;

			 N = normalize(vVertexNormal);
			 //#REDGL_DEFINE#normalTexture# vec4 normalColor = texture2D(u_normalTexture, vTexcoord);
			 //#REDGL_DEFINE#normalTexture# N = perturbNormal2Arb(vVertexPositionEye4.xyz, N, u_normalTexture, vTexcoord) ;
            ////#REDGL_DEFINE#normalTexture# if(normalColor.a != 0.0) N = normalize(2.0 * (N + normalColor.rgb * u_normalPower  - 0.5));

		   vec3 R = reflect( vVertexPositionEye4.xyz-uCameraPosition, N);
			 reflectionColor = textureCube(u_environmentTexture, R);
			 texelColor = mix(texelColor,reflectionColor ,u_reflectionPower);

			 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
			 specularTextureValue = 1.0;
			 //#REDGL_DEFINE#specularTexture#  specularTextureValue = texture2D(u_specularTexture, vTexcoord).r;

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
						 ls +=  specularLightColor * specular * u_specularPower * specularTextureValue * uPointLightIntensityList[i] * uPointLightColorList[i].a;
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
	                                   displacementTexture,
	                                   emissiveTexture
	) {
		if ( !(this instanceof RedEnvironmentMaterial) ) return new RedEnvironmentMaterial(
			redGL,
			diffuseTexture,
			environmentTexture,
			normalTexture,
			specularTexture,
			displacementTexture,
			emissiveTexture
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
		this['emissiveTexture'] = emissiveTexture;
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
		 title :`emissiveTexture`,
		 return : 'RedBitmapTexture'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedEnvironmentMaterial', 'emissiveTexture', 'sampler2D', samplerOption);
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