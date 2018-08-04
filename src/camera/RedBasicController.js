"use strict";
var RedBasicController;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedBasicController`,
		 description : `
			 RedBasicController Instance 생성자.
		 `,
		 demo : '../example/RedBasicController.html',
		 example : `
			 RedBasicController(redGL Instance)
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedBasicController Instance'
	 }
	 :DOC*/
	RedBasicController = function (redGL) {
		var self;
		if ( !(this instanceof RedBasicController) ) return new RedBasicController(redGL);
		self = this;
		this['keyBuffer'] = {};
		/**DOC:
		 {
		     code : 'PROPERTY',
			 title :`keyNameMapper`,
			 description : `
				 이동, 회전에 대한 기본 키맵퍼
				 기본값 :
			 `,
			 example : `
			 this['keyNameMapper'] = {
				 moveForward: 'w',
				 moveBack: 's',
				 moveLeft: 'a',
				 moveRight: 'd',
				 moveUp: 't',
				 moveDown: 'g',
				 //
				 turnLeft: 'q',
				 turnRight: 'e',
				 turnUp: 'r',
				 turnDown: 'f',
			 }
			 `,
			 return : 'Object'
		 }
		 :DOC*/
		this['keyNameMapper'] = {
			moveForward: 'w',
			moveBack: 's',
			moveLeft: 'a',
			moveRight: 'd',
			moveUp: 't',
			moveDown: 'g',
			//
			turnLeft: 'q',
			turnRight: 'e',
			turnUp: 'r',
			turnDown: 'f'
		};
		this['speed'] = 1;
		this['delay'] = 0.1;
		this['speedRotation'] = 1;
		this['delayRotation'] = 0.1;
		this['maxAcceleration'] = 3;
		/**DOC:
		 {
		     code : 'PROPERTY',
			 title :`camera`,
			 description : `
				 컨트롤러 생성시 자동생성됨
			 `,
			 return : 'RedCamera'
		 }
		 :DOC*/
		this['camera'] = RedCamera();
		this['_desirePosition'] = [0, 0, 0];
		this['_desirePan'] = 0;
		this['_desireTilt'] = 0;
		this['_targetObject'] = RedMesh(redGL);
		(function (self) {
			var HD_keyDown;
			var HD_keyUp;
			var HD_down, HD_Move, HD_up;
			var sX, sY;
			var mX, mY;
			sX = 0, sY = 0;
			mX = 0, mY = 0;
			HD_keyDown = function (e) {
				self['keyBuffer'][e['key']] = 1
			};
			HD_keyUp = function (e) {
				self['keyBuffer'][e['key']] = 0
			};
			HD_down = function (e) {
				sX = e['x'], sY = e['y'];
				redGL['_canvas'].addEventListener('mousemove', HD_Move)
				window.addEventListener('mouseup', HD_up)
			};
			HD_Move = function (e) {
				mX = e['x'] - sX, mY = e['y'] - sY;
				sX = e['x'], sY = e['y'];
				self['_desirePan'] -= mX * self['_speedRotation'] * 0.1;
				self['_desireTilt'] -= mY * self['_speedRotation'] * 0.1;
			};
			HD_up = function () {
				redGL['_canvas'].removeEventListener('mousemove', HD_Move);
				window.removeEventListener('mouseup', HD_up);
			};
			window.addEventListener('keydown', HD_keyDown);
			window.addEventListener('keyup', HD_keyUp);
			redGL['_canvas'].addEventListener('mousedown', HD_down);
		})(this);
	};
	RedBasicController.prototype = new RedBaseController();
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`speed`,
		 description : `
			 이동 속도
			 기본값 : 1
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedBasicController', 'speed', 'number', {min: 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`delay`,
		 description : `
			 이동 지연 속도
			 기본값 : 0.1
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedBasicController', 'delay', 'number', {min: 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`speedRotation`,
		 description : `
			 회전 속도
			 기본값 : 1
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedBasicController', 'speedRotation', 'number', {min: 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`delayRotation`,
		 description : `
			 회전 지연 속도
			 기본값 : 0.1
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedBasicController', 'delayRotation', 'number', {min: 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`maxAcceleration`,
		 description : `
			 최대 가속도 ( 이동 속도와 합쳐짐 )
			 기본값 : 3
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedBasicController', 'maxAcceleration', 'number', {min: 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`x`,
		 return : 'Number'
	 }
	 :DOC*/
	Object.defineProperty(RedBasicController.prototype, 'x', (function () {
		return {
			get: function () {
				return this['_targetObject']['x']
			},
			set: function (v) {
				this['_targetObject']['x'] = v;
				this['_desirePosition'][0] = v;
			}
		}
	})());
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`y`,
		 return : 'Number'
	 }
	 :DOC*/
	Object.defineProperty(RedBasicController.prototype, 'y', (function () {
		return {
			get: function () {
				return this['_targetObject']['y']
			},
			set: function (v) {
				this['_targetObject']['y'] = v;
				this['_desirePosition'][1] = v;
			}
		}
	})());
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`z`,
		 return : 'Number'
	 }
	 :DOC*/
	Object.defineProperty(RedBasicController.prototype, 'z', (function () {
		return {
			get: function () {
				return this['_targetObject']['z']
			},
			set: function (v) {
				this['_targetObject']['z'] = v;
				this['_desirePosition'][2] = v;
			}
		}
	})());
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`tilt`,
		 return : 'Number'
	 }
	 :DOC*/
	Object.defineProperty(RedBasicController.prototype, 'tilt', (function () {
		return {
			get: function () {
				return this['_desireTilt']
			},
			set: function (v) {
				this['_targetObject']['rotationX'] = v;
				this['_desireTilt'] = v;
			}
		}
	})());
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`pan`,
		 return : 'Number'
	 }
	 :DOC*/
	Object.defineProperty(RedBasicController.prototype, 'pan', (function () {
		return {
			get: function () {
				return this['_desirePan']
			},
			set: function (v) {
				this['_targetObject']['rotationY'] = v;
				this['_desirePan'] = v;
			}
		}
	})());
	/**DOC:
	 {
	     code : 'METHOD',
		 title :`update`,
		 description : '업데이트',
		 return : 'void'
	 }
	 :DOC*/
	RedBasicController.prototype['update'] = (function () {
		var up = new Float32Array([0, 1, 0]);
		var tPan, tTilt
		var targetObject;
		var move, rotate;
		var tSpeed, tSpeedRotation;
		var tDelay, tDelayRotation;
		var tMTX0, tMTX1;
		var displacementMTX;
		var displacementVec3;
		var tCamera;
		var currentAcceleration;
		var tKeyBuffer;
		var tKeyNameMapper;
		var tDesirePosition;
		displacementMTX = mat4.create();
		tMTX0 = mat4.create();
		tMTX1 = mat4.create();
		displacementVec3 = vec3.create();
		currentAcceleration = 0;
		return function () {
			tPan = 0;
			tTilt = 0;
			move = false;
			rotate = false;
			tSpeed = this['_speed'];
			tSpeedRotation = this['_speedRotation'];
			tDelay = this['_delay'];
			tDelayRotation = this['_delayRotation'];
			tCamera = this['camera'];
			tDesirePosition = this['_desirePosition'];
			tKeyBuffer = this['keyBuffer'];
			tKeyNameMapper = this['keyNameMapper'];
			displacementVec3[0] = 0;
			displacementVec3[1] = 0;
			displacementVec3[2] = 0;
			// 움직임 체크
			if ( tKeyBuffer[tKeyNameMapper['turnLeft']] ) rotate = true, tPan = tSpeedRotation;
			if ( tKeyBuffer[tKeyNameMapper['turnRight']] ) rotate = true, tPan = -tSpeedRotation;
			if ( tKeyBuffer[tKeyNameMapper['turnUp']] ) rotate = true, tTilt = tSpeedRotation;
			if ( tKeyBuffer[tKeyNameMapper['turnDown']] ) rotate = true, tTilt = -tSpeedRotation;
			if ( tKeyBuffer[tKeyNameMapper['moveForward']] ) move = true, displacementVec3[2] = -currentAcceleration * tSpeed;
			if ( tKeyBuffer[tKeyNameMapper['moveBack']] ) move = true, displacementVec3[2] = currentAcceleration * tSpeed;
			if ( tKeyBuffer[tKeyNameMapper['moveLeft']] ) move = true, displacementVec3[0] = -currentAcceleration * tSpeed;
			if ( tKeyBuffer[tKeyNameMapper['moveRight']] ) move = true, displacementVec3[0] = currentAcceleration * tSpeed;
			if ( tKeyBuffer[tKeyNameMapper['moveUp']] ) move = true, displacementVec3[1] = currentAcceleration * tSpeed;
			if ( tKeyBuffer[tKeyNameMapper['moveDown']] ) move = true, displacementVec3[1] = -currentAcceleration * tSpeed;
			// 가속도 계산
			if ( rotate || move ) {
				currentAcceleration += 0.1;
				if ( currentAcceleration > this['_maxAcceleration'] ) currentAcceleration = this['_maxAcceleration']
			} else {
				currentAcceleration += -0.1;
				if ( currentAcceleration < 0 ) currentAcceleration = 0
			}
			//
			targetObject = this['_targetObject'];
			// pan,tilt 설정
			if ( rotate ) {
				this['_desirePan'] += tPan;
				this['_desireTilt'] += tTilt;
			}
			// pan,tilt 타겟오브젝트에 반영
			targetObject['rotationY'] += (this['_desirePan'] - targetObject['rotationY']) * tDelayRotation;
			targetObject['rotationX'] += (this['_desireTilt'] - targetObject['rotationX']) * tDelayRotation;
			if ( move || rotate ) {
				tMTX0 = targetObject['matrix'];
				// 이동 매트릭스구함
				mat4.identity(displacementMTX);
				mat4.rotateY(displacementMTX, displacementMTX, targetObject['rotationY'] * Math.PI / 180);
				mat4.rotateX(displacementMTX, displacementMTX, targetObject['rotationX'] * Math.PI / 180);
				mat4.translate(displacementMTX, displacementMTX, displacementVec3);
				// 오브젝트에 적용할 x,y,z를 찾아냄
				mat4.identity(tMTX0);
				mat4.translate(tMTX0, tMTX0, [targetObject['x'], targetObject['y'], targetObject['z']]);
				mat4.multiply(tMTX0, tMTX0, displacementMTX);
				tDesirePosition[0] = tMTX0[12];
				tDesirePosition[1] = tMTX0[13];
				tDesirePosition[2] = tMTX0[14];
			}
			// 이동 계산
			targetObject['x'] += (tDesirePosition[0] - targetObject['x']) * tDelay;
			targetObject['y'] += (tDesirePosition[1] - targetObject['y']) * tDelay;
			targetObject['z'] += (tDesirePosition[2] - targetObject['z']) * tDelay;
			// pan,tilt 타겟오브젝트에 반영
			targetObject['rotationY'] += (this['_desirePan'] - targetObject['rotationY']) * tDelayRotation;
			targetObject['rotationX'] += (this['_desireTilt'] - targetObject['rotationX']) * tDelayRotation;
			// 타겟 오브젝트 최종적용
			tMTX0 = targetObject['matrix'];
			mat4.identity(tMTX0);
			mat4.translate(tMTX0, tMTX0, [targetObject['x'], targetObject['y'], targetObject['z']]);
			mat4.rotateY(tMTX0, tMTX0, targetObject['rotationY'] * Math.PI / 180);
			mat4.rotateX(tMTX0, tMTX0, targetObject['rotationX'] * Math.PI / 180);
			// 카메라를 오브젝트 바로 뒤에 위치시킴
			tMTX1 = mat4.clone(tMTX0);
			mat4.translate(tMTX1, tMTX1, [0, 0, 0.01]);
			tCamera['x'] = tMTX1[12];
			tCamera['y'] = tMTX1[13];
			tCamera['z'] = tMTX1[14];
			// 카메라는 대상 오브젝트를 바라봄
			tCamera.lookAt(targetObject['x'], targetObject['y'], targetObject['z']);
			// console.log('RedBasicController update')
		}
	})();
	Object.freeze(RedBasicController);
})();
