"use strict";
var RedDirectionalShadow;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedDirectionalShadow`,
		 description : `
			 RedDirectionalShadow Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedDirectionalShadow Instance'
	 }
     :DOC*/
    RedDirectionalShadow = function (redGL, light) {
        if (!(this instanceof RedDirectionalShadow)) return new RedDirectionalShadow(redGL, light);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedDirectionalShadow : RedGL Instance만 허용.', redGL);
        this['_directionalShadowMaterial'] = RedDirectionalShadowMaterial(redGL);
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['light'] = light;
        this['width'] = 2048;
        this['height'] = 2048;
        this['size'] = 20;
        this['_UUID'] = RedGL.makeUUID();
        this['_castingList'] = [];
        console.log(this);
    };
    /**DOC:
     {
		 code:`METHOD`,
		 title :`addCasting`,
		 description : `
			 그림자 케스팅할 오브젝트 추가
		 `,
		 params : {
		    target : [
		        { type : 'RedBaseObject3D' }
		    ]
		 },
	     return : 'void'
	 }
     :DOC*/
    RedDirectionalShadow.prototype['addCasting'] = function (target, reculsive) {
        if (!(target instanceof RedBaseObject3D)) RedGLUtil.throwFunc('addCasting', 'RedBaseObject3D Instance만 가능', '입력값 : ' + target);
        this['_castingList'].push(target)
        var self = this
        if (reculsive) target.children.forEach(function (v) {
            self.addCasting(v, reculsive)
        })

    };
    /**DOC:
     {
		 code:`METHOD`,
		 title :`removeCasting`,
		 description : `
			 캐스팅 제거
		 `,
		 params : {
		    target : [
		        { type : 'RedBaseObject3D' }
		    ]
		 },
		 return : 'void'
	 }
     :DOC*/
    RedDirectionalShadow.prototype['removeCasting'] = (function () {
        var t0;
        return function (v, reculsive) {
            t0 = this['_castingList'].indexOf(v);
            if (t0 == -1) RedGLUtil.throwFunc('removeCasting', '존재하지 않는 대상을 삭제하려고 함');
            else this['_castingList'].splice(t0, 1);
            var self = this
            if (reculsive) target.children.forEach(function (v) {
                self.removeCasting(v, reculsive)
            })
        }
    })();
    /**DOC:
     {
		 code:`PROPERTY`,
		 title :`light`,
		 description : `
			 그림자를 반영할 RedDirectionalLight 지정
		 `,
		 return : 'RedDirectionalLight Instance'
	 }
     :DOC*/
    Object.defineProperty(RedDirectionalShadow.prototype, 'light', {
        get: function () {
            return this['_light']
        },
        set: function (v) {
            (v && v instanceof RedDirectionalLight) || RedGLUtil.throwFunc('RedDirectionalShadow - light : RedDirectionalLight Instance만 허용.', v);
            this['_light'] = v;
        }
    });
    /**DOC:
     {
		 code:`PROPERTY`,
		 title :`width`,
		 description : `
			 프레임버퍼 width
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedDirectionalShadow', 'width', 'number', {'min': 1});
    /**DOC:
     {
		 code:`PROPERTY`,
		 title :`height`,
		 description : `
			 프레임버퍼 height
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedDirectionalShadow', 'height', 'number', {'min': 1});
    /**DOC:
     {
		 code:`PROPERTY`,
		 title :`size`,
		 description : `
			 그림자 영역 크기
		 `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedDirectionalShadow', 'size', 'number', {'min': 1});
    Object.freeze(RedDirectionalShadow);
})();