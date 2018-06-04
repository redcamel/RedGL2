"use strict";
var RedVideoTexture;
(function () {
	var setEmptyTexture;
	var loadTexture;
	var makeTexture
	setEmptyTexture = function ( gl, texture ) {
		gl.activeTexture( gl.TEXTURE0 + 0 )
		gl.bindTexture( gl.TEXTURE_2D, texture );
		gl.pixelStorei( gl.UNPACK_ALIGNMENT, 1 )
		gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, false );
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
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
		gl.generateMipmap( gl.TEXTURE_2D );
		gl.pixelStorei( gl.UNPACK_ALIGNMENT, 4 );
		gl.bindTexture( gl.TEXTURE_2D, null );
		// 픽셀 플립 기본설정
		gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
	}
	makeTexture = function ( gl, texture, source ) {
		gl.activeTexture( gl.TEXTURE0 + 0 )
		gl.bindTexture( gl.TEXTURE_2D, texture );
		//level,internalFormat, format, type
		gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source )
		// gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
		gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
		gl.bindTexture( gl.TEXTURE_2D, null );
	}
	loadTexture = (function () {
		return function ( gl, self, texture, src, callBack ) {
			var onError, onLoad;
			var clearEvents;
			clearEvents = function ( img ) {
				img.removeEventListener( 'error', onError );
				img.removeEventListener( 'load', onLoad );
			}
			onError = function () {
				clearEvents( this );
				callBack ? callBack.call( self, false ) : 0
				var msg = "couldn't load video: " + src;
				RedGLUtil.throwFunc( msg );
			}
			onLoad = function () {
				clearEvents( this );
				this.play()
				makeTexture( gl, texture, this );
				callBack ? callBack.call( self, true ) : 0
			}

			setEmptyTexture( gl, texture )
			if ( src instanceof HTMLVideoElement ) makeTexture( gl, texture, src )
			else {
				var video;
				video = document.createElement( ('video') )
				video.crossOrigin = 'anonymous'
				video.src = src;
				video.loop = 1
				video.muted = true
				video.setAttribute( 'autoplay', '' );
				//document.body.appendChild(video)
				video.style = 'position:absolute;top:0px;left:0px;z-index:200'
				self['_videoDom'] = video
				video.addEventListener( 'error', onError );
				video.addEventListener( 'canplaythrough', onLoad );
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
	RedVideoTexture = function ( redGL, src, callBack ) {
		var gl;
		if ( !(this instanceof RedVideoTexture) ) return new RedVideoTexture( redGL, src, callBack );
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc( 'RedVideoTexture : RedGL Instance만 허용됩니다.', redGL );
		if ( src && typeof  src != 'string' && !(src instanceof HTMLVideoElement) ) RedGLUtil.throwFunc( 'RedBitmapTexture : src는 문자열 or HTMLVideoElement만 허용.', '입력값 : ' + src );
		gl = redGL.gl;
		this['webglTexture'] = gl.createTexture();
		this['atlascoord'] = RedAtlasUV( redGL )
		this['_UUID'] = RedGL['makeUUID']();
		if ( src ) loadTexture( gl, this, this['webglTexture'], src, callBack );
		console.log( this )
	}
	RedVideoTexture.prototype = {};
	Object.freeze( RedVideoTexture );
})();
