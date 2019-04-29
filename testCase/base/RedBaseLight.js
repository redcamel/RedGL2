/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
RedGL.setDoNotPrepareProgram();
RedTest.title = "RedBaseLight TEST";
RedTest.testGroup(
    "(RedBaseLight Instance).intensity = <b>value</b>",
    function () {
        RedTest.testListRun(
            '0을 포함한 양수만 허용 테스트',
            RedTest.NUMBER_POSITIVE_AND_ZERO,
            function (v) {
                var tBaseLight = RedBaseLight();
                tBaseLight['intensity'] = 10;
                try {
                    tBaseLight['intensity'] = v[0];
                    RedTest.run(tBaseLight['intensity'] === v[0]);
                } catch (error) {
                    RedTest.run(tBaseLight['intensity'] === v[0], error);
                }
            }
        )
    }
);
