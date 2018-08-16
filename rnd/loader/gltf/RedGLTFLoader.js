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
		this['uris'] = {
			buffers: []
		};
		this['redGL'] = redGL;
		this['groups'] = []
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
		var makeMesh;
		var parseAnimation;
		var parseNode;
		var checkTRSAndMATRIX;
		/*
			glTF는 asset 속성이 있어야한다.
			최소한 버전을 반드시 포함해야함.
		 */
		checkAsset = function (json) {
			// console.log(json)
			if ( json['asset'] === undefined ) RedGLUtil.throwFunc('RedGLTFLoader - asset은 반드시 정의되어야함')
			if ( json['asset'].version[0] < 2 ) RedGLUtil.throwFunc('RedGLTFLoader - asset의 버전은 2.0이상이어야함')
		}
		getBufferResources = function (redGLTFLoader, data, callback) {
			var allNum = 0, loadedNum = 0
			var tList = []
			data['buffers'].forEach(function (v, index) {
				v['_redURIkey'] = 'buffers'
				v['_redURIIndex'] = index
				tList.push(v)
			})
			tList.forEach(function (v) {
				console.log('버퍼테이터', v)
				allNum++
				var tSrc = v['uri'].substr(0, 5) == 'data:' ? v['uri'] : redGLTFLoader['path'] + v['uri']
				// console.log('tSrc', tSrc)
				arrayBufferLoader(
					tSrc,
					function (request) {
						loadedNum++
						console.log(request)
						// console.log(request.response)
						redGLTFLoader['uris'][v['_redURIkey']][v['_redURIIndex']] = new DataView(request.response);
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
					case 'images ' :
						console.log('TODO : images 내부 리소스 로딩');
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
				parseNode(redGLTFLoader, json, nodeIndex, json['nodes'][nodeIndex], redGLTFLoader['resultMesh'])
			})
		}
		checkTRSAndMATRIX = (function () {
			var rotationMTX = mat4.create()
			var tRotation = [0, 0, 0]
			var tQuaternion = []
			var tScale = []
			var tMatrix
			return function (target, info) {
				if ( 'matrix' in info ) {
					// parseMatrix
					tMatrix = info['matrix']
					mat4.getRotation(tQuaternion, tMatrix)
					RedGLUtil.quaternionToRotationMat4(tQuaternion, rotationMTX)
					RedGLUtil.mat4ToEuler(rotationMTX, tRotation)
					target.rotationX = -(tRotation[0] * 180 / Math.PI)
					target.rotationY = -(tRotation[1] * 180 / Math.PI)
					target.rotationZ = -(tRotation[2] * 180 / Math.PI)
					target.x = tMatrix[12]
					target.y = tMatrix[13]
					target.z = tMatrix[14]
					mat4.getScaling(tScale, tMatrix)
					target.scaleX = tScale[0]
					target.scaleY = tScale[1]
					target.scaleZ = tScale[2]
				}
				if ( 'rotation' in info ) {
					// 로데이션은 쿼터니언으로 들어온다.
					tQuaternion = info['rotation'];
					RedGLUtil.quaternionToRotationMat4(tQuaternion, rotationMTX)
					RedGLUtil.mat4ToEuler(rotationMTX, tRotation)
					target.rotationX = -(tRotation[0] * 180 / Math.PI)
					target.rotationY = -(tRotation[1] * 180 / Math.PI)
					target.rotationZ = -(tRotation[2] * 180 / Math.PI)
				}
				if ( 'translation' in info ) {
					// 위치 쿼터니언으로 들어온다.
					target.x = info['translation'][0];
					target.y = info['translation'][1];
					target.z = info['translation'][2];
				}
				if ( 'scale' in info ) {
					target.scaleX = info['scale'][0];
					target.scaleY = info['scale'][1];
					target.scaleZ = info['scale'][2];
				}
			}
		})();
		parseNode = function (redGLTFLoader, json, nodeIndex, info, parentMesh) {
			if ( 'children' in info ) {
				var tGroup
				console.log('차일드 정보로 구성된 정보임', info)
				if ( !redGLTFLoader['groups'][nodeIndex] ) {
					tGroup = RedMesh(redGLTFLoader['redGL'])
					parentMesh.addChild(tGroup)
					redGLTFLoader['groups'][nodeIndex] = tGroup
					redGLTFLoader['groups'][nodeIndex]['name'] = 'group' + nodeIndex
					redGLTFLoader['groups'][nodeIndex]['byIndex'] = nodeIndex
				} else {
					tGroup = redGLTFLoader['groups'][nodeIndex]
				}
				checkTRSAndMATRIX(tGroup, info)
				// tGroup.matrix = matrix
				// tGroup.autoUpdateMatrix = false
				info['children'].forEach(function (index) {
					parseNode(redGLTFLoader, json, index, info = json['nodes'][index], tGroup)
				})
			} else if ( 'mesh' in info ) {
				var tMeshIndex = info['mesh']
				// console.log('nodeInfo', info)
				// console.log('parentMesh', parentMesh)
				makeMesh(redGLTFLoader, json, json['meshes'][tMeshIndex]).forEach(function (tMesh) {
					parentMesh.addChild(tMesh)
					// console.log("메쉬인덱스를 찾음", tMeshIndex, parentMesh)
					checkTRSAndMATRIX(tMesh, info)
					// tMesh.matrix = matrix
					// tMesh.autoUpdateMatrix = false
				})
			} else {
				console.log('파싱대상이 아님', info)
			}
		}
		makeMesh = function (redGLTFLoader, json, meshData) {
			// console.log('parseMesh :')
			// console.log(meshData)
			var tName
			if ( meshData['name'] ) tName = meshData['name']
			var tMeshList = []
			meshData['primitives'].forEach(function (v, index) {
				var tMesh;
				var tMaterial
				var indices = []
				var vertices = []
				var uvs = []
				var normals = []
				var tDrawMode;
				// console.log(v, index)
				if ( v['attributes'] ) {
					// console.log('TODO: 어트리뷰트 파싱')
					for ( var k in v['attributes'] ) {
						// console.log(k, '파싱')
						// 버퍼뷰의 위치를 말하므로...이를 추적파싱항
						var accessorIndex = v['attributes'][k]
						var tAccessors = json['accessors'][accessorIndex]
						var tBufferView = json['bufferViews'][tAccessors['bufferView']]
						var tBufferIndex = tBufferView['buffer']
						var tBuffer = json['buffers'][tBufferIndex]
						var tBufferURIDataView;
						if ( tBuffer['uri'] ) {
							tBufferURIDataView = redGLTFLoader['uris']['buffers'][tBufferIndex]
						}
						// console.log('해당 bufferView 정보', tBufferView)
						// console.log('바라볼 버퍼 인덱스', tBufferIndex)
						// console.log('바라볼 버퍼', tBuffer)
						// console.log('바라볼 버퍼데이터', tBufferURIDataView)
						// console.log('바라볼 엑세서', tAccessors)
						////////////////////////////
						var i, len;
						var tComponentType
						var tMethod;
						tComponentType = WEBGL_COMPONENT_TYPES[tAccessors['componentType']]
						if ( tComponentType == Float32Array ) tMethod = 'getFloat32'
						// console.log('tComponentType', tComponentType)
						// console.log('tMethod', tMethod)
						// console.log("tBufferView['byteOffset']", tBufferView['byteOffset'])
						// console.log("tAccessors['byteOffset']", tAccessors['byteOffset'])
						var tAccessorBufferOffset = tAccessors['byteOffset'] || 0
						i = (tBufferView['byteOffset'] + tAccessorBufferOffset) / tComponentType['BYTES_PER_ELEMENT']
						switch ( tAccessors['type'] ) {
							case 'VEC3' :
								len = i + ( tComponentType['BYTES_PER_ELEMENT'] * tAccessors['count']) / tComponentType['BYTES_PER_ELEMENT'] * 3
								console.log(k, i, len)
								for ( i; i < len; i++ ) {
									if ( k == 'NORMAL' ) normals.push(tBufferURIDataView[tMethod](i * tComponentType['BYTES_PER_ELEMENT'], true))
									else if ( k == 'POSITION' ) vertices.push(tBufferURIDataView[tMethod](i * tComponentType['BYTES_PER_ELEMENT'], true))
								}
								// console.log('인터리브 버퍼 데이터', vertices)
								break
							case 'VEC2' :
								len = i + ( tComponentType['BYTES_PER_ELEMENT'] * tAccessors['count']) / tComponentType['BYTES_PER_ELEMENT'] * 2
								// console.log(i, len)
								for ( i; i < len; i++ ) {
									if ( k == 'TEXCOORD_0' ) {
										if ( i % 2 == 0 ) uvs.push(tBufferURIDataView[tMethod](i * tComponentType['BYTES_PER_ELEMENT'], true))
										else uvs.push(-tBufferURIDataView[tMethod](i * tComponentType['BYTES_PER_ELEMENT'], true))
									}
								}
								// console.log('인터리브 버퍼 데이터', vertices)
								break
							default :
								console.log('알수없는 형식 엑세서 타입', tAccessors['type'])
								break
						}
					}
				}
				if ( 'indices' in v ) {
					// console.log('TODO: 인덱스 파싱')
					// 버퍼뷰의 위치를 말하므로...이를 추적파싱항
					var accessorIndex = v['indices']
					var tAccessors = json['accessors'][accessorIndex]
					var tBufferView = json['bufferViews'][tAccessors['bufferView']]
					var tBufferIndex = tBufferView['buffer']
					var tBuffer = json['buffers'][tBufferIndex]
					var tBufferURIDataView;
					if ( tBuffer['uri'] ) {
						tBufferURIDataView = redGLTFLoader['uris']['buffers'][tBufferIndex]
					}
					// console.log('해당 bufferView 정보', tBufferView)
					// console.log('바라볼 버퍼 인덱스', tBufferIndex)
					// console.log('바라볼 버퍼', tBuffer)
					// console.log('바라볼 버퍼데이터', tBufferURIDataView)
					// console.log('바라볼 엑세서', tAccessors)
					////////////////////////////
					var i, len
					var tComponentType = WEBGL_COMPONENT_TYPES[tAccessors['componentType']]
					var tMethod;
					if ( tComponentType == Uint16Array ) tMethod = 'getUint16'
					else if ( tComponentType == Uint8Array ) tMethod = 'getUint8'
					// console.log('tComponentType', tComponentType)
					var tAccessorBufferOffset = tAccessors['byteOffset'] || 0
					i = (tBufferView['byteOffset'] + tAccessorBufferOffset) / tComponentType['BYTES_PER_ELEMENT']
					switch ( tAccessors['type'] ) {
						case 'SCALAR' :
							len = i + ( tComponentType['BYTES_PER_ELEMENT'] * tAccessors['count']) / tComponentType['BYTES_PER_ELEMENT']
							// console.log(i, len)
							for ( i; i < len; i++ ) {
								indices.push(tBufferURIDataView[tMethod](i * tComponentType['BYTES_PER_ELEMENT'], true))
							}
							// console.log('인덱스버퍼 데이터', indices)
							break
						default :
							console.log('알수없는 형식 엑세서 타입', tAccessors)
							break
					}
				}
				if ( 'material' in v ) {
					var tIndex = v['material']
					var tMaterialInfo = json['materials'][tIndex]
					console.log('tMaterialInfo', tMaterialInfo)
					if ( 'baseColorTexture' in tMaterialInfo['pbrMetallicRoughness'] ) {
						var baseTextureIndex = tMaterialInfo['pbrMetallicRoughness']['baseColorTexture']['index']
						var baseTextureInfo = json['textures'][baseTextureIndex]
						var diffuseSourceIndex = baseTextureInfo['source']
						diffseTexture = RedBitmapTexture(redGLTFLoader['redGL'], json['images'][diffuseSourceIndex]['uri'])
						// var t0 = document.createElement('img')
						// t0.src = json['images'][diffuseSourceIndex]['uri']
						// t0.style.cssText = 'position:absolute;top:0px;left:0px;width:500px'
						// document.body.appendChild(t0)
					}
					var diffseTexture, normalTexture, roughnessTexture, emissiveTexture, occlusionTexture;
					if ( 'metallicRoughnessTexture' in tMaterialInfo['pbrMetallicRoughness'] ) {
						var roughnessTextureIndex = tMaterialInfo['pbrMetallicRoughness']['metallicRoughnessTexture']['index']
						var roughnessTextureInfo = json['textures'][roughnessTextureIndex]
						var roughnessSourceIndex = roughnessTextureInfo['source']
						roughnessTexture = RedBitmapTexture(redGLTFLoader['redGL'], json['images'][roughnessSourceIndex]['uri'])
						// var t0 = document.createElement('img')
						// t0.src = json['images'][roughnessSourceIndex]['uri']
						// t0.style.cssText = 'position:absolute;top:0px;left:0px;width:500px'
						// document.body.appendChild(t0)
					}
					var normalTextureIndex = tMaterialInfo['normalTexture']
					if ( normalTextureIndex != undefined ) {
						normalTextureIndex = normalTextureIndex['index']
						var normalTextureInfo = json['textures'][normalTextureIndex]
						var normalSourceIndex = normalTextureInfo['source']
						normalTexture = RedBitmapTexture(redGLTFLoader['redGL'], json['images'][normalSourceIndex]['uri'])
						// var t0 = document.createElement('img')
						// t0.src = json['images'][normalSourceIndex]['uri']
						// t0.style.cssText = 'position:absolute;top:0px;left:0px;width:500px'
						// document.body.appendChild(t0)
					}
					var emissiveTextureIndex = tMaterialInfo['emissiveTexture']
					if ( emissiveTextureIndex != undefined ) {
						emissiveTextureIndex = emissiveTextureIndex['index']
						var emissiveTextureInfo = json['textures'][emissiveTextureIndex]
						var emissiveSourceIndex = emissiveTextureInfo['source']
						emissiveTexture = RedBitmapTexture(redGLTFLoader['redGL'], json['images'][emissiveSourceIndex]['uri'])
						// var t0 = document.createElement('img')
						// t0.src = json['images'][emissiveSourceIndex]['uri']
						// t0.style.cssText = 'position:absolute;top:0px;left:0px;width:500px'
						// document.body.appendChild(t0)
					}
					var occlusionTextureIndex = tMaterialInfo['occlusionTexture']
					if ( occlusionTextureIndex != undefined ) {
						occlusionTextureIndex = occlusionTextureIndex['index']
						var occlusionTextureInfo = json['textures'][occlusionTextureIndex]
						var occlusionSourceIndex = occlusionTextureInfo['source']
						occlusionTexture = RedBitmapTexture(redGLTFLoader['redGL'], json['images'][occlusionSourceIndex]['uri'])
						// var t0 = document.createElement('img')
						// t0.src = json['images'][occlusionSourceIndex]['uri']
						// t0.style.cssText = 'position:absolute;top:0px;left:0px;width:500px'
						// document.body.appendChild(t0)
					}
					var metallicFactor,roughnessFactor
					if ( 'metallicFactor' in tMaterialInfo['pbrMetallicRoughness'] ) {
						metallicFactor = tMaterialInfo['pbrMetallicRoughness']['metallicFactor']
					}
					if ( 'roughnessFactor' in tMaterialInfo['pbrMetallicRoughness'] ) {
						roughnessFactor = tMaterialInfo['pbrMetallicRoughness']['roughnessFactor']
					}
					if ( diffseTexture ) {
						var env = RedBitmapCubeTexture(redGLTFLoader['redGL'], [
							'../asset/cubemap/SwedishRoyalCastle/px.jpg',
							'../asset/cubemap/SwedishRoyalCastle/nx.jpg',
							'../asset/cubemap/SwedishRoyalCastle/py.jpg',
							'../asset/cubemap/SwedishRoyalCastle/ny.jpg',
							'../asset/cubemap/SwedishRoyalCastle/pz.jpg',
							'../asset/cubemap/SwedishRoyalCastle/nz.jpg'
						])
						// Type	Description	Required
						// baseColorFactor	number [4]	The material's base color factor.	No, default: [1,1,1,1]
						// baseColorTexture	object	The base color texture.	No
						// metallicFactor	number	The metalness of the material.	No, default: 1
						// roughnessFactor	number	The roughness of the material.	No, default: 1
						// metallicRoughnessTexture	object	The metallic-roughness texture.	No
						tMaterial = RedPBRMaterial(redGLTFLoader['redGL'], diffseTexture, env, normalTexture, occlusionTexture, emissiveTexture, roughnessTexture, null)
						if ( !roughnessTexture ) tMaterial.metallicPower = metallicFactor;
					} else {
						var tColor
						if ( tMaterialInfo['pbrMetallicRoughness'] && tMaterialInfo['pbrMetallicRoughness']['baseColorFactor'] ) tColor = tMaterialInfo['pbrMetallicRoughness']['baseColorFactor']
						tColor = [(Math.random()), (Math.random()), (Math.random()), 1]
						tMaterial = RedColorPhongMaterial(redGLTFLoader['redGL'],
							RedGLUtil.rgb2hex(
								tColor[0] * 255,
								tColor[1] * 255,
								tColor[2] * 255
							),
							tColor[3]
						)
					}
				}
				if ( 'mode' in v ) {
					// 0 POINTS
					// 1 LINES
					// 2 LINE_LOOP
					// 3 LINE_STRIP
					// 4 TRIANGLES
					// 5 TRIANGLE_STRIP
					// 6 TRIANGLE_FAN
					// console.log('primitiveMode ', v['mode'])
					switch ( v['mode'] ) {
						case 0 :
							tDrawMode = redGLTFLoader['redGL'].gl.POINTS
							break
						case 1 :
							tDrawMode = redGLTFLoader['redGL'].gl.LINES
							break
						case 2 :
							tDrawMode = redGLTFLoader['redGL'].gl.LINE_LOOP
							break
						case 3 :
							tDrawMode = redGLTFLoader['redGL'].gl.LINE_STRIP
							break
						case 4 :
							tDrawMode = redGLTFLoader['redGL'].gl.TRIANGLES
							break
						case 5 :
							tDrawMode = redGLTFLoader['redGL'].gl.TRIANGLE_STRIP
							break
						case 6 :
							tDrawMode = redGLTFLoader['redGL'].gl.TRIANGLE_FAN
							break
					}
				}
				var normalData
				if ( normals.length ) normalData = normals
				else normalData = RedGLUtil.calculateNormals(vertices, indices)
				// console.log('vertices', vertices)
				// console.log('normalData', normalData)
				var interleaveData = []
				var i = 0, len = vertices.length / 3
				for ( i; i < len; i++ ) {
					interleaveData.push(vertices[i * 3 + 0], vertices[i * 3 + 1], vertices[i * 3 + 2])
					interleaveData.push(normalData[i * 3 + 0], normalData[i * 3 + 1], normalData[i * 3 + 2])
					if ( uvs.length ) interleaveData.push(uvs[i * 2 + 0], uvs[i * 2 + 1])
				}
				// console.log('interleaveData', interleaveData)
				var tGeo
				tGeo = RedGeometry(
					RedBuffer(
						redGLTFLoader['redGL'],
						'testGLTF_interleaveBuffer_' + RedGL.makeUUID(),
						RedBuffer.ARRAY_BUFFER,
						new Float32Array(interleaveData),
						uvs.length ? [
								RedInterleaveInfo('aVertexPosition', 3),
								RedInterleaveInfo('aVertexNormal', 3),
								RedInterleaveInfo('aTexcoord', 2)
							] : [
								RedInterleaveInfo('aVertexPosition', 3),
								RedInterleaveInfo('aVertexNormal', 3)
							]
					),
					RedBuffer(
						redGLTFLoader['redGL'],
						'testGLTF_indexBuffer_' + RedGL.makeUUID(),
						RedBuffer.ELEMENT_ARRAY_BUFFER,
						new Uint16Array(indices)
					)
				)
				if ( !tMaterial ) tMaterial = RedColorPhongMaterial(redGLTFLoader['redGL'], RedGLUtil.rgb2hex(parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255)))
				tMesh = RedMesh(redGLTFLoader['redGL'], tGeo, tMaterial)
				if ( tName ) tMesh.name = tName
				if ( tDrawMode ) tMesh.drawMode = tDrawMode
				else tMesh.drawMode = redGLTFLoader['redGL'].gl.TRIANGLES
				if ( meshData['doubleSided'] ) tMesh.useCullFace = false
				console.log('tMesh', tMesh)
				tMeshList.push(tMesh)
			})
			return tMeshList
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
					tBufferURIDataView = redGLTFLoader['uris']['buffers'][tBufferIndex]
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
			if ( !json['animations'] ) json['animations'] = []
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
			// console.log('rawData', json);
			checkAsset(json);
			getBaseResource(redGLTFLoader, json,
				function () {
					// 리소스 로딩이 완료되면 다음 진행
					parseScene(redGLTFLoader, json)
					// parseAnimation(redGLTFLoader, json)
					if ( callBack ) callBack();
				}
			)
			return {
				fileName: redGLTFLoader['fileName'],
				path: redGLTFLoader['path'],
				resultMesh: redGLTFLoader['resultMesh'],
				redGLTFLoader: redGLTFLoader
			}
		}
	})();
	Object.freeze(RedGLTFLoader);
})();