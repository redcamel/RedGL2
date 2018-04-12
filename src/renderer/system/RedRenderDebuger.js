"use strict";
var RedRenderDebuger;
(function () {
    /**DOC:
        {
            constructorYn : true,
            title :`RedRenderDebuger`,
            description : `
                RedRenderDebuger Instance 생성
                렌더러 생성시 시스템적으로 자동생성됨.
            `,
            return : 'RedRenderDebuger Instance'
        }
    :DOC*/
    RedRenderDebuger = function () {
        if (!(this instanceof RedRenderDebuger)) return new RedRenderDebuger();
        if (!this['renderResult']) {
            this['renderResult'] = document.createElement('div')
            this['renderResult'].style.cssText = 'position:absolute;bottom:0px;left:0px;color:#fff;font:11px Lucida Grande,sans-serif;font-size:11px;background:rgba(0,0,0,0.6);padding:3px;width:300px'
        }
        this['_visible'] = false
    }
    RedRenderDebuger.prototype = {
        update: function (redGL, renderInfo) {
            this['renderResult'].innerHTML = ''
            for (var k in renderInfo) {
                // console.log(tRenderer['renderInfo'][k])
                this['renderResult'].innerHTML +=
                    '<div style="padding:3px">' +
                    '<div><b>RedView : key - ' + renderInfo[k]['key'] + '</b></div>' +
                    ' orthographic - ' + renderInfo[k]['orthographic'] +
                    ' <br>call - ' + renderInfo[k]['call'] +
                    ' <br> width - ' + renderInfo[k]['width'] +
                    ' / height - ' + renderInfo[k]['height'] +
                    ' <br> viewRectWidth - ' + renderInfo[k]['viewRectWidth'] +
                    ' / viewRectHeight - ' + renderInfo[k]['viewRectHeight'] +
                    ' <br> x - ' + renderInfo[k]['x'] +
                    ' / y - ' + renderInfo[k]['y'] +
                    '</div><br>'
            }
            this['renderResult'].innerHTML += '<div style="padding:3px;background:#000">renderScale : ' + redGL['renderScale'] + '</div>'

        }
    }
    /**DOC:
        {
            title :`visible`,
            description : `
                RedRenderDebuger 정보 visible 여부
            `,
            return : 'Boolean'
        }
    :DOC*/
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
