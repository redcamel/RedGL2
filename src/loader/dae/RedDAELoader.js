/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.6.13 11:7
 */

"use strict";
var RedDAELoader;
(function () {
	var parser, parseMaterial, parseMesh;
	var makePointList;
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedDAELoader`,
		 description : `
			 DAE 로더.
			 애니메이션은 지원하지 않음(GLTF만 지원)
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 path : [
				 {type:'String'},
				 '파일이 위치한 경로'
			 ],
			 fileName : [
				 {type:'String'},
				 '파일이름'
			 ],
			 callback : [
				 {type:'Function'},
				 '로딩완료시 실행될 콜백'
			 ]
		 },
		 demo : '../example/loader/dae/RedDAELoader.html',
		 example : `
			// DAE 로딩
			RedDAELoader(
				RedGL Instance, // redGL
				assetPath + 'dae/', // assetRootPath
				'test1.dae', // fileName
				function (v) { // callback
					console.log('로딩성공', v);
					(RedScene Instance).addChild(v['resultMesh']);
				}
			)
		 `,
		 return : 'void'
	 }
	 :DOC*/

	RedDAELoader = function (redGL, path, fileName, callback) {
		if ((!(this instanceof RedDAELoader))) return new RedDAELoader(redGL, path, fileName, callback);
		var fullPath = path + fileName;
		console.time('RedDAELoader' + fullPath);
		console.group('RedDAELoader' + fullPath);
		var self = this;
		var request = new XMLHttpRequest();
		request.open("GET", fullPath, true);
		request.setRequestHeader("Content-Type", "application/xml; charset=UTF-8");
		request.onreadystatechange = function () {
			if (request.readyState === 4 && request.status === 200) {
				console.log('loaded', fullPath, request);
				// console.log(request['responseText']);
				var t0 = new DOMParser();
				self['result'] = parser(self, redGL, t0.parseFromString(request['responseText'], "text/xml"));
				if (callback) {
					callback(self['result'])
				}
				console.timeEnd('RedDAELoader' + fullPath);
				console.groupEnd();
			} else {
				console.log('loading', fullPath, request)
			}
		};
		request.send();
		this['path'] = path;
		this['fileName'] = fileName;
		this['callback'] = callback;
		this['resultMesh'] = RedMesh(redGL);
		this['resultMesh']['name'] = 'instanceOfRedDAELoader_' + RedGL.makeUUID();
		this['result'] = null;
	};
	makePointList = function (parseSourceDatas) {
		var i, len, offset;
		var t0;
		var tPosition, tNormal, tTexcoord;
		var pointList = [];
		var normalPointList = [];
		var uvPointList = [];
		// 구성을 찾고..
		t0 = parseSourceDatas[0].querySelector('float_array');
		tPosition = t0 ? t0.textContent.split(' ').map(Number) : null;
		t0 = parseSourceDatas[1].querySelector('float_array');
		tNormal = t0 ? t0.textContent.split(' ').map(Number) : null;
		t0 = parseSourceDatas[2].querySelector('float_array');
		tTexcoord = t0 ? t0.textContent.split(' ').map(Number) : null;
		console.log('tPosition', tPosition);
		console.log('tNormal', tNormal);
		console.log('tTexcoord', tTexcoord);
		// 포인트를 만든다
		i = 0;
		len = tPosition.length / 3;
		for (i; i < len; i++) {
			offset = i * 3;
			pointList.push(
				[
					tPosition[offset],
					tPosition[offset + 1],
					tPosition[offset + 2]
				]
			)
		}
		if (tNormal) {
			i = 0;
			len = tNormal.length / 3;
			for (i; i < len; i++) {
				offset = i * 3;
				normalPointList.push(
					[
						tNormal[offset],
						tNormal[offset + 1],
						tNormal[offset + 2]
					]
				)
			}
		}
		if (tTexcoord) {
			i = 0;
			len = tTexcoord.length / 2;
			for (i; i < len; i++) {
				offset = i * 2;
				uvPointList.push([
					tTexcoord[offset],
					1 - tTexcoord[offset + 1]
				])
			}
			console.log('pointList', pointList);
			console.log('normalPointList', normalPointList);
			console.log('uvPointList', uvPointList)
		}
		return {
			pointList: pointList,
			normalPointList: normalPointList,
			uvPointList: uvPointList
		}
	};
	parseMaterial = (function () {
		var parseLibrary_images;
		var parseLibrary_effects;
		var parseLibrary_materials;
		parseLibrary_images = function (redGL, tRedDAELoader, rawData) {
			var map = {};
			var images = rawData.querySelectorAll('library_images image');
			images.forEach(function (v) {
				map[v.getAttribute('id')] = RedBitmapTexture(redGL, tRedDAELoader['path'] + v.querySelector('init_from').textContent)
			});
			return map
		};
		parseLibrary_effects = function (rawData, textureMap) {
			var map = {};
			var effects = rawData.querySelectorAll('library_effects effect');
			effects.forEach(function (v) {
				if (v.querySelector('newparam init_from')) {
					map[v.getAttribute('id')] = {
						texture: textureMap[v.querySelector('newparam init_from').textContent]
					}
				}
			});
			return map
		};
		parseLibrary_materials = function (rawData, effectMap) {
			var map = {};
			var materials = rawData.querySelectorAll('library_materials material');
			materials.forEach(function (v) {
				console.log(v.querySelector('instance_effect').getAttribute('url').replace('#', ''));
				map[v.getAttribute('id')] = {
					effect: effectMap[v.querySelector('instance_effect').getAttribute('url').replace('#', '')]
				}
			});
			return map
		};
		return function (redGL, tRedDAELoader, rawData) {
			var textureMap = parseLibrary_images(redGL, tRedDAELoader, rawData);
			var effectMap = parseLibrary_effects(rawData, textureMap);
			var materialMap = parseLibrary_materials(rawData, effectMap);
			console.log('텍스쳐로 만들어야 할 녀석들', textureMap);
			console.log('이펙트', effectMap);
			console.log('재직', materialMap);
			return {
				textureMap: textureMap,
				effectMap: effectMap,
				materialMap: materialMap
			}
		}
	})();
	parseMesh = function (tRedDAELoader, redGL, rawData) {
		console.time('parseMesh');
		var meshList = rawData.querySelectorAll('library_geometries geometry mesh');
		meshList.forEach(function (mesh) {
			var sourceList;
			var pointInfo;
			var materialInfo;
			sourceList = mesh.querySelectorAll('source');
			// 포인트 리스트 만들기
			pointInfo = makePointList(sourceList);
			console.log('pointInfo', pointInfo);
			// 재질 관련 정보를 해석한다.
			materialInfo = parseMaterial(redGL, tRedDAELoader, rawData);
			// 폴리곤 해석
			var sourceNum = mesh.querySelectorAll('source').length;
			mesh.querySelectorAll('polylist').forEach(function (pData) {
				var tInterleaveBufferData = [];
				var tPolylistIndices = pData.querySelector('p').textContent.split(' ');
				var t_indexDataIndex = [];
				var t_normalDataindex = [];
				var t_coordDataIndex = [];
				var tResultIndexData = [];
				var tInterleaveBuffer;
				var tIndexBuffer;
				var tResultMesh;
				var offset;
				tPolylistIndices.forEach(function (v, index) {
					if (index % sourceNum === 0) t_indexDataIndex.push(+v);
					else if (index % sourceNum === 1) t_normalDataindex.push(+v);
					else if (index % sourceNum === 2) t_coordDataIndex.push(+v)
				});
				// 버퍼데이터생성
				var idxMap = {};
				t_indexDataIndex.forEach(function (v, index) {
					offset = v * 8;
					tInterleaveBufferData[offset] = pointInfo['pointList'][v][0];
					tInterleaveBufferData[offset + 1] = pointInfo['pointList'][v][1];
					tInterleaveBufferData[offset + 2] = pointInfo['pointList'][v][2];
					// 해당인덱스에 해당하는 인터리브 버퍼상의 위치
					if (!idxMap[v]) idxMap[v] = [];
					idxMap[v].push(index);
					tInterleaveBufferData[offset + 3] = pointInfo['normalPointList'][t_normalDataindex[index]][0];
					tInterleaveBufferData[offset + 4] = pointInfo['normalPointList'][t_normalDataindex[index]][1];
					tInterleaveBufferData[offset + 5] = pointInfo['normalPointList'][t_normalDataindex[index]][2];
					tInterleaveBufferData[offset + 6] = pointInfo['uvPointList'][t_coordDataIndex[index]][0];
					tInterleaveBufferData[offset + 7] = pointInfo['uvPointList'][t_coordDataIndex[index]][1];
					tResultIndexData.push(v)
				});
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
				);
				tIndexBuffer = RedBuffer(
					redGL,
					'daeIndexData' + RedGL.makeUUID(),
					RedBuffer.ELEMENT_ARRAY_BUFFER,
					new Uint16Array(tResultIndexData)
				);
				tResultMesh = RedMesh(redGL);
				tResultMesh['geometry'] = RedGeometry(tInterleaveBuffer, tIndexBuffer);
				console.log('그래서 재질은?', pData.getAttribute('material'));
				if (materialInfo['materialMap'][pData.getAttribute('material')]['effect']) {
					var tTexture = materialInfo['materialMap'][pData.getAttribute('material')]['effect']['texture'];
					tResultMesh['material'] = RedStandardMaterial(redGL, tTexture)
				} else tResultMesh['material'] = RedColorPhongMaterial(redGL);
				console.log('그래서 텍스쳐는?', tTexture);
				// 대상 메쉬를 결과메쉬에 추가
				tRedDAELoader['resultMesh'].addChild(tResultMesh)
			})
		});
		console.timeEnd('parseMesh')
	};
	parser = function (tRedDAELoader, redGL, rawData) {
		var result;
		console.group('RedDAELoader - parse: ' + tRedDAELoader['path'] + tRedDAELoader['fileName']);
		parseMesh(tRedDAELoader, redGL, rawData);
		result = {
			fileName: tRedDAELoader['fileName'],
			path: tRedDAELoader['path'],
			resultMesh: tRedDAELoader['resultMesh']
		};
		console.groupEnd();
		return result;
	};
	Object.freeze(RedDAELoader)
})();