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
		var createMultilineText = function (ctx, textToWrite, maxWidth, text) {
			textToWrite = textToWrite.replace("\n", " ");
			var currentText = textToWrite;
			var futureText;
			var subWidth = 0;
			var maxLineWidth = 0;
			var wordArray = textToWrite.split(" ");
			var wordsInCurrent, wordArrayLength;
			wordsInCurrent = wordArrayLength = wordArray.length;
			// Reduce currentText until it is less than maxWidth or is a single word
			// futureText var keeps track of text not yet written to a text line
			while ( ctx['measureText'](ctx, currentText) > maxWidth && wordsInCurrent > 1 ) {
				wordsInCurrent--;
				var linebreak = false;
				currentText = futureText = "";
				for ( var i = 0; i < wordArrayLength; i++ ) {
					if ( i < wordsInCurrent ) {
						currentText += wordArray[i];
						if ( i + 1 < wordsInCurrent ) {
							currentText += " ";
						}
					}
					else {
						futureText += wordArray[i];
						if ( i + 1 < wordArrayLength ) {
							futureText += " ";
						}
					}
				}
			}
			text.push(currentText); // Write this line of text to the array
			maxLineWidth = ctx['measureText'](ctx, currentText);
			// If there is any text left to be written call the function again
			if ( futureText ) {
				subWidth = createMultilineText(ctx, futureText, maxWidth, text);
				if ( subWidth > maxLineWidth ) {
					maxLineWidth = subWidth;
				}
			}
			// Return the maximum line width
			return maxLineWidth;
		}
		var img = new Image();
		img.onload = function () {
			var text = [];
			var textX, textY;
			var textToWrite = "HTML5 Rocks! HTML5 Rocks! HTML5 Rocks!";
			var textHeight = 40;
			var maxWidth = 6;
			self['_ctx'].fontSize = textHeight + "px";
			maxWidth = createMultilineText(self['_ctx'], textToWrite, maxWidth, text);
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
		// document.querySelector('foreignObject').textContent='test'
		console.log(document.querySelector('svg').outerHTML)
		img.src = 'data:image/svg+xml;charset=utf-8,' + (document.querySelector('svg').outerHTML);
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