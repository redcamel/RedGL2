/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.5.2 15:37
 */

"use strict";
var RedMirrorManager;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedMirrorManager`,
		 description : `
			 RedMirrorManager Instance 생성.
			 RedScene 생성시 내부속성으로 자동생성됨.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedMirrorManager Instance'
	 }
	 :DOC*/
	RedMirrorManager = function (redGL) {
		if (!(this instanceof RedMirrorManager)) return new RedMirrorManager(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedMirrorManager : RedGL Instance만 허용.', redGL);
		this['_UUID'] = RedGL.makeUUID();
		console.log(this);
	};
	RedMirrorManager.prototype = {
		mirrorList: [],
		render: (function () {
			return function (redGL, redRenderer, tView, time, tRenderInfo, updateSystemUniform) {
				this.mirrorList.forEach(function (v) {
					v.render(redGL, redRenderer, tView, tView.scene.children, time, tRenderInfo, updateSystemUniform)
				})
			}
		})()
	};
	Object.freeze(RedMirrorManager);
})();