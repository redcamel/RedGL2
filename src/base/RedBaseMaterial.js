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
    RedBaseMaterial = function () {
    };
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
            var makePrepareProgram;
            var makeSystemProgram, makeOptionProgram;
            var systemKeyList = ['fog', 'sprite3D', 'skin', 'directionalShadow'];
            systemKeyList.sort();
            makeSystemProgram = function (programList, programName, redGL, vSource, fSource, systemOptionList, programOptionList) {
                if (!programList['basic'][programName]) programList['basic'][programName] = new makePrepareProgram(redGL, programList, programName, vSource, fSource);
                systemOptionList.forEach(function (key, index) {
                    systemOptionList.sort();
                    programOptionList.sort();
                    // console.log(key)
                    var tSpaceName = systemOptionList.join('_');
                    if (!programList[tSpaceName]) programList[tSpaceName] = {};
                    if (!programList[tSpaceName][programName]) programList[tSpaceName][programName] = new makePrepareProgram(redGL, programList, programName, vSource, fSource, systemOptionList);
                    // else console.log('중복', programName)
                    var newList = systemOptionList.concat();
                    newList.splice(index, 1);
                    // console.log('newList', newList)
                    makeOptionProgram(programList, tSpaceName, programName, redGL, vSource, fSource, systemOptionList, programOptionList);
                    makeSystemProgram(programList, programName, redGL, vSource, fSource, newList, programOptionList);
                })
            };
            makeOptionProgram = function (programList, spaceName, programName, redGL, vSource, fSource, systemOptionList, programOptionList) {
                programOptionList = programOptionList || [];
                // console.log('rootName', rootName, list)
                programOptionList.forEach(function (key, index) {
                    // console.log(key)
                    var tOptionName = programOptionList.join('_');
                    // console.log('tOptionName', tOptionName)
                    if (!programList['basic'][programName + '_' + tOptionName]) programList['basic'][programName + '_' + tOptionName] = new makePrepareProgram(redGL, programList, programName, vSource, fSource, null, programOptionList);
                    if (!programList[spaceName][programName + '_' + tOptionName]) programList[spaceName][programName + '_' + tOptionName] = new makePrepareProgram(redGL, programList, programName, vSource, fSource, systemOptionList, programOptionList);
                    // else console.log('중복', programName)
                    var newList = programOptionList.concat();
                    newList.splice(index, 1);
                    // console.log('newList', newList)
                    makeOptionProgram(programList, spaceName, programName, redGL, vSource, fSource, systemOptionList, newList);
                })
            };
            makePrepareProgram = function (redGL, programList, programName, vSource, fSource, systemKey, optionKey) {
                optionKey = optionKey || [];
                this['optionList'] = optionKey.concat(systemKey || []);
                this['systemKey'] = (systemKey || ['basic']).join('_');
                this['searchKey'] = programName + (optionKey.length ? '_' + optionKey.join('_') : '');
                this['key'] = programName + (this['optionList'].length ? '_' + this['optionList'].join('_') : '');
                this['_prepareProgramYn'] = true;
                this['_makePrepareProgram'] = function () {
                    return programList[this['systemKey']][this['searchKey']] = RedProgram['makeProgram'](redGL, programName, vSource, fSource, this['optionList']);
                }
            };
            return function (target, redGL, programName, vSource, fSource, programOptionList) {
                if (!programOptionList) programOptionList = [];
                if (!redGL['_datas']['RedProgramGroup']) redGL['_datas']['RedProgramGroup'] = {};
                if (redGL['_datas']['RedProgramGroup'][programName]) {
                    target['_programList'] = redGL['_datas']['RedProgramGroup'][programName];
                    console.log('캐싱프로그램그룹사용 :', programName);
                }
                else {
                    target['_programList'] = {
                        basic: {}
                    };
                    // console.log('//////////////////////////////////////////////////////////////');
                    // console.log(systemKeyList);
                    makeSystemProgram(target['_programList'], programName, redGL, vSource, fSource, systemKeyList, programOptionList);
                    // console.log(target['_programList']);
                    // console.log('//////////////////////////////////////////////////////////////');
                    // 일반 프로그램생성
                    target['_programList']['basic'][programName] = RedProgram['makeProgram'](redGL, programName, vSource, fSource);
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
                if (keyList) {
                    i = keyList.length;
                    while (i--) if (this[tKey = keyList[i]]) t0.push(tKey)
                }
                // console.log(keyList)
                if (t0.length) {
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
                if (this['program']['_prepareProgramYn']) {
                    this['program'] = this['program']['_makePrepareProgram']()
                }
                tUniformGroup = this['program']['uniformLocation'];
                i = tUniformGroup.length;
                while (i--) {
                    tUniformLocationInfo = tUniformGroup[i];
                    tWebGLUniformLocation = tUniformLocationInfo['location'];
                    if (tWebGLUniformLocation && !(tUniformLocationInfo['materialPropertyName'] in this)) {
                        RedGLUtil.throwFunc(this['program']['key'] + '- ', tUniformLocationInfo['materialPropertyName'], '속성이 정의 되지않았습니다.');
                    }
                }
            }
        })(),
        disposeAllTexture: (function () {
            var k;
            return function () {
                for (k in this) {
                    if (this[k] instanceof RedBaseTexture) this[k].dispose()
                }
            }
        })(),
        disposeTexture: function (key) {
            if (this[key] instanceof RedBaseTexture) this[key].dispose()
        }
    };
    Object.freeze(RedBaseMaterial);
})();