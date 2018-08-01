"use strict";
var RedBitmapCubeTexture;
(function () {
	var loadTexture;
	loadTexture = (function () {
		return function (gl, self, texture, srcList, option, callBack) {
			var onError, onLoad;
			var clearEvents;
			var imgList = [];
			var i, loaded, failNum;
			option = option || {};
			clearEvents = function (img) {
				img.removeEventListener('error', onError);
				img.removeEventListener('load', onLoad);
			};
			onError = function () {
				clearEvents(this);
				if ( failNum == 0 ) callBack.call(self, false);
				failNum++
			};
			onLoad = function () {
				loaded++;
				if ( loaded == 6 ) {
					clearEvents(this);
					gl.activeTexture(gl.TEXTURE0);
					gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
					var i = imgList.length;
					while ( i-- ) {
						gl.texImage2D(
							gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
							0,
							gl.RGBA,
							gl.RGBA,
							gl.UNSIGNED_BYTE,
							imgList[i]
						);
					}
					// gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
					gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
					gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, option['min'] ? option['min'] : gl.LINEAR_MIPMAP_NEAREST);
					gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, option['mag'] ? option['mag'] : gl.LINEAR);
					gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, option['wrap_s'] ? option['wrap_s'] : gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, option['wrap_t'] ? option['wrap_t'] : gl.CLAMP_TO_EDGE);
					try {
						gl.generateMipmap(gl.TEXTURE_CUBE_MAP)
					} catch ( error ) {
						console.log('밉맵을 생성할수 없음', imgList)
					}
					gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
					if ( failNum == 0 ) callBack ? callBack.call(self, true) : 0
				} else clearEvents(this)
			};
			i = 6;
			loaded = 0;
			failNum = 0;
			while ( i-- ) {
				var img;
				img = new Image();
				img.crossOrigin = 'anonymous';
				img.src = srcList[i];
				img.addEventListener('error', onError);
				img.addEventListener('load', onLoad);
				imgList[i] = img;
			}
		}
	})();
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBitmapCubeTexture`,
		 description : `
			 RedBitmapCubeTexture Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 srcList : [
				 {type:'Array'}
			 ],
			 option : [
				 {type:'Object'},
				 '텍스쳐 정의옵션',
				 `
				 <code>
				 {
					 min: gl.LINEAR_MIPMAP_NEAREST,
					 mag: gl.LINEAR,
					 wrap_s: gl.REPEAT,
					 wrap_t: gl.REPEAT
				 }
				 </code>
				 `
			 ],
			 callBack : [
			    {type:'Function'}
			 ]
		 },
		 example : `
		 RedBitmapCubeTexture( RedGL Instance,  srcList, {
			 min: gl.LINEAR_MIPMAP_NEAREST,
			 mag: gl.LINEAR,
			 wrap_s: gl.REPEAT,
			 wrap_t: gl.REPEAT
		 })
		 `,
		 return : 'RedBitmapCubeTexture Instance'
	 }
	 :DOC*/
	RedBitmapCubeTexture = function (redGL, srcList, option, callback) {
		var tGL;
		if ( !(this instanceof RedBitmapCubeTexture) ) return new RedBitmapCubeTexture(redGL, srcList, option, callback);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedBitmapCubeTexture : RedGL Instance만 허용.', '입력값 : ' + redGL);
		tGL = redGL.gl;
		RedTextureOptionChecker.check('RedBitmapCubeTexture', option, tGL);
		this['webglTexture'] = tGL.createTexture();
		this['atlascoord'] = RedAtlasUV(redGL);
		this['_UUID'] = RedGL.makeUUID();
		this['_load'] = function (needEmpty) {
			if ( needEmpty ) this.setEmptyTexture(tGL, this['webglTexture']);
			if ( this['_srcList'] ) loadTexture(tGL, this, this['webglTexture'], this['_srcList'], this['_option'], this['_callback']);
		}
		this['_option'] = option;
		this['callback'] = callback;
		this['srcList'] = srcList;
		console.log(this);
	};
	RedBitmapCubeTexture.prototype = new RedBaseTexture();
	Object.defineProperty(RedBitmapCubeTexture.prototype, 'srcList', {
		get: function () {return this['_srcList']},
		set: function (srcList) {
			srcList instanceof Array || RedGLUtil.throwFunc('RedBitmapCubeTexture : srcList는 배열만 허용.', '입력값 : ' + srcList);
			srcList.length == 6 || RedGLUtil.throwFunc('RedBitmapCubeTexture : srcList 길이는 6이어야함', '입력값 : ' + srcList);
			this['_srcList'] = srcList;
			this._load(true)
		}
	});
	Object.defineProperty(RedBitmapCubeTexture.prototype, 'option', {
		get: function () {return this['_option']},
		set: function (v) {
			this['_option'] = v;
			this._load(false)
		}
	});
	Object.freeze(RedBitmapCubeTexture);
})();
