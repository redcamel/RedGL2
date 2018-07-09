"use strict";
var RedBaseMaterial;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBaseMaterial`,
		 description : `
			 RedBaseMaterial 기저층

		 `,
		 return : 'void'
	 }
	 :DOC*/
	RedBaseMaterial = function () {}
	RedBaseMaterial.prototype = {
		makeProgramList: (function () {
			var makeList;
			makeList = function (target, baseKey, redGL, programName, vSource, fSource, programOptionList) {
				programOptionList = programOptionList.concat();
				programOptionList.sort()
				var i, tKey;
				i = programOptionList.length;
				while ( i-- ) {
					tKey = programOptionList[i];
					tKey = baseKey == '' ? tKey : (baseKey + '_' + tKey)
					// 일반 프로그램생성
					if ( !target['_programList']['basic'][programName + '_' + tKey] ) {
						target['_programList']['basic'][programName + '_' + tKey] = RedProgram['makeProgram'](redGL, programName, vSource, fSource, tKey.split('_'))
						target['_programList']['basic'][programName + '_' + tKey]['subProgram_fog'] = RedProgram['makeProgram'](redGL, programName, vSource, fSource, (tKey + '_fog').split('_'))
					}
					makeList(target, tKey, redGL, programName, vSource, fSource, (programOptionList.concat()).slice(i + 1))
				}
				// console.log(programOptionList)
			}
			return function (target, redGL, programName, vSource, fSource, programOptionList) {
				if ( !programOptionList ) programOptionList = []
				target['_programList'] = {
					basic: {}
				}
				makeList(target, '', redGL, programName, vSource, fSource, programOptionList)
				// console.log(target['_programList'])
				// 일반 프로그램생성
				target['_programList']['basic'][programName] = RedProgram['makeProgram'](redGL, programName, vSource, fSource)
				// 포그 프로그램생성
				target['_programList']['basic'][programName]['subProgram_fog'] = RedProgram['makeProgram'](redGL, programName, vSource, fSource, ['fog'])
				// sprite3D 프로그램생성
				target['program'] = target['_programList']['basic'][programName]
			}
		})(),
		searchProgram: (function () {
			var i;
			var tKey;
			var t0;
			return function (PROGRAM_NAME, keyList) {
				t0 = [];
				if ( keyList ) {
					i = keyList.length;
					while ( i-- ) if ( this[tKey = keyList[i]] ) t0.push(tKey)
				}
				// console.log(keyList)
				if ( t0.length ) t0.sort(), t0 = PROGRAM_NAME + '_' + t0.join('_')
				else t0 = PROGRAM_NAME
				this['program'] = this['_programList']['basic'][t0];
				// console.log('현재프로그램', this['program'])
			}
		})(),
		/**DOC:
		 {
			 code : 'METHOD',
			 title :`checkUniformAndProperty`,
			 description : `
				 소유하고 있는 Program에서 사용하고 있지만
				 재질이 해당 유니폼에 대응하는 프로퍼티를 소유하고 않는경우를 검출.
			 `,
			 return : 'void'
		 }
		 :DOC*/
		checkUniformAndProperty: function () {
			var i2
			var tUniformGroup, tUniformLocationInfo, tWebGLUniformLocation;
			tUniformGroup = this['program']['uniformLocation'];
			i2 = tUniformGroup.length
			while ( i2-- ) {
				tUniformLocationInfo = tUniformGroup[i2];
				tWebGLUniformLocation = tUniformLocationInfo['location'];
				if ( tWebGLUniformLocation && !(tUniformLocationInfo['materialPropertyName'] in this) ) {
					RedGLUtil.throwFunc(this['program']['key'] + '- ', tUniformLocationInfo['materialPropertyName'], '속성이 정의 되지않았습니다.')
				}
			}
		}
	}
	Object.freeze(RedBaseMaterial)
})();