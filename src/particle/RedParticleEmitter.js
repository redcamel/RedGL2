"use strict";
//////////////////////////////////////////////////////////
// 연구중
//////////////////////////////////////////////////////////
var RedParticleEmitter;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedParticleEmitter`,
		 description : `
			 파티클 방출기
			 <h1>이건코드정리부터해야겠음</h1>
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 defineObject : [
			    {type:'Object'},
			    '파티클 정의 오브젝트'
			 ],
			 material : [
			    {type:'RedParticleColorMaterial Instance or RedParticleMaterial Instance'},
			 ]
		 },
		 demo : '../example/particle/RedParticleEmitter.html',
		 extends : [
		    'RedBaseContainer',
		    'RedBaseObject3D'
		 ],
		 return : 'RedParticleEmitter Instance'
	 }
     :DOC*/
    RedParticleEmitter = function (redGL, defineObject, diffuseTexture) {
        if (!(this instanceof RedParticleEmitter)) return new RedParticleEmitter(redGL, defineObject, diffuseTexture);
        RedBaseObject3D['build'].call(this, redGL.gl);
        this['list'] = [];
        this['_interleaveData'] = [];
        this['info'] = defineObject;
        this['geometry'] = RedGeometry(RedBuffer(
            redGL,
            'RedParticleEmitter_Buffer' + RedGL.makeUUID(),
            RedBuffer.ARRAY_BUFFER,
            new Float32Array(this['_interleaveData']),
            [
                RedInterleaveInfo('aVertexPosition', 3),
                RedInterleaveInfo('aPointSize', 1),
                RedInterleaveInfo('aVertexColor', 4)
            ],
            redGL.gl.DYNAMIC_DRAW
        ));
        this['_material'] = RedParticleMaterial(redGL, diffuseTexture);
        this['drawMode'] = redGL.gl.POINTS;
        this['blendSrc'] = redGL.gl.SRC_ALPHA;
        this['blendDst'] = redGL.gl.ONE;
        this['useDepthMask'] = false;
        this['_UUID'] = RedGL.makeUUID();
    };
    RedParticleEmitter.TINT_RANDOM = 'random'
    RedParticleEmitter.QuintIn = 1;
    RedParticleEmitter.QuintOut = 2;
    RedParticleEmitter.QuintInOut = 3;
    //
    RedParticleEmitter.BackIn = 4;
    RedParticleEmitter.BackOut = 5;
    RedParticleEmitter.BackInOut = 6;
    //
    RedParticleEmitter.CircIn = 7;
    RedParticleEmitter.CircOut = 8;
    RedParticleEmitter.CircInOut = 9;
    //
    RedParticleEmitter.CubicIn = 10;
    RedParticleEmitter.CubicOut = 11;
    RedParticleEmitter.CubicInOut = 12;
    //
    RedParticleEmitter.ExpoIn = 13;
    RedParticleEmitter.ExpoOut = 14;
    RedParticleEmitter.ExpoInOut = 15;
    //
    RedParticleEmitter.QuadIn = 16;
    RedParticleEmitter.QuadOut = 17;
    RedParticleEmitter.QuadInOut = 18;
    //
    RedParticleEmitter.QuartIn = 19;
    RedParticleEmitter.QuartOut = 20;
    RedParticleEmitter.QuartInOut = 21;
    //
    RedParticleEmitter.SineIn = 22;
    RedParticleEmitter.SineOut = 23;
    RedParticleEmitter.SineInOut = 24;
    RedParticleEmitter.ElasticIn = 25;
    RedParticleEmitter.ElasticOut = 26;
    RedParticleEmitter.ElasticInOut = 27;
    RedParticleEmitter.prototype = new RedBaseObject3D();
    RedParticleEmitter.prototype['reset'] = function () {
        this.list.length = 0;
        this._interleaveData.length = 0;
    }
    RedParticleEmitter.prototype['update'] = (function () {
        return function (time) {
            time = time + 2000
            var POW, SIN, COS, SQRT, PI, PI2, HPI;
            var i, i2, tParticle;
            var lifeRatio;
            var tIndex;
            var tInfo, tInfoParticle, newParticle;
            ///
            var tEase;
            var tTweenKeyList;
            var tTweenKey;
            var tTargetIndex;
            var n;
            //
            POW = Math.pow;
            SIN = Math.sin;
            COS = Math.cos;
            SQRT = Math.sqrt;
            PI = Math.PI;
            HPI = PI * 0.5;
            PI2 = PI * 2;
            i = this['list']['length'];
            // 맥스보다 갯수가 적으면 추가함
            tInfo = this['info'];
            tInfoParticle = tInfo['particle'];
            if (i < tInfo['max']) {
                i2 = tInfo['emitCount'];
                if (i2 + i > tInfo['max']) i2 = tInfo['max'] - i;
                while (i2--) {
                    newParticle = this['list'][i + i2] = new RedParticleUnit(tInfo['lifeTime']);
                    this['_interleaveData'].push(this.x, this.y, this.z);
                    this['_interleaveData'].push(0);
                    if (tInfo['tint'] == RedParticleEmitter.TINT_RANDOM) this['_interleaveData'].push(Math.random(), Math.random(), Math.random(), 1);
                    else this['_interleaveData'].push(tInfo['tint'][0], tInfo['tint'][1], tInfo['tint'][2], 1);
                    // 룰추가
                    if (tInfo['particle']) {
                        if (tInfoParticle['movementX']) newParticle.addRule('movementX', tInfoParticle['movementX']);
                        if (tInfoParticle['movementY']) newParticle.addRule('movementY', tInfoParticle['movementY']);
                        if (tInfoParticle['movementZ']) newParticle.addRule('movementZ', tInfoParticle['movementZ']);
                        if (tInfoParticle['scale']) newParticle.addRule('scale', tInfoParticle['scale']);
                        if (tInfoParticle['alpha']) newParticle.addRule('alpha', tInfoParticle['alpha']);
                    }
                }
            }
            //////////////////////////////////
            i = this['list']['length'];
            tTweenKeyList = 'movementX,movementY,movementZ,scale,alpha'.split(',');
            while (i--) {
                tParticle = this['list'][i];
                if (!tParticle['startTime']) {
                    tParticle['startTime'] = time;
                    tParticle['age'] = 0;
                }
                tParticle['age'] = time - tParticle['startTime'];
                lifeRatio = tParticle['age'] / tParticle['lifeTime'];
                tIndex = i * 8;
                if (lifeRatio < 1) {
                    //////////////////////////////////
                    //////////////////////////////////
                    n = lifeRatio;
                    ////////////////////////
                    if (!tParticle['startCenter']) tParticle['startCenter'] = [this.x, this.y, this.z];
                    i2 = tTweenKeyList.length;
                    while (i2--) {
                        tTweenKey = tTweenKeyList[i2];
                        n = lifeRatio;
                        // 트윈을 여기서 결정
                        tEase = tParticle[tTweenKey]['ease'];
                        if (tEase) {
                            // QuintIn
                            tEase == 1 ? n = n * n * n * n * n :
                                // QuintOut
                                tEase == 2 ? n = ((n -= 1) * n * n * n * n) + 1 :
                                    // QuintInOut
                                    tEase == 3 ? n = ((n = n * 2) < 1) ? n * n * n * n * n * 0.5 : 0.5 * ((n -= 2) * n * n * n * n + 2) :
                                        ////////////////////////
                                        // BackIn
                                        tEase == 4 ? n = n * n * (n * 1.70158 + n - 1.70158) :
                                            // BackOut
                                            tEase == 5 ? n = (n -= 1) * n * (n * 1.70158 + n + 1.70158) + 1 :
                                                // BackInOut
                                                tEase == 6 ? n = ((n = n * 2) < 1) ? 0.5 * n * n * (n * 1.70158 + n - 1.70158) : 0.5 * (n -= 2) * n * (n * 1.70158 + n + 1.70158) + 1 :
                                                    ////////////////////////
                                                    // CircIn
                                                    tEase == 7 ? n = -1 * (SQRT(1 - n * n) - 1) :
                                                        // CircOut
                                                        tEase == 8 ? n = SQRT(1 - (n -= 1) * n) :
                                                            // CircInOut
                                                            tEase == 9 ? n = ((n = n * 2) < 1) ? -0.5 * (SQRT(1 - n * n) - 1) : 0.5 * SQRT(1 - (n -= 2) * n) + 0.5 :
                                                                ////////////////////////
                                                                // CubicIn
                                                                tEase == 10 ? n = n * n * n :
                                                                    // CubicOut
                                                                    tEase == 11 ? n = ((n -= 1) * n * n) + 1 :
                                                                        // CubicInOut
                                                                        tEase == 12 ? n = ((n = n * 2) < 1) ? n * n * n * 0.5 : 0.5 * ((n -= 2) * n * n + 2) :
                                                                            ////////////////////////
                                                                            // ExpoIn
                                                                            tEase == 13 ? n = n == 0.0 ? 0.0 : POW(2, 10 * (n - 1)) :
                                                                                // ExpoOut
                                                                                tEase == 14 ? n = n == 1.0 ? 1.0 : -POW(2, -10 * n) + 1 :
                                                                                    // ExpoInOut
                                                                                    tEase == 15 ? n = ((n = n * 2) < 1) ? (n == 0.0 ? 0.0 : 0.5 * POW(2, 10 * (n - 1))) : (n == 2.0 ? 1.0 : -0.5 * POW(2, -10 * (n - 1)) + 1) :
                                                                                        ////////////////////////
                                                                                        // QuadIn
                                                                                        tEase == 16 ? n = n * n :
                                                                                            // QuadOut
                                                                                            tEase == 17 ? n = ((2 - n) * n) :
                                                                                                // QuadInOut
                                                                                                tEase == 18 ? n = ((n = n * 2) < 1) ? n * n * 0.5 : 0.5 * ((2 - (n -= 1)) * n + 1) :
                                                                                                    ////////////////////////
                                                                                                    // QuartIn
                                                                                                    tEase == 19 ? n = n * n * n * n :
                                                                                                        // QuartOut
                                                                                                        tEase == 20 ? n = 1 - ((n -= 1) * n * n * n) :
                                                                                                            // QuartInOut
                                                                                                            tEase == 21 ? n = ((n = n * 2) < 1) ? n * n * n * n * 0.5 : 1 - ((n -= 2) * n * n * n * 0.5) :
                                                                                                                ////////////////////////
                                                                                                                // SineIn
                                                                                                                tEase == 22 ? n = -COS(n * HPI) + 1 :
                                                                                                                    // SineOut
                                                                                                                    tEase == 23 ? n = SIN(n * HPI) :
                                                                                                                        // SineInOut
                                                                                                                        tEase == 24 ? n = (-COS(n * PI) + 1) * 0.5 :
                                                                                                                            ////////////////////////
                                                                                                                            // ElasticIn
                                                                                                                            tEase == 25 ? n = n === 0.0 ? 0.0 : n === 1.0 ? 1.0 : -1 * POW(2, 10 * (n -= 1)) * SIN((n - 0.075) * (PI2) / 0.3) :
                                                                                                                                // ElasticOut
                                                                                                                                tEase == 26 ? n = n === 0.0 ? 0.0 : n === 1.0 ? 1.0 : POW(2, -10 * n) * SIN((n - 0.075) * (PI2) / 0.3) + 1 :
                                                                                                                                    // ElasticInOut
                                                                                                                                    tEase == 27 ? n =
                                                                                                                                            (
                                                                                                                                                (n === 0.0 ? 0.0 : (n === 1.0 ? 1.0 : n *= 2)),
                                                                                                                                                    (n < 1) ?
                                                                                                                                                        -0.5 * POW(2, 10 * (n -= 1)) * SIN((n - 0.075) * (PI2) / 0.3) :
                                                                                                                                                        0.5 * POW(2, -10 * (n -= 1)) * SIN((n - 0.075) * (PI2) / 0.3) + 1
                                                                                                                                            ) :
                                                                                                                                        n;
                        }
                        if (tTweenKey == 'movementX') tTargetIndex = 0;
                        if (tTweenKey == 'movementY') tTargetIndex = 1;
                        if (tTweenKey == 'movementZ') tTargetIndex = 2;
                        if (tTweenKey == 'scale') tTargetIndex = 3;
                        if (tTweenKey == 'alpha') tTargetIndex = 7;
                        if (tTargetIndex < 3) {
                            this['_interleaveData'][tIndex + tTargetIndex] = tParticle['startCenter'][tTargetIndex] + tParticle[tTweenKey]['start'] + tParticle[tTweenKey]['gap'] * n;
                        } else {
                            this['_interleaveData'][tIndex + tTargetIndex] = tParticle[tTweenKey]['start'] + tParticle[tTweenKey]['gap'] * n;
                        }
                        // 중력계산
                        if (tInfo['gravity']) tParticle['_gravitySum'] -= tInfo['gravity'];
                        this['_interleaveData'][tIndex + 1] += tParticle['_gravitySum'];
                    }
                } else {
                    this['_interleaveData'][tIndex + 0] = tParticle['startCenter'][0] = this.x;
                    this['_interleaveData'][tIndex + 1] = tParticle['startCenter'][1] = this.y;
                    this['_interleaveData'][tIndex + 2] = tParticle['startCenter'][2] = this.z;
                    this['_interleaveData'][tIndex + 3] = tParticle['scale']['start'];
                    if (tInfo['tint'] == RedParticleEmitter.TINT_RANDOM) {
                        this['_interleaveData'][tIndex + 4] = Math.random();
                        this['_interleaveData'][tIndex + 5] = Math.random();
                        this['_interleaveData'][tIndex + 6] = Math.random();
                    } else {
                        this['_interleaveData'][tIndex + 4] = tInfo['tint'][0];
                        this['_interleaveData'][tIndex + 5] = tInfo['tint'][1];
                        this['_interleaveData'][tIndex + 6] = tInfo['tint'][2];
                    }
                    this['_interleaveData'][tIndex + 7] = 0;

                    tParticle['_gravitySum'] = 0;
                    tParticle['startTime'] = null;
                    tParticle['age'] = -1;
                }
            }
            this['_geometry']['interleaveBuffer'].upload(new Float32Array(this['_interleaveData']))
        }
    })();
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`diffuseTexture`,
		 description :`diffuseTexture`,
		 return : 'RedBitmapTexture'
	 }
     :DOC*/
    RedDefinePropertyInfo.definePrototype('RedParticleEmitter', 'diffuseTexture', 'sampler2D', {
        callback:function(v){
            this.material.diffuseTexture = v
        }
    });
    Object.freeze(RedParticleEmitter);
})();