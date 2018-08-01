"use strict";
var RedPostEffect_Pixelize;
(function () {
	var vSource, fSource;
	var PROGRAM_NAME = 'RedPostEffectPixelizeProgram';
	var checked;
	vSource = function () {
		/* @preserve
		 void main(void) {
			 vTexcoord = aTexcoord;
			 vResolution = uResolution;
			 gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
		 }
		 */
	};
	fSource = function () {
		/* @preserve
		 precision mediump float;
		 uniform sampler2D u_diffuseTexture;
		 uniform float u_width;
		 uniform float u_height;
		 void main(void) {
			 vec4 finalColor;
			 float dx = 1.0/vResolution.x * u_width;
			 float dy = 1.0/vResolution.y * u_height;
			 vec2 coord = vec2(
				 dx * (floor(vTexcoord.x / dx) + 0.5),
				 dy * (floor(vTexcoord.y / dy) + 0.5)
			 );
			 finalColor = texture2D(u_diffuseTexture, coord);
			 gl_FragColor = finalColor;
		 }
		 */
	};
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedPostEffect_Pixelize`,
		 description : `
			 RedPostEffect_Pixelize Instance 생성.
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ]
		 },
		 return : 'RedPostEffect_Pixelize Instance'
	 }
	 :DOC*/
	RedPostEffect_Pixelize = function (redGL) {
		if ( !(this instanceof RedPostEffect_Pixelize) ) return new RedPostEffect_Pixelize(redGL);
		redGL instanceof RedGL || RedGLUtil.throwFunc('RedPostEffect_Pixelize : RedGL Instance만 허용.', redGL);
		this['frameBuffer'] = RedFrameBuffer(redGL);
		this['diffuseTexture'] = null;
		this['width'] = 5;
		this['height'] = 5;
		/////////////////////////////////////////
		// 일반 프로퍼티
		this['program'] = RedProgram['makeProgram'](redGL, PROGRAM_NAME, vSource, fSource);
		this['_UUID'] = RedGL.makeUUID();
		if ( !checked ) {
			this.checkUniformAndProperty();
			checked = true;
		}
		console.log(this);
	};
	RedPostEffect_Pixelize.prototype = new RedBasePostEffect();
	RedPostEffect_Pixelize.prototype['updateTexture'] = function (lastFrameBufferTexture) {
		this['diffuseTexture'] = lastFrameBufferTexture;
	};
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Pixelize', 'diffuseTexture', 'sampler2D');
	/**DOC:
	 {
		 title :`width`,
		 description : `
			 픽셀화 가로 크기
			 기본값 : 5
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Pixelize', 'width', 'number', {'min': 0});
	/**DOC:
	 {
		 title :`height`,
		 description : `
			 픽셀화 세로 크기
			 기본값 : 5
		 `,
		 return : 'Number'
	 }
	 :DOC*/
	RedDefinePropertyInfo.definePrototype('RedPostEffect_Pixelize', 'height', 'number', {'min': 0});
	Object.freeze(RedPostEffect_Pixelize);
})();