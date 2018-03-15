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
