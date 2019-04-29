/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var RedText;
(function () {
    var setTexture;
    var setStylePrototype;
    setStylePrototype = (function () {
        return function (target, k, baseValue) {
            var tStyle;
            tStyle = target['_svg'].querySelector('td').style;
            target['_' + k] = baseValue;
            Object.defineProperty(target, k, {
                get: function () {
                    return target['_' + k]
                },
                set: function (v) {
                    target['_' + k] = v;
                    tStyle[k] = typeof v == 'number' ? (v += 'px') : v;
                    setTexture(target)
                }
            });
            target[k] = baseValue;
        }
    })();
    setTexture = function (target) {
        target['_height'] = +target['_height'];
        target['_svg'].setAttribute('width', target['_width']);
        target['_svg'].setAttribute('height', target['_height']);
        target['_svg'].querySelector('foreignObject').setAttribute('height', target['_height']);
        target['_svg'].querySelector('table').style.height = target['_height'] + 'px';
        target['_img'].src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(target['_svg'].outerHTML);
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedText`,
		 description : `
			 RedText Instance 생성.
			 RedScene 생성시 내부속성으로 자동생성됨.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 width : [
				 {type:'Number'}
			 ],
			 height : [
				 {type:'Number'}
			 ]
		 },
		 demo : '../example/text/RedText.html',
		 return : 'RedText Instance'
	 }
     :DOC*/
    RedText = function (redGL, width, height) {
        if (!(this instanceof RedText)) return new RedText(redGL, width, height);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedText : RedGL Instance만 허용.', redGL);
        RedBaseObject3D['build'].call(this, redGL.gl);
        var self = this;
        // 이미지 생성용 캔버스
        this['_cvs'] = null;
        this['_ctx'] = null;

        // SVG 생성
        this['_svg'] = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this['_svg'].setAttribute('xmlns', "http://www.w3.org/2000/svg");
        this['_svg'].style = 'position:absolute;top:0px;left:0px;text-align:center;z-index:10';
        this['_svg'].innerHTML = '<foreignObject  width="100%" style="position:absolute;top:0;left:0">' +
            '   <table xmlns="http://www.w3.org/1999/xhtml" style="border-collapse: collapse;position:table;top:0;left:0;width:100%;table-layout:fixed">' +
            '       <tr xmlns="http://www.w3.org/1999/xhtml">' +
            '       <td xmlns="http://www.w3.org/1999/xhtml"  > </td>' +
            '       </tr>' +
            '   </table>' +
            '</foreignObject>';
        // document.body.appendChild(this['_svg'])
        /////////////////////
        //////////////////////
        this['geometry'] = RedPlane(redGL, 1, 1);
        this['material'] = RedTextMaterial(redGL, RedBitmapTexture(redGL, this['_cvs']));
        //////////////////////
        this['blendSrc'] = redGL.gl.ONE;
        this['blendDst'] = redGL.gl.ONE_MINUS_SRC_ALPHA;
        // this['useDepthMask'] = false;
        this['useCullFace'] = false;
        this['perspectiveScale'] = true;
        this['sprite3DYn'] = false;
        this['_img'] = new Image();
        width = width || 256;
        height = height || 256;
        if (width > redGL['detect']['texture']['MAX_TEXTURE_SIZE']) width = redGL['detect']['texture']['MAX_TEXTURE_SIZE'];
        if (height > redGL['detect']['texture']['MAX_TEXTURE_SIZE']) height = redGL['detect']['texture']['MAX_TEXTURE_SIZE'];
        this['width'] = width;
        this['height'] = height;
        // 기본 스타일 프로퍼티
        /**DOC:
         {
            code : 'PROPERTY',
            title :`padding`,
            description : `padding - Css 속성사용`,
            return : 'Number'
        }
         :DOC*/
        setStylePrototype(this, 'padding', 0);
        /**DOC:
         {
            code : 'PROPERTY',
            title :`background`,
            description : `background - Css 속성사용`,
            return : 'hex'
        }
         :DOC*/
        setStylePrototype(this, 'background', '');
        /**DOC:
         {
            code : 'PROPERTY',
            title :`color`,
            description : `color - Css 속성사용`,
            return : 'hex'
        }
         :DOC*/
        setStylePrototype(this, 'color', '#000');
        /**DOC:
         {
            code : 'PROPERTY',
            title :`fontFamily`,
            description : `fontFamily - Css 속성사용`,
            return : 'String'
        }
         :DOC*/
        setStylePrototype(this, 'fontFamily', 'Arial');
        /**DOC:
         {
            code : 'PROPERTY',
            title :`fontSize`,
            description : `fontSize - Css 속성사용`,
            return : 'Number'
        }
         :DOC*/
        setStylePrototype(this, 'fontSize', 16);
        /**DOC:
         {
            code : 'PROPERTY',
            title :`fontWeight`,
            description : `fontWeight - Css 속성사용`,
            return : 'String'
        }
         :DOC*/
        setStylePrototype(this, 'fontWeight', 'normal');
        /**DOC:
         {
            code : 'PROPERTY',
            title :`fontStyle`,
            description : `fontStyle - Css 속성사용`,
            return : 'String'
        }
         :DOC*/
        setStylePrototype(this, 'fontStyle', 'normal');
        /**DOC:
         {
            code : 'PROPERTY',
            title :`lineHeight`,
            description : `lineHeight - Css 속성사용`,
            return : 'Number'
        }
         :DOC*/
        setStylePrototype(this, 'lineHeight', 16 * 1.5);
        /**DOC:
         {
            code : 'PROPERTY',
            title :`letterSpacing`,
            description : `letterSpacing - Css 속성사용`,
            return : 'Number'
        }
         :DOC*/
        setStylePrototype(this, 'letterSpacing', 0);
        /**DOC:
         {
            code : 'PROPERTY',
            title :`wordBreak`,
            description : `wordBreak - Css 속성사용`,
            return : 'String'
        }
         :DOC*/
        setStylePrototype(this, 'wordBreak', 'break-all');
        /**DOC:
         {
            code : 'PROPERTY',
            title :`verticalAlign`,
            description : `verticalAlign - Css 속성사용`,
            return : 'String'
        }
         :DOC*/
        setStylePrototype(this, 'verticalAlign', 'middle');
        /**DOC:
         {
            code : 'PROPERTY',
            title :`textAlign`,
            description : `textAlign - Css 속성사용`,
            return : 'String'
        }
         :DOC*/
        setStylePrototype(this, 'textAlign', 'center');

        //////////////////////
        this['_img'].onload = function () {
            var tW, tH;
            tW = self['_width'];
            tH = self['_height'];
            if (tW % 2 == 0) tW += 1;
            if (tH % 2 == 0) tH += 1;
            self['_cvs'] = window['OffscreenCanvas'] ? new OffscreenCanvas(tW, tH) : document.createElement('canvas');
            self['_ctx'] = self['_cvs'].getContext('2d');
            console.log(tW, tH);
            self['_cvs']['width'] = tW;
            self['_cvs']['height'] = tH;
            self['_ctx'].clearRect(0, 0, tW, tH);
            // self['scaleX'] = self['_width'];
            // self['scaleY'] = self['_height'];
            self['_ctx'].drawImage(self['_img'], 0, 0, tW, tH);
            self['material'].width = tW;
            self['material'].height = tH;
            self['material'].diffuseTexture.src = self['_cvs'];
            self['material'].diffuseTexture.option = {
                min: redGL.gl.LINEAR,
                mag: redGL.gl.LINEAR,
                wrap_s: redGL.gl.CLAMP_TO_EDGE,
                wrap_t: redGL.gl.CLAMP_TO_EDGE
            }

        };
        this['useTransparentSort'] = true;
        this['_UUID'] = RedGL.makeUUID();
        console.log(this);
    };
    RedText.prototype = new RedBaseObject3D();
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`perspectiveScale`,
		 description : `perspectiveScale`,
		 return : 'boolean'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedText', 'perspectiveScale', 'boolean');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`sprite3DYn`,
		 description : `sprite3DYn`,
		 return : 'boolean'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedText', 'sprite3DYn', 'boolean');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`width`,
		 description : `가로영역크기`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedText', 'width', 'uint', {
        min: 2,
        callback: function (v) {
            this['_width'] = v;
            this['material']['width'] = v;
            setTexture(this);
        }
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`height`,
		 description : `세로영역크기`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedText', 'height', 'uint', {
        min: 2,
        callback: function (v) {
            this['_height'] = v;
            this['material']['height'] = v;
            setTexture(this);
        }
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`text`,
		 description : `텍스트값, html 허용`,
		 return : 'Number'
	 }
     :DOC*/
    Object.defineProperty(RedText.prototype, 'text', {
        get: function () {
            return this['_text']
        },
        set: (function () {
            var tSVG, tHTMLContainer;
            return function (v) {
                tSVG = this['_svg'];
                tHTMLContainer = tSVG.querySelector('foreignObject td');
                this['_text'] = v.replace(/\<br\>/gi, '<div/>');
                // console.log(this['_svg'].querySelector('foreignObject div'))
                // console.log(this['_svg'].width)
                // this['_svg'].setAttribute('width', 100000);
                // this['_svg'].setAttribute('height', 100000);
                var self = this;
                var t0 = this['_text'].match(/<img .*?>/g);
                var t1 = [];
                var result = this['_text'];
                t0 = t0 || [];
                console.log(t0);
                var max = t0.length;
                var loaded = 0;
                t0.forEach(function (v) {
                    console.log(v, v.match(/src\s*=\s*(\'|\").*?(\'|\")/g));
                    var tSrc = v.match(/src\s*=\s*(\'|\").*?(\'|\")/g)[0];
                    tSrc = tSrc.replace(/src\s*=\s*(\'|\")/g, '').replace(/(\'|\")/g, '');
                    console.log(tSrc);
                    var test = document.createElement('div');
                    test.innerHTML = v;
                    var img = test.querySelector('img');
                    img.onload = function () {
                        var canvas = document.createElement('canvas');
                        canvas.width = img.style.width ? +img.style.width : img.width;
                        canvas.height = img.style.height ? +img.style.height : img.height;
                        var ctx = canvas.getContext('2d');
                        ctx.scale(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
                        ctx.drawImage(img, 0, 0);
                        tInfo.result = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink" width="' + img.width + '" height="' + img.height + '" display="inline" style="vertical-align: middle;display: inline-block">' +
                            '<image xlink:href="' + (canvas.toDataURL('image/png')) + '" height="' + img.height + 'px" width="' + img.width + 'px" />' +
                            '</svg>';
                        loaded++;
                        if (loaded == max) {
                            t1.forEach(function (v) {
                                result = result.replace(v.source, v.result)
                            });
                            tHTMLContainer.innerHTML = result;
                            setTexture(self)
                        }
                        img.onload = null

                    };
                    var tInfo = {
                        source: v,
                        sourceSrc: tSrc,
                        result: ''
                    };
                    t1.push(tInfo)
                });
                if (t0.length == 0) {
                    tHTMLContainer.innerHTML = result;
                    setTexture(this)
                }
            }
        })()
    });
    Object.freeze(RedText);
})();