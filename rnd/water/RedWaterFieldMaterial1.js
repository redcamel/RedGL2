"use strict";
var RedWaterFieldMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedWaterFieldMaterialProgram';
    var PROGRAM_OPTION_LIST = ['useFlatMode'];
    var checked;
    vSource = function () {
        /* @preserve
            // 스키닝
            //#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#

            // Sprite3D
            //#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
            varying vec4 vVertexPosition2;
            varying vec4 vVertexPosition3;
            varying vec3 vTexcoord3D;
            void main(void) {
                gl_PointSize = uPointSize;
                vTexcoord3D = aVertexPosition;
                vTexcoord = aTexcoord;

                // normal 계산
                vVertexNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0));

                // position 계산
                //#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
                //#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
                vVertexPosition =  targetMatrix * vec4(aVertexPosition, 1.0);

                vTime = uTime/1000.0;

                // 최종 포지션 계산
                //#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
                //#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
                //#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
                //#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2(targetMatrix[0][0],targetMatrix[1][1] * uResolution.x/uResolution.y);
                //#REDGL_DEFINE#sprite3D#true# }
                //#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * vVertexPosition;

                vVertexPosition3 = uCameraMatrix * vVertexPosition;
vVertexPosition2 = gl_Position;

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

        uniform sampler2D u_diffuseTexture;
        uniform sampler2D u_diffuseTexture2;
         uniform float u_shininess;
         uniform float u_specularPower;
         uniform vec4 u_color;
          varying vec4 vVertexPosition2;
 varying vec4 vVertexPosition3;
////
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
/////

         vec3 N;
         vec4 texelColor;

         vec4 specularLightColor= vec4(1.0, 1.0, 1.0, 1.0);
         float specularTextureValue;
 varying vec3 vTexcoord3D;
         vec4 finalColor;
         void main(void) {

   float epsilon = 0.01;
    float xScale = 0.05;
    float yScale = 0.1;
    float velocity1 = 0.7;
    float velocity2 = 0.3;
    float turbulence1 = 0.2;
    float turbulence2 = 0.5;
    float waveScale1 = .6;
    float waveScale2 = 2.0;
    float waveAmp1 = 2.0;
    float waveAmp2 = 0.5;


     //Procedural bump mapping

            vec3 noiseSeed1 = vec3(vTexcoord3D.x*xScale, vTexcoord3D.y*yScale+vTime*velocity1, vTime*turbulence1);
            vec3 noiseSeed2 = vec3(vTexcoord3D.x*xScale, vTexcoord3D.y*yScale+vTime*velocity2, vTime*turbulence2);

            vec3 noiseSeedX1 = vec3(vTexcoord3D.x*xScale-epsilon, vTexcoord3D.y*yScale+vTime*velocity1, vTime*turbulence1);
            vec3 noiseSeedX2 = vec3(vTexcoord3D.x*xScale-epsilon, vTexcoord3D.y*yScale+vTime*velocity2, vTime*turbulence2);

            vec3 noiseSeedY1 = vec3(vTexcoord3D.x*xScale, vTexcoord3D.y*yScale+vTime*velocity1-epsilon, vTime*turbulence1);
            vec3 noiseSeedY2 = vec3(vTexcoord3D.x*xScale, vTexcoord3D.y*yScale+vTime*velocity2-epsilon, vTime*turbulence2);

            float noise = waveAmp1 * snoise(noiseSeed1*waveScale1);
            noise += waveAmp2 * snoise(noiseSeed2*waveScale2);

            float noiseX = waveAmp1 * snoise(noiseSeedX1*waveScale1);
            noiseX += waveAmp2 * snoise(noiseSeedX2*waveScale2);

            float noiseY = waveAmp1 * snoise(noiseSeedY1*waveScale1);
            noiseY += waveAmp2 * snoise(noiseSeedY2*waveScale2);

            //bump mapped gradient
            vec2 perturbation = vec2((noiseX-noise)/epsilon, (noiseY-noise)/epsilon);

            vec3 gradient = vec3(perturbation*0.5, 10.0);
            gradient = normalize(gradient);

            vec2 ripples = vec2(noiseX, noiseY);
            ripples -= 0.5;


             // Reflection/Refraction mapping
            // clip coord -> perspective divide ([-1, -1]) -> [0,1]
            vec2 screenCoordRefl = vec2(
            1.0 - (0.5 * vVertexPosition2.x/vVertexPosition2.z + 0.5), //refl map is flipped in screen.x
            (0.5 * vVertexPosition2.y/vVertexPosition2.z + 0.5)
            );

            vec2 screenCoordRefr = vec2(
            0.5 * vVertexPosition2.x/vVertexPosition2.z + 0.5, //refr map is not
            0.5 * vVertexPosition2.y/vVertexPosition2.z + 0.5
            );

            vec4 reflColor = texture2D(u_diffuseTexture2, vTexcoord);
            vec4 refrColor = texture2D(u_diffuseTexture, screenCoordRefr+ripples/vVertexPosition2.z);
            reflColor = vec4(0.0, 0.0, 0.0, 1.0);
            refrColor = vec4(0.0, 0.0, 0.0, 1.0);

            // THREE defines up as y
            vec3 pos3d = vVertexPosition.xyz;
            gradient = vec3(gradient.x, -gradient.z, gradient.y);
            vec3 viewDir = normalize(-pos3d.xyz - uCameraPosition);

            float fresnelTerm = dot(gradient, viewDir);

            // vec4 fresneldColor = (1.0 - fresnelTerm) * reflColor + fresnelTerm * refrColor;
            vec4 fresneldColor = (1.0 - fresnelTerm) * reflColor ;
            vec4 waterColor = vec4(0.3, 0.3, 0.5, 1.0);


            vec2 ttt= screenCoordRefr+ripples/vVertexPosition2.z;
            N = normalize(vec3(ripples.x+0.5,noiseY,ripples.y) );
            vec4 texelColor = (0.1 * fresneldColor + 0.9 * waterColor)*vVertexPosition2.z;
            texelColor =normalize(texelColor);
            texelColor +=texelColor;
texelColor.a = 1.0;
            gl_FragColor = texelColor ;
            // gl_FragColor = finalColor;
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
		 demo : '../example/material/RedWaterFieldMaterial.html',
		 example: `
		 RedWaterFieldMaterial(RedGL Instance, hex, alpha)
		 `,
		 return : 'RedWaterFieldMaterial Instance'
	 }
     :DOC*/
    RedWaterFieldMaterial = function (redGL, diffuseTexture,diffuseTexture2) {
        if (!(this instanceof RedWaterFieldMaterial)) return new RedWaterFieldMaterial(redGL, diffuseTexture,diffuseTexture2);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedWaterFieldMaterial : RedGL Instance만 허용.', '입력값 : ' + redGL);
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['_color'] = new Float32Array(4);
        this['diffuseTexture'] = diffuseTexture;
        this['diffuseTexture2'] = diffuseTexture2;
        this['shininess'] = 16;
        this['specularPower'] = 0.5;
        this['alpha'] = 1;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['useFlatMode'] = false
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
		 title :`diffuseTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'diffuseTexture', 'sampler2D', {essential: true});
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'diffuseTexture2', 'sampler2D', {essential: true});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`color`,
		 description : `기본값 : #ff2211`,
		 return : 'hex'
	 }
     :DOC*/
    Object.defineProperty(RedWaterFieldMaterial.prototype, 'color', RedColorMaterial['DEFINE_OBJECT_COLOR']);
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'alpha', 'number', RedColorMaterial['DEFINE_OBJECT_ALPHA']);
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`shininess`,
		 description : `기본값 : 16`,
		 return : 'shininess'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'shininess', 'number', {'min': 0});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`specularPower`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedWaterFieldMaterial', 'specularPower', 'number', {'min': 0});
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