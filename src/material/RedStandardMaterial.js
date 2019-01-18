"use strict";
var RedStandardMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedStandardMaterialProgram';
    var PROGRAM_OPTION_LIST = ['diffuseTexture', 'normalTexture', 'specularTexture', 'emissiveTexture', 'displacementTexture', 'useFlatMode'];
    var checked;
    vSource = function () {
        /* @preserve
            // 스키닝
            //#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#

            // Sprite3D
            //#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#

            //#REDGL_DEFINE#displacementTexture# uniform sampler2D u_displacementTexture;
            //#REDGL_DEFINE#displacementTexture# uniform float u_displacementPower;
            //#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedX;
            //#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedY;



            void main(void) {
                gl_PointSize = uPointSize;
                vTexcoord = aTexcoord;

                // normal 계산
                //#REDGL_DEFINE#skin#true# vVertexNormal = (uNMatrix * getSkinMatrix() * vec4(aVertexNormal,0.0)).xyz;
               //#REDGL_DEFINE#skin#false# vVertexNormal = (uNMatrix *  vec4(aVertexNormal,1.0)).xyz;

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
                //#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter  *  uDirectionalShadowLightMatrix * vVertexPosition;
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

        //#REDGL_DEFINE#fragmentShareFunc#getPerturbNormal2Arb#

        // 라이트
        //#REDGL_DEFINE#fragmentShareFunc#getDirectionalLightColor#
        //#REDGL_DEFINE#fragmentShareFunc#getPointLightColor#

        // 텍스쳐
         uniform sampler2D u_diffuseTexture;
         //#REDGL_DEFINE#normalTexture# uniform sampler2D u_normalTexture;
         //#REDGL_DEFINE#specularTexture# uniform sampler2D u_specularTexture;
         //#REDGL_DEFINE#emissiveTexture# uniform sampler2D u_emissiveTexture;

         //#REDGL_DEFINE#normalTexture# uniform float u_normalPower;
         uniform float u_shininess;
         uniform float u_specularPower;
         //#REDGL_DEFINE#emissiveTexture# uniform float u_emissiveFactor;
         uniform float u_alpha;



         vec4 texelColor;
         vec4 emissiveColor;

         vec4 specularLightColor= vec4(1.0, 1.0, 1.0, 1.0);
         float specularTextureValue;

         vec4 finalColor;
         vec3 N;

         void main(void) {


             texelColor = texture2D(u_diffuseTexture, vTexcoord);
             texelColor.rgb *= texelColor.a;
             if(texelColor.a ==0.0) discard;

            //#REDGL_DEFINE#emissiveTexture# emissiveColor = texture2D(u_emissiveTexture, vTexcoord);
            //#REDGL_DEFINE#emissiveTexture# emissiveColor.rgb *= texelColor.a;


             N = normalize(vVertexNormal);
             vec4 normalColor = vec4(0.0);
             //#REDGL_DEFINE#normalTexture# normalColor = texture2D(u_normalTexture, vTexcoord);
             //#REDGL_DEFINE#useFlatMode# N = getFlatNormal(vVertexPosition.xyz);
             //#REDGL_DEFINE#normalTexture# N = getPerturbNormal2Arb(vVertexPosition.xyz, N, normalColor, vTexcoord) ;

             specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
             specularTextureValue = 1.0;
             //#REDGL_DEFINE#specularTexture# specularTextureValue = texture2D(u_specularTexture, vTexcoord).r;


             vec4 finalColor = uAmbientLightColor * uAmbientIntensity
             + getDirectionalLightColor(
                texelColor,
                N,
                u_shininess,
                specularLightColor,
                specularTextureValue,
                u_specularPower
             )
             + getPointLightColor(
                texelColor,
                N,
                u_shininess,
                specularLightColor,
                specularTextureValue,
                u_specularPower
             );

             //#REDGL_DEFINE#emissiveTexture# finalColor.rgb += emissiveColor.rgb * u_emissiveFactor;

             finalColor.rgb *= texelColor.a;
             finalColor.a = texelColor.a * u_alpha;

             //#REDGL_DEFINE#directionalShadow#true# finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture), 0.5);
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
			 ],
			 emissiveTexture : [
				 {type:'RedBitmapTexture'}
			 ]
		 },
		 extends : ['RedBaseMaterial'],
		 demo : '../example/material/RedStandardMaterial.html',
		 example : `
			 RedStandardMaterial(
				 RedGL Instance,
				 RedBitmapTexture(RedGL Instance, src), // diffuseTexture
				 RedBitmapTexture(RedGL Instance, src), // normalTexture
				 RedBitmapTexture(RedGL Instance, src), // specularTexture
				 RedBitmapTexture(RedGL Instance, src),  // displacementTexture
				 RedBitmapTexture(RedGL Instance, src)  // emissiveTexture
			 )
		 `,
		 return : 'RedStandardMaterial Instance'
	 }
     :DOC*/
    RedStandardMaterial = function (redGL, diffuseTexture, normalTexture, specularTexture, displacementTexture, emissiveTexture) {
        if (!(this instanceof RedStandardMaterial)) return new RedStandardMaterial(redGL, diffuseTexture, normalTexture, specularTexture, displacementTexture, emissiveTexture);
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
        this['emissiveFactor'] = 1;
        this['displacementPower'] = 0.1;
        this['displacementFlowSpeedX'] = 0;
        this['displacementFlowSpeedY'] = 0;
        this['alpha'] = 1
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['_UUID'] = RedGL.makeUUID();
        if (!checked) {
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
		 description : `diffuseTexture`,
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
		 description : `normalTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'normalTexture', 'sampler2D', samplerOption);
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`specularTexture`,
		 description : `specularTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'specularTexture', 'sampler2D', samplerOption);
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`emissiveTexture`,
		 description : `emissiveTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'emissiveTexture', 'sampler2D', samplerOption);
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`displacementTexture`,
		 description : `displacementTexture`,
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
		 title :`emissiveFactor`,
		 description : `기본값 : 1`,
		 return : 'number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'emissiveFactor', 'number', {'min': 0});

    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`displacementPower`,
		 description : `기본값 : 0`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'displacementPower', 'number', {'min': 0});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`displacementFlowSpeedX`,
		 description : `기본값 : 0`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'displacementFlowSpeedX', 'number');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`displacementFlowSpeedY`,
		 description : `기본값 : 0`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'displacementFlowSpeedY', 'number');
    /**DOC:
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
    RedDefinePropertyInfo.definePrototype('RedStandardMaterial', 'useFlatMode', 'boolean', samplerOption);
    Object.freeze(RedStandardMaterial);
})();