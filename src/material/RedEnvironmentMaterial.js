"use strict";
var RedEnvironmentMaterial;
(function () {
    var makeProgram;

    RedEnvironmentMaterial = function (
        redGL,
        diffuseTexture,
        environmentTexture,
        normalTexture,
        specularTexture,
        displacementTexture
    ) {
        if (!(this instanceof RedEnvironmentMaterial)) return new RedEnvironmentMaterial(redGL, diffuseTexture, environmentTexture, normalTexture, specularTexture, displacementTexture);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedEnvironmentMaterial : RedGL Instance만 허용됩니다.')
        if (!(diffuseTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedEnvironmentMaterial : diffuseTexture - RedBitmapTexture Instance만 허용됩니다.')
        if (environmentTexture && !(environmentTexture instanceof RedBitmapCubeTexture)) RedGLUtil.throwFunc('RedEnvironmentMaterial : environmentTexture - RedBitmapCubeTexture Instance만 허용됩니다.')
        if (normalTexture && !(normalTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedEnvironmentMaterial : normalTexture - RedBitmapTexture Instance만 허용됩니다.')
        if (specularTexture && !(specularTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedEnvironmentMaterial : specularTexture - RedBitmapTexture Instance만 허용됩니다.')
        if (displacementTexture && !(displacementTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedEnvironmentMaterial : displacementTexture - RedBitmapTexture Instance만 허용됩니다.')
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        /**DOC:
            {
                title :`diffuseTexture`,
                description : `diffuseTexture`,
                example : `// TODO:`,
                return : 'RedBitmapTexture'
            }
        :DOC*/
        this['diffuseTexture'] = diffuseTexture;
        /**DOC:
            {
                title :`environmentTexture`,
                description : `environmentTexture`,
                example : `// TODO:`,
                return : 'RedBitmapCubeTexture'
            }
        :DOC*/
        this['environmentTexture'] = environmentTexture;
        /**DOC:
            {
                title :`normalTexture`,
                description : `normalTexture`,
                example : `// TODO:`,
                return : 'RedBitmapTexture'
            }
        :DOC*/
        this['normalTexture'] = normalTexture;

        /**DOC:
            {
                title :`specularTexture`,
                description : `specularTexture`,
                example : `// TODO:`,
                return : 'RedBitmapTexture'
            }
        :DOC*/
        this['specularTexture'] = specularTexture;
        /**DOC:
            {
                title :`shininess`,
                description : `shininess`,
                example : `// TODO:`,
                return : 'RedBitmapTexture'
            }
        :DOC*/
        this['displacementTexture'] = displacementTexture;
        this['shininess'] = 16
        /**DOC:
            {
                title :`specularPower`,
                description : `specularPower`,
                example : `// TODO:`,
                return : 'RedBitmapTexture'
            }
        :DOC*/
        this['specularPower'] = 1
        this['reflectionPower'] = 1
        this['displacementPower'] = 0
        /////////////////////////////////////////
        // 일반 프로퍼티
        /**DOC:
            {
                title :`program`,
                description : `RedProgram Instance`,
                example : `// TODO:`,
                return : 'RedProgram Instance'
            }
        :DOC*/
        this['program'] = makeProgram(redGL);
   
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        console.log(this)
        // Object.seal(this)
    }
    makeProgram = function (redGL) {
        var vSource, fSource;
        vSource = function () {
            /*
            varying vec4 vVertexPositionEye4;
            varying vec3 vReflectionCubeCoord;
            uniform sampler2D uDisplacementTexture;
            uniform float uDisplacementPower;

            void main(void) {
                vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
                vVertexNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0)); 
                vVertexPositionEye4 = vec4(aVertexPosition, 1.0);
                vReflectionCubeCoord = -(uMVMatrix *vec4(aVertexPosition, 0.0)).xyz;
                vVertexPositionEye4.xyz += normalize(vVertexNormal) * texture2D(uDisplacementTexture, vTexcoord).x * uDisplacementPower ;
                
                gl_PointSize = uPointSize;
                gl_Position = uPMatrix * uCameraMatrix * uMVMatrix * vVertexPositionEye4;                
                vVertexPositionEye4 = uMVMatrix * vVertexPositionEye4;
                
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform sampler2D uDiffuseTexture;
            uniform sampler2D uNormalTexture;
            uniform sampler2D uSpecularTexture;
            uniform samplerCube uEnvironmentTexture;
            
            uniform float uShininess;
            uniform float uSpecularPower;
            uniform float uReflectionPower;            
            
            varying vec4 vVertexPositionEye4;
            varying vec3 vReflectionCubeCoord;

            void main(void) {
                
                vec4 la = uAmbientLightColor * uAmbientLightColor.a;
                vec4 ld = vec4(0.0, 0.0, 0.0, 1.0);
                vec4 ls = vec4(0.0, 0.0, 0.0, 1.0);

                vec4 texelColor = texture2D(uDiffuseTexture, vTexcoord);
                texelColor.rgb *= texelColor.a;

                vec3 N = normalize(vVertexNormal);
                vec4 normalColor = texture2D(uNormalTexture, vTexcoord);
                N = normalize(2.0 * (N + normalColor.rgb - 0.5));

                vec4 reflectionColor = textureCube(uEnvironmentTexture, 2.0 * dot(vReflectionCubeCoord,vVertexNormal) * vVertexNormal - vReflectionCubeCoord);
                texelColor = texelColor * (1.0 - uReflectionPower) + reflectionColor * uReflectionPower;

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
                        ld += uDirectionalLightColor[i] * texelColor * lambertTerm * uDirectionalLightIntensity[i];
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
                            ld += uPointLightColor[i] * texelColor * lambertTerm * attenuation * uPointLightIntensity[i];
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
        return RedProgram(
            redGL,
            'environmentProgram',
            RedShader(redGL, 'environmentProgramVs', RedShader.VERTEX, vSource),
            RedShader(redGL, 'environmentProgramFS', RedShader.FRAGMENT, fSource)
        )
    }
    RedEnvironmentMaterial.prototype = RedBaseMaterial.prototype
    Object.freeze(RedEnvironmentMaterial)
})();