/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
RedTest.title = "RedShader TEST";
RedGL.setDoNotPrepareProgram();
RedTest.mode = RedTest.REQUEST_MODE;
RedGL(document.createElement('canvas'), function () {
        var tRedGL = this;
        var vSource, fSource;
        vSource = function () {
            /* @preserve
             void main(void) {
             gl_Position = vec4(1.0);
             }
             */
        };
        fSource = function () {
            /* @preserve
             precision mediump float;
             void main(void) {
             gl_FragColor = vec4(1.0);
             }
             */
        };
        var checkhaderVertex = RedShader(tRedGL, 'vertexTestShader', RedShader.VERTEX, RedGLUtil.getStrFromComment(vSource.toString()));
        var checkShaderFragment = RedShader(tRedGL, 'fragmentTestShader', RedShader.FRAGMENT, RedGLUtil.getStrFromComment(fSource.toString()));

        RedTest.testGroup(
            "RedShader( redGL, key, type, source )",
            function () {
                RedTest.test(
                    "성공테스트 : 기본 파싱 테스트 : vertex shader",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false)
                        }
                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : 기본 파싱 테스트 : fragment shader",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             precision mediump float;
                             void main(void) {
                                gl_FragColor = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.FRAGMENT, source);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false)
                        }
                    },
                    true
                );
                RedTest.test(
                    "성공테스트 : 쉐이더 타입 확인 : vertex shader",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        RedTest.run(t0['type'])
                    },
                    RedShader.VERTEX
                );
                RedTest.test(
                    "성공테스트 : 쉐이더 타입 확인 : fragment shader",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             precision mediump float;
                             void main(void) {
                                gl_FragColor = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.FRAGMENT, source);
                        RedTest.run(t0['type'])
                    },
                    RedShader.FRAGMENT
                );
                RedTest.testListRun(
                    "key는 문자열만 허용",
                    RedTest.ONLY_STRING,
                    function (v) {
                        var source;
                        source = function () {
                            /* @preserve
                             precision mediump float;
                             void main(void) {
                                gl_FragColor = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, v[0], RedShader.FRAGMENT, source);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    }
                );
                RedTest.test(
                    "성공테스트 : 키와 타입으로 찾기 확인 : 키와 타입만  입력시 해당키로 등록된 녀석을 가지고오는지 - 올바른검색",
                    function () {
                        var t0 = RedShader(tRedGL, 'vertexTestShader', RedShader.VERTEX);
                        console.log(t0);
                        RedTest.run(t0)
                    }, checkhaderVertex);
                RedTest.test(
                    "성공테스트 : 키와 타입으로 찾기 확인 : 키와 타입만  입력시 해당키로 등록된 녀석을 가지고오는지 - 올바른검색",
                    function () {
                        var t0 = RedShader(tRedGL, 'fragmentTestShader', RedShader.FRAGMENT);
                        console.log(t0);
                        RedTest.run(t0)
                    }, checkShaderFragment);
                RedTest.test(
                    "성공테스트 : 키와 타입으로 찾기 확인 : 키와 타입만  입력시 해당키로 등록된 녀석을 가지고오는지 - vertex, fragment 격리 구분되는지",
                    function () {
                        try {
                            var t0 = RedShader(tRedGL, 'fragmentTestShader', RedShader.VERTEX);
                            console.log(t0);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "성공테스트 : 키와 타입으로 찾기 확인 : 키와 타입만  입력시 해당키로 등록된 녀석을 가지고오는지 - vertex, fragment 격리 구분되는지",
                    function () {
                        try {
                            var t0 = RedShader(tRedGL, 'vertexTestShader', RedShader.FRAGMENT);
                            console.log(t0);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "실패테스트 : 키 중복 방지확인 : 키, 타입, 소스 모두 입력시 생성으로 판단함. 이때 키 타입별로 키중복을 확인함",
                    function () {
                        try {
                            var source;
                            source = function () {
                                /* @preserve
                                 precision mediump float;
                                 void main(void) {
                                 gl_FragColor = vec4(1.0);
                                 }
                                 */
                            };
                            source = RedGLUtil.getStrFromComment(source.toString());
                            var t0 = RedShader(tRedGL, 'fragmentTestShader', RedShader.FRAGMENT, source);
                            console.log(t0);
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
            "쉐이더 타입 확인",
            function () {
                RedTest.test(
                    "쉐이더 타입 확인 : type과 다른 형식의 소스가 들어왔을때 vertexShaderType + fragmentSource",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             void main(void) {
                                gl_FragColor = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "쉐이더 타입 확인 : type과 다른 형식의 소스가 들어왔을때 fragmentShaderType + vertexSource",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             precision mediump float;
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.FRAGMENT, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "쉐이더 타입 확인 : 존재하지 않는 type을 입력했을떄",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             precision mediump float;
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), 'NO_TYPE_TEST', source);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "쉐이더 타입 확인 : fragmentShaderType인데 소스에 precision가 정의되어있지 않은경우",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             void main(void) {
                             gl_FragColor = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'testShader' + RedGL.makeUUID(), RedShader.FRAGMENT, source);
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
            "3자리 선언 확인",
            function () {
                RedTest.test(
                    "유니폼 선언 형식 확인 : 3자리 선언확인",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform vec3 uTest;
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        console.log(t0);
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uTest') return true
                        })[0];
                        RedTest.run(t1['precision'] + '_' + t1['uniformType'] + '_' + t1['name'])
                    }, 'undefined_vec3_uTest');
                RedTest.test(
                    "어트리뷰트 선언 형식 확인 : 3자리 선언확인",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             attribute vec3 aTest;
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'attributeTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        console.log(t0);
                        t1 = t0['parseData']['attribute']['list'].filter(function (v) {
                            if (v['name'] === 'aTest') return true
                        })[0];
                        RedTest.run(t1['precision'] + '_' + t1['attributeType'] + '_' + t1['name'])
                    }, 'undefined_vec3_aTest');
                RedTest.test(
                    "베어링 선언 형식 확인 : 3자리 선언확인",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             varying vec3 vTest;
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'varyingTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        console.log(t0);
                        t1 = t0['parseData']['varying']['list'].filter(function (v) {
                            if (v['name'] === 'vTest') return true
                        })[0];
                        RedTest.run(t1['precision'] + '_' + t1['varyingType'] + '_' + t1['name'])
                    }, 'undefined_vec3_vTest')
            }
        );
        RedTest.testGroup(
            "4자리 선언 확인",
            function () {
                RedTest.test(
                    "유니폼 선언 형식 확인 : highp 같이 4자리 선언확인",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform highp vec3 uTest;
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        console.log(t0);
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uTest') return true
                        })[0];
                        RedTest.run(t1['precision'] + '_' + t1['uniformType'] + '_' + t1['name'])
                    }, 'highp_vec3_uTest');
                RedTest.test(
                    "어트리뷰트 선언 형식 확인 : highp 같이 4자리 선언확인",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             attribute highp vec3 aTest;
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'attributeTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        console.log(t0);
                        t1 = t0['parseData']['attribute']['list'].filter(function (v) {
                            if (v['name'] === 'aTest') return true
                        })[0];
                        RedTest.run(t1['precision'] + '_' + t1['attributeType'] + '_' + t1['name'])
                    }, 'highp_vec3_aTest');
                RedTest.test(
                    "베어링 선언 형식 확인 : highp 같이 4자리 선언확인",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             varying highp vec3 vTest;
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'varyingTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        console.log(t0);
                        t1 = t0['parseData']['varying']['list'].filter(function (v) {
                            if (v['name'] === 'vTest') return true
                        })[0];
                        RedTest.run(t1['precision'] + '_' + t1['varyingType'] + '_' + t1['name'])
                    }, 'highp_vec3_vTest')
            }
        );
        RedTest.testGroup(
            "유니폼 체크 확인",
            function () {
                RedTest.test(
                    "유니폼 이름 형식 확인 : 유니폼은 uXxxxx형태로 선언되어야함. - 실패테스트( uniform vec3 test; )",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform vec3 test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "유니폼 이름 형식 확인 : 유니폼은 uXxxxx형태로 선언되어야함. - 실패테스트( uniform vec3 Utest; ) / 첫번째 문자는 대문자로 시작하면 안됨",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform vec3 Utest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "유니폼 이름 형식 확인 : 유니폼은 uXxxxx형태로 선언되어야함. - 실패테스트( uniform vec3 utest; ) / 두번째 문자는 대문자로 시작해야함",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform vec3 utest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "유니폼 이름 형식 확인 : 유니폼은 uXxxxx형태로 선언되어야함. - 성공테스트( varying vec3 uTest; )",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform vec3 uTest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    true
                );
                RedTest.test(
                    "유니폼 선언 형식 확인 : float",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform float uFloatTest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uFloatTest') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'float');
                RedTest.test(
                    "유니폼 선언 형식 확인 : int",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform int uIntTest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uIntTest') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'int');
                RedTest.test(
                    "유니폼 선언 형식 확인 : bool",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform bool uBoolTest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uBoolTest') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'bool');
                RedTest.test(
                    "유니폼 선언 형식 확인 : vec2",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform vec2 uVec2Test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uVec2Test') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'vec2');
                RedTest.test(
                    "유니폼 선언 형식 확인 : vec3",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform vec3 uVec3Test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uVec3Test') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'vec3');
                RedTest.test(
                    "유니폼 선언 형식 확인 : vec4",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform vec4 uVec4Test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uVec4Test') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'vec4');
                RedTest.test(
                    "유니폼 선언 형식 확인 : ivec2",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform ivec2 uIvec2Test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uIvec2Test') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'ivec2');
                RedTest.test(
                    "유니폼 선언 형식 확인 : ivec3",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform ivec3 uIvec3Test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uIvec3Test') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'ivec3');
                RedTest.test(
                    "유니폼 선언 형식 확인 : ivec4",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform ivec4 uIvec4Test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uIvec4Test') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'ivec4');
                RedTest.test(
                    "유니폼 선언 형식 확인 : bvec2",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform bvec2 uBvec2Test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uBvec2Test') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'bvec2');
                RedTest.test(
                    "유니폼 선언 형식 확인 : bvec3",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform bvec3 uBvec3Test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uBvec3Test') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'bvec3');
                RedTest.test(
                    "유니폼 선언 형식 확인 : bvec4",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform bvec4 uBvec4Test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uBvec4Test') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'bvec4');
                RedTest.test(
                    "유니폼 선언 형식 확인 : mat2",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform mat2 uMat2Test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uMat2Test') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'mat2');
                RedTest.test(
                    "유니폼 선언 형식 확인 : mat3",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform mat3 uMat3Test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uMat3Test') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'mat3');
                RedTest.test(
                    "유니폼 선언 형식 확인 : mat4",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform mat4 uMat4Test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uMat4Test') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'mat4');
                RedTest.test(
                    "유니폼 선언 형식 확인 : sampler2D",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform sampler2D uSampler2DTest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uSampler2DTest') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'sampler2D');
                RedTest.test(
                    "유니폼 선언 형식 확인 : samplerCube",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform samplerCube uSamplerCubeTest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uSamplerCubeTest') return true
                        })[0];
                        RedTest.run(t1['uniformType']);
                        console.log(t0);
                        console.log(t1)
                    }, 'samplerCube')
            }
        );
        RedTest.testGroup(
            "베어링 체크 확인",
            function () {
                RedTest.test(
                    "베어링 이름 형식 확인 : 베어링은 vXxxxx형태로 선언되어야함. - 실패테스트( varying vec3 test; )",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             varying vec3 test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'varyingTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "베어링 이름 형식 확인 : 베어링은 vXxxxx형태로 선언되어야함. - 실패테스트( varying vec3 Vtest; ) / 첫번째 문자는 대문자로 시작하면 안됨",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             varying vec3 Vtest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'varyingTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "베어링 이름 형식 확인 : 베어링은 vXxxxx형태로 선언되어야함. - 실패테스트( varying vec3 vtest; ) / 두번째 문자는 대문자로 시작해야함 ",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             varying vec3 vtest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'varyingTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "베어링 이름 형식 확인 : 베어링은 vXxxxx형태로 선언되어야함. - 성공테스트( varying vec3 vTest; )",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             varying vec3 vTest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'varyingTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    true
                )
            }
        );
        RedTest.testGroup(
            "어트리뷰트 체크 확인",
            function () {
                RedTest.test(
                    "어트리뷰트 이름 형식 확인 : 어트리뷰트은 aXxxxx형태로 선언되어야함. - 실패테스트( attribute vec3 test; )",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             attribute vec3 test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'attributeTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "어트리뷰트 이름 형식 확인 : 어트리뷰트은 aXxxxx형태로 선언되어야함. - 실패테스트( attribute vec3 Atest; ) / 첫번째 문자는 대문자로 시작하면 안됨",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             attribute vec3 Atest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'attributeTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "어트리뷰트 이름 형식 확인 : 어트리뷰트은 aXxxxx형태로 선언되어야함. - 실패테스트( attribute vec3 atest; ) / 두번째 문자는 대문자로 시작해야함",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             attribute vec3 atest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'attributeTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "어트리뷰트 이름 형식 확인 : 어트리뷰트은 aXxxxx형태로 선언되어야함. - 성공테스트( attribute vec3 aTest; )",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             attribute vec3 aTest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'attributeTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    true
                )
            }
        );
        RedTest.testGroup(
            "상수 체크 확인",
            function () {
                RedTest.test(
                    "상수 이름 형식 확인 : 상수는 cXxxxx형태로 선언되어야함. - 실패테스트( const vec3 test; )",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             const vec3 test;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'constTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "상수 이름 형식 확인 : 상수는 cXxxxx형태로 선언되어야함. - 실패테스트( const vec3 Ctest; ) / 첫번째 문자는 대문자로 시작하면 안됨",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             const vec3 Ctest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'constTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "상수 이름 형식 확인 : 상수는 cXxxxx형태로 선언되어야함. - 실패테스트( const vec3 ctest; ) / 두번째 문자는 대문자로 시작해야함",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             const vec3 ctest;
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'constTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "상수 이름 형식 확인 : 상수는 cXxxxx형태로 선언되어야함. - 성공테스트( const vec3 cTest; )",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             const vec3 cTest = vec3(1.0);
                             void main(void) {
                             gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            RedShader(tRedGL, 'constTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    true
                )
            }
        );
        RedTest.testGroup(
            "배열 형식 체크 확인",
            function () {
                RedTest.test(
                    "유니폼 선언 형식 확인 : uFloatArray[3]",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform float uFloatArray[3];
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uFloatArray') return true
                        })[0];
                        RedTest.run(t1['uniformType'] + '_' + t1['arrayNum']);
                        console.log(t0);
                        console.log(t1)
                    },
                    'float_3'
                );
                RedTest.test(
                    "유니폼 선언 형식 확인 : uIntArray[3]",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform int uIntArray[3];
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uIntArray') return true
                        })[0];
                        RedTest.run(t1['uniformType'] + '_' + t1['arrayNum']);
                        console.log(t0);
                        console.log(t1)
                    },
                    'int_3'
                );
                RedTest.test(
                    "유니폼 선언 형식 확인 : uFloatArray[3]",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform highp float uFloatArray[3];
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uFloatArray') return true
                        })[0];
                        RedTest.run(t1['uniformType'] + '_' + t1['arrayNum']);
                        console.log(t0);
                        console.log(t1)
                    },
                    'float_3'
                );
                RedTest.test(
                    "유니폼 선언 형식 확인 : uIntArray[3]",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform highp int uIntArray[3];
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                        var t1;
                        t1 = t0['parseData']['uniform']['list'].filter(function (v) {
                            if (v['name'] === 'uIntArray') return true
                        })[0];
                        RedTest.run(t1['uniformType'] + '_' + t1['arrayNum']);
                        console.log(t0);
                        console.log(t1)
                    },
                    'int_3'
                )
            }
        );
        RedTest.testGroup(
            "중복소스 확인",
            function () {
                RedTest.test(
                    "유니폼 중복선언",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform int uTest;
                             uniform int uTest;
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            console.log(t0);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "어트리뷰트 중복선언",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             attribute int aTest;
                             attribute int aTest;
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            console.log(t0);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "베어링 중복선언",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             varying int vTest;
                             varying int vTest;
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            var t0 = RedShader(tRedGL, 'varyingTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            console.log(t0);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "시스템 선언과 중복일경우 : RedSystemShaderCode.vShareSource",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             uniform vec4 uResolution;
                             void main(void) {
                                gl_Position = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.VERTEX, source);
                            console.log(t0);
                            RedTest.run(true)
                        } catch (error) {

                            RedTest.run(false, error)
                        }
                    },
                    false
                );
                RedTest.test(
                    "시스템 선언과 중복일경우 : RedSystemShaderCode.fShareSource",
                    function () {
                        var source;
                        source = function () {
                            /* @preserve
                             precision mediump float;
                             uniform vec3 uCameraPosition;
                             void main(void) {
                                gl_FragColor = vec4(1.0);
                             }
                             */
                        };
                        source = RedGLUtil.getStrFromComment(source.toString());
                        try {
                            var t0 = RedShader(tRedGL, 'uniformTestShader' + RedGL.makeUUID(), RedShader.FRAGMENT, source);
                            console.log(t0);
                            RedTest.run(true)
                        } catch (error) {
                            RedTest.run(false, error)
                        }
                    },
                    false
                )
            }
        )
    }
);
