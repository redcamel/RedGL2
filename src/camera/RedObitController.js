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
			 RedObitController(RedGL Instance)
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
		if ( !(this instanceof RedObitController) ) return new RedObitController(redGL);
		self = this;
		this['centerX'] = 0;
		this['centerY'] = 0;
		this['centerZ'] = 0;
		//
		this['distance'] = 15;
		this['speedDistance'] = 2;
		this['delayDistance'] = 0.1;
		//
		this['speedRotation'] = 3;
		this['delayRotation'] = 0.1;
		this['tilt'] = 0;
		this['minTilt'] = -90;
		this['maxTilt'] = 90;
		this['pan'] = 0;
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
		this['_currentPan'] = 0;
		this['_currentTilt'] = 0;
		this['_currentDistance'] = 0;
		(function (self) {
			var HD_down, HD_Move, HD_up, HD_wheel;
			var sX, sY;
			var mX, mY;
			sX = 0, sY = 0;
			mX = 0, mY = 0;
			HD_down = function (e) {
				sX = e['x'], sY = e['y'];
				redGL['_canvas'].addEventListener('mousemove', HD_Move);
				window.addEventListener('mouseup', HD_up);
			};
			HD_Move = function (e) {
				mX = e['x'] - sX, mY = e['y'] - sY;
				sX = e['x'], sY = e['y'];
				self['_pan'] -= mX * self['_speedRotation'] * 0.1;
				self['_tilt'] -= mY * self['_speedRotation'] * 0.1;
			};
			HD_up = function () {
				redGL['_canvas'].removeEventListener('mousemove', HD_Move);
				window.removeEventListener('mouseup', HD_up);
			};
			HD_wheel = function (e) {
				console.log(e);
				self['distance'] += e['deltaY'] / 100 * self['_speedDistance']
			};
			redGL['_canvas'].addEventListener('mousedown', HD_down);
			redGL['_canvas'].addEventListener('wheel', HD_wheel);
		})(this);
	};
	RedObitController.prototype = new RedBaseController();

	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`centerX`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedObitController', 'centerX', 'number');
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`centerY`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedObitController', 'centerY', 'number');
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`centerZ`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedObitController', 'centerZ', 'number');
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`distance`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedObitController', 'distance', 'number',{min: 1});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`speedDistance`,
		 description : `
			 거리 속도
			 기본값 : 2
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedObitController', 'speedDistance', 'number', {min: 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`delayDistance`,
		 description : `
			 거리 지연 속도
			 기본값 : 0.1
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedObitController', 'delayDistance', 'number', {min: 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`speedRotation`,
		 description : `
			 회전 속도
			 기본값 : 3
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedObitController', 'speedRotation', 'number', {min: 0});
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
	RedDefinePropertyInfo.definePrototype('RedObitController', 'delayRotation', 'number', {min: 0});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`pan`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedObitController', 'pan', 'number');
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`tilt`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedObitController', 'tilt', 'number');
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`maxTilt`,
		  description : `
			 기본값 : 90
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedObitController', 'maxTilt', 'number', {max: 90});
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`minTilt`,
		  description : `
			 기본값 : -90
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedObitController', 'minTilt', 'number', {max: -90});
	/**DOC:
	 {
	     code : 'METHOD',
		 title :`update`,
		 description : '업데이트',
		 return : 'void'
	 }
	 :DOC*/
	RedObitController.prototype['update'] = (function () {
		var tDelayRotation;
		var tCamera;
		var tMTX0;
		var PER_PI;
		PER_PI = Math.PI / 180;
		return function () {
			if ( this['_tilt'] < this['_minTilt'] ) this['_tilt'] = this['_minTilt'];
			if ( this['_tilt'] > this['_maxTilt'] ) this['_tilt'] = this['_maxTilt'];
			tDelayRotation = this['_delayRotation'];
			tCamera = this['camera'];
			tMTX0 = tCamera['matrix'];
			this['_currentPan'] += (this['_pan'] - this['_currentPan']) * tDelayRotation;
			this['_currentTilt'] += (this['_tilt'] - this['_currentTilt']) * tDelayRotation;
			this['_currentDistance'] += (this['_distance'] - this['_currentDistance']) * this['_delayDistance'];
			mat4.identity(tMTX0);
			mat4.rotateY(tMTX0, tMTX0, this['_currentPan'] * PER_PI);
			mat4.rotateX(tMTX0, tMTX0, this['_currentTilt'] * PER_PI);
			mat4.translate(tMTX0, tMTX0, [0, 0, this['_currentDistance']]);
			tCamera['x'] = tMTX0[12];
			tCamera['y'] = tMTX0[13];
			tCamera['z'] = tMTX0[14];
			// 카메라는 대상 오브젝트를 바라봄
			tCamera.lookAt(this['_centerX'], this['_centerY'], this['_centerZ']);
			// console.log(this['_tilt'], this['_pan'])
			// console.log('RedObitController update')
		}
	})();
	Object.freeze(RedObitController);
})();
