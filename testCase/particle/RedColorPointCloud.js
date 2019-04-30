/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedColorPointCloud TEST";

RedGL(document.createElement('canvas'), function () {
        var tRedGL = this;

        var i;
        var testData;
        var testInterleaveDefineInfoList;
        testData = [];
        i = 1;
        while (i--) {
            testData.push(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50);
            testData.push(Math.random() * 2)
        }
        testInterleaveDefineInfoList = [
            RedInterleaveInfo('aVertexPosition', 3),
            RedInterleaveInfo('aPointSize', 1)
        ];

        RedTest.testGroup(
            "RedColorPointCloud( redGL, interleaveData, interleaveDefineInfoList)",
            function () {
                RedTest.test(
                    "성공테스트 : 기본 생성 테스트",
                    function () {

                        try {
                            var t0 = RedColorPointCloud(tRedGL, testData, testInterleaveDefineInfoList);
                            console.log(t0);
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    true
                )
            }
        );
        RedTest.testGroup(
            "RedColorPointCloud( <b>redGL</b>, interleaveData, interleaveDefineInfoList)",
            function () {
                RedTest.test(
                    "실패테스트 : RedGL Instance만 허용하는지.",
                    function () {

                        try {
                            var t0 = RedColorPointCloud(1, testData, testInterleaveDefineInfoList);
                            console.log(t0);
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    false
                )
            }
        );
        RedTest.testGroup(
            "RedColorPointCloud( redGL, <b>interleaveData</b>, interleaveDefineInfoList)",
            function () {
                RedTest.testListRun(
                    "Array만 허용",
                    RedTest.ONLY_ARRAY,
                    function (v) {

                        try {
                            var t0 = RedColorPointCloud(tRedGL, v[0], testInterleaveDefineInfoList);
                            console.log(t0);
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    false
                )
            }
        );
        RedTest.testGroup(
            "RedColorPointCloud( redGL, interleaveData, <b>interleaveDefineInfoList</b>)",
            function () {
                RedTest.test(
                    "실패테스트 : 미정의",
                    function () {

                        try {
                            var t0 = RedColorPointCloud(tRedGL, []);
                            console.log(t0);
                            RedTest.run(true);

                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : 내부 데이터가 RedInterleaveInfo Instance가 아닌경우",
                    function () {

                        try {
                            var t0 = RedColorPointCloud(tRedGL, [], [1, 2]);
                            console.log(t0);
                            RedTest.run(true);


                        } catch (error) {
                            console.log('///////////////////////////////////////////////////////////');
                            console.log(error);
                            RedTest.run(false, error);

                        }

                    },
                    false
                )
            }
        );


        RedTest.testGroup(
            "(RedColorPointCloud Instance).<b>geometry</b>",
            function () {
                RedTest.test(
                    "실패테스트 : 임의설정 불가테스트",
                    function () {

                        var t0 = RedColorPointCloud(tRedGL, testData, testInterleaveDefineInfoList);
                        try {
                            t0.geometry = RedBox(tRedGL);
                            console.log(t0);
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    false
                )
            }
        );


        RedTest.testGroup(
            "(RedColorPointCloud Instance).<b>update</b>( interleaveData )",
            function () {
                RedTest.test(
                    "성공테스트 : 데이터 변경테스트",
                    function () {

                        var t0 = RedColorPointCloud(tRedGL, testData, testInterleaveDefineInfoList);
                        i = 1;
                        var t1 = [];
                        while (i--) {
                            t1.push(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50);
                            t1.push(Math.random() * 2)
                        }
                        t0.update(t1);
                        i = t1.length;
                        t1 = new Float32Array(t1);
                        var test = true;
                        while (i--) {
                            console.log(t0['_geometry']['interleaveBuffer']['data'][i], t1[i]);
                            if (t0['_geometry']['interleaveBuffer']['data'][i] !== t1[i]) test = false
                        }
                        console.log(t1);
                        RedTest.run(test);
                        tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                    },
                    true
                )
            }
        );
    }
);
