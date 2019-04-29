/*
 * MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 */

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
        this['_UUID'] = RedGL.makeUUID();
        console.time('RedGeometry - ' + this['_UUID']);
        console.group('RedGeometry - ' + this['_UUID']);
        interleaveBuffer instanceof RedBuffer || RedGLUtil.throwFunc('RedGeometry : interleaveBuffer - RedBuffer Instance만 허용.', interleaveBuffer);
        interleaveBuffer['bufferType'] === RedBuffer.ARRAY_BUFFER || RedGLUtil.throwFunc('RedGeometry : interleaveBuffer - RedBuffer.ARRAY_BUFFER 타입만 허용.', interleaveBuffer);
        if (indexBuffer) {
            interleaveBuffer || RedGLUtil.throwFunc('RedGeometry : indexBuffer는 반드시 interleaveBuffer와 쌍으로 입력되어야함.', indexBuffer);
            indexBuffer instanceof RedBuffer || RedGLUtil.throwFunc('RedGeometry : indexBuffer - RedBuffer Instance만 허용.', indexBuffer);
            indexBuffer['bufferType'] === RedBuffer.ELEMENT_ARRAY_BUFFER || RedGLUtil.throwFunc('RedGeometry : indexBuffer - RedBuffer.ELEMENT_ARRAY_BUFFER 타입만 허용.', indexBuffer);
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
        this['_volume'] = null;
        console.timeEnd('RedGeometry - ' + this['_UUID']);
        console.groupEnd();
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
            var k, tBuffer;
            return function () {
                for (k in this) {
                    tBuffer = this[k];
                    if (this && tBuffer instanceof RedBuffer) tBuffer.dispose();
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
            if (this && this[key] instanceof RedBuffer) this[key].dispose();
        },
        /**DOC:
         {
		     code : 'METHOD',
			 title :`volumeCalculate`,
			 description : `지오메트리 고유의 볼륨을 재계산함`,
			 return : 'array : [xVolume, yVolume, zVolume]'
		 }
         :DOC*/
        volumeCalculate: function () {
            console.time('volumeCalculate');
            var minX, minY, minZ, maxX, maxY, maxZ, t0, t1, t2, t, i, len;
            var stride = this['interleaveBuffer']['stride'];
            // if (!volume[this]) {
            minX = minY = minZ = maxX = maxY = maxZ = 0;
            t = this['interleaveBuffer']['data'];
            i = 0;
            len = this['interleaveBuffer']['pointNum'];
            for (i; i < len; i++) {
                t0 = i * stride , t1 = t0 + 1, t2 = t0 + 2,
                    minX = t[t0] < minX ? t[t0] : minX,
                    maxX = t[t0] > maxX ? t[t0] : maxX,
                    minY = t[t1] < minY ? t[t1] : minY,
                    maxY = t[t1] > maxY ? t[t1] : maxY,
                    minZ = t[t2] < minZ ? t[t2] : minZ,
                    maxZ = t[t2] > maxZ ? t[t2] : maxZ;
            }
            this['_volume'] = [maxX - minX, maxY - minY, maxZ - minZ];
            this['_volume'].minX = minX
            this['_volume'].maxX = maxX
            this['_volume'].minY = minY
            this['_volume'].maxY = maxY
            this['_volume'].minZ = minZ
            this['_volume'].maxZ = maxZ
            // }
            console.time('volumeCalculate');
            return this['_volume'];
        }
    };
    /**DOC:
     {
		     code : 'METHOD',
			 title :`volume`,
			 description : `
			    지오메트리 고유의 볼륨을 리턴함.
                계산된 볼륨을 리턴함
                강제 재계산을 실행하고싶다면 volumeCalculate()를 실행해야함
            `,
			 return : 'array : [xVolume, yVolume, zVolume]'
		 }
     :DOC*/
    Object.defineProperty(RedGeometry.prototype, 'volume', {
        get: function () {
            if (!this['_volume']) this['volumeCalculate']();
            return this['_volume'];
        }
    });

    Object.freeze(RedGeometry);
})();