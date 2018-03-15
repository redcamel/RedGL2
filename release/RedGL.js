"use strict";
var RedBaseContainer;
(function () {
    RedBaseContainer = function () { }
    RedBaseContainer.prototype = {
        addChild: function (v) {
            // TODO:
        },
        removeChild: function (v) {
            // TODO:
        },
        getChildAt: function (v) {
            // TODO: 
        }
    };
    Object.freeze(RedBaseContainer);
})();

"use strict";
var RedCamera;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedCamera`,
        description : `
            RedCamera 인스턴스 생성자.
        `,
        return : 'RedCamera Instance'
    }
	:DOC*/
    RedCamera = function () {
        if (!(this instanceof RedCamera)) return new RedCamera();
        this['_UUID'] = RedGL['makeUUID']();
    };
    RedCamera.prototype = {
    };
    Object.freeze(RedCamera);
})();

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
"use strict";
var RedRenderItem;
(function () {
    var renderItemMap;
    renderItemMap = {};
    /**DOC:
    {
        constructorYn : true,
        title :`RedRenderItem`,
        description : `
            고유 키를 기반으로 <b>RedScene</b>과 <b>RedCamera를</b> 쌍으로 하는 정보를 소유.
            RedWorld가 소유하게 되며 렌더링시 활용하게 된다.
            TODO: 실제 렌더링시 Perspective 계산에 필요한 그려질 크기와 위치를 결정한다.
        `,
        params : {
            key :[
                {type:'String'},
                '고유키',
                '기존에 존재하는 키일경우 <b>캐쉬된 인스턴스</b>를 반환'
            ],
            scene :[
                {type:'RedScene'},
                'RedScene'
            ],
            camera :[
                {type:'RedCamera'},
                'RedCamera'
            ]
        },
        example : `
            var tWorld, tScene, tCamera;
            tScene = new RedScene(); // 씬생성
            tCamera = new RedCamera(); // 카메라생성
            new RedRenderItem('test', tScene, tCamera); // test라는 키값을 가진 RedRenderItem 생성
            new RedRenderItem('test2', tScene, tCamera); // test2라는 키값을 가진 RedRenderItem 생성
        `,
        return : 'RedRenderItem Instance'
    }
	:DOC*/
    RedRenderItem = function (key, scene, camera) {
        if (!(this instanceof RedRenderItem)) return new RedRenderItem(key, scene, camera);
        if (renderItemMap[key]) return renderItemMap[key]
        if (!(typeof key == 'string')) RedGL['throwFunc']('key : 문자열만 허용')
        if (!(scene instanceof RedScene)) RedGL['throwFunc']('RedWorld 인스턴스만 허용')
        if (!(camera instanceof RedCamera)) RedGL['throwFunc']('RedCamera 인스턴스만 허용')
        this['key'] = key;
        this['scene'] = scene;
        this['camera'] = camera;

        this['_width'] = '100%';
        this['_height'] = '100%';
        this['_x'] = 0;
        this['_y'] = 0;
        renderItemMap[key] = this;
        Object.seal(this)
    };
    /**DOC:
        {
            constructorYn : true,
            title :`RedRenderItem.getKeyMap`,
            description : `
                RedRenderItem에 등록된 키맵조회
            `,
            example : `
            var tWorld, tScene, tCamera;
            tScene = new RedScene(); // 씬생성
            tCamera = new RedCamera(); // 카메라생성
            new RedRenderItem('test', tScene, tCamera); // test라는 키값을 가진 RedRenderItem 생성
            new RedRenderItem('test2', tScene, tCamera); // test2라는 키값을 가진 RedRenderItem 생성
            console.log(RedRenderItem['getKeyMap']()) // { test: RedRenderItem, test2: RedRenderItem } 출력
            `,
            return : 'Object'
        }
    :DOC*/
    RedRenderItem['getKeyMap'] = function () { return renderItemMap; }
    /**DOC:
        {
            constructorYn : true,
            title :`RedRenderItem.del`,
            description : `
                key를 통해서 생성된 아이템을 삭제
            `,
            example : `
            var tWorld, tScene, tCamera;
            tScene = new RedScene(); // 씬생성
            tCamera = new RedCamera(); // 카메라생성
            new RedRenderItem('test', tScene, tCamera); // test라는 키값을 가진 RedRenderItem 생성
            new RedRenderItem('test2', tScene, tCamera); // test2라는 키값을 가진 RedRenderItem 생성

            console.log(RedRenderItem['getKeyMap']()) // { test: RedRenderItem, test2: RedRenderItem } 출력
            RedRenderItem.del('test2'); // 삭제
            console.log(RedRenderItem['getKeyMap']()) // { test: RedRenderItem } 출력            
            `,
            return : 'void'
        }
    :DOC*/
    RedRenderItem['del'] = function (key) { delete renderItemMap[key]; }
    RedRenderItem.prototype = {
        /**DOC:
           {
               code : 'FUNCTION',
               title :`setSize`,
               description : `
                   TODO: 씬의 사이즈를 결정
               `,
               example : `
                   // TODO       
               `,
               return : 'void'
           }
       :DOC*/
        setSize: function (w, h) {
            this['_width'] = w ? w : '100%';
            this['_height'] = h ? h : '100%';
        },
        /**DOC:
           {
               code : 'FUNCTION',
               title :`setLocation`,
               description : `
                   TODO:씬의 위치를 결정
               `,
               example : `
                   // TODO       
               `,
               return : 'void'
           }
       :DOC*/
        setLocation: function (x,y) {
            // TODO: 씬의 위치는 결정할 수 있어야한다.(일단은 픽셀 기준)
            this['_x'] = x ? x : 0;
            this['_y'] = y ? y : 0;
        },
        // 월드리사이즈시 발동될 내부 매서드
        // TODO: 위치와 사이즈를 계산한다.(%인경우)
        _resize: function () {

        }
    }
    Object.freeze(RedRenderItem);
})();

"use strict";
var RedWorld;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedWorld`,
        description : `
            RedWorld 인스턴스 생성자.
            RedWorld는 RedRenderItem를 소유하며 이는 렌더리스트로서 작동한다.. 
        `,
        params : {
            key :[
                {type:'String'},
                '고유키'
            ]
        },
        example : `
            // TODO       
        `,
        return : 'RedWorld Instance'
    }
	:DOC*/
    RedWorld = function () {
        if (!(this instanceof RedWorld)) return new RedWorld();
        this['_renderList'] = [];
        this['_renderMap'] = {};
        this['_UUID'] = RedGL['makeUUID']();
        Object.seal(this)
    };
    RedWorld.prototype = {
        /**DOC:
            {
                code:`FUNCTION`,
                title :`render`,
                description : `
                    등록된 RedRenderItem을 기반으로 렌더링을 실행함
                `,
                return : 'void'
            }
        :DOC*/
        render: (function () {
            var worldRect;
            var valueParser;
            // 숫자면 숫자로 %면 월드대비 수치로 변경해줌
            valueParser = function (rect) {
                rect.forEach(function (v, index) {
                    if (typeof v == 'number') worldRect[index] = v;
                    else worldRect[index] *= parseFloat(v) / 100;
                })
                return rect;
            }
            return function () {
                worldRect = [0, 0, document.body.clientWidth, document.body.clientHeight];
                console.log('--렌더시작')
                this['_renderList'].forEach(function (v) {
                    // 렌더할 사이즈와 위치 정보를 생성하고
                    console.log("render", v['key'], v['_x'], v['_y'], v['_width'], v['_height'])
                    console.log(valueParser(worldRect))
                    // TODO: 카메라 퍼스펙티브를 먹여준뒤..
                    // TODO: 씬의 자식들을 렌더링한다.
                })
                console.log('--렌더종료')
            }
        })(),
        /**DOC:
            {
                code:`FUNCTION`,
                title :`addRenderItem`,
                description : `
                    렌더정보 추가.
                    정상처리된다면 내부적으로 <b>RedRenderItem</b>이 생성됨.
                `,
                params : {
                    renderItem :[
                        {type:'RedRenderItem'},
                        '추가할 RedRenderItem Instance'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'RedWorld Instance'
            }
        :DOC*/
        addRenderItem: function (renderItem) {
            if (!(renderItem instanceof RedRenderItem)) RedGL['throwFunc']('RedRenderItem 인스턴스만 허용함.')
            this['_renderMap'][renderItem['key']] = renderItem;
            this['_renderList'].push(renderItem);
            return this;
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`getRenderItem`,
                description : `고유키 기반 렌더정보 검색`,
                params : {
                    key :[
                        {type:'String'},
                        '고유키'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'RedRenderItem'
            }
        :DOC*/
        getRenderItem: function (key) {
            return this['_renderMap'][key]
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`delRenderItem`,
                description : `렌더정보 삭제`,
                params : {
                    key :[
                        {type:'String'},
                        '고유키'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'RedWorld Instance'
            }
        :DOC*/
        delRenderItem: function (key) {
            var t0, t1
            if (t0 = this['_renderMap'][key]) {
                t1 = this['_renderList'].indexOf(t0);
                this['_renderList'].splice(t1, 1)
                delete this['_renderMap'][key]
            }
            return this;
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`hasRenderItem`,
                description : `고유키 기반 렌더정보 존재여부`,
                params : {
                    key :[
                        {type:'String'},
                        '고유키'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'Boolean'
            }
        :DOC*/
        hasRenderItem: function (key) {
            return this['_renderMap'][key] ? true : false
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`getRenderItemList`,
                description : `고유키 기반 렌더정보 검색`,
                params : {
                    key :[
                        {type:'String'},
                        '고유키'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'Array'
            }
        :DOC*/
        getRenderItemList: function () {
            return this['_renderList'].concat();
        }
    };
    Object.freeze(RedWorld);
})();

"use strict";
var RedScene;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedScene`,
        description : `
            RedScene 인스턴스 생성자.
        `,
        return : 'RedScene Instance'
    }
	:DOC*/
    RedScene = function () {
        if (!(this instanceof RedScene)) return new RedScene();
        this['children'] = []
        this['_UUID'] = RedGL['makeUUID']();
        Object.seal(this)
    };
    RedScene.prototype = {};
    RedGL['extendsProto'](RedScene, RedBaseContainer)
    Object.freeze(RedScene);
})();
