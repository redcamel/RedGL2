"use strict";
var RedColorMaterial;
(function () {
    var makeProgram;
    /**DOC:
     {
         constructorYn : true,
         title :`RedColorMaterial`,
         description : `
             RedColorMaterial Instance 생성
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
         example : `
             RedColorMaterial(RedGL Instance, hex)
         `,
         return : 'RedColorMaterial Instance'
     }
     :DOC*/
    RedColorMaterial = function (redGL, hexColor, alpha) {
        if (!(this instanceof RedColorMaterial)) return new RedColorMaterial(redGL, hexColor, alpha);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['_color'] = new Float32Array(4);
        /////////////////////////////////////////
        // 일반 프로퍼티
        Object.defineProperty(this, 'color', RedDefinePropertyInfo['color']);
        Object.defineProperty(this, 'alpha', RedDefinePropertyInfo['alpha']);
        this['alpha'] = alpha == undefined ? 1 : alpha;
        this['color'] = hexColor ? hexColor : '#ff0000'
        this['program'] = makeProgram(redGL);
        this['_UUID'] = RedGL['makeUUID']();
        this.checkUniformAndProperty();
        // Object.seal(this);
        console.log(this);
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
            uniform vec4 u_color;
            varying vec4 vColor;
            void main(void) {
                vColor = u_color;
                gl_PointSize = uPointSize;
                if(uSprite3DYn) {
                    gl_Position = uPMatrix * calSprite3D(uCameraMatrix , uMMatrix) *  vec4(aVertexPosition, 1.0);
                    if(!uPerspectiveScale){
                        gl_Position /= gl_Position.w;
                        gl_Position.xy += aVertexPosition.xy * vec2(uMMatrix[0][0],uMMatrix[1][1]);
                    }
                } else gl_Position = uPMatrix * uCameraMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
            }
             */
        }
        fSource = function () {
            /* @preserve
             precision mediump float;
             varying vec4 vColor;
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
                 vec4 finalColor = vColor * vColor.a;
                 if(uUseFog) gl_FragColor = fog( fogFactor(uFogDistance, uFogDensity), uFogColor, finalColor);
                 else gl_FragColor = finalColor;
             }
             */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'colorProgram';
        return function (redGL) {
            return RedProgram(redGL, PROGRAM_NAME, vSource, fSource)
        }
    })()
    RedColorMaterial.prototype = RedBaseMaterial.prototype
    Object.freeze(RedColorMaterial)
})();