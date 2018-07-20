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
	var checkList, i, k;
	RedGLDetect = function (gl) {
		if ( !(this instanceof RedGLDetect) ) return new RedGLDetect(gl);
		checkList = (
			'VENDOR,VERSION,SHADING_LANGUAGE_VERSION,RENDERER,MAX_VERTEX_ATTRIBS,MAX_VARYING_VECTORS,MAX_VERTEX_UNIFORM_VECTORS,' +
			'MAX_VERTEX_TEXTURE_IMAGE_UNITS,MAX_FRAGMENT_UNIFORM_VECTORS,MAX_TEXTURE_SIZE,MAX_CUBE_MAP_TEXTURE_SIZE,' +
			'MAX_COMBINED_TEXTURE_IMAGE_UNITS,MAX_TEXTURE_IMAGE_UNITS,MAX_RENDERBUFFER_SIZE,MAX_VIEWPORT_DIMS,' +
			'RED_BITS,GREEN_BITS,BLUE_BITS,ALPHA_BITS,DEPTH_BITS,STENCIL_BITS'
		).split(',');
		i = checkList.length;
		while ( i-- ) this[k = checkList[i]] = gl.getParameter(gl[k]);
	}
	Object.freeze(RedGLDetect);
})();