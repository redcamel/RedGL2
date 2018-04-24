"use strict";
var baseTestUI = function (redGL) {
    this['gui'] = new dat.GUI({
        name: 'test'
    });
    this['redGL'] = redGL;


}
baseTestUI.prototype = {
    initRedGL: function () {
        var self = this
        var redGLTest = {
            setSizeTest1: function () {
                self['redGL'].fullMode = false
                self['redGL'].setSize(300, 300)
                self['gui'].updateDisplay()

            },
            setSizeTest2: function () {
                self['redGL'].fullMode = false
                self['redGL'].setSize(600, 300)
                self['gui'].updateDisplay()
            }
        }
        var t0 = self['gui'].addFolder('RedGL')
        t0.add(self['redGL'], 'renderScale', 0.1, 1);
        t0.add(self['redGL'], 'fullMode', true, false, true);
        t0.add(redGLTest, 'setSizeTest1').name('setSize(300,300)');
        t0.add(redGLTest, 'setSizeTest2').name('setSize(600,300)');
        return t0
    },
    initCamera: function (camera) {
        var t0 = this['gui'].addFolder('camera')
        t0.add(camera, 'orthographicYn', true, false)
        t0.add(camera, 'nearClipping', 0, 20)
        t0.add(camera, 'farClipping', 0, 10000)
        t0.add(camera, 'fov', 0, 100)
        t0.add(camera, 'x', -100, 100)
        t0.add(camera, 'y', -100, 100)
        t0.add(camera, 'z', -100, 100)
        return t0
    },
    initBasicController: function (controller) {
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
    initScene: function (scene) {
        var t0 = this['gui'].addFolder('scene')
        var self = this
        var test = {
            setBackgroundColorTest1: function () {
                scene.setBackgroundColor("#00ff00")
                scene['useBackgroundColor'] = true
                self['gui'].updateDisplay()
            },
            setBackgroundColorTest2: function () {
                scene.setBackgroundColor("#0000ff")
                scene['useBackgroundColor'] = true
                self['gui'].updateDisplay()
            },
            grid: scene['grid'] ? true : false,
            axis: scene['axis'] ? true : false,
            skyBox: scene['skyBox'] ? true : false,
        }

        t0.add(scene, 'useBackgroundColor', true, false)
        t0.add(test, 'setBackgroundColorTest1').name('setBackgroundColor("#00ff00")');
        t0.add(test, 'setBackgroundColorTest2').name('setBackgroundColor("#0000ff")')
        t0.add(test, 'grid').onChange(function (v) {
            scene['grid'] = v ? RedGrid(self['redGL']) : null
        })
        t0.add(test, 'axis').onChange(function (v) {
            scene['axis'] = v ? RedAxis(self['redGL']) : null
        })
        t0.add(test, 'skyBox').onChange(function (v) {
            scene['skyBox'] = v ?
                RedSkyBox(self['redGL'], [
                    '../asset/cubemap/posx.png',
                    '../asset/cubemap/negx.png',
                    '../asset/cubemap/posy.png',
                    '../asset/cubemap/negy.png',
                    '../asset/cubemap/posz.png',
                    '../asset/cubemap/negz.png'
                ]) : null
        })
        return t0
    },
    initFog: function (scene) {
        var t0 = this['gui'].addFolder('scene')
        var self = this

        t0.add(scene, 'useFog', true, false)
        t0.add(scene, 'fogDensity', 0,0.5)
        t0.add(scene, 'fogDistance', 0,100)

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