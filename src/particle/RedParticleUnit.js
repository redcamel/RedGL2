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
		this['initLifeTime'] = this['lifeTime']
		this['_gravitySum'] = 0
		// this['movementX'] = (Math.random() - 0.5) * 0.05
		// this['movementY'] = (Math.random() - 0.5) * 0.05
		// this['movementZ'] = (Math.random() - 0.5) * 0.05
	}
	RedParticleUnit.prototype.addRule = function (key, option) {
		this[key] = {
			startCenter: null,
			start: option['start'].length == 2 ? Math.random() * (option['start'][1] - option['start'][0]) + option['start'][0] : option['start'],
			end: option['end'].length == 2 ? Math.random() * (option['end'][1] - option['end'][0]) + option['end'][0] : option['end'],
			ease: option['ease']
		}
		this[key]['gap'] = this[key]['end'] - this[key]['start']
		// console.log(key, this[key])
	}
	Object.freeze(RedParticleUnit);
})();