/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedFrameBuffer TEST";
RedGL(document.createElement('canvas'), function () {
        var tRedGL = this;
        var tGL = tRedGL.gl;
        RedTest.testGroup(
            "RedFrameBuffer( redGL, width, height )",
            function () {
                RedTest.test("성공테스트 : 기본 생성 테스트", function () {

                    try {
                        RedFrameBuffer(tRedGL);
                        RedTest.run(true);

                    } catch (error) {
                        RedTest.run(false);

                    }

                }, true);

                RedTest.testGroup(
                    "RedFrameBuffer( <b>redGL</b>, width, height )",
                    function () {
                        RedTest.test("실패테스트 : RedGL Instance만 허용하는지", function () {

                            try {
                                RedFrameBuffer(1);
                                RedTest.run(true);

                            } catch (error) {
                                RedTest.run(false);

                            }

                        }, false);

                        RedTest.testGroup(
                            "RedFrameBuffer( redGL, <b>width, height</b> )",
                            function () {
                                RedTest.test("성공테스트 : width 반영되는지", function () {

                                    var t0 = RedFrameBuffer(tRedGL, 123);
                                    console.log(t0);
                                    RedTest.run(t0['width']);

                                }, 123);
                                RedTest.test("성공테스트 : width - 2보다 작은 숫자입력시 2로 치환되는지", function () {

                                    var t0 = RedFrameBuffer(tRedGL, 1, 512);
                                    RedTest.run(t0['width']);

                                }, 2);
                                RedTest.test("성공테스트 : height 반영되는지", function () {

                                    var t0 = RedFrameBuffer(tRedGL, 123, 512);
                                    console.log(t0);
                                    RedTest.run(t0['height']);

                                }, 512);
                                RedTest.test("성공테스트 : height - 2보다 작은 숫자입력시 2로 치환되는지", function () {

                                    var t0 = RedFrameBuffer(tRedGL, 512, 1);
                                    RedTest.run(t0['height']);

                                }, 2);
                                RedTest.test("성공테스트 : 2보다 큰 숫자만 허용", function () {

                                    var t0 = RedFrameBuffer(tRedGL, 123, 512);
                                    console.log(t0);
                                    RedTest.run(t0['height']);

                                }, 512);
                                RedTest.test("실패테스트 : width - 문자입력시", function () {

                                    try {
                                        RedFrameBuffer(tRedGL, '123', 512);
                                        RedTest.run(true);

                                    } catch (error) {
                                        RedTest.run(false);

                                    }

                                }, false);
                                RedTest.test("실패테스트 : height - 문자입력시", function () {

                                    try {
                                        RedFrameBuffer(tRedGL, 123, '512');
                                        RedTest.run(true);

                                    } catch (error) {
                                        RedTest.run(false);

                                    }

                                }, false)
                            }
                        );
                        RedTest.testGroup(
                            "webglFrameBuffer - (RedFrameBuffer Instance).<b>bind</b>( gl ), (RedFrameBuffer Instance).<b>unbind</b>( gl )",
                            function () {
                                RedTest.test("성공테스트 : bind - 소유하고있는 webglFrameBuffer가 등록되는지 확인", function () {

                                    var t0 = RedFrameBuffer(tRedGL);
                                    t0.bind(tGL);
                                    console.log(tGL.getParameter(tGL.FRAMEBUFFER_BINDING));
                                    RedTest.run(tGL.getParameter(tGL.FRAMEBUFFER_BINDING) === t0['webglFrameBuffer']);
                                    t0.unbind(tGL);

                                }, true);
                                RedTest.test("성공테스트 : unbind - webglFrameBuffer가 unbind 되는지 확인", function () {

                                    var t0 = RedFrameBuffer(tRedGL);
                                    t0.bind(tGL);
                                    t0.unbind(tGL);
                                    RedTest.run(tGL.getParameter(tGL.FRAMEBUFFER_BINDING) !== t0['webglFrameBuffer']);

                                }, true)
                            }
                        );
                        RedTest.testGroup(
                            "webglTexture - (RedFrameBuffer Instance).<b>bind</b>( gl ), (RedFrameBuffer Instance).<b>unbind</b>( gl )",
                            function () {
                                RedTest.test("성공테스트 : bind - 소유하고있는 webglTexture가 등록되는지 확인", function () {

                                    var t0 = RedFrameBuffer(tRedGL);
                                    t0.bind(tGL);
                                    console.log(tGL.getParameter(tGL.TEXTURE_BINDING_2D) === t0['texture']['webglTexture']);
                                    RedTest.run(tGL.getParameter(tGL.TEXTURE_BINDING_2D) === t0['texture']['webglTexture']);
                                    t0.unbind(tGL)

                                }, true);
                                RedTest.test("성공테스트 : unbind - 소유하고있는 webglTexture가 unbind 되는지 확인", function () {

                                    var t0 = RedFrameBuffer(tRedGL);
                                    t0.bind(tGL);
                                    t0.unbind(tGL);
                                    console.log(t0['texture']['webglTexture']);
                                    RedTest.run(tGL.getParameter(tGL.TEXTURE_BINDING_2D) !== t0['texture']['webglTexture']);

                                }, true)
                            }
                        );
                        RedTest.testGroup(
                            "webglRenderBuffer - (RedFrameBuffer Instance).<b>bind</b>( gl ), (RedFrameBuffer Instance).<b>unbind</b>( gl )",
                            function () {
                                RedTest.test("성공테스트 : bind - 소유하고있는 webglRenderBuffer가 등록되는지 확인", function () {

                                    var t0 = RedFrameBuffer(tRedGL);
                                    t0.bind(tGL);
                                    console.log(tGL.getParameter(tGL.RENDERBUFFER_BINDING));
                                    RedTest.run(tGL.getParameter(tGL.RENDERBUFFER_BINDING) === t0['webglRenderBuffer']);
                                    t0.unbind(tGL);
                                }, true);
                                RedTest.test("성공테스트 : unbind -  소유하고있는 webglRenderBuffer가 unbind 되는지 확인", function () {

                                    var t0 = RedFrameBuffer(tRedGL);
                                    t0.bind(tGL);
                                    console.log(tGL.getParameter(tGL.RENDERBUFFER_BINDING));
                                    t0.unbind(tGL);
                                    RedTest.run(tGL.getParameter(tGL.RENDERBUFFER_BINDING) !== t0['webglRenderBuffer']);
                                    tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                                }, true)
                            }
                        );
                    }
                )
            }
        )
    }
);