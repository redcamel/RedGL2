"use strict";
var RedWaterField;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedWaterField`,
		 description : `
			 RedWaterField Instance 생성기
		 `,
		 return : 'RedWaterField Instance'
	 }
     :DOC*/
    RedWaterField = function (redGL) {
        if (!(this instanceof RedWaterField)) return new RedWaterField(redGL);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedWaterField : RedGL Instance만 허용.', redGL);
        RedBaseObject3D['build'].call(this, redGL.gl);
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`geometry`,
			 description : `geometry`,
			 return : 'RedGeometry'
		 }
         :DOC*/
        this['geometry'] = RedPlane(redGL, 500,500, 50,50);
        this.rotationX = 90
        // this.drawMode = redGL.gl.LINES
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`material`,
			 description : `material`,
			 return : 'RedBaseMaterial 확장 Instance'
		 }
         :DOC*/
        this['material'] = RedWaterFieldMaterial(
            redGL,
            RedBitmapTexture(redGL, '../asset/05_DIFFUSE.jpg',{
                min : redGL.gl.LINEAR,
                max : redGL.gl.LINEAR
                // wrap_s : redGL.gl.MIRRORED_REPEAT,
                // wrap_t : redGL.gl.MIRRORED_REPEAT
            }),
            RedBitmapTexture(redGL, '../asset/05_NORMAL.jpg')
        );
        this['_UUID'] = RedGL.makeUUID();
    };
    RedWaterField.prototype = new RedBaseContainer()
    Object.freeze(RedWaterField);
})();