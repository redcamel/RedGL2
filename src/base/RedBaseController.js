"use strict";
var RedBaseController;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBaseController`,
		 description : `
			 RedBaseController 기저층
		 `,
		 return : 'void'
	 }
	 :DOC*/
	RedBaseController = function () {};
	RedBaseController.prototype = {
		update : function(){
			RedGLUtil.throwFunc('RedBaseController : update - 재정의 해서 써라')
		}
	};
	Object.freeze(RedBaseController);
})();