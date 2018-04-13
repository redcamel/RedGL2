"use strict";
var RedShader;
(function () {
    var makeWebGLShader, compile, parser, mergeSystemCode;
    makeWebGLShader = (function () {
        var t0;
        return function (gl, key, type) {
            switch (type) {
                case RedShader.VERTEX:
                    t0 = gl.createShader(gl.VERTEX_SHADER);
                    t0['key'] = key;
                    t0['type'] = type;
                    return t0
                case RedShader.FRAGMENT:
                    t0 = gl.createShader(gl.FRAGMENT_SHADER);
                    t0['key'] = key;
                    t0['type'] = type;
                    return t0
                default:
                    RedGLUtil.throwFunc('RedShader : 쉐이더 타입을 확인하세요!')
                    break
            }
        }
    })();
    compile = function (gl, type, shader, parseData) {
        gl.shaderSource(shader, parseData['lastSource']);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log(parseData)
            RedGLUtil.throwFunc(gl.getShaderInfoLog(shader), '쉐이더 컴파일에 실패하였습니다.')
        }
    }
    mergeSystemCode = (function () {
        var t0;
        return function (type, sourceList) {
            switch (type) {
                case RedShader.VERTEX:
                    t0 = RedSystemShaderCode['vShareSource'].concat();
                    break;
                case RedShader.FRAGMENT:
                    t0 = RedSystemShaderCode['fShareSource'].concat();
                    break;
                default:
                    RedGLUtil.throwFunc('RedShader : 쉐이더 타입을 확인하세요!')
            }
            sourceList.forEach(function (v) {
                v = v.replace(';', '');
                if (t0.indexOf(v) == -1) t0.push(v);
                else {
                    console.log(RedSystemShaderCode)
                    RedGLUtil.throwFunc('RedShader : ', '\n1. 중복된 소스이거나', '\n2. RedSystemShaderCode에 정의된 소스\n', v);
                }
            })
            return t0;
        }
    })();
    parser = (function () {
        var parseData, checkList;
        var mergeStr;

        return function (type, source) {
            source = source.replace(/\s+$/, '')
            source = source.replace(/  /g, '').trim();

            // console.log(source)
            parseData = {
                etc: {
                    list: [],
                    map: {},
                    source: ''
                }
            }
            // 함수 제외 전부 검색
            checkList = source.match(/attribute[\s\S]+?\;|uniform[\s\S]+?\;|varying[\s\S]+?\;|precision[\s\S]+?\;/g);
            checkList = checkList ? checkList : [];
            checkList = mergeSystemCode(type, checkList);
            checkList.sort();
            // console.log(checkList)
            // console.log(checkList)
            checkList.forEach(function (v) {
                var tData;
                var tType, tName, tDataType, tArrayNum, tValue;
                var tInputData;
                v = v.trim()
                source = source.replace(v + ';', '')
                // console.log(source)

                tData = v.split(' ')
                // console.log(v,tData)
                if (tData[2]) {
                    // 정의인경우
                    tType = tData[0];
                    tDataType = tData[1];
                    tName = tData[2].replace(';', '').split('[');
                    tValue = v.split('=')
                    tValue = tValue[1] ? tValue[1].trim().replace(';', '') : null
                    tArrayNum = tName.length > 1 ? +tName[1].split(']')[0] : 0;
                    tName = tName[0]
                    switch (tType) {
                        case 'attribute':
                            if (tName.charAt(0) != 'a') RedGLUtil.throwFunc('attribute의 첫글자는 a로 시작해야합니다.', tName)
                            break
                        case 'uniform':
                            if (tName.charAt(0) != 'u') RedGLUtil.throwFunc('uniform의 첫글자는 u로 시작해야합니다.', tName)
                            break
                        case 'varying':
                            if (tName.charAt(0) != 'v') RedGLUtil.throwFunc('varying의 첫글자는 v로 시작해야합니다.', tName)
                            break
                    }
                } else {
                    // 변수인경우
                    tType = 'var';
                    tDataType = tData[0];
                    tName = tData[1].replace(';', '').split('[');
                    tArrayNum = tName.length > 1 ? +tName[1].split(']')[0] : 0;
                    tName = tName[0];

                }
                // console.log(tType, tDataType, tName, tArrayNum)
                if (!parseData[tType]) parseData[tType] = {}, parseData[tType]['list'] = [], parseData[tType]['map'] = {}, parseData[tType]['source'] = '';
                tInputData = {
                    name: tName,
                    arrayNum: tArrayNum,
                    value: tValue,
                    systemUniformYn: RedSystemShaderCode.systemUniform[tArrayNum ? tName + '[' + tArrayNum + ']' : tName] ? true : false
                };
                if (tType == 'uniform') tInputData['uniformType'] = tDataType

                if (tType == 'attribute') tInputData['attributeType'] = tDataType
                parseData[tType]['list'].push(tInputData);
                parseData[tType]['map'][tName] = v;
                parseData[tType]['source'] += v + ';\n';

            });
            // console.log('일단 걸러진상태는',source)
            // 함수부 찾는다.
            source += '\n';
            // source.match(/[A-Za-z0-9]+\s[\s\S]+?(\}\n)/g).forEach(function (v) {
            [source].forEach(function (v) {
                // console.log(v.split(' '))
                var data = v.split(' ');
                var tName = data[1].replace(/\([\s\S]+/g, '').trim()
                parseData['etc']['list'].push({
                    uniformType: data[0],
                    name: tName
                })
                parseData['etc']['map'][tName] = v;
                parseData['etc']['source'] += v + '\n';
            })

            mergeStr = '';
            if (parseData['precision']) mergeStr += parseData['precision']['source'] + '\n//attribute\n';
            if (parseData['const']) mergeStr += parseData['const']['source'] + '\n//const\n';
            if (parseData['attribute']) mergeStr += parseData['attribute']['source'] + '\n//uniform\n';
            if (parseData['uniform']) mergeStr += parseData['uniform']['source'] + '\n//varying\n';
            if (parseData['varying']) mergeStr += parseData['varying']['source'] + '\n//var\n';
            if (parseData['var']) mergeStr += parseData['var']['source'] + '\n//etc\n';
            if (parseData['etc']) mergeStr += parseData['etc']['source'];
            parseData.lastSource = mergeStr;
            // console.log(parseData)
            return parseData;
        }
    })()
    /**DOC:
        {
            constructorYn : true,
            title :`RedShader`,
            description : `
                RedShader Instance 생성기
                RedSystemShaderCode 소스와 머징된 RedShader Instance를 생성
            `,
            params : {
                redGL : [
                    {type:'RedGL'}
                ],
                key : [
                    {type:'String'},
                    `고유키`
                ],
                type : [
                    {type:'RedShader.VERTEX or RedShader.FRAGMENT'},
                    `버퍼 타입`
                ],
                source : [
                    {type:'String'},
                    `쉐이더 문자열 소스`
                ],
            },
            return : 'RedShader Instance'
        }
    :DOC*/
    RedShader = function (redGL, key, type, source) {
        var tGL;
        if (!(this instanceof RedShader)) return new RedShader(redGL, key, type, source);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedShader : RedGL Instance만 허용됩니다.');
        if (typeof key != 'string') RedGLUtil.throwFunc('RedShader : key - 문자열만 허용됩니다.');
        if (typeof type != 'string') RedGLUtil.throwFunc('RedShader : type - 문자열만 허용됩니다.');
        if (typeof source != 'string') RedGLUtil.throwFunc('RedShader : source - 문자열만 허용됩니다.');
        tGL = redGL.gl
        /**DOC:
            {
             title :`webglShader`,
             description : `실제 쉐이더(WebGLShader Instance)`,
             return : 'WebGLShader'
            }
        :DOC*/
        this['webglShader'] = makeWebGLShader(tGL, key, type);
        this['parseData'] = parser(type, source);
        compile(tGL, type, this['webglShader'], this['parseData']);
        /**DOC:
        {
            title :`key`,
            description : `고유키`,
            return : 'String'
        }
        :DOC*/

        //TODO: 고유키 방어
        this['key'] = key
        /**DOC:
		{
            title :`type`,
			description : `RedShader.VERTEX or RedShader.FRAGMENT`,
			return : 'String'
		}
	    :DOC*/
        this['type'] = type
        this['_UUID'] = RedGL['makeUUID']();
        console.log(this);
        Object.freeze(this)
        // console.log(this)
    }
    /**DOC:
		{
            title :`RedShader.FRAGMENT`,
            code: 'CONST',
			return : 'String'
		}
	:DOC*/
    RedShader.FRAGMENT = 'fragmentShader'
    /**DOC:
		{
            title :`RedShader.VERTEX_SHADER`,
            code: 'CONST',
			return : 'String'
		}
	:DOC*/
    RedShader.VERTEX = 'vertexShader'
    Object.freeze(RedShader)
})();