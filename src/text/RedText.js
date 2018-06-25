"use strict";
var RedText;
(function () {
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
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedText : RedGL Instance만 허용됩니다.', redGL);
		RedBaseObject3D['build'].call(this, redGL.gl)
		this['_cvs'] = document.createElement('canvas');
		this['_ctx'] = this['_cvs'].getContext('2d');
		var self = this
		self['_cvs']['width'] = 2
		self['_cvs']['height'] = 2
		self['_cvs'].style['width'] = 2 + 'px'
		self['_cvs'].style['height'] = 2 + 'px'
		/////////////////////
		this['blendSrc'] = redGL.gl.ONE
		this['blendDst'] = redGL.gl.ONE_MINUS_SRC_ALPHA
		this['useDepthMask'] = false
		this['useCullFace'] = false
		this['_sprite3DYn'] = false
		this['perspectiveScale'] = true
		this['geometry'] = RedPlane(redGL, 1, 1, 0);
		this['material'] = RedBitmapMaterial(redGL, RedBitmapTexture(redGL, this['_cvs']))
		var nextHighestPowerOfTwo = function (v) {
			--v;
			for ( var i = 1; i < 32; i <<= 1 ) {
				v = v | v >> i;
			}
			return v + 1;
		}
		var img = new Image();
		img.onload = function () {
			var tW, tH
			tW = nextHighestPowerOfTwo(document.querySelector('svg').getAttribute('width'))
			tH = nextHighestPowerOfTwo(document.querySelector('svg').getAttribute('height'))
			// console.log(tW, tH)
			self['_cvs'].style['width'] = tW + 'px'
			self['_cvs'].style['height'] = tH + 'px'
			self['_cvs']['width'] = tW
			self['_cvs']['height'] = tH
			// self['_ctx'].fillStyle = 'rgba(0,0,0,0)'
			self['_ctx'].fillStyle = 'rgba(' + Math.random()*256 + ',' + Math.random()*256+ ',' + Math.random()*256 + ',0.5)'
			self['_ctx'].fillRect(0, 0, tW, tH);
			self['_ctx'].drawImage(img, 0, 0, tW, tH);
			self.scaleX = 1
			self.scaleY = document.querySelector('svg').getAttribute('height')/document.querySelector('svg').getAttribute('width')
			self['material'].diffuseTexture = RedBitmapTexture(redGL, self['_cvs'], {
				min: redGL.gl.LINEAR,
				mag: redGL.gl.LINEAR
			})
		};
		document.querySelector('svg foreignObject div').style.fontSize = Math.random()*100 + 'px'
		document.querySelector('svg foreignObject div').style.color = 'rgba(' + Math.random()*256 + ',' + Math.random()*256+ ',' + Math.random()*256 + ',1)'
		document.querySelector('svg foreignObject div').innerHTML = 'Here is a <strong>paragraph</strong> that requires <em>word wrap</em>' +
			'<p xmlns="http://www.w3.org/1999/xhtml">길어져라길어져라길어져라길어져라길어져라길어져라길어져라길어져라' +
			Math.random()
		img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(document.querySelector('svg').outerHTML);
		this['_UUID'] = RedGL['makeUUID']();
		console.log(this);
	}
	RedText.prototype = new RedBaseObject3D();
	Object.defineProperty(RedText.prototype, 'text', {
		get: function () { return this['_text']},
		set: (function () {
			var tCtx;
			var tSize;
			return function (v) {
				tCtx = this['_ctx'];
				tSize = tCtx.measureText(v);
				this['_cvs'].style.width = tSize
				this['_cvs'].style.height = tSize
				tCtx.fillText(v, 0, 0);
				this['_text'] = v
			}
		})()
	})
	Object.freeze(RedText);
})();