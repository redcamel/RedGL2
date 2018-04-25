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
                hex : [
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
    RedColorMaterial = function (redGL, hex, alpha) {
        if (!(this instanceof RedColorMaterial)) return new RedColorMaterial(redGL, hex, alpha);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        /**DOC:
            {
                title :`color`,
                description : `
                    RedProgram Instance
                    직접설정하지 않도록 유의해야함!
                `,
                return : 'Float32Array'
            }
        :DOC*/
        this['color'] = new Float32Array(4);
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
            uniform vec4 uColor;
            varying vec4 vColor;
            void main(void) {
                vColor = uColor; 
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
            /*
            precision mediump float;
            varying vec4 vColor;
            vec4 fog(float perspectiveFar, float density, vec4 fogColor, vec4 currentColor) {
              float flog_cord = gl_FragCoord.z / gl_FragCoord.w / perspectiveFar;
              float fog = flog_cord * density;
              float fogFactor = clamp(1.0 - fog, 0.0,  1.0);
              return mix(fogColor, currentColor, fogFactor);
            }
            void main(void) {
                vec4 finalColor = vColor * vColor.a;
                if(uUseFog == 1.0) gl_FragColor = fog(uFogDistance, uFogDensity, uFogColor, finalColor);
                else gl_FragColor = finalColor;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'colorProgram';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })()
    RedColorMaterial.prototype = RedBaseMaterial.prototype
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
    RedColorMaterial.prototype['setColor'] = (function () {
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
    Object.freeze(RedColorMaterial)
})();