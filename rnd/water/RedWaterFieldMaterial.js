"use strict";
var RedWaterFieldMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedWaterFieldMaterialProgram';
    var PROGRAM_OPTION_LIST = ['normalTexture', 'specularTexture', 'emissiveTexture', 'displacementTexture','useFlatMode'];
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

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123) + fract(cos(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  {
   vec2 C = vec2(1.0/6.0, 1.0/3.0) ;
   vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
  }
            void main(void) {
                gl_PointSize = uPointSize;
                vTexcoord = aTexcoord ;



                // position 계산
                //#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
                //#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
                vVertexPosition =  targetMatrix *  vec4(aVertexPosition, 1.0);

                float scale = 8.0;
                float height = 2.0;

                vec2 st = vTexcoord * scale + uTime/1000.0;
                float n = noise(st+0.5);
                vVertexPosition.y = n * pow(height,0.0);

                st = vTexcoord * scale + uTime/1000.0;
                n = noise(st+0.5);
                vVertexPosition.y += n * pow(height,1.0);

                st = vTexcoord * scale + uTime/1000.0;
                n = noise(st+0.5);
                vVertexPosition.y += n * pow(height,2.0);

                st = vTexcoord * scale + uTime/1000.0;
                n = noise(st+0.5);
                vVertexPosition.y += n * pow(height,3.0);

                st = vTexcoord * scale + uTime/1000.0;
                n = noise(st+0.5);
                vVertexPosition.y += n * pow(height,4.0);

                // normal 계산
                vVertexNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0));



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
             // texelColor = vec4(0.3, 0.3, 0.48, 1.0);

            //#REDGL_DEFINE#emissiveTexture# emissiveColor = texture2D(u_emissiveTexture, vTexcoord);
            //#REDGL_DEFINE#emissiveTexture# emissiveColor.rgb *= texelColor.a;


             N = normalize(vVertexNormal);
             vec4 normalColor = vec4(1.0);
             //#REDGL_DEFINE#normalTexture#   normalColor = texture2D(u_normalTexture, vTexcoord );
             //#REDGL_DEFINE#normalTexture# if(normalColor.a != 0.0) N = normalize(2.0 * (N + normalize(normalColor.rgb) * u_normalPower  - 0.5));
             //#REDGL_DEFINE#useFlatMode# N = getFlatNormal(vVertexPosition.xyz);


            // texelColor *= normalColor;
            // vec3 normal = normalColor.rgb * 2.0-1.0;
            // normal = normalize( normal );
            // // calculate tangent and bitangent
            // vec3 P1 = dFdx( gl_FragCoord.xyz );
            // vec3 P2 = dFdy( gl_FragCoord.xyz  );
            // vec2 Q1 = dFdx( vTexcoord);
            // vec2 Q2 = dFdy( vTexcoord);
            //
            // vec3 T = normalize(  -P1 * Q2.t - P2 * Q1.t );
            // vec3 B = normalize(  -P2 * Q1.s - P1 * Q2.s );
            //
            //
            // mat3 TBN = mat3( T, B, vVertexNormal );
            // normal = TBN * normal;
            // N = normalize(normal);



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

             //#REDGL_DEFINE#emissiveTexture# finalColor.rgb += emissiveColor.rgb;
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
		 title :`RedWaterFieldMaterial`,
		 description : `
			 RedWaterFieldMaterial Instance 생성
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
		 extends : [
		    'RedBaseMaterial'
		 ],
		 demo : '../example/material/RedWaterFieldMaterial.html',
		 example : `
			 RedWaterFieldMaterial(
				 RedGL Instance,
				 RedBitmapTexture(RedGL Instance, src), // diffuseTexture
				 RedBitmapTexture(RedGL Instance, src), // normalTexture
				 RedBitmapTexture(RedGL Instance, src), // specularTexture
				 RedBitmapTexture(RedGL Instance, src)  // displacementTexture
			 )
		 `,
		 return : 'RedWaterFieldMaterial Instance'
	 }
     :DOC*/
    RedWaterFieldMaterial = function (redGL, diffuseTexture, normalTexture, specularTexture, displacementTexture, emissiveTexture) {
        if (!(this instanceof RedWaterFieldMaterial)) return new RedWaterFieldMaterial(redGL, diffuseTexture, normalTexture, specularTexture, displacementTexture, emissiveTexture);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedWaterFieldMaterial : RedGL Instance만 허용.', redGL);
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['diffuseTexture'] = diffuseTexture;
        this['normalTexture'] = normalTexture;
        this['specularTexture'] = specularTexture;
        this['emissiveTexture'] = emissiveTexture;
        this['displacementTexture'] = displacementTexture;
        this['normalPower'] = 1;
        this['shininess'] = 32;
        this['specularPower'] = 1;
        this['displacementPower'] = 0;
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
    RedWaterFieldMaterial.prototype = new RedBaseMaterial();
    /**DOC:
     {
         code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'alpha', 'number', {min: 0, max: 1});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`diffuseTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'diffuseTexture', 'sampler2D', {
        essential: true,
        callback: samplerOption.callback
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`normalTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'normalTexture', 'sampler2D', samplerOption);
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`specularTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'specularTexture', 'sampler2D', samplerOption);
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`specularTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'emissiveTexture', 'sampler2D', samplerOption);
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`displacementTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'displacementTexture', 'sampler2D', samplerOption);
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`normalPower`,
		 description : `기본값 : 1`,
		 return : 'number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'normalPower', 'number', {'min': 0});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`shininess`,
		 description : `기본값 : 16`,
		 return : 'number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'shininess', 'number', {'min': 0});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`specularPower`,
		 description : `기본값 : 1`,
		 return : 'number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'specularPower', 'number', {'min': 0});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`displacementPower`,
		 description : `기본값 : 0`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'displacementPower', 'number', {'min': 0});
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'displacementFlowSpeedX', 'number');
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'displacementFlowSpeedY', 'number');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`useFlatMode`,
		 description : `기본값 : true`,
		 return : 'boolean'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'useFlatMode', 'boolean', samplerOption);
    Object.freeze(RedWaterFieldMaterial);
})();