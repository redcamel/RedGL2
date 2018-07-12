"use strict";
//////////////////////////////////////////////////////////
// 연구중
//////////////////////////////////////////////////////////
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
	RedParticleEmitter = function (redGL, defineObject, material) {
		if ( !(this instanceof RedParticleEmitter) ) return new RedPointUnit(redGL, material);
		RedBaseObject3D['build'].call(this, redGL.gl)
		this['autoUpdateMatrix'] = false
		this['list'] = []
		this['_interleaveData'] = [];
		this['info'] = defineObject
		this['geometry'] = RedGeometry(RedBuffer(
			redGL,
			'RedParticleEmitter_Buffer' + RedGL.makeUUID(),
			RedBuffer.ARRAY_BUFFER,
			new Float32Array(this['_interleaveData']),
			[
				RedInterleaveInfo('aVertexPosition', 3),
				RedInterleaveInfo('aPointSize', 1),
				RedInterleaveInfo('aVertexColor', 4)
			],
			redGL.gl.DYNAMIC_DRAW
		))
		this['material'] = material
		this['drawMode'] = redGL.gl.POINTS
		this['blendSrc'] = redGL.gl.SRC_ALPHA
		this['blendDst'] = redGL.gl.ONE
		this['useDepthMask'] = false
		this['_UUID'] = RedGL['makeUUID']();
	}
	RedParticleEmitter.prototype = new RedBaseContainer();
	RedParticleEmitter.prototype['update'] = (function () {
		var i, i2, tParticle
		var lifeRatio;
		var tIndex;
		var tInfo, tInfoParticle, newParticle;
		return function (time) {
			i = this['list']['length']
			// 맥스보다 갯수가 적으면 추가함
			tInfo = this['info'];
			tInfoParticle = tInfo['particle'];
			if ( i < tInfo['max'] ) {
				i2 = tInfo['emitCount']
				if ( i2 + i > tInfo['max'] ) i2 = tInfo['max'] - i
				while ( i2-- ) {
					newParticle = this['list'][i + i2] = new RedParticleUnit(tInfo['lifeTime'])
					this['_interleaveData'].push(this.x, this.y, this.z)
					this['_interleaveData'].push(0)
					this['_interleaveData'].push(Math.random(), Math.random(), Math.random(), 1)
					// 룰추가
					if ( tInfo['particle'] ) {
						if ( tInfoParticle['movementX'] ) newParticle.addRule('movementX', tInfoParticle['movementX'])
						if ( tInfoParticle['movementY'] ) newParticle.addRule('movementY', tInfoParticle['movementY'])
						if ( tInfoParticle['movementZ'] ) newParticle.addRule('movementZ', tInfoParticle['movementZ'])
						if ( tInfoParticle['scale'] ) newParticle.addRule('scale', tInfoParticle['scale'])
						if ( tInfoParticle['alpha'] ) newParticle.addRule('alpha', tInfoParticle['alpha'])
					}
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
					// [
					// 	option['start'], // 시작값
					// 	option['end'], // 종료값
					// 	option['start'] // 현재값
					// ]
					//////////////////////////////////
					//////////////////////////////////
					var n = lifeRatio;
					////////////////////////
					// QuintIn
					// n = ((n = n * 2) < 1) ? n * n * 0.5 : 0.5 * ((2 - (n -= 1)) * n + 1)
					// QuadOut
					n = ((2 - n) * n)
					// QuadInOut
					// n = ((n = n * 2) < 1) ? n * n * 0.5 : 0.5 * ((2 - (n -= 1)) * n + 1)
					// var POW = Math.pow
					// n = ((n = n * 2) < 1) ? (n == 0.0 ? 0.0 : 0.5 * POW(2, 10 * (n - 1))) : (n == 2.0 ? 1.0 : -0.5 * POW(2, -10 * (n - 1)) + 1)
					if ( !tParticle['startCenter'] ) tParticle['startCenter'] = [this.x, this.y, this.z]
					if ( tParticle['movementX'] ) this['_interleaveData'][tIndex + 0] = tParticle['startCenter'][0] + (tParticle['movementX']['start'] + (tParticle['movementX']['gap']) * n)
					if ( tParticle['movementY'] ) this['_interleaveData'][tIndex + 1] = tParticle['startCenter'][1] + (tParticle['movementY']['start'] + (tParticle['movementY']['gap']) * n)
					if ( tParticle['movementZ'] ) this['_interleaveData'][tIndex + 2] = tParticle['startCenter'][2] + (tParticle['movementZ']['start'] + (tParticle['movementZ']['gap']) * n)
					if ( tParticle['scale'] ) {
						this['_interleaveData'][tIndex + 3] = tParticle['scale']['start'] + (tParticle['scale']['gap'] ) * n
					}
					if ( tParticle['alpha'] ) {
						this['_interleaveData'][tIndex + 7] = tParticle['alpha']['start'] + (tParticle['alpha']['gap'] ) * n
					}
				} else {
					this['_interleaveData'][tIndex + 0] = tParticle['startCenter'][0] = this.x
					this['_interleaveData'][tIndex + 1] = tParticle['startCenter'][1] = this.y
					this['_interleaveData'][tIndex + 2] = tParticle['startCenter'][2] = this.z
					this['_interleaveData'][tIndex + 3] = tParticle['scale']['start']
					this['_interleaveData'][tIndex + 7] = tParticle['alpha']['start']
					tParticle['startTime'] = null
					tParticle['age'] = -1
				}
			}
			this['geometry']['interleaveBuffer'].upload(new Float32Array(this['_interleaveData']))
		}
	})()
	Object.freeze(RedParticleEmitter);
})();