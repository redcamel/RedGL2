"use strict";
var RedPBRMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedPBRMaterialProgram';
    var PROGRAM_OPTION_LIST = ['diffuseTexture', 'normalTexture', 'environmentTexture', 'occlusionTexture', 'emissiveTexture', 'roughnessTexture', 'displacementTexture'];
    var checked;
    vSource = function () {
        /* @preserve
            varying vec4 vVertexPositionEye4;

            //#REDGL_DEFINE#displacementTexture# uniform sampler2D u_displacementTexture;
            //#REDGL_DEFINE#displacementTexture# uniform float u_displacementPower;
            //#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedX;
            //#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedY;

            //#REDGL_DEFINE#skin#true#  mat4 getSkinMatrix(){
            //#REDGL_DEFINE#skin#true#      mat4 skinMat =
            //#REDGL_DEFINE#skin#true#      aVertexWeight.x * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.x) ] * uInverseBindMatrixForJoint[int(aVertexJoint.x)]+
            //#REDGL_DEFINE#skin#true#      aVertexWeight.y * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.y) ] * uInverseBindMatrixForJoint[int(aVertexJoint.y)]+
            //#REDGL_DEFINE#skin#true#      aVertexWeight.z * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.z) ] * uInverseBindMatrixForJoint[int(aVertexJoint.z)]+
            //#REDGL_DEFINE#skin#true#      aVertexWeight.w * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.w) ] * uInverseBindMatrixForJoint[int(aVertexJoint.w)];
            //#REDGL_DEFINE#skin#true#      return skinMat;
            //#REDGL_DEFINE#skin#true#  }

            void main(void) {
                vTexcoord = aTexcoord;
                vTexcoord1 = aTexcoord1;

                vVertexNormal = (uNMatrix * vec4(aVertexNormal,1.0)).xyz;

                //#REDGL_DEFINE#skin#true# vVertexPositionEye4 =  uMMatrix *  getSkinMatrix() * vec4(aVertexPosition, 1.0);
                //#REDGL_DEFINE#skin#false# vVertexPositionEye4 =  uMMatrix *  vec4(aVertexPosition, 1.0);

                //#REDGL_DEFINE#displacementTexture# vVertexPositionEye4.xyz += normalize(vVertexNormal) * texture2D(u_displacementTexture, vTexcoord + vec2(
                //#REDGL_DEFINE#displacementTexture#    u_displacementFlowSpeedX * (uTime/1000.0),
                //#REDGL_DEFINE#displacementTexture#    u_displacementFlowSpeedY * (uTime/1000.0)
                //#REDGL_DEFINE#displacementTexture# )).x * u_displacementPower ;

                //#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
                //#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter  *  uDirectionalShadowLightMatrix * vVertexPositionEye4;
                gl_PointSize = uPointSize;
                gl_Position = uPMatrix * uCameraMatrix * vVertexPositionEye4;
            }
         */
    };
    fSource = function () {
        /* @preserve
         precision mediump float;
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

         varying vec4 vVertexPositionEye4;


        uniform int u_diffuseTexCoordIndex;
        uniform int u_occlusionTexCoordIndex;
        uniform int u_emissiveTexCoordIndex;
        uniform int u_roughnessTexCoordIndex;
        uniform int u_normalTexCoordIndex;

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
        float cShadowAcneRemover = 0.0007;
         float decodeFloat (vec4 color) {
            const vec4 cBitShift = vec4(
                1.0 / (256.0 * 256.0 * 256.0),
                1.0 / (256.0 * 256.0),
                1.0 / 256.0,
                1
            );
            return dot(color, cBitShift);
        }

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
         void main(void) {
            la = uAmbientLightColor * uAmbientLightColor.a;
            ld = vec4(0.0, 0.0, 0.0, 1.0);
            ls = vec4(0.0, 0.0, 0.0, 1.0);

            vec2 u_diffuseTexCoord ;
            vec2 u_occlusionTexCoord;
            vec2 u_emissiveTexCoord;
            vec2 u_roughnessTexCoord;
            vec2 u_normalTexCoord;
            u_diffuseTexCoord = u_diffuseTexCoordIndex==0 ? vTexcoord : vTexcoord1;
            u_normalTexCoord = u_normalTexCoordIndex==0 ? vTexcoord : vTexcoord1;
            u_occlusionTexCoord = u_occlusionTexCoordIndex==0 ? vTexcoord : vTexcoord1;
            u_emissiveTexCoord = u_emissiveTexCoordIndex==0 ? vTexcoord : vTexcoord1;
            u_roughnessTexCoord  = u_roughnessTexCoordIndex==0 ? vTexcoord : vTexcoord1;

            float tMetallicPower = u_metallicFactor;
            float tRoughnessPower = u_roughnessFactor;
            //#REDGL_DEFINE#roughnessTexture# roughnessColor = texture2D(u_roughnessTexture, u_roughnessTexCoord);
            // 메탈릭 산출 roughnessColor.b
            //#REDGL_DEFINE#roughnessTexture# tMetallicPower *= roughnessColor.b;
            // 거칠기 산출 roughnessColor.g
            //#REDGL_DEFINE#roughnessTexture# tRoughnessPower *= roughnessColor.g ; //TODO: 공식적용해야함



            // diffuse 색상 산출
            texelColor = uBaseColorFactor;
            //#REDGL_DEFINE#diffuseTexture# texelColor *= texture2D(u_diffuseTexture, u_diffuseTexCoord);
            texelColor.rgb *= texelColor.a;



            // 노멀값 계산
            N = normalize(vVertexNormal);
            //#REDGL_DEFINE#normalTexture# vec4 normalColor = texture2D(u_normalTexture, u_normalTexCoord);
            //#REDGL_DEFINE#normalTexture# N = perturbNormal2Arb(vVertexPositionEye4.xyz, N, u_normalTexture, u_normalTexCoord) ;
            ////#REDGL_DEFINE#normalTexture# if(normalColor.a != 0.0) N = normalize(2.0 * (N + normalColor.rgb * u_normalPower  - 0.5));

            // 환경맵 계산
            vec3 R = reflect( vVertexPositionEye4.xyz-uCameraPosition, N);
            //#REDGL_DEFINE#environmentTexture# reflectionColor = textureCube(u_environmentTexture, R);
            //#REDGL_DEFINE#environmentTexture# reflectionColor.rgb *= reflectionColor.a;
            // 환경맵 합성
            //#REDGL_DEFINE#environmentTexture# texelColor.rgb = mix( texelColor.rgb , reflectionColor.rgb , max(tMetallicPower-tRoughnessPower,0.0)*(1.0-tRoughnessPower));
            //#REDGL_DEFINE#environmentTexture# texelColor = mix( texelColor , vec4(0.04, 0.04, 0.04, 1.0) , tRoughnessPower * (tMetallicPower) * 0.5);
            // 컷오프 계산
            if(texelColor.a <= u_cutOff) discard;


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




///////////////////////////////////////////////////////////////////////////////////////


            //#REDGL_DEFINE#directionalShadow#true#	vec3 fragmentDepth = vShadowPos.xyz;
            //#REDGL_DEFINE#directionalShadow#true#    fragmentDepth.z -= cShadowAcneRemover;
            //#REDGL_DEFINE#directionalShadow#true#	float amountInLight = 0.0;
            //#REDGL_DEFINE#directionalShadow#true#	for (int x = -1; x <= 1; x++) {
            //#REDGL_DEFINE#directionalShadow#true#	    for (int y = -1; y <= 1; y++) {
            //#REDGL_DEFINE#directionalShadow#true#	        vec2 tUV = fragmentDepth.xy + vec2(float(x)/vResolution.x, float(y)/vResolution.y) ;
            //#REDGL_DEFINE#directionalShadow#true#            if(tUV.x<0.0) continue;
            //#REDGL_DEFINE#directionalShadow#true#            if(tUV.x>1.0) continue;
            //#REDGL_DEFINE#directionalShadow#true#            if(tUV.y<0.0) continue;
            //#REDGL_DEFINE#directionalShadow#true#            if(tUV.y>1.0) continue;
            //#REDGL_DEFINE#directionalShadow#true#	        float texelDepth = decodeFloat(texture2D(uDirectionalShadowTexture,tUV));
            //#REDGL_DEFINE#directionalShadow#true#	        if (fragmentDepth.z < texelDepth ) amountInLight += 0.5;
            //#REDGL_DEFINE#directionalShadow#true#	       // finalColor =  texture2D(uDirectionalShadowTexture,tUV);
            //#REDGL_DEFINE#directionalShadow#true#	    }
            //#REDGL_DEFINE#directionalShadow#true#	}
            //#REDGL_DEFINE#directionalShadow#true#	amountInLight /= 9.0;
            //#REDGL_DEFINE#directionalShadow#true#	finalColor.rgb *= (1.0-amountInLight);

            ///////////////////////////////////////////////////////////////////////////////////////
                // 이미시브합성
            //#REDGL_DEFINE#emissiveTexture# emissiveColor = texture2D(u_emissiveTexture, u_emissiveTexCoord);
            //#REDGL_DEFINE#emissiveTexture# emissiveColor.rgb *= emissiveColor.a;
            //#REDGL_DEFINE#emissiveTexture# emissiveColor.rgb *= uEmissiveFactor;
            //#REDGL_DEFINE#emissiveTexture# finalColor.rgb += emissiveColor.rgb;
            // 오클루젼 합성
            //#REDGL_DEFINE#occlusionTexture# occlusionColor = texture2D(u_occlusionTexture, u_occlusionTexCoord);
            //#REDGL_DEFINE#occlusionTexture# finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * occlusionColor.r, occlusionColor.r * u_occlusionPower);


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