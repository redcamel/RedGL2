"use strict";
var RedGeometry;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedGeometry`,
		 description : `
			 RedGeometry Instance 생성자
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
		 example : `
			 RedGeometry(interleaveBuffer,indexBuffer)
		 `,
		 return : 'RedGeometry Instance'
	 }
	 :DOC*/
	RedGeometry = function ( interleaveBuffer, indexBuffer ) {
		if ( !(this instanceof RedGeometry) ) return new RedGeometry( interleaveBuffer, indexBuffer )
		if ( !(interleaveBuffer instanceof RedBuffer) ) RedGLUtil.throwFunc( 'RedGeometry : interleaveBuffer - RedBuffer Instance만 허용.', interleaveBuffer )
		if ( !(interleaveBuffer['bufferType'] == RedBuffer.ARRAY_BUFFER) ) RedGLUtil.throwFunc( 'RedGeometry : interleaveBuffer - RedBuffer.ARRAY_BUFFER 타입만 허용.', interleaveBuffer )
		if ( indexBuffer ) {
			if ( !interleaveBuffer ) RedGLUtil.throwFunc( 'RedGeometry : indexBuffer는 반드시 interleaveBuffer와 쌍으로 입력되어야함.', indexBuffer )
			if ( !(indexBuffer instanceof RedBuffer) ) RedGLUtil.throwFunc( 'RedGeometry : indexBuffer - RedBuffer Instance만 허용.', indexBuffer )
			if ( !(indexBuffer['bufferType'] == RedBuffer.ELEMENT_ARRAY_BUFFER) ) RedGLUtil.throwFunc( 'RedGeometry : indexBuffer - RedBuffer.ELEMENT_ARRAY_BUFFER 타입만 허용.', indexBuffer )
		}
		/**DOC:
		 {
			 title :`interleaveBuffer`,
			 return : 'RedBuffer Instance'
		 }
		 :DOC*/
		this['interleaveBuffer'] = interleaveBuffer
		/**DOC:
		 {
			 title :`indexBuffer`,
			 return : 'RedBuffer Instance'
		 }
		 :DOC*/
		this['indexBuffer'] = indexBuffer
		this['_UUID'] = RedGL['makeUUID']();
		// Object.freeze(this)
	}
	Object.freeze( RedGeometry );
})()