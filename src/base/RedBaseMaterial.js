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
		 return : 'RedBaseMaterial instance'
	 }
	 :DOC*/
	RedBaseMaterial = function () {};
	RedBaseMaterial.prototype = {
		/**DOC:
		 {
			 code : 'METHOD',
			 title :`makeProgramList`,
			 description : `
				 다중 프로그램 리스트 생성기.
				 TODO:// 좀더 구체적인 설명 적어야함
			 `,
			 params : {
			    target : [
			        { type : 'RedBaseMaterial Instance' }
			    ],
			    redGL : [
			        { type : 'RedGL Instance' }
			    ],
			    programName : [
			        { type : 'String' },
			        '기본 프로그램이름'
			    ],
			    vSource : [
			        { type : 'String' },
			        '버텍스 쉐이더 소스'
			    ],
			    fSource : [
			        { type : 'String' },
			        '프레그먼트 쉐이더'
			    ],
			    programOptionList : [
			        { type : 'Array' },
			        '옵션키 리스트'
			    ]
			 },
			 return : 'void'
		 }
		 :DOC*/
		makeProgramList: (function () {
			//TODO: 이걸좀 정리해야하는데..
			var makeList;
			var makePrepareProgram;
			makePrepareProgram = function (redGL, programName, vSource, fSource, targetKey) {
				this['_prepareProgramYn'] = true;
				this['_makePrepareProgram'] = function () {
					return RedProgram['makeProgram'](redGL, programName, vSource, fSource, targetKey)
				}
			}
			makeList = function (target, baseKey, redGL, programName, vSource, fSource, programOptionList) {
				programOptionList = programOptionList.concat();
				programOptionList.sort();
				var i, tKey;
				i = programOptionList.length;
				while ( i-- ) {
					tKey = programOptionList[i];
					tKey = baseKey == '' ? tKey : (baseKey + '_' + tKey);
					// 일반 프로그램생성
					if ( !target['_programList']['basic'][programName + '_' + tKey] ) {
						//TODO: 이걸 자동화하는데..... 렌더러에서 가장 쉽게 찾을수 있는 구조를 찾아야함.
						target['_programList']['basic'][programName + '_' + tKey] = RedProgram['makeProgram'](redGL, programName, vSource, fSource, tKey.split('_'));
						target['_programList']['fog'][programName + '_' + tKey] = new makePrepareProgram(redGL, programName, vSource, fSource, (tKey + '_fog').split('_'));
						target['_programList']['sprite3D'][programName + '_' + tKey] = new makePrepareProgram(redGL, programName, vSource, fSource, (tKey + '_sprite3D').split('_'));
						target['_programList']['fog_sprite3D'][programName + '_' + tKey] = new makePrepareProgram(redGL, programName, vSource, fSource, (tKey + '_fog_sprite3D').split('_'));
						target['_programList']['directionalShadow'][programName + '_' + tKey] = new makePrepareProgram(redGL, programName, vSource, fSource, (tKey + '_directionalShadow').split('_'));
						target['_programList']['directionalShadow_fog'][programName + '_' + tKey] = new makePrepareProgram(redGL, programName, vSource, fSource, (tKey + '_directionalShadow_fog').split('_'));
						target['_programList']['directionalShadow_sprite3D'][programName + '_' + tKey] = new makePrepareProgram(redGL, programName, vSource, fSource, (tKey + '_directionalShadow_sprite3D').split('_'));
						target['_programList']['directionalShadow_fog_sprite3D'][programName + '_' + tKey] = new makePrepareProgram(redGL, programName, vSource, fSource, (tKey + '_directionalShadow_fog_sprite3D').split('_'));
						makeList(target, tKey, redGL, programName, vSource, fSource, (programOptionList.concat()).slice(i + 1));
					}
				}
				// console.log(programOptionList)
			};
			return function (target, redGL, programName, vSource, fSource, programOptionList) {
				if ( !programOptionList ) programOptionList = [];
				if ( !redGL['_datas']['RedProgramGroup'] ) redGL['_datas']['RedProgramGroup'] = {};
				if ( redGL['_datas']['RedProgramGroup'][programName] ) {
					target['_programList'] = redGL['_datas']['RedProgramGroup'][programName];
					console.log('캐싱프로그램그룹사용 :', programName);
				}
				else {
					target['_programList'] = {
						basic: {},
						fog: {},
						sprite3D: {},
						fog_sprite3D: {},
						directionalShadow: {},
						directionalShadow_fog: {},
						directionalShadow_sprite3D: {},
						directionalShadow_fog_sprite3D: {}
					};
					makeList(target, '', redGL, programName, vSource, fSource, programOptionList);
					// console.log(target['_programList'])
					// 일반 프로그램생성
					target['_programList']['basic'][programName] = RedProgram['makeProgram'](redGL, programName, vSource, fSource);
					target['_programList']['fog'][programName] = new makePrepareProgram(redGL, programName, vSource, fSource, ['fog']);
					target['_programList']['sprite3D'][programName] = new makePrepareProgram(redGL, programName, vSource, fSource, ['sprite3D']);
					target['_programList']['fog_sprite3D'][programName] = new makePrepareProgram(redGL, programName, vSource, fSource, ['fog', 'sprite3D']);
					target['_programList']['directionalShadow'][programName] = new makePrepareProgram(redGL, programName, vSource, fSource, ['directionalShadow']);
					target['_programList']['directionalShadow_fog'][programName] = new makePrepareProgram(redGL, programName, vSource, fSource, ['fog', 'directionalShadow']);
					target['_programList']['directionalShadow_sprite3D'][programName] = new makePrepareProgram(redGL, programName, vSource, fSource, ['sprite3D', 'directionalShadow']);
					target['_programList']['directionalShadow_fog_sprite3D'][programName] = new makePrepareProgram(redGL, programName, vSource, fSource, ['fog', 'directionalShadow', 'sprite3D']);
					// 그룹데이터 캐싱
					redGL['_datas']['RedProgramGroup'][programName] = target['_programList'];
				}
				target['program'] = target['_programList']['basic'][programName];
			}
		})(),
		_searchProgram: (function () {
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
				if ( t0.length ) {
					t0.sort();
					t0 = PROGRAM_NAME + '_' + t0.join('_');
				} else t0 = PROGRAM_NAME;
				this['program'] = this['_programList']['basic'][t0];
				// console.log('현재프로그램', this['program'])
			}
		})(),
		/**DOC:
		 {
			 code : 'METHOD',
			 title :`checkUniformAndProperty`,
			 description : `
				 재질의 Program에서 사용하고 있는 유니폼키가
				 속성으로 매칭되지 않는 경우 검출.
				 ex) 프로그램에서 <b>uTestUniform</b> 이 사용되어진다면 <b>testUniform</b>이 정의 되어있어야함.
			 `,
			 return : 'void'
		 }
		 :DOC*/
		checkUniformAndProperty: (function () {
			var i;
			var tUniformGroup, tUniformLocationInfo, tWebGLUniformLocation;
			return function () {
				tUniformGroup = this['program']['uniformLocation'];
				i = tUniformGroup.length;
				while ( i-- ) {
					tUniformLocationInfo = tUniformGroup[i];
					tWebGLUniformLocation = tUniformLocationInfo['location'];
					if ( tWebGLUniformLocation && !(tUniformLocationInfo['materialPropertyName'] in this) ) {
						RedGLUtil.throwFunc(this['program']['key'] + '- ', tUniformLocationInfo['materialPropertyName'], '속성이 정의 되지않았습니다.');
					}
				}
			}
		})()
	};
	Object.freeze(RedBaseMaterial);
})();