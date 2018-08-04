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
		if ( !(this instanceof RedRenderDebuger) ) return new RedRenderDebuger();
		if ( !this['renderResult'] ) {
			this['renderResult'] = document.createElement('div')
			this['_contentBox'] = document.createElement('div')
			this['_etcBox'] = document.createElement('div')
			this['renderResult'].appendChild(this['_contentBox'])
			this['renderResult'].appendChild(this['_etcBox'])
			this['renderResult'].style.cssText = 'position:absolute;bottom:0px;left:0px;color:#fff;font:11px Lucida Grande,sans-serif;font-size:11px;background:rgba(0,0,0,0.75);padding:3px;width:300px'
			this['_etcBox'].style.cssText = 'position:relative;color:#fff;font:11px Lucida Grande,sans-serif;font-size:11px;padding:3px;margin-top:10px;'
			var t0 = document.createElement('a');
			t0.style.padding = '5px';
			t0.style.borderRadius = '2px';
			t0.style.background = 'rgba(91, 82, 170,0.8)';
			t0.style.color = '#fff';
			t0.style.textDecoration = 'none';
			t0.style.display = 'block';
			t0.setAttribute('href', 'https://redcamel.github.io/RedGL2/redDoc/index.html');
			t0.innerHTML = 'API document';
			this['_etcBox'].appendChild(t0);
			t0 = document.createElement('a');
			t0.style.padding = '5px';
			t0.style.borderRadius = '2px';
			t0.style.background = 'rgba(91, 82, 170,0.8)';
			t0.style.color = '#fff';
			t0.style.textDecoration = 'none';
			t0.style.display = 'block';
			t0.style.marginTop = '2px';
			t0.setAttribute('href', 'https://github.com/redcamel/RedGL2');
			t0.innerHTML = 'GITHUB';
			this['_etcBox'].appendChild(t0);
		}
		this['_visible'] = false
	}
	RedRenderDebuger.prototype = {
		update: function (redGL, renderInfo) {
			this['_contentBox'].innerHTML = ''
			var t0 = ''
			var totalRenderTime = 0
			var postEffectRenderTime = 0
			for ( var k in renderInfo ) {
				// console.log(tRenderer['renderInfo'][k])
				t0 +=
					'<div style="padding:5px">' +
					'<div><b style="color:rgb(242, 169, 113)">RedView : key - ' + renderInfo[k]['key'] + '</b></div>' +
					' orthographicYn - ' + '<b style="color:rgb(191, 82, 170)">' + renderInfo[k]['orthographicYn'] + '</b>' +
					' <br>call - ' + '<b style="color:rgb(191, 82, 170)">' + renderInfo[k]['call'] + '</b>' +
					' <br>triangleNum - ' + '<b style="color:rgb(191, 82, 170)">' + renderInfo[k]['triangleNum'] + '</b>' +
					' <br> width - ' + '<b style="color:rgb(191, 82, 170)">' + renderInfo[k]['width'] + '</b>' +
					' / height - ' + '<b style="color:rgb(191, 82, 170)">' + renderInfo[k]['height'] + '</b>' +
					' <br> viewRectWidth - ' + '<b style="color:rgb(191, 82, 170)">' + renderInfo[k]['viewRectWidth'] + '</b>' +
					' / viewRectHeight - ' + '<b style="color:rgb(191, 82, 170)">' + renderInfo[k]['viewRectHeight'] + '</b>' +
					' <br> x - ' + '<b style="color:rgb(191, 82, 170)">' + renderInfo[k]['x'] + '</b>' +
					' / y - ' + '<b style="color:rgb(191, 82, 170)">' + renderInfo[k]['y'] + '</b>' +
					'<div>renderTime</div>' +
					'<div style="padding:5px 7px 7px 7px;background:rgba(0,0,0, 0.5);">' +
					'<div>viewRenderTime - <b style="color:rgb(191, 82, 170)">' + renderInfo[k]['viewRenderTime'].toFixed(2) + 'ms</b></div>' +
					'<div>baseRenderTime - <b style="color:rgb(191, 82, 170)">' + (renderInfo[k]['viewRenderTime'] - renderInfo[k]['postEffectRenderTime']).toFixed(2) + 'ms</b></div>' +
					'<div>postEffectRenderTime - <b style="color:rgb(191, 82, 170)">' + renderInfo[k]['postEffectRenderTime'].toFixed(2) + 'ms</b></div>' +
					'</div>' +
					'</div>';
				totalRenderTime += renderInfo[k]['viewRenderTime'];
				postEffectRenderTime += renderInfo[k]['postEffectRenderTime'];
			}
			t0 += '<div style="padding:0px 5px">'
			t0 += '<div>renderScale : <span style="padding:3px;background:#000">' + redGL['renderScale'] + '</span></div>'
			t0 += '<div>totalRenderTime : <span style="padding:3px;background:#000">' + totalRenderTime.toFixed(2) + 'ms</span></div>'
			t0 += '<div>baseRenderTime : <span style="padding:3px;background:#000">' + (totalRenderTime - postEffectRenderTime).toFixed(2) + 'ms</span></div>'
			t0 += '<div>postEffectRenderTime : <span style="padding:3px;background:#000">' + postEffectRenderTime.toFixed(2) + 'ms</span></div>'
			t0 += '</div>';
			this['_contentBox'].innerHTML = t0;
		}
	}
	/**DOC:
	 {
	     code : 'PROPERTY',
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
			if ( this['_visible'] ) document.body.appendChild(this['renderResult'])
			else {
				if ( this['renderResult'].parentNode ) document.body.removeChild(this['renderResult'])
			}
		}
	})
	Object.freeze(RedRenderDebuger);
})();
