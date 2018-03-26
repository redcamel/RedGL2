"use strict";
var RedGL;
(function () {
    var getGL;
    var redGLDetect;
    var glInitialize;
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
            while (i--) if (t0 = canvas.getContext(t1 = checkList[i], initOption)) return t0['version'] = t1, t0;
            return null;
        }
    })();
    glInitialize = function (gl) {
        // 뎁스데스티 설정
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL)
        // 컬링 페이스 설정
        gl.frontFace(gl.CCW)
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK)
        gl.enable(gl.SCISSOR_TEST);
        // 블렌드모드설정
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        // 픽셀 블렌딩 결정
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        // 픽셀 플립 기본설정
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    }
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
                    <pre>
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
                    </pre>
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

        this['canvas'] = canvas;
        /**DOC:
		{
            title :`renderScale`,
            code: `PROPERTY`,
            description : `
                기본값 : 1
                렌더링시 사용할 적용할 렌더링 스케일                
                size 1024*768, renderScale 0.5 일경우 512 * 389로 렌더링된다
			`,
			return : 'void'
		}
	    :DOC*/
        Object.defineProperty(this, 'renderScale', {
            get: function () { return _renderScale },
            set: function (v) {
                _renderScale = v
                this.setSize(this['_width'], this['_height'])
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
			return : 'void'
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
        this['_width'] = 500;
        this['_height'] = 500;
        this['gl'] = _tGL = getGL(canvas);
        if (_tGL) this['_detect'] = redGLDetect(_tGL, option);
        this['_datas'] = {};
        this['_UUID'] = RedGL['makeUUID']();
        ////
        glInitialize(_tGL);
        requestAnimationFrame(function (v) {
            callback ? callback.call(_self, _tGL ? true : false) : 0;
            window.addEventListener('resize', function () { _self.setSize(_self['_width'], _self['_height']) });
            _self.setSize(_self['_width'], _self['_height']);
        });
        console.log(this)
    };
    /**DOC:
        {
            constructorYn : true,
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
            code: `FUNCTION`,
            description : `
                RedGL Instance의 Canvas 사이즈 설정
                fullMode 속성이 false일때만 적용.
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
            return function (width, height) {
                if (this.fullMode) {
                    W = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
                    H = window.innerHeight;
                } else {
                    if (width == undefined) RedGLUtil.throwFunc('RedGL : width가 입력되지 않았습니다.')
                    if (height == undefined) RedGLUtil.throwFunc('RedGL : height가 입력되지 않았습니다.')
                    this['_width'] = W = width;
                    this['_height'] = H = height;
                }

                ratio = window.devicePixelRatio || 1;
                tCanvas = this.canvas;
                if (prevW != W || prevH != H) {
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