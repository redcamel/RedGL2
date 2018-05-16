"use strict";
var RedPostEffect_SSAO_DepthMaterial;
(function () {
    var makeProgram;
    /**DOC:
        {
            constructorYn : true,
            title :`RedPostEffect_SSAO_DepthMaterial`,
            description : `
                RedPostEffect_SSAO_DepthMaterial Instance 생성
            `,
            params : {
                redGL : [
                    {type:'RedGL'}
                ]
            },
            example : `
                RedPostEffect_SSAO_DepthMaterial(RedGL Instance)
            `,
            return : 'RedPostEffect_SSAO_DepthMaterial Instance'
        }
    :DOC*/
    RedPostEffect_SSAO_DepthMaterial = function (redGL) {
        if (!(this instanceof RedPostEffect_SSAO_DepthMaterial)) return new RedPostEffect_SSAO_DepthMaterial(redGL);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['focusLength'] = 300
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
            varying vec3 vCameraPosition;
            varying vec3 vPosition;
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
          
                gl_PointSize = uPointSize;
                if(uSprite3DYn) {
                    gl_Position = uPMatrix * calSprite3D(uCameraMatrix , uMMatrix) *  vec4(aVertexPosition, 1.0);
                    if(!uPerspectiveScale){
                        gl_Position /= gl_Position.w;
                        gl_Position.xy += aVertexPosition.xy * vec2(uMMatrix[0][0],uMMatrix[1][1]);
                    }
                }
                else gl_Position = uPMatrix * uCameraMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
                mat4 test = uPMatrix * uCameraMatrix;
                vCameraPosition = vec3(test[3][0], test[3][1], test[3][2]);
                vPosition = gl_Position.xyz;
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            varying vec3 vCameraPosition;
            uniform float uFocusLength;
             varying vec3 vPosition;
            float fogFactor(float focusLength, float density){
                float flog_cord = gl_FragCoord.z / gl_FragCoord.w / focusLength;
                float fog = flog_cord * density;
                if(1.0 - fog < 0.0) discard;
                return clamp(1.0 - fog, 0.0,  1.0);
            }
            vec4 fog(float fogFactor, vec4 fogColor, vec4 currentColor) {
                return mix(fogColor, currentColor, fogFactor);
            }
            void main(void) {
                float depth =  gl_FragCoord.w / gl_FragCoord.z * vCameraPosition.z - 1.0;
                vec4 depthColor = vec4(depth,depth,depth,1.0);

                vec4 finalColor = depthColor;
                vec4 fogColor = vec4(1.0);
                gl_FragColor = fog( fogFactor(uFocusLength, 1.0), fogColor, finalColor);
                
     
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'RedPostEffect_SSAO_depthProgram';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })()
    RedPostEffect_SSAO_DepthMaterial.prototype = RedBaseMaterial.prototype

    Object.freeze(RedPostEffect_SSAO_DepthMaterial)
})();