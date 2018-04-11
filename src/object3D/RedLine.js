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
                    {type:'RedGL Instance'}
                ],
                material : [
                    {type:'RedBaseMaterial 확장 Instance'},
                    `material`
                ]
            },
            return : 'RedLine Instance'
        }
    :DOC*/
    RedLine = function (redGL, material) {
        if (!(this instanceof RedLine)) return new RedLine(redGL, material);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedLine : RedGL Instance만 허용됩니다.')
        if (!(material instanceof RedColorMaterial)) RedGLUtil.throwFunc('RedLine : RedColorMaterial Instance만 허용됩니다.')
        var tGL;
        var interleaveData, indexData
        var interleaveBuffer, indexBuffer
        interleaveData = [];
        indexData = [];
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

        /**DOC:
		{
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
        this['addPoint'] = function (x, y, z) {
            var t = interleaveData.length / 3
            interleaveData.push(x, y, z)
            indexData.push(t)
        }
        /**DOC:
		{
            title :`addPoint`,
            description : `
                addPoint로 포인트 추가후 실제 버퍼 반영할떄 사용
            `,
			return : 'void'
		}
	    :DOC*/
        this['upload'] = function () {
            interleaveBuffer['upload'](new Float32Array(interleaveData));
            indexBuffer['upload'](new Uint16Array(indexData));
            interleaveBuffer.parseInterleaveDefineInfo();
            indexBuffer.parseInterleaveDefineInfo();
        }

        tGL = redGL.gl;
        RedBaseObject3D['build'].call(this, tGL)
        /**DOC:
		{
            title :`geometry`,
            description : `geometry`,
			return : 'RedGeometry'
		}
	    :DOC*/
        this['geometry'] = RedGeometry(interleaveBuffer, indexBuffer);
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
            description : `
                기본값 : gl.LINE_STRIP
            `,
            return : 'gl 상수'
		}
	    :DOC*/
        this['drawMode'] = tGL.LINE_STRIP

        // Object.seal(RedLine);
        // console.log(this);
    }
    /**DOC:
        {
            extendDoc : 'RedBaseContainer'
        }
    :DOC*/
    RedGLUtil['extendsProto'](RedLine, RedBaseContainer);
    /**DOC:
        {
            extendDoc : 'RedBaseObject3D'
        }
    :DOC*/
    RedGLUtil['extendsProto'](RedLine, RedBaseObject3D);
    Object.freeze(RedLine);
})();