"use strict";
var RedProgram;
(function () {
	var makeWebGLProgram, updateLocation;
	var samplerIndex, MAX_SAMPLER_INDEX;
	samplerIndex = 2;
	makeWebGLProgram = (function () {
		var tProgram;
		var tVMap, tFMap, k;
		return function (gl, key, vs, fs) {
			tProgram = gl.createProgram();
			gl.attachShader(tProgram, vs['webglShader']);
			gl.attachShader(tProgram, fs['webglShader']);
			// 유니폼 파싱데이터 찾고
			if ( vs['parseData']['uniform'] ) {
				tVMap = vs['parseData']['uniform']['map'];
				tFMap = fs['parseData']['uniform']['map'];
				// 프레그먼트와 버텍스에 중복 유니폼 선언이 존재하는지 검색함
				for ( k in tVMap ) if ( tFMap[k] ) RedGLUtil.throwFunc("vertexShader와 fragmentShader에 중복된 유니폼 선언이 존재함.", "중복선언 : " + k);
			}
			// 상수 파싱데이터 찾고
			if ( vs['parseData']['const'] ) {
				tVMap = vs['parseData']['const']['map'];
				tFMap = fs['parseData']['const']['map'];
				// 프레그먼트와 버텍스에 중복 상수 선언이 존재하는지 검색함
				for ( k in tVMap ) if ( tFMap[k] ) RedGLUtil.throwFunc("vertexShader와 fragmentShader에 중복된 상수 선언이 존재함.", "중복선언 : " + k);
			}
			gl.linkProgram(tProgram);
			if ( !gl.getProgramParameter(tProgram, gl.LINK_STATUS) ) RedGLUtil.throwFunc("RedProgram : 프로그램을 초기화 할 수 없습니다.", gl.getProgramInfoLog(tProgram));
			// 프로그램 정보를 입력함.
			tProgram['key'] = key;
			tProgram['vShaderKey'] = vs['key'];
			tProgram['vShaderOriginSource'] = vs['originSource'];
			tProgram['fShaderKey'] = fs['key'];
			tProgram['fShaderOriginKey'] = vs['originSource'];
			return tProgram;
		}
	})();
	updateLocation = (function () {
		var AttributeLocationInfo;
		var UniformLocationInfo;
		var materialPropertyNameMAP = {};
		var totalUpdateLocationTime = 0;
		AttributeLocationInfo = function () {};
		UniformLocationInfo = function () {};
		return function (self, gl, shader) {
			var startTime = performance.now();
			var i, v, tList;
			var tIndex;
			// attributeLocation 정보 생성
			if ( shader['parseData']['attribute'] ) {
				tList = shader['parseData']['attribute']['list'];
				i = tList.length;
				while ( i-- ) {
					// shader['parseData']['attribute']['list'].forEach(function (v) {
					v = tList[i];
					var tLocationInfo = new AttributeLocationInfo();
					tLocationInfo['_UUID'] = RedGL.makeUUID();
					tLocationInfo['location'] = gl.getAttribLocation(self['webglProgram'], v['name']);
					if ( tLocationInfo['location'] == -1 ) tLocationInfo['msg'] = '쉐이더 main 함수에서 사용되고 있지 않음', tLocationInfo['use'] = false;
					else tLocationInfo['use'] = true;
					tLocationInfo['attributeType'] = v['attributeType'];
					tLocationInfo['name'] = v['name'];
					tLocationInfo['enabled'] = false;
					tIndex = self['attributeLocation'].length;
					if ( tLocationInfo['location'] != -1 ) self['attributeLocation'][tIndex] = tLocationInfo;
					self['attributeLocation'][tLocationInfo['name']] = tLocationInfo;
					// })
				}
			}
			// uniformLocation 정보 생성
			if ( shader['parseData']['uniform'] ) {
				tList = shader['parseData']['uniform']['list'];
				i = tList.length;
				while ( i-- ) {
					// shader['parseData']['uniform']['list'].forEach(function (v) {
					v = tList[i];
					var arrayNum, tRenderType, tRenderTypeIndex, tRenderMethod;
					var tLocationInfo = new UniformLocationInfo();
					tLocationInfo['_UUID'] = RedGL.makeUUID();
					tLocationInfo['uniformType'] = v['uniformType'];
					// renderType 조사
					arrayNum = v['arrayNum'];
					tRenderTypeIndex = 100000;
					switch ( v['uniformType'] ) {
						case 'sampler2D':
							tRenderType = 'sampler2D';
							tRenderTypeIndex = 0;
							tRenderMethod = 'uniform1i';
							tLocationInfo['samplerIndex'] = samplerIndex;
							samplerIndex++;
							if ( samplerIndex == MAX_SAMPLER_INDEX ) samplerIndex = 2;
							break;
						case 'samplerCube':
							tRenderType = 'samplerCube';
							tRenderTypeIndex = 1;
							tRenderMethod = 'uniform1i';
							tLocationInfo['samplerIndex'] = samplerIndex;
							samplerIndex++;
							if ( samplerIndex == MAX_SAMPLER_INDEX ) samplerIndex = 2;
							break;
						case 'float':
							tRenderType = 'float';
							tRenderTypeIndex = arrayNum ? 12 : 11;
							tRenderMethod = arrayNum ? 'uniform1fv' : 'uniform1f';
							break;
						case 'int':
							tRenderType = 'int';
							tRenderTypeIndex = arrayNum ? 12 : 11;
							tRenderMethod = arrayNum ? 'uniform1iv' : 'uniform1i';
							break;
						case 'bool':
							tRenderType = 'bool';
							tRenderTypeIndex = arrayNum ? 12 : 11;
							tRenderMethod = arrayNum ? 'uniform1iv' : 'uniform1i';
							break;
						case 'vec4':
							tRenderType = 'vec';
							tRenderTypeIndex = 12;
							tRenderMethod = 'uniform4fv';
							break;
						case 'vec3':
							tRenderType = 'vec';
							tRenderTypeIndex = 12;
							tRenderMethod = 'uniform3fv';
							break;
						case 'vec2':
							tRenderType = 'vec';
							tRenderTypeIndex = 12;
							tRenderMethod = 'uniform2fv';
							break;
						case 'ivec4':
							tRenderType = 'vec';
							tRenderTypeIndex = 12;
							tRenderMethod = 'uniform4iv';
							break;
						case 'ivec3':
							tRenderType = 'vec';
							tRenderTypeIndex = 12;
							tRenderMethod = 'uniform3iv';
							break;
						case 'ivec2':
							tRenderType = 'vec';
							tRenderTypeIndex = 12;
							tRenderMethod = 'uniform2iv';
							break;
						case 'bvec4':
							tRenderType = 'vec';
							tRenderTypeIndex = 12;
							tRenderMethod = 'uniform4iv';
							break;
						case 'bvec3':
							tRenderType = 'vec';
							tRenderTypeIndex = 12;
							tRenderMethod = 'uniform3iv';
							break;
						case 'bvec2':
							tRenderType = 'vec';
							tRenderTypeIndex = 12;
							tRenderMethod = 'uniform2iv';
							break;
						case 'mat4':
							tRenderType = 'mat';
							tRenderTypeIndex = 13;
							tRenderMethod = 'uniformMatrix4fv';
							break;
						case 'mat3':
							tRenderType = 'mat';
							tRenderTypeIndex = 13;
							tRenderMethod = 'uniformMatrix3fv';
							break;
						case 'mat2':
							tRenderType = 'mat';
							tRenderTypeIndex = 13;
							tRenderMethod = 'uniformMatrix2fv';
							break;
					}
					// console.log('samplerIndex', samplerIndex)
					tLocationInfo['location'] = gl.getUniformLocation(self['webglProgram'], v['name']);
					tLocationInfo['renderType'] = tRenderType;
					tLocationInfo['renderMethod'] = tRenderMethod;
					tLocationInfo['renderTypeIndex'] = tRenderTypeIndex;
					tLocationInfo['name'] = v['name'];
					if ( !materialPropertyNameMAP[v['name']] ) materialPropertyNameMAP[v['name']] = v['name'].charAt(1).toLowerCase() + v['name'].substr(2);
					tLocationInfo['materialPropertyName'] = materialPropertyNameMAP[v['name']];
					tLocationInfo['arrayNum'] = v['arrayNum'];
					if ( !tLocationInfo['location'] ) {
						tLocationInfo['msg'] = '쉐이더 main 함수에서 사용되고 있지 않음';
						tLocationInfo['use'] = false;
					}
					else tLocationInfo['use'] = true;
					if ( v['systemUniformYn'] ) {
						tIndex = self['systemUniformLocation'].length;
						if ( tLocationInfo['use'] ) self['systemUniformLocation'][tIndex] = tLocationInfo;
						self['systemUniformLocation'][v['name']] = tLocationInfo;
					} else {
						tIndex = self['uniformLocation'].length;
						if ( tLocationInfo['use'] ) self['uniformLocation'][tIndex] = tLocationInfo;
						self['uniformLocation'][v['name']] = tLocationInfo;
					}
				}
				// })
			}
			totalUpdateLocationTime += performance.now() - startTime;
			console.log('totalUpdateLocationTime', totalUpdateLocationTime);
		}
	})();
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedProgram`,
		 description : `
			 RedProgram Instance 생성기
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 key : [
				 {type:'String'},
				 `고유키`
			 ],
			 vSource : [
				 {type:'string'},
				 `버텍스 쉐이더 소스`
			 ],
			 fSource : [
				 {type:'string'},
				 `프레그먼트 쉐이더 소스`
			 ]
		 },
		 return : 'RedProgram Instance'
	 }
	 :DOC*/
	RedProgram = function (redGL, key, vSource, fSource) {
		var tGL;
		var vertexShader, fragmentShader;
		if ( !(this instanceof RedProgram) ) return new RedProgram(redGL, key, vSource, fSource);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedProgram : RedGL Instance만 허용.', '입력값 : ' + redGL);
		typeof key == 'string' || RedGLUtil.throwFunc('RedProgram : key - 문자열만 허용.', '입력값 : ' + key);
		tGL = redGL.gl;
		// 데이터 공간확보
		if ( !redGL['_datas']['RedProgram'] ) {
			redGL['_datas']['RedProgram'] = {};
			redGL['_datas']['RedProgramList'] = [];
		}
		if ( RedProgram.hasKey(redGL, key) ) return redGL['_datas']['RedProgram'][key];
		else {
			vertexShader = vSource ? RedShader(redGL, key + '_VS', RedShader['VERTEX'], vSource) : null;
			fragmentShader = fSource ? RedShader(redGL, key + '_FS', RedShader['FRAGMENT'], fSource) : null;
			if ( !vertexShader || !fragmentShader ) RedGLUtil.throwFunc('RedProgram : 신규 생성시 vertexShader, fragmentShader 모두 입력해야함.');
			else redGL['_datas']['RedProgram'][key] = this;
			redGL['_datas']['RedProgramList'].push(this);
		}
		/**DOC:
		 {
			 title :`key`,
			 description : `고유키`,
			 return : 'String'
		 }
		 :DOC*/
		this['key'] = key;
		/**DOC:
		 {
			 title :`webglProgram`,
			 description : `실제 프로그램(WebGLProgram Instance)`,
			 return : 'WebGLShader'
		 }
		 :DOC*/
		this['webglProgram'] = makeWebGLProgram(tGL, key, vertexShader, fragmentShader);
		/**DOC:
		 {
			 title :`attributeLocation`,
			 description : `어리뷰트 로케이션 정보`,
			 return : 'Array'
		 }
		 :DOC*/
		this['attributeLocation'] = [];
		/**DOC:
		 {
			 title :`uniformLocation`,
			 description : `유니폼 로케이션 정보`,
			 return : 'Array'
		 }
		 :DOC*/
		this['uniformLocation'] = [];
		/**DOC:
		 {
			 title :`systemUniformLocation`,
			 description : `시스템 유니폼 로케이션 정보`,
			 return : 'Array'
		 }
		 :DOC*/
		this['systemUniformLocation'] = [];
		// 쉐이더 로케이션 찾기
		tGL.useProgram(this['webglProgram']);
		MAX_SAMPLER_INDEX = redGL._detect['texture']['MAX_COMBINED_TEXTURE_IMAGE_UNITS'];
		updateLocation(this, tGL, vertexShader);
		updateLocation(this, tGL, fragmentShader);
		this['_UUID'] = RedGL.makeUUID();
		console.log(this)
	};
	RedProgram.prototype = {};
	/**DOC:
	 {
		 title :`RedProgram.hasKey`,
		 code: 'STATIC',
		 description : '키에 해당하는 쉐이더 존재 여부 반환',
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 key : [
				 {type:'String'},
				 `고유키`
			 ]
		 },
		 example : `
			 RedProgram.haskey(RedGL Instance, '찾고자하는키')
		 `,
		 return : 'Boolean'
	 }
	 :DOC*/
	RedProgram['hasKey'] = function (redGL, key) {
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedProgram : RedGL Instance만 허용.', '입력값 : ' + redGL);
		if ( !redGL['_datas']['RedProgram'] ) {
			redGL['_datas']['RedProgram'] = {};
			redGL['_datas']['RedProgramList'] = [];
		}
		return redGL['_datas']['RedProgram'][key] ? true : false;
	};
	//TODO: 이걸좀 정리해야하는데..
	RedProgram['makeProgram'] = function (redGL, programName, vSource, fSource, subProgramOption) {
		if ( programName.indexOf('_') > -1 ) RedGLUtil.throwFunc('RedProgram : 프로그램이름에 _ 는 허용하지 않음.', '입력값 : ' + programName);
		vSource = typeof vSource == 'string' ? vSource : RedGLUtil.getStrFromComment(vSource.toString());
		fSource = typeof fSource == 'string' ? fSource : RedGLUtil.getStrFromComment(fSource.toString());
		var t0;
		var hasFog = false;
		var hasSprite3D = false;
		var hasDirectionalShadow = false;
		if ( subProgramOption ) {
			subProgramOption.sort();
			programName += '_' + subProgramOption.join('_');
			var i = subProgramOption.length;
			// option에 해당하는 주석을 코드로 전환시킨다.
			while ( i-- ) {
				if ( subProgramOption[i] == 'fog' ) hasFog = true;
				if ( subProgramOption[i] == 'sprite3D' ) hasSprite3D = true;
				if ( subProgramOption[i] == 'directionalShadow' ) hasDirectionalShadow = true;
				if ( subProgramOption[i] == 'fog' || subProgramOption[i] == 'sprite3D' || subProgramOption[i] == 'directionalShadow' ) continue;
				t0 = new RegExp('\/\/\#define\#' + subProgramOption[i] + '\#', 'gi');
				// console.log(t0)
				vSource = vSource.replace(t0, '');
				fSource = fSource.replace(t0, '');
			}
		}
		// fog 처리
		t0 = new RegExp('\/\/\#define\#fog\#' + (hasFog ? 'true' : 'false') + '\#', 'gi');
		vSource = vSource.replace(t0, '');
		fSource = fSource.replace(t0, '');
		// sprite3D 처리
		t0 = new RegExp('\/\/\#define\#sprite3D\#' + (hasSprite3D ? 'true' : 'false') + '\#', 'gi');
		vSource = vSource.replace(t0, '');
		fSource = fSource.replace(t0, '');
		// directionalShadow 처리
		t0 = new RegExp('\/\/\#define\#directionalShadow\#' + (hasDirectionalShadow ? 'true' : 'false') + '\#', 'gi');
		vSource = vSource.replace(t0, '');
		fSource = fSource.replace(t0, '');
		// console.log(vSource, fSource)
		return RedProgram(redGL, programName, vSource, fSource)
	};
	Object.freeze(RedProgram);
})();