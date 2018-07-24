"use strict";
var RedDirectionalShadowMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedDirectionalShadowMaterialProgram';
	vSource = function () {
		/* @preserve
		 void main(void) {
			 gl_Position =  uDirectionalShadowLightMatrix *  uMMatrix * vec4(aVertexPosition, 1.0);
		 }
		 */
	}
	fSource = function () {
		/* @preserve
		precision mediump float;
		vec4 encodeFloat (float depth) {
			const vec4 cBitShift = vec4(
			    256 * 256 * 256,
			    256 * 256,
			    256,
			    1.0
			);
			const vec4 cBitMask = vec4(
			    0,
			    1.0 / 256.0,
			    1.0 / 256.0,
			    1.0 / 256.0
			);
			vec4 comp = fract(depth * cBitShift);
			comp -= comp.xxyz * cBitMask;
			return comp;
		}
		void main(void) {
			gl_FragColor = encodeFloat(gl_FragCoord.z);
		}
		 */
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedDirectionalShadowMaterial`,
		 description : `
			 RedDirectionalShadowMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 example : `
			 RedDirectionalShadowMaterial(RedGL Instance, RedBitmapTexture(RedGL Instance, src))
		 `,
		 return : 'RedDirectionalShadowMaterial Instance'
	 }
	 :DOC*/
	RedDirectionalShadowMaterial = function (redGL) {
		if ( !(this instanceof RedDirectionalShadowMaterial) ) return new RedDirectionalShadowMaterial(redGL);
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc('RedDirectionalShadowMaterial : RedGL Instance만 허용됩니다.', redGL)
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['__RedDirectionalShadowYn'] = true
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL.makeUUID();
		this.checkUniformAndProperty();
		console.log(this)
	}
	RedDirectionalShadowMaterial.prototype = new RedBaseMaterial()
	Object.freeze(RedDirectionalShadowMaterial)
})();