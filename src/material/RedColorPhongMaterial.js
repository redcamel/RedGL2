"use strict";
var RedColorPhongMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedColorPhongMaterialProgram';
    var PROGRAM_OPTION_LIST = ['useFlatMode'];
    var checked;
    vSource = function () {
        /* @preserve
            // 스키닝
            //#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#

            // Sprite3D
            //#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#

            void main(void) {
                gl_PointSize = uPointSize;
                // normal 계산
                //#REDGL_DEFINE#skin#true# vVertexNormal = (uNMatrix * getSkinMatrix() * vec4(aVertexNormal,0.0)).xyz;
               //#REDGL_DEFINE#skin#false# vVertexNormal = (uNMatrix *  vec4(aVertexNormal,1.0)).xyz;

                // position 계산
                //#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
                //#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
                vVertexPosition =  targetMatrix *  vec4(aVertexPosition, 1.0);

                //#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
                //#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
                //#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
                //#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
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

        // flat노말
        //#REDGL_DEFINE#fragmentShareFunc#getFlatNormal#

        // 라이트
        //#REDGL_DEFINE#fragmentShareFunc#getDirectionalLightColor#
        //#REDGL_DEFINE#fragmentShareFunc#getPointLightColor#

         uniform float u_shininess;
         uniform float u_specularPower;
         uniform vec4 u_color;


         vec3 N;
         vec4 texelColor;

         vec4 specularLightColor= vec4(1.0, 1.0, 1.0, 1.0);
         float specularTextureValue;

         vec4 finalColor;
         void main(void) {

             texelColor = u_color;

             N = normalize(vVertexNormal);
             //#REDGL_DEFINE#useFlatMode# N = getFlatNormal(vVertexPosition.xyz);

             specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
             specularTextureValue = 1.0;

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

             finalColor.a = texelColor.a;
             if(finalColor.a == 0.0) discard;

             //#REDGL_DEFINE#directionalShadow#true# finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture), 0.5);

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
				 {type:'hex'},
				 '기본값 : #ff0000'
			 ],
			 alpha : [
				 {type:'number'},
				 '기본값 : 1'
			 ]
		 },
		 extends : ['RedBaseMaterial'],
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
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['_color'] = new Float32Array(4);
        this['shininess'] = 16;
        this['specularPower'] = 1;
        this['alpha'] = alpha == undefined ? 1 : alpha;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['useFlatMode'] = false
        this['color'] = hexColor ? hexColor : '#ff0000';
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
		 description : `
		    기본값 : 1
		    최소값 : 0
		    최대값 : 1
		 `,
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
    RedDefinePropertyInfo.definePrototype('RedColorPhongMaterial', 'useFlatMode', 'boolean', samplerOption);
    Object.freeze(RedColorPhongMaterial);
})();