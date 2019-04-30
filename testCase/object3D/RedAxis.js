/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedAxis TEST";
RedGL(
    document.createElement('canvas'),
    function () {
        var tRedGL = this;
        RedTest.testGroup(
            "RedAxis( redGL )",
            function () {
                RedTest.test(
                    "성공테스트 : 기본 생성 테스트",
                    function () {

                        try {
                            var t0 = RedAxis(tRedGL);
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
            "RedAxis( <b>redGL</b> )",
            function () {
                RedTest.test(
                    "RedGL Instance만 허용하는지.",
                    function () {

                        try {
                            var t0 = RedAxis(1);
                            console.log(t0);
                            RedTest.run(true);
                            tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                        } catch (error) {
                            RedTest.run(false, error);
                            tRedGL.gl.getExtension('WEBGL_lose_context').loseContext();
                        }

                    },
                    false
                )
            }
        );
    }
);

