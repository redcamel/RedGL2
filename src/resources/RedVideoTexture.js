"use strict";
var RedVideoTexture;
(function () {
	var loadTexture;
	var makeTexture
	makeTexture = function (gl, texture, source) {
		gl.activeTexture(gl.TEXTURE0 + 0)
		gl.bindTexture(gl.TEXTURE_2D, texture);
		//level,internalFormat, format, type
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
		// gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	loadTexture = (function () {
		return function (gl, self, texture, src, callBack) {
			var onError, onLoad;
			var clearEvents;
			clearEvents = function (video) {
				video.removeEventListener('error', onError);
				video.removeEventListener('canplaythrough', onLoad);
			}
			onError = function () {
				clearEvents(this);
				callBack ? callBack.call(self, false) : 0
				var msg = "couldn't load video: " + src;
				RedGLUtil.throwFunc(msg);
			}
			onLoad = function () {
				clearEvents(this);
				this.play()
				self['_videoDom']['loaded'] = true
				makeTexture(gl, texture, this);
				callBack ? callBack.call(self, true) : 0
			}
			if ( src instanceof HTMLVideoElement ) {
				var video = src
				// video.crossOrigin = 'anonymous'
				video.loop = 1
				video.muted = true
				video.setAttribute('autoplay', '');
				//document.body.appendChild(video)
				video.style = 'position:absolute;top:0px;left:0px;z-index:200'
				self['_videoDom'] = video
				self['_videoDom']['loaded'] = false
				video.addEventListener('error', onError);
				video.addEventListener('canplaythrough', onLoad);
			}
			else {
				var video;
				video = document.createElement(('video'))
				// video.crossOrigin = 'anonymous'
				video.src = src;
				video.loop = 1
				video.muted = true
				video.setAttribute('autoplay', '');
				//document.body.appendChild(video)
				video.style.cssText = 'position:absolute;top:0px;left:0px;z-index:200'
				self['_videoDom'] = video
				self['_videoDom']['loaded'] = false
				video.addEventListener('error', onError);
				video.addEventListener('canplaythrough', onLoad);
			}
		}
	})()
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedVideoTexture`,
		 description : `
			 RedVideoTexture Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 src : [
				 {type:'string'}
			 ]
		 },
		 example : `
		 RedVideoTexture( RedGL Instance,  src)
		 `,
		 return : 'RedVideoTexture Instance'
	 }
	 :DOC*/
	RedVideoTexture = function (redGL, src, callBack) {
		var tGL;
		if ( !(this instanceof RedVideoTexture) ) return new RedVideoTexture(redGL, src, callBack);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedVideoTexture : RedGL Instance만 허용됩니다.', redGL);
		if ( src && typeof  src != 'string' && !(src instanceof HTMLVideoElement) ) RedGLUtil.throwFunc('RedBitmapTexture : src는 문자열 or HTMLVideoElement만 허용.', '입력값 : ' + src);
		tGL = redGL.gl;
		this['webglTexture'] = tGL.createTexture();
		this['atlascoord'] = RedAtlasUV(redGL)
		this['_UUID'] = RedGL.makeUUID();
		this.setEmptyTexture(tGL, this['webglTexture']);
		if ( src ) loadTexture(tGL, this, this['webglTexture'], src, callBack);
		console.log(this)
	}
	RedVideoTexture.prototype = new RedBaseTexture();
	Object.freeze(RedVideoTexture);
})();
