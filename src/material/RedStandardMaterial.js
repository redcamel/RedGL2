"use strict";
var RedStandardMaterial;
(function () {
    var makeProgram;
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
                ]
            },
            example : `
                RedStandardMaterial(
                    RedGL Instance, 
                    RedBitmapTexture(RedGL Instance, src), // diffuseTexture
                    RedBitmapTexture(RedGL Instance, src), // normalTexture
                    RedBitmapTexture(RedGL Instance, src), // specularTexture
                    RedBitmapTexture(RedGL Instance, src)  // displacementTexture
                )
            `,
            return : 'RedStandardMaterial Instance'
        }
    :DOC*/
    RedStandardMaterial = function (redGL, diffuseTexture, normalTexture, specularTexture, displacementTexture) {
        if (!(this instanceof RedStandardMaterial)) return new RedStandardMaterial(redGL, diffuseTexture, normalTexture, specularTexture, displacementTexture);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedStandardMaterial : RedGL Instance만 허용됩니다.', redGL)
        if (!(diffuseTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedStandardMaterial : diffuseTexture - RedBitmapTexture Instance만 허용됩니다.')
        if (normalTexture && !(normalTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedStandardMaterial : normalTexture - RedBitmapTexture Instance만 허용됩니다.')
        if (specularTexture && !(specularTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedStandardMaterial : specularTexture - RedBitmapTexture Instance만 허용됩니다.')
        if (displacementTexture && !(displacementTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedStandardMaterial : displacementTexture - RedBitmapTexture Instance만 허용됩니다.')

        /////////////////////////////////////////
        // 유니폼 프로퍼티
        /**DOC:
            {
                title :`diffuseTexture`,
                return : 'RedBitmapTexture'
            }
        :DOC*/
        this['diffuseTexture'] = diffuseTexture;
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
                title :`shininess`,
                return : 'RedBitmapTexture'
            }
        :DOC*/
        this['displacementTexture'] = displacementTexture;
        /**DOC:
            {
                title :`shininess`,
                description : `기본값 : 16`,
                return : 'number'
            }
        :DOC*/
        this['shininess'] = 16
        /**DOC:
            {
                title :`specularPower`,
                description : `기본값 : 1`,                
                return : 'number'
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
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(this, redGL);
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        console.log(this)
        // Object.seal(this)
    }
    makeProgram = (function () {
        var vSource, fSource;
        var PROGRAM_NAME;
        vSource = function () {
            /*
            uniform sampler2D uDisplacementTexture;
            uniform float uDisplacementPower;
            
            varying vec4 vVertexPositionEye4;
            void main(void) {
                vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
                vVertexNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0)); 
                vVertexPositionEye4 = uMVMatrix * vec4(aVertexPosition, 1.0);         
                vVertexPositionEye4.xyz += normalize(vVertexNormal) * texture2D(uDisplacementTexture, vTexcoord).x * uDisplacementPower ;
 
                gl_PointSize = uPointSize;
                gl_Position = uPMatrix * uCameraMatrix * vVertexPositionEye4;
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform sampler2D uDiffuseTexture;
            uniform sampler2D uNormalTexture;
            uniform sampler2D uSpecularTexture;
 
            uniform float uShininess;
            uniform float uSpecularPower;
            
            varying vec4 vVertexPositionEye4;
       
            void main(void) {
                vec4 la = uAmbientLightColor * uAmbientLightColor.a;
                vec4 ld = vec4(0.0, 0.0, 0.0, 1.0);
                vec4 ls = vec4(0.0, 0.0, 0.0, 1.0);
 
                vec4 texelColor = texture2D(uDiffuseTexture, vTexcoord);
                texelColor.rgb *= texelColor.a;
                if(texelColor.a ==0.0) discard;
 
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
        PROGRAM_NAME = 'standardProgram';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })();
    RedStandardMaterial.prototype = RedBaseMaterial.prototype
    Object.freeze(RedStandardMaterial)
})();