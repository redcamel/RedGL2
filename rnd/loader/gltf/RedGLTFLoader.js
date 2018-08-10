"use strict";
var RedGLTFLoader;
(function () {
	var parser
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedGLTFLoader`,
		 description : `
			 OBJ 로더
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 path : [
				 {type:'String'}
			 ],
			 fileName : [
				 {type:'String'}
			 ],
			 callback : [
				 {type:'Function'}
			 ]
		 },
		 return : 'void'
	 }
	 :DOC*/

	var fileLoader = function (src, type, onLoader, onError) {
		var request = new XMLHttpRequest();
		request.open("GET", src, true);
		request.setRequestHeader("Content-Type", (type ? type : "application/xml; " ) + 'charset=UTF-8')
		request.onreadystatechange = function (e) {
			if ( request.readyState == 4 && request.status === 200 ) {
				console.log(request)
				onLoader(request)
			} else {
				onError(request, e)
			}
		}
		request.send();
	}
	var fileArrayBufferLoader = function (src, onLoader, onError) {
		var request = new XMLHttpRequest();
		request.open("GET", src, true);
		request.overrideMimeType('application/octet-stream')
		request.responseType = "arraybuffer";
		request.onreadystatechange = function (e) {
			if ( request.readyState == 4 && request.status === 200 ) {
				console.log(request)
				onLoader(request)
			} else {
				onError(request, e)
			}
		}
		request.send();
	}
	RedGLTFLoader = function (redGL, path, fileName, callback) {
		if ( (!(this instanceof RedGLTFLoader)) ) return new RedGLTFLoader(redGL, path, fileName, callback)
		console.log('~~~~~~~~~~~')
		var self = this;
		fileLoader(
			path + fileName,
			null,
			function (request) {
				self['result'] = parser(self, redGL, JSON.parse(request['responseText']))
				if ( callback ) {
					console.log('모델 파싱 종료');
					callback(self['result'])
				}
			},
			function (request, error) {
				console.log(request, error)
			}
		)
		this['path'] = path;
		this['fileName'] = fileName;
		this['callback'] = callback;
		this['resultMesh'] = RedMesh(redGL)
		this['resultMesh']['name'] = 'instanceOfRedGLTFLoader_' + RedGL.makeUUID()
		this['result'] = null;
	};
	parser = (function () {
		var checkAsset;
		var getBaseResource;
		var getBufferResources;
		/*
			glTF는 asset 속성이 있어야한다.
			최소한 버전을 반드시 포함해야함.
		 */
		checkAsset = function (json) {
			console.log(json)
			if ( json['asset'] === undefined ) RedGLUtil.throwFunc('RedGLTFLoader - asset은 반드시 정의되어야함')
			if ( json['asset'].version[0] < 2 ) RedGLUtil.throwFunc('RedGLTFLoader - asset의 버전은 2.0이상이어야함')
		}
		getBufferResources = function (data) {
			var allNum = 0,loadedNum =0
			data.forEach(function (v, index) {
				console.log('버퍼테이터', v)
				allNum++
				fileArrayBufferLoader(
					v['uri'],
					function (request) {
						loadedNum++
						console.log(request)
						v['realData'] = request.response
						if(loadedNum == allNum){
							console.log(loadedNum,loadedNum)
						}
					},
					function (request, error) {
						console.log(request, error)
					}
				)
			})
		}
		/*
			전체 데이터중 외부소스데이터를 모두 실제화 해둔다.
		 */
		getBaseResource = function (json) {
			for ( var k in json ) {
				console.log(k, json[k])
				switch ( k ) {
					case 'scenes' :
						console.log('TODO : scene 내부 리소스 로딩');
						break;
					case 'nodes' :
						console.log('TODO : nodes 내부 리소스 로딩');
						break;
					case 'meshes' :
						console.log('TODO : meshes 내부 리소스 로딩');
						break;
					case 'buffers' :
						console.log('TODO : buffers 내부 리소스 로딩');
						getBufferResources(json[k]);
						break;
					case 'bufferViews ' :
						console.log('TODO : bufferViews 내부 리소스 로딩');
						break;
					case 'accessors ' :
						console.log('TODO : accessors 내부 리소스 로딩');
						break;
					default :
						console.log(k, '고려안한거임');
						break;
				}
			}
		}
		return function (tRedGLTFLoader, redGL, json) {
			console.log('파싱시작', tRedGLTFLoader['path'] + tRedGLTFLoader['fileName']);
			console.log('rawData', json);
			checkAsset(json);
			getBaseResource(json)
			return {
				fileName: tRedGLTFLoader['fileName'],
				path: tRedGLTFLoader['path'],
				resultMesh: tRedGLTFLoader['resultMesh']
			}
		}
	})();
	Object.freeze(RedGLTFLoader);
})();