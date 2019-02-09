"use strict";
var RedRippleMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedRippleMaterialProgram';
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
                vTime= uTime;
                vResolution = uResolution;
                // position 계산
                //#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
                //#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;

                //#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
                //#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
                //#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
                //#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2(targetMatrix[0][0],targetMatrix[1][1] * uResolution.x/uResolution.y);
                //#REDGL_DEFINE#sprite3D#true# }
                //#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);

                vVertexPosition = vec4(aVertexPosition, 1.0);

                //#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
                //#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter  *  uDirectionalShadowLightMatrix * targetMatrix * vec4(aVertexPosition, 1.0);
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

         uniform sampler2D u_diffuseTexture;
         uniform sampler2D u_diffuseTexture2;
         uniform samplerCube u_diffuseTexture3;

         uniform float u_alpha;
float rotSpeed = 0.05;
vec4 mainImage(  vec4 fragColor,  vec2 fragCoord ) {
    vec2 uv = gl_FragCoord.xy / vResolution.xy;
    uv = vec2(uv.x,-uv.y);

    vec4 buff = texture2D(u_diffuseTexture2, uv)*2.0-1.0;
    float z = sqrt(1.0 - clamp(dot(vec2(buff.x,buff.y), vec2(buff.x,buff.y)),0.0, 1.0)) ;
    vec3 n = normalize(vec3(buff.x, buff.y, z));

    vec3 lightDir = vec3(sin(vTime/100.0*rotSpeed),cos(vTime/100.0*rotSpeed),0.0);

    float l = max(0.0, dot(n, lightDir));
    float fresnel = 1.0 - dot(vec3(0.0,0.0,1.0), n);
    vec4 refl = textureCube(u_diffuseTexture3, reflect(n, lightDir));

    vec4 tex = texture2D(u_diffuseTexture, uv);

    fragColor = tex*0.5 + vec4((fresnel + l)*5.0)*refl + refl*0.5;
    fragColor.a = -uv.y;
    return fragColor;
}


        // 라이트
        //#REDGL_DEFINE#fragmentShareFunc#getDirectionalLightColor#
        //#REDGL_DEFINE#fragmentShareFunc#getPointLightColor#

         void main(void) {
             // vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
             // finalColor.rgb *= finalColor.a;
             // finalColor.a *= u_alpha;
             // if(finalColor.a == 0.0) discard;
             //
             // //#REDGL_DEFINE#directionalShadow#true# finalColor.rgb *= getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture);
             // //#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
             // //#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);


            vec4 texelColor = texture2D(u_diffuseTexture, vTexcoord);

            vec4 finalColor = mainImage(texture2D(u_diffuseTexture, vTexcoord), vTexcoord);
            gl_FragColor =  finalColor;
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedRippleMaterial`,
		 description : `
			 RedRippleMaterial Instance 생성자.
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
		 demo : '../example/material/RedRippleMaterial.html',
		 example : `
			 RedRippleMaterial( RedGL Instance, RedBitmapTexture(RedGL Instance, src) )
		 `,
		 return : 'RedRippleMaterial Instance'
	 }
     :DOC*/
    RedRippleMaterial = function (redGL, diffuseTexture,diffuseTexture2,diffuseTexture3) {
        if (!(this instanceof RedRippleMaterial)) return new RedRippleMaterial(redGL, diffuseTexture,diffuseTexture2,diffuseTexture3);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedRippleMaterial : RedGL Instance만 허용.', redGL);
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['diffuseTexture'] = diffuseTexture;
        this['diffuseTexture2'] = diffuseTexture2;
        this['diffuseTexture3'] = diffuseTexture3;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['alpha'] = 1;
        this['_UUID'] = RedGL.makeUUID();
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this);
    };
    RedRippleMaterial.prototype = new RedBaseMaterial();
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`diffuseTexture`,
		 description : `diffuseTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedRippleMaterial', 'diffuseTexture', 'sampler2D', {essential: true});
    RedDefinePropertyInfo.definePrototype('RedRippleMaterial', 'diffuseTexture2', 'sampler2D', {essential: true});
    RedDefinePropertyInfo.definePrototype('RedRippleMaterial', 'diffuseTexture3', 'samplerCube', {essential: true});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedRippleMaterial', 'alpha', 'number', {min: 0, max: 1});
    Object.freeze(RedRippleMaterial);
})();