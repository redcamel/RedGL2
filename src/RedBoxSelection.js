/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */
"use strict";
var RedBoxSelection;
(function () {
    var tRectBox;
    var tXkey, tYkey;
    var tW, tH;
    var startPoint = {x: 0, y: 0};
    var dragPoint = {x: 0, y: 0};
    var currentRect = [];
    var looper, calRect;
    calRect = function (e, targetView) {
        // console.log(e)
        dragPoint.x = e[tXkey];
        dragPoint.y = e[tYkey];
        tW = dragPoint.x - startPoint.x;
        tH = dragPoint.y - startPoint.y;
        currentRect = [startPoint.x, startPoint.y, tW, tH];
        if (tW < 0) {
            currentRect[2] = Math.abs(tW);
            currentRect[0] += tW;
        }
        if (tH < 0) {
            currentRect[3] = Math.abs(tH);
            currentRect[1] += tH
        }
        tRectBox.style.left = currentRect[0] + 'px';
        tRectBox.style.top = currentRect[1] + 'px';
        tRectBox.style.width = currentRect[2] + 'px';
        tRectBox.style.height = currentRect[3] + 'px';
        // console.log(currentRect);
        // console.log(looper(targetView.scene, targetView, currentRect))
        return looper(targetView.scene, targetView, currentRect)
    };
    looper = function (list, targetView, rect, result) {
        if (!result) result = {
            selectList: [],
            unSelectList: []
        };
        list.children.forEach(function (mesh) {
            var tPosition = mesh.getScreenPoint(targetView);
            // console.log('tPosition', tPosition)
            if (
                rect[0] <= tPosition[0]
                && rect[1] <= tPosition[1]
                && rect[0] + rect[2] >= tPosition[0]
                && rect[1] + rect[3] >= tPosition[1]
            ) result.selectList.push(mesh);
            else result.unSelectList.push(mesh);
            looper(mesh, targetView, rect, result);
        });
        return result
    };
    RedBoxSelection = function (redGL, redView, callback) {
        if (!(this instanceof RedBoxSelection)) return new RedBoxSelection(redGL, redView, callback);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedBoxSelection : RedGL Instance만 허용.', redGL);
        redView instanceof RedView || RedGLUtil.throwFunc('RedBoxSelection : RedView Instance만 허용.', redView);
        if (!redGL['_datas']['RedBoxSelection']) redGL['_datas']['RedBoxSelection'] = this;
        else return this;
        [RedGLDetect.BROWSER_INFO.move, RedGLDetect.BROWSER_INFO.down, RedGLDetect.BROWSER_INFO.up].forEach(function (v) {
            tXkey = 'clientX';
            tYkey = 'clientY';
            var HD;
            HD = function (e) {
                var result = calRect(e, redView);
                if (callback) callback(result)
            };
            redGL['_canvas'].addEventListener(v, function (e) {
                if (e.type === RedGLDetect.BROWSER_INFO.down) {
                    startPoint.x = e[tXkey];
                    startPoint.y = e[tYkey];
                    if (!tRectBox) {
                        tRectBox = document.createElement('div');
                        tRectBox.style.cssText = 'position:fixed;border:1px dashed red;z-index:0';
                    }
                    tRectBox.style.left = '0px';
                    tRectBox.style.top = '0px';
                    tRectBox.style.width = '0px';
                    tRectBox.style.height = '0px';
                    document.body.appendChild(tRectBox);
                    if (redView.camera && redView.camera.camera) redView.camera.needUpdate = false;
                    HD({});
                    window.addEventListener('mousemove', HD);
                    window.addEventListener('click', function () {
                        if (redView.camera.camera) redView.camera.needUpdate = true;
                        if (tRectBox.parentNode) document.body.removeChild(tRectBox);
                        window.removeEventListener(
                            'mousemove', HD
                        )
                    })
                }
            })
        })
    }
})();

