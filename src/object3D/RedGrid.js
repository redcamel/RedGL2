/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
var RedGrid;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedGrid`,
		 description : `
			 RedGrid Instance 생성기
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 size : [
				 {type:'uint'},
				 `격자 크기`
			 ],
			 divisions : [
				 {type:'uint'},
				 `격자 수`
			 ],
			 color1 : [
				 {type:'hex'},
				 `기준선 컬러`
			 ],
			 color2 : [
				 {type:'hex'},
				 `격자선 컬러`
			 ]
		 },
		 demo : '../example/object3D/RedGrid.html',
		 extends : [
		    'RedBaseContainer',
		    'RedBaseObject3D'
		 ],
		 example : `
			 var tScene;
			 tScene = RedScene Instance;
			 tScene['grid'] = RedGrid(RedGL Instance);
			 tScene['grid'].color1 = '#fff';
			 tScene['grid'].color2 = '#fff';
			 tScene['grid'].size = 100;
			 tScene['grid'].divisions = 100;
		 `,
		 return : 'RedGrid Instance'
	 }
     :DOC*/
    RedGrid = function (redGL, size, divisions, color1, color2) {
        if (!(this instanceof RedGrid)) return new RedGrid(redGL, size, divisions, color1, color2);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedGrid : RedGL Instance만 허용.', redGL);
        var tGL;
        tGL = redGL.gl;
        RedBaseObject3D['build'].call(this, tGL);
        this['_redGL'] = redGL;
        this['size'] = size || 100;
        this['divisions'] = divisions || 100;
        this['color1'] = color1 || '#cccccc';
        this['color2'] = color2 || '#666666';
        this['geometry'] = this['_makeGridGeometry']();
        this['material'] = RedGridMaterial(redGL);
        this['drawMode'] = tGL.LINES;
        this['_UUID'] = RedGL.makeUUID();
        console.log(this);
    };
    RedGrid.prototype = new RedBaseContainer();
    RedGrid.prototype['_makeGridGeometry'] = (function () {
        var center, step, halfSize;
        var i, k, tColor;
        return function () {
            if (this['color2']) {
                var interleaveData = [];
                center = this['_divisions'] / 2;
                step = this['_size'] / this['_divisions'];
                halfSize = this['_size'] / 2;
                for (i = 0, k = -halfSize; i <= this['_divisions']; i++ , k += step) {
                    tColor = i === center ? RedGLUtil.hexToRGB_ZeroToOne(this['color1']) : RedGLUtil.hexToRGB_ZeroToOne(this['color2']);
                    interleaveData.push(
                        -halfSize, 0, k, tColor[0], tColor[1], tColor[2], 1,
                        halfSize, 0, k, tColor[0], tColor[1], tColor[2], 1,
                        k, 0, -halfSize, tColor[0], tColor[1], tColor[2], 1,
                        k, 0, halfSize, tColor[0], tColor[1], tColor[2], 1
                    );
                }
                return RedGeometry(
                    RedBuffer(
                        this['_redGL'],
                        'gridInterleaveBuffer_' + this['_size'] + '_' + this['_divisions'] + '_' + this['color1'] + '_' + this['color2'],
                        RedBuffer.ARRAY_BUFFER,
                        new Float32Array(interleaveData),
                        [
                            RedInterleaveInfo('aVertexPosition', 3),
                            RedInterleaveInfo('aVertexColor', 4)
                        ]
                    )
                )
            }
        }
    })();
    RedGrid.prototype['_update'] = function () {
        this['geometry'] = this['_makeGridGeometry']()
    };
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`size`,
		 description : `size`,
		 params : {
			 size : [
				 {type:'uint'},
				 `격자 크기`
			 ]
		 },
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedGrid', 'size', 'number', {
        min: 1,
        callback: function () {
            this['_update']()
        }
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`divisions`,
		 description : `divisions`,
		 params : {
			 size : [
				 {type:'uint'},
				 `격자 수`
			 ]
		 },
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedGrid', 'divisions', 'uint', {
        min: 1,
        callback: function () {
            this['_update']()
        }
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`color1`,
		 description : `중앙 그리드 색상`,
		 params : {
			 size : [
				 {type:'hex'},
				 `기준선 컬러`
			 ]
		 },
		 return : 'hex'
	 }
     :DOC*/
    Object.defineProperty(RedGrid.prototype, 'color1', {
        get: function () {
            return this['_color1']
        },
        set: function (hex) {
            RedGLUtil.regHex(hex) || RedGLUtil.throwFunc('RedGrid : color1 hex 형식만 허용.', hex);
            this['_color1'] = hex;
            this['_update']();
            return this['_color1']
        }
    });
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`color2`,
		 description : `그리드 색상`,
		 params : {
			 size : [
				 {type:'hex'},
				 `격자 컬러`
			 ]
		 },
		 return : 'hex'
	 }
     :DOC*/
    Object.defineProperty(RedGrid.prototype, 'color2', {
        get: function () {
            return this['_color2']
        },
        set: function (hex) {
            RedGLUtil.regHex(hex) || RedGLUtil.throwFunc('RedGrid : color2 hex 형식만 허용.', hex);
            this['_color2'] = hex;
            this['_update']();
            return this['_color2']
        }
    });
    Object.defineProperty(RedGrid.prototype, 'material', {
        get: function () {
            return this['_material'];
        },
        set: function (v) {
            v instanceof RedGridMaterial || RedGLUtil.throwFunc('RedGrid : RedGridMaterial Instance만 허용.', '입력값 : ' + v);
            this['_material'] = v;
        }
    });
    Object.freeze(RedGrid);
})();