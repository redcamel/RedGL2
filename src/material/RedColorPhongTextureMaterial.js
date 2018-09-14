"use strict";
var RedColorPhongTextureMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedColorPhongTextureMaterialProgram';
	var PROGRAM_OPTION_LIST = ['normalTexture', 'specularTexture', 'displacementTexture'];
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
			 gl_Position = uPMatrix * uCameraMatrix* vVertexPositionEye4;
		 }
		 */
	};
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 //#REDGL_DEFINE#normalTexture# uniform sampler2D u_normalTexture;
		 //#REDGL_DEFINE#specularTexture# uniform sampler2D u_specularTexture;

		 //#REDGL_DEFINE#normalTexture# uniform float u_normalPower;
		 uniform float u_shininess;
		 uniform float u_specularPower;
		 uniform vec4 u_color;
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

			 texelColor = u_color;
			 // texelColor.rgb *= texelColor.a;

			 N = normalize(vVertexNormal);
			 //#REDGL_DEFINE#normalTexture# vec4 normalColor = texture2D(u_normalTexture, vTexcoord);
			 //#REDGL_DEFINE#normalTexture# if(normalColor.a != 0.0) N = normalize(2.0 * (N + normalColor.rgb * u_normalPower  - 0.5));

			 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
			 float specularTextureValue = 1.0;
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
						 ls +=  specularLightColor * specular * u_specularPower * specularTextureValue * uPointLightIntensityList[i] * uPointLightColorList[i].a;
					 }
				 }
			 }

			 finalColor = la * uAmbientIntensity + ld + ls;
			 finalColor.rgb *= texelColor.a;
			 finalColor.a = texelColor.a;

			 //#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
			 //#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
		 }
		 */
	};
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedColorPhongTextureMaterial`,
		 description : `
			 RedColorPhongTextureMaterial Instance 생성
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
			 ],
			 normalTexture : [
				 {type: 'RedBitmapTexture'}
			 ],
			 specularTexture : [
				 {type: 'RedBitmapTexture'}
			 ],
			 specularTexture : [
				 {type: 'RedBitmapTexture'}
			 ],
			 displacementTexture : [
				 {type: 'RedBitmapTexture'}
			 ]
		 },
		 extends : [
		    'RedBaseMaterial'
		 ],
		 demo : '../example/material/RedColorPhongTextureMaterial.html',
		 example: `
		 RedColorPhongTextureMaterial(RedGL Instance, hex, alpha, normalTexture, specularTexture)
		 `,
		 return : 'RedColorPhongTextureMaterial Instance'
	 }
	 :DOC*/
	RedColorPhongTextureMaterial = function (redGL, hexColor, alpha, normalTexture, specularTexture, displacementTexture) {
		if ( !(this instanceof RedColorPhongTextureMaterial) ) return new RedColorPhongTextureMaterial(redGL, hexColor, alpha, normalTexture, specularTexture, displacementTexture);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedColorPhongTextureMaterial : RedGL Instance만 허용.', '입력값 : ' + redGL);
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		this['_color'] = new Float32Array(4);
		this['normalTexture'] = normalTexture;
		this['specularTexture'] = specularTexture;
		this['displacementTexture'] = displacementTexture;
		this['normalPower'] = 1;
		this['shininess'] = 16;
		this['specularPower'] = 1;
		this['displacementPower'] = 0;
		this['displacementFlowSpeedX'] = 0;
		this['displacementFlowSpeedY'] = 0;
		this['alpha'] = alpha == undefined ? 1 : alpha;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['color'] = hexColor ? hexColor : '#ff0000';
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
	RedColorPhongTextureMaterial.prototype = new RedBaseMaterial();
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`color`,
		 description : `기본값 : #ff2211`,
		 return : 'hex'
	 }
	 :DOC*/
	Object.defineProperty(RedColorPhongTextureMaterial.prototype, 'color', RedColorMaterial['DEFINE_OBJECT_COLOR']);
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedColorPhongTextureMaterial', 'alpha', 'number', RedColorMaterial['DEFINE_OBJECT_ALPHA']);
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`normalTexture`,
		 return : 'RedBitmapTexture'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedColorPhongTextureMaterial', 'normalTexture', 'sampler2D', samplerOption);
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`specularTexture`,
		 return : 'RedBitmapTexture'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedColorPhongTextureMaterial', 'specularTexture', 'sampler2D', samplerOption);
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`displacementTexture`,
		 return : 'RedBitmapTexture'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedColorPhongTextureMaterial', 'displacementTexture', 'sampler2D', samplerOption);
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`normalPower`,
		 description : `기본값 : 1`,
		 return : 'number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedColorPhongTextureMaterial', 'normalPower', 'number', {'min': 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`shininess`,
		 description : `기본값 : 16`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedColorPhongTextureMaterial', 'shininess', 'number', {'min': 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`specularPower`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedColorPhongTextureMaterial', 'specularPower', 'number', {'min': 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`displacementPower`,
		 description : `기본값 : 0`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedColorPhongTextureMaterial', 'displacementPower', 'number', {'min': 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`displacementFlowSpeedX`,
		 description : `기본값 : 0`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedColorPhongTextureMaterial', 'displacementFlowSpeedX', 'number');
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`displacementFlowSpeedY`,
		 description : `기본값 : 0`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedColorPhongTextureMaterial', 'displacementFlowSpeedY', 'number');
	Object.freeze(RedColorPhongTextureMaterial)
})();