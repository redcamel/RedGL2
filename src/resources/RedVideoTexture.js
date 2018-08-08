"use strict";
var RedVideoTexture;
(function () {
	var loadTexture;
	var makeWebGLTexture;
	makeWebGLTexture = function (gl, texture, source) {
		gl.activeTexture(gl.TEXTURE0 + 0);
		gl.bindTexture(gl.TEXTURE_2D, texture);
		//level,internalFormat, format, type
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
		// gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);
	};
	loadTexture = (function () {
		return function (gl, self, texture, src, callback) {
			var onError, onLoad;
			var clearEvents;
			var video;
			clearEvents = function (video) {
				video.removeEventListener('error', onError);
				video.removeEventListener('canplaythrough', onLoad);
			};
			onError = function () {
				clearEvents(this);
				callback ? callback.call(self, false) : 0
			};
			onLoad = function () {
				clearEvents(this);
				this.play();
				self['_videoDom']['loaded'] = true;
				makeWebGLTexture(gl, texture, this);
				callback ? callback.call(self, true) : 0
			};
			if ( src instanceof HTMLVideoElement ) video = src;
			else {
				video = document.createElement(('video'));
				video.src = src;
			}
			video.loop = 1;
			video.muted = true;
			video.setAttribute('autoplay', '');
			//document.body.appendChild(video)
			video.style.cssText = 'position:absolute;top:0px;left:0px;z-index:200';
			self['_videoDom'] = video;
			self['_videoDom']['loaded'] = false;
			video.addEventListener('error', onError);
			video.addEventListener('canplaythrough', onLoad);
		}
	})();
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
			 ],
			 callback : [
			    {type:'Function'}
			 ]
		 },
		 extends : [
		    'RedBaseTexture'
		 ],
		 demo : '../example/resources/RedVideoTexture.html',
		 example : `
		    RedVideoTexture( RedGL Instance,  src or HTMLVideoElement)
		 `,
		 return : 'RedVideoTexture Instance'
	 }
	 :DOC*/
	RedVideoTexture = function (redGL, src, callback) {
		var tGL;
		if ( !(this instanceof RedVideoTexture) ) return new RedVideoTexture(redGL, src, callback);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedVideoTexture : RedGL Instance만 허용.', redGL);
		tGL = redGL.gl;
		this['webglTexture'] = tGL.createTexture();
		this['atlascoord'] = RedAtlasUV(redGL);
		this['_UUID'] = RedGL.makeUUID();
		this['_load'] = function (needEmpty) {
			if ( needEmpty ) this.setEmptyTexture(tGL, this['webglTexture']);
			if ( this['_src'] ) loadTexture(tGL, this, this['webglTexture'], this['_src'],  this['_callback']);
		}
		this['callback'] = callback;
		this['src'] = src;
		console.log(this);
	};
	RedVideoTexture.prototype = new RedBaseTexture();
	/**DOC:
	 {
		 code:`PROPERTY`,
		 title :`src`,
		 description : `
			 src
		 `,
		 return : 'void'
	 }
	 :DOC*/
	Object.defineProperty(RedVideoTexture.prototype, 'src', {
		get: function () {return this['_src']},
		set: function (v) {
			if ( v && typeof v != 'string' && !(v instanceof HTMLVideoElement) ) RedGLUtil.throwFunc('RedVideoTexture : src는 문자열 or HTMLVideoElement만 허용.', '입력값 : ' + v);
			this['_src'] = v;
			this._load(true)
		}
	});
	Object.freeze(RedVideoTexture);
})();
