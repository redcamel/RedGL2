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
        this['_tickKey'] = null;
        this['_UUID'] = RedGL['makeUUID']();
        Object.seal(this)
    };
    RedRenderer.prototype = {
        /**DOC:
        {
            code:`FUNCTION`,
            title :`start`,
            description : `
                렌더 시작
            `,
            params : {
                gl : [
                    {type : "webgl context"},
                    'webgl context'
                ]
            },
            return : 'void'
        }
        :DOC*/
        start: (function () {
            var tick;
            var self, tGL;
            tick = function (time) {
                self.render(tGL, time);
                self['_tickKey'] = requestAnimationFrame(tick);
            }
            return function (redGL) {
                if (!(redGL instanceof RedGL)) RedGL.throwFunc('RedGL 인스턴스만 허용');
                if (!(redGL.world instanceof RedWorld)) RedGL.throwFunc('RedWorld 인스턴스만 허용');
                self = this;
                self.world = redGL.world;
                tGL = redGL.gl;
                self['_tickKey'] = requestAnimationFrame(tick);
            }
        })(),
        /**DOC:
        {
            code:`FUNCTION`,
            title :`stop`,
            description : `
                렌더 중지
            `,
            return : 'void'
        }
        :DOC*/
        stop: function () {
            cancelAnimationFrame(this['_tickKey'])
        }
    };
    /**DOC:
    {
        code:`FUNCTION`,
        title :`render`,
        description : `
            등록된 RedView을 기반으로 렌더링을 실행함
        `,
        params : {
            gl : [
                {type : "webgl context"},
                'webgl context'
            ]
        },
        return : 'void'
    }
    :DOC*/
    RedRenderer.prototype.render = (function () {
        var worldRect, viewRect;
        var valueParser;

        // 숫자면 숫자로 %면 월드대비 수치로 변경해줌
        valueParser = function (rect) {
            rect.forEach(function (v, index) {
                if (typeof rect[index] == 'number') rect[index] = v;
                else rect[index] = worldRect[index] * parseFloat(rect[index]) / 100;
            })
            return rect;
        }
        viewRect = [];

        return function (gl, time) {
            // console.log('--렌더시작')
            worldRect = [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight];

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            // console.log("render", v['key'], t0)
            // 렌더할 사이즈와 위치 정보를 생성하고
            this['world']['_viewList'].forEach(function (view) {
                var tCamera, tScene;
                var tChildren, tMesh, i, i2;
                //
                var tProgram;
                var tAttributeLocation;
                var tLocationInfo, tBufferInfo;
                var perspectiveMTX;
                perspectiveMTX = mat4.create()
                //
                viewRect[0] = view['_x'];
                viewRect[1] = view['_y'];
                viewRect[2] = view['_width'];
                viewRect[3] = view['_height'];
                tScene = view.scene;
                tCamera = view.camera;
                valueParser(viewRect)
                // 카메라 퍼스펙티브를 먹여준뒤..
                mat4.identity(perspectiveMTX);
                gl.viewport(viewRect[0], worldRect[3] - viewRect[3] - viewRect[1], viewRect[2], viewRect[3])
                gl.clear(gl.DEPTH_BUFFER_BIT);
                mat4.perspective(
                    perspectiveMTX,
                    tCamera.fov * Math.PI / 180,
                    viewRect[2] / viewRect[3],
                    tCamera.nearClipping,
                    tCamera.farClipping
                )
                tChildren = tScene.children;
                i = tChildren.length
                while (i--) {
                    tMesh = tChildren[i]
                    tProgram = tMesh.program
                    gl.useProgram(tProgram.webglProgram)
                    tAttributeLocation = tProgram.attributeLocation
                    tLocationInfo = tProgram.uniformLocation
                    gl.uniformMatrix4fv(tLocationInfo['uPMatrix']['location'], false, perspectiveMTX)
                  
                    gl.uniformMatrix4fv(tLocationInfo['uMVMatrix']['location'], false, tMesh.matrix)


                    i2 = tAttributeLocation.length
                    while (i2--) {
                        tLocationInfo = tAttributeLocation[i]
                        tBufferInfo = tMesh['buffer']
                        gl.bindBuffer(gl.ARRAY_BUFFER, tBufferInfo['webglBuffer'])
                        gl.enableVertexAttribArray(tLocationInfo['location'])
                        gl.vertexAttribPointer(
                            tLocationInfo['location'],
                            tBufferInfo['pointSize'],
                            tBufferInfo['glArrayType'],
                            tBufferInfo['normalize'],
                            tBufferInfo['stride'],
                            tBufferInfo['offset']
                        )
                    }
                    gl.drawArrays(gl.TRIANGLES, 0, tBufferInfo['pointNum'])

                }
                // console.log('perspectiveMTX',perspectiveMTX)

                // TODO: 씬의 자식들을 렌더링한다.
            })
            // console.log('--렌더종료')
        }
    })();
    Object.freeze(RedRenderer);
})();
