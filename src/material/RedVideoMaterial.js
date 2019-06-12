/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.4.30 18:53
 */
"use strict";
var RedVideoMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedVideoMaterialProgram';
	var checked;
	vSource = function () {
		/* @preserve
			// 스키닝
			//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#

			// Sprite3D
			//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#

			void main(void) {
				gl_PointSize = uPointSize;
				vTexcoord = aTexcoord;

				// position 계산
				//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
				//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;

				//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
				//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
				//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
				//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
				//#REDGL_DEFINE#sprite3D#true# }
				//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);

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

		 uniform sampler2D u_videoTexture;
		 uniform float u_alpha;
		 void main(void) {
			 vec4 finalColor = texture2D(u_videoTexture, vTexcoord);
			 if(finalColor.a ==0.0) discard;
			 finalColor.a = u_alpha;
			 //#REDGL_DEFINE#directionalShadow#true# finalColor.rgb *= getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture);
			 //#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
			 //#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
		 }
		 */
	};
	/*DOC:
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
		 extends : ['RedBaseMaterial'],
		 demo : '../example/material/RedVideoMaterial.html',
		 example : `
            RedVideoMaterial(
                RedGL Instance,
                RedBitmapTexture(RedGL Instance, src)
            )
		 `,
		 return : 'RedVideoMaterial Instance'
	 }
	 :DOC*/
	RedVideoMaterial = function (redGL, videoTexture) {
		if (!(this instanceof RedVideoMaterial)) return new RedVideoMaterial(redGL, videoTexture);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedVideoMaterial : RedGL Instance만 허용.', redGL);
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource);
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		this['videoTexture'] = videoTexture;
		this['alpha'] = 1;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['_UUID'] = RedGL.makeUUID();
		if (!checked) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	RedVideoMaterial.prototype = new RedBaseMaterial();
	RedDefinePropertyInfo.definePrototypes(
		'RedVideoMaterial',
		/*DOC:
		 {
			 code : 'PROPERTY',
			 title :`alpha`,
			 description : `기본값 : 1`,
			 return : 'Number'
		 }
		 :DOC*/
		['alpha', 'number', {min: 0, max: 1}],
		/*DOC:
		 {
		     code : 'PROPERTY',
			 title :`videoTexture`,
			 description : `videoTexture`,
			 return : 'RedVideoTexture'
		 }
		 :DOC*/
		['videoTexture', 'samplerVideo', {essential: true}]
	);
	Object.freeze(RedVideoMaterial);
})();