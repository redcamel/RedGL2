"use strict";
var RedDAELoader;
(function () {
	var parser;
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedDAELoader`,
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
		 example : `
		 RedDAELoader(RedGL Instance, '../asset/obj/gun/', 'Handgun_obj.obj', function (result) {
			 tScene3D.addChild(result['resultMesh'])
		 })
		 `,
		 return : 'void'
	 }
	 :DOC*/

	RedDAELoader = function (redGL, path, fileName, callback) {
		if ((!(this instanceof RedDAELoader))) return new RedDAELoader(redGL, path, fileName, callback)
		console.log('~~~~~~~~~~~')
		var self = this;
		var request = new XMLHttpRequest();
		request.open("GET", path + fileName, true);
		request.setRequestHeader("Content-Type", "application/xml; charset=UTF-8")
		request.onreadystatechange = function () {
			if (request.readyState == 4) {
				console.log(request)
				console.log(request['responseXML'])
				console.log(request['responseXML'].querySelector('COLLADA'))
				self['result'] = parser(self, redGL, request['responseXML'])
				if (callback) {
					console.log('모델 파싱 종료');
					callback(self['result'])
				}
			}
		}
		request.send();
		this['path'] = path;
		this['fileName'] = fileName;
		this['callback'] = callback;
		this['resultMesh'] = RedMesh(redGL)
		this['resultMesh']['name'] = 'instanceOfRedDAELoader_' + RedGL.makeUUID()
		this['result'] = null;
	}
	parser = function (tRedDAELoader, redGL, rawData) {
		console.log('파싱시작', tRedDAELoader['path'] + tRedDAELoader['fileName'])

		var meshs = rawData.querySelector('library_geometries geometry mesh')
		var parseSourceDatas = meshs.querySelectorAll('source')
		var parseIndexData = meshs.querySelectorAll('p')[1].textContent.split(' ')
		var parseSourceNum = parseSourceDatas.length
		console.log(meshs)
		console.log(parseSourceDatas)
		console.log(parseIndexData)
		var indexDataIndex = []
		var normalDataindex = []
		var coordDataIndex = []
		parseIndexData.forEach(function (v, index) {
			if (index % parseSourceNum == 0) indexDataIndex.push(+v)
			else if (index % parseSourceNum == 1) normalDataindex.push(+v)
			else if (index % parseSourceNum == 2) coordDataIndex.push(+v)
		})
		console.log('indexDataIndex', indexDataIndex)
		console.log('normalDataindex', normalDataindex)
		console.log('coordDataIndex', coordDataIndex)


		var testInterleaveBufferData = []
		var tPosition = parseSourceDatas[0].querySelector('float_array').textContent.split(' ').map(Number)
		var tNormal = parseSourceDatas[1].querySelector('float_array').textContent.split(' ').map(Number)
		var tCoord = parseSourceDatas[2].querySelector('float_array').textContent.split(' ').map(Number)
		var i, len


		i = 0
		len = indexDataIndex.length

		for (i; i < len; i++) {

			testInterleaveBufferData[indexDataIndex[i] * 6] = tPosition[indexDataIndex[i] * 3]
			testInterleaveBufferData[indexDataIndex[i] * 6 + 1] = tPosition[indexDataIndex[i] * 3 + 1]
			testInterleaveBufferData[indexDataIndex[i] * 6 + 2] = tPosition[indexDataIndex[i] * 3 + 2]
			i++

			testInterleaveBufferData[indexDataIndex[i] * 6] = tPosition[indexDataIndex[i] * 3]
			testInterleaveBufferData[indexDataIndex[i] * 6 + 1] = tPosition[indexDataIndex[i] * 3 + 1]
			testInterleaveBufferData[indexDataIndex[i] * 6 + 2] = tPosition[indexDataIndex[i] * 3 + 2]
			i++

			testInterleaveBufferData[indexDataIndex[i] * 6] = tPosition[indexDataIndex[i] * 3]
			testInterleaveBufferData[indexDataIndex[i] * 6 + 1] = tPosition[indexDataIndex[i] * 3 + 1]
			testInterleaveBufferData[indexDataIndex[i] * 6 + 2] = tPosition[indexDataIndex[i] * 3 + 2]
			i--
			i--


			testInterleaveBufferData[indexDataIndex[i] * 6 + 3] = tNormal[indexDataIndex[i] * 3 + 3]
			testInterleaveBufferData[indexDataIndex[i] * 6 + 1 + 3] = tNormal[indexDataIndex[i] * 3 + 1 + 3]
			testInterleaveBufferData[indexDataIndex[i] * 6 + 2 + 3] = tNormal[indexDataIndex[i] * 3 + 2 + 3]

			i++
			testInterleaveBufferData[indexDataIndex[i] * 6 + 3] = tNormal[indexDataIndex[i] * 3 + 3]
			testInterleaveBufferData[indexDataIndex[i] * 6 + 1 + 3] = tNormal[indexDataIndex[i] * 3 + 1 + 3]
			testInterleaveBufferData[indexDataIndex[i] * 6 + 2 + 3] = tNormal[indexDataIndex[i] * 3 + 2 + 3]

			i++
			testInterleaveBufferData[indexDataIndex[i] * 6 + 3] = tNormal[indexDataIndex[i] * 3 + 3]
			testInterleaveBufferData[indexDataIndex[i] * 6 + 1 + 3] = tNormal[indexDataIndex[i] * 3 + 1 + 3]
			testInterleaveBufferData[indexDataIndex[i] * 6 + 2 + 3] = tNormal[indexDataIndex[i] * 3 + 2 + 3]

		}

		console.log('testInterleaveBufferData', testInterleaveBufferData)
		var testInterleaveBuffer = RedBuffer(
			redGL,
			'testInterleaveBuffer2',
			new Float32Array(testInterleaveBufferData),
			RedBuffer.ARRAY_BUFFER, [
				RedInterleaveInfo('aVertexPosition', 3),
				RedInterleaveInfo('aVertexNormal', 3),
				// RedInterleaveInfo('aTexcoord', 2)
			]
		)
		console.log('indexDataIndex', indexDataIndex)
		var testIndexBuffer = RedBuffer(
			redGL,
			'testIndexBuffer2',
			new Uint16Array(indexDataIndex),
			RedBuffer.ELEMENT_ARRAY_BUFFER
		)
		tRedDAELoader['resultMesh']['geometry'] = RedGeometry(testInterleaveBuffer, testIndexBuffer)
		tRedDAELoader['resultMesh']['material'] = RedStandardMaterial(redGL, RedBitmapTexture(redGL, '../asset/Body_tex_003.jpg'))
		tRedDAELoader['resultMesh']['material'] = RedColorPhongMaterial(redGL)
		// tRedDAELoader['resultMesh']['material'] = RedColorMaterial(redGL)
		// tRedDAELoader['resultMesh']['material'].shininess = 128
		// tRedDAELoader['resultMesh'].drawMode = redGL.gl.POINTS


		var parsedData = {}
		return {
			fileName: tRedDAELoader['fileName'],
			path: tRedDAELoader['path'],
			resultMesh: tRedDAELoader['resultMesh'],
			rawData: rawData,
			indexS: {
				index: indexDataIndex,
				normal: normalDataindex,
				coord: coordDataIndex
			},
			rawData: {
				position: parseSourceDatas[0].querySelector('float_array').textContent.split(' ').map(Number),
				normal: parseSourceDatas[1].querySelector('float_array').textContent.split(' ').map(Number),
				coord: parseSourceDatas[2].querySelector('float_array').textContent.split(' ').map(Number)
			}
		}
	}
	Object.freeze(RedDAELoader)
})()