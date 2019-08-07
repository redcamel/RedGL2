/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.8.2 18:16:21
 *
 */
"use strict";
var RedFilterFrameBuffer;
(function () {
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedFilterFrameBuffer`,
		 description : `
			 RedFilterFrameBuffer Instance 생성자.
		 `,
		 params : {
	         redGL : [
				 {type:'RedGL Instance'}
			 ],
			 width : [
				 {type:'Number'},
				 '기기허용 최대값보다 큰경우 기기허용 최대값으로 설정됨'
			 ],
			 height : [
				 {type:'Number'},
				 '기기허용 최대값보다 큰경우 기기허용 최대값으로 설정됨'
			 ]
		 },
		 example : `
			 RedFilterFrameBuffer( RedGL Instance );
		 `,
		 return : 'RedGeometry Instance'
	 }
	 :DOC*/
	var testMap = {}
	RedFilterFrameBuffer = function (redGL, width, height) {
		if (!(this instanceof RedFilterFrameBuffer)) return new RedFilterFrameBuffer(redGL, width, height);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedFilterFrameBuffer : RedGL Instance만 허용.', redGL);
		if (width) typeof width == 'number' || RedGLUtil.throwFunc('RedFilterFrameBuffer : width - 숫자만 허용', '입력값 : ', width);
		if (height) typeof height == 'number' || RedGLUtil.throwFunc('RedFilterFrameBuffer : height - 숫자만 허용', '입력값 : ', height);
		var gl;
		gl = redGL['gl'];
		width = width || 1920;
		height = height || 1080;
		if (width > redGL['detect']['texture']['MAX_TEXTURE_SIZE']) width = redGL['detect']['texture']['MAX_TEXTURE_SIZE'];
		if (height > redGL['detect']['texture']['MAX_TEXTURE_SIZE']) height = redGL['detect']['texture']['MAX_TEXTURE_SIZE'];
		this['redGL'] = redGL;
		this['width'] = width;
		this['height'] = height;
		this._prevWidth = null
		this._prevHeight = null
		this['webglFrameBuffer'] = gl.createFramebuffer();
		this['webglRenderBuffer'] = gl.createRenderbuffer();
		this['texture'] = RedBitmapTexture(redGL);
		this['_UUID'] = RedGL.makeUUID();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this['webglFrameBuffer']);
		// 텍스쳐 세팅
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this['texture']['webglTexture']);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this['width'], this['height'], 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		// gl.generateMipmap(gl.TEXTURE_2D);
		// 프레임버퍼 세팅
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this['texture']['webglTexture'], 0);
		//
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		console.log(this)
	};
	RedFilterFrameBuffer.prototype = {
		/*DOC:
		 {
			 code : 'METHOD',
			 title :`bind`,
			 description : `소유하고있는 <b>webglFrameBuffer, webglTexture, webglRenderBuffer</b>를 binding.`,
			 params : {
                 gl : [{type:'WebGL Context'}]
			 },
			 return : 'void'
		 }
		 :DOC*/
		bind: function (gl) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, this['webglFrameBuffer']);
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, this['texture']['webglTexture']);
			if (this['_prevWidth'] != this['width'] || this['_prevHeight'] != this['height']) {
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, parseInt(this['width']), parseInt(this['height']), 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
			} else {
				gl.clear(gl.COLOR_BUFFER_BIT)
			}

			this._prevWidth = this['width']
			this._prevHeight = this['height']

		},
		/*DOC:
		 {
			 code : 'METHOD',
			 title :`unbind`,
			 description : `소유하고있는 <b>webglFrameBuffer, webglTexture, webglRenderBuffer</b>를 unbinding.`,
			 params : {
                 gl : [{type:'WebGL Context'}]
			 },
			 return : 'void'
		 }
		 :DOC*/
		unbind: function (gl) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		}
	};
	RedDefinePropertyInfo.definePrototypes(
		'RedFilterFrameBuffer',
		/*DOC:
		 {
			 code:`PROPERTY`,
			 title :`width`,
			 description : `
				기본값 : 1920 or 하드웨어 최대값
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		['width', 'number', {min: 2}],
		/*DOC:
		 {
			 code:`PROPERTY`,
			 title :`height`,
			 description : `
				기본값 : 1080 or 하드웨어 최대값
			`,
			 return : 'Number'
		 }
		 :DOC*/
		['height', 'number', {min: 2}]
	);
	Object.freeze(RedFilterFrameBuffer);
})();