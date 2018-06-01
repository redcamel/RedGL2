"use strict";
var RedPostEffect_DoF_DepthMaterial;
(function () {
	var makeProgram;
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_DoF_DepthMaterial`,
		 description : `
			 RedPostEffect_DoF_DepthMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 example : `
			 RedPostEffect_DoF_DepthMaterial(RedGL Instance)
		 `,
		 return : 'RedPostEffect_DoF_DepthMaterial Instance'
	 }
	 :DOC*/
	RedPostEffect_DoF_DepthMaterial = function ( redGL ) {
		if ( !(this instanceof RedPostEffect_DoF_DepthMaterial) ) return new RedPostEffect_DoF_DepthMaterial( redGL );
		/////////////////////////////////////////
		// 유니폼 프로퍼티

		this['focusLength'] = 15
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = makeProgram( redGL );
		this['_UUID'] = RedGL['makeUUID']();
		this.checkUniformAndProperty()
		// Object.seal(this);
		console.log( this );
	}
	makeProgram = (function () {
		var vSource, fSource;
		var PROGRAM_NAME;
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
			 if(uSprite3DYn) {
			 gl_Position = uPMatrix * calSprite3D(uCameraMatrix , uMMatrix) *  vec4(aVertexPosition, 1.0);
			 if(!uPerspectiveScale){
			 gl_Position /= gl_Position.w;
			 gl_Position.xy += aVertexPosition.xy * vec2(uMMatrix[0][0],uMMatrix[1][1]);
			 }
			 }
			 else gl_Position = uPMatrix * uCameraMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
			 }
			 */
		}
		fSource = function () {
			/* @preserve
			 precision mediump float;
			 uniform float uFocusLength;

			 void main(void) {
			 float depth = 1.0 - gl_FragCoord.z / gl_FragCoord.w / uFocusLength;
			 gl_FragColor = vec4(depth, depth, depth, 1.0);
			 }
			 */
		}
		vSource = RedGLUtil.getStrFromComment( vSource.toString() );
		fSource = RedGLUtil.getStrFromComment( fSource.toString() );
		PROGRAM_NAME = 'RedPostEffect_DoF_depthProgram';
		return function ( redGL ) {
			return RedProgram( redGL, PROGRAM_NAME, vSource, fSource )

		}
	})()
	RedPostEffect_DoF_DepthMaterial.prototype = RedBaseMaterial.prototype

	Object.freeze( RedPostEffect_DoF_DepthMaterial )
})();