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
        var regObject, regVertex, regNormal,regIndex;
        var currentMeshInfo;
        regObject = /^o/;
        regVertex = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
        regNormal = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
        regIndex = /f\s+(([\d]{1,}[\s]?){3,})+/;
        info = {};

        data = data.replace(/^\#[\s\S]+?\n/g, '');
        lines = data.split("\n");
        lines.forEach(function (line) {
            // 오브젝트 검색
            if (regObject.test(line)) {
                var name = line.split(' ')[1];
                info[name] = {
                    name: name,
                    position: [],
                    normal: [],
                    index: []
                }
                currentMeshInfo = info[name];
                console.log('regObject', line, '신규오브젝트', regObject.test(line))
            } else {
                // 오브젝트 이름이 등록되어있지 않은경우
                if (!currentMeshInfo) {
                    var tName = 'objModel' + RedGL.makeUUID()
                    currentMeshInfo = info[tName] = {
                        name: tName,
                        position: [],
                        normal: [],
                        index: []
                    }
                }
            }
            // 포지션 검색
            if (regVertex.test(line)) {
                var tPosition;
                tPosition = line.split(' ');
                currentMeshInfo['position'].push(+tPosition[1], +tPosition[2], +tPosition[3])
                console.log('regVertex', line, regVertex.test(line))
            }
            // TODO 노말 검색
            // if (regNormal.test(line)) {
            //     var tNormal;
            //     tNormal = line.split(' ');
            //     currentMeshInfo['normal'].push(+tNormal[1], +tNormal[2], +tNormal[3])
            //     console.log('regNormal', line, regNormal.test(line))
            // }
            // 인덱스 검색
            if (regIndex.test(line)) {
                var tIndex;
                tIndex = line.split(' ');
                currentMeshInfo['index'].push(+tIndex[1] - 1, +tIndex[2] - 1, +tIndex[3] - 1)
                currentMeshInfo['index'].push(+tIndex[1] - 1, +tIndex[3] - 1, +tIndex[4] - 1)
                console.log('regIndex', line, regIndex.test(line))
            }
        })
        console.log(info)
        console.log(lines)
        var newData = {}
        for (var k in info) {
            var temp = info[k];
            console.log(k, info[k])
            newData[k] = {}
            // 인터리브 버퍼 생성
            newData[k]['interleaveBuffer'] = RedBuffer(
                redGL,
                k + '_interleave',
                new Float32Array(info[k]['position']),
                RedBuffer.ARRAY_BUFFER,
                [
                    RedInterleaveInfo('aVertexPosition', 3)
                ]
            )
            // 인덱스 버퍼 생성
            if (info[k]['index'].length) {
                newData[k]['indexBuffer'] = RedBuffer(
                    redGL,
                    k + '_index',
                    new Uint16Array(info[k]['index']),
                    RedBuffer.ELEMENT_ARRAY_BUFFER
                )
            }

            newData[k]['data'] = temp;
        }

        return newData

    }
    Object.freeze(RedOBJLoader)
})()