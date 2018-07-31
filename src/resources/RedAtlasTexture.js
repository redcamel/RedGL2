"use strict";
var RedAtlasTexture;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedAtlasTexture`,
		 description : `
			 RedAtlasTexture Instance 생성
			 RedAtlas에 이미지 등록후 키를 기반으로 RedAtlasTexture를 생성할 수 있음.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 key : [
				 {type:'String'},
				 '아틀라스 생성시 src가 키값이 됨'
			 ]
		 },
		 example : `
			 var imgList;
			 imgList = [
				 '../asset/draft1.png',
				 '../asset/draft2.png',
				 '../asset/draft3.png',
				 '../asset/draft4.png',
				 '../asset/draft5.png'
			 ]
			 RedAtlas(
				 RedGL Instance,
				 imgList,
				 function (resultInfo) {
					 console.log(this)
					 console.log(this.getAtlasMap())
					 console.log(this.getAtlasInfoList())
					 var keyMap = this.getAtlasMap();
					 for(var k in keyMap){
						 console.log(RedAtlasTexture(RedGL Instance, k))
					 }
				 }
			 )
		 `,
		 return : 'RedAtlasTexture Instance'
	 }
	 :DOC*/
	var t0;
	RedAtlasTexture = function (redGL, key) {
		if ( !(this instanceof RedAtlasTexture) ) return new RedAtlasTexture(redGL, key);
		redGL instanceof RedGL ||  RedGLUtil.throwFunc('RedAtlasTexture : RedGL Instance만 허용됩니다.', redGL);
		t0 = redGL['_datas']['RedAtlas']['atlasMap'][key]
		this['webglTexture'] = t0['atlas']['texture']['webglTexture']
		this['atlascoord'] = RedAtlasUV(redGL, t0['rect'])
		this['_UUID'] = t0['atlas']['_UUID']
		console.log(this)
	}
	RedAtlasTexture.prototype = new RedBaseTexture();
	Object.freeze(RedAtlasTexture);
})();
