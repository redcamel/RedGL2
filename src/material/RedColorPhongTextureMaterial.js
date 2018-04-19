"use strict";
var RedColorPhongTextureMaterial;
(function () {
    var makeProgram;
    /**DOC:
        {
            constructorYn : true,
            title :`RedColorPhongTextureMaterial`,
            description : `
                RedColorPhongTextureMaterial Instance 생성
            `,
            params : {
                redGL : [
                    {type:'RedGL'}
                ],
                color : [
                    {type:'hex'}
                ],
                alpha : [
                    {type:'number'},
                    '알파값'
                ],
                normalTexture : [
                    {type: 'RedBitmapTexture'}
                ],
                specularTexture : [
                    {type: 'RedBitmapTexture'}
                ],
                specularTexture : [
                    {type: 'RedBitmapTexture'}
                ],
                displacementTexture : [
                    {type: 'RedBitmapTexture'}
                ]
            },
            example: `
            RedColorPhongTextureMaterial(RedGL Instance, hex, alpha, normalTexture, specularTexture)
            `,
            return : 'RedColorPhongTextureMaterial Instance'
        }
    :DOC*/
    RedColorPhongTextureMaterial = function (redGL, hex, alpha, normalTexture, specularTexture, displacementTexture) {
        if (!(this instanceof RedColorPhongTextureMaterial)) return new RedColorPhongTextureMaterial(redGL, hex, alpha, normalTexture, specularTexture, displacementTexture);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        /**DOC:
            {
                title :`color`,
                description : `
                    RedProgram Instance
                    직접설정하지 않도록 유의해야함!
                `,
                return : 'RedProgram Instance'
            }
        :DOC*/
        this['color'] = new Float32Array(4);
        /**DOC:
             {
                 title :`normalTexture`,
                 return : 'RedBitmapTexture'
             }
         :DOC*/
        this['normalTexture'] = normalTexture;
        /**DOC:
            {
                title :`specularTexture`,
                return : 'RedBitmapTexture'
            }
        :DOC*/
        this['specularTexture'] = specularTexture;
        /**DOC:
            {
                title :`displacementTexture`,
                return : 'RedBitmapTexture'
            }
        :DOC*/
        this['displacementTexture'] = displacementTexture;
        /**DOC:
            {
                title :`shininess`,
                description : `기본값 : 16`,
                return : 'uint'
            }
        :DOC*/
        this['shininess'] = 16
        /**DOC:
            {
                title :`specularPower`,
                description : `기본값 : 1`,
                return : 'uint'
            }
        :DOC*/
        this['specularPower'] = 1
        /**DOC:
           {
               title :`displacementPower`,
               description : `기본값 : 0`,                
               return : 'Number'
           }
       :DOC*/
        this['displacementPower'] = 0
        this.setColor(hex ? hex : '#ff0000', alpha == undefined ? 1 : alpha);
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(this, redGL);
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        // Object.seal(this);
        console.log(this);
    }
    makeProgram = (function () {
        var vSource, fSource;
        var PROGRAM_NAME;
        vSource = function () {
            /*
            
            uniform vec4 uColor;
            varying vec4 vColor;
            uniform sampler2D uDisplacementTexture;
            uniform float uDisplacementPower;

            varying vec4 vVertexPositionEye4;
            void main(void) {
                vColor = uColor; 
                vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
                vVertexNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0)); 
                vVertexPositionEye4 = uMVMatrix * vec4(aVertexPosition, 1.0);
                vVertexPositionEye4.xyz += normalize(vVertexNormal) * texture2D(uDisplacementTexture, vTexcoord).x * uDisplacementPower ;
                gl_PointSize = uPointSize;
                gl_Position = uPMatrix * uCameraMatrix* vVertexPositionEye4;
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform sampler2D uNormalTexture;
            uniform sampler2D uSpecularTexture;

            uniform float uShininess;
            uniform float uSpecularPower;
            
            varying vec4 vVertexPositionEye4;
            varying vec4 vColor;
            void main(void) {
                vec4 la = uAmbientLightColor * uAmbientLightColor.a;
                vec4 ld = vec4(0.0, 0.0, 0.0, 1.0);
                vec4 ls = vec4(0.0, 0.0, 0.0, 1.0);

                vec4 texelColor = vColor;
                // texelColor.rgb *= texelColor.a;

                vec3 N = normalize(vVertexNormal);
                N = normalize(2.0 * (N + texture2D(uNormalTexture, vTexcoord).rgb  - 0.5));

                vec4 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
                float specularTextureValue = 1.0;
                specularTextureValue = texture2D(uSpecularTexture, vTexcoord).r;
                float specular;             

                vec3 L;
                vec3 R;
                highp float lambertTerm;
                for(int i=0; i<DIRETIONAL_MAX; i++){
                    if(i == uDirectionalLightNum) break;
                    L = normalize(-uDirectionalLightPosition[i]);
                    lambertTerm = dot(N,-L);
                    if(lambertTerm > 0.0){
                        ld += (uDirectionalLightColor[i] * texelColor * lambertTerm * uDirectionalLightIntensity[i]) * uDirectionalLightColor[i].a;
                        R = reflect(L, N);
                        specular = pow( max(dot(R, -L), 0.0), uShininess);
                        ls +=  specularLightColor * specular * uSpecularPower * specularTextureValue * uDirectionalLightIntensity[i];
                    }
                }         
                vec3 pointDirection;  
                highp float distanceLength;
                highp float attenuation;
                for(int i=0;i<POINT_MAX;i++){
                    if(i== uPointLightNum) break;
                    pointDirection =  -uPointLightPosition[i] + vVertexPositionEye4.xyz;
                    distanceLength = length(pointDirection);
                    if(uPointLightRadius[i]> distanceLength){
                        attenuation = 1.0 / (0.01 + 0.02 * distanceLength + 0.03 * distanceLength * distanceLength); 
                        L = normalize(pointDirection);
                        lambertTerm = dot(N,-L);
                        if(lambertTerm > 0.0){
                            ld += (uPointLightColor[i] * texelColor * lambertTerm * attenuation * uPointLightIntensity[i]) * uPointLightColor[i].a;
                            R = reflect(L, N);
                            specular = pow( max(dot(R, -L), 0.0), uShininess);
                            ls +=  specularLightColor * specular * uSpecularPower * specularTextureValue * uPointLightIntensity[i] ;
                        }
                    }                          
                }            
                
                vec4 finalColor = la * uAmbientIntensity + ld + ls; 
                finalColor.rgb *= texelColor.a;
                finalColor.a = texelColor.a;
                gl_FragColor = finalColor;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        // console.log(vSource, fSource)
        PROGRAM_NAME = 'colorPhongTextureProgram';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })();
    RedColorPhongTextureMaterial.prototype = RedBaseMaterial.prototype
    /**DOC:
        {
            code : 'METHOD',
            title :`setColor`,
            description : `
                컬러설정
            `,
            params : {
                hex : [
                    {type: 'hex'},
                    'ex) #fff, #ffffff'
                ]
            },
            example : `// TODO:`,
            return : 'RedProgram Instance'
        }
    :DOC*/
    RedColorPhongTextureMaterial.prototype['setColor'] = RedColorMaterial.prototype['setColor'];
    Object.freeze(RedColorPhongTextureMaterial)
})();