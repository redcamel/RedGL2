"use strict";
var JsonModelLoader;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`JsonModelLoader`,
		 description : `
			 초안 작업진행중
			 현재 단순테스트용
		 `,
		 return : 'void'
	 }
     :DOC*/
    JsonModelLoader = function (redGL, key, src, callback) {
        if ((!(this instanceof JsonModelLoader))) return new JsonModelLoader(redGL, key, src, callback)
        console.log('~~~~~~~~~~~')
        var request = new XMLHttpRequest();
        request.open("GET", src, true);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    var jsonData;
                    var interleaveData, indexData;
                    var i, len;
                    interleaveData = []
                    indexData = []
                    jsonData = JSON.parse(request.responseText)
                    i = 0, len = jsonData['position'].length / 3
                    for (i; i < len; i++) {
                        interleaveData.push(jsonData['position'][i * 3], jsonData['position'][i * 3 + 1], jsonData['position'][i * 3 + 2])
                        interleaveData.push(jsonData['normal'][i * 3], jsonData['normal'][i * 3 + 1], jsonData['normal'][i * 3 + 2])
                        if (jsonData['uvs']) interleaveData.push(jsonData['uvs'][i * 2], jsonData['uvs'][i * 2 + 1])
                        else interleaveData.push(0, 0)
                    }
                    console.log(jsonData)
                    console.log(interleaveData)
                    if (callback) {
                        // TODO: 유일키 방어
                        callback(
                            RedBuffer(
                                redGL,
                                key,
                                RedBuffer.ARRAY_BUFFER,
                                new Float32Array(interleaveData),
                                [
                                    RedInterleaveInfo('aVertexPosition', 3),
                                    RedInterleaveInfo('aVertexNormal', 3),
                                    RedInterleaveInfo('aTexcoord', 2)
                                ]
                            ),
                            RedBuffer(
                                redGL,
                                key,
                                RedBuffer.ELEMENT_ARRAY_BUFFER,
                                new Uint16Array(jsonData['index'])
                            )
                        )
                    }
                }
            }
        request.send();
    }
    Object.freeze(JsonModelLoader)
})()