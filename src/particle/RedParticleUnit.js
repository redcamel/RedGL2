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
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedProgram Instance'
	 }
	 :DOC*/
	RedParticleUnit = function (life, age) {
		this['startTime'] = null;
		this['age'] = age || 0;
		this['lifeTime'] = 1000;
		this['dead'] = false;
		this['scaleUp'] = 0.3
		this['movementX'] = (Math.random()-0.5) * 0.05
		this['movementY'] = (Math.random()-0.5) * 0.05
		this['movementZ'] = (Math.random()-0.5) * 0.05
	}
	Object.freeze(RedParticleUnit);
})();