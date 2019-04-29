/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

"use strict";
var Red3DSLoader;
(function () {
    var NULL_CHUNK = 0x0000;
    var M3DMAGIC = 0x4D4D;
    var SMAGIC = 0x2D2D;
    var LMAGIC = 0x2D3D;
    var MLIBMAGIC = 0x3DAA;
    var MATMAGIC = 0x3DFF;
    var CMAGIC = 0xC23D;
    var M3D_VERSION = 0x0002;
    var M3D_KFVERSION = 0x0005;
    var COLOR_F = 0x0010;
    var COLOR_24 = 0x0011;
    var LIN_COLOR_24 = 0x0012;
    var LIN_COLOR_F = 0x0013;
    var INT_PERCENTAGE = 0x0030;
    var FLOAT_PERCENTAGE = 0x0031;
    var MDATA = 0x3D3D;
    var MESH_VERSION = 0x3D3E;
    var MASTER_SCALE = 0x0100;
    var LO_SHADOW_BIAS = 0x1400;
    var HI_SHADOW_BIAS = 0x1410;
    var SHADOW_MAP_SIZE = 0x1420;
    var SHADOW_SAMPLES = 0x1430;
    var SHADOW_RANGE = 0x1440;
    var SHADOW_FILTER = 0x1450;
    var RAY_BIAS = 0x1460;
    var O_CONSTS = 0x1500;
    var AMBIENT_LIGHT = 0x2100;
    var BIT_MAP = 0x1100;
    var SOLID_BGND = 0x1200;
    var V_GRADIENT = 0x1300;
    var USE_BIT_MAP = 0x1101;
    var USE_SOLID_BGND = 0x1201;
    var USE_V_GRADIENT = 0x1301;
    var FOG = 0x2200;
    var FOG_BGND = 0x2210;
    var LAYER_FOG = 0x2302;
    var DISTANCE_CUE = 0x2300;
    var DCUE_BGND = 0x2310;
    var USE_FOG = 0x2201;
    var USE_LAYER_FOG = 0x2303;
    var USE_DISTANCE_CUE = 0x2301;
    var MAT_ENTRY = 0xAFFF;
    var MAT_NAME = 0xA000;
    var MAT_AMBIENT = 0xA010;
    var MAT_DIFFUSE = 0xA020;
    var MAT_SPECULAR = 0xA030;
    var MAT_SHININESS = 0xA040;
    var MAT_SHIN2PCT = 0xA041;
    var MAT_TRANSPARENCY = 0xA050;
    var MAT_XPFALL = 0xA052;
    var MAT_USE_XPFALL = 0xA240;
    var MAT_REFBLUR = 0xA053;
    var MAT_SHADING = 0xA100;
    var MAT_USE_REFBLUR = 0xA250;
    var MAT_SELF_ILLUM = 0xA084;
    var MAT_TWO_SIDE = 0xA081;
    var MAT_DECAL = 0xA082;
    var MAT_ADDITIVE = 0xA083;
    var MAT_WIRE = 0xA085;
    var MAT_FACEMAP = 0xA088;
    var MAT_TRANSFALLOFF_IN = 0xA08A;
    var MAT_PHONGSOFT = 0xA08C;
    var MAT_WIREABS = 0xA08E;
    var MAT_WIRE_SIZE = 0xA087;
    var MAT_TEXMAP = 0xA200;
    var MAT_SXP_TEXT_DATA = 0xA320;
    var MAT_TEXMASK = 0xA33E;
    var MAT_SXP_TEXTMASK_DATA = 0xA32A;
    var MAT_TEX2MAP = 0xA33A;
    var MAT_SXP_TEXT2_DATA = 0xA321;
    var MAT_TEX2MASK = 0xA340;
    var MAT_SXP_TEXT2MASK_DATA = 0xA32C;
    var MAT_OPACMAP = 0xA210;
    var MAT_SXP_OPAC_DATA = 0xA322;
    var MAT_OPACMASK = 0xA342;
    var MAT_SXP_OPACMASK_DATA = 0xA32E;
    var MAT_BUMPMAP = 0xA230;
    var MAT_SXP_BUMP_DATA = 0xA324;
    var MAT_BUMPMASK = 0xA344;
    var MAT_SXP_BUMPMASK_DATA = 0xA330;
    var MAT_SPECMAP = 0xA204;
    var MAT_SXP_SPEC_DATA = 0xA325;
    var MAT_SPECMASK = 0xA348;
    var MAT_SXP_SPECMASK_DATA = 0xA332;
    var MAT_SHINMAP = 0xA33C;
    var MAT_SXP_SHIN_DATA = 0xA326;
    var MAT_SHINMASK = 0xA346;
    var MAT_SXP_SHINMASK_DATA = 0xA334;
    var MAT_SELFIMAP = 0xA33D;
    var MAT_SXP_SELFI_DATA = 0xA328;
    var MAT_SELFIMASK = 0xA34A;
    var MAT_SXP_SELFIMASK_DATA = 0xA336;
    var MAT_REFLMAP = 0xA220;
    var MAT_REFLMASK = 0xA34C;
    var MAT_SXP_REFLMASK_DATA = 0xA338;
    var MAT_ACUBIC = 0xA310;
    var MAT_MAPNAME = 0xA300;
    var MAT_MAP_TILING = 0xA351;
    var MAT_MAP_TEXBLUR = 0xA353;
    var MAT_MAP_USCALE = 0xA354;
    var MAT_MAP_VSCALE = 0xA356;
    var MAT_MAP_UOFFSET = 0xA358;
    var MAT_MAP_VOFFSET = 0xA35A;
    var MAT_MAP_ANG = 0xA35C;
    var MAT_MAP_COL1 = 0xA360;
    var MAT_MAP_COL2 = 0xA362;
    var MAT_MAP_RCOL = 0xA364;
    var MAT_MAP_GCOL = 0xA366;
    var MAT_MAP_BCOL = 0xA368;
    var NAMED_OBJECT = 0x4000;
    var N_DIRECT_LIGHT = 0x4600;
    var DL_OFF = 0x4620;
    var DL_OUTER_RANGE = 0x465A;
    var DL_INNER_RANGE = 0x4659;
    var DL_MULTIPLIER = 0x465B;
    var DL_EXCLUDE = 0x4654;
    var DL_ATTENUATE = 0x4625;
    var DL_SPOTLIGHT = 0x4610;
    var DL_SPOT_ROLL = 0x4656;
    var DL_SHADOWED = 0x4630;
    var DL_LOCAL_SHADOW2 = 0x4641;
    var DL_SEE_CONE = 0x4650;
    var DL_SPOT_RECTANGULAR = 0x4651;
    var DL_SPOT_ASPECT = 0x4657;
    var DL_SPOT_PROJECTOR = 0x4653;
    var DL_SPOT_OVERSHOOT = 0x4652;
    var DL_RAY_BIAS = 0x4658;
    var DL_RAYSHAD = 0x4627;
    var N_CAMERA = 0x4700;
    var CAM_SEE_CONE = 0x4710;
    var CAM_RANGES = 0x4720;
    var OBJ_HIDDEN = 0x4010;
    var OBJ_VIS_LOFTER = 0x4011;
    var OBJ_DOESNT_CAST = 0x4012;
    var OBJ_DONT_RECVSHADOW = 0x4017;
    var OBJ_MATTE = 0x4013;
    var OBJ_FAST = 0x4014;
    var OBJ_PROCEDURAL = 0x4015;
    var OBJ_FROZEN = 0x4016;
    var N_TRI_OBJECT = 0x4100;
    var POINT_ARRAY = 0x4110;
    var POINT_FLAG_ARRAY = 0x4111;
    var FACE_ARRAY = 0x4120;
    var MSH_MAT_GROUP = 0x4130;
    var SMOOTH_GROUP = 0x4150;
    var MSH_BOXMAP = 0x4190;
    var TEX_VERTS = 0x4140;
    var MESH_MATRIX = 0x4160;
    var MESH_COLOR = 0x4165;
    var MESH_TEXTURE_INFO = 0x4170;
    var KFDATA = 0xB000;
    var KFHDR = 0xB00A;
    var KFSEG = 0xB008;
    var KFCURTIME = 0xB009;
    var AMBIENT_NODE_TAG = 0xB001;
    var OBJECT_NODE_TAG = 0xB002;
    var CAMERA_NODE_TAG = 0xB003;
    var TARGET_NODE_TAG = 0xB004;
    var LIGHT_NODE_TAG = 0xB005;
    var L_TARGET_NODE_TAG = 0xB006;
    var SPOTLIGHT_NODE_TAG = 0xB007;
    var NODE_ID = 0xB030;
    var NODE_HDR = 0xB010;
    var PIVOT = 0xB013;
    var INSTANCE_NAME = 0xB011;
    var MORPH_SMOOTH = 0xB015;
    var BOUNDBOX = 0xB014;
    var POS_TRACK_TAG = 0xB020;
    var COL_TRACK_TAG = 0xB025;
    var ROT_TRACK_TAG = 0xB021;
    var SCL_TRACK_TAG = 0xB022;
    var MORPH_TRACK_TAG = 0xB026;
    var FOV_TRACK_TAG = 0xB023;
    var ROLL_TRACK_TAG = 0xB024;
    var HOT_TRACK_TAG = 0xB027;
    var FALL_TRACK_TAG = 0xB028;
    var HIDE_TRACK_TAG = 0xB029;
    var POLY_2D = 0x5000;
    var SHAPE_OK = 0x5010;
    var SHAPE_NOT_OK = 0x5011;
    var SHAPE_HOOK = 0x5020;
    var PATH_3D = 0x6000;
    var PATH_MATRIX = 0x6005;
    var SHAPE_2D = 0x6010;
    var M_SCALE = 0x6020;
    var M_TWIST = 0x6030;
    var M_TEETER = 0x6040;
    var M_FIT = 0x6050;
    var M_BEVEL = 0x6060;
    var XZ_CURVE = 0x6070;
    var YZ_CURVE = 0x6080;
    var INTERPCT = 0x6090;
    var DEFORM_LIMIT = 0x60A0;
    var USE_CONTOUR = 0x6100;
    var USE_TWEEN = 0x6110;
    var USE_SCALE = 0x6120;
    var USE_TWIST = 0x6130;
    var USE_TEETER = 0x6140;
    var USE_FIT = 0x6150;
    var USE_BEVEL = 0x6160;
    var DEFAULT_VIEW = 0x3000;
    var VIEW_TOP = 0x3010;
    var VIEW_BOTTOM = 0x3020;
    var VIEW_LEFT = 0x3030;
    var VIEW_RIGHT = 0x3040;
    var VIEW_FRONT = 0x3050;
    var VIEW_BACK = 0x3060;
    var VIEW_USER = 0x3070;
    var VIEW_CAMERA = 0x3080;
    var VIEW_WINDOW = 0x3090;
    var VIEWPORT_LAYOUT_OLD = 0x7000;
    var VIEWPORT_DATA_OLD = 0x7010;
    var VIEWPORT_LAYOUT = 0x7001;
    var VIEWPORT_DATA = 0x7011;
    var VIEWPORT_DATA_3 = 0x7012;
    var VIEWPORT_SIZE = 0x7020;
    var NETWORK_VIEW = 0x7030;
    var parser;
    /**DOC:
     {
		 constructorYn : true,
		 title :`Red3DSLoader`,
		 description : `
			 3DS 로더.
			 애니메이션은 지원하지 않음(GLTF만 지원)
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 path : [
				 {type:'String'},
				 '파일이 위치한 경로'
			 ],
			 fileName : [
				 {type:'String'},
				 '파일이름'
			 ],
			 callback : [
				 {type:'Function'},
				 '로딩완료시 실행될 콜백'
			 ]
		 },
		 example : `
		    // 3ds 로딩
            Red3DSLoader(
                RedGL Instance, // redGL
                assetPath + '3ds/portalgun/', // assetRootPath
                'portalgun.3ds', // fileName
                function (v) { // callback
                    console.log('로딩성공', v);
                    (RedScene Instance).addChild(v['resultMesh']);
                }
            )
		 `,
		 demo : '../example/loader/3ds/Red3DSLoader.html',
		 return : 'void'
	 }
     :DOC*/
    Red3DSLoader = function (redGL, path, fileName, callback) {
        if ((!(this instanceof Red3DSLoader))) return new Red3DSLoader(redGL, path, fileName, callback);
        console.log('~~~~~~~~~~~');
        var self = this;
        var request = new XMLHttpRequest();
        request.open("GET", path + fileName, true);
        request.responseType = 'arraybuffer';
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status === 200) {
                console.log(request);
                self['result'] = parser(self, redGL, request['response']);
                if (callback) {
                    console.log('모델 파싱 종료');
                    callback(self['result'])
                }
            } else {
                console.log(request)
            }
        };
        request.send();
        this['redGL'] = redGL;
        this['position'] = 0;
        this['materials'] = {};
        this['meshs'] = [];
        this['path'] = path;
        this['fileName'] = fileName;
        this['callback'] = callback;
        this['resultMesh'] = RedMesh(redGL);
        this['resultMesh']['name'] = 'instanceOfRed3DSLoader_' + RedGL.makeUUID();
        this['result'] = null;
    };
    parser = (function () {
        var readFile;
        var readChunk, nextChunk, endChunk;
        var readWord, readSize, readString, readByte, readColor, readMap;
        var resetPosition;
        var readMeshData;
        var readMesh;
        var readFloat;
        var readNamedObject;
        var readFaceArray;
        var readMaterialEntry;
        var readMaterialGroup;
        readChunk = function (target, dataView) {
            var t0 = {};
            t0['cur'] = target['position'];
            t0['id'] = readWord(target, dataView);
            t0['size'] = readSize(target, dataView);
            t0['end'] = t0['cur'] + t0['size'];
            t0['cur'] += 6;
            console.log('readChunk', t0);
            return t0;
        };
        nextChunk = function (target, dataView, chunk) {
            if (chunk['cur'] >= chunk['end']) return 0;
            target['position'] = chunk['cur'];
            try {
                var next = readChunk(target, dataView);
                chunk['cur'] += next['size'];
                console.log('nextChunk', next['id']);
                return next['id'];
            } catch (e) {
                console.log('Unable to read chunk at ' + target['position']);
                return 0;
            }
        };
        endChunk = function (target, chunk) {
            target['position'] = chunk['end'];
        };
        readWord = function (target, dataView) {
            var t0 = dataView.getUint16(target['position'], true);
            target['position'] += 2;
            return t0;
        };
        readSize = function (target, dataView) {
            var t0 = dataView.getUint32(target['position'], true);
            target['position'] += 4;
            return t0;
        };
        readByte = function (target, dataView) {
            var to = dataView.getUint8(target['position'], true);
            target['position'] += 1;
            return to;
        };
        readString = function (target, dataView, maxLength) {
            var t0 = '';
            var i, t1;
            for (i = 0; i < maxLength; i++) {
                t1 = readByte(target, dataView);
                if (!t1) break;
                t0 += String.fromCharCode(t1);
            }
            return t0;
        };
        readFloat = function (target, dataView) {
            try {
                var v = dataView.getFloat32(target['position'], true);
                target['position'] += 4;
                return v;
            } catch (e) {
                console.log(e + ' ' + target['position'] + ' ' + dataView.byteLength);
            }
        };
        readColor = function (target, dataView) {
            var chunk = readChunk(target, dataView);
            var color;
            if (chunk['id'] === COLOR_24 || chunk['id'] === LIN_COLOR_24) {
                color = RedGLUtil.rgb2hex(readByte(target, dataView), readByte(target, dataView), readByte(target, dataView));
                console.log('      Color: ' + color);
            } else if (chunk['id'] === COLOR_F || chunk['id'] === LIN_COLOR_F) {
                color = RedGLUtil.rgb2hex(readByte(target, dataView), readByte(target, dataView), readByte(target, dataView));
                console.log('      Color: ' + color);
            } else console.log('      Unknown color chunk: ' + chunk.toString(16));
            endChunk(target, chunk);
            return color;
        };
        resetPosition = function (target) {
            target['position'] -= 6;
        };
        readMap = function (target, dataView, path) {
            var chunk = readChunk(target, dataView);
            var next = nextChunk(target, dataView, chunk);
            var texture = {};
            // var loader = new THREE.TextureLoader(this.manager);
            // loader.setPath(path);
            while (next !== 0) {
                switch (next) {
                    case  MAT_MAPNAME :
                        var name = readString(target, dataView, 128);
                        texture = RedBitmapTexture(target['redGL'], path + name);
                        console.log('      File: ' + path + name);
                        break;
                    case  MAT_MAP_UOFFSET :
                        if (!texture.offset) texture.offset = {};
                        texture.offset.x = readFloat(target, dataView);
                        console.log('      OffsetX: ' + texture.offset.x);
                        break;
                    case  MAT_MAP_VOFFSET :
                        if (!texture.offset) texture.offset = {};
                        texture.offset.y = readFloat(target, dataView);
                        console.log('      OffsetY: ' + texture.offset.y);
                        break;
                    case  MAT_MAP_USCALE :
                        if (!texture.repeat) texture.repeat = {};
                        texture.repeat.x = readFloat(target, dataView);
                        console.log('      RepeatX: ' + texture.repeat.x);
                        break;
                    case  MAT_MAP_VSCALE :
                        if (!texture.repeat) texture.repeat = {};
                        texture.repeat.y = readFloat(target, dataView);
                        console.log('      RepeatY: ' + texture.repeat.y);
                        break;
                    default :
                        console.log('      Unknown map chunk: ' + next.toString(16));
                        break;
                }
                next = nextChunk(target, dataView, chunk);
            }
            endChunk(target, chunk);
            return texture;
        };
        readMaterialEntry = function (target, dataView, path) {
            var chunk = readChunk(target, dataView);
            var next = nextChunk(target, dataView, chunk);
            var materialInfo = {};
            while (next !== 0) {
                switch (next) {
                    case MAT_NAME :
                        materialInfo['name'] = readString(target, dataView, 64);
                        console.log('   Name: ' + materialInfo['name']);
                        break;
                    case MAT_WIRE :
                        console.log('   Wireframe');
                        materialInfo['wireframe'] = true;
                        break;
                    case MAT_WIRE_SIZE :
                        var value = readByte(target, dataView);
                        // 와이어프레임넓이는 이제 사용하지않음으로 버림
                        // materialInfo['wireframe']Linewidth = value;
                        console.log('   Wireframe Thickness: ' + value);
                        break;
                    case MAT_TWO_SIDE :
                        //TODO: 메쉬에 재질 적용할때 메쉬에 주입되어야함
                        // materialInfo.side = THREE.DoubleSide;
                        console.log('   DoubleSided');
                        break;
                    case MAT_ADDITIVE :
                        console.log('   Additive Blending');
                        //TODO: 메쉬에 재질 적용할때 메쉬에 주입되어야함
                        // materialInfo.blending = THREE.AdditiveBlending;
                        break;
                    case MAT_DIFFUSE :
                        console.log('   Diffuse Color');
                        materialInfo['color'] = readColor(target, dataView);
                        break;
                    case MAT_SPECULAR :
                        console.log('   Specular Color');
                        // materialInfo['specularColor'] = readColor(target, dataView);
                        break;
                    case MAT_AMBIENT :
                        console.log('   Ambient color');
                        // materialInfo['color'] = readColor(target, dataView);
                        break;
                    case MAT_SHININESS :
                        var shininess = readWord(target, dataView);
                        materialInfo['shininess'] = shininess;
                        console.log('   Shininess : ' + shininess);
                        break;
                    case MAT_TEXMAP :
                        console.log('   ColorMap');
                        console.log(target, dataView);
                        resetPosition(target, dataView);
                        materialInfo['diffuseTexture'] = readMap(target, dataView, path);
                        break;
                    case MAT_BUMPMAP :
                        console.log('   BumpMap');
                        resetPosition(target, dataView);
                        materialInfo['normalTexture'] = readMap(target, dataView, path);
                        break;
                    case MAT_OPACMAP :
                        console.log('   OpacityMap');
                        resetPosition(target, dataView);
                        // materialInfo['alphaMapTexture'] = readMap(target,data, path);
                        break;
                    case MAT_SPECMAP :
                        console.log('   SpecularMap');
                        resetPosition(target, dataView);
                        materialInfo['specularTexture'] = readMap(target, dataView, path);
                        break;
                    default :
                        console.log('   Unknown materialInfo chunk: ' + next.toString(16));
                        break;
                }
                next = nextChunk(target, dataView, chunk);
            }
            // 재질 판단
            // TODO: RedEnvironmentMaterial 파싱추가해야됨
            // 회사에 3D맥스를 깔고싶구나 -_-;;
            var resultMaterial;
            if (materialInfo['diffuseTexture']) {
                if ('shininess' in materialInfo) {
                    resultMaterial = RedStandardMaterial(target['redGL'], materialInfo['diffuseTexture']);
                    resultMaterial['normalTexture'] = materialInfo['normalTexture'];
                    resultMaterial['specularTexture'] = materialInfo['specularTexture']
                } else resultMaterial = RedBitmapTexture(target['redGL'], materialInfo['diffuseTexture'])
            } else {
                if (materialInfo['normalTexture'] || materialInfo['specularTexture']) resultMaterial = RedColorPhongTextureMaterial(target['redGL']);
                else {
                    if ('shininess' in materialInfo) resultMaterial = RedColorPhongMaterial(target['redGL']);
                    else RedColorMaterial(target['redGL'])
                }
                resultMaterial['color'] = materialInfo['color']
            }
            endChunk(target, chunk);
            console.log('파싱정보', materialInfo);
            resultMaterial['shininess'] = materialInfo['shininess'];
            resultMaterial['name'] = materialInfo['name'];
            target.materials[materialInfo['name']] = resultMaterial;
        };
        readMeshData = function (target, dataView, path) {
            var chunk = readChunk(target, dataView);
            var next = nextChunk(target, dataView, chunk);
            while (next !== 0) {
                switch (next) {
                    case MESH_VERSION :
                        var version = +readSize(target, dataView);
                        console.log('Mesh Version: ' + version);
                        break;
                    case MASTER_SCALE :
                        var scale = readFloat(target, dataView);
                        console.log('Master scale: ' + scale);
                        target['resultMesh']['scaleX'] = scale;
                        target['resultMesh']['scaleY'] = scale;
                        target['resultMesh']['scaleZ'] = scale;
                        break;
                    case NAMED_OBJECT :
                        console.log('Named Object');
                        resetPosition(target, dataView);
                        readNamedObject(target, dataView);
                        break;
                    case MAT_ENTRY :
                        console.log('Material');
                        resetPosition(target, dataView);
                        readMaterialEntry(target, dataView, path);
                        break;
                    default :
                        console.log('Unknown MDATA chunk: ' + next.toString(16));
                        break;
                }
                next = nextChunk(target, dataView, chunk);
            }
        };
        readMaterialGroup = function (target, dataView) {
            var chunk = readChunk(target, dataView);
            var name = readString(target, dataView, 64);
            var numFaces = readWord(target, dataView);
            console.log('         Name: ' + name);
            console.log('         Faces: ' + numFaces);
            var index = [];
            for (var i = 0; i < numFaces; ++i) index.push(readWord(target, dataView));
            return {
                name: name,
                index: index
            };
        };
        readFaceArray = function (target, dataView, mesh) {
            var chunk = readChunk(target, dataView);
            var faces = readWord(target, dataView);
            console.log('   Faces: ' + faces);
            var index = [];
            for (var i = 0; i < faces; ++i) {
                index.push(readWord(target, dataView), readWord(target, dataView), readWord(target, dataView));
                var visibility = readWord(target, dataView);
            }
            // mesh.geometry.setIndex( index );
            //The rest of the FACE_ARRAY chunk is subchunks
            while (target['position'] < chunk['end']) {
                var chunk = readChunk(target, dataView);
                if (chunk['id'] === MSH_MAT_GROUP) {
                    console.log('      Material Group');
                    resetPosition(target, dataView);
                    var tGroup = readMaterialGroup(target, dataView);
                    console.log(tGroup);
                    var material = target.materials[tGroup['name']];
                    if (material !== undefined) {
                        mesh['material'] = material;
                        if (material['name'] === '') material['name'] = mesh['name'];
                    }
                } else console.log('      Unknown face array chunk: ' + chunk.toString(16));
                endChunk(target, chunk);
            }
            endChunk(target, chunk);
            return index
        };
        readMesh = function (target, dataView) {
            var chunk = readChunk(target, dataView);
            var next = nextChunk(target, dataView, chunk);
            var uvs = [];
            var indices;
            var mesh = RedMesh(target['redGL']);
            var i, len;
            while (next !== 0) {
                switch (next) {
                    case POINT_ARRAY :
                        var points = readWord(target, dataView);
                        console.log('   Vertex: ' + points);
                        //BufferGeometry
                        var vertices = [];
                        for (i = 0; i < points; i++) {
                            vertices.push(
                                readFloat(target, dataView),
                                readFloat(target, dataView),
                                readFloat(target, dataView)
                            );
                        }
                        break;
                    case FACE_ARRAY :
                        resetPosition(target, dataView);
                        indices = readFaceArray(target, dataView, mesh);
                        break;
                    case TEX_VERTS :
                        var texels = readWord(target, dataView);
                        console.log('   UV: ' + texels);
                        //BufferGeometry
                        var uvs = [];
                        for (i = 0; i < texels; i++) {
                            uvs.push(readFloat(target, dataView));
                            uvs.push(1 - readFloat(target, dataView));
                        }
                        break;
                    case MESH_MATRIX :
                        console.log('   Tranformation Matrix (TODO)');
                        var values = [];
                        for (i = 0; i < 12; i++) values[i] = readFloat(target, dataView);
                        var matrix = mat4.create();
                        //X Line
                        matrix[0] = values[0];
                        matrix[1] = values[6];
                        matrix[2] = values[3];
                        matrix[3] = values[9];
                        //Y Line
                        matrix[4] = values[2];
                        matrix[5] = values[8];
                        matrix[6] = values[5];
                        matrix[7] = values[11];
                        //Z Line
                        matrix[8] = values[1];
                        matrix[9] = values[7];
                        matrix[10] = values[4];
                        matrix[11] = values[10];
                        //W Line
                        matrix[12] = 0;
                        matrix[13] = 0;
                        matrix[14] = 0;
                        matrix[15] = 1;
                        // matrix.transpose();
                        // var inverse = mat4.craete();
                        // inverse.getInverse(matrix, true);
                        // geometry.applyMatrix(inverse);
                        // matrix.decompose(mesh['position'], mesh.quaternion, mesh.scale);
                        break;
                    default :
                        console.log('   Unknown mesh chunk: ' + next.toString(16));
                        break
                }
                next = nextChunk(target, dataView, chunk);
            }
            endChunk(target, chunk);
            // geometry.computeVertexNormals();
            var interleaveBuffer;
            var indexBuffer;
            var normalData = RedGLUtil.calculateNormals(vertices, indices);
            console.log('vertices', vertices);
            console.log('normalData', normalData);
            var interleaveData = [];
            i = 0, len = vertices.length / 3;
            for (i; i < len; i++) {
                interleaveData.push(vertices[i * 3 + 0], vertices[i * 3 + 1], vertices[i * 3 + 2]);
                interleaveData.push(normalData[i * 3 + 0], normalData[i * 3 + 1], normalData[i * 3 + 2]);
                if (uvs.length) interleaveData.push(uvs[i * 2 + 0], uvs[i * 2 + 1])
            }
            var interleaveInfo = [];
            interleaveInfo.push(RedInterleaveInfo('aVertexPosition', 3));
            interleaveInfo.push(RedInterleaveInfo('aVertexNormal', 3));
            if (uvs.length) interleaveInfo.push(RedInterleaveInfo('aTexcoord', 2));
            interleaveBuffer = RedBuffer(target['redGL'], 'testRed3DS', RedBuffer.ARRAY_BUFFER, new Float32Array(interleaveData), interleaveInfo);
            indexBuffer = RedBuffer(target['redGL'], 'testRed3DS', RedBuffer.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices));
            var tGeo = RedGeometry(interleaveBuffer, indexBuffer);
            mesh.geometry = tGeo;
            mesh['name'] = 'mesh' + RedGL.makeUUID();
            mesh.matrix = matrix;
            return mesh;
        };
        readNamedObject = function (target, dataView) {
            var chunk = readChunk(target, dataView);
            var name = readString(target, dataView, 64);
            chunk['cur'] = target['position'];
            var next = nextChunk(target, dataView, chunk);
            var tMesh;
            while (next !== 0) {
                if (next === N_TRI_OBJECT) {
                    resetPosition(target, dataView);
                    tMesh = readMesh(target, dataView);
                    tMesh['name'] = name;
                    target['meshs'].push(tMesh);
                    console.log('readNamedObject', name)
                } else console.log('Unknown named object chunk: ' + next.toString(16));
                next = nextChunk(target, dataView, chunk);
            }
            endChunk(target, chunk);
        };
        readFile = function (target, arrayBuffer, path) {
            var dataView = new DataView(arrayBuffer);
            console.log('dataView', dataView);
            var chunk = readChunk(target, dataView);
            if (chunk['id'] === MLIBMAGIC || chunk['id'] === CMAGIC || chunk['id'] === M3DMAGIC) {
                var next = nextChunk(target, dataView, chunk);
                while (next !== 0) {
                    switch (next) {
                        case M3D_VERSION :
                            console.log('3DS file version: ' + readSize(target, dataView));
                            break;
                        case MDATA :
                            resetPosition(target, dataView);
                            readMeshData(target, dataView, path);
                            break;
                        default :
                            console.log('Unknown main chunk: ' + next.toString(16));
                            break;
                    }
                    next = nextChunk(target, dataView, chunk);
                }
            }
            console.log('Parsed');
        };
        return function (tRed3DSLoader, redGL, rawData) {
            console.log('파싱시작', tRed3DSLoader['path'] + tRed3DSLoader['fileName']);
            // console.log('rawData', rawData);
            readFile(tRed3DSLoader, rawData, tRed3DSLoader['path']);
            console.log(tRed3DSLoader);
            tRed3DSLoader.meshs.forEach(function (v) {
                tRed3DSLoader.resultMesh.addChild(v)
            });
            return {
                fileName: tRed3DSLoader['fileName'],
                path: tRed3DSLoader['path'],
                resultMesh: tRed3DSLoader['resultMesh']
            }
        }
    })();
    Object.freeze(Red3DSLoader);
})
();