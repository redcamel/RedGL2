"use strict";
var RedBitmapCubeTexture;
(function () {
    var loadTexture;
    loadTexture = (function () {
        return function (gl, self, texture, srcList, option, callBack) {
            var onError, onLoad;
            var imgList = [];
            var i, loaded, failNum;
            option = option || {};
            onError = function () {
                if (failNum == 0) callBack ? callBack.call(self, false) : 0;
                failNum++
            };
            onLoad = function () {
                loaded++;
                if (loaded == 6) {

                    gl.activeTexture(gl.TEXTURE0);
                    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, option['min'] ? option['min'] : gl.LINEAR_MIPMAP_NEAREST);
                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, option['mag'] ? option['mag'] : gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, option['wrap_s'] ? option['wrap_s'] : gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, option['wrap_t'] ? option['wrap_t'] : gl.CLAMP_TO_EDGE);

                    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgList[0]['source']);
                    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgList[1]['source']);
                    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgList[2]['source']);
                    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgList[3]['source']);
                    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgList[4]['source']);
                    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgList[5]['source']);

                    // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

                    try {
                        gl.generateMipmap(gl.TEXTURE_CUBE_MAP)
                    } catch (error) {
                        console.log('밉맵을 생성할수 없음', imgList)
                    }
                    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
                    if (failNum == 0) callBack ? callBack.call(self, true) : 0
                }
            };
            i = 6;
            loaded = 0;
            failNum = 0;
            while (i--) {

                imgList[i] = RedImageLoader(
                    srcList[i],
                    onLoad,
                    onError,
                    {}
                )


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
		 extends : [
		    'RedBaseTexture'
		 ],
         demo : '../example/resources/RedBitmapCubeTexture.html',
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
        if (!(this instanceof RedBitmapCubeTexture)) return new RedBitmapCubeTexture(redGL, srcList, option, callback);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedBitmapCubeTexture : RedGL Instance만 허용.', '입력값 : ' + redGL);
        tGL = redGL.gl;
        option = option || {}
        var tKey = srcList.toString() + JSON.stringify(option)
        if (typeof srcList == 'array') {
            if (!redGL['_datas']['textures']) redGL['_datas']['textures'] = {}
            if (redGL['_datas']['textures'][tKey]) return redGL['_datas']['textures'][tKey]
        }
        this['webglTexture'] = tGL.createTexture();
        this['webglTexture']['gl'] = tGL
        this['_UUID'] = RedGL.makeUUID();
        this['_load'] = function (needEmpty) {
            RedTextureOptionChecker.check('RedBitmapCubeTexture', option, tGL);
            if (needEmpty) this.setEmptyTexture(tGL, this['webglTexture']);
            if (this['_srcList']) loadTexture(tGL, this, this['webglTexture'], this['_srcList'], this['_option'], this['_callback']);
        }
        this['_option'] = option;
        this['callback'] = callback;
        this['srcList'] = srcList;
        redGL['_datas']['textures'][tKey] = this
        console.log(this);
    };
    RedBitmapCubeTexture.prototype = new RedBaseTexture();

    /**DOC:
     {
		 code:`PROPERTY`,
		 title :`srcList`,
		 description : `
			 srcList
		 `,
		 return : 'void'
	 }
     :DOC*/
    Object.defineProperty(RedBitmapCubeTexture.prototype, 'srcList', {
        get: function () {
            return this['_srcList']
        },
        set: function (srcList) {
            srcList instanceof Array || RedGLUtil.throwFunc('RedBitmapCubeTexture : srcList는 배열만 허용.', '입력값 : ' + srcList);
            srcList.length == 6 || RedGLUtil.throwFunc('RedBitmapCubeTexture : srcList 길이는 6이어야함', '입력값 : ' + srcList);
            this['_srcList'] = srcList;
            this._load(true)
        }
    });
    /**DOC:
     {
		 code:`PROPERTY`,
		 title :`option`,
		 description : `
			 텍스쳐 옵션 정의
		 `,
		 return : 'void'
	 }
     :DOC*/
    Object.defineProperty(RedBitmapCubeTexture.prototype, 'option', {
        get: function () {
            return this['_option']
        },
        set: function (v) {
            this['_option'] = v;
            this._load(false)
        }
    });
    Object.freeze(RedBitmapCubeTexture);
})();
