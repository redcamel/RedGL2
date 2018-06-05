"use strict";
var RedPostEffectManager;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffectManager`,
		 description : `
			 RedPostEffectManager Instance 생성.
			 RedScene 생성시 내부속성으로 자동생성됨.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffectManager Instance'
	 }
	 :DOC*/
	RedPostEffectManager = function (redGL) {
		if ( !(this instanceof RedPostEffectManager) ) return new RedPostEffectManager(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffectManager : RedGL Instance만 허용됩니다.', redGL);
		var quad;
		/**DOC:
		 {
			title :`frameBuffer`,
			code : 'PROPERTY',
			description : `
				이펙트 렌더링시 사용될 프레임버퍼
			`,
			return : 'RedFrameBuffer Instance'
		}
		 :DOC*/
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['_finalMaterial'] = RedPostEffectMaterial(redGL, this['frameBuffer']['texture']);
		/**DOC:
		 {
			title :`postEffectList`,
			code : 'PROPERTY',
			description : `
				이펙트 리스트
			`,
			return : 'Array'
		}
		 :DOC*/
		this['postEffectList'] = [];
		/**DOC:
		 {
			title :`antialiasing`,
			code : 'PROPERTY',
			description : `
				안티알리어싱 설정
				현재는 RedPostEffect_FXAA만 등록가능
			`,
			return : 'Array'
		}
		 :DOC*/
		Object.defineProperty(this, 'antialiasing', (function () {
			var _v = undefined
			return {
				get: function () { return _v },
				set: function (v) {
					if ( v ) v instanceof RedPostEffect_FXAA || RedGLUtil.throwFunc('RedPostEffectManager : antialiasing - RedPostEffect_FXAA Instance만 허용됩니다.', '입력값 : ' + v)
					_v = v
				}
			}
		})())
		this['antialiasing'] = undefined
		quad = RedMesh(redGL, RedPlane(redGL), this['_finalMaterial']);
		quad['useCullFace'] = false;
		this['children'] = [quad];
		this['_UUID'] = RedGL['makeUUID']();
		console.log(this);
	}
	RedPostEffectManager.prototype = {
		/**DOC:
		 {
			title :`addEffect`,
			code : 'METHOD',
			description : `
				postEffect 추가
			`,
			params : {
				postEffect : [
					{type:'PostEffect Instance'}
				]
			},
			return : 'void'
		}
		 :DOC*/
		addEffect: function (postEffect) {
			postEffect instanceof RedBaseMaterial || RedGLUtil.throwFunc('RedPostEffectManager : addEffect - RedBaseMaterial Instance만 허용.', '입력값 : ' + postEffect);
			this['postEffectList'].push(postEffect)
		},
		/**DOC:
		 {
			title :`removeEffect`,
			code : 'METHOD',
			description : `
				postEffect 제거
			`,
			params : {
				postEffect : [
					{type:'PostEffect Instance'}
				]
			},
			return : 'void'
		}
		 :DOC*/
		removeEffect: (function () {
			var t0;
			return function (postEffect) {
				t0 = this['postEffectList'].indexOf(postEffect);
				if ( t0 != -1 ) this['postEffectList'].splice(t0, 1);
			}
		})(),
		/**DOC:
		 {
			title :`removeAllEffect`,
			code : 'METHOD',
			description : `
				모든 postEffect 제거
			`,
			return : 'void'
		}
		 :DOC*/
		removeAllEffect: function () {
			this['postEffectList'].length = 0
		},
		/**DOC:
		 {
			title :`bind`,
			code : 'METHOD',
			description : `
				프레임 버퍼 바인딩.
				렌더러에서 자동호출됨.
			`,
			params : {
				gl : [
					{type:'WebGL Context'}
				]
			},
			return : 'void'
		}
		 :DOC*/
		bind: function (gl) { this['frameBuffer'].bind(gl); },
		/**DOC:
		 {
			title :`unbind`,
			code : 'METHOD',
			description : `
				프레임 버퍼 언바인딩.
				렌더러에서 자동호출됨.
			`,
			params : {
				gl : [
					{type:'WebGL Context'}
				]
			},
			return : 'void'
		}
		 :DOC*/
		unbind: function (gl) { this['frameBuffer'].unbind(gl); }
	}
	Object.freeze(RedPostEffectManager);
})();