"use strict"
var RedGLOffScreen;
(function () {
    var RedWorkerCode;
    var WORKER_BLOB;
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedGLOffScreen`,
		 description : `
			 RedGLOffScreen Instance 생성
		 `,
		 params : {
			 canvas : [
				 {type:'Canvas Element'}
			 ],
			 w : [
				 {type:'Uint'}
			 ],
			 h : [
				 {type:'Uint'}
			 ],
			 redGLSrc : [
				 {type:'String'},
				 'redGL 라이브러리파일 경로'
			 ],
			 hostSrc : [
				 {type:'String'},
				 '호스트경로'
			 ]
		 },
		 extends : [
		    'RedBaseMaterial'
		 ],
		 demo : '../example/launcher/RedGLOffScreen.html',
		 example : `
			<body>
                <canvas id="testCanvas"></canvas>
                <script id='testSource'>
                    var canvas = document.getElementById('testCanvas')
                    var redGLSrc = '../release/RedGL.min.js' // redGL 라이브러리 경로
                    var hostSrc = 'workerHost2.js' // 호스트 코드 경로
                    RedGLOffScreen(canvas, 1024, 768, redGLSrc, hostSrc)
                </script>
            </body>
		 `,
		 return : 'RedGLOffScreen Instance'
	 }
     :DOC*/
    RedGLOffScreen = function (canvas, w, h, redGLSrc, hostSrc) {
        if (!(this instanceof RedGLOffScreen)) return new RedGLOffScreen(canvas, w, h, redGLSrc, hostSrc);
        w = parseInt(w)
        h = parseInt(h)
        var self = this;
        self['htmlCanvas'] = canvas;
        self['redGLSrc'] = redGLSrc;
        fetch(hostSrc)
            .then(function (v) {
                // console.log('성공', v)
                v.text().then(function (v2) {
                    self['hostCode'] = '' +
                        "\ncanvas.tagName = 'CANVAS';" +
                        "\nreturn RedGL(canvas, function (v) {\n" +
                        'var _host_ = ' + v2 + ';\n' +
                        '_host_.call(this);\n' +
                        "\n});";
                    self.setSize(w, h);
                })
            })
            .catch(function (v) {
                console.log('실패', v);
            })

    };
    RedGLOffScreen.prototype['updatePostMessage'] = function (run) {
        if (!run) throw 'RedGLOffScreen.prototype[\'updatePostMessage\'] - run을 정의해야합니다.' + run;
        if (!run['name']) throw 'RedGLOffScreen.prototype[\'updatePostMessage\'] - run객체의 name을 정의해야합니다.' + run['name'];
        this['worker'].postMessage({
            state: 'update',
            run: run
        });
    };
    RedGLOffScreen.prototype._init = function (canvas, w, h) {
        var self = this;
        if (this['worker']) this['worker'].terminate();
        console.log(canvas.cloneNode());
        var tParentNode = this['htmlCanvas'].parentNode;
        console.log(tParentNode);
        var newNode = canvas.cloneNode(true);
        tParentNode.replaceChild(newNode, this['htmlCanvas']);
        this['htmlCanvas'] = newNode;
        var MOUSE_KEY_LIST = 'x,y,clientX,clientY,pageX,pageY,screenX,screenY,layerX,layerY,detail,shiftKey,altKey,ctrlKey,movementX,movementY,button,type,which,deltaX,deltaY,deltaZ,timeStamp'.split(',');
        var KEY_LIST = 'shiftKey,altKey,ctrlKey,key,keyCode,location,code,charCode,detail,timeStamp,which,type'.split(',');
        var mouseEventList = 'mousemove,mousedown,mouseup,wheel'.split(',');
        var keyEvnetList = 'keydown,keyup,keypress'.split(',');
        mouseEventList.forEach(function (v) {
            self['htmlCanvas'].addEventListener(v, function (e) {
                console.log(e);
                var customEvent = {};
                MOUSE_KEY_LIST.forEach(function (v) {
                    customEvent[v] = e[v];
                });
                self['worker'].postMessage({
                    state: e.type,
                    event: customEvent
                });
            })
        });
        keyEvnetList.forEach(function (v) {
            window.addEventListener(v, function (e) {
                console.log(e);
                var customEvent = {};
                KEY_LIST.forEach(function (v) {
                    customEvent[v] = e[v];
                });
                self['worker'].postMessage({
                    state: e.type,
                    event: customEvent
                });
            })
        });

        this['offScreenCanvas'] = this['htmlCanvas'].transferControlToOffscreen();
        this['offScreenCanvas'].width = w;
        this['offScreenCanvas'].height = h;
        //
        this['worker'] = null;
        WORKER_BLOB = new Blob([RedWorkerCode], {type: 'application/javascript'});
        this['worker'] = new Worker(URL.createObjectURL(WORKER_BLOB));
        console.log(this['worker']);


        var pathList = document.location.pathname.split('/');
        if (pathList[pathList.length - 1].indexOf('.') > -1) pathList.pop();
        console.log(pathList);

        var url = this['redGLSrc'].split('/');
        url.forEach(function (v, index) {
            if (v === '..') {
                pathList.pop();
                url[index] = '';
            }
            if (v === '.') url[index] = '';
        });
        console.log(url);

        this['worker'].postMessage({
            canvas: this['offScreenCanvas'],
            state: 'init',
            redGLSrc: document.location.origin + pathList.join('/') + '/' + url.join('/'),
            hostCode: this['hostCode'].toString()
        }, [this['offScreenCanvas']]);
    };
    RedGLOffScreen.prototype['setSize'] = (function () {
        var W, H;
        var prevW, prevH;
        var ratio;
        var tCVS;
        prevW = 0;
        prevH = 0;
        return function (width, height, force) {
            if (width === undefined) RedGLUtil.throwFunc('RedGL setSize : width가 입력되지 않았습니다.');
            if (height === undefined) RedGLUtil.throwFunc('RedGL setSize : height가 입력되지 않았습니다.');
            W = this['_width'] = width;
            H = this['_height'] = height;
            if (typeof W !== 'number') {
                if (W.indexOf('%') > -1) W = (document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth) * parseFloat(W) / 100;
                else RedGLUtil.throwFunc('RedGL setSize : width는 0이상의 숫자나 %만 허용.', W);
            }
            if (typeof H !== 'number') {
                if (H.indexOf('%') > -1) H = window.innerHeight * parseFloat(H) / 100;
                else RedGLUtil.throwFunc('RedGL setSize : height는 0이상의 숫자나 %만 허용.', H);
            }
            ratio = window['devicePixelRatio'] || 1;
            tCVS = this['_canvas'];
            if (prevW !== W || prevH !== H || force) {
                prevW = W;
                prevH = H;
            }
            this._init(this['htmlCanvas'], W * ratio, H * ratio);
        }
    })();
    ////////////////////////
    (function () {
        RedWorkerCode = function () {
            this['window'] = this
            console.log(window);
            var WorkerMain; // 호스트 문자열을 함수로 생성
            var WorkerMainInstance; // 인스턴스 (실제론 RedGL 인스턴스)
            onmessage = function (event) {
                console.log('~~~~~~~~', event);
                switch (event.data.state) {
                    case 'init':
                        if (!WorkerMain) {
                            console.log(event.data.redGLSrc);
                            importScripts(event.data.redGLSrc);
                            WorkerMain = new Function('canvas', event.data.hostCode);
                        }
                        console.log(WorkerMain);
                        WorkerMainInstance = new WorkerMain(event.data.canvas);
                        break;
                    case 'update':
                        console.log('여기로오겠지', WorkerMainInstance);
                        console.log(event.data.run);
                        // RedGLInstance내에 userInterface를 정의하고 이에 접근함
                        var tArg = event.data.run['args'];
                        WorkerMainInstance['userInterface'][event.data.run['name']][typeof tArg == 'array' ? 'apply' : 'call'](WorkerMainInstance, event.data.run['args']);
                        break;
                    case 'mousemove':
                        var evt = new Event('mousemove');
                        var e = event.data.event;
                        for (var k in e) {
                            evt[k] = e[k];
                        }
                        console.log(evt);
                        WorkerMainInstance['_canvas'].dispatchEvent(evt);
                        // mousemove(event.data.event)
                        break;
                    case 'mousedown':
                        var evt = new Event('mousedown');
                        var e = event.data.event;
                        for (var k in e) {
                            evt[k] = e[k];
                        }
                        console.log(evt);
                        WorkerMainInstance['_canvas'].dispatchEvent(evt);
                        // mousemove(event.data.event)
                        break;
                    case 'mouseup':
                        var evt = new Event('mouseup');
                        var e = event.data.event;
                        for (var k in e) {
                            evt[k] = e[k];
                        }
                        console.log(evt);
                        this['window'].dispatchEvent(evt);
                        // mousemove(event.data.event)
                        break;
                    case 'wheel':
                        var evt = new Event('wheel');
                        var e = event.data.event;
                        for (var k in e) {
                            evt[k] = e[k];
                        }
                        console.log(evt);
                        WorkerMainInstance['_canvas'].dispatchEvent(evt);
                        break;
                    case 'keydown':
                        var evt = new Event('keydown');
                        var e = event.data.event;
                        for (var k in e) {
                            evt[k] = e[k];
                        }
                        console.log(evt);
                        this['window'].dispatchEvent(evt);
                        break;
                    case 'keyup':
                        var evt = new Event('keyup');
                        var e = event.data.event;
                        for (var k in e) {
                            evt[k] = e[k];
                        }
                        console.log(evt);
                        this['window'].dispatchEvent(evt);
                        break;
                    case 'keypress':
                        var evt = new Event('keypress');
                        var e = event.data.event;
                        for (var k in e) {
                            evt[k] = e[k];
                        }
                        console.log(evt.type);
                        this['window'].dispatchEvent(evt);
                        break;
                    default:
                        break;
                }
            }
        }
        RedWorkerCode = RedWorkerCode.toString().replace(/^function ?. ?\) ?\{|\}\;?$/g, '');
    })();
})();