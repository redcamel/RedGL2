"use strict";
var RedShadowManager;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedShadowManager`,
		 description : `
			 RedShadowManager Instance 생성.
			 RedScene 생성시 내부속성으로 자동생성됨.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedShadowManager Instance'
	 }
	 :DOC*/
	RedShadowManager = function (redGL) {
		if ( !(this instanceof RedShadowManager) ) return new RedShadowManager(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedShadowManager : RedGL Instance만 허용됩니다.', redGL);
		this['_UUID'] = RedGL['makeUUID']();
		console.log(this);
	}
	RedShadowManager.prototype = {
		render: (function () {
			var gl;
			var tViewRect, tWorldRect;
			var tDirectionalShadow;
			var tWidth, tHeight
			return function (redGL, redRenderer, tView, time, renderInfo) {
				tDirectionalShadow = this['_directionalShadow']
				//TODO: 개별 쉐도우객체가 렌더를 가져가야함
				if ( tDirectionalShadow ) {
					gl = redGL.gl
					tWorldRect = redRenderer['worldRect']
					tViewRect = tView['_viewRect']
					tWidth = tDirectionalShadow['width']
					tHeight = tDirectionalShadow['height']
					tDirectionalShadow['frameBuffer'].width = tWidth
					tDirectionalShadow['frameBuffer'].height = tHeight
					tDirectionalShadow['frameBuffer'].bind(redGL.gl)
					gl.viewport(0, 0, tWidth, tHeight);
					gl.scissor(0, 0, tWidth, tHeight);
					redRenderer.sceneRender(redGL, tView['scene'], tView['camera'], tView['camera']['orthographicYn'], tDirectionalShadow['_castingList'], time, renderInfo, tDirectionalShadow['_directionalShadowMaterial']);
					tDirectionalShadow['frameBuffer'].unbind(redGL.gl)
					gl.viewport(tViewRect[0], tWorldRect[3] - tViewRect[3] - tViewRect[1], tViewRect[2], tViewRect[3]);
					gl.scissor(tViewRect[0], tWorldRect[3] - tViewRect[3] - tViewRect[1], tViewRect[2], tViewRect[3]);
				}
			}
		})()
	}
	Object.defineProperty(RedShadowManager.prototype, 'directionalShadow', {
		get: function () { return this['_directionalShadow']},
		set: function (v) {
			(v && v instanceof RedDirectionalShadow) || RedGLUtil.throwFunc('RedShadowManager - directionalShadow : RedDirectionalShadow Instance만 허용됩니다.', v);
			this['_directionalShadow'] = v
		}
	})
	Object.freeze(RedShadowManager);
})();