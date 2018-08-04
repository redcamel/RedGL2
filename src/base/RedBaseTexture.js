"use strict";
var RedBaseTexture;
(function () {
	var nullImage;
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBaseTexture`,
		 description : `
			 RedBaseTexture 기저층
		 `,
		 return : 'RedBaseTexture Instance'
	 }
	 :DOC*/
	RedBaseTexture = function () {};
	/**DOC:
	 {
		 code : 'CONST',
		 title :`EMPTY_BASE64`,
		 description : `
			 2 * 2 크기의 빈 base64 이미지
		 `,
		 return : 'data:image/png;base64~~~'
	 }
	 :DOC*/
	RedBaseTexture.EMPTY_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzMxRDhBQzRFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzMxRDhBQzVFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MzFEOEFDMkU1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MzFEOEFDM0U1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuojYFUAAAAQSURBVHjaYvj//z8DQIABAAj8Av7bok0WAAAAAElFTkSuQmCC';
	nullImage = new Image();
	nullImage.src = RedBaseTexture.EMPTY_BASE64;
	RedBaseTexture.prototype = {
		/**DOC:
		 {
			 code : 'METHOD',
			 title :`setEmptyTexture`,
			 description : `
				 webglTexture 생성후 이미지 로딩전까지 안전한 텍스쳐 세팅할때 사용
			 `,
			 params : {
			    gl : [{ type : 'RedGL' }],
		        texture : [{ type : 'WebGLTexture' }]
			 },
			 return : 'void'
		 }
		 :DOC*/
		setEmptyTexture: function (gl, texture) {
			if ( this instanceof RedBitmapCubeTexture ) {
				gl.activeTexture(gl.TEXTURE0);
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
				});
				gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
			} else {
				gl.activeTexture(gl.TEXTURE0 + 0);
				gl.bindTexture(gl.TEXTURE_2D, texture);
				gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
				gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
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
				);
				// 픽셀 플립 기본설정
				gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.generateMipmap(gl.TEXTURE_2D);
				gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
				gl.bindTexture(gl.TEXTURE_2D, null);
			}
		}
	};
	RedBaseTexture.prototype['_load'] = function () {
		RedGLUtil.throwFunc('RedBaseTexture - _load : 반드시 재정의해야함')
	};
	RedBaseTexture.prototype['src'] = function () {
		RedGLUtil.throwFunc('RedBaseTexture - src : 반드시 재정의해야함')
	};
	Object.defineProperty(RedBaseTexture.prototype, 'callback', {
		get: function () {return this['_callback']},
		set: function (v) {
			if ( v && typeof v != 'function' ) RedGLUtil.throwFunc('RedBaseTexture : callback은 함수만 허용.', '입력값 :', v);
			this['_callback'] = v;
		}
	});
	Object.freeze(RedBaseTexture);
})();