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

	RedGLTFLoader = function (redGL, path, fileName, callback) {
		if ( (!(this instanceof RedGLTFLoader)) ) return new RedGLTFLoader(redGL, path, fileName, callback)
		console.log('~~~~~~~~~~~')
		var self = this;
		var request = new XMLHttpRequest();
		request.open("GET", path + fileName, true);
		request.setRequestHeader("Content-Type", "application/xml; charset=UTF-8")
		request.onreadystatechange = function () {
			if ( request.readyState == 4 && request.status === 200 ) {
				console.log(request)
				self['result'] = parser(self, redGL, JSON.parse(request['responseText']))
				if ( callback ) {
					console.log('모델 파싱 종료');
					callback(self['result'])
				}
			} else {
				console.log(request)
			}
		}
		request.send();
		this['path'] = path;
		this['fileName'] = fileName;
		this['callback'] = callback;
		this['resultMesh'] = RedMesh(redGL)
		this['resultMesh']['name'] = 'instanceOfRedGLTFLoader_' + RedGL.makeUUID()
		this['result'] = null;
	};
	parser = (function () {
		return function (tRedGLTFLoader, redGL, rawData) {
			console.log('파싱시작', tRedGLTFLoader['path'] + tRedGLTFLoader['fileName']);
			console.log('rawData', rawData);
			return {
				fileName: tRedGLTFLoader['fileName'],
				path: tRedGLTFLoader['path'],
				resultMesh: tRedGLTFLoader['resultMesh']
			}
		}
	})();
	Object.freeze(RedGLTFLoader);
})();