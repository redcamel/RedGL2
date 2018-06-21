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
			var tShadow;
			var tWidth, tHeight
			return function (redGL, redRenderer, tView, time, renderInfo) {
				tShadow = this['_directionalShadow']

				if ( tShadow ) {
					gl = redGL.gl
					gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
					tWorldRect = redRenderer['worldRect']
					tViewRect = tView['_viewRect']
					tWidth = tShadow['width']
					tHeight = tShadow['height']
					tShadow['frameBuffer'].width = tWidth
					tShadow['frameBuffer'].height = tHeight
					tShadow['frameBuffer'].bind(redGL.gl)
					gl.viewport(0, 0, tWidth, tHeight);
					gl.scissor(0, 0, tWidth, tHeight);
					redRenderer.sceneRender(redGL, redGL.gl, tView['camera']['orthographicYn'], tShadow['_castingList'], time, renderInfo, tShadow['_directionalShadowMaterial']);
					tShadow['frameBuffer'].unbind(redGL.gl)
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