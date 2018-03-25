"use strict";
var RedBitmapTexture;
(function () {
    //TODO: 기본옵션 정의
    RedBitmapTexture = function (redGL, src, option) {
        var gl;
        var tTexture;
        if (!(this instanceof RedBitmapTexture)) return new RedBitmapTexture(redGL, src, option)
        if (!(redGL instanceof RedGL)) throw 'RedBitmapTexture : RedGL 인스턴스만 허용됩니다.'
        gl = redGL.gl;
        tTexture = gl.createTexture();
        this['webglTexture'] = tTexture;
        this['_UUID'] = RedGL['makeUUID']();
        this.setEmptyTexture(gl, tTexture)
        this.loadTexture(gl, tTexture, src)
        console.log(this)
    }
    RedBitmapTexture.prototype = {
        setEmptyTexture: function (gl, texture) {
            console.log('빈 텍스쳐를 설정')
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
        },
        loadTexture: (function () {
            return function (gl, texture, src) {
                var onError, onLoad;
                var clearEvents;
                clearEvents = function (img) {
                    img.removeEventListener('error', onError);
                    img.removeEventListener('load', onLoad);
                }
                onError = function () {
                    var msg = "couldn't load image: " + src;
                    RedGL.throwFunc(msg);
                    clearEvents(this);
                }
                onLoad = function () {
                    clearEvents(this)
                    gl.activeTexture(gl.TEXTURE0 + 0)
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    //level,internalFormat, format, type
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  gl.RGBA, gl.UNSIGNED_BYTE, this)
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.generateMipmap(gl.TEXTURE_2D)
                    gl.bindTexture(gl.TEXTURE_2D, null);
                }

                var img;
                img = new Image();
                img.crossOrigin = 'anonymous'
                img.src = src;
                img.addEventListener('error', onError);
                img.addEventListener('load', onLoad);
                return img;
            }
        })()
    }
    Object.freeze(RedBitmapTexture);
})();
