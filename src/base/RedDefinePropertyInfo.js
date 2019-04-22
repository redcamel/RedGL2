"use strict";
var RedDefinePropertyInfo;
(function () {
    //TODO: 코드 정리좀 해야함
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedDefinePropertyInfo`,
		 description : `
			 prototype Property 선언기
		 `,
		 return : 'void'
	 }
     :DOC*/
    RedDefinePropertyInfo = {};
    var maker;
    maker = function (targetObject, clsName, keyName, type, option) {
        var result;
        var samplerTypeKey;
        if (targetObject.hasOwnProperty(keyName)) RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : 이미 정의된 속성');
        option = option || {};
        var getterFunc = function () {
            return this['_' + keyName];
        };
        switch (type) {
            case 'hex' :
                result = {
                    get: getterFunc,
                    set: function (v) {
                        typeof v == 'string' || RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' hex 형식만 허용함.', '입력값 : ' + v);
                        RedGLUtil.regHex(v) || RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : hex 형식만 허용함.', '입력값 : ' + v);
                        this['_' + keyName] = v;
                        if (option['callback']) option['callback'].call(this, v);
                    }
                };
                break;
            case 'boolean' :
                result = {
                    get: getterFunc,
                    set: function (v) {
                        if (typeof v != 'boolean') RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : boolean만 허용함.', '입력값 : ' + v);
                        this['_' + keyName] = v;
                        if (option['callback']) option['callback'].call(this, v);
                    }
                };
                break;
            case 'number' :
                var hasMin = option.hasOwnProperty('min');
                var hsaMax = option.hasOwnProperty('max');
                var min = option['min'];
                var max = option['max'];
                result = {
                    get: getterFunc,
                    set: function (v) {
                        if (typeof v != 'number') RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : 숫자만 허용함.', '입력값 : ' + v);
                        if (hasMin && v < min) v = min;
                        if (hsaMax && v > max) v = max;
                        this['_' + keyName] = v;
                        if (option['callback']) option['callback'].call(this, v);
                    }
                };
                break;
            case 'uint' :
                var hasMin = option.hasOwnProperty('min');
                var hsaMax = option.hasOwnProperty('max');
                var min = option['min'];
                var max = option['max'];
                if (hasMin && min < 0) RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : min옵션은 0보다 커야 함.', '입력값 : ' + min);
                if (hsaMax && max < 0) RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : max옵션은 0보다 커야 함.', '입력값 : ' + max);
                if (hasMin && hsaMax && max <= min) RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : max옵션은 min옵션보다 커야 함.', 'min 입력값 : ' + min, 'max 입력값 : ' + max);
                result = {
                    get: function () {
                        return this['_' + keyName];
                    },
                    set: function (v) {
                        if (typeof v != 'number') RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : uint만 허용함.', '입력값 : ' + v);
                        if (hasMin && v < min) v = min;
                        if (hsaMax && v > max) v = max;
                        if (!(v >= 0 && Math.floor(v) == v)) RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : uint만 허용함(소수점은 허용하지 않음).', '입력값 : ' + v);
                        this['_' + keyName] = v;
                        if (option['callback']) option['callback'].call(this, v);
                    }
                };
                break;
            case 'int' :
                var hasMin = option.hasOwnProperty('min');
                var hsaMax = option.hasOwnProperty('max');
                var min = option['min'];
                var max = option['max'];
                if (hasMin && hsaMax && max <= min) RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : max옵션은 min옵션보다 커야 함.', 'min 입력값 : ' + min, 'max 입력값 : ' + max);
                result = {
                    get: getterFunc,
                    set: function (v) {
                        if (typeof v != 'number') RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : int만 허용함.', '입력값 : ' + v);
                        if (hasMin && v < min) v = min;
                        if (hsaMax && v > max) v = max;
                        if (!(Math.floor(v) == v)) RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : int만 허용함(소수점은 허용하지 않음).', '입력값 : ' + v);
                        this['_' + keyName] = v;
                        if (option['callback']) option['callback'].call(this, v);
                    }
                };
                break;
            case 'sampler2D' :
                samplerTypeKey = 'RedBaseTexture';
                break;
            case 'samplerCube' :
                samplerTypeKey = 'RedBitmapCubeTexture';
                break;
            case 'samplerVideo' :
                samplerTypeKey = 'RedVideoTexture';
                break;
            default :
                RedGLUtil.throwFunc(keyName + ' - ' + 'type : ' + type + ' / ' + keyName + ' : 정의할수없는 타입입니다.');
                break;
        }
        if (samplerTypeKey) {
            var samplerCls = window[samplerTypeKey];
            // console.log(samplerTypeKey, samplerCls)
            if (option['essential']) {
                result = {
                    get: getterFunc,
                    set: function (v) {
                        if (samplerCls == RedBitmapCubeTexture) {
                            if (!(v instanceof samplerCls)) RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : ' + samplerTypeKey + ' Instance만 허용.', '입력값 : ' + v);
                        } else {
                            if (v instanceof RedBitmapCubeTexture || !(v instanceof samplerCls)) RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : ' + samplerTypeKey + ' Instance만 허용.', '입력값 : ' + v);
                        }
                        this['_' + keyName] = v;
                        if (option['callback']) option['callback'].call(this);
                    }
                }
            } else {
                result = {
                    get: getterFunc,
                    set: function (v) {
                        if (v) {
                            if (samplerCls == RedBitmapCubeTexture) {
                                if (!(v instanceof samplerCls)) RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : ' + samplerTypeKey + ' Instance만 허용.', '입력값 : ' + v);
                            } else {
                                if (v instanceof RedBitmapCubeTexture || !(v instanceof samplerCls)) RedGLUtil.throwFunc(clsName + ' - ' + keyName + ' : ' + samplerTypeKey + ' Instance만 허용.', '입력값 : ' + v);
                            }
                        }
                        this['_' + keyName] = v;
                        if (option['callback']) option['callback'].call(this);
                    }
                }
            }
        }
        targetObject['_' + keyName] = null;
        Object.defineProperty(targetObject, keyName, result);
    };
    /**DOC:
     {
	     code : 'STATIC METHOD',
		 title :`RedDefinePropertyInfo.definePrototype`,
		 description : `
			 prototype Property 선언기
		 `,
		 params : {
		    clsName : [
		        {type : 'String'},
		        '클래스 명 입력'
		    ],
		    keyName : [
		        {type : 'String'},
		        '선언할 프로퍼티 명 입력'
		    ],
		    type : [
		        {type : 'String'},
		        'hex, boolean, number, sampler2D, samplerCube, samplerVideo 사용가능'
		    ],
		    option : [
	            {type : 'Object'},
	            '타입별 옵션 정의 가능'
		    ]
		 },
		 return : 'void',
		 example : `
		    window['Test'] = function(){};
		    RedDefinePropertyInfo.definePrototype(
                'Test',
                'power',
                'number',
                {
                    min: 0,
                    callback: function(v){
                        console.log(v); // 설정후 추가 행위가 필요할때 사용
                    }
                }
            );
		 `
	 }
     :DOC*/
    RedDefinePropertyInfo['definePrototype'] = function (clsName, keyName, type, option) {
        maker(window[clsName]['prototype'], clsName, keyName, type, option);
    };
    Object.freeze(RedDefinePropertyInfo);
})();
