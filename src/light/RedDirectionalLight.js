"use strict";
var RedDirectionalLight;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedDirectionalLight`,
		 description : `
			 RedDirectionalLight Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 hex : [
				 {type:'hex'}
			 ],
			 alpha : [
				 {type:'number'},
				 '알파값'
			 ]
		 },
		 example: `
			 RedDirectionalLight(RedGL Instance, hex, alpha)
		 `,
		 return : 'RedDirectionalLight Instance'
	 }
	 :DOC*/
	RedDirectionalLight = function (redGL, hexColor, alpha) {
		if ( !(this instanceof RedDirectionalLight) ) return new RedDirectionalLight(redGL, hexColor, alpha);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedDirectionalLight : RedGL Instance만 허용됩니다.', '입력값 : ' + redGL);
		// 유니폼 프로퍼티
		this['_lightColor'] = new Float32Array(4);
		// 일반 프로퍼티
		this['intensity'] = 1;
		this['alpha'] = alpha == undefined ? 1 : alpha;
		this['color'] = hexColor ? hexColor : '#fff';
		/**DOC:
		 {
			 title :`x`,
			 description : `
			 기본값 : 0
			 포지션값은 광원계산시 0,0,0을 바라보는 방향벡터로 계산됨
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['x'] = 0;
		/**DOC:
		 {
			 title :`y`,
			 description : `
			 기본값 : 0
			 포지션값은 광원계산시 0,0,0을 바라보는 방향벡터로 계산됨
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['y'] = -1;
		/**DOC:
		 {
			 title :`z`,
			 description : `
			 기본값 : 0
			 포지션값은 광원계산시 0,0,0을 바라보는 방향벡터로 계산됨
			 `,
			 return : 'Number'
		 }
		 :DOC*/
		this['z'] = 0;
		this['_UUID'] = RedGL.makeUUID();
		/**DOC:
		 {
			 title :`debug`,
			 description : `디버그오브젝트 활성화 여부`,
			 return : 'Boolean'
		 }
		 :DOC*/
		this['debug'] = false;
		this['_debugObject'] = RedSprite3D(
			redGL,
			RedBitmapMaterial(
				redGL,
				RedBitmapTexture(
					redGL,
					'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozQjcyMEREMTUyMDYxMUU4OTRDNTgzQTBBMEY2MkFFNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDODA1NTI0RjUyMDYxMUU4QkVBQTg3NjZCN0M1OUI2OCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDODA1NTI0RTUyMDYxMUU4QkVBQTg3NjZCN0M1OUI2OCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNmFjYmZjZi05YjBkLThlNGItODZiNy1kNWViYWNjZDg4OGMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0I3MjBERDE1MjA2MTFFODk0QzU4M0EwQTBGNjJBRTQiLz4gPC9yZGY6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'
				)
			)
		);
		console.log(this);
	};
	/**DOC:
	 {
		 title :`RedDirectionalLight.type`,
		 code : 'CONST',
		 description : `RedDirectionalLight 타입상수`,
		 return : 'String'
	 }
	 :DOC*/
	RedDirectionalLight['TYPE'] = 'RedDirectionalLight';
	RedDirectionalLight.prototype = new RedBaseLight();
	/**DOC:
	 {
		 title :`type`,
		 description : `RedDirectionalLight['TYPE']`,
		 return : 'String'
	 }
	 :DOC*/
	Object.defineProperty(RedDirectionalLight.prototype, 'TYPE', {
		configurable: false,
		writable: false,
		value: RedDirectionalLight['TYPE']
	});
	Object.freeze(RedDirectionalLight);
})();