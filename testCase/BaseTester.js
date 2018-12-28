"use strict";
var BaseTester;
(function () {

    BaseTester = {
        init: function (src) {
            var max, idx;
            var tList = [
                ['https://redcamel.github.io/Recard/beta/redUnit/lib/redUnit.css', 'stylesheet'],
                ['https://redcamel.github.io/Recard/beta/lib/prism.css', 'stylesheet'],
                ['https://redcamel.github.io/Recard/beta/lib/prism.js'],
                ['https://redcamel.github.io/Recard/beta/release/recard.min.js'],
                ['https://redcamel.github.io/Recard/beta/redUnit/lib/redUnit.js']
            ];
            tList.push([src]);
            idx = 0;
            max = tList.length;
            var callResource = function (v) {
                var tTag;
                tTag = document.createElement(v[1] == 'stylesheet' ? 'link' : 'script');
                if (v[1] == 'stylesheet') tTag.setAttribute('rel', 'stylesheet');
                tTag.setAttribute(v[1] == 'stylesheet' ? 'href' : 'src', v[0]);
                //
                tTag.onload = function () {
                    idx++
                    if (idx != max) {

                        RedGL.setDoNotPrepareProgram();
                        callResource(tList[idx])
                    }
                };
                //
                document.head.appendChild(tTag);
            };
            callResource(tList[idx]);
        }
    }
})();