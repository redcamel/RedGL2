"use strict";
var RedPBRMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedPBRMaterialProgram';
    var PROGRAM_OPTION_LIST = ['diffuseTexture', 'normalTexture', 'environmentTexture', 'occlusionTexture', 'emissiveTexture', 'roughnessTexture', 'displacementTexture'];
    var checked;
    vSource = function () {
        /* @preserve
            varying vec4 vVertexPosition;
            // 스키닝
            //#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#
            //#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#

            // 텍스쳐 선언
            //#REDGL_DEFINE#displacementTexture# uniform sampler2D u_displacementTexture;
            //#REDGL_DEFINE#displacementTexture# uniform float u_displacementPower;
            //#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedX;
            //#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedY;

            void main(void) {
                // UV설정
                vTexcoord = aTexcoord;
                vTexcoord1 = aTexcoord1;

                // normal 계산
                vVertexNormal = (uNMatrix * vec4(aVertexNormal,1.0)).xyz;

               // position 계산
                //#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
                //#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
                vVertexPosition =  targetMatrix *  vec4(aVertexPosition, 1.0);

                //#REDGL_DEFINE#displacementTexture# vVertexPosition.xyz += normalize(vVertexNormal) * texture2D(u_displacementTexture, vTexcoord + vec2(
                //#REDGL_DEFINE#displacementTexture#    u_displacementFlowSpeedX * (uTime/1000.0),
                //#REDGL_DEFINE#displacementTexture#    u_displacementFlowSpeedY * (uTime/1000.0)
                //#REDGL_DEFINE#displacementTexture# )).x * u_displacementPower ;

                // 최종 포지션 계산
                //#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
                //#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
                //#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
                //#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2(targetMatrix[0][0],targetMatrix[1][1] * uResolution.x/uResolution.y);
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

		//#REDGL_DEFINE#fragmentShareFunc#getPerturbNormal2Arb#

         uniform vec4 uBaseColorFactor;
         uniform vec3 uEmissiveFactor;
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

         varying vec4 vVertexPosition;

        uniform int u_diffuseTexCoordIndex;
        uniform int u_occlusionTexCoordIndex;
        uniform int u_emissiveTexCoordIndex;
        uniform int u_roughnessTexCoordIndex;
        uniform int u_normalTexCoordIndex;



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

        vec2 u_diffuseTexCoord ;
        vec2 u_occlusionTexCoord;
        vec2 u_emissiveTexCoord;
        vec2 u_roughnessTexCoord;
        vec2 u_normalTexCoord;

         void main(void) {
            la = uAmbientLightColor * uAmbientLightColor.a;
            ld = vec4(0.0, 0.0, 0.0, 1.0);
            ls = vec4(0.0, 0.0, 0.0, 1.0);

            u_diffuseTexCoord = u_diffuseTexCoordIndex==0 ? vTexcoord : vTexcoord1;
            u_normalTexCoord = u_normalTexCoordIndex==0 ? vTexcoord : vTexcoord1;
            u_occlusionTexCoord = u_occlusionTexCoordIndex==0 ? vTexcoord : vTexcoord1;
            u_emissiveTexCoord = u_emissiveTexCoordIndex==0 ? vTexcoord : vTexcoord1;
            u_roughnessTexCoord  = u_roughnessTexCoordIndex==0 ? vTexcoord : vTexcoord1;

            float tMetallicPower = u_metallicFactor;
            float tRoughnessPower = u_roughnessFactor;

            //#REDGL_DEFINE#roughnessTexture# roughnessColor = texture2D(u_roughnessTexture, u_roughnessTexCoord);
            //#REDGL_DEFINE#roughnessTexture# tMetallicPower *= roughnessColor.b; // 메탈릭 산출 roughnessColor.b
            //#REDGL_DEFINE#roughnessTexture# tRoughnessPower *= roughnessColor.g; // 거칠기 산출 roughnessColor.g

            // diffuse 색상 산출
            texelColor = uBaseColorFactor;
            //#REDGL_DEFINE#diffuseTexture# texelColor *= texture2D(u_diffuseTexture, u_diffuseTexCoord);
            texelColor.rgb *= texelColor.a;

            // 노멀값 계산
            N = normalize(vVertexNormal);
            vec4 normalColor = vec4(0.0);
            //#REDGL_DEFINE#normalTexture# normalColor = texture2D(u_normalTexture, u_normalTexCoord);
            //#REDGL_DEFINE#normalTexture# N = getPerturbNormal2Arb(vVertexPosition.xyz, N, normalColor, u_normalTexCoord) ;

            // 환경맵 계산
            vec3 R = reflect( vVertexPosition.xyz-uCameraPosition, N);
            //#REDGL_DEFINE#environmentTexture# reflectionColor = textureCube(u_environmentTexture, R);
            //#REDGL_DEFINE#environmentTexture# reflectionColor.rgb *= reflectionColor.a;

            // 환경맵 합성
            //#REDGL_DEFINE#environmentTexture# texelColor.rgb = mix( texelColor.rgb , reflectionColor.rgb , max(tMetallicPower-tRoughnessPower,0.0)*(1.0-tRoughnessPower));
            //#REDGL_DEFINE#environmentTexture# texelColor = mix( texelColor , vec4(0.04, 0.04, 0.04, 1.0) , tRoughnessPower * (tMetallicPower) * 0.5);

            // 컷오프 계산
            if(texelColor.a <= u_cutOff) discard;

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
            finalColor = la * uAmbientIntensity + ld + ls;
            finalColor.a = texelColor.a * u_alpha ;

            // 그림자 계산
            //#REDGL_DEFINE#directionalShadow#true# finalColor.rgb *= getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture);

            // 이미시브합성
            //#REDGL_DEFINE#emissiveTexture# emissiveColor = texture2D(u_emissiveTexture, u_emissiveTexCoord);
            //#REDGL_DEFINE#emissiveTexture# emissiveColor.rgb *= emissiveColor.a;
            //#REDGL_DEFINE#emissiveTexture# emissiveColor.rgb *= uEmissiveFactor;
            //#REDGL_DEFINE#emissiveTexture# finalColor.rgb += emissiveColor.rgb;

            // 오클루젼 합성
            //#REDGL_DEFINE#occlusionTexture# occlusionColor = texture2D(u_occlusionTexture, u_occlusionTexCoord);
            //#REDGL_DEFINE#occlusionTexture# finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * occlusionColor.r, occlusionColor.r * u_occlusionPower);

            // 최종결과 산출
            //#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
            //#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
         }
         */
    };
    /**DOC:
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
			 displacementTexture : [
				 {type:'RedBitmapTexture'}
			 ]
		 },
		 extends : [
		    'RedBaseMaterial'
		 ],
		 demo : '../example/material/RedPBRMaterial.html',
		 example : `
			 RedPBRMaterial(
				 RedGL Instance,
				 RedBitmapTexture(RedGL Instance, src), // diffuseTexture
				 RedBitmapCubeTexture(RedGL Instance, srcList),
				 RedBitmapTexture(RedGL Instance, src), // normalTexture
				 RedBitmapTexture(RedGL Instance, src), // occlusionTexture
				 RedBitmapTexture(RedGL Instance, src)  // displacementTexture
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
                               roughnessTexture,
                               displacementTexture) {
        if (!(this instanceof RedPBRMaterial)) return new RedPBRMaterial(
            redGL,
            diffuseTexture,
            environmentTexture,
            normalTexture,
            occlusionTexture,
            emissiveTexture,
            roughnessTexture,
            displacementTexture
        );
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPBRMaterial : RedGL Instance만 허용.', redGL);
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['diffuseTexture'] = diffuseTexture;
        this['environmentTexture'] = environmentTexture;
        this['normalTexture'] = normalTexture;
        this['occlusionTexture'] = occlusionTexture;
        this['displacementTexture'] = displacementTexture;
        this['emissiveTexture'] = emissiveTexture;
        this['roughnessTexture'] = roughnessTexture;
        this['normalPower'] = 1;
        this['specularPower'] = 1;
        this['metallicFactor'] = 1;
        this['roughnessFactor'] = 1;

        this['diffuseTexCoordIndex'] = 0
        this['occlusionTexCoordIndex'] = 0
        this['emissiveTexCoordIndex'] = 0
        this['roughnessTexCoordIndex'] = 0;
        this['normalTexCoordIndex'] = 0


        this['occlusionPower'] = 1;
        this['displacementPower'] = 0;
        this['displacementFlowSpeedX'] = 0;
        this['displacementFlowSpeedY'] = 0;
        this['baseColorFactor'] = null
        this['emissiveFactor'] = null;
        this['alpha'] = 1;
        this['cutOff'] = 0;
        /////////////////////////////////////////
        // 일반 프로퍼티
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
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'alpha', 'number', {min: 0, max: 1});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`cutOff`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'cutOff', 'number', {min: 0, max: 1});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`diffuseTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'diffuseTexture', 'sampler2D', samplerOption);
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'diffuseTexCoordIndex', 'number');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`environmentTexture`,
		 return : 'RedBitmapCubeTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'environmentTexture', 'samplerCube', {
        callback: samplerOption.callback
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`normalTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'normalTexture', 'sampler2D', samplerOption);
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'normalTexCoordIndex', 'number');

    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`occlusionTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'occlusionTexture', 'sampler2D', samplerOption);
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'occlusionTexCoordIndex', 'number');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`displacementTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'displacementTexture', 'sampler2D', samplerOption);
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`emissiveTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'emissiveTexture', 'sampler2D', samplerOption);
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'emissiveTexCoordIndex', 'number');

    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`roughnessTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'roughnessTexture', 'sampler2D', samplerOption);
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'roughnessTexCoordIndex', 'number');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`normalPower`,
		 description : `기본값 : 1`,
		 return : 'number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'normalPower', 'number', {'min': 0});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`specularPower`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'specularPower', 'number', {'min': 0});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`metallicFactor`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'metallicFactor', 'number', {'min': 0, 'max': 1});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`roughnessFactor`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'roughnessFactor', 'number', {'min': 0, 'max': 1});

    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`occlusionPower`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'occlusionPower', 'number', {'min': 0});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`displacementPower`,
		 description : `기본값 : 0`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'displacementPower', 'number', {'min': 0});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`displacementFlowSpeedX`,
		 description : `기본값 : 0`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'displacementFlowSpeedX', 'number');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`displacementFlowSpeedY`,
		 description : `기본값 : 0`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedPBRMaterial', 'displacementFlowSpeedY', 'number');
    Object.freeze(RedPBRMaterial);
})();