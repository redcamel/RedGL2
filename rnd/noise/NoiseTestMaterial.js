"use strict";
var NoiseTestMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'NoiseTestMaterialProgram';
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
            //#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix * getSkinMatrix() ;
            //#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;

            //#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) * vec4(aVertexPosition, 1.0);
            //#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
            //#REDGL_DEFINE#sprite3D#true#  gl_Position /= gl_Position.w;
            //#REDGL_DEFINE#sprite3D#true#  gl_Position.xy += aVertexPosition.xy * vec2(targetMatrix[0][0],targetMatrix[1][1] * uResolution.x/uResolution.y);
            //#REDGL_DEFINE#sprite3D#true# }
            //#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix * vec4(aVertexPosition, 1.0);

            vVertexPosition = vec4(aVertexPosition, 1.0);

            //#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
            //#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter * uDirectionalShadowLightMatrix * targetMatrix * vec4(aVertexPosition, 1.0);
          }
         */
    };
    fSource = function () {
        /* @preserve
         precision mediump float;

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
     const vec2 cC = vec2(1.0/6.0, 1.0/3.0) ;
     const vec4 cD = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
     vec3 i = floor(v + dot(v, cC.yyy) );
     vec3 x0 =  v - i + dot(i, cC.xxx) ;

    // Other corners
     vec3 g = step(x0.yzx, x0.xyz);
     vec3 l = 1.0 - g;
     vec3 i1 = min( g.xyz, l.zxy );
     vec3 i2 = max( g.xyz, l.zxy );

     //  x0 = x0 - 0.0 + 0.0 * cC.xxx;
     //  x1 = x0 - i1 + 1.0 * cC.xxx;
     //  x2 = x0 - i2 + 2.0 * cC.xxx;
     //  x3 = x0 - 1.0 + 3.0 * cC.xxx;
     vec3 x1 = x0 - i1 + cC.xxx;
     vec3 x2 = x0 - i2 + cC.yyy; // 2.0*cC.x = 1/3 = cC.y
     vec3 x3 = x0 - cD.yyy;   // -1.0+3.0*cC.x = -0.5 = -cD.y

    // Permutations
     i = mod289(i);
     vec4 p = permute( permute( permute(
           i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
     float n_ = 0.142857142857; // 1.0/7.0
     vec3 ns = n_ * cD.wyz - cD.xzx;

     vec4 j = p - 49.0 * floor(p * ns.z * ns.z); // mod(p,7*7)

     vec4 x_ = floor(j * ns.z);
     vec4 y_ = floor(j - 7.0 * x_ );  // mod(j,N)

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

         uniform float u_alpha;
         void main(void) {
          vec3 red = vec3( vTime/1000.0 + gl_FragCoord.x  );
          vec3 green = vec3( vTexcoord, 0.0 );
          vec3 blue = vec3( vTexcoord, 0.0 );
          float r = snoise( vec3( sin(vTexcoord.x)*0.5 + 0.5, sin(vTexcoord.y+vTime/1000.0)*0.5 + 0.5, 0.0 ));
          float g = snoise( green );
          float b = snoise( blue );
          vec4 finalColor = vec4( r,g,b, 1.0);

          gl_FragColor = finalColor;
         }
         */
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`NoiseTestMaterial`,
		 description : `
			 NoiseTestMaterial Instance 생성자.
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
		 demo : '../example/material/NoiseTestMaterial.html',
		 example : `
			 NoiseTestMaterial( RedGL Instance, RedBitmapTexture(RedGL Instance, src) )
		 `,
		 return : 'NoiseTestMaterial Instance'
	 }
     :DOC*/
    NoiseTestMaterial = function (redGL) {
        if (!(this instanceof NoiseTestMaterial)) return new NoiseTestMaterial(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('NoiseTestMaterial : RedGL Instance만 허용.', redGL);
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
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
    NoiseTestMaterial.prototype = new RedBaseMaterial();
    /**DOC:
     {
	   code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('NoiseTestMaterial', 'alpha', 'number', {min: 0, max: 1});
    Object.freeze(NoiseTestMaterial);
})();