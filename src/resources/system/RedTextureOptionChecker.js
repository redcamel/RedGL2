/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.6.13 12:49
 */

"use strict";
var RedTextureOptionChecker;
(function () {
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedTextureOptionChecker`,
		 description : `texture 옵션 검증`,
		 return : 'RedTextureOptionChecker'
	 }
	 :DOC*/
	RedTextureOptionChecker = {
		/*DOC:
		 {
			 code:'STATIC METHOD',
			 title :`check`,
			 description : `
				 texture 옵션 검증
			 `,
			 params : {
				 type : [
					 {type:'RedBaseTexture'}
				 ],
				 option : [
					 {type:'Object'}
				 ],
				 gl : [
					 {type:'webGL Context'}
				 ]
			 },
			 return : 'void'
		 }
		 :DOC*/
		check: function (type, option, gl) {
			if (option) {
				var tOptionValue;
				tOptionValue = option['min'];
				if (
					tOptionValue
					&& !(
						tOptionValue == gl.LINEAR
						|| tOptionValue == gl.NEAREST
						|| tOptionValue == gl.NEAREST_MIPMAP_NEAREST
						|| tOptionValue == gl.LINEAR_MIPMAP_NEAREST
						|| tOptionValue == gl.NEAREST_MIPMAP_LINEAR
						|| tOptionValue == gl.LINEAR_MIPMAP_LINEAR
					)
				) RedGLUtil.throwFunc(type + ': min 텍스쳐 옵션에서 사용할수 없는값 입력됨.', '입력값 : ' + tOptionValue);
				tOptionValue = option['mag'];
				if (
					tOptionValue
					&& !(
						tOptionValue == gl.LINEAR
						|| tOptionValue == gl.NEAREST
					)
				) RedGLUtil.throwFunc(type + ' : mag 텍스쳐 옵션에서 사용할수 없는값 입력됨.', '입력값 : ' + tOptionValue);
				tOptionValue = option['wrap_s'];
				if (
					tOptionValue
					&& !(
						tOptionValue == gl.REPEAT
						|| tOptionValue == gl.CLAMP_TO_EDGE
						|| tOptionValue == gl.MIRRORED_REPEAT
					)
				) RedGLUtil.throwFunc(type + ' : wrap_s 텍스쳐 옵션에서 사용할수 없는값 입력됨.', '입력값 : ' + tOptionValue);
				tOptionValue = option['wrap_t'];
				if (
					tOptionValue
					&& !(
						tOptionValue == gl.REPEAT
						|| tOptionValue == gl.CLAMP_TO_EDGE
						|| tOptionValue == gl.MIRRORED_REPEAT
					)
				) RedGLUtil.throwFunc(type + ' : wrap_t 텍스쳐 옵션에서 사용할수 없는값 입력됨.', '입력값 : ' + tOptionValue);
			}
		}
	};
	Object.freeze(RedTextureOptionChecker);
})();
