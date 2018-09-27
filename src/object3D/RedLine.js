"use strict";
var RedLine;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedLine`,
		 description : `
			 RedLine Instance 생성기
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 material : [
				 {type:'RedColorMaterial Instance'}
			 ]
		 },
		 extends : [
		    'RedBaseContainer',
		    'RedBaseObject3D'
		 ],
		 demo : '../example/object3D/RedLine.html',
		 example : `
		 var tScene;
		 var tLine;
		 var tX, tY, tZ;
		 var i;
		 tScene = RedScene();
		 i = 3 * 20;
		 tLine = RedLine(redGL Instance, RedColorMaterial(redGL Instance))
		 tX = tY = tZ = 0
		 while (i--) {
			 tX += Math.random() * 0.5
			 tY += Math.random() * 0.5
			 tZ += Math.random() * 0.5
			 tLine.addPoint(tX, tY, tZ)
		 }
		 tLine.upload()
		 tScene.addChild(tLine)
		 `,
		 return : 'RedLine Instance'
	 }
     :DOC*/
    RedLine = function (redGL, material) {
        if (!(this instanceof RedLine)) return new RedLine(redGL, material);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedLine : RedGL Instance만 허용.', redGL);
        material = material || RedColorMaterial(redGL);
        material instanceof RedColorMaterial || RedGLUtil.throwFunc('RedLine : RedColorMaterial Instance만 허용.');
        var tGL;
        tGL = redGL.gl;
        RedBaseObject3D['build'].call(this, tGL);
        this['_interleaveData'] = [];
        this['_indexData'] = [];
        this['_UUID'] = RedGL.makeUUID();
        this['_interleaveBuffer'] = RedBuffer(
            redGL,
            'RedLine_InterleaveBuffer_' + this['_UUID'],
            RedBuffer.ARRAY_BUFFER,
            new Float32Array(this['_interleaveData']),
            [
                RedInterleaveInfo('aVertexPosition', 3)
            ]
        );
        // this['_indexBuffer'] = RedBuffer(
        // 	redGL,
        // 	'RedLine_indexBuffer_' + this['_UUID'],
        // 	RedBuffer.ELEMENT_ARRAY_BUFFER,
        // 	new Uint16Array(this['_indexData'] )
        // );
        this['geometry'] = RedGeometry(this['_interleaveBuffer'] /*,this['_indexBuffer']*/);
        this['material'] = material;
        this['drawMode'] = tGL.LINE_STRIP;
    };
    RedLine.prototype = new RedBaseContainer();
    /**DOC:
     {
	     code : 'METHOD',
		 title :`addPoint`,
		 description : `
			 라인포인트 추가
		 `,
		 parmas : {
			 x : [{type:'Number'}],
			 y : [{type:'Number'}],
			 z : [{type:'Number'}]
		 },
		 return : 'void'
	 }
     :DOC*/
    RedLine.prototype['addPoint'] = function (x, y, z) {
        // var tIndex = this['_interleaveData'].length / 3;
        typeof x == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - x값은 숫자만 허용', '입력값 : ' + x);
        typeof y == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - y값은 숫자만 허용', '입력값 : ' + y);
        typeof z == 'number' || RedGLUtil.throwFunc('RedLine : addPoint - z값은 숫자만 허용', '입력값 : ' + z);
        this['_interleaveData'].push(x, y, z);
        // this['_indexData'].push(tIndex);
        this['_upload']();
    };
    /**DOC:
     {
	     code : 'METHOD',
		 title :`removeAllPoint`,
		 description : `
			 포인트 전체 제거
		 `,
		 parmas : {
			 x : [{type:'Number'}],
			 y : [{type:'Number'}],
			 z : [{type:'Number'}]
		 },
		 return : 'void'
	 }
     :DOC*/
    RedLine.prototype['removeAllPoint'] = function () {
        this['_interleaveData'].length = 0;
        // indexData.length = 0;
        this['_upload']();
    };
    RedLine.prototype['_upload'] = function () {
        this['_interleaveBuffer'].upload(new Float32Array(this['_interleaveData']));
        // this['_indexBuffer']['upload'](new Uint16Array(this['_indexData']));
    };
    Object.defineProperty(RedLine.prototype, 'geometry', {
        get: function () {
            return this['_geometry'];
        },
        set: function (v) {
            if (this['_geometry']) RedGLUtil.throwFunc('RedLine : geometry - 임의로 설정을 허용하지 않음', '입력값 : ' + v);
            this['_geometry'] = v;
        }
    });
    Object.defineProperty(RedLine.prototype, 'material', {
        get: function () {
            return this['_material'];
        },
        set: function (v) {
            v instanceof RedColorMaterial || RedGLUtil.throwFunc('RedLine : RedColorMaterial Instance만 허용.', '입력값 : ' + v);
            this['_material'] = v;
        }
    });
    Object.freeze(RedLine);
})();