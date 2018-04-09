"use strict";
var JsonModelLoader;
(function () {
    JsonModelLoader = function (redGL, key, src, callback) {
        if ((!(this instanceof JsonModelLoader))) return new JsonModelLoader(redGL, key, src, callback)
        console.log('~~~~~~~~~~~')
        var request = new XMLHttpRequest();
        request.open("GET", src);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    var jsonData;
                    var interleaveData;
                    var i, len;
                    interleaveData = []
                    jsonData = JSON.parse(request.responseText)
                    i = 0, len = jsonData['position'].length / 3
                    for (i; i < len; i++) {
                        interleaveData.push(jsonData['position'][i * 3], jsonData['position'][i * 3 + 1], jsonData['position'][i * 3 + 2])
                        interleaveData.push(jsonData['normal'][i * 3], jsonData['normal'][i * 3 + 1], jsonData['normal'][i * 3 + 2])
                        interleaveData.push(jsonData['texcoord'][i * 2], jsonData['texcoord'][i * 2 + 1])
                    }
                    console.log(jsonData)
                    console.log(jsonData['texcoord'])
                    if (callback) {
                        // TODO: 유일키 방어
                        callback(
                            RedBuffer(
                                redGL,
                                key,
                                new Float32Array(interleaveData),
                                RedBuffer.ARRAY_BUFFER,
                                [{
                                    attributeKey: 'aVertexPosition',
                                    size: 3,
                                    normalize: false
                                },
                                {
                                    attributeKey: 'aVertexNormal',
                                    size: 3,
                                    normalize: false
                                },
                                {
                                    attributeKey: 'aTexcoord',
                                    size: 2,
                                    normalize: false
                                }
                                ]
                            ),
                            RedBuffer(
                                redGL,
                                key,
                                new Uint16Array(jsonData['index']),
                                RedBuffer.ELEMENT_ARRAY_BUFFER
                            )
                        )
                    }
                }
            }
        request.send();
    }
    Object.freeze(JsonModelLoader)
})()