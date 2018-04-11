"use strict";
var RedGL;
(function () {
    var getGL;
    var redGLDetect;
    /*
        webgl 관련 디텍팅
    */
    redGLDetect = (function () {
        var checkList, i, k;
        return function (gl) {
            if (!(this instanceof redGLDetect)) return new redGLDetect(gl)
            checkList = (
                'VENDOR,VERSION,SHADING_LANGUAGE_VERSION,RENDERER,MAX_VERTEX_ATTRIBS,MAX_VARYING_VECTORS,MAX_VERTEX_UNIFORM_VECTORS,' +
                'MAX_VERTEX_TEXTURE_IMAGE_UNITS,MAX_FRAGMENT_UNIFORM_VECTORS,MAX_TEXTURE_SIZE,MAX_CUBE_MAP_TEXTURE_SIZE,' +
                'MAX_COMBINED_TEXTURE_IMAGE_UNITS,MAX_TEXTURE_IMAGE_UNITS,MAX_RENDERBUFFER_SIZE,MAX_VIEWPORT_DIMS,' +
                'RED_BITS,GREEN_BITS,BLUE_BITS,ALPHA_BITS,DEPTH_BITS,STENCIL_BITS'
            ).split(',');
            i = checkList.length
            while (i--) this[k = checkList[i]] = gl.getParameter(gl[k]);
        }
    })();
    /*
        gl 컨텍스트 찾기
    */
    getGL = (function () {
        var checkList; // 체크할 리스트
        var OPTION; // 기본초기화 옵션 리스트
        var t0, t1, i;
        var initOption;
        OPTION = {
            alpha: false,
            depth: true,
            stencil: false,
            antialias: true,
            premultipliedAlpha: false,
            preserveDrawingBuffer: false,
            powerPreference: 'default', // default, high-performance, low-power
            failIfMajorPerformanceCaveat: false
        }
        // checkList = 'webkit-3d,moz-webgl,3d,experimental-webgl,webgl,webgl2'.split(',')
        checkList = 'webkit-3d,moz-webgl,3d,experimental-webgl,webgl'.split(',')
        return function (canvas, option) {
            initOption = JSON.parse(JSON.stringify(OPTION));
            i = checkList.length;
            if (option) for (i in option) initOption[i] = option[i];
            while (i--) if (t0 = canvas.getContext(t1 = checkList[i], initOption)) {
                var ext
                t0['OES_element_index_uint'] = t0.getExtension('OES_element_index_uint');
                t0['EXT_texture_filter_anisotropic'] = t0.getExtension('EXT_texture_filter_anisotropic');
                console.log('확장여부 OES_element_index_uint :', t0['OES_element_index_uint'])
                console.log('확장여부 EXT_texture_filter_anisotropic :', t0['EXT_texture_filter_anisotropic'])
                return t0['version'] = t1, t0;
            }
            return null;
        }
    })();
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
        var _tGL, _self;
        var _fullMode, _renderScale;
        if (!(this instanceof RedGL)) return new RedGL(canvas, callback);
        if (!(canvas instanceof Element) || (canvas['tagName'] != 'CANVAS')) RedGLUtil.throwFunc('RedGL : Canvas Element만 허용');

        _self = this;
        _fullMode = true;
        _renderScale = 1;

        /**DOC:
		{
            title :`renderScale`,
            code: `PROPERTY`,
            description : `
                기본값 : 1
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
        Object.defineProperty(this, 'renderScale', {
            get: function () { return _renderScale },
            set: function (v) {
                _renderScale = v
                this.setSize(this['_width'], this['_height'], true)
            }
        });
        /**DOC:
		{
            title :`fullMode`,
            code: `PROPERTY`,
            description : `
                기본값 : true
                캔버스크기를 화면 전체사이즈로 설정할지 여부
            `,
            example : `
            RedGL(document.getElementById('test'), function (v) {
                this.fullMode = false // 기본값 true
            })
            `,
			return : 'Boolean'
		}
	    :DOC*/
        Object.defineProperty(this, 'fullMode', {
            get: function () { return _fullMode },
            set: function (v) {
                if (typeof v != 'boolean') RedGLUtil.throwFunc('RedGL : Boolean만 가능.')
                _fullMode = v
                this.setSize(this['_width'], this['_height'])
            }
        });        
        this['_canvas'] = canvas;
        this['_width'] = 500;
        this['_height'] = 500;
        this['gl'] = _tGL = getGL(canvas);
        if (_tGL) this['_detect'] = redGLDetect(_tGL, option);
        this['_datas'] = {};
        this['_UUID'] = RedGL['makeUUID']();
        ////
        requestAnimationFrame(function (v) {
            window.addEventListener('resize', function () { _self.setSize(_self['_width'], _self['_height']) });
            _self.setSize(_self['_width'], _self['_height']);
            callback ? callback.call(_self, _tGL ? true : false) : 0;
            // 빈텍스쳐를 미리 체워둔다.
            var t0, t1;
            var i = _self['_detect']['MAX_COMBINED_TEXTURE_IMAGE_UNITS']
            var src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzMxRDhBQzRFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzMxRDhBQzVFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MzFEOEFDMkU1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MzFEOEFDM0U1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuojYFUAAAAQSURBVHjaYvj//z8DQIABAAj8Av7bok0WAAAAAElFTkSuQmCC'
            t0 = RedBitmapTexture(_self, src)
            t1 = RedBitmapCubeTexture(_self, [src, src, src, src, src, src])
            _self['_datas']['emptyTexture'] = {
                '2d': t0,
                '3d': t1
            }
            while (i--) {
                // 0번은 2D 공백텍스쳐로 사용할예정
                // 1번은 3D 공백텍스쳐로 사용할예정
                if (i != 1) {
                    _tGL.activeTexture(_tGL.TEXTURE0 + i)
                    _tGL.bindTexture(_tGL.TEXTURE_2D, t0['webglTexture'])
                } else {
                    _tGL.activeTexture(_tGL.TEXTURE0 + 1)
                    _tGL.bindTexture(_tGL.TEXTURE_CUBE_MAP, t1['webglTexture'])
                }
            }
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
                // 기초 초기화
                RedGL.makeUUID()
            `,
            return : 'int'
        }
    :DOC*/
    RedGL['makeUUID'] = (function () {
        var UUID = 0
        return function () { return UUID++ }
    })();
    RedGL.prototype = {
        /**DOC:
        {
            title :`setSize`,
            code: `METHOD`,
            description : `
                RedGL Instance의 Canvas 사이즈 설정
                fullMode 속성이 false일때만 적용.
                px 단위만 입력가능.
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
            var prevW, prevH
            var ratio;
            var tCanvas;
            prevW = 0, prevH = 0;
            return function (width, height, force) {
                if (this.fullMode) {
                    W = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
                    H = window.innerHeight;
                } else {
                    if (width == undefined) RedGLUtil.throwFunc('RedGL setSize : width가 입력되지 않았습니다.')
                    if (height == undefined) RedGLUtil.throwFunc('RedGL setSize : height가 입력되지 않았습니다.')
                    if (typeof width == 'string' && width.indexOf('%') != -1) RedGLUtil.throwFunc('RedGL setSize : width는 %로 입력할수 없음.')
                    if (typeof height == 'string' && height.indexOf('%') != -1) RedGLUtil.throwFunc('RedGL setSize: height는 %로 입력할수 없음.')
                    this['_width'] = W = width;
                    this['_height'] = H = height;
                }

                ratio = window.devicePixelRatio || 1;
                tCanvas = this['_canvas'];
                if (prevW != W || prevH != H || force) {
                    tCanvas.width = W * ratio * this.renderScale;
                    tCanvas.height = H * ratio * this.renderScale;
                    tCanvas.style.width = W;
                    tCanvas.style.height = H;
                    console.log('RedGL canvas setSize : ', this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
                    prevW = W;
                    prevH = H;
                }
            }
        })()
    };
    Object.freeze(RedGL);
})();