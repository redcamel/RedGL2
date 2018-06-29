"use strict";
var RedBaseTexture;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBaseTexture`,
		 description : `
			 RedBaseTexture 기저층
		 `,
		 return : 'void'
	 }
	 :DOC*/
	RedBaseTexture = function () {}
	RedBaseTexture.prototype = {
		setEmptyTexture: function (gl, texture) {
			gl.activeTexture(gl.TEXTURE0 + 0)
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)
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
			)
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.generateMipmap(gl.TEXTURE_2D);
			gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
			gl.bindTexture(gl.TEXTURE_2D, null);
			// 픽셀 플립 기본설정
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		}
	}
	Object.freeze(RedBaseTexture)
})();