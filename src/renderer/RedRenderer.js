"use strict";
var RedRenderer;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedRenderer`,
        description : `
            RedRenderer Instance 생성자.
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
        this['renderInfo'] = {}
        this['cacheUniformInfo'] = []
        this['cacheAttrInfo'] = []
        this['cacheTextureInfo'] = []
        Object.seal(this)
        console.log(this)
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
            var self, tRedGL;
            tick = function (time) {
                self.worldRender(tRedGL, time);
                self['_callback'] ? self['_callback'](time) : 0
                self['_tickKey'] = requestAnimationFrame(tick);
            }
            return function (redGL, callback) {
                if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedGL Instance만 허용');
                if (!(redGL.world instanceof RedWorld)) RedGLUtil.throwFunc('RedWorld Instance만 허용');
                self = this;
                self.world = redGL.world;
                tRedGL = redGL
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
    // 캐시관련
    var prevProgram_UUID;
    RedRenderer.prototype.worldRender = (function () {
        var worldRect, viewRect;
        var tCamera, tScene;
        var perspectiveMTX;
        var self;
        var valueParser;
        var updateSystemUniform;
        var glInitialize;
        var lightDebugRenderList
        lightDebugRenderList = []
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
        updateSystemUniform = (function () {
            var tProgram;
            var tSystemUniformGroup;
            var gl;
            var tLocationInfo, tLocation, tUUID, tViewRect;
            var cacheSystemUniform;

            cacheSystemUniform = []
            return function (redGL, time, scene, perspectiveMTX, cameraMTX, viewRect) {
                gl = redGL.gl;
                lightDebugRenderList.length = 0
                for (var k in redGL['_datas']['RedProgram']) {
                    tProgram = redGL['_datas']['RedProgram'][k];
                    prevProgram_UUID == tProgram['_UUID'] ? 0 : gl.useProgram(tProgram['webglProgram']);
                    prevProgram_UUID = tProgram['_UUID'];
                    //
                    tSystemUniformGroup = tProgram['systemUniformLocation'];
                    //
                    tLocationInfo = tSystemUniformGroup['uTime'];
                    tLocation = tLocationInfo['location'];
                    tUUID = tLocationInfo['_UUID']
                    if (tLocation && cacheSystemUniform[tUUID] != time) {
                        gl.uniform1f(tLocation, time);
                        cacheSystemUniform[tUUID] = time;
                    }
                    //
                    tLocationInfo = tSystemUniformGroup['uResolution'];
                    tLocation = tLocationInfo['location'];
                    tUUID = tLocationInfo['_UUID'];
                    tViewRect = [viewRect[2], viewRect[3]]
                    if (tLocation && cacheSystemUniform[tUUID] != tViewRect.toString()) {
                        gl.uniform2fv(tLocation, tViewRect);
                        cacheSystemUniform[tUUID] = tViewRect.toString()
                    }
                    //
                    tLocationInfo = tSystemUniformGroup['uCameraMatrix'];
                    tLocation = tLocationInfo['location'];
                    tUUID = tLocationInfo['_UUID'];
                    if (tLocation && cacheSystemUniform[tUUID] != cameraMTX.toString()) {
                        gl.uniformMatrix4fv(tLocation, false, cameraMTX);
                        cacheSystemUniform[tUUID] = cameraMTX.toString()
                    }
                    //
                    tLocationInfo = tSystemUniformGroup['uPMatrix'];
                    tLocation = tLocationInfo['location'];
                    tUUID = tLocationInfo['_UUID'];
                    if (tLocation && cacheSystemUniform[tUUID] != perspectiveMTX.toString()) {
                        gl.uniformMatrix4fv(tLocation, false, perspectiveMTX);
                        cacheSystemUniform[tUUID] = perspectiveMTX.toString()
                    }
                    //
                    var i, tList;
                    var tLightData, tDebugObj;
                    var tValue
                    // 엠비언트 라이트 업데이트
                    if (tLightData = scene['lightInfo']['RedAmbientLight']) {
                        tLocationInfo = tSystemUniformGroup['uAmbientLightColor'];
                        tLocation = tLocationInfo['location'];
                        tUUID = tLocationInfo['_UUID'];
                        tValue = tLightData['color'];
                        if (tLocation && cacheSystemUniform[tUUID] != tValue.toString()) {
                            gl.uniform4fv(tLocation, tValue)
                            cacheSystemUniform[tUUID] = tValue.toString()
                        };
                        //
                        tLocationInfo = tSystemUniformGroup['uAmbientIntensity'];
                        tLocation = tLocationInfo['location'];
                        tUUID = tLocationInfo['_UUID'];
                        tValue = tLightData['intensity'];
                        if (tLocation && cacheSystemUniform[tUUID] != tValue) {
                            gl.uniform1f(tLocation, tValue)
                            cacheSystemUniform[tUUID] = tValue
                        };

                    }

                    // 디렉셔널 라이트 업데이트
                    var tDirectionList, tColorList, tIntensityList;
                    var tVector;
                    tVector = vec3.create()
                    tDirectionList = new Float32Array(3 * 5)
                    tColorList = new Float32Array(4 * 5)
                    tIntensityList = new Float32Array(5)
                    tList = scene['lightInfo']['RedDirectionalLight'];
                    i = tList.length;
                    while (i--) {
                        tLightData = tList[i];
                        tDebugObj = tLightData['debugObject'];
                        vec3.set(tVector, tLightData['directionX'], tLightData['directionY'], tLightData['directionZ'])
                        vec3.normalize(tVector, tVector)
                        tDebugObj['x'] = -tVector[0] * 5;
                        tDebugObj['y'] = -tVector[1] * 5;
                        tDebugObj['z'] = -tVector[2] * 5;
                        lightDebugRenderList.push(tDebugObj)
                        //
                        tLocationInfo = tSystemUniformGroup['uDirectionalLightDirection'];
                        tLocation = tLocationInfo['location'];
                        if (tLocation) {
                            tDirectionList[0 + 3 * i] = tVector[0];
                            tDirectionList[1 + 3 * i] = tVector[1];
                            tDirectionList[2 + 3 * i] = tVector[2];
                        }
                        //
                        tLocationInfo = tSystemUniformGroup['uDirectionalLightColor'];
                        tLocation = tLocationInfo['location'];
                        if (tLocation) {
                            tColorList[0 + 4 * i] = tLightData['color'][0];
                            tColorList[1 + 4 * i] = tLightData['color'][1];
                            tColorList[2 + 4 * i] = tLightData['color'][2];
                            tColorList[3 + 4 * i] = tLightData['color'][3];
                        }
                        //
                        tLocationInfo = tSystemUniformGroup['uDirectionalLightIntensity'];
                        tLocation = tLocationInfo['location'];
                        if (tLocation) tIntensityList[i] = tLightData['intensity']
                    }
                    //
                    tLocationInfo = tSystemUniformGroup['uDirectionalLightDirection'];
                    tLocation = tLocationInfo['location'];
                    tUUID = tLocationInfo['_UUID'];
                    tValue = tDirectionList;
                    if (tLocation && cacheSystemUniform[tUUID] != tValue.toString()) {
                        gl.uniform3fv(tLocation, tValue);
                        cacheSystemUniform[tUUID] = tValue.toString()
                    }
                    //
                    tLocationInfo = tSystemUniformGroup['uDirectionalLightColor'];
                    tLocation = tLocationInfo['location'];
                    tUUID = tLocationInfo['_UUID'];
                    tValue = tColorList;
                    if (tLocation && cacheSystemUniform[tUUID] != tValue.toString()) {
                        gl.uniform4fv(tLocation, tValue);
                        cacheSystemUniform[tUUID] = tValue.toString()
                    }
                    //
                    tLocationInfo = tSystemUniformGroup['uDirectionalLightIntensity'];
                    tLocation = tLocationInfo['location'];
                    tUUID = tLocationInfo['_UUID'];
                    tValue = tIntensityList;
                    if (tLocation && cacheSystemUniform[tUUID] != tValue.toString()) {
                        gl.uniform1fv(tLocation, tValue)
                        cacheSystemUniform[tUUID] = tValue.toString()
                    }
                    //
                    tLocationInfo = tSystemUniformGroup['uDirectionalLightNum'];
                    tLocation = tLocationInfo['location'];
                    tUUID = tLocationInfo['_UUID'];
                    tValue = tList.length;
                    if (tLocation && cacheSystemUniform[tUUID] != tValue) {
                        gl.uniform1i(tLocation, tValue)
                        cacheSystemUniform[tUUID] = tValue
                    }

                }
                return lightDebugRenderList
            }
        })();
        glInitialize = function (gl) {
            // 뎁스데스티 설정
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL)
            // 컬링 페이스 설정
            gl.frontFace(gl.CCW)
            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.BACK)
            gl.enable(gl.SCISSOR_TEST);
            // 블렌드모드설정
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            // 픽셀 블렌딩 결정
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            // 픽셀 플립 기본설정
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        };
        viewRect = [];
        perspectiveMTX = mat4.create();
        return function (redGL, time) {
            var gl;
            gl = redGL.gl;
            self = this;
            // 캔버스 사이즈 적용
            worldRect = [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight];
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.scissor(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            // glInitialize
            glInitialize(gl);

            // console.log("worldRender", v['key'], t0)
            self['renderInfo'] = {}
            this['cacheAttrInfo'].length = 0
            self['world']['_viewList'].forEach(function (tView) {
                ///////////////////////////////////
                // view의 위치/크기결정
                viewRect[0] = tView['_x'];
                viewRect[1] = tView['_y'];
                viewRect[2] = tView['_width'];
                viewRect[3] = tView['_height'];
                tCamera = tView['camera'];
                tScene = tView['scene']
                tCamera['updateMatrix']()
                // 위치/크기의 % 여부를 파싱
                valueParser(viewRect);
                //
                self['renderInfo'][tView['key']] = {
                    orthographic: tCamera['orthographic'],
                    x: tView['_x'],
                    y: tView['_y'],
                    width: tView['_width'],
                    height: tView['_height'],
                    viewRectX: viewRect[0],
                    viewRectY: viewRect[1],
                    viewRectWidth: viewRect[2],
                    viewRectHeight: viewRect[3],
                    key: tView['key'],
                    call: 0
                }
                // viewport 설정
                gl.viewport(viewRect[0], worldRect[3] - viewRect[3] - viewRect[1], viewRect[2], viewRect[3]);
                gl.scissor(viewRect[0], worldRect[3] - viewRect[3] - viewRect[1], viewRect[2], viewRect[3]);
                gl.clearColor(tScene['r'], tScene['g'], tScene['b'], 1)
                if (tScene['useBackgroundColor']) gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                else gl.clear(gl.DEPTH_BUFFER_BIT);

                // view 에 적용할 카메라 퍼스펙티브를 계산
                mat4.identity(perspectiveMTX);
                if (tCamera['orthographic']) {
                    mat4.ortho(
                        perspectiveMTX,
                        -0.5, // left
                        0.5, // right
                        -0.5, // bottom
                        0.5, // top,
                        - tCamera['farClipping'],
                        tCamera['farClipping']
                    )
                    mat4.translate(perspectiveMTX, perspectiveMTX, [-0.5, 0.5, 0])
                    mat4.scale(perspectiveMTX, perspectiveMTX, [1 / viewRect[2], -1 / viewRect[3], 1]);
                    mat4.identity(tCamera['matrix'])
                    gl.disable(gl.CULL_FACE);
                } else {
                    mat4.perspective(
                        perspectiveMTX,
                        tCamera['fov'] * Math.PI / 180,
                        viewRect[2] / viewRect[3],
                        tCamera['nearClipping'],
                        tCamera['farClipping']
                    );
                    gl.enable(gl.CULL_FACE);

                }
                updateSystemUniform(redGL, time, tScene, perspectiveMTX, tCamera['matrix'], viewRect)
                // 디버깅 라이트 업데이트 
                self.sceneRender(gl, tCamera['orthographic'], lightDebugRenderList, time, self['renderInfo'][tView['key']]);
                // 씬렌더 호출
                self.sceneRender(gl, tCamera['orthographic'], tScene['children'], time, self['renderInfo'][tView['key']]);
            })
        }
    })();

    RedRenderer.prototype.sceneRender = (function () {
        var draw;
        var tPrevIndexBuffer_UUID;
        var tPrevInterleaveBuffer_UUID;
        draw = function (
            gl,
            children,
            orthographic,
            time,
            renderResultObj,
            tCacheInterleaveBuffer,
            tCacheUniformInfo,
            tCacheTextureInfo,
            parentMTX
        ) {
            var tMesh;
            var k, i, i2;
            // 오쏘고날 스케일 비율
            var orthographicScale = orthographic ? -1 : 1
            //
            var BYTES_PER_ELEMENT;;
            // 
            var tMesh;
            var tGeometry;
            var tMaterial;
            var tTextureIndex = 1;
            var tInterleaveDefineInfo;
            var tAttrGroup, tUniformGroup, tSystemUniformGroup;
            var tInterleaveDefineUnit
            var tUniformLocationInfo, tAttributeLocationInfo, tWebGLUniformLocation, tWebGLAttributeLocation;
            var tInterleaveBuffer, tIndexBufferInfo;
            var tUniformValue
            var tRenderType;
            var tMVMatrix, tNMatrix
            var tUUID, noChangeUniform;
            // matix 관련
            var a,
                aSx, aSy, aSz, aCx, aCy, aCz, tRx, tRy, tRz,
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

            i = children.length
            while (i--) {
                renderResultObj['call']++
                tMesh = children[i]
                tMVMatrix = tMesh['matrix']
                tNMatrix = tMesh['normalMatrix']
                tGeometry = tMesh.geometry
                tMaterial = tMesh.material
                prevProgram_UUID == tMaterial['program']['_UUID'] ? 0 : gl.useProgram(tMaterial['program']['webglProgram'])
                prevProgram_UUID = tMaterial['program']['_UUID']
                // 업데이트할 어트리뷰트와 유니폼 정보를 가져옴
                tAttrGroup = tMaterial['program']['attributeLocation'];
                tUniformGroup = tMaterial['program']['uniformLocation'];
                tSystemUniformGroup = tMaterial['program']['systemUniformLocation'];
                // 버퍼를 찾는다.
                tInterleaveBuffer = tGeometry['interleaveBuffer'] // 인터리브 버퍼
                tIndexBufferInfo = tGeometry['indexBuffer'] // 엘리먼트 버퍼

                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
                // interleaveDefineInfo 정보를 가져온다. 
                tInterleaveDefineInfo = tInterleaveBuffer['interleaveDefineInfo']
                // 버퍼의 UUID
                tUUID = tInterleaveBuffer['_UUID']
                // 프로그램의 어트리뷰트를 순환한다. 
                i2 = tAttrGroup.length
                while (i2--) {
                    // 대상 어트리뷰트의 로케이션 정보를 구함
                    tAttributeLocationInfo = tAttrGroup[i2]
                    // 대상 어트리뷰트의 이름으로 interleaveDefineInfo에서 단위 인터리브 정보를 가져온다. 
                    tInterleaveDefineUnit = tInterleaveDefineInfo[tAttributeLocationInfo['name']]
                    // 실제 버퍼 바인딩하고 //TODO: 이놈은 검증해야함
                    tPrevInterleaveBuffer_UUID == tUUID ? 0 : gl.bindBuffer(gl.ARRAY_BUFFER, tInterleaveBuffer['webglBuffer'])
                    tPrevInterleaveBuffer_UUID = tUUID;
                    /*
                        어트리뷰트 정보매칭이 안되는 녀석은 무시한다 
                        이경우는 버퍼상에는 존재하지만 프로그램에서 사용하지 않는경우이다.
                    */
                    if (tAttributeLocationInfo && tInterleaveDefineUnit) {
                        // webgl location도 알아낸다.
                        tWebGLAttributeLocation = tAttributeLocationInfo['location']
                        if (tCacheInterleaveBuffer[tWebGLAttributeLocation] != tInterleaveDefineUnit['_UUID']) {
                            // 해당로케이션을 활성화된적이없으면 활성화 시킨다
                            tAttributeLocationInfo['enabled'] ? 0 : (gl.enableVertexAttribArray(tWebGLAttributeLocation), tAttributeLocationInfo['enabled'] = true)
                            gl.vertexAttribPointer(
                                tWebGLAttributeLocation,
                                tInterleaveDefineUnit['size'],
                                tInterleaveBuffer['glArrayType'],
                                tInterleaveDefineUnit['normalize'],
                                tInterleaveBuffer['stride'] * BYTES_PER_ELEMENT, //stride
                                tInterleaveDefineUnit['offset'] * BYTES_PER_ELEMENT //offset
                            )
                            // 상태 캐싱
                            tCacheInterleaveBuffer[tWebGLAttributeLocation] = tInterleaveDefineUnit['_UUID']
                        }
                    }
                }
                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
                // 유니폼 업데이트
                i2 = tUniformGroup.length
                while (i2--) {
                    tUniformLocationInfo = tUniformGroup[i2];
                    tWebGLUniformLocation = tUniformLocationInfo['location'];
                    tUUID = tUniformLocationInfo['_UUID'];
                    if (tWebGLUniformLocation) {
                        tRenderType = tUniformLocationInfo['renderType'];
                        tUniformValue = tMaterial[tUniformLocationInfo['materialPropertyName']];
                        tUniformValue == undefined ? RedGLUtil.throwFunc('RedRenderer : Material에 ', tUniformLocationInfo['materialPropertyName'], '이 정의 되지않았습니다.') : 0;
                        noChangeUniform = tCacheUniformInfo[tUUID] == tUniformValue;
                        // if (!noChange) console.log('변경되었다', tLocationInfo['name'], tCacheInfo[tUUID], tUniformValue)
                        // console.log(tCacheInfo)
                        if (tRenderType == 'sampler2D') {
                            //TODO: 텍스쳐 인덱스는 내부적으로 먹어야하는 거였군...
                            // tTextureIndex : 0 번은 생성용으로 쓴다.                            
                            if (tCacheTextureInfo[tTextureIndex] == tUniformValue['_UUID']) {
                            } else {
                                gl.activeTexture(gl.TEXTURE0 + tTextureIndex)
                                gl.bindTexture(gl.TEXTURE_2D, tUniformValue['webglTexture'])
                                gl.uniform1i(tWebGLUniformLocation, tTextureIndex)
                                tCacheTextureInfo[tTextureIndex] = tUniformValue['_UUID']
                                if (tCacheTextureInfo[tTextureIndex]) tTextureIndex++
                                if (tTextureIndex == 8) tTextureIndex = 1
                                // console.log(tCacheTextureInfo)
                            }

                        } else {
                            tRenderType == 'float' ? noChangeUniform ? 0 : gl[tUniformLocationInfo['renderMethod']](tWebGLUniformLocation, tCacheUniformInfo[tUUID] = tUniformValue)
                                : tRenderType == 'int' ? noChangeUniform ? 0 : gl[tUniformLocationInfo['renderMethod']](tWebGLUniformLocation, tCacheUniformInfo[tUUID] = tUniformValue)
                                    : tRenderType == 'vec' ? noChangeUniform ? 0 : gl[tUniformLocationInfo['renderMethod']](tWebGLUniformLocation, tCacheUniformInfo[tUUID] = tUniformValue)
                                        : tRenderType == 'mat' ? gl[tUniformLocationInfo['renderMethod']](tWebGLUniformLocation, false, tUniformValue)
                                            : RedGLUtil.throwFunc('RedRenderer : 처리할수없는 타입입니다.', 'tRenderType -', tRenderType)
                        }

                    }
                }

                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
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
                    aX = tMesh['scaleX'], aY = tMesh['scaleY'] * orthographicScale, aZ = tMesh['scaleZ'],
                    a[0] = a[0] * aX, a[1] = a[1] * aX, a[2] = a[2] * aX, a[3] = a[3] * aX,
                    a[4] = a[4] * aY, a[5] = a[5] * aY, a[6] = a[6] * aY, a[7] = a[7] * aY,
                    a[8] = a[8] * aZ, a[9] = a[9] * aZ, a[10] = a[10] * aZ, a[11] = a[11] * aZ,
                    a[12] = a[12], a[13] = a[13], a[14] = a[14], a[15] = a[15],
                    // 부모가있으면 곱함
                    parentMTX ? (
                        // 부모매트릭스 복사
                        // 매트립스 곱
                        a00 = parentMTX[0], a01 = parentMTX[1], a02 = parentMTX[2], a03 = parentMTX[3],
                        a10 = parentMTX[4], a11 = parentMTX[5], a12 = parentMTX[6], a13 = parentMTX[7],
                        a20 = parentMTX[8], a21 = parentMTX[9], a22 = parentMTX[10], a23 = parentMTX[11],
                        a30 = parentMTX[12], a31 = parentMTX[13], a32 = parentMTX[14], a33 = parentMTX[15],
                        // Cache only the current line of the second matrix
                        b0 = tMVMatrix[0], b1 = tMVMatrix[1], b2 = tMVMatrix[2], b3 = tMVMatrix[3],
                        tMVMatrix[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                        tMVMatrix[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                        tMVMatrix[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                        tMVMatrix[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
                        b0 = tMVMatrix[4], b1 = tMVMatrix[5], b2 = tMVMatrix[6], b3 = tMVMatrix[7],
                        tMVMatrix[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                        tMVMatrix[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                        tMVMatrix[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                        tMVMatrix[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
                        b0 = tMVMatrix[8], b1 = tMVMatrix[9], b2 = tMVMatrix[10], b3 = tMVMatrix[11],
                        tMVMatrix[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                        tMVMatrix[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                        tMVMatrix[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                        tMVMatrix[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
                        b0 = tMVMatrix[12], b1 = tMVMatrix[13], b2 = tMVMatrix[14], b3 = tMVMatrix[15],
                        tMVMatrix[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                        tMVMatrix[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                        tMVMatrix[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                        tMVMatrix[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33
                    ) : 0,

                    /////////////////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////
                    gl.uniformMatrix4fv(tSystemUniformGroup['uMVMatrix']['location'], false, tMVMatrix)

                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
                // 노말매트릭스를 사용할경우
                if (tSystemUniformGroup['uNMatrix']) {
                    //클론
                    // mat4Inverse
                    inverse_c = tMVMatrix[0], inverse_d = tMVMatrix[1], inverse_e = tMVMatrix[2], inverse_g = tMVMatrix[3],
                        inverse_f = tMVMatrix[4], inverse_h = tMVMatrix[5], inverse_i = tMVMatrix[6], inverse_j = tMVMatrix[7],
                        inverse_k = tMVMatrix[8], inverse_l = tMVMatrix[9], inverse_n = tMVMatrix[10], inverse_o = tMVMatrix[11],
                        inverse_m = tMVMatrix[12], inverse_p = tMVMatrix[13], inverse_r = tMVMatrix[14], inverse_s = tMVMatrix[15],
                        inverse_A = inverse_c * inverse_h - inverse_d * inverse_f,
                        inverse_B = inverse_c * inverse_i - inverse_e * inverse_f,
                        inverse_t = inverse_c * inverse_j - inverse_g * inverse_f,
                        inverse_u = inverse_d * inverse_i - inverse_e * inverse_h,
                        inverse_v = inverse_d * inverse_j - inverse_g * inverse_h,
                        inverse_w = inverse_e * inverse_j - inverse_g * inverse_i,
                        inverse_x = inverse_k * inverse_p - inverse_l * inverse_m,
                        inverse_y = inverse_k * inverse_r - inverse_n * inverse_m,
                        inverse_z = inverse_k * inverse_s - inverse_o * inverse_m,
                        inverse_C = inverse_l * inverse_r - inverse_n * inverse_p,
                        inverse_D = inverse_l * inverse_s - inverse_o * inverse_p,
                        inverse_E = inverse_n * inverse_s - inverse_o * inverse_r,
                        inverse_q = inverse_A * inverse_E - inverse_B * inverse_D + inverse_t * inverse_C + inverse_u * inverse_z - inverse_v * inverse_y + inverse_w * inverse_x,
                        inverse_q = 1 / inverse_q,
                        tNMatrix[0] = (inverse_h * inverse_E - inverse_i * inverse_D + inverse_j * inverse_C) * inverse_q,
                        tNMatrix[1] = (-inverse_d * inverse_E + inverse_e * inverse_D - inverse_g * inverse_C) * inverse_q,
                        tNMatrix[2] = (inverse_p * inverse_w - inverse_r * inverse_v + inverse_s * inverse_u) * inverse_q,
                        tNMatrix[3] = (-inverse_l * inverse_w + inverse_n * inverse_v - inverse_o * inverse_u) * inverse_q,
                        tNMatrix[4] = (-inverse_f * inverse_E + inverse_i * inverse_z - inverse_j * inverse_y) * inverse_q,
                        tNMatrix[5] = (inverse_c * inverse_E - inverse_e * inverse_z + inverse_g * inverse_y) * inverse_q,
                        tNMatrix[6] = (-inverse_m * inverse_w + inverse_r * inverse_t - inverse_s * inverse_B) * inverse_q,
                        tNMatrix[7] = (inverse_k * inverse_w - inverse_n * inverse_t + inverse_o * inverse_B) * inverse_q,
                        tNMatrix[8] = (inverse_f * inverse_D - inverse_h * inverse_z + inverse_j * inverse_x) * inverse_q,
                        tNMatrix[9] = (-inverse_c * inverse_D + inverse_d * inverse_z - inverse_g * inverse_x) * inverse_q,
                        tNMatrix[10] = (inverse_m * inverse_v - inverse_p * inverse_t + inverse_s * inverse_A) * inverse_q,
                        tNMatrix[11] = (-inverse_k * inverse_v + inverse_l * inverse_t - inverse_o * inverse_A) * inverse_q,
                        tNMatrix[12] = (-inverse_f * inverse_C + inverse_h * inverse_y - inverse_i * inverse_x) * inverse_q,
                        tNMatrix[13] = (inverse_c * inverse_C - inverse_d * inverse_y + inverse_e * inverse_x) * inverse_q,
                        tNMatrix[14] = (-inverse_m * inverse_u + inverse_p * inverse_B - inverse_r * inverse_A) * inverse_q,
                        tNMatrix[15] = (inverse_k * inverse_u - inverse_l * inverse_B + inverse_n * inverse_A) * inverse_q,
                        // transpose
                        a01 = tNMatrix[1], a02 = tNMatrix[2], a03 = tNMatrix[3],
                        a12 = tNMatrix[6], a13 = tNMatrix[7], a23 = tNMatrix[11],
                        tNMatrix[1] = tNMatrix[4], tNMatrix[2] = tNMatrix[8], tNMatrix[3] = tNMatrix[12], tNMatrix[4] = a01, tNMatrix[6] = tNMatrix[9],
                        tNMatrix[7] = tNMatrix[13], tNMatrix[8] = a02, tNMatrix[9] = a12, tNMatrix[11] = tNMatrix[14],
                        tNMatrix[12] = a03, tNMatrix[13] = a13, tNMatrix[14] = a23,
                        // uNMatrix 입력 
                        gl.uniformMatrix4fv(tSystemUniformGroup['uNMatrix']['location'], false, tNMatrix)
                }

                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
                // 드로우
                if (tIndexBufferInfo) {
                    tPrevIndexBuffer_UUID == tIndexBufferInfo['_UUID'] ? 0 : gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tIndexBufferInfo['webglBuffer'])
                    //enum mode, long count, enum type, long offset
                    gl.drawElements(
                        tMesh['drawMode'],
                        tIndexBufferInfo['pointNum'],
                        tIndexBufferInfo['glArrayType'],
                        0
                    );
                    tPrevIndexBuffer_UUID = tIndexBufferInfo['_UUID'];
                } else gl.drawArrays(tMesh['drawMode'], 0, tInterleaveBuffer['pointNum'])
                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
                if (tMesh['children'].length) {
                    draw(
                        gl,
                        tMesh['children'],
                        orthographic,
                        time,
                        renderResultObj,
                        tCacheInterleaveBuffer,
                        tCacheUniformInfo,
                        tCacheTextureInfo,
                        tMVMatrix
                    )
                }
            }
        }
        return function (gl, orthographic, children, time, renderResultObj) {
            draw(
                gl,
                children,
                orthographic,
                time,
                renderResultObj,
                this['cacheAttrInfo'],
                this['cacheUniformInfo'],
                this['cacheTextureInfo']
            )

        }
    })()
    Object.freeze(RedRenderer);
})();
