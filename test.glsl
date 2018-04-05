precision mediump float;

//attribute
const int DIRETIONAL_MAX = 5;

//const
uniform float uAmbientIntensity;
uniform float uDirectionalLightIntensity[5];
uniform float uShininess;
uniform int uDirectionalLightNum;
uniform sampler2D uDiffuseTexture;
uniform sampler2D uNormalTexture;
uniform sampler2D uSpecularTexture;
uniform vec3 uDirectionalLightPosition[5];
uniform vec4 uAmbientLightColor;
uniform vec4 uDirectionalLightColor[5];

//varying
varying float vTime;
varying vec2 vResolution;
varying vec2 vTexcoord;
varying vec3 vVertexNormal;
varying vec4 vVertexPositionEye4;

//var
vec4 texelColor;
void main(void) {
    texelColor = texture2D(uDiffuseTexture, vTexcoord);
    vec4 la = uAmbientLightColor * uAmbientLightColor.a;
    vec4 ld = vec4(0.0, 0.0, 0.0, 1.0);
    vec4 ls = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
    
    float specular;


    for(int i=0; i<DIRETIONAL_MAX; i++){
        if(i == uDirectionalLightNum) break;
        vec3 L = normalize(-uDirectionalLightPosition[i]);
        vec3 N = normalize(vVertexNormal);
        float lambertTerm =dot(N,-L);
        if(lambertTerm > 0.0){
            vec3 R;
            ld += uDirectionalLightColor[i] * texelColor * lambertTerm * uDirectionalLightIntensity[i];
            R = reflect(L, N);
            specular = pow( max(dot(R, -L), 0.0), uShininess);
            ls +=specularLightColor * specular * uDirectionalLightIntensity[i];
    }

    vec4 finalColor = la * uAmbientIntensity + ld + ls; 
    finalColor.a = texelColor.a;
    gl_FragColor = finalColor;
}