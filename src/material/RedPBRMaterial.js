/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */
"use strict";
var RedPBRMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPBRMaterialProgram';
	var PROGRAM_OPTION_LIST = ['diffuseTexture', 'normalTexture', 'environmentTexture', 'occlusionTexture', 'emissiveTexture', 'roughnessTexture', 'useFlatMode', 'usePreMultiply'];
	var checked;
	vSource = function () {
		/* @preserve
			// 스키닝
			//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#

			// Sprite3D
			//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#

			void main(void) {
				gl_PointSize = uPointSize;
				// UV설정
				vTexcoord = aTexcoord;

				// normal 계산
			   //#REDGL_DEFINE#skin#true# vVertexNormal = (uNMatrix * getSkinMatrix() * vec4(aVertexNormal,0.0)).xyz;
			   //#REDGL_DEFINE#skin#false# vVertexNormal = (uNMatrix *  vec4(aVertexNormal,1.0)).xyz;

			   // position 계산
				//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
				//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
				vVertexPosition =  targetMatrix *  vec4(aVertexPosition, 1.0);

				// 최종 포지션 계산
				//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
				//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
				//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
				//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
				//#REDGL_DEFINE#sprite3D#true# }
				//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * vVertexPosition;

				// 쉐도우 계산
				//#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
				//#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter * uDirectionalShadowLightMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);
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

		// flat노말
		//#REDGL_DEFINE#fragmentShareFunc#getFlatNormal#
		//#REDGL_DEFINE#fragmentShareFunc#cotangent_frame#
		//#REDGL_DEFINE#fragmentShareFunc#perturb_normal#

		 uniform vec4 uBaseColorFactor;
		 uniform float u_emissiveFactor;
		 uniform float u_cutOff;

		 //#REDGL_DEFINE#diffuseTexture# uniform sampler2D u_diffuseTexture;
		 //#REDGL_DEFINE#normalTexture# uniform sampler2D u_normalTexture;
		 //#REDGL_DEFINE#occlusionTexture# uniform sampler2D u_occlusionTexture;
		 //#REDGL_DEFINE#environmentTexture# uniform samplerCube u_environmentTexture;
		 //#REDGL_DEFINE#emissiveTexture# uniform sampler2D u_emissiveTexture;
		 //#REDGL_DEFINE#roughnessTexture# uniform sampler2D u_roughnessTexture;
		 //#REDGL_DEFINE#normalTexture# uniform float u_normalPower;


		 uniform float u_specularPower;
		 uniform float u_metallicFactor;
		 uniform float u_roughnessFactor;
		 uniform float u_occlusionPower;
		 uniform float u_alpha;




		 vec4 la;
		 vec4 ld;
		 vec4 ls;
		 vec4 texelColor= vec4(0.0,0.0,0.0,0.0);
		 vec4 emissiveColor;
		 vec4 roughnessColor;
		 vec4 occlusionColor;
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


			float tMetallicPower = u_metallicFactor;
			float tRoughnessPower = u_roughnessFactor;

			//#REDGL_DEFINE#roughnessTexture# roughnessColor = texture2D(u_roughnessTexture, vTexcoord);
			//#REDGL_DEFINE#roughnessTexture# tMetallicPower *= roughnessColor.b; // 메탈릭 산출 roughnessColor.b
			//#REDGL_DEFINE#roughnessTexture# tRoughnessPower *= roughnessColor.g; // 거칠기 산출 roughnessColor.g

			// diffuse 색상 산출
			texelColor = uBaseColorFactor;
			//#REDGL_DEFINE#diffuseTexture# texelColor *= texture2D(u_diffuseTexture, vTexcoord);
			//#REDGL_DEFINE#usePreMultiply# texelColor.rgb *= texelColor.a;

			// 컷오프 계산
			if(texelColor.a <= u_cutOff) discard;

			// 노멀값 계산
			N = normalize(vVertexNormal);
			vec4 normalColor = vec4(0.0);
			//#REDGL_DEFINE#normalTexture# normalColor = texture2D(u_normalTexture, vTexcoord);
			//#REDGL_DEFINE#useFlatMode# N = getFlatNormal(vVertexPosition.xyz);
			//#REDGL_DEFINE#normalTexture# N = perturb_normal(N, vVertexPosition.xyz, vTexcoord, normalColor.rgb) ;

			// 환경맵 계산
			vec3 R = reflect( vVertexPosition.xyz-uCameraPosition, N);
			//#REDGL_DEFINE#environmentTexture# reflectionColor = textureCube(u_environmentTexture, R);
			//#REDGL_DEFINE#environmentTexture# reflectionColor.rgb *= reflectionColor.a;

			// 환경맵 합성
			//#REDGL_DEFINE#environmentTexture# texelColor.rgb = mix( texelColor.rgb , reflectionColor.rgb , max(tMetallicPower-tRoughnessPower,0.0)*(1.0-tRoughnessPower));
			//#REDGL_DEFINE#environmentTexture# texelColor = mix( texelColor , vec4(0.04, 0.04, 0.04, 1.0) , tRoughnessPower * (tMetallicPower) * 0.5);



			// 라이팅 계산
			float shininess = 128.0 ;
			specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
			specularTextureValue =  1.0 ;
			for(int i=0; i<cDIRETIONAL_MAX; i++){
				if(i == uDirectionalLightNum) break;
				L = normalize(-uDirectionalLightPositionList[i]);
				lambertTerm = dot(N,-L);
				if(lambertTerm > 0.0){
					ld += uDirectionalLightColorList[i] * texelColor * lambertTerm * uDirectionalLightIntensityList[i] * uDirectionalLightColorList[i].a;
					specular = pow( max(dot(reflect(L, N), -L), 0.0), pow(shininess, 1.0-tRoughnessPower+0.04) );
					specular *= pow(1.0-tRoughnessPower+0.04, 2.0 * (1.0-tMetallicPower)) ;
					ls +=  specularLightColor * specular * u_specularPower * specularTextureValue * uDirectionalLightIntensityList[i]* uDirectionalLightColorList[i].a * (1.0-tRoughnessPower+0.04);
				}
			}

		   for(int i=0;i<cPOINT_MAX;i++){
			  if(i== uPointLightNum) break;
			  L =  -uPointLightPositionList[i] + vVertexPosition.xyz;
			  distanceLength = abs(length(L));
			  if(uPointLightRadiusList[i]> distanceLength){
				  attenuation = 1.0 / (0.01 + 0.02 * distanceLength + 0.03 * distanceLength * distanceLength) * 0.5;
				  L = normalize(L);
				  lambertTerm = dot(N,-L);
				  if(lambertTerm > 0.0){
					 ld += uPointLightColorList[i] * texelColor * lambertTerm * attenuation * uPointLightIntensityList[i] ;
					 specular = pow( max(dot(reflect(L, N), -N), 0.0), pow(shininess, 1.0-tRoughnessPower+0.04) );
					 specular *= pow(1.0-tRoughnessPower+0.04, 2.0 * (1.0-tMetallicPower)) ;
					 ls +=  specularLightColor * specular * uPointLightIntensityList[i]  * uPointLightColorList[i].a * (1.0-tRoughnessPower+0.04) ;
				  }
			  }
		   }

			finalColor = la * uAmbientIntensity + ld + ls;
			finalColor.a = texelColor.a * u_alpha ;

			// 그림자 계산
			//#REDGL_DEFINE#directionalShadow#true# finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture), 0.5);

			// 이미시브합성
			//#REDGL_DEFINE#emissiveTexture# emissiveColor = texture2D(u_emissiveTexture, vTexcoord);
			//#REDGL_DEFINE#emissiveTexture# emissiveColor.rgb *= emissiveColor.a * u_emissiveFactor;
			//#REDGL_DEFINE#emissiveTexture# emissiveColor.rgb *= u_emissiveFactor;
			//#REDGL_DEFINE#emissiveTexture# finalColor.rgb += emissiveColor.rgb;

			// 오클루젼 합성
			//#REDGL_DEFINE#occlusionTexture# occlusionColor = texture2D(u_occlusionTexture, vTexcoord);
			//#REDGL_DEFINE#occlusionTexture# finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * occlusionColor.r, occlusionColor.r * u_occlusionPower);

			// 최종결과 산출
			//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
			//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
		 }
		 */
	};
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedPBRMaterial`,
		 description : `
			 RedPBRMaterial Instance 생성
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
			 occlusionTexture : [
				 {type:'RedBitmapTexture'}
			 ],
			 emissiveTexture : [
				 {type:'RedBitmapTexture'}
			 ],
			 roughnessTexture : [
				 {type:'RedBitmapTexture'}
			 ]
		 },
		 extends : ['RedBaseMaterial'],
		 demo : '../example/material/RedPBRMaterial.html',
		 example : `
			 RedPBRMaterial(
				 RedGL Instance,
				 RedBitmapTexture(RedGL Instance, src), // diffuseTexture
				 RedBitmapCubeTexture(RedGL Instance, srcList),
				 RedBitmapTexture(RedGL Instance, src), // normalTexture
				 RedBitmapTexture(RedGL Instance, src), // occlusionTexture
				 RedBitmapTexture(RedGL Instance, src), // emissiveTexture
				 RedBitmapTexture(RedGL Instance, src) // roughnessTexture
			 )
		 `,
		 return : 'RedPBRMaterial Instance'
	 }
	 :DOC*/
	RedPBRMaterial = function (redGL,
	                           diffuseTexture,
	                           environmentTexture,
	                           normalTexture,
	                           occlusionTexture,
	                           emissiveTexture,
	                           roughnessTexture
	) {
		if (!(this instanceof RedPBRMaterial)) return new RedPBRMaterial(
			redGL,
			diffuseTexture,
			environmentTexture,
			normalTexture,
			occlusionTexture,
			emissiveTexture,
			roughnessTexture
		);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedPBRMaterial : RedGL Instance만 허용.', redGL);
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		this['diffuseTexture'] = diffuseTexture;
		this['environmentTexture'] = environmentTexture;
		this['normalTexture'] = normalTexture;
		this['occlusionTexture'] = occlusionTexture;
		this['emissiveTexture'] = emissiveTexture;
		this['roughnessTexture'] = roughnessTexture;
		this['normalPower'] = 1;
		this['specularPower'] = 1;
		this['occlusionPower'] = 1;
		this['metallicFactor'] = 1;
		this['roughnessFactor'] = 0.1;
		this['baseColorFactor'] = [1, 1, 1, 1];
		this['emissiveFactor'] = 1;
		this['alpha'] = 1;
		this['cutOff'] = 0;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['useFlatMode'] = false;
		this['usePreMultiply'] = false;
		this['_UUID'] = RedGL.makeUUID();
		if (!checked) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	RedPBRMaterial.prototype = new RedBaseMaterial();
	var samplerOption = {
		callback: function () {
			this._searchProgram(PROGRAM_NAME, PROGRAM_OPTION_LIST)
		}
	};
	RedDefinePropertyInfo.definePrototypes(
		'RedPBRMaterial',
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`alpha`,
			 description : `기본값 : 1`,
			 return : 'Number'
		 }
		 :DOC*/
		['alpha', 'number', {min: 0, max: 1}],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`cutOff`,
			 description : `기본값 : 0`,
			 return : 'Number'
		 }
		 :DOC*/
		['cutOff', 'number', {min: 0, max: 1}],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`diffuseTexture`,
			 description : `diffuseTexture`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		['diffuseTexture', 'sampler2D', samplerOption],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`environmentTexture`,
			 description : `environmentTexture`,
			 return : 'RedBitmapCubeTexture'
		 }
		 :DOC*/
		['environmentTexture', 'samplerCube', {
			callback: samplerOption.callback
		}],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`normalTexture`,
			 description : `normalTexture`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		['normalTexture', 'sampler2D', samplerOption],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`occlusionTexture`,
			 description : `occlusionTexture`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		['occlusionTexture', 'sampler2D', samplerOption],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`emissiveTexture`,
			 description : `emissiveTexture`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		['emissiveTexture', 'sampler2D', samplerOption],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`roughnessTexture`,
			 description : `roughnessTexture`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		['roughnessTexture', 'sampler2D', samplerOption],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`normalPower`,
			 description : `기본값 : 1`,
			 return : 'number'
		 }
		 :DOC*/
		['normalPower', 'number', {'min': 0}],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`specularPower`,
			 description : `기본값 : 1`,
			 return : 'Number'
		 }
		 :DOC*/
		['specularPower', 'number', {'min': 0}],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`metallicFactor`,
			 description : `기본값 : 1`,
			 return : 'Number'
		 }
		 :DOC*/
		['metallicFactor', 'number', {'min': 0, 'max': 1}],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`emissiveFactor`,
			 description : `기본값 : 1`,
			 return : 'Number'
		 }
		 :DOC*/
		['emissiveFactor', 'number', {'min': 0, 'max': 1}],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`roughnessFactor`,
			 description : `기본값 : 0.1`,
			 return : 'Number'
		 }
		 :DOC*/
		['roughnessFactor', 'number', {'min': 0, 'max': 1}],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`occlusionPower`,
			 description : `기본값 : 1`,
			 return : 'Number'
		 }
		 :DOC*/
		['occlusionPower', 'number', {'min': 0}],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`useFlatMode`,
			 description : `
				flatMode 사용여부
				기본값 : true
			 `,
			 return : 'boolean'
		 }
		 :DOC*/
		['useFlatMode', 'boolean', samplerOption],
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`usePreMultiply`,
			 description : `
				usePreMultiply 사용여부
				기본값 : false
			 `,
			 return : 'boolean'
		 }
		 :DOC*/
		['usePreMultiply', 'boolean', samplerOption]
	);
	Object.freeze(RedPBRMaterial);
})();