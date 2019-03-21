"use strict";
var RedMouseEventManager;
(function () {
    /**DOC:
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
        this['_mouseEventMaterial'] = RedMouseEventMaterial(redGL)
        this['_mouseEventListObject'] = {}
        this['_mouseEventList'] = []
        this['_prevInfo'] = null
        this['_UUID'] = RedGL.makeUUID();
        console.log(this);
    };
    RedMouseEventManager.prototype = {
        add: function (target, type, handler) {
            var key = target['_mouseColorID']
            if (!this['_mouseEventListObject'][key]) {
                this['_mouseEventListObject'][key] = {target: target}
                this['_mouseEventList'].push(target)
            }
            this['_mouseEventListObject'][key][type] = handler
            // console.log(this['_mouseEventListObject'])
        },
        remove: function (target, type) {
            var t0 = this['_mouseEventList'].indexOf(target)
            if (t0 > -1) {
                this['_mouseEventList'].splice(t0, 1)
                delete this['_mouseEventListObject'][target['_mouseColorID']]
            }
        },
        render: (function () {
            var gl;
            var tViewRect, tWorldRect;
            var tWidth, tHeight;
            var pixelValues = new Uint8Array(4);
            var renderScale = 1
            var fireList = []
            var fireEvent = function () {
                if (fireList.length) {
                    var v = fireList.pop()
                    v['info'][v['type']].call(v['info']['target'], {
                        target: v['info']['target'],
                        type: v['info']['type']
                    })
                }

            }
            return function (redGL, redRenderer, tView, time, renderInfo) {
                if (this['_mouseEventList'].length) {
                    renderScale = redGL.renderScale;
                    gl = redGL.gl;
                    tWorldRect = redRenderer['worldRect'];
                    tViewRect = tView['_viewRect'];
                    tWidth = tViewRect[2];
                    tHeight = tViewRect[3];
                    this['frameBuffer'].width = tWidth;
                    this['frameBuffer'].height = tHeight;
                    this['frameBuffer'].bind(redGL.gl);
                    redRenderer.sceneRender(redGL, tView['scene'], tView['camera'], tView['camera']['orthographicYn'], this['_mouseEventList'], time, renderInfo, this['_mouseEventMaterial']);
                    // 추출
                    gl.readPixels(redGL['_mouseEventInfo'].x * renderScale, (tViewRect[3] - redGL['_mouseEventInfo'].y * renderScale), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixelValues)

                    var currentInfo = this['_mouseEventListObject'][pixelValues[0] + ',' + pixelValues[1] + ',' + pixelValues[2] + ',' + pixelValues[3]];
                    var tEventType
                    if (currentInfo) {
                        if (redGL['_mouseEventInfo']['type'] == RedGLDetect.BROWSER_INFO.down) {
                            tEventType = 'down'
                            console.log('다운')
                            if (tEventType && currentInfo[tEventType]) {
                                currentInfo[tEventType].call(currentInfo['target'], {
                                    target: currentInfo['target'],
                                    type: tEventType
                                })
                            }
                        }
                        if (redGL['_mouseEventInfo']['type'] == RedGLDetect.BROWSER_INFO.up) {
                            tEventType = 'up'
                            console.log('업')
                            if (tEventType && currentInfo[tEventType]) {
                                currentInfo[tEventType].call(currentInfo['target'], {
                                    target: currentInfo['target'],
                                    type: tEventType
                                })
                            }
                        }
                        if (this['_prevInfo'] && this['_prevInfo'] != currentInfo) {
                            tEventType = 'out'
                            console.log('아웃')
                            if (tEventType && this['_prevInfo'][tEventType]) {
                                this['_prevInfo'][tEventType].call(this['_prevInfo']['target'], {
                                    target: this['_prevInfo']['target'],
                                    type: tEventType
                                })
                            }
                        }
                        if (this['_prevInfo'] != currentInfo) {
                            tEventType = 'over'
                            if (tEventType && currentInfo[tEventType]) {
                                currentInfo[tEventType].call(currentInfo['target'], {
                                    target: currentInfo['target'],
                                    type: tEventType
                                })
                            }
                            console.log('오버')
                        }

                        this['_prevInfo'] = currentInfo
                    } else {
                        tEventType = 'out'
                        if (this['_prevInfo'] && this['_prevInfo'][tEventType]) {
                            console.log('아웃')
                            fireList.push(
                                {
                                    info: this['_prevInfo'],
                                    type: tEventType
                                }
                            )
                        }
                        this['_prevInfo'] = null
                    }
                    fireEvent()
                    redGL['_mouseEventInfo'] = {
                        type: null,
                        x: redGL['_mouseEventInfo'].x,
                        y: redGL['_mouseEventInfo'].y
                    }
                    //
                    if (this['_prevInfo']) document.body.style.cursor = 'pointer'
                    else document.body.style.cursor = 'default'
                    this['frameBuffer'].unbind(redGL.gl);


                }
            }
        })()
    }
    Object.freeze(RedMouseEventManager);
})();