"use strict";
var RedTextureOptionChecker;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedTextureOptionChecker`,
		 description : `texture 옵션 검증`,
		 return : 'void'
	 }
	 :DOC*/
	RedTextureOptionChecker = {
		/**DOC:
		 {
			 type:'METHOD',
			 title :`check`,
			 description : `
				 texture 옵션 검증
			 `,
			 params : {
				 type : [
					 {type:'RedBitmapCubeTexture or RedBitmapTexture'}
				 ],
				 option : [
					 {type:'Object'}
				 ],
				 gl : [
					 {type:'webGL Context'}
				 ]
			 },
			 example : ``,
			 return : 'void'
		 }
		 :DOC*/
		check: function (type, option, gl) {
			if ( option ) {
				if (
					option['min']
					&& !(
						option['min'] == gl.LINEAR
						|| option['min'] == gl.NEAREST
						|| option['min'] == gl.NEAREST_MIPMAP_NEAREST
						|| option['min'] == gl.LINEAR_MIPMAP_NEAREST
						|| option['min'] == gl.NEAREST_MIPMAP_LINEAR
						|| option['min'] == gl.LINEAR_MIPMAP_LINEAR
					)
				) RedGLUtil.throwFunc(type + ': min 텍스쳐 옵션에서 사용할수 없는값 입력됨.', '입력값 : ' + option['min']);
				if (
					option['mag']
					&& !(
						option['mag'] == gl.LINEAR
						|| option['mag'] == gl.NEAREST
					)
				) RedGLUtil.throwFunc(type + ' : mag 텍스쳐 옵션에서 사용할수 없는값 입력됨.', '입력값 : ' + option['mag']);
				if (
					option['wrap_s']
					&& !(
						option['wrap_s'] == gl.REPEAT
						|| option['wrap_s'] == gl.CLAMP_TO_EDGE
						|| option['wrap_s'] == gl.MIRRORED_REPEAT
					)
				) RedGLUtil.throwFunc(type + ' : wrap_s 텍스쳐 옵션에서 사용할수 없는값 입력됨.', '입력값 : ' + option['wrap_s']);
				if (
					option['wrap_t']
					&& !(
						option['wrap_t'] == gl.REPEAT
						|| option['wrap_t'] == gl.CLAMP_TO_EDGE
						|| option['wrap_t'] == gl.MIRRORED_REPEAT
					)
				) RedGLUtil.throwFunc(type + ' : wrap_t 텍스쳐 옵션에서 사용할수 없는값 입력됨.', '입력값 : ' + option['wrap_t']);
			}
		}
	};
	Object.freeze(RedTextureOptionChecker);
})();
