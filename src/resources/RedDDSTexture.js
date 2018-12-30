"use strict";
var RedDDSTexture;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedDDSTexture`,
		 description : `
			 RedDDSTexture Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 src : [
				 {type:'string'}
			 ],
			 option : [
				 {type:'Object'},
				 '텍스쳐 정의옵션',
				 `
					<h2>dds는 현재 지원하지 않음</h2>
				 `
			 ]
		 },
	     demo : '../example/resources/RedDDSTexture.html',
		 extends : [
		    'RedBaseTexture'
		 ],
		 example : `
		 RedDDSTexture( RedGL Instance,  src, {
			 min: gl.LINEAR_MIPMAP_NEAREST,
			 mag: gl.LINEAR,
			 wrap_s: gl.REPEAT,
			 wrap_t: gl.REPEAT
		 })
		 `,
		 return : 'RedDDSTexture Instance'
	 }
     :DOC*/
    RedDDSTexture = function (redGL, src, option, callback) {
        var tGL;
        if (!(this instanceof RedDDSTexture)) return new RedDDSTexture(redGL, src, option, callback);
        redGL instanceof RedGL || RedGLUtil.throwFunc('RedDDSTexture : RedGL Instance만 허용.', redGL);
        tGL = redGL.gl;
        tGL.glExtension['WEBGL_compressed_texture_s3tc'] || RedGLUtil.throwFunc('RedDDSTexture : WEBGL_compressed_texture_s3tc확장을 지원하지않는 하드웨어입니다.');

        this['webglTexture'] = tGL.createTexture();
        this['webglTexture']['gl'] = tGL
        this['_load'] = function (needEmpty) {
            RedTextureOptionChecker.check('RedDDSTexture', option, tGL);
            if (needEmpty) this.setEmptyTexture(tGL, this['webglTexture']);
            if (this['_src']) this.loadDDSTexture(tGL, tGL.glExtension['WEBGL_compressed_texture_s3tc'], this['_src'], this['_callback']);
        }
        this['callback'] = callback;
        this['src'] = src;
        this['_UUID'] = RedGL.makeUUID();
        console.log(this);
    }
    RedDDSTexture.prototype = new RedBaseTexture();
    /**DOC:
     {
		 code:`PROPERTY`,
		 title :`src`,
		 description : `
			 src
		 `,
		 return : 'void'
	 }
     :DOC*/
    Object.defineProperty(RedDDSTexture.prototype, 'src', {
        get: function () {
            return this['_src']
        },
        set: function (v) {
            if (v && typeof  v != 'string') RedGLUtil.throwFunc('RedDDSTexture : src는 문자열만 허용.', '입력값 : ' + v);
            this['_src'] = v;
            this._load(true)
        }
    });
})();
/**
 * @fileoverview dds - Utilities for loading DDS texture files
 * @author Brandon Jones
 * @version 0.1
 */

