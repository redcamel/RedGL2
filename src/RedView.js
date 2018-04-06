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
                '기존에 존재하는 키일경우 <b>캐쉬된 Instance</b>를 반환'
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
        if (ViewMap[key]) {
            if (scene || camera) RedGLUtil.throwFunc(key, '는 이미 생성된 RedView key입니다.')
            else return ViewMap[key]
        }
        if (!(this instanceof RedView)) return new RedView(key, scene, camera);
        if (!(typeof key == 'string')) RedGLUtil.throwFunc('key : 문자열만 허용')
        if (!scene && !camera) RedGLUtil.throwFunc('존재하지 않는 key입니다.')
        if (scene && !(scene instanceof RedScene)) RedGLUtil.throwFunc('RedScene Instance만 허용')
        if (camera && !(camera instanceof RedCamera)) RedGLUtil.throwFunc('RedCamera Instance만 허용')
        /**DOC:
           {
               title :`key`,
               description : `고유키`,
               return : 'String'
           }
        :DOC*/
        this['key'] = key;
        /**DOC:
           {
               title :`scene`,
               description : `scene`,
               return : 'RedScene'
           }
        :DOC*/
        this['scene'] = scene;
        /**DOC:
           {
               title :`camera`,
               description : `camera`,
               return : 'RedCamera'
           }
        :DOC*/
        this['camera'] = camera;

        this['_width'] = '100%';
        this['_height'] = '100%';
        this['_x'] = 0;
        this['_y'] = 0;
        this['_viewRect'] = [0, 0, 0, 0]
        ViewMap[key] = this;
        Object.seal(this)
    };
    RedView.prototype = {
        /**DOC:
           {
               code : 'FUNCTION',
               title :`setSize`,
               description : `
                    씬의 사이즈를 결정
               `,
               example : `
                    var tWorld, tScene, tCamera;
                    tScene = new RedScene(); // 씬생성
                    tCamera = new RedCamera(); // 카메라생성
                    new RedView('test', tScene, tCamera); // test라는 키값을 가진 RedView 생성
                    RedView('test').setSize(100,100);
                    RedView('test').setSize('50%',100);
               `,
               return : 'void'
           }
       :DOC*/
        setSize: function (w, h) {
            this['_width'] = w != undefined ? w : '100%';
            this['_height'] = h != undefined ? h : '100%';
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
        setLocation: function (x, y) {
            this['_x'] = x != undefined ? x : 0;
            this['_y'] = y != undefined ? y : 0;
        }
    }
    Object.freeze(RedView);
})();
