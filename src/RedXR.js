"use strict";
var RedXR;
(function () {
	RedXR = function (canvas, callback, frameUpdater) {
		(_ => {
			'use strict';
			const polyfill = new WebXRPolyfill();
			const cvs = document.createElement('canvas');
			const xrButton = new XRDeviceButton({
				onRequestSession: device => device.requestSession({exclusive: true}).then(session => {
					xrButton.setSession(session);
					session.addEventListener('end', e => {
						xrButton.setSession(null)
						canvas.style.display = 'none'
					});
					start(session);
				}),
				onEndSession: session => session.end()
			});
			[canvas, xrButton.domElement].forEach(el => document.body.appendChild(el));
			if ( navigator.xr ) {
				navigator.xr.requestDevice()
					.then(device => device.supportsSession({exclusive: true}).then(_ => xrButton.setDevice(device)));
			}
			const start = session => {
				const start = isOK => {
					if ( !isOK ) return console.log('error');
					canvas.style.display = 'block'
					var camL = RedCamera()
					var camR = RedCamera()
					var renderer = RedRenderer(redGL)
					var world = RedWorld()
					var scene = RedScene(redGL);
					redGL.world = world
					renderer.world = redGL.world;
					camL.autoUpdateMatrix = camR.autoUpdateMatrix = false;
					var tUUID = +RedGL.makeUUID()
					var tLeftViewName = 'left' + tUUID
					var tRightViewName = 'right' + tUUID
					world.addView(RedView(tLeftViewName, scene, camL));
					RedView(tLeftViewName).setSize('50%', '100%');
					RedView(tLeftViewName).setLocation('0%', '0%');
					world.addView(RedView('right' + tUUID, scene, camR));
					RedView(tRightViewName).setSize('50%', '100%');
					RedView(tRightViewName).setLocation('50%', '0%');
					var resultObject = {
						world: world,
						scene: scene
					}
					Object.freeze(resultObject)
					if ( callback ) callback.call(redGL, resultObject)
					session.baseLayer = new XRWebGLLayer(session, redGL.gl);
					session.requestFrameOfReference('eyeLevel').then(frameOfRef => {
						const onframe = (t, frame) => {
							const session = frame.session;
							const pose = frame.getDevicePose(frameOfRef);
							if ( pose ) {
								redGL.gl.bindFramebuffer(redGL.gl.FRAMEBUFFER, session.baseLayer.framebuffer);
								redGL.gl.clear(redGL.gl.COLOR_BUFFER_BIT | redGL.gl.DEPTH_BUFFER_BIT);
								for ( const view of frame.views ) {
									const viewport = session.baseLayer.getViewport(view);
									const cam = viewport.x == 0 ? camL : camR;
									cam.perspectiveMTX = view.projectionMatrix;
									cam.matrix = pose.getViewMatrix(view);
								}
								frameUpdater(t)
								renderer.render(redGL, t);
							}
							session.requestAnimationFrame(onframe);
						}
						redGL.setSize(null, null, true)
						session.requestAnimationFrame(onframe);
					});
				};
				const redGL = RedGL(canvas, start, {compatibleXRDevice: session.device});
			};
		})();
	}
	RedXR['makeUUID'] = (function () {
		var UUID = 0;
		return function () {
			return UUID++
		}
	})();
	RedXR.prototype = {};
	Object.freeze(RedGL);
})();
