"use strict";
var RedFluid002;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedFluid002Program';
    var PROGRAM_OPTION_LIST = [];
    var checked;
    vSource = function () {
        /* @preserve
            // 스키닝
            //#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#

            // Sprite3D
            //#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#

            void main(void) {
                gl_PointSize = uPointSize;

                vTexcoord = aTexcoord;
 vVertexNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0));
                // position 계산
                //#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
                //#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;

                //#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
                //#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
                //#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
                //#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2(targetMatrix[0][0],targetMatrix[1][1] * uResolution.x/uResolution.y);
                //#REDGL_DEFINE#sprite3D#true# }
                //#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);

                //#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
                //#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter  *  uDirectionalShadowLightMatrix * targetMatrix * vec4(aVertexPosition, 1.0);
                vTime = uTime;
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

         uniform sampler2D u_diffuseTexture;
         uniform sampler2D u_rippleTexture;

         uniform float u_shininess;
         uniform float u_specularPower;

         void main(void) {
            float maximum = 1.0;
            float time_e      = vTime * 0.0001;

            vec2 uv_t         = vec2(vTexcoord.s + time_e, vTexcoord.t + time_e);
            vec4 displace     = texture2D(u_rippleTexture, uv_t);

            float displace_k  = displace.g * maximum;
            vec2 uv_displaced = vec2(vTexcoord.x + displace_k, vTexcoord.y + displace_k);

   vec4 texelColor      = texture2D(u_diffuseTexture, uv_displaced);
   texelColor.a = 0.9;

            displace     = texture2D(u_rippleTexture, uv_displaced);
           vec3 N = vec3(displace.rgb);
           N.y = pow(N.y,3.5);


             vec4 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
             float specularTextureValue = 1.0;

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
		 title :` RedFluid002`,
		 description : `
			  RedFluid002 Instance 생성자.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 diffuseTexture : [
				 {type:'RedBitmapTexture'}
			 ]
		 },
		 extends : ['RedBaseMaterial'],
		 demo : '../example/material/ RedFluid002.html',
		 example : `
			  RedFluid002( RedGL Instance, RedBitmapTexture(RedGL Instance, src) )
		 `,
		 return : ' RedFluid002 Instance'
	 }
     :DOC*/
    RedFluid002 = function (redGL, diffuseTexture, rippleTexture) {
        if (!(this instanceof RedFluid002)) return new RedFluid002(redGL, diffuseTexture, rippleTexture);
        redGL instanceof RedGL || RedGLUtil.throwFunc(' RedFluid002 : RedGL Instance만 허용.', redGL);
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['diffuseTexture'] = diffuseTexture;
        this['rippleTexture'] = rippleTexture;
        this['shininess'] = 16;
        this['specularPower'] = 1;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['_UUID'] = RedGL.makeUUID();
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this);
    };
    RedFluid002.prototype = new RedBaseMaterial();
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`diffuseTexture`,
		 description : `diffuseTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedFluid002', 'diffuseTexture', 'sampler2D', {essential: true});
    RedDefinePropertyInfo.definePrototype('RedFluid002', 'rippleTexture', 'sampler2D', {essential: true});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`shininess`,
		 description : `기본값 : 16`,
		 return : 'shininess'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedFluid002', 'shininess', 'number', {'min': 0});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`specularPower`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedFluid002', 'specularPower', 'number', {'min': 0});

    Object.freeze(RedFluid002);
})();