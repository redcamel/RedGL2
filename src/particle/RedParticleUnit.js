"use strict";
var RedParticleUnit;
(function () {
    /**DOC:
        {
            constructorYn : true,
            title :`RedParticleUnit`,
            description : `
                RedParticleUnit Instance 생성기
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
    RedParticleUnit = function (redGL, interleaveData, interleaveDefineInfo, material) {
        if (!(this instanceof RedParticleUnit)) return new RedParticleUnit(redGL, interleaveData, interleaveDefineInfo, material);
        var tGL;
        tGL = redGL.gl
        RedBaseObject3D['build'].call(this, tGL)
        this['_UUID'] = RedGL['makeUUID']();
        var interleaveBuffer
        interleaveBuffer = RedBuffer(
            redGL,
            'RedParticleUnit_' + this['_UUID'],
            interleaveData,
            RedBuffer.ARRAY_BUFFER,
            interleaveDefineInfo
        )
        this['geometry'] = RedGeometry(interleaveBuffer)
        this['material'] = material
        this['drawMode'] = tGL.POINTS
        // Object.seal(this)
    }
    RedGLUtil['extendsProto'](RedParticleUnit, RedBaseContainer);
    RedGLUtil['extendsProto'](RedParticleUnit, RedBaseObject3D);
    Object.freeze(RedParticleUnit);
})();