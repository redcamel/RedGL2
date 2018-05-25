"use strict";
var RedDAELoader;
(function () {
    var parser, parseMaterial, parseMesh, parseAnimation, parseController, parseVisualSceneInfo;
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
        for (i; i < len; i++) {
            pointList.push(
                [
                    tPosition[i * 3 + 0],
                    tPosition[i * 3 + 1],
                    tPosition[i * 3 + 2]
                ]
            )
        }
        if (tNormal) {
            i = 0, len = tNormal.length / 3
            for (i; i < len; i++) {
                normalPointList.push(
                    [
                        tNormal[i * 3 + 0],
                        tNormal[i * 3 + 1],
                        tNormal[i * 3 + 2]
                    ]
                )
            }
        }
        if (tTexcoord) {
            i = 0, len = tTexcoord.length / 2
            for (i; i < len; i++) {
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
        var aniList = rawData.querySelectorAll('library_controllers controller')
        var tList = []
        var vertex_weight = []
        aniList.forEach(function (tController) {
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

            var tCount = tController.querySelector('vcount').textContent.split(' ').map(Number)
            var tV = tController.querySelector('v').textContent.split(' ').map(Number)
            console.log('tV', tV)

            var offset = 0
            tCount.forEach(function (len) {
                var i = 0;
                for (i; i < len; i++) {
                    vertex_weight.push(tV[offset])
                    offset++
                }
            })

        })
        console.log('map', map)
        map['__v__'] = vertex_weight
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
                while (i--) {
                    if (target.children[i]['nodeName'] == 'node') tSubTargetList.push(target.children[i])
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
            var aniInfo, controllerInfo;
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
                    if (index % sourceNum == 0) t_indexDataIndex.push(+v)
                    else if (index % sourceNum == 1) t_normalDataindex.push(+v)
                    else if (index % sourceNum === 2) t_coordDataIndex.push(+v)
                })
                // 버퍼데이터생성
                var idxMap = {}
                t_indexDataIndex.forEach(function (v, index) {
                    tInterleaveBufferData[index * 8 + 0] = pointInfo['pointList'][v][0]
                    tInterleaveBufferData[index * 8 + 1] = pointInfo['pointList'][v][1]
                    tInterleaveBufferData[index * 8 + 2] = pointInfo['pointList'][v][2]

                    // 해당인덱스에 해당하는 인터리브 버퍼상의 위치
                    if (!idxMap[v]) idxMap[v] = []
                    idxMap[v].push(index * 8)

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
                    new Float32Array(tInterleaveBufferData),
                    RedBuffer.ARRAY_BUFFER, [
                        RedInterleaveInfo('aVertexPosition', 3),
                        RedInterleaveInfo('aVertexNormal', 3),
                        RedInterleaveInfo('aTexcoord', 2)
                    ]
                )
                tIndexBuffer = RedBuffer(
                    redGL,
                    'daeIndexData' + RedGL.makeUUID(),
                    new Uint16Array(tResultIndexData),
                    RedBuffer.ELEMENT_ARRAY_BUFFER
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
                var aniIndex = 0
                var aniMax = aniInfo['Armature_mixamorig_HeadTop_End_pose_matrix']['time'].length

                var makeMatrix = function (list, target) {
                    // console.log('뭐가오나',visualSceneInfo[target])
                    var tAniMatrix;
                    for (var k in aniInfo) {
                        if (aniInfo[k]['target'] == controllerInfo[target]['name']) {
                            tAniMatrix = aniInfo[k]['matrix'][aniIndex];
                            break
                        }
                    }
                    list.push({
                        name: controllerInfo[target]['name'],
                        matrix: tAniMatrix
                    })
                    if (visualSceneInfo[target]['parent']) makeMatrix(list, visualSceneInfo[target]['parent']['name'])

                }


                console.log("controllerInfo['__v__'] ", controllerInfo['__v__'])
                console.log('idxMap', idxMap)
                setInterval(function () {
                    // console.log()
                    var i = 0
                    for (var k in aniInfo) {
                        var tMatrix = mat4.clone(aniInfo[k]['matrix'][aniIndex])
                        if (aniInfo[k]['target'] && controllerInfo[aniInfo[k]['target']]) {

                            var parentMTX = mat4.create()
                            var parentMTX2 = mat4.create()
                            var mtxList = []
                            makeMatrix(mtxList, aniInfo[k]['target'], tMatrix)
                            // mtxList.reverse()
                            // console.log('mtxList',mtxList)
                            mtxList.forEach(function (v,index) {
                                if(index == mtxList.length-2) parentMTX2 =  v['matrix']
                                mat4.multiply(parentMTX, parentMTX, v['matrix'])
                            })
                            // mat4.multiply(parentMTX, parentMTX, tMatrix)

                            mat4.transpose(parentMTX, parentMTX, parentMTX)
                            // console.log(mtxList)
                            controllerInfo[aniInfo[k]['target']]['skeleton']['matrix'] = parentMTX
                            var per = 0
                            for (var k in idxMap) {
                                per++
                            }
                            var per = pointInfo['pointList'].length / 52
                            controllerInfo['__v__'].slice(i * per, i * per + per).forEach(function (v) {
                                var tList = idxMap[v]
                                if (tList) {
                                    tList.forEach(function (v2) {
                                        var t0 = [
                                            tInterleaveBuffer['originData'][v2],
                                            tInterleaveBuffer['originData'][v2 + 1],
                                            tInterleaveBuffer['originData'][v2 + 2]
                                        ]
                                        var t = parentMTX
                                        // vec3.transformMat4(t0, t0, controllerInfo[aniInfo[k]['target']]['skeleton']['matrix'])
                                        // vec3.transformMat4(t0, t0, mat4.invert(tMatrix,tMatrix))
                                        // vec3.transformMat4(t0, t0, parentMTX)

                                        var t2 = mat4.create()
                                     
                                        var inversMTX = mat4.create()
                                        var inverse_c = tMatrix[0],
                                            inverse_d = tMatrix[1],
                                            inverse_e = tMatrix[2],
                                            inverse_g = tMatrix[3],
                                            inverse_f = tMatrix[4],
                                            inverse_h = tMatrix[5],
                                            inverse_i = tMatrix[6],
                                            inverse_j = tMatrix[7],
                                            inverse_k = tMatrix[8],
                                            inverse_l = tMatrix[9],
                                            inverse_n = tMatrix[10],
                                            inverse_o = tMatrix[11],
                                            inverse_m = tMatrix[12],
                                            inverse_p = tMatrix[13],
                                            inverse_r = tMatrix[14],
                                            inverse_s = tMatrix[15],
                                            inverse_A = inverse_c * inverse_h - inverse_d * inverse_f,
                                            inverse_B = inverse_c * inverse_i - inverse_e * inverse_f,
                                            inverse_t = inverse_c * inverse_j - inverse_g * inverse_f,
                                            inverse_u = inverse_d * inverse_i - inverse_e * inverse_h,
                                            inverse_v = inverse_d * inverse_j - inverse_g * inverse_h,
                                            inverse_w = inverse_e * inverse_j - inverse_g * inverse_i,
                                            inverse_x = inverse_k * inverse_p - inverse_l * inverse_m,
                                            inverse_y = inverse_k * inverse_r - inverse_n * inverse_m,
                                            inverse_z = inverse_k * inverse_s - inverse_o * inverse_m,
                                            inverse_C = inverse_l * inverse_r - inverse_n * inverse_p,
                                            inverse_D = inverse_l * inverse_s - inverse_o * inverse_p,
                                            inverse_E = inverse_n * inverse_s - inverse_o * inverse_r,
                                            inverse_q = inverse_A * inverse_E - inverse_B * inverse_D + inverse_t * inverse_C + inverse_u * inverse_z - inverse_v * inverse_y + inverse_w * inverse_x,
                                            inverse_q = 1 / inverse_q;
                                            inversMTX[0] = (inverse_h * inverse_E - inverse_i * inverse_D + inverse_j * inverse_C) * inverse_q,
                                            inversMTX[1] = (-inverse_d * inverse_E + inverse_e * inverse_D - inverse_g * inverse_C) * inverse_q,
                                            inversMTX[2] = (inverse_p * inverse_w - inverse_r * inverse_v + inverse_s * inverse_u) * inverse_q,
                                            inversMTX[3] = (-inverse_l * inverse_w + inverse_n * inverse_v - inverse_o * inverse_u) * inverse_q,
                                            inversMTX[4] = (-inverse_f * inverse_E + inverse_i * inverse_z - inverse_j * inverse_y) * inverse_q,
                                            inversMTX[5] = (inverse_c * inverse_E - inverse_e * inverse_z + inverse_g * inverse_y) * inverse_q,
                                            inversMTX[6] = (-inverse_m * inverse_w + inverse_r * inverse_t - inverse_s * inverse_B) * inverse_q,
                                            inversMTX[7] = (inverse_k * inverse_w - inverse_n * inverse_t + inverse_o * inverse_B) * inverse_q,
                                            inversMTX[8] = (inverse_f * inverse_D - inverse_h * inverse_z + inverse_j * inverse_x) * inverse_q,
                                            inversMTX[9] = (-inverse_c * inverse_D + inverse_d * inverse_z - inverse_g * inverse_x) * inverse_q,
                                            inversMTX[10] = (inverse_m * inverse_v - inverse_p * inverse_t + inverse_s * inverse_A) * inverse_q,
                                            inversMTX[11] = (-inverse_k * inverse_v + inverse_l * inverse_t - inverse_o * inverse_A) * inverse_q,
                                            inversMTX[12] = (-inverse_f * inverse_C + inverse_h * inverse_y - inverse_i * inverse_x) * inverse_q,
                                            inversMTX[13] = (inverse_c * inverse_C - inverse_d * inverse_y + inverse_e * inverse_x) * inverse_q,
                                            inversMTX[14] = (-inverse_m * inverse_u + inverse_p * inverse_B - inverse_r * inverse_A) * inverse_q,
                                            inversMTX[15] = (inverse_k * inverse_u - inverse_l * inverse_B + inverse_n * inverse_A) * inverse_q,

                                            mat4.translate(t2, t2, t0)
                                            // mat4.multiply(t2,tMatrix,t2)
                                            mat4.multiply(t2, t2, tMatrix)
                                            mat4.multiply(t2, t2, inversMTX)
                                            mat4.multiply(t2, t2, parentMTX)
                                            

                                        tInterleaveBuffer['data'][v2] = t2[12] / 3
                                        tInterleaveBuffer['data'][v2 + 1] = t2[13] / 3
                                        tInterleaveBuffer['data'][v2 + 2] = t2[14] / 3
                                    })

                                }
                            })
                        }
                        i++
                    }

                    tResultMesh['geometry']['interleaveBuffer'].upload(tInterleaveBuffer['data'])
                    aniIndex++
                    if (aniMax == aniIndex) aniIndex = 0
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