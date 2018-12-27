"use strict";
RedGL(document.createElement('canvas'), function (v) {
    var tRedGL = this;
    var tMaterial = RedColorPointCloudMaterial(tRedGL)
    var i;
    var testData;
    var testInterleaveDefineInfoList;
    testData = []
    i = 1
    while (i--) {
        testData.push(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50)
        testData.push(Math.random() * 2)
    }
    testInterleaveDefineInfoList = [
        RedInterleaveInfo('aVertexPosition', 3),
        RedInterleaveInfo('aPointSize', 1)
    ]
    redSuite(
        "RedPointCloud 테스트",
        redGroup(
            "RedPointCloud( redGL, interleaveData, interleaveDefineInfoList, material )",
            redTest("성공테스트 : 기본 생성 테스트", function (unit, title) {
                try {
                    var t0 = RedPointCloud(tRedGL, testData, testInterleaveDefineInfoList, tMaterial);
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true)
        ),
        redGroup(
            "RedPointCloud( <b>redGL</b>, interleaveData, interleaveDefineInfoList, material )",
            redTest("실패테스트 : RedGL Instance만 허용하는지.", function (unit, title) {
                try {
                    var t0 = RedPointCloud(1, testData, testInterleaveDefineInfoList, tMaterial);
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "RedPointCloud( redGL, <b>interleaveData</b>, interleaveDefineInfoList, material )",
            redTest("실패테스트 : Array Instance만 허용하는지.", function (unit, title) {
                try {
                    var t0 = RedPointCloud(tRedGL, new Float32Array(10), testInterleaveDefineInfoList, tMaterial);
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "RedPointCloud( redGL, interleaveData, interleaveDefineInfoList, <b>material</b> )",
            redTest("실패테스트 : RedColorPointCloudMaterial or RedBitmapPointCloudMaterial Instance만 허용하는지.", function (unit, title) {
                try {
                    var t0 = RedPointCloud(tRedGL, testData, testInterleaveDefineInfoList, RedColorMaterial(tRedGL));
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : RedColorPointCloudMaterial or RedBitmapPointCloudMaterial Instance만 허용하는지.", function (unit, title) {
                try {
                    var t0 = RedPointCloud(tRedGL, testData, testInterleaveDefineInfoList, RedColorPointCloudMaterial(tRedGL));
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : RedColorPointCloudMaterial or RedBitmapPointCloudMaterial Instance만 허용하는지.", function (unit, title) {
                try {
                    var t0 = RedPointCloud(tRedGL, testData, testInterleaveDefineInfoList, RedBitmapPointCloudMaterial(tRedGL, RedBitmapTexture(tRedGL, RedBaseTexture.EMPTY_BASE64)));
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true)
        ),
        redGroup(
            "(RedPointCloud Instance).<b>geometry</b>",
            redTest("실패테스트 : 임의설정 불가테스트", function (unit, title) {
                var t0 = RedPointCloud(tRedGL, testData, testInterleaveDefineInfoList, tMaterial);
                try {
                    t0.geometry = RedBox(tRedGL)
                    console.log(t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "(RedPointCloud Instance).<b>update</b>( interleaveData )",
            redTest("성공테스트 : 임의설정 불가테스트", function (unit, title) {
                var t0 = RedPointCloud(tRedGL, testData, testInterleaveDefineInfoList, tMaterial);
                i = 1
                var t1 = []
                while (i--) {
                    t1.push(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50)
                    t1.push(Math.random() * 2)
                }
                t0.update(t1)
                i = t1.length
                t1 = new Float32Array(t1)
                var test = true
                while (i--) {
                    console.log(t0['_geometry']['interleaveBuffer']['data'][i], t1[i])
                    if (t0['_geometry']['interleaveBuffer']['data'][i] != t1[i]) test = false
                }
                console.log(t1)
                unit.run(test)
            }, true)
        )
    )
})
