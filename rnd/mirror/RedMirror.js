/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.5.7 17:15
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

            var position = [temp.camera.x - this.x, temp.camera.y - this.y, temp.camera.z - this.z]
            var normal =this.localToWorld(0,0,1)

            vec3.normalize(normal,normal)
            var dot = vec3.dot(normal, position)
            var t0 = [0, 0, 0]
            vec3.scale(t0, normal, dot * 2)
            // console.log(t0)
            var resultPosition = [0, 0, 0]
            vec3.subtract(resultPosition, position, t0)

            // vec3.negate(resultPosition,resultPosition)
            // console.log(resultPosition)

            vec3.normalize(resultPosition,resultPosition)
            vec3.scale(resultPosition, resultPosition, 180 / 4)

            console.log(temp.distance)

            this['camera'].x = resultPosition[0]+this.x
            this['camera'].y = resultPosition[1]-this.y
            this['camera'].z = resultPosition[2]+this.z
            // console.log(resultPosition)
            this['camera'].lookAt(-resultPosition[0]-this.x, -resultPosition[1]-this.y, -resultPosition[2]-this.z)


            mat4.perspective(
                this['camera'].perspectiveMTX,
                this['camera'].fov* Math.PI/180,
                1,
                -this.z,
                temp.camera['farClipping']
            );

            // var t =1/10
            // // console.log(t)
            // mat4.scale(this['camera'].matrix, this['camera'].matrix,[t, t, t])

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
