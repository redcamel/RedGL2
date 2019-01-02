var index_demo2;
(function () {
    var tScene
    var tLight
    var testEmitter
    var interleaveData;
    var testRedPointCloud;
    var updateOimoPhysics
    var PARTICLE_DEFINE_DATA
    var targetRender
    index_demo2 = {
        start : function (redGL, tView, tRenderer, tCamera){
            tView.scene = tScene
            // 렌더시작
            targetRender.start(redGL, function (time) {
                tCamera.x = Math.sin(time / 1500) * 1000
                tCamera.y = Math.cos(time / 1500) * 1000 + 1500
                tCamera.z = Math.cos(time / 1500) * 1000

                updateOimoPhysics();
                // 파티클 업데이트
                testEmitter.update(time)
                PARTICLE_DEFINE_DATA['tint'][1] = Math.cos(time / 1000)
                PARTICLE_DEFINE_DATA['tint'][2] = Math.cos(time / 1000) + Math.sin(time / 1000)

                testEmitter.x = Math.sin(time / 500) * 236
                // testEmitter.y = Math.cos(time / 1500) * 4
                testEmitter.z = Math.cos(time / 500) * 236
                // 인터리브 데이터 업데이트
                interleaveData.forEach(function (v, index) {
                    if (index % 4 == 0) interleaveData[index] = v + Math.sin(time / 1000 + index / 100)
                    else if (index % 4 == 1) interleaveData[index] = v + Math.sin(time / 1000 + index / 100)
                    else if (index % 4 == 2) interleaveData[index] = v + Math.cos(time / 1000 + index / 100)
                    else interleaveData[index] = Math.cos(time / 500 + index / 100) * 10
                });
                testRedPointCloud.update(interleaveData);
            });
        },
        init: function (redGL, tView, tRenderer, tCamera) {
            targetRender = tRenderer
            if (!tScene) {
                tScene = RedScene(redGL);

                tLight = RedDirectionalLight(redGL);
                tScene.addLight(tLight)
                tLight.x = 0
                tLight.y = 300
                tLight.z = 300


                var tShadow = RedDirectionalShadow(redGL, tLight)
                tScene.shadowManager.directionalShadow = tShadow
                tShadow.width = 512
                tShadow.height = 512
                tShadow.size = 700
                tScene.skyBox =
                    RedSkyBox(redGL, [
                        '../asset/cubemap/SwedishRoyalCastle/px.jpg',
                        '../asset/cubemap/SwedishRoyalCastle/nx.jpg',
                        '../asset/cubemap/SwedishRoyalCastle/py.jpg',
                        '../asset/cubemap/SwedishRoyalCastle/ny.jpg',
                        '../asset/cubemap/SwedishRoyalCastle/pz.jpg',
                        '../asset/cubemap/SwedishRoyalCastle/nz.jpg'
                    ]);


                /////////////////////////
                var world
                var type
                var bodys
                var grounds = []
                var meshs = []

                var clearMesh = function () {
                    console.log('클리에 메쉬')
                    var i = meshs.length;
                    while (i--) tScene.removeChild(meshs[i]);
                    i = grounds.length;
                    while (i--) tScene.removeChild(grounds[i]);
                    grounds = [];
                    meshs = [];
                }

                function addStaticBox(size, position, rotation) {
                    var mesh = RedMesh(redGL, RedBox(redGL, 1, 1, 1, 16, 16, 16), RedStandardMaterial(
                        redGL,
                        RedBitmapTexture(redGL, '../asset/brick/Brick03_col.jpg'),
                        RedBitmapTexture(redGL, '../asset/brick/Brick03_nrm.jpg')
                    ));
                    mesh.material.displacementPower = 5
                    mesh.scaleX = size[0]
                    mesh.scaleY = size[1]
                    mesh.scaleZ = size[2]

                    mesh.rotationX = rotation[0]
                    mesh.rotationY = rotation[1]
                    mesh.rotationZ = rotation[2]

                    mesh.x = position[0]
                    mesh.y = position[1]
                    mesh.z = position[2]

                    tScene.addChild(mesh);
                    grounds.push(mesh);

                }

                updateOimoPhysics = function () {
                    if (world == null) return;

                    world.step();

                    var x, y, z, mesh, body, i = bodys.length;

                    while (i--) {
                        body = bodys[i];
                        mesh = meshs[i];

                        if (!body.sleeping) {

                            // console.log(body)
                            mesh.x = body.pos.x
                            mesh.y = body.pos.y
                            mesh.z = body.pos.z
                            var tRotation = [0, 0, 0]
                            var q = [body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w]
                            tRotation = RedGLUtil.quaternionToRotation(q)
                            mesh.rotationX = tRotation[0] * 180 / Math.PI
                            mesh.rotationY = tRotation[1] * 180 / Math.PI
                            mesh.rotationZ = tRotation[2] * 180 / Math.PI

                            // change material
                            if (mesh._geometry instanceof RedSphere) mesh.material = tMat1;
                            else if (mesh._geometry instanceof RedBox) mesh.material = tMat2;
                            // if(mesh.geometry instanceof RedSphere mesh.material = tMat3;

                            // reset position
                            if (mesh.y < -400) {
                                x = -100 + Math.random() * 200;
                                z = -100 + Math.random() * 200;
                                y = 1000 + Math.random() * 100;
                                body.resetPosition(x, y, z);
                            }
                        } else {
                            if (mesh._material != tMat0) mesh.material = tMat0;
                        }
                    }
                    //
                    // infos.innerHTML = world.getInfo();
                }

                function initOimoPhysics() {

                    // world setting:( TimeStep, BroadPhaseType, Iterations )
                    // BroadPhaseType can be
                    // 1 : BruteForce
                    // 2 : Sweep and prune , the default
                    // 3 : dynamic bounding volume tree

                    world = new OIMO.World({info: true, worldscale: 100, gravity: [0, -9.8, 0]});
                    populate(1);
                    //setInterval(updateOimoPhysics, 1000/60);

                }

                initOimoPhysics()

                var tMat1
                var tMat2
                var tMat3
                var tMat0

                function populate(n) {

                    tMat1 = RedStandardMaterial(redGL, RedBitmapTexture(redGL, '../asset/brick/Brick03_col.jpg'))
                    tMat2 = RedStandardMaterial(redGL, RedBitmapTexture(redGL, '../asset/draft2.png'))
                    tMat3 = RedStandardMaterial(redGL, RedBitmapTexture(redGL, '../asset/brick/Brick03_col.jpg'))
                    tMat0 = RedColorPhongMaterial(redGL)
                    var max = 500;

                    if (n === 1) type = 1
                    else if (n === 2) type = 2;
                    else if (n === 3) type = 3;
                    else if (n === 4) type = 4;

                    // reset old
                    clearMesh();
                    world.clear();
                    bodys = [];

                    //add ground
                    var ground0 = world.add({size: [40, 40, 390], pos: [-180, 20, 0], world: world});
                    var ground1 = world.add({size: [40, 40, 390], pos: [180, 20, 0], world: world});
                    var ground2 = world.add({size: [400, 400, 400], pos: [0, -200, 0], world: world});
                    var ground3 = world.add({size: [600, 400, 600], pos: [0, -400, 0], world: world});


                    addStaticBox([40, 40, 390], [-180, 20, 0], [0, 0, 0]);
                    addStaticBox([40, 40, 390], [180, 20, 0], [0, 0, 0]);
                    addStaticBox([400, 400, 400], [0, -200, 0], [0, 0, 0]);
                    addStaticBox([600, 400, 600], [0, -400, 0], [0, 0, 0]);

                    //add object
                    var x, y, z, w, h, d;
                    var i = max;
                    var t
                    while (i--) {
                        if (type === 4) t = Math.floor(Math.random() * 3) + 1;
                        else t = type;
                        x = -100 + Math.random() * 200;
                        z = -100 + Math.random() * 200;
                        y = 100 + i * 5;
                        w = 15 + Math.random() * 20;
                        h = 15 + Math.random() * 20;
                        d = 15 + Math.random() * 20;
                        t = i > max / 2 ? 1 : 2
                        if (t == 3) t = 2
                        if (t === 1) {
                            bodys[i] = world.add({
                                type: 'sphere',
                                size: [w * 0.5],
                                pos: [x, y, z],
                                move: true,
                                world: world
                            });
                            meshs[i] = RedMesh(redGL, RedSphere(redGL, w * 0.5, 16, 16, 16), tMat1)

                        } else if (t === 2) {
                            bodys[i] = world.add({
                                type: 'box',
                                size: [w, h, d],
                                pos: [x, y, z],
                                move: true,
                                world: world
                            });
                            meshs[i] = RedMesh(redGL, RedBox(redGL, w, h, d), tMat2)


                        } else if (t === 3) {
                            bodys[i] = world.add({
                                type: 'cylinder',
                                size: [w * 0.5, h],
                                pos: [x, y, z],
                                move: true,
                                world: world
                            });
                            meshs[i] = RedMesh(redGL, RedSphere(redGL), tMat3)
                        }


                        tScene.addChild(meshs[i]);
                        tShadow.addCasting(meshs[i])
                    }
                }

//////////////////////////////////////////////////////////////////
                // RedPointCloud 설정
                var i;

                // 인터리브 정보 생성
                interleaveData = [];
                i = 5000
                while (i--) {
                    // position
                    interleaveData.push(
                        Math.random() * 1000 - 500, // x
                        Math.random() * 1000 - 500, // y
                        Math.random() * 1000 - 500 // z
                    );
                    // pointSize
                    interleaveData.push(Math.random() * 1);
                }
                // 포인트 유닛 생성
                testRedPointCloud = RedBitmapPointCloud(
                    redGL,
                    interleaveData,
                    [
                        RedInterleaveInfo('aVertexPosition', 3),
                        RedInterleaveInfo('aPointSize', 1)
                    ],
                    // 포인트 재질 생성
                    RedBitmapPointCloudMaterial(redGL, RedBitmapTexture(redGL, assetPath + 'particle.png'))
                );
                // 블렌드모드 설정
                testRedPointCloud['blendSrc'] = redGL.gl.ONE;
                testRedPointCloud['blendDst'] = redGL.gl.ONE;
                tScene.addChild(testRedPointCloud);
                ////////////////////////////////////////////////
                //파티클 설정
                PARTICLE_DEFINE_DATA = {
                    max: 250,
                    emitCount: 1,
                    lifeTime: [1000, 5500],
                    particle: {
                        movementX: {start: [0, 0], end: [-1000, 1000], ease: RedParticleEmitter.QuadInOut},
                        movementY: {start: [-50, -50], end: [0, 350], ease: RedParticleEmitter.QuadInOut},
                        movementZ: {start: [0, 0], end: [-1000, 1000], ease: RedParticleEmitter.QuadInOut},
                        scale: {start: [10, 50], end: [100, 250], ease: RedParticleEmitter.QuadInOut},
                        alpha: {start: [0.5, 1], end: [0, 0], ease: RedParticleEmitter.QuadInOut}
                    },
                    tint: [0, 0, 0],
                    gravity: -0.01
                }
                testEmitter = new RedParticleEmitter(
                    redGL,
                    PARTICLE_DEFINE_DATA,
                    RedBitmapTexture(redGL, assetPath + 'particle.png')
                )
                tScene.addChild(testEmitter)
            }
            tView.scene = tScene


        }
    }
})()