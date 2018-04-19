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
        if ((!(this instanceof RedOBJLoader))) return new RedOBJLoader(redGL, path, fileName, callback)
        console.log('~~~~~~~~~~~')
        var self = this;
        var request = new XMLHttpRequest();
        request.open("GET", path + fileName, true);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                var data;
                self['result'] = parser(self, redGL, request.responseText)
                self['modelParsingComplete'] = true
                self['resultMesh'] = data
                if (callback) {
                    if (self['mtlLoader']) {
                        if (self['mtlLoader']['complete']) {
                            console.log('모델 파싱 종료 & 재질 파싱 종료');
                            callback(self['result'])
                        }
                        else console.log('모델 파싱 종료 & 재질 파싱중')
                    } else {
                        console.log('모델 파싱 종료 & 재질 없음');
                        callback(self['result'])
                    }
                }
            }
        }
        request.send();
        this['path'] = path;
        this['fileName'] = fileName;
        this['mtlLoader'] = null;
        this['modelParsingComplete'] = false;
        this['callback'] = callback;
        this['resultMesh'] = RedMesh(redGL)
        this['resultMesh']['name'] = 'instanceOfRedOBJLoader_' + RedGL.makeUUID()
        this['result'] = null;
    }
    setMaterial = function (redGL, tObjInfo, tMtlLoader) {
        // console.log(tObjInfo)
        // console.log('tMtlLoader', tMtlLoader)
        var k;

        var tMtlData, tMeshData
        var cacheTexture;
        cacheTexture = {}
        for (k in tObjInfo) {
            var tMaterial;
            var tMesh
            var tTexture;
            tMeshData = tObjInfo[k]
            tMesh = tMeshData['mesh']

            if (tMeshData['use'] && tMeshData['resultInterleave'].length) {
                var r, g, b;
                var ableLight
                ableLight = tMeshData['ableLight']
                // console.log(tMeshData)
                // console.log('해석할 재질키', tMeshData['materialKey'])
                //
                tMtlData = tMtlLoader['parseData'][tMeshData['materialKey']]
                if (tMtlData) {
                    if (tMtlData['map_Kd']) {
                        // 비트맵 기반으로 해석
                        console.log('tMtlData', tMtlData)
                        if (cacheTexture[tMtlData['map_Kd']]) tTexture = cacheTexture[tMtlData['map_Kd']]
                        else {
                            tTexture = RedBitmapTexture(redGL, tMtlData['map_Kd'])
                            cacheTexture[tMtlData['map_Kd']] = tTexture
                        }
                        if (ableLight) tMaterial = RedStandardMaterial(redGL, tTexture);
                        else tMaterial = RedBitmapMaterial(redGL, tTexture);
                    }
                    else if (tMtlData['Kd']) {
                        // 컬러기반으로 해석
                        r = tMtlData['Kd'][0] * 255;
                        g = tMtlData['Kd'][1] * 255;
                        b = tMtlData['Kd'][2] * 255;
                        if (ableLight) tMaterial = RedColorPhongTextureMaterial(redGL, RedGLUtil.rgb2hex(r, g, b));
                        else {
                            if (tMeshData['ableNormal']) tMaterial = RedColorPhongMaterial(redGL, RedGLUtil.rgb2hex(r, g, b));
                            else tMaterial = RedColorMaterial(redGL, RedGLUtil.rgb2hex(r, g, b));
                        }
                    }
                    if (tMaterial) {
                        // 스페큘러텍스쳐 
                        if (tMtlData['map_Ns']) {
                            if (cacheTexture[tMtlData['map_Ns']]) tTexture = cacheTexture[tMtlData['map_Ns']]
                            else {
                                tTexture = RedBitmapTexture(redGL, tMtlData['map_Ns'])
                                cacheTexture[tMtlData['map_Ns']] = tTexture
                            }
                            tMaterial['specularTexture'] = RedBitmapTexture(redGL, tTexture)
                        }
                        if (tMtlData['map_bump']) {
                            if (cacheTexture[tMtlData['map_bump']]) tTexture = cacheTexture[tMtlData['map_bump']]
                            else {
                                tTexture = RedBitmapTexture(redGL, tMtlData['map_bump'])
                                cacheTexture[tMtlData['map_bump']] = tTexture
                            }
                            tMaterial['normalTexture'] = RedBitmapTexture(redGL, tMtlData['map_bump'])
                        }
                        // shininess
                        if (tMtlData['Ns'] != undefined) tMaterial['shininess'] = tMtlData['Ns']
                        // 메쉬에 재질 적용
                        tMeshData['mesh']['material'] = tMaterial
                    }
                } else {
                    console.log('스킵')
                }
            }
        }
    }
    setMesh = function (redGL, parentMesh, childrenInfo) {
        for (var k in childrenInfo) {
            var tData;
            tData = childrenInfo[k]
            // console.log('!!!', k, tData)
            var tMesh;
            if (!tData['use']) {
                tMesh = RedMesh(redGL)
            } else {
                // 인터리브 버퍼 생성
                var tInterleaveInfo = []
                var interleaveBuffer, indexBuffer
                if (tData['resultPosition'].length) tInterleaveInfo.push(RedInterleaveInfo('aVertexPosition', 3))
                if (tData['resultNormal'].length) tInterleaveInfo.push(RedInterleaveInfo('aVertexNormal', 3))
                if (tData['resultUV'].length) tInterleaveInfo.push(RedInterleaveInfo('aTexcoord', 2))

                interleaveBuffer = RedBuffer(
                    redGL,
                    k + '_interleave',
                    new Float32Array(tData['resultInterleave'].length ? tData['resultInterleave'] : tData['resultPosition']),
                    RedBuffer.ARRAY_BUFFER,
                    tInterleaveInfo
                )
                if (tData['index'].length) {
                    // 인덱스 버퍼 생성
                    if (tData['index'].length) {
                        indexBuffer = RedBuffer(
                            redGL,
                            k + '_index',
                            new Uint16Array(tData['index']),
                            RedBuffer.ELEMENT_ARRAY_BUFFER
                        )
                    }
                }
                var tempMaterial;
                if (tData['resultUV'].length && tData['resultNormal'].length) tempMaterial = RedColorPhongTextureMaterial(redGL, '#00ff00')
                else {
                    if (tData['resultNormal']) tempMaterial = RedColorPhongMaterial(redGL, '#00ff00')
                    else tempMaterial = RedColorMaterial(redGL, '#0000ff')
                }
                tMesh = RedMesh(redGL, RedGeometry(interleaveBuffer, indexBuffer), tempMaterial);
                tData['ableUV'] = tData['resultUV'].length ? true : false
                tData['ableNormal'] = tData['resultNormal'].length ? true : false
                tData['ableLight'] = tData['ableUV'] & tData['ableNormal'] ? true : false
            }
            tMesh['name'] = k
            tData['mesh'] = tMesh
            parentMesh.addChild(tMesh)
            setMesh(redGL, tMesh, tData['childrenInfo'])
        }
    }
    var parseObj;
    parseObj = (function () {
        var regObject, regGroup;
        var regVertex, regNormal, redUV;
        var regIndex, regIndex2, regIndex3, regIndex4;
        var regMtllib;
        var regUseMtl;
        regMtllib = /^(mtllib )/;
        regUseMtl = /^(usemtl )/;
        regObject = /^o /;
        regGroup = /^g /;
        regVertex = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
        regNormal = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
        redUV = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
        regIndex = /f\s+(([\d]{1,}[\s]?){3,})+/;
        regIndex2 = /f\s+((([\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
        regIndex3 = /f\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
        regIndex4 = /f\s+((([\d]{1,}\/\/[\d]{1,}[\s]?){3,})+)/
        return function (redGL, tRedOBJLoader, lineList) {
            var info; // 단편 구조로 정보구성
            var infoHierarchy; // 하이라키 구조로 정보구성
            var pointInfo;;
            // 현재 바라볼 메쉬정보
            var currentMeshInfo;
            // 현재 그룹이름
            var currentGroupName;
            // 재질로더
            var tMtlLoader;
            // 전체 삼각형 구성정보. 
            pointInfo = {
                position: [],
                normal: [],
                uv: [],
                //
                points: [],
                normalPoints: [],
                uvPoints: []
            }
            infoHierarchy = {};
            info = {};


            var i;
            var hasObjectName;
            i = lineList.length
            while (i--) {
                if (regObject.test(lineList[i])) {
                    hasObjectName = true
                    break
                }
            }
            if (!hasObjectName) {
                var tName;
                var tInfo;
                tName = 'objModel' + RedGL.makeUUID()
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
                }
                infoHierarchy[tName] = currentMeshInfo = tInfo;
                info[tName] = currentMeshInfo
                currentGroupName = tName
            }

            lineList.forEach(function (line) {
                if (regMtllib.test(line)) {
                    console.log('regMtllib', '재질파일정보', line)
                    tMtlLoader = RedMTLLoader(redGL, tRedOBJLoader['path'], line.split(' ')[1], function (v) {
                        tRedOBJLoader['mtlLoader'] = v
                        if (tRedOBJLoader['modelParsingComplete']) {
                            if (tRedOBJLoader['callback']) {
                                console.log('재질에서 - 재질 파싱 종료 & 재질 파싱 종료');
                                setMaterial(redGL, info, tMtlLoader)
                                tRedOBJLoader['callback'](tRedOBJLoader['result'])
                            }
                            else console.log('RedOBJLoader 콜백없음')
                        } else console.log('재질에서 - 파싱 진행중 & 재질 파싱 종료')
                    })
                    tRedOBJLoader['mtlLoader'] = tMtlLoader
                    return
                }

                if (regUseMtl.test(line)) {
                    var tName;
                    var tInfo;
                    tName = line.split(' ').slice(1).join('').trim()
                    info[currentGroupName]['materialKey'] = tName
                    console.log('regUseMtl', line, '재질사용', regUseMtl.test(line), info[currentGroupName])
                }
                // 그룹 검색
                else if (regGroup.test(line)) {
                    var tName;
                    var tInfo;
                    tName = line.split(' ').slice(1).join('').trim()
                    // console.log('name', tName)
                    // console.log('currentGroupName', currentGroupName)
                    // 그룹으로 판정될 경우 현재 그룹은 컨테이너로만 사용한다. 
                    infoHierarchy[currentGroupName]['use'] = false
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
                    }
                    // 현재 메쉬 정보를 저장
                    info[tName] = currentMeshInfo = tInfo;
                    // 현재 그룹의 자식정보에 현재 메쉬 정보 추가
                    infoHierarchy[currentGroupName]['childrenInfo'][tName] = currentMeshInfo
                    // 이름이없는 오브젝트가 처음으로 생성되었을떄 사용안함으로 변경함
                    // console.log('regGroup', line, '신규그룹오브젝트', regGroup.test(line))
                }
                // 오브젝트 검색
                else if (regObject.test(line)) {
                    var tName;
                    var tInfo;
                    tName = line.split(' ').slice(1).join('').trim()
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
                    }
                    // 하이라키 정보에 추가
                    infoHierarchy[tName] = currentMeshInfo = tInfo;
                    // 현재 메쉬 정보 저장
                    info[tName] = currentMeshInfo;
                    // 현재 그룹이름을 현재 오브젝트 이름으로 설정
                    currentGroupName = tName;
                    // console.log('regObject', line, '신규오브젝트', regObject.test(line))
                }
                // 포지션 검색
                if (regVertex.test(line)) {
                    var tPosition;
                    tPosition = line.split(' ');
                    pointInfo['position'].push(+tPosition[1], +tPosition[2], +tPosition[3])
                    currentMeshInfo['position'].push(+tPosition[1], +tPosition[2], +tPosition[3])
                    pointInfo['points'][pointInfo['points'].length] = [+tPosition[1], +tPosition[2], +tPosition[3]]
                    // console.log('regVertex', line, regVertex.test(line))
                }
                // 노말 검색
                else if (regNormal.test(line)) {
                    var tNormal;
                    tNormal = line.split(' ');
                    pointInfo['normal'].push(+tNormal[1], +tNormal[2], +tNormal[3])
                    pointInfo['normalPoints'][pointInfo['normalPoints'].length] = [+tNormal[1], +tNormal[2], +tNormal[3]]
                    // console.log('regNormal', line, regNormal.test(line))
                }
                //UV 검색
                else if (redUV.test(line)) {
                    var tUV;
                    tUV = line.split(' ');
                    pointInfo['uv'].push(+tUV[1], +tUV[2])
                    pointInfo['uvPoints'][pointInfo['uvPoints'].length] = [+tUV[1], +tUV[2]]
                    // console.log('redUV', line, redUV.test(line))
                }
                // 인덱스 검색 1//1 1//1 1//1 v//n
                else if (regIndex4.test(line)) {
                    var tData;
                    var tIndex, tNIndex;
                    tData = line.split(' ').slice(1, 4);
                    tData.forEach(function (v) {
                        var tPoint, tNormalPoint;
                        var max;
                        max = 0
                        v = v.split('/')
                        tIndex = +v[0] - 1
                        tNIndex = +v[2] - 1
                        tPoint = pointInfo['points'][tIndex]
                        tNormalPoint = pointInfo['normalPoints'][tNIndex]
                        if (pointInfo['position'].length) max += 3
                        if (pointInfo['normal'].length) max += 3
                        //
                        currentMeshInfo['index'].push(currentMeshInfo['resultInterleave'].length / max)
                        //
                        if (pointInfo['position'].length) {
                            currentMeshInfo['resultPosition'].push(tPoint[0], tPoint[1], tPoint[2])
                            currentMeshInfo['resultInterleave'].push(tPoint[0], tPoint[1], tPoint[2])
                        }
                        if (pointInfo['normal'].length) {
                            currentMeshInfo['resultNormal'].push(tNormalPoint[0], tNormalPoint[1], tNormalPoint[2])
                            currentMeshInfo['resultInterleave'].push(tNormalPoint[0], tNormalPoint[1], tNormalPoint[2])
                        }
                    })
                    // console.log(tData)
                    // console.log('regIndex4', line, regIndex4.test(line))
                }
                // 인덱스 검색 1/1/1 1/1/1 1/1/1  v/uv/n
                else if (regIndex3.test(line)) {
                    var tData;
                    var tIndex, tUVIndex, tNIndex;
                    tData = line.split(' ').slice(1, 5);
                    // console.log('tData',tData)
                    if (tData.length == 4) {
                        var t0 = tData[3]
                        tData[3] = tData[0]
                        tData[4] = tData[2]
                        tData[5] = t0
                    }
                    tData.forEach(function (v) {
                        var tPoint, tNormalPoint, tUVPoints;
                        var max;
                        max = 0
                        v = v.split('/')
                        tIndex = +v[0] - 1
                        tUVIndex = +v[1] - 1
                        tNIndex = +v[2] - 1
                        tPoint = pointInfo['points'][tIndex]
                        tUVPoints = pointInfo['uvPoints'][tUVIndex]
                        tNormalPoint = pointInfo['normalPoints'][tNIndex]
                        if (pointInfo['position'].length) max += 3
                        if (pointInfo['normal'].length) max += 3
                        if (pointInfo['uv'].length) max += 2
                        //
                        currentMeshInfo['index'].push(currentMeshInfo['resultInterleave'].length / max)
                        //
                        if (pointInfo['position'].length) {
                            currentMeshInfo['resultPosition'].push(tPoint[0], tPoint[1], tPoint[2])
                            currentMeshInfo['resultInterleave'].push(tPoint[0], tPoint[1], tPoint[2])
                        }
                        if (pointInfo['normal'].length) {
                            currentMeshInfo['resultNormal'].push(tNormalPoint[0], tNormalPoint[1], tNormalPoint[2])
                            currentMeshInfo['resultInterleave'].push(tNormalPoint[0], tNormalPoint[1], tNormalPoint[2])
                        }
                        if (pointInfo['uv'].length) {
                            currentMeshInfo['resultUV'].push(tUVPoints[0], tUVPoints[1])
                            currentMeshInfo['resultInterleave'].push(tUVPoints[0], tUVPoints[1])
                        }

                    })
                    // console.log(tData)
                    // console.log('regIndex3', line, regIndex3.test(line))
                } // 인덱스 검색 1/1 1/1 1/1 v/uv
                else if (regIndex2.test(line)) {
                    var tData;
                    var tIndex, tUVIndex;
                    tData = line.split(' ').slice(1, 4);
                    tData.forEach(function (v) {
                        var tPoint, tUVPoints;
                        var max;
                        max = 0
                        v = v.split('/')
                        tIndex = +v[0] - 1
                        tUVIndex = +v[1] - 1
                        tPoint = pointInfo['points'][tIndex]
                        tUVPoints = pointInfo['uvPoints'][tUVIndex]
                        if (pointInfo['position'].length) max += 3
                        if (pointInfo['uv'].length) max += 2
                        //
                        currentMeshInfo['index'].push(currentMeshInfo['resultInterleave'].length / max)
                        //
                        if (pointInfo['position'].length) {
                            currentMeshInfo['resultPosition'].push(tPoint[0], tPoint[1], tPoint[2])
                            currentMeshInfo['resultInterleave'].push(tPoint[0], tPoint[1], tPoint[2])
                        }
                        if (pointInfo['uv'].length) {
                            currentMeshInfo['resultUV'].push(tUVPoints[0], tUVPoints[1])
                            currentMeshInfo['resultInterleave'].push(tUVPoints[0], tUVPoints[1])
                        }
                    })
                    // console.log(tData)
                    // console.log('regIndex2', line, regIndex3.test(line))
                }
                else if (regIndex.test(line)) {
                    // 인덱스 검색 1 1 1 1// 인덱스 검색 1 1 1 1
                    var tIndex;
                    tIndex = line.split(' ');
                    currentMeshInfo['resultInterleave'] = currentMeshInfo['resultPosition'] = currentMeshInfo['position']
                    currentMeshInfo['index'].push(+tIndex[1] - 1, +tIndex[2] - 1, +tIndex[3] - 1)
                    currentMeshInfo['index'].push(+tIndex[1] - 1, +tIndex[3] - 1, +tIndex[4] - 1)
                    // console.log('regIndex', line, regIndex.test(line))
                }
            })
            return {
                info: info,
                infoHierarchy: infoHierarchy
            }
        }
    })();
    parser = function (tRedOBJLoader, redGL, rawData) {
        console.log('파싱시작', tRedOBJLoader['path'] + tRedOBJLoader['fileName'])
        // console.log(rawData)
        rawData = rawData.replace(/^\#[\s\S]+?\n/g, '');
        var RedOBJResult;
        var parsedData = parseObj(redGL, tRedOBJLoader, rawData.split("\n"))
        setMesh(redGL, tRedOBJLoader['resultMesh'], parsedData['infoHierarchy'])
        RedOBJResult = function (v) {
            for (var k in v) this[k] = v[k]
            console.log(this)
        }

        return new RedOBJResult(
            {
                fileName: tRedOBJLoader['fileName'],
                path: tRedOBJLoader['path'],
                resultMesh: tRedOBJLoader['resultMesh'],
                parseRawInfo: parsedData['info'],
                parseInfoHierarchy: parsedData['infoHierarchy'],
                parseInfoMaterial: tRedOBJLoader['mtlLoader']
            }
        )
    }
    Object.freeze(RedOBJLoader)
})()