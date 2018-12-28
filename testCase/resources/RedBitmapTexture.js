"use strict";
RedGL.setDoNotPrepareProgram();
var tRedGL
RedGL(document.createElement('canvas'), function (v) {
    tRedGL = this;
    redSuite(
        "RedBitmapTexture Test",
        redGroup(
            "RedBitmapTexture( redGL, src, option, callBack )",
            redTest("성공테스트 : 기본생성확인", function (unit, title) {
                var t0;
                t0 = RedBitmapTexture(tRedGL, RedBaseTexture.EMPTY_BASE64)
                unit.run(t0 instanceof RedBitmapTexture)
            }, true)
        ),
        redGroup(
            "RedBitmapTexture( redGL, <b>src</b>, option, callBack )",
            redTest("성공테스트 : 미입력", function (unit, title) {
                try {
                    RedBitmapTexture(tRedGL)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("실패테스트 : 숫자입력", function (unit, title) {
                try {
                    RedBitmapTexture(tRedGL, 1)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : Canvas Element이외 Element입력", function (unit, title) {
                try {
                    RedBitmapTexture(tRedGL, document.createElement('div'))
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : Canvas Element입력", function (unit, title) {
                try {
                    RedBitmapTexture(tRedGL, document.createElement('canvas'))
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true)
        ),
        redGroup(
            "RedBitmapTexture( redGL, src, option, <b>callBack</b> )",
            redTest("성공테스트 : 미입력", function (unit, title) {
                try {
                    RedBitmapTexture(tRedGL)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : 콜백함수 입력", function (unit, title) {
                RedBitmapTexture(tRedGL, RedBaseTexture.EMPTY_BASE64, null, function () {
                    unit.run(true)
                })
            }, true),
            redTest("실패테스트 : 콜백에 함수외 다른것을 입력했을떄", function (unit, title) {
                try {
                    RedBitmapTexture(tRedGL, RedBaseTexture.EMPTY_BASE64, null, 1)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("성공테스트 : callback : 미입력", function (unit, title) {
                try {
                    RedBitmapTexture(tRedGL, RedBaseTexture.EMPTY_BASE64)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("성공테스트 : src로드 성공시 callback", function (unit, title) {
                RedBitmapTexture(tRedGL, RedBaseTexture.EMPTY_BASE64, null, function (v) {
                    unit.run(v)
                })
            }, true),
            redTest("실패테스트 : src로드 실패시 callback", function (unit, title) {
                RedBitmapTexture(tRedGL, '~~~', null, function (v) {
                    unit.run(v)
                })
            }, false)
        ),
        redGroup(
            "RedBitmapTexture( redGL, src, <b>option</b>, callBack ) : option - min",
            redTest("option : 미입력", function (unit, title) {
                try {
                    RedBitmapTexture(tRedGL, RedBaseTexture.EMPTY_BASE64)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("option : min - LINEAR", function (unit, title) {
                var t0 = RedBitmapTexture(
                    tRedGL,
                    RedBaseTexture.EMPTY_BASE64,
                    {
                        min: tRedGL.gl.LINEAR
                    },
                    function () {
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, t0['webglTexture']);
                        var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_2D, tRedGL.gl.TEXTURE_MIN_FILTER)
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, null);
                        console.log(t1)
                        unit.run(t1)
                    }
                )
            }, tRedGL.gl.LINEAR),
            redTest("option : min - NEAREST", function (unit, title) {
                var t0 = RedBitmapTexture(
                    tRedGL,
                    RedBaseTexture.EMPTY_BASE64,
                    {
                        min: tRedGL.gl.NEAREST
                    },
                    function () {
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, t0['webglTexture']);
                        var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_2D, tRedGL.gl.TEXTURE_MIN_FILTER)
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, null);
                        console.log(t1)
                        unit.run(t1)
                    }
                )
            }, tRedGL.gl.NEAREST),
            redTest("option : min - NEAREST_MIPMAP_NEAREST", function (unit, title) {
                var t0 = RedBitmapTexture(
                    tRedGL,
                    RedBaseTexture.EMPTY_BASE64,
                    {
                        min: tRedGL.gl.NEAREST_MIPMAP_NEAREST
                    },
                    function () {
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, t0['webglTexture']);
                        var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_2D, tRedGL.gl.TEXTURE_MIN_FILTER)
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, null);
                        console.log(t1)
                        unit.run(t1)
                    }
                )
            }, tRedGL.gl.NEAREST_MIPMAP_NEAREST),
            redTest("option : min - LINEAR_MIPMAP_NEAREST", function (unit, title) {
                var t0 = RedBitmapTexture(
                    tRedGL,
                    RedBaseTexture.EMPTY_BASE64,
                    {
                        min: tRedGL.gl.LINEAR_MIPMAP_NEAREST
                    },
                    function () {
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, t0['webglTexture']);
                        var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_2D, tRedGL.gl.TEXTURE_MIN_FILTER)
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, null);
                        console.log(t1)
                        unit.run(t1)
                    }
                )
            }, tRedGL.gl.LINEAR_MIPMAP_NEAREST),
            redTest("option : min - NEAREST_MIPMAP_LINEAR(default)", function (unit, title) {
                var t0 = RedBitmapTexture(
                    tRedGL,
                    RedBaseTexture.EMPTY_BASE64,
                    {
                        min: tRedGL.gl.NEAREST_MIPMAP_LINEAR
                    },
                    function () {
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, t0['webglTexture']);
                        var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_2D, tRedGL.gl.TEXTURE_MIN_FILTER)
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, null);
                        console.log(t1)
                        unit.run(t1)
                    }
                )
            }, tRedGL.gl.NEAREST_MIPMAP_LINEAR),
            redTest("option : min - LINEAR_MIPMAP_LINEAR", function (unit, title) {
                var t0 = RedBitmapTexture(
                    tRedGL,
                    RedBaseTexture.EMPTY_BASE64,
                    {
                        min: tRedGL.gl.LINEAR_MIPMAP_LINEAR
                    },
                    function () {
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, t0['webglTexture']);
                        var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_2D, tRedGL.gl.TEXTURE_MIN_FILTER)
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, null);
                        console.log(t1)
                        unit.run(t1)
                    }
                )
            }, tRedGL.gl.LINEAR_MIPMAP_LINEAR),
            redTest("option : min - 허용되지않는값 입력", function (unit, title) {
                try {
                    RedBitmapTexture(
                        tRedGL,
                        RedBaseTexture.EMPTY_BASE64,
                        {
                            min: 'test'
                        }
                    )
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "RedBitmapTexture( redGL, src, <b>option</b>, callBack ) : option - mag",
            redTest("option : 미입력", function (unit, title) {
                try {
                    RedBitmapTexture(tRedGL, RedBaseTexture.EMPTY_BASE64)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("option : mag - LINEAR(default)", function (unit, title) {
                var t0 = RedBitmapTexture(
                    tRedGL,
                    RedBaseTexture.EMPTY_BASE64,
                    {
                        mag: tRedGL.gl.LINEAR
                    },
                    function () {
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, t0['webglTexture']);
                        var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_2D, tRedGL.gl.TEXTURE_MAG_FILTER)
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, null);
                        console.log(t1)
                        unit.run(t1)
                    }
                )
            }, tRedGL.gl.LINEAR),
            redTest("option : mag - NEAREST", function (unit, title) {
                var t0 = RedBitmapTexture(
                    tRedGL,
                    RedBaseTexture.EMPTY_BASE64,
                    {
                        mag: tRedGL.gl.NEAREST
                    },
                    function () {
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, t0['webglTexture']);
                        var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_2D, tRedGL.gl.TEXTURE_MAG_FILTER)
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, null);
                        console.log(t1)
                        unit.run(t1)
                    }
                )
            }, tRedGL.gl.NEAREST),
            redTest("option : mag - NEAREST_MIPMAP_NEAREST (이놈은 허용안됨)", function (unit, title) {
                try {
                    RedBitmapTexture(
                        tRedGL,
                        RedBaseTexture.EMPTY_BASE64,
                        {
                            mag: tRedGL.gl.NEAREST_MIPMAP_NEAREST
                        }
                    )
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("option : mag - LINEAR_MIPMAP_NEAREST (이놈은 허용안됨)", function (unit, title) {
                try {
                    RedBitmapTexture(
                        tRedGL,
                        RedBaseTexture.EMPTY_BASE64,
                        {
                            mag: tRedGL.gl.LINEAR_MIPMAP_NEAREST
                        }
                    )
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("option : mag - NEAREST_MIPMAP_LINEAR (이놈은 허용안됨)", function (unit, title) {
                try {
                    RedBitmapTexture(
                        tRedGL,
                        RedBaseTexture.EMPTY_BASE64,
                        {
                            mag: tRedGL.gl.NEAREST_MIPMAP_LINEAR
                        }
                    )
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("option : mag - LINEAR_MIPMAP_LINEAR (이놈은 허용안됨)", function (unit, title) {
                try {
                    RedBitmapTexture(
                        tRedGL,
                        RedBaseTexture.EMPTY_BASE64,
                        {
                            mag: tRedGL.gl.LINEAR_MIPMAP_LINEAR
                        }
                    )
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("option : mag - 허용되지않는값 입력", function (unit, title) {
                try {
                    RedBitmapTexture(
                        tRedGL,
                        RedBaseTexture.EMPTY_BASE64,
                        {
                            mag: 'test'
                        }
                    )
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "RedBitmapTexture( redGL, src, <b>option</b>, callBack ) : option - wrap_s",
            redTest("option : 미입력", function (unit, title) {
                try {
                    RedBitmapTexture(tRedGL, RedBaseTexture.EMPTY_BASE64)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("option : wrap_s - REPEAT(default)", function (unit, title) {
                var t0 = RedBitmapTexture(
                    tRedGL,
                    RedBaseTexture.EMPTY_BASE64,
                    {
                        wrap_s: tRedGL.gl.REPEAT
                    },
                    function () {
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, t0['webglTexture']);
                        var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_2D, tRedGL.gl.TEXTURE_WRAP_S)
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, null);
                        console.log(t1)
                        unit.run(t1)
                    }
                )
            }, tRedGL.gl.REPEAT),
            redTest("option : wrap_s - CLAMP_TO_EDGE", function (unit, title) {
                var t0 = RedBitmapTexture(
                    tRedGL,
                    RedBaseTexture.EMPTY_BASE64,
                    {
                        wrap_s: tRedGL.gl.CLAMP_TO_EDGE
                    },
                    function () {
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, t0['webglTexture']);
                        var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_2D, tRedGL.gl.TEXTURE_WRAP_S)
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, null);
                        console.log(t1)
                        unit.run(t1)
                    }
                )
            }, tRedGL.gl.CLAMP_TO_EDGE),
            redTest("option : wrap_s - MIRRORED_REPEAT", function (unit, title) {
                var t0 = RedBitmapTexture(
                    tRedGL,
                    RedBaseTexture.EMPTY_BASE64,
                    {
                        wrap_s: tRedGL.gl.MIRRORED_REPEAT
                    },
                    function () {
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, t0['webglTexture']);
                        var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_2D, tRedGL.gl.TEXTURE_WRAP_S)
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, null);
                        console.log(t1)
                        unit.run(t1)
                    }
                )
            }, tRedGL.gl.MIRRORED_REPEAT),
            redTest("option : wrap_s - 허용되지않는값 입력", function (unit, title) {
                try {
                    RedBitmapTexture(
                        tRedGL,
                        RedBaseTexture.EMPTY_BASE64,
                        {
                            wrap_s: 'test'
                        }
                    )
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "RedBitmapTexture( redGL, src, <b>option</b>, callBack ) : option - wrap_t",
            redTest("option : 미입력", function (unit, title) {
                try {
                    RedBitmapTexture(tRedGL, RedBaseTexture.EMPTY_BASE64)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true),
            redTest("option : wrap_t - REPEAT(default)", function (unit, title) {
                var t0 = RedBitmapTexture(
                    tRedGL,
                    RedBaseTexture.EMPTY_BASE64,
                    {
                        wrap_t: tRedGL.gl.REPEAT
                    },
                    function () {
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, t0['webglTexture']);
                        var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_2D, tRedGL.gl.TEXTURE_WRAP_T)
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, null);
                        console.log(t1)
                        unit.run(t1)
                    }
                )
            }, tRedGL.gl.REPEAT),
            redTest("option : wrap_t - CLAMP_TO_EDGE", function (unit, title) {
                var t0 = RedBitmapTexture(
                    tRedGL,
                    RedBaseTexture.EMPTY_BASE64,
                    {
                        wrap_t: tRedGL.gl.CLAMP_TO_EDGE
                    },
                    function () {
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, t0['webglTexture']);
                        var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_2D, tRedGL.gl.TEXTURE_WRAP_T)
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, null);
                        console.log(t1)
                        unit.run(t1)
                    }
                )
            }, tRedGL.gl.CLAMP_TO_EDGE),
            redTest("option : wrap_t - MIRRORED_REPEAT", function (unit, title) {
                var t0 = RedBitmapTexture(
                    tRedGL,
                    RedBaseTexture.EMPTY_BASE64,
                    {
                        wrap_t: tRedGL.gl.MIRRORED_REPEAT
                    },
                    function () {
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, t0['webglTexture']);
                        var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_2D, tRedGL.gl.TEXTURE_WRAP_T)
                        tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_2D, null);
                        console.log(t1)
                        unit.run(t1)
                    }
                )
            }, tRedGL.gl.MIRRORED_REPEAT),
            redTest("option : wrap_t - 허용되지않는값 입력", function (unit, title) {
                try {
                    RedBitmapTexture(
                        tRedGL,
                        RedBaseTexture.EMPTY_BASE64,
                        {
                            wrap_t: 'test'
                        }
                    )
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        )
    )
})
