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
                geometry : [
                    {type:'RedGeometry'},
                    `geometry`
                ],
                material : [
                    {type:'RedBaseMaterial 확장 Instance'},
                    `material`
                ]
            },
            return : 'RedProgram Instance'
        }
    :DOC*/
    RedGrid = function (redGL, size, divisions, color1, color2) {
        if (!(this instanceof RedGrid)) return new RedGrid(redGL, size, divisions, color1, color2);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedGrid : RedGL Instance만 허용됩니다.')

        var tGL;
        tGL = redGL.gl;

        var interleaveData = []

        size = size || 100;
        divisions = divisions || 100;
        color1 = [0, 0, 0, 0.5];
        color2 = [1, 1, 1, 0.5]

        var center = divisions / 2;
        var step = size / divisions;
        var halfSize = size / 2;

        for (var i = 0, j = 0, k = - halfSize; i <= divisions; i++ , k += step) {

            var color = i === center ? color1 : color2;
            interleaveData.push(- halfSize, 0, k);
            interleaveData.push(color[0], color[1], color[2], color[3])
            interleaveData.push(halfSize, 0, k);
            interleaveData.push(color[0], color[1], color[2], color[3])
            interleaveData.push(k, 0, - halfSize);
            interleaveData.push(color[0], color[1], color[2], color[3])
            interleaveData.push(k, 0, halfSize)
            interleaveData.push(color[0], color[1], color[2], color[3])

            
        }
        var interleaveBuffer
        interleaveBuffer = RedBuffer(
            redGL,
            'gridInterleaveBuffer_' + divisions,
            new Float32Array(interleaveData),
            RedBuffer.ARRAY_BUFFER, [{
                attributeKey: 'aVertexPosition',
                size: 3,
                normalize: false
            },
            {
                attributeKey: 'aVertexColor',
                size: 4,
                normalize: false
            }
            ]
        )
        this['geometry'] = RedGeometry(interleaveBuffer);
        /**DOC:
		{
            title :`material`,
            description : `material`,
            return : 'RedBaseMaterial 확장 Instance'
		}
	    :DOC*/
        this['material'] = RedGridMaterial(redGL);
        /**DOC:
		{
            title :`drawMode`,
            description : `drawMode`,
            return : 'gl 상수'
		}
	    :DOC*/
        this['drawMode'] = tGL.LINES
        /**DOC:
		{
            title :`x`,
            description : `x`,
            return : 'Number'
		}
        :DOC*/
        /**DOC:
		{
            title :`y`,
            description : `y`,
            return : 'Number'
		}
        :DOC*/
        /**DOC:
		{
            title :`z`,
            description : `z`,
            return : 'Number'
		}
	    :DOC*/
        this['x'] = this['y'] = this['z'] = 0;
        /**DOC:
		{
            title :`rotationX`,
            description : `rotationX`,
            return : 'Number'
		}
        :DOC*/
        /**DOC:
		{
            title :`rotationY`,
            description : `rotationY`,
            return : 'Number'
		}
        :DOC*/
        /**DOC:
		{
            title :`rotationZ`,
            description : `rotationZ`,
            return : 'Number'
		}
	    :DOC*/
        this['rotationX'] = this['rotationY'] = this['rotationZ'] = 0;
        /**DOC:
		{
            title :`scaleX`,
            description : `scaleX`,
            return : 'Number'
		}
        :DOC*/
        /**DOC:
		{
            title :`scaleY`,
            description : `scaleY`,
            return : 'Number'
		}
        :DOC*/
        /**DOC:
		{
            title :`scaleZ`,
            description : `scaleZ`,
            return : 'Number'
		}
	    :DOC*/
        this['scaleX'] = this['scaleY'] = this['scaleZ'] = 1;
        this['matrix'] = mat4.create();
        this['normalMatrix'] = mat4.create();
        this['children'] = []

        // Object.seal(this)
    }
    RedGLUtil['extendsProto'](RedGrid, RedBaseContainer);
    RedGLUtil['extendsProto'](RedGrid, RedBaseObject3D);
    Object.freeze(RedGrid);
})();