"use strict";
var RedRenderer;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedRenderer`,
        description : `
            RedRenderer 인스턴스 생성자.
        `,
        return : 'RedRenderer Instance'
    }
	:DOC*/
    RedRenderer = function () {
        if (!(this instanceof RedRenderer)) return new RedRenderer();
        this.world = null;
        this['_UUID'] = RedGL['makeUUID']();
        Object.seal(this)
    };
    RedRenderer.prototype = {
        renderStart: (function () {
            var tick;
            var self, tGL;
            tick = function (time) {
                self.render(tGL, time);
                requestAnimationFrame(tick);
            }
            return function (redGL) {
                if(!(redGL instanceof RedGL)) RedGL.throwFunc('RedGL 인스턴스만 허용');
                if(!(redGL.world instanceof RedWorld)) RedGL.throwFunc('RedWorld 인스턴스만 허용');
                self = this;
                self.world = redGL.world;
                tGL = redGL.gl;
                requestAnimationFrame(tick);
            }
        })()
    };
    /**DOC:
    {
        code:`FUNCTION`,
        title :`render`,
        description : `
            등록된 RedView을 기반으로 렌더링을 실행함
        `,
        return : 'void'
    }
    :DOC*/
    RedRenderer.prototype.render = (function () {
        var worldRect, viewRect;
        var valueParser;
        var perspectiveMTX;
        // 숫자면 숫자로 %면 월드대비 수치로 변경해줌
        valueParser = function (rect) {
            worldRect.forEach(function (v, index) {
                if (typeof rect[index] == 'number') rect[index] = v;
                else rect[index] = v * parseFloat(rect[index]) / 100;
            })
            return rect;
        }
        viewRect = [];
        perspectiveMTX = mat4.create()
        return function (gl, time) {
            // console.log('--렌더시작')
            worldRect = [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight];
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            // console.log("render", v['key'], t0)
            // 렌더할 사이즈와 위치 정보를 생성하고
            this['world']['_viewList'].forEach(function (view) {
                console.log(view)
                viewRect[0] = view['_x'];
                viewRect[1] = view['_y'];
                viewRect[2] = view['_width'];
                viewRect[3] = view['_height'];
                console.log(valueParser(viewRect))
                // 카메라 퍼스펙티브를 먹여준뒤..
                mat4.identity(perspectiveMTX);
                mat4.perspective(
                    perspectiveMTX,
                    view.camera.fov * Math.PI / 180,
                    viewRect[2] / viewRect[3],
                    view.camera.nearClipping,
                    view.camera.farClipping
                )
                // console.log('perspectiveMTX',perspectiveMTX)

                // TODO: 씬의 자식들을 렌더링한다.
            })
            // console.log('--렌더종료')
        }
    })()
    Object.freeze(RedRenderer);
})();
