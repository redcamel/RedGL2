"use strict";
var RedGrid;
(function () {
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedGrid`,
		 description : `
			 RedGrid Instance 생성기
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 size : [
				 {type:'uint'},
				 `격자 크기`
			 ],
			 divisions : [
				 {type:'uint'},
				 `격자 수`
			 ]
		 },
		 example : `
			 var tScene;
			 tScene = RedScene();
			 tScene['grid'] = RedGrid(redGL Instance)
		 `,
		 return : 'RedGrid Instance'
	 }
	 :DOC*/
	RedGrid = function ( redGL, size, divisions, color1, color2 ) {
		if ( !(this instanceof RedGrid) ) return new RedGrid( redGL, size, divisions, color1, color2 );
		if ( !(redGL instanceof RedGL) ) RedGLUtil.throwFunc( 'RedGrid : RedGL Instance만 허용됩니다.', redGL )

		var tGL;
		tGL = redGL.gl;
		RedBaseObject3D['build'].call( this, tGL )
		var interleaveData = []

		size = size || 100;
		divisions = divisions || 100;
		color1 = [1, 1, 1, 0.7];
		color2 = [1, 1, 1, 0.5]

		var center = divisions / 2;
		var step = size / divisions;
		var halfSize = size / 2;

		for ( var i = 0, j = 0, k = -halfSize; i <= divisions; i++ , k += step ) {

			var color = i === center ? color1 : color2;
			interleaveData.push( -halfSize, 0, k );
			interleaveData.push( color[0], color[1], color[2], color[3] )
			interleaveData.push( halfSize, 0, k );
			interleaveData.push( color[0], color[1], color[2], color[3] )
			interleaveData.push( k, 0, -halfSize );
			interleaveData.push( color[0], color[1], color[2], color[3] )
			interleaveData.push( k, 0, halfSize )
			interleaveData.push( color[0], color[1], color[2], color[3] )


		}
		var interleaveBuffer
		interleaveBuffer = RedBuffer(
			redGL,
			'gridInterleaveBuffer_' + divisions,
			RedBuffer.ARRAY_BUFFER,
			new Float32Array( interleaveData ),
			[
				RedInterleaveInfo( 'aVertexPosition', 3 ),
				RedInterleaveInfo( 'aVertexColor', 4 )
			]
		)
		this['geometry'] = RedGeometry( interleaveBuffer );
		this['material'] = RedGridMaterial( redGL );
		/**DOC:
		 {
			 title :`drawMode`,
			 description : `
				 기본값 : gl.LINES
			 `,
			 return : 'gl 상수'
		 }
		 :DOC*/
		this['drawMode'] = tGL.LINES
		this['_UUID'] = RedGL['makeUUID']();

	}
	/**DOC:
	 {
		 copyProto : 'RedBaseContainer'
	 }
	 :DOC*/
	RedGLUtil['copyProto']( RedGrid, RedBaseContainer );
	/**DOC:
	 {
		 copyProto : 'RedBaseObject3D'
	 }
	 :DOC*/
	RedGLUtil['copyProto']( RedGrid, RedBaseObject3D );
	Object.freeze( RedGrid );
})();