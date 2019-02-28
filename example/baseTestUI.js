var baseTestUI = function (redGL, width) {
    // var getQueryParam = function(param) {
    //     var found;
    //     window.location.search.split('?')[1].split("&").forEach(function(item) {
    //         if (param ==  item.split("=")[0]) {
    //             found = item.split("=")[1];
    //         }
    //     });
    //     return found;
    // };
    // console.log(getQueryParam('name'))
    document.body.appendChild(testBt = document.createElement('div'));
    testBt.innerHTML = 'created by Redcamel'
    testBt.style.cssText = "position: fixed;top:40px;padding:0px;left:15px;font-size:11px; color:#fff;border:0;outline:none;"
    //

    // Global site tag (gtag.js) - Google Analytics
    var t0 = document.createElement('script');
    t0.setAttribute('async', '');
    t0.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=UA-134079611-1');
    document.head.appendChild(t0)
    //
    t0 = document.createElement('script');
    t0.innerHTML = 'window.dataLayer = window.dataLayer || [];';
    t0.innerHTML += 'function gtag(){dataLayer.push(arguments);}';
    t0.innerHTML += 'gtag(\'js\', new Date());';
    t0.innerHTML += 'gtag(\'config\', \'UA-134079611-1\');';
    document.head.appendChild(t0);


    baseTestUI.makeBaseUI();
    this['gui'] = new dat.GUI({name: 'RedGL Test UI'});
    this['gui'].width = width || 400;
    this['redGL'] = redGL;

    if (!window.frameElement) {
        var testBt
        document.body.appendChild(testBt = document.createElement('img'));
        testBt.src = "https://redcamel.github.io/RedGL2/asset/github.png"
        testBt.style.cssText = "position: fixed;bottom:12px;left:10px;width:30px;cursor: pointer;"
        testBt.onclick = function () {
            window.location.href = 'https://github.com/redcamel/RedGL2'
        }
        document.body.appendChild(testBt = document.createElement('button'));
        testBt.innerHTML = 'DOC'
        testBt.style.cssText = "position: fixed;bottom:10px;padding:0px;left:45px;width:45px;height:30px;font-size:11px;border-radius:15px;cursor: pointer; background: rgb(65, 48, 76);color:#fff;border:0;outline:none;font-weight: bold"
        testBt.onclick = function () {
            window.location.href = 'https://redcamel.github.io/RedGL2/redDoc/index.html'
        }
        document.body.appendChild(testBt = document.createElement('button'));
        testBt.innerHTML = 'EXAMPLE'
        testBt.style.cssText = "position: fixed;bottom:10px;padding:0px;left:97px;width:80px;height:30px;font-size:11px;border-radius:15px;cursor: pointer; background: rgb(65, 48, 76);color:#fff;border:0;outline:none;font-weight: bold"
        testBt.onclick = function () {
            window.location.href = 'https://redcamel.github.io/RedGL2/example/index.html'
        }
        // var tItemList = baseTestUI.itemList
        // document.body.appendChild(testBt = document.createElement('button'));
        // testBt.innerHTML = '<'
        // testBt.style.cssText = "position: fixed;bottom:10px;padding:0px;left:183px;width:30px;height:30px;font-size:11px;border-radius:50%;cursor: pointer; background: rgb(65, 48, 76);color:#fff;border:0;outline:none;font-weight: bold"
        // testBt.onclick = function () {
        //     var t0 = +getQueryParam('idx')-1
        //     console.log(t0)
        //     var t1 = tItemList[t0]>=0 || tItemList[tItemList.length-1]
        //     console.log(t1)
        //     window.location.href = '/RedGL2/example/'+t1['href']+'?idx='+ t0
        // }
        // document.body.appendChild(testBt = document.createElement('button'));
        // testBt.innerHTML = '>'
        // testBt.style.cssText = "position: fixed;bottom:10px;padding:0px;left:220px;width:30px;height:30px;font-size:11px;border-radius:50%;cursor: pointer; background: rgb(65, 48, 76);color:#fff;border:0;outline:none;font-weight: bold"
        // testBt.onclick = function () {
        //     var t0 = +getQueryParam('idx')+1
        //     var t1 = tItemList[t0] || tItemList[0]
        //     window.location.href = '/RedGL2/example/'+t1['href']+'?idx='+ t0
        // }
    }

};
var makeSourceView = function () {
    var rootBox;
    var sourceViewBt;
    document.body.appendChild(rootBox = document.createElement('div'));
    document.body.appendChild(sourceViewBt = document.createElement('button'));
    rootBox.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#2b2b2b;z-index:10001;display:none;color:#fff;font-size:12px;overflow-y:auto;padding:10px;';
    rootBox.className = 'sourceView'
    sourceViewBt.style.cssText = 'position:fixed;right:10px;bottom:10px;background:#222;color:#fff;z-index:10002;border:0;outline:none;cursor:pointer;padding:8px;font-size:11px;border-radius:5px';
    sourceViewBt.innerHTML = 'SOURCE VIEW';
    sourceViewBt.addEventListener('click', function () {
        if (rootBox.style.display == 'block') {
            rootBox.style.display = 'none';
            sourceViewBt.innerHTML = 'SOURCE VIEW';
        } else {
            sourceViewBt.innerHTML = 'CLOSE';
            rootBox.style.display = 'block';
            rootBox.innerHTML = '<code class="language-javascript">' + Prism.highlight(document.querySelector('#testSource').textContent, Prism.languages.javascript) + '</code>'
        }
    });
};

