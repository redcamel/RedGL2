"use strict";
var RedFrameBuffer;
(function () {
    RedFrameBuffer = function (redGL, width, height) {
        if (!(this instanceof RedFrameBuffer)) return new RedFrameBuffer(redGL, width, height)
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedFrameBuffer : RedGL Instance만 허용됩니다.', redGL)
        var gl;
        gl = redGL['gl'];
        width  = width  || gl.drawingBufferWidth;
    height = height || gl.drawingBufferHeight;

        this['width'] = width;
        this['height'] = height;
        this['webglFrameBuffer'] = gl.createFramebuffer();
        this['webglRenderBuffer'] = gl.createRenderbuffer();
        this['texture'] = RedBitmapTexture(redGL)
        this['_UUID'] = RedGL['makeUUID']();
        
        gl.bindFramebuffer(gl.FRAMEBUFFER, this['webglFrameBuffer'] );
        // 텍스쳐 세팅
        gl.bindTexture(gl.TEXTURE_2D, this['texture']['webglTexture']);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this['width'], this['height'], 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        
        // gl.generateMipmap(gl.TEXTURE_2D);
        // 렌더버퍼 세팅
        gl.bindRenderbuffer(gl.RENDERBUFFER, this['webglRenderBuffer']);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this['width'], this['height']);
        // 프레임버퍼 세팅
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this['texture']['webglTexture'], 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this['webglRenderBuffer']);
        //
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        // console.log(this)
    }
    Object.freeze(RedFrameBuffer);
})();