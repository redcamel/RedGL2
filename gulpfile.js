var gulp = require('gulp');
var fs = require('fs');
var uglify = require('gulp-uglify-es').default;
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var insert = require('gulp-insert');
var textTransformation = require('gulp-text-simple');
var dt = new Date();
require('date-utils');
var d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');
var fs = require('fs')
var rename = require("gulp-rename");
var replace = require('gulp-string-replace');
var name = "RedGL"
/////////////////////////////////////////////////////////////
var transformString = function (s) {
	var reg = /\/\*\*DOC\:[\s\S]+?\:\DOC\*\//g;
	var list = s.match(reg)
	var dedent = function (callSite, ...args) {
		function format(str) {
			let size = -1;
			return str.replace(/\n(\s+)/g, (m, m1) => {
				if ( size < 0 )
					size = m1.replace(/\t/g, "    ").length;
				return "\n" + m1.slice(Math.min(m1.length, size));
			});
		}

		if ( typeof callSite === "string" ) return format(callSite);
		if ( typeof callSite === "function" ) return (...args) => format(callSite(...args));
		let output = callSite
			.slice(0, args.length + 1)
			.map((text, i) => (i === 0 ? "" : args[i - 1]) + text)
			.join("");
		return format(output);
	}
	if ( list ) {
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
		if ( result ) list[index] = result
	})

	list.sort(function (a, b) {
		a = a['title'].toLowerCase()
		b = b['title'].toLowerCase()
		if ( a > b ) return 1
		if ( a < b ) return -1
		return 0
	})
	return list
};
var myTransformation = textTransformation(transformString);
gulp.task('make-doc-list', function () {
	console.log('-------------------------------------------');
	console.log('시작!');
	function getFiles(dir, files_) {
		files_ = files_ || [];
		var files = fs.readdirSync(dir);
		for ( var i in files ) {
			var name = dir + '/' + files[i];
			if ( fs.statSync(name).isDirectory() ) {
				getFiles(name, files_);
			} else {
				files_.push(name);
			}
		}
		return files_;
	}

	var list = getFiles('src');
	list.forEach(function (v,index) {
		v = v.replace(/src\//g, '')
		list[index] = v.replace(/\.js/g, '')
		list[index] = list[index].split('/')
	})
	list = JSON.stringify(list);
	console.log(list)
	var file = 'redDoc/docs/list.json';
	fs.open(file, 'w', function (err, fd) {
		if ( err ) throw err;
		console.log('file open complete');
	});
	fs.writeFile('redDoc/docs/list.json', list, 'utf8', function (error) { console.log('write end') });
});
gulp.task('make-doc', function () {
	console.log('-------------------------------------------');
	console.log('시작!');
	return gulp.src([
		"src/**"
	])
		.pipe(myTransformation()) // 병합한다.
		.pipe(rename(function (path) {
			console.log(path)
			if ( path.extname == '' ) {
			}
			else path.extname = ".json"
		}))
		.pipe(gulp.dest('redDoc/docs'))
});
gulp.task('combine-js', function () {
	gulp.src([
		"src/gl-matrix-min.js",
		"src/base/RedDefinePropertyInfo.js",
		"src/detect/RedGLDetect.js",
		"src/RedGLUtil.js",
		"src/RedGL.js",
		// "src/RedXR.js",
		//
		"src/base/RedBaseController.js",
        "src/loader/RedImageLoader.js",
		"src/base/RedBaseTexture.js",
		"src/base/RedBaseObject3D.js",
		"src/base/RedBaseContainer.js",
		"src/base/RedBaseLight.js",
		//
		"src/frameBuffer/RedFrameBuffer.js",
		//
		"src/geometry/RedBuffer.js",
		"src/geometry/RedGeometry.js",
		'src/geometry/RedInterleaveInfo.js',
		//
		"src/base/RedBaseMaterial.js",
		//
		'src/resources/system/RedTextureOptionChecker.js',
		"src/resources/RedBitmapTexture.js",
		"src/resources/RedVideoTexture.js",
		"src/resources/RedDDSTexture.js",
		"src/resources/RedBitmapCubeTexture.js",
		// 재질
		"src/material/RedColorMaterial.js",
		"src/material/RedColorPhongMaterial.js",
		"src/material/RedColorPhongTextureMaterial.js",
		"src/material/RedEnvironmentMaterial.js",
		"src/material/RedBitmapMaterial.js",
		"src/material/RedParticleColorMaterial.js",
		"src/material/RedParticleBitmapMaterial.js",
		"src/material/RedPointColorMaterial.js",
		"src/material/RedPointBitmapMaterial.js",
		"src/material/RedSheetMaterial.js",
		"src/material/RedStandardMaterial.js",
		"src/material/RedVideoMaterial.js",
        "src/material/RedPBRMaterial.js",
		//
		"src/light/RedAmbientLight.js",
		"src/light/RedDirectionalLight.js",
		"src/light/RedPointLight.js",
		//
		"src/loader/JsonModelLoader.js",
		"src/loader/obj/RedMTLLoader.js",
		"src/loader/obj/RedOBJLoader.js",
        "src/loader/3ds/Red3DSLoader.js",
        "src/loader/dae/RedDAELoader.js",
        "src/loader/gltf/RedGLTFLoader.js",
		//
		"src/object3D/RedAxis.js",
		"src/object3D/RedGrid.js",
		"src/object3D/RedMesh.js",
		"src/object3D/RedLine.js",
		"src/object3D/RedSkyBox.js",
		"src/object3D/RedSprite3D.js",
		//
		"src/particle/RedPointUnit.js",
		"src/particle/RedParticleUnit.js",
		"src/particle/RedParticleEmitter.js",
		"src/primitives/RedBox.js",
		"src/primitives/RedPlane.js",
		"src/primitives/RedSphere.js",
		//
		"src/program/RedProgram.js",
		"src/program/RedSystemShaderCode.js",
		"src/program/RedShader.js",
		"src/renderer/RedRenderer.js",
		"src/renderer/system/RedRenderDebuger.js",
		"src/renderer/system/RedSystemUniformUpdater.js",
		//
		"src/RedView.js",
		"src/RedWorld.js",
		"src/RedScene.js",
		//
		"src/camera/RedCamera.js",
		"src/camera/RedBasicController.js",
		"src/camera/RedObitController.js",
		// 시스템 재질
		"src/material/system/RedGridMaterial.js",
		"src/material/system/RedSkyBoxMaterial.js",
		"src/material/system/RedDirectionalShadowMaterial.js",
		"src/material/system/RedPostEffectMaterial.js",
		// 쉐도우
		"src/shadow/RedDirectionalShadow.js",
		"src/shadow/RedShadowManager.js",
		// 텍스트
		"src/text/RedText.js",
		//이펙트
		"src/postEffect/RedPostEffectManager.js",
		"src/base/RedBasePostEffect.js",
		"src/postEffect/bloom/RedPostEffect_Bloom.js",
		"src/postEffect/bloom/RedPostEffect_BloomThreshold.js",
		"src/postEffect/blur/RedPostEffect_Blur.js",
		"src/postEffect/blur/RedPostEffect_BlurX.js",
		"src/postEffect/blur/RedPostEffect_BlurY.js",
		"src/postEffect/blur/RedPostEffect_GaussianBlur.js",
		"src/postEffect/blur/RedPostEffect_ZoomBlur.js",
		"src/postEffect/adjustments/RedPostEffect_BrightnessContrast.js",
		"src/postEffect/adjustments/RedPostEffect_Threshold.js",
		"src/postEffect/adjustments/RedPostEffect_Invert.js",
		"src/postEffect/adjustments/RedPostEffect_Gray.js",
		"src/postEffect/adjustments/RedPostEffect_HueSaturation.js",
		"src/postEffect/pixelate/RedPostEffect_HalfTone.js",
		"src/postEffect/pixelate/RedPostEffect_Pixelize.js",
		"src/postEffect/RedPostEffect_Convolution.js",
		"src/postEffect/dof/RedPostEffect_DoF.js",
		"src/postEffect/dof/RedPostEffect_DoF_DepthMaterial.js",
		"src/postEffect/RedPostEffect_Film.js",
		"src/postEffect/RedPostEffect_Vignetting.js",
		"src/postEffect/RedPostEffect_Vignetting.js",
		"src/postEffect/antialiasing/RedPostEffect_FXAA.js"
	])
		.pipe(concat(name + '.min.js')) // 병합한다.
		// .pipe(stripDebug())
		// .pipe(uglify(
		// 	{
		// 		output: {
		// 			comments: /^!|@preserve|@license|@cc_on/i
		// 		}
		// 	}
		// ))
		.pipe(replace(/\n\s{2,}/g, '\n'))
		.pipe(gulp.dest('release'))
		.pipe(insert.append("console.log('" + 'RedGL' + " Release. last update(" + d + ")'" + ");"))
		.pipe(gulp.dest('release'))
	console.log('-------------------------------------------');
	console.log('파일 병합 시작!');
});
gulp.task('default', ['make-doc-list','make-doc', 'combine-js'], function () {
	console.log('-------------------------------------------');
	console.log('성공!');
	console.log('-------------------------------------------');
});