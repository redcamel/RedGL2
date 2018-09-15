"use strict";
var RedColorPhongMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedColorPhongMaterialProgram';
    var checked;
    vSource = function () {
        /* @preserve
            // 스키닝
            //#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#

            //#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#

            varying vec4 vVertexPosition;

            void main(void) {
                // normal 계산
                vVertexNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0));

                // position 계산
                //#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
                //#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
                vVertexPosition =  targetMatrix *  vec4(aVertexPosition, 1.0);

                //#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
                //#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
                //#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
                //#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2(targetMatrix[0][0],targetMatrix[1][1] * uResolution.x/uResolution.y);
                //#REDGL_DEFINE#sprite3D#true# }
                //#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);

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

         uniform float u_shininess;
         uniform float u_specularPower;
         uniform vec4 u_color;
         varying vec4 vVertexPosition;

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
             specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
             specularTextureValue = 1.0;

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
                 L =  -uPointLightPositionList[i] + vVertexPosition.xyz;
                 distanceLength = length(L);
                 if(uPointLightRadiusList[i]> distanceLength){
                     attenuation = 1.0 / (0.01 + 0.02 * distanceLength + 0.03 * distanceLength * distanceLength);
                     L = normalize(L);
                     lambertTerm = dot(N,-L);
                     if(lambertTerm > 0.0){
                         ld += uPointLightColorList[i] * texelColor * lambertTerm * attenuation * uPointLightIntensityList[i] * uPointLightColorList[i].a;
                         specular = pow( max(dot( reflect(L, N), -L), 0.0), u_shininess);
                         ls +=  specularLightColor * specular * u_specularPower * specularTextureValue * uPointLightIntensityList[i]  * uPointLightColorList[i].a ;
                     }
                 }
             }
             vec4 finalColor = la * uAmbientIntensity + ld + ls;
             finalColor.rgb *= texelColor.a;
             finalColor.a = texelColor.a;
             //#REDGL_DEFINE#directionalShadow#true# finalColor.rgb *= getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture);

             //#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
             //#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedColorPhongMaterial`,
		 description : `
			 RedColorPhongMaterial Instance 생성
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
			 ]
		 },
		 extends : [
		    'RedBaseMaterial'
		 ],
		 demo : '../example/material/RedColorPhongMaterial.html',
		 example: `
		 RedColorPhongMaterial(RedGL Instance, hex, alpha)
		 `,
		 return : 'RedColorPhongMaterial Instance'
	 }
     :DOC*/
    RedColorPhongMaterial = function (redGL, hexColor, alpha) {
        if (!(this instanceof RedColorPhongMaterial)) return new RedColorPhongMaterial(redGL, hexColor, alpha);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedColorPhongMaterial : RedGL Instance만 허용.', '입력값 : ' + redGL);
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['_color'] = new Float32Array(4);
        this['shininess'] = 16;
        this['specularPower'] = 1;
        this['alpha'] = alpha == undefined ? 1 : alpha;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['color'] = hexColor ? hexColor : '#ff0000';
        this['_UUID'] = RedGL.makeUUID();
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this);
    };
    RedColorPhongMaterial.prototype = new RedBaseMaterial();
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`color`,
		 description : `기본값 : #ff2211`,
		 return : 'hex'
	 }
     :DOC*/
    Object.defineProperty(RedColorPhongMaterial.prototype, 'color', RedColorMaterial['DEFINE_OBJECT_COLOR']);
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedColorPhongMaterial', 'alpha', 'number', RedColorMaterial['DEFINE_OBJECT_ALPHA']);
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`shininess`,
		 description : `기본값 : 16`,
		 return : 'shininess'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedColorPhongMaterial', 'shininess', 'number', {'min': 0});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`specularPower`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedColorPhongMaterial', 'specularPower', 'number', {'min': 0});
    Object.freeze(RedColorPhongMaterial);
})();