/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.5.2 12:37
 */

"use strict";
var RedMouseEventManager;
(function () {
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedMouseEventManager`,
		 description : `
			 RedMouseEventManager Instance 생성.
			 RedScene 생성시 내부속성으로 자동생성됨.
			 시스템적으로 사용됨.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedMouseEventManager Instance'
	 }
	 :DOC*/
	RedMouseEventManager = function (redGL) {
		if (!(this instanceof RedMouseEventManager)) return new RedMouseEventManager(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedMouseEventManager : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['_mouseEventMaterial'] = RedMouseEventMaterial(redGL);
		this['_mouseEventListObject'] = {};
		this['_mouseEventList'] = [];
		this['_prevInfo'] = {};
		this['_UUID'] = RedGL.makeUUID();
		console.log(this);
	};
	RedMouseEventManager.prototype = {
		add: function (target, type, handler) {
			var key = target['_mouseColorID'];
			if (!this['_mouseEventListObject'][key]) {
				this['_mouseEventListObject'][key] = {target: target};
				this['_mouseEventList'].push(target)
			}
			this['_mouseEventListObject'][key][type] = handler
			// console.log(this['_mouseEventListObject'])
		},
		remove: function (target, type) {
			var key = target['_mouseColorID'];
			if (this['_mouseEventListObject'][key]) {
				var test = 0;
				if (this['_mouseEventListObject'][key][type]) {
					delete this['_mouseEventListObject'][key][type]
				}
				for (var k in this['_mouseEventListObject'][key]) test++;
				if (test === 1) {
					var t0 = this['_mouseEventList'].indexOf(target);
					if (t0 > -1) {
						this['_mouseEventList'].splice(t0, 1);
						delete this['_mouseEventListObject'][key]
					}
				}
			}
		},
		render: (function () {
			var gl;
			var tViewRect, tWorldRect;
			var tWidth, tHeight;
			var pixelValues = new Uint8Array(4);
			var renderScale = 1;
			var fireList = [];
			var cursorState = 'default';
			var fireEvent = function () {
				if (fireList.length) {
					var v = fireList.shift();
					v['info'][v['type']].call(v['info']['target'], {
						target: v['info']['target'],
						type: 'out'
					})
				}

			};
			return function (redGL, redRenderer, tView, time, renderInfo, clearListYn) {

				if (this['_mouseEventList'].length) {
					renderScale = redGL.renderScale * window.devicePixelRatio;
					gl = redGL.gl;
					tWorldRect = redRenderer['worldRect'];
					tViewRect = tView['_viewRect'];
					tWidth = tWorldRect[2];
					tHeight = tWorldRect[3];
					this['frameBuffer'].width = tWidth;
					this['frameBuffer'].height = tHeight;
					this['frameBuffer'].bind(redGL.gl);
					var self = this;
					redRenderer.sceneRender(redGL, tView['scene'], tView['camera'], tView['camera']['mode2DYn'], this['_mouseEventList'], time, renderInfo, this['_mouseEventMaterial']);
					// 추출

					var tMouseEventInfo = redGL['_mouseEventInfo'];
					var i, len;
					var tEventData;
					i = 0;
					len = tMouseEventInfo.length;
					for (i; i < len; i++) {
						tEventData = tMouseEventInfo[i];
						console.log(tEventData);
						gl.readPixels(tEventData.x * renderScale, (tHeight - tEventData.y * renderScale), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixelValues);
						var currentInfo = self['_mouseEventListObject'][pixelValues[0] + ',' + pixelValues[1] + ',' + pixelValues[2] + ',' + pixelValues[3]];

						var tEventType;
						if (currentInfo) {
							var targetUUID = currentInfo['target']['_UUID'];
							if (tEventData['type'] == RedGLDetect.BROWSER_INFO.down) {
								tEventType = 'down';
								console.log('다운');
								if (tEventType && currentInfo[tEventType]) {
									currentInfo[tEventType].call(currentInfo['target'], {
										target: currentInfo['target'],
										type: tEventType,
										nativeEvent: tEventData.nativeEvent
									})
								}
							}
							if (tEventData['type'] == RedGLDetect.BROWSER_INFO.up) {
								tEventType = 'up';
								console.log('업');
								if (tEventType && currentInfo[tEventType]) {
									currentInfo[tEventType].call(currentInfo['target'], {
										target: currentInfo['target'],
										type: tEventType,
										nativeEvent: tEventData.nativeEvent
									})
								}
							}
							if (self['_prevInfo'][tView['_UUID']] && self['_prevInfo'][tView['_UUID']] != currentInfo) {
								tEventType = 'out';
								console.log('아웃');
								if (tEventType && self['_prevInfo'][tView['_UUID']][tEventType]) {
									self['_prevInfo'][tView['_UUID']][tEventType].call(self['_prevInfo'][tView['_UUID']]['target'], {
										target: self['_prevInfo'][tView['_UUID']]['target'],
										type: tEventType
									})
								}
							}
							if (self['_prevInfo'][tView['_UUID']] != currentInfo) {
								tEventType = 'over';
								if (tEventType && currentInfo[tEventType]) {
									currentInfo[tEventType].call(currentInfo['target'], {
										target: currentInfo['target'],
										type: tEventType,
										nativeEvent: tEventData.nativeEvent
									})
								}
								console.log('오버')
							}

							self['_prevInfo'][tView['_UUID']] = currentInfo
						} else {
							tEventType = 'out';
							if (self['_prevInfo'][tView['_UUID']] && self['_prevInfo'][tView['_UUID']][tEventType]) {
								console.log('아웃');
								fireList.push(
									{
										info: self['_prevInfo'][tView['_UUID']],
										type: tEventType,
										nativeEvent: tEventData.nativeEvent
									}
								)
							}
							self['_prevInfo'][tView['_UUID']] = null
						}
						fireEvent()
					}

					if (this['_prevInfo'][tView['_UUID']]) cursorState = 'pointer';
					if (clearListYn) {
						redGL['_mouseEventInfo'].length = 0;
						document.body.style.cursor = cursorState;
						cursorState = 'default'
					}

					this['frameBuffer'].unbind(redGL.gl);


				}
			}
		})
		()
	};
	Object.freeze(RedMouseEventManager);
})
();