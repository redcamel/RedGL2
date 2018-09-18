"use strict";
var RedPointBitmapMaterial;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'pointBitmapProgram';
	var checked;
	vSource = function () {
		/* @preserve
		 void main(void) {
			 gl_Position = uPMatrix * uCameraMatrix* uMMatrix * vec4(aVertexPosition, 1.0);
		    gl_PointSize = aPointSize/gl_Position.w * uResolution.y;
		 }
		 */
	};
	fSource = function () {
		/* @preserve
		 precision mediump float;
		// 안개
		//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
		//#REDGL_DEFINE#fragmentShareFunc#fog#

		 uniform sampler2D u_diffuseTexture;
		 uniform float u_cutOff;
         uniform float u_alpha;
		 void main(void) {
			 vec4 finalColor = texture2D(u_diffuseTexture, vec2(gl_PointCoord.x, - gl_PointCoord.y));
			 finalColor.rgb *= finalColor.a;
			 if(finalColor.a < u_cutOff) discard;
			 finalColor.a *= u_alpha;
			 //#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
			 //#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);


		 }
		 */
	};
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPointBitmapMaterial`,
		 description : `
			 RedPointBitmapMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 diffuseTexture : [
				 {type:'RedBitmapTexture'}
			 ]
		 },
		 demo : '../example/material/RedPointBitmapMaterial.html',
		 extends : [
		    'RedBaseMaterial'
		 ],
		 return : 'RedPointBitmapMaterial Instance'
	 }
	 :DOC*/
	RedPointBitmapMaterial = function (redGL, diffuseTexture) {
		if ( !(this instanceof RedPointBitmapMaterial) ) return new RedPointBitmapMaterial(redGL, diffuseTexture);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedPointBitmapMaterial : RedGL Instance만 허용.', redGL);
		this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource);
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		this['diffuseTexture'] = diffuseTexture;
		this['alpha'] = 1;
		this['cutOff'] = 0.1;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['_UUID'] = RedGL.makeUUID();
		if ( !checked ) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this)
	};
	RedPointBitmapMaterial.prototype = new RedBaseMaterial();
	/**DOC:
	 {
 	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPointBitmapMaterial', 'alpha', 'number', {min: 0, max: 1});
	/**DOC:
	 {
 	     code : 'PROPERTY',
		 title :`cutOff`,
		 description : `
		 기본값 : 0.0001
		 해당값보다 알파값이 작을경우 discard 처리됨.
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPointBitmapMaterial', 'cutOff', 'number', {min: 0, max: 1});
	/**DOC:
	 {
 	     code : 'PROPERTY',
		 title :`diffuseTexture`,
		 return : 'RedBitmapTexture'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPointBitmapMaterial', 'diffuseTexture', 'sampler2D', {essential: true});
	Object.freeze(RedPointBitmapMaterial)
})();