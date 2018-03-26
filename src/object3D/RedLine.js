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
    RedLine = function (redGL, material) {
        if (!(this instanceof RedLine)) return new RedLine(redGL, material);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedLine : RedGL Instance만 허용됩니다.')
        if (!(material instanceof RedBaseMaterial)) RedGLUtil.throwFunc('RedLine : RedBaseMaterial 확장 Instance만 허용됩니다.')
        var tGL;
        var interleaveData, indexData
        var geometry;
        interleaveData = [];
        indexData = []
        var interleaveBuffer, indexBuffer
        this['_UUID'] = RedGL['makeUUID']();
        interleaveBuffer = RedBuffer(
            redGL,
            'RedLine_InterleaveBuffer_' + this['_UUID'],
            new Float32Array(interleaveData),
            RedBuffer.ARRAY_BUFFER, [
                {
                    attributeKey: 'aVertexPosition',
                    size: 3,
                    normalize: false
                }
            ]
        )
        indexBuffer = RedBuffer(
            redGL,
            'RedLine_indexBuffer_' + this['_UUID'],
            new Uint16Array(indexData),
            RedBuffer.ELEMENT_ARRAY_BUFFER
        )
        geometry = RedGeometry(interleaveBuffer, indexBuffer)
        tGL = redGL.gl;
        this['addPoint'] = function(x,y,z){
            var t = interleaveData.length/3
            interleaveData.push(x,y,z)
            indexData.push(t)
        }
        this['update'] = function(){
            interleaveBuffer['updateData'](new Float32Array(interleaveData))
            indexBuffer['updateData'](new Uint16Array(indexData))
            interleaveBuffer.parseInterleaveDefineInfo()
            indexBuffer.parseInterleaveDefineInfo()
            // console.log(interleaveData,indexData)
        }
        this['interleaveData'] = interleaveData
        /**DOC:
		{
            title :`geometry`,
            description : `geometry`,
			return : 'RedGeometry'
		}
	    :DOC*/
        this['geometry'] = geometry;
        /**DOC:
		{
            title :`material`,
            description : `material`,
            return : 'RedBaseMaterial 확장 Instance'
		}
	    :DOC*/
        this['material'] = material;
        /**DOC:
		{
            title :`drawMode`,
            description : `drawMode`,
            return : 'gl 상수'
		}
	    :DOC*/
        this['drawMode'] = tGL.LINE_STRIP
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
        Object.seal(RedLine);
        console.log(this)
    }
    RedLine.prototype = RedMesh.prototype;
    Object.freeze(RedLine);
})();