// 호스트는 함수로만 선언한다
// 실제로는 RedGLInstance생성이후 발동되는 호스트이다.
function () {
    ////////////////////////////////////////
    var tGL;
    var tWorld, tScene3D, tCamera
    var tRenderer;
    var self;

    self = this
    tGL = this.gl;
    this.world = tWorld = RedWorld();
    tScene3D = RedScene(this);
    tCamera = RedCamera();
    var testDLight, testALight;
    testDLight = RedDirectionalLight(this, '#00ffff')
    testALight = RedAmbientLight(this, '#111', 1)
    tScene3D.addLight(testALight)
    testDLight.x = 1
    testDLight.y = 1
    testDLight.z = 1
    tScene3D.addLight(testDLight)
    testDLight = RedDirectionalLight(this, '#ff00ff')
    testDLight.x = -1
    testDLight.y = -1
    testDLight.z = -1
    tScene3D.addLight(testDLight)
    var testPLight = RedPointLight(this, '#ff0000')
    testPLight.x = -3
    testPLight.y = -3
    testPLight.z = -3
    testPLight['radius'] = 4
    testPLight['intensity'] = 1
    testPLight.debug = true
    tScene3D.addLight(testPLight)
    var testPLight2 = RedPointLight(this, '#00ff00')
    testPLight2.x = -3
    testPLight2.y = -3
    testPLight2.z = -3
    testPLight2['radius'] = 6
    testPLight2['intensity'] = 1
    testPLight2.debug = true
    tScene3D.addLight(testPLight2)
    tRenderer = RedRenderer();
    tWorld.addView(RedView('testView', this, tScene3D, tCamera));
    RedView('testView').setSize('100%', '100%')
    RedView('testView').setLocation('0%', '0%')
//		RedView('test')['postEffectManager'].addEffect(RedPostEffect_Invert(this))
//		RedView('test')['postEffectManager'].addEffect(RedPostEffect_Blur(this))
//		RedView('test')['postEffectManager'].addEffect(RedPostEffect_Gray(this))
//		RedView('test')['postEffectManager'].addEffect(RedPostEffect_Pixelize(this))
//		RedView('test')['postEffectManager'].addEffect(RedPostEffect_Convolution(this, RedPostEffect_Convolution['EMBOSS']))
//		RedView('test')['postEffectManager'].addEffect(RedPostEffect_HueSaturation(this))
// 		RedView('test')['postEffectManager'].addEffect(RedPostEffect_Vignetting(this))
    var test = RedPostEffect_BrightnessContrast(this)
    RedView('testView')['postEffectManager'].addEffect(test)
    console.log(this)
    var zoomBlur = RedPostEffect_ZoomBlur(this)
    // RedView('test')['postEffectManager'].addEffect(zoomBlur)
//		RedView('test')['postEffectManager'].addEffect(RedPostEffect_HalfTone(this))
// 		RedView('test')['postEffectManager'].addEffect(RedPostEffect_Bloom(this))

    var testMaterial
    testMaterial = RedEnvironmentMaterial(
        this,
        RedBitmapTexture(this, 'https://redcamel.github.io/RedGL2/asset/crate.png'),
        RedBitmapCubeTexture(this, [
            'https://redcamel.github.io/RedGL2/asset/cubemap/SwedishRoyalCastle/px.jpg',
            'https://redcamel.github.io/RedGL2/asset/cubemap/SwedishRoyalCastle/nx.jpg',
            'https://redcamel.github.io/RedGL2/asset/cubemap/SwedishRoyalCastle/py.jpg',
            'https://redcamel.github.io/RedGL2/asset/cubemap/SwedishRoyalCastle/ny.jpg',
            'https://redcamel.github.io/RedGL2/asset/cubemap/SwedishRoyalCastle/pz.jpg',
            'https://redcamel.github.io/RedGL2/asset/cubemap/SwedishRoyalCastle/nz.jpg'
        ])
        , RedBitmapTexture(this, 'https://redcamel.github.io/RedGL2/asset/normalTest.jpg')
        , RedBitmapTexture(this, 'https://redcamel.github.io/RedGL2/asset/specular.png')
        , RedBitmapTexture(this, 'https://redcamel.github.io/RedGL2/asset/displacementTest.jpg')
    )
    tScene3D.skyBox =
        RedSkyBox(this, [
            'https://redcamel.github.io/RedGL2/asset/cubemap/SwedishRoyalCastle/px.jpg',
            'https://redcamel.github.io/RedGL2/asset/cubemap/SwedishRoyalCastle/nx.jpg',
            'https://redcamel.github.io/RedGL2/asset/cubemap/SwedishRoyalCastle/py.jpg',
            'https://redcamel.github.io/RedGL2/asset/cubemap/SwedishRoyalCastle/ny.jpg',
            'https://redcamel.github.io/RedGL2/asset/cubemap/SwedishRoyalCastle/pz.jpg',
            'https://redcamel.github.io/RedGL2/asset/cubemap/SwedishRoyalCastle/nz.jpg'
        ]);
    (function () {
        var testMaterial
        testMaterial = RedPointColorMaterial(self)
        var interleaveData, interleaveData2
        interleaveData = []
        var i = 5000
        while (i--) {
            var t = Math.random() * 100 - 50
            interleaveData.push(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50)
            interleaveData.push(Math.random() * 0.1)
            interleaveData.push(Math.random(), Math.random(), Math.random(), 1)
        }
        var testParticle = RedPointUnit(
            self,
            interleaveData,
            [
                RedInterleaveInfo('aVertexPosition', 3),
                RedInterleaveInfo('aPointSize', 1),
                RedInterleaveInfo('aVertexColor', 4)
            ],
            testMaterial
        )
        tScene3D.addChild(testParticle)
    })();
    (function () {
        var testMaterial
        testMaterial = RedPointBitmapMaterial(self, RedBitmapTexture(self, 'https://redcamel.github.io/RedGL2/asset/alphaTest.png'))
        var interleaveData
        interleaveData = []
        var i = 5000
        while (i--) {
            interleaveData.push(Math.random() * 150 - 75, Math.random() * 150 - 75, Math.random() * 150 - 75)
            interleaveData.push(Math.random() * 2)
            interleaveData.push(Math.random(), Math.random(), Math.random(), 1)
        }
        var testParticle = RedPointUnit(
            self,
            interleaveData,
            [
                RedInterleaveInfo('aVertexPosition', 3),
                RedInterleaveInfo('aPointSize', 1),
                RedInterleaveInfo('aVertexColor', 4)
            ],
            testMaterial
        )
        tScene3D.addChild(testParticle)
    })();
    JsonModelLoader(this, 'testJsonModel', 'https://redcamel.github.io/RedGL2/asset/teapot.json', function (interleaveBuffer, indexBuffer) {
        console.log('호잇!', interleaveBuffer, indexBuffer)
        var i = 5500
        while (i--) {
            var testMesh = RedMesh(self, RedGeometry(interleaveBuffer, indexBuffer), testMaterial)
            testMesh.x = Math.random() * 250 - 125
            testMesh.y = Math.random() * 250 - 125
            testMesh.z = Math.random() * 250 - 125
            testMesh.scaleX = testMesh.scaleY = testMesh.scaleZ = 0.3
            testMesh.rotationX = Math.random() * 360
            testMesh.rotationY = Math.random() * 360
            testMesh.rotationZ = Math.random() * 360
            tScene3D.addChild(testMesh)
        }
        var testMesh = RedMesh(self, RedGeometry(interleaveBuffer, indexBuffer), testMaterial)
        testMesh.scaleX = testMesh.scaleY = testMesh.scaleZ = 0.3
        tScene3D.addChild(testMesh)
        var i = 10
        while (i--) {
            var testMesh2 = RedSprite3D(self, RedColorMaterial(self))
            testMesh2.x = Math.sin(Math.PI * 2 / 10 * i) * 5
            testMesh2.y = Math.cos(Math.PI * 2 / 10 * i) * 5
            // testMesh2.scaleX = testMesh2.scaleY = testMesh2.scaleZ =10
            tScene3D.addChild(testMesh2)
        }
        tScene3D['grid'] = RedGrid(self)
        i = 500
        while (i--) {
            var testLine = new RedLine(self, new RedColorMaterial(self, i % 2 ? '#ff0000' : i % 3 ? '#00ff00' : '#0000ff', Math.random()))
            // console.log(testLine.material)
            // var testLine = new RedLine(this, testMaterial2)
            var tX, tY, tZ
            var i2 = 4
            tX = tY = tZ = 0
            // testLine.addPoint(0, 0, 0)
            // testLine.addPoint(100, 0, 0)
            // testLine.addPoint(200, 0, 0)
            // testLine.addPoint(300, 0, 0)
            // testLine.addPoint(300, 0, 0)
            // testLine.addPoint(300, 100, 0)
            // testLine.addPoint(300, 100+Math.random()*50, 0)
            // testLine.addPoint(600, 100+Math.random()*50, 0)
            var i2 = 3 * 10
            tX = tY = tZ = 0
            while (i2--) {
                tX += Math.random()
                tY += Math.random()
                tZ += Math.random()
                testLine.addPoint(tX, tY, tZ)
            }
            testLine.rotationX = Math.random() * 360
            testLine.rotationY = Math.random() * 360
            testLine.rotationZ = Math.random() * 360
            tScene3D.addChild(testLine)
        }
    })
    tRenderer.renderDebuger.visible = true
    tScene3D.sortGeometry()
    tRenderer.start(this, function (time) {
        // testInterleaveBuffer.upload(interleaveData)
        var i = tScene3D.children.length
        while (i--) {
            if (i == 0) break
            testMesh = tScene3D.children[i]
            testMesh.rotationX += 0.1
            testMesh.rotationY += 0.1
            testMesh.rotationZ += 0.1
        }

        testMaterial['displacementPower'] = Math.sin(time / 100)
        tCamera.x = Math.sin(time / 3500) * 20
        tCamera.y = Math.cos(time / 3500) * 20
        tCamera.z = Math.cos(time / 3500) * 20
        // tCamera.z = 20
        // tCamera.lookAt(0, 0, 0)
        testPLight.x = -Math.sin(time / 1500) * 5
        testPLight.y = 2
        testPLight.z = -Math.cos(time / 1500) * 5
        testPLight2.x = Math.sin(time / 1500) * 18.5
        testPLight2.y = 0
        testPLight2.z = Math.cos(time / 1500) * 18.5
//			zoomBlur.centerX = Math.sin(time / 1000) / 3.14
//			zoomBlur.centerY = Math.sin(time / 1000) / 3.14
        zoomBlur.amount = Math.sin(time / 500) * 38
    })

    var test = new OffscreenCanvas(256, 256)
    console.log('test', test)
    var bloom
    /////////////////////////////////////////////////////////////////////
    // 이놈으로 외부 통신을 한다.
    this.userInterface = {
        addObject: function (num) {
            var t0;
            while (num--) {
                tScene3D.addChild(t0 = RedMesh(this, RedSphere(this), RedColorPhongMaterial(this)))
                t0.scaleX = t0.scaleY = t0.scaleZ = 2
                t0.x = Math.random() * 200 - 100
                t0.y = Math.random() * 200 - 100
                t0.z = Math.random() * 200 - 100
            }
        },
        addBloom: function () {
            self.userInterface.removeBloom();
            RedView('testView')['postEffectManager'].addEffect(bloom = RedPostEffect_Bloom(self))
        },
        removeBloom: function () {
            if (bloom) RedView('testView')['postEffectManager'].removeEffect(bloom)
        }
    }
    /////////////////////////////////////////////////////////////////////
    console.log(tScene3D)
}