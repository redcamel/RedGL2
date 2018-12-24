"use strict";
var baseTestUI = function (redGL, width) {
    baseTestUI.makeBaseUI();
    this['gui'] = new dat.GUI({name: 'RedGL Test UI'});
    this['gui'].width = width || 400;
    this['redGL'] = redGL;
};
var makeSourceView = function () {
    var rootBox;
    var sourceViewBt;
    document.body.appendChild(rootBox = document.createElement('div'));
    document.body.appendChild(sourceViewBt = document.createElement('button'));
    rootBox.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#2b2b2b;z-index:10001;display:none;color:#fff;font-size:12px;overflow-y:auto;padding:10px;';
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
        camera = camera instanceof RedCamera ? camera : camera.camera
        t0.add(camera, 'orthographicYn', true, false)
        t0.add(camera, 'nearClipping', 0, 20)
        t0.add(camera, 'farClipping', 0, 10000)
        t0.add(camera, 'fov', 0, 100)
        t0.add(camera, 'x', -100, 100)
        t0.add(camera, 'y', -100, 100)
        t0.add(camera, 'z', -100, 100)
        if (open) t0.open()
        return t0
    },
    initBasicController: function (controller, open) {
        var t0 = this['gui'].addFolder('BasicController')
        t0.add(controller, 'x', -100, 100)
        t0.add(controller, 'y', -100, 100)
        t0.add(controller, 'z', -100, 100)
        t0.add(controller, 'tilt', 0, 360)
        t0.add(controller, 'pan', 0, 360)
        t0.add(controller, 'speed', 0.1, 5)
        t0.add(controller, 'delay', 0.001, 1)
        t0.add(controller, 'speedRotation', 0.1, 2)
        t0.add(controller, 'delayRotation', 0.01, 0.5)
        t0.add(controller, 'maxAcceleration', 0.1, 5)
        if (open) t0.open()
        return t0
    },
    initObitController: function (controller) {
        var t0 = this['gui'].addFolder('ObitController')
        t0.add(controller, 'centerX', -10, 10)
        t0.add(controller, 'centerY', -10, 10)
        t0.add(controller, 'centerZ', -10, 10)
        t0.add(controller, 'tilt', 0, 360)
        t0.add(controller, 'pan', 0, 360)
        t0.add(controller, 'minTilt', -90, 0)
        t0.add(controller, 'maxTilt', 0, 90)
        t0.add(controller, 'distance', 0.1, 20)
        t0.add(controller, 'speedDistance', 0.001, 1)
        t0.add(controller, 'speedRotation', 0.1, 2)
        t0.add(controller, 'delayRotation', 0.01, 0.5)
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
    }
}