"use strict";
var RedColorPhongMaterial;
(function () {
    var makeProgram;
    /**DOC:
        {
            constructorYn : true,
            title :`RedColorPhongMaterial`,
            description : `
                RedColorPhongMaterial Instance 생성
            `,
            params : {
                redGL : [
                    {type:'RedGL Instance'}
                ],
                color : [
                    {type:'hex'},
                    'hex'
                ],
                alpha : [
                    {type:'number'},
                    '알파값'
                ]
            },
            example: `
            RedColorPhongMaterial(RedGL Instance, hex, alpha, normalTexture, specularTexture)
            `,
            return : 'RedColorPhongMaterial Instance'
        }
    :DOC*/
    RedColorPhongMaterial = function (redGL, hex, alpha, normalTexture, specularTexture) {
        if (!(this instanceof RedColorPhongMaterial)) return new RedColorPhongMaterial(redGL, hex, alpha, normalTexture, specularTexture);
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
                 description : `normalTexture`,
                 return : 'RedBitmapTexture'
             }
         :DOC*/
        this['normalTexture'] = normalTexture;
        /**DOC:
            {
                title :`specularTexture`,
                description : `specularTexture`,
                return : 'RedBitmapTexture'
            }
        :DOC*/
        this['specularTexture'] = specularTexture;
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
        this.setColor(hex ? hex : '#ff0000', alpha == undefined ? 1 : alpha);
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(redGL);
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        // Object.seal(this);
        console.log(this);
    }
    makeProgram = function (redGL) {
        var vSource, fSource;
        vSource = function () {
            /*
            
            uniform vec4 uColor;
            varying vec4 vColor;
            varying vec4 vVertexPositionEye4;
            void main(void) {
                vColor = uColor; 
                vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
                vVertexNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0)); 
                vVertexPositionEye4 = uMVMatrix * vec4(aVertexPosition, 1.0);      
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
            'colorPhongProgram',
            RedShader(redGL, 'colorPhongVs', RedShader.VERTEX, vSource),
            RedShader(redGL, 'colorPhongFS', RedShader.FRAGMENT, fSource)
        )
    }
    RedColorPhongMaterial.prototype = RedBaseMaterial.prototype
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
    RedColorPhongMaterial.prototype['setColor'] = (function () {
        var t0;
        return function (hex, alpha) {
            hex = hex ? hex : '#ff2211';
            if (alpha == undefined) alpha = 1;
            if (alpha > 1) alpha = 1
            t0 = RedGLUtil.hexToRGB.call(this, hex);
            this['color'][0] = t0[0];
            this['color'][1] = t0[1];
            this['color'][2] = t0[2];
            this['color'][3] = alpha;
        }
    })();
    Object.freeze(RedColorPhongMaterial)
})();