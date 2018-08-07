"use strict";
var baseTestUI = function (redGL) {
	baseTestUI.makeBaseUI();
	this['gui'] = new dat.GUI({name: 'test'});
	this['redGL'] = redGL;
};
var makeSourceView = function () {
	var rootBox;
	var sourceViewBt;
	document.body.appendChild(rootBox = document.createElement('div'));
	document.body.appendChild(sourceViewBt = document.createElement('button'));
	rootBox.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:10000;display:none;color:#fff;font-size:11px;overflow-y:auto;padding:10px;'
	sourceViewBt.style.cssText = 'position:fixed;right:10px;bottom:10px;background:#222;color:#fff;z-index:10001;border:0;outline:none;cursor:pointer;padding:8px;font-size:11px;border-radius:5px'
	sourceViewBt.innerHTML = 'SOURCE VIEW'
	sourceViewBt.addEventListener('click', function () {
		if ( rootBox.style.display == 'block' ) {
			rootBox.style.display = 'none';
			sourceViewBt.innerHTML = 'SOURCE VIEW'
		} else {
			sourceViewBt.innerHTML = 'CLOSE'
			rootBox.style.display = 'block';
			rootBox.innerHTML = '<code class="language-javascript">' + Prism.highlight(document.querySelector('#testSource').textContent, Prism.languages.javascript) + '</code>'
		}
	})
}
baseTestUI.makeBaseUI = function () {
	var t0;
	t0 = document.createElement('link')
	t0.setAttribute('rel', 'stylesheet')
	t0.setAttribute('href', 'https://redcamel.github.io/Recard/beta/lib/prism.css')
	document.head.appendChild(t0)
	t0 = document.createElement('script')
	t0.setAttribute('src', 'https://redcamel.github.io/Recard/beta/lib/prism.js')
	document.head.appendChild(t0)
	makeSourceView()
}
baseTestUI.prototype = {
	initRedGL: function (open) {
		var self = this
		var redGLTest = {
			setSizeTest1: function () {
				self['redGL'].setSize(300, 300)
				self['gui'].updateDisplay()
			},
			setSizeTest2: function () {
				self['redGL'].setSize(600, 300)
				self['gui'].updateDisplay()
			},
			setSizeTest3: function () {
				self['redGL'].setSize('100%', '100%')
				self['gui'].updateDisplay()
			}
		}
		var t0 = self['gui'].addFolder('RedGL')
		t0.add(self['redGL'], 'renderScale', 0.1, 1);
		t0.add(redGLTest, 'setSizeTest1').name('setSize(300,300)');
		t0.add(redGLTest, 'setSizeTest2').name('setSize(600,300)');
		t0.add(redGLTest, 'setSizeTest3').name('setSize(100%,100%)');
		if ( open ) t0.open()
		return t0
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
		if ( open ) t0.open()
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
		if ( open ) t0.open()
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
	initScene: function (scene, open, assetPath) {
		var t0 = this['gui'].addFolder('scene')
		var self = this
		var test = {
			backgroundColor: '#0e1318',
			grid: scene['grid'] ? true : false,
			axis: scene['axis'] ? true : false,
			skyBox: scene['skyBox'] ? true : false,
		}
		t0.add(scene, 'useBackgroundColor')
		t0.addColor(test, 'backgroundColor').onChange(function (v) {
			scene['backgroundColor'] = v
			self['gui'].updateDisplay()
		})
		scene['backgroundColor'] = test['backgroundColor']
		t0.add(test, 'axis').onChange(function (v) {
			scene['axis'] = v ? RedAxis(self['redGL']) : null
		})
		assetPath = assetPath ? assetPath : '../asset/'
		t0.add(test, 'skyBox').onChange(function (v) {
			scene['skyBox'] = v ?
				RedSkyBox(self['redGL'], [
					assetPath + 'cubemap/SwedishRoyalCastle/px.jpg',
					assetPath + 'cubemap/SwedishRoyalCastle/nx.jpg',
					assetPath + 'cubemap/SwedishRoyalCastle/py.jpg',
					assetPath + 'cubemap/SwedishRoyalCastle/ny.jpg',
					assetPath + 'cubemap/SwedishRoyalCastle/pz.jpg',
					assetPath + 'cubemap/SwedishRoyalCastle/nz.jpg'
				]) : null
		})
		if ( open ) t0.open()
		var tFolder;
		tFolder = t0.addFolder('fog')
		tFolder.add(scene, 'useFog')
		tFolder.add(scene, 'fogDensity', 0, 1)
		tFolder.add(scene, 'fogDistance', 0, 50000)
		tFolder.addColor(scene, 'fogColor')
		tFolder = t0.addFolder('grid')
		var testGrid = {
			grid: scene['grid'] ? true : false,
			size: 100,
			divisions: 100,
			color1: '#cccccc',
			color2: '#666666'
		}
		tFolder.add(testGrid, 'grid').onChange(function (v) {
			scene['grid'] = v ? RedGrid(self['redGL'], testGrid['size'], testGrid['divisions'], testGrid['color1'], testGrid['color2']) : null
		})
		tFolder.add(testGrid, 'size', 1, 200).onChange(function (v) {
			if ( testGrid['grid'] ) {
				scene['grid'] = RedGrid(self['redGL'], testGrid['size'], testGrid['divisions'], testGrid['color1'], testGrid['color2'])
			}
		})
		tFolder.add(testGrid, 'divisions', 1, 200, 2).onChange(function (v) {
			if ( testGrid['grid'] ) {
				scene['grid'] = RedGrid(self['redGL'], testGrid['size'], testGrid['divisions'], testGrid['color1'], testGrid['color2'])
			}
		})
		tFolder.addColor(testGrid, 'color1').onChange(function (v) {
			if ( testGrid['grid'] ) {
				scene['grid'] = RedGrid(self['redGL'], testGrid['size'], testGrid['divisions'], testGrid['color1'], testGrid['color2'])
			}
		})
		tFolder.addColor(testGrid, 'color2').onChange(function (v) {
			if ( testGrid['grid'] ) {
				scene['grid'] = RedGrid(self['redGL'], testGrid['size'], testGrid['divisions'], testGrid['color1'], testGrid['color2'])
			}
		})
		return t0
	},
	initFog: function (scene) {
		var t0 = this['gui'].addFolder('scene')
		var self = this
		var test = {
			fogColor: '#ffffff'
		}
		t0.add(scene, 'useFog', true, false)
		t0.add(scene, 'fogDensity', 0, 1)
		t0.add(scene, 'fogDistance', 0, 100)
		t0.addColor(test, 'fogColor').onChange(function (v) {
			scene['fogColor'] = v
			scene['fogColor'] = v
			self['gui'].updateDisplay()
		})
		return t0
	},
	initView: function (view) {
		var t0 = this['gui'].addFolder('view')
		var self = this
		var test = {
			setLocationTest1: function () {
				view.setLocation(200, 200)
				self['gui'].updateDisplay()
			},
			setLocationTest2: function () {
				view.setLocation(100, 400)
				self['gui'].updateDisplay()
			}
		}
		t0.add(test, 'setLocationTest1').name('setLocation(200,200)');
		t0.add(test, 'setLocationTest2').name('setLocation(100,400)')
		return t0
	}
}