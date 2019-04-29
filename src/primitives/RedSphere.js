/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var RedSphere;
(function () {
    var makeData;
    makeData = (function () {
        var thetaEnd;
        var ix, iy;
        var index;
        var grid = [];
        var a, b, c, d;
        var vertex = new Float32Array([0, 0, 0]);
        var normal = new Float32Array([0, 0, 0]);
        return function (redGL, type, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
            thetaEnd = thetaStart + thetaLength;
            index = 0;
            grid.length = 0;
            vertex[0] = 0;
            vertex[1] = 0;
            vertex[2] = 0;
            normal[0] = 0;
            normal[1] = 0;
            normal[2] = 0;
            ////////////////////////////////////////////////////////////////////////////
            // 데이터 생성!
            // buffers Data
            var interleaveData = [];
            var indexData = [];
            // generate vertices, normals and uvs
            for (iy = 0; iy <= heightSegments; iy++) {
                var verticesRow = [];
                var v = iy / heightSegments;
                for (ix = 0; ix <= widthSegments; ix++) {
                    var u = ix / widthSegments;
                    // vertex
                    vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                    vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
                    vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                    interleaveData.push(vertex.x, vertex.y, vertex.z);
                    // normal
                    normal[0] = vertex.x;
                    normal[1] = vertex.y;
                    normal[2] = vertex.z;
                    vec3.normalize(normal, normal);
                    interleaveData.push(normal[0], normal[1], normal[2]);
                    // uv
                    interleaveData.push(u, v);
                    verticesRow.push(index++);
                }
                grid.push(verticesRow);
            }
            // indices
            for (iy = 0; iy < heightSegments; iy++) {
                for (ix = 0; ix < widthSegments; ix++) {
                    a = grid[iy][ix + 1];
                    b = grid[iy][ix];
                    c = grid[iy + 1][ix];
                    d = grid[iy + 1][ix + 1];
                    if (iy !== 0 || thetaStart > 0) indexData.push(a, b, d);
                    if (iy !== heightSegments - 1 || thetaEnd < Math.PI) indexData.push(b, c, d);
                }
            }
            ////////////////////////////////////////////////////////////////////////////
            // console.log(redGL['__datas']['RedPrimitive'])
            return {
                interleaveData: interleaveData,
                indexData: indexData,
                type: type,
                interleaveBuffer: RedBuffer(
                    redGL,
                    type + '_interleaveBuffer',
                    RedBuffer.ARRAY_BUFFER,
                    new Float32Array(interleaveData),
                    [
                        RedInterleaveInfo('aVertexPosition', 3),
                        RedInterleaveInfo('aVertexNormal', 3),
                        RedInterleaveInfo('aTexcoord', 2)
                    ]
                ),
                indexBuffer: RedBuffer(
                    redGL,
                    type + '_indexBuffer',
                    RedBuffer.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array(indexData)
                )
            }
        }
    })();
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedSphere`,
		 description : `
			 RedSphere Instance 생성기.
			 Box 형태의 RedGeometry 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 radius : [
				 {type:'number'},
				 '기본값 : 1'
			 ],
			 widthSegments : [
				 {type:'uint'},
				 '기본값 : 8'
			 ],
			 heightSegments : [
				 {type:'uint'},
				 '기본값 : 6'
			 ],
			 phiStart : [
				 {type:'uint'},
				 '기본값 : 0'
			 ],
			 phiLength : [
				 {type:'uint'},
				 '기본값 : Math.PI * 2'
			 ],
			 thetaStart : [
				 {type:'uint'},
				 '기본값 : 0'
			 ],
			 thetaLength : [
				 {type:'Number'},
				 '기본값 : Math.PI'
			 ]
		 },

		 extends : [
		    'RedGeometry'
		 ],
		 demo : '../example/primitives/RedSphere.html',
		 example : `
			 RedSphere(RedGL Instance);
			 RedSphere(RedGL Instance, 1);
			 RedSphere(RedGL Instance, 1, 16,16,16);
		 `,
		 return : 'RedSphere Instance'
	 }
     :DOC*/
    RedSphere = function (redGL, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
        if (!(this instanceof RedSphere)) return new RedSphere(redGL, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedPrimitive : RedGL Instance만 허용.', redGL);
        var tType, tPrimitiveData;
        radius = radius || 1;
        widthSegments = Math.max(3, Math.floor(widthSegments) || 8);
        heightSegments = Math.max(2, Math.floor(heightSegments) || 6);
        phiStart = phiStart !== undefined ? phiStart : 0;
        phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;
        thetaStart = thetaStart !== undefined ? thetaStart : 0;
        thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;
        tType = 'RedSphere' + '_' + radius + '_' + widthSegments + '_' + heightSegments + '_' + phiStart + '_' + phiLength + '_' + thetaStart + '_' + thetaLength;
        // 유일키 방어
        if (!redGL['_datas']['Primitives']) redGL['_datas']['Primitives'] = {};
        if (redGL['_datas']['Primitives'][tType]) return redGL['_datas']['Primitives'][tType];
        else redGL['_datas']['Primitives'][tType] = this;
        //
        tPrimitiveData = makeData(redGL, tType, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
        this['interleaveBuffer'] = tPrimitiveData['interleaveBuffer'];
        this['indexBuffer'] = tPrimitiveData['indexBuffer'];
        this['interleaveBuffer']['isPrimitiveBuffer'] = true;
        this['indexBuffer']['isPrimitiveBuffer'] = true;
        this['_makeInfo'] = {
            radius: radius,
            widthSegments: widthSegments,
            heightSegments: heightSegments,
            phiStart: phiStart,
            phiLength: phiLength,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };
        this['_UUID'] = RedGL.makeUUID();
        console.log(this)
    };
    RedSphere.prototype = Object.create(RedGeometry.prototype);
    Object.freeze(RedSphere);
})();