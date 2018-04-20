"use strict";
var RedBaseController;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedBaseController`,
        description : `
            RedBaseController Instance 생성자.
        `,
        example : `
            RedBaseController()
        `,
        return : 'RedBaseController Instance'
    }
	:DOC*/
    RedBaseController = function (redGL) {
        var self;
        if (!(this instanceof RedBaseController)) return new RedBaseController(redGL);
        self = this;
        this['camera'] = RedCamera()
        this['targetObject'] = RedMesh(redGL)

        this['keyBuffer'] = {}
        this['speed'] = 1
        this['delay'] = 0.1
        this['speedRotation'] = 1
        this['delayRotation'] = 0.1
        this['maxAcceleration'] = 3

        Object.defineProperty(RedBaseController.prototype, 'x', (function (self) {
            return {
                get: function () { return self['targetObject']['x'] },
                set: function (v) {
                    self['targetObject']['x'] = v
                    this['_desirePosition'][0] = v

                }
            }
        })(this));
        Object.defineProperty(RedBaseController.prototype, 'y', (function (self) {
            return {
                get: function () { return self['targetObject']['y'] },
                set: function (v) {
                    self['targetObject']['y'] = v
                    this['_desirePosition'][1] = v
                }
            }
        })(this));
        Object.defineProperty(RedBaseController.prototype, 'z', (function (self) {
            return {
                get: function () { return self['targetObject']['z'] },
                set: function (v) {
                    self['targetObject']['z'] = v
                    this['_desirePosition'][2] = v

                }
            }
        })(this));

        Object.defineProperty(RedBaseController.prototype, 'tilt', (function (self) {

            return {
                get: function () { return this['_desireTilt'] },
                set: function (v) {
                    self['targetObject']['rotationX'] = v
                    this['_desireTilt'] = v


                }
            }
        })(this));
        Object.defineProperty(RedBaseController.prototype, 'pan', (function (self) {

            return {
                get: function () { return this['_desirePan'] },
                set: function (v) {
                    self['targetObject']['rotationY'] = v
                    this['_desirePan'] = v
                }
            }
        })(this));
        this['_desirePosition'] = [0, 0, 0]
        this['_desirePan'] = 0
        this['_desireTilt'] = 0
        var HD_keyDown;
        var HD_keyUp
        HD_keyDown = function (e) { self['keyBuffer'][e['key']] = 1 }
        HD_keyUp = function (e) { self['keyBuffer'][e['key']] = 0 }
        window.addEventListener('keydown', HD_keyDown)
        window.addEventListener('keyup', HD_keyUp)

    };

    RedBaseController.prototype['update'] = (function () {
        var up = new Float32Array([0, 1, 0]);
        var tPan, tTilt
        var targetObject;
        var move, rotate;
        var tSpeed, tSpeedRotation
        var tDelay, tDelayRotation
        var tMTX0, tMTX1;
        var displacementMTX;
        var displacementVec3;
        var tCamera
        var currentAcceleration
        var tkeyBuffer;
        var tDesirePosition;
        displacementMTX = mat4.create()
        tMTX0 = mat4.create()
        tMTX1 = mat4.create()
        displacementVec3 = vec3.create()
        currentAcceleration = 0
        return function (time) {
            tPan = 0;
            tTilt = 0;
            tSpeed = this['speed'];
            tSpeedRotation = this['speedRotation'];
            tDelay = this['delay'];
            tDelayRotation = this['delayRotation'];
            tCamera = this['camera'];
            move = false;
            rotate = false
            tkeyBuffer = this['keyBuffer'];
            tDesirePosition = this['_desirePosition']
            displacementVec3[0] = 0;
            displacementVec3[1] = 0;
            displacementVec3[2] = 0;
            if (tkeyBuffer['q']) rotate = true, tPan = tSpeedRotation;
            if (tkeyBuffer['e']) rotate = true, tPan = -tSpeedRotation;
            if (tkeyBuffer['r']) rotate = true, tTilt = tSpeedRotation;
            if (tkeyBuffer['f']) rotate = true, tTilt = -tSpeedRotation;
            if (tkeyBuffer['w']) move = true, displacementVec3[2] = - currentAcceleration * tSpeed;
            if (tkeyBuffer['s']) move = true, displacementVec3[2] = currentAcceleration * tSpeed;
            if (tkeyBuffer['a']) move = true, displacementVec3[0] = -currentAcceleration * tSpeed;
            if (tkeyBuffer['d']) move = true, displacementVec3[0] = currentAcceleration * tSpeed;
            if (tkeyBuffer['t']) move = true, displacementVec3[1] = currentAcceleration * tSpeed;
            if (tkeyBuffer['g']) move = true, displacementVec3[1] = -currentAcceleration * tSpeed;

            // 가속도 계산
            if (rotate || move) {
                currentAcceleration += 0.1
                if (currentAcceleration > this['maxAcceleration']) currentAcceleration = this['maxAcceleration']
            } else {
                currentAcceleration += -0.1
                if (currentAcceleration < 0) currentAcceleration = 0
            }

            //
            targetObject = this['targetObject'];

            // pan,tilt 설정
            if (rotate) {
                this['_desirePan'] += tPan;
                this['_desireTilt'] += tTilt;
            }
            // pan,tilt 타겟오브젝트에 반영
            targetObject['rotationY'] += (this['_desirePan'] - targetObject['rotationY']) * tDelayRotation
            targetObject['rotationX'] += (this['_desireTilt'] - targetObject['rotationX']) * tDelayRotation


            if (move || rotate) {
                tMTX0 = targetObject['matrix'];
                // 이동 매트릭스구함
                mat4.identity(displacementMTX);
                mat4.rotateY(displacementMTX, displacementMTX, targetObject['rotationY'] * Math.PI / 180);
                mat4.rotateX(displacementMTX, displacementMTX, targetObject['rotationX'] * Math.PI / 180);
                mat4.translate(displacementMTX, displacementMTX, displacementVec3);
                // 오브젝트에 적용할 x,y,z를 찾아냄
                mat4.identity(tMTX0)
                mat4.translate(tMTX0, tMTX0, [targetObject['x'], targetObject['y'], targetObject['z']])
                mat4.multiply(tMTX0, tMTX0, displacementMTX)


                tDesirePosition[0] = tMTX0[12]
                tDesirePosition[1] = tMTX0[13]
                tDesirePosition[2] = tMTX0[14]

            }

            // 이동 계산
            targetObject['x'] += (tDesirePosition[0] - targetObject['x']) * tDelay
            targetObject['y'] += (tDesirePosition[1] - targetObject['y']) * tDelay
            targetObject['z'] += (tDesirePosition[2] - targetObject['z']) * tDelay

            // pan,tilt 타겟오브젝트에 반영
            targetObject['rotationY'] += (this['_desirePan'] - targetObject['rotationY']) * tDelayRotation
            targetObject['rotationX'] += (this['_desireTilt'] - targetObject['rotationX']) * tDelayRotation

            // 타겟 오브젝트 최종적용
            tMTX0 = targetObject['matrix'];
            mat4.identity(tMTX0)
            mat4.translate(tMTX0, tMTX0, [targetObject['x'], targetObject['y'], targetObject['z']])
            mat4.rotateY(tMTX0, tMTX0, targetObject['rotationY'] * Math.PI / 180);
            mat4.rotateX(tMTX0, tMTX0, targetObject['rotationX'] * Math.PI / 180);

            // 카메라를 오브젝트 바로 뒤에 위치시킴
            tMTX1 = mat4.clone(tMTX0)
            mat4.translate(tMTX1, tMTX1, [0, 0, 0.1])
            tCamera['x'] = tMTX1[12]
            tCamera['y'] = tMTX1[13]
            tCamera['z'] = tMTX1[14]

            // 카메라는 대상 오브젝트를 바라봄
            tCamera.lookAt(targetObject['x'], targetObject['y'], targetObject['z'])
            console.log('RedBaseController update')
        }
    })();

    Object.freeze(RedBaseController);
})();
