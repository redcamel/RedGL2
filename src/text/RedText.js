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
				get: function () { return target['_' + k]},
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
		target['_svg'].setAttribute('width', target['_svg']['viewBox']['baseVal'].width = target['_width']);
		target['_svg'].setAttribute('height', target['_svg']['viewBox']['baseVal'].height = +target['_height']);
		target['_svg'].querySelector('foreignObject').setAttribute('height', +target['_height']);
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
			 ]
		 },
		 return : 'RedText Instance'
	 }
	 :DOC*/
	RedText = function (redGL) {
		if ( !(this instanceof RedText) ) return new RedText(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedText : RedGL Instance만 허용.', redGL);
		RedBaseObject3D['build'].call(this, redGL.gl);
		var self = this;
		// 이미지 생성용 캔버스
		this['_cvs'] = document.createElement('canvas');
		this['_ctx'] = this['_cvs'].getContext('2d');
		this['_cvs']['width'] = 2;
		this['_cvs']['height'] = 2;
		// SVG 생성
		this['_svg'] = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		this['_svg'].setAttribute('xmlns', "http://www.w3.org/2000/svg");
		this['_svg'].style = 'position:absolute;top:0px;left:0px;text-align:center;z-index:10';
		this['_svg'].innerHTML = '<foreignObject  width="100%" style="position:absolute;top:0;left:0">' +
			'   <table xmlns="http://www.w3.org/1999/xhtml" style="position:table;top:0;left:0;width:100%;table-layout:fixed">' +
			'       <tr xmlns="http://www.w3.org/1999/xhtml">' +
			'       <td xmlns="http://www.w3.org/1999/xhtml"  > </td>' +
			'       </tr>' +
			'   </table>' +
			'</foreignObject>';
		// document.body.appendChild(this['_svg'])
		/////////////////////
		this['_img'] = new Image();
		this['width'] = 256;
		this['height'] = 512;
		// 기본 스타일 프로퍼티
		setStylePrototype(this, 'padding', 0);
		setStylePrototype(this, 'background', '');
		setStylePrototype(this, 'color', '#000');
		setStylePrototype(this, 'fontFamily', 'Arial');
		setStylePrototype(this, 'fontSize', 16);
		setStylePrototype(this, 'fontWeight', 'normal');
		setStylePrototype(this, 'fontStyle', 'normal');
		setStylePrototype(this, 'lineHeight', 16 * 1.5);
		setStylePrototype(this, 'letterSpacing', 0);
		setStylePrototype(this, 'wordBreak', 'break-all');
		setStylePrototype(this, 'verticalAlign', 'middle');
		setStylePrototype(this, 'textAlign', 'center');
		//////////////////////
		this['geometry'] = RedPlane(redGL, 1, 1, 0);
		this['material'] = RedBitmapMaterial(redGL, RedBitmapTexture(redGL, this['_cvs']));
		//////////////////////
		this['blendSrc'] = redGL.gl.ONE;
		this['blendDst'] = redGL.gl.ONE_MINUS_SRC_ALPHA;
		this['useDepthMask'] = false;
		this['useCullFace'] = false;
		this['perspectiveScale'] = false;
		this['sprite3DYn'] = false;
		//////////////////////
		this['_img'].onload = function () {
			var tW, tH;
			tW = self['_width'];
			tH = self['_height'];
			console.log(tW, tH);
			self['_cvs']['width'] = tW;
			self['_cvs']['height'] = tH;
			self['_ctx'].clearRect(0, 0, tW, tH);
			self['scaleX'] = self['_width'] / redGL.gl.drawingBufferWidth;
			self['scaleY'] = self['_height'] / redGL.gl.drawingBufferWidth;
			self['_ctx'].drawImage(self['_img'], 0, 0, tW, tH);
			self['material'].diffuseTexture.src = self['_cvs']
		};
		this['_UUID'] = RedGL.makeUUID();
		console.log(this);
	};
	RedText.prototype = new RedBaseObject3D();
	RedDefinePropertyInfo.definePrototype('RedText', 'perspectiveScale', 'boolean', true);
	RedDefinePropertyInfo.definePrototype('RedText', 'sprite3DYn', 'boolean', true);
	/**DOC:
	 {
		 title :`width`,
		 description : `가로영역크기`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedText', 'width', 'number', {
		min: 2,
		callback: function (v) {
			this['_width'] = v;
			setTexture(this);
		}
	});
	/**DOC:
	 {
		 title :`width`,
		 description : `세로영역크기`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedText', 'height', 'number', {
		min: 2,
		callback: function (v) {
			this['_height'] = v;
			setTexture(this);
		}
	});
	/**DOC:
	 {
		 title :`text`,
		 description : `텍스트값, html 허용`,
		 return : 'Number'
	 }
	 :DOC*/
	Object.defineProperty(RedText.prototype, 'text', {
		get: function () { return this['_text']},
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
				tHTMLContainer.innerHTML = this['_text'];
				setTexture(this)
			}
		})()
	});
	Object.freeze(RedText);
})();