"use strict";
var RedRenderer;
//TODO: 캐싱전략을 좀더 고도화하는게 좋을듯
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedRenderer`,
		 description : `
			 RedRenderer Instance 생성자.
		 `,
		 example : `
		 RedRenderer();
		 `,
		 return : 'RedRenderer Instance'
	 }
     :DOC*/
    RedRenderer = function () {
        if (!(this instanceof RedRenderer)) return new RedRenderer();
        this.world = null;
        this['_tickKey'] = null;
        this['_callback'] = null;
        this['_UUID'] = RedGL.makeUUID();
        this['renderInfo'] = {};
        this['cacheState'] = [];
        this['cacheInfo'] = {
            cacheUniformInfo: [],
            cacheAttrInfo: [],
            cacheSamplerIndex: [],
            cacheTexture: [],
            cacheSystemUniformInfo: []
        };
        this['renderDebuger'] = RedRenderDebuger();
        this['worldRect'] = []
        this['_glInitialized'] = false
        console.log(this);
    };
    RedRenderer.prototype = {
        /**DOC:
         {
			 code:`METHOD`,
			 title :`start`,
			 description : `
				 렌더 시작
			 `,
			 params : {
				 redGL : [
					 {type : "RedGL"}
				 ],
				 callback : [
					 {type : "Function"},
					 '렌더시마다 실행될 콜백'
				 ]
			 },
			 return : 'void'
		 }
         :DOC*/
        start: (function () {
            var tick;
            var self, tRedGL;
            tick = function (time) {
                //TODO: 시간보정을 굳이 할피요가 있을까..
                self.worldRender(tRedGL, time);
                self['_callback'] ? self['_callback'](time) : 0
                self['_tickKey'] = requestAnimationFrame(tick);
            }
            return function (redGL, callback) {
                redGL instanceof RedGL || RedGLUtil.throwFunc('RedGL Instance만 허용');
                if (!(redGL.world instanceof RedWorld)) RedGLUtil.throwFunc('RedWorld Instance만 허용');
                self = this;
                self.world = redGL.world;
                tRedGL = redGL;
                self['_callback'] = callback;
                self['_tickKey'] = requestAnimationFrame(tick);
            }
        })(),
        setDebugButton : function(){
            var sourceViewBt;
            var self = this
            if(window['document']){
                document.body.appendChild(sourceViewBt = document.createElement('button'));
                sourceViewBt.style.cssText = 'position:fixed;left:10px;top:10px;background:rgb(91, 82, 170);color:#fff;z-index:10001;border:0;outline:none;cursor:pointer;padding:8px;font-size:11px;border-radius:5px'
                sourceViewBt.innerHTML = 'debugRenderInfo - ' + RedGL_VERSION.version
                sourceViewBt.addEventListener('click', function () {
                    self.renderDebuger.visible = !self.renderDebuger.visible
                })
            }
        },
        /**DOC:
         {
			 code:`METHOD`,
			 title :`render`,
			 description : `
				 단일 프레임 렌더
			 `,
			 params : {
				 redGL : [
					 {type : "RedGL"}
				 ],
				 time : [
					 {type : "Number"},
					 'time'
				 ]
			 },
			 return : 'void'
		 }
         :DOC*/
        render: function (redGL, time) {
            redGL instanceof RedGL || RedGLUtil.throwFunc('RedGL Instance만 허용');
            this.worldRender(redGL, time);
            this.world = redGL.world;
        },
        /**DOC:
         {
			 code:`METHOD`,
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
    // 캐시관련
    var prevProgram_UUID;
    var transparentList = []
    RedRenderer.prototype.worldRender = (function () {
        var tWorldRect;
        var self;
        var valueParser;
        var updateSystemUniform;
        var glInitialize;
        var lightDebugRenderList;
        lightDebugRenderList = []
        // 숫자면 숫자로 %면 월드대비 수치로 변경해줌
        valueParser = (function () {
            var i;
            return function (rect) {
                i = rect.length;
                while (i--) {
                    if (typeof rect[i] == 'number') rect[i] = rect[i];
                    else {
                        if (i < 2) rect[i] = tWorldRect[i + 2] * parseFloat(rect[i]) / 100
                        else rect[i] = tWorldRect[i] * parseFloat(rect[i]) / 100
                    }
                }
                return rect;
            }
        })();
        updateSystemUniform = function (redGL, time, tView) {
            prevProgram_UUID = RedSystemUniformUpdater.update(redGL, this, time, tView, prevProgram_UUID, lightDebugRenderList)
        }
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
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.disable(gl.DITHER)
            // gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            // // 픽셀 블렌딩 결정
            // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            // 픽셀 플립 기본설정
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        };
        return function (redGL, time) {
            var gl;
            var tScene;
            var tRenderInfo
            var tPerspectiveMTX;
            var tCamera
            var i;
            var len;
            var tView;
            var tViewRect;
            gl = redGL.gl;
            self = this;
            if (window['RedGLTFLoader']) RedGLTFLoader.animationLooper(time)
            // 캔버스 사이즈 적용
            tWorldRect = self['worldRect']
            tWorldRect[0] = 0;
            tWorldRect[1] = 0;
            tWorldRect[2] = gl.drawingBufferWidth;
            tWorldRect[3] = gl.drawingBufferHeight;
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.scissor(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            transparentList.length = 0
            if (!self['_glInitialized']) glInitialize(gl), self['_glInitialized'] = true
            // console.log("worldRender", v['key'], t0)
            self['renderInfo'] = {}
            self['cacheInfo']['cacheAttrInfo'].length = 0
            // 일단 0번과 1번텍스트는 무조건 체운다.
            redGL.gl.activeTexture(redGL.gl.TEXTURE0);
            redGL.gl.bindTexture(redGL.gl.TEXTURE_2D, redGL['_datas']['emptyTexture']['2d']['webglTexture']);
            redGL.gl.activeTexture(redGL.gl.TEXTURE0 + 1);
            redGL.gl.bindTexture(redGL.gl.TEXTURE_CUBE_MAP, redGL['_datas']['emptyTexture']['3d']['webglTexture']);
            i = 0;
            len = self['world']['_viewList'].length
            for (i; i < len; i++) {
                // self['world']['_viewList'].forEach(function (tView) {
                tView = self['world']['_viewList'][i]
                ///////////////////////////////////
                // view의 위치/크기결정
                tViewRect = tView['_viewRect']
                tViewRect[0] = tView['_x'];
                tViewRect[1] = tView['_y'];
                tViewRect[2] = tView['_width'];
                tViewRect[3] = tView['_height'];
                tCamera = tView['camera'];
                tScene = tView['scene']
                // 위치/크기의 % 여부를 파싱
                valueParser(tViewRect);
                // 현재뷰에 대한 렌더 디버깅 정보
                if (!self['renderInfo'][tView['key']]) self['renderInfo'][tView['key']] = {}
                tRenderInfo = self['renderInfo'][tView['key']]
                tRenderInfo['orthographicYn'] = tCamera instanceof RedBaseController ? tCamera.camera['orthographicYn'] : tCamera['orthographicYn']
                tRenderInfo['x'] = tView['_x']
                tRenderInfo['y'] = tView['_y']
                tRenderInfo['width'] = tView['_width']
                tRenderInfo['height'] = tView['_height']
                tRenderInfo['viewRectX'] = tViewRect[0]
                tRenderInfo['viewRectY'] = tViewRect[1]
                tRenderInfo['viewRectWidth'] = tViewRect[2]
                tRenderInfo['viewRectHeight'] = tViewRect[3]
                tRenderInfo['key'] = tView['key']
                tRenderInfo['call'] = 0
                tRenderInfo['triangleNum'] = 0
                tRenderInfo['viewRenderTime'] = 0
                tRenderInfo['postEffectRenderTime'] = 0
                // viewport 크기설정
                gl.viewport(tViewRect[0], tWorldRect[3] - tViewRect[3] - tViewRect[1], tViewRect[2], tViewRect[3]);
                gl.scissor(tViewRect[0], tWorldRect[3] - tViewRect[3] - tViewRect[1], tViewRect[2], tViewRect[3]);
                // 배경 설정
                if (tScene['_useBackgroundColor']) {
                    if (tScene['_useFog']) gl.clearColor(tScene['_fogR'], tScene['_fogG'], tScene['_fogB'], 1);
                    else gl.clearColor(tScene['_r'], tScene['_g'], tScene['_b'], 1);
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                } else {
                    gl.clearColor(0, 0, 0, 1);
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                }
                // 카메라 메트릭스 설정
                if (tCamera instanceof RedBaseController) {
                    // 카메라 형식이 아닌경우 컨트롤러로 판단함
                    tCamera['update']();
                    tCamera = tCamera['camera'];
                }
                if (tCamera['autoUpdateMatrix']) tCamera['update']();
                // 퍼스펙티브 매트릭스 설정
                // view 에 적용할 카메라 퍼스펙티브를 계산
                tPerspectiveMTX = tCamera['perspectiveMTX'];
                mat4.identity(tPerspectiveMTX);
                if (tCamera['orthographicYn']) {
                    mat4.ortho(
                        tPerspectiveMTX,
                        -0.5, // left
                        0.5, // right
                        -0.5, // bottom
                        0.5, // top,
                        -tCamera['farClipping'],
                        tCamera['farClipping']
                    )
                    mat4.translate(tPerspectiveMTX, tPerspectiveMTX, [-0.5, 0.5, 0])
                    mat4.scale(tPerspectiveMTX, tPerspectiveMTX, [1 / tViewRect[2], -1 / tViewRect[3], 1]);
                    mat4.identity(tCamera['matrix'])
                    gl.disable(gl.CULL_FACE);
                    self['cacheState']['useCullFace'] = false
                } else {
                    mat4.perspective(
                        tPerspectiveMTX,
                        tCamera['fov'] * Math.PI / 180,
                        tViewRect[2] / tViewRect[3],
                        tCamera['nearClipping'],
                        tCamera['farClipping']
                    );
                    gl.enable(gl.CULL_FACE);
                    self['cacheState']['useCullFace'] = true
                }
                // 뎁스마스크 원상복구
                self['cacheState']['useDepthMask'] ? 0 : gl.depthMask(self['cacheState']['useDepthMask'] = true);
                // 마우스 이벤트 렌더
                if (tScene['mouseManager']) {
                    updateSystemUniform.apply(self, [redGL, time, tView])
                    tScene['mouseManager']['render'](redGL, self, tView, time, tRenderInfo)

                }
                // 디렉셔널 쉐도우 렌더
                if (tScene['shadowManager']['_directionalShadow']) {
                    updateSystemUniform.apply(self, [redGL, time, tView])
                    gl.disable(gl.BLEND);
                    gl.blendFunc(gl.ONE, gl.ONE);
                    self['cacheState']['useBlendMode'] = true
                    self['cacheState']['blendSrc'] = gl.ONE
                    self['cacheState']['blendDst'] = gl.ONE
                    tScene['shadowManager']['render'](redGL, self, tView, time, tRenderInfo)
                    gl.enable(gl.BLEND);
                    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                    self['cacheState']['useBlendMode'] = true
                    self['cacheState']['blendSrc'] = gl.SRC_ALPHA
                    self['cacheState']['blendDst'] = gl.ONE_MINUS_SRC_ALPHA
                }

                // 포스트이펙트 확인
                if (tView['postEffectManager']['postEffectList'].length) {
                    tView['postEffectManager'].bind(gl);
                    // mat4.perspective(
                    // 	tPerspectiveMTX,
                    // 	tCamera['fov'] * Math.PI / 180,
                    // 	tView['postEffectManager']['frameBuffer']['width'] / tView['postEffectManager']['frameBuffer']['height'],
                    // 	tCamera['nearClipping'],
                    // 	tCamera['farClipping']
                    // );
                    gl.viewport(0, 0, tView['postEffectManager']['frameBuffer']['width'], tView['postEffectManager']['frameBuffer']['height']);
                    gl.scissor(0, 0, tView['postEffectManager']['frameBuffer']['width'], tView['postEffectManager']['frameBuffer']['height']);
                }
                ///////////////////////////////
                // 실제렌더 계산
                updateSystemUniform.apply(self, [redGL, time, tView])
                if (tScene['skyBox']) {
                    tScene['skyBox']['x'] = tCamera.x
                    tScene['skyBox']['y'] = tCamera.y
                    tScene['skyBox']['z'] = tCamera.z
                    tScene['skyBox']['scaleX'] = tScene['skyBox']['scaleY'] = tScene['skyBox']['scaleZ'] = tCamera['farClipping'] * 0.6
                    self.sceneRender(redGL, tScene, tCamera, tCamera['orthographicYn'], [tScene['skyBox']], time, tRenderInfo);
                }

                // 씬렌더 호출
                self.sceneRender(redGL, tScene, tCamera, tCamera['orthographicYn'], tScene['children'], time, tRenderInfo);
                if (transparentList.length) self.sceneRender(redGL, tScene, tCamera, tCamera['orthographicYn'], transparentList, time, tRenderInfo, null, true);
                // 그리드가 있으면 그림
                if (tScene['grid']) self.sceneRender(redGL, tScene, tCamera, tCamera['orthographicYn'], [tScene['grid']], time, tRenderInfo);
                // asix가 있으면 그림
                if (tScene['axis']) self.sceneRender(redGL, tScene, tCamera, tCamera['orthographicYn'], tScene['axis']['children'], time, tRenderInfo);
                // 디버깅 라이트 업데이트
                if (lightDebugRenderList.length) self.sceneRender(redGL, tScene, tCamera, tCamera['orthographicYn'], lightDebugRenderList, time, tRenderInfo);
                // 포스트이펙트 최종렌더
                tRenderInfo['viewRenderTime'] = performance.now();
                if (tView['postEffectManager']['postEffectList'].length) tView['postEffectManager'].render(redGL, gl, self, tView, time, tRenderInfo)
                tRenderInfo['postEffectRenderTime'] = performance.now() - tRenderInfo['viewRenderTime'];
                tRenderInfo['viewRenderTime'] -= time;
                // })
            }
            if (this['renderDebuger']['visible']) this['renderDebuger'].update(redGL, self['renderInfo'])
        }
    })();
    RedRenderer.prototype.sceneRender = (function () {
        var draw;
        var tPrevIndexBuffer_UUID;
        var tPrevInterleaveBuffer_UUID;
        var tPrevSamplerIndex;
        draw = function (redGL,
                         scene,
                         children,
                         camera,
                         orthographicYn,
                         time,
                         renderResultObj,
                         tCacheInfo,
                         tCacheState,
                         parentMTX,
                         subSceneMaterial,
                         transparentMode) {
            var i, i2;
            // 캐쉬관련
            var tGL = redGL.gl
            var tCacheInterleaveBuffer = tCacheInfo['cacheAttrInfo'];
            var tCacheUniformInfo = tCacheInfo['cacheUniformInfo'];
            var tCacheSamplerIndex = tCacheInfo['cacheSamplerIndex'];
            var tCacheTexture = tCacheInfo['cacheTexture'];
            // 오쏘고날 스케일 비율
            var orthographicYnScale = orthographicYn ? -1 : 1;
            //
            var CONVERT_RADIAN;
            //
            var tMesh, tGeometry, tMaterial;
            var tLODInfo;
            var tAttrGroup, tAttributeLocationInfo, tInterleaveDefineInfo, tInterleaveDefineUnit;
            var tUniformGroup, tSystemUniformGroup, tUniformLocationInfo, tWebGLUniformLocation,
                tWebGLAttributeLocation;
            var tInterleaveBuffer, tIndexBufferInfo;
            var tUniformValue
            var tRenderType, tRenderTypeIndex;
            var tMVMatrix, tNMatrix
            var tUUID;
            var tSamplerIndex;
            var tSprite3DYn, tLODData, tDirectionalShadowMaterialYn, tSkinInfo, tUseFog;
            var tProgram, tOptionProgramKey, tOptionProgram;
            // matix 관련
            var a,
                aSx, aSy, aSz, aCx, aCy, aCz, tRx, tRy, tRz,
                a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33,
                b0, b1, b2, b3,
                b00, b01, b02, b10, b11, b12, b20, b21, b22,
                aX, aY, aZ,
                inverse_c, inverse_d, inverse_e, inverse_g, inverse_f, inverse_h, inverse_i, inverse_j, inverse_k,
                inverse_l, inverse_n, inverse_o, inverse_A, inverse_m, inverse_p, inverse_r, inverse_s, inverse_B,
                inverse_t, inverse_u, inverse_v, inverse_w, inverse_x, inverse_y, inverse_z, inverse_C, inverse_D,
                inverse_E, inverse_q;
            // sin,cos 관련
            var tRadian, CPI, CPI2, C225, C127, C045, C157;
            // LOD 관련
            var lodX, lodY, lodZ, lodDistance;
            // 프로그램 성택관련
            var tUseDirectionalShadow
            var tProgramList;
            var tBaseProgramKey;
            //////////////// 변수값 할당 ////////////////
            CONVERT_RADIAN = Math.PI / 180;
            CPI = 3.141592653589793, CPI2 = 6.283185307179586, C225 = 0.225, C127 = 1.27323954, C045 = 0.405284735, C157 = 1.5707963267948966;
            //////////////// 렌더시작 ////////////////
            i = children.length
            var len3 = children.length - 1
            tUseFog = scene['_useFog']
            while (i--) {
                renderResultObj['call']++;
                tMesh = children[len3 - i];
                tMVMatrix = tMesh['matrix'];
                tNMatrix = tMesh['normalMatrix'];
                tGeometry = tMesh['_geometry'];
                tSprite3DYn = tMesh['_sprite3DYn'];
                tSkinInfo = tMesh['skinInfo']
                // LOD체크
                if (tMesh['useLOD']) {
                    lodX = camera.x - tMesh.x;
                    lodY = camera.y - tMesh.y;
                    lodZ = camera.z - tMesh.z
                    lodDistance = Math.abs(Math.sqrt(lodX * lodX + lodY * lodY + lodZ * lodZ));
                    tLODInfo = tMesh['_lodLevels']
                    for (var k in tLODInfo) {
                        tLODData = tLODInfo[k]
                        if (tLODData['distance'] < lodDistance) {
                            tMesh['_geometry'] = tLODData['geometry'];
                            tMesh['_material'] = tLODData['material'];
                        }
                    }
                }
                if (tGeometry) {
                    tMaterial = subSceneMaterial ? subSceneMaterial : tMesh['_material'];
                    tDirectionalShadowMaterialYn = tMaterial['_RedDirectionalShadowYn'];
                    // 마우스 이벤트 커러설정
                    tMaterial['_RedMouseEventMaterialYn'] ?  tMaterial['color'] = tMesh['_mouseColorID'] : 0
                    // SpriteSheet체크
                    if (tMaterial['__RedSheetMaterialYn']) {
                        if (!tMaterial['_nextFrameTime']) tMaterial['_nextFrameTime'] = tMaterial['_perFrameTime'] + time
                        if (tMaterial['_playYn'] && tMaterial['_nextFrameTime'] < time) {
                            var gapFrame = parseInt((time - tMaterial['_nextFrameTime']) / tMaterial['_perFrameTime']);
                            gapFrame = gapFrame || 1
                            tMaterial['_nextFrameTime'] = tMaterial['_perFrameTime'] + time;
                            tMaterial['currentIndex'] += gapFrame;
                            if (tMaterial['currentIndex'] >= tMaterial['totalFrame']) {
                                if (tMaterial['_loop']) tMaterial['_playYn'] = true, tMaterial['currentIndex'] = 0;
                                else tMaterial['_playYn'] = false, tMaterial['currentIndex'] = tMaterial['totalFrame'] - 1
                            }
                        }
                        tMaterial['_sheetRect'][0] = 1 / tMaterial['_segmentW'];
                        tMaterial['_sheetRect'][1] = 1 / tMaterial['_segmentH'];
                        tMaterial['_sheetRect'][2] = (tMaterial['currentIndex'] % tMaterial['_segmentW']) / tMaterial['_segmentW'];
                        tMaterial['_sheetRect'][3] = Math.floor(tMaterial['currentIndex'] / tMaterial['_segmentH']) / tMaterial['_segmentH'];
                    }
                    // 재질 캐싱
                    // Program 판단
                    //TODO: 프로그램 생성로직정리후 선택로직 확정
                    tUseDirectionalShadow = scene['shadowManager']['_directionalShadow'];
                    tProgram = tMaterial['program']
                    if (tProgram['_prepareProgramYn']) {
                        tProgram = tMaterial['program'] = tProgram._makePrepareProgram();
                    }
                    tOptionProgramKey = null;
                    tOptionProgram = null;
                    tBaseProgramKey = tProgram['key']
                    tProgramList = tMaterial['_programList']
                    //TODO: 스킨관련 추가해야함
                    if (tProgramList) {
                        if (tUseDirectionalShadow) {
                            if (tUseFog && tSprite3DYn) tOptionProgramKey = 'directionalShadow_fog_sprite3D'
                            else if (tUseFog && tSkinInfo) tOptionProgramKey = 'directionalShadow_fog_skin'
                            else if (tSkinInfo) tOptionProgramKey = 'directionalShadow_skin'
                            else if (tSprite3DYn) tOptionProgramKey = 'directionalShadow_sprite3D'
                            else if (tUseFog) tOptionProgramKey = 'directionalShadow_fog'
                            else tOptionProgramKey = 'directionalShadow'
                        }
                        else {
                            if (tUseFog && tSprite3DYn) tOptionProgramKey = 'fog_sprite3D'
                            else if (tUseFog && tSkinInfo) tOptionProgramKey = 'fog_skin'
                            else if (tSkinInfo) tOptionProgramKey = 'skin'
                            else if (tSprite3DYn) tOptionProgramKey = 'sprite3D'
                            else if (tUseFog) tOptionProgramKey = 'fog'
                        }
                    }

                    if (tOptionProgramKey) {
                        tOptionProgram = tProgramList[tOptionProgramKey][tBaseProgramKey];
                        try {
                            tOptionProgram['_prepareProgramYn']
                        } catch (e) {
                            console.log(e, tProgram, tProgramList, tOptionProgramKey, tBaseProgramKey)
                        }

                        if (tOptionProgram['_prepareProgramYn']) {
                            console.log(tProgramList, tOptionProgramKey, tBaseProgramKey)
                            tOptionProgram = tProgramList[tOptionProgramKey][tBaseProgramKey] = tOptionProgram._makePrepareProgram();
                        }
                        tProgram = tOptionProgram
                    }
                    //
                    prevProgram_UUID == tProgram['_UUID'] ? 0 : tGL.useProgram(tProgram['webglProgram']);
                    prevProgram_UUID = tProgram['_UUID'];
                    // 업데이트할 어트리뷰트와 유니폼 정보를 가져옴
                    tAttrGroup = tProgram['attributeLocation'];
                    tUniformGroup = tProgram['uniformLocation'];
                    tSystemUniformGroup = tProgram['systemUniformLocation'];
                    // 버퍼를 찾는다.
                    tInterleaveBuffer = tGeometry['interleaveBuffer']; // 인터리브 버퍼
                    tIndexBufferInfo = tGeometry['indexBuffer']; // 엘리먼트 버퍼
                    /////////////////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////
                    // 버퍼의 UUID
                    tUUID = tInterleaveBuffer['_UUID'];
                    // 실제 버퍼 바인딩하고
                    // 프로그램의 어트리뷰트를 순환한다.
                    i2 = tAttrGroup.length;
                    // interleaveDefineInfoList 정보를 가져온다.
                    tInterleaveDefineInfo = tInterleaveBuffer['interleaveDefineInfoList'];
                    tPrevInterleaveBuffer_UUID == tUUID ? 0 : tGL.bindBuffer(tGL.ARRAY_BUFFER, tInterleaveBuffer['webglBuffer']);
                    tPrevInterleaveBuffer_UUID = tUUID;
                    while (i2--) {
                        // 대상 어트리뷰트의 로케이션 정보를 구함
                        tAttributeLocationInfo = tAttrGroup[i2];
                        // 대상 어트리뷰트의 이름으로 interleaveDefineInfoList에서 단위 인터리브 정보를 가져온다.
                        tInterleaveDefineUnit = tInterleaveDefineInfo[tAttributeLocationInfo['name']];
                        /*
                         어트리뷰트 정보매칭이 안되는 녀석은 무시한다
                         이경우는 버퍼상에는 존재하지만 프로그램에서 사용하지 않는경우이다.
                        */
                        // webgl location도 알아낸다.
                        tWebGLAttributeLocation = tAttributeLocationInfo['location']
                        if ( tInterleaveDefineUnit && tCacheInterleaveBuffer[tWebGLAttributeLocation] != tInterleaveDefineUnit['_UUID']) {
                            // 해당로케이션을 활성화된적이없으면 활성화 시킨다
                            tAttributeLocationInfo['enabled'] ? 0 : tGL.enableVertexAttribArray(tWebGLAttributeLocation);
                            tAttributeLocationInfo['enabled'] = 1;
                            tGL.vertexAttribPointer(
                                tWebGLAttributeLocation,
                                tInterleaveDefineUnit['size'],
                                tInterleaveBuffer['glArrayType'],
                                tInterleaveDefineUnit['normalize'],
                                tInterleaveBuffer['stride_BYTES_PER_ELEMENT'], //stride
                                tInterleaveDefineUnit['offset_BYTES_PER_ELEMENT'] //offset
                                // tInterleaveBuffer['stride'] * BYTES_PER_ELEMENT, //stride
                                // tInterleaveDefineUnit['offset'] * BYTES_PER_ELEMENT //offset
                            );
                            // 상태 캐싱
                            tCacheInterleaveBuffer[tWebGLAttributeLocation] = tInterleaveDefineUnit['_UUID']
                        }
                        // if ( !tInterleaveDefineUnit){
                        //     //TODO - 사용하지않는 어트리뷰트일경우를 생각해야하는거군..
                        //
                        //     console.log('걸렸냐',tAttributeLocationInfo)
                        // }

                    }
                    /////////////////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////
                    // 유니폼 업데이트
                    i2 = tUniformGroup.length;
                    while (i2--) {
                        tUniformLocationInfo = tUniformGroup[i2];
                        tWebGLUniformLocation = tUniformLocationInfo['location'];
                        tUUID = tUniformLocationInfo['_UUID'];
                        tRenderTypeIndex = tUniformLocationInfo['renderTypeIndex'];
                        tRenderType = tUniformLocationInfo['renderType'];
                        tUniformValue = tMaterial[tUniformLocationInfo['materialPropertyName']];
                        // console.log(tCacheInfo)
                        if (tRenderType == 'sampler2D' || tRenderType == 'samplerCube') {
                            tSamplerIndex = tUniformLocationInfo['samplerIndex'];
                            // samplerIndex : 0,1 번은 생성용으로 쓴다.
                            if (tUniformValue) {
                                if (tCacheTexture[tSamplerIndex] != tUniformValue['_UUID']) {
                                    tPrevSamplerIndex == tSamplerIndex ? 0 : tGL.activeTexture(tGL.TEXTURE0 + (tPrevSamplerIndex = tSamplerIndex));
                                    if (tUniformValue['_videoDom']) {
                                        //TODO: 일단 비디오를 우겨넣었으니 정리를 해야함
                                        tGL.bindTexture(tGL.TEXTURE_2D, tUniformValue['webglTexture']);
                                        if (tUniformValue['_videoDom']['loaded']) tGL.texImage2D(tGL.TEXTURE_2D, 0, tGL.RGBA, tGL.RGBA, tGL.UNSIGNED_BYTE, tUniformValue['_videoDom'])
                                    } else tGL.bindTexture(tRenderType == 'sampler2D' ? tGL.TEXTURE_2D : tGL.TEXTURE_CUBE_MAP, tUniformValue['webglTexture']);
                                    tCacheSamplerIndex[tUUID] == tSamplerIndex ? 0 : tGL.uniform1i(tWebGLUniformLocation, tCacheSamplerIndex[tUUID] = tSamplerIndex);
                                    tCacheTexture[tSamplerIndex] = tUniformValue['_UUID'];
                                }
                                // // 아틀라스 UV검색
                                // if ( tSystemUniformGroup['uAtlascoord']['location'] ) {
                                // 	tUUID = tSystemUniformGroup['uAtlascoord']['_UUID']
                                // 	if ( tCacheUniformInfo[tUUID] != tUniformValue['atlascoord']['data']['_UUID'] ) {
                                // 		tGL.uniform4fv(tSystemUniformGroup['uAtlascoord']['location'], tUniformValue['atlascoord']['data'])
                                // 		tCacheUniformInfo[tUUID] = tUniformValue['atlascoord']['data']['_UUID']
                                // 	}
                                // }
                            }
                            else {
                                // TODO: 이제는 이놈들을 날릴수있을듯한데...
                                // console.log('설마',tUniformLocationInfo['materialPropertyName'])
                                if (tRenderType == 'sampler2D') {
                                    if (tCacheTexture[tSamplerIndex] != 0) {
                                        // tPrevSamplerIndex == 0 ? 0 : tGL.activeTexture(tGL.TEXTURE0);
                                        // tGL.bindTexture(tGL.TEXTURE_2D, redGL['_datas']['emptyTexture']['2d']['webglTexture']);
                                        tCacheSamplerIndex[tUUID] == 0 ? 0 : tGL.uniform1i(tWebGLUniformLocation, tCacheSamplerIndex[tUUID] = 0);
                                        tCacheTexture[tSamplerIndex] = 0;
                                        tPrevSamplerIndex = 0;
                                    }
                                } else {
                                    if (tCacheTexture[tSamplerIndex] != 1) {
                                        // tPrevSamplerIndex == 1 ? 0 : tGL.activeTexture(tGL.TEXTURE0 + 1);
                                        // tGL.bindTexture(tGL.TEXTURE_CUBE_MAP, redGL['_datas']['emptyTexture']['3d']['webglTexture']);
                                        tCacheSamplerIndex[tUUID] == 1 ? 0 : tGL.uniform1i(tWebGLUniformLocation, tCacheSamplerIndex[tUUID] = 1);
                                        tCacheTexture[tSamplerIndex] = 1;
                                        tPrevSamplerIndex = 1;
                                    }
                                }
                            }
                        } else {
                            tUniformValue == undefined ? RedGLUtil.throwFunc('RedRenderer : Material에 ', tUniformLocationInfo['materialPropertyName'], '이 정의 되지않았습니다.') : 0;
                            //TODO: 비교계산을 줄일수는 없을까...
                            tRenderTypeIndex < 13 ? tCacheUniformInfo[tUUID] == tUniformValue ? 0 : tGL[tUniformLocationInfo['renderMethod']](tWebGLUniformLocation, (tCacheUniformInfo[tUUID] = tRenderTypeIndex == 12 ? null : tUniformValue, tUniformValue)) :
                                tRenderTypeIndex == 13 ? tGL[tUniformLocationInfo['renderMethod']](tWebGLUniformLocation, false, tUniformValue) :
                                    RedGLUtil.throwFunc('RedRenderer : 처리할수없는 타입입니다.', 'tRenderType -', tRenderType)
                            // tRenderType == 'float' || tRenderType == 'int' || tRenderType == 'bool' ? tCacheUniformInfo[tUUID] == tUniformValue ? 0 : tGL[tUniformLocationInfo['renderMethod']](tWebGLUniformLocation, (tCacheUniformInfo[tUUID] = tUniformValue.length ? null : tUniformValue, tUniformValue)) :
                            // 	// tRenderType == 'int' ? noChangeUniform ? 0 : tGL[tUniformLocationInfo['renderMethod']](tWebGLUniformLocation, (tCacheUniformInfo[tUUID] = tUniformValue.length ? null : tUniformValue, tUniformValue)) :
                            // 	// 	tRenderType == 'bool' ? noChangeUniform ? 0 : tGL[tUniformLocationInfo['renderMethod']](tWebGLUniformLocation, (tCacheUniformInfo[tUUID] = tUniformValue.length ? null : tUniformValue, tUniformValue)) :
                            // 	tRenderType == 'vec' ? tGL[tUniformLocationInfo['renderMethod']](tWebGLUniformLocation, tUniformValue) :
                            // 		tRenderType == 'mat' ? tGL[tUniformLocationInfo['renderMethod']](tWebGLUniformLocation, false, tUniformValue) :
                            // 			RedGLUtil.throwFunc('RedRenderer : 처리할수없는 타입입니다.', 'tRenderType -', tRenderType)
                        }
                    }
                }
                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
                // tMVMatrix
                // tMVMatrix 초기화
                if (tMesh['autoUpdateMatrix']) {
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
                        tSprite3DYn ?
                            (tRx = tRy = tRz = 0) :
                            (tRx = tMesh['rotationX'] * CONVERT_RADIAN, tRy = tMesh['rotationY'] * CONVERT_RADIAN, tRz = tMesh['rotationZ'] * CONVERT_RADIAN),
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
                        aX = tMesh['scaleX'], aY = tMesh['scaleY'] * orthographicYnScale, aZ = tMesh['scaleZ'],
                        a[0] = a[0] * aX, a[1] = a[1] * aX, a[2] = a[2] * aX, a[3] = a[3] * aX,
                        a[4] = a[4] * aY, a[5] = a[5] * aY, a[6] = a[6] * aY, a[7] = a[7] * aY,
                        a[8] = a[8] * aZ, a[9] = a[9] * aZ, a[10] = a[10] * aZ, a[11] = a[11] * aZ,
                        a[12] = a[12], a[13] = a[13], a[14] = a[14], a[15] = a[15],
                        // localMatrix
                        tMesh['localMatrix'][0] = a[0] , tMesh['localMatrix'][1] = a[1] , tMesh['localMatrix'][2] = a[2] , tMesh['localMatrix'][3] = a[3] ,
                        tMesh['localMatrix'][4] = a[4] , tMesh['localMatrix'][5] = a[5] , tMesh['localMatrix'][6] = a[6] , tMesh['localMatrix'][7] = a[7] ,
                    tMesh['localMatrix'][8] = a[8] , tMesh['localMatrix'][9] = a[9] , tMesh['localMatrix'][10] = a[10], tMesh['localMatrix'][11] = a[11] ,
                    tMesh['localMatrix'][12] = a[12], tMesh['localMatrix'][13] = a[13], tMesh['localMatrix'][14] = a[14], tMesh['localMatrix'][15] = a[15],
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
                    ) : 0;
                }
                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
                if (tGeometry) tGL.uniformMatrix4fv(tSystemUniformGroup['uMMatrix']['location'], false, tMVMatrix)

                if (tSkinInfo) {
                    var globalTransformOfJointNode = []
                    var joints = tSkinInfo['joints']
                    var index = 0, len = joints.length
                    var globalTransformOfNodeThatTheMeshIsAttachedTo = [
                        tMesh['matrix'][0],
                        tMesh['matrix'][1],
                        tMesh['matrix'][2],
                        tMesh['matrix'][3],
                        tMesh['matrix'][4],
                        tMesh['matrix'][5],
                        tMesh['matrix'][6],
                        tMesh['matrix'][7],
                        tMesh['matrix'][8],
                        tMesh['matrix'][9],
                        tMesh['matrix'][10],
                        tMesh['matrix'][11],
                        tMesh['matrix'][12],
                        tMesh['matrix'][13],
                        tMesh['matrix'][14],
                        tMesh['matrix'][15]
                    ]
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    // 역구하고
                    // getInverse(globalTransformOfNodeThatTheMeshIsAttachedTo, globalTransformOfNodeThatTheMeshIsAttachedTo)
                    var te = globalTransformOfNodeThatTheMeshIsAttachedTo,
                        me = globalTransformOfNodeThatTheMeshIsAttachedTo,
                        n11 = me[0], n21 = me[1], n31 = me[2], n41 = me[3],
                        n12 = me[4], n22 = me[5], n32 = me[6], n42 = me[7],
                        n13 = me[8], n23 = me[9], n33 = me[10], n43 = me[11],
                        n14 = me[12], n24 = me[13], n34 = me[14], n44 = me[15],
                        t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
                        t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
                        t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
                        t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
                    var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
                    if (det === 0) {
                        console.warn("can't invert matrix, determinant is 0");
                        return mat4.identity(globalTransformOfNodeThatTheMeshIsAttachedTo);
                    } else {
                        var detInv = 1 / det;
                        te[0] = t11 * detInv;
                        te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
                        te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
                        te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
                        te[4] = t12 * detInv;
                        te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
                        te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
                        te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
                        te[8] = t13 * detInv;
                        te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
                        te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
                        te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
                        te[12] = t14 * detInv;
                        te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
                        te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
                        te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
                    }
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    // 글로벌 조인트 노드병합함
                    //TODO: 여기 캐싱할 방법 찾아야함
                    for (index; index < len; index++) {
                        // 조인트 공간내에서의 전역
                        globalTransformOfJointNode[index * 16 + 0] = joints[index]['matrix'][0]
                        globalTransformOfJointNode[index * 16 + 1] = joints[index]['matrix'][1]
                        globalTransformOfJointNode[index * 16 + 2] = joints[index]['matrix'][2]
                        globalTransformOfJointNode[index * 16 + 3] = joints[index]['matrix'][3]
                        globalTransformOfJointNode[index * 16 + 4] = joints[index]['matrix'][4]
                        globalTransformOfJointNode[index * 16 + 5] = joints[index]['matrix'][5]
                        globalTransformOfJointNode[index * 16 + 6] = joints[index]['matrix'][6]
                        globalTransformOfJointNode[index * 16 + 7] = joints[index]['matrix'][7]
                        globalTransformOfJointNode[index * 16 + 8] = joints[index]['matrix'][8]
                        globalTransformOfJointNode[index * 16 + 9] = joints[index]['matrix'][9]
                        globalTransformOfJointNode[index * 16 + 10] = joints[index]['matrix'][10]
                        globalTransformOfJointNode[index * 16 + 11] = joints[index]['matrix'][11]
                        globalTransformOfJointNode[index * 16 + 12] = joints[index]['matrix'][12]
                        globalTransformOfJointNode[index * 16 + 13] = joints[index]['matrix'][13]
                        globalTransformOfJointNode[index * 16 + 14] = joints[index]['matrix'][14]
                        globalTransformOfJointNode[index * 16 + 15] = joints[index]['matrix'][15]
                    }
                    tGL.uniformMatrix4fv(tSystemUniformGroup['uGlobalTransformOfNodeThatTheMeshIsAttachedTo']['location'], false, globalTransformOfNodeThatTheMeshIsAttachedTo)
                    tGL.uniformMatrix4fv(tSystemUniformGroup['uJointMatrix']['location'], false, globalTransformOfJointNode)
                    tGL.uniformMatrix4fv(tSystemUniformGroup['uInverseBindMatrixForJoint']['location'], false, tSkinInfo['inverseBindMatrices'])
                }
                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
                // 노말매트릭스를 사용할경우
                if (tGeometry && tSystemUniformGroup && tSystemUniformGroup['uNMatrix']['location']) {
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
                        tGL.uniformMatrix4fv(tSystemUniformGroup['uNMatrix']['location'], false, tNMatrix)
                }
                if (tGeometry) {
                    /////////////////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////
                    // 상태처리
                    // 컬페이스 사용여부 캐싱처리
                    tCacheState['useCullFace'] != tMesh['useCullFace'] ? (tCacheState['useCullFace'] = tMesh['useCullFace']) ? tGL.enable(tGL.CULL_FACE) : tGL.disable(tGL.CULL_FACE) : 0;
                    // 컬페이스 캐싱처리
                    tCacheState['useCullFace'] ? tCacheState['cullFace'] != tMesh['cullFace'] ? tGL.cullFace(tCacheState['cullFace'] = tMesh['cullFace']) : 0 : 0;
                    // 뎁스마스크처리
                    tCacheState['useDepthMask'] != tMesh['useDepthMask'] ? tGL.depthMask(tCacheState['useDepthMask'] = tMesh['useDepthMask']) : 0;
                    // 뎁스테스트 사용여부 캐싱처리
                    tCacheState['useDepthTest'] != tMesh['useDepthTest'] ? (tCacheState['useDepthTest'] = tMesh['useDepthTest']) ? tGL.enable(tGL.DEPTH_TEST) : tGL.disable(tGL.DEPTH_TEST) : 0;
                    // 뎁스테스팅 캐싱처리
                    tCacheState['useDepthTest'] ? tCacheState['depthTestFunc'] != tMesh['depthTestFunc'] ? tGL.depthFunc(tCacheState['depthTestFunc'] = tMesh['depthTestFunc']) : 0 : 0;
                    if (tSystemUniformGroup['uPointSize']['use']) {
                        tCacheState['pointSize'] != tMesh['pointSize'] ? tGL.uniform1f(tSystemUniformGroup['uPointSize']['location'], tCacheState['pointSize'] = tMesh['pointSize']) : 0;
                    }
                    if (tSystemUniformGroup['u_PerspectiveScale']['location']) {
                        tUUID = tSystemUniformGroup['u_PerspectiveScale']['_UUID']
                        tUniformValue = tMesh['_perspectiveScale']
                        if (tCacheUniformInfo[tUUID] != tUniformValue) {
                            tGL[tSystemUniformGroup['u_PerspectiveScale']['renderMethod']](tSystemUniformGroup['u_PerspectiveScale']['location'], tUniformValue)
                            tCacheUniformInfo[tUUID] = tUniformValue
                        }
                    }
                    // // 블렌딩 사용여부 캐싱처리
                    if (!tDirectionalShadowMaterialYn) {
                        tCacheState['useBlendMode'] != tMesh['useBlendMode'] ? (tCacheState['useBlendMode'] = tMesh['useBlendMode']) ? tGL.enable(tGL.BLEND) : tGL.disable(tGL.BLEND) : 0;
                        // 블렌딩팩터 캐싱처리
                        if (tCacheState['blendSrc'] != tMesh['blendSrc'] || tCacheState['blendDst'] != tMesh['blendDst']) {
                            tGL.blendFunc(tMesh['blendSrc'], tMesh['blendDst']);
                            tCacheState['blendSrc'] = tMesh['blendSrc'];
                            tCacheState['blendDst'] = tMesh['blendDst'];
                        }
                    }
                    /////////////////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////
                    if (!transparentMode) {
                        if (tMesh['useTransparentSort']) {
                            transparentList.push(tMesh)
                            tMesh._renderAutoUpdateMatrix = tMesh.autoUpdateMatrix
                            tMesh.autoUpdateMatrix = false
                            continue
                        }
                    } else {
                        tMesh.autoUpdateMatrix = tMesh._renderAutoUpdateMatrix
                    }
                    // 드로우
                    if (tIndexBufferInfo) {
                        tPrevIndexBuffer_UUID == tIndexBufferInfo['_UUID'] ? 0 : tGL.bindBuffer(tGL.ELEMENT_ARRAY_BUFFER, tIndexBufferInfo['webglBuffer'])
                        //enum mode, long count, enum type, long offset
                        tGL.drawElements(
                            tMesh['drawMode'],
                            tIndexBufferInfo['pointNum'],
                            tIndexBufferInfo['glArrayType'],
                            0
                        );
                        tPrevIndexBuffer_UUID = tIndexBufferInfo['_UUID'];
                        renderResultObj['triangleNum'] += tIndexBufferInfo['triangleNum'];
                    } else {
                        tGL.drawArrays(tMesh['drawMode'], 0, tInterleaveBuffer['pointNum'])
                        renderResultObj['triangleNum'] += tInterleaveBuffer['triangleNum'];
                    }

                }
                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
                tMesh['children'].length ? draw(redGL, scene, tMesh['children'], camera, orthographicYn, time, renderResultObj, tCacheInfo, tCacheState, tMVMatrix, subSceneMaterial, transparentMode) : 0;
            }
        }
        return function (redGL, scene, camera, orthographicYn, children, time, renderResultObj, subSceneMaterial, transparentMode) {
            // if ( this['cacheState']['pointSize'] == undefined ) this['cacheState']['pointSize'] = null
            // if ( !this['cacheState']['useCullFace'] ) this['cacheState']['useCullFace'] = null
            // if ( !this['cacheState']['cullFace'] ) this['cacheState']['cullFace'] = null
            // if ( !this['cacheState']['useDepthTest'] ) this['cacheState']['useDepthTest'] = null
            // if ( !this['cacheState']['useDepthMask'] ) this['cacheState']['useDepthMask'] = null
            // if ( !this['cacheState']['depthTestFunc'] ) this['cacheState']['depthTestFunc'] = null
            // if ( !this['cacheState']['useBlendMode'] ) this['cacheState']['useBlendMode'] = null
            // if ( !this['cacheState']['blendSrc'] ) this['cacheState']['blendSrc'] = null
            // if ( !this['cacheState']['blendDst'] ) this['cacheState']['blendDst'] = null
            // this['cacheSamplerIndex'].length = 0
            this['cacheInfo']['cacheTexture'].length = 0
            // this['cacheInfo']['cacheTexture'][39] = null
            // console.log(this['cacheInfo']['cacheSamplerIndex'])
            tPrevIndexBuffer_UUID = null;
            tPrevInterleaveBuffer_UUID = null;
            tPrevSamplerIndex = null;
            draw(
                redGL,
                scene,
                children,
                camera,
                orthographicYn,
                time,
                renderResultObj,
                this['cacheInfo'],
                this['cacheState'],
                undefined,
                subSceneMaterial,
                transparentMode
            )
        }
    })()
    Object.freeze(RedRenderer);
})
();
