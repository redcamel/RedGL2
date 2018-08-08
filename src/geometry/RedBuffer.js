"use strict";
var RedBuffer;
(function () {
	var getGlDataTypeByTypeArray, getGlBufferType, parseInterleaveDefineInfo;
	getGlDataTypeByTypeArray = function (gl, bufferType, typedArrayData) {
		switch ( bufferType ) {
			case RedBuffer.ARRAY_BUFFER:
				if ( typedArrayData instanceof Float32Array ) return gl.FLOAT;
				if ( typedArrayData instanceof Float64Array ) return gl.FLOAT;
				RedGLUtil.throwFunc('RedBuffer : 올바른 TypedArray(RedBuffer.ARRAY_BUFFER)형식을 사용해야합니다.', '입력값 : ' + typedArrayData);
				break;
			case RedBuffer.ELEMENT_ARRAY_BUFFER:
				if ( typedArrayData instanceof Int8Array ) return gl.BYTE;
				if ( typedArrayData instanceof Int16Array ) return gl.SHORT;
				if ( typedArrayData instanceof Int32Array ) return gl.INT;
				if ( typedArrayData instanceof Uint8Array ) return gl.UNSIGNED_BYTE;
				if ( typedArrayData instanceof Uint16Array ) return gl.UNSIGNED_SHORT;
				if ( typedArrayData instanceof Uint32Array ) return gl.UNSIGNED_INT;
				RedGLUtil.throwFunc('RedBuffer : 올바른 TypedArray(RedBuffer.ELEMENT_ARRAY_BUFFER)형식을 사용해야합니다.', '입력값 : ' + typedArrayData);
				break;
			default:
				RedGLUtil.throwFunc('RedBuffer : bufferType - 지원하지 않는 버퍼타입입니다. ', '입력값 : ' + bufferType)
		}
	};
	getGlBufferType = function (gl, bufferType) {
		switch ( bufferType ) {
			case RedBuffer.ARRAY_BUFFER:
				return gl.ARRAY_BUFFER;
				break;
			case RedBuffer.ELEMENT_ARRAY_BUFFER:
				return gl.ELEMENT_ARRAY_BUFFER;
				break;
			default:
				RedGLUtil.throwFunc('RedBuffer : bufferType - 지원하지 않는 버퍼타입입니다. ')
		}
	};
	parseInterleaveDefineInfo = (function () {
		return function (self, bufferType, data, interleaveDefineInfoList) {
			//console.log(self, bufferType)
			var totalSize, i, len, tData;
			var tBYTES_PER_ELEMENT;
			if ( data instanceof Float32Array ) tBYTES_PER_ELEMENT = Float32Array.BYTES_PER_ELEMENT
			else if ( data instanceof Float64Array ) tBYTES_PER_ELEMENT = Float64Array.BYTES_PER_ELEMENT
			totalSize = 0;
			switch ( bufferType ) {
				case RedBuffer.ARRAY_BUFFER:
					self['interleaveDefineInfoList'] = interleaveDefineInfoList;
					if ( interleaveDefineInfoList ) {
						if ( interleaveDefineInfoList.length == 0 ) RedGLUtil.throwFunc('RedBuffer : interleaveDefineInfoList의 정보는 1개이상의 RedInterleaveInfo Instance로 구성되어야함.', interleaveDefineInfoList);
						i = 0;
						len = interleaveDefineInfoList.length;
						for ( i; i < len; i++ ) {
							tData = interleaveDefineInfoList[i];
							tData instanceof RedInterleaveInfo || RedGLUtil.throwFunc('RedBuffer : interleaveDefineInfoList의 정보는 RedInterleaveInfo Instance로만 구성되어야함.', interleaveDefineInfoList);
							// 단일 인터리브라면 오프셋은 없어야함.
							// 다중 인터리브라면 토탈사이즈 만큼이 오프셋위치임
							tData['offset'] = len < 2 ? 0 : totalSize;
							tData['offset_BYTES_PER_ELEMENT'] = len < 2 ? 0 : totalSize * tBYTES_PER_ELEMENT;
							totalSize += tData['size'];
							tData['_UUID'] = RedGL.makeUUID();
							// 키로 찾을수있게 입력함
							interleaveDefineInfoList[tData['attributeKey']] = tData;
						}
						// 단일 인터리브라면 해당 인터리브는 버텍스 정보라고 판단함
						if ( len < 2 ) {
							self['stride'] = 0;
							self['stride_BYTES_PER_ELEMENT'] = 0;
							self['pointNum'] = data.length / 3;
						} else {
							self['stride'] = totalSize;
							self['stride_BYTES_PER_ELEMENT'] = totalSize * tBYTES_PER_ELEMENT;
							self['pointNum'] = data.length / totalSize;
						}
						// 업로드시 포인트가 달라질수 있으므로 확인해야함.
						if ( self['pointNum'] != parseInt(self['pointNum']) ) RedGLUtil.throwFunc('RedBuffer : ARRAY_BUFFER의 pointNum이 정수로 떨어지지 않음. 데이터구성과 interleaveDefineInfoList 구성 확인 필요');
					} else RedGLUtil.throwFunc('RedBuffer : interleaveDefineInfoList는 반드시 정의 되어야함.');
					break;
				case RedBuffer.ELEMENT_ARRAY_BUFFER:
					self['pointNum'] = data.length;
					break;
			}
		}
	})();
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBuffer`,
		 description : `
			 RedBuffer Instance 생성자
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 key : [
				 {type:'String'},
				 `고유키`
			 ],
			 bufferType : [
				 {type:'String'},
				 `RedBuffer.ARRAY_BUFFER or RedBuffer.ELEMENT_ARRAY_BUFFER`
			 ],
			 data : [
				 {type:'TypedArray'},
				 `버퍼 구성 데이터`
			 ],
			 interleaveDefineInfoList : [
				 {type:'Object'},
				 `
				 버퍼의 인터리브 구성 정보
				 RedBuffer.ARRAY_BUFFER 일때만 필요
				 `,
				 `<code>
				 [
				   RedInterleaveInfo('aVertexPosition', 3),
				   RedInterleaveInfo('aTexcoord', 2)
				 ]
				 </code>`
			 ],
			 drawMode : [
				 {type:'gl 상수'},
				 `ex) gl.STATIC_DRAW`
			 ]
		 },
		 demo : '../example/geometry/RedBuffer.html',
		 example : `
			 var interleaveData, indexData;
			 var tInterleaveBuffer, tIndexBuffer
			 interleaveData = new Float32Array([
				 0.0, 0.5, 0.0, 0.0, 0.5,
				 -0.5, -0.5, 0.0, 0.5, 0.5,
				 0.5, -0.5, 0.0, 0.5, 0.0
			 ]);
			 indexData = new Uint16Array([0, 1, 2])
			 // 인터리브 버퍼생성
			 tInterleaveBuffer = RedBuffer(
				 this, // RedGL Instance
				 'tInterleaveBuffer', // key
				 RedBuffer.ARRAY_BUFFER, // bufferType
				 interleaveData, // data
				 [
				   RedInterleaveInfo('aVertexPosition', 3),
				   RedInterleaveInfo('aTexcoord', 2)
				 ]
			 )
			 // 인덱스 버퍼생성
			 tIndexBuffer = RedBuffer(
				 this, // RedGL Instance
				 'tIndexBuffer', // key
				 RedBuffer.ELEMENT_ARRAY_BUFFER, // bufferType
				 indexData  // data
			 )
			 console.log('인터리브버퍼', tInterleaveBuffer)
			 console.log('인덱스버퍼', tIndexBuffer)
		 `,
		 return : 'RedBuffer Instance'
	 }
	 :DOC*/
	RedBuffer = function (redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode) {
		// console.log(redGL, key, data, bufferType, interleaveDefineInfoList)
		if ( !(this instanceof RedBuffer) ) return new RedBuffer(redGL, key, bufferType, typedArrayData, interleaveDefineInfoList, drawMode);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedBuffer : RedGL Instance만 허용.', redGL);
		typeof key == 'string' || RedGLUtil.throwFunc('RedBuffer : key - 문자열만 허용.', '입력값 : ' + key);
		bufferType || RedGLUtil.throwFunc('RedBuffer : bufferType : 미입력, 반드시 입력해야함.');
		bufferType == RedBuffer.ARRAY_BUFFER || bufferType == RedBuffer.ELEMENT_ARRAY_BUFFER || RedGLUtil.throwFunc('RedBuffer : bufferType - RedBuffer.ARRAY_BUFFER or RedBuffer.ELEMENT_ARRAY_BUFFER 만 허용함.', '입력값 : ' + bufferType);
		var tGL = redGL.gl;
		//유일키 방어
		if ( !redGL['_datas']['RedBuffer'] ) {
			redGL['_datas']['RedBuffer'] = {};
			redGL['_datas']['RedBuffer'][RedBuffer.ARRAY_BUFFER] = {};
			redGL['_datas']['RedBuffer'][RedBuffer.ELEMENT_ARRAY_BUFFER] = {};
		}
		if ( redGL['_datas']['RedBuffer'][bufferType][key] ) return redGL['_datas']['RedBuffer'][bufferType][key];
		else redGL['_datas']['RedBuffer'][bufferType][key] = this;
		if ( bufferType == RedBuffer.ARRAY_BUFFER && !interleaveDefineInfoList ) RedGLUtil.throwFunc('RedBuffer : 신규생성시 interleaveDefineInfoList를 반드시 정의해야합니다.', '입력값 : ' + interleaveDefineInfoList);
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
			 title :`data`,
			 description : `data`,
			 return : 'TypedArray'
		 }
		 :DOC*/
		this['data'] = typedArrayData;
		/**DOC:
		 {
			 code : 'PROPERTY',
			 title :`bufferType`,
			 description : `bufferType 상수`,
			 return : 'RedBuffer.ARRAY_BUFFER or RedBuffer.ELEMENT_ARRAY_BUFFER'
		 }
		 :DOC*/
		this['bufferType'] = bufferType;
		/**DOC:
		 {
			 code : 'PROPERTY',
			 title :`glBufferType`,
			 description : `bufferType에 대응하는 gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER 상수`,
			 return : 'gl.ARRAY_BUFFER or glELEMENT_ARRAY_BUFFER 상수'
		 }
		 :DOC*/
		this['glBufferType'] = getGlBufferType(tGL, this['bufferType']);
		/**DOC:
		 {
			 code : 'PROPERTY',
			 title :`glArrayType`,
			 description : `
			 data의 type의 gl.XXX 상수
			 ex) gl.FLOAT, gl.BYTE
			 `,
			 return : 'gl.XXX 상수'
		 }
		 :DOC*/
		this['glArrayType'] = getGlDataTypeByTypeArray(tGL, this['bufferType'], this['data']);
		/**DOC:
		 {
			 code : 'PROPERTY',
			 title :`drawMode`,
			 description : `gl.STATIC_DRAW 상수`,
			 return : 'gl.STATIC_DRAW or gl.DYNAMIC_DRAW'
		 }
		 :DOC*/
		this['drawMode'] = drawMode ? drawMode : tGL.STATIC_DRAW;
		parseInterleaveDefineInfo(this, this['bufferType'], this['data'], interleaveDefineInfoList);
		/**DOC:
		 {
			 code : 'PROPERTY',
			 title :`webglBuffer`,
			 description : `WebGLBuffer`,
			 return : 'WebGLBuffer'
		 }
		 :DOC*/
		this['webglBuffer'] = tGL.createBuffer();
		this['_UUID'] = RedGL.makeUUID();
		/**DOC:
		 {
			 code : 'METHOD',
			 title :`upload`,
			 description : `
				 버퍼 데이터 갱신
				 기존 버퍼의 타입과 다른 타입의 값이 들어올경우 에러.
			 `,
			 params : {
				 data : [
					 {type:'TypedArray'},
					 `갱신 할 데이터`
				 ]
			 },
			 example : `
				 // ... interleaveData 정의 후 tInterleaveBuffer 버퍼를 가정하면
				 // 아래와 같이 데이터를 변경하고 버퍼데이터를 업데이트 시킬수 있다.
				 interleaveData[0] = Math.sin(time / 1000) * 1
				 interleaveData[2] = Math.cos(time / 1000) * 2
				 // 버퍼정보 업로드
				 tInterleaveBuffer.upload(interleaveData)
			 `,
			 return : 'RedBuffer Instance'
		 }
		 :DOC*/
		this['upload'] = function (data) {
			if ( this['glArrayType'] == getGlDataTypeByTypeArray(tGL, bufferType, data) ) {
				this['data'] = data;
				tGL.bindBuffer(this['glBufferType'], this['webglBuffer']);
				tGL.bufferData(this['glBufferType'], this['data'], this['drawMode']);
				parseInterleaveDefineInfo(this, this['bufferType'], this['data'], this['interleaveDefineInfoList']);
				if ( this['bufferType'] == RedBuffer.ARRAY_BUFFER ) this['triangleNum'] = this['data'].length / (this['stride'] ? this['stride'] : 3);
				if ( this['bufferType'] == RedBuffer.ELEMENT_ARRAY_BUFFER ) this['triangleNum'] = this['pointNum'] / 3;
			} else RedGLUtil.throwFunc('RedBuffer : upload - data형식이 기존 형식과 다름', data)
		};
		this['upload'](this['data']);
		console.log(this);
	};
	/**DOC:
	 {
		 code: 'CONST',
		 title :`RedBuffer.ARRAY_BUFFER`,
		 description : `ARRAY_BUFFER 버퍼상수 `,
		 return : 'String'
	 }
	 :DOC*/
	RedBuffer.ARRAY_BUFFER = 'arrayBuffer';
	/**DOC:
	 {
		 code: 'CONST',
		 title :`RedBuffer.ELEMENT_ARRAY_BUFFER`,
		 description : `ELEMENT_ARRAY_BUFFER 버퍼상수`,
		 return : 'String'
	 }
	 :DOC*/
	RedBuffer.ELEMENT_ARRAY_BUFFER = 'elementArrayBuffer';
	Object.freeze(RedBuffer);
})();