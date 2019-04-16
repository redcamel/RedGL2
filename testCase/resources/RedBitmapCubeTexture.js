"use strict";
RedTest.title = "RedBitmapCubeTexture TEST";
RedGL.setDoNotPrepareProgram();
var tRedGL;
RedGL(document.createElement('canvas'), function () {
    var testSrcList;
    tRedGL = this;
    testSrcList = [RedBaseTexture.EMPTY_BASE64, RedBaseTexture.EMPTY_BASE64, RedBaseTexture.EMPTY_BASE64, RedBaseTexture.EMPTY_BASE64, RedBaseTexture.EMPTY_BASE64, RedBaseTexture.EMPTY_BASE64];

    RedTest.testGroup(
        "RedBitmapCubeTexture( redGL, srcList, option, callBack )",
        function () {
            RedTest.test(
                "성공테스트 : 기본생성확인",
                function () {
                    var t0;
                    t0 = RedBitmapCubeTexture(tRedGL, testSrcList);
                    RedTest.run(t0 instanceof RedBitmapCubeTexture)
                },
                true
            )
        }
    );
    RedTest.testGroup(
        "RedBitmapCubeTexture( redGL, <b>srcList</b>, option, callBack )",
        function () {
            RedTest.test(
                "실패테스트 : 미입력",
                function () {
                    try {
                        RedBitmapCubeTexture(tRedGL);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            );
            RedTest.test(
                "실패테스트 : 숫자입력",
                function () {
                    try {
                        RedBitmapCubeTexture(tRedGL, 1);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            );
            RedTest.test(
                "실패테스트 : 오브젝트 입력",
                function () {
                    try {
                        RedBitmapCubeTexture(tRedGL, {});
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            );
            RedTest.test(
                "실패테스트 : length가 6이 아닐떄",
                function () {
                    try {
                        RedBitmapCubeTexture(tRedGL, ["src1", "src2", "src3", "src4", "src5"]);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            )
        }
    );
    RedTest.testGroup(
        "키(srcList.toString() + JSON.stringify(option)) 기반 캐싱 동작확인",
        function () {
            RedTest.test(
                "성공테스트 : 캐싱확인",
                function () {
                    try {
                        var t1 = RedBitmapCubeTexture(tRedGL, testSrcList);
                        var t2 = RedBitmapCubeTexture(tRedGL, testSrcList);
                        RedTest.run(t1 === t2)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                true
            );
            RedTest.test(
                "성공테스트 : 캐싱확인2",
                function () {
                    try {
                        var t1 = RedBitmapCubeTexture(tRedGL, testSrcList, {min: tRedGL.gl.LINEAR});
                        var t2 = RedBitmapCubeTexture(tRedGL, testSrcList);
                        RedTest.run(t1 === t2)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            );
        }
    );
    RedTest.testGroup(
        "RedBitmapCubeTexture( redGL, srcList, option, <b>callBack</b> )",
        function () {
            RedTest.test(
                "성공테스트 : 미입력",
                function () {
                    try {
                        RedBitmapTexture(tRedGL);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                true
            );
            RedTest.test(
                "성공테스트 : 콜백함수 입력",
                function () {
                    RedBitmapCubeTexture(tRedGL, testSrcList, null, function () {
                        RedTest.run(true)
                    })
                },
                true
            );
            RedTest.testListRun(
                "함수 or falsy 허용",
                [
                    [function () {
                    }, true],
                    [null, true],
                    [undefined, true],
                    [0, true],
                    [1, false],
                    [1.1, false],
                    [-1, false],
                    [-1.1, false],

                    ['문자테스트', false],
                    [[], false],
                    [{}, false]
                ],
                function (v) {
                    try {
                        RedBitmapCubeTexture(tRedGL, testSrcList, null, v[0]);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                }
            );
            RedTest.test(
                "성공테스트 : srcList로드 성공시 callback",
                function () {
                    RedBitmapCubeTexture(tRedGL, testSrcList, null, function (v) {
                        RedTest.run(v)
                    })
                },
                true
            );
            RedTest.test(
                "실패테스트 : srcList로드 실패시 callback",
                function () {
                    RedBitmapCubeTexture(tRedGL, ['~~', '~~', '~~', '~~', '~~', '~~'], null, function (v) {
                        RedTest.run(v)
                    })
                },
                false
            )
        }
    );
    RedTest.testGroup(
        "option - min",
        function () {
            RedTest.test(
                "option : 미입력",
                function () {
                    try {
                        RedBitmapCubeTexture(tRedGL, testSrcList);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                true
            );
            RedTest.test(
                "option : min - LINEAR",
                function () {
                    var t0 = RedBitmapCubeTexture(
                        tRedGL,
                        testSrcList,
                        {
                            min: tRedGL.gl.LINEAR
                        },
                        function () {
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
                            var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MIN_FILTER);
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
                            console.log(t1);
                            RedTest.run(t1)
                        }
                    )
                }, tRedGL.gl.LINEAR);
            RedTest.test(
                "option : min - NEAREST",
                function () {
                    var t0 = RedBitmapCubeTexture(
                        tRedGL,
                        testSrcList,
                        {
                            min: tRedGL.gl.NEAREST
                        },
                        function () {
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
                            var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MIN_FILTER);
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
                            console.log(t1);
                            RedTest.run(t1)
                        }
                    )
                }, tRedGL.gl.NEAREST);
            RedTest.test(
                "option : min - NEAREST_MIPMAP_NEAREST",
                function () {
                    var t0 = RedBitmapCubeTexture(
                        tRedGL,
                        testSrcList,
                        {
                            min: tRedGL.gl.NEAREST_MIPMAP_NEAREST
                        },
                        function () {
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
                            var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MIN_FILTER);
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
                            console.log(t1);
                            RedTest.run(t1)
                        }
                    )
                }, tRedGL.gl.NEAREST_MIPMAP_NEAREST);
            RedTest.test(
                "option : min - LINEAR_MIPMAP_NEAREST",
                function () {
                    var t0 = RedBitmapCubeTexture(
                        tRedGL,
                        testSrcList,
                        {
                            min: tRedGL.gl.LINEAR_MIPMAP_NEAREST
                        },
                        function () {
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
                            var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MIN_FILTER);
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
                            console.log(t1);
                            RedTest.run(t1)
                        }
                    )
                }, tRedGL.gl.LINEAR_MIPMAP_NEAREST);
            RedTest.test(
                "option : min - NEAREST_MIPMAP_LINEAR(default)",
                function () {
                    var t0 = RedBitmapCubeTexture(
                        tRedGL,
                        testSrcList,
                        {
                            min: tRedGL.gl.NEAREST_MIPMAP_LINEAR
                        },
                        function () {
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
                            var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MIN_FILTER);
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
                            console.log(t1);
                            RedTest.run(t1)
                        }
                    )
                }, tRedGL.gl.NEAREST_MIPMAP_LINEAR);
            RedTest.test(
                "option : min - LINEAR_MIPMAP_LINEAR",
                function () {
                    var t0 = RedBitmapCubeTexture(
                        tRedGL,
                        testSrcList,
                        {
                            min: tRedGL.gl.LINEAR_MIPMAP_LINEAR
                        },
                        function () {
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
                            var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MIN_FILTER);
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
                            console.log(t1);
                            RedTest.run(t1)
                        }
                    )
                }, tRedGL.gl.LINEAR_MIPMAP_LINEAR);
            RedTest.test(
                "option : min - 허용되지않는값 입력",
                function () {
                    try {
                        RedBitmapCubeTexture(
                            tRedGL,
                            testSrcList,
                            {
                                min: 'test'
                            }
                        );
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            )
        }
    );
    RedTest.testGroup(
        "option - mag",
        function () {
            RedTest.test(
                "option : 미입력",
                function () {
                    try {
                        RedBitmapCubeTexture(tRedGL, testSrcList);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                true
            );
            RedTest.test(
                "option : mag - LINEAR(default)",
                function () {
                    var t0 = RedBitmapCubeTexture(
                        tRedGL,
                        testSrcList,
                        {
                            mag: tRedGL.gl.LINEAR
                        },
                        function () {
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
                            var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MAG_FILTER);
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
                            console.log(t1);
                            RedTest.run(t1)
                        }
                    )
                }, tRedGL.gl.LINEAR);
            RedTest.test(
                "option : mag - NEAREST",
                function () {
                    var t0 = RedBitmapCubeTexture(
                        tRedGL,
                        testSrcList,
                        {
                            mag: tRedGL.gl.NEAREST
                        },
                        function () {
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
                            var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MAG_FILTER);
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
                            console.log(t1);
                            RedTest.run(t1)
                        }
                    )
                }, tRedGL.gl.NEAREST);
            RedTest.test(
                "option : mag - NEAREST_MIPMAP_NEAREST (이놈은 허용안됨)",
                function () {
                    try {
                        RedBitmapCubeTexture(
                            tRedGL,
                            testSrcList,
                            {
                                mag: tRedGL.gl.NEAREST_MIPMAP_NEAREST
                            }
                        );
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            );
            RedTest.test(
                "option : mag - LINEAR_MIPMAP_NEAREST (이놈은 허용안됨)",
                function () {
                    try {
                        RedBitmapCubeTexture(
                            tRedGL,
                            testSrcList,
                            {
                                mag: tRedGL.gl.LINEAR_MIPMAP_NEAREST
                            }
                        );
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            );
            RedTest.test(
                "option : mag - NEAREST_MIPMAP_LINEAR (이놈은 허용안됨)",
                function () {
                    try {
                        RedBitmapCubeTexture(
                            tRedGL,
                            testSrcList,
                            {
                                mag: tRedGL.gl.NEAREST_MIPMAP_LINEAR
                            }
                        );
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            );
            RedTest.test(
                "option : mag - LINEAR_MIPMAP_LINEAR (이놈은 허용안됨)",
                function () {
                    try {
                        RedBitmapCubeTexture(
                            tRedGL,
                            testSrcList,
                            {
                                mag: tRedGL.gl.LINEAR_MIPMAP_LINEAR
                            }
                        );
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            );
            RedTest.test(
                "option : mag - 허용되지않는값 입력",
                function () {
                    try {
                        RedBitmapCubeTexture(
                            tRedGL,
                            testSrcList,
                            {
                                mag: 'test'
                            }
                        );
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            )
        }
    );
    RedTest.testGroup(
        "option - wrap_s",
        function () {
            RedTest.test(
                "option : 미입력",
                function () {
                    try {
                        RedBitmapCubeTexture(tRedGL, testSrcList);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                true
            );
            RedTest.test(
                "option : wrap_s - REPEAT(default)",
                function () {
                    var t0 = RedBitmapCubeTexture(
                        tRedGL,
                        testSrcList,
                        {
                            wrap_s: tRedGL.gl.REPEAT
                        },
                        function () {
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
                            var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_WRAP_S);
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
                            console.log(t1);
                            RedTest.run(t1)
                        }
                    )
                }, tRedGL.gl.REPEAT);
            RedTest.test(
                "option : wrap_s - CLAMP_TO_EDGE",
                function () {
                    var t0 = RedBitmapCubeTexture(
                        tRedGL,
                        testSrcList,
                        {
                            wrap_s: tRedGL.gl.CLAMP_TO_EDGE
                        },
                        function () {
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
                            var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_WRAP_S);
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
                            console.log(t1);
                            RedTest.run(t1)
                        }
                    )
                }, tRedGL.gl.CLAMP_TO_EDGE);
            RedTest.test(
                "option : wrap_s - MIRRORED_REPEAT",
                function () {
                    var t0 = RedBitmapCubeTexture(
                        tRedGL,
                        testSrcList,
                        {
                            wrap_s: tRedGL.gl.MIRRORED_REPEAT
                        },
                        function () {
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
                            var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_WRAP_S);
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
                            console.log(t1);
                            RedTest.run(t1)
                        }
                    )
                }, tRedGL.gl.MIRRORED_REPEAT);
            RedTest.test(
                "option : wrap_s - 허용되지않는값 입력",
                function () {
                    try {
                        RedBitmapCubeTexture(
                            tRedGL,
                            testSrcList,
                            {
                                wrap_s: 'test'
                            }
                        );
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            )
        }
    );
    RedTest.testGroup(
        "option - wrap_t",
        function () {
            RedTest.test(
                "option : 미입력",
                function () {
                    try {
                        RedBitmapCubeTexture(tRedGL, testSrcList);
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                true
            );
            RedTest.test(
                "option : wrap_t - REPEAT(default)",
                function () {
                    var t0 = RedBitmapCubeTexture(
                        tRedGL,
                        testSrcList,
                        {
                            wrap_t: tRedGL.gl.REPEAT
                        },
                        function () {
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
                            var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_WRAP_T);
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
                            console.log(t1);
                            RedTest.run(t1)
                        }
                    )
                }, tRedGL.gl.REPEAT);
            RedTest.test(
                "option : wrap_t - CLAMP_TO_EDGE",
                function () {
                    var t0 = RedBitmapCubeTexture(
                        tRedGL,
                        testSrcList,
                        {
                            wrap_t: tRedGL.gl.CLAMP_TO_EDGE
                        },
                        function () {
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
                            var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_WRAP_T);
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
                            console.log(t1);
                            RedTest.run(t1)
                        }
                    )
                }, tRedGL.gl.CLAMP_TO_EDGE);
            RedTest.test(
                "option : wrap_t - MIRRORED_REPEAT",
                function () {
                    var t0 = RedBitmapCubeTexture(
                        tRedGL,
                        testSrcList,
                        {
                            wrap_t: tRedGL.gl.MIRRORED_REPEAT
                        },
                        function () {
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
                            var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_WRAP_T);
                            tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
                            console.log(t1);
                            RedTest.run(t1)
                        }
                    )
                }, tRedGL.gl.MIRRORED_REPEAT);
            RedTest.test(
                "option : wrap_t - 허용되지않는값 입력",
                function () {
                    try {
                        RedBitmapCubeTexture(
                            tRedGL,
                            testSrcList,
                            {
                                wrap_t: 'test'
                            }
                        );
                        RedTest.run(true)
                    } catch (error) {
                        RedTest.run(false, error)
                    }
                },
                false
            )
        }
    )

});
