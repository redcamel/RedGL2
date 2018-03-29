"use strict";
var RedBitmapTexture;
(function () {
    var setEmptyTexture;
    var loadTexture;
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
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    loadTexture = (function () {
        return function (gl, texture, src) {
            var onError, onLoad;
            var clearEvents;
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
                gl.activeTexture(gl.TEXTURE0 + 0)
                gl.bindTexture(gl.TEXTURE_2D, texture);
                //level,internalFormat, format, type
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this)
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
                gl.generateMipmap(gl.TEXTURE_2D)
                gl.bindTexture(gl.TEXTURE_2D, null);
            }

            var img;
            setEmptyTexture(gl, texture)
            img = new Image();
            img.crossOrigin = 'anonymous'
            img.src = src;
            img.addEventListener('error', onError);
            img.addEventListener('load', onLoad);
            return img;
        }
    })()
    //TODO: 기본옵션 정의
    /**DOC:
        {
            constructorYn : true,
            title :`RedBitmapTexture`,
            description : `
                RedBitmapTexture Instance 생성
            `,
            params : {
                redGL : [
                    {type:'RedGL Instance'}
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
        this['_UUID'] = RedGL['makeUUID']();
        loadTexture(gl, this['webglTexture'], src);
        Object.seal(this);
        console.log(this)
    }
    RedBitmapTexture.prototype = {};
    Object.freeze(RedBitmapTexture);
})();
