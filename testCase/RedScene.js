RedTest.title = "RedScene TEST";
RedGL.setDoNotPrepareProgram();
// RedTest.mode = RedTest.REQUEST_MODE;
RedGL(document.createElement('canvas'), function () {
        var tRedGL = this;

        RedTest.testGroup(
            "기본 생성 테스트 RedScene( <b>redGL</b>, <b>backgroundColor</b> )",
            function () {
                RedTest.test(
                    "성공 테스트 : new기반 생성확인",
                    function () {

                        RedTest.run(new RedScene(tRedGL) instanceof RedScene);


                    },
                    true
                );
                RedTest.test(
                    "성공 테스트 : 실행기반 생성확인",
                    function () {

                        RedTest.run(RedScene(tRedGL) instanceof RedScene);

                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : redGL - RedGL Instance만 허용",
                    function () {
                        try {
                            RedScene();
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error);
                        }

                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : backgroundColor : hex형식 or 미지정만 허용 - 미지정 테스트",
                    function () {

                        RedTest.run(RedScene(tRedGL) instanceof RedScene);

                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : backgroundColor : hex형식 or 미지정만 허용 - hex가 아닌 문자열 이력테스트",
                    function () {

                        try {
                            RedScene(tRedGL, 'failTest');
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
            }
        );
        RedTest.testGroup(
            "(RedScene Instance).useBackgroundColor = value",
            function () {
                RedTest.test(
                    "성공 테스트 : 초기값 확인",
                    function () {

                        var tScene = RedScene(tRedGL);
                        RedTest.run(tScene['useBackgroundColor'])


                    },
                    true
                );
                RedTest.testListRun(
                    'boolean만 허용 테스트',
                    RedTest.ONLY_BOOLEAN,
                    function (v) {

                        var tScene = RedScene(tRedGL);
                        try {
                            tScene['useBackgroundColor'] = v[0];
                            RedTest.run(tScene['useBackgroundColor'] === v[0]);

                        } catch (error) {
                            RedTest.run(tScene['useBackgroundColor'] === v[0], error);

                        }

                    }
                );
            }
        );

        RedTest.testGroup(
            "(RedScene Instance).backgroundColor = value",
            function () {
                RedTest.test(
                    "초기값 확인",
                    function () {

                        var tScene = RedScene(tRedGL);
                        RedTest.run(tScene['backgroundColor']);


                    },
                    '#000000'
                );
                RedTest.testListRun(
                    'hex 만 허용 테스트',
                    RedTest.ONLY_HEX,
                    function (v) {

                        var tScene = RedScene(tRedGL);
                        try {
                            tScene['backgroundColor'] = v[0];
                            RedTest.run(tScene['backgroundColor'] === v[0]);

                        } catch (error) {
                            RedTest.run(tScene['backgroundColor'] === v[0], error);

                        }

                    }
                );
            }
        );

        RedTest.testGroup(
            "(RedScene Instance).useFog = value",
            function () {
                RedTest.test(
                    "성공 테스트 : 초기값 확인",
                    function () {

                        var tScene = RedScene(tRedGL);
                        RedTest.run(tScene['useFog']);


                    },
                    false
                );
                RedTest.testListRun(
                    'boolean만 허용 테스트',
                    RedTest.ONLY_BOOLEAN,
                    function (v) {

                        var tScene = RedScene(tRedGL);
                        try {
                            tScene['useFog'] = v[0];
                            RedTest.run(tScene['useFog'] === v[0]);

                        } catch (error) {
                            RedTest.run(tScene['useFog'] === v[0], error);

                        }

                    }
                )
            }
        );

        RedTest.testGroup(
            "(RedScene Instance).fogDensity = value",
            function () {

                RedTest.test(
                    "성공 테스트 : 최소값 0으로 보정되는지 확인",
                    function () {

                        var tScene = RedScene(tRedGL);
                        tScene['fogDensity'] = -1;
                        RedTest.run(tScene['fogDensity']);


                    },
                    0
                );
                RedTest.testListRun(
                    '0을 포함한 양수만 허용 테스트',
                    RedTest.NUMBER_POSITIVE_AND_ZERO,
                    function (v) {

                        var tScene = RedScene(tRedGL);
                        try {
                            tScene['fogDensity'] = v[0];
                            RedTest.run(tScene['fogDensity'] === v[0]);

                        } catch (error) {
                            RedTest.run(tScene['fogDensity'] === v[0], error);

                        }

                    }
                )
            }
        );

        RedTest.testGroup(
            "(RedScene Instance).fogDistance = value",
            function () {
                RedTest.test(
                    "성공 테스트 : 최소값 0으로 보정되는지 확인",
                    function () {

                        var tScene = RedScene(tRedGL);
                        tScene['fogDistance'] = -1;
                        RedTest.run(tScene['fogDistance']);


                    },
                    0
                );
                RedTest.testListRun(
                    '0을 포함한 양수만 허용 테스트',
                    RedTest.NUMBER_POSITIVE_AND_ZERO,
                    function (v) {

                        var tScene = RedScene(tRedGL);
                        try {
                            tScene['fogDistance'] = v[0];
                            RedTest.run(tScene['fogDistance'] === v[0]);

                        } catch (error) {
                            RedTest.run(tScene['fogDistance'] === v[0], error);

                        }

                    }
                )
            }
        );


        RedTest.testGroup(
            "(RedScene Instance).fogColor = value",
            function () {
                RedTest.testListRun(
                    'hex 만 허용 테스트',
                    RedTest.ONLY_HEX,
                    function (v) {

                        var tScene = RedScene(tRedGL);
                        try {
                            tScene['fogColor'] = v[0];
                            RedTest.run(tScene['fogColor'] === v[0]);

                        } catch (error) {
                            RedTest.run(tScene['fogColor'] === v[0], error);

                        }

                    }
                );
            }
        );
        RedTest.testGroup(
            "(RedScene Instance).grid = value",
            function () {
                RedTest.test(
                    '성공테스트 : RedGrid Instance만  허용하는지 확인',
                    function () {

                        var tScene = RedScene(tRedGL);
                        tScene['grid'] = RedGrid(tRedGL);
                        RedTest.run(tScene['grid'] instanceof RedGrid);


                    },
                    true
                );
                RedTest.test(
                    '성공테스트 : null 세팅 가능 확인',
                    function () {

                        var tScene = RedScene(tRedGL);
                        tScene['grid'] = null;
                        RedTest.run(tScene['grid']);

                    },
                    null
                );
                RedTest.test(
                    '실패테스트 : RedGrid Instance만  허용하는지 확인',
                    function () {

                        var tScene = RedScene(tRedGL);

                        try {
                            tScene['grid'] = 'failTest';
                            RedTest.run(tScene['grid'] instanceof RedGrid);

                        } catch (error) {
                            RedTest.run(tScene['grid'] instanceof RedGrid, error);

                        }

                    },
                    false
                );

            }
        );


        RedTest.testGroup(
            "(RedScene Instance).axis = value",
            function () {
                RedTest.test(
                    '성공테스트 : RedAxis Instance만  허용하는지 확인',
                    function () {

                        var tScene = RedScene(tRedGL);
                        tScene['axis'] = RedAxis(tRedGL);
                        RedTest.run(tScene['axis'] instanceof RedAxis);


                    },
                    true
                );
                RedTest.test(
                    '성공테스트 : null 세팅 가능 확인',
                    function () {

                        var tScene = RedScene(tRedGL);
                        tScene['axis'] = null;
                        RedTest.run(tScene['axis']);


                    },
                    null
                );
                RedTest.test(
                    '실패테스트 : RedAxis Instance만  허용하는지 확인',
                    function () {

                        var tScene = RedScene(tRedGL);
                        try {
                            tScene['axis'] = 'failTest';
                            RedTest.run(tScene['axis'] instanceof RedAxis);

                        } catch (error) {
                            RedTest.run(tScene['axis'] instanceof RedAxis, error);

                        }

                    },
                    false
                );
            }
        );
        RedTest.testGroup(
            "(RedScene Instance).skybox = value",
            function () {
                RedTest.test(
                    '성공테스트 : RedSkyBox Instance만  허용하는지 확인',
                    function () {

                        var tScene = RedScene(tRedGL);
                        tScene['skybox'] = RedSkyBox(tRedGL, [
                            '../asset/cubemap/SwedishRoyalCastle/px.jpg',
                            '../asset/cubemap/SwedishRoyalCastle/nx.jpg',
                            '../asset/cubemap/SwedishRoyalCastle/ny.jpg',
                            '../asset/cubemap/SwedishRoyalCastle/py.jpg',
                            '../asset/cubemap/SwedishRoyalCastle/pz.jpg',
                            '../asset/cubemap/SwedishRoyalCastle/nz.jpg'
                        ]);
                        RedTest.run(tScene['skybox'] instanceof RedSkyBox);


                    },
                    true
                );
                RedTest.test(
                    '성공테스트 : null 세팅 가능 확인',
                    function () {

                        var tScene = RedScene(tRedGL);
                        tScene['skybox'] = null;
                        RedTest.run(tScene['skybox']);


                    },
                    null
                );
                RedTest.test(
                    '실패테스트 : RedSkyBox Instance만  허용하는지 확인',
                    function () {

                        var tScene = RedScene(tRedGL);
                        try {
                            tScene['skybox'] = 'failTest';
                            RedTest.run(tScene['skybox'] instanceof RedSkyBox);

                        } catch (error) {
                            RedTest.run(tScene['skybox'] instanceof RedSkyBox, error);

                        }

                    },
                    false
                );
            }
        );


        RedTest.testGroup(
            "(RedScene Instance).addLight( <b>value</b> ) : RedAmbientLight",
            function () {
                RedTest.test(
                    "성공테스트 : addLight - RedAmbientLight 설정",
                    function () {

                        var tScene = RedScene(tRedGL);
                        try {
                            tScene.addLight(RedAmbientLight(tRedGL));
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : addLight - RedAmbientLight 설정데이터 확인",
                    function () {

                        var tAmbient = RedAmbientLight(tRedGL);
                        var tScene = RedScene(tRedGL);
                        tScene.addLight(tAmbient);
                        RedTest.run(tScene['_lightInfo']['RedAmbientLight'] === tAmbient);


                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : addLight - RedAmbientLight가 아닌 데이터 입력",
                    function () {

                        var tScene = RedScene(tRedGL);
                        try {
                            tScene.addLight('test');
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
            }
        );
        RedTest.testGroup(
            "(RedScene Instance).removeLight( <b>value</b> ) : RedAmbientLight",
            function () {
                RedTest.test(
                    "성공테스트 : removeLight - RedAmbientLight 삭제",
                    function () {

                        var tScene = RedScene(tRedGL);
                        var tLight = RedAmbientLight(tRedGL);
                        tScene.addLight(tLight);
                        tScene.removeLight(tLight);
                        RedTest.run(tScene['_lightInfo']['RedAmbientLight']);


                    },
                    null
                );
            }
        );
        RedTest.testGroup(
            "(RedScene Instance).addLight( <b>value</b> ) : RedDirectionalLight",
            function () {
                RedTest.test(
                    "성공테스트 : addLight - RedDirectionalLight 설정",
                    function () {

                        var tScene = RedScene(tRedGL);
                        tScene.addLight(RedDirectionalLight(tRedGL));
                        RedTest.run(true);


                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : addLight - RedDirectionalLight 설정데이터 확인",
                    function () {

                        var tScene = RedScene(tRedGL);
                        var t1 = RedDirectionalLight(tRedGL);
                        tScene.addLight(t1);
                        RedTest.run(tScene['_lightInfo']['RedDirectionalLight'][0] === t1);


                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : addLight - MAX 갯수 확인",
                    function () {

                        var tScene = RedScene(tRedGL);
                        var i = RedSystemShaderCode.MAX_DIRECTIONAL_LIGHT;
                        while (i--) {
                            var t1 = RedDirectionalLight(tRedGL);
                            tScene.addLight(t1);
                        }
                        RedTest.run(tScene['_lightInfo']['RedDirectionalLight'].length === RedSystemShaderCode.MAX_DIRECTIONAL_LIGHT);


                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : addLight - MAX 갯수 확인 - 초과시 에러 확인",
                    function () {

                        var tScene = RedScene(tRedGL);
                        var i = RedSystemShaderCode.MAX_DIRECTIONAL_LIGHT + 1;
                        try {
                            while (i--) {
                                var t1 = RedDirectionalLight(tRedGL);
                                tScene.addLight(t1);
                            }
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : addLight - RedDirectionalLight가 아닌 데이터 입력",
                    function () {

                        var tScene = RedScene(tRedGL);
                        try {
                            tScene.addLight('test');
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    false
                );

            }
        );
        RedTest.testGroup(
            "(RedScene Instance).removeLight( <b>value</b> ) : RedDirectionalLight",
            function () {
                RedTest.test(
                    "성공테스트 : removeLight - RedDirectionalLight 삭제",
                    function () {

                        var tScene = RedScene(tRedGL);
                        var t1 = RedDirectionalLight(tRedGL);
                        tScene.addLight(t1);
                        tScene.removeLight(t1);
                        RedTest.run(tScene['_lightInfo']['RedDirectionalLight'].length);


                    },
                    0
                );
            }
        );
        RedTest.testGroup(
            "(RedScene Instance).removeLight( <b>value</b> ) : RedAmbientLight",
            function () {
                RedTest.test(
                    "성공테스트 : removeLight - RedAmbientLight 삭제",
                    function () {

                        var tScene = RedScene(tRedGL);
                        var tLight = RedAmbientLight(tRedGL);
                        tScene.addLight(tLight);
                        tScene.removeLight(tLight);
                        RedTest.run(tScene['_lightInfo']['RedAmbientLight']);


                    },
                    null
                );
            }
        );
        RedTest.testGroup(
            "(RedScene Instance).addLight( <b>value</b> ) : RedPointLight",
            function () {

                RedTest.test(
                    "성공테스트 : addLight - RedPointLight 설정",
                    function () {


                        var tScene = RedScene(tRedGL);
                        tScene.addLight(RedPointLight(tRedGL));
                        RedTest.run(true);


                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : addLight - RedPointLight 설정데이터 확인",
                    function () {

                        var tScene = RedScene(tRedGL);
                        var t1 = RedPointLight(tRedGL);
                        tScene.addLight(t1);
                        RedTest.run(tScene['_lightInfo']['RedPointLight'][0] === t1);


                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : addLight - MAX 갯수 확인",
                    function () {

                        var tScene = RedScene(tRedGL);
                        var i = RedSystemShaderCode.MAX_POINT_LIGHT;
                        while (i--) {
                            var t1 = RedPointLight(tRedGL);
                            tScene.addLight(t1);
                        }
                        RedTest.run(tScene['_lightInfo']['RedPointLight'].length === RedSystemShaderCode.MAX_POINT_LIGHT);

                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : addLight - MAX 갯수 확인 - 초과시 에러 확인",
                    function () {

                        var tScene = RedScene(tRedGL);
                        var i = RedSystemShaderCode.MAX_POINT_LIGHT + 1;
                        try {
                            while (i--) {
                                var t1 = RedPointLight(tRedGL);
                                tScene.addLight(t1);
                            }
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : addLight - RedPointLight가 아닌 데이터 입력",
                    function () {

                        var tScene = RedScene(tRedGL);
                        try {
                            tScene.addLight('test');
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
            "(RedScene Instance).removeLight( <b>value</b> ) : RedPointLight",
            function () {
                RedTest.test(
                    "성공테스트 : removeLight - RedPointLight 삭제",
                    function () {

                        var tScene = RedScene(tRedGL);
                        var t1 = RedPointLight(tRedGL);
                        tScene.addLight(t1);
                        tScene.removeLight(t1);
                        RedTest.run(tScene['_lightInfo']['RedPointLight'].length);


                    },
                    0
                );
            }
        );
        RedTest.testGroup(
            "(RedScene Instance).removeLightAll()",
            function () {

                RedTest.test(
                    "성공테스트 : removeLightAll()",
                    function () {

                        var tScene = RedScene(tRedGL);
                        tScene.addLight(RedPointLight(tRedGL));
                        tScene.addLight(RedPointLight(tRedGL));
                        tScene.addLight(RedDirectionalLight(tRedGL));
                        tScene.addLight(RedDirectionalLight(tRedGL));
                        tScene.addLight(RedAmbientLight(tRedGL));
                        tScene.removeLightAll();
                        RedTest.run(
                            tScene['_lightInfo']['RedAmbientLight'] === null
                            && tScene['_lightInfo']['RedPointLight'].length === 0
                            && tScene['_lightInfo']['RedDirectionalLight'].length === 0
                        );
                        tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();

                    },
                    true
                );

            }
        );
    }
);


