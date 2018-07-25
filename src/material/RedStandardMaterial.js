"use strict";
var RedStandardMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'standardProgram';
	var PROGRAM_OPTION_LIST = ['normalTexture', 'specularTexture', 'displacementTexture']
	vSource = function () {
		/* @preserve
		 //#define#displacementTexture# uniform sampler2D u_displacementTexture;
		 //#define#displacementTexture# uniform float u_displacementPower;
	     //#define#displacementTexture# uniform float u_displacementFlowSpeedX;
		 //#define#displacementTexture# uniform float u_displacementFlowSpeedY;

		 varying vec4 vVertexPositionEye4;

		 void main(void) {
			 vTexcoord = aTexcoord;
			 vVertexNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0));
			 vVertexPositionEye4 = uMMatrix * vec4(aVertexPosition, 1.0);

			 //#define#displacementTexture# vVertexPositionEye4.xyz += normalize(vVertexNormal) * texture2D(u_displacementTexture, vTexcoord + vec2(
			 //#define#displacementTexture#    u_displacementFlowSpeedX * (uTime/1000.0),
			 //#define#displacementTexture#    u_displacementFlowSpeedY * (uTime/1000.0)
		     //#define#displacementTexture# )).x * u_displacementPower ;

			 gl_PointSize = uPointSize;
			 gl_Position = uPMatrix * uCameraMatrix * vVertexPositionEye4;


		     //#define#directionalShadow#true# vResolution = uResolution;
			 //#define#directionalShadow#true# vShadowPos = cTexUnitConverter  *  uDirectionalShadowLightMatrix * uMMatrix * vec4(aVertexPosition, 1.0);


		 }
		 */
	}
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D u_diffuseTexture;
		 //#define#normalTexture# uniform sampler2D u_normalTexture;
		 //#define#specularTexture# uniform sampler2D u_specularTexture;


		 //#define#normalTexture# uniform float u_normalPower;
		 uniform float u_shininess;
		 uniform float u_specularPower;

		 varying vec4 vVertexPositionEye4;
         float cShadowAcneRemover = 0.0007;

		 float fogFactor(float perspectiveFar, float density){
			 float flog_cord = gl_FragCoord.z / gl_FragCoord.w / perspectiveFar;
			 float fog = flog_cord * density;
			 if(1.0 - fog < 0.0) discard;
			 return clamp(1.0 - fog, 0.0,  1.0);
		 }
		 vec4 fog(float fogFactor, vec4 fogColor, vec4 currentColor) {
			return mix(fogColor, currentColor, fogFactor);
		 }
	    float decodeFloat (vec4 color) {
            const vec4 cBitShift = vec4(
	            1.0 / (256.0 * 256.0 * 256.0),
	            1.0 / (256.0 * 256.0),
	            1.0 / 256.0,
	            1
	        );
	        return dot(color, cBitShift);
        }

		 vec4 la;
		 vec4 ld;
		 vec4 ls;
		 vec4 texelColor;
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

			///////////////////////////////////////////////////////////////////////////////////////


			//#define#directionalShadow#true#	vec3 fragmentDepth = vShadowPos.xyz;
	        //#define#directionalShadow#true#    fragmentDepth.z -= cShadowAcneRemover;
			//#define#directionalShadow#true#	float amountInLight = 0.0;
			//#define#directionalShadow#true#	for (int x = -1; x <= 1; x++) {
			//#define#directionalShadow#true#	    for (int y = -1; y <= 1; y++) {
			//#define#directionalShadow#true#	        vec2 tUV = fragmentDepth.xy + vec2(float(x)/vResolution.x, float(y)/vResolution.y) ;
	        //#define#directionalShadow#true#            if(tUV.x<0.0) continue;
	        //#define#directionalShadow#true#            if(tUV.x>1.0) continue;
	        //#define#directionalShadow#true#            if(tUV.y<0.0) continue;
	        //#define#directionalShadow#true#            if(tUV.y>1.0) continue;
			//#define#directionalShadow#true#	        float texelDepth = decodeFloat(texture2D(uDirectionalShadowTexture,tUV));
			//#define#directionalShadow#true#	        if (fragmentDepth.z < texelDepth ) amountInLight += 0.5;
			//#define#directionalShadow#true#	       // texelColor =  texture2D(uDirectionalShadowTexture,tUV);
			//#define#directionalShadow#true#	    }
			//#define#directionalShadow#true#	}
			//#define#directionalShadow#true#	amountInLight /= 9.0;
			//#define#directionalShadow#true#	texelColor.rgb *= (1.0-amountInLight);

			///////////////////////////////////////////////////////////////////////////////////////

			 N = normalize(vVertexNormal);
			 //#define#normalTexture# vec4 normalColor = texture2D(u_normalTexture, vTexcoord);
			 //#define#normalTexture# if(normalColor.a != 0.0) N = normalize(2.0 * (N + normalColor.rgb * u_normalPower  - 0.5));

			 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
			 specularTextureValue = 1.0;
			 //#define#specularTexture# specularTextureValue = texture2D(u_specularTexture, vTexcoord).r;


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
			 finalColor.a = texelColor.a;
			 //#define#fog#false# gl_FragColor = finalColor;
			 //#define#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
		 }
		 */
	}
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
		if ( !(this instanceof RedStandardMaterial) ) return new RedStandardMaterial(redGL, diffuseTexture, normalTexture, specularTexture, displacementTexture);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedStandardMaterial : RedGL Instance만 허용됩니다.', redGL)
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST)
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
		this['specularTexture'] = specularTexture
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
			 return : 'number'
		 }
		 :DOC*/
		this['shininess'] = 16
		/**DOC:
		 {
			 title :`specularPower`,
			 description : `기본값 : 1`,
			 return : 'number'
		 }
		 :DOC*/
		this['specularPower'] = 1
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
		this['_UUID'] = RedGL.makeUUID();
		this.checkUniformAndProperty();
		console.log(this)
	}
	var samplerOption = {
		callback: function () {
			this._searchProgram(PROGRAM_NAME, PROGRAM_OPTION_LIST)
		}
	}
	RedStandardMaterial.prototype = new RedBaseMaterial()
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'diffuseTexture', 'sampler2D', {
		essential: true,
		callback: samplerOption.callback
	});
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'normalTexture', 'sampler2D', samplerOption);
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'specularTexture', 'sampler2D', samplerOption);
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'displacementTexture', 'sampler2D', samplerOption);
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'normalPower', 'number', {'min': 0});
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'shininess', 'number', {'min': 0});
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'specularPower', 'number', {'min': 0});
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'displacementPower', 'number', {'min': 0});
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'displacementFlowSpeedX', 'number');
	RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'displacementFlowSpeedY', 'number');
	Object.freeze(RedStandardMaterial)
})();