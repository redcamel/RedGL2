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
	RedBaseContainer = function () {
	}
	var prototypeData = {
		/**DOC:
		 {
			 code : 'METHOD',
			 title :`addChild`,
			 description : `자식추가`,
			 params:{
				 child : [
					 {type:'RedMesh,RedSprite3D,RedLine,RedPointUnit'}
				 ]
			 },
			 return : 'void'
		 }
		 :DOC*/
		addChild: (function () {
			var t0;
			return function (child) {
				if ( !child instanceof RedBaseObject3D ) RedGLUtil.throwFunc('addChild', 'RedMesh,RedSprite3D,RedLine,RedPointUnit Instance만 가능');
				t0 = this['children'].indexOf(child);
				if ( t0 != -1 ) child = this['children'].splice(t0, 1);
				this['children'].push(child);
			}
		})(),
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
		addChildAt: (function () {
			var t0;
			return function (child, index) {
				if ( !child instanceof RedBaseObject3D )RedGLUtil.throwFunc('addChildAt', 'RedBaseObject3D Instance Instance만 가능');
				t0 = this['children'].indexOf(child);
				this['children'].splice(t0, 0, child);
			}
		})(),
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
		removeChild: (function () {
			var t0;
			return function (child) {
				t0 = this['children'].indexOf(child);
				if ( t0 == -1 ) RedGLUtil.throwFunc('removeChild', '존재하지 않는 RedMesh를 삭제하려고 함');
				else this['children'].splice(t0, 1);
			}
		})(),
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
		removeChildAt: (function () {
			var t0;
			return function (index) {
				if ( typeof index != 'number' ) RedGLUtil.throwFunc('removeChildAt', 'index가 Number형이 아님 ');
				if ( this['children'][index] ) this['children'].splice(t0, 1);
			}
		}),
		/**DOC:
		 {
			 code : 'METHOD',
			 title :`removeChildAll`,
			 description : `전체 자식을 제거`,
			 return : 'void'
		 }
		 :DOC*/
		removeChildAll: function () {
			this['children'].length = 0
		},
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
		getChildAt: function (index) {
			if ( typeof index != 'number' ) RedGLUtil.throwFunc('getChildAt', 'index가 Number형이 아님 ');
			return this['children'][index];
		},
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
		getChildIndex: function (child) {
			return this['children'].indexOf(child);
		},
		// getChildByName: function () {
		//     //TODO:
		// },
		// setChildIndex: function (v) {
		//     //TODO:
		// },
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
		numChildren: function (target) {
			return this['children'].length;
		}
	};
	RedBaseContainer.prototype = new RedBaseObject3D()
	for ( var k in prototypeData ) RedBaseContainer.prototype[k] = prototypeData[k];
	Object.freeze(RedBaseContainer);
})();