/*
 * Copyright (c) 2012 Brandon Jones
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */
(function (global) {
    "use strict";
    // All values and structures referenced from:
    // http://msdn.microsoft.com/en-us/library/bb943991.aspx/
    var DDS_MAGIC = 0x20534444;
    var DDSD_CAPS = 0x1,
        DDSD_HEIGHT = 0x2,
        DDSD_WIDTH = 0x4,
        DDSD_PITCH = 0x8,
        DDSD_PIXELFORMAT = 0x1000,
        DDSD_MIPMAPCOUNT = 0x20000,
        DDSD_LINEARSIZE = 0x80000,
        DDSD_DEPTH = 0x800000;
    var DDSCAPS_COMPLEX = 0x8,
        DDSCAPS_MIPMAP = 0x400000,
        DDSCAPS_TEXTURE = 0x1000;
    var DDSCAPS2_CUBEMAP = 0x200,
        DDSCAPS2_CUBEMAP_POSITIVEX = 0x400,
        DDSCAPS2_CUBEMAP_NEGATIVEX = 0x800,
        DDSCAPS2_CUBEMAP_POSITIVEY = 0x1000,
        DDSCAPS2_CUBEMAP_NEGATIVEY = 0x2000,
        DDSCAPS2_CUBEMAP_POSITIVEZ = 0x4000,
        DDSCAPS2_CUBEMAP_NEGATIVEZ = 0x8000,
        DDSCAPS2_VOLUME = 0x200000;
    var DDPF_ALPHAPIXELS = 0x1,
        DDPF_ALPHA = 0x2,
        DDPF_FOURCC = 0x4,
        DDPF_RGB = 0x40,
        DDPF_YUV = 0x200,
        DDPF_LUMINANCE = 0x20000;

    function FourCCToInt32(value) {
        return value.charCodeAt(0) +
            (value.charCodeAt(1) << 8) +
            (value.charCodeAt(2) << 16) +
            (value.charCodeAt(3) << 24);
    }

    function Int32ToFourCC(value) {
        return String.fromCharCode(
            value & 0xff,
            (value >> 8) & 0xff,
            (value >> 16) & 0xff,
            (value >> 24) & 0xff
        );
    }

    var FOURCC_DXT1 = FourCCToInt32("DXT1");
    var FOURCC_DXT3 = FourCCToInt32("DXT3");
    var FOURCC_DXT5 = FourCCToInt32("DXT5");
    var headerLengthInt = 31; // The header length in 32 bit ints
    // Offsets into the header array
    var off_magic = 0;
    var off_size = 1;
    var off_flags = 2;
    var off_height = 3;
    var off_width = 4;
    var off_mipmapCount = 7;
    var off_pfFlags = 20;
    var off_pfFourCC = 21;
    // Little reminder for myself where the above values come from
    /*DDS_PIXELFORMAT {
        int32 dwSize; // offset: 19
        int32 dwFlags;
        char[4] dwFourCC;
        int32 dwRGBBitCount;
        int32 dwRBitMask;
        int32 dwGBitMask;
        int32 dwBBitMask;
        int32 dwABitMask; // offset: 26
    };

    DDS_HEADER {
        int32 dwSize; // 1
        int32 dwFlags;
        int32 dwHeight;
        int32 dwWidth;
        int32 dwPitchOrLinearSize;
        int32 dwDepth;
        int32 dwMipMapCount; // offset: 7
        int32[11] dwReserved1;
        DDS_PIXELFORMAT ddspf; // offset 19
        int32 dwCaps; // offset: 27
        int32 dwCaps2;
        int32 dwCaps3;
        int32 dwCaps4;
        int32 dwReserved2; // offset 31
    };*/
    /**
     * Parses a DDS file from the given arrayBuffer and uploads it into the currently bound texture
     *
     * @param {WebGLRenderingContext} gl WebGL rendering context
     * @param {WebGLCompressedTextureS3TC} ext WEBGL_compressed_texture_s3tc extension object
     * @param {TypedArray} arrayBuffer Array Buffer containing the DDS files data
     * @param {boolean} [loadMipmaps] If false only the top mipmap level will be loaded, otherwise all available mipmaps will be uploaded
     *
     * @returns {number} Number of mipmaps uploaded, 0 if there was an error
     */
    var uploadDDSLevels = global.uploadDDSLevels = function (gl, ext, arrayBuffer, loadMipmaps) {
        var header = new Int32Array(arrayBuffer, 0, headerLengthInt),
            fourCC, blockBytes, internalFormat,
            width, height, dataLength, dataOffset,
            byteArray, mipmapCount, i;
        if (header[off_magic] != DDS_MAGIC) {
            console.error("Invalid magic number in DDS header");
            return 0;
        }
        if (!header[off_pfFlags] & DDPF_FOURCC) {
            console.error("Unsupported format, must contain a FourCC code");
            return 0;
        }
        fourCC = header[off_pfFourCC];
        switch (fourCC) {
            case FOURCC_DXT1:
                blockBytes = 8;
                internalFormat = ext.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                break;
            case FOURCC_DXT3:
                blockBytes = 16;
                internalFormat = ext.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                break;
            case FOURCC_DXT5:
                blockBytes = 16;
                internalFormat = ext.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                break;
            default:
                console.error("Unsupported FourCC code:", Int32ToFourCC(fourCC));
                return null;
        }
        mipmapCount = 1;
        if (header[off_flags] & DDSD_MIPMAPCOUNT && loadMipmaps !== false) {
            mipmapCount = Math.max(1, header[off_mipmapCount]);
        }
        width = header[off_width];
        height = header[off_height];
        dataOffset = header[off_size] + 4;
        for (i = 0; i < mipmapCount; ++i) {
            dataLength = Math.max(4, width) / 4 * Math.max(4, height) / 4 * blockBytes;
            byteArray = new Uint8Array(arrayBuffer, dataOffset, dataLength);
            gl.compressedTexImage2D(gl.TEXTURE_2D, i, internalFormat, width, height, 0, byteArray);
            dataOffset += dataLength;
            width *= 0.5;
            height *= 0.5;
        }
        return mipmapCount;
    }
    /**
     * Creates a texture from the DDS file at the given URL. Simple shortcut for the most common use case
     *
     * @param {WebGLRenderingContext} gl WebGL rendering context
     * @param {WebGLCompressedTextureS3TC} ext WEBGL_compressed_texture_s3tc extension object
     * @param {string} src URL to DDS file to be loaded
     * @param {function} [callback] callback to be fired when the texture has finished loading
     *
     * @returns {WebGLTexture} New texture that will receive the DDS image data
     */
    global.loadDDSTexture = function (gl, ext, src, option, callback) {
        var texture = this['webglTexture'],
            ddsXhr = new XMLHttpRequest();
        ddsXhr.open('GET', src, true);
        ddsXhr.responseType = "arraybuffer";
        if (!option) option = {}
        ddsXhr.onload = function () {
            gl.activeTexture(gl.TEXTURE0 + 0)
            gl.bindTexture(gl.TEXTURE_2D, texture);
            var mipmaps = uploadDDSLevels(gl, ext, this.response);
            // console.log(this.response)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, option['min'] ? option['min'] : (mipmaps > 1 ? gl.LINEAR_MIPMAP_NEAREST : gl.LINEAR));
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, option['mag'] ? option['mag'] : gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            // if ( gl['glExtension']['EXT_texture_filter_anisotropic'] && option['anisotropic'] ) {
            // 	gl.texParameterf(gl.TEXTURE_2D, gl['glExtension']['EXT_texture_filter_anisotropic'].TEXTURE_MAX_ANISOTROPY_EXT, option['anisotropic']);
            // }
            // try {
            // 	// gl.generateMipmap(gl.TEXTURE_2D)
            // } catch ( error ) {
            // 	// console.log('밉맵을 생성할수 없음', source)
            // }
            gl.bindTexture(gl.TEXTURE_2D, null);
            if (callback) callback(true);
        };
        ddsXhr.onerror = function () {
            if (callback) callback(false);
        }
        ddsXhr.send(null);
        return texture;
    }
})(RedDDSTexture.prototype);
Object.freeze(RedDDSTexture);