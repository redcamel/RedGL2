"use strict";
var RedParticleEmitter;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedParticleEmitter`,
		 description : `
			 RedParticleEmitter Instance 생성기
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedProgram Instance'
	 }
	 :DOC*/
	RedParticleEmitter = function (redGL) {
		RedBaseObject3D['build'].call(this, redGL.gl)
		this['autoUpdateMatrix'] = false
		this['list'] = []
		this['interleaveData'] = [];
		this['info'] = {
			max: 500,
			emitCount: 10
		}
		this['geometry'] = RedGeometry(RedBuffer(
			redGL,
			'RedParticleEmitter_Buffer' + RedGL.makeUUID(),
			RedBuffer.ARRAY_BUFFER,
			new Float32Array(this['interleaveData']),
			[
				RedInterleaveInfo('aVertexPosition', 3),
				RedInterleaveInfo('aPointSize', 1),
				RedInterleaveInfo('aVertexColor', 4)
			]
		))
		this['material'] = new RedParticleBitmapMaterial(redGL, RedBitmapTexture(redGL, '../asset/particle.png'))
		this['useDepthTest'] = false
		this['drawMode'] = redGL.gl.POINTS
		this['blendSrc'] = redGL.gl.SRC_ALPHA
		this['blendDst'] = redGL.gl.ONE
		this['_UUID'] = RedGL['makeUUID']();
	}
	RedParticleEmitter.prototype = new RedBaseContainer();
	RedParticleEmitter.prototype['update'] = (function () {
		var i, i2, tParticle
		var lifeRatio;
		var tIndex;
		return function (time) {
			i = this['list']['length']
			// 맥스보다 갯수가 적으면 추가함
			if ( i < this['info']['max'] ) {
				i2 = this['info']['emitCount']
				if ( i2 + i > this['info']['max'] ) i2 = this['info']['max'] - i
				while ( i2-- ) {
					this['list'][i + i2] = new RedParticleUnit()
					this['interleaveData'].push(this.x, this.y, this.z)
					this['interleaveData'].push(0)
					this['interleaveData'].push(Math.random(), Math.random(), Math.random(), 1)
				}
			}
			//////////////////////////////////
			i = this['list']['length']
			while ( i-- ) {
				tParticle = this['list'][i]
				if ( !tParticle['startTime'] ) {
					tParticle['startTime'] = time
					tParticle['age'] = 0
				}
				tParticle['age'] = time - tParticle['startTime']
				lifeRatio = tParticle['age'] / tParticle['lifeTime']
				tIndex = i * 8
				if ( lifeRatio < 1 ) {
					this['interleaveData'][tIndex] += tParticle.movementX
					this['interleaveData'][tIndex + 1] += tParticle.movementY
					this['interleaveData'][tIndex + 2] += tParticle.movementZ
					this['interleaveData'][tIndex + 3] += tParticle.scaleUp
					this['interleaveData'][tIndex + 7] = 1 - lifeRatio
				} else {
					this['interleaveData'][tIndex] = this.x
					this['interleaveData'][tIndex + 1] = this.y
					this['interleaveData'][tIndex + 2] = this.z
					this['interleaveData'][tIndex + 3] = 0
					this['interleaveData'][tIndex + 7] = 0
					tParticle['startTime'] = null
					tParticle['age'] = -1
				}
			}
			this['geometry']['interleaveBuffer'].upload(new Float32Array(this['interleaveData']))
		}
	})()
	Object.freeze(RedParticleEmitter);
})();