/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */
"use strict";
var RedBaseController;
(function () {
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedBaseController`,
		 description : `
			 RedBaseController 기저층
		 `,
		 return : 'RedBaseController instance'
	 }
	 :DOC*/
	RedBaseController = function () {
		if (!(this instanceof RedBaseController)) return new RedBaseController();
	};
	RedBaseController.prototype = {
		update: function () {
			RedGLUtil.throwFunc('RedBaseController : update - 재정의 해서 써라')
		}
	};
	Object.freeze(RedBaseController);
})();