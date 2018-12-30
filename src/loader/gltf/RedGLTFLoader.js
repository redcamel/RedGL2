"use strict";
var RedGLTFLoader;
(function () {
    var parser
    var WEBGL_COMPONENT_TYPES = {
        5120: Int8Array,
        5121: Uint8Array,
        5122: Int16Array,
        5123: Uint16Array,
        5125: Uint32Array,
        5126: Float32Array
    };
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedGLTFLoader`,
		 description : `
			 GLTF 로더.
			 애니메이션 지원함.
			 COLOR_0, TANGENT는 아직 지원하지 않는다.
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
		 example : `
		    // GLTF 로딩
            RedGLTFLoader(
                RedGL Instance, // redGL
                assetPath + 'glTF/basic/', // assetRootPath
                'DamagedHelmet.gltf', // fileName
                function (v) { // callBack
                    tScene.addChild(v['resultMesh'])
                },
                RedBitmapCubeTexture( // environmentTexture
                    RedGL Instance,
                    [
                        assetPath + 'cubemap/posx.png',
                        assetPath + 'cubemap/negx.png',
                        assetPath + 'cubemap/posy.png',
                        assetPath + 'cubemap/negy.png',
                        assetPath + 'cubemap/posz.png',
                        assetPath + 'cubemap/negz.png'
                    ]
                )
            );
		 `,
		 demo : '../example/loader/gltf/RedGLTFLoader.html',
		 return : 'void'
	 }
     :DOC*/

    var fileLoader = function (src, type, onLoader, onError) {
        var request = new XMLHttpRequest();
        request.open("GET", src, true);
        // request.overrideMimeType('model/gltf+json')
        request.setRequestHeader("Content-Type", (type ? type : "application/xml; ") + 'charset=UTF-8')
        request.onreadystatechange = function (e) {
            if (request.readyState == 4 && request.status === 200) {
                console.log(request)
                onLoader(request)
            } else {
                onError(request, e)
            }
        }
        request.send();
    }
    var arrayBufferLoader = function (src, onLoader, onError) {
        var request = new XMLHttpRequest();
        request.open("GET", src, true);
        request.overrideMimeType('application/octet-stream')
        request.responseType = "arraybuffer";
        request.onreadystatechange = function (e) {
            if (request.readyState == 4 && request.status === 200) {
                console.log(request)
                onLoader(request)
            } else {
                onError(request, e)
            }
        }
        request.send();
    }
    RedGLTFLoader = function (redGL, path, fileName, callback, environmentTexture, parsingOption) {
        if ((!(this instanceof RedGLTFLoader))) return new RedGLTFLoader(redGL, path, fileName, callback, environmentTexture, parsingOption)
        console.log('~~~~~~~~~~~')
        var self = this;
        fileLoader(
            path + fileName,
            null,
            function (request) {
                parser(self, redGL, JSON.parse(request['response']), function () {
                    if (callback) {
                        console.log('모델 파싱 종료');
                        callback(self)
                    }
                })
            },
            function (request, error) {
                console.log(request, error)
            }
        )
        this['redGL'] = redGL;

        this['path'] = path;
        this['fileName'] = fileName;
        this['resultMesh'] = RedMesh(redGL)
        this['resultMesh']['name'] = 'instanceOfRedGLTFLoader_' + RedGL.makeUUID()
        this['parsingResult'] = {
            groups: [],
            materials: [],
            uris: {
                buffers: []
            },
            textures: {},
            cameras: [],
            animations: []
        }
        this['parsingOption'] = parsingOption
        this['environmentTexture'] = environmentTexture || null
        var _currentAnimationInfo = null
        this['stopAnimation'] = function () {
            console.log('_currentAnimationInfo', _currentAnimationInfo, loopList.indexOf(_currentAnimationInfo))
            if (loopList.indexOf(_currentAnimationInfo) > -1) {
                loopList.splice(loopList.indexOf(_currentAnimationInfo), 1)
            }
            console.log('loopList', loopList)
        }
        this['playAnimation'] = function (animationData) {
            loopList.push(
                _currentAnimationInfo = {
                    startTime: performance.now(),
                    targetAnimationData: animationData
                }
            )
            // console.log('loopList', loopList)
        }
        console.log(this)
    };
    RedDefinePropertyInfo.definePrototype('RedGLTFLoader', 'environmentTexture', 'samplerCube', {
        callback: function (v) {
            this['parsingResult']['materials'].forEach(function (v2) {
                if ('environmentTexture' in v2) v2['environmentTexture'] = v
            })
        }
    });
    var loopList = []
    RedGLTFLoader['animationLooper'] = (function () {
        var currentTime, previousTime, nextTime;
        var prevRotation, nextRotation;
        var prevTranslation, nextTranslation;
        var prevScale, nextScale;
        var interpolationValue;
        var targetAnimationData
        return function (time) {
            loopList.forEach(function (v) {
                prevRotation = null
                nextRotation = null
                prevTranslation = null
                nextTranslation = null
                targetAnimationData = v['targetAnimationData']
                targetAnimationData.forEach(function (aniData) {
                    currentTime = ((time - v['startTime']) % (targetAnimationData['maxTime'] * 1000)) / 1000
                    // console.log(currentTime,aniData['minTime'] )
                    var target = aniData['target']
                    var nextIndex, prevIndex
                    prevIndex = aniData['time'].length - 1
                    nextIndex = 0
                    previousTime = aniData['time'][prevIndex]
                    nextTime = aniData['time'][nextIndex]
                    var len = aniData['time'].length
                    var i = 0
                    for (i; i < len; i++) {
                        var tTime = aniData['time'][i]
                        var index = i
                        if (tTime < currentTime) {
                            prevIndex = index
                            previousTime = aniData['time'][prevIndex]
                            if (aniData['time'][prevIndex + 1] == undefined) {
                                nextIndex = 0
                                nextTime = aniData['time'][nextIndex]
                            } else {
                                nextIndex = prevIndex + 1
                                nextTime = aniData['time'][nextIndex]
                            }
                        }
                        if (index == 0 && (currentTime < aniData['time'][i])) {
                            prevIndex = len - 1
                            previousTime = aniData['time'][prevIndex]
                            nextIndex = index
                            nextTime = aniData['time'][nextIndex]
                            currentTime = tTime
                            break
                        }
                        if (index == len - 1 && (currentTime > tTime)) {
                            prevIndex = 0
                            previousTime = aniData['time'][prevIndex]
                            nextIndex = len - 1
                            nextTime = aniData['time'][nextIndex]
                            currentTime = tTime
                            break
                        }
                    }
                    if (aniData['key'] == 'rotation') {
                        // var rotationMTX = mat4.create()
                        // var tRotation = [0, 0, 0]
                        var tQuaternion = [
                            aniData['data'][nextIndex * 4],
                            aniData['data'][nextIndex * 4 + 1],
                            aniData['data'][nextIndex * 4 + 2],
                            aniData['data'][nextIndex * 4 + 3]
                        ]
                        // RedGLUtil.quaternionToRotationMat4(tQuaternion, rotationMTX)
                        // RedGLUtil.mat4ToEuler(rotationMTX, tRotation)
                        // tRotation[0] = -(tRotation[0] * 180 / Math.PI)
                        // tRotation[1] = -(tRotation[1] * 180 / Math.PI)
                        // tRotation[2] = -(tRotation[2] * 180 / Math.PI)
                        nextRotation = tQuaternion
                        //
                        // var rotationMTX = mat4.create()
                        // var tRotation = [0, 0, 0]
                        var tQuaternion = [
                            aniData['data'][prevIndex * 4],
                            aniData['data'][prevIndex * 4 + 1],
                            aniData['data'][prevIndex * 4 + 2],
                            aniData['data'][prevIndex * 4 + 3]
                        ]
                        // RedGLUtil.quaternionToRotationMat4(tQuaternion, rotationMTX)
                        // RedGLUtil.mat4ToEuler(rotationMTX, tRotation)
                        // tRotation[0] = -(tRotation[0] * 180 / Math.PI)
                        // tRotation[1] = -(tRotation[1] * 180 / Math.PI)
                        // tRotation[2] = -(tRotation[2] * 180 / Math.PI)
                        prevRotation = tQuaternion
                    }
                    if (aniData['key'] == 'translation') {
                        nextTranslation = [
                            aniData['data'][nextIndex * 3],
                            aniData['data'][nextIndex * 3 + 1],
                            aniData['data'][nextIndex * 3 + 2]
                        ]
                        prevTranslation = [
                            aniData['data'][prevIndex * 3],
                            aniData['data'][prevIndex * 3 + 1],
                            aniData['data'][prevIndex * 3 + 2]
                        ]
                    }
                    if (aniData['key'] == 'scale') {
                        nextScale = [
                            aniData['data'][nextIndex * 3],
                            aniData['data'][nextIndex * 3 + 1],
                            aniData['data'][nextIndex * 3 + 2]
                        ]
                        prevScale = [
                            aniData['data'][prevIndex * 3],
                            aniData['data'][prevIndex * 3 + 1],
                            aniData['data'][prevIndex * 3 + 2]
                        ]
                    }
                    interpolationValue = (currentTime - previousTime) / (nextTime - previousTime)
                    if (interpolationValue.toString() == 'NaN') interpolationValue = 0
                    if (target) {
                        if (aniData['key'] == 'translation') {
                            // console.log(interpolationValue,nextTranslation , prevTranslation)
                            target.x = prevTranslation[0] + interpolationValue * (nextTranslation[0] - prevTranslation[0])
                            target.y = prevTranslation[1] + interpolationValue * (nextTranslation[1] - prevTranslation[1])
                            target.z = prevTranslation[2] + interpolationValue * (nextTranslation[2] - prevTranslation[2])
                            // console.log(target.y)
                        }
                        if (aniData['key'] == 'rotation') {
                            var tQuat = []
                            var ax = prevRotation[0], ay = prevRotation[1], az = prevRotation[2], aw = prevRotation[3];
                            var bx = nextRotation[0], by = nextRotation[1], bz = nextRotation[2], bw = nextRotation[3];
                            var omega, cosom, sinom, scale0, scale1;
                            // calc cosine
                            cosom = ax * bx + ay * by + az * bz + aw * bw;
                            // adjust signs (if necessary)
                            if (cosom < 0.0) {
                                cosom = -cosom;
                                bx = -bx;
                                by = -by;
                                bz = -bz;
                                bw = -bw;
                            }
                            // calculate coefficients
                            if ((1.0 - cosom) > glMatrix.EPSILON) {
                                // standard case (slerp)
                                omega = Math.acos(cosom);
                                sinom = Math.sin(omega);
                                scale0 = Math.sin((1.0 - interpolationValue) * omega) / sinom;
                                scale1 = Math.sin(interpolationValue * omega) / sinom;
                            } else {
                                // "from" and "to" quaternions are very close
                                //  ... so we can do a linear interpolation
                                scale0 = 1.0 - interpolationValue;
                                scale1 = interpolationValue;
                            }
                            // calculate final values
                            tQuat[0] = scale0 * ax + scale1 * bx;
                            tQuat[1] = scale0 * ay + scale1 * by;
                            tQuat[2] = scale0 * az + scale1 * bz;
                            tQuat[3] = scale0 * aw + scale1 * bw;
                            var rotationMTX = []
                            var tRotation = [0, 0, 0]
                            RedGLUtil.quaternionToRotationMat4(tQuat, rotationMTX)
                            RedGLUtil.mat4ToEuler(rotationMTX, tRotation)
                            tRotation[0] = -(tRotation[0] * 180 / Math.PI)
                            tRotation[1] = -(tRotation[1] * 180 / Math.PI)
                            tRotation[2] = -(tRotation[2] * 180 / Math.PI)
                            target.rotationX = tRotation[0]
                            target.rotationY = tRotation[1]
                            target.rotationZ = tRotation[2]
                            // console.log(prevIndex, nextIndex)
                            // console.log(parseInt(prevRotation[2]), parseInt(nextRotation[2]))
                            // console.log(target.rotationX ,target.rotationY ,target.rotationZ )
                        }
                        if (aniData['key'] == 'scale') {
                            target.scaleX = prevScale[0] + interpolationValue * (nextScale[0] - prevScale[0])
                            target.scaleY = prevScale[1] + interpolationValue * (nextScale[1] - prevScale[1])
                            target.scaleZ = prevScale[2] + interpolationValue * (nextScale[2] - prevScale[2])
                        }
                        if (aniData['key'] == 'weights') {
                            // console.log(aniData)
                            var targetMesh = aniData['target']
                            var targetData = targetMesh['geometry']['interleaveBuffer']['data']
                            var originData = targetMesh['_morphInfo']['origin']
                            targetData.forEach(function (v, index) {
                                var prev, next
                                prev = originData[index]
                                next = originData[index]
                                targetMesh['_morphInfo']['list'].forEach(function (v, morphIndex) {
                                    prev += aniData['data'][prevIndex * 2 + morphIndex] * v['interleaveData'][index]
                                    next += aniData['data'][nextIndex * 2 + morphIndex] * v['interleaveData'][index]
                                })
                                targetData[index] = prev + interpolationValue * (next - prev)
                            })
                            targetMesh['geometry']['interleaveBuffer'].upload(targetData)
                        }
                    }
                })
            })
        }
    })();
    parser = (function () {
        var checkAsset;
        var getBaseResource;
        var getBufferResources;
        var parseScene;
        var makeMesh;
        var parseAnimations;
        var parseNode;
        var parseCameras;
        var checkTRSAndMATRIX;
        /*
            glTF는 asset 속성이 있어야한다.
            최소한 버전을 반드시 포함해야함.
         */
        checkAsset = function (json) {
            // console.log(json)
            if (json['asset'] === undefined) RedGLUtil.throwFunc('RedGLTFLoader - asset은 반드시 정의되어야함')
            if (json['asset'].version[0] < 2) RedGLUtil.throwFunc('RedGLTFLoader - asset의 버전은 2.0이상이어야함')
        }
        getBufferResources = function (redGLTFLoader, data, callback) {
            var allNum = 0, loadedNum = 0
            var tList = []
            data['buffers'].forEach(function (v, index) {
                v['_redURIkey'] = 'buffers'
                v['_redURIIndex'] = index
                tList.push(v)
            })
            tList.forEach(function (v) {
                // console.log('버퍼테이터', v)
                allNum++
                var tSrc = v['uri'].substr(0, 5) == 'data:' ? v['uri'] : redGLTFLoader['path'] + v['uri']
                // console.log('tSrc', tSrc)
                arrayBufferLoader(
                    tSrc,
                    function (request) {
                        loadedNum++
                        console.log(request)
                        // console.log(request.response)
                        redGLTFLoader['parsingResult']['uris'][v['_redURIkey']][v['_redURIIndex']] = new DataView(request.response);
                        if (loadedNum == allNum) {
                            console.log("redGLTFLoader['parsingResult']['uris']", redGLTFLoader['parsingResult']['uris'])
                            console.log("uris로딩현황", loadedNum, loadedNum)
                            if (callback) callback()
                        }
                    },
                    function (request, error) {
                        console.log(request, error)
                    }
                )
            })
        }
        /*
            전체 데이터중 외부소스데이터를 모두 실제화 해둔다.
         */
        getBaseResource = function (redGLTFLoader, json, callback) {
            // for (var k in json) {
            //     // console.log(k, json[k])
            //     switch (k) {
            //         case 'asset' :
            //             console.log('TODO : asset 내부 리소스 로딩');
            //             break;
            //         case 'scene' :
            //             console.log('TODO : scene 내부 리소스 로딩');
            //             break;
            //         case 'scenes' :
            //             console.log('TODO : scenes 내부 리소스 로딩');
            //             break;
            //         case 'nodes' :
            //             console.log('TODO : nodes 내부 리소스 로딩');
            //             break;
            //         case 'meshes' :
            //             console.log('TODO : meshes 내부 리소스 로딩');
            //             break;
            //         case 'buffers' :
            //             console.log('TODO : buffers 내부 리소스 로딩');
            //             break;
            //         case 'bufferViews' :
            //             console.log('TODO : bufferViews 내부 리소스 로딩');
            //             break;
            //         case 'skins' :
            //             console.log('TODO : skins 내부 리소스 로딩');
            //             break;
            //         case 'accessors' :
            //             console.log('TODO : accessors 내부 리소스 로딩');
            //             break;
            //         case 'images' :
            //             console.log('TODO : images 내부 리소스 로딩');
            //             break;
            //         case 'materials' :
            //             console.log('TODO : materials 내부 리소스 로딩');
            //             break;
            //         case 'samplers' :
            //             console.log('TODO : samplers 내부 리소스 로딩');
            //             break;
            //         case 'textures' :
            //             console.log('TODO : textures 내부 리소스 로딩');
            //             break;
            //         case 'cameras' :
            //             console.log('TODO : images 내부 리소스 로딩');
            //             break;
            //         case 'animations' :
            //             console.log('TODO : images 내부 리소스 로딩');
            //             break;
            //         default :
            //             console.log(k, '고려안한거임');
            //             break;
            //     }
            // }
            getBufferResources(redGLTFLoader, json, callback);
        }
        parseCameras = function (redGLTFLoader, json) {
            console.log(json)
            if (json['cameras']) {
                json['cameras'].forEach(function (v) {
                    console.log('카메라', v)
                    var t0 = RedCamera()
                    if (v['type'] == 'orthographic') {
                        t0.orthographicYn = true
                    }
                    else {
                        t0['fov'] = v['perspective']['yfov'] * 180 / Math.PI
                        t0['farClipping'] = v['perspective']['zfar']
                        t0['nearClipping'] = v['perspective']['znear']
                    }
                    redGLTFLoader['parsingResult']['cameras'].push(t0)
                })
            }
        }
        parseScene = function (redGLTFLoader, json, callback) {
            console.log('parseScene 시작')
            console.log(json)
            var i, len;
            var nodesInScene;
            var nodeIndex;
            nodesInScene = json['scenes'][0]['nodes']
            i = 0;
            len = nodesInScene.length;
            var tick = function () {
                nodeIndex = nodesInScene[i];
                parseNode(redGLTFLoader, json, nodeIndex, json['nodes'][nodeIndex], redGLTFLoader['resultMesh']);
                i++;
                if (i == len) {
                    if (callback) callback()
                }
                else requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            // json['scenes'][0]['nodes'].forEach(function (nodeIndex) {
            //     // console.log('노드를 찾음', nodeIndex)
            //     parseNode(redGLTFLoader, json, nodeIndex, json['nodes'][nodeIndex], redGLTFLoader['resultMesh'])
            // })
        }
        checkTRSAndMATRIX = (function () {
            var rotationMTX = mat4.create()
            var tRotation = [0, 0, 0]
            var tQuaternion = []
            var tScale = []
            var tMatrix
            return function (target, info) {
                if ('matrix' in info) {
                    // parseMatrix
                    tMatrix = info['matrix']
                    // console.log('~~~', info, tMatrix)
                    // mat4.getRotation(tQuaternion, tMatrix)
                    // if (tQuaternion[3] < 0) console.log('tQuaternion', tQuaternion)
                    // RedGLUtil.quaternionToRotationMat4(tQuaternion, rotationMTX)
                    RedGLUtil.mat4ToEuler(tMatrix, tRotation)
                    target.rotationX = -(tRotation[0] * 180 / Math.PI)
                    target.rotationY = -(tRotation[1] * 180 / Math.PI)
                    target.rotationZ = -(tRotation[2] * 180 / Math.PI)
                    target.x = tMatrix[12]
                    target.y = tMatrix[13]
                    target.z = tMatrix[14]
                    mat4.getScaling(tScale, tMatrix)
                    target.scaleX = tScale[0]
                    target.scaleY = tScale[1]
                    target.scaleZ = tScale[2]
                }
                if ('rotation' in info) {
                    // 로데이션은 쿼터니언으로 들어온다.
                    tQuaternion = info['rotation'];
                    RedGLUtil.quaternionToRotationMat4(tQuaternion, rotationMTX)
                    RedGLUtil.mat4ToEuler(rotationMTX, tRotation)
                    target.rotationX = -(tRotation[0] * 180 / Math.PI)
                    target.rotationY = -(tRotation[1] * 180 / Math.PI)
                    target.rotationZ = -(tRotation[2] * 180 / Math.PI)
                }
                if ('translation' in info) {
                    // 위치
                    target.x = info['translation'][0];
                    target.y = info['translation'][1];
                    target.z = info['translation'][2];
                }
                if ('scale' in info) {
                    // 스케일
                    target.scaleX = info['scale'][0];
                    target.scaleY = info['scale'][1];
                    target.scaleZ = info['scale'][2];
                }
            }
        })();
        var parseSkin = function (redGLTFLoader, json, info, tMesh) {
            console.log('스킨설정!', info)
            var skinInfo = {
                joints: [],
                inverseBindMatrices: []
            }
            var nodes = json['nodes']
            info['joints'].forEach(function (v) {
                // console.log(json['nodes'][v])
                var tJointMesh = nodes[v]['RedMesh']
                skinInfo['joints'].push(tJointMesh)
                tJointMesh.geometry = RedSphere(redGLTFLoader['redGL'], 0.05, 3, 3, 3)
                tJointMesh.material = RedColorMaterial(redGLTFLoader['redGL'])
                tJointMesh.drawMode = redGLTFLoader['redGL'].gl.LINE_LOOP
                tJointMesh.depthTestFunc = redGLTFLoader['redGL'].gl.NEVER
            })
            // 스켈레톤 정보가 있으면 정보와 메쉬를 연결해둔다.
            if (info['skeleton']) skinInfo['skeleton'] = json['nodes'][info['skeleton']]['RedMesh']
            // 액세서 구하고..
            // 정보 파싱한다.
            var accessorIndex = info['inverseBindMatrices']
            var accessorInfo = new RedGLTF_AccessorInfo(redGLTFLoader, json, accessorIndex)
            var tBYTES_PER_ELEMENT = accessorInfo['componentType_BYTES_PER_ELEMENT'];
            var tBufferViewByteStride = accessorInfo['bufferViewByteStride'];
            var tBufferURIDataView = accessorInfo['bufferURIDataView'];
            var tGetMethod = accessorInfo['getMethod'];
            var tType = accessorInfo['accessor']['type'];
            var tCount = accessorInfo['accessor']['count'];
            var strideIndex = 0;
            var stridePerElement = tBufferViewByteStride / tBYTES_PER_ELEMENT
            var i = accessorInfo['startIndex']
            var len
            switch (tType) {
                case 'MAT4' :
                    if (tBufferViewByteStride) {
                        len = i + tCount * (tBufferViewByteStride / tBYTES_PER_ELEMENT)
                        for (i; i < len; i++) {
                            if (strideIndex % stridePerElement < 16) {
                                skinInfo['inverseBindMatrices'].push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                            }
                            strideIndex++
                        }
                    } else {
                        len = i + tCount * 16;
                        for (i; i < len; i++) {
                            skinInfo['inverseBindMatrices'].push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                            strideIndex++
                        }
                    }
                    break
                default :
                    console.log('알수없는 형식 엑세서 타입', tType)
                    break
            }
            skinInfo['inverseBindMatrices'] = new Float32Array(skinInfo['inverseBindMatrices'])
            tMesh['skinInfo'] = skinInfo
            // console.log(skinInfo)
        }
        parseNode = (function () {
            return function (redGLTFLoader, json, nodeIndex, info, parentMesh) {
                if ('mesh' in info) {
                    var tMeshIndex = info['mesh']
                    // console.log('nodeInfo', info)
                    // console.log('parentMesh', parentMesh)
                    makeMesh(redGLTFLoader, json, json['meshes'][tMeshIndex]).forEach(function (tMesh) {
                        info['RedMesh'] = tMesh
                        parentMesh.addChild(tMesh)
                        // console.log("메쉬인덱스를 찾음", tMeshIndex, parentMesh)
                        checkTRSAndMATRIX(tMesh, info)
                        // tMesh.matrix = matrix
                        // tMesh.autoUpdateMatrix = false
                        if ('children' in info) {
                            info['children'].forEach(function (index) {
                                parseNode(redGLTFLoader, json, index, json['nodes'][index], tMesh)
                            })
                        }
                        if ('skin' in info) parseSkin(redGLTFLoader, json, json['skins'][info['skin']], tMesh)
                    })
                }
                else {
                    var tGroup
                    // console.log('차일드 정보로 구성된 정보임', info)

                    if (redGLTFLoader['parsingResult']['groups'][nodeIndex]) {
                        console.log('기존에 존재!', redGLTFLoader['parsingResult']['groups'][nodeIndex])
                        tGroup = redGLTFLoader['parsingResult']['groups'][nodeIndex]
                        info['RedMesh'] = tGroup
                    } else {
                        tGroup = RedMesh(redGLTFLoader['redGL'])
                        parentMesh.addChild(tGroup)
                        info['RedMesh'] = tGroup
                        redGLTFLoader['parsingResult']['groups'][nodeIndex] = tGroup
                        redGLTFLoader['parsingResult']['groups'][nodeIndex]['name'] = info['name']
                    }
                    checkTRSAndMATRIX(tGroup, info)
                    // 카메라가 있으면 또 연결시킴
                    if ('camera' in info) {
                        redGLTFLoader['parsingResult']['cameras'][info['camera']]['_parentMesh'] = parentMesh
                        redGLTFLoader['parsingResult']['cameras'][info['camera']]['_targetMesh'] = tGroup
                        var tCameraMesh = RedMesh(redGLTFLoader['redGL'])
                        tGroup.addChild(tCameraMesh)
                        redGLTFLoader['parsingResult']['cameras'][info['camera']]['_cameraMesh'] = tCameraMesh
                    }
                    // tGroup.matrix = matrix
                    // tGroup.autoUpdateMatrix = false
                    if ('children' in info) {
                        info['children'].forEach(function (index) {
                            parseNode(redGLTFLoader, json, index, json['nodes'][index], tGroup)
                        })
                    }
                    if ('skin' in info) parseSkin(redGLTFLoader, json, json['skins'][info['skin']], tGroup)
                }
            }
        })()
        var parseSparse = function (redGLTFLoader, key, tAccessors, json, vertices, uvs, uvs1, normals, jointWeights, joints) {
            if (tAccessors['sparse']) {
                var sparseVerties = []
                var sparseNormals = []
                var sparseUvs = [];
                (function () {
                    var tSparse = tAccessors['sparse']
                    var tSparseValuesAccessors = tSparse['values']
                    console.log('tSparseValuesAccessors', tSparseValuesAccessors)
                    var tBufferView = json['bufferViews'][tSparseValuesAccessors['bufferView']]
                    var tBufferIndex = tBufferView['buffer']
                    var tBuffer = json['buffers'][tBufferIndex]
                    var tBufferURIDataView;
                    if (tBuffer['uri']) {
                        tBufferURIDataView = redGLTFLoader['parsingResult']['uris']['buffers'][tBufferIndex]
                    }
                    var i, len;
                    var tComponentType
                    var tMethod;
                    tComponentType = WEBGL_COMPONENT_TYPES[tAccessors['componentType']]
                    if (tComponentType == Float32Array) tMethod = 'getFloat32'
                    if (tComponentType == Uint32Array) tMethod = 'getUint32'
                    if (tComponentType == Uint16Array) tMethod = 'getUint16'
                    if (tComponentType == Int16Array) tMethod = 'getInt16'
                    if (tComponentType == Uint8Array) tMethod = 'getUint8'
                    if (tComponentType == Int8Array) tMethod = 'getInt8'
                    var tAccessorBufferOffset = tAccessors['byteOffset'] || 0
                    var tBufferViewOffset = tBufferView['byteOffset'] || 0
                    i = (tBufferViewOffset + tAccessorBufferOffset) / tComponentType['BYTES_PER_ELEMENT']
                    switch (tAccessors['type']) {
                        case 'VEC3' :
                            len = i + (tComponentType['BYTES_PER_ELEMENT'] * tSparse['count']) / tComponentType['BYTES_PER_ELEMENT'] * 3
                            console.log('오오오오', key, i, len)
                            for (i; i < len; i++) {
                                if (key == 'NORMAL') sparseNormals.push(tBufferURIDataView[tMethod](i * tComponentType['BYTES_PER_ELEMENT'], true))
                                else if (key == 'POSITION') sparseVerties.push(tBufferURIDataView[tMethod](i * tComponentType['BYTES_PER_ELEMENT'], true))
                            }
                            // console.log('인터리브 버퍼 데이터', vertices)
                            break
                        case 'VEC2' :
                            len = i + (tComponentType['BYTES_PER_ELEMENT'] * tSparse['count']) / tComponentType['BYTES_PER_ELEMENT'] * 2
                            // console.log(i, len)
                            for (i; i < len; i++) {
                                if (key == 'TEXCOORD_0') {
                                    if (i % 2 == 0) sparseUvs.push(tBufferURIDataView[tMethod](i * tComponentType['BYTES_PER_ELEMENT'], true))
                                    else sparseUvs.push(-tBufferURIDataView[tMethod](i * tComponentType['BYTES_PER_ELEMENT'], true))
                                }
                            }
                            // console.log('인터리브 버퍼 데이터', vertices)
                            break
                        default :
                            console.log('알수없는 형식 엑세서 타입', tAccessors['type'])
                            break
                    }
                })();
                // console.log(sparseVerties)
                // console.log(sparseNormals)
                // console.log(sparseUvs);
                var tSparse = tAccessors['sparse']
                var tSparseAccessors = tSparse['indices']
                // console.log('tSparseAccessors', tSparseAccessors)
                var tBufferView = json['bufferViews'][tSparseAccessors['bufferView']]
                var tBufferIndex = tBufferView['buffer']
                var tBuffer = json['buffers'][tBufferIndex]
                var tBufferURIDataView;
                if (tBuffer['uri']) {
                    tBufferURIDataView = redGLTFLoader['parsingResult']['uris']['buffers'][tBufferIndex]
                }
                var i, len;
                var tComponentType
                var tMethod;
                tComponentType = WEBGL_COMPONENT_TYPES[tSparseAccessors['componentType']]
                if (tComponentType == Uint16Array) tMethod = 'getUint16'
                else if (tComponentType == Uint8Array) tMethod = 'getUint8'
                var tAccessorBufferOffset = tSparseAccessors['byteOffset'] || 0
                var tBufferViewOffset = tBufferView['byteOffset'] || 0
                i = (tBufferViewOffset + tAccessorBufferOffset) / tComponentType['BYTES_PER_ELEMENT']
                //
                len = i + (tComponentType['BYTES_PER_ELEMENT'] * tSparse['count']) / tComponentType['BYTES_PER_ELEMENT']
                // console.log('오오오오', key, i, len)
                var sparseIndex = 0
                for (i; i < len; i++) {
                    var targetIndex = tBufferURIDataView[tMethod](i * tComponentType['BYTES_PER_ELEMENT'], true)
                    // console.log('몇번째껄 부르는건가', targetIndex)
                    vertices[targetIndex * 3] = sparseVerties[sparseIndex * 3]
                    vertices[targetIndex * 3 + 1] = sparseVerties[sparseIndex * 3 + 1]
                    vertices[targetIndex * 3 + 2] = sparseVerties[sparseIndex * 3 + 2]
                    sparseIndex++
                    // indices.push(tBufferURIDataView[tMethod](i * tComponentType['BYTES_PER_ELEMENT'], true))
                }
            }
        }
        var RedGLTF_AccessorInfo = function (redGLTFLoader, json, accessorIndex) {
            this['accessor'] = json['accessors'][accessorIndex];
            this['bufferView'] = json['bufferViews'][this['accessor']['bufferView']];
            this['bufferIndex'] = this['bufferView']['buffer'];
            this['buffer'] = json['buffers'][this['bufferIndex']]
            this['bufferURIDataView'] = null
            if (this['buffer']['uri']) {
                this['bufferURIDataView'] = redGLTFLoader['parsingResult']['uris']['buffers'][this['bufferIndex']]
            }
            ////////////////////////////
            this['componentType'] = WEBGL_COMPONENT_TYPES[this['accessor']['componentType']]
            this['componentType_BYTES_PER_ELEMENT'] = this['componentType']['BYTES_PER_ELEMENT'];
            switch (this['componentType']) {
                case Float32Array :
                    this['getMethod'] = 'getFloat32'
                    break
                case Uint32Array :
                    this['getMethod'] = 'getUint32'
                    break
                case Uint16Array :
                    this['getMethod'] = 'getUint16'
                    break
                case Int16Array :
                    this['getMethod'] = 'getInt16'
                    break
                case Uint8Array :
                    this['getMethod'] = 'getUint8'
                    break
                case Int8Array :
                    this['getMethod'] = 'getInt8'
                    break
                default :
                    RedGLUtil.throwFunc('파싱할수없는 타입', this['componentType'])
            }
            this['accessorBufferOffset'] = this['accessor']['byteOffset'] || 0
            this['bufferViewOffset'] = this['bufferView']['byteOffset'] || 0
            this['bufferViewByteStride'] = this['bufferView']['byteStride'] || 0
            this['startIndex'] = (this['bufferViewOffset'] + this['accessorBufferOffset']) / this['componentType_BYTES_PER_ELEMENT'];
            // console.log('해당 bufferView 정보', this['bufferView'])
            // console.log('바라볼 버퍼 인덱스', this['bufferIndex'])
            // console.log('바라볼 버퍼', this['buffer'])
            // console.log('바라볼 버퍼데이터', this['bufferURIDataView'])
            // console.log('바라볼 엑세서', this['accessor'])
            // console.log('this['componentType']', this['componentType'])
            // console.log("this['getMethod']", this['getMethod'])
            // console.log("this['bufferView']['byteOffset']", this['bufferView']['byteOffset'])
            // console.log("this['accessor']['byteOffset']", this['accessor']['byteOffset'])
        }
        var parseAttributeInfo = function (redGLTFLoader, json, key, accessorInfo, vertices, uvs, uvs1, normals, jointWeights, joints, tangents) {
            var tBYTES_PER_ELEMENT = accessorInfo['componentType_BYTES_PER_ELEMENT'];
            var tBufferViewByteStride = accessorInfo['bufferViewByteStride'];
            var tBufferURIDataView = accessorInfo['bufferURIDataView'];
            var tGetMethod = accessorInfo['getMethod'];
            var tType = accessorInfo['accessor']['type'];
            var tCount = accessorInfo['accessor']['count'];
            var strideIndex = 0;
            var stridePerElement = tBufferViewByteStride / tBYTES_PER_ELEMENT
            var i = accessorInfo['startIndex']
            var len
            switch (tType) {
                case 'VEC4' :
                    if (tBufferViewByteStride) {
                        len = i + tCount * (tBufferViewByteStride / tBYTES_PER_ELEMENT)
                        for (i; i < len; i++) {
                            if (strideIndex % stridePerElement < 4) {
                                if (key == 'WEIGHTS_0') jointWeights.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                                else if (key == 'JOINTS_0') joints.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                                // else if ( key == 'COLOR_0' )
                                // else if ( key == 'TANGENT' ) tangents.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                                // else RedGLUtil.throwFunc('VEC4에서 현재 지원하고 있지 않는 키', key)
                            }
                            strideIndex++
                        }
                    } else {
                        len = i + tCount * 4;
                        for (i; i < len; i++) {
                            if (key == 'WEIGHTS_0') jointWeights.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                            else if (key == 'JOINTS_0') joints.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                            // else if ( key == 'COLOR_0' )
                            // else if ( key == 'TANGENT' ) tangents.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                            // else RedGLUtil.throwFunc('VEC4에서 현재 지원하고 있지 않는 키', key)
                            strideIndex++
                        }
                    }
                    break
                case 'VEC3' :
                    if (tBufferViewByteStride) {
                        len = i + tCount * (tBufferViewByteStride / tBYTES_PER_ELEMENT)
                        for (i; i < len; i++) {
                            if (strideIndex % stridePerElement < 3) {
                                if (key == 'NORMAL') normals.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                                else if (key == 'POSITION') vertices.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                                // else if ( key == 'COLOR_0' )
                                // else if ( key == 'TANGENT' ) tangents.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                                // else RedGLUtil.throwFunc('VEC3에서 현재 지원하고 있지 않는 키', key)
                            }
                            strideIndex++
                        }
                    } else {
                        len = i + tCount * 3;
                        for (i; i < len; i++) {
                            if (key == 'NORMAL') normals.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                            else if (key == 'POSITION') vertices.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                            // else if ( key == 'COLOR_0' )
                            // else if ( key == 'TANGENT' ) tangents.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                            // else RedGLUtil.throwFunc('VEC3에서 현재 지원하고 있지 않는 키', key)
                            strideIndex++
                        }
                        // console.log('인터리브 버퍼 데이터', vertices)
                    }
                    break
                case 'VEC2' :
                    if (tBufferViewByteStride) {
                        len = i + tCount * (tBufferViewByteStride / tBYTES_PER_ELEMENT)
                        for (i; i < len; i++) {
                            if (strideIndex % stridePerElement < 2) {
                                if (key == 'TEXCOORD_0') {
                                    if (strideIndex % 2 == 0) uvs.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                                    else uvs.push(1 - tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                                } else if (key == 'TEXCOORD_1') {
                                    if (strideIndex % 2 == 0) uvs1.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                                    else uvs1.push(1 - tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                                }
                                else RedGLUtil.throwFunc('VEC2에서 현재 지원하고 있지 않는 키', key)
                            }
                            strideIndex++
                        }
                    } else {
                        len = i + tCount * 2;
                        for (i; i < len; i++) {
                            if (key == 'TEXCOORD_0') {
                                if (strideIndex % 2 == 0) uvs.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                                else uvs.push(1 - tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                            } else if (key == 'TEXCOORD_1') {
                                if (strideIndex % 2 == 0) uvs1.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                                else uvs1.push(1 - tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                            } else RedGLUtil.throwFunc('VEC2에서 현재 지원하고 있지 않는 키', key)
                            strideIndex++
                        }
                    }
                    break
                default :
                    console.log('알수없는 형식 엑세서 타입', tType)
                    break
            }
        }
        var RedGLTF_MorphInfo = function (redGLTFLoader, json, primitiveData) {
            var morphList = []
            if (primitiveData['targets']) {
                primitiveData['targets'].forEach(function (v2) {
                    var tMorphData = {
                        vertices: [],
                        normals: [],
                        uvs: [],
                        uvs1: [],
                        jointWeights: [],
                        joints: []
                    }
                    morphList.push(tMorphData)
                    for (var key in v2) {
                        var vertices = tMorphData['vertices']
                        var normals = tMorphData['normals']
                        var uvs = tMorphData['uvs']
                        var uvs1 = tMorphData['uvs1']
                        var jointWeights = tMorphData['jointWeights']
                        var joints = tMorphData['joints']
                        var accessorIndex = v2[key]
                        var accessorInfo = new RedGLTF_AccessorInfo(redGLTFLoader, json, accessorIndex)
                        // 어트리뷰트 갈궈서 파악함
                        parseAttributeInfo(
                            redGLTFLoader, json, key, accessorInfo,
                            vertices, uvs, uvs1, normals, jointWeights, joints
                        )
                        // 스파스 정보도 갈굼
                        if (accessorInfo['accessor']['sparse']) parseSparse(redGLTFLoader, key, accessorInfo['accessor'], json, vertices, uvs, uvs1, normals, jointWeights, joints)
                    }
                })
            }
            this['list'] = morphList
            this['origin'] = null
        }
        var parseIndicesInfo = function (redGLTFLoader, json, key, accessorInfo, indices) {
            var tBYTES_PER_ELEMENT = accessorInfo['componentType_BYTES_PER_ELEMENT'];
            var tBufferURIDataView = accessorInfo['bufferURIDataView'];
            var tGetMethod = accessorInfo['getMethod'];
            var tType = accessorInfo['accessor']['type'];
            var tCount = accessorInfo['accessor']['count'];
            var i = accessorInfo['startIndex']
            var len;
            // console.log('인덱스!!', accessorInfo)
            switch (tType) {
                case 'SCALAR' :
                    len = i + tCount
                    // console.log(i, len)
                    for (i; i < len; i++) {
                        indices.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                    }
                    // console.log('인덱스버퍼 데이터', indices)
                    break
                default :
                    console.log('알수없는 형식 엑세서 타입', accessorInfo['accessor'])
                    break
            }
        }
        var parseMaterialInfo = (function () {
            var getURL = function (redGLTFLoader, json, sourceIndex) {
                return (json['images'][sourceIndex]['uri'].indexOf(';base64,') > -1 ? '' : redGLTFLoader['path']) + json['images'][sourceIndex]['uri']
            }
            var getSamplerInfo = function (redGLTFLoader, json, samplerIndex) {
                var result = {}
                if (json['samplers']) {
                    var t0 = json['samplers'][samplerIndex]
                    if ('magFilter' in t0) result['mag'] = t0['magFilter']
                    if ('minFilter' in t0) result['min'] = t0['minFilter']
                    if ('wrapS' in t0) result['wrap_s'] = t0['wrapS']
                    if ('wrapT' in t0) result['wrap_t'] = t0['wrapT']
                } else {
                    console.log('있긴하냐', samplerIndex)
                }
                result['string'] = JSON.stringify(result)
                // console.log('result', result)
                return result
            }
            return function (redGLTFLoader, json, v) {
                var tMaterial
                var doubleSide = false
                var alphaMode;
                var alphaCutoff = 0.5
                if ('material' in v) {
                    var tIndex = v['material']
                    var tMaterialInfo = json['materials'][tIndex]
                    if ('doubleSided' in tMaterialInfo) doubleSide = tMaterialInfo['doubleSided'] ? true : false
                    if ('alphaMode' in tMaterialInfo) alphaMode = tMaterialInfo['alphaMode']
                    if ('alphaCutoff' in tMaterialInfo) alphaCutoff = tMaterialInfo['alphaCutoff']
                    var diffseTexture, normalTexture, roughnessTexture, emissiveTexture, occlusionTexture;
                    // console.log('tMaterialInfo', tMaterialInfo)
                    if ('baseColorTexture' in tMaterialInfo['pbrMetallicRoughness']) {
                        var baseTextureIndex = tMaterialInfo['pbrMetallicRoughness']['baseColorTexture']['index']
                        var baseTextureInfo = json['textures'][baseTextureIndex]
                        var diffuseSourceIndex = baseTextureInfo['source']
                        var tURL = getURL(redGLTFLoader, json, diffuseSourceIndex)
                        var samplerIndex = baseTextureInfo['sampler']
                        var option = getSamplerInfo(redGLTFLoader, json, samplerIndex)
                        var tKey = tURL + option['string']
                        if (redGLTFLoader['parsingResult']['textures'][tKey]) diffseTexture = redGLTFLoader['parsingResult']['textures'][tKey]
                        else diffseTexture = redGLTFLoader['parsingResult']['textures'][tKey] = RedBitmapTexture(redGLTFLoader['redGL'], tURL, option)
                        // var t0 = document.createElement('img')
                        // t0.src = json['images'][diffuseSourceIndex]['uri']
                        // t0.style.cssText = 'position:absolute;top:0px;left:0px;width:500px'
                        // document.body.appendChild(t0)
                    }
                    if ('metallicRoughnessTexture' in tMaterialInfo['pbrMetallicRoughness']) {
                        var roughnessTextureIndex = tMaterialInfo['pbrMetallicRoughness']['metallicRoughnessTexture']['index']
                        var roughnessTextureInfo = json['textures'][roughnessTextureIndex]
                        var roughnessSourceIndex = roughnessTextureInfo['source']
                        var tURL = getURL(redGLTFLoader, json, roughnessSourceIndex)
                        var samplerIndex = roughnessTextureInfo['sampler']
                        var option = getSamplerInfo(redGLTFLoader, json, samplerIndex)
                        var tKey = tURL + option['string']
                        if (redGLTFLoader['parsingResult']['textures'][tKey]) roughnessTexture = redGLTFLoader['parsingResult']['textures'][tKey]
                        else roughnessTexture = redGLTFLoader['parsingResult']['textures'][tKey] = RedBitmapTexture(redGLTFLoader['redGL'], tURL, option)
                        // var t0 = document.createElement('img')
                        // t0.src = json['images'][roughnessSourceIndex]['uri']
                        // t0.style.cssText = 'position:absolute;top:0px;left:0px;width:500px'
                        // document.body.appendChild(t0)
                    }
                    var normalTextureIndex = tMaterialInfo['normalTexture']
                    if (normalTextureIndex != undefined) {
                        normalTextureIndex = normalTextureIndex['index']
                        var normalTextureInfo = json['textures'][normalTextureIndex]
                        var normalSourceIndex = normalTextureInfo['source']
                        var tURL = getURL(redGLTFLoader, json, normalSourceIndex)
                        var samplerIndex = normalTextureInfo['sampler']
                        var option = getSamplerInfo(redGLTFLoader, json, samplerIndex)
                        var tKey = tURL + option['string']
                        if (redGLTFLoader['parsingResult']['textures'][tKey]) normalTexture = redGLTFLoader['parsingResult']['textures'][tKey]
                        else normalTexture = redGLTFLoader['parsingResult']['textures'][tKey] = RedBitmapTexture(redGLTFLoader['redGL'], tURL, option)
                        // var t0 = document.createElement('img')
                        // t0.src = json['images'][normalSourceIndex]['uri']
                        // t0.style.cssText = 'position:absolute;top:0px;left:0px;width:500px'
                        // document.body.appendChild(t0)
                    }
                    var emissiveTextureIndex = tMaterialInfo['emissiveTexture']
                    if (emissiveTextureIndex != undefined) {
                        emissiveTextureIndex = emissiveTextureIndex['index']
                        var emissiveTextureInfo = json['textures'][emissiveTextureIndex]
                        var emissiveSourceIndex = emissiveTextureInfo['source']
                        var tURL = getURL(redGLTFLoader, json, emissiveSourceIndex)
                        var samplerIndex = emissiveTextureInfo['sampler']
                        var option = getSamplerInfo(redGLTFLoader, json, samplerIndex)
                        var tKey = tURL + option['string']
                        if (redGLTFLoader['parsingResult']['textures'][tKey]) emissiveTexture = redGLTFLoader['parsingResult']['textures'][tKey]
                        else emissiveTexture = redGLTFLoader['parsingResult']['textures'][tKey] = RedBitmapTexture(redGLTFLoader['redGL'], tURL, option)
                        // var t0 = document.createElement('img')
                        // t0.src = json['images'][emissiveSourceIndex]['uri']
                        // t0.style.cssText = 'position:absolute;top:0px;left:0px;width:500px'
                        // document.body.appendChild(t0)
                    }
                    var occlusionTextureIndex = tMaterialInfo['occlusionTexture']
                    if (occlusionTextureIndex != undefined) {
                        occlusionTextureIndex = occlusionTextureIndex['index']
                        var occlusionTextureInfo = json['textures'][occlusionTextureIndex]
                        var occlusionSourceIndex = occlusionTextureInfo['source']
                        var tURL = getURL(redGLTFLoader, json, occlusionSourceIndex)
                        var samplerIndex = occlusionTextureInfo['sampler']
                        var option = getSamplerInfo(redGLTFLoader, json, samplerIndex)
                        var tKey = tURL + option['string']
                        if (redGLTFLoader['parsingResult']['textures'][tKey]) occlusionTexture = redGLTFLoader['parsingResult']['textures'][tKey]
                        else occlusionTexture = redGLTFLoader['parsingResult']['textures'][tKey] = RedBitmapTexture(redGLTFLoader['redGL'], tURL, option)
                        // var t0 = document.createElement('img')
                        // t0.src = json['images'][occlusionSourceIndex]['uri']
                        // t0.style.cssText = 'position:absolute;top:0px;left:0px;width:500px'
                        // document.body.appendChild(t0)
                    }
                    var metallicFactor, roughnessFactor
                    if ('metallicFactor' in tMaterialInfo['pbrMetallicRoughness']) {
                        metallicFactor = tMaterialInfo['pbrMetallicRoughness']['metallicFactor']
                    }
                    if ('roughnessFactor' in tMaterialInfo['pbrMetallicRoughness']) {
                        roughnessFactor = tMaterialInfo['pbrMetallicRoughness']['roughnessFactor']
                    }
                    var tColor
                    // if (!redGLTFLoader['environmentTexture']) {
                    //     redGLTFLoader['environmentTexture'] = RedBitmapCubeTexture(redGLTFLoader['redGL'], [
                    //         '../asset/cubemap/SwedishRoyalCastle/px.jpg',
                    //         '../asset/cubemap/SwedishRoyalCastle/nx.jpg',
                    //         '../asset/cubemap/SwedishRoyalCastle/py.jpg',
                    //         '../asset/cubemap/SwedishRoyalCastle/ny.jpg',
                    //         '../asset/cubemap/SwedishRoyalCastle/pz.jpg',
                    //         '../asset/cubemap/SwedishRoyalCastle/nz.jpg'
                    //     ])
                    // }
                    var env = redGLTFLoader['environmentTexture']
                    // Type	Description	Required
                    // baseColorFactor	number [4]	The material's base color factor.	No, default: [1,1,1,1]
                    // baseColorTexture	object	The base color texture.	No
                    // metallicFactor	number	The metalness of the material.	No, default: 1
                    // roughnessFactor	number	The roughness of the material.	No, default: 1
                    // metallicRoughnessTexture	object	The metallic-roughness texture.	No
                    tMaterial = RedPBRMaterial_System(redGLTFLoader['redGL'], diffseTexture, env, normalTexture, occlusionTexture, emissiveTexture, roughnessTexture, null)
                    if (tMaterialInfo['pbrMetallicRoughness'] && tMaterialInfo['pbrMetallicRoughness']['baseColorFactor']) tColor = tMaterialInfo['pbrMetallicRoughness']['baseColorFactor']
                    else tColor = [1.0, 1.0, 1.0, 1.0]
                    tMaterial['baseColorFactor'] = tColor
                    if (tMaterialInfo['pbrMetallicRoughness']) {
                        tMaterial.metallicFactor = metallicFactor != undefined ? metallicFactor : 1;
                        tMaterial.roughnessFactor = roughnessFactor != undefined ? roughnessFactor : 1;
                    }
                    tMaterial.emissiveFactor = tMaterialInfo.emissiveFactor != undefined ? tMaterialInfo.emissiveFactor : [1, 1, 1];
                    if (tMaterialInfo['pbrMetallicRoughness']) {
                        if (tMaterialInfo['pbrMetallicRoughness']['metallicRoughnessTexture']) tMaterial['roughnessTexCoordIndex'] = tMaterialInfo['pbrMetallicRoughness']['metallicRoughnessTexture']['texCoord'] || 0
                        if (tMaterialInfo['pbrMetallicRoughness']['baseColorTexture']) tMaterial['diffuseTexCoordIndex'] = tMaterialInfo['pbrMetallicRoughness']['baseColorTexture']['texCoord'] || 0
                    }
                    if (tMaterialInfo['occlusionTexture']) {
                        tMaterial['occlusionTexCoordIndex'] = tMaterialInfo['occlusionTexture']['texCoord'] || 0
                        tMaterial['occlusionPower'] = tMaterialInfo['occlusionTexture']['strength'] || 1
                    }
                    if (tMaterialInfo['emissiveTexture']) tMaterial['emissiveTexCoordIndex'] = tMaterialInfo['emissiveTexture']['texCoord'] || 0
                    if (tMaterialInfo['normalTexture']) tMaterial['normalTexCoordIndex'] = tMaterialInfo['normalTexture']['texCoord'] || 0

                } else {
                    var tColor = [(Math.random()), (Math.random()), (Math.random()), 1]
                    tMaterial = RedPBRMaterial_System(redGLTFLoader['redGL'])
                    tMaterial['baseColorFactor'] = tColor
                }
                return [tMaterial, doubleSide, alphaMode, alphaCutoff]
            }
        })();
        makeMesh = function (redGLTFLoader, json, meshData) {
            // console.log('parseMesh :')
            // console.log(meshData)
            var tName, tDoubleSide, tAlphaMode, tAlphaCutoff
            if (meshData['name']) tName = meshData['name']
            var tMeshList = []
            meshData['primitives'].forEach(function (v, index) {
                var tMesh;
                var tMaterial
                var indices = []
                // 어트리뷰트에서 파싱되는놈들
                var vertices = []
                var uvs = []
                var uvs1 = []
                var normals = []
                var jointWeights = []
                var joints = []
                var tDrawMode;
                // console.log(v, index)
                // 형상 파싱
                if (v['attributes']) {
                    // console.log('TODO: 어트리뷰트 파싱')
                    for (var key in v['attributes']) {
                        // console.log(k, '파싱')
                        // 엑세서를 통해서 정보파악하고
                        var accessorIndex = v['attributes'][key];
                        var accessorInfo = new RedGLTF_AccessorInfo(redGLTFLoader, json, accessorIndex)
                        // 어트리뷰트 갈궈서 파악함
                        parseAttributeInfo(
                            redGLTFLoader, json, key, accessorInfo,
                            vertices, uvs, uvs1, normals, jointWeights, joints
                        )
                        // 스파스 정보도 갈굼
                        if (accessorInfo['accessor']['sparse']) parseSparse(redGLTFLoader, key, accessorInfo['accessor'], json, vertices, uvs, uvs1, normals, jointWeights, joints)
                    }
                }
                // 인덱스 파싱
                if ('indices' in v) {
                    // console.log('TODO: 인덱스 파싱')
                    // 버퍼뷰의 위치를 말하므로...이를 추적파싱항
                    var accessorIndex = v['indices']
                    var accessorInfo = new RedGLTF_AccessorInfo(redGLTFLoader, json, accessorIndex)
                    parseIndicesInfo(
                        redGLTFLoader, json, key, accessorInfo, indices
                    )
                }
                // 재질파싱
                tMaterial = parseMaterialInfo(redGLTFLoader, json, v)
                tDoubleSide = tMaterial[1]
                tAlphaMode = tMaterial[2]
                tAlphaCutoff = tMaterial[3]
                tMaterial = tMaterial[0]
                if (tMaterial instanceof RedPBRMaterial_System) redGLTFLoader['parsingResult']['materials'].push(tMaterial)
                // 모드 파싱
                if ('mode' in v) {
                    // 0 POINTS
                    // 1 LINES
                    // 2 LINE_LOOP
                    // 3 LINE_STRIP
                    // 4 TRIANGLES
                    // 5 TRIANGLE_STRIP
                    // 6 TRIANGLE_FAN
                    // console.log('primitiveMode ', v['mode'])
                    switch (v['mode']) {
                        case 0 :
                            tDrawMode = redGLTFLoader['redGL'].gl.POINTS
                            break
                        case 1 :
                            tDrawMode = redGLTFLoader['redGL'].gl.LINES
                            break
                        case 2 :
                            tDrawMode = redGLTFLoader['redGL'].gl.LINE_LOOP
                            break
                        case 3 :
                            tDrawMode = redGLTFLoader['redGL'].gl.LINE_STRIP
                            break
                        case 4 :
                            tDrawMode = redGLTFLoader['redGL'].gl.TRIANGLES
                            break
                        case 5 :
                            tDrawMode = redGLTFLoader['redGL'].gl.TRIANGLE_STRIP
                            break
                        case 6 :
                            tDrawMode = redGLTFLoader['redGL'].gl.TRIANGLE_FAN
                            break
                    }
                }
                /////////////////////////////////////////////////////////
                // 최종데이터 생산
                var normalData
                if (normals.length) normalData = normals
                else normalData = RedGLUtil.calculateNormals(vertices, indices)
                // console.log('vertices', vertices)
                // console.log('normalData', normalData)
                var interleaveData = []
                var i = 0, len = vertices.length / 3
                for (i; i < len; i++) {
                    if (vertices.length) interleaveData.push(vertices[i * 3 + 0], vertices[i * 3 + 1], vertices[i * 3 + 2])
                    if (normalData.length) interleaveData.push(normalData[i * 3 + 0], normalData[i * 3 + 1], normalData[i * 3 + 2])
                    if (!uvs.length) uvs.push(0, 0)
                    if (uvs.length) interleaveData.push(uvs[i * 2 + 0], uvs[i * 2 + 1])
                    if (uvs1.length) interleaveData.push(uvs1[i * 2 + 0], uvs1[i * 2 + 1])
                    else if (uvs.length) interleaveData.push(uvs[i * 2 + 0], uvs[i * 2 + 1])
                    if (jointWeights.length) interleaveData.push(jointWeights[i * 4 + 0], jointWeights[i * 4 + 1], jointWeights[i * 4 + 2], jointWeights[i * 4 + 3])
                    if (joints.length) interleaveData.push(joints[i * 4 + 0], joints[i * 4 + 1], joints[i * 4 + 2], joints[i * 4 + 3])
                }
                // console.log('interleaveData', interleaveData)
                /////////////////////////////////////////////////////////
                // 메쉬 생성
                var tGeo
                var tInterleaveInfoList = []
                if (vertices.length) tInterleaveInfoList.push(RedInterleaveInfo('aVertexPosition', 3))
                if (normalData.length) tInterleaveInfoList.push(RedInterleaveInfo('aVertexNormal', 3))
                if (uvs.length) tInterleaveInfoList.push(RedInterleaveInfo('aTexcoord', 2))
                if (uvs1.length) tInterleaveInfoList.push(RedInterleaveInfo('aTexcoord1', 2))
                else if (uvs.length) tInterleaveInfoList.push(RedInterleaveInfo('aTexcoord1', 2))
                if (jointWeights.length) tInterleaveInfoList.push(RedInterleaveInfo('aVertexWeight', 4))
                if (joints.length) tInterleaveInfoList.push(RedInterleaveInfo('aVertexJoint', 4))
                tGeo = RedGeometry(
                    RedBuffer(
                        redGLTFLoader['redGL'],
                        'testGLTF_interleaveBuffer_' + RedGL.makeUUID(),
                        RedBuffer.ARRAY_BUFFER,
                        new Float32Array(interleaveData),
                        tInterleaveInfoList
                    ),
                    indices.length ? RedBuffer(
                        redGLTFLoader['redGL'],
                        'testGLTF_indexBuffer_' + RedGL.makeUUID(),
                        RedBuffer.ELEMENT_ARRAY_BUFFER,
                        new Uint16Array(indices)
                    ) : null
                )
                if (!tMaterial) {
                    RedGLUtil.throwFunc('재질을 파싱할수없는경우 ', v)
                    // tMaterial = RedColorPhongMaterial(redGLTFLoader['redGL'], RedGLUtil.rgb2hex(parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255)))
                }
                // console.log('tMaterial', tMaterial)
                tMesh = RedMesh(redGLTFLoader['redGL'], tGeo, tMaterial)
                if (tName) {
                    tMesh.name = tName
                    if (redGLTFLoader['parsingOption']) {
                        for (var k in redGLTFLoader['parsingOption']) {
                            if (tName.toLowerCase().indexOf(k) > -1) {
                                redGLTFLoader['parsingOption'][k](tMesh)
                            }
                        }
                    }

                }
                if (tDrawMode) tMesh.drawMode = tDrawMode
                else tMesh.drawMode = redGLTFLoader['redGL'].gl.TRIANGLES
                //
                if (tDoubleSide) tMesh.useCullFace = false
                // console.log('tAlphaMode', tAlphaMode)
                // console.log('tAlphaCutoff', tAlphaCutoff)
                switch (tAlphaMode) {
                    // TODO
                    case 'OPAQUE' :
                        tMesh.useBlendMode = false
                        break
                    case 'BLEND' :
                        tMesh['useTransparentSort'] = true
                        break
                    case 'MASK' :
                        tMesh['useTransparentSort'] = true
                        tMaterial.cutOff = tAlphaCutoff
                        break
                    default :
                        tMesh.useBlendMode = false
                    // tMesh.useBlendMode = false
                }
                // console.log('tDoubleSide', tDoubleSide)
                // console.log('tMesh', tMesh)
                /////////////////////////////////////////////////////////
                // 모프리스트 설정
                var morphInfo = new RedGLTF_MorphInfo(redGLTFLoader, json, v)
                morphInfo['list'].forEach(function (v) {
                    var normalData
                    if (v['normals'].length) normalData = v['normals']
                    else normalData = RedGLUtil.calculateNormals(v['vertices'], indices)
                    // console.log('vertices', vertices)
                    // console.log('normalData', normalData)
                    var interleaveData = []
                    var i = 0, len = v['vertices'].length / 3
                    for (i; i < len; i++) {
                        if (v['vertices'].length) interleaveData.push(v['vertices'][i * 3 + 0], v['vertices'][i * 3 + 1], v['vertices'][i * 3 + 2])
                        if (normalData.length) interleaveData.push(normalData[i * 3 + 0], normalData[i * 3 + 1], normalData[i * 3 + 2])
                        if (!v['uvs'].length) v['uvs'].push(0, 0)
                        if (v['uvs'].length) interleaveData.push(v['uvs'][i * 2 + 0], v['uvs'][i * 2 + 1])
                        if (v['uvs1'].length) interleaveData.push(v['uvs1'][i * 2 + 0], v['uvs1'][i * 2 + 1])
                        else if (v['uvs'].length) interleaveData.push(v['uvs'][i * 2 + 0], v['uvs'][i * 2 + 1])
                        if (v['jointWeights'].length) interleaveData.push(v['jointWeights'][i * 4 + 0], v['jointWeights'][i * 4 + 1], v['jointWeights'][i * 4 + 2], v['jointWeights'][i * 4 + 3])
                        if (v['joints'].length) interleaveData.push(v['joints'][i * 4 + 0], v['joints'][i * 4 + 1], v['joints'][i * 4 + 2], v['joints'][i * 4 + 3])
                    }
                    v['interleaveData'] = interleaveData
                });
                tMesh['_morphInfo'] = morphInfo
                tMesh['_morphInfo']['origin'] = new Float32Array(interleaveData)
                // console.log(morphInfo)
                tMeshList.push(tMesh)
                // console.log('vertices', vertices)
                // console.log('normalData', normalData)
                // console.log('uvs', uvs)
                // console.log('joints', joints)
                // console.log('jointWeights', jointWeights)
                // console.log('indices', indices)
            })
            return tMeshList
        }
        parseAnimations = (function () {
            var parseAnimationInfo;
            parseAnimationInfo = function (redGLTFLoader, json, accessorIndex) {
                // console.log('accessorIndex', accessorIndex)
                var dataList = []
                var accessorInfo = new RedGLTF_AccessorInfo(redGLTFLoader, json, accessorIndex)
                var tBYTES_PER_ELEMENT = accessorInfo['componentType_BYTES_PER_ELEMENT'];
                // var tBufferViewByteStride = accessorInfo['bufferViewByteStride'];
                var tBufferURIDataView = accessorInfo['bufferURIDataView'];
                var tGetMethod = accessorInfo['getMethod'];
                var tType = accessorInfo['accessor']['type'];
                var tCount = accessorInfo['accessor']['count'];
                // var strideIndex = 0;
                // var stridePerElement = tBufferViewByteStride / tBYTES_PER_ELEMENT
                var i = accessorInfo['startIndex']
                var len
                switch (tType) {
                    case 'SCALAR' :
                        len = i + tCount * 1;
                        for (i; i < len; i++) {
                            dataList.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                        }
                        // console.log('타임 데이터', dataList)
                        break
                    case 'VEC4' :
                        len = i + tCount * 4;
                        for (i; i < len; i++) {
                            dataList.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                        }
                        // console.log('값 데이터', dataList)
                        break
                    case 'VEC3' :
                        len = i + tCount * 3;
                        for (i; i < len; i++) {
                            dataList.push(tBufferURIDataView[tGetMethod](i * tBYTES_PER_ELEMENT, true))
                        }
                        // console.log('값 데이터', dataList)
                        break
                    default :
                        console.log('알수없는 형식 엑세서 타입', accessorInfo['accessor'])
                        break
                }
                return dataList
            }
            return function (redGLTFLoader, json) {
                console.log('애니메이션 파싱시작')
                var nodes = json['nodes']
                var meshs = json['meshs']
                var accessors = json['accessors']
                if (!json['animations']) json['animations'] = []
                json['animations'].forEach(function (v, index) {
                    // console.log(v)
                    var samplers = v['samplers'];
                    //TODO: 용어를 정리해봐야겠음.
                    // 이걸 애니메이션 클립으로 봐야하는가..
                    var animationClip = []
                    animationClip['minTime'] = 10000000;
                    animationClip['maxTime'] = -1;
                    animationClip['name'] = 'animation_' + index;
                    // 로더에 애니메이션 데이터들을 입력함
                    redGLTFLoader['parsingResult']['animations'].push(animationClip)
                    // 채널을 돌면서 파악한다.
                    v['channels'].forEach(function (channel, channelIndex) {
                        var tSampler;
                        var tChannelTargetData;
                        var tMesh;
                        var tNode;
                        var aniTrack; //
                        tSampler = samplers[channel['sampler']];
                        // console.log('tSampler', tSampler)
                        tChannelTargetData = channel['target'];
                        tNode = nodes[tChannelTargetData['node']];
                        if ('mesh' in tNode) {
                            tMesh = tNode['RedMesh']
                        } else {
                            var tGroup
                            //TODO: 이거 개선해야함
                            // console.log('여기로 오는경우가 있는건가')
                            if (redGLTFLoader['parsingResult']['groups'][tChannelTargetData['node']]) {
                                tGroup = redGLTFLoader['parsingResult']['groups'][tChannelTargetData['node']]
                                // console.log('tGroup', tGroup)
                                tMesh = tGroup;
                            } else {
                                console.log('여기로 오는경우가 있는건가2')
                                return
                            }
                        }
                        // console.log('애니메이션 대상메쉬', tMesh)
                        // console.log(tChannelTargetData['path'])
                        if (
                            tChannelTargetData['path'] == 'scale'
                            || tChannelTargetData['path'] == 'rotation'
                            || tChannelTargetData['path'] == 'translation'
                            || tChannelTargetData['path'] == 'weights'
                        ) {
                            // console.log('path', tChannelTargetData['path'])
                            // // 시간축은 샘플의 input
                            // console.log('시간축', tSampler['input'])
                            // console.log('시간엑세서 데이터', tSampler['input'])
                            // console.log('시간축 데이터리스트', animationData['time'])
                            // // 로테이션 축은 샘플의 output
                            // console.log('translation', tSampler['output'])
                            // console.log('translation 엑세서 데이터', tSampler['output'])
                            // console.log('scale 데이터리스트', t0)
                            animationClip.push(aniTrack = {
                                    key: tChannelTargetData['path'],
                                    time: parseAnimationInfo(redGLTFLoader, json, tSampler['input']),
                                    data: parseAnimationInfo(redGLTFLoader, json, tSampler['output']),
                                    target: tMesh
                                }
                            )
                        } else {
                            console.log('파싱할수없는 데이터', tChannelTargetData['path'])
                        }
                        if (aniTrack) {
                            if (animationClip['minTime'] > aniTrack['time'][0]) animationClip['minTime'] = aniTrack['time'][0]
                            if (animationClip['maxTime'] < aniTrack['time'][aniTrack['time'].length - 1]) animationClip['maxTime'] = aniTrack['time'][aniTrack['time'].length - 1]
                        }
                        // console.log('animationData', animationData)
                    })
                    if (redGLTFLoader['parsingResult']['animations'].length) {
                        redGLTFLoader.playAnimation(redGLTFLoader['parsingResult']['animations'][0])
                    }
                })
            }
        })();
        return function (redGLTFLoader, redGL, json, callBack) {
            console.log('파싱시작', redGLTFLoader['path'] + redGLTFLoader['fileName']);
            // console.log('rawData', json);
            checkAsset(json);
            getBaseResource(redGLTFLoader, json,
                function () {
                    // 리소스 로딩이 완료되면 다음 진행
                    parseCameras(redGLTFLoader, json)
                    parseScene(redGLTFLoader, json, function () {
                        parseAnimations(redGLTFLoader, json)
                        if (callBack) callBack();
                    })

                }
            )
        }
    })();
    Object.freeze(RedGLTFLoader);
})();