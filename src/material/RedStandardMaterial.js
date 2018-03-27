"use strict";
var RedStandardMaterial;
(function () {
    var makeProgram;

    RedStandardMaterial = function (redGL, diffuseTexture, normalTexture, specularTexture) {
        if (!(this instanceof RedStandardMaterial)) return new RedStandardMaterial(redGL, diffuseTexture, normalTexture, specularTexture);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedStandardMaterial : RedGL Instance만 허용됩니다.')
        if (!(diffuseTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedStandardMaterial : diffuseTexture - RedBitmapTexture Instance만 허용됩니다.')
        if (normalTexture && !(normalTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedStandardMaterial : normalTexture - RedBitmapTexture Instance만 허용됩니다.')
        if (specularTexture && !(specularTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedStandardMaterial : specularTexture - RedBitmapTexture Instance만 허용됩니다.')
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
        this['normalTexture'] = normalTexture;
        this['specularTexture'] = specularTexture;
        this['shininess'] = 10
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
        // Object.seal(this)
        console.log(this)
    }
    makeProgram = function (redGL) {
        var vSource, fSource;
        vSource = function () {
            /*
            varying vec4 vVertexPositionEye4;
            void main(void) {
                vTexcoord = aTexcoord;
                vNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0)); 
                vVertexPositionEye4 = uMVMatrix * vec4(aVertexPosition, 1.0);
                gl_Position = uPMatrix * uCameraMatrix* vVertexPositionEye4;
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
            varying vec4 vVertexPositionEye4;
            vec4 texelColor;
            void main(void) {
                texelColor = texture2D(uDiffuseTexture, vTexcoord);

                vec4 la = vec4(0.05, 0.05, 0.05, 1.0);
                vec4 ld = vec4(0.0, 0.0, 0.0, 1.0);
                vec4 ls = vec4(0.0, 0.0, 0.0, 1.0);

                vec3 lightDirection = vec3(0.0, 0.1,0.1);
                vec4 lightColor = vec4(1.0, 0.0, 1.0, 1.0);

                vec4 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
                vec3 N = normalize(vNormal);
                vec3 L = normalize(lightDirection);
                vec3 R;

                float specular;
                float lambertTerm =dot(N,-L);
                if(lambertTerm > 0.0){
                    ld += lightColor * texelColor * lambertTerm;
                    R = reflect(L, N);
                    specular = pow( max(dot(R, -L), 0.0), uShininess);
                    ls +=  specularLightColor * specular;
                }
                vec4 finalColor = la + ld + ls; 
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
            'standardProgram',
            RedShader(redGL, 'standardProgramVs', RedShader.VERTEX, vSource),
            RedShader(redGL, 'standardProgramFS', RedShader.FRAGMENT, fSource)
        )
    }
    RedStandardMaterial.prototype = RedBaseMaterial.prototype
    Object.freeze(RedStandardMaterial)
})();