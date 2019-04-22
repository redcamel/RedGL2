"use strict";
var RedBaseContainer;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedBaseContainer`,
		 description : `
			 RedBaseContainer 기저층.
			 children 관리층.
		 `,
		 extends : ['RedBaseObject3D'],
		 return : 'RedBaseContainer Instance'
	 }
     :DOC*/
    RedBaseContainer = function () {
        if (!(this instanceof RedBaseContainer)) return new RedBaseContainer();
        this['children'] = []
    };
    RedBaseContainer.prototype = new RedBaseObject3D();
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
		 example : `
		    (RedBaseContainer Instance).addChild( RedBaseObject3D Instance );
		 `,
		 return : 'void'
	 }
     :DOC*/
    RedBaseContainer.prototype['addChild'] = function (child) {
        child instanceof RedBaseObject3D || RedGLUtil.throwFunc('addChild', 'RedBaseObject3D Instance만 가능', '입력값 : ' + child);
        if (this['children'].indexOf(child) > -1) this['removeChild'](child);
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
		 example : `
		    (RedBaseContainer Instance).addChildAt( RedBaseObject3D Instance, 0 ); // 0번째에 자식추가
		    (RedBaseContainer Instance).addChildAt( RedBaseObject3D Instance, 2 ); // 2번째에 자식추가
		 `,
		 return : 'void'
	 }
     :DOC*/
    RedBaseContainer.prototype['addChildAt'] = function (child, index) {
        RedGLUtil['isUint'](index, 'addChildAt : index는 uint만 입력가능');
        child instanceof RedBaseObject3D || RedGLUtil.throwFunc('addChildAt', 'RedBaseObject3D Instance만 가능', '입력값 : ' + child);
        if (this['children'].indexOf(child) > -1) this['removeChild'](child);
        if (this['children'].length < index) index = this['children'].length;
        if (index != undefined) this['children'].splice(index, 0, child);
        else this['children'].push(child);
    };
    /**DOC:
     {
		 code : 'METHOD',
		 title :`removeChild`,
		 description : `
		    해당 자식을 제거.
		    존재하지 않는 자식을 제거하려고 할 경우 에러.
		 `,
		 params:{
			 child : [
				 {type:'RedBaseObject3D Instance'}
			 ]
		 },
		 example : `
		    (RedBaseContainer Instance).removeChild( RedBaseObject3D Instance ); // 해당 자식 제거
		 `,
		 return : 'void'
	 }
     :DOC*/
    RedBaseContainer.prototype['removeChild'] = (function () {
        var t0;
        return function (child) {
            t0 = this['children'].indexOf(child);
            if (t0 == -1) RedGLUtil.throwFunc('removeChild', '존재하지 않는 RedMesh를 삭제하려고 함');
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
		 example : `
		    (RedBaseContainer Instance).removeChildAt( 0 ); // 0번째 자식 제거
		    (RedBaseContainer Instance).removeChildAt( 1 ); // 1번째 자식 제거
		 `,
		 return : 'void'
	 }
     :DOC*/
    RedBaseContainer.prototype['removeChildAt'] = function (index) {
        RedGLUtil['isUint'](index, 'removeChildAt : index는 uint만 입력가능');
        if (this['children'][index]) this['children'].splice(index, 1);
        else RedGLUtil.throwFunc('removeChildAt', 'index 해당인덱스에 위치한 자식이 없음.', '입력값 : ' + index);
    };
    /**DOC:
     {
		 code : 'METHOD',
		 title :`removeChildAll`,
		 description : `전체 자식을 제거`,
		 example : `
		    (RedBaseContainer Instance).removeChildAll(); // 전체 자식 제거
		 `,
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
		 example : `
		    (RedBaseContainer Instance).getChildAt( 0 ); // 0번째 자식 반환
		    (RedBaseContainer Instance).getChildAt( 2 ); // 2번째 자식 반환
		 `,
		 return : 'RedBaseObject3D Instance'
	 }
     :DOC*/
    RedBaseContainer.prototype['getChildAt'] = function (index) {
        RedGLUtil['isUint'](index, 'getChildAt : index는 uint만 입력가능');
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
		 example : `
		    (RedBaseContainer Instance).getChildIndex( RedBaseObject3D Instance ); // 해당객체가 부모메쉬의 몇번째 자식인지 인덱스 반환
		 `,
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
		 description : `자식갯수 반환`,
		 params:{
			 target : [
				 {type:'RedBaseObject3D Instance'}
			 ]
		 },
          example : `
		    (RedBaseContainer Instance).numChildren(); // 자식갯수 반환
		 `,
		 return : 'uint'
	 }
     :DOC*/
    RedBaseContainer.prototype['numChildren'] = function () {
        return this['children'].length;
    };
    /**DOC:
     {
		 code : 'METHOD',
		 title :`sortGeometry`,
		 description : `
		    지오메트리 순으로 자식들을 정렬.
		    동일 지오메트리가 다량 사용될 경우 attribute 변경 횟수가 줄어들어 렌더성능이 좋아진다.
         `,
		 params:{
			 recursive : [
				 {type:'Boolean'},
				 'true 입력시 하위 자식의 children 까지 모두 정렬'
			 ]
		 },
		 example : `
		    (RedBaseContainer Instance).sortGeometry();
		    (RedBaseContainer Instance).sortGeometry(true);
		 `,
		 return : 'void'
	 }
     :DOC*/
    RedBaseContainer.prototype['sortGeometry'] = function (recursive) {
        if (recursive) {
            var i = this.children.length;
            while (i--) {
                if (this.children[i].sortGeometry) this.children[i].sortGeometry(recursive)
            }
        }
        this.children.sort(function (a, b) {
            if (a['_geometry'] && b['_geometry']) {
                a = a['_geometry']['interleaveBuffer']['_UUID'];
                b = b['_geometry']['interleaveBuffer']['_UUID'];
                if (a < b) return -1;
                if (a > b) return 1;
            }
            return 0
        })
    };
    /**DOC:
     {
		 code : 'METHOD',
		 title :`sortMaterial`,
		 description : `
		    재질이 소유한 RedProgram 순으로 자식들을 정렬.
		    동일 재질이 다량 사용될 경우 프로그램 변경 횟수가 줄어들어 렌더성능이 좋아진다.
         `,
		 params:{
			 recursive : [
				 {type:'Boolean'},
				 'true 입력시 하위 자식의 children 까지 모두 정렬'
			 ]
		 },
		 example : `
		    (RedBaseContainer Instance).sortMaterial();
		    (RedBaseContainer Instance).sortMaterial(true);
		 `,
		 return : 'void'
	 }
     :DOC*/
    RedBaseContainer.prototype['sortMaterial'] = function (recursive) {
        if (recursive) {
            var i = this.children.length;
            while (i--) {
                if (this.children[i].sortMaterial) this.children[i].sortMaterial(recursive)
            }
        }
        this.children.sort(function (a, b) {
            if (a['_geometry'] && b['_geometry']) {
                a = a['_material']['program']['_UUID'];
                b = b['_material']['program']['_UUID'];
                if (a < b) return -1;
                if (a > b) return 1;
            }
            return 0
        })
    };
    /**DOC:
     {
		 code : 'METHOD',
		 title :`sortGeometryAndMaterial`,
		 description : `지오메트리/재질순으로 자식들을 정렬`,
		 params:{
			 recursive : [
				 {type:'Boolean'},
				 'true 입력시 하위 자식의 children 까지 모두 정렬'
			 ]
		 },
		 example : `
		    (RedBaseContainer Instance).sortGeometryAndMaterial();
		    (RedBaseContainer Instance).sortGeometryAndMaterial(true);
		 `,
		 return : 'void'
	 }
     :DOC*/
    RedBaseContainer.prototype['sortGeometryAndMaterial'] = function (recursive) {
        //TODO: 정의,검증 해야함
        if (recursive) {
            var i = this.children.length;
            while (i--) {
                if (this.children[i].sortGeometryAndMaterial) this.children[i].sortGeometryAndMaterial(recursive)
            }
        }
        this.children.sort(function (a, b) {
            if (a['_geometry'] && b['_geometry']) {
                a = a['_geometry']['interleaveBuffer']['_UUID'];
                b = b['_geometry']['interleaveBuffer']['_UUID'];
                if (a == b) {
                    var a2 = a['_material']['program']['_UUID'];
                    var b2 = b['_material']['program']['_UUID'];
                    if (a2 < b2) return -1;
                    if (a2 > b2) return 1;
                    return 0
                }
                if (a < b) return -1;
                if (a > b) return 1;
            }
            return 0
        })
    };
    Object.freeze(RedBaseContainer);
})();
