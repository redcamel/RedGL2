"use strict";
var RedBaseLight;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBaseLight`,
		 description : `
			 RedBaseLight 기저층
		 `,
		 return : 'void'
	 }
	 :DOC*/
	RedBaseLight = function () {}
	RedBaseLight.prototype = {}
	RedDefinePropertyInfo.definePrototype('RedBaseLight', 'intensity', 'number', {'min': 0});
	Object.freeze(RedBaseLight)
})();