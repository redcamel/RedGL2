"use strict";
var RedDAELoader;
(function () {
    var parser;
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
    parser = function (tRedDAELoader, redGL, rawData) {
        console.log('파싱시작', tRedDAELoader['path'] + tRedDAELoader['fileName'])

        var mesh = rawData.querySelector('library_geometries geometry mesh')
        var parseSourceDatas = mesh.querySelectorAll('source')

        var tPosition = parseSourceDatas[0].querySelector('float_array').textContent.split(' ').map(Number)
        var tNormal = parseSourceDatas[1].querySelector('float_array').textContent.split(' ').map(Number)
        var tTexcoord = parseSourceDatas[2].querySelector('float_array').textContent.split(' ').map(Number)

        var pointList = []
        var normalPointList = []
        var uvPointList = []


        console.log('tPosition', tPosition)
        console.log('tNormal', tNormal)
        console.log('tTexcoord', tTexcoord)


        var i, len;
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
        console.log('pointList', pointList)
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
        console.log('normalPointList', normalPointList)

        i = 0, len = tTexcoord.length / 2
        for (i; i < len; i++) {
            uvPointList.push([
                tTexcoord[i * 2 + 0],
                tTexcoord[i * 2 + 1]
            ])
        }
        console.log('uvPointList', uvPointList)

        // 텍스쳐 해석
        var textureMap = {}
        var images = rawData.querySelectorAll('library_images image')
        images.forEach(function (v) {
            textureMap[v.getAttribute('id')] = RedBitmapTexture(redGL, tRedDAELoader['path'] + v.querySelector('init_from').textContent)
        })
        console.log('텍스쳐로 만들어야 할 녀석들', textureMap)
        // 이펙트 해석
        var effectMap = {}
        var effects = rawData.querySelectorAll('library_effects effect')
        effects.forEach(function (v) {
            effectMap[v.getAttribute('id')] = {
                texture: textureMap[v.querySelector('newparam init_from').textContent]
            }
        })
        console.log('이펙트', effectMap)

        // 재직 해석
        var materialMap = {}
        var materials = rawData.querySelectorAll('library_materials material')
        materials.forEach(function (v) {
            console.log(v.querySelector('instance_effect').getAttribute('url').replace('#', ''))
            materialMap[v.getAttribute('id')] = {
                effect: effectMap[v.querySelector('instance_effect').getAttribute('url').replace('#', '')]
            }
        })
        console.log('재직', materialMap)
        // 폴리곤 해석
        mesh.querySelectorAll('polylist').forEach(function (pData, pDataIndex) {

            var testInterleaveBufferData = []
            var tIndex = []

            var polylistIndices = pData.querySelector('p').textContent.split(' ')
            var parseSourceNum = 3
            var t_indexDataIndex = []
            var t_normalDataindex = []
            var t_coordDataIndex = []

            var tUVPointList = []
            polylistIndices.forEach(function (v, index) {
                if (index % parseSourceNum == 0) t_indexDataIndex.push(+v)
                else if (index % parseSourceNum == 1) t_normalDataindex.push(+v)
                if (index % parseSourceNum === 2) t_coordDataIndex.push(+v)
            })

            t_indexDataIndex.forEach(function (v, index) {

                testInterleaveBufferData[index * 8 + 0] = pointList[v][0]
                testInterleaveBufferData[index * 8 + 1] = pointList[v][1]
                testInterleaveBufferData[index * 8 + 2] = pointList[v][2]

                testInterleaveBufferData[index * 8 + 3] = normalPointList[t_normalDataindex[index]][0]
                testInterleaveBufferData[index * 8 + 4] = normalPointList[t_normalDataindex[index]][1]
                testInterleaveBufferData[index * 8 + 5] = normalPointList[t_normalDataindex[index]][2]


                testInterleaveBufferData[index * 8 + 6] = uvPointList[t_coordDataIndex[index]][0]
                testInterleaveBufferData[index * 8 + 7] = uvPointList[t_coordDataIndex[index]][1]



                tIndex.push(index)
            })
            var testInterleaveBuffer = RedBuffer(
                redGL,
                'testInterleaveBuffer2' + pDataIndex,
                new Float32Array(testInterleaveBufferData),
                RedBuffer.ARRAY_BUFFER, [
                    RedInterleaveInfo('aVertexPosition', 3),
                    RedInterleaveInfo('aVertexNormal', 3),
                    RedInterleaveInfo('aTexcoord', 2)
                ]
            )

            var testIndexBuffer = RedBuffer(
                redGL,
                'testIndexBuffer2' + pDataIndex,
                new Uint16Array(tIndex),
                RedBuffer.ELEMENT_ARRAY_BUFFER
            )
            var tMesh;
            tMesh = RedMesh(redGL)
            tMesh['geometry'] = RedGeometry(testInterleaveBuffer, testIndexBuffer)
            console.log('그래서 재질은?', pData.getAttribute('material'))
            var tTexture = materialMap[pData.getAttribute('material')]['effect']['texture']
            console.log('그래서 재질은?', tTexture)
            tMesh['material'] = RedStandardMaterial(redGL, tTexture)
            // tMesh['material'] = RedColorPhongMaterial(redGL)
            // tMesh['material'] = RedColorMaterial(redGL)
            // tMesh.useCullFace = false
            tRedDAELoader['resultMesh'].addChild(tMesh)

        })

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