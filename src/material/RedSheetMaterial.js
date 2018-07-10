"use strict";
var RedSheetMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedSheetMaterial_Program';
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
			vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
			vTexcoord = vec2(
				vTexcoord.s * u_sheetRect.x + u_sheetRect.z,
				vTexcoord.t * u_sheetRect.y - u_sheetRect.w
			);
			gl_PointSize = uPointSize;
			if(uSprite3DYn) {
				gl_Position = uPMatrix * calSprite3D(uCameraMatrix , uMMatrix) *  vec4(aVertexPosition, 1.0);
				if(!uPerspectiveScale){
					gl_Position /= gl_Position.w;
					gl_Position.xy += aVertexPosition.xy * vec2(uMMatrix[0][0],uMMatrix[1][1]);
				}
			} else gl_Position = uPMatrix * uCameraMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		}
		 */
	}
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
			 //#define#fog#true# gl_FragColor = fog( fogFactor(uFogDistance, uFogDensity), uFogColor, finalColor);
		 }
		 */
	}
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
		 example : `
			 RedSheetMaterial(RedGL Instance, RedBitmapTexture(RedGL Instance, src))
		 `,
		 return : 'RedSheetMaterial Instance'
	 }
	 :DOC*/
	RedSheetMaterial = function (redGL, diffuseTexture, frameRate, segmentW, segmentH, totalFrame) {
		if ( !(this instanceof RedSheetMaterial) ) return new RedSheetMaterial(redGL, diffuseTexture, frameRate, segmentW, segmentH, totalFrame);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedSheetMaterial : RedGL Instance만 허용됩니다.', redGL)
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource)
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		/**DOC:
		 {
			 title :`diffuseTexture`,
			 return : 'RedSheetMaterial'
		 }
		 :DOC*/
		this['diffuseTexture'] = diffuseTexture;
		this['_sheetRect'] = new Float32Array(4);
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['_perFrameTime'] = 0; // 단위당 시간
		this['_nextFrameTime'] = 0; // 다음 프레임 호출 시간
		this['_playYn'] = true
		this['segmentW'] = segmentW || 1;
		this['segmentH'] = segmentH || 1;
		this['totalFrame'] = totalFrame || 1;
		this['frameRate'] = frameRate || 1000;
		this['currentIndex'] = 0;
		this['loop'] = true
		this['_aniMap'] = {}
		this['__RedSheetMaterialYn'] = true
		this['_UUID'] = RedGL['makeUUID']();
		this.checkUniformAndProperty();
		console.log(this)
	}
	RedSheetMaterial.prototype = new RedBaseMaterial()
	RedSheetMaterial.prototype['addAction'] = function (key, option) {
		this['_aniMap'][key] = option
	}
	RedSheetMaterial.prototype['setAction'] = function (key) {
		this['diffuseTexture'] = this['_aniMap'][key]['texture']
		this['segmentW'] = this['_aniMap'][key]['segmentW']
		this['segmentH'] = this['_aniMap'][key]['segmentH']
		this['totalFrame'] = this['_aniMap'][key]['totalFrame']
		this['frameRate'] = this['_aniMap'][key]['frameRate']
		this['currentIndex'] = 0
		this['_nextFrameTime'] = 0
	}
	RedDefinePropertyInfo.definePrototype('RedSheetMaterial', 'diffuseTexture', 'sampler2D', {essential: true});
	RedDefinePropertyInfo.definePrototype('RedSheetMaterial', 'totalFrame', 'number', {'min': 0});
	RedDefinePropertyInfo.definePrototype('RedSheetMaterial', 'loop', 'boolean', true);
	RedSheetMaterial.prototype['play'] = function () { this['_playYn'] = true }
	RedSheetMaterial.prototype['stop'] = function () { this['_playYn'] = false, this['currentIndex'] = 0 }
	RedSheetMaterial.prototype['pause'] = function () { this['_playYn'] = false}
	RedSheetMaterial.prototype['gotoAndStop'] = function (index) {
		if ( index > this['totalFrame'] - 1 ) index = this['totalFrame'] - 1
		if ( index < 0 ) index = 0
		this['_playYn'] = false
		this['currentIndex'] = index
	}
	RedSheetMaterial.prototype['gotoAndPlay'] = function (index) {
		if ( index > this['totalFrame'] - 1 ) index = this['totalFrame'] - 1
		if ( index < 0 ) index = 0
		this['_playYn'] = true
		this['currentIndex'] = index
		this['_nextFrameTime'] = 0
	}
	Object.defineProperty(RedSheetMaterial.prototype, 'frameRate', {
		get: function () { return this['_frameRate']; },
		set: function (v) {
			if ( typeof v != 'number' ) RedGLUtil.throwFunc('RedSheetMaterial' + ' - frameRate  : 숫자만 허용함.')
			if ( v < 1 ) v = 1;
			this['_frameRate'] = v
			this['_perFrameTime'] = 1000 / this['frameRate']
		}
	});
	Object.defineProperty(RedSheetMaterial.prototype, 'segmentW', {
		get: function () { return this['_segmentW']; },
		set: function (v) {
			if ( typeof v != 'number' ) RedGLUtil.throwFunc('RedSheetMaterial' + ' - segmentW  : 숫자만 허용함.')
			if ( v < 1 ) v = 1;
			this['_segmentW'] = v
		}
	});
	Object.defineProperty(RedSheetMaterial.prototype, 'segmentH', {
		get: function () { return this['_segmentH']; },
		set: function (v) {
			if ( typeof v != 'number' ) RedGLUtil.throwFunc('RedSheetMaterial' + ' - segmentH  : 숫자만 허용함.')
			if ( v < 1 ) v = 1;
			this['_segmentH'] = v
		}
	})
	Object.freeze(RedSheetMaterial)
})();