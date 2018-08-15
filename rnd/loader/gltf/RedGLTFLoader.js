"use strict";
var RedGLTFLoader;
(function () {
	var parser
	var WEBGL_COMPONENT_TYPES = {
		5120: Int8Array,
		5121: Uint8Array,
		5122: Int16Array,
		5123: Uint16Array,
		5125: Uint32Array,
		5126: Float32Array
	};
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
	var arrayBufferLoader = function (src, onLoader, onError) {
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
				self['result'] = parser(self, redGL, JSON.parse(request['responseText']), function () {
					if ( callback ) {
						console.log('모델 파싱 종료');
						callback(self['result'])
					}
				})
			},
			function (request, error) {
				console.log(request, error)
			}
		)
		this['uris'] = [];
		this['redGL'] = redGL;
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
		var parseScene;
		var parseMesh;
		var parseAnimation;
		/*
			glTF는 asset 속성이 있어야한다.
			최소한 버전을 반드시 포함해야함.
		 */
		checkAsset = function (json) {
			console.log(json)
			if ( json['asset'] === undefined ) RedGLUtil.throwFunc('RedGLTFLoader - asset은 반드시 정의되어야함')
			if ( json['asset'].version[0] < 2 ) RedGLUtil.throwFunc('RedGLTFLoader - asset의 버전은 2.0이상이어야함')
		}
		getBufferResources = function (redGLTFLoader, data, callback) {
			var allNum = 0, loadedNum = 0
			data['buffers'].forEach(function (v, index) {
				console.log('버퍼테이터', v)
				allNum++
				arrayBufferLoader(
					v['uri'],
					function (request) {
						loadedNum++
						console.log(request)
						console.log(request.response)
						redGLTFLoader['uris'][index] = new DataView(request.response);
						if ( loadedNum == allNum ) {
							console.log("redGLTFLoader['uris']", redGLTFLoader['uris'])
							console.log("uris로딩현황", loadedNum, loadedNum)
							if ( callback ) callback()
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
		getBaseResource = function (redGLTFLoader, json, callback) {
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
			getBufferResources(redGLTFLoader, json, callback);
		}
		parseScene = function (redGLTFLoader, json) {
			console.log('parseScene 시작')
			console.log(json)
			json['scenes'][0]['nodes'].forEach(function (nodeIndex, index) {
				console.log('노드를 찾음', nodeIndex)
				var tNode = json['nodes'][nodeIndex]
				var tMeshIndex = tNode['mesh']
				var tMesh;
				var tQuaternion;
				if ( 'mesh' in tNode ) {
					console.log("메쉬인덱스를 찾음", tMeshIndex)
					tMesh = parseMesh(redGLTFLoader, json, json['meshes'][json['nodes'][nodeIndex]['mesh']])
					if ( tQuaternion = tNode['rotation'] ) {
						// 로데이션은 쿼터니언으로 들어온다.
						tMesh.rotationZ = quat.getAxisAngle([0, 0, -1], tQuaternion) * 180 / Math.PI
					}
				} else {
					console.log('차일드 정보로 구성된 정보임')
				}
			})
		}
		parseMesh = function (redGLTFLoader, json, meshData) {
			console.log('parseMesh :')
			console.log(meshData)
			var tMesh;
			var indices = []
			var vertices = []
			var tInterleaveData = []
			meshData['primitives'].forEach(function (v, index) {
				console.log(v, index)
				if ( v['attributes'] ) {
					console.log('TODO: 어트리뷰트 파싱')
					for ( var k in v['attributes'] ) {
						console.log(k, '파싱')
						// 버퍼뷰의 위치를 말하므로...이를 추적파싱항
						var tIndex = v['attributes'][k]
						var tBufferView = json['bufferViews'][tIndex]
						var tBufferIndex = tBufferView['buffer']
						var tBuffer = json['buffers'][tBufferIndex]
						var tAccessors = json['accessors'][tIndex]
						var tBufferURIDataView;
						if ( tBuffer['uri'] ) {
							tBufferURIDataView = redGLTFLoader['uris'][tBufferIndex]
						}
						console.log('해당 bufferView 정보', tBufferView)
						console.log('바라볼 버퍼 인덱스', tBufferIndex)
						console.log('바라볼 버퍼', tBuffer)
						console.log('바라볼 버퍼데이터', tBufferURIDataView)
						console.log('바라볼 엑세서', tAccessors)
						////////////////////////////
						var i, len;
						var tComponentType
						var tMethod;
						tComponentType = WEBGL_COMPONENT_TYPES[tAccessors['componentType']]
						if ( tComponentType == Float32Array ) tMethod = 'getFloat32'
						console.log('tComponentType', tComponentType)
						i = (tBufferView['byteOffset'] + tAccessors['byteOffset']) / tComponentType['BYTES_PER_ELEMENT']
						switch ( tAccessors['type'] ) {
							case 'VEC3' :
								len = i + ( tComponentType['BYTES_PER_ELEMENT'] * tAccessors['count']) / tComponentType['BYTES_PER_ELEMENT'] * 3
								console.log(i, len)
								for ( i; i < len; i++ ) {
									vertices.push(tBufferURIDataView[tMethod](i * tComponentType['BYTES_PER_ELEMENT'], true))
								}
								console.log('인터리브 버퍼 데이터', vertices)
								break
							default :
								console.log('알수없는 형식 엑세서 타입', tAccessors)
								break
						}
					}
				}
				if ( 'indices' in v ) {
					console.log('TODO: 인덱스 파싱')
					// 버퍼뷰의 위치를 말하므로...이를 추적파싱항
					var tIndex = v['indices']
					var tBufferView = json['bufferViews'][tIndex]
					var tBufferIndex = tBufferView['buffer']
					var tBuffer = json['buffers'][tBufferIndex]
					var tAccessors = json['accessors'][tIndex]
					var tBufferURIDataView;
					if ( tBuffer['uri'] ) {
						tBufferURIDataView = redGLTFLoader['uris'][tBufferIndex]
					}
					console.log('해당 bufferView 정보', tBufferView)
					console.log('바라볼 버퍼 인덱스', tBufferIndex)
					console.log('바라볼 버퍼', tBuffer)
					console.log('바라볼 버퍼데이터', tBufferURIDataView)
					console.log('바라볼 엑세서', tAccessors)
					////////////////////////////
					var i, len
					var tComponentType = WEBGL_COMPONENT_TYPES[tAccessors['componentType']]
					var tMethod;
					if ( tComponentType == Uint16Array ) tMethod = 'getUint16'
					else if ( tComponentType == Uint8Array ) tMethod = 'getUint8'
					console.log('tComponentType', tComponentType)
					i = (tBufferView['byteOffset'] + tAccessors['byteOffset']) / tComponentType['BYTES_PER_ELEMENT']
					switch ( tAccessors['type'] ) {
						case 'SCALAR' :
							len = i + ( tComponentType['BYTES_PER_ELEMENT'] * tAccessors['count']) / tComponentType['BYTES_PER_ELEMENT']
							console.log(i, len)
							for ( i; i < len; i++ ) {
								indices.push(tBufferURIDataView[tMethod](i * tComponentType['BYTES_PER_ELEMENT'], true))
							}
							console.log('인덱스버퍼 데이터', indices)
							break
						default :
							console.log('알수없는 형식 엑세서 타입', tAccessors)
							break
					}
				}
			})
			var normalData = RedGLUtil.calculateNormals(vertices, indices)
			console.log('vertices', vertices)
			console.log('normalData', normalData)
			var interleaveData = []
			var i = 0, len = vertices.length / 3
			for ( i; i < len; i++ ) {
				interleaveData.push(vertices[i * 3 + 0], vertices[i * 3 + 1], vertices[i * 3 + 2])
				interleaveData.push(normalData[i * 3 + 0], normalData[i * 3 + 1], normalData[i * 3 + 2])
			}
			console.log('interleaveData', interleaveData)
			var tGeo, tMaterial
			tGeo = RedGeometry(
				RedBuffer(
					redGLTFLoader['redGL'],
					'testGLTF_interleaveBuffer',
					RedBuffer.ARRAY_BUFFER,
					new Float32Array(interleaveData),
					[
						RedInterleaveInfo('aVertexPosition', 3),
						RedInterleaveInfo('aVertexNormal', 3)
					]
				),
				RedBuffer(
					redGLTFLoader['redGL'],
					'testGLTF_indexBuffer',
					RedBuffer.ELEMENT_ARRAY_BUFFER,
					new Uint16Array(indices)
				)
			)
			tMaterial = RedColorMaterial(redGLTFLoader['redGL'])
			tMesh = RedMesh(redGLTFLoader['redGL'], tGeo, tMaterial)
			tMesh.useCullFace = false
			console.log('tMesh', tMesh)
			redGLTFLoader['resultMesh'].addChild(tMesh)
			return tMesh
		}
		parseAnimation = function (redGLTFLoader, json) {
			console.log('애니메이션 파싱시작')
			var nodes = json['nodes']
			var meshs = json['meshs']
			var accessors = json['accessors']
			var parse;
			parse = function (accessorIndex) {
				console.log('accessorIndex', accessorIndex)
				var tAccessors = json['accessors'][accessorIndex]
				var tBufferView = json['bufferViews'][tAccessors['bufferView']]
				var tBufferIndex = tBufferView['buffer']
				var tBuffer = json['buffers'][tBufferIndex]
				var tBufferURIDataView;
				if ( tBuffer['uri'] ) {
					tBufferURIDataView = redGLTFLoader['uris'][tBufferIndex]
				}
				console.log('///////////////////////////////////////////////////')
				console.log('버퍼인텍스', accessorIndex)
				console.log('해당 bufferView 정보', tBufferView)
				console.log('바라볼 버퍼 인덱스', tBufferIndex)
				console.log('바라볼 버퍼', tBuffer)
				console.log('바라볼 버퍼데이터', tBufferURIDataView)
				console.log('바라볼 엑세서', tAccessors)
				////////////////////////////
				var i, len;
				var tComponentType
				var tMethod;
				var dataList = []
				tComponentType = WEBGL_COMPONENT_TYPES[tAccessors['componentType']]
				if ( tComponentType == Float32Array ) tMethod = 'getFloat32'
				else if ( tComponentType == Uint16Array ) tMethod = 'getUint16'
				else if ( tComponentType == Uint8Array ) tMethod = 'getUint8'
				console.log('tComponentType', tComponentType)
				i = (tBufferView['byteOffset'] + tAccessors['byteOffset']) / tComponentType['BYTES_PER_ELEMENT']
				switch ( tAccessors['type'] ) {
					case 'SCALAR' :
						len = i + ( tComponentType['BYTES_PER_ELEMENT'] * tAccessors['count']) / tComponentType['BYTES_PER_ELEMENT']
						console.log(i, len)
						for ( i; i < len; i++ ) {
							dataList.push(tBufferURIDataView[tMethod](i * tComponentType['BYTES_PER_ELEMENT'], true))
						}
						console.log('타임 데이터', dataList)
						break
					case 'VEC4' :
						len = i + ( tComponentType['BYTES_PER_ELEMENT'] * tAccessors['count']) / tComponentType['BYTES_PER_ELEMENT'] * 4
						console.log(i, len)
						for ( i; i < len; i++ ) {
							dataList.push(tBufferURIDataView[tMethod](i * tComponentType['BYTES_PER_ELEMENT'], true))
						}
						console.log('값 데이터', dataList)
						break
					default :
						console.log('알수없는 형식 엑세서 타입', tAccessors)
						break
				}
				return dataList
			}
			json['animations'].forEach(function (v, index) {
				console.log(v)
				var samplers = v['samplers'];
				// 채널을 돌면서 파악한다.
				v['channels'].forEach(function (channel, channelIndex) {
					var tSampler;
					var tTargetData;
					var tMeshIndex, tMesh;
					var tNode;
					var animationData = {}
					tSampler = samplers[channel['sampler']];
					console.log('tSampler', tSampler)
					tTargetData = channel['target'];
					tNode = nodes[tTargetData['node']];
					if ( 'mesh' in tNode ) {
						tMeshIndex = tNode['mesh']
						tMesh = redGLTFLoader['resultMesh']['children'][tMeshIndex]
						console.log('애니메이션 대상메쉬', tMesh)
						switch ( tTargetData['path'] ) {
							case 'rotation' :
								console.log('path', tTargetData['path'])
								// 시간축은 샘플의 input
								console.log('시간축', tSampler['input'])
								console.log('시간엑세서 데이터', tSampler['input'])
								animationData['time'] = parse(tSampler['input'])
								console.log('시간축 데이터리스트', animationData['time'])
								// 로테이션 축은 샘플의 output
								console.log('로테이션축', tSampler['output'])
								console.log('로테이션엑세서 데이터', tSampler['output'])
								animationData['rotation'] = parse(tSampler['output'])
								console.log('로테이션축 데이터리스트', animationData['rotation'])
								break
							default :
								console.log('파싱할수없는 데이터', tTargetData['path'])
								break
						}
						console.log('animationData', animationData)
						var currentTime, previousTime, nextTime;
						var startTime = performance.now()
						var prevRotation, nextRotation
						var interpolationValue
						var tAniData;
						var currentRotation
						tAniData = animationData['rotation']
						var gap = 0
						var aniTick = function (time) {
							// console.log(time-startTime)
							currentTime = ((time - startTime) % 1000) / 1000
							// console.log('currentTime', currentTime)
							prevRotation = null
							nextRotation = null
							animationData['time'].forEach(function (v, index) {
								if ( v > currentTime ) {
									nextTime = v
									nextRotation = quat.getAxisAngle([0, 0, 1], [
											animationData['rotation'][index * 4],
											animationData['rotation'][index * 4 + 1],
											animationData['rotation'][index * 4 + 2],
											animationData['rotation'][index * 4 + 3]
										]) * 180 / Math.PI
									if ( index - 1 == -1 ) {
										index = animationData['time'].length
										prevRotation = quat.getAxisAngle([0, 0, 1], [
												animationData['rotation'][index * 4],
												animationData['rotation'][index * 4 + 1],
												animationData['rotation'][index * 4 + 2],
												animationData['rotation'][index * 4 + 3]
											]) * 180 / Math.PI
									}
									else {
										index--
										prevRotation = quat.getAxisAngle([0, 0, 1], [
												animationData['rotation'][index * 4],
												animationData['rotation'][index * 4 + 1],
												animationData['rotation'][index * 4 + 2],
												animationData['rotation'][index * 4 + 3]
											]) * 180 / Math.PI
									}
									previousTime = animationData['time'][index]
								}
							})
							// console.log('현재정보', currentTime, previousTime, nextTime)
							interpolationValue = (currentTime - previousTime) / (nextTime - previousTime)
							// console.log('interpolationValue', interpolationValue)
							currentRotation = prevRotation + interpolationValue * (nextRotation - prevRotation)
							// console.log('currentRotation', currentRotation)
							tMesh.rotationZ = currentRotation
							requestAnimationFrame(aniTick)
						}
						requestAnimationFrame(aniTick)
					}
				})
			})
		}
		return function (redGLTFLoader, redGL, json, callBack) {
			console.log('파싱시작', redGLTFLoader['path'] + redGLTFLoader['fileName']);
			console.log('rawData', json);
			checkAsset(json);
			getBaseResource(redGLTFLoader, json,
				function () {
					// 리소스 로딩이 완료되면 다음 진행
					parseScene(redGLTFLoader, json)
					parseAnimation(redGLTFLoader, json)
					if ( callBack ) callBack();
				}
			)
			return {
				fileName: redGLTFLoader['fileName'],
				path: redGLTFLoader['path'],
				resultMesh: redGLTFLoader['resultMesh']
			}
		}
	})();
	Object.freeze(RedGLTFLoader);
})();