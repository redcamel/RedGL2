var gulp = require('gulp');
var uglify = require('gulp-uglify-es').default;
var concat = require('gulp-concat');
var gap = require('gulp-append-prepend');
var stripDebug = require('gulp-strip-debug');
var insert = require('gulp-insert');
var textTransformation = require('gulp-text-simple');
var dt = new Date();
require('date-utils');
var d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');
var fs = require('fs')
var rename = require("gulp-rename");
var name1 = 'recard';
/////////////////////////////////////////////////////////////
var transformString = function (s) {
	var reg = /\/\*\*DOC\:[\s\S]+?\:\DOC\*\//g;
	var list = s.match(reg)
	var dedent = function (callSite, ...args) {
		function format(str) {
			let size = -1;
			return str.replace(/\n(\s+)/g, (m, m1) => {
				if (size < 0)
					size = m1.replace(/\t/g, "    ").length;
				return "\n" + m1.slice(Math.min(m1.length, size));
			});
		}
		if (typeof callSite === "string") return format(callSite);
		if (typeof callSite === "function") return (...args) => format(callSite(...args));
		let output = callSite
			.slice(0, args.length + 1)
			.map((text, i) => (i === 0 ? "" : args[i - 1]) + text)
			.join("");
		return format(output);
	}
	if (list) {
		list.forEach(function (v, index) {
			v = v.replace('/**DOC:', '').trim()
			list[index] = dedent(v.replace(':DOC*/', '').trim()).trim()
		})
	} else {
		list = []
	}
	list.forEach(function (v, index) {
		v = v.replace(/\$\{[\s\S]+\}/g, '')
		var docParser = new Function('v', `return ${v}`);
		var result = docParser()
		if (result) list[index] = result
	})
	var t0 = list.filter(function (a) {
		if (a.hasOwnProperty('extendDoc')) return true
	})
	list = list.filter(function (a) {
		if (!a.hasOwnProperty('extendDoc')) return true
	})

	list.sort(function (a, b) {
		a = a['title'].toLowerCase()
		b = b['title'].toLowerCase()
		if (a > b) return 1
		if (a < b) return -1
		return 0
	})
	return list.concat(t0)
};
var myTransformation = textTransformation(transformString);
gulp.task('make-doc', function () {
	console.log('-------------------------------------------');
	console.log('시작!');
	return gulp.src([
		"src/RedGLUtil.js",
		"src/RedGL.js",

		"src/base/RedBaseContainer.js",
		"src/base/RedBaseLight.js",
		"src/base/RedBaseMaterial.js",
		"src/base/RedBaseObject3D.js",

		"src/geometry/RedBuffer.js",
		"src/geometry/RedGeometry.js",
		'src/geometry/RedInterleaveInfo.js',

		"src/light/RedAmbientLight.js",
		"src/light/RedDirectionalLight.js",
		"src/light/RedPointLight.js",

		"src/loader/JsonModelLoader.js",

		"src/material/RedMaterial.js",
		"src/material/RedColorMaterial.js",
		"src/material/RedColorPhongMaterial.js",
		"src/material/RedEnvironmentMaterial.js",
		"src/material/RedBitmapMaterial.js",
		"src/material/RedPointBitmapMaterial.js",
		"src/material/RedStandardMaterial.js",
		
		"src/material/system/RedGridMaterial.js",
		"src/material/RedPointColorMaterial.js",
		"src/material/system/RedSkyBoxMaterial.js",

		"src/object3D/RedAxis.js",
		"src/object3D/RedGrid.js",
		"src/object3D/RedMesh.js",
		"src/object3D/RedLine.js",
		"src/object3D/RedSkyBox.js",
		"src/object3D/RedSprite3D.js",

		"src/particle/RedPointUnit.js",

		"src/primitives/RedBox.js",
		"src/primitives/RedPlane.js",
		"src/primitives/RedSphere.js",

		"src/program/RedProgram.js",
		"src/program/RedSystemShaderCode.js",
		"src/program/RedShader.js",

		"src/renderer/RedRenderer.js",
		"src/renderer/system/RedRenderDebuger.js",

		"src/resources/RedAtlas.js",
		"src/resources/system/RedAtlasUV.js",
		"src/resources/RedBitmapTexture.js",
		"src/resources/RedAtlasTexture.js",
		"src/resources/RedBitmapCubeTexture.js",

		"src/RedView.js",
		"src/RedWorld.js",
		"src/RedScene.js",
		"src/camera/RedCamera.js"

	])
		.pipe(myTransformation()) // 병합한다.
		.pipe(rename(function (path) {
			path.extname = ".json"
		}))
		.pipe(gulp.dest('redDoc/docs'))
});
gulp.task('combine-js', function () {
	console.log('-------------------------------------------');
	console.log('파일 병합 시작!');
	var name = "RedGL"
	return gulp.src([
		"src/gl-matrix-min.js",
		"src/RedGLUtil.js",
		"src/RedGL.js",

		"src/base/RedBaseContainer.js",
		"src/base/RedBaseLight.js",
		"src/base/RedBaseMaterial.js",
		"src/base/RedBaseObject3D.js",

		"src/geometry/RedBuffer.js",
		"src/geometry/RedGeometry.js",
		'src/geometry/RedInterleaveInfo.js',

		"src/light/RedAmbientLight.js",
		"src/light/RedDirectionalLight.js",
		"src/light/RedPointLight.js",

		"src/loader/JsonModelLoader.js",

		"src/material/RedMaterial.js",
		"src/material/RedColorMaterial.js",
		"src/material/RedColorPhongMaterial.js",
		"src/material/RedEnvironmentMaterial.js",
		"src/material/RedBitmapMaterial.js",
		"src/material/RedPointBitmapMaterial.js",
		"src/material/RedStandardMaterial.js",
		
		"src/material/system/RedGridMaterial.js",
		"src/material/RedPointColorMaterial.js",
		"src/material/system/RedSkyBoxMaterial.js",

		"src/object3D/RedAxis.js",
		"src/object3D/RedGrid.js",
		"src/object3D/RedMesh.js",
		"src/object3D/RedLine.js",
		"src/object3D/RedSkyBox.js",
		"src/object3D/RedSprite3D.js",

		"src/particle/RedPointUnit.js",

		"src/primitives/RedBox.js",
		"src/primitives/RedPlane.js",
		"src/primitives/RedSphere.js",

		"src/program/RedProgram.js",
		"src/program/RedSystemShaderCode.js",
		"src/program/RedShader.js",

		"src/renderer/RedRenderer.js",
		"src/renderer/system/RedRenderDebuger.js",

		"src/resources/RedAtlas.js",
		"src/resources/system/RedAtlasUV.js",
		"src/resources/RedBitmapTexture.js",
		"src/resources/RedAtlasTexture.js",
		"src/resources/RedBitmapCubeTexture.js",

		"src/RedView.js",
		"src/RedWorld.js",
		"src/RedScene.js",
		"src/camera/RedCamera.js"
	])
		.pipe(concat(name + '.js')) // 병합한다.
		.pipe(gulp.dest('release')) //
		.pipe(concat(name + '.min.js')) // 병합한다.
		//.pipe(stripComment())
		// .pipe(stripDebug())
		// .pipe(uglify({
		// 	// mangle: true // 알파벳 한 글자 압축 과정 설정 
		// }))
		.pipe(insert.append("console.log('" + 'RedGL' + " Release. last update(" + d + ")'" + ");"))
		.pipe(gulp.dest('release'));
});
gulp.task('default', ['make-doc', 'combine-js'], function () {
	console.log('-------------------------------------------');
	console.log('성공!');
	console.log('-------------------------------------------');
});