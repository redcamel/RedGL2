"use strict";
var RedGL;
(function () {
    var getGL;
    var setEmptyTextures;
    var doNotPrepareProgram
    /*
     gl 컨텍스트 찾기
     */
    getGL = (function () {
        var CHECK_CONTEXT_LIST, tCheckContextList; // 체크할 리스트
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
            powerPreference: 'high-performance', // default, high-performance, low-power
            failIfMajorPerformanceCaveat: false
        };
        EXT_KEY_LIST = [
            'OES_element_index_uint',
            'OES_standard_derivatives',
            'EXT_texture_filter_anisotropic',
            'WEBGL_compressed_texture_s3tc',
            'WEBGL_debug_renderer_info'
        ];
        // CHECK_CONTEXT_LIST = 'webkit-3d,moz-webgl,3d,experimental-webgl,webgl,webgl2'.split(',');
        CHECK_CONTEXT_LIST = 'webkit-3d,moz-webgl,3d,experimental-webgl,webgl'.split(',');
        tCheckContextList = [];
        return function (canvas, option, targetContext) {
            initOption = JSON.parse(JSON.stringify(OPTION));
            if (option) for (i in option) initOption[i] = option[i];
            if (targetContext) {
                tCheckContextList.length = 0
                tCheckContextList.push(targetContext)
            } else tCheckContextList = CHECK_CONTEXT_LIST.concat();
            i = tCheckContextList.length;
            while (i--) {
                if (tContext = canvas.getContext(tKey = tCheckContextList[i], initOption)) {
                    tContext['glExtension'] = {};
                    EXT_KEY_LIST.forEach(function (extensionKey) {
                        tContext['glExtension'][extensionKey] = tContext.getExtension(extensionKey);
                        if (tContext['glExtension'][extensionKey] && extensionKey == 'WEBGL_debug_renderer_info') {
                            tContext['vendor'] = tContext.getParameter(tContext['glExtension'][extensionKey].UNMASKED_VENDOR_WEBGL);
                            tContext['renderer'] = tContext.getParameter(tContext['glExtension'][extensionKey].UNMASKED_RENDERER_WEBGL)
                        }
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
        i = redGL['detect']['texture']['MAX_COMBINED_TEXTURE_IMAGE_UNITS'];
        src = RedBaseTexture.EMPTY_BASE64;
        emptyTexture = RedBitmapTexture(redGL, src);
        emptyCubeTexture = RedBitmapCubeTexture(redGL, [src, src, src, src, src, src]);
        redGL['_datas']['emptyTexture'] = {
            '2d': emptyTexture,
            '3d': emptyCubeTexture
        };
        // 0번은 2D 텍스쳐 생성용공간
        // 1번은 3D 텍스쳐 생성용공간
        while (i--) {
            if (i == 1) {
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
			 WebGL 초기화를 담당하며, 단일 월드(RedWorld Instance)를 소유한다.
		 `,
		 params : {
			 canvas : [
				 {type:'Canvas Element'}
			 ],
			 callback :[
				 {type:'Function'},
				 `컨텍스트 초기화이후 실행될 콜백`,
				 `리턴인자로 <b>true, false</b>를 반환한다`
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
			 targetContextKey : [
			    {type:'String'},
			    `컨텍스트 키를 명시적으로 지정할 경우 사용`,
			    `입력하지 않을경우 <b>webkit-3d,moz-webgl,3d,experimental-webgl, webgl</b> 중에서 가장 높은 값으로 선택됨`
			 ]
		 },
	     demo : '../example/etc/RedGL.html',
		 example : `
            var canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            // 기초 초기화
            RedGL(
                canvas,
                function(v){
                    // 성공,실패에 따라 v값이 true or false.
                    if(v){
                        // 초기화 성공
                        console.log(this.detect); // 디텍팅정보
                        console.log(this.gl); // webGL context
                        console.log(this.renderScale); // 렌더스케일 (기본값 : 1)
                        this.setSize('100%', '100%'); // 사이즈 설정 : 숫자형, %형 둘다 허용
                    }else{
                        // 초기화실패
                    }
                }
            )
		 `,
		 return : 'RedGL Instance'
	 }
     :DOC*/
    RedGL = function (canvas, callback, option, targetContextKey) {
        if (!(this instanceof RedGL)) return new RedGL(canvas, callback, option, targetContextKey);
        canvas['tagName'] == 'CANVAS' || RedGLUtil.throwFunc('RedGL : Canvas Element만 허용');
        var tGL, self;
        self = this;
        this['_datas'] = {};
        this['_width'] = '100%';
        this['_height'] = '100%';
        this['_renderScale'] = 1;
        this['_viewRect'] = [0, 0, 0, 0];
        //
        this['_canvas'] = canvas;
        /**DOC:
         {
			 code : 'PROPERTY',
			 title :`gl`,
			 description : `
				 생성된 WebGL Context
			 `,
			 return : 'WebGL Context Instance'
		 }
         :DOC*/
        this['gl'] = tGL = getGL(canvas, option, targetContextKey);

        /**DOC:
         {
			 code : 'PROPERTY',
			 title :`detect`,
			 description : `
				 하드웨어 디텍팅 정보
			 `,
			 return : 'RedGLDetect Instance'
		 }
         :DOC*/
        if (tGL) this['detect'] = RedGLDetect(this);
        else return callback ? callback.call(self, tGL ? true : false) : 0;
        //
        this['_UUID'] = RedGL.makeUUID();
        if (RedSystemShaderCode['init']) RedSystemShaderCode.init(self);
        ///////////////////////////////////////
        setEmptyTextures(self, tGL); // 빈텍스쳐를 미리 체워둔다.
        requestAnimationFrame(function () {
            if (!doNotPrepareProgram) {
                // 무거운놈만 먼저 해둘까...
                RedPBRMaterial_System(self);
                RedStandardMaterial(self, self['_datas']['emptyTexture']['2d']);
                RedEnvironmentMaterial(self, null, self['_datas']['emptyTexture']['3d']);
            }
            ///////////////////////////////////////
            //
            window.addEventListener('resize', function () {
                self.setSize(self['_width'], self['_height'])
            });
            self['_mouseEventInfo'] = {
                type: null,
                x: 0,
                y: 0
            };
            [RedGLDetect.BROWSER_INFO.move, RedGLDetect.BROWSER_INFO.down, RedGLDetect.BROWSER_INFO.up].forEach(function (v) {
                self['_canvas'].addEventListener(v, function (e) {
                    e.preventDefault()
                    if (RedGLDetect.BROWSER_INFO.isMobile) {
                        if (e.changedTouches[0]) {
                            self['_mouseEventInfo'] = {
                                type: e.type,
                                x: e.changedTouches[0].clientX * window.devicePixelRatio,
                                y: e.changedTouches[0].clientY * window.devicePixelRatio
                            }
                        }
                    }
                    else {
                        self['_mouseEventInfo'] = {
                            type: e.type,
                            x: e.x,
                            y: e.y
                        }
                    }
                }, false)
            });

            self.setSize(self['_width'], self['_height']); // 리사이즈를 초기에 한번 실행.

            callback ? callback.call(self, tGL ? true : false) : 0; // 콜백이 있으면 실행
            //
        });
        console.log(this)
    };
    /**DOC:
     {
		 code : 'STATIC METHOD',
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
			 params : {
			    width : [
			        { type : 'Number or %' }
			    ],
			    height : [
			        { type : 'Number or %' }
			    ]
			 },
			 return : 'void'
		 }
         :DOC*/
        setSize: (function () {
            var W, H;
            var prevW, prevH;
            var ratio;
            var tCVS;
            var tW = new Uint32Array(2)
            var tH = new Uint32Array(2)
            prevW = 0, prevH = 0;
            return function (width, height, force) {
                if (width == undefined) RedGLUtil.throwFunc('RedGL setSize : width가 입력되지 않았습니다.');
                if (height == undefined) RedGLUtil.throwFunc('RedGL setSize : height가 입력되지 않았습니다.');
                W = this['_width'] = width;
                H = this['_height'] = height;
                if (window['HTMLCanvasElement']) {
                    if (typeof W != 'number') {
                        if (W.indexOf('%') > -1) W = (document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth) * parseFloat(W) / 100;
                        else RedGLUtil.throwFunc('RedGL setSize : width는 0이상의 숫자나 %만 허용.', W);
                    }
                    if (typeof H != 'number') {
                        if (H.indexOf('%') > -1) H = window.innerHeight * parseFloat(H) / 100;
                        else RedGLUtil.throwFunc('RedGL setSize : height는 0이상의 숫자나 %만 허용.', H);
                    }
                    ratio = window['devicePixelRatio'] || 1;
                    tCVS = this['_canvas'];
                    if (prevW != W || prevH != H || force) {
                        tCVS.width = W * ratio * this['_renderScale'];
                        tCVS.height = H * ratio * this['_renderScale'];
                        tCVS.style.width = W+'px';
                        tCVS.style.height = H+'px';
                        console.log('RedGL canvas setSize : ', this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
                        prevW = W;
                        prevH = H;
                    }
                    this['_viewRect'][2] = prevW;
                    this['_viewRect'][3] = prevH;
                } else {
                    W = this['_width'] = width
                    H = this['_height'] = height
                    tW[0] = W * this['_renderScale']
                    tH[0] = H * this['_renderScale']
                    console.log('offscreen - RedGL canvas setSize : ', this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
                    this['_viewRect'][2] = W;
                    this['_viewRect'][3] = H
                }
            }
        })()
    };
    /**DOC:
     {
		 title :`renderScale`,
		 code: `PROPERTY`,
		 description : `
			 렌더링시 사용할 적용할 렌더링 스케일.
			 기본값 : 1.
			 0이하일 경우 0.1로 세팅됨.
			 size 1024*768, renderScale 0.5 일경우 512 * 389로 렌더링 됨.
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
    RedGL.setDoNotPrepareProgram = function () {
        doNotPrepareProgram = true
    }
    Object.freeze(RedGL);
})();