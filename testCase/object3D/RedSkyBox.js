"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedSkyBox TEST";
RedGL(document.createElement('canvas'), function () {
        var tRedGL = this;
        RedTest.testGroup(
            "RedSkyBox( redGL, srcList, alpha )",
            function () {
                RedTest.test(
                    "성공테스트 : 기본 생성 테스트",
                    function () {

                        var tSrcList = [
                            '../../asset/cubemap/SwedishRoyalCastle/px.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nx.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/ny.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/py.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/pz.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nz.jpg'
                        ];
                        try {
                            var t0 = RedSkyBox(tRedGL, tSrcList);
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
            "RedSkyBox( <b>redGL</b>, srcList, alpha )",
            function () {
                RedTest.test(
                    "RedGL Instance만 허용하는지.",
                    function () {

                        var tSrcList = [
                            '../../asset/cubemap/SwedishRoyalCastle/px.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nx.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/ny.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/py.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/pz.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nz.jpg'
                        ];
                        try {
                            var t0 = RedSkyBox(1, tSrcList);
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
            "RedSkyBox( redGL, <b>srcList</b>, alpha )",
            function () {
                RedTest.test(
                    "실패테스트 : 미입력",
                    function () {

                        try {
                            var t0 = RedSkyBox(tRedGL);
                            console.log(t0);
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : srcList가 배열이 아닌경우",
                    function () {

                        try {
                            var t0 = RedSkyBox(tRedGL, {});
                            console.log(t0);
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : srcList.length 가 6개가 아닌 경우",
                    function () {

                        try {
                            var t0 = RedSkyBox(tRedGL, ['1', '2', '3']);
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
            "(RedSkyBox Instance).<b>geometry</b> = value",
            function () {
                RedTest.test(
                    "실패테스트 : 임의설정을 허용하지 않음",
                    function () {

                        var tSrcList = [
                            '../../asset/cubemap/SwedishRoyalCastle/px.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nx.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/ny.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/py.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/pz.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nz.jpg'
                        ];
                        try {
                            var tGeo = RedBox(tRedGL);
                            var t0 = RedSkyBox(tRedGL, tSrcList);
                            t0['geometry'] = tGeo;
                            RedTest.run(t0['_geometry'] === tGeo);
                            console.log(t0);

                        } catch (error) {
                            RedTest.run(false, error);
                        }
                    },
                    false
                )
            }
        );
        RedTest.testGroup(
            "(RedSkyBox Instance).<b>material</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : set 테스트",
                    function () {

                        var tSrcList = [
                            '../../asset/cubemap/SwedishRoyalCastle/px.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nx.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/ny.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/py.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/pz.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nz.jpg'
                        ];
                        var tMaterial = RedSkyBoxMaterial(
                            tRedGL,
                            RedBitmapCubeTexture(
                                tRedGL,
                                tSrcList
                            )
                        );
                        var t0 = RedSkyBox(tRedGL, tSrcList);
                        t0['material'] = tMaterial;
                        RedTest.run(t0['material'] === tMaterial);

                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : set 테스트",
                    function () {

                        var tSrcList = [
                            '../../asset/cubemap/SwedishRoyalCastle/px.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nx.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/ny.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/py.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/pz.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nz.jpg'
                        ];
                        var tMaterial = RedSkyBoxMaterial(
                            tRedGL,
                            RedBitmapCubeTexture(
                                tRedGL,
                                tSrcList
                            )
                        );
                        var t0 = RedSkyBox(tRedGL, tSrcList);
                        t0['material'] = tMaterial;
                        RedTest.run(t0['_material'] === tMaterial);

                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : set 테스트 : RedSkyBoxMaterial Instance가 아닌녀석을 재질로 입력 할 경우",
                    function () {

                        var tSrcList = [
                            '../../asset/cubemap/SwedishRoyalCastle/px.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nx.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/ny.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/py.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/pz.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nz.jpg'
                        ];
                        try {
                            var tMaterial = RedColorMaterial(tRedGL);
                            var t0 = RedSkyBox(tRedGL, tSrcList);
                            t0['material'] = tMaterial;
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
            "(RedSkyBox Instance).alpha = <b>value</b>",
            function () {
                RedTest.testListRun(
                    "0이상만 허용",
                    RedTest.NUMBER_ZERO_TO_ONE,
                    function (v) {

                        var tSrcList = [
                            '../../asset/cubemap/SwedishRoyalCastle/px.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nx.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/ny.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/py.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/pz.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nz.jpg'
                        ];
                        try {
                            var t0 = RedSkyBox(tRedGL, tSrcList);
                            t0['alpha'] = v[0];
                            RedTest.run(v[0] === t0['alpha']);

                        } catch (error) {
                            RedTest.run(false, error);
                        }
                    }
                );
                RedTest.test(
                    "성공테스트 : 0이하를 입력하면 0으로 치환되는지",
                    function () {

                        var tSrcList = [
                            '../../asset/cubemap/SwedishRoyalCastle/px.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nx.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/ny.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/py.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/pz.jpg',
                            '../../asset/cubemap/SwedishRoyalCastle/nz.jpg'
                        ];
                        try {
                            var t0 = RedSkyBox(tRedGL, tSrcList);
                            t0['alpha'] = -1;
                            RedTest.run(t0['alpha']);
                            tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                        } catch (error) {
                            RedTest.run(false, error);
                            tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                        }
                    },
                    0
                )
            }
        );
    }
);

