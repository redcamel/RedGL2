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
	RedBaseLight.prototype = {
		//addCasting: (function () {
		//	var t0;
		//	return function (v) {
		//		t0 = this['_castingList'].indexOf(v)
		//		if (t0 == -1) this['_castingList'].push(v)
		//	}
		//})(),
		//removeCasting: (function () {
		//	var t0;
		//	return function (v) {
		//		t0 = this['_castingList'].indexOf(v)
		//		if (t0 > -1) this['_castingList'].splice
		//	}
		//})(),
		//_castingList: [],
	}
	Object.defineProperty(RedBaseLight.prototype, 'intensity', RedDefinePropertyInfo['intensity']);
	Object.freeze(RedBaseLight)
})();