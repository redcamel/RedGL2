"use strict";
var RedGLDetect;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedGLDetect`,
		 description : `
			 RedGLDetect
		 `,
		 return : 'RedGLDetect Instance'
	 }
	 :DOC*/
	RedGLDetect = function (gl) {
		if ( !(this instanceof RedGLDetect) ) return new RedGLDetect(gl);
		var checkList, i, k, tKey, tList;
		checkList = {
			basic: [
				'VENDOR',
				'VERSION',
				'SHADING_LANGUAGE_VERSION',
				'RENDERER'
			],
			frameBuffer: [
				'MAX_COLOR_ATTACHMENTS',
				'MAX_RENDERBUFFER_SIZE',
				'MAX_VIEWPORT_DIMS',
				'RED_BITS',
				'GREEN_BITS',
				'BLUE_BITS',
				'ALPHA_BITS',
				'DEPTH_BITS',
				'STENCIL_BITS'
			],
			vertexShader: [
				'MAX_VERTEX_ATTRIBS',
				'MAX_VARYING_VECTORS',
				'MAX_VERTEX_UNIFORM_VECTORS'
			],
			fragmentShader: [
				'MAX_FRAGMENT_UNIFORM_VECTORS'
			],
			texture: [
				'MAX_TEXTURE_SIZE',
				'MAX_CUBE_MAP_TEXTURE_SIZE',
				'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
				'MAX_TEXTURE_IMAGE_UNITS',
				'MAX_VERTEX_TEXTURE_IMAGE_UNITS'
			]
		}
		for ( k in  checkList ) {
			tList = checkList[k]
			i = tList.length;
			this[k] = {};
			while ( i-- ) this[k][tKey = tList[i]] = gl.getParameter(gl[tKey]);
		}
	}
	Object.freeze(RedGLDetect);
})();