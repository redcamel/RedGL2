/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.6.13 11:7
 */

"use strict";
var RedPointCloud;
(function () {
	/*DOC:
	 {
		 constructorYn : true,
		 title :`RedPointCloud`,
		 description : `
			 포인트 클라우드 기저층
		 `,
		 return : 'RedPointCloud Instance'
	 }
	 :DOC*/
	RedPointCloud = function () {
	};
	RedPointCloud.prototype = new RedBaseContainer();
	/*DOC:
	 {
		 code : 'METHOD',
		 title :`update`,
		 description : `인터리브 정보 업데이터`,
		 params : {
			interleaveData : [
				{ type : 'Array' },
				'인터리브 데이터'
			]
		 },
		 return : 'void'
	 }
	 :DOC*/
	RedPointCloud.prototype['update'] = function (interleaveData) {
		this['_geometry']['interleaveBuffer'].upload(new Float32Array(interleaveData));
	};
	Object.defineProperty(RedPointCloud.prototype, 'geometry', {
		get: function () {
			return this['_geometry'];
		},
		set: function (v) {
			if (this['_geometry']) RedGLUtil.throwFunc('RedPointCloud : geometry - 임의 설정을 허용하지 않음', '입력값 : ' + v);
			this['_geometry'] = v;
		}
	});
	Object.freeze(RedPointCloud);
})();