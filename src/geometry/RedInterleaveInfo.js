/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var RedInterleaveInfo;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedInterleaveInfo`,
		 description : `
		     인터리브 버퍼 구성 정보 데이터.
			 RedInterleaveInfo Instance 생성자
		 `,
		 params : {
			 attributeKey : [
				 {type:'String'},
				 `쉐이더내의 attributeKey키`
			 ],
			 size : [
				 {type:'Number'},
				 `구성 사이즈`
			 ],
			 normalize : [
				 {type:'Booleab\n'},
				 `버퍼 업로드시 노멀라이징 여부`,
				 `기본값 : false`
			 ]
		 },
		 example : `
			 RedInterleaveInfo('aVertexPosition', 3); // 프로그램에서 aVertexPosition 키를 사용하고 포인트당 3개로 구성됨을 선언함.
		 `,
		 return : 'RedInterleaveInfo Instance'
	 }
     :DOC*/
    RedInterleaveInfo = function (attributeKey, size, normalize) {
        if (!(this instanceof RedInterleaveInfo)) return new RedInterleaveInfo(attributeKey, size, normalize);
        typeof attributeKey === 'string' || RedGLUtil.throwFunc('RedInterleaveInfo : attributeKey - 문자열만 허용', attributeKey);
        attributeKey.charAt(0) === 'a' || RedGLUtil.throwFunc('RedInterleaveInfo : attributeKey 첫글자는 a로 시작해야합니다.', attributeKey);
        attributeKey.charAt(1) === attributeKey.charAt(1).toUpperCase() || RedInterleaveInfo.throwFunc('RedInterleaveInfo : attributeKey 두번째 글자는 대문자 시작해야합니다.', attributeKey);
        typeof size === 'number' || RedGLUtil.throwFunc('RedInterleaveInfo : size - 숫자만 허용', size);
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`attributeKey`,
			 description : '쉐이더상 접근할 어트리뷰트 키',
			 return : 'String'
		 }
         :DOC*/
        this['attributeKey'] = attributeKey;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`size`,
			 description : '어트리뷰트 사이즈',
			 return : 'Int'
		 }
         :DOC*/
        this['size'] = size;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`normalize`,
			 description : `
			    기본값 : false
		     `,
			 return : 'Boolean'
		 }
         :DOC*/
        this['normalize'] = normalize !== undefined;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`offset`,
			 description : `
			    RedBuffer 생성시 자동 주입됨.
			 `,
			 return : 'Int'
		 }
         :DOC*/
        this['offset'] = null;
        console.log(this)
    };
    Object.freeze(RedInterleaveInfo);
})();