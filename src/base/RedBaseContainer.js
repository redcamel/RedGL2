"use strict";
var RedBaseContainer;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBaseContainer`,
		 description : `
			 DisplayContainer 기저층
		 `,
		 return : 'void'
	 }
	 :DOC*/
	RedBaseContainer = function () {};
	RedBaseContainer.prototype = new RedBaseObject3D();
	RedBaseContainer.prototype['sortGeometry'] = function (recursive) {
		if ( recursive ) {
			var i = this.children.length;
			while ( i-- ) this.children[i].sortGeometry(recursive)
		}
		this.children.sort(function (a, b) {
			a = a['_geometry']['interleaveBuffer']['_UUID'];
			b = b['_geometry']['interleaveBuffer']['_UUID'];
			if ( a < b ) return -1;
			if ( a > b ) return 1;
			return 0
		})
	};
	RedBaseContainer.prototype['sortMaterial'] = function (recursive) {
		if ( recursive ) {
			var i = this.children.length;
			while ( i-- ) this.children[i].sortMaterial(recursive)
		}
		this.children.sort(function (a, b) {
			a = a['_material']['program']['_UUID'];
			b = b['_material']['program']['_UUID'];
			if ( a < b ) return -1;
			if ( a > b ) return 1;
			return 0
		})
	};
	RedBaseContainer.prototype['sortGeometryAndMaterial'] = function (recursive) {
		//TODO: 정의,검증 해야함
		if ( recursive ) {
			var i = this.children.length;
			while ( i-- ) this.children[i].sortGeometryAndMaterial(recursive)
		}
		this.children.sort(function (a, b) {
			a = a['_geometry']['interleaveBuffer']['_UUID'];
			b = b['_geometry']['interleaveBuffer']['_UUID'];
			if ( a == b ) {
				var a2 = a['_material']['program']['_UUID'];
				var b2 = b['_material']['program']['_UUID'];
				if ( a2 < b2 ) return -1;
				if ( a2 > b2 ) return 1;
				return 0
			}
			if ( a < b ) return -1;
			if ( a > b ) return 1;
			return 0
		})
	};
	/**DOC:
	 {
		 code : 'METHOD',
		 title :`addChild`,
		 description : `자식추가`,
		 params:{
			 child : [
				 {type:'RedBaseObject3D Instance'}
			 ]
		 },
		 return : 'void'
	 }
	 :DOC*/
	RedBaseContainer.prototype['addChild'] = function (child) {
		child instanceof RedBaseObject3D || RedGLUtil.throwFunc('addChild', 'RedBaseObject3D Instance만 가능', '입력값 : ' + child);
		if ( this['children'].indexOf(child) > -1 ) this['removeChild'](child);
		this['children'].push(child);
	};
	/**DOC:
	 {
		 code : 'METHOD',
		 title :`addChildAt`,
		 description : `인덱스 위치에 자식을 추가`,
		 params:{
			 child : [
				 {type:'RedBaseObject3D Instance'}
			 ],
			 index : [
				 {type:'uint'}
			 ]
		 },
		 return : 'void'
	 }
	 :DOC*/
	RedBaseContainer.prototype['addChildAt'] = function (child, index) {
		typeof index == 'number' || RedGLUtil.throwFunc('addChildAt', 'index는 숫자만 입력가능', '입력값 : ' + index);
		child instanceof RedBaseObject3D || RedGLUtil.throwFunc('addChildAt', 'RedBaseObject3D Instance만 가능', '입력값 : ' + child);
		if ( this['children'].indexOf(child) > -1 ) this['removeChild'](child);
		if ( this['children'].length < index ) index = this['children'].length;
		if ( index ) this['children'].splice(index, 0, child);
		else this['children'].push(child);
	};
	/**DOC:
	 {
		 code : 'METHOD',
		 title :`removeChild`,
		 description : `해당 자식을 제거`,
		 params:{
			 child : [
				 {type:'RedBaseObject3D Instance'}
			 ]
		 },
		 return : 'void'
	 }
	 :DOC*/
	RedBaseContainer.prototype['removeChild'] = (function () {
		var t0;
		return function (child) {
			t0 = this['children'].indexOf(child);
			if ( t0 == -1 ) RedGLUtil.throwFunc('removeChild', '존재하지 않는 RedMesh를 삭제하려고 함');
			else this['children'].splice(t0, 1);
		}
	})();
	/**DOC:
	 {
		 code : 'METHOD',
		 title :`removeChildAt`,
		 description : `인덱스 위치에 있는 자식을 제거`,
		 params:{
			 index : [
				 {type:'uint'}
			 ]
		 },
		 return : 'void'
	 }
	 :DOC*/
	RedBaseContainer.prototype['removeChildAt'] = function (index) {
		if ( typeof index != 'number' ) RedGLUtil.throwFunc('removeChildAt', 'index가 Number형이 아님 ', '입력값 : ' + index);
		if ( this['children'][index] ) this['children'].splice(index, 1);
		else RedGLUtil.throwFunc('removeChildAt', 'index 해당인덱스에 위치한 자식이 없음.', '입력값 : ' + index);
	};
	/**DOC:
	 {
		 code : 'METHOD',
		 title :`removeChildAll`,
		 description : `전체 자식을 제거`,
		 return : 'void'
	 }
	 :DOC*/
	RedBaseContainer.prototype['removeChildAll'] = function () {
		this['children'].length = 0
	};
	/**DOC:
	 {
		 code : 'METHOD',
		 title :`getChildAt`,
		 description : `해당위치의 자식을 반환`,
		 params:{
			 index : [
				 {type:'uint'}
			 ]
		 },
		 return : 'RedBaseObject3D Instance'
	 }
	 :DOC*/
	RedBaseContainer.prototype['getChildAt'] = function (index) {
		typeof index == 'number' || RedGLUtil.throwFunc('getChildAt', 'index가 Number형이 아님 ');
		return this['children'][index];
	};
	/**DOC:
	 {
		 code : 'METHOD',
		 title :`getChildIndex`,
		 description : `해당객체의 인덱스 번호를 반환`,
		 params:{
			 child : [
				 {type:'RedBaseObject3D Instance'}
			 ]
		 },
		 return : 'int'
	 }
	 :DOC*/
	RedBaseContainer.prototype['getChildIndex'] = function (child) {
		return this['children'].indexOf(child);
	};
	/**DOC:
	 {
		 code : 'METHOD',
		 title :`numChildren`,
		 description : `numChildren`,
		 params:{
			 target : [
				 {type:'RedBaseObject3D Instance'}
			 ]
		 },

		 return : 'uint'
	 }
	 :DOC*/
	RedBaseContainer.prototype['numChildren'] = function () {
		return this['children'].length;
	};
	Object.freeze(RedBaseContainer);
})();
