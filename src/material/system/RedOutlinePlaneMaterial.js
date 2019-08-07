/*
 *   RedGL - MIT License
 *   Copyright (c) 2018 - 2019 By RedCamel( webseon@gmail.com )
 *   https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 *   Last modification time of this file - 2019.7.11 18:28:15
 *
 */

"use strict";
var RedOutlinePlaneMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedOutlinePlaneMaterialProgram';
	var PROGRAM_OPTION_LIST = [];
	var checked;
	vSource = function () {
		/* @preserve
		// 스키닝
		//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#

		// Sprite3D
		//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
		void main(void) {
			gl_PointSize = uPointSize;
			float outlineSize = uOutlineThickness;

			// position 계산
			//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
			//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
			vVertexPosition =  targetMatrix *  vec4(aVertexPosition, 1.0);
			float tScaleX = length(vec3(targetMatrix[0][0], targetMatrix[0][1], targetMatrix[0][2]));
			float tScaleY = length(vec3(targetMatrix[1][0], targetMatrix[1][1], targetMatrix[1][2]));
			float tScaleZ = length(vec3(targetMatrix[2][0], targetMatrix[2][1], targetMatrix[2][2]));

			//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
			//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
			//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
			//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
			//#REDGL_DEFINE#sprite3D#true# }
			//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix * vec4(aVertexPosition * vec3(1.0+outlineSize/tScaleX,1.0+outlineSize/tScaleY,1.0+outlineSize/tScaleZ) , 1.0);
			vTexcoord = aTexcoord-0.5;
			vTexcoord *= vec2(1.0+outlineSize/tScaleX,1.0+outlineSize/tScaleY);


			//#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
			//#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter  *  uDirectionalShadowLightMatrix * targetMatrix * vec4(aVertexPosition, 1.0);
		}
		 */
	};
	fSource = function () {
		/* @preserve
		 precision mediump float;
		// 안개
		//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
		//#REDGL_DEFINE#fragmentShareFunc#fog#

		// 그림자
		//#REDGL_DEFINE#fragmentShareFunc#decodeFloatShadow#
		//#REDGL_DEFINE#fragmentShareFunc#getShadowColor#

		 void main(void) {
			vec4 finalColor = uOutlineColor;
			if(-0.495 <vTexcoord.x && vTexcoord.x<0.495 && -0.495 <vTexcoord.y && vTexcoord.y<0.495) {
				if(-0.490 <vTexcoord.x && vTexcoord.x<0.490 && -0.490 <vTexcoord.y && vTexcoord.y<0.490) discard;
				else finalColor.a *= 0.5;
			}

			//#REDGL_DEFINE#directionalShadow#true# finalColor.rgb *= getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture);
			//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
			//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
		 }
		 */
	};
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedOutlinePlaneMaterial`,
		 description : `
			 RedOutlinePlaneMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 hexColor : [
				 {type:'hex'},
				 '기본값 : #ff0000'
			 ],
			 alpha : [
				 {type:'number'},
				 '기본값 : 1'
			 ]
		 },
		 extends : ['RedBaseMaterial'],
		 demo : '../example/material/RedOutlinePlaneMaterial.html',
		 example : `
			 RedOutlinePlaneMaterial(RedGL Instance, hex)
		 `,
		 return : 'RedOutlinePlaneMaterial Instance'
	 }
	 :DOC*/
	RedOutlinePlaneMaterial = function (redGL, hexColor, alpha) {
		if (!(this instanceof RedOutlinePlaneMaterial)) return new RedOutlinePlaneMaterial(redGL, hexColor, alpha);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedOutlinePlaneMaterial : RedGL Instance만 허용.', '입력값 : ' + redGL);
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		this['_color'] = new Float32Array(4);
		this['alpha'] = alpha == undefined ? 1 : alpha;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['color'] = hexColor ? hexColor : '#ff0000';
		this['_UUID'] = RedGL.makeUUID();
		if (!checked) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	RedOutlinePlaneMaterial.prototype = new RedBaseMaterial();
	RedOutlinePlaneMaterial['DEFINE_OBJECT_COLOR'] = {
		get: function () {
			return this['_colorHex']
		},
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
	RedOutlinePlaneMaterial['DEFINE_OBJECT_ALPHA'] = {
		'min': 0, 'max': 1,
		callback: function (v) {
			this['_color'][3] = this['_alpha'] = v
		}
	};
	/*DOC:
	 {
	     code : 'PROPERTY',
		 title :`color`,
		 description : `기본값 : #ff2211`,
		 return : 'hex'
	 }
	 :DOC*/
	Object.defineProperty(RedOutlinePlaneMaterial.prototype, 'color', RedOutlinePlaneMaterial['DEFINE_OBJECT_COLOR']);
	/*DOC:
	 {
	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `
		    기본값 : 1
		    최소값 : 0
		    최대값 : 1
         `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedOutlinePlaneMaterial', 'alpha', 'number', RedOutlinePlaneMaterial['DEFINE_OBJECT_ALPHA']);
	Object.freeze(RedOutlinePlaneMaterial);
})();