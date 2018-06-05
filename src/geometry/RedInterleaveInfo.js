"use strict";
var RedInterleaveInfo;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedInterleaveInfo`,
		 description : `
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
			 RedInterleaveInfo('aVertexPosition', 3);
		 `,
		 return : 'RedBuffer Instance'
	 }
	 :DOC*/
	RedInterleaveInfo = function (attributeKey, size, normalize) {
		if ( !(this instanceof RedInterleaveInfo) ) return new RedInterleaveInfo(attributeKey, size, normalize);
		if ( typeof attributeKey != 'string' ) RedGLUtil.throwFunc('RedInterleaveInfo : attributeKey - 문자열만 허용', attributeKey);
		if ( attributeKey.charAt(0) != 'a' ) RedGLUtil.throwFunc('RedShader : attribute의 첫글자는 a로 시작해야합니다.', attributeKey)
		if ( attributeKey.charAt(1) != attributeKey.charAt(1).toUpperCase() ) RedInterleaveInfo.throwFunc('RedShader : attribute의 두번째 글자는 대문자 시작해야합니다.', attributeKey)
		if ( typeof size != 'number' ) RedGLUtil.throwFunc('RedInterleaveInfo : size - 숫자만 허용', size);
		this['attributeKey'] = attributeKey;
		this['size'] = size;
		this['normalize'] = normalize == undefined ? false : true;
		this['offset'] = null // RedBuffer생성시 주입됨
	}
	Object.freeze(RedInterleaveInfo)
})();