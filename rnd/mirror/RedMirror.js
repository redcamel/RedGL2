/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.5.8 10:54
 */

var RedMirror;
(function () {
	RedMirror = function (redGL) {
		if (!(this instanceof RedMirror)) return new RedMirror(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedMirror : RedGL Instance만 허용.', redGL);
		RedBaseObject3D['build'].call(this, redGL.gl);
		this['camera'] = RedCamera();

		this['frameBuffer'] = RedFrameBuffer(redGL);
		/**DOC:
		 {
		     code : 'PROPERTY',
			 title :`geometry`,
			 description : `geometry`,
			 return : 'RedGeometry'
		 }
		 :DOC*/
		this['geometry'] = RedPlane(redGL, 20, 20, 1, 1, true);
		/**DOC:
		 {
		     code : 'PROPERTY',
			 title :`material`,
			 description : `material`,
			 return : 'RedBaseMaterial 확장 Instance'
		 }
		 :DOC*/
		this['material'] = RedMirrorMaterial(redGL, this['frameBuffer'].texture);

		this['_UUID'] = RedGL.makeUUID();
	};
	RedMirror.prototype = new RedBaseContainer();
	RedMirror.prototype.render = (function () {
		var gl;
		var tWorldRect;
		var tViewRect;
		var tWidth, tHeight;
		return function (redGL, redRenderer, targetView, renderList, time, renderInfo, updateSystemUniform) {
			// console.log(redGL, redRenderer, targetView, renderList, time, renderInfo)

			gl = redGL.gl;
			tWorldRect = redRenderer['worldRect'];
			tViewRect = targetView['_viewRect'];
			tWidth = this['width'] = 1024;
			tHeight = this['height'] = 1024;
			this['frameBuffer'].width = tWidth;
			this['frameBuffer'].height = tHeight;
			this['frameBuffer'].bind(redGL.gl);
			gl.viewport(0, 0, tWidth, tHeight);
			gl.scissor(0, 0, tWidth, tHeight);
			gl.clearColor(0, 0, 0, 0);

			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			var temp = targetView.camera;
			// console.log(temp.distance)
			// 카메라를 구하는게 관건이군..
			targetView.camera = this['camera']


			// l - 2 * dot(N,I) * N

			var position = [temp.camera.x, temp.camera.y, temp.camera.z]
			var normal = [0, 0, -1]

			var dot = vec3.dot(normal, position)

			var t0 = [0, 0, 0]
			vec3.scale(t0, normal, dot * 2)


			// console.log(t0)
			var resultPosition = [0, 0, 0]
			vec3.subtract(resultPosition, position, t0)
			// console.log(resultPosition)

			this['camera'].x = resultPosition[0]
			this['camera'].y = resultPosition[1]
			this['camera'].z = resultPosition[2]
			this['camera'].lookAt(0, 0, 0)
			// var t = this.localToWorld(0, 0, 1)
			// this['camera'].lookAt(t[0],t[1],t[2])


			// this['camera'].matrix[15] = 1


			// mat4.ortho(
			//     this['camera'].perspectiveMTX,
			//     -0.5, // left
			//     0.5, // right
			//     -0.5, // bottom
			//     0.5, // top,
			//     -temp.camera['farClipping'],
			//     temp.camera['farClipping']
			// );

			mat4.perspective(
				this['camera'].perspectiveMTX,
				Math.PI / 4,
				1,
				temp.camera['nearClipping'],
				temp.camera['farClipping']
			);

			// var t =1/ vec3.length([this.x,this.y,this.z]) /2
			// // console.log(t)
			// mat4.scale(this['camera'].perspectiveMTX, this['camera'].perspectiveMTX,[t, t, t])
			// this['camera'].matrix[15] = t
			if (targetView['scene']['skyBox']) {
				targetView['scene']['skyBox'].material.mirrorMode = true;
				redRenderer.sceneRender(redGL, targetView['scene'], this['camera'], this['camera']['mode2DYn'], [targetView['scene']['skyBox']], time, renderInfo);
				targetView['scene']['skyBox'].material.mirrorMode = false;
			}
			updateSystemUniform.apply(redRenderer, [redGL, time, targetView]);
			redRenderer.sceneRender(redGL, targetView['scene'], targetView.camera, targetView.camera['mode2DYn'], renderList, time, renderInfo);
			this['frameBuffer'].unbind(redGL.gl);

			targetView.camera = temp
			updateSystemUniform.apply(redRenderer, [redGL, time, targetView]);
			gl.viewport(tViewRect[0], tWorldRect[3] - tViewRect[3] - tViewRect[1], tViewRect[2], tViewRect[3]);
			gl.scissor(tViewRect[0], tWorldRect[3] - tViewRect[3] - tViewRect[1], tViewRect[2], tViewRect[3]);
			redRenderer.sceneRender(redGL, targetView['scene'], targetView.camera, targetView.camera['mode2DYn'], [this], time, renderInfo);
		}
	})();
})();
