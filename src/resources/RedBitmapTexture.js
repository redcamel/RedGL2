"use strict";
var RedBitmapTexture;
(function () {
    var setEmptyTexture;
    var loadTexture;
    var makeTexture
    setEmptyTexture = function (gl, texture) {
        gl.activeTexture(gl.TEXTURE0 + 0)
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)
        gl.texImage2D(
            gl.TEXTURE_2D,
            0, //level
            gl.LUMINANCE, //internalFormat
            2, //width
            2, //height
            0, //border
            gl.LUMINANCE, //format
            gl.UNSIGNED_BYTE, //type
            new Uint8Array(
                [
                    128, 64,
                    0, 192
                ]
            )
        )
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        // gl.bindTexture(gl.TEXTURE_2D, null);
    }
    makeTexture = function (gl, texture, source, option) {
        gl.activeTexture(gl.TEXTURE0 + 0)
        gl.bindTexture(gl.TEXTURE_2D, texture);
        //level,internalFormat, format, type
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, option['min'] ? option['min'] : gl.LINEAR_MIPMAP_NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, option['max'] ? option['max'] : gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, option['wrap_s'] ? option['wrap_s'] : gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, option['wrap_t'] ? option['wrap_t'] : gl.REPEAT);
        if (gl['EXT_texture_filter_anisotropic'] && option['anisotropic']) {
            gl.texParameterf(gl.TEXTURE_2D, gl['EXT_texture_filter_anisotropic'].TEXTURE_MAX_ANISOTROPY_EXT, option['anisotropic']);
        }
        try {
            gl.generateMipmap(gl.TEXTURE_2D)
        } catch (error) {
            console.log('밉맵을 생성할수 없음', source)
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    loadTexture = (function () {
        return function (gl, texture, src, option) {
            var onError, onLoad;
            var clearEvents;
            if (!option) option = {}
            clearEvents = function (img) {
                img.removeEventListener('error', onError);
                img.removeEventListener('load', onLoad);
            }
            onError = function () {
                var msg = "couldn't load image: " + src;
                RedGLUtil.throwFunc(msg);
                clearEvents(this);
            }
            onLoad = function () {
                clearEvents(this)
                makeTexture(gl, texture, this, option)
            }


            setEmptyTexture(gl, texture)
            if (src instanceof HTMLCanvasElement) {
                makeTexture(gl, texture, src, option)
            } else {
                var img;
                img = new Image();
                img.crossOrigin = 'anonymous'
                img.src = src;
                img.addEventListener('error', onError);
                img.addEventListener('load', onLoad);

            }


        }
    })()
    /**DOC:
        {
            constructorYn : true,
            title :`RedBitmapTexture`,
            description : `
                RedBitmapTexture Instance 생성
            `,
            params : {
                redGL : [
                    {type:'RedGL'}
                ],
                src : [
                    {type:'string'},
                    '경로'
                ],
                option : [
                    {type:'Object'},
                    '텍스쳐 정의옵션'
                ]
            },
            return : 'RedBitmapTexture Instance'
        }
    :DOC*/
    RedBitmapTexture = function (redGL, src, option) {
        var gl;
        if (!(this instanceof RedBitmapTexture)) return new RedBitmapTexture(redGL, src, option);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedBitmapTexture : RedGL Instance만 허용됩니다.');
        gl = redGL.gl;
        this['webglTexture'] = gl.createTexture();
        this['atlascoord'] = RedAtlasUV(redGL)
        this['_UUID'] = RedGL['makeUUID']();

        if (redGL['_datas']['emptyTexture']) {
            //TODO: 이거 렌더러쪽으로 옮겨야함
            gl.activeTexture(gl.TEXTURE0)
            gl.bindTexture(gl.TEXTURE_2D, redGL['_datas']['emptyTexture']['2d']['webglTexture'])
        }

        if (src) loadTexture(gl, this['webglTexture'], src, option);
        Object.seal(this);
        console.log(this)
    }
    RedBitmapTexture.prototype = {};
    Object.freeze(RedBitmapTexture);
})();
