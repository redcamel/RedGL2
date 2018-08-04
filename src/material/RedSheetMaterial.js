"use strict";
var RedSheetMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedSheetMaterialProgram';
	var checked;
	vSource = function () {
		/* @preserve
		mat4 calSprite3D(mat4 cameraMTX, mat4 mvMatrix){
			mat4 cacheScale = mat4(
				mvMatrix[0][0], 0.0, 0.0, 0.0,
				0.0, mvMatrix[1][1], 0.0, 0.0,
				0.0, 0.0, 1.0, mvMatrix[2][2],
				0.0, 0.0, 0.0, 1.0
			);
			mat4 tMTX = cameraMTX * mvMatrix;
			tMTX[0][0] = 1.0, tMTX[0][1] = 0.0, tMTX[0][2] = 0.0,
			tMTX[1][0] = 0.0, tMTX[1][1] = 1.0, tMTX[1][2] = 0.0,
			tMTX[2][0] = 0.0, tMTX[2][1] = 0.0, tMTX[2][2] = 1.0;
			return tMTX * cacheScale;
		}
		uniform vec4 u_sheetRect;
		void main(void) {
			vTexcoord = aTexcoord;
			vTexcoord = vec2(
				vTexcoord.s * u_sheetRect.x + u_sheetRect.z,
				vTexcoord.t * u_sheetRect.y - u_sheetRect.w
			);
			gl_PointSize = uPointSize;
			//#define#sprite3D#true# gl_Position = uPMatrix * calSprite3D(uCameraMatrix , uMMatrix) *  vec4(aVertexPosition, 1.0);
			//#define#sprite3D#true# if(!u_PerspectiveScale){
			//#define#sprite3D#true#   gl_Position /= gl_Position.w;
			//#define#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2(uMMatrix[0][0],uMMatrix[1][1] * uResolution.x/uResolution.y);
			//#define#sprite3D#true# }
			//#define#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		}
		 */
	};
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D u_diffuseTexture;
		 float fogFactor(float perspectiveFar, float density){
			 float flog_cord = gl_FragCoord.z / gl_FragCoord.w / perspectiveFar;
			 float fog = flog_cord * density;
			 if(1.0 - fog < 0.0) discard;
			 return clamp(1.0 - fog, 0.0,  1.0);
		 }
		 vec4 fog(float fogFactor, vec4 fogColor, vec4 currentColor) {
			return mix(fogColor, currentColor, fogFactor);
		 }
		 void main(void) {
			 vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
			 finalColor.rgb *= finalColor.a;
			 if(finalColor.a ==0.0) discard;

			 //#define#fog#false# gl_FragColor = finalColor;
			 //#define#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
		 }
		 */
	};
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedSheetMaterial`,
		 description : `
			 RedSheetMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 diffuseTexture : [
				 {type:'RedBitmapTexture'},
				 'RedBitmapTexture Instance'
			 ]
		 },
		 extends : [
		    'RedBaseMaterial'
		 ],
		 example : `
			 RedSheetMaterial(RedGL Instance, RedBitmapTexture(RedGL Instance, src))
		 `,
		 return : 'RedSheetMaterial Instance'
	 }
	 :DOC*/
	RedSheetMaterial = function (redGL, diffuseTexture, frameRate, segmentW, segmentH, totalFrame) {
		if ( !(this instanceof RedSheetMaterial) ) return new RedSheetMaterial(redGL, diffuseTexture, frameRate, segmentW, segmentH, totalFrame);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedSheetMaterial : RedGL Instance만 허용.', redGL);
		frameRate = frameRate || 60;
		segmentW = segmentW || 1;
		segmentH = segmentH || 1;
		totalFrame = totalFrame || 1;
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource);
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		this['diffuseTexture'] = diffuseTexture;
		this['_sheetRect'] = new Float32Array(4);
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['_perFrameTime'] = 0; // 단위당 시간
		this['_nextFrameTime'] = 0; // 다음 프레임 호출 시간
		this['_playYn'] = true;
		this['segmentW'] = segmentW;
		this['segmentH'] = segmentH;
		this['totalFrame'] = totalFrame;
		this['frameRate'] = frameRate;
		this['currentIndex'] = 0;
		this['loop'] = true;
		this['_aniMap'] = {};
		this['__RedSheetMaterialYn'] = true;
		this['_UUID'] = RedGL.makeUUID();
		if ( !checked ) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	RedSheetMaterial.prototype = new RedBaseMaterial();
	/**DOC:
	 {
		 title :`addAction`,
		 code : 'METHOD',
		 description : `addAction`,
		 params : {
			 key : [
				 {type:'String'}
			 ],
			 option : [
				 {type:'Object'}
			 ]
		 },
		 return : 'void'
	 }
	 :DOC*/
	RedSheetMaterial.prototype['addAction'] = function (key, option) {
		this['_aniMap'][key] = option
	};
	/**DOC:
	 {
		 title :`setAction`,
		 code : 'METHOD',
		 description : `setAction`,
		 params : {
			 key : [
				 {type:'String'}
			 ]
		 },
		 return : 'void'
	 }
	 :DOC*/
	RedSheetMaterial.prototype['setAction'] = function (key) {
		this['diffuseTexture'] = this['_aniMap'][key]['texture'];
		this['segmentW'] = this['_aniMap'][key]['segmentW'];
		this['segmentH'] = this['_aniMap'][key]['segmentH'];
		this['totalFrame'] = this['_aniMap'][key]['totalFrame'];
		this['frameRate'] = this['_aniMap'][key]['frameRate'];
		this['currentIndex'] = 0;
		this['_nextFrameTime'] = 0;
	};
	/**DOC:
	 {
		 title :`play`,
		 code : 'METHOD',
		 description : `play`,
		 return : 'void'
	 }
	 :DOC*/
	RedSheetMaterial.prototype['play'] = function () { this['_playYn'] = true };
	/**DOC:
	 {
		 title :`stop`,
		 code : 'METHOD',
		 description : `stop`,
		 return : 'void'
	 }
	 :DOC*/
	RedSheetMaterial.prototype['stop'] = function () {
		this['_playYn'] = false;
		this['currentIndex'] = 0;
	};
	/**DOC:
	 {
		 title :`pause`,
		 code : 'METHOD',
		 description : `pause`,
		 return : 'void'
	 }
	 :DOC*/
	RedSheetMaterial.prototype['pause'] = function () { this['_playYn'] = false};
	/**DOC:
	 {
		 title :`gotoAndStop`,
		 code : 'METHOD',
		 description : `gotoAndStop`,
		 return : 'void'
	 }
	 :DOC*/
	RedSheetMaterial.prototype['gotoAndStop'] = function (index) {
		if ( index > this['totalFrame'] - 1 ) index = this['totalFrame'] - 1;
		if ( index < 0 ) index = 0;
		this['_playYn'] = false;
		this['currentIndex'] = index;
	};
	/**DOC:
	 {
		 title :`gotoAndPlay`,
		 code : 'METHOD',
		 description : `gotoAndPlay`,
		 return : 'void'
	 }
	 :DOC*/
	RedSheetMaterial.prototype['gotoAndPlay'] = function (index) {
		if ( index > this['totalFrame'] - 1 ) index = this['totalFrame'] - 1;
		if ( index < 0 ) index = 0;
		this['_playYn'] = true;
		this['currentIndex'] = index;
		this['_nextFrameTime'] = 0;
	};
	/**DOC:
	 {
         code : 'PROPERTY',
		 title :`diffuseTexture`,
		 description : `diffuseTexture`,
		 return : 'RedSheetMaterial'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedSheetMaterial', 'diffuseTexture', 'sampler2D', {essential: true});
	/**DOC:
	 {
 	     code : 'PROPERTY',
		 title :`totalFrame`,
		 description : `최소값 : 1`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedSheetMaterial', 'totalFrame', 'number', {'min': 1});
	/**DOC:
	 {
 	     code : 'PROPERTY',
		 title :`loop`,
		 description : `기본값 : true`,
		 return : 'Boolean'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedSheetMaterial', 'loop', 'boolean', true);
	/**DOC:
	 {
 	     code : 'PROPERTY',
		 title :`frameRate`,
		 description : `최소값 : 1`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedSheetMaterial', 'frameRate', 'number', {
		min: 1,
		callback: function () {
			this['_perFrameTime'] = 1000 / this['_frameRate'];
		}
	});
	/**DOC:
	 {
 	     code : 'PROPERTY',
		 title :`segmentW`,
		 description : `최소값 : 1`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedSheetMaterial', 'segmentW', 'number', {min: 1});
	/**DOC:
	 {
 	     code : 'PROPERTY',
		 title :`segmentH`,
		 description : `최소값 : 1`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedSheetMaterial', 'segmentH', 'number', {min: 1});
	Object.freeze(RedSheetMaterial)
})();