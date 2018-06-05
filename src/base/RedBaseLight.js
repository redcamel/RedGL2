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
	Object.defineProperty(RedBaseLight.prototype, 'intensity', {
		get: function () { return this['_intensity']; },
		set: function (v) {
			if ( typeof v != 'number' ) RedGLUtil.throwFunc('intensity : 숫자만 허용함.')
			if ( v < 0 ) v = 0;
			this['_intensity'] = v
		}
	});
	Object.freeze(RedBaseLight)
})();