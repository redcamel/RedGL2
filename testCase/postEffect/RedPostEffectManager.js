"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedPostEffectManager TEST";
RedGL(document.createElement('canvas'), function () {
        var tRedGL = this;

        RedTest.testGroup(
            "RedPostEffectManager( redGL )",
            function () {
                RedTest.test(
                    "성공테스트 : RedGL Instance만 허용",
                    function () {

                        try {
                            RedPostEffectManager(tRedGL);
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : RedGL Instance만 허용",
                    function () {
                        try {
                            RedPostEffectManager(1);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : RedScene Instance 생성시 postEffectManager속성에 RedPostEffectManager Instance가 생김",
                    function () {

                        var t0 = RedView('test', tRedGL, RedScene(tRedGL), RedCamera());
                        RedTest.run(t0['postEffectManager'] instanceof RedPostEffectManager);


                    },
                    true
                );
            }
        );
        RedTest.testGroup(
            "설정불가 속성 확인 : frameBuffer / finalMaterial / postEffectList / children",
            function () {
                RedTest.test(
                    "실패테스트 : frameBuffer",
                    function () {

                        var t0 = RedPostEffectManager(tRedGL);
                        try {
                            t0.frameBuffer = 'failTest';
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : finalMaterial",
                    function () {

                        var t0 = RedPostEffectManager(tRedGL);
                        try {
                            t0.finalMaterial = 'failTest';
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : postEffectList",
                    function () {

                        var t0 = RedPostEffectManager(tRedGL);
                        try {
                            t0.postEffectList = 'failTest';
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : children",
                    function () {

                        var t0 = RedPostEffectManager(tRedGL);
                        try {
                            t0.children = 'failTest';
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
            "(RedPostEffectManager Instance).<b>addEffect</b>( effect )",
            function () {
                RedTest.test(
                    "실패테스트 : 미입력",
                    function () {

                        var t0 = RedPostEffectManager(tRedGL);
                        try {
                            t0.addEffect(null);
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : RedBasePostEffect 확장 인스턴스 입력",
                    function () {

                        var t0 = RedPostEffectManager(tRedGL);
                        var tEffect0 = RedPostEffect_Gray(tRedGL);
                        t0.addEffect(tEffect0);
                        RedTest.run(t0['postEffectList'][0] === tEffect0);


                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : 문자입력",
                    function () {

                        var t0 = RedPostEffectManager(tRedGL);
                        try {
                            t0.addEffect('failTest');
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : 추가후 postEffectList.length 정상적으로 늘어나는지 확인",
                    function () {

                        var t0 = RedPostEffectManager(tRedGL);
                        var tEffect0 = RedPostEffect_Gray(tRedGL);
                        t0.addEffect(tEffect0);
                        t0.addEffect(tEffect0);
                        RedTest.run(t0['postEffectList'].length);


                    }, 2)
            }
        );
        RedTest.testGroup(
            "(RedPostEffectManager Instance).<b>removeEffect</b>( effect )",
            function () {
                RedTest.test(
                    "성공테스트 : 동작 확인",
                    function () {

                        var t0 = RedPostEffectManager(tRedGL);
                        var tEffect0 = RedPostEffect_Gray(tRedGL);
                        t0.addEffect(tEffect0);
                        t0.removeEffect(tEffect0);
                        RedTest.run(t0['postEffectList'].length);


                    }, 0);
                RedTest.test(
                    "성공테스트 : 미입력 해도 에러가 안나야함",
                    function () {

                        var t0 = RedPostEffectManager(tRedGL);
                        try {
                            t0.removeEffect();
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : postEffectList에 없는 녀석을 제거를 시도해도 에러가 안나야함",
                    function () {

                        var t0 = RedPostEffectManager(tRedGL);
                        var tEffect0 = RedPostEffect_Gray(tRedGL);
                        t0.addEffect(tEffect0);
                        t0.removeEffect(RedPostEffect_Threshold(tRedGL));
                        RedTest.run(t0['postEffectList'].length);


                    }, 1)
            }
        );
        RedTest.testGroup(
            "(RedPostEffectManager Instance).<b>removeAllEffect</b>()",
            function () {
                RedTest.test(
                    "동작 확인",
                    function () {

                        var t0 = RedPostEffectManager(tRedGL);
                        var tEffect0 = RedPostEffect_Gray(tRedGL);
                        t0.addEffect(tEffect0);
                        t0.addEffect(tEffect0);
                        t0.addEffect(tEffect0);
                        t0.addEffect(tEffect0);
                        t0.addEffect(tEffect0);
                        t0.addEffect(tEffect0);
                        t0.addEffect(tEffect0);
                        t0.addEffect(tEffect0);
                        t0.addEffect(tEffect0);
                        console.log(t0['postEffectList'].length);
                        t0.removeAllEffect();
                        RedTest.run(t0['postEffectList'].length);


                    }, 0)
            }
        );
        RedTest.testGroup(
            "(RedPostEffectManager Instance).<b>antialiasing</b> = value",
            function () {
                RedTest.test(
                    "성공테스트 : antialiasing 설정확인",
                    function () {

                        var t0 = RedPostEffectManager(tRedGL);
                        var tEffect0 = RedPostEffect_FXAA(tRedGL);
                        t0['antialiasing'] = tEffect0;
                        RedTest.run(t0['antialiasing'] === tEffect0);


                    },
                    true
                );
                RedTest.test(
                    "실패테스트 : RedPostEffect_FXAA Instance 만 허용",
                    function () {

                        try {
                            var t0 = RedPostEffectManager(tRedGL);
                            t0['antialiasing'] = 1;
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }

                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : null 설정확인",
                    function () {

                        var t0 = RedPostEffectManager(tRedGL);
                        t0['antialiasing'] = null;
                        RedTest.run(t0['antialiasing']);


                    }, null)
            }
        );
        RedTest.testGroup(
            "webglFrameBuffer : (RedPostEffectManager Instance).<b>bind</b>( gl ) / (RedPostEffectManager Instance).<b>unbind</b>( gl )",
            function () {
                RedTest.test(
                    "성공테스트 : bind - 소유하고있는 webglFrameBuffer가 등록되는지 확인",
                    function () {

                        var tGL = tRedGL.gl;
                        var t0 = RedPostEffectManager(tRedGL);
                        t0.bind(tGL);
                        console.log(tGL.getParameter(tGL.FRAMEBUFFER_BINDING));
                        RedTest.run(tGL.getParameter(tGL.FRAMEBUFFER_BINDING) === t0['frameBuffer']['webglFrameBuffer']);
                        t0.unbind(tGL);


                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : unbind - webglFrameBuffer가 unbind 되는지 확인",
                    function () {

                        var tGL = tRedGL.gl;
                        var t0 = RedPostEffectManager(tRedGL);
                        t0.bind(tGL);
                        t0.unbind(tGL);
                        RedTest.run(tGL.getParameter(tGL.FRAMEBUFFER_BINDING) === t0['frameBuffer']['webglFrameBuffer']);


                    },
                    false
                )
            }
        );
        RedTest.testGroup(
            "webglTexture : (RedPostEffectManager Instance).<b>bind</b>( gl ) / (RedPostEffectManager Instance).<b>unbind</b>( gl )",
            function () {
                RedTest.test(
                    "성공테스트 : bind - 소유하고있는 webglTexture가 등록되는지 확인",
                    function () {

                        var tGL = tRedGL.gl;
                        var t0 = RedPostEffectManager(tRedGL);
                        t0.bind(tGL);
                        console.log(tGL.getParameter(tGL.TEXTURE_BINDING_2D) === t0['frameBuffer']['texture']['webglTexture']);
                        RedTest.run(tGL.getParameter(tGL.TEXTURE_BINDING_2D) === t0['frameBuffer']['texture']['webglTexture']);
                        t0.unbind(tGL);


                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : unbind - 소유하고있는 webglTexture가 unbind 되는지 확인",
                    function () {

                        var tGL = tRedGL.gl;
                        var t0 = RedPostEffectManager(tRedGL);
                        t0.bind(tGL);
                        t0.unbind(tGL);
                        console.log(t0['frameBuffer']['texture']['webglTexture']);
                        RedTest.run(tGL.getParameter(tGL.TEXTURE_BINDING_2D) === t0['frameBuffer']['texture']['webglTexture']);


                    },
                    false
                )
            }
        );
        RedTest.testGroup(
            "webglRenderBuffer : (RedPostEffectManager Instance).<b>bind</b>( gl ) / (RedPostEffectManager Instance).<b>unbind</b>( gl )",
            function () {
                RedTest.test(
                    "성공테스트 : bind - 소유하고있는 webglRenderBuffer가 등록되는지 확인",
                    function () {

                        var tGL = tRedGL.gl;
                        var t0 = RedPostEffectManager(tRedGL);
                        t0.bind(tGL);
                        console.log(tGL.getParameter(tGL.RENDERBUFFER_BINDING));
                        RedTest.run(tGL.getParameter(tGL.RENDERBUFFER_BINDING) === t0['frameBuffer']['webglRenderBuffer']);
                        t0.unbind(tGL);


                    },
                    true
                );
                RedTest.test(
                    "unbind - unbind시 소유하고있는 webglRenderBuffer가 unbind 되는지 확인",
                    function () {

                        var tGL = tRedGL.gl;
                        var t0 = RedPostEffectManager(tRedGL);
                        t0.bind(tGL);
                        console.log(tGL.getParameter(tGL.RENDERBUFFER_BINDING));
                        t0.unbind(tGL);
                        RedTest.run(tGL.getParameter(tGL.RENDERBUFFER_BINDING) === t0['frameBuffer']['webglRenderBuffer']);
                        tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();

                    },
                    false
                )
            }
        );
    }
);