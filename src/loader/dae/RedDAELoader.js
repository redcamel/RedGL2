"use strict";
var RedDAELoader;
(function () {
	var parser, parseMaterial, parseMesh, parseAnimation, parseController, parseController2, parseVisualSceneInfo;
	var makePointList;
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
		if ( (!(this instanceof RedDAELoader)) ) return new RedDAELoader(redGL, path, fileName, callback)
		console.log('~~~~~~~~~~~')
		var self = this;
		var request = new XMLHttpRequest();
		request.open("GET", path + fileName, true);
		request.setRequestHeader("Content-Type", "application/xml; charset=UTF-8")
		request.onreadystatechange = function () {
			if ( request.readyState == 4 && request.status === 200 ) {
				console.log(request)
				console.log(request['responseText'])
				var t0 = new DOMParser();
				self['result'] = parser(self, redGL, t0.parseFromString(request['responseText'], "text/xml"))
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
		this['resultMesh']['name'] = 'instanceOfRedDAELoader_' + RedGL.makeUUID()
		this['result'] = null;
	}
	makePointList = function (parseSourceDatas) {
		var i, len;
		var t0;
		var tPosition, tNormal, tTexcoord;
		var pointList = [];
		var normalPointList = [];
		var uvPointList = [];
		// 구성을 찾고..
		t0 = parseSourceDatas[0].querySelector('float_array')
		tPosition = t0 ? t0.textContent.split(' ').map(Number) : null
		t0 = parseSourceDatas[1].querySelector('float_array')
		tNormal = t0 ? t0.textContent.split(' ').map(Number) : null
		t0 = parseSourceDatas[2].querySelector('float_array')
		tTexcoord = t0 ? t0.textContent.split(' ').map(Number) : null
		console.log('tPosition', tPosition)
		console.log('tNormal', tNormal)
		console.log('tTexcoord', tTexcoord)
		// 포인트를 만든다
		i = 0, len = tPosition.length / 3
		for ( i; i < len; i++ ) {
			pointList.push(
				[
					tPosition[i * 3 + 0],
					tPosition[i * 3 + 1],
					tPosition[i * 3 + 2]
				]
			)
		}
		if ( tNormal ) {
			i = 0, len = tNormal.length / 3
			for ( i; i < len; i++ ) {
				normalPointList.push(
					[
						tNormal[i * 3 + 0],
						tNormal[i * 3 + 1],
						tNormal[i * 3 + 2]
					]
				)
			}
		}
		if ( tTexcoord ) {
			i = 0, len = tTexcoord.length / 2
			for ( i; i < len; i++ ) {
				uvPointList.push([
					tTexcoord[i * 2 + 0],
					tTexcoord[i * 2 + 1]
				])
			}
			console.log('pointList', pointList)
			console.log('normalPointList', normalPointList)
			console.log('uvPointList', uvPointList)
		}
		return {
			pointList: pointList,
			normalPointList: normalPointList,
			uvPointList: uvPointList
		}
	}
	parseMaterial = (function () {
		var parseLibrary_images;
		var parseLibrary_effects;
		var parseLibrary_materials;
		parseLibrary_images = function (redGL, tRedDAELoader, rawData) {
			var map = {}
			var images = rawData.querySelectorAll('library_images image')
			images.forEach(function (v) {
				map[v.getAttribute('id')] = RedBitmapTexture(redGL, tRedDAELoader['path'] + v.querySelector('init_from').textContent)
			})
			return map
		}
		parseLibrary_effects = function (rawData, textureMap) {
			var map = {}
			var effects = rawData.querySelectorAll('library_effects effect')
			effects.forEach(function (v) {
				map[v.getAttribute('id')] = {
					texture: textureMap[v.querySelector('newparam init_from').textContent]
				}
			})
			return map
		}
		parseLibrary_materials = function (rawData, effectMap) {
			var map = {}
			var materials = rawData.querySelectorAll('library_materials material')
			materials.forEach(function (v) {
				console.log(v.querySelector('instance_effect').getAttribute('url').replace('#', ''))
				map[v.getAttribute('id')] = {
					effect: effectMap[v.querySelector('instance_effect').getAttribute('url').replace('#', '')]
				}
			})
			return map
		}
		return function (redGL, tRedDAELoader, rawData) {
			var textureMap = parseLibrary_images(redGL, tRedDAELoader, rawData)
			var effectMap = parseLibrary_effects(rawData, textureMap)
			var materialMap = parseLibrary_materials(rawData, effectMap)
			console.log('텍스쳐로 만들어야 할 녀석들', textureMap)
			console.log('이펙트', effectMap)
			console.log('재직', materialMap)
			return {
				textureMap: textureMap,
				effectMap: effectMap,
				materialMap: materialMap
			}
		}
	})();
	parseAnimation = function (rawData) {
		var map = {};
		var aniList = rawData.querySelectorAll('library_animations animation')
		aniList.forEach(function (tAni) {
			console.log('tAni', tAni)
			var float_arrayList = tAni.querySelectorAll('float_array')
			var tTimes, tMatrixSource, tMatrix, tInterpolate, tTarget;
			tTimes = float_arrayList[0].textContent.split(' ').map(Number)
			tMatrixSource = float_arrayList[1].textContent.split(' ')
			tMatrix = []
			tTimes.forEach(function (v, index) {
				tMatrix.push(tMatrixSource.slice(index * 16, index * 16 + 16).map(Number))
			})
			tInterpolate = tAni.querySelector('Name_array').textContent.split(' ')
			tTarget = tAni.querySelector('channel').getAttribute('target').split('/')[0]
			map[tAni.getAttribute('id')] = {
				time: tTimes,
				matrix: tMatrix,
				interpolate: tInterpolate,
				target: tTarget
			}
		})
		console.log('map', map)
		return map
	}
	parseController = function (redGL, rawData, resultMesh) {
		var map = {};
		var ctrList = rawData.querySelectorAll('library_controllers controller')
		var tList = []
		var vertex_weight = []
		ctrList.forEach(function (tController) {
			console.log('tController', tController)
			var tNames;
			var tTimes, tMatrixSource;
			var float_arrayList = tController.querySelectorAll('float_array')
			tTimes = float_arrayList[0].textContent.split(' ').map(Number)
			tNames = tController.querySelector('Name_array').textContent.split(' ')
			tMatrixSource = float_arrayList[1].textContent.split(' ')
			tNames.forEach(function (v, index) {
				var t0 = {
					name: v,
					tTime: tTimes,
					matrix: tMatrixSource.slice(index * 16, index * 16 + 16).map(Number),
					skeleton: RedMesh(redGL, RedSphere(redGL, 0.05), RedColorPhongMaterial(redGL)),
				}
				t0['skeleton']['matrix'] = t0['matrix']
				// t0['skeleton']['drawMode'] = redGL.gl.LINES
				t0['skeleton']['skeletonYn'] = true
				resultMesh.addChild(t0['skeleton'])
				tList.push(t0)
			})
			tList.forEach(function (v) {
				map[v['name']] = v
			})
		})
		console.log('ctr1 map', map)
		return map
	}
	parseController2 = function (rawData) {
		var map = {};
		var ctrList = rawData.querySelectorAll('library_controllers controller')
		ctrList.forEach(function (tController) {
			console.log('tController', tController)
			var float_arrayList = tController.querySelectorAll('float_array')
			// Get the name of the armature that this model is a child of
			var armatureName = tController.getAttribute('name')
			// Number of vertexes that need weights
			// # of (joint,weight) pairs to read for each vertex
			var jointWeightCounts = tController.querySelector('vcount').textContent.split(' ').map(Number)
			// An array of all possible weights (I think?)
			var weightsArray = float_arrayList[1].textContent.split(' ').map(Number)
			// Every (joint,weight). Use jointWeightCounts to know how many to read per vertex
			var parsedVertexJointWeights = []
			var jointsAndWeights = tController.querySelector('v').textContent.split(' ').map(Number)
			jointWeightCounts.forEach(function (_, index) {
				var numJointWeightsToRead = jointWeightCounts[index]
				parsedVertexJointWeights[index] = {}
				for ( var i = 0; i < numJointWeightsToRead; i++ ) {
					// The particular joint that we are dealing with, and its weighting on this vertex
					var jointNumber = jointsAndWeights.shift()
					var jointWeighting = jointsAndWeights.shift()
					parsedVertexJointWeights[index][jointNumber] = weightsArray[jointWeighting]
				}
			})
			// All of our model's joints
			var orderedJointNames = tController.querySelector('Name_array').textContent.split(' ')
			// Bind shape matrix (inverse bind matrix)
			var bindShapeMatrix = tController.querySelector('bind_shape_matrix').textContent.split(' ').map(Number)
			// The matrices that transforms each of our joints from world space to model space.
			// You typically multiply this with all parent joint bind poses.
			// We do this in `parse-skeletal-animations.js`
			var jointInverseBindPoses = {}
			var bindPoses = float_arrayList[0].textContent.split(' ').map(Number)
			// A way to look up each joint's index using it's name
			// This is useful for creating bone groups using names
			// but then easily converting them to their index within
			// the collada-dae-parser data structure.
			//  (collada-dae-parser uses index's and not names to store bone data)
			var jointNamePositionIndex = {}
			orderedJointNames.forEach(function (jointName, index) {
				// If we've already encountered this joint we skip it
				// this is meant to handle an issue where Blender was
				// exporting the same joint name twice for my right side bones that were
				// duplicates of my original left side bones. Still not sure when/wju
				// this happens. Must have done something strange. Doesn't happen to
				// every model..
				if ( jointNamePositionIndex[jointName] || jointNamePositionIndex[jointName] === 0 ) {
					return
				}
				var bindPose = bindPoses.slice(16 * index, 16 * index + 16)
				mat4.multiply(bindPose, bindShapeMatrix, bindPose)
				jointInverseBindPoses[index] = bindPose
				jointNamePositionIndex[jointName] = index
			})
			map = {
				bindShapeMatrix: bindShapeMatrix,
				parsedVertexJointWeights: parsedVertexJointWeights,
				jointInverseBindPoses: jointInverseBindPoses,
				jointNamePositionIndex: jointNamePositionIndex,
			}
		})
		console.log('ctr2 map', map)
		return map
	}
	parseVisualSceneInfo = (function () {
		var parse;
		parse = function (map, parentTargetInfo, list, targetList) {
			targetList.forEach(function (target) {
				var tInfo;
				var tSubTargetList = []
				var i = target.children.length
				tInfo = {
					name: target.getAttribute('id'),
					parent: parentTargetInfo,
					children: []
				}
				list.push(tInfo)
				while ( i-- ) {
					if ( target.children[i]['nodeName'] == 'node' ) tSubTargetList.push(target.children[i])
				}
				map[target.getAttribute('id')] = tInfo
				parse(map, tInfo, tInfo['children'], tSubTargetList)
			})
		}
		return function (rawData) {
			var nodeList = []
			var map = {}
			parse(map, null, nodeList, [rawData.querySelector('library_visual_scenes node node')])
			console.log('nodeList', nodeList)
			console.log('map', map)
			return map
		}
	})();
	parseMesh = function (tRedDAELoader, redGL, rawData) {
		var meshList = rawData.querySelectorAll('library_geometries geometry mesh')
		meshList.forEach(function (mesh) {
			var sourceList
			var pointInfo;
			var materialInfo;
			var meshMap = {}
			var aniInfo, controllerInfo, controllerInfo2;
			var visualSceneInfo;
			sourceList = mesh.querySelectorAll('source')
			// 포인트 리스트 만들기
			pointInfo = makePointList(sourceList)
			console.log('pointInfo', pointInfo)
			// 재질 관련 정보를 해석한다.
			materialInfo = parseMaterial(redGL, tRedDAELoader, rawData)
			// 폴리곤 해석
			var sourceNum = mesh.querySelectorAll('source').length;
			mesh.querySelectorAll('polylist').forEach(function (pData, pDataIndex) {
				var tInterleaveBufferData = []
				var tPolylistIndices = pData.querySelector('p').textContent.split(' ')
				var t_indexDataIndex = []
				var t_normalDataindex = []
				var t_coordDataIndex = []
				var tResultIndexData = []
				var tInterleaveBuffer;
				var tIndexBuffer;
				var tResultMesh;
				tPolylistIndices.forEach(function (v, index) {
					if ( index % sourceNum == 0 ) t_indexDataIndex.push(+v)
					else if ( index % sourceNum == 1 ) t_normalDataindex.push(+v)
					else if ( index % sourceNum === 2 ) t_coordDataIndex.push(+v)
				})
				// 버퍼데이터생성
				var idxMap = {}
				t_indexDataIndex.forEach(function (v, index) {
					tInterleaveBufferData[index * 8 + 0] = pointInfo['pointList'][v][0]
					tInterleaveBufferData[index * 8 + 1] = pointInfo['pointList'][v][1]
					tInterleaveBufferData[index * 8 + 2] = pointInfo['pointList'][v][2]
					// 해당인덱스에 해당하는 인터리브 버퍼상의 위치
					if ( !idxMap[v] ) idxMap[v] = []
					idxMap[v].push(index)
					tInterleaveBufferData[index * 8 + 3] = pointInfo['normalPointList'][t_normalDataindex[index]][0]
					tInterleaveBufferData[index * 8 + 4] = pointInfo['normalPointList'][t_normalDataindex[index]][1]
					tInterleaveBufferData[index * 8 + 5] = pointInfo['normalPointList'][t_normalDataindex[index]][2]
					tInterleaveBufferData[index * 8 + 6] = pointInfo['uvPointList'][t_coordDataIndex[index]][0]
					tInterleaveBufferData[index * 8 + 7] = pointInfo['uvPointList'][t_coordDataIndex[index]][1]
					tResultIndexData.push(index)
				})
				// 버퍼생성
				tInterleaveBuffer = RedBuffer(
					redGL,
					'daeInterleaveBuffer' + RedGL.makeUUID(),
					RedBuffer.ARRAY_BUFFER,
					new Float32Array(tInterleaveBufferData),
					[
						RedInterleaveInfo('aVertexPosition', 3),
						RedInterleaveInfo('aVertexNormal', 3),
						RedInterleaveInfo('aTexcoord', 2)
					]
				)
				tIndexBuffer = RedBuffer(
					redGL,
					'daeIndexData' + RedGL.makeUUID(),
					RedBuffer.ELEMENT_ARRAY_BUFFER,
					new Uint16Array(tResultIndexData)
				)
				tResultMesh = RedMesh(redGL)
				tResultMesh['geometry'] = RedGeometry(tInterleaveBuffer, tIndexBuffer)
				//TODO: 재질 결정 로직 들어가야함
				console.log('그래서 재질은?', pData.getAttribute('material'))
				var tTexture = materialInfo['materialMap'][pData.getAttribute('material')]['effect']['texture']
				console.log('그래서 텍스쳐는?', tTexture)
				tResultMesh['material'] = RedStandardMaterial(redGL, tTexture)
				// 대상 메쉬를 결과메쉬에 추가
				tRedDAELoader['resultMesh'].addChild(tResultMesh)
				// 씬해석
				visualSceneInfo = parseVisualSceneInfo(rawData)
				// 애니메이션해석
				aniInfo = parseAnimation(rawData)
				// 콘트롤러해석
				controllerInfo = parseController(redGL, rawData, tRedDAELoader['resultMesh'], tResultMesh)
				controllerInfo2 = parseController2(rawData)
				var aniIndex = 0
				var aniMax = aniInfo['Armature_mixamorig_HeadTop_End_pose_matrix']['time'].length
				// console.log('idxMap',idxMap)
				var makeMatrix = function (list, target) {
					// console.log('뭐가오나',visualSceneInfo[target])
					var tAniMatrix;
					for ( var k in aniInfo ) {
						if ( aniInfo[k]['target'] == controllerInfo[target]['name'] ) {
							tAniMatrix = aniInfo[k]['matrix'][aniIndex];
							break
						}
					}
					list.push({
						name: controllerInfo[target]['name'],
						matrix: tAniMatrix
					})
					if ( visualSceneInfo[target]['parent'] ) makeMatrix(list, visualSceneInfo[target]['parent']['name'])
				}
				console.log('idxMap', idxMap)
				setInterval(function () {
					// console.log()
					var i = 0
					var mtxMap = {}
					for ( var k in aniInfo ) {
						if ( aniInfo[k]['target'] && controllerInfo[aniInfo[k]['target']] ) {
							var skeletonMatrix = mat4.create()
							var parentMTX2 = mat4.create()
							var mtxList = []
							makeMatrix(mtxList, aniInfo[k]['target'])
							// mtxList.reverse()
							// console.log('mtxList',mtxList)
							mtxList.forEach(function (v, index) {
								mat4.multiply(skeletonMatrix, skeletonMatrix, v['matrix'])
								parentMTX2 = mat4.clone(v['matrix'])
							})
							mat4.transpose(skeletonMatrix, skeletonMatrix, skeletonMatrix)
							// console.log(mtxList)
							controllerInfo[aniInfo[k]['target']]['skeleton']['matrix'] = skeletonMatrix
							var tControllIndex = controllerInfo2['jointNamePositionIndex'][aniInfo[k]['target']]
							var tInversePose = controllerInfo2['jointInverseBindPoses'][tControllIndex]
							mtxMap[tControllIndex] = {
								jointNamePositionIndex: tControllIndex,
								inversePose: tInversePose,
								skeletonMatrix: skeletonMatrix,
								parentMTX2: parentMTX2,
								tMatrix: mtxList[0],
								bindShapeMatrix: controllerInfo2['bindShapeMatrix']
							}
						}
						i++
					}
					// console.log(mtxMap)
					var time = (new Date()).getTime()
					tResultMesh['geometry']['interleaveBuffer'].upload(tInterleaveBuffer['data'])
					aniIndex++
					if ( aniMax == aniIndex ) aniIndex = 0
				}, 16)
			})
		})
	}
	parser = function (tRedDAELoader, redGL, rawData) {
		console.log('파싱시작', tRedDAELoader['path'] + tRedDAELoader['fileName'])
		var meshs = parseMesh(tRedDAELoader, redGL, rawData)
		var parsedData = {}
		return {
			fileName: tRedDAELoader['fileName'],
			path: tRedDAELoader['path'],
			resultMesh: tRedDAELoader['resultMesh']
			// rawData: rawData,
			// indexS: {
			//     // index: indexDataIndex,
			//     // normal: normalDataindex,
			//     // coord: coordDataIndex
			// },
			// rawData: {
			//     position: parseSourceDatas[0].querySelector('float_array').textContent.split(' ').map(Number),
			//     normal: parseSourceDatas[1].querySelector('float_array').textContent.split(' ').map(Number),
			//     coord: parseSourceDatas[2].querySelector('float_array').textContent.split(' ').map(Number)
			// }
		}
	}
	Object.freeze(RedDAELoader)
})()