baseTestUI.makeBaseUI = function () {
    var t0;
    t0 = document.createElement('link');
    t0.setAttribute('rel', 'stylesheet');
    t0.setAttribute('href', 'https://redcamel.github.io/Recard/beta/lib/prism.css');
    document.head.appendChild(t0);
    t0 = document.createElement('script');
    t0.setAttribute('src', 'https://redcamel.github.io/Recard/beta/lib/prism.js');
    document.head.appendChild(t0);
    makeSourceView();
};
baseTestUI.exampleList = [
    {
        key: 'RedGL',
        list: [
            {
                key: 'RedGL',
                href: 'etc/RedGL.html'
            },
            {
                key: 'RedScene',
                href: 'etc/RedScene.html'
            },
            {
                key: 'RedView',
                href: 'etc/RedView.html'
            },
            {
                key: 'Multi RedGL Instance',
                href: 'etc/multiRedGLInstance.html'
            }
        ]
    },
    {
        key: 'Primitives',
        list: [
            {
                key: 'RedPlane',
                href: 'primitives/RedPlane.html'
            },
            {
                key: 'RedBox',
                href: 'primitives/RedBox.html'
            },
            {
                key: 'RedSphere',
                href: 'primitives/RedSphere.html'
            },
            {
                key: 'RedCylinder',
                href: 'primitives/RedCylinder.html'
            }
        ]
    },
    {
        key: 'Controller',
        list: [
            {
                key: 'RedCamera',
                href: 'camera/RedCamera.html'
            },
            {
                key: 'RedCamera(orthographicMode)',
                href: 'camera/RedCamera_ortho.html'
            },
            {
                key: 'RedBasicController',
                href: 'camera/RedBasicController.html'
            },
            {
                key: 'RedObitController',
                href: 'camera/RedObitController.html'
            }
        ]
    },
    {
        key: 'object3D',
        list: [
            {
                key: 'RedAxis',
                href: 'object3D/RedAxis.html'
            },
            {
                key: 'RedGrid',
                href: 'object3D/RedGrid.html'
            },
            {
                key: 'RedLine',
                href: 'object3D/RedLine.html'
            },
            {
                key: 'RedMesh',
                href: 'object3D/RedMesh.html'
            },
            {
                key: 'RedSkyBox',
                href: 'object3D/RedSkyBox.html'
            },
            {
                key: 'RedSprite3D',
                href: 'object3D/RedSprite3D.html'
            }
        ]
    },
    {
        key: 'Material',
        list: [
            {
                key: 'RedColorMaterial',
                href: 'material/RedColorMaterial.html'
            },
            {
                key: 'RedColorPhongMaterial',
                href: 'material/RedColorPhongMaterial.html'
            },
            {
                key: 'RedColorPhongTextureMaterial',
                href: 'material/RedColorPhongTextureMaterial.html'
            },
            {
                key: 'RedBitmapMaterial',
                href: 'material/RedBitmapMaterial.html'
            },
            {
                key: 'RedStandardMaterial',
                href: 'material/RedStandardMaterial.html'
            },
            {
                key: 'RedEnvironmentMaterial',
                href: 'material/RedEnvironmentMaterial.html'
            },
            {
                key: 'RedPBRMaterial',
                href: 'material/RedPBRMaterial.html'
            },
            {
                key: 'RedSheetMaterial',
                href: 'material/RedSheetMaterial.html'
            },
            {
                key: 'RedVideoMaterial',
                href: 'material/RedVideoMaterial.html'
            },
            {
                key: 'RedBitmapPointCloudMaterial',
                href: 'material/RedBitmapPointCloudMaterial.html'
            },
            {
                key: 'RedColorPointCloudMaterial',
                href: 'material/RedColorPointCloudMaterial.html'
            },
            {
                key: 'FlatModeMaterial',
                href: 'material/FlatModeMaterial.html'
            },
            {
                key: 'UVTest',
                href: 'etc/uvTest.html'
            },
            {
                key: 'NormalTextureTest',
                href: 'etc/normalTest.html'
            }
        ]
    },
    {
        key: 'Texture',
        list: [
            {
                key: 'RedBitmapTexture',
                href: 'resources/RedBitmapTexture.html'
            },
            {
                key: 'RedBitmapTextureOption',
                href: 'resources/RedBitmapTextureOption.html'
            },
            {
                key: 'RedBitmapTexture_anisotropic',
                href: 'resources/RedBitmapTexture_anisotropic.html'
            },
            {
                key: 'RedBitmapCubeTexture',
                href: 'resources/RedBitmapCubeTexture.html'
            },
            {
                key: 'RedDDSTexture',
                href: 'resources/RedDDSTexture.html'
            }
        ]
    },
    {
        key: 'Light',
        list: [
            {
                key: 'RedLights',
                href: 'light/RedLights.html'
            },
            {
                key: 'RedAmbientLight',
                href: 'light/RedAmbientLight.html'
            },
            {
                key: 'RedDirectionalLight',
                href: 'light/RedDirectionalLight.html'
            },
            {
                key: 'RedPointLight',
                href: 'light/RedPointLight.html'
            }
        ]
    },
    {
        key: 'Loader',
        list: [
            {
                key: 'RedOBJLoader',
                href: 'loader/obj/RedOBJLoader.html'
            },
            {
                key: 'RedDAELoader',
                href: 'loader/dae/RedDAELoader.html'
            },
            {
                key: 'RedGLTFLoader',
                href: 'loader/gltf/RedGLTFLoader.html'
            },
            {
                key: 'RedGLTFLoader_morph',
                href: 'loader/gltf/RedGLTFLoader_morph.html'
            },
            {
                key: 'RedGLTFLoader_skin',
                href: 'loader/gltf/RedGLTFLoader_skin.html'
            },
            {
                key: 'RedGLTFLoader_hardTest',
                href: 'loader/gltf/RedGLTFLoader_hardTest.html'
            },
            {
                key: 'RedGLTFLoader_glb',
                href: 'loader/gltf/RedGLTFLoader_glb.html'
            },
            {
                key: 'RedGLTFLoader_polly',
                href: 'loader/gltf/RedGLTFLoader_polly.html'
            }

        ]
    },
    {
        key: 'RedText',
        list: [
            {
                key: 'RedText',
                href: 'text/RedText.html'
            },
            {
                key: 'RedText(Orthogonal Mode)',
                href: 'text/RedCamera_ortho_text.html'
            }

        ]
    },
    {
        key: 'Fog',
        list: [
            {
                key: 'Fog_example',
                href: 'etc/Fog_example.html'
            }
        ]
    },
    {
        key: 'LOD',
        list: [
            {
                key: 'LOD_example',
                href: 'etc/LOD_example.html'
            }
        ]
    },
    {
        key: 'MouseEvent',
        list: [
            {
                key: 'MouseEvent',
                href: 'mouseEvent/MouseEvent.html'
            }
        ]
    },
    {
        key: 'RedDirectionalShadow',
        list: [
            {
                key: 'RedDirectionalShadow',
                href: 'shadow/RedDirectionalShadow.html'
            }
        ]
    },
    {
        key: 'PostEffect',
        list: [
            {
                key: 'RedPostEffect',
                href: 'postEffect/RedPostEffect.html'
            },
            {
                key: 'RedPostEffect_Vignetting',
                href: 'postEffect/RedPostEffect_Vignetting.html'
            },
            {
                key: 'RedPostEffect_FXAA',
                href: 'postEffect/antialiasing/RedPostEffect_FXAA.html'
            },
            {
                key: 'RedPostEffect_DoF',
                href: 'postEffect/dof/RedPostEffect_DoF.html'
            },
            {
                key: 'RedPostEffect_Bloom',
                href: 'postEffect/bloom/RedPostEffect_Bloom.html'
            },
            {
                key: 'RedPostEffect_Convolution',
                href: 'postEffect/RedPostEffect_Convolution.html'
            },
            {
                key: 'RedPostEffect_Film',
                href: 'postEffect/RedPostEffect_Film.html'
            },
            {
                key: 'adjustments',
                list: [
                    {
                        key: 'RedPostEffect_BrightnessContrast',
                        href: 'postEffect/adjustments/RedPostEffect_BrightnessContrast.html'
                    },
                    {
                        key: 'RedPostEffect_Threshold',
                        href: 'postEffect/adjustments/RedPostEffect_Threshold.html'
                    },
                    {
                        key: 'RedPostEffect_Invert',
                        href: 'postEffect/adjustments/RedPostEffect_Invert.html'
                    },
                    {
                        key: 'RedPostEffect_Gray',
                        href: 'postEffect/adjustments/RedPostEffect_Gray.html'
                    },
                    {
                        key: 'RedPostEffect_HueSaturation',
                        href: 'postEffect/adjustments/RedPostEffect_HueSaturation.html'
                    }
                ]
            },
            {
                key: 'blur',
                list: [
                    {
                        key: 'RedPostEffect_Blur',
                        href: 'postEffect/blur/RedPostEffect_Blur.html'
                    },
                    {
                        key: 'RedPostEffect_BlurX',
                        href: 'postEffect/blur/RedPostEffect_BlurX.html'
                    },
                    {
                        key: 'RedPostEffect_BlurY',
                        href: 'postEffect/blur/RedPostEffect_BlurY.html'
                    },
                    {
                        key: 'RedPostEffect_GaussianBlur',
                        href: 'postEffect/blur/RedPostEffect_GaussianBlur.html'
                    },
                    {
                        key: 'RedPostEffect_ZoomBlur',
                        href: 'postEffect/blur/RedPostEffect_ZoomBlur.html'
                    }
                ]
            },
            {
                key: 'pixelate',
                list: [
                    {
                        key: 'RedPostEffect_HalfTone',
                        href: 'postEffect/pixelate/RedPostEffect_HalfTone.html'
                    },
                    {
                        key: 'RedPostEffect_Pixelize',
                        href: 'postEffect/pixelate/RedPostEffect_Pixelize.html'
                    }
                ]
            }
        ]
    },
    {
        key: 'Buffer & Geometry',
        list: [
            {
                key: 'RedBuffer',
                href: 'geometry/RedBuffer.html'
            }
        ]
    },
    {
        key: 'localToWorld, worldToLocal, getScreenPoint',
        list: [
            {
                key: 'calPoint',
                href: 'etc/calPoint.html'
            }
        ]
    },
    {
        key: 'particle',
        list: [
            {
                key: 'RedParticleEmitter',
                href: 'particle/RedParticleEmitter.html'
            },
            {
                key: 'RedParticleEmitter_editor',
                href: 'particle/RedParticleEmitter_editor.html'
            },
            {
                key: 'RedColorPointCloud',
                href: 'particle/RedColorPointCloud.html'
            },
            {
                key: 'RedBitmapPointCloud',
                href: 'particle/RedBitmapPointCloud.html'
            }
        ]
    },
    {
        key: 'launcher',
        list: [
            {
                key: 'RedGLOffScreen',
                href: 'launcher/RedGLOffScreen.html'
            },
            {
                key: 'RedXR',
                href: 'launcher/RedXR.html'
            }
        ]
    }
];
var makeItem = function (list, depth) {
    depth = depth || 0
    list.forEach(function (v) {
        if (!v['href']) {
            makeItem(v['list'] ? v['list'] : [], depth + 1)
        } else {
            baseTestUI.itemList.push(v)
            makeItem(v['list'] ? v['list'] : [], depth + 1)
        }

    })
}
baseTestUI.itemList = []
makeItem(baseTestUI.exampleList)
baseTestUI.prototype = {
    initRedGL: function (open) {
        var self, redGLTestData, tFolder;
        self = this;
        redGLTestData = {
            setSizeTest1: function () {
                self['redGL'].setSize(300, 300);
            },
            setSizeTest2: function () {
                self['redGL'].setSize(600, 300);
            },
            setSizeTest3: function () {
                self['redGL'].setSize('50%', 300);
            },
            setSizeTest4: function () {
                self['redGL'].setSize(300, '50%');
            },
            setSizeTest5: function () {
                self['redGL'].setSize('100%', '100%');
            }
        };
        tFolder = self['gui'].addFolder('RedGL');
        tFolder.add(self['redGL'], 'renderScale', 0.01, 1, 0.01);
        tFolder.add(redGLTestData, 'setSizeTest1').name('setSize(300,300)');
        tFolder.add(redGLTestData, 'setSizeTest2').name('setSize(600,300)');
        tFolder.add(redGLTestData, 'setSizeTest3').name('setSize(50%,300)');
        tFolder.add(redGLTestData, 'setSizeTest4').name('setSize(300,50%)');
        tFolder.add(redGLTestData, 'setSizeTest5').name('setSize(100%,100%)');
        if (open) tFolder.open();
        return tFolder;
    },
    initScene: function (scene, open, assetPath) {
        var tFolder, tSubFolder, self, sceneTestData;
        tFolder = this['gui'].addFolder('scene');
        self = this;
        sceneTestData = {
            backgroundColor: scene.backgroundColor,
            grid: scene['grid'] ? true : false,
            axis: scene['axis'] ? true : false,
            skyBox: false
        };
        tFolder.add(scene, 'useBackgroundColor');
        tFolder.addColor(sceneTestData, 'backgroundColor').onChange(function (v) {
            scene['backgroundColor'] = v;
            self['gui'].updateDisplay();
        });
        scene['backgroundColor'] = sceneTestData['backgroundColor'];
        tFolder.add(sceneTestData, 'axis').onChange(function (v) {
            scene['axis'] = v ? RedAxis(self['redGL']) : null;
        });
        tFolder.add(sceneTestData, 'skyBox').onChange(function (v) {
            scene['skyBox'] = v ?
                RedSkyBox(self['redGL'], [
                    assetPath + 'cubemap/SwedishRoyalCastle/px.jpg',
                    assetPath + 'cubemap/SwedishRoyalCastle/nx.jpg',
                    assetPath + 'cubemap/SwedishRoyalCastle/py.jpg',
                    assetPath + 'cubemap/SwedishRoyalCastle/ny.jpg',
                    assetPath + 'cubemap/SwedishRoyalCastle/pz.jpg',
                    assetPath + 'cubemap/SwedishRoyalCastle/nz.jpg'
                ]) : null
        });
        if (open) tFolder.open();

        // 안개
        tSubFolder = tFolder.addFolder('fog');
        tSubFolder.add(scene, 'useFog');
        tSubFolder.add(scene, 'fogDensity', 0, 1);
        tSubFolder.add(scene, 'fogDistance', 0, 50000);
        tSubFolder.addColor(scene, 'fogColor');
        // 그리드
        tSubFolder = tFolder.addFolder('grid')
        var gridTestData = {
            grid: scene['grid'] ? true : false,
            size: 100,
            divisions: 100,
            color1: '#cccccc',
            color2: '#666666'
        };
        var setGrid = function () {
            RedGrid(self['redGL'], gridTestData['size'], gridTestData['divisions'], gridTestData['color1'], gridTestData['color2'])
        };
        tSubFolder.add(gridTestData, 'grid').onChange(function (v) {
            scene['grid'] = v ? setGrid() : null
        });
        tSubFolder.add(gridTestData, 'size', 1, 200).onChange(function (v) {
            if (gridTestData['grid']) scene['grid'] = setGrid();
        });
        tSubFolder.add(gridTestData, 'divisions', 1, 200, 2).onChange(function (v) {
            if (gridTestData['grid']) scene['grid'] = setGrid();
        });
        tSubFolder.addColor(gridTestData, 'color1').onChange(function (v) {
            if (gridTestData['grid']) scene['grid'] = setGrid();
        });
        tSubFolder.addColor(gridTestData, 'color2').onChange(function (v) {
            if (gridTestData['grid']) scene['grid'] = setGrid();
        });
        return tFolder
    },
    initView: function (view) {
        var tFolder, self, viewTestData
        tFolder = this['gui'].addFolder('view');
        self = this;
        viewTestData = {
            setLocationTest1: function () {
                view.setLocation(0, 0)
                self['gui'].updateDisplay()
            },
            setLocationTest2: function () {
                view.setLocation(100, 100)
                self['gui'].updateDisplay()
            },
            setLocationTest3: function () {
                view.setLocation('50%', 100)
                self['gui'].updateDisplay()
            },
            setLocationTest4: function () {
                view.setLocation('40%', '40%')
                self['gui'].updateDisplay()
            },
            setSizeTest1: function () {
                view.setSize(200, 200)
                self['gui'].updateDisplay()
            },
            setSizeTest2: function () {
                view.setSize('50%', '100%')
                self['gui'].updateDisplay()
            },
            setSizeTest3: function () {
                view.setSize('50%', '50%')
                self['gui'].updateDisplay()
            },
            setSizeTest4: function () {
                view.setSize('20%', '20%')
                self['gui'].updateDisplay()
            }
        };
        tFolder.add(viewTestData, 'setLocationTest1').name('setLocation(0,0)');
        tFolder.add(viewTestData, 'setLocationTest2').name('setLocation(100,100)');
        tFolder.add(viewTestData, 'setLocationTest3').name('setLocation(50%,100)');
        tFolder.add(viewTestData, 'setLocationTest4').name('setLocation(40%,40%)');
        tFolder.add(viewTestData, 'setSizeTest1').name('setSize(200,200)');
        tFolder.add(viewTestData, 'setSizeTest2').name('setSize(50%,100%)');
        tFolder.add(viewTestData, 'setSizeTest3').name('setSize(50%,50%)');
        tFolder.add(viewTestData, 'setSizeTest4').name('setSize(20%,20%)');
        if (open) tFolder.open();
        return tFolder
    },
    initCamera: function (camera, open) {
        var t0 = this['gui'].addFolder('camera')
        camera = camera instanceof RedCamera ? camera : camera.camera;
        t0.add(camera, 'orthographicYn', true, false);
        t0.add(camera, 'nearClipping', 0, 20, 0.01);
        t0.add(camera, 'farClipping', 0, 10000, 0.01);
        t0.add(camera, 'fov', 0, 100, 0.01);
        t0.add(camera, 'x', -1, 1, 0.01);
        t0.add(camera, 'y', -1, 1, 0.01);
        t0.add(camera, 'z', -10, 10, 0.01);
        t0.add(camera, 'targetX', -1, 1, 0.01);
        t0.add(camera, 'targetY', -1, 1, 0.01);
        t0.add(camera, 'targetZ', -1, 1, 0.01);
        if (open) t0.open()
        return t0
    },
    initBasicController: function (controller, open) {
        var t0 = this['gui'].addFolder('BasicController')
        t0.add(controller, 'x', -100, 100, 0.01);
        t0.add(controller, 'y', -100, 100, 0.01);
        t0.add(controller, 'z', -100, 100, 0.01);
        t0.add(controller, 'tilt', -360, 360, 0.01);
        t0.add(controller, 'pan', -360, 360, 0.01);
        t0.add(controller, 'speed', 0.1, 5, 0.01);
        t0.add(controller, 'delay', 0.001, 1, 0.01);
        t0.add(controller, 'speedRotation', 0.1, 2, 0.01);
        t0.add(controller, 'delayRotation', 0.01, 0.5, 0.01);
        t0.add(controller, 'maxAcceleration', 0.1, 5, 0.01);
        setInterval(function () {
            t0.updateDisplay()
        }, 16);
        if (open) t0.open();
        var t1, t2;
        t1 = document.createElement('div')
        t2 = ''
        t1.style.cssText = 'position:absolute;top:40px;left:10px;background:#000;padding:3px;color:#fff;font-size:11px;padding:10px'
        t2 += 'w - forward<br>'
        t2 += 's - back<br>'
        t2 += 'a - left<br>'
        t2 += 'd - right<br>'
        t2 += 't - up<br>'
        t2 += 'g - down<br>'
        t2 += 'q - pan left<br>'
        t2 += 'e - pan right<br>'
        t2 += 'r - tilt up<br>'
        t2 += 'f - tilt down<br>'
        t1.innerHTML = t2;
        document.body.appendChild(t1)
        return t0
    },
    initObitController: function (controller, open) {
        var t0 = this['gui'].addFolder('ObitController')
        t0.add(controller, 'centerX', -10, 10, 0.01);
        t0.add(controller, 'centerY', -10, 10, 0.01);
        t0.add(controller, 'centerZ', -10, 10, 0.01);
        t0.add(controller, 'tilt', -360, 360, 0.01);
        t0.add(controller, 'pan', -360, 360, 0.01);
        t0.add(controller, 'minTilt', -90, 90, 0.01);
        t0.add(controller, 'maxTilt', -90, 90, 0.01);
        t0.add(controller, 'distance', 0.1, 20, 0.01);
        t0.add(controller, 'speedDistance', 0.001, 1, 0.01);
        t0.add(controller, 'speedRotation', 0.1, 2, 0.01);
        t0.add(controller, 'delayRotation', 0.01, 0.5, 0.01);
        if (open) t0.open();
        setInterval(function () {
            t0.updateDisplay()
        }, 16)
        return t0
    },
    initFog: function (scene) {
        var t0 = this['gui'].addFolder('scene')
        console.log(scene.useFog)
        var testData = {
            fogColor: '#ffffff'
        }
        t0.add(scene, 'useFog');
        t0.add(scene, 'fogDensity', 0, 1, 0.01);
        t0.add(scene, 'fogDistance', 0, 100, 0.01);
        t0.addColor(testData, 'fogColor').onChange(function (v) {
            scene['fogColor'] = v
        });
        return t0
    },
    initAmbientLight: function (tALight, open) {
        var tFolder = this['gui'].addFolder('RedAmbientLight')
        var testAmbientLightData = {
            color: tALight.color
        };
        tFolder.addColor(testAmbientLightData, 'color').onChange(function (v) {
            tALight.color = v
            tFolder.updateDisplay()
        });
        tFolder.add(tALight, 'alpha', 0, 1, 0.01);
        tFolder.add(tALight, 'intensity', 0, 5, 0.01);
        if (open) tFolder.open();
    },
    initDirectionalLight: function (tDLight, open) {
        var tFolder = this['gui'].addFolder('RedDirectionalLight');
        var testDLight = {
            color: tDLight.color
        };
        tFolder.addColor(testDLight, 'color').onChange(function (v) {
            tDLight.color = v
            tFolder.updateDisplay()
        });
        tFolder.add(tDLight, 'alpha', 0, 1, 0.01);
        tFolder.add(tDLight, 'intensity', 0, 5, 0.01);
        tFolder.add(tDLight, 'x', -10, 10, 0.01);
        tFolder.add(tDLight, 'y', -10, 10, 0.01);
        tFolder.add(tDLight, 'z', -10, 10, 0.01);
        tFolder.add(tDLight, 'debug');
        if (open) tFolder.open();
    },
    initPointLight: function (tPLight, open) {
        var tFolder = this['gui'].addFolder('RedPointLight')
        var testPLight = {
            color: tPLight.color
        };
        tFolder.addColor(testPLight, 'color').onChange(function (v) {
            tPLight.color = v
            tFolder.updateDisplay()
        });
        tFolder.add(tPLight, 'alpha', 0, 1)
        tFolder.add(tPLight, 'intensity', 0, 5)
        tFolder.add(tPLight, 'x', -5, 5, 0.1)
        tFolder.add(tPLight, 'y', -5, 5, 0.1)
        tFolder.add(tPLight, 'z', -5, 5, 0.1)
        tFolder.add(tPLight, 'radius', 0, 5)
        tFolder.add(tPLight, 'debug', true, false)
        if (open) tFolder.open();
    },
    //
    initPostEffect: function (tName, effect, open, view) {
        var tFolder;
        if (tName) tFolder = this['gui'].addFolder(tName);
        switch (tName) {
            case 'RedPostEffect_BrightnessContrast':
                tFolder.add(effect, 'brightness', -150, 150);
                tFolder.add(effect, 'contrast', -50, 100);
                break;
                break;
            case 'RedPostEffect_HueSaturation':
                tFolder.add(effect, 'hue', -180, 180);
                tFolder.add(effect, 'saturation', -100, 100);
                break;
            case 'RedPostEffect_Threshold':
                tFolder.add(effect, 'threshold', 1, 255);
                break;
            case 'RedPostEffect_Vignetting':
                tFolder.add(effect, 'size', 0, 1);
                tFolder.add(effect, 'intensity', 0, 2);
                break;
            case 'RedPostEffect_BlurX':
                tFolder.add(effect, 'size', 0, 100, 0.01);
                break;
            case 'RedPostEffect_BlurY':
                tFolder.add(effect, 'size', 0, 100, 0.01);
                break;
            case 'RedPostEffect_GaussianBlur':
                tFolder.add(effect, 'radius', 0.1, 250, 0.01);
                break;
            case 'RedPostEffect_ZoomBlur':
                tFolder.add(effect, 'amount', 0, 100, 0.01);
                tFolder.add(effect, 'centerX', -1, 1, 0.01);
                tFolder.add(effect, 'centerY', -1, 1, 0.01);
                break;
            case 'RedPostEffect_HalfTone':
                tFolder.add(effect, 'centerX', -1, 1, 0.01);
                tFolder.add(effect, 'centerY', -1, 1, 0.01);
                tFolder.add(effect, 'radius', 0, 25, 0.01);
                tFolder.add(effect, 'angle', 0, 360, 0.01);
                tFolder.add(effect, 'grayMode')
                break;
            case 'RedPostEffect_Pixelize':
                tFolder.add(effect, 'width', 0, 50, 0.01);
                tFolder.add(effect, 'height', 0, 50, 0.01);
                break;
            case 'RedPostEffect_DoF':
                tFolder.add(effect, 'blur', 0, 100, 0.01);
                tFolder.add(effect, 'focusLength', 0, 100, 0.01);
                break;
            case 'RedPostEffect_Bloom':
                tFolder.add(effect, 'blur', 0, 100);
                tFolder.add(effect, 'exposure', 0, 5);
                tFolder.add(effect, 'bloomStrength', 0, 5);
                tFolder.add(effect, 'threshold', 1, 255);
                break;
            case 'RedPostEffect_Film':
                tFolder.add(effect, 'scanlineIntensity', -1, 1, 0.01);
                tFolder.add(effect, 'noiseIntensity', 0, 1, 0.01);
                tFolder.add(effect, 'scanlineCount', 0, 4096);
                tFolder.add(effect, 'grayMode');
                break;
            case 'RedPostEffect_FXAA':
                var testFXAAData = {
                    fxaa: true
                };
                tFolder.add(testFXAAData, 'fxaa', false, true).onChange(function (v) {
                    if (v) view['postEffectManager']['antialiasing'] = effect
                    else view['postEffectManager']['antialiasing'] = null
                })

                break
        }
        if (tFolder && open) tFolder.open();
        return tFolder

    }
}