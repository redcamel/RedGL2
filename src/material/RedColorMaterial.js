"use strict";
var RedColorMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedColorMaterialProgram';
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
		void main(void) {
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
		 uniform vec4 u_color;
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
			 vec4 finalColor = u_color * u_color.a;
			 //#define#fog#false# gl_FragColor = finalColor;
			 //#define#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
		 }
		 */
	};
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedColorMaterial`,
		 description : `
			 RedColorMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 hexColor : [
				 {type:'hex'}
			 ],
			 alpha : [
				 {type:'number'},
				 '알파값'
			 ]
		 },
		 extends : [
		    'RedBaseMaterial'
		 ],
		 example : `
			 RedColorMaterial(RedGL Instance, hex)
		 `,
		 return : 'RedColorMaterial Instance'
	 }
	 :DOC*/
	RedColorMaterial = function (redGL, hexColor, alpha) {
		if ( !(this instanceof RedColorMaterial) ) return new RedColorMaterial(redGL, hexColor, alpha);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedColorMaterial : RedGL Instance만 허용.', '입력값 : ' + redGL);
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource);
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		this['_color'] = new Float32Array(4);
		this['alpha'] = alpha == undefined ? 1 : alpha;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['color'] = hexColor ? hexColor : '#ff0000';
		this['_UUID'] = RedGL.makeUUID();
		if ( !checked ) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	RedColorMaterial.prototype = new RedBaseMaterial();
	RedColorMaterial['DEFINE_OBJECT_COLOR'] = {
		get: function () { return this['_colorHex'] },
		set: (function () {
			var t0;
			return function (hex) {
				this['_colorHex'] = hex ? hex : '#ff2211';
				t0 = RedGLUtil.hexToRGB_ZeroToOne.call(this, this['_colorHex']);
				this['_color'][0] = t0[0];
				this['_color'][1] = t0[1];
				this['_color'][2] = t0[2];
				this['_color'][3] = this['_alpha'];
			}
		})()
	};
	RedColorMaterial['DEFINE_OBJECT_ALPHA'] = {
		'min': 0, 'max': 1,
		callback: function (v) {
			this['_color'][3] = this['_alpha'] = v
		}
	};
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`color`,
		 description : `기본값 : #ff2211`,
		 return : 'hex'
	 }
	 :DOC*/
	Object.defineProperty(RedColorMaterial.prototype, 'color', RedColorMaterial['DEFINE_OBJECT_COLOR']);
	/**DOC:
	 {
	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedColorMaterial', 'alpha', 'number', RedColorMaterial['DEFINE_OBJECT_ALPHA']);
	Object.freeze(RedColorMaterial);
})();