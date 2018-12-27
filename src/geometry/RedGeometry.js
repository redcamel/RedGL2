"use strict";
var RedGeometry;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedGeometry`,
		 description : `
		     인터리브 버퍼와 인덱스 버퍼로 구성된 정보 구조체.
			 RedGeometry Instance 생성자.
		 `,
		 params : {
			 interleaveBuffer : [
				 {type:'RedBuffer'},
				 `필수`
			 ],
			 indexBuffer : [
				 {type:'RedBuffer'},
				 `필수아님`
			 ]
		 },
		 demo : '../example/RedBuffer.html',
		 example : `
			 RedGeometry(interleaveBuffer,indexBuffer)
		 `,
		 return : 'RedGeometry Instance'
	 }
     :DOC*/
    RedGeometry = function (interleaveBuffer, indexBuffer) {
        if (!(this instanceof RedGeometry)) return new RedGeometry(interleaveBuffer, indexBuffer);
        interleaveBuffer instanceof RedBuffer || RedGLUtil.throwFunc('RedGeometry : interleaveBuffer - RedBuffer Instance만 허용.', interleaveBuffer);
        interleaveBuffer['bufferType'] == RedBuffer.ARRAY_BUFFER || RedGLUtil.throwFunc('RedGeometry : interleaveBuffer - RedBuffer.ARRAY_BUFFER 타입만 허용.', interleaveBuffer);
        if (indexBuffer) {
            interleaveBuffer || RedGLUtil.throwFunc('RedGeometry : indexBuffer는 반드시 interleaveBuffer와 쌍으로 입력되어야함.', indexBuffer);
            indexBuffer instanceof RedBuffer || RedGLUtil.throwFunc('RedGeometry : indexBuffer - RedBuffer Instance만 허용.', indexBuffer);
            indexBuffer['bufferType'] == RedBuffer.ELEMENT_ARRAY_BUFFER || RedGLUtil.throwFunc('RedGeometry : indexBuffer - RedBuffer.ELEMENT_ARRAY_BUFFER 타입만 허용.', indexBuffer);
        }
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`interleaveBuffer`,
			 description : `interleaveBuffer`,
			 return : 'RedBuffer Instance'
		 }
         :DOC*/
        this['interleaveBuffer'] = interleaveBuffer;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`indexBuffer`,
			 description : `indexBuffer`,
			 return : 'RedBuffer Instance'
		 }
         :DOC*/
        this['indexBuffer'] = indexBuffer;
        this['_UUID'] = RedGL.makeUUID();
        // console.log(this);
    };
    RedGeometry.prototype = {
        /**DOC:
         {
		     code : 'METHOD',
			 title :`disposeAllBuffer`,
			 description : `내부 interleaveBuffer, indexBuffer 둘다 dispose`,
			 return : 'void'
		 }
         :DOC*/
        disposeAllBuffer: (function () {
            var k;
            return function () {
                for (k in this) {
                    if (this && this[k] instanceof RedBuffer) this[k].dispose()
                }
            }
        })(),
        /**DOC:
         {
		     code : 'METHOD',
			 title :`disposeBuffer`,
			 description : `입력된키( interleaveBuffer or indexBuffer )에 해당하는 버퍼 dispose`,
			 return : 'void'
		 }
         :DOC*/
        disposeBuffer: function (key) {
            if (this && this[key] instanceof RedBuffer) this[key].dispose()
        }
    };
    Object.freeze(RedGeometry);
})();