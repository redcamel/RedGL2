/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.5.3 20:0
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
            this['camera'].x = -temp.camera.x + this.x
            this['camera'].y = +temp.camera.y + this.y
            this['camera'].z = -temp.camera.z + this.z
            this['camera'].x = -temp.camera.x + this.x
            this['camera'].y = temp.camera.y + this.y
            this['camera'].z = -temp.camera.z + this.z


            var t0, t1
            t0 = this.localToWorld(0, 0, 1);
            t1 = this.localToWorld(0, 0, -1);
            var tLine = []
            vec3.subtract(tLine, t0, t1)
            var tCameraLine = [0, 0, 0]
            vec3.subtract(tCameraLine, [temp.camera.x, -this['camera'].y, temp.camera.z], this.localToWorld(0, 1, 0))

            var crossPoint = []


            vec3.normalize(tCameraLine, tCameraLine)
            vec3.normalize(tLine, tLine)
            vec3.cross(crossPoint, tCameraLine, tLine)
            // console.log(crossPoint)
            var t = this.localToWorld(0, 0, -1)
            this['camera'].lookAt(-crossPoint[0], -temp.camera.y, -crossPoint[2])
            // var t = this.localToWorld(0, 0, -1)
            // this['camera'].lookAt(  crossPoint[0]-this.x,crossPoint[1],crossPoint[2]+this.z)
            // this['camera'].matrix[15] = 1

            // mat4.multiply(this['camera'].matrix,this['camera'].matrix,temp['camera'].matrix)
            // mat4.ortho(
            //     this['camera'].perspectiveMTX,
            //     -0.5, // left
            //     0.5, // right
            //     -0.5, // bottom
            //     0.5, // top,
            //     -temp.camera['farClipping'],
            //     temp.camera['farClipping']
            // );
            //
            mat4.perspective(
                this['camera'].perspectiveMTX,
                Math.PI / 4,
                1,
                temp.camera['nearClipping'],
                temp.camera['farClipping']
            );

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
