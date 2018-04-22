"use strict";
var RedObitController;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedObitController`,
        description : `
            RedObitController Instance 생성자.
        `,
        example : `
            RedObitController()
        `,
        params : {
            redGL : [
                {type:'RedGL'}
            ]
        },
        return : 'RedObitController Instance'
    }
	:DOC*/
    RedObitController = function (redGL) {
        var self;
        if (!(this instanceof RedObitController)) return new RedObitController(redGL);
        self = this;
        /**DOC:
       {
           title :`speedDistance`,
           description : `
               거리 속도
               기본값 : 2
           `,
           return : 'Number'
       }
       :DOC*/
        this['speedDistance'] = 2
        /**DOC:
       {
           title :`delayDistance`,
           description : `
               거리 지연 속도
               기본값 : 0.1
           `,
           return : 'Number'
       }
       :DOC*/
        this['delayDistance'] = 0.1
        /**DOC:
        {
            title :`speedRotation`,
            description : `
                회전 속도
                기본값 : 3
            `,
            return : 'Number'
        }
        :DOC*/
        this['speedRotation'] = 3
        /**DOC:
        {
            title :`speedRotation`,
            description : `
                회전 지연 속도
                기본값 : 0.1
            `,
            return : 'Number'
        }
        :DOC*/
        this['delayRotation'] = 0.1

        /**DOC:
        {
            title :`x`,
            return : 'Number'
        }
        :DOC*/
        this['centerX'] = 0
        /**DOC:
        {
            title :`y`,
            return : 'Number'
        }
        :DOC*/
        this['centerY'] = 0
        /**DOC:
        {
            title :`z`,
            return : 'Number'
        }
        :DOC*/
        this['centerZ'] = 0
        this['distance'] = 15
        /**DOC:
        {
            title :`tilt`,
            return : 'Number'
        }
        :DOC*/
        this['tilt'] = 0
        /**DOC:
        {
            title :`minTilt`,
             description : `
                기본값 : -90
            `,
            return : 'Number'
        }
        :DOC*/
        Object.defineProperty(this, 'minTilt', (function () {
            var _v = -90
            return {
                get: function () { return _v },
                set: function (v) {
                    if (v < -90) v = -90
                    _v = v
                }
            }
        })());
        /**DOC:
        {
            title :`maxTilt`,
             description : `
                기본값 : 90
            `,
            return : 'Number'
        }
        :DOC*/
        Object.defineProperty(this, 'maxTilt', (function () {
            var _v = 90
            return {
                get: function () { return _v },
                set: function (v) {
                    if (v > 90) v = 90
                    _v = v
                }
            }
        })());
        /**DOC:
        {
            title :`pan`,
            return : 'Number'
        }
        :DOC*/
        this['pan'] = 0
        /**DOC:
        {
            title :`camera`,
            description : `
                컨트롤러 생성시 자동생성됨
            `,
            return : 'RedCamera'
        }
        :DOC*/
        this['camera'] = RedCamera()


        this['_currentPan'] = 0;
        this['_currentTilt'] = 0;
        this['_currentDistance'] = 0;

        (function (self) {
            var HD_down, HD_Move, HD_up, HD_wheel;
            var sX, sY;
            var mX, mY;
            sX = 0, sY = 0
            mX = 0, mY = 0
            HD_down = function (e) {
                sX = e['x'], sY = e['y'];
                redGL['_canvas'].addEventListener('mousemove', HD_Move)
                window.addEventListener('mouseup', HD_up)
            }
            HD_Move = function (e) {
                mX = e['x'] - sX, mY = e['y'] - sY;
                sX = e['x'], sY = e['y'];
                self['pan'] -= mX * self['speedRotation'] * 0.1;
                self['tilt'] -= mY * self['speedRotation'] * 0.1;
            }
            HD_up = function () {
                redGL['_canvas'].removeEventListener('mousemove', HD_Move);
                window.removeEventListener('mouseup', HD_up);
            }
            HD_wheel = function (e) {
                console.log(e)
                self['distance'] += e['deltaY'] / 100 * self['speedDistance']
            }

            redGL['_canvas'].addEventListener('mousedown', HD_down);
            redGL['_canvas'].addEventListener('wheel', HD_wheel);
        })(this);

    };
    RedObitController.prototype['update'] = (function () {
        var up = new Float32Array([0, 1, 0]);

        var tSpeedRotation
        var tDelayRotation
        var tCamera
        var tMTX0;
        return function (time) {
            if (this['tilt'] < this['minTilt']) this['tilt'] = this['minTilt'] + 0.01
            if (this['tilt'] > this['maxTilt']) this['tilt'] = this['maxTilt'] - 0.01

            tSpeedRotation = this['speedRotation'];
            tDelayRotation = this['delayRotation'];
            tCamera = this['camera'];
            tMTX0 = tCamera['matrix'];

            this['_currentPan'] += (this['pan'] - this['_currentPan']) * tDelayRotation
            this['_currentTilt'] += (this['tilt'] - this['_currentTilt']) * tDelayRotation
            this['_currentDistance'] += (this['distance'] - this['_currentDistance']) * this['delayDistance']

            mat4.identity(tMTX0);
            mat4.rotateY(tMTX0, tMTX0, this['_currentPan'] * Math.PI / 180);
            mat4.rotateX(tMTX0, tMTX0, this['_currentTilt'] * Math.PI / 180);
            mat4.translate(tMTX0, tMTX0, [0, 0, this['_currentDistance']])

            tCamera['x'] = tMTX0[12]
            tCamera['y'] = tMTX0[13]
            tCamera['z'] = tMTX0[14]

            // 카메라는 대상 오브젝트를 바라봄
            tCamera.lookAt(this['centerX'], this['centerY'], this['centerZ'])
            console.log(this['tilt'], this['pan'])
            console.log('RedObitController update')
        }
    })();

    Object.freeze(RedObitController);
})();
