"use strict";
var RedGL;
(function () {
	var getGL;
	var setEmptyTextures;
	/*
	 gl 컨텍스트 찾기
	 */
	getGL = (function () {
		var checkList; // 체크할 리스트
		var OPTION; // 기본초기화 옵션 리스트
		var tContext, tKey, i;
		var initOption;
		var EXT_KEY_LIST;
		OPTION = {
			alpha: false,
			depth: true,
			stencil: false,
			antialias: true,
			premultipliedAlpha: false,
			preserveDrawingBuffer: false,
			powerPreference: 'default', // default, high-performance, low-power
			failIfMajorPerformanceCaveat: false
		};
		EXT_KEY_LIST = [
			'OES_element_index_uint',
			'OES_standard_derivatives',
			'EXT_texture_filter_anisotropic',
			'WEBGL_compressed_texture_s3tc'
		];
		checkList = 'webkit-3d,moz-webgl,3d,experimental-webgl,webgl,webgl2'.split(',');
		// checkList = 'webkit-3d,moz-webgl,3d,experimental-webgl,webgl'.split(',');
		return function (canvas, option) {
			initOption = JSON.parse(JSON.stringify(OPTION));
			if ( option ) for ( i in option ) initOption[i] = option[i];
			i = checkList.length;
			while ( i-- ) {
				if ( tContext = canvas.getContext(tKey = checkList[i], initOption) ) {
					tContext['glExtension'] = {};
					EXT_KEY_LIST.forEach(function (extensionKey) {
						tContext['glExtension'][extensionKey] = tContext.getExtension(extensionKey);
						console.log('확장여부 ' + extensionKey + ' :', tContext['glExtension'][extensionKey])
					});
					tContext['version'] = tKey;
					return tContext;
				}
			}
			return null;
		}
	})();
	setEmptyTextures = function (redGL, gl) {
		var i;
		var emptyTexture, emptyCubeTexture, src;
		i = redGL['_detect']['MAX_COMBINED_TEXTURE_IMAGE_UNITS'];
		src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzMxRDhBQzRFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzMxRDhBQzVFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MzFEOEFDMkU1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MzFEOEFDM0U1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuojYFUAAAAQSURBVHjaYvj//z8DQIABAAj8Av7bok0WAAAAAElFTkSuQmCC';
		emptyTexture = RedBitmapTexture(redGL, src);
		emptyCubeTexture = RedBitmapCubeTexture(redGL, [src, src, src, src, src, src]);
		redGL['_datas']['emptyTexture'] = {
			'2d': emptyTexture,
			'3d': emptyCubeTexture
		};
		// 0번은 2D 텍스쳐 생성용공간
		// 1번은 3D 텍스쳐 생성용공간
		while ( i-- ) {
			if ( i == 1 ) {
				gl.activeTexture(gl.TEXTURE0 + 1);
				gl.bindTexture(gl.TEXTURE_CUBE_MAP, emptyCubeTexture['webglTexture']);
			} else {
				gl.activeTexture(gl.TEXTURE0 + i);
				gl.bindTexture(gl.TEXTURE_2D, emptyTexture['webglTexture']);
			}
		}
	};
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedGL`,
		 description : `
			 RedGL Instance 생성자.
			 WebGL 초기화를 담당하며, 단일 월드를 소유한다.
		 `,
		 params : {
			 canvas : [
				 {type:'Canvas Element'}
			 ],
			 callback :[
				 {type:'function'},
				 `컨텍스트 초기화이후 실행될 콜백`,
				 `리턴인자로 true,false를 반환한다`
			 ],
			 option : [
				 {type:'Object'},
				 `초기화 옵션을 지정한다.`,
				 `
				 <code>
				 // 초기값
				 {
					 alpha: false,
					 depth: true,
					 stencil: false,
					 antialias: true,
					 premultipliedAlpha: false,
					 preserveDrawingBuffer: false,
					 powerPreference: 'default', // default, high-performance, low-power
					 failIfMajorPerformanceCaveat: false
				 }
				 </code>
				 `
			 ],
		 },
		 example : `
			 // 기초 초기화
			 RedGL(document.getElementById('test'), function(v){
				  // 콜백내용
				  // 성공,실패에 따라 v값이 true or false.
				  if(v){
					  // 초기화 성공
				  }else{
					  // 초기화실패
				  }
			 })
		 `,
		 return : 'RedGL Instance'
	 }
	 :DOC*/
	RedGL = function (canvas, callback, option) {
		if ( !(this instanceof RedGL) ) return new RedGL(canvas, callback, option);
		canvas instanceof Element && canvas['tagName'] == 'CANVAS' || RedGLUtil.throwFunc('RedGL : Canvas Element만 허용');
		var tGL, self;
		this['_datas'] = {};
		this['_width'] = '100%';
		this['_height'] = '100%';
		this['_renderScale'] = 1;
		//
		this['_canvas'] = canvas;
		this['gl'] = tGL = getGL(canvas, option);
		if ( tGL ) this['_detect'] = RedGLDetect(tGL);
		this['_UUID'] = RedGL['makeUUID']();
		//
		self = this;
		requestAnimationFrame(function () {
			window.addEventListener('resize', function () {
				self.setSize(self['_width'], self['_height'])
			});
			self.setSize(self['_width'], self['_height']); // 리사이즈를 초기에 한번 실행.
			setEmptyTextures(self, tGL); // 빈텍스쳐를 미리 체워둔다.
			callback ? callback.call(self, tGL ? true : false) : 0; // 콜백이 있으면 실행
		});
		console.log(this)
	};
	/**DOC:
	 {
		 code : 'STATIC',
		 title :`RedGL.makeUUID`,
		 description : `
			 UUID 생성기
		 `,
		 example : `
			 RedGL.makeUUID()
		 `,
		 return : 'int'
	 }
	 :DOC*/
	RedGL['makeUUID'] = (function () {
		var UUID = 0;
		return function () {
			return UUID++
		}
	})();
	RedGL.prototype = {
		/**DOC:
		 {
			 title :`setSize`,
			 code: `METHOD`,
			 description : `
				 RedGL Instance의 Canvas 사이즈 설정
				 px, %단위만 입력가능.
			 `,
			 example : `
				 RedGL(document.getElementById('test'), function(v){
					  if(v){
						  // 초기화 성공
						  this.setSize(200,200)
					  }else{
						  // 초기화실패
					  }
				 })
			 `,
			 return : 'void'
		 }
		 :DOC*/
		setSize: (function () {
			var W, H;
			var prevW, prevH;
			var ratio;
			var tCVS;
			prevW = 0, prevH = 0;
			return function (width, height, force) {
				if ( width == undefined ) RedGLUtil.throwFunc('RedGL setSize : width가 입력되지 않았습니다.');
				if ( height == undefined ) RedGLUtil.throwFunc('RedGL setSize : height가 입력되지 않았습니다.');
				W = this['_width'] = width;
				H = this['_height'] = height;
				if ( typeof W != 'number' ) W = (document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth) * parseFloat(W) / 100;
				if ( typeof H != 'number' ) H = window.innerHeight * parseFloat(H) / 100;
				ratio = window['devicePixelRatio'] || 1;
				tCVS = this['_canvas'];
				if ( prevW != W || prevH != H || force ) {
					tCVS.width = W * ratio * this['_renderScale'];
					tCVS.height = H * ratio * this['_renderScale'];
					tCVS.style.width = W;
					tCVS.style.height = H;
					console.log('RedGL canvas setSize : ', this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
					prevW = W;
					prevH = H;
				}
			}
		})()
	};
	/**DOC:
	 {
		 title :`renderScale`,
		 code: `PROPERTY`,
		 description : `
			 기본값 : 1
			 0이하일 경우 0.1로 세팅됨.
			 렌더링시 사용할 적용할 렌더링 스케일
			 size 1024*768, renderScale 0.5 일경우 512 * 389로 렌더링된다
		 `,
		 example : `
		 RedGL(document.getElementById('test'), function (v) {
			 this.renderScale = 0.5 // 기본값 1
		 })
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedGL', 'renderScale', 'number', {
		'min': 0.1,
		'max': 1,
		'callback': function () {
			this.setSize(this['_width'], this['_height'], true);
		}
	});
	Object.freeze(RedGL);
})();