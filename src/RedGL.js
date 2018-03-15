"use strict";
var RedGL;
(function () {
    var throwFunc;
    var getGL;
    var redGLDetect;
    var makeUUID;
    throwFunc = function (v) { throw v };
    makeUUID = (function () {
        var UUID = 0
        return function () {
            return UUID++
        }
    })();

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
        checkList = 'webkit-3d,moz-webgl,3d,experimental-webgl,webgl,webgl2'.split(',')
        return function (canvas, option) {
            initOption = JSON.parse(JSON.stringify(OPTION));
            i = checkList.length;
            if (option) for (i in option) initOption[i] = option[i];
            while (i--) if (t0 = canvas.getContext(t1 = checkList[i], initOption)) return t0['mode'] = t1, t0;
            return null;
        }
    })();
    /**DOC:
		{
			constructorYn : true,
			title :`RedGL`,
            description : `
                RedGL 인스턴스 생성자.
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
                })
			`,
			return : 'RedGL Instance'
		}
	:DOC*/
    RedGL = function (canvas, callback, option) {
        var tGL;
        var self;
        if (!(this instanceof RedGL)) return new RedGL(canvas, callback);
        if (!(canvas instanceof Element) || (canvas['tagName'] != 'CANVAS')) throwFunc('캔버스 엘리먼트만 허용됩니다.');

        self = this;
        this['gl'] = tGL = getGL(canvas);

        if (tGL) this['_detect'] = redGLDetect(tGL, option);
        this['_datas'] = {};
        this['_UUID'] = RedGL['makeUUID']();

        requestAnimationFrame(function (v) {
            callback ? callback.call(self, tGL ? true : false) : 0;
        });
    };
    RedGL['throwFunc'] = throwFunc;
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
    RedGL['makeUUID'] = makeUUID;
    RedGL['extendsProto'] = function(target,from){
        for (var k in from.prototype) target.prototype[k] = from.prototype[k]
    };
    RedGL.prototype = {};
    Object.defineProperties(RedGL.prototype, {
        'world': {
            set: function (v) {
                if (!(v instanceof RedWorld)) throwFunc('RedWorld 인스턴스만 허용');
                this['_world'] = v;

            },
            get: function () { return this['_world'] }
        }
    })

    Object.freeze(RedGL);
})();