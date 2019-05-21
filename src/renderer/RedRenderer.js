/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.5.21 11:40
 */

"use strict";
var RedRenderer;
//TODO: 캐싱전략을 좀더 고도화하는게 좋을듯
(function () {
    var _renderList = [];
    var _renderTick;
    _renderTick = function (time) {
        //TODO: 시간보정을 굳이 할피요가 있을까..
        var i = _renderList.length;
        var tRenderer;
        while (i--) {
            tRenderer = _renderList[i];
            tRenderer.worldRender(tRenderer['_redGL'], time);
            tRenderer['_callback'] ? tRenderer['_callback'](time) : 0

        }
        requestAnimationFrame(_renderTick)

    };
    requestAnimationFrame(_renderTick);
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedRenderer`,
		 description : `
			 RedRenderer Instance 생성자.
		 `,
		 example : `
		    var tRenderer = RedRenderer();
            tRenderer.start(
                redGL,
                function (time) {
                    // looper
                }
            );
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
        this['worldRect'] = [];
        this['_glInitialized'] = false;
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
			 example : `
			    var tRenderer = RedRenderer();
                tRenderer.start(
                    redGL,
                    function (time) {
                        // looper
                    }
                );
			 `,
			 return : 'void'
		 }
         :DOC*/

        start: function (redGL, callback) {
            redGL instanceof RedGL || RedGLUtil.throwFunc('RedGL Instance만 허용');
            if (!(redGL.world instanceof RedWorld)) RedGLUtil.throwFunc('RedWorld Instance만 허용');
            var self = this;
            self.stop();
            self.world = redGL.world;
            self['_redGL'] = redGL;
            self['_callback'] = callback;
            _renderList.push(self)
        },
        /**DOC:
         {
			 code:`METHOD`,
			 title :`setDebugButton`,
			 description : `
				 디버그 버튼 생성
			 `,
			 example : `
			    var tRenderer = RedRenderer();
                tRenderer.setDebugButton();
			 `,
			 return : 'void'
		 }
         :DOC*/
        setDebugButton: function () {
            var sourceViewBt;
            var self = this;
            if (window['document']) {
                document.body.appendChild(sourceViewBt = document.createElement('button'));
                sourceViewBt.style.cssText = 'position:fixed;left:10px;top:10px;background:rgb(91, 82, 170);color:#fff;z-index:10001;border:0;outline:none;cursor:pointer;padding:8px;font-size:11px;border-radius:5px';
                sourceViewBt.innerHTML = 'debugRenderInfo - ' + RedGL_VERSION.version;
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
			 example : `
			    var tRenderer = RedRenderer();
                tRenderer.render(RedGL Instance)
			 `,
			 return : 'void'
		 }
         :DOC*/
        render: function (redGL, time) {
            redGL instanceof RedGL || RedGLUtil.throwFunc('RedGL Instance만 허용');
            time = time || 0;
            this.world = redGL.world;
            this.worldRender(redGL, time);

        },
        /**DOC:
         {
			 code:`METHOD`,
			 title :`stop`,
			 description : `
				 렌더 중지
			 `,
			 example : `
                var tRenderer = RedRenderer();
                tRenderer.start(
                    redGL,
                    function (time) {
                        // looper
                    }
                );
                tRender.stop();
			 `,
			 return : 'void'
		 }
         :DOC*/
        stop: (function () {
            var t0;
            return function () {
                t0 = _renderList.indexOf(this);
                if (t0 === -1) {
                } else _renderList.splice(t0, 1);
            }
        })()
    };
    // 캐시관련
    var worldRender_prevProgram_UUID;
    var worldRender_transparentList = [];
    var worldRender_tWorldRect;
    var worldRender_self;
    var worldRender_valueParser;
    var worldRender_updateSystemUniform;
    var worldRender_glInitialize;
    var worldRender_lightDebugRenderList;
    worldRender_lightDebugRenderList = [];
    // 숫자면 숫자로 %면 월드대비 수치로 변경해줌
    worldRender_valueParser = (function () {
        var i;
        return function (rect) {
            i = rect.length;
            while (i--) {
                if (typeof rect[i] == 'number') rect[i] = rect[i];
                else {
                    if (i < 2) rect[i] = worldRender_tWorldRect[i + 2] * parseFloat(rect[i]) / 100;
                    else rect[i] = worldRender_tWorldRect[i] * parseFloat(rect[i]) / 100
                }
            }
            return rect;
        }
    })();
    worldRender_updateSystemUniform = function (redGL, time, tView) {
        worldRender_prevProgram_UUID = RedSystemUniformUpdater.update(redGL, this, time, tView, worldRender_prevProgram_UUID, worldRender_lightDebugRenderList)
    };
    worldRender_glInitialize = function (gl) {
        // 뎁스데스티 설정
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        // 컬링 페이스 설정
        gl.frontFace(gl.CCW);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.enable(gl.SCISSOR_TEST);
        // 블렌드모드설정
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.disable(gl.DITHER);
        // gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        // // 픽셀 블렌딩 결정
        // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        // 픽셀 플립 기본설정
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    };
    RedRenderer.prototype.worldRender = function (redGL, time) {
        var gl;
        var tScene;
        var tRenderInfo;
        var tPerspectiveMTX;
        var tCamera;
        var i;
        var len;
        var tView;
        var tViewRect;
        gl = redGL.gl;
        worldRender_self = this;
        if (window['RedGLTFLoader']) RedGLTFLoader.animationLooper(time);
        // 캔버스 사이즈 적용
        worldRender_tWorldRect = worldRender_self['worldRect'];
        worldRender_tWorldRect[0] = 0;
        worldRender_tWorldRect[1] = 0;
        worldRender_tWorldRect[2] = gl.drawingBufferWidth;
        worldRender_tWorldRect[3] = gl.drawingBufferHeight;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.scissor(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        worldRender_transparentList.length = 0;
        if (!worldRender_self['_glInitialized']) worldRender_glInitialize(gl), worldRender_self['_glInitialized'] = true;
        // console.log("worldRender", v['key'], t0)
        worldRender_self['renderInfo'] = {};
        worldRender_self['cacheInfo']['cacheAttrInfo'].length = 0;
        // 일단 0번과 1번텍스트는 무조건 체운다.
        redGL.gl.activeTexture(redGL.gl.TEXTURE0);
        redGL.gl.bindTexture(redGL.gl.TEXTURE_2D, redGL['_datas']['emptyTexture']['2d']['webglTexture']);
        redGL.gl.activeTexture(redGL.gl.TEXTURE0 + 1);
        redGL.gl.bindTexture(redGL.gl.TEXTURE_CUBE_MAP, redGL['_datas']['emptyTexture']['3d']['webglTexture']);
        i = 0;
        len = worldRender_self['world']['_viewList'].length;
        for (i; i < len; i++) {
            // worldRender_self['world']['_viewList'].forEach(function (tView) {
            tView = worldRender_self['world']['_viewList'][i];
            ///////////////////////////////////
            // view의 위치/크기결정
            tViewRect = tView['_viewRect'];
            tViewRect[0] = tView['_x'];
            tViewRect[1] = tView['_y'];
            tViewRect[2] = tView['_width'];
            tViewRect[3] = tView['_height'];
            tCamera = tView['camera'];
            tScene = tView['scene'];
            // 위치/크기의 % 여부를 파싱
            worldRender_valueParser(tViewRect);
            // 현재뷰에 대한 렌더 디버깅 정보
            if (!worldRender_self['renderInfo'][tView['key']]) worldRender_self['renderInfo'][tView['key']] = {};
            tRenderInfo = worldRender_self['renderInfo'][tView['key']];
            tRenderInfo['mode2DYn'] = tCamera instanceof RedBaseController ? tCamera.camera['mode2DYn'] : tCamera['mode2DYn'];
            tRenderInfo['x'] = tView['_x'];
            tRenderInfo['y'] = tView['_y'];
            tRenderInfo['width'] = tView['_width'];
            tRenderInfo['height'] = tView['_height'];
            tRenderInfo['viewRectX'] = tViewRect[0];
            tRenderInfo['viewRectY'] = tViewRect[1];
            tRenderInfo['viewRectWidth'] = tViewRect[2];
            tRenderInfo['viewRectHeight'] = tViewRect[3];
            tRenderInfo['key'] = tView['key'];
            tRenderInfo['call'] = 0;
            tRenderInfo['triangleNum'] = 0;
            tRenderInfo['viewRenderTime'] = 0;
            tRenderInfo['postEffectRenderTime'] = 0;
            // viewport 크기설정
            gl.viewport(tViewRect[0], worldRender_tWorldRect[3] - tViewRect[3] - tViewRect[1], tViewRect[2], tViewRect[3]);
            gl.scissor(tViewRect[0], worldRender_tWorldRect[3] - tViewRect[3] - tViewRect[1], tViewRect[2], tViewRect[3]);
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
            if (tCamera['mode2DYn']) {
                mat4.ortho(
                    tPerspectiveMTX,
                    -0.5, // left
                    0.5, // right
                    -0.5, // bottom
                    0.5, // top,
                    -tCamera['farClipping'],
                    tCamera['farClipping']
                );
                mat4.translate(tPerspectiveMTX, tPerspectiveMTX, [-0.5, 0.5, 0]);
                mat4.scale(tPerspectiveMTX, tPerspectiveMTX, [1 / tViewRect[2] * redGL['renderScale'] * window.devicePixelRatio, -1 / tViewRect[3] * redGL['renderScale'] * window.devicePixelRatio, 1]);
                mat4.identity(tCamera['matrix']);
                gl.disable(gl.CULL_FACE);
                worldRender_self['cacheState']['useCullFace'] = false
            } else {
                mat4.perspective(
                    tPerspectiveMTX,
                    tCamera['fov'] * Math.PI / 180,
                    tViewRect[2] / tViewRect[3],
                    tCamera['nearClipping'],
                    tCamera['farClipping']
                );
                gl.enable(gl.CULL_FACE);
                worldRender_self['cacheState']['useCullFace'] = true
            }
            // 뎁스마스크 원상복구
            worldRender_self['cacheState']['useDepthMask'] ? 0 : gl.depthMask(worldRender_self['cacheState']['useDepthMask'] = true);
            // 마우스 이벤트 렌더
            if (tScene['mouseManager']) {
                worldRender_updateSystemUniform.apply(worldRender_self, [redGL, time, tView]);
                tScene['mouseManager']['render'](redGL, worldRender_self, tView, time, tRenderInfo, i == len - 1)
            }
            // 디렉셔널 쉐도우 렌더
            if (tScene['shadowManager']['_directionalShadow']) {
                worldRender_updateSystemUniform.apply(worldRender_self, [redGL, time, tView]);
                gl.disable(gl.BLEND);
                gl.blendFunc(gl.ONE, gl.ONE);
                worldRender_self['cacheState']['useBlendMode'] = true;
                worldRender_self['cacheState']['blendSrc'] = gl.ONE;
                worldRender_self['cacheState']['blendDst'] = gl.ONE;
                tScene['shadowManager']['render'](redGL, worldRender_self, tView, time, tRenderInfo);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                worldRender_self['cacheState']['useBlendMode'] = true;
                worldRender_self['cacheState']['blendSrc'] = gl.SRC_ALPHA;
                worldRender_self['cacheState']['blendDst'] = gl.ONE_MINUS_SRC_ALPHA
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
            worldRender_updateSystemUniform.apply(worldRender_self, [redGL, time, tView]);
            if (tScene['skyBox']) {
                tScene['skyBox']['x'] = tCamera.x;
                tScene['skyBox']['y'] = tCamera.y;
                tScene['skyBox']['z'] = tCamera.z;
                tScene['skyBox']['scaleX'] = tScene['skyBox']['scaleY'] = tScene['skyBox']['scaleZ'] = tCamera['farClipping'] * 0.6;
                worldRender_self.sceneRender(redGL, tScene, tCamera, tCamera['mode2DYn'], [tScene['skyBox']], time, tRenderInfo);
            }
            // 그리드가 있으면 그림
            if (tScene['grid']) worldRender_self.sceneRender(redGL, tScene, tCamera, tCamera['mode2DYn'], [tScene['grid']], time, tRenderInfo);
            // 씬렌더 호출
            worldRender_self.sceneRender(redGL, tScene, tCamera, tCamera['mode2DYn'], tScene['children'], time, tRenderInfo);
            if (worldRender_transparentList.length) worldRender_self.sceneRender(redGL, tScene, tCamera, tCamera['mode2DYn'], worldRender_transparentList, time, tRenderInfo, null, true);
            if (tScene.mirrorManager) {
                tScene.mirrorManager.render(redGL, worldRender_self, tView, time, tRenderInfo, worldRender_updateSystemUniform);
            }

            // asix가 있으면 그림
            if (tScene['axis']) worldRender_self.sceneRender(redGL, tScene, tCamera, tCamera['mode2DYn'], tScene['axis']['children'], time, tRenderInfo);
            // 디버깅 라이트 업데이트
            if (worldRender_lightDebugRenderList.length) worldRender_self.sceneRender(redGL, tScene, tCamera, tCamera['mode2DYn'], worldRender_lightDebugRenderList, time, tRenderInfo);
            // 포스트이펙트 최종렌더
            tRenderInfo['viewRenderTime'] = performance.now();
            if (tView['postEffectManager']['postEffectList'].length) tView['postEffectManager'].render(redGL, gl, worldRender_self, tView, time, tRenderInfo);
            tRenderInfo['postEffectRenderTime'] = performance.now() - tRenderInfo['viewRenderTime'];
            tRenderInfo['viewRenderTime'] -= time;
            // })
        }
        if (this['renderDebuger']['visible']) this['renderDebuger'].update(redGL, worldRender_self['renderInfo'])

    };
    var draw;
    var tPrevIndexBuffer_UUID;
    var tPrevInterleaveBuffer_UUID;
    var tPrevSamplerIndex;
    draw = function (redGL,
                     scene,
                     children,
                     camera,
                     mode2DYn,
                     time,
                     renderResultObj,
                     tCacheInfo,
                     tCacheState,
                     parentMTX,
                     subSceneMaterial,
                     transparentMode) {
        var i, i2;
        // 캐쉬관련
        var tGL = redGL.gl;
        var tCacheInterleaveBuffer = tCacheInfo['cacheAttrInfo'];
        var tCacheUniformInfo = tCacheInfo['cacheUniformInfo'];
        var tCacheSamplerIndex = tCacheInfo['cacheSamplerIndex'];
        var tCacheTexture = tCacheInfo['cacheTexture'];

        //
        var CONVERT_RADIAN;
        //
        var tMesh, tGeometry, tMaterial;
        var tLODInfo;
        var tAttrGroup, tAttributeLocationInfo, tInterleaveDefineInfo, tInterleaveDefineUnit;
        var tUniformGroup, tSystemUniformGroup, tUniformLocationInfo, tWebGLUniformLocation,
            tWebGLAttributeLocation;
        var tInterleaveBuffer, tIndexBufferInfo;
        var tUniformValue;
        var tRenderType, tRenderTypeIndex;
        var tMVMatrix, tNMatrix, tLocalMatrix;
        var tUUID;
        var tSamplerIndex;
        var tSprite3DYn, tLODData, tDirectionalShadowMaterialYn, tSkinInfo, tUseFog;
        var tProgram, tOptionProgramKey, tOptionProgram, baseOptionKey;
        // matix 관련
        var aSx, aSy, aSz, aCx, aCy, aCz, aX, aY, aZ,
            a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33,
            b0, b1, b2, b3,
            b00, b01, b02, b10, b11, b12, b20, b21, b22
        // sin,cos 관련
        var tRadian, CPI, CPI2, C225, C127, C045, C157;
        // LOD 관련
        var lodDistance, lodTarget;
        // 프로그램 성택관련
        var tUseDirectionalShadow;
        var tProgramList;
        var tBaseProgramKey;
        //////////////// 변수값 할당 ////////////////
        CONVERT_RADIAN = Math.PI / 180;
        CPI = 3.141592653589793, CPI2 = 6.283185307179586, C225 = 0.225, C127 = 1.27323954, C045 = 0.405284735, C157 = 1.5707963267948966;
        //////////////// 렌더시작 ////////////////
        i = children.length;
        var len3 = children.length - 1;
        tUseFog = scene['_useFog'];
        tUseDirectionalShadow = scene['shadowManager']['_directionalShadow'];
        if (tUseDirectionalShadow) {
            if (tUseFog) baseOptionKey = 'directionalShadow_fog';
            else baseOptionKey = 'directionalShadow'
        } else {
            if (tUseFog) baseOptionKey = 'fog'
        }
        while (i--) {
            renderResultObj['call']++;
            tMesh = children[len3 - i];
            tMVMatrix = tMesh['matrix'];
            tNMatrix = tMesh['normalMatrix'];
            tLocalMatrix = tMesh['localMatrix'];
            tGeometry = tMesh['_geometry'];
            tSprite3DYn = tMesh['_sprite3DYn'];
            tSkinInfo = tMesh['skinInfo'];
            // LOD체크
            if (tMesh['useLOD']) {
                aX = camera.x - tMesh.x;
                aY = camera.y - tMesh.y;
                aZ = camera.z - tMesh.z;
                lodDistance = Math.abs(Math.sqrt(aX * aX + aY * aY + aZ * aZ));
                tLODInfo = tMesh['_lodLevels'];
                // 0~4레벨까지 허용
                (tLODData = tLODInfo[0]) && tLODData['distance'] < lodDistance ? lodTarget = tLODData : 0,
                    (tLODData = tLODInfo[1]) && tLODData['distance'] < lodDistance ? lodTarget = tLODData : 0,
                    (tLODData = tLODInfo[2]) && tLODData['distance'] < lodDistance ? lodTarget = tLODData : 0,
                    (tLODData = tLODInfo[3]) && tLODData['distance'] < lodDistance ? lodTarget = tLODData : 0,
                    (tLODData = tLODInfo[4]) && tLODData['distance'] < lodDistance ? lodTarget = tLODData : 0,
                    lodTarget ? (tMesh['_geometry'] = lodTarget['geometry'], tMesh['_material'] = lodTarget['material']) : 0
            }
            if (tGeometry) {
                tMaterial = subSceneMaterial ? subSceneMaterial : tMesh['_material'];
                tDirectionalShadowMaterialYn = tMaterial['_RedDirectionalShadowYn'];
                // 마우스 이벤트 커러설정
                tMaterial['_RedMouseEventMaterialYn'] ? tMaterial['color'] = tMesh['_mouseColorID'] : 0;
                // SpriteSheet체크
                if (tMaterial['__RedSheetMaterialYn']) {
                    if (!tMaterial['_nextFrameTime']) tMaterial['_nextFrameTime'] = tMaterial['_perFrameTime'] + time;
                    if (tMaterial['_playYn'] && tMaterial['_nextFrameTime'] < time) {
                        var gapFrame = parseInt((time - tMaterial['_nextFrameTime']) / tMaterial['_perFrameTime']);
                        gapFrame = gapFrame || 1;
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

                tProgram = tMaterial['program'];
                if (tProgram['_prepareProgramYn']) tProgram = tMaterial['program'] = tProgram._makePrepareProgram();
                tBaseProgramKey = tProgram['key'];
                tProgramList = tMaterial['_programList'];
                if (tSkinInfo || tSprite3DYn) {
                    if (tUseDirectionalShadow) {
                        if (tUseFog && tSprite3DYn) tOptionProgramKey = 'directionalShadow_fog_sprite3D';
                        else if (tUseFog && tSkinInfo) tOptionProgramKey = 'directionalShadow_fog_skin';
                        else if (tSkinInfo) tOptionProgramKey = 'directionalShadow_skin';
                        else if (tSprite3DYn) tOptionProgramKey = 'directionalShadow_sprite3D';
                        else if (tUseFog) tOptionProgramKey = 'directionalShadow_fog';
                        else tOptionProgramKey = 'directionalShadow'
                    } else {
                        if (tUseFog && tSprite3DYn) tOptionProgramKey = 'fog_sprite3D';
                        else if (tUseFog && tSkinInfo) tOptionProgramKey = 'fog_skin';
                        else if (tSkinInfo) tOptionProgramKey = 'skin';
                        else if (tSprite3DYn) tOptionProgramKey = 'sprite3D';
                        else if (tUseFog) tOptionProgramKey = 'fog'
                    }
                } else {
                    tOptionProgramKey = baseOptionKey
                }
                if (tProgramList && tOptionProgramKey) {
                    tOptionProgram = tProgramList[tOptionProgramKey][tBaseProgramKey];
                    if (tOptionProgram['_prepareProgramYn']) {
                        console.log(tProgramList, tOptionProgramKey, tBaseProgramKey);
                        tOptionProgram = tProgramList[tOptionProgramKey][tBaseProgramKey] = tOptionProgram._makePrepareProgram();
                    }
                    tProgram = tOptionProgram
                }
                //
                worldRender_prevProgram_UUID == tProgram['_UUID'] ? 0 : tGL.useProgram(tProgram['webglProgram']);
                worldRender_prevProgram_UUID = tProgram['_UUID'];
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
                if (tUniformGroup.length > i2) i2 = tUniformGroup.length;
                // interleaveDefineInfoList 정보를 가져온다.
                tInterleaveDefineInfo = tInterleaveBuffer['interleaveDefineInfoList'];
                tPrevInterleaveBuffer_UUID == tUUID ? 0 : tGL.bindBuffer(tGL.ARRAY_BUFFER, tInterleaveBuffer['webglBuffer']);
                tPrevInterleaveBuffer_UUID = tUUID;
                while (i2--) {
                    // 대상 어트리뷰트의 로케이션 정보를 구함
                    tAttributeLocationInfo = tAttrGroup[i2];
                    if (tAttributeLocationInfo) {
                        // 대상 어트리뷰트의 이름으로 interleaveDefineInfoList에서 단위 인터리브 정보를 가져온다.
                        tInterleaveDefineUnit = tInterleaveDefineInfo[tAttributeLocationInfo['name']];
                        /*
                         어트리뷰트 정보매칭이 안되는 녀석은 무시한다
                         이경우는 버퍼상에는 존재하지만 프로그램에서 사용하지 않는경우이다.
                        */
                        // webgl location도 알아낸다.
                        tWebGLAttributeLocation = tAttributeLocationInfo['location'];
                        if (tInterleaveDefineUnit && tCacheInterleaveBuffer[tWebGLAttributeLocation] != tInterleaveDefineUnit['_UUID']) {
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
                    }
                    // 유니폼 업데이트
                    tUniformLocationInfo = tUniformGroup[i2];
                    if (tUniformLocationInfo) {
                        tWebGLUniformLocation = tUniformLocationInfo['location'];
                        tUUID = tUniformLocationInfo['_UUID'];
                        tRenderTypeIndex = tUniformLocationInfo['renderTypeIndex'];
                        tRenderType = tUniformLocationInfo['renderType'];
                        tUniformValue = tMaterial[tUniformLocationInfo['materialPropertyName']];
                        // console.log(tCacheInfo)
                        if (tRenderTypeIndex < 2) {
                            tSamplerIndex = tUniformLocationInfo['samplerIndex'];
                            // samplerIndex : 0,1 번은 생성용으로 쓴다.
                            if (tUniformValue) {
                                // tRenderTypeIndex 0 : sampler2d
                                // tRenderTypeIndex 1 : samplerCube
                                if (tCacheTexture[tSamplerIndex] != tUniformValue['_UUID']) {
                                    tPrevSamplerIndex == tSamplerIndex ? 0 : tGL.activeTexture(tGL.TEXTURE0 + (tPrevSamplerIndex = tSamplerIndex));
                                    if (tUniformValue['_videoDom']) {
                                        //TODO: 일단 비디오를 우겨넣었으니 정리를 해야함
                                        tGL.bindTexture(tGL.TEXTURE_2D, tUniformValue['webglTexture']);
                                        if (tUniformValue['_videoDom']['loaded']) tGL.texImage2D(tGL.TEXTURE_2D, 0, tGL.RGBA, tGL.RGBA, tGL.UNSIGNED_BYTE, tUniformValue['_videoDom']);
                                        tCacheTexture = [];
                                    } else tGL.bindTexture(tRenderTypeIndex == 0 ? tGL.TEXTURE_2D : tGL.TEXTURE_CUBE_MAP, tUniformValue['webglTexture']);
                                    tCacheSamplerIndex[tUUID] == tSamplerIndex ? 0 : tGL.uniform1iv(tWebGLUniformLocation, [tCacheSamplerIndex[tUUID] = tSamplerIndex]);
                                    tCacheTexture[tSamplerIndex] = tUniformValue['_UUID'];

                                }
                            } else {
                                // TODO: 이제는 이놈들을 날릴수있을듯한데...
                                // console.log('설마',tUniformLocationInfo['materialPropertyName'])
                                if (tCacheTexture[tSamplerIndex] != tRenderTypeIndex) {
                                    tCacheSamplerIndex[tUUID] == tRenderTypeIndex ? 0 : tGL.uniform1iv(tWebGLUniformLocation, [tCacheSamplerIndex[tUUID] = tRenderTypeIndex]);
                                    tCacheTexture[tSamplerIndex] = tRenderTypeIndex;
                                    tPrevSamplerIndex = tRenderTypeIndex;
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
            }
            /////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////
            // tMVMatrix
            // tMVMatrix 초기화
            if (tMaterial && tMaterial['_RedMouseEventMaterialYn']) {
                if (tGeometry) tGL.uniformMatrix4fv(tSystemUniformGroup['uMMatrix']['location'], false, tMVMatrix)
            } else {
                if (tMesh['autoUpdateMatrix']) {
                    a00 = 1, a01 = 0, a02 = 0,
                        a10 = 0, a11 = 1, a12 = 0,
                        a20 = 0, a21 = 0, a22 = 1,
                        // tLocalMatrix translate
                        tLocalMatrix[12] = tMesh['x'],
                        tLocalMatrix[13] = tMesh['y'],
                        tLocalMatrix[14] = tMesh['z'],
                        tLocalMatrix[15] = 1,
                        // tLocalMatrix rotate
                        tSprite3DYn ?
                            (aX = aY = aZ = 0) :
                            (aX = tMesh['rotationX'] * CONVERT_RADIAN, aY = tMesh['rotationY'] * CONVERT_RADIAN, aZ = tMesh['rotationZ'] * CONVERT_RADIAN),
                        /////////////////////////
                        tRadian = aX % CPI2,
                        tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                        tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                        aSx = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,
                        tRadian = (aX + C157) % CPI2,
                        tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                        tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                        aCx = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,
                        tRadian = aY % CPI2,
                        tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                        tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                        aSy = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,
                        tRadian = (aY + C157) % CPI2,
                        tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                        tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                        aCy = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,
                        tRadian = aZ % CPI2,
                        tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                        tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                        aSz = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,
                        tRadian = (aZ + C157) % CPI2,
                        tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                        tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                        aCz = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,
                        /////////////////////////
                        b00 = aCy * aCz, b01 = aSx * aSy * aCz - aCx * aSz, b02 = aCx * aSy * aCz + aSx * aSz,
                        b10 = aCy * aSz, b11 = aSx * aSy * aSz + aCx * aCz, b12 = aCx * aSy * aSz - aSx * aCz,
                        b20 = -aSy, b21 = aSx * aCy, b22 = aCx * aCy,
                        // tLocalMatrix scale
                        aX = tMesh['scaleX'], aY = tMesh['scaleY'] * (mode2DYn ? -1 : 1), aZ = tMesh['scaleZ'],
                        tLocalMatrix[0] = (a00 * b00 + a10 * b01 + a20 * b02) * aX,
                        tLocalMatrix[1] = (a01 * b00 + a11 * b01 + a21 * b02) * aX,
                        tLocalMatrix[2] = (a02 * b00 + a12 * b01 + a22 * b02) * aX,
                        tLocalMatrix[3] = tLocalMatrix[3] * aX,
                        tLocalMatrix[4] = (a00 * b10 + a10 * b11 + a20 * b12) * aY,
                        tLocalMatrix[5] = (a01 * b10 + a11 * b11 + a21 * b12) * aY,
                        tLocalMatrix[6] = (a02 * b10 + a12 * b11 + a22 * b12) * aY,
                        tLocalMatrix[7] = tLocalMatrix[7] * aY,
                        tLocalMatrix[8] = (a00 * b20 + a10 * b21 + a20 * b22) * aZ,
                        tLocalMatrix[9] = (a01 * b20 + a11 * b21 + a21 * b22) * aZ,
                        tLocalMatrix[10] = (a02 * b20 + a12 * b21 + a22 * b22) * aZ,
                        tLocalMatrix[11] = tLocalMatrix[11] * aZ,
                        // tLocalMatrix[0] = a00 * b00 + a10 * b01 + a20 * b02, tLocalMatrix[1] = a01 * b00 + a11 * b01 + a21 * b02, tLocalMatrix[2] = a02 * b00 + a12 * b01 + a22 * b02,
                        // tLocalMatrix[4] = a00 * b10 + a10 * b11 + a20 * b12, tLocalMatrix[5] = a01 * b10 + a11 * b11 + a21 * b12, tLocalMatrix[6] = a02 * b10 + a12 * b11 + a22 * b12,
                        // tLocalMatrix[8] = a00 * b20 + a10 * b21 + a20 * b22, tLocalMatrix[9] = a01 * b20 + a11 * b21 + a21 * b22, tLocalMatrix[10] = a02 * b20 + a12 * b21 + a22 * b22,
                        // // tLocalMatrix scale
                        // aX = tMesh['scaleX'], aY = tMesh['scaleY'] * (mode2DYn ? -1 : 1), aZ = tMesh['scaleZ'],
                        // tLocalMatrix[0] = tLocalMatrix[0] * aX, tLocalMatrix[1] = tLocalMatrix[1] * aX, tLocalMatrix[2] = tLocalMatrix[2] * aX, tLocalMatrix[3] = tLocalMatrix[3] * aX,
                        // tLocalMatrix[4] = tLocalMatrix[4] * aY, tLocalMatrix[5] = tLocalMatrix[5] * aY, tLocalMatrix[6] = tLocalMatrix[6] * aY, tLocalMatrix[7] = tLocalMatrix[7] * aY,
                        // tLocalMatrix[8] = tLocalMatrix[8] * aZ, tLocalMatrix[9] = tLocalMatrix[9] * aZ, tLocalMatrix[10] = tLocalMatrix[10] * aZ, tLocalMatrix[11] = tLocalMatrix[11] * aZ,
                        // tLocalMatrix[12] = tLocalMatrix[12], tLocalMatrix[13] = tLocalMatrix[13], tLocalMatrix[14] = tLocalMatrix[14], tLocalMatrix[15] = tLocalMatrix[15],
                        // 부모가있으면 곱함
                        parentMTX ?
                            (
                                // 부모매트릭스 복사
                                // 매트립스 곱
                                a00 = parentMTX[0], a01 = parentMTX[1], a02 = parentMTX[2], a03 = parentMTX[3],
                                    a10 = parentMTX[4], a11 = parentMTX[5], a12 = parentMTX[6], a13 = parentMTX[7],
                                    a20 = parentMTX[8], a21 = parentMTX[9], a22 = parentMTX[10], a23 = parentMTX[11],
                                    a30 = parentMTX[12], a31 = parentMTX[13], a32 = parentMTX[14], a33 = parentMTX[15],
                                    // Cache only the current line of the second matrix
                                    b0 = tLocalMatrix[0], b1 = tLocalMatrix[1], b2 = tLocalMatrix[2], b3 = tLocalMatrix[3],
                                    tMVMatrix[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                                    tMVMatrix[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                                    tMVMatrix[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                                    tMVMatrix[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
                                    b0 = tLocalMatrix[4], b1 = tLocalMatrix[5], b2 = tLocalMatrix[6], b3 = tLocalMatrix[7],
                                    tMVMatrix[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                                    tMVMatrix[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                                    tMVMatrix[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                                    tMVMatrix[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
                                    b0 = tLocalMatrix[8], b1 = tLocalMatrix[9], b2 = tLocalMatrix[10], b3 = tLocalMatrix[11],
                                    tMVMatrix[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                                    tMVMatrix[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                                    tMVMatrix[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                                    tMVMatrix[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
                                    b0 = tLocalMatrix[12], b1 = tLocalMatrix[13], b2 = tLocalMatrix[14], b3 = tLocalMatrix[15],
                                    tMVMatrix[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                                    tMVMatrix[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                                    tMVMatrix[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                                    tMVMatrix[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33
                            )
                            : (
                                tMVMatrix[0] = tLocalMatrix[0], tMVMatrix[1] = tLocalMatrix[1], tMVMatrix[2] = tLocalMatrix[2], tMVMatrix[3] = tLocalMatrix[3],
                                    tMVMatrix[4] = tLocalMatrix[4], tMVMatrix[5] = tLocalMatrix[5], tMVMatrix[6] = tLocalMatrix[6], tMVMatrix[7] = tLocalMatrix[7],
                                    tMVMatrix[8] = tLocalMatrix[8], tMVMatrix[9] = tLocalMatrix[9] , tMVMatrix[10] = tLocalMatrix[10], tMVMatrix[11] = tLocalMatrix[11],
                                    tMVMatrix[12] = tLocalMatrix[12], tMVMatrix[13] = tLocalMatrix[13], tMVMatrix[14] = tLocalMatrix[14], tMVMatrix[15] = tLocalMatrix[15]
                            );

                }
                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
                if (tGeometry) {
                    tGL.uniformMatrix4fv(tSystemUniformGroup['uMMatrix']['location'], false, tMVMatrix);
                    /////////////////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////
                    // 노말매트릭스를 사용할경우
                    if (tSystemUniformGroup['uNMatrix']['location']) {
                        // mat4Inverse
                        a00 = tMVMatrix[0], a01 = tMVMatrix[1], a02 = tMVMatrix[2], a03 = tMVMatrix[3],
                            a10 = tMVMatrix[4], a11 = tMVMatrix[5], a12 = tMVMatrix[6], a13 = tMVMatrix[7],
                            a20 = tMVMatrix[8], a21 = tMVMatrix[9], a22 = tMVMatrix[10], a23 = tMVMatrix[11],
                            a31 = tMVMatrix[12], a32 = tMVMatrix[13], a33 = tMVMatrix[14], b0 = tMVMatrix[15],
                            a30 = a00 * a11 - a01 * a10,
                            b1 = a00 * a12 - a02 * a10, b2 = a00 * a13 - a03 * a10, b3 = a01 * a12 - a02 * a11,
                            b00 = a01 * a13 - a03 * a11, b01 = a02 * a13 - a03 * a12, b02 = a20 * a32 - a21 * a31,
                            b10 = a20 * a33 - a22 * a31, b11 = a20 * b0 - a23 * a31, b12 = a21 * a33 - a22 * a32,
                            b20 = a21 * b0 - a23 * a32, b12 = a22 * b0 - a23 * a33, b22 = a30 * b12 - b1 * b20 + b2 * b12 + b3 * b11 - b00 * b10 + b01 * b02,
                            b22 = 1 / b22,

                            tNMatrix[0] = (a11 * b12 - a12 * b20 + a13 * b12) * b22,
                            tNMatrix[4] = (-a01 * b12 + a02 * b20 - a03 * b12) * b22,
                            tNMatrix[8] = (a32 * b01 - a33 * b00 + b0 * b3) * b22,
                            tNMatrix[12] = (-a21 * b01 + a22 * b00 - a23 * b3) * b22,
                            tNMatrix[1] = (-a10 * b12 + a12 * b11 - a13 * b10) * b22,
                            tNMatrix[5] = (a00 * b12 - a02 * b11 + a03 * b10) * b22,
                            tNMatrix[9] = (-a31 * b01 + a33 * b2 - b0 * b1) * b22,
                            tNMatrix[13] = (a20 * b01 - a22 * b2 + a23 * b1) * b22,
                            tNMatrix[2] = (a10 * b20 - a11 * b11 + a13 * b02) * b22,
                            tNMatrix[6] = (-a00 * b20 + a01 * b11 - a03 * b02) * b22,
                            tNMatrix[10] = (a31 * b00 - a32 * b2 + b0 * a30) * b22,
                            tNMatrix[14] = (-a20 * b00 + a21 * b2 - a23 * a30) * b22,
                            tNMatrix[3] = (-a10 * b12 + a11 * b10 - a12 * b02) * b22,
                            tNMatrix[7] = (a00 * b12 - a01 * b10 + a02 * b02) * b22,
                            tNMatrix[11] = (-a31 * b3 + a32 * b1 - a33 * a30) * b22,
                            tNMatrix[15] = (a20 * b3 - a21 * b1 + a22 * a30) * b22,

                            // tNMatrix[0] = (a11 * b12 - a12 * b20 + a13 * b12) * b22,
                            // tNMatrix[1] = (-a01 * b12 + a02 * b20 - a03 * b12) * b22,
                            // tNMatrix[2] = (a32 * b01 - a33 * b00 + b0 * b3) * b22,
                            // tNMatrix[3] = (-a21 * b01 + a22 * b00 - a23 * b3) * b22,
                            // tNMatrix[4] = (-a10 * b12 + a12 * b11 - a13 * b10) * b22,
                            // tNMatrix[5] = (a00 * b12 - a02 * b11 + a03 * b10) * b22,
                            // tNMatrix[6] = (-a31 * b01 + a33 * b2 - b0 * b1) * b22,
                            // tNMatrix[7] = (a20 * b01 - a22 * b2 + a23 * b1) * b22,
                            // tNMatrix[8] = (a10 * b20 - a11 * b11 + a13 * b02) * b22,
                            // tNMatrix[9] = (-a00 * b20 + a01 * b11 - a03 * b02) * b22,
                            // tNMatrix[10] = (a31 * b00 - a32 * b2 + b0 * a30) * b22,
                            // tNMatrix[11] = (-a20 * b00 + a21 * b2 - a23 * a30) * b22,
                            // tNMatrix[12] = (-a10 * b12 + a11 * b10 - a12 * b02) * b22,
                            // tNMatrix[13] = (a00 * b12 - a01 * b10 + a02 * b02) * b22,
                            // tNMatrix[14] = (-a31 * b3 + a32 * b1 - a33 * a30) * b22,
                            // tNMatrix[15] = (a20 * b3 - a21 * b1 + a22 * a30) * b22,
                            // transpose
                            // a01 = tNMatrix[1], a02 = tNMatrix[2], a03 = tNMatrix[3],
                            // a12 = tNMatrix[6], a13 = tNMatrix[7], a23 = tNMatrix[11],
                            // tNMatrix[1] = tNMatrix[4], tNMatrix[2] = tNMatrix[8], tNMatrix[3] = tNMatrix[12], tNMatrix[4] = a01, tNMatrix[6] = tNMatrix[9],
                            // tNMatrix[7] = tNMatrix[13], tNMatrix[8] = a02, tNMatrix[9] = a12, tNMatrix[11] = tNMatrix[14],
                            // tNMatrix[12] = a03, tNMatrix[13] = a13, tNMatrix[14] = a23,
                            // uNMatrix 입력
                            tGL.uniformMatrix4fv(tSystemUniformGroup['uNMatrix']['location'], false, tNMatrix)
                    }
                }
                if (tSkinInfo) {
                    var joints = tSkinInfo['joints'];
                    var joint_i = 0, len = joints.length;
                    var tJointMTX;
                    var globalTransformOfJointNode = new Float32Array(len * 16);
                    var globalTransformOfNodeThatTheMeshIsAttachedTo = [
                        tMVMatrix[0],
                        tMVMatrix[1],
                        tMVMatrix[2],
                        tMVMatrix[3],
                        tMVMatrix[4],
                        tMVMatrix[5],
                        tMVMatrix[6],
                        tMVMatrix[7],
                        tMVMatrix[8],
                        tMVMatrix[9],
                        tMVMatrix[10],
                        tMVMatrix[11],
                        tMVMatrix[12],
                        tMVMatrix[13],
                        tMVMatrix[14],
                        tMVMatrix[15]
                    ];
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    // Inverse
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
                    for (joint_i; joint_i < len; joint_i++) {
                        // 조인트 공간내에서의 전역
                        tJointMTX = joints[joint_i]['matrix'];
                        globalTransformOfJointNode[joint_i * 16 + 0] = tJointMTX[0];
                        globalTransformOfJointNode[joint_i * 16 + 1] = tJointMTX[1];
                        globalTransformOfJointNode[joint_i * 16 + 2] = tJointMTX[2];
                        globalTransformOfJointNode[joint_i * 16 + 3] = tJointMTX[3];
                        globalTransformOfJointNode[joint_i * 16 + 4] = tJointMTX[4];
                        globalTransformOfJointNode[joint_i * 16 + 5] = tJointMTX[5];
                        globalTransformOfJointNode[joint_i * 16 + 6] = tJointMTX[6];
                        globalTransformOfJointNode[joint_i * 16 + 7] = tJointMTX[7];
                        globalTransformOfJointNode[joint_i * 16 + 8] = tJointMTX[8];
                        globalTransformOfJointNode[joint_i * 16 + 9] = tJointMTX[9];
                        globalTransformOfJointNode[joint_i * 16 + 10] = tJointMTX[10];
                        globalTransformOfJointNode[joint_i * 16 + 11] = tJointMTX[11];
                        globalTransformOfJointNode[joint_i * 16 + 12] = tJointMTX[12];
                        globalTransformOfJointNode[joint_i * 16 + 13] = tJointMTX[13];
                        globalTransformOfJointNode[joint_i * 16 + 14] = tJointMTX[14];
                        globalTransformOfJointNode[joint_i * 16 + 15] = tJointMTX[15]
                    }
                    tGL.uniformMatrix4fv(tSystemUniformGroup['uGlobalTransformOfNodeThatTheMeshIsAttachedTo']['location'], false, globalTransformOfNodeThatTheMeshIsAttachedTo);
                    tGL.uniformMatrix4fv(tSystemUniformGroup['uJointMatrix']['location'], false, globalTransformOfJointNode);
                    if (!tSkinInfo['inverseBindMatrices']['_UUID']) tSkinInfo['inverseBindMatrices']['_UUID'] = JSON.stringify(tSkinInfo['inverseBindMatrices'])
                    tUUID = tSystemUniformGroup['uInverseBindMatrixForJoint']['_UUID']
                    if (tCacheUniformInfo[tUUID] != tSkinInfo['inverseBindMatrices']['_UUID']) {
                        tGL.uniformMatrix4fv(tSystemUniformGroup['uInverseBindMatrixForJoint']['location'], false, tSkinInfo['inverseBindMatrices'])
                        tCacheUniformInfo[tUUID] = tSkinInfo['inverseBindMatrices']['_UUID']
                    }


                }
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
                    tUUID = tSystemUniformGroup['u_PerspectiveScale']['_UUID'];
                    tUniformValue = tMesh['_perspectiveScale'];
                    if (tCacheUniformInfo[tUUID] != tUniformValue) {
                        tGL[tSystemUniformGroup['u_PerspectiveScale']['renderMethod']](tSystemUniformGroup['u_PerspectiveScale']['location'], tUniformValue);
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
                if (transparentMode) {
                    tMesh.autoUpdateMatrix = tMesh._renderAutoUpdateMatrix
                } else {
                    if (tMesh['useTransparentSort']) {
                        worldRender_transparentList.push(tMesh);
                        tMesh._renderAutoUpdateMatrix = tMesh.autoUpdateMatrix;
                        tMesh.autoUpdateMatrix = false;
                        continue
                    }
                }
                // 드로우
                if (tIndexBufferInfo) {
                    tPrevIndexBuffer_UUID == tIndexBufferInfo['_UUID'] ? 0 : tGL.bindBuffer(tGL.ELEMENT_ARRAY_BUFFER, tIndexBufferInfo['webglBuffer']);
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
                    tGL.drawArrays(tMesh['drawMode'], 0, tInterleaveBuffer['pointNum']);
                    renderResultObj['triangleNum'] += tInterleaveBuffer['triangleNum'];
                }

            }
            /////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////
            tMesh['children'].length ? draw(redGL, scene, tMesh['children'], camera, mode2DYn, time, renderResultObj, tCacheInfo, tCacheState, tMVMatrix, subSceneMaterial, transparentMode) : 0;
        }
    };
    RedRenderer.prototype.sceneRender = function (redGL, scene, camera, mode2DYn, children, time, renderResultObj, subSceneMaterial, transparentMode) {
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
        this['cacheInfo']['cacheTexture'].length = 0;
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
            mode2DYn,
            time,
            renderResultObj,
            this['cacheInfo'],
            this['cacheState'],
            undefined,
            subSceneMaterial,
            transparentMode
        )
    };
    Object.freeze(RedRenderer);
})();
