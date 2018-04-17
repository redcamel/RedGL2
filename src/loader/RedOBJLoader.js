"use strict";
var RedOBJLoader;
(function () {
    var parser;
    /**DOC:
        {
            constructorYn : true,
            title :`RedOBJLoader`,
            description : `
                초안 작업진행중
            `,
            return : 'void'
        }
    :DOC*/
    RedOBJLoader = function (redGL, src, callback) {
        if ((!(this instanceof RedOBJLoader))) return new RedOBJLoader(redGL, src, callback)
        console.log('~~~~~~~~~~~')
        var request = new XMLHttpRequest();
        request.open("GET", src);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
            request.onreadystatechange = function () {
                if (request.readyState == 4) {

                    var data;
                    data = parser(redGL, request.responseText)
                    if (callback) {
                        callback(data)
                    }
                }
            }
        request.send();
    }
    parser = function (redGL, data) {
        console.log('파싱시작')
        console.log(data)
        var lines;
        var info;
        var regObject, regGroup, regVertex, regNormal, redUV, regIndex, regIndex2, regIndex3, regIndex4;

        regObject = /^o/;
        regGroup = /^g/;
        regVertex = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
        regNormal = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
        redUV = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
        regIndex = /f\s+(([\d]{1,}[\s]?){3,})+/;
        regIndex2 = /f\s+((([\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
        regIndex3 = /f\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
        regIndex4 = /f\s+((([\d]{1,}\/\/[\d]{1,}[\s]?){3,})+)/
        info = {};

        data = data.replace(/^\#[\s\S]+?\n/g, '');
        lines = data.split("\n");
        // 루트에 삼각형 정보를 다모은다. 
        var root = {
            position: [],
            normal: [],
            uv: [],
            //
            points: [],
            normalPoints: [],
            uvPoints: []
        }
        var currentMeshInfo;
        var currentObjectName
        lines.forEach(function (line) {
            // 그룹 검색
            if (regGroup.test(line)) {
                var mainObjectName;
                mainObjectName = currentMeshInfo['name']
                var tName = line.split(' ');
                console.log(tName)
                console.log('mainObjectName',mainObjectName)
                tName = tName.slice(1)
                tName = tName.join('')
                tName = tName.trim()
                console.log('name', tName)
                info[currentObjectName]['use'] = false
                info[tName] = {
                    name: tName,
                    index: [],
                    position: currentMeshInfo['position'],
                    resultPosition: [],
                    resultNormal: [],
                    resultUV: [],
                    resultInterleave: [],
                    use : true
                }                
                currentMeshInfo = info[tName];
                console.log('regGroup', line, '신규그룹오브젝트', regGroup.test(line))
                // console.log(info)
            } 
            // 오브젝트 검색
            else if (regObject.test(line)) {
                var tName = line.split(' ');
                console.log(tName)
                tName = tName.slice(1)
                tName = tName.join('')
                tName = tName.trim()
                console.log('name', tName)
                info[tName] = {
                    name: tName,
                    index: [],
                    position: [],
                    resultPosition: [],
                    resultNormal: [],
                    resultUV: [],
                    resultInterleave: [],
                    use : true
                }
                currentMeshInfo = info[tName];
                currentObjectName = tName
                console.log('regObject', line, '신규오브젝트', regObject.test(line))
                // console.log(info)
            } else {
                // 오브젝트 이름이 등록되어있지 않은경우
                if (!currentMeshInfo) {
                    var tName = 'objModel' + RedGL.makeUUID()
                    info[tName] = {
                        name: tName,
                        index: [],
                        position: [],
                        resultPosition: [],
                        resultNormal: [],
                        resultUV: [],
                        resultInterleave: [],
                        use : true
                    }
                    currentMeshInfo = info[tName];
                    currentObjectName = tName
                }
            }
            // 포지션 검색
            if (regVertex.test(line)) {
                var tPosition;
                tPosition = line.split(' ');
                root['position'].push(+tPosition[1], +tPosition[2], +tPosition[3])
                currentMeshInfo['position'].push(+tPosition[1], +tPosition[2], +tPosition[3])
                root['points'][root['points'].length] = [+tPosition[1], +tPosition[2], +tPosition[3]]
                // console.log('regVertex', line, regVertex.test(line))
            }
            // 노말 검색
            else if (regNormal.test(line)) {
                var tNormal;
                tNormal = line.split(' ');
                root['normal'].push(+tNormal[1], +tNormal[2], +tNormal[3])
                root['normalPoints'][root['normalPoints'].length] = [+tNormal[1], +tNormal[2], +tNormal[3]]
                // console.log('regNormal', line, regNormal.test(line))
            }
            //UV 검색
            else if (redUV.test(line)) {
                var tUV;
                tUV = line.split(' ');
                root['uv'].push(+tUV[1], +tUV[2])
                root['uvPoints'][root['uvPoints'].length] = [+tUV[1], +tUV[2]]
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
                    tPoint = root['points'][tIndex]
                    tNormalPoint = root['normalPoints'][tNIndex]
                    if (root['position'].length) max += 3
                    if (root['normal'].length) max += 3
                    //
                    currentMeshInfo['index'].push(currentMeshInfo['resultInterleave'].length / max)
                    //
                    if (root['position'].length) {
                        currentMeshInfo['resultPosition'].push(tPoint[0], tPoint[1], tPoint[2])
                        currentMeshInfo['resultInterleave'].push(tPoint[0], tPoint[1], tPoint[2])
                    }
                    if (root['normal'].length) {
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
                tData = line.split(' ').slice(1, 4);
                tData.forEach(function (v) {
                    var tPoint, tNormalPoint, tUVPoints;
                    var max;
                    max = 0
                    v = v.split('/')
                    tIndex = +v[0] - 1
                    tUVIndex = +v[1] - 1
                    tNIndex = +v[2] - 1
                    tPoint = root['points'][tIndex]
                    tUVPoints = root['uvPoints'][tUVIndex]
                    tNormalPoint = root['normalPoints'][tNIndex]
                    if (root['position'].length) max += 3
                    if (root['normal'].length) max += 3
                    if (root['uv'].length) max += 2
                    //
                    currentMeshInfo['index'].push(currentMeshInfo['resultInterleave'].length / max)
                    //
                    if (root['position'].length) {
                        currentMeshInfo['resultPosition'].push(tPoint[0], tPoint[1], tPoint[2])
                        currentMeshInfo['resultInterleave'].push(tPoint[0], tPoint[1], tPoint[2])
                    }
                    if (root['normal'].length) {
                        currentMeshInfo['resultNormal'].push(tNormalPoint[0], tNormalPoint[1], tNormalPoint[2])
                        currentMeshInfo['resultInterleave'].push(tNormalPoint[0], tNormalPoint[1], tNormalPoint[2])
                    }
                    if (root['uv'].length) {
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
                    tPoint = root['points'][tIndex]
                    tUVPoints = root['uvPoints'][tUVIndex]
                    if (root['position'].length) max += 3
                    if (root['uv'].length) max += 2
                    //
                    currentMeshInfo['index'].push(currentMeshInfo['resultInterleave'].length / max)
                    //
                    if (root['position'].length) {
                        currentMeshInfo['resultPosition'].push(tPoint[0], tPoint[1], tPoint[2])
                        currentMeshInfo['resultInterleave'].push(tPoint[0], tPoint[1], tPoint[2])
                    }
                    if (root['uv'].length) {
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
        console.log(info)
        // console.log(lines)
        var newData = {}
        for (var k in info) {
            // console.log(k, info[k])
            if (info[k]['use'] && info[k]['position'].length) {
                var temp = info[k];
                newData[k] = {}
                // 인터리브 버퍼 생성
                var tInterleaveInfo = []
                if (info[k]['resultPosition'].length) tInterleaveInfo.push(RedInterleaveInfo('aVertexPosition', 3))
                if (info[k]['resultNormal'].length) tInterleaveInfo.push(RedInterleaveInfo('aVertexNormal', 3))
                if (info[k]['resultUV'].length) tInterleaveInfo.push(RedInterleaveInfo('aTexcoord', 2))

                newData[k]['interleaveBuffer'] = RedBuffer(
                    redGL,
                    k + '_interleave',
                    new Float32Array(info[k]['resultInterleave'].length ? info[k]['resultInterleave'] : info[k]['resultPosition']),
                    RedBuffer.ARRAY_BUFFER,
                    tInterleaveInfo
                )
                if (info[k]['index'].length) {
                    // 인덱스 버퍼 생성
                    if (info[k]['index'].length) {
                        newData[k]['indexBuffer'] = RedBuffer(
                            redGL,
                            k + '_index',
                            new Uint16Array(info[k]['index']),
                            RedBuffer.ELEMENT_ARRAY_BUFFER
                        )
                    }
                }
                newData[k]['data'] = temp;
            }
        }
        return newData
    }
    Object.freeze(RedOBJLoader)
})()