"use strict";
var RedOBJLoader;
(function () {
	var parser;
	var setMesh;
	var setMaterial;
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedOBJLoader`,
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
		 RedOBJLoader(RedGL Instance, '../asset/obj/gun/', 'Handgun_obj.obj', function (result) {
			 tScene3D.addChild(result['resultMesh'])
		 })
		 `,
		 return : 'void'
	 }
	 :DOC*/
	//TODO: 환경맵 파싱
	//TODO: bump 값 상세파싱
	RedOBJLoader = function (redGL, path, fileName, callback) {
		if ( (!(this instanceof RedOBJLoader)) ) return new RedOBJLoader(redGL, path, fileName, callback);
		console.log('~~~~~~~~~~~');
		var self = this;
		var request = new XMLHttpRequest();
		request.open("GET", path + fileName, true);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		request.onreadystatechange = function () {
			if ( request.readyState == 4 ) {
				self['result'] = parser(self, redGL, request.responseText);
				self['modelParsingComplete'] = true;
				if ( callback ) {
					if ( self['mtlLoader'] ) {
						if ( self['mtlLoader']['complete'] ) {
							console.log('모델 파싱 종료 & 재질 파싱 종료');
							callback(self['result']);
						}
						else console.log('모델 파싱 종료 & 재질 파싱중')
					} else {
						console.log('모델 파싱 종료 & 재질 없음');
						callback(self['result']);
					}
				}
			}
		};
		request.send();
		this['path'] = path;
		this['fileName'] = fileName;
		this['mtlLoader'] = null;
		this['modelParsingComplete'] = false;
		this['callback'] = callback;
		this['resultMesh'] = RedMesh(redGL);
		this['resultMesh']['name'] = 'instanceOfRedOBJLoader_' + RedGL.makeUUID();
		this['result'] = null;
	};
	setMaterial = function (redGL, tObjInfo, tMtlLoader) {
		// console.log(tObjInfo)
		// console.log('tMtlLoader', tMtlLoader)
		var k;
		var tMtlData, tMeshData;
		var cacheTexture;
		cacheTexture = {};
		for ( k in tObjInfo ) {
			var tMaterial;
			var tMesh;
			var tTexture;
			tMeshData = tObjInfo[k];
			tMesh = tMeshData['mesh'];
			if ( tMeshData['use'] && tMeshData['resultInterleave'].length ) {
				var r, g, b;
				var ableLight;
				ableLight = tMeshData['ableLight'];
				// console.log(tMeshData)
				// console.log('해석할 재질키', tMeshData['materialKey'])
				//
				tMtlData = tMtlLoader['parseData'][tMeshData['materialKey']];
				if ( tMtlData ) {
					if ( tMtlData['map_Kd'] ) {
						// 비트맵 기반으로 해석
						console.log('tMtlData', tMtlData);
						if ( cacheTexture[tMtlData['map_Kd']] ) tTexture = cacheTexture[tMtlData['map_Kd']];
						else {
							tTexture = RedBitmapTexture(redGL, tMtlData['map_Kd']);
							cacheTexture[tMtlData['map_Kd']] = tTexture;
						}
						if ( ableLight ) tMaterial = RedStandardMaterial(redGL, tTexture);
						else tMaterial = RedBitmapMaterial(redGL, tTexture);
					}
					else if ( tMtlData['Kd'] ) {
						// 컬러기반으로 해석
						r = tMtlData['Kd'][0] * 255;
						g = tMtlData['Kd'][1] * 255;
						b = tMtlData['Kd'][2] * 255;
						if ( ableLight ) tMaterial = RedColorPhongTextureMaterial(redGL, RedGLUtil.rgb2hex(r, g, b));
						else {
							if ( tMeshData['ableNormal'] ) tMaterial = RedColorPhongMaterial(redGL, RedGLUtil.rgb2hex(r, g, b));
							else tMaterial = RedColorMaterial(redGL, RedGLUtil.rgb2hex(r, g, b));
						}
					}
					if ( tMaterial ) {
						// 스페큘러텍스쳐
						if ( tMtlData['map_Ns'] ) {
							if ( cacheTexture[tMtlData['map_Ns']] ) tTexture = cacheTexture[tMtlData['map_Ns']];
							else {
								tTexture = RedBitmapTexture(redGL, tMtlData['map_Ns']);
								cacheTexture[tMtlData['map_Ns']] = tTexture;
							}
							tMaterial['specularTexture'] = tTexture;
						}
						if ( tMtlData['map_bump'] ) {
							if ( cacheTexture[tMtlData['map_bump']] ) tTexture = cacheTexture[tMtlData['map_bump']];
							else {
								tTexture = RedBitmapTexture(redGL, tMtlData['map_bump']);
								cacheTexture[tMtlData['map_bump']] = tTexture;
							}
							tMaterial['normalTexture'] = tTexture;
						}
						// shininess
						if ( tMtlData['Ns'] != undefined ) tMaterial['shininess'] = tMtlData['Ns'];
						// 메쉬에 재질 적용
						tMeshData['mesh']['material'] = tMaterial;
					}
				} else {
					console.log('스킵');
				}
			}
		}
	};
	setMesh = function (redGL, parentMesh, childrenInfo) {
		for ( var k in childrenInfo ) {
			var tData;
			tData = childrenInfo[k];
			// console.log('!!!', k, tData)
			var tMesh;
			if ( !tData['use'] ) {
				tMesh = RedMesh(redGL);
			} else {
				// 인터리브 버퍼 생성
				var tInterleaveInfo = [];
				var interleaveBuffer, indexBuffer;
				if ( tData['resultPosition'].length ) tInterleaveInfo.push(RedInterleaveInfo('aVertexPosition', 3));
				if ( tData['resultNormal'].length ) tInterleaveInfo.push(RedInterleaveInfo('aVertexNormal', 3));
				if ( tData['resultUV'].length ) tInterleaveInfo.push(RedInterleaveInfo('aTexcoord', 2));
				interleaveBuffer = RedBuffer(
					redGL,
					k + '_interleave',
					RedBuffer.ARRAY_BUFFER,
					new Float32Array(tData['resultInterleave'].length ? tData['resultInterleave'] : tData['resultPosition']),
					tInterleaveInfo
				);
				if ( tData['index'].length ) {
					// 인덱스 버퍼 생성
					if ( tData['index'].length ) {
						indexBuffer = RedBuffer(
							redGL,
							k + '_index',
							RedBuffer.ELEMENT_ARRAY_BUFFER,
							new Uint16Array(tData['index'])
						)
					}
				}
				var tempMaterial;
				if ( tData['resultUV'].length && tData['resultNormal'].length ) tempMaterial = RedColorPhongTextureMaterial(redGL, '#00ff00');
				else {
					if ( tData['resultNormal'] ) tempMaterial = RedColorPhongMaterial(redGL, '#00ff00');
					else tempMaterial = RedColorMaterial(redGL, '#0000ff');
				}
				tMesh = RedMesh(redGL, RedGeometry(interleaveBuffer, indexBuffer), tempMaterial);
				tData['ableUV'] = tData['resultUV'].length ? true : false;
				tData['ableNormal'] = tData['resultNormal'].length ? true : false;
				tData['ableLight'] = tData['ableUV'] & tData['ableNormal'] ? true : false;
			}
			tMesh['name'] = k;
			tData['mesh'] = tMesh;
			parentMesh.addChild(tMesh);
			requestAnimationFrame((function () {
				var t0 = redGL
				var t1 = tMesh
				var t2 = tData['childrenInfo']
				return function () {
					setMesh(t0, t1, t2);
				}
			})())
		}
	};
	var parseObj;
	parseObj = (function () {
		var regObject, regGroup;
		var regVertex, regNormal, redUV;
		var regIndex, regIndex2, regIndex3, regIndex4;
		var regMTLlib;
		var regUseMTL;
		regMTLlib = /^(mtllib )/;
		regUseMTL = /^(usemtl )/;
		regObject = /^o /;
		regGroup = /^g /;
		regVertex = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
		regNormal = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
		redUV = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
		regIndex = /f\s+(([\d]{1,}[\s]?){3,})+/;
		regIndex2 = /f\s+((([\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
		regIndex3 = /f\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
		regIndex4 = /f\s+((([\d]{1,}\/\/[\d]{1,}[\s]?){3,})+)/;
		return function (redGL, tRedOBJLoader, lineList) {
			var rawGroupInfo; // 단편 구조로 정보구성
			var hierarchyInfo; // 하이라키 구조로 정보구성
			var pointInfo;
			// 현재 바라볼 메쉬정보
			var currentMeshInfo;
			// 현재 그룹이름
			var currentGroupName;
			// 재질로더
			var tMTLLoader;
			// 전체 삼각형 구성정보.
			pointInfo = {
				position: [],
				normal: [],
				uv: [],
				//
				points: [],
				normalPoints: [],
				uvPoints: []
			};
			hierarchyInfo = {};
			rawGroupInfo = {};
			var i, len;
			var hasObjectName;
			// 이름이 존재하면 이름값으로 메쉬를 생성해서 시작하고
			// 존재하지 않으면 임의의 정보값을 생성해서 진행한다.
			i = lineList.length;
			while ( i-- ) {
				if ( regObject.test(lineList[i]) ) {
					hasObjectName = true;
					break
				}
			}
			if ( !hasObjectName ) {
				var tName;
				var tInfo;
				tName = 'objModel' + RedGL.makeUUID();
				tInfo = {
					name: tName,
					groupName: tName,
					index: [],
					position: [],
					resultPosition: [],
					resultNormal: [],
					resultUV: [],
					resultInterleave: [],
					use: true,
					childrenInfo: {}
				};
				hierarchyInfo[tName] = currentMeshInfo = tInfo;
				rawGroupInfo[tName] = currentMeshInfo;
				currentGroupName = tName;
			}
			// 라인별로 검색을 해나간다.
			i = 0;
			len = lineList.length;
			// lineList.forEach(function (tLine) {
			for ( i; i < len; i++ ) {
				var tLine = lineList[i]
				var tName;
				var tInfo;
				///////////////////////////////////////////////////////////////////
				// mtllib 외부 재질파일(mtl) 선언라인
				if ( regMTLlib.test(tLine) ) {
					console.log('regMtllib', '재질파일정보', tLine);
					tMTLLoader = RedMTLLoader(redGL, tRedOBJLoader['path'], tLine.split(' ')[1], function (v) {
						tRedOBJLoader['mtlLoader'] = v;
						if ( tRedOBJLoader['modelParsingComplete'] ) {
							if ( tRedOBJLoader['callback'] ) {
								console.log('재질에서 - 재질 파싱 종료 & 재질 파싱 종료');
								setMaterial(redGL, rawGroupInfo, tMTLLoader);
								tRedOBJLoader['callback'](tRedOBJLoader['result']);
							}
							else console.log('RedOBJLoader 콜백없음')
						} else console.log('재질에서 - 파싱 진행중 & 재질 파싱 종료')
					});
					tRedOBJLoader['mtlLoader'] = tMTLLoader;
					continue
				}
				///////////////////////////////////////////////////////////////////
				// usemtl 사용할 재질 이름 선언 라인
				if ( regUseMTL.test(tLine) ) {
					tName = tLine.split(' ').slice(1).join('').trim();
					rawGroupInfo[currentGroupName]['materialKey'] = tName;
					console.log('regUseMtl', tLine, '재질사용', regUseMTL.test(tLine), rawGroupInfo[currentGroupName]);
				}
				///////////////////////////////////////////////////////////////////
				// 그룹 선언 라인
				else if ( regGroup.test(tLine) ) {
					tName = tLine.split(' ').slice(1).join('').trim();
					// console.log('name', tName)
					// console.log('currentGroupName', currentGroupName)
					// 그룹으로 판정될 경우 현재 그룹은 컨테이너로만 사용한다.
					hierarchyInfo[currentGroupName]['use'] = false;
					/*
						그룹이름 : mesh6.002_mesh6-geometry_FrontColorNoCullingID__01_-_Default1noCulli
						MTL내부 재질 이름 : FrontColorNoCullingID__01_-_Default1noCulli
						키를 찾기위해서 그룹이름 + _ 를 제거한다 (mesh6.002_mesh6-geometry_)

					  */
					tInfo = {
						name: tName,
						groupName: currentGroupName,
						materialKey: tName.replace(currentGroupName + '_', ''),
						index: [],
						position: currentMeshInfo['position'],
						resultPosition: [],
						resultNormal: [],
						resultUV: [],
						resultInterleave: [],
						use: true,
						childrenInfo: {}
					};
					// 현재 메쉬 정보를 저장
					rawGroupInfo[tName] = currentMeshInfo = tInfo;
					// 현재 그룹의 자식정보에 현재 메쉬 정보 추가
					hierarchyInfo[currentGroupName]['childrenInfo'][tName] = currentMeshInfo;
					// 이름이없는 오브젝트가 처음으로 생성되었을떄 사용안함으로 변경함
					// console.log('regGroup', line, '신규그룹오브젝트', regGroup.test(line))
				}
				///////////////////////////////////////////////////////////////////
				// 오즈벡트 선언 라인
				else if ( regObject.test(tLine) ) {
					/*
						o mesh1.002_mesh1-geometry 과 같이 선언됨. 필요한 이름값만 잘라냄
						공백은 허용하지 않으므로 붙여버림
					 */
					tName = tLine.split(' ').slice(1).join('').trim();
					// console.log('name', tName)
					tInfo = {
						name: tName,
						groupName: tName,
						materialKey: tName,
						index: [],
						position: [],
						resultPosition: [],
						resultNormal: [],
						resultUV: [],
						resultInterleave: [],
						use: true,
						childrenInfo: {}
					};
					// 하이라키 정보에 추가
					hierarchyInfo[tName] = currentMeshInfo = tInfo;
					// 현재 메쉬 정보 저장
					rawGroupInfo[tName] = currentMeshInfo;
					// 현재 그룹이름을 현재 오브젝트 이름으로 설정
					currentGroupName = tName;
					// console.log('regObject', line, '신규오브젝트', regObject.test(line))
				}
				///////////////////////////////////////////////////////////////////
				// 포지션 검색
				if ( regVertex.test(tLine) ) {
					/*
						v 15.257854 104.640892 8.680023
						- 버텍스 값은 유일값임으로 무조건 추가한다.
						- 현재 대상메쉬에 버텍스를 추가한다.
						- 포인트 정보의 마지막에 배열로 [x,y,z]를 추가해둔다. ( 삼각형 인덱스로 찾을때 이포인트 위치를 기준으로 매칭한다.)
					 */
					var tPosition;
					var tLocation;
					tPosition = tLine.split(' ');
					tLocation = pointInfo['position'].length;
					pointInfo['position'][tLocation] = +tPosition[1];
					pointInfo['position'][tLocation + 1] = +tPosition[2];
					pointInfo['position'][tLocation + 2] = +tPosition[3];
					//
					currentMeshInfo['position'][tLocation] = +tPosition[1];
					currentMeshInfo['position'][tLocation + 1] = +tPosition[2];
					currentMeshInfo['position'][tLocation + 2] = +tPosition[3];
					//
					pointInfo['points'][pointInfo['points'].length] = [+tPosition[1], +tPosition[2], +tPosition[3]];
					// console.log('regVertex', line, regVertex.test(line))
				}
				// 노말 검색
				else if ( regNormal.test(tLine) ) {
					/*
						vn 0.945372 0.300211 0.126926
						- 포지션 검색과 논리는 같음
					*/
					var tNormal;
					var tLocation;
					tNormal = tLine.split(' ');
					tLocation = pointInfo['normal'].length;
					pointInfo['normal'][tLocation] = +tNormal[1];
					pointInfo['normal'][tLocation + 1] = +tNormal[2];
					pointInfo['normal'][tLocation + 2] = +tNormal[3];
					pointInfo['normalPoints'][pointInfo['normalPoints'].length] = [+tNormal[1], +tNormal[2], +tNormal[3]];
					// console.log('regNormal', line, regNormal.test(line))
				}
				//UV 검색
				else if ( redUV.test(tLine) ) {
					/*
						vt 0.945372 0.300211
						- 포지션 검색과 논리는 같음
					*/
					var tUV;
					var tLocation;
					tUV = tLine.split(' ');
					tLocation = pointInfo['uv'].length;
					pointInfo['uv'][tLocation] = +tUV[1];
					pointInfo['uv'][tLocation + 1] = +tUV[2];
					pointInfo['uvPoints'][pointInfo['uvPoints'].length] = [+tUV[1], +tUV[2]];
					// console.log('redUV', line, redUV.test(line))
				}
				// 인덱스 검색 1//1 1//1 1//1 v//n
				else if ( regIndex4.test(tLine) ) {
					var tData;
					var tIndex, tNIndex;
					var i2, len2, i2ParseData;
					var tLocation;
					tData = tLine.split(' ').slice(1, 4);
					i2 = 0;
					len2 = tData.length;
					for ( i2; i2 < len2; i2++ ) {
						// tData.forEach(function (i2ParseData) {
						var tPoint, tNormalPoint;
						var max;
						i2ParseData = tData[i2]
						max = 0;
						i2ParseData = i2ParseData.split('/');
						tIndex = +i2ParseData[0] - 1;
						tNIndex = +i2ParseData[2] - 1;
						tPoint = pointInfo['points'][tIndex];
						tNormalPoint = pointInfo['normalPoints'][tNIndex];
						if ( pointInfo['position'].length ) max += 3;
						if ( pointInfo['normal'].length ) max += 3;
						//
						tLocation = currentMeshInfo['index'].length;
						currentMeshInfo['index'][tLocation] = currentMeshInfo['resultInterleave'].length / max;
						//
						if ( pointInfo['position'].length ) {
							tLocation = currentMeshInfo['resultPosition'].length;
							currentMeshInfo['resultPosition'][tLocation] = tPoint[0]
							currentMeshInfo['resultPosition'][tLocation + 1] = tPoint[1]
							currentMeshInfo['resultPosition'][tLocation + 2] = tPoint[2]
							//
							tLocation = currentMeshInfo['resultInterleave'].length;
							currentMeshInfo['resultInterleave'][tLocation] = tPoint[0]
							currentMeshInfo['resultInterleave'][tLocation + 1] = tPoint[1]
							currentMeshInfo['resultInterleave'][tLocation + 2] = tPoint[2]
						}
						if ( pointInfo['normal'].length ) {
							tLocation = currentMeshInfo['resultNormal'].length;
							currentMeshInfo['resultNormal'][tLocation] = tNormalPoint[0]
							currentMeshInfo['resultNormal'][tLocation + 1] = tNormalPoint[1]
							currentMeshInfo['resultNormal'][tLocation + 2] = tNormalPoint[2]
							//
							tLocation = currentMeshInfo['resultInterleave'].length;
							currentMeshInfo['resultInterleave'][tLocation] = tNormalPoint[0]
							currentMeshInfo['resultInterleave'][tLocation + 1] = tNormalPoint[1]
							currentMeshInfo['resultInterleave'][tLocation + 2] = tNormalPoint[2]
						}
						// });
					}
					// console.log(tData)
					// console.log('regIndex4', line, regIndex4.test(line))
				}
				// 인덱스 검색 1/1/1 1/1/1 1/1/1  v/uv/n
				else if ( regIndex3.test(tLine) ) {
					var tData;
					var tIndex, tUVIndex, tNIndex;
					var tLocation;
					var i2, len2, i2ParseData;
					tData = tLine.split(' ').slice(1, 5);
					// console.log('tData',tData)
					if ( tData.length == 4 ) {
						// 더블 페이스 앞뒤를 처리함
						var t0 = tData[3];
						tData[3] = tData[0];
						tData[4] = tData[2];
						tData[5] = t0;
					}
					i2 = 0;
					len2 = tData.length;
					// tData.forEach(function (i2ParseData) {
					for ( i2; i2 < len2; i2++ ) {
						var tPoint, tNormalPoint, tUVPoints;
						var max;
						max = 0;
						i2ParseData = tData[i2];
						i2ParseData = i2ParseData.split('/');
						tIndex = +i2ParseData[0] - 1;
						tUVIndex = +i2ParseData[1] - 1;
						tNIndex = +i2ParseData[2] - 1;
						tPoint = pointInfo['points'][tIndex];
						tUVPoints = pointInfo['uvPoints'][tUVIndex];
						tNormalPoint = pointInfo['normalPoints'][tNIndex];
						if ( pointInfo['position'].length ) max += 3;
						if ( pointInfo['normal'].length ) max += 3;
						if ( pointInfo['uv'].length ) max += 2;
						//
						tLocation = currentMeshInfo['index'].length;
						currentMeshInfo['index'][tLocation] = currentMeshInfo['resultInterleave'].length / max;
						//
						if ( pointInfo['position'].length ) {
							tLocation = currentMeshInfo['resultPosition'].length;
							currentMeshInfo['resultPosition'][tLocation] = tPoint[0]
							currentMeshInfo['resultPosition'][tLocation + 1] = tPoint[1]
							currentMeshInfo['resultPosition'][tLocation + 2] = tPoint[2]
							tLocation = currentMeshInfo['resultInterleave'].length;
							currentMeshInfo['resultInterleave'][tLocation] = tPoint[0]
							currentMeshInfo['resultInterleave'][tLocation + 1] = tPoint[1]
							currentMeshInfo['resultInterleave'][tLocation + 2] = tPoint[2]
						}
						if ( pointInfo['normal'].length ) {
							tLocation = currentMeshInfo['resultNormal'].length;
							currentMeshInfo['resultNormal'][tLocation] = tNormalPoint[0]
							currentMeshInfo['resultNormal'][tLocation + 1] = tNormalPoint[1]
							currentMeshInfo['resultNormal'][tLocation + 2] = tNormalPoint[2]
							tLocation = currentMeshInfo['resultInterleave'].length;
							currentMeshInfo['resultInterleave'][tLocation] = tNormalPoint[0]
							currentMeshInfo['resultInterleave'][tLocation + 1] = tNormalPoint[1]
							currentMeshInfo['resultInterleave'][tLocation + 2] = tNormalPoint[2]
						}
						if ( pointInfo['uv'].length ) {
							tLocation = currentMeshInfo['resultUV'].length;
							currentMeshInfo['resultUV'][tLocation] = tUVPoints[0]
							currentMeshInfo['resultUV'][tLocation + 1] = tUVPoints[1]
							//
							tLocation = currentMeshInfo['resultInterleave'].length;
							currentMeshInfo['resultInterleave'][tLocation] = tUVPoints[0]
							currentMeshInfo['resultInterleave'][tLocation + 1] = tUVPoints[1]
						}
						// });
					}
					// console.log(tData)
					// console.log('regIndex3', line, regIndex3.test(line))
				} // 인덱스 검색 1/1 1/1 1/1 v/uv
				else if ( regIndex2.test(tLine) ) {
					var tData;
					var tIndex, tUVIndex;
					tData = tLine.split(' ').slice(1, 4);
					tData.forEach(function (v) {
						var tPoint, tUVPoints;
						var max;
						max = 0;
						v = v.split('/');
						tIndex = +v[0] - 1;
						tUVIndex = +v[1] - 1;
						tPoint = pointInfo['points'][tIndex];
						tUVPoints = pointInfo['uvPoints'][tUVIndex];
						if ( pointInfo['position'].length ) max += 3;
						if ( pointInfo['uv'].length ) max += 2;
						//
						currentMeshInfo['index'].push(currentMeshInfo['resultInterleave'].length / max);
						//
						if ( pointInfo['position'].length ) {
							currentMeshInfo['resultPosition'].push(tPoint[0], tPoint[1], tPoint[2]);
							currentMeshInfo['resultInterleave'].push(tPoint[0], tPoint[1], tPoint[2]);
						}
						if ( pointInfo['uv'].length ) {
							currentMeshInfo['resultUV'].push(tUVPoints[0], tUVPoints[1]);
							currentMeshInfo['resultInterleave'].push(tUVPoints[0], tUVPoints[1]);
						}
					});
					// console.log(tData)
					// console.log('regIndex2', line, regIndex3.test(line))
				}
				else if ( regIndex.test(tLine) ) {
					// 인덱스 검색 1 1 1 1// 인덱스 검색 1 1 1 1
					var tIndex;
					tIndex = tLine.split(' ');
					currentMeshInfo['resultInterleave'] = currentMeshInfo['resultPosition'] = currentMeshInfo['position'];
					currentMeshInfo['index'].push(+tIndex[1] - 1, +tIndex[2] - 1, +tIndex[3] - 1);
					currentMeshInfo['index'].push(+tIndex[1] - 1, +tIndex[3] - 1, +tIndex[4] - 1);
					// console.log('regIndex', line, regIndex.test(line))
				}
				// })
			}
			return {
				rawGroupInfo: rawGroupInfo,
				hierarchyInfo: hierarchyInfo
			}
		}
	})();
	parser = function (redOBJLoader, redGL, rawData) {
		console.log('파싱시작', redOBJLoader['path'] + redOBJLoader['fileName']);
		rawData = rawData.replace(/^\#[\s\S]+?\n/g, '');
		var RedOBJResult;
		var parsedData = parseObj(redGL, redOBJLoader, rawData.split("\n"));
		console.log(parsedData)
		setMesh(redGL, redOBJLoader['resultMesh'], parsedData['hierarchyInfo']);
		RedOBJResult = function (v) {
			for ( var k in v ) this[k] = v[k]
			console.log(this);
		};
		return new RedOBJResult(
			{
				fileName: redOBJLoader['fileName'],
				path: redOBJLoader['path'],
				resultMesh: redOBJLoader['resultMesh'],
				parseRawInfo: parsedData['rawGroupInfo'],
				parseInfoHierarchy: parsedData['hierarchyInfo'],
				parseInfoMaterial: redOBJLoader['mtlLoader']
			}
		)
	};
	Object.freeze(RedOBJLoader);
})();