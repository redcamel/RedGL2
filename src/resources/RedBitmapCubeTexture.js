"use strict";
var RedBitmapCubeTexture;
(function () {
	var setEmptyTexture;
	var loadTexture;
	var nullImage;
	nullImage = new Image()
	nullImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzMxRDhBQzRFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzMxRDhBQzVFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MzFEOEFDMkU1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MzFEOEFDM0U1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuojYFUAAAAQSURBVHjaYvj//z8DQIABAAj8Av7bok0WAAAAAElFTkSuQmCC'
	setEmptyTexture = function (gl, texture) {
		gl.activeTexture(gl.TEXTURE0)
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
		[nullImage, nullImage, nullImage, nullImage, nullImage, nullImage].forEach(function (image, index) {
			gl.texImage2D(
				gl.TEXTURE_CUBE_MAP_POSITIVE_X + index,
				0,
				gl.RGBA,
				gl.RGBA,
				gl.UNSIGNED_BYTE,
				nullImage
			);
		})
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	}
	loadTexture = (function () {
		return function (gl, self, texture, srcList, option, callBack) {
			var onError, onLoad;
			var clearEvents;
			var imgList = []
			var i, loaded, failNum;
			if ( !option ) option = {}
			clearEvents = function (img) {
				img.removeEventListener('error', onError);
				img.removeEventListener('load', onLoad);
			}
			onError = function () {
				clearEvents(this);
				// var msg = "couldn't load image: " + this.src;
				// RedGLUtil.throwFunc(msg);
				if ( failNum == 0 ) callBack.call(self, false)
				failNum++
			}
			onLoad = function () {
				loaded++
				if ( loaded == 6 ) {
					clearEvents(this)
					gl.activeTexture(gl.TEXTURE0)
					gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
					var i = imgList.length
					while ( i-- ) {
						gl.texImage2D(
							gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
							0,
							gl.RGBA,
							gl.RGBA,
							gl.UNSIGNED_BYTE,
							imgList[i]
						);
					}
					// gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
					gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
					gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, option['min'] ? option['min'] : gl.LINEAR_MIPMAP_NEAREST);
					gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, option['mag'] ? option['mag'] : gl.LINEAR);
					gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, option['wrap_s'] ? option['wrap_s'] : gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, option['wrap_t'] ? option['wrap_t'] : gl.CLAMP_TO_EDGE);
					try {
						gl.generateMipmap(gl.TEXTURE_CUBE_MAP)
					} catch ( error ) {
						console.log('밉맵을 생성할수 없음', imgList)
					}
					gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
					if ( failNum == 0 ) callBack ? callBack.call(self, true) : 0
				} else clearEvents(this)
			}
			i = 6
			loaded = 0
			failNum = 0
			while ( i-- ) {
				var img;
				setEmptyTexture(gl, texture);
				img = new Image();
				img.crossOrigin = 'anonymous';
				img.src = srcList[i];
				img.addEventListener('error', onError);
				img.addEventListener('load', onLoad);
				imgList[i] = img;
			}
		}
	})()
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBitmapCubeTexture`,
		 description : `
			 RedBitmapCubeTexture Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 srcList : [
				 {type:'Array'}
			 ],
			 option : [
				 {type:'Object'},
				 '텍스쳐 정의옵션',
				 `
				 <code>
				 {
					 min: gl.LINEAR_MIPMAP_NEAREST,
					 mag: gl.LINEAR,
					 wrap_s: gl.REPEAT,
					 wrap_t: gl.REPEAT
				 }
				 </code>
				 `
			 ]
		 },
		 example : `
		 RedBitmapCubeTexture( RedGL Instance,  srcList, {
			 min: gl.LINEAR_MIPMAP_NEAREST,
			 mag: gl.LINEAR,
			 wrap_s: gl.REPEAT,
			 wrap_t: gl.REPEAT
		 })
		 `,
		 return : 'RedBitmapCubeTexture Instance'
	 }
	 :DOC*/
	RedBitmapCubeTexture = function (redGL, srcList, option, callback) {
		var tGL;
		if ( !(this instanceof RedBitmapCubeTexture) ) return new RedBitmapCubeTexture(redGL, srcList, option, callback);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedBitmapCubeTexture : RedGL Instance만 허용됩니다.', '입력값 : ' + redGL);
		if ( !(srcList instanceof Array) ) RedGLUtil.throwFunc('RedBitmapCubeTexture : srcList는 배열만 허용.', '입력값 : ' + srcList);
		if ( srcList.length != 6 ) RedGLUtil.throwFunc('RedBitmapCubeTexture : srcList 길이는 6이어야함', '입력값 : ' + srcList);
		tGL = redGL.gl;
		RedTextureOptionChecker.check('RedBitmapCubeTexture', option, tGL)
		this['webglTexture'] = tGL.createTexture();
		this['atlascoord'] = RedAtlasUV(redGL)
		this['_UUID'] = RedGL.makeUUID();
		loadTexture(tGL, this, this['webglTexture'], srcList, option, callback);
		console.log(this)
	}
	RedBitmapCubeTexture.prototype = {};
	Object.freeze(RedBitmapCubeTexture);
})();
