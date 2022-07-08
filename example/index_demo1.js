/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:52
 */

var index_demo
(function () {
	var tScene
	var tLight
	var interleaveData;
	var testRedPointCloud;
	var testEmitter
	var targetRender
	var main,sub
	index_demo = {
		start: function (redGL, tView, tRenderer, tCamera) {
			tView.scene = tScene

			// 렌더시작
			targetRender.start(redGL, function (time) {
				// tCamera.x = Math.sin(time / 1500) * 20
				// tCamera.y = Math.cos(time / 1500) * 10 + 15
				// tCamera.z = Math.cos(time / 1500) * 20
				tCamera.x = Math.sin(time / 2000) * 30
				tCamera.y = Math.cos(time / 2500) * 20 + 15
				tCamera.z = Math.cos(time / 1500) * 20
				tCamera.lookAt(0, 0, 0)
				// 파티클 업데이트
				testEmitter.update(time)
				main.rotationX += 0.05
				main.rotationY += 0.03
				sub.rotationX -= 0.08
				testEmitter.x = Math.sin(time / 700) * 6
				// testEmitter.y = Math.cos(time / 1500) * 4
				testEmitter.z = Math.cos(time / 700) * 6
				// 인터리브 데이터 업데이트
				interleaveData.forEach(function (v, index) {
					if (index % 4 == 0) interleaveData[index] = v + Math.sin(time / 1000 + index / 100) / 10
					else if (index % 4 == 1) interleaveData[index] = v + Math.sin(time / 1000 + index / 100) / 10
					else if (index % 4 == 2) interleaveData[index] = v + Math.cos(time / 1000 + index / 100) / 10
					else interleaveData[index] = Math.cos(time / 500 + index / 100) / 10
				});
				testRedPointCloud.update(interleaveData);
			});
		},
		init: function (redGL, tView, tRenderer, tCamera) {
			targetRender = tRenderer
			if (!tScene) {
				tScene = RedScene(redGL);

				const effect = new RedPostEffect_Bloom(redGL)
				effect.bloomStrength = 0.4
				effect.exposure = 1.3
				tView.postEffectManager.addEffect(effect)

				tLight = RedDirectionalLight(redGL, '#fff0ff');
				tScene.addLight(tLight)
				tLight.x = 10;
				tLight.y = 10;
				tLight.z = 10;
				tLight = RedDirectionalLight(redGL);
				tScene.addLight(tLight)
				tLight.x = -10;
				tLight.y = 10;
				tLight.z = -10;


				// 스카이박스 설정
				tScene['skyBox'] = RedSkyBox(redGL, [
					assetPath + 'cubemap/SwedishRoyalCastle/px.jpg',
					assetPath + 'cubemap/SwedishRoyalCastle/nx.jpg',
					assetPath + 'cubemap/SwedishRoyalCastle/py.jpg',
					assetPath + 'cubemap/SwedishRoyalCastle/ny.jpg',
					assetPath + 'cubemap/SwedishRoyalCastle/pz.jpg',
					assetPath + 'cubemap/SwedishRoyalCastle/nz.jpg'
				])
// sphere생성
				var tEnvironmentTexture = RedBitmapCubeTexture(redGL, [
					assetPath + 'cubemap/SwedishRoyalCastle/px.jpg',
					assetPath + 'cubemap/SwedishRoyalCastle/nx.jpg',
					assetPath + 'cubemap/SwedishRoyalCastle/py.jpg',
					assetPath + 'cubemap/SwedishRoyalCastle/ny.jpg',
					assetPath + 'cubemap/SwedishRoyalCastle/pz.jpg',
					assetPath + 'cubemap/SwedishRoyalCastle/nz.jpg'
				])
				var tMaterial = RedEnvironmentMaterial(redGL,
					RedBitmapTexture(redGL, assetPath + 'brick/Brick03_col.jpg'),
					tEnvironmentTexture,
					RedBitmapTexture(redGL, assetPath + 'brick/Brick03_nrm.jpg'),
					RedBitmapTexture(redGL, assetPath + 'specular.png'),
					RedBitmapTexture(redGL, assetPath + 'brick/Brick03_disp.jpg'),
					RedBitmapTexture(redGL, assetPath + 'emissive.jpg')
				)
				// Mesh 설정
				var makeMesh = function (redGL, y) {
					var tMesh;
					var i = 10
					tMesh = RedMesh(redGL, RedSphere(redGL, 6, 32, 32, 32), tMaterial)
					tMesh.x = 0
					tMesh.y = y
					tScene.addChild(tMesh)
					while (i--) {
						tMesh = RedMesh(redGL, RedSphere(redGL, 1, 32, 32, 32), tMaterial)
						tMesh.x = Math.sin(Math.PI * 2 / 10 * i) * 15
						tMesh.z = Math.cos(Math.PI * 2 / 10 * i) * 15
						tMesh.scaleX = tMesh.scaleY = tMesh.scaleZ = 2
						tScene.addChild(tMesh)
					}


					tMaterial.emissiveFactor = 0
					tMaterial.displacementPower = 0
					tMaterial.displacementFlowSpeedX = 0.1
					tMaterial.displacementFlowSpeedY = 0.1
					var tDelay = 1
					var tDuration = 0.76
					var timeline = new TimelineMax({repeat: 1000, yoyo: true, repeatDelay: 2});
					timeline.add(TweenMax.to(tMaterial, tDuration, {
						delay: tDelay,
						reflectionPower: 0,
						ease: Ease.CubicInOut
					}));
					timeline.add(TweenMax.to(tMaterial, tDuration, {
						delay: tDelay,
						reflectionPower: 1,
						ease: Ease.CubicInOut
					}));
					timeline.add(TweenMax.to(tMaterial, tDuration, {
						delay: tDelay,
						normalPower: 0,
						ease: Ease.CubicInOut
					}));
					timeline.add(TweenMax.to(tMaterial, tDuration, {
						delay: tDelay,
						normalPower: 2,
						ease: Ease.CubicInOut
					}));
					timeline.add(TweenMax.to(tMaterial, tDuration, {
						delay: tDelay,
						shininess: 16,
						ease: Ease.CubicInOut
					}));
					timeline.add(TweenMax.to(tMaterial, tDuration, {
						delay: tDelay,
						displacementPower: 1,
						ease: Ease.CubicInOut
					}));
					timeline.add(TweenMax.to(tMaterial, tDuration, {
						delay: tDelay,
						shininess: 128,
						ease: Ease.CubicInOut
					}));
					timeline.add(TweenMax.to(tMaterial, tDuration, {
						delay: tDelay,
						specularPower: 0.1,
						reflectionPower: 0.5,
						ease: Ease.CubicInOut
					}));
					timeline.add(TweenMax.to(tMaterial, tDuration, {
						delay: tDelay,
						displacementPower: 0,
						ease: Ease.CubicInOut
					}));
					timeline.add(TweenMax.to(tMaterial, tDuration, {
						delay: tDelay,
						specularPower: 1,
						ease: Ease.CubicInOut
					}));
					timeline.add(TweenMax.to(tMaterial, tDuration, {
						delay: tDelay,
						emissiveFactor: 1,
						ease: Ease.CubicInOut
					}));
					timeline.add(TweenMax.to(tMaterial, tDuration, {
						delay: tDelay,
						emissiveFactor: 0,
						ease: Ease.CubicInOut
					}));
					timeline.add(TweenMax.to(tMaterial, tDuration, {
						delay: tDelay,
						displacementPower: 1,
						ease: Ease.CubicInOut
					}));
					timeline.add(TweenMax.to(tMaterial, tDuration, {
						delay: tDelay,
						displacementPower: 0.2,
						reflectionPower: 1,
						ease: Ease.CubicInOut
					}));

				}
				///////////////////////////////////////////////////////////////////////////////////////////
				// material setup
				const material1 = new RedBitmapMaterial(redGL, new RedBitmapTexture(redGL, '../asset/hud_003.png'))
				const material2 = new RedBitmapMaterial(redGL, new RedBitmapTexture(redGL, '../asset/hud_001.png'))
				const material3 = new RedBitmapMaterial(redGL, new RedBitmapTexture(redGL, '../asset/hud_006.png'))
				material1.alpha = 0.6
				material2.alpha = 0.7
				material3.alpha = 0.8
				///////////////////////////////////////////////////////////////////////////////////////////
				// make obejct
				const makeCyber = () => {
					let rootMesh = new RedMesh(redGL);

					let tGeo = new RedSphere(redGL, 8, 8, 8, 8)
					let positionList = []
					let i = 0
					let len = tGeo.interleaveBuffer.data.length / 8
					for (i; i < len; i++) {
						positionList.push(
							[
								tGeo.interleaveBuffer.data[i * 8],
								tGeo.interleaveBuffer.data[i * 8 + 1],
								tGeo.interleaveBuffer.data[i * 8 + 2]
							]
						)
					}
					// console.log(positionList)
					i = positionList.length - 1
					while (i--) {
						let tMesh = new RedMesh(redGL, new RedPlane(redGL), material1)
						tMesh.scaleX = tMesh.scaleY = (Math.sqrt(positionList[i][0] * positionList[i][0] + positionList[i][2] * positionList[i][2])) * 0.5 + Math.random() * 10
						tMesh.useCullFace = false;
						tMesh.useDepthMask = false;

						tMesh.useTransparentSort = true
						rootMesh.addChild(tMesh)
						//
						const t = Math.random() * 6 + 1
						tMesh.x = positionList[i][0] * t
						tMesh.y = positionList[i][1] * t
						tMesh.z = positionList[i][2] * t
						tMesh.lookAt(0, 0, 0)
						tMesh.rotationZ = Math.random() * 360
						tMesh.opacity = Math.random() * 0.5

						//
						let tMesh2 = new RedMesh(redGL, new RedPlane(redGL), material2)
						tMesh2.scaleX = tMesh2.scaleY = Math.random() * 0.25
						tMesh2.z = Math.random()
						tMesh2.useCullFace = false;
						tMesh2.useDepthMask = false;
						tMesh2.useTransparentSort = true
						tMesh.addChild(tMesh2)

						{
							let tRandomPositionScale = Math.random() - 0.5 + 5.5
							let tPosition = [
								positionList[i][0],
								positionList[i][1],
								positionList[i][2]
							]
							let tScale = Math.random() * 0.5 + 0.5
							TweenMax.to(tMesh, Math.random() * 4 + 0.5, {
								x: tPosition[0] * tRandomPositionScale,
								y: tPosition[1] * tRandomPositionScale,
								z: tPosition[2] * tRandomPositionScale,
								scaleX: tScale,
								scaleY: tScale,
								yoyo: true,
								repeat: -1,
								ease: Quint.easeInOut
							})
							TweenMax.to(tMesh, Math.random() * 2 + 0.3, {
								rotationZ: tMesh.rotationZ + Math.random() * 90 - 45,
								yoyo: true,
								repeat: -1,
								ease: Quint.easeInOut
							})
							let tScale2 = Math.random() *  0.5 - 0.25 + 1
							TweenMax.to(tMesh2, Math.random() * 2 + 0.5, {
								scaleX: tScale2,
								scaleY: tScale2,
								z: Math.random(),
								yoyo: true,
								repeat: -1,
								ease: Quint.easeInOut
							})
							TweenMax.to(tMesh2, Math.random() * 2 + 0.3, {
								rotationZ: tMesh2.rotationZ + Math.random() * 90 - 45,
								yoyo: true,
								repeat: -1,
								ease: Quint.easeInOut
							})
						}

						{

							let tMesh3 = new RedMesh(redGL, new RedPlane(redGL), material3)
							tMesh3.scaleX = tMesh3.scaleY = 0.25
							tMesh3.z = -Math.random() * 2
							tMesh3.useCullFace = false;
							tMesh3.useDepthMask = false;
							tMesh3.useTransparentSort = true
							tMesh3.addChild(tMesh3)

							let tScale = Math.random() * 0.5 - 0.25 + 0.5
							TweenMax.to(tMesh3, Math.random() * 3 + 1, {
								scaleX: tScale,
								scaleY: tScale,
								rotationZ: Math.random() * 360,
								yoyo: true,
								repeat: -1,
								ease: Quint.easeInOut
							})
						}

					}
					return rootMesh
				}
				makeMesh(redGL, 0);
				 main = makeCyber();
				 sub = makeCyber();
				tScene.addChild(main)
				tScene.addChild(sub)
				sub.rotationX = sub.rotationY = sub.rotationZ = Math.random() * 360
				sub.scaleX = sub.scaleY = sub.scaleZ = 0.8
				sub.opacity = 0.5
				//////////////////////////////////////////////////////////////////
				// RedPointCloud 설정
				var i;
				var testRedBitmapPointCloudMaterial
				// 인터리브 정보 생성
				interleaveData = [];
				i = 20000
				while (i--) {
					// position
					interleaveData.push(
						Math.random() * 30 - 15, // x
						Math.random() * 30 - 15, // y
						Math.random() * 30 - 15 // z
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
					testRedBitmapPointCloudMaterial = RedBitmapPointCloudMaterial(redGL, RedBitmapTexture(redGL, assetPath + 'particle.png'))
				);
				// 블렌드모드 설정
				testRedPointCloud['blendSrc'] = redGL.gl.ONE;
				testRedPointCloud['blendDst'] = redGL.gl.ONE;
				// 재질 프리멀티브 설정
				testRedBitmapPointCloudMaterial.usePreMultiply = true
				tScene.addChild(testRedPointCloud);
				////////////////////////////////////////////////
				//파티클 설정
				var PARTICLE_DEFINE_DATA = {
					max: 500,
					emitCount: 1,
					lifeTime: [1000, 5500],
					particle: {
						movementX: {start: [0, 0], end: [-5, 5], ease: RedParticleEmitter.QuadInOut},
						movementY: {start: [0, 0], end: [-5, 5], ease: RedParticleEmitter.QuadInOut},
						movementZ: {start: [0, 0], end: [-5, 5], ease: RedParticleEmitter.QuadInOut},
						scale: {start: [0.1, 0], end: [1, 10], ease: RedParticleEmitter.QuadInOut},
						alpha: {start: [0.5, 1], end: [0, 0], ease: RedParticleEmitter.QuadInOut}
					},
					tint: RedParticleEmitter.TINT_RANDOM,
					gravity: -0.01
				}
				testEmitter = new RedParticleEmitter(
					redGL,
					PARTICLE_DEFINE_DATA,
					RedBitmapTexture(redGL, assetPath + 'particle.png')
				)


				tScene.addChild(testEmitter)

			}

		}
	}
})()