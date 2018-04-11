"use strict";
var RedRenderDebuger;
(function () {

    RedRenderDebuger = function () {
        if (!(this instanceof RedRenderDebuger)) return new RedRenderDebuger();
        if (!this['renderResult']) {
            this['renderResult'] = document.createElement('div')
            this['renderResult'].style.cssText = 'position:absolute;top:0px;left:0px;color:#fff;font-size:12px;background:rgba(0,0,0,0.6)'
        }
        this['_visible'] = false
    }
    RedRenderDebuger.prototype = {
        update: function (redGL,renderInfo) {
            this['renderResult'].innerHTML = ''
            for (var k in renderInfo) {
                // console.log(tRenderer['renderInfo'][k])
                this['renderResult'].innerHTML +=
                    '<b>RedView : key - ' + renderInfo[k]['key'] + '</b>' +
                    ' <br>orthographic - ' + renderInfo[k]['orthographic'] +
                    ' <br>call - ' + renderInfo[k]['call'] +
                    ' <br> width - ' + renderInfo[k]['width'] +
                    ' <br> height - ' + renderInfo[k]['height'] +
                    ' <br> viewRectWidth - ' + renderInfo[k]['viewRectWidth'] +
                    ' <br> viewRectHeight - ' + renderInfo[k]['viewRectHeight'] +
                    ' <br> x - ' + renderInfo[k]['x'] +
                    ' <br> y - ' + renderInfo[k]['y'] +
                    '<br>'
            }
            this['renderResult'].innerHTML += 'renderScale : ' + redGL['renderScale']

        }
    }
    Object.defineProperty(RedRenderDebuger.prototype, 'visible', {
        get: function () {
            return this['_visible']
        },
        set: function (v) {
            this['_visible'] = v
            if (this['_visible']) document.body.appendChild(this['renderResult'])
            else {
                if (this['renderResult'].parentNode) document.body.removeChild(this['renderResult'])
            }
        }
    })
    Object.freeze(RedRenderDebuger);
})();
