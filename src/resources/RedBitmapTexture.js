"use strict";
var RedBitmapTexture;
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
	makeTexture = function ( gl, texture, source, option ) {
		gl.activeTexture( gl.TEXTURE0 + 0 )
		gl.bindTexture( gl.TEXTURE_2D, texture );
		//level,internalFormat, format, type
		gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source )
		// gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
		gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, option['min'] ? option['min'] : gl.LINEAR_MIPMAP_NEAREST );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, option['max'] ? option['max'] : gl.LINEAR );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, option['wrap_s'] ? option['wrap_s'] : gl.REPEAT );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, option['wrap_t'] ? option['wrap_t'] : gl.REPEAT );
		if ( gl['glExtension']['EXT_texture_filter_anisotropic'] && option['anisotropic'] ) {
			gl.texParameterf( gl.TEXTURE_2D, gl['glExtension']['EXT_texture_filter_anisotropic'].TEXTURE_MAX_ANISOTROPY_EXT, option['anisotropic'] );
		}
		try {
			gl.generateMipmap( gl.TEXTURE_2D )
		} catch ( error ) {
			console.log( '밉맵을 생성할수 없음', source )
		}
		gl.bindTexture( gl.TEXTURE_2D, null );
	}
	loadTexture = (function () {
		return function ( gl, self, texture, src, option, callBack ) {
			var onError, onLoad;
			var clearEvents;
			if ( !option ) option = {}
			clearEvents = function ( img ) {
				img.removeEventListener( 'error', onError );
				img.removeEventListener( 'load', onLoad );
			}
			onError = function () {
				clearEvents( this );
				callBack ? callBack.call( self, false ) : 0
				var msg = "couldn't load image: " + src;
				RedGLUtil.throwFunc( msg );
			}
			onLoad = function () {
				clearEvents( this );
				makeTexture( gl, texture, this, option );
				callBack ? callBack.call( self, true ) : 0
			}

			setEmptyTexture( gl, texture )
			if ( src instanceof HTMLCanvasElement ) makeTexture( gl, texture, src, option )
			else {
				var img;
				img = new Image();
				img.crossOrigin = 'anonymous'
				img.src = src;
				img.addEventListener( 'error', onError );
				img.addEventListener( 'load', onLoad );
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
				 {type:'string'}
			 ],
			 option : [
				 {type:'Object'},
				 '텍스쳐 정의옵션',
				 `
				 <code>
				 {
					 min: this.gl.LINEAR_MIPMAP_NEAREST,
					 max: this.gl.LINEAR,
					 wrap_s: this.gl.REPEAT,
					 wrap_t: this.gl.REPEAT,
					 anisotropic: 16 // 지원가능한경우에만 작동
				 }
				 </code>
				 `
			 ]
		 },
		 example : `
		 RedBitmapTexture( RedGL Instance,  src, {
			 min: gl.LINEAR_MIPMAP_NEAREST,
			 max: gl.LINEAR,
			 wrap_s: gl.REPEAT,
			 wrap_t: gl.REPEAT
		 })
		 `,
		 return : 'RedBitmapTexture Instance'
	 }
	 :DOC*/
	RedBitmapTexture = function ( redGL, src, option, callBack ) {
		var tGL;
		if ( !(this instanceof RedBitmapTexture) ) return new RedBitmapTexture( redGL, src, option, callBack );
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc( 'RedBitmapTexture : RedGL Instance만 허용됩니다.', redGL );
		if ( src && typeof  src != 'string' && !(src instanceof HTMLCanvasElement) ) RedGLUtil.throwFunc( 'RedBitmapTexture : src는 문자열 or Canvas Element만 허용.', '입력값 : ' + src );
		tGL = redGL.gl;

		if ( option ) {
			if (
				option['min']
				&& !(
					option['min'] == tGL.LINEAR
					|| option['min'] == tGL.NEAREST
					|| option['min'] == tGL.NEAREST_MIPMAP_NEAREST
					|| option['min'] == tGL.LINEAR_MIPMAP_NEAREST
					|| option['min'] == tGL.NEAREST_MIPMAP_LINEAR
					|| option['min'] == tGL.LINEAR_MIPMAP_LINEAR
				)
			) RedGLUtil.throwFunc( 'RedBitmapTexture : min 텍스쳐 옵션에서 사용할수 없는값 입력됨.', '입력값 : ' + option['min'] );
			if (
				option['max']
				&& !(
					option['max'] == tGL.LINEAR
					|| option['max'] == tGL.NEAREST
				)
			) RedGLUtil.throwFunc( 'RedBitmapTexture : max 텍스쳐 옵션에서 사용할수 없는값 입력됨.', '입력값 : ' + option['max'] );
			if (
				option['wrap_s']
				&& !(
					option['wrap_s'] == tGL.REPEAT
					|| option['wrap_s'] == tGL.CLAMP_TO_EDGE
					|| option['wrap_s'] == tGL.MIRRORED_REPEAT
				)
			) RedGLUtil.throwFunc( 'RedBitmapTexture : wrap_s 텍스쳐 옵션에서 사용할수 없는값 입력됨.', '입력값 : ' + option['wrap_s'] )
			if (
				option['wrap_t']
				&& !(
					option['wrap_t'] == tGL.REPEAT
					|| option['wrap_t'] == tGL.CLAMP_TO_EDGE
					|| option['wrap_t'] == tGL.MIRRORED_REPEAT
				)
			) RedGLUtil.throwFunc( 'RedBitmapTexture : wrap_t 텍스쳐 옵션에서 사용할수 없는값 입력됨.', '입력값 : ' + option['wrap_t'] );
		}

		this['webglTexture'] = tGL.createTexture();
		this['atlascoord'] = RedAtlasUV( redGL )
		this['_UUID'] = RedGL['makeUUID']();
		if ( src ) loadTexture( tGL, this, this['webglTexture'], src, option, callBack );
		console.log( this )
	}
	RedBitmapTexture.prototype = {};
	Object.freeze( RedBitmapTexture );
})();
