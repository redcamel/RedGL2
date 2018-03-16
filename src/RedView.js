"use strict";
var RedView;
(function () {
    var ViewMap;
    ViewMap = {};
    /**DOC:
    {
        constructorYn : true,
        title :`RedView`,
        description : `
            고유 키를 기반으로 <b>RedScene</b>과 <b>RedCamera를</b> 쌍으로 하는 정보를 소유.
            RedWorld가 소유하게 되며 렌더링시 활용하게 된다.
            실제 렌더링시 Perspective 계산에 필요한 그려질 크기와 위치를 결정한다.
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
            new RedView('test', tScene, tCamera); // test라는 키값을 가진 RedView 생성
            new RedView('test2', tScene, tCamera); // test2라는 키값을 가진 RedView 생성
        `,
        return : 'RedView Instance'
    }
	:DOC*/
    RedView = function (key, scene, camera) {
        if (ViewMap[key]) return ViewMap[key]
        if (!(this instanceof RedView)) return new RedView(key, scene, camera);
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
        ViewMap[key] = this;
        Object.seal(this)
    };
    /**DOC:
        {
            constructorYn : true,
            title :`RedView.getKeyMap`,
            description : `
                RedView에 등록된 키맵조회
            `,
            example : `
            var tWorld, tScene, tCamera;
            tScene = new RedScene(); // 씬생성
            tCamera = new RedCamera(); // 카메라생성
            new RedView('test', tScene, tCamera); // test라는 키값을 가진 RedView 생성
            new RedView('test2', tScene, tCamera); // test2라는 키값을 가진 RedView 생성
            console.log(RedView['getKeyMap']()) // { test: RedView, test2: RedView } 출력
            `,
            return : 'Object'
        }
    :DOC*/
    RedView['getKeyMap'] = function () { return ViewMap; }
    /**DOC:
        {
            constructorYn : true,
            title :`RedView.del`,
            description : `
                key를 통해서 생성된 아이템을 삭제
            `,
            example : `
            var tWorld, tScene, tCamera;
            tScene = new RedScene(); // 씬생성
            tCamera = new RedCamera(); // 카메라생성
            new RedView('test', tScene, tCamera); // test라는 키값을 가진 RedView 생성
            new RedView('test2', tScene, tCamera); // test2라는 키값을 가진 RedView 생성

            console.log(RedView['getKeyMap']()) // { test: RedView, test2: RedView } 출력
            RedView.del('test2'); // 삭제
            console.log(RedView['getKeyMap']()) // { test: RedView } 출력            
            `,
            return : 'void'
        }
    :DOC*/
    RedView['del'] = function (key) { delete ViewMap[key]; }
    RedView.prototype = {
        /**DOC:
           {
               code : 'FUNCTION',
               title :`setSize`,
               description : `
                    씬의 사이즈를 결정
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
                   씬의 위치를 결정
               `,
               example : `
                   // TODO       
               `,
               return : 'void'
           }
       :DOC*/
        setLocation: function (x,y) {
            this['_x'] = x ? x : 0;
            this['_y'] = y ? y : 0;
        }
    }
    Object.freeze(RedView);
})();
