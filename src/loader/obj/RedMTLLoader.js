"use strict";
var RedMTLLoader;
(function () {
	var parser;
	var RedMTLResult;
	RedMTLResult = function () {
	}
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedMTLResult`,
		 description : `
			 OBJ 로딩시 mtl로딩이 필요하면 자동으로 호출됨
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 path : [
				 {type:'String'}
			 ],
			 fileName : [
				 {type:'String'}
			 ],
			 callback : [
				 {type:'Function'}
			 ]
		 },
		 return : 'void'
	 }
	 :DOC*/
	RedMTLLoader = function (redGL, path, fileName, callback) {
		if ( (!(this instanceof RedMTLLoader)) ) return new RedMTLLoader(redGL, path, fileName, callback)
		console.log('~~~~~~~~~~~')
		var self = this;
		var request = new XMLHttpRequest();
		request.open("GET", path + fileName, true);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
		request.onreadystatechange = function () {
			if ( request.readyState == 4 ) {
				self['complete'] = true
				if ( request.status == 200 ) {
					var data;
					data = parser(self, redGL, request.responseText)
					self['parseData'] = data
				} else {
					self['parseData'] = new RedMTLResult()
				}
				if ( callback ) callback(self['parseData'])
			}
		}
		request.addEventListener('error', function (e) {
			console.log('에럿', e)
		})
		request.send();
		this['path'] = path;
		this['fileName'] = fileName;
		this['complete'] = false;
		this['parseData'] = null;
	}
	parser = function (target, redGL, data) {
		var info, resultInfo;
		var lines;
		var reg_newmtl, reg_Ns, reg_Ka, reg_Kd, reg_Ks, reg_Ni, reg_d, reg_illum, reg_map_Kd, reg_map_Ns, reg_map_Ks, red_map_bump;
		var currentMaterialInfo;
		info = {};
		reg_newmtl = /^(newmtl )/;
		reg_Ns = /^(Ns )/; // uShininess
		reg_Ka = /^(Ka )/;
		reg_Kd = /^(Kd )/; // 컬러
		reg_Ks = /^(Ks )/;
		reg_Ni = /^(Ni )/; // 굴절률
		reg_d = /^(d )/;
		reg_illum = /^(illum )/;
		reg_map_Kd = /^(map_Kd )/;
		reg_map_Ks = /^(map_Ks )/;
		reg_map_Ns = /^(map_Ns )/;
		red_map_bump = /^(map_bump )/;
		data = data.replace(/^\#[\s\S]+?\n/g, '');
		lines = data.split("\n");
		// 재질 정보 정의
		lines.forEach(function (line) {
			if ( reg_newmtl.test(line) ) {
				// console.log(line)
				var tName;
				tName = line.replace('newmtl ', '').trim();
				currentMaterialInfo = {
					name: tName
				};
				info[tName] = currentMaterialInfo;
			}

			// 암비안트
			else if ( reg_Ka.test(line) ) currentMaterialInfo['Ka'] = line.replace('Ka ', '').split(' ')
			// 디퓨즈
			else if ( reg_Kd.test(line) ) currentMaterialInfo['Kd'] = line.replace('Kd ', '').split(' ')
			// 스페큘러
			else if ( reg_Ks.test(line) ) currentMaterialInfo['Ks'] = line.replace('Ks ', '').split(' ')
			//uShininess
			else if ( reg_Ns.test(line) ) currentMaterialInfo['Ns'] = +line.replace('Ns ', '')
			// 굴절률
			else if ( reg_Ni.test(line) ) currentMaterialInfo['Ni'] = +line.replace('Ni ', '')
			// 디졸브라는데 뭐래 -_-
			else if ( reg_d.test(line) ) currentMaterialInfo['d'] = +line.replace('d ', '')
			else if ( reg_illum.test(line) ) {
				// illum illum_#
				// The "illum" statement specifies the illumination model to use in the
				// material.  Illumination models are mathematical equations that represent
				// various material lighting and shading effects.
				// "illum_#"can be a number from 0 to 10.  The illumination models are
				// summarized below; for complete descriptions see "Illumination models" on
				// page 5-30.
				currentMaterialInfo['illum'] = +line.replace('illum ', '')
				switch ( currentMaterialInfo['illum'] ) {
					case 0:
						// 0		Color on and Ambient off
						break
					case 1:
						// 1		Color on and Ambient on
						break
					case 2:
						// 2		Highlight on
						break
					case 3:
						// 3		Reflection on and Ray trace on
						break
					case 4:
						// 4		Transparency: Glass on
						break
					case 5:
						// 5		Reflection: Fresnel on and Ray trace on
						break
					case 6:
						// 6		Transparency: Refraction on
						break
					case 7:
						// 7		Transparency: Refraction on
						break
					case 8:
						// 8		Reflection on and Ray trace off
						break
					case 9:
						// 9		Transparency: Glass on
						break
					case 10:
						// 10		Casts shadows onto invisible surfaces
						break
				}
			}
			// map_Ka lemur.tga           # the ambient texture map
			// map_Kd lemur.tga           # the diffuse texture map (most of the time, it will
			//                            # be the same as the ambient texture map)
			// map_Ks lemur.tga           # specular color texture map
			// map_Ns lemur_spec.tga      # specular highlight component
			// map_d lemur_alpha.tga      # the alpha texture map
			// map_bump lemur_bump.tga    # some implementations use 'map_bump' instead of 'bump' below
			else if ( reg_map_Kd.test(line) ) currentMaterialInfo['map_Kd'] = target['path'] + line.replace('map_Kd ', '')
			else if ( reg_map_Ns.test(line) ) currentMaterialInfo['map_Ns'] = target['path'] + line.replace('map_Ns ', '')
			// else if (reg_map_Ks.test(line)) currentMaterialInfo['map_Ks'] = target['path'] + line.replace('map_Ks ', '')
			else if ( red_map_bump.test(line) ) currentMaterialInfo['map_bump'] = target['path'] + (line.replace('map_bump ', '').split(' ')[2])
		})
		resultInfo = new RedMTLResult()
		for ( var k in info ) {
			resultInfo[k] = info[k]
		}
		console.log(resultInfo)
		return resultInfo
	}
	Object.freeze(RedMTLLoader)
})()