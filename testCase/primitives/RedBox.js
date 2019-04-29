/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedBox TEST";
RedGL(document.createElement('canvas'), function () {
        var tRedGL = this;
        RedTest.testGroup(
            "생성 확인",
            function () {
                RedTest.test(
                    "기본 생성 테스트",
                    function () {
                        try {
                            var t0 = RedBox(tRedGL);
                            console.log(t0);
                            RedTest.run(true);

                        } catch (error) {
                            RedTest.run(false, error);

                        }


                    },
                    true
                );
                RedTest.test(
                    "인자확인 redGL : RedGL Instance만 허용하는지",
                    function () {
                        try {
                            var t0 = RedBox(1);
                            console.log(t0);
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
            "고유키 값 동작 확인",
            function () {
                RedTest.test(
                    "캐싱확인 : 구성 정보가 같으면 캐싱된 정보가 넘어온다.",
                    function () {
                        var t0 = RedBox(tRedGL);
                        var t1 = RedBox(tRedGL);
                        RedTest.run(t0 === t1);


                    },
                    true
                );
                RedTest.test(
                    "생성시 입력변수에 따른 interleaveBuffer 고유키값이 생성되는지 확인 : RedBox( tRedGL, 2, 2, 2 )",
                    function () {
                        var t0 = RedBox(tRedGL, 2, 2, 2);
                        RedTest.run(t0['interleaveBuffer']['key']);


                    },
                    'RedBox_2_2_2_1_1_1_interleaveBuffer'
                );
                RedTest.test(
                    "생성시 입력변수에 따른 interleaveBuffer 고유키값이 생성되는지 확인 : RedBox( tRedGL, 2, 2, 2, 3, 4, 5 )",
                    function () {
                        var t0 = RedBox(tRedGL, 2, 2, 2, 3, 4, 5);
                        RedTest.run(t0['interleaveBuffer']['key']);


                    }, 'RedBox_2_2_2_3_4_5_interleaveBuffer'
                );
                RedTest.test(
                    "생성시 입력변수에 따른 indexBuffer 고유키값이 생성되는지 확인 : RedBox( tRedGL, 2, 2, 2 )",
                    function () {
                        var t0 = RedBox(tRedGL, 2, 2, 2);
                        RedTest.run(t0['indexBuffer']['key']);


                    },
                    'RedBox_2_2_2_1_1_1_indexBuffer'
                );
                RedTest.test(
                    "생성시 입력변수에 따른 indexBuffer 고유키값이 생성되는지 확인 : RedBox( tRedGL, 2, 2, 2, 3, 4, 5 )",
                    function () {
                        var t0 = RedBox(tRedGL, 2, 2, 2, 3, 4, 5);
                        RedTest.run(t0['indexBuffer']['key']);
                        tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();

                    },
                    'RedBox_2_2_2_3_4_5_indexBuffer'
                );
            }
        )
    }
);
