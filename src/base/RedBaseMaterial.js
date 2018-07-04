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
	RedBaseMaterial = function () {
		this['_atlasMode'] = false
	}
	RedBaseMaterial.prototype = {
		makeProgramList: (function () {
			var makeList;
			makeList = function (target, basekey, redgl, programName, vSource, fSource, programOptionList) {
				programOptionList = programOptionList.concat();
				programOptionList.sort()
				programOptionList.forEach(function (k, index) {
					k = basekey == '' ? k : (basekey + '_' + k)
					target['_programList'].push(RedProgram['makeProgram'](redgl, programName, vSource, fSource, k.split('_')))
					makeList(target, k, redgl, programName, vSource, fSource, (programOptionList.concat()).slice(index + 1))
				})
				// console.log(programOptionList)
			}
			return function (target, redGL, programName, vSource, fSource, programOptionList) {
				makeList(target, '', redGL, programName, vSource, fSource, programOptionList)
				target['_programList'].push(RedProgram['makeProgram'](redGL, programName, vSource, fSource))
				target.searchProgram(programName, programOptionList)
			}
		})(),
		searchProgram: (function () {
			return function (PROGRAM_NAME, keyList) {
				var t0, self
				var atlasMode = false
				t0 = []
				self = this;
				keyList.forEach(function (key) {
					if ( self[key] ) {
						t0.push(key)
						if ( self[key] instanceof RedAtlasTexture ) atlasMode = true
					}
				})
				// console.log(keyList)
				if(atlasMode) t0.push('atlasMode')
				if ( t0.length ) t0.sort(), t0 = PROGRAM_NAME + '_' + t0.join('_')
				else t0 = PROGRAM_NAME
				// console.log('찾아야할프로그램', t0)
				// console.log(this)
				this['program'] = this['_programList'].filter(function (v) {
					if ( v['key'] == t0 ) return true
				})[0]
				console.log('현재프로그램', this['program'])
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