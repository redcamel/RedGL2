"use strict";
var RedParticleUnit;
//////////////////////////////////////////////////////////
// 연구중
//////////////////////////////////////////////////////////
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedParticleUnit`,
		 description : `
			 RedParticleUnit Instance 생성기
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedProgram Instance'
	 }
	 :DOC*/
	RedParticleUnit = function (lifeTime) {
		this['startTime'] = null;
		this['age'] = 0;
		this['lifeTime'] = lifeTime.length == 2 ? Math.random() * (lifeTime[1] - lifeTime[0]) + lifeTime[0] : lifeTime[0]
		this['scaleUp'] = 0.5
		this['movementX'] = (Math.random() - 0.5) * 0.1
		this['movementY'] = (Math.random() - 0.5) * 0.1
		this['movementZ'] = (Math.random() - 0.5) * 0.1
		this['gravityVelocity'] = 0
	}
	Object.freeze(RedParticleUnit);
})();