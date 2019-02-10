"use strict";
var RedSheetMaterial;
(function () {
    var vSource, fSource;
    var PROGRAM_NAME = 'RedSheetMaterialProgram';
    var PROGRAM_OPTION_LIST = ['usePreMultiply'];
    var checked;
    vSource = function () {
        /* @preserve
            // 스키닝
            //#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#

            // Sprite3D
            //#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#

            uniform vec4 u_sheetRect;
            void main(void) {
                gl_PointSize = uPointSize;
                vTexcoord = aTexcoord;
                vTexcoord = vec2(
                    vTexcoord.s * u_sheetRect.x + u_sheetRect.z,
                    vTexcoord.t * u_sheetRect.y - u_sheetRect.w
                );


               // position 계산
                //#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
                //#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;

                //#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
                //#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
                //#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
                //#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2(targetMatrix[0][0],targetMatrix[1][1] * uResolution.x/uResolution.y);
                //#REDGL_DEFINE#sprite3D#true# }
                //#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);

                //#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
                //#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter * uDirectionalShadowLightMatrix * targetMatrix * vec4(aVertexPosition, 1.0);
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

         uniform sampler2D u_diffuseTexture;
         uniform float u_alpha;
         void main(void) {
             vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
             //#REDGL_DEFINE#usePreMultiply# finalColor.rgb *= finalColor.a;
             finalColor.a *= u_alpha;
             if(finalColor.a ==0.0) discard;

             //#REDGL_DEFINE#directionalShadow#true# finalColor.rgb *= getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture);
             //#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
             //#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
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
		 extends : ['RedBaseMaterial'],
		 demo : '../example/material/RedSheetMaterial.html',
		 example : `
			 RedSheetMaterial(RedGL Instance, RedBitmapTexture(RedGL Instance, src), frameRate, segmentW, segmentH, totalFrame );
		 `,
		 return : 'RedSheetMaterial Instance'
	 }
     :DOC*/
    RedSheetMaterial = function (redGL, diffuseTexture, frameRate, segmentW, segmentH, totalFrame) {
        if (!(this instanceof RedSheetMaterial)) return new RedSheetMaterial(redGL, diffuseTexture, frameRate, segmentW, segmentH, totalFrame);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedSheetMaterial : RedGL Instance만 허용.', redGL);
        frameRate = frameRate || 60;
        segmentW = segmentW || 1;
        segmentH = segmentH || 1;
        totalFrame = totalFrame || 1;
        this.makeProgramList(this, redGL, PROGRAM_NAME, vSource, fSource, PROGRAM_OPTION_LIST);
        /////////////////////////////////////////
        // 유니폼 프로퍼티
        this['diffuseTexture'] = diffuseTexture;
        this['_sheetRect'] = new Float32Array(4);
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['alpha'] = 1;
        this['usePreMultiply'] = false;
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
        if (!checked) {
            this.checkUniformAndProperty();
            checked = true;
        }
        console.log(this);
    };
    var samplerOption = {
        callback: function () {
            this._searchProgram(PROGRAM_NAME, PROGRAM_OPTION_LIST)
        }
    };
    RedSheetMaterial.prototype = new RedBaseMaterial();

    /**DOC:
     {
		 title :`addAction`,
		 code : 'METHOD',
		 description : `
		    키 기반 액션추가.
		 `,
		 params : {
			 key : [
				 {type:'String'}
			 ],
			 option : [
				 {type:'Object'},
				 `
				 <code>
                    // 옵션값 예시
                    {
                        diffuseTexture : RedBitmapTexture Instance,
                        segmentW : 가로 분할 수,
                        segmentH : 세로 분할 수,
                        totalFrame : 전체 프레임수,
                        frameRate : 초당 프레임 속도
                    }
                </code>
                `
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
		 description : `
		    addAction에 의해 추가된 액션을 실행함
		 `,
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
        /**DOC:
         {
 	     code : 'PROPERTY',
		 title :`currentIndex`,
		 description : `
		    현재 프레임 인덱스
         `,
		 return : 'int'
	 }
         :DOC*/
        this['currentIndex'] = 0;
        this['_nextFrameTime'] = 0;
    };
    /**DOC:
     {
		 title :`play`,
		 code : 'METHOD',
		 description : `
		    현재 액션을 재생함
		 `,
		 return : 'void'
	 }
     :DOC*/
    RedSheetMaterial.prototype['play'] = function () {
        this['_playYn'] = true
    };
    /**DOC:
     {
		 title :`stop`,
		 code : 'METHOD',
		 description : `
		    현재 액션 재생을 멈춤.
		    프레임은 0번으로 지정됨
		 `,
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
		 description : `
		    현재 액션을 현재 프레임에서 멈춤
		 `,
		 return : 'void'
	 }
     :DOC*/
    RedSheetMaterial.prototype['pause'] = function () {
        this['_playYn'] = false
    };
    /**DOC:
     {
		 title :`gotoAndStop`,
		 code : 'METHOD',
		 description : `
		    해당 프레임으로 가서 멈춤
		 `,
		 return : 'void'
	 }
     :DOC*/
    RedSheetMaterial.prototype['gotoAndStop'] = function (index) {
        if (index > this['totalFrame'] - 1) index = this['totalFrame'] - 1;
        if (index < 0) index = 0;
        this['_playYn'] = false;
        this['currentIndex'] = index;
    };
    /**DOC:
     {
		 title :`gotoAndPlay`,
		 code : 'METHOD',
		 description : `
		    해당 프레임 부터 재생
		 `,
		 return : 'void'
	 }
     :DOC*/
    RedSheetMaterial.prototype['gotoAndPlay'] = function (index) {
        if (index > this['totalFrame'] - 1) index = this['totalFrame'] - 1;
        if (index < 0) index = 0;
        this['_playYn'] = true;
        this['currentIndex'] = index;
        this['_nextFrameTime'] = 0;
    };
    /**DOC:
     {
         code : 'PROPERTY',
		 title :`diffuseTexture`,
		 description : `diffuseTexture`,
		 return : 'RedBitmapTexture'
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
		 description : `
		    반복여부 설정.
		    기본값 : true
         `,
		 return : 'Boolean'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedSheetMaterial', 'loop', 'boolean', true);
    /**DOC:
     {
 	     code : 'PROPERTY',
		 title :`frameRate`,
		 description : `
		    초당 프레임 속도
		    최소값 : 1
        `,
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
		 description : `
		    가로 분할 수
		    최소값 : 1
         `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedSheetMaterial', 'segmentW', 'number', {min: 1});
    /**DOC:
     {
 	     code : 'PROPERTY',
		 title :`segmentH`,
		 description : `
		    세로 분할 수
		    최소값 : 1
         `,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedSheetMaterial', 'segmentH', 'number', {min: 1});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`alpha`,
		 description : `기본값 : 1`,
		 return : 'Number'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedSheetMaterial', 'alpha', 'number', {min: 0, max: 1});
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`usePreMultiply`,
		 description : `
		    usePreMultiply 사용여부
		    기본값 : false
		 `,
		 return : 'boolean'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedSheetMaterial', 'usePreMultiply', 'boolean', samplerOption);
    Object.freeze(RedSheetMaterial)
})();