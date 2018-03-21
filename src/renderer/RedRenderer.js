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
        this['_callback'] = null;
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
                self.worldRender(tGL, time);
                self['_callback'] ? self['_callback'](time) : 0
                self['_tickKey'] = requestAnimationFrame(tick);
            }
            return function (redGL, callback) {
                if (!(redGL instanceof RedGL)) RedGL.throwFunc('RedGL 인스턴스만 허용');
                if (!(redGL.world instanceof RedWorld)) RedGL.throwFunc('RedWorld 인스턴스만 허용');
                self = this;
                self.world = redGL.world;
                tGL = redGL.gl;
                self['_tickKey'] = requestAnimationFrame(tick);
                self['_callback'] = callback
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
        title :`worldRender`,
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
    RedRenderer.prototype.worldRender = (function () {
        var worldRect, viewRect;
        var tCamera;
        var perspectiveMTX;
        var self;
        var valueParser;
        // 숫자면 숫자로 %면 월드대비 수치로 변경해줌
        valueParser = function (rect) {
            rect.forEach(function (v, index) {
                if (typeof rect[index] == 'number') rect[index] = v;
                else {
                    if (index < 2) rect[index] = worldRect[index + 2] * parseFloat(rect[index]) / 100
                    else rect[index] = worldRect[index] * parseFloat(rect[index]) / 100
                };
            })
            return rect;
        }
        viewRect = [];
        perspectiveMTX = mat4.create();
        return function (gl, time) {
            self = this;
            // 캔버스 사이즈 적용
            worldRect = [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight];
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.scissor(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            // console.log("worldRender", v['key'], t0)
            this['world']['_viewList'].forEach(function (tView) {
                ///////////////////////////////////
                // view의 위치/크기결정
                viewRect[0] = tView['_x'];
                viewRect[1] = tView['_y'];
                viewRect[2] = tView['_width'];
                viewRect[3] = tView['_height'];
                tCamera = tView.camera;
                tCamera['updateMatrix']()
                // 위치/크기의 % 여부를 파싱
                valueParser(viewRect);
                // viewport 설정
                gl.viewport(viewRect[0], worldRect[3] - viewRect[3] - viewRect[1], viewRect[2], viewRect[3]);
                gl.scissor(viewRect[0], worldRect[3] - viewRect[3] - viewRect[1], viewRect[2], viewRect[3]);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                // view 에 적용할 카메라 퍼스펙티브를 계산
                mat4.identity(perspectiveMTX);
                mat4.perspective(
                    perspectiveMTX,
                    tCamera.fov * Math.PI / 180,
                    viewRect[2] / viewRect[3],
                    tCamera.nearClipping,
                    tCamera.farClipping
                );
                // 씬렌더 호출
                self.sceneRender(gl, tView.scene, perspectiveMTX, tCamera['matrix']);

            })
        }
    })();
    RedRenderer.prototype.sceneRender = function (gl, scene, perspectiveMTX,cameraMTX) {
        var tChildren, tMesh;
        var k, i, i2;
        //
        var BYTES_PER_ELEMENT;;
        // 
        var tMesh;
        var tGeometry, tMaterial;
        var tInterleaveInfo, tAttributeInfo;
        var tLocationAttr, tLocationUniform;
        var tLocationInfo, tAttributeInfo;
        var tBufferInfo
        var tMVMatrix;
        // 캐시관련
        var prevBuffer;
        // matix 관련
        var a, aSx, aSy, aSz, aCx, aCy, aCz, tRx, tRy, tRz,
            a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33,
            b0, b1, b2, b3,
            b00, b01, b02, b10, b11, b12, b20, b21, b22,
            aX, aY, aZ,
            inverse_c, inverse_d, inverse_e, inverse_g, inverse_f, inverse_h, inverse_i, inverse_j, inverse_k, inverse_l, inverse_n, inverse_o, inverse_A, inverse_m, inverse_p, inverse_r, inverse_s, inverse_B, inverse_t, inverse_u, inverse_v, inverse_w, inverse_x, inverse_y, inverse_z, inverse_C, inverse_D, inverse_E, inverse_q;
        // sin,cos 관련
        var SIN, COS, tRadian, CPI, CPI2, C225, C127, C045, C157;
        //////////////// 변수값 할당 ////////////////
        BYTES_PER_ELEMENT = Float32Array.BYTES_PER_ELEMENT;
        CPI = 3.141592653589793,
            CPI2 = 6.283185307179586,
            C225 = 0.225,
            C127 = 1.27323954,
            C045 = 0.405284735,
            C157 = 1.5707963267948966;
        //////////////// 렌더시작 ////////////////
        tMVMatrix = mat4.create()
        tChildren = scene.children;
        i = tChildren.length
        while (i--) {
            tMesh = tChildren[i]
            tGeometry = tMesh.geometry
            tMaterial = tMesh.material
            gl.useProgram(tMaterial['program']['webglProgram'])
            // 업데이트할 어트리뷰트와 유니폼 정보를 가져옴
            tLocationAttr = tMaterial.attributeLocation
            tLocationUniform = tMaterial.uniformLocation
            // 공용 유니폼을 업데이트함 // TODO: 분리해야함
            gl.uniformMatrix4fv(tLocationUniform['uPMatrix']['location'], false, perspectiveMTX)
            gl.uniformMatrix4fv(tLocationUniform['uCameraMatrix']['location'], false, cameraMTX)
            
            // 버퍼를 찾는다.
            tBufferInfo = tGeometry['buffer']
            // 어트리뷰트 인터리브 정보를 가져온다. 
            tInterleaveInfo = tBufferInfo['interleaveInfo']
            i2 = tInterleaveInfo.length
            while (i2--) {
                // 어트리뷰트 갱신정보를 얻는다.
                tAttributeInfo = tInterleaveInfo[i2]
                tLocationInfo = tLocationAttr[i2]
                // 활성화 된적이 없으면 활성화 시킨다. 
                tAttributeInfo['enabled'] ? 0 : (gl.enableVertexAttribArray(tLocationInfo['location']), tAttributeInfo['enabled'] = true);
                // 어트리뷰트 데이터 업데이트는 필요시 버퍼를 통해 직접한다.
                // 즉 실제로 버퍼는 한번 업데이트 해놓으면 GPU상에 온전하게 보관된다.
                prevBuffer == tBufferInfo['_UUID'] ? 0 : gl.bindBuffer(gl.ARRAY_BUFFER, tBufferInfo['webglBuffer'])
                //TODO: 업데이트 되었을때만 해도 해도될듯한데..
                prevBuffer == tBufferInfo['_UUID'] ? 0 : gl.vertexAttribPointer(
                    tLocationInfo['location'],
                    tAttributeInfo['size'],
                    tBufferInfo['glArrayType'],
                    tAttributeInfo['normalize'],
                    tBufferInfo['stride'] * BYTES_PER_ELEMENT, //stride
                    tAttributeInfo['offset'] * BYTES_PER_ELEMENT //offset
                )
            }
            prevBuffer = tBufferInfo['_UUID'] // 버퍼 캐싱
            // tMVMatrix
            // tMVMatrix 초기화
            tMVMatrix[0] = 1, tMVMatrix[1] = 0, tMVMatrix[2] = 0, tMVMatrix[3] = 0,
                tMVMatrix[4] = 0, tMVMatrix[5] = 1, tMVMatrix[6] = 0, tMVMatrix[7] = 0,
                tMVMatrix[8] = 0, tMVMatrix[9] = 0, tMVMatrix[10] = 1, tMVMatrix[11] = 0,
                tMVMatrix[12] = 0, tMVMatrix[13] = 0, tMVMatrix[14] = 0, tMVMatrix[15] = 1,
                a = tMVMatrix,
                // tMVMatrix translate
                aX = tMesh['x'], aY = tMesh['y'], aZ = tMesh['z'],
                a[12] = a[0] * aX + a[4] * aY + a[8] * aZ + a[12],
                a[13] = a[1] * aX + a[5] * aY + a[9] * aZ + a[13],
                a[14] = a[2] * aX + a[6] * aY + a[10] * aZ + a[14],
                a[15] = a[3] * aX + a[7] * aY + a[11] * aZ + a[15],
                // tMVMatrix rotate
                tRx = tMesh['rotationX'], tRy = tMesh['rotationY'], tRz = tMesh['rotationZ'],
                /////////////////////////
                // aSx = SIN(tRx), 
                // aCx = COS(tRx),
                // aSy = SIN(tRy),
                // aCy = COS(tRy), 
                // aSz = SIN(tRz), 
                // aCz = COS(tRz),
                tRadian = tRx % CPI2,
                tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                aSx = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,

                tRadian = (tRx + C157) % CPI2,
                tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                aCx = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,

                tRadian = tRy % CPI2,
                tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                aSy = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,

                tRadian = (tRy + C157) % CPI2,
                tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                aCy = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,

                tRadian = tRz % CPI2,
                tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                aSz = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,

                tRadian = (tRz + C157) % CPI2,
                tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                aCz = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,
                /////////////////////////
                a00 = a[0], a01 = a[1], a02 = a[2],
                a10 = a[4], a11 = a[5], a12 = a[6],
                a20 = a[8], a21 = a[9], a22 = a[10],
                b00 = aCy * aCz, b01 = aSx * aSy * aCz - aCx * aSz, b02 = aCx * aSy * aCz + aSx * aSz,
                b10 = aCy * aSz, b11 = aSx * aSy * aSz + aCx * aCz, b12 = aCx * aSy * aSz - aSx * aCz,
                b20 = -aSy, b21 = aSx * aCy, b22 = aCx * aCy,
                a[0] = a00 * b00 + a10 * b01 + a20 * b02, a[1] = a01 * b00 + a11 * b01 + a21 * b02, a[2] = a02 * b00 + a12 * b01 + a22 * b02,
                a[4] = a00 * b10 + a10 * b11 + a20 * b12, a[5] = a01 * b10 + a11 * b11 + a21 * b12, a[6] = a02 * b10 + a12 * b11 + a22 * b12,
                a[8] = a00 * b20 + a10 * b21 + a20 * b22, a[9] = a01 * b20 + a11 * b21 + a21 * b22, a[10] = a02 * b20 + a12 * b21 + a22 * b22,
                // tMVMatrix scale
                aX = tMesh['scaleX'], aY = tMesh['scaleY'], aZ = tMesh['scaleZ'],
                a[0] = a[0] * aX, a[1] = a[1] * aX, a[2] = a[2] * aX, a[3] = a[3] * aX,
                a[4] = a[4] * aY, a[5] = a[5] * aY, a[6] = a[6] * aY, a[7] = a[7] * aY,
                a[8] = a[8] * aZ, a[9] = a[9] * aZ, a[10] = a[10] * aZ, a[11] = a[11] * aZ,
                a[12] = a[12], a[13] = a[13], a[14] = a[14], a[15] = a[15]

            // 유니폼 업데이트
            gl.uniformMatrix4fv(tLocationUniform['uMVMatrix']['location'], false, tMVMatrix)

            // 드로우
            gl.drawArrays(gl.TRIANGLES, 0, tBufferInfo['pointNum'])

        }
    }
    Object.freeze(RedRenderer);
})();
