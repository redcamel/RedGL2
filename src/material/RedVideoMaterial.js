"use strict";
var RedVideoMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'videoProgram';
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
			vTexcoord = aTexcoord;
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
		 uniform sampler2D u_videoTexture;
		 uniform float u_alpha;
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
			 vec4 finalColor = texture2D(u_videoTexture, vTexcoord);
			 finalColor.rgb *= finalColor.a;
			 if(finalColor.a ==0.0) discard;

			 finalColor.a = u_alpha;
			 //#define#fog#false# gl_FragColor = finalColor;
			 //#define#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
		 }
		 */
	};
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedVideoMaterial`,
		 description : `
			 RedVideoMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 videoSrc : [
				 {type:'videoSrc'},
				 'String'
			 ]
		 },
		 example : `
			 RedVideoMaterial(RedGL Instance, RedBitmapTexture(RedGL Instance, src))
		 `,
		 return : 'RedVideoMaterial Instance'
	 }
	 :DOC*/
	RedVideoMaterial = function (redGL, videoTexture) {
		if ( !(this instanceof RedVideoMaterial) ) return new RedVideoMaterial(redGL, videoTexture);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedVideoMaterial : RedGL Instance만 허용됩니다.', redGL);
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource);
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		this['videoTexture'] = videoTexture;
		this['alpha'] = 1;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['_UUID'] = RedGL.makeUUID();
		if ( !checked ) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	RedVideoMaterial.prototype = new RedBaseMaterial();
	/**DOC:
	 {
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedVideoMaterial', 'alpha', 'number', {min: 0, max: 1});
	/**DOC:
	 {
		 title :`videoTexture`,
		 return : 'RedVideoMaterial'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedVideoMaterial', 'videoTexture', 'samplerVideo', {essential: true});
	Object.freeze(RedVideoMaterial);
})();