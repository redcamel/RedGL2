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
	/**DOC:
	 {
		 code : 'PROPERTY',
		 title :`color`,
		 description : `
			 컬러설정
		 `,
		 return : 'hex'
	 }
	 :DOC*/
	Object.defineProperty( RedBaseLight.prototype, 'color', (function () {
		var _v = '#fff'
		return {
			get: function () { return _v },
			set: (function () {
				var t0;
				return function ( hex ) {
					_v = hex ? hex : '#ff2211';
					t0 = RedGLUtil.hexToRGB.call( this, _v );
					this['_color'][0] = t0[0];
					this['_color'][1] = t0[1];
					this['_color'][2] = t0[2];
					this['_color'][3] = this['alpha'];
					console.log( this, this['_color'] )
				}
			})()
		}
	})() );
	Object.defineProperty( RedBaseLight.prototype, 'alpha', (function () {
		var _v = '#fff'
		return {
			get: function () { return _v; },
			set: function ( v ) { this['_color'][3] = _v = v }
		}
	})() );
	Object.freeze( RedBaseLight )
})();