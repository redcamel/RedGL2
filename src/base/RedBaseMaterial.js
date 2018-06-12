"use strict";
var RedBaseMaterial;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBaseMaterial`,
		 description : `
			 RedBaseMaterial 기저층

		 `,
		 return : 'void'
	 }
	 :DOC*/
	RedBaseMaterial = function () {}
	RedBaseMaterial.prototype = {
		/**DOC:
		 {
			 code : 'METHOD',
			 title :`checkUniformAndProperty`,
			 description : `
				 소유하고 있는 Program에서 사용하고 있지만
				 재질이 해당 유니폼에 대응하는 프로퍼티를 소유하고 않는경우를 검출.
			 `,
			 return : 'void'
		 }
		 :DOC*/
		checkUniformAndProperty: function () {
			var i2
			var tUniformGroup, tUniformLocationInfo, tWebGLUniformLocation;
			tUniformGroup = this['program']['uniformLocation'];
			i2 = tUniformGroup.length
			while ( i2-- ) {
				tUniformLocationInfo = tUniformGroup[i2];
				tWebGLUniformLocation = tUniformLocationInfo['location'];
				if ( tWebGLUniformLocation && !(tUniformLocationInfo['materialPropertyName'] in this) ) {
					RedGLUtil.throwFunc(this['program']['key'] + '- ', tUniformLocationInfo['materialPropertyName'], '속성이 정의 되지않았습니다.')
				}
			}
		}
	}
	Object.freeze(RedBaseMaterial)
})();