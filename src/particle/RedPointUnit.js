"use strict";
var RedPointUnit;
(function () {
    /**DOC:
        {
            constructorYn : true,
            title :`RedPointUnit`,
            description : `
                RedPointUnit Instance 생성기
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
    RedPointUnit = function (redGL, interleaveData, interleaveDefineInfo, material) {
        if (!(this instanceof RedPointUnit)) return new RedPointUnit(redGL, interleaveData, interleaveDefineInfo, material);
        var tGL;
        var interleaveBuffer;
        tGL = redGL.gl
        RedBaseObject3D['build'].call(this, tGL)
        this['_UUID'] = RedGL['makeUUID']();
        interleaveBuffer = RedBuffer(
            redGL,
            'RedPointUnit_' + this['_UUID'],
            interleaveData,
            RedBuffer.ARRAY_BUFFER,
            interleaveDefineInfo
        )
        this['geometry'] = RedGeometry(interleaveBuffer)
        this['material'] = material
        this['drawMode'] = tGL.POINTS
        // Object.seal(this)
    }
    RedGLUtil['copyProto'](RedPointUnit, RedBaseContainer);
    RedGLUtil['copyProto'](RedPointUnit, RedBaseObject3D);
    Object.freeze(RedPointUnit);
})();