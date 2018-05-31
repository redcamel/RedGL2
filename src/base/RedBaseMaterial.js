"use strict";
var RedBaseMaterial;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBaseMaterial`,
		 description : `
			 RedBaseMaterial 기저층
			 프로토타입 확장을 통해서만 사용가능( RedGLUtil.copyProto 사용 )

		 `,
		 return : 'void'
	 }
	 :DOC*/
	RedBaseMaterial = function () {
		RedGLUtil.throwFunc('RedBaseMaterial : 생성자/직접실행으로 사용 할 수 없습니다.')
	}
	RedBaseMaterial.prototype = {
		/**DOC:
		 {
			 code : 'METHOD',
			 title :`checkProperty`,
			 description : `
				 소유하고 있는 Program에서 사용하고 있지만
				 재질이 해당 유니폼에 대응하는 프로퍼티를 소유하고 않는경우를 검출.
			 `,
			 return : 'void'
		 }
		 :DOC*/
		checkProperty: function () {
			var i2
			var tUniformGroup, tUniformLocationInfo, tWebGLUniformLocation;
			tUniformGroup = this['program']['uniformLocation'];
			i2 = tUniformGroup.length
			while (i2--) {
				tUniformLocationInfo = tUniformGroup[i2];
				tWebGLUniformLocation = tUniformLocationInfo['location'];
				if (tWebGLUniformLocation && !this.hasOwnProperty(tUniformLocationInfo['materialPropertyName'])) {
					RedGLUtil.throwFunc('Material에 ', tUniformLocationInfo['materialPropertyName'], '이 정의 되지않았습니다.')
				}
			}
		}
	}
	Object.freeze(RedBaseMaterial)
})();