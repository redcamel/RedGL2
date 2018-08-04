"use strict";
var RedShader;
(function () {
	var makeWebGLShader, compileWebGLShader, parserDefine, mergeSystemCode;
	makeWebGLShader = (function () {
		var t0;
		return function (gl, key, type) {
			switch ( type ) {
				case RedShader.VERTEX:
					t0 = gl.createShader(gl.VERTEX_SHADER);
					if ( !t0 ) {
						if ( gl.isContextLost() ) RedGLUtil.throwFunc('RedShader : 쉐이더를 생성실패! - WebGL 컨텍스트가 손실');
						else RedGLUtil.throwFunc('RedShader : 쉐이더를 생성실패! - GPU메모리가 부족일 가능성이 큼');
					}
					t0['key'] = key;
					t0['type'] = type;
					return t0;
					break;
				case RedShader.FRAGMENT:
					t0 = gl.createShader(gl.FRAGMENT_SHADER);
					if ( !t0 ) {
						if ( gl.isContextLost() ) RedGLUtil.throwFunc('RedShader : 쉐이더를 생성실패! - WebGL 컨텍스트가 손실');
						else RedGLUtil.throwFunc('RedShader : 쉐이더를 생성실패! - GPU메모리가 부족일 가능성이 큼');
					}
					t0['key'] = key;
					t0['type'] = type;
					return t0;
					break;
				default:
					RedGLUtil.throwFunc('RedShader : 쉐이더 타입을 확인하세요. RedShader.VERTEX or RedShader.FRAGMENT 만 허용');
					break
			}
		}
	})();
	compileWebGLShader = function (gl, type, shader, parseData) {
		gl.shaderSource(shader, parseData['lastSource']);
		gl.compileShader(shader);
		if ( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
			// console.log(parseData)
			RedGLUtil.throwFunc('RedShader : 쉐이더 컴파일에 실패하였습니다.\n', gl.getShaderInfoLog(shader))
		}
	};
	mergeSystemCode = (function () {
		var i, tDefineData;
		return function (type, sourceList) {
			var t0;
			switch ( type ) {
				case RedShader.VERTEX:
					t0 = RedSystemShaderCode['vShareSource'].concat();
					break;
				case RedShader.FRAGMENT:
					t0 = RedSystemShaderCode['fShareSource'].concat();
					break;
				default:
					RedGLUtil.throwFunc('RedShader : 쉐이더 타입을 확인하세요. RedShader.VERTEX or RedShader.FRAGMENT 만 허용');
					break;
			}
			i = sourceList.length;
			while ( i-- ) {
				tDefineData = sourceList[i];
				tDefineData = tDefineData.replace(';', '');
				if ( t0.indexOf(tDefineData) == -1 ) t0.push(tDefineData);
				else {
					console.log(RedSystemShaderCode);
					RedGLUtil.throwFunc('RedShader : ', '\n1. 중복 선언 이거나', '\n2. RedSystemShaderCode에 정의된 선언\n', '입력값 : ' + tDefineData);
				}
			}
			return t0;
		}
	})();
	parserDefine = (function () {
		var parseData, checkDefineList;
		var mergeStr;
		return function (type, source) {
			source = source.replace(/\s+$/, '');
			source = source.replace(/  /g, '').trim();
			// console.log(source)
			parseData = {etc: ''};
			// 함수 제외 전부 검색
			checkDefineList = source.match(/attribute[\s\S]+?\;|uniform[\s\S]+?\;|varying[\s\S]+?\;|const[\s\S]+?\;|precision[\s\S]+?\;/g);
			checkDefineList = checkDefineList ? checkDefineList : [];
			checkDefineList = mergeSystemCode(type, checkDefineList);
			checkDefineList.sort();
			// console.log(checkList)
			// console.log(checkDefineList)
			checkDefineList.forEach(function (v) {
				var tCheckDefine;
				var tDefineType, tName, tDataType, tArrayNum, tValue;
				var tResultData;
				var tPrecision;
				v = v.trim();
				// 체크된 녀석은 소스에서 갈아치움
				source = source.replace(v + ';', '');
				// console.log(source)
				tCheckDefine = v.split(' ');
				if ( tCheckDefine[1] == 'highp' || tCheckDefine[1] == 'mediump' || tCheckDefine[1] == 'lowp' ) {
					// uniform highp vec4 uTest4; 같은 선언을 Precision값을 분리함
					var temp;
					temp = tCheckDefine[1];
					tCheckDefine.splice(1, 1);
					tCheckDefine.push(temp);
					tPrecision = temp;
				}
				// console.log(v,tData)
				// 배열화 했을때 최소 2개여야함. ex) uniform vec2 uTest, uniform highp vec2 uTest2;
				// highp vec4 uTest4; 같은 선언의 경우 checkDefineList match시 걸리지 않으므로 상관없음
				if ( tCheckDefine[2] ) {
					// 정의인경우
					tDefineType = tCheckDefine[0]; // uniform, attribute, varying
					tDataType = tCheckDefine[1]; // vec2, float, ...
					tName = tCheckDefine[2].replace(';', '').split('['); // 이름은 배열인텍스 2번째로 간주함.
					tValue = v.split('='); // 값을 찾음
					tValue = tValue[1] ? tValue[1].trim().replace(';', '') : null; // 값이 있으면 값을 가져옴
					tArrayNum = tName.length > 1 ? +tName[1].split(']')[0] : 0; // 이름이 uTest[2]와 같이 배열일경우 배열 길이를 가져옴
					tName = tName[0]; // 최종 이름확보
					// 이름 검증
					switch ( tDefineType ) {
						case 'precision':
							break;
						case 'attribute':
							if ( tName.charAt(0) != 'a' ) RedGLUtil.throwFunc('RedShader : attribute의 첫글자는 a로 시작해야합니다.', tName);
							if ( tName.charAt(1) != tName.charAt(1).toUpperCase() ) RedGLUtil.throwFunc('RedShader : attribute의 두번째 글자는 대문자 시작해야합니다.', tName);
							break;
						case 'uniform':
							if ( tName.charAt(0) != 'u' ) RedGLUtil.throwFunc('RedShader : uniform의 첫글자는 u로 시작해야합니다.', tName);
							if ( tName.charAt(1) != tName.charAt(1).toUpperCase() ) RedGLUtil.throwFunc('RedShader : uniform의 두번째 글자는 대문자 시작해야합니다.', tName);
							break;
						case 'varying':
							if ( tName.charAt(0) != 'v' ) RedGLUtil.throwFunc('RedShader : varying의 첫글자는 v로 시작해야합니다.', tName);
							if ( tName.charAt(1) != tName.charAt(1).toUpperCase() ) RedGLUtil.throwFunc('RedShader : varying의 두번째 글자는 대문자 시작해야합니다.', tName);
							break;
						case 'const':
							if ( tName.charAt(0) != 'c' ) RedGLUtil.throwFunc('RedShader : const의 첫글자는 c로 시작해야합니다.', tName);
							if ( tName.charAt(1) != tName.charAt(1).toUpperCase() ) RedGLUtil.throwFunc('RedShader : const의 두번째 글자는 대문자 시작해야합니다.', tName);
							break;
						default:
							console.log('RedShader : 체크되지 못하는값인데 뭐냐', tName);
							RedGLUtil.throwFunc('RedShader : 체크되지 못하는값인데 뭐냐', tName);
							break;
					}
				}
				else {
					console.log('RedShader : 체크되지 못하는값인데 뭐냐', tCheckDefine);
					RedGLUtil.throwFunc('RedShader : 체크되지 못하는값인데 뭐냐', tCheckDefine);
					// 아래놈은 이제 사용하지 ㅇ낳음
					// // 변수인경우
					// console.log('여기냐', tCheckDefine)
					// tDefineType = 'var';
					// tDataType = tCheckDefine[0];
					// tName = tCheckDefine[1].replace(';', '').split('[');
					// tArrayNum = tName.length > 1 ? +tName[1].split(']')[0] : 0;
					// tName = tName[0];
				}
				// 저장공간확보
				if ( !parseData[tDefineType] ) {
					parseData[tDefineType] = {};
					parseData[tDefineType]['list'] = [];
					parseData[tDefineType]['map'] = {};
					parseData[tDefineType]['source'] = '';
				}
				tResultData = {
					name: tName,
					arrayNum: tArrayNum,
					value: tValue,
					precision: tPrecision,
					systemUniformYn: RedSystemShaderCode.systemUniform[tArrayNum ? tName + '[' + tArrayNum + ']' : tName] ? true : false
				};
				if ( tDefineType == 'uniform' ) tResultData['uniformType'] = tDataType;
				if ( tDefineType == 'attribute' ) tResultData['attributeType'] = tDataType;
				if ( tDefineType == 'varying' ) tResultData['varyingType'] = tDataType;
				parseData[tDefineType]['list'].push(tResultData);
				parseData[tDefineType]['map'][tName] = v;
				parseData[tDefineType]['source'] += v + ';\n';
			});
			source += '\n';
			source = source.trim();
			// console.log(source)
			// 메인함수 및 변수 처리
			parseData['etc'] = source + '\n';
			mergeStr = '';
			if ( parseData['precision'] ) mergeStr += parseData['precision']['source'] + '\n//const\n';
			if ( parseData['const'] ) mergeStr += parseData['const']['source'] + '\n//attribute\n';
			if ( parseData['attribute'] ) mergeStr += parseData['attribute']['source'] + '\n//uniform\n';
			if ( parseData['uniform'] ) mergeStr += parseData['uniform']['source'] + '\n//varying\n';
			if ( parseData['varying'] ) mergeStr += parseData['varying']['source'] + '\n//etc\n';
			if ( parseData['etc'] ) mergeStr += parseData['etc'];
			parseData.lastSource = mergeStr;
			// console.log(parseData)
			if ( type == RedShader.FRAGMENT && !parseData['precision'] ) RedGLUtil.throwFunc('RedShader : FRAGMENT Shader는 precision를 반드시 선언해야함');
			return parseData;
		}
	})();
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
		 example : `
		 RedShader(RedGL Instance, 'test', RedShader.VERTEX, 'vec3 test; void main(){}')
		 RedShader(RedGL Instance, 'test', RedShader.FRAGMENT, 'precision mediump float;vec3 test; void main(){test;}')
		 `,
		 return : 'RedShader Instance'
	 }
	 :DOC*/
	RedShader = function (redGL, key, type, source) {
		var tGL;
		if ( !(this instanceof RedShader) ) return new RedShader(redGL, key, type, source);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedShader : RedGL Instance만 허용.', '입력값 : ' + redGL);
		typeof key == 'string' || RedGLUtil.throwFunc('RedShader : key - 문자열만 허용.', '입력값 : ' + key);
		if ( type != RedShader['VERTEX'] && type != RedShader['FRAGMENT'] ) RedGLUtil.throwFunc('RedShader : type - RedShader.VERTEX or RedShader.FRAGMENT 만 허용.', '입력값 : ' + type);
		// 데이터 공간확보
		if ( !redGL['_datas']['RedShader'] ) {
			redGL['_datas']['RedShader'] = {};
			redGL['_datas']['RedShader'][RedShader['VERTEX']] = {};
			redGL['_datas']['RedShader'][RedShader['FRAGMENT']] = {};
		}
		// 소스가 있을 경우 검증
		if ( source ) {
			typeof source == 'string' || RedGLUtil.throwFunc('RedShader : source - 문자열만 허용.');
			if ( RedShader['hasKey'](redGL, key, type) ) RedGLUtil.throwFunc('RedShader : key - 이미 정의된 키로 생성을 시도.', '\n키 :', key, '\n타입 :' + type);
			else redGL['_datas']['RedShader'][type][key] = this;
		} else {
			// 소스가 없을경우, 기존데이터에서 찾아옴
			if ( RedShader['hasKey'](redGL, key, type) ) return redGL['_datas']['RedShader'][type][key];
			else RedGLUtil.throwFunc('RedShader : ' + type + ' 타입에 존재하지 않는 key를 검색하려고합니다.', '입력값 : ' + key);
		}
		tGL = redGL.gl;
		/**DOC:
		 {
		  code : 'PROPERTY',
		  title :`webglShader`,
		  description : `실제 쉐이더(WebGLShader Instance)`,
		  return : 'WebGLShader'
		 }
		 :DOC*/
		this['webglShader'] = makeWebGLShader(tGL, key, type); // 쉐이더 생성
		/**DOC:
		 {
		  code : 'PROPERTY',
		  title :`parseData`,
		  description : `쉐이더 해석 데이터`,
		  return : 'Object'
		 }
		 :DOC*/
		this['parseData'] = parserDefine(type, source); // 소스 파싱
		this['originSource'] = source;
		compileWebGLShader(tGL, type, this['webglShader'], this['parseData']); // 쉐이더 컴파일
		/**DOC:
		 {
		     code : 'PROPERTY',
			 title :`key`,
			 description : `고유키`,
			 return : 'String'
		 }
		 :DOC*/
		this['key'] = key;
		/**DOC:
		 {
		     code : 'PROPERTY',
			 title :`type`,
			 description : `RedShader.VERTEX or RedShader.FRAGMENT`,
			 return : 'String'
		 }
		 :DOC*/
		this['type'] = type;
		this['_UUID'] = RedGL.makeUUID();
		Object.freeze(this);
		console.log(this);
	};
	/**DOC:
	 {
		 title :`RedShader.hasKey`,
		 code: 'STATIC METHOD',
		 description : '키에 해당하는 쉐이더 존재 여부 반환',
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
			 ]
		 },
		 example : `
			 RedShader.haskey(RedGL Instance, '찾고자하는키', RedShader.FRAGMENT or RedShader.VERTEX)
		 `,
		 return : 'Boolean'
	 }
	 :DOC*/
	RedShader['hasKey'] = function (redGL, key, type) {
		return redGL['_datas']['RedShader'][type][key] ? true : false
	};
	/**DOC:
	 {
		 title :`RedShader.FRAGMENT`,
		 code: 'CONST',
		 return : 'String'
	 }
	 :DOC*/
	RedShader['FRAGMENT'] = 'fragmentShader';
	/**DOC:
	 {
		 title :`RedShader.VERTEX`,
		 code: 'CONST',
		 return : 'String'
	 }
	 :DOC*/
	RedShader['VERTEX'] = 'vertexShader';
	Object.freeze(RedShader)
})();