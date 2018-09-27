"use strict";
var RedFrameBuffer;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedFrameBuffer`,
		 description : `
			 RedFrameBuffer Instance 생성자
		 `,
		 params : {
	         redGL : [
				 {type:'RedGL Instance'},
				 'test'
			 ],
			 width : [
				 {type:'Number'}
			 ],
			 height : [
				 {type:'Number'}
			 ]
		 },
		 example : `
			 RedFrameBuffer( RedGL Instance );
		 `,
		 return : 'RedGeometry Instance'
	 }
     :DOC*/
    RedFrameBuffer = function (redGL, width, height) {
        if (!(this instanceof RedFrameBuffer)) return new RedFrameBuffer(redGL, width, height);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedFrameBuffer : RedGL Instance만 허용.', redGL);
        if (width) typeof width == 'number' || RedGLUtil.throwFunc('RedFrameBuffer : width - 숫자만 허용', '입력값 : ', width);
        if (height) typeof height == 'number' || RedGLUtil.throwFunc('RedFrameBuffer : height - 숫자만 허용', '입력값 : ', height);
        var gl;
        gl = redGL['gl'];
        width = width || 1920;
        height = height || 1080;
        if (width > redGL['detect']['texture']['MAX_TEXTURE_SIZE']) width = redGL['detect']['texture']['MAX_TEXTURE_SIZE'];
        if (height > redGL['detect']['texture']['MAX_TEXTURE_SIZE']) height = redGL['detect']['texture']['MAX_TEXTURE_SIZE'];
        this['redGL'] = redGL;
        this['width'] = width;
        this['height'] = height;
        this['webglFrameBuffer'] = gl.createFramebuffer();
        this['webglRenderBuffer'] = gl.createRenderbuffer();
        this['texture'] = RedBitmapTexture(redGL);
        this['_UUID'] = RedGL.makeUUID();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this['webglFrameBuffer']);
        // 텍스쳐 세팅
        gl.activeTexture(gl.TEXTURE0);
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
        console.log(this)
    };
    RedFrameBuffer.prototype = {
        /**DOC:
         {
			 code : 'METHOD',
			 title :`bind`,
			 description : `소유하고있는 webglFrameBuffer, webglTexture, webglRenderBuffer를 binding.`,
			 return : 'void'
		 }
         :DOC*/
        bind: function (gl) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this['webglFrameBuffer']);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this['texture']['webglTexture']);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this['width'], this['height'], 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            // 렌더버퍼 세팅
            gl.bindRenderbuffer(gl.RENDERBUFFER, this['webglRenderBuffer']);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this['width'], this['height']);
            // 프레임버퍼 세팅
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this['texture']['webglTexture'], 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this['webglRenderBuffer']);
        },
        /**DOC:
         {
			 code : 'METHOD',
			 title :`unbind`,
			 description : `소유하고있는 webglFrameBuffer, webglTexture, webglRenderBuffer를 unbinding.`,
			 return : 'void'
		 }
         :DOC*/
        unbind: function (gl) {
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
    };
    /**DOC:
     {
		 code:`PROPERTY`,
		 title :`width`,
		 description : `
		    기본값 : 1920 or 하드웨어 최대값
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedFrameBuffer', 'width', 'number', {min: 2});
    /**DOC:
     {
		 code:`PROPERTY`,
		 title :`height`,
		 description : `
		    기본값 : 1080 or 하드웨어 최대값
	    `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedFrameBuffer', 'height', 'number', {min: 2});
    Object.freeze(RedFrameBuffer);
})();