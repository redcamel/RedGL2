
/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
var RedBaseMaterial;
(function () {
    var prepareNum = 0;
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedBaseMaterial`,
		 description : `
			 RedBaseMaterial 기저층.
			 재질은 이 객체의 확장으로 이루어진다.
		 `,
		 return : 'RedBaseMaterial instance'
	 }
     :DOC*/
    RedBaseMaterial = function () {
    };
    RedBaseMaterial.prototype = {
        makeProgramList: (function () {
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
                    // var newList = systemOptionList.concat();
                    // newList.splice(index, 1);
                    var newList = systemOptionList.concat();
                    newList.splice(index, 1);
                    // console.log('newList', newList)
                    makeOptionProgram(programList, tSpaceName, programName, redGL, vSource, fSource, systemOptionList, programOptionList);
                    makeSystemProgram(programList, programName, redGL, vSource, fSource, newList, programOptionList);
                })
            };
            makeOptionProgram = function (programList, spaceName, programName, redGL, vSource, fSource, systemOptionList, programOptionList) {
                programOptionList = programOptionList || [];

                function k_combinations(set, k) {
                    var i, j, combs, head, tailcombs;
                    // There is no way to take e.g. sets of 5 elements from
                    // a set of 4.
                    if (k > set.length || k <= 0) {
                        return [];
                    }
                    // K-sized set has only one K-sized subset.
                    if (k === set.length) {
                        return [set];
                    }
                    // There is N 1-sized subsets in a N-sized set.
                    if (k === 1) {
                        combs = [];
                        for (i = 0; i < set.length; i++) {
                            combs.push([set[i]]);
                        }
                        return combs;
                    }
                    combs = [];
                    for (i = 0; i < set.length - k + 1; i++) {
                        // head is a list that includes only our current element.
                        head = set.slice(i, i + 1);
                        // We take smaller combinations from the subsequent elements
                        tailcombs = k_combinations(set.slice(i + 1), k - 1);
                        // For each (k-1)-combination we join it with the current
                        // and store it to the set of k-combinations.
                        for (j = 0; j < tailcombs.length; j++) {
                            combs.push(head.concat(tailcombs[j]));
                        }
                    }
                    return combs;
                }

                function combinations(set) {
                    var k, i, combs, k_combs;
                    combs = [];
                    for (k = 1; k <= set.length; k++) {
                        k_combs = k_combinations(set, k);
                        for (i = 0; i < k_combs.length; i++) {
                            combs.push(k_combs[i]);
                        }
                    }
                    return combs;
                }

                // console.log('combinations(programOptionList)',combinations(programOptionList))
                var tList = combinations(programOptionList);

                tList.forEach(function (v) {
                    var tOptionName = v.join('_');
                    if (!programList['basic'][programName + '_' + tOptionName]) programList['basic'][programName + '_' + tOptionName] = new makePrepareProgram(redGL, programList, programName, vSource, fSource, null, v);
                    if (!programList[spaceName][programName + '_' + tOptionName]) programList[spaceName][programName + '_' + tOptionName] = new makePrepareProgram(redGL, programList, programName, vSource, fSource, systemOptionList, v);

                })

            };
            makePrepareProgram = function (redGL, programList, programName, vSource, fSource, systemKey, optionKey) {
                prepareNum++;
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
                console.group('makeProgramList - ' + programName);
                console.time('makeProgramList - ' + programName);
                if (!programOptionList) programOptionList = [];
                if (!redGL['_datas']['RedProgramGroup']) redGL['_datas']['RedProgramGroup'] = {};
                if (redGL['_datas']['RedProgramGroup'][programName]) {
                    target['_programList'] = redGL['_datas']['RedProgramGroup'][programName];
                    console.log('캐싱프로그램그룹사용 :', programName);
                } else {
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
                console.log('prepareNum', prepareNum);
                console.timeEnd('makeProgramList - ' + programName);
                console.groupEnd();
            }
        })(),
        /**DOC:
         {
			 code : 'METHOD',
			 title :`_searchProgram`,
			 description : `
				 재질의 상태를 추적하여 적합한 프로그램 찾고 재질이 가진다.
			 `,
			 return : 'void'
		 }
         :DOC*/
        _searchProgram: (function () {
            var i;
            var tKey;
            var t0;
            return function (PROGRAM_NAME, keyList) {
                console.time('_searchProgram - ' + PROGRAM_NAME);
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
                console.timeEnd('_searchProgram - ' + PROGRAM_NAME);
                // console.log('현재프로그램', this['program'])
            }
        })(),
        /**DOC:
         {
			 code : 'METHOD',
			 title :`checkUniformAndProperty`,
			 description : `
				 재질의 Program에서 사용하고 있는 유니폼키가
				 재질의 속성으로 매칭되지 않는 경우 검출.
				 ex) Program에서 <b>uTestUniform</b>을 사용 할 경우 <b>testUniform</b>이 정의 되어 있어야함.
			 `,
			 return : 'void'
		 }
         :DOC*/
        checkUniformAndProperty: (function () {
            var i;
            var tUniformGroup, tUniformLocationInfo, tWebGLUniformLocation;
            return function () {
                console.time('checkUniformAndProperty');
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
                console.timeEnd('checkUniformAndProperty');
            }
        })(),
        /**DOC:
         {
			 code : 'METHOD',
			 title :`disposeAllTexture`,
			 description : `
				 재질내의 모든 RedBaseTexture 확장객체를 dispose 함
			 `,
			 return : 'void'
		 }
         :DOC*/
        disposeAllTexture: (function () {
            var k;
            return function () {
                for (k in this) {
                    if (this[k] instanceof RedBaseTexture) this[k].dispose()
                }
            }
        })(),
        /**DOC:
         {
			 code : 'METHOD',
			 title :`disposeTexture`,
			 description : `
				 키에 해당하는 RedBaseTexture 확장객체를 dispose 함
			 `,
			 params : {
                 key : [
                     {type:'String'}
                 ]
             },
			 return : 'void'
		 }
         :DOC*/
        disposeTexture: function (key) {
            if (this[key] instanceof RedBaseTexture) this[key].dispose()
        }
    };
    Object.freeze(RedBaseMaterial);
})();