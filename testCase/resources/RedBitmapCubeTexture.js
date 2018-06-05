"use strict";
var tRedGL
RedGL(document.createElement('canvas'), function (v) {
	var testSrcList;
	tRedGL = this;
	testSrcList = ['../../asset/alphaTest.png', '../../asset/alphaTest.png', '../../asset/alphaTest.png', '../../asset/alphaTest.png', '../../asset/alphaTest.png', '../../asset/alphaTest.png']
	redSuite(
		"RedBitmapCubeTexture Test",
		redGroup(
			"생성 확인",
			redTest("생성확인", function (unit, title) {
				var t0;
				t0 = RedBitmapCubeTexture(tRedGL, testSrcList)
				unit.run(t0 instanceof RedBitmapCubeTexture)
			}, true)
		),
		redGroup(
			"srcList",
			redTest("srcList : 미입력", function (unit, title) {
				try {
					RedBitmapCubeTexture(tRedGL)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("srcList : 숫자입력", function (unit, title) {
				try {
					RedBitmapCubeTexture(tRedGL, 1)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("srcList : 오브젝트 입력", function (unit, title) {
				try {
					RedBitmapCubeTexture(tRedGL, {})
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("srcList : length가 6이 아닐떄", function (unit, title) {
				try {
					RedBitmapCubeTexture(tRedGL, ["src1", "src2", "src3", "src4", "src5"])
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"option - min",
			redTest("option : 미입력", function (unit, title) {
				try {
					RedBitmapCubeTexture(tRedGL, testSrcList)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("option : min - LINEAR", function (unit, title) {
				var t0 = RedBitmapCubeTexture(
					tRedGL,
					testSrcList,
					{
						min: tRedGL.gl.LINEAR
					},
					function () {
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
						var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MIN_FILTER)
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
						console.log(t1)
						unit.run(t1)
					}
				)
			}, tRedGL.gl.LINEAR),
			redTest("option : min - NEAREST", function (unit, title) {
				var t0 = RedBitmapCubeTexture(
					tRedGL,
					testSrcList,
					{
						min: tRedGL.gl.NEAREST
					},
					function () {
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
						var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MIN_FILTER)
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
						console.log(t1)
						unit.run(t1)
					}
				)
			}, tRedGL.gl.NEAREST),
			redTest("option : min - NEAREST_MIPMAP_NEAREST", function (unit, title) {
				var t0 = RedBitmapCubeTexture(
					tRedGL,
					testSrcList,
					{
						min: tRedGL.gl.NEAREST_MIPMAP_NEAREST
					},
					function () {
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
						var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MIN_FILTER)
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
						console.log(t1)
						unit.run(t1)
					}
				)
			}, tRedGL.gl.NEAREST_MIPMAP_NEAREST),
			redTest("option : min - LINEAR_MIPMAP_NEAREST", function (unit, title) {
				var t0 = RedBitmapCubeTexture(
					tRedGL,
					testSrcList,
					{
						min: tRedGL.gl.LINEAR_MIPMAP_NEAREST
					},
					function () {
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
						var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MIN_FILTER)
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
						console.log(t1)
						unit.run(t1)
					}
				)
			}, tRedGL.gl.LINEAR_MIPMAP_NEAREST),
			redTest("option : min - NEAREST_MIPMAP_LINEAR(default)", function (unit, title) {
				var t0 = RedBitmapCubeTexture(
					tRedGL,
					testSrcList,
					{
						min: tRedGL.gl.NEAREST_MIPMAP_LINEAR
					},
					function () {
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
						var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MIN_FILTER)
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
						console.log(t1)
						unit.run(t1)
					}
				)
			}, tRedGL.gl.NEAREST_MIPMAP_LINEAR),
			redTest("option : min - LINEAR_MIPMAP_LINEAR", function (unit, title) {
				var t0 = RedBitmapCubeTexture(
					tRedGL,
					testSrcList,
					{
						min: tRedGL.gl.LINEAR_MIPMAP_LINEAR
					},
					function () {
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
						var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MIN_FILTER)
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
						console.log(t1)
						unit.run(t1)
					}
				)
			}, tRedGL.gl.LINEAR_MIPMAP_LINEAR),
			redTest("option : min - 허용되지않는값 입력", function (unit, title) {
				try {
					RedBitmapCubeTexture(
						tRedGL,
						testSrcList,
						{
							min: 'test'
						}
					)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"option - mag",
			redTest("option : 미입력", function (unit, title) {
				try {
					RedBitmapCubeTexture(tRedGL, testSrcList)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("option : mag - LINEAR(default)", function (unit, title) {
				var t0 = RedBitmapCubeTexture(
					tRedGL,
					testSrcList,
					{
						mag: tRedGL.gl.LINEAR
					},
					function () {
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
						var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MAG_FILTER)
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
						console.log(t1)
						unit.run(t1)
					}
				)
			}, tRedGL.gl.LINEAR),
			redTest("option : mag - NEAREST", function (unit, title) {
				var t0 = RedBitmapCubeTexture(
					tRedGL,
					testSrcList,
					{
						mag: tRedGL.gl.NEAREST
					},
					function () {
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
						var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_MAG_FILTER)
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
						console.log(t1)
						unit.run(t1)
					}
				)
			}, tRedGL.gl.NEAREST),
			redTest("option : mag - NEAREST_MIPMAP_NEAREST (이놈은 허용안됨)", function (unit, title) {
				try {
					RedBitmapCubeTexture(
						tRedGL,
						testSrcList,
						{
							mag: tRedGL.gl.NEAREST_MIPMAP_NEAREST
						}
					)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("option : mag - LINEAR_MIPMAP_NEAREST (이놈은 허용안됨)", function (unit, title) {
				try {
					RedBitmapCubeTexture(
						tRedGL,
						testSrcList,
						{
							mag: tRedGL.gl.LINEAR_MIPMAP_NEAREST
						}
					)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("option : mag - NEAREST_MIPMAP_LINEAR (이놈은 허용안됨)", function (unit, title) {
				try {
					RedBitmapCubeTexture(
						tRedGL,
						testSrcList,
						{
							mag: tRedGL.gl.NEAREST_MIPMAP_LINEAR
						}
					)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("option : mag - LINEAR_MIPMAP_LINEAR (이놈은 허용안됨)", function (unit, title) {
				try {
					RedBitmapCubeTexture(
						tRedGL,
						testSrcList,
						{
							mag: tRedGL.gl.LINEAR_MIPMAP_LINEAR
						}
					)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("option : mag - 허용되지않는값 입력", function (unit, title) {
				try {
					RedBitmapCubeTexture(
						tRedGL,
						testSrcList,
						{
							mag: 'test'
						}
					)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"option - wrap_s",
			redTest("option : 미입력", function (unit, title) {
				try {
					RedBitmapCubeTexture(tRedGL, testSrcList)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("option : wrap_s - REPEAT(default)", function (unit, title) {
				var t0 = RedBitmapCubeTexture(
					tRedGL,
					testSrcList,
					{
						wrap_s: tRedGL.gl.REPEAT
					},
					function () {
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
						var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_WRAP_S)
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
						console.log(t1)
						unit.run(t1)
					}
				)
			}, tRedGL.gl.REPEAT),
			redTest("option : wrap_s - CLAMP_TO_EDGE", function (unit, title) {
				var t0 = RedBitmapCubeTexture(
					tRedGL,
					testSrcList,
					{
						wrap_s: tRedGL.gl.CLAMP_TO_EDGE
					},
					function () {
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
						var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_WRAP_S)
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
						console.log(t1)
						unit.run(t1)
					}
				)
			}, tRedGL.gl.CLAMP_TO_EDGE),
			redTest("option : wrap_s - MIRRORED_REPEAT", function (unit, title) {
				var t0 = RedBitmapCubeTexture(
					tRedGL,
					testSrcList,
					{
						wrap_s: tRedGL.gl.MIRRORED_REPEAT
					},
					function () {
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
						var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_WRAP_S)
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
						console.log(t1)
						unit.run(t1)
					}
				)
			}, tRedGL.gl.MIRRORED_REPEAT),
			redTest("option : wrap_s - 허용되지않는값 입력", function (unit, title) {
				try {
					RedBitmapCubeTexture(
						tRedGL,
						testSrcList,
						{
							wrap_s: 'test'
						}
					)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"option - wrap_t",
			redTest("option : 미입력", function (unit, title) {
				try {
					RedBitmapCubeTexture(tRedGL, testSrcList)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("option : wrap_t - REPEAT(default)", function (unit, title) {
				var t0 = RedBitmapCubeTexture(
					tRedGL,
					testSrcList,
					{
						wrap_t: tRedGL.gl.REPEAT
					},
					function () {
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
						var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_WRAP_T)
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
						console.log(t1)
						unit.run(t1)
					}
				)
			}, tRedGL.gl.REPEAT),
			redTest("option : wrap_t - CLAMP_TO_EDGE", function (unit, title) {
				var t0 = RedBitmapCubeTexture(
					tRedGL,
					testSrcList,
					{
						wrap_t: tRedGL.gl.CLAMP_TO_EDGE
					},
					function () {
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
						var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_WRAP_T)
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
						console.log(t1)
						unit.run(t1)
					}
				)
			}, tRedGL.gl.CLAMP_TO_EDGE),
			redTest("option : wrap_t - MIRRORED_REPEAT", function (unit, title) {
				var t0 = RedBitmapCubeTexture(
					tRedGL,
					testSrcList,
					{
						wrap_t: tRedGL.gl.MIRRORED_REPEAT
					},
					function () {
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, t0['webglTexture']);
						var t1 = tRedGL.gl.getTexParameter(tRedGL.gl.TEXTURE_CUBE_MAP, tRedGL.gl.TEXTURE_WRAP_T)
						tRedGL.gl.bindTexture(tRedGL.gl.TEXTURE_CUBE_MAP, null);
						console.log(t1)
						unit.run(t1)
					}
				)
			}, tRedGL.gl.MIRRORED_REPEAT),
			redTest("option : wrap_t - 허용되지않는값 입력", function (unit, title) {
				try {
					RedBitmapCubeTexture(
						tRedGL,
						testSrcList,
						{
							wrap_t: 'test'
						}
					)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"callback",
			redTest("callback : 미입력", function (unit, title) {
				try {
					RedBitmapCubeTexture(tRedGL, testSrcList)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("callback : 성공테스트", function (unit, title) {
				RedBitmapCubeTexture(tRedGL, testSrcList, null, function (v) {
					unit.run(v)
				})
			}, true),
			redTest("callback : 실패테스트", function (unit, title) {
				RedBitmapCubeTexture(tRedGL, ["src1", "src2", "src3", "src4", "src5", "src6"], null, function (v) {
					unit.run(v)
				})
			}, false)
		)
	)
})
