"use strict";
var RedSystemUniformUpdater;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedSystemUniformUpdater`
	 }
	 :DOC*/
	RedSystemUniformUpdater = {
		update: (function () {
			var tGL;
			var tProgram;
			var tSystemUniformGroup, tLocationInfo, tLocation, tUUID;
			var tValue, tValueStr;
			// 라이트관련
			var tDirectionalPositionList, tDirectionalLightColorList, tDirectionalLightIntensityList;
			var tPointLightPositionList, tPointLightColorList, tPointLightIntensityList, tPointLightRadiusList;
			var tLightList, tLight;
			var tLightData, tLightDebugObj;
			var tVector;
			//
			var i, k;
			var checkUniformInfo, needUpdateUniformInfo;
			// 쉐도우관련
			var tDirectionalShadowLightMatrix, tDirectionalShadowSize, tDirectionalShadowLightProjectionMatrix, tDirectionalShadowLightPosition;
			var tShadowSamplerIndex, prevShadowSamplerIndex;
			//
			var tCacheSystemUniformInfo;
			var tScene, tCamera, tViewRect;
			var programNum = 0;
			var changedProgramNum; // 프로그램 갯수가 변했는가
			var MAX_DIRECTIONAL_LIGHT_NUM = 3;
			var MAX_POINT_LIGHT_NUM = 5;
			//
			var tCheckData;
			checkUniformInfo = {
				uTime: {cacheData: null, data: 0},
				uResolution: {cacheData: null, data: new Float32Array([0, 0])},
				u_FogDensity: {cacheData: null, data: 0},
				uFogColor: {cacheData: null, data: new Float32Array([0, 0, 0, 0])},
				u_FogDistance: {cacheData: null, data: 0},
				uCameraMatrix: {cacheData: null, data: null},
				uPMatrix: {cacheData: null, data: null},
				uAmbientLightColor: {cacheData: null, data: new Float32Array([0, 0, 0, 0])},
				uAmbientIntensity: {cacheData: null, data: 1},
				uDirectionalLightPositionList: {cacheData: null, data: []},
				uDirectionalLightColorList: {cacheData: null, data: []},
				uDirectionalLightIntensityList: {cacheData: null, data: []},
				uDirectionalLightNum: {cacheData: null, data: 0},
				uPointLightPositionList: {cacheData: null, data: []},
				uPointLightColorList: {cacheData: null, data: []},
				uPointLightIntensityList: {cacheData: null, data: []},
				uPointLightRadiusList: {cacheData: null, data: []},
				uPointLightNum: {cacheData: null, data: 0}
			};
			// 디렉셔널 쉐도우 관련
			tDirectionalShadowLightPosition = new Float32Array(3);
			tDirectionalShadowLightMatrix = new Float32Array(16);
			tDirectionalShadowLightProjectionMatrix = new Float32Array(16);
			// 디렉셔널 라이트 관련;
			tDirectionalPositionList = new Float32Array(3 * MAX_DIRECTIONAL_LIGHT_NUM);
			tDirectionalLightColorList = new Float32Array(4 * MAX_DIRECTIONAL_LIGHT_NUM);
			tDirectionalLightIntensityList = new Float32Array(MAX_DIRECTIONAL_LIGHT_NUM);
			// 포인트 라이트 관련
			tPointLightPositionList = new Float32Array(3 * MAX_POINT_LIGHT_NUM);
			tPointLightColorList = new Float32Array(4 * MAX_POINT_LIGHT_NUM);
			tPointLightIntensityList = new Float32Array(MAX_POINT_LIGHT_NUM);
			tPointLightRadiusList = new Float32Array(MAX_POINT_LIGHT_NUM);
			//
			tVector = new Float32Array(3);
			return function (redGL, redRenderer, time, tView, prevProgram_UUID, lightDebugRenderList) {
				tGL = redGL.gl;
				tScene = tView['scene'];
				tCamera = tView['camera'];
				tCamera = tCamera instanceof RedBaseController ? tCamera.camera : tCamera;
				tViewRect = tView['_viewRect'];
				tCacheSystemUniformInfo = redRenderer['cacheInfo']['cacheSystemUniformInfo'];
				prevShadowSamplerIndex = null;
				needUpdateUniformInfo = {};
				lightDebugRenderList.length = 0;
				// console.log('programNum', programNum)
				// 프로그램 변경여부 판단
				changedProgramNum = programNum != redGL['_datas']['RedProgramList'].length;
				programNum = 0;
				// 데이터 업데이트
				// 타임업데이트
				tCheckData = checkUniformInfo['uTime'];
				if ( tCheckData['cacheData'] != time ) {
					needUpdateUniformInfo['uTime'] = tCheckData['data'] = time;
					tCheckData['cacheData'] = time;
				}
				// 레롤루션업데이트
				tValueStr = JSON.stringify(tViewRect);
				tCheckData = checkUniformInfo['uResolution'];
				if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
					tCheckData['data'][0] = tViewRect[2];
					tCheckData['data'][1] = tViewRect[3];
					needUpdateUniformInfo['uResolution'] = tCheckData['data'];
					tCheckData['cacheData'] = tValueStr;
				}
				// 안개밀도 업데이트
				tValueStr = tScene['_fogDensity'];
				tCheckData = checkUniformInfo['u_FogDensity'];
				if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
					needUpdateUniformInfo['u_FogDensity'] = tCheckData['data'] = tValueStr;
					tCheckData['cacheData'] = tValueStr;
				}
				// 안개색상 업데이트
				tValueStr = tScene['_fogR'] + '_' + tScene['_fogG'] + '_' + tScene['_fogB'] + '_' + 1;
				tCheckData = checkUniformInfo['uFogColor'];
				if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
					tCheckData['data'][0] = tScene['_fogR'];
					tCheckData['data'][1] = tScene['_fogG'];
					tCheckData['data'][2] = tScene['_fogB'];
					tCheckData['data'][3] = 1;
					needUpdateUniformInfo['uFogColor'] = tCheckData['data'];
					tCheckData['cacheData'] = tValueStr;
				}
				// 안개 가시거리 업데이트
				tValueStr = tScene['_fogDistance'];
				tCheckData = checkUniformInfo['u_FogDistance'];
				if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
					needUpdateUniformInfo['u_FogDistance'] = tCheckData['data'] = tValueStr;
					tCheckData['cacheData'] = tValueStr;
				}
				// 카메라 매트릭스 업데이트
				tValueStr = JSON.stringify(tCamera['matrix']);
				tCheckData = checkUniformInfo['uCameraMatrix'];
				if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
					needUpdateUniformInfo['uCameraMatrix'] = tCheckData['data'] = tCamera['matrix'];
					tCheckData['cacheData'] = tValueStr;
				}
				// 퍼스펙티브 매트릭스 업데이트
				tValueStr = JSON.stringify(tCamera['perspectiveMTX']);
				tCheckData = checkUniformInfo['uPMatrix'];
				if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
					needUpdateUniformInfo['uPMatrix'] = tCheckData['data'] = tCamera['perspectiveMTX'];
					tCheckData['cacheData'] = tValueStr;
				}
				// 암비안트 라이트 업데이트
				if ( tLightData = tScene['_lightInfo'][RedAmbientLight['TYPE']] ) {
					tValueStr = JSON.stringify(tLightData['_lightColor']);
					tCheckData = checkUniformInfo['uAmbientLightColor'];
					if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
						needUpdateUniformInfo['uAmbientLightColor'] = tCheckData['data'] = tLightData['_lightColor'];
						tCheckData['cacheData'] = tValueStr;
					}
					//
					tValueStr = tLightData['_intensity'];
					tCheckData = checkUniformInfo['uAmbientIntensity'];
					if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
						needUpdateUniformInfo['uAmbientIntensity'] = tCheckData['data'] = tLightData['_intensity'];
						tCheckData['cacheData'] = tValueStr;
					}
				}
				// 디렉셔널 라이트 업데이트
				tLightList = tScene['_lightInfo'][RedDirectionalLight['TYPE']];
				i = tLightList.length;
				while ( i-- ) {
					tLightData = tLightList[i];
					tVector[0] = tLightData['x'];
					tVector[1] = tLightData['y'];
					tVector[2] = tLightData['z'];
					if ( tLightData['debug'] ) {
						tLightDebugObj = tLightData['_debugObject'];
						tLightDebugObj['x'] = tVector[0];
						tLightDebugObj['y'] = tVector[1];
						tLightDebugObj['z'] = tVector[2];
						tLightDebugObj['_material']['_color'] = tLightData['_lightColor'];
						lightDebugRenderList.push(tLightDebugObj);
					}
					//
					vec3.normalize(tVector, tVector);
					tDirectionalPositionList[0 + 3 * i] = tVector[0];
					tDirectionalPositionList[1 + 3 * i] = tVector[1];
					tDirectionalPositionList[2 + 3 * i] = tVector[2];
					//
					tDirectionalLightColorList[0 + 4 * i] = tLightData['_lightColor'][0];
					tDirectionalLightColorList[1 + 4 * i] = tLightData['_lightColor'][1];
					tDirectionalLightColorList[2 + 4 * i] = tLightData['_lightColor'][2];
					tDirectionalLightColorList[3 + 4 * i] = tLightData['_lightColor'][3];
					tDirectionalLightIntensityList[i] = tLightData['_intensity'];
				}
				//
				tValueStr = JSON.stringify(tDirectionalPositionList);
				tCheckData = checkUniformInfo['uDirectionalLightPositionList'];
				if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
					needUpdateUniformInfo['uDirectionalLightPositionList'] = tCheckData['data'] = tDirectionalPositionList;
					tCheckData['cacheData'] = tValueStr;
				}
				//
				tValueStr = JSON.stringify(tDirectionalLightColorList);
				tCheckData = checkUniformInfo['uDirectionalLightColorList'];
				if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
					needUpdateUniformInfo['uDirectionalLightColorList'] = tCheckData['data'] = tDirectionalLightColorList;
					tCheckData['cacheData'] = tValueStr;
				}
				//
				tValueStr = JSON.stringify(tDirectionalLightIntensityList);
				tCheckData = checkUniformInfo['uDirectionalLightIntensityList'];
				if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
					needUpdateUniformInfo['uDirectionalLightIntensityList'] = tCheckData['data'] = tDirectionalLightIntensityList;
					tCheckData['cacheData'] = tValueStr;
				}
				//
				tValueStr = tLightList.length;
				tCheckData = checkUniformInfo['uDirectionalLightNum'];
				if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
					needUpdateUniformInfo['uDirectionalLightNum'] = tCheckData['data'] = tValueStr;
					tCheckData['cacheData'] = tValueStr;
				}
				// 포인트 라이트 업데이트
				tLightList = tScene['_lightInfo'][RedPointLight['TYPE']];
				i = tLightList.length;
				while ( i-- ) {
					tLightData = tLightList[i];
					tVector[0] = tLightData['x'];
					tVector[1] = tLightData['y'];
					tVector[2] = tLightData['z'];
					if ( tLightData['debug'] ) {
						tLightDebugObj = tLightData['_debugObject'];
						tLightDebugObj['x'] = tVector[0];
						tLightDebugObj['y'] = tVector[1];
						tLightDebugObj['z'] = tVector[2];
						tLightDebugObj['scaleX'] = tLightDebugObj['scaleY'] = tLightDebugObj['scaleZ'] = tLightData['_radius'];
						tLightDebugObj['_material']['_color'] = tLightData['_lightColor'];
						lightDebugRenderList.push(tLightDebugObj);
					}
					//
					tPointLightPositionList[0 + 3 * i] = tVector[0];
					tPointLightPositionList[1 + 3 * i] = tVector[1];
					tPointLightPositionList[2 + 3 * i] = tVector[2];
					tPointLightColorList[0 + 4 * i] = tLightData['_lightColor'][0];
					tPointLightColorList[1 + 4 * i] = tLightData['_lightColor'][1];
					tPointLightColorList[2 + 4 * i] = tLightData['_lightColor'][2];
					tPointLightColorList[3 + 4 * i] = tLightData['_lightColor'][3];
					//
					tPointLightIntensityList[i] = tLightData['_intensity'];
					//
					tPointLightRadiusList[i] = tLightData['_radius'];
				}
				//
				tValueStr = JSON.stringify(tPointLightPositionList);
				tCheckData = checkUniformInfo['uPointLightPositionList'];
				if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
					needUpdateUniformInfo['uPointLightPositionList'] = tCheckData['data'] = tPointLightPositionList;
					tCheckData['cacheData'] = tValueStr;
				}
				//
				tValueStr = JSON.stringify(tPointLightColorList);
				tCheckData = checkUniformInfo['uPointLightColorList'];
				if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
					needUpdateUniformInfo['uPointLightColorList'] = tCheckData['data'] = tPointLightColorList;
					tCheckData['cacheData'] = tValueStr;
				}
				//
				tValueStr = JSON.stringify(tPointLightIntensityList);
				tCheckData = checkUniformInfo['uPointLightIntensityList'];
				if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
					needUpdateUniformInfo['uPointLightIntensityList'] = tCheckData['data'] = tPointLightIntensityList;
					tCheckData['cacheData'] = tValueStr;
				}
				//
				tValueStr = JSON.stringify(tPointLightRadiusList);
				tCheckData = checkUniformInfo['uPointLightRadiusList'];
				if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
					needUpdateUniformInfo['uPointLightRadiusList'] = tCheckData['data'] = tPointLightRadiusList;
					tCheckData['cacheData'] = tValueStr;
				}
				//
				tValueStr = tLightList.length;
				tCheckData = checkUniformInfo['uPointLightNum'];
				if ( tCheckData['cacheData'] != tValueStr || changedProgramNum ) {
					needUpdateUniformInfo['uPointLightNum'] = tCheckData['data'] = tValueStr;
					tCheckData['cacheData'] = tValueStr;
				}
				// 디렉셔널 쉐도우 라이트 매트릭스 계산
				if ( tScene['shadowManager']['_directionalShadow'] ) {
					tDirectionalShadowLightMatrix[1] = tDirectionalShadowLightMatrix[2] = tDirectionalShadowLightMatrix[3] = tDirectionalShadowLightMatrix[4] = tDirectionalShadowLightMatrix[6] = tDirectionalShadowLightMatrix[7] = tDirectionalShadowLightMatrix[8] = tDirectionalShadowLightMatrix[9] = tDirectionalShadowLightMatrix[11] = tDirectionalShadowLightMatrix[12] = tDirectionalShadowLightMatrix[13] = tDirectionalShadowLightMatrix[14] = 0;
					tDirectionalShadowLightMatrix[0] = tDirectionalShadowLightMatrix[5] = tDirectionalShadowLightMatrix[10] = tDirectionalShadowLightMatrix[15] = 1;
					tDirectionalShadowSize = tScene['shadowManager']['_directionalShadow']['size'];
					tLight = tScene['shadowManager']['_directionalShadow']['_light'];
					mat4.ortho(tDirectionalShadowLightProjectionMatrix, -tDirectionalShadowSize, tDirectionalShadowSize, -tDirectionalShadowSize, tDirectionalShadowSize, -tDirectionalShadowSize, tDirectionalShadowSize);
					tDirectionalShadowLightPosition[0] = 0;
					tDirectionalShadowLightPosition[1] = 0;
					tDirectionalShadowLightPosition[2] = 0;
					if ( tLight ) {
						tDirectionalShadowLightPosition[0] = -tLight.x;
						tDirectionalShadowLightPosition[1] = -tLight.y;
						tDirectionalShadowLightPosition[2] = -tLight.z;
						vec3.normalize(tDirectionalShadowLightPosition, tDirectionalShadowLightPosition);
						mat4.lookAt(
							tDirectionalShadowLightMatrix,
							tDirectionalShadowLightPosition,
							[0, 0, 0],
							[0, 1, 0]
						);
						mat4.multiply(tDirectionalShadowLightMatrix, tDirectionalShadowLightProjectionMatrix, tDirectionalShadowLightMatrix);
					}
				}
				// 실제업데이트
				// for ( var k in redGL['_datas']['RedProgram'] ) {
				i = redGL['_datas']['RedProgramList'].length;
				while ( i-- ) {
					programNum++;
					tProgram = redGL['_datas']['RedProgramList'][i];
					tGL.useProgram(tProgram['webglProgram']);
					prevProgram_UUID = tProgram['_UUID'];
					tSystemUniformGroup = tProgram['systemUniformLocation'];
					// 디렉셔널 쉐도우 라이트 매트릭스
					tLocationInfo = tSystemUniformGroup['uDirectionalShadowLightMatrix'];
					tLocation = tLocationInfo['location'];
					tUUID = tLocationInfo['_UUID'];
					if ( tLocation ) {
						if ( tScene['shadowManager']['_directionalShadow'] ) {
							tLight = tScene['shadowManager']['_directionalShadow']['_light'];
							if ( tLight ) {
								tValueStr = JSON.stringify(tDirectionalShadowLightMatrix);
								if ( tCacheSystemUniformInfo[tUUID] != tValueStr ) {
									tGL.uniformMatrix4fv(tLocation, false, tDirectionalShadowLightMatrix);
									tCacheSystemUniformInfo[tUUID] = tValueStr;
								}
							}
						}
					}
					// 디렉셔널 쉐도우 텍스쳐
					tLocationInfo = tSystemUniformGroup['uDirectionalShadowTexture'];
					if ( tLocationInfo ) {
						tLocation = tLocationInfo['location'];
						if ( tLocation ) {
							tUUID = tLocationInfo['_UUID'];
							if ( tScene['shadowManager']['_directionalShadow'] ) tValue = tScene['shadowManager']['directionalShadow']['frameBuffer']['texture'];
							else tValue = redGL['_datas']['emptyTexture']['2d'];
							tShadowSamplerIndex = tLocationInfo['samplerIndex'];
							if ( tShadowSamplerIndex != prevShadowSamplerIndex ) {
								tGL.activeTexture(tGL.TEXTURE0 + tShadowSamplerIndex);
								tGL.bindTexture(tGL.TEXTURE_2D, tValue['webglTexture']);
								tGL[tLocationInfo['renderMethod']](tLocation, tShadowSamplerIndex);
							}
							prevShadowSamplerIndex = tShadowSamplerIndex;
						}
					}
					// 업데이트
					for ( k in needUpdateUniformInfo ) {
						tLocationInfo = tSystemUniformGroup[k];
						// if ( tLocationInfo ) {
						tLocation = tLocationInfo['location'];
						if ( tLocation ) {
							tUUID = tLocationInfo['_UUID'];
							tValue = needUpdateUniformInfo[k];
							tLocationInfo['renderType'] == 'mat' ? tGL[tLocationInfo['renderMethod']](tLocation, false, tValue) : tGL[tLocationInfo['renderMethod']](tLocation, tValue);
							tCacheSystemUniformInfo[tUUID] = null;
						}
						// }
					}
				}
				return prevProgram_UUID
			}
		})()
	};
	Object.freeze(RedSystemUniformUpdater);
})();
