"use strict";
var RedBitmapMaterial;
(function () {
    var makeProgram;
    /**DOC:
        {
            constructorYn : true,
            title :`RedBitmapMaterial`,
            description : `
                RedBitmapMaterial Instance 생성
            `,
            params : {
                redGL : [
                    {type:'RedGL'}
                ],
                diffuseTexture : [
                    {type:'RedBitmapTexture'},
                    'RedBitmapTexture Instance'
                ]
            },
            example : `
                RedBitmapMaterial(RedGL Instance, RedBitmapTexture(RedGL Instance, src))
            `,
            return : 'RedBitmapMaterial Instance'
        }
    :DOC*/
    RedBitmapMaterial = function (redGL, diffuseTexture) {
        if (!(this instanceof RedBitmapMaterial)) return new RedBitmapMaterial(redGL, diffuseTexture);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedBitmapMaterial : RedGL Instance만 허용됩니다.', redGL)
        if (!(diffuseTexture instanceof RedBitmapTexture)) RedGLUtil.throwFunc('RedBitmapMaterial : RedBitmapTexture Instance만 허용됩니다.')
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        /**DOC:
            {
                title :`diffuseTexture`,
                return : 'RedBitmapMaterial'
            }
        :DOC*/
        this['diffuseTexture'] = diffuseTexture;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(this, redGL);
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        // Object.seal(this)
        console.log(this)
    }
    makeProgram = (function () {
        var vSource, fSource;
        var PROGRAM_NAME;
        vSource = function () {
            /* @preserve
            mat4 calSprite3D(mat4 cameraMTX, mat4 mvMatrix){
                mat4 cacheScale = mat4(
                    mvMatrix[0][0], 0.0, 0.0, 0.0, 
                    0.0, mvMatrix[1][1], 0.0, 0.0, 
                    0.0, 0.0, 1.0, mvMatrix[2][2], 
                    0.0, 0.0, 0.0, 1.0 
                );
                mat4 tMTX = cameraMTX * mvMatrix;
                tMTX[0][0] = 1.0, tMTX[0][1] = 0.0, tMTX[0][2] = 0.0,
                tMTX[1][0] = 0.0, tMTX[1][1] = 1.0, tMTX[1][2] = 0.0,
                tMTX[2][0] = 0.0, tMTX[2][1] = 0.0, tMTX[2][2] = 1.0;
                return tMTX * cacheScale;
            }
            void main(void) {
                vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
                gl_PointSize = uPointSize;
                if(uSprite3DYn) {
                    gl_Position = uPMatrix * calSprite3D(uCameraMatrix , uMMatrix) *  vec4(aVertexPosition, 1.0);
                    if(!uPerspectiveScale){
                        gl_Position /= gl_Position.w;
                        gl_Position.xy += aVertexPosition.xy * vec2(uMMatrix[0][0],uMMatrix[1][1]);
                    }
                }
                else gl_Position = uPMatrix * uCameraMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /* @preserve
            precision mediump float;
            uniform sampler2D uDiffuseTexture;
            float fogFactor(float perspectiveFar, float density){
                float flog_cord = gl_FragCoord.z / gl_FragCoord.w / perspectiveFar;
                float fog = flog_cord * density;
                if(1.0 - fog < 0.0) discard;
                return clamp(1.0 - fog, 0.0,  1.0);
            }
            vec4 fog(float fogFactor, vec4 fogColor, vec4 currentColor) {
                return mix(fogColor, currentColor, fogFactor);
            }
            void main(void) {
                vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord);
                finalColor.rgb *= finalColor.a;
                if(finalColor.a ==0.0) discard;
                if(uUseFog == 1.0) gl_FragColor = fog( fogFactor(uFogDistance, uFogDensity), uFogColor, finalColor);
                else gl_FragColor = finalColor;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'bitmapProgram';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })();
    RedBitmapMaterial.prototype = RedBaseMaterial.prototype
    Object.freeze(RedBitmapMaterial)
})();