/*
 * RedGL - MIT License
 * Copyright (c) 2018 - 2019 By RedCamel(webseon@gmail.com)
 * https://github.com/redcamel/RedGL2/blob/dev/LICENSE
 * Last modification time of this file - 2019.5.21 10:59
 */

var RedDefinePropertyInfo, RedGLDetect, RedGLUtil, RedGL, RedBoxSelection, RedBaseController, RedImageLoader, RedBaseTexture, RedBaseObject3D, RedBaseContainer, RedBaseLight, RedFrameBuffer, RedBuffer, RedGeometry, RedInterleaveInfo, RedBaseMaterial, RedTextureOptionChecker, RedBitmapTexture, RedVideoTexture, RedDDSTexture, RedBitmapCubeTexture, RedColorMaterial, RedColorPhongMaterial, RedColorPhongTextureMaterial, RedEnvironmentMaterial, RedBitmapMaterial, RedParticleMaterial, RedBitmapPointCloudMaterial, RedSheetMaterial, RedStandardMaterial, RedVideoMaterial, RedPBRMaterial, RedColorPointCloudMaterial, RedPBRMaterial_System, RedTextMaterial, RedAmbientLight, RedDirectionalLight, RedPointLight, RedMTLLoader, RedOBJLoader, Red3DSLoader, RedDAELoader, RedGLTFLoader, RedLinePoint, RedLathe, RedAxis, RedGrid, RedMesh, RedLine, RedLatheMesh, RedSkyBox, RedSprite3D, RedTransformController, RedPointCloud, RedParticleUnit, RedColorPointCloud, RedBitmapPointCloud, RedParticleEmitter, RedBox, RedCylinder, RedPlane, RedSphere, RedProgram, RedSystemShaderCode, RedShader, RedRenderer, RedRenderDebuger, RedSystemUniformUpdater, RedView, RedWorld, RedScene, RedCamera, RedBasicController, RedObitController, RedGridMaterial, RedSkyBoxMaterial, RedDirectionalShadowMaterial, RedPostEffectMaterial, RedDirectionalShadow, RedShadowManager, RedText, RedMouseEventManager, RedMouseEventMaterial, RedPostEffectManager, RedBasePostEffect, RedPostEffect_Bloom, RedPostEffect_BloomThreshold, RedPostEffect_Blur, RedPostEffect_BlurX, RedPostEffect_BlurY, RedPostEffect_GaussianBlur, RedPostEffect_ZoomBlur, RedPostEffect_BrightnessContrast, RedPostEffect_Threshold, RedPostEffect_Invert, RedPostEffect_Gray, RedPostEffect_HueSaturation, RedPostEffect_HalfTone, RedPostEffect_Pixelize, RedPostEffect_Convolution, RedPostEffect_DoF, RedPostEffect_DoF_DepthMaterial, RedPostEffect_Film, RedPostEffect_Vignetting, RedPostEffect_FXAA, RedGLOffScreen;
!function(e, t) {
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = t();
    else if ("function" == typeof define && define.amd)
        define([], t);
    else {
        var r = t();
        for (var n in r)
            ("object" == typeof exports ? exports : e)[n] = r[n]
    }
}(this, function() {
    return function(e) {
        function t(n) {
            if (r[n])
                return r[n].exports;
            var i = r[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(i.exports, i, i.exports, t),
                i.l = !0,
                i.exports
        }
        var r = {};
        return t.m = e,
            t.c = r,
            t.d = function(e, r, n) {
                t.o(e, r) || Object.defineProperty(e, r, {
                    configurable: !1,
                    enumerable: !0,
                    get: n
                })
            }
            ,
            t.n = function(e) {
                var r = e && e.__esModule ? function() {
                        return e.default
                    }
                    : function() {
                        return e
                    }
                ;
                return t.d(r, "a", r),
                    r
            }
            ,
            t.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }
            ,
            t.p = "",
            t(t.s = 4)
    }([function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.setMatrixArrayType = function(e) {
                t.ARRAY_TYPE = e
            }
            ,
            t.toRadian = function(e) {
                return e * i
            }
            ,
            t.equals = function(e, t) {
                return Math.abs(e - t) <= n * Math.max(1, Math.abs(e), Math.abs(t))
            }
        ;
        var n = t.EPSILON = 1e-6
            , i = (t.ARRAY_TYPE = "undefined" != typeof Float32Array ? Float32Array : Array,
            t.RANDOM = Math.random,
        Math.PI / 180)
    }
        , function(e, t, r) {
            "use strict";
            function n(e, t, r) {
                var n = t[0]
                    , i = t[1]
                    , a = t[2]
                    , o = t[3]
                    , s = t[4]
                    , d = t[5]
                    , l = t[6]
                    , u = t[7]
                    , c = t[8]
                    , f = r[0]
                    , h = r[1]
                    , R = r[2]
                    , m = r[3]
                    , p = r[4]
                    , _ = r[5]
                    , g = r[6]
                    , P = r[7]
                    , v = r[8];
                return e[0] = f * n + h * o + R * l,
                    e[1] = f * i + h * s + R * u,
                    e[2] = f * a + h * d + R * c,
                    e[3] = m * n + p * o + _ * l,
                    e[4] = m * i + p * s + _ * u,
                    e[5] = m * a + p * d + _ * c,
                    e[6] = g * n + P * o + v * l,
                    e[7] = g * i + P * s + v * u,
                    e[8] = g * a + P * d + v * c,
                    e
            }
            function i(e, t, r) {
                return e[0] = t[0] - r[0],
                    e[1] = t[1] - r[1],
                    e[2] = t[2] - r[2],
                    e[3] = t[3] - r[3],
                    e[4] = t[4] - r[4],
                    e[5] = t[5] - r[5],
                    e[6] = t[6] - r[6],
                    e[7] = t[7] - r[7],
                    e[8] = t[8] - r[8],
                    e
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                t.sub = t.mul = void 0,
                t.create = function() {
                    var e = new a.ARRAY_TYPE(9);
                    return e[0] = 1,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 0,
                        e[4] = 1,
                        e[5] = 0,
                        e[6] = 0,
                        e[7] = 0,
                        e[8] = 1,
                        e
                }
                ,
                t.fromMat4 = function(e, t) {
                    return e[0] = t[0],
                        e[1] = t[1],
                        e[2] = t[2],
                        e[3] = t[4],
                        e[4] = t[5],
                        e[5] = t[6],
                        e[6] = t[8],
                        e[7] = t[9],
                        e[8] = t[10],
                        e
                }
                ,
                t.clone = function(e) {
                    var t = new a.ARRAY_TYPE(9);
                    return t[0] = e[0],
                        t[1] = e[1],
                        t[2] = e[2],
                        t[3] = e[3],
                        t[4] = e[4],
                        t[5] = e[5],
                        t[6] = e[6],
                        t[7] = e[7],
                        t[8] = e[8],
                        t
                }
                ,
                t.copy = function(e, t) {
                    return e[0] = t[0],
                        e[1] = t[1],
                        e[2] = t[2],
                        e[3] = t[3],
                        e[4] = t[4],
                        e[5] = t[5],
                        e[6] = t[6],
                        e[7] = t[7],
                        e[8] = t[8],
                        e
                }
                ,
                t.fromValues = function(e, t, r, n, i, o, s, d, l) {
                    var u = new a.ARRAY_TYPE(9);
                    return u[0] = e,
                        u[1] = t,
                        u[2] = r,
                        u[3] = n,
                        u[4] = i,
                        u[5] = o,
                        u[6] = s,
                        u[7] = d,
                        u[8] = l,
                        u
                }
                ,
                t.set = function(e, t, r, n, i, a, o, s, d, l) {
                    return e[0] = t,
                        e[1] = r,
                        e[2] = n,
                        e[3] = i,
                        e[4] = a,
                        e[5] = o,
                        e[6] = s,
                        e[7] = d,
                        e[8] = l,
                        e
                }
                ,
                t.identity = function(e) {
                    return e[0] = 1,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 0,
                        e[4] = 1,
                        e[5] = 0,
                        e[6] = 0,
                        e[7] = 0,
                        e[8] = 1,
                        e
                }
                ,
                t.transpose = function(e, t) {
                    if (e === t) {
                        var r = t[1]
                            , n = t[2]
                            , i = t[5];
                        e[1] = t[3],
                            e[2] = t[6],
                            e[3] = r,
                            e[5] = t[7],
                            e[6] = n,
                            e[7] = i
                    } else
                        e[0] = t[0],
                            e[1] = t[3],
                            e[2] = t[6],
                            e[3] = t[1],
                            e[4] = t[4],
                            e[5] = t[7],
                            e[6] = t[2],
                            e[7] = t[5],
                            e[8] = t[8];
                    return e
                }
                ,
                t.invert = function(e, t) {
                    var r = t[0]
                        , n = t[1]
                        , i = t[2]
                        , a = t[3]
                        , o = t[4]
                        , s = t[5]
                        , d = t[6]
                        , l = t[7]
                        , u = t[8]
                        , c = u * o - s * l
                        , f = -u * a + s * d
                        , h = l * a - o * d
                        , R = r * c + n * f + i * h;
                    return R ? (R = 1 / R,
                        e[0] = c * R,
                        e[1] = (-u * n + i * l) * R,
                        e[2] = (s * n - i * o) * R,
                        e[3] = f * R,
                        e[4] = (u * r - i * d) * R,
                        e[5] = (-s * r + i * a) * R,
                        e[6] = h * R,
                        e[7] = (-l * r + n * d) * R,
                        e[8] = (o * r - n * a) * R,
                        e) : null
                }
                ,
                t.adjoint = function(e, t) {
                    var r = t[0]
                        , n = t[1]
                        , i = t[2]
                        , a = t[3]
                        , o = t[4]
                        , s = t[5]
                        , d = t[6]
                        , l = t[7]
                        , u = t[8];
                    return e[0] = o * u - s * l,
                        e[1] = i * l - n * u,
                        e[2] = n * s - i * o,
                        e[3] = s * d - a * u,
                        e[4] = r * u - i * d,
                        e[5] = i * a - r * s,
                        e[6] = a * l - o * d,
                        e[7] = n * d - r * l,
                        e[8] = r * o - n * a,
                        e
                }
                ,
                t.determinant = function(e) {
                    var t = e[0]
                        , r = e[1]
                        , n = e[2]
                        , i = e[3]
                        , a = e[4]
                        , o = e[5]
                        , s = e[6]
                        , d = e[7]
                        , l = e[8];
                    return t * (l * a - o * d) + r * (-l * i + o * s) + n * (d * i - a * s)
                }
                ,
                t.multiply = n,
                t.translate = function(e, t, r) {
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = t[3]
                        , s = t[4]
                        , d = t[5]
                        , l = t[6]
                        , u = t[7]
                        , c = t[8]
                        , f = r[0]
                        , h = r[1];
                    return e[0] = n,
                        e[1] = i,
                        e[2] = a,
                        e[3] = o,
                        e[4] = s,
                        e[5] = d,
                        e[6] = f * n + h * o + l,
                        e[7] = f * i + h * s + u,
                        e[8] = f * a + h * d + c,
                        e
                }
                ,
                t.rotate = function(e, t, r) {
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = t[3]
                        , s = t[4]
                        , d = t[5]
                        , l = t[6]
                        , u = t[7]
                        , c = t[8]
                        , f = Math.sin(r)
                        , h = Math.cos(r);
                    return e[0] = h * n + f * o,
                        e[1] = h * i + f * s,
                        e[2] = h * a + f * d,
                        e[3] = h * o - f * n,
                        e[4] = h * s - f * i,
                        e[5] = h * d - f * a,
                        e[6] = l,
                        e[7] = u,
                        e[8] = c,
                        e
                }
                ,
                t.scale = function(e, t, r) {
                    var n = r[0]
                        , i = r[1];
                    return e[0] = n * t[0],
                        e[1] = n * t[1],
                        e[2] = n * t[2],
                        e[3] = i * t[3],
                        e[4] = i * t[4],
                        e[5] = i * t[5],
                        e[6] = t[6],
                        e[7] = t[7],
                        e[8] = t[8],
                        e
                }
                ,
                t.fromTranslation = function(e, t) {
                    return e[0] = 1,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 0,
                        e[4] = 1,
                        e[5] = 0,
                        e[6] = t[0],
                        e[7] = t[1],
                        e[8] = 1,
                        e
                }
                ,
                t.fromRotation = function(e, t) {
                    var r = Math.sin(t)
                        , n = Math.cos(t);
                    return e[0] = n,
                        e[1] = r,
                        e[2] = 0,
                        e[3] = -r,
                        e[4] = n,
                        e[5] = 0,
                        e[6] = 0,
                        e[7] = 0,
                        e[8] = 1,
                        e
                }
                ,
                t.fromScaling = function(e, t) {
                    return e[0] = t[0],
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 0,
                        e[4] = t[1],
                        e[5] = 0,
                        e[6] = 0,
                        e[7] = 0,
                        e[8] = 1,
                        e
                }
                ,
                t.fromMat2d = function(e, t) {
                    return e[0] = t[0],
                        e[1] = t[1],
                        e[2] = 0,
                        e[3] = t[2],
                        e[4] = t[3],
                        e[5] = 0,
                        e[6] = t[4],
                        e[7] = t[5],
                        e[8] = 1,
                        e
                }
                ,
                t.fromQuat = function(e, t) {
                    var r = t[0]
                        , n = t[1]
                        , i = t[2]
                        , a = t[3]
                        , o = r + r
                        , s = n + n
                        , d = i + i
                        , l = r * o
                        , u = n * o
                        , c = n * s
                        , f = i * o
                        , h = i * s
                        , R = i * d
                        , m = a * o
                        , p = a * s
                        , _ = a * d;
                    return e[0] = 1 - c - R,
                        e[3] = u - _,
                        e[6] = f + p,
                        e[1] = u + _,
                        e[4] = 1 - l - R,
                        e[7] = h - m,
                        e[2] = f - p,
                        e[5] = h + m,
                        e[8] = 1 - l - c,
                        e
                }
                ,
                t.normalFromMat4 = function(e, t) {
                    var r = t[0]
                        , n = t[1]
                        , i = t[2]
                        , a = t[3]
                        , o = t[4]
                        , s = t[5]
                        , d = t[6]
                        , l = t[7]
                        , u = t[8]
                        , c = t[9]
                        , f = t[10]
                        , h = t[11]
                        , R = t[12]
                        , m = t[13]
                        , p = t[14]
                        , _ = t[15]
                        , g = r * s - n * o
                        , P = r * d - i * o
                        , v = r * l - a * o
                        , y = n * d - i * s
                        , E = n * l - a * s
                        , M = i * l - a * d
                        , b = u * m - c * R
                        , L = u * p - f * R
                        , T = u * _ - h * R
                        , x = c * p - f * m
                        , I = c * _ - h * m
                        , w = f * _ - h * p
                        , D = g * w - P * I + v * x + y * T - E * L + M * b;
                    return D ? (D = 1 / D,
                        e[0] = (s * w - d * I + l * x) * D,
                        e[1] = (d * T - o * w - l * L) * D,
                        e[2] = (o * I - s * T + l * b) * D,
                        e[3] = (i * I - n * w - a * x) * D,
                        e[4] = (r * w - i * T + a * L) * D,
                        e[5] = (n * T - r * I - a * b) * D,
                        e[6] = (m * M - p * E + _ * y) * D,
                        e[7] = (p * v - R * M - _ * P) * D,
                        e[8] = (R * E - m * v + _ * g) * D,
                        e) : null
                }
                ,
                t.projection = function(e, t, r) {
                    return e[0] = 2 / t,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 0,
                        e[4] = -2 / r,
                        e[5] = 0,
                        e[6] = -1,
                        e[7] = 1,
                        e[8] = 1,
                        e
                }
                ,
                t.str = function(e) {
                    return "mat3(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ")"
                }
                ,
                t.frob = function(e) {
                    return Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2) + Math.pow(e[2], 2) + Math.pow(e[3], 2) + Math.pow(e[4], 2) + Math.pow(e[5], 2) + Math.pow(e[6], 2) + Math.pow(e[7], 2) + Math.pow(e[8], 2))
                }
                ,
                t.add = function(e, t, r) {
                    return e[0] = t[0] + r[0],
                        e[1] = t[1] + r[1],
                        e[2] = t[2] + r[2],
                        e[3] = t[3] + r[3],
                        e[4] = t[4] + r[4],
                        e[5] = t[5] + r[5],
                        e[6] = t[6] + r[6],
                        e[7] = t[7] + r[7],
                        e[8] = t[8] + r[8],
                        e
                }
                ,
                t.subtract = i,
                t.multiplyScalar = function(e, t, r) {
                    return e[0] = t[0] * r,
                        e[1] = t[1] * r,
                        e[2] = t[2] * r,
                        e[3] = t[3] * r,
                        e[4] = t[4] * r,
                        e[5] = t[5] * r,
                        e[6] = t[6] * r,
                        e[7] = t[7] * r,
                        e[8] = t[8] * r,
                        e
                }
                ,
                t.multiplyScalarAndAdd = function(e, t, r, n) {
                    return e[0] = t[0] + r[0] * n,
                        e[1] = t[1] + r[1] * n,
                        e[2] = t[2] + r[2] * n,
                        e[3] = t[3] + r[3] * n,
                        e[4] = t[4] + r[4] * n,
                        e[5] = t[5] + r[5] * n,
                        e[6] = t[6] + r[6] * n,
                        e[7] = t[7] + r[7] * n,
                        e[8] = t[8] + r[8] * n,
                        e
                }
                ,
                t.exactEquals = function(e, t) {
                    return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8]
                }
                ,
                t.equals = function(e, t) {
                    var r = e[0]
                        , n = e[1]
                        , i = e[2]
                        , o = e[3]
                        , s = e[4]
                        , d = e[5]
                        , l = e[6]
                        , u = e[7]
                        , c = e[8]
                        , f = t[0]
                        , h = t[1]
                        , R = t[2]
                        , m = t[3]
                        , p = t[4]
                        , _ = t[5]
                        , g = t[6]
                        , P = t[7]
                        , v = t[8];
                    return Math.abs(r - f) <= a.EPSILON * Math.max(1, Math.abs(r), Math.abs(f)) && Math.abs(n - h) <= a.EPSILON * Math.max(1, Math.abs(n), Math.abs(h)) && Math.abs(i - R) <= a.EPSILON * Math.max(1, Math.abs(i), Math.abs(R)) && Math.abs(o - m) <= a.EPSILON * Math.max(1, Math.abs(o), Math.abs(m)) && Math.abs(s - p) <= a.EPSILON * Math.max(1, Math.abs(s), Math.abs(p)) && Math.abs(d - _) <= a.EPSILON * Math.max(1, Math.abs(d), Math.abs(_)) && Math.abs(l - g) <= a.EPSILON * Math.max(1, Math.abs(l), Math.abs(g)) && Math.abs(u - P) <= a.EPSILON * Math.max(1, Math.abs(u), Math.abs(P)) && Math.abs(c - v) <= a.EPSILON * Math.max(1, Math.abs(c), Math.abs(v))
                }
            ;
            var a = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                return t.default = e,
                    t
            }(r(0));
            t.mul = n,
                t.sub = i
        }
        , function(e, t, r) {
            "use strict";
            function n() {
                var e = new R.ARRAY_TYPE(3);
                return e[0] = 0,
                    e[1] = 0,
                    e[2] = 0,
                    e
            }
            function i(e) {
                var t = e[0]
                    , r = e[1]
                    , n = e[2];
                return Math.sqrt(t * t + r * r + n * n)
            }
            function a(e, t, r) {
                var n = new R.ARRAY_TYPE(3);
                return n[0] = e,
                    n[1] = t,
                    n[2] = r,
                    n
            }
            function o(e, t, r) {
                return e[0] = t[0] - r[0],
                    e[1] = t[1] - r[1],
                    e[2] = t[2] - r[2],
                    e
            }
            function s(e, t, r) {
                return e[0] = t[0] * r[0],
                    e[1] = t[1] * r[1],
                    e[2] = t[2] * r[2],
                    e
            }
            function d(e, t, r) {
                return e[0] = t[0] / r[0],
                    e[1] = t[1] / r[1],
                    e[2] = t[2] / r[2],
                    e
            }
            function l(e, t) {
                var r = t[0] - e[0]
                    , n = t[1] - e[1]
                    , i = t[2] - e[2];
                return Math.sqrt(r * r + n * n + i * i)
            }
            function u(e, t) {
                var r = t[0] - e[0]
                    , n = t[1] - e[1]
                    , i = t[2] - e[2];
                return r * r + n * n + i * i
            }
            function c(e) {
                var t = e[0]
                    , r = e[1]
                    , n = e[2];
                return t * t + r * r + n * n
            }
            function f(e, t) {
                var r = t[0]
                    , n = t[1]
                    , i = t[2]
                    , a = r * r + n * n + i * i;
                return a > 0 && (a = 1 / Math.sqrt(a),
                    e[0] = t[0] * a,
                    e[1] = t[1] * a,
                    e[2] = t[2] * a),
                    e
            }
            function h(e, t) {
                return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                t.forEach = t.sqrLen = t.len = t.sqrDist = t.dist = t.div = t.mul = t.sub = void 0,
                t.create = n,
                t.clone = function(e) {
                    var t = new R.ARRAY_TYPE(3);
                    return t[0] = e[0],
                        t[1] = e[1],
                        t[2] = e[2],
                        t
                }
                ,
                t.length = i,
                t.fromValues = a,
                t.copy = function(e, t) {
                    return e[0] = t[0],
                        e[1] = t[1],
                        e[2] = t[2],
                        e
                }
                ,
                t.set = function(e, t, r, n) {
                    return e[0] = t,
                        e[1] = r,
                        e[2] = n,
                        e
                }
                ,
                t.add = function(e, t, r) {
                    return e[0] = t[0] + r[0],
                        e[1] = t[1] + r[1],
                        e[2] = t[2] + r[2],
                        e
                }
                ,
                t.subtract = o,
                t.multiply = s,
                t.divide = d,
                t.ceil = function(e, t) {
                    return e[0] = Math.ceil(t[0]),
                        e[1] = Math.ceil(t[1]),
                        e[2] = Math.ceil(t[2]),
                        e
                }
                ,
                t.floor = function(e, t) {
                    return e[0] = Math.floor(t[0]),
                        e[1] = Math.floor(t[1]),
                        e[2] = Math.floor(t[2]),
                        e
                }
                ,
                t.min = function(e, t, r) {
                    return e[0] = Math.min(t[0], r[0]),
                        e[1] = Math.min(t[1], r[1]),
                        e[2] = Math.min(t[2], r[2]),
                        e
                }
                ,
                t.max = function(e, t, r) {
                    return e[0] = Math.max(t[0], r[0]),
                        e[1] = Math.max(t[1], r[1]),
                        e[2] = Math.max(t[2], r[2]),
                        e
                }
                ,
                t.round = function(e, t) {
                    return e[0] = Math.round(t[0]),
                        e[1] = Math.round(t[1]),
                        e[2] = Math.round(t[2]),
                        e
                }
                ,
                t.scale = function(e, t, r) {
                    return e[0] = t[0] * r,
                        e[1] = t[1] * r,
                        e[2] = t[2] * r,
                        e
                }
                ,
                t.scaleAndAdd = function(e, t, r, n) {
                    return e[0] = t[0] + r[0] * n,
                        e[1] = t[1] + r[1] * n,
                        e[2] = t[2] + r[2] * n,
                        e
                }
                ,
                t.distance = l,
                t.squaredDistance = u,
                t.squaredLength = c,
                t.negate = function(e, t) {
                    return e[0] = -t[0],
                        e[1] = -t[1],
                        e[2] = -t[2],
                        e
                }
                ,
                t.inverse = function(e, t) {
                    return e[0] = 1 / t[0],
                        e[1] = 1 / t[1],
                        e[2] = 1 / t[2],
                        e
                }
                ,
                t.normalize = f,
                t.dot = h,
                t.cross = function(e, t, r) {
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = r[0]
                        , s = r[1]
                        , d = r[2];
                    return e[0] = i * d - a * s,
                        e[1] = a * o - n * d,
                        e[2] = n * s - i * o,
                        e
                }
                ,
                t.lerp = function(e, t, r, n) {
                    var i = t[0]
                        , a = t[1]
                        , o = t[2];
                    return e[0] = i + n * (r[0] - i),
                        e[1] = a + n * (r[1] - a),
                        e[2] = o + n * (r[2] - o),
                        e
                }
                ,
                t.hermite = function(e, t, r, n, i, a) {
                    var o = a * a
                        , s = o * (2 * a - 3) + 1
                        , d = o * (a - 2) + a
                        , l = o * (a - 1)
                        , u = o * (3 - 2 * a);
                    return e[0] = t[0] * s + r[0] * d + n[0] * l + i[0] * u,
                        e[1] = t[1] * s + r[1] * d + n[1] * l + i[1] * u,
                        e[2] = t[2] * s + r[2] * d + n[2] * l + i[2] * u,
                        e
                }
                ,
                t.bezier = function(e, t, r, n, i, a) {
                    var o = 1 - a
                        , s = o * o
                        , d = a * a
                        , l = s * o
                        , u = 3 * a * s
                        , c = 3 * d * o
                        , f = d * a;
                    return e[0] = t[0] * l + r[0] * u + n[0] * c + i[0] * f,
                        e[1] = t[1] * l + r[1] * u + n[1] * c + i[1] * f,
                        e[2] = t[2] * l + r[2] * u + n[2] * c + i[2] * f,
                        e
                }
                ,
                t.random = function(e, t) {
                    t = t || 1;
                    var r = 2 * R.RANDOM() * Math.PI
                        , n = 2 * R.RANDOM() - 1
                        , i = Math.sqrt(1 - n * n) * t;
                    return e[0] = Math.cos(r) * i,
                        e[1] = Math.sin(r) * i,
                        e[2] = n * t,
                        e
                }
                ,
                t.transformMat4 = function(e, t, r) {
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = r[3] * n + r[7] * i + r[11] * a + r[15];
                    return o = o || 1,
                        e[0] = (r[0] * n + r[4] * i + r[8] * a + r[12]) / o,
                        e[1] = (r[1] * n + r[5] * i + r[9] * a + r[13]) / o,
                        e[2] = (r[2] * n + r[6] * i + r[10] * a + r[14]) / o,
                        e
                }
                ,
                t.transformMat3 = function(e, t, r) {
                    var n = t[0]
                        , i = t[1]
                        , a = t[2];
                    return e[0] = n * r[0] + i * r[3] + a * r[6],
                        e[1] = n * r[1] + i * r[4] + a * r[7],
                        e[2] = n * r[2] + i * r[5] + a * r[8],
                        e
                }
                ,
                t.transformQuat = function(e, t, r) {
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = r[0]
                        , s = r[1]
                        , d = r[2]
                        , l = r[3]
                        , u = l * n + s * a - d * i
                        , c = l * i + d * n - o * a
                        , f = l * a + o * i - s * n
                        , h = -o * n - s * i - d * a;
                    return e[0] = u * l + h * -o + c * -d - f * -s,
                        e[1] = c * l + h * -s + f * -o - u * -d,
                        e[2] = f * l + h * -d + u * -s - c * -o,
                        e
                }
                ,
                t.rotateX = function(e, t, r, n) {
                    var i = []
                        , a = [];
                    return i[0] = t[0] - r[0],
                        i[1] = t[1] - r[1],
                        i[2] = t[2] - r[2],
                        a[0] = i[0],
                        a[1] = i[1] * Math.cos(n) - i[2] * Math.sin(n),
                        a[2] = i[1] * Math.sin(n) + i[2] * Math.cos(n),
                        e[0] = a[0] + r[0],
                        e[1] = a[1] + r[1],
                        e[2] = a[2] + r[2],
                        e
                }
                ,
                t.rotateY = function(e, t, r, n) {
                    var i = []
                        , a = [];
                    return i[0] = t[0] - r[0],
                        i[1] = t[1] - r[1],
                        i[2] = t[2] - r[2],
                        a[0] = i[2] * Math.sin(n) + i[0] * Math.cos(n),
                        a[1] = i[1],
                        a[2] = i[2] * Math.cos(n) - i[0] * Math.sin(n),
                        e[0] = a[0] + r[0],
                        e[1] = a[1] + r[1],
                        e[2] = a[2] + r[2],
                        e
                }
                ,
                t.rotateZ = function(e, t, r, n) {
                    var i = []
                        , a = [];
                    return i[0] = t[0] - r[0],
                        i[1] = t[1] - r[1],
                        i[2] = t[2] - r[2],
                        a[0] = i[0] * Math.cos(n) - i[1] * Math.sin(n),
                        a[1] = i[0] * Math.sin(n) + i[1] * Math.cos(n),
                        a[2] = i[2],
                        e[0] = a[0] + r[0],
                        e[1] = a[1] + r[1],
                        e[2] = a[2] + r[2],
                        e
                }
                ,
                t.angle = function(e, t) {
                    var r = a(e[0], e[1], e[2])
                        , n = a(t[0], t[1], t[2]);
                    f(r, r),
                        f(n, n);
                    var i = h(r, n);
                    return i > 1 ? 0 : i < -1 ? Math.PI : Math.acos(i)
                }
                ,
                t.str = function(e) {
                    return "vec3(" + e[0] + ", " + e[1] + ", " + e[2] + ")"
                }
                ,
                t.exactEquals = function(e, t) {
                    return e[0] === t[0] && e[1] === t[1] && e[2] === t[2]
                }
                ,
                t.equals = function(e, t) {
                    var r = e[0]
                        , n = e[1]
                        , i = e[2]
                        , a = t[0]
                        , o = t[1]
                        , s = t[2];
                    return Math.abs(r - a) <= R.EPSILON * Math.max(1, Math.abs(r), Math.abs(a)) && Math.abs(n - o) <= R.EPSILON * Math.max(1, Math.abs(n), Math.abs(o)) && Math.abs(i - s) <= R.EPSILON * Math.max(1, Math.abs(i), Math.abs(s))
                }
            ;
            var R = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                return t.default = e,
                    t
            }(r(0));
            t.sub = o,
                t.mul = s,
                t.div = d,
                t.dist = l,
                t.sqrDist = u,
                t.len = i,
                t.sqrLen = c,
                t.forEach = function() {
                    var e = n();
                    return function(t, r, n, i, a, o) {
                        var s, d = void 0;
                        for (r || (r = 3),
                             n || (n = 0),
                                 s = i ? Math.min(i * r + n, t.length) : t.length,
                                 d = n; d < s; d += r)
                            e[0] = t[d],
                                e[1] = t[d + 1],
                                e[2] = t[d + 2],
                                a(e, e, o),
                                t[d] = e[0],
                                t[d + 1] = e[1],
                                t[d + 2] = e[2];
                        return t
                    }
                }()
        }
        , function(e, t, r) {
            "use strict";
            function n() {
                var e = new h.ARRAY_TYPE(4);
                return e[0] = 0,
                    e[1] = 0,
                    e[2] = 0,
                    e[3] = 0,
                    e
            }
            function i(e, t, r) {
                return e[0] = t[0] - r[0],
                    e[1] = t[1] - r[1],
                    e[2] = t[2] - r[2],
                    e[3] = t[3] - r[3],
                    e
            }
            function a(e, t, r) {
                return e[0] = t[0] * r[0],
                    e[1] = t[1] * r[1],
                    e[2] = t[2] * r[2],
                    e[3] = t[3] * r[3],
                    e
            }
            function o(e, t, r) {
                return e[0] = t[0] / r[0],
                    e[1] = t[1] / r[1],
                    e[2] = t[2] / r[2],
                    e[3] = t[3] / r[3],
                    e
            }
            function s(e, t, r) {
                return e[0] = t[0] * r,
                    e[1] = t[1] * r,
                    e[2] = t[2] * r,
                    e[3] = t[3] * r,
                    e
            }
            function d(e, t) {
                var r = t[0] - e[0]
                    , n = t[1] - e[1]
                    , i = t[2] - e[2]
                    , a = t[3] - e[3];
                return Math.sqrt(r * r + n * n + i * i + a * a)
            }
            function l(e, t) {
                var r = t[0] - e[0]
                    , n = t[1] - e[1]
                    , i = t[2] - e[2]
                    , a = t[3] - e[3];
                return r * r + n * n + i * i + a * a
            }
            function u(e) {
                var t = e[0]
                    , r = e[1]
                    , n = e[2]
                    , i = e[3];
                return Math.sqrt(t * t + r * r + n * n + i * i)
            }
            function c(e) {
                var t = e[0]
                    , r = e[1]
                    , n = e[2]
                    , i = e[3];
                return t * t + r * r + n * n + i * i
            }
            function f(e, t) {
                var r = t[0]
                    , n = t[1]
                    , i = t[2]
                    , a = t[3]
                    , o = r * r + n * n + i * i + a * a;
                return o > 0 && (o = 1 / Math.sqrt(o),
                    e[0] = r * o,
                    e[1] = n * o,
                    e[2] = i * o,
                    e[3] = a * o),
                    e
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                t.forEach = t.sqrLen = t.len = t.sqrDist = t.dist = t.div = t.mul = t.sub = void 0,
                t.create = n,
                t.clone = function(e) {
                    var t = new h.ARRAY_TYPE(4);
                    return t[0] = e[0],
                        t[1] = e[1],
                        t[2] = e[2],
                        t[3] = e[3],
                        t
                }
                ,
                t.fromValues = function(e, t, r, n) {
                    var i = new h.ARRAY_TYPE(4);
                    return i[0] = e,
                        i[1] = t,
                        i[2] = r,
                        i[3] = n,
                        i
                }
                ,
                t.copy = function(e, t) {
                    return e[0] = t[0],
                        e[1] = t[1],
                        e[2] = t[2],
                        e[3] = t[3],
                        e
                }
                ,
                t.set = function(e, t, r, n, i) {
                    return e[0] = t,
                        e[1] = r,
                        e[2] = n,
                        e[3] = i,
                        e
                }
                ,
                t.add = function(e, t, r) {
                    return e[0] = t[0] + r[0],
                        e[1] = t[1] + r[1],
                        e[2] = t[2] + r[2],
                        e[3] = t[3] + r[3],
                        e
                }
                ,
                t.subtract = i,
                t.multiply = a,
                t.divide = o,
                t.ceil = function(e, t) {
                    return e[0] = Math.ceil(t[0]),
                        e[1] = Math.ceil(t[1]),
                        e[2] = Math.ceil(t[2]),
                        e[3] = Math.ceil(t[3]),
                        e
                }
                ,
                t.floor = function(e, t) {
                    return e[0] = Math.floor(t[0]),
                        e[1] = Math.floor(t[1]),
                        e[2] = Math.floor(t[2]),
                        e[3] = Math.floor(t[3]),
                        e
                }
                ,
                t.min = function(e, t, r) {
                    return e[0] = Math.min(t[0], r[0]),
                        e[1] = Math.min(t[1], r[1]),
                        e[2] = Math.min(t[2], r[2]),
                        e[3] = Math.min(t[3], r[3]),
                        e
                }
                ,
                t.max = function(e, t, r) {
                    return e[0] = Math.max(t[0], r[0]),
                        e[1] = Math.max(t[1], r[1]),
                        e[2] = Math.max(t[2], r[2]),
                        e[3] = Math.max(t[3], r[3]),
                        e
                }
                ,
                t.round = function(e, t) {
                    return e[0] = Math.round(t[0]),
                        e[1] = Math.round(t[1]),
                        e[2] = Math.round(t[2]),
                        e[3] = Math.round(t[3]),
                        e
                }
                ,
                t.scale = s,
                t.scaleAndAdd = function(e, t, r, n) {
                    return e[0] = t[0] + r[0] * n,
                        e[1] = t[1] + r[1] * n,
                        e[2] = t[2] + r[2] * n,
                        e[3] = t[3] + r[3] * n,
                        e
                }
                ,
                t.distance = d,
                t.squaredDistance = l,
                t.length = u,
                t.squaredLength = c,
                t.negate = function(e, t) {
                    return e[0] = -t[0],
                        e[1] = -t[1],
                        e[2] = -t[2],
                        e[3] = -t[3],
                        e
                }
                ,
                t.inverse = function(e, t) {
                    return e[0] = 1 / t[0],
                        e[1] = 1 / t[1],
                        e[2] = 1 / t[2],
                        e[3] = 1 / t[3],
                        e
                }
                ,
                t.normalize = f,
                t.dot = function(e, t) {
                    return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3]
                }
                ,
                t.lerp = function(e, t, r, n) {
                    var i = t[0]
                        , a = t[1]
                        , o = t[2]
                        , s = t[3];
                    return e[0] = i + n * (r[0] - i),
                        e[1] = a + n * (r[1] - a),
                        e[2] = o + n * (r[2] - o),
                        e[3] = s + n * (r[3] - s),
                        e
                }
                ,
                t.random = function(e, t) {
                    return t = t || 1,
                        e[0] = h.RANDOM(),
                        e[1] = h.RANDOM(),
                        e[2] = h.RANDOM(),
                        e[3] = h.RANDOM(),
                        f(e, e),
                        s(e, e, t),
                        e
                }
                ,
                t.transformMat4 = function(e, t, r) {
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = t[3];
                    return e[0] = r[0] * n + r[4] * i + r[8] * a + r[12] * o,
                        e[1] = r[1] * n + r[5] * i + r[9] * a + r[13] * o,
                        e[2] = r[2] * n + r[6] * i + r[10] * a + r[14] * o,
                        e[3] = r[3] * n + r[7] * i + r[11] * a + r[15] * o,
                        e
                }
                ,
                t.transformQuat = function(e, t, r) {
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = r[0]
                        , s = r[1]
                        , d = r[2]
                        , l = r[3]
                        , u = l * n + s * a - d * i
                        , c = l * i + d * n - o * a
                        , f = l * a + o * i - s * n
                        , h = -o * n - s * i - d * a;
                    return e[0] = u * l + h * -o + c * -d - f * -s,
                        e[1] = c * l + h * -s + f * -o - u * -d,
                        e[2] = f * l + h * -d + u * -s - c * -o,
                        e[3] = t[3],
                        e
                }
                ,
                t.str = function(e) {
                    return "vec4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
                }
                ,
                t.exactEquals = function(e, t) {
                    return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3]
                }
                ,
                t.equals = function(e, t) {
                    var r = e[0]
                        , n = e[1]
                        , i = e[2]
                        , a = e[3]
                        , o = t[0]
                        , s = t[1]
                        , d = t[2]
                        , l = t[3];
                    return Math.abs(r - o) <= h.EPSILON * Math.max(1, Math.abs(r), Math.abs(o)) && Math.abs(n - s) <= h.EPSILON * Math.max(1, Math.abs(n), Math.abs(s)) && Math.abs(i - d) <= h.EPSILON * Math.max(1, Math.abs(i), Math.abs(d)) && Math.abs(a - l) <= h.EPSILON * Math.max(1, Math.abs(a), Math.abs(l))
                }
            ;
            var h = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                return t.default = e,
                    t
            }(r(0));
            t.sub = i,
                t.mul = a,
                t.div = o,
                t.dist = d,
                t.sqrDist = l,
                t.len = u,
                t.sqrLen = c,
                t.forEach = function() {
                    var e = n();
                    return function(t, r, n, i, a, o) {
                        var s, d = void 0;
                        for (r || (r = 4),
                             n || (n = 0),
                                 s = i ? Math.min(i * r + n, t.length) : t.length,
                                 d = n; d < s; d += r)
                            e[0] = t[d],
                                e[1] = t[d + 1],
                                e[2] = t[d + 2],
                                e[3] = t[d + 3],
                                a(e, e, o),
                                t[d] = e[0],
                                t[d + 1] = e[1],
                                t[d + 2] = e[2],
                                t[d + 3] = e[3];
                        return t
                    }
                }()
        }
        , function(e, t, r) {
            "use strict";
            function n(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                return t.default = e,
                    t
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                t.vec4 = t.vec3 = t.vec2 = t.quat = t.mat4 = t.mat3 = t.mat2d = t.mat2 = t.glMatrix = void 0;
            var i = n(r(0))
                , a = n(r(5))
                , o = n(r(6))
                , s = n(r(1))
                , d = n(r(7))
                , l = n(r(8))
                , u = n(r(9))
                , c = n(r(2))
                , f = n(r(3));
            t.glMatrix = i,
                t.mat2 = a,
                t.mat2d = o,
                t.mat3 = s,
                t.mat4 = d,
                t.quat = l,
                t.vec2 = u,
                t.vec3 = c,
                t.vec4 = f
        }
        , function(e, t, r) {
            "use strict";
            function n(e, t, r) {
                var n = t[0]
                    , i = t[1]
                    , a = t[2]
                    , o = t[3]
                    , s = r[0]
                    , d = r[1]
                    , l = r[2]
                    , u = r[3];
                return e[0] = n * s + a * d,
                    e[1] = i * s + o * d,
                    e[2] = n * l + a * u,
                    e[3] = i * l + o * u,
                    e
            }
            function i(e, t, r) {
                return e[0] = t[0] - r[0],
                    e[1] = t[1] - r[1],
                    e[2] = t[2] - r[2],
                    e[3] = t[3] - r[3],
                    e
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                t.sub = t.mul = void 0,
                t.create = function() {
                    var e = new a.ARRAY_TYPE(4);
                    return e[0] = 1,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 1,
                        e
                }
                ,
                t.clone = function(e) {
                    var t = new a.ARRAY_TYPE(4);
                    return t[0] = e[0],
                        t[1] = e[1],
                        t[2] = e[2],
                        t[3] = e[3],
                        t
                }
                ,
                t.copy = function(e, t) {
                    return e[0] = t[0],
                        e[1] = t[1],
                        e[2] = t[2],
                        e[3] = t[3],
                        e
                }
                ,
                t.identity = function(e) {
                    return e[0] = 1,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 1,
                        e
                }
                ,
                t.fromValues = function(e, t, r, n) {
                    var i = new a.ARRAY_TYPE(4);
                    return i[0] = e,
                        i[1] = t,
                        i[2] = r,
                        i[3] = n,
                        i
                }
                ,
                t.set = function(e, t, r, n, i) {
                    return e[0] = t,
                        e[1] = r,
                        e[2] = n,
                        e[3] = i,
                        e
                }
                ,
                t.transpose = function(e, t) {
                    if (e === t) {
                        var r = t[1];
                        e[1] = t[2],
                            e[2] = r
                    } else
                        e[0] = t[0],
                            e[1] = t[2],
                            e[2] = t[1],
                            e[3] = t[3];
                    return e
                }
                ,
                t.invert = function(e, t) {
                    var r = t[0]
                        , n = t[1]
                        , i = t[2]
                        , a = t[3]
                        , o = r * a - i * n;
                    return o ? (o = 1 / o,
                        e[0] = a * o,
                        e[1] = -n * o,
                        e[2] = -i * o,
                        e[3] = r * o,
                        e) : null
                }
                ,
                t.adjoint = function(e, t) {
                    var r = t[0];
                    return e[0] = t[3],
                        e[1] = -t[1],
                        e[2] = -t[2],
                        e[3] = r,
                        e
                }
                ,
                t.determinant = function(e) {
                    return e[0] * e[3] - e[2] * e[1]
                }
                ,
                t.multiply = n,
                t.rotate = function(e, t, r) {
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = t[3]
                        , s = Math.sin(r)
                        , d = Math.cos(r);
                    return e[0] = n * d + a * s,
                        e[1] = i * d + o * s,
                        e[2] = n * -s + a * d,
                        e[3] = i * -s + o * d,
                        e
                }
                ,
                t.scale = function(e, t, r) {
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = t[3]
                        , s = r[0]
                        , d = r[1];
                    return e[0] = n * s,
                        e[1] = i * s,
                        e[2] = a * d,
                        e[3] = o * d,
                        e
                }
                ,
                t.fromRotation = function(e, t) {
                    var r = Math.sin(t)
                        , n = Math.cos(t);
                    return e[0] = n,
                        e[1] = r,
                        e[2] = -r,
                        e[3] = n,
                        e
                }
                ,
                t.fromScaling = function(e, t) {
                    return e[0] = t[0],
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = t[1],
                        e
                }
                ,
                t.str = function(e) {
                    return "mat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
                }
                ,
                t.frob = function(e) {
                    return Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2) + Math.pow(e[2], 2) + Math.pow(e[3], 2))
                }
                ,
                t.LDU = function(e, t, r, n) {
                    return e[2] = n[2] / n[0],
                        r[0] = n[0],
                        r[1] = n[1],
                        r[3] = n[3] - e[2] * r[1],
                        [e, t, r]
                }
                ,
                t.add = function(e, t, r) {
                    return e[0] = t[0] + r[0],
                        e[1] = t[1] + r[1],
                        e[2] = t[2] + r[2],
                        e[3] = t[3] + r[3],
                        e
                }
                ,
                t.subtract = i,
                t.exactEquals = function(e, t) {
                    return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3]
                }
                ,
                t.equals = function(e, t) {
                    var r = e[0]
                        , n = e[1]
                        , i = e[2]
                        , o = e[3]
                        , s = t[0]
                        , d = t[1]
                        , l = t[2]
                        , u = t[3];
                    return Math.abs(r - s) <= a.EPSILON * Math.max(1, Math.abs(r), Math.abs(s)) && Math.abs(n - d) <= a.EPSILON * Math.max(1, Math.abs(n), Math.abs(d)) && Math.abs(i - l) <= a.EPSILON * Math.max(1, Math.abs(i), Math.abs(l)) && Math.abs(o - u) <= a.EPSILON * Math.max(1, Math.abs(o), Math.abs(u))
                }
                ,
                t.multiplyScalar = function(e, t, r) {
                    return e[0] = t[0] * r,
                        e[1] = t[1] * r,
                        e[2] = t[2] * r,
                        e[3] = t[3] * r,
                        e
                }
                ,
                t.multiplyScalarAndAdd = function(e, t, r, n) {
                    return e[0] = t[0] + r[0] * n,
                        e[1] = t[1] + r[1] * n,
                        e[2] = t[2] + r[2] * n,
                        e[3] = t[3] + r[3] * n,
                        e
                }
            ;
            var a = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                return t.default = e,
                    t
            }(r(0));
            t.mul = n,
                t.sub = i
        }
        , function(e, t, r) {
            "use strict";
            function n(e, t, r) {
                var n = t[0]
                    , i = t[1]
                    , a = t[2]
                    , o = t[3]
                    , s = t[4]
                    , d = t[5]
                    , l = r[0]
                    , u = r[1]
                    , c = r[2]
                    , f = r[3]
                    , h = r[4]
                    , R = r[5];
                return e[0] = n * l + a * u,
                    e[1] = i * l + o * u,
                    e[2] = n * c + a * f,
                    e[3] = i * c + o * f,
                    e[4] = n * h + a * R + s,
                    e[5] = i * h + o * R + d,
                    e
            }
            function i(e, t, r) {
                return e[0] = t[0] - r[0],
                    e[1] = t[1] - r[1],
                    e[2] = t[2] - r[2],
                    e[3] = t[3] - r[3],
                    e[4] = t[4] - r[4],
                    e[5] = t[5] - r[5],
                    e
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                t.sub = t.mul = void 0,
                t.create = function() {
                    var e = new a.ARRAY_TYPE(6);
                    return e[0] = 1,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 1,
                        e[4] = 0,
                        e[5] = 0,
                        e
                }
                ,
                t.clone = function(e) {
                    var t = new a.ARRAY_TYPE(6);
                    return t[0] = e[0],
                        t[1] = e[1],
                        t[2] = e[2],
                        t[3] = e[3],
                        t[4] = e[4],
                        t[5] = e[5],
                        t
                }
                ,
                t.copy = function(e, t) {
                    return e[0] = t[0],
                        e[1] = t[1],
                        e[2] = t[2],
                        e[3] = t[3],
                        e[4] = t[4],
                        e[5] = t[5],
                        e
                }
                ,
                t.identity = function(e) {
                    return e[0] = 1,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 1,
                        e[4] = 0,
                        e[5] = 0,
                        e
                }
                ,
                t.fromValues = function(e, t, r, n, i, o) {
                    var s = new a.ARRAY_TYPE(6);
                    return s[0] = e,
                        s[1] = t,
                        s[2] = r,
                        s[3] = n,
                        s[4] = i,
                        s[5] = o,
                        s
                }
                ,
                t.set = function(e, t, r, n, i, a, o) {
                    return e[0] = t,
                        e[1] = r,
                        e[2] = n,
                        e[3] = i,
                        e[4] = a,
                        e[5] = o,
                        e
                }
                ,
                t.invert = function(e, t) {
                    var r = t[0]
                        , n = t[1]
                        , i = t[2]
                        , a = t[3]
                        , o = t[4]
                        , s = t[5]
                        , d = r * a - n * i;
                    return d ? (d = 1 / d,
                        e[0] = a * d,
                        e[1] = -n * d,
                        e[2] = -i * d,
                        e[3] = r * d,
                        e[4] = (i * s - a * o) * d,
                        e[5] = (n * o - r * s) * d,
                        e) : null
                }
                ,
                t.determinant = function(e) {
                    return e[0] * e[3] - e[1] * e[2]
                }
                ,
                t.multiply = n,
                t.rotate = function(e, t, r) {
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = t[3]
                        , s = t[4]
                        , d = t[5]
                        , l = Math.sin(r)
                        , u = Math.cos(r);
                    return e[0] = n * u + a * l,
                        e[1] = i * u + o * l,
                        e[2] = n * -l + a * u,
                        e[3] = i * -l + o * u,
                        e[4] = s,
                        e[5] = d,
                        e
                }
                ,
                t.scale = function(e, t, r) {
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = t[3]
                        , s = t[4]
                        , d = t[5]
                        , l = r[0]
                        , u = r[1];
                    return e[0] = n * l,
                        e[1] = i * l,
                        e[2] = a * u,
                        e[3] = o * u,
                        e[4] = s,
                        e[5] = d,
                        e
                }
                ,
                t.translate = function(e, t, r) {
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = t[3]
                        , s = t[4]
                        , d = t[5]
                        , l = r[0]
                        , u = r[1];
                    return e[0] = n,
                        e[1] = i,
                        e[2] = a,
                        e[3] = o,
                        e[4] = n * l + a * u + s,
                        e[5] = i * l + o * u + d,
                        e
                }
                ,
                t.fromRotation = function(e, t) {
                    var r = Math.sin(t)
                        , n = Math.cos(t);
                    return e[0] = n,
                        e[1] = r,
                        e[2] = -r,
                        e[3] = n,
                        e[4] = 0,
                        e[5] = 0,
                        e
                }
                ,
                t.fromScaling = function(e, t) {
                    return e[0] = t[0],
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = t[1],
                        e[4] = 0,
                        e[5] = 0,
                        e
                }
                ,
                t.fromTranslation = function(e, t) {
                    return e[0] = 1,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 1,
                        e[4] = t[0],
                        e[5] = t[1],
                        e
                }
                ,
                t.str = function(e) {
                    return "mat2d(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ")"
                }
                ,
                t.frob = function(e) {
                    return Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2) + Math.pow(e[2], 2) + Math.pow(e[3], 2) + Math.pow(e[4], 2) + Math.pow(e[5], 2) + 1)
                }
                ,
                t.add = function(e, t, r) {
                    return e[0] = t[0] + r[0],
                        e[1] = t[1] + r[1],
                        e[2] = t[2] + r[2],
                        e[3] = t[3] + r[3],
                        e[4] = t[4] + r[4],
                        e[5] = t[5] + r[5],
                        e
                }
                ,
                t.subtract = i,
                t.multiplyScalar = function(e, t, r) {
                    return e[0] = t[0] * r,
                        e[1] = t[1] * r,
                        e[2] = t[2] * r,
                        e[3] = t[3] * r,
                        e[4] = t[4] * r,
                        e[5] = t[5] * r,
                        e
                }
                ,
                t.multiplyScalarAndAdd = function(e, t, r, n) {
                    return e[0] = t[0] + r[0] * n,
                        e[1] = t[1] + r[1] * n,
                        e[2] = t[2] + r[2] * n,
                        e[3] = t[3] + r[3] * n,
                        e[4] = t[4] + r[4] * n,
                        e[5] = t[5] + r[5] * n,
                        e
                }
                ,
                t.exactEquals = function(e, t) {
                    return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5]
                }
                ,
                t.equals = function(e, t) {
                    var r = e[0]
                        , n = e[1]
                        , i = e[2]
                        , o = e[3]
                        , s = e[4]
                        , d = e[5]
                        , l = t[0]
                        , u = t[1]
                        , c = t[2]
                        , f = t[3]
                        , h = t[4]
                        , R = t[5];
                    return Math.abs(r - l) <= a.EPSILON * Math.max(1, Math.abs(r), Math.abs(l)) && Math.abs(n - u) <= a.EPSILON * Math.max(1, Math.abs(n), Math.abs(u)) && Math.abs(i - c) <= a.EPSILON * Math.max(1, Math.abs(i), Math.abs(c)) && Math.abs(o - f) <= a.EPSILON * Math.max(1, Math.abs(o), Math.abs(f)) && Math.abs(s - h) <= a.EPSILON * Math.max(1, Math.abs(s), Math.abs(h)) && Math.abs(d - R) <= a.EPSILON * Math.max(1, Math.abs(d), Math.abs(R))
                }
            ;
            var a = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                return t.default = e,
                    t
            }(r(0));
            t.mul = n,
                t.sub = i
        }
        , function(e, t, r) {
            "use strict";
            function n(e, t, r) {
                var n = t[0]
                    , i = t[1]
                    , a = t[2]
                    , o = t[3]
                    , s = t[4]
                    , d = t[5]
                    , l = t[6]
                    , u = t[7]
                    , c = t[8]
                    , f = t[9]
                    , h = t[10]
                    , R = t[11]
                    , m = t[12]
                    , p = t[13]
                    , _ = t[14]
                    , g = t[15]
                    , P = r[0]
                    , v = r[1]
                    , y = r[2]
                    , E = r[3];
                return e[0] = P * n + v * s + y * c + E * m,
                    e[1] = P * i + v * d + y * f + E * p,
                    e[2] = P * a + v * l + y * h + E * _,
                    e[3] = P * o + v * u + y * R + E * g,
                    P = r[4],
                    v = r[5],
                    y = r[6],
                    E = r[7],
                    e[4] = P * n + v * s + y * c + E * m,
                    e[5] = P * i + v * d + y * f + E * p,
                    e[6] = P * a + v * l + y * h + E * _,
                    e[7] = P * o + v * u + y * R + E * g,
                    P = r[8],
                    v = r[9],
                    y = r[10],
                    E = r[11],
                    e[8] = P * n + v * s + y * c + E * m,
                    e[9] = P * i + v * d + y * f + E * p,
                    e[10] = P * a + v * l + y * h + E * _,
                    e[11] = P * o + v * u + y * R + E * g,
                    P = r[12],
                    v = r[13],
                    y = r[14],
                    E = r[15],
                    e[12] = P * n + v * s + y * c + E * m,
                    e[13] = P * i + v * d + y * f + E * p,
                    e[14] = P * a + v * l + y * h + E * _,
                    e[15] = P * o + v * u + y * R + E * g,
                    e
            }
            function i(e, t, r) {
                return e[0] = t[0] - r[0],
                    e[1] = t[1] - r[1],
                    e[2] = t[2] - r[2],
                    e[3] = t[3] - r[3],
                    e[4] = t[4] - r[4],
                    e[5] = t[5] - r[5],
                    e[6] = t[6] - r[6],
                    e[7] = t[7] - r[7],
                    e[8] = t[8] - r[8],
                    e[9] = t[9] - r[9],
                    e[10] = t[10] - r[10],
                    e[11] = t[11] - r[11],
                    e[12] = t[12] - r[12],
                    e[13] = t[13] - r[13],
                    e[14] = t[14] - r[14],
                    e[15] = t[15] - r[15],
                    e
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                t.sub = t.mul = void 0,
                t.create = function() {
                    var e = new a.ARRAY_TYPE(16);
                    return e[0] = 1,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 0,
                        e[4] = 0,
                        e[5] = 1,
                        e[6] = 0,
                        e[7] = 0,
                        e[8] = 0,
                        e[9] = 0,
                        e[10] = 1,
                        e[11] = 0,
                        e[12] = 0,
                        e[13] = 0,
                        e[14] = 0,
                        e[15] = 1,
                        e
                }
                ,
                t.clone = function(e) {
                    var t = new a.ARRAY_TYPE(16);
                    return t[0] = e[0],
                        t[1] = e[1],
                        t[2] = e[2],
                        t[3] = e[3],
                        t[4] = e[4],
                        t[5] = e[5],
                        t[6] = e[6],
                        t[7] = e[7],
                        t[8] = e[8],
                        t[9] = e[9],
                        t[10] = e[10],
                        t[11] = e[11],
                        t[12] = e[12],
                        t[13] = e[13],
                        t[14] = e[14],
                        t[15] = e[15],
                        t
                }
                ,
                t.copy = function(e, t) {
                    return e[0] = t[0],
                        e[1] = t[1],
                        e[2] = t[2],
                        e[3] = t[3],
                        e[4] = t[4],
                        e[5] = t[5],
                        e[6] = t[6],
                        e[7] = t[7],
                        e[8] = t[8],
                        e[9] = t[9],
                        e[10] = t[10],
                        e[11] = t[11],
                        e[12] = t[12],
                        e[13] = t[13],
                        e[14] = t[14],
                        e[15] = t[15],
                        e
                }
                ,
                t.fromValues = function(e, t, r, n, i, o, s, d, l, u, c, f, h, R, m, p) {
                    var _ = new a.ARRAY_TYPE(16);
                    return _[0] = e,
                        _[1] = t,
                        _[2] = r,
                        _[3] = n,
                        _[4] = i,
                        _[5] = o,
                        _[6] = s,
                        _[7] = d,
                        _[8] = l,
                        _[9] = u,
                        _[10] = c,
                        _[11] = f,
                        _[12] = h,
                        _[13] = R,
                        _[14] = m,
                        _[15] = p,
                        _
                }
                ,
                t.set = function(e, t, r, n, i, a, o, s, d, l, u, c, f, h, R, m, p) {
                    return e[0] = t,
                        e[1] = r,
                        e[2] = n,
                        e[3] = i,
                        e[4] = a,
                        e[5] = o,
                        e[6] = s,
                        e[7] = d,
                        e[8] = l,
                        e[9] = u,
                        e[10] = c,
                        e[11] = f,
                        e[12] = h,
                        e[13] = R,
                        e[14] = m,
                        e[15] = p,
                        e
                }
                ,
                t.identity = function(e) {
                    return e[0] = 1,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 0,
                        e[4] = 0,
                        e[5] = 1,
                        e[6] = 0,
                        e[7] = 0,
                        e[8] = 0,
                        e[9] = 0,
                        e[10] = 1,
                        e[11] = 0,
                        e[12] = 0,
                        e[13] = 0,
                        e[14] = 0,
                        e[15] = 1,
                        e
                }
                ,
                t.transpose = function(e, t) {
                    if (e === t) {
                        var r = t[1]
                            , n = t[2]
                            , i = t[3]
                            , a = t[6]
                            , o = t[7]
                            , s = t[11];
                        e[1] = t[4],
                            e[2] = t[8],
                            e[3] = t[12],
                            e[4] = r,
                            e[6] = t[9],
                            e[7] = t[13],
                            e[8] = n,
                            e[9] = a,
                            e[11] = t[14],
                            e[12] = i,
                            e[13] = o,
                            e[14] = s
                    } else
                        e[0] = t[0],
                            e[1] = t[4],
                            e[2] = t[8],
                            e[3] = t[12],
                            e[4] = t[1],
                            e[5] = t[5],
                            e[6] = t[9],
                            e[7] = t[13],
                            e[8] = t[2],
                            e[9] = t[6],
                            e[10] = t[10],
                            e[11] = t[14],
                            e[12] = t[3],
                            e[13] = t[7],
                            e[14] = t[11],
                            e[15] = t[15];
                    return e
                }
                ,
                t.invert = function(e, t) {
                    var r = t[0]
                        , n = t[1]
                        , i = t[2]
                        , a = t[3]
                        , o = t[4]
                        , s = t[5]
                        , d = t[6]
                        , l = t[7]
                        , u = t[8]
                        , c = t[9]
                        , f = t[10]
                        , h = t[11]
                        , R = t[12]
                        , m = t[13]
                        , p = t[14]
                        , _ = t[15]
                        , g = r * s - n * o
                        , P = r * d - i * o
                        , v = r * l - a * o
                        , y = n * d - i * s
                        , E = n * l - a * s
                        , M = i * l - a * d
                        , b = u * m - c * R
                        , L = u * p - f * R
                        , T = u * _ - h * R
                        , x = c * p - f * m
                        , I = c * _ - h * m
                        , w = f * _ - h * p
                        , D = g * w - P * I + v * x + y * T - E * L + M * b;
                    return D ? (D = 1 / D,
                        e[0] = (s * w - d * I + l * x) * D,
                        e[1] = (i * I - n * w - a * x) * D,
                        e[2] = (m * M - p * E + _ * y) * D,
                        e[3] = (f * E - c * M - h * y) * D,
                        e[4] = (d * T - o * w - l * L) * D,
                        e[5] = (r * w - i * T + a * L) * D,
                        e[6] = (p * v - R * M - _ * P) * D,
                        e[7] = (u * M - f * v + h * P) * D,
                        e[8] = (o * I - s * T + l * b) * D,
                        e[9] = (n * T - r * I - a * b) * D,
                        e[10] = (R * E - m * v + _ * g) * D,
                        e[11] = (c * v - u * E - h * g) * D,
                        e[12] = (s * L - o * x - d * b) * D,
                        e[13] = (r * x - n * L + i * b) * D,
                        e[14] = (m * P - R * y - p * g) * D,
                        e[15] = (u * y - c * P + f * g) * D,
                        e) : null
                }
                ,
                t.adjoint = function(e, t) {
                    var r = t[0]
                        , n = t[1]
                        , i = t[2]
                        , a = t[3]
                        , o = t[4]
                        , s = t[5]
                        , d = t[6]
                        , l = t[7]
                        , u = t[8]
                        , c = t[9]
                        , f = t[10]
                        , h = t[11]
                        , R = t[12]
                        , m = t[13]
                        , p = t[14]
                        , _ = t[15];
                    return e[0] = s * (f * _ - h * p) - c * (d * _ - l * p) + m * (d * h - l * f),
                        e[1] = -(n * (f * _ - h * p) - c * (i * _ - a * p) + m * (i * h - a * f)),
                        e[2] = n * (d * _ - l * p) - s * (i * _ - a * p) + m * (i * l - a * d),
                        e[3] = -(n * (d * h - l * f) - s * (i * h - a * f) + c * (i * l - a * d)),
                        e[4] = -(o * (f * _ - h * p) - u * (d * _ - l * p) + R * (d * h - l * f)),
                        e[5] = r * (f * _ - h * p) - u * (i * _ - a * p) + R * (i * h - a * f),
                        e[6] = -(r * (d * _ - l * p) - o * (i * _ - a * p) + R * (i * l - a * d)),
                        e[7] = r * (d * h - l * f) - o * (i * h - a * f) + u * (i * l - a * d),
                        e[8] = o * (c * _ - h * m) - u * (s * _ - l * m) + R * (s * h - l * c),
                        e[9] = -(r * (c * _ - h * m) - u * (n * _ - a * m) + R * (n * h - a * c)),
                        e[10] = r * (s * _ - l * m) - o * (n * _ - a * m) + R * (n * l - a * s),
                        e[11] = -(r * (s * h - l * c) - o * (n * h - a * c) + u * (n * l - a * s)),
                        e[12] = -(o * (c * p - f * m) - u * (s * p - d * m) + R * (s * f - d * c)),
                        e[13] = r * (c * p - f * m) - u * (n * p - i * m) + R * (n * f - i * c),
                        e[14] = -(r * (s * p - d * m) - o * (n * p - i * m) + R * (n * d - i * s)),
                        e[15] = r * (s * f - d * c) - o * (n * f - i * c) + u * (n * d - i * s),
                        e
                }
                ,
                t.determinant = function(e) {
                    var t = e[0]
                        , r = e[1]
                        , n = e[2]
                        , i = e[3]
                        , a = e[4]
                        , o = e[5]
                        , s = e[6]
                        , d = e[7]
                        , l = e[8]
                        , u = e[9]
                        , c = e[10]
                        , f = e[11]
                        , h = e[12]
                        , R = e[13]
                        , m = e[14]
                        , p = e[15];
                    return (t * o - r * a) * (c * p - f * m) - (t * s - n * a) * (u * p - f * R) + (t * d - i * a) * (u * m - c * R) + (r * s - n * o) * (l * p - f * h) - (r * d - i * o) * (l * m - c * h) + (n * d - i * s) * (l * R - u * h)
                }
                ,
                t.multiply = n,
                t.translate = function(e, t, r) {
                    var n = r[0]
                        , i = r[1]
                        , a = r[2]
                        , o = void 0
                        , s = void 0
                        , d = void 0
                        , l = void 0
                        , u = void 0
                        , c = void 0
                        , f = void 0
                        , h = void 0
                        , R = void 0
                        , m = void 0
                        , p = void 0
                        , _ = void 0;
                    return t === e ? (e[12] = t[0] * n + t[4] * i + t[8] * a + t[12],
                        e[13] = t[1] * n + t[5] * i + t[9] * a + t[13],
                        e[14] = t[2] * n + t[6] * i + t[10] * a + t[14],
                        e[15] = t[3] * n + t[7] * i + t[11] * a + t[15]) : (o = t[0],
                        s = t[1],
                        d = t[2],
                        l = t[3],
                        u = t[4],
                        c = t[5],
                        f = t[6],
                        h = t[7],
                        R = t[8],
                        m = t[9],
                        p = t[10],
                        _ = t[11],
                        e[0] = o,
                        e[1] = s,
                        e[2] = d,
                        e[3] = l,
                        e[4] = u,
                        e[5] = c,
                        e[6] = f,
                        e[7] = h,
                        e[8] = R,
                        e[9] = m,
                        e[10] = p,
                        e[11] = _,
                        e[12] = o * n + u * i + R * a + t[12],
                        e[13] = s * n + c * i + m * a + t[13],
                        e[14] = d * n + f * i + p * a + t[14],
                        e[15] = l * n + h * i + _ * a + t[15]),
                        e
                }
                ,
                t.scale = function(e, t, r) {
                    var n = r[0]
                        , i = r[1]
                        , a = r[2];
                    return e[0] = t[0] * n,
                        e[1] = t[1] * n,
                        e[2] = t[2] * n,
                        e[3] = t[3] * n,
                        e[4] = t[4] * i,
                        e[5] = t[5] * i,
                        e[6] = t[6] * i,
                        e[7] = t[7] * i,
                        e[8] = t[8] * a,
                        e[9] = t[9] * a,
                        e[10] = t[10] * a,
                        e[11] = t[11] * a,
                        e[12] = t[12],
                        e[13] = t[13],
                        e[14] = t[14],
                        e[15] = t[15],
                        e
                }
                ,
                t.rotate = function(e, t, r, n) {
                    var i = n[0]
                        , o = n[1]
                        , s = n[2]
                        , d = Math.sqrt(i * i + o * o + s * s)
                        , l = void 0
                        , u = void 0
                        , c = void 0
                        , f = void 0
                        , h = void 0
                        , R = void 0
                        , m = void 0
                        , p = void 0
                        , _ = void 0
                        , g = void 0
                        , P = void 0
                        , v = void 0
                        , y = void 0
                        , E = void 0
                        , M = void 0
                        , b = void 0
                        , L = void 0
                        , T = void 0
                        , x = void 0
                        , I = void 0
                        , w = void 0
                        , D = void 0
                        , U = void 0
                        , B = void 0;
                    return Math.abs(d) < a.EPSILON ? null : (i *= d = 1 / d,
                        o *= d,
                        s *= d,
                        l = Math.sin(r),
                        c = 1 - (u = Math.cos(r)),
                        f = t[0],
                        h = t[1],
                        R = t[2],
                        m = t[3],
                        p = t[4],
                        _ = t[5],
                        g = t[6],
                        P = t[7],
                        v = t[8],
                        y = t[9],
                        E = t[10],
                        M = t[11],
                        b = i * i * c + u,
                        L = o * i * c + s * l,
                        T = s * i * c - o * l,
                        x = i * o * c - s * l,
                        I = o * o * c + u,
                        w = s * o * c + i * l,
                        D = i * s * c + o * l,
                        U = o * s * c - i * l,
                        B = s * s * c + u,
                        e[0] = f * b + p * L + v * T,
                        e[1] = h * b + _ * L + y * T,
                        e[2] = R * b + g * L + E * T,
                        e[3] = m * b + P * L + M * T,
                        e[4] = f * x + p * I + v * w,
                        e[5] = h * x + _ * I + y * w,
                        e[6] = R * x + g * I + E * w,
                        e[7] = m * x + P * I + M * w,
                        e[8] = f * D + p * U + v * B,
                        e[9] = h * D + _ * U + y * B,
                        e[10] = R * D + g * U + E * B,
                        e[11] = m * D + P * U + M * B,
                    t !== e && (e[12] = t[12],
                        e[13] = t[13],
                        e[14] = t[14],
                        e[15] = t[15]),
                        e)
                }
                ,
                t.rotateX = function(e, t, r) {
                    var n = Math.sin(r)
                        , i = Math.cos(r)
                        , a = t[4]
                        , o = t[5]
                        , s = t[6]
                        , d = t[7]
                        , l = t[8]
                        , u = t[9]
                        , c = t[10]
                        , f = t[11];
                    return t !== e && (e[0] = t[0],
                        e[1] = t[1],
                        e[2] = t[2],
                        e[3] = t[3],
                        e[12] = t[12],
                        e[13] = t[13],
                        e[14] = t[14],
                        e[15] = t[15]),
                        e[4] = a * i + l * n,
                        e[5] = o * i + u * n,
                        e[6] = s * i + c * n,
                        e[7] = d * i + f * n,
                        e[8] = l * i - a * n,
                        e[9] = u * i - o * n,
                        e[10] = c * i - s * n,
                        e[11] = f * i - d * n,
                        e
                }
                ,
                t.rotateY = function(e, t, r) {
                    var n = Math.sin(r)
                        , i = Math.cos(r)
                        , a = t[0]
                        , o = t[1]
                        , s = t[2]
                        , d = t[3]
                        , l = t[8]
                        , u = t[9]
                        , c = t[10]
                        , f = t[11];
                    return t !== e && (e[4] = t[4],
                        e[5] = t[5],
                        e[6] = t[6],
                        e[7] = t[7],
                        e[12] = t[12],
                        e[13] = t[13],
                        e[14] = t[14],
                        e[15] = t[15]),
                        e[0] = a * i - l * n,
                        e[1] = o * i - u * n,
                        e[2] = s * i - c * n,
                        e[3] = d * i - f * n,
                        e[8] = a * n + l * i,
                        e[9] = o * n + u * i,
                        e[10] = s * n + c * i,
                        e[11] = d * n + f * i,
                        e
                }
                ,
                t.rotateZ = function(e, t, r) {
                    var n = Math.sin(r)
                        , i = Math.cos(r)
                        , a = t[0]
                        , o = t[1]
                        , s = t[2]
                        , d = t[3]
                        , l = t[4]
                        , u = t[5]
                        , c = t[6]
                        , f = t[7];
                    return t !== e && (e[8] = t[8],
                        e[9] = t[9],
                        e[10] = t[10],
                        e[11] = t[11],
                        e[12] = t[12],
                        e[13] = t[13],
                        e[14] = t[14],
                        e[15] = t[15]),
                        e[0] = a * i + l * n,
                        e[1] = o * i + u * n,
                        e[2] = s * i + c * n,
                        e[3] = d * i + f * n,
                        e[4] = l * i - a * n,
                        e[5] = u * i - o * n,
                        e[6] = c * i - s * n,
                        e[7] = f * i - d * n,
                        e
                }
                ,
                t.fromTranslation = function(e, t) {
                    return e[0] = 1,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 0,
                        e[4] = 0,
                        e[5] = 1,
                        e[6] = 0,
                        e[7] = 0,
                        e[8] = 0,
                        e[9] = 0,
                        e[10] = 1,
                        e[11] = 0,
                        e[12] = t[0],
                        e[13] = t[1],
                        e[14] = t[2],
                        e[15] = 1,
                        e
                }
                ,
                t.fromScaling = function(e, t) {
                    return e[0] = t[0],
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 0,
                        e[4] = 0,
                        e[5] = t[1],
                        e[6] = 0,
                        e[7] = 0,
                        e[8] = 0,
                        e[9] = 0,
                        e[10] = t[2],
                        e[11] = 0,
                        e[12] = 0,
                        e[13] = 0,
                        e[14] = 0,
                        e[15] = 1,
                        e
                }
                ,
                t.fromRotation = function(e, t, r) {
                    var n = r[0]
                        , i = r[1]
                        , o = r[2]
                        , s = Math.sqrt(n * n + i * i + o * o)
                        , d = void 0
                        , l = void 0
                        , u = void 0;
                    return Math.abs(s) < a.EPSILON ? null : (n *= s = 1 / s,
                        i *= s,
                        o *= s,
                        d = Math.sin(t),
                        u = 1 - (l = Math.cos(t)),
                        e[0] = n * n * u + l,
                        e[1] = i * n * u + o * d,
                        e[2] = o * n * u - i * d,
                        e[3] = 0,
                        e[4] = n * i * u - o * d,
                        e[5] = i * i * u + l,
                        e[6] = o * i * u + n * d,
                        e[7] = 0,
                        e[8] = n * o * u + i * d,
                        e[9] = i * o * u - n * d,
                        e[10] = o * o * u + l,
                        e[11] = 0,
                        e[12] = 0,
                        e[13] = 0,
                        e[14] = 0,
                        e[15] = 1,
                        e)
                }
                ,
                t.fromXRotation = function(e, t) {
                    var r = Math.sin(t)
                        , n = Math.cos(t);
                    return e[0] = 1,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 0,
                        e[4] = 0,
                        e[5] = n,
                        e[6] = r,
                        e[7] = 0,
                        e[8] = 0,
                        e[9] = -r,
                        e[10] = n,
                        e[11] = 0,
                        e[12] = 0,
                        e[13] = 0,
                        e[14] = 0,
                        e[15] = 1,
                        e
                }
                ,
                t.fromYRotation = function(e, t) {
                    var r = Math.sin(t)
                        , n = Math.cos(t);
                    return e[0] = n,
                        e[1] = 0,
                        e[2] = -r,
                        e[3] = 0,
                        e[4] = 0,
                        e[5] = 1,
                        e[6] = 0,
                        e[7] = 0,
                        e[8] = r,
                        e[9] = 0,
                        e[10] = n,
                        e[11] = 0,
                        e[12] = 0,
                        e[13] = 0,
                        e[14] = 0,
                        e[15] = 1,
                        e
                }
                ,
                t.fromZRotation = function(e, t) {
                    var r = Math.sin(t)
                        , n = Math.cos(t);
                    return e[0] = n,
                        e[1] = r,
                        e[2] = 0,
                        e[3] = 0,
                        e[4] = -r,
                        e[5] = n,
                        e[6] = 0,
                        e[7] = 0,
                        e[8] = 0,
                        e[9] = 0,
                        e[10] = 1,
                        e[11] = 0,
                        e[12] = 0,
                        e[13] = 0,
                        e[14] = 0,
                        e[15] = 1,
                        e
                }
                ,
                t.fromRotationTranslation = function(e, t, r) {
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = t[3]
                        , s = n + n
                        , d = i + i
                        , l = a + a
                        , u = n * s
                        , c = n * d
                        , f = n * l
                        , h = i * d
                        , R = i * l
                        , m = a * l
                        , p = o * s
                        , _ = o * d
                        , g = o * l;
                    return e[0] = 1 - (h + m),
                        e[1] = c + g,
                        e[2] = f - _,
                        e[3] = 0,
                        e[4] = c - g,
                        e[5] = 1 - (u + m),
                        e[6] = R + p,
                        e[7] = 0,
                        e[8] = f + _,
                        e[9] = R - p,
                        e[10] = 1 - (u + h),
                        e[11] = 0,
                        e[12] = r[0],
                        e[13] = r[1],
                        e[14] = r[2],
                        e[15] = 1,
                        e
                }
                ,
                t.getTranslation = function(e, t) {
                    return e[0] = t[12],
                        e[1] = t[13],
                        e[2] = t[14],
                        e
                }
                ,
                t.getScaling = function(e, t) {
                    var r = t[0]
                        , n = t[1]
                        , i = t[2]
                        , a = t[4]
                        , o = t[5]
                        , s = t[6]
                        , d = t[8]
                        , l = t[9]
                        , u = t[10];
                    return e[0] = Math.sqrt(r * r + n * n + i * i),
                        e[1] = Math.sqrt(a * a + o * o + s * s),
                        e[2] = Math.sqrt(d * d + l * l + u * u),
                        e
                }
                ,
                t.getRotation = function(e, t) {
                    var r = t[0] + t[5] + t[10]
                        , n = 0;
                    return r > 0 ? (n = 2 * Math.sqrt(r + 1),
                        e[3] = .25 * n,
                        e[0] = (t[6] - t[9]) / n,
                        e[1] = (t[8] - t[2]) / n,
                        e[2] = (t[1] - t[4]) / n) : t[0] > t[5] & t[0] > t[10] ? (n = 2 * Math.sqrt(1 + t[0] - t[5] - t[10]),
                        e[3] = (t[6] - t[9]) / n,
                        e[0] = .25 * n,
                        e[1] = (t[1] + t[4]) / n,
                        e[2] = (t[8] + t[2]) / n) : t[5] > t[10] ? (n = 2 * Math.sqrt(1 + t[5] - t[0] - t[10]),
                        e[3] = (t[8] - t[2]) / n,
                        e[0] = (t[1] + t[4]) / n,
                        e[1] = .25 * n,
                        e[2] = (t[6] + t[9]) / n) : (n = 2 * Math.sqrt(1 + t[10] - t[0] - t[5]),
                        e[3] = (t[1] - t[4]) / n,
                        e[0] = (t[8] + t[2]) / n,
                        e[1] = (t[6] + t[9]) / n,
                        e[2] = .25 * n),
                        e
                }
                ,
                t.fromRotationTranslationScale = function(e, t, r, n) {
                    var i = t[0]
                        , a = t[1]
                        , o = t[2]
                        , s = t[3]
                        , d = i + i
                        , l = a + a
                        , u = o + o
                        , c = i * d
                        , f = i * l
                        , h = i * u
                        , R = a * l
                        , m = a * u
                        , p = o * u
                        , _ = s * d
                        , g = s * l
                        , P = s * u
                        , v = n[0]
                        , y = n[1]
                        , E = n[2];
                    return e[0] = (1 - (R + p)) * v,
                        e[1] = (f + P) * v,
                        e[2] = (h - g) * v,
                        e[3] = 0,
                        e[4] = (f - P) * y,
                        e[5] = (1 - (c + p)) * y,
                        e[6] = (m + _) * y,
                        e[7] = 0,
                        e[8] = (h + g) * E,
                        e[9] = (m - _) * E,
                        e[10] = (1 - (c + R)) * E,
                        e[11] = 0,
                        e[12] = r[0],
                        e[13] = r[1],
                        e[14] = r[2],
                        e[15] = 1,
                        e
                }
                ,
                t.fromRotationTranslationScaleOrigin = function(e, t, r, n, i) {
                    var a = t[0]
                        , o = t[1]
                        , s = t[2]
                        , d = t[3]
                        , l = a + a
                        , u = o + o
                        , c = s + s
                        , f = a * l
                        , h = a * u
                        , R = a * c
                        , m = o * u
                        , p = o * c
                        , _ = s * c
                        , g = d * l
                        , P = d * u
                        , v = d * c
                        , y = n[0]
                        , E = n[1]
                        , M = n[2]
                        , b = i[0]
                        , L = i[1]
                        , T = i[2];
                    return e[0] = (1 - (m + _)) * y,
                        e[1] = (h + v) * y,
                        e[2] = (R - P) * y,
                        e[3] = 0,
                        e[4] = (h - v) * E,
                        e[5] = (1 - (f + _)) * E,
                        e[6] = (p + g) * E,
                        e[7] = 0,
                        e[8] = (R + P) * M,
                        e[9] = (p - g) * M,
                        e[10] = (1 - (f + m)) * M,
                        e[11] = 0,
                        e[12] = r[0] + b - (e[0] * b + e[4] * L + e[8] * T),
                        e[13] = r[1] + L - (e[1] * b + e[5] * L + e[9] * T),
                        e[14] = r[2] + T - (e[2] * b + e[6] * L + e[10] * T),
                        e[15] = 1,
                        e
                }
                ,
                t.fromQuat = function(e, t) {
                    var r = t[0]
                        , n = t[1]
                        , i = t[2]
                        , a = t[3]
                        , o = r + r
                        , s = n + n
                        , d = i + i
                        , l = r * o
                        , u = n * o
                        , c = n * s
                        , f = i * o
                        , h = i * s
                        , R = i * d
                        , m = a * o
                        , p = a * s
                        , _ = a * d;
                    return e[0] = 1 - c - R,
                        e[1] = u + _,
                        e[2] = f - p,
                        e[3] = 0,
                        e[4] = u - _,
                        e[5] = 1 - l - R,
                        e[6] = h + m,
                        e[7] = 0,
                        e[8] = f + p,
                        e[9] = h - m,
                        e[10] = 1 - l - c,
                        e[11] = 0,
                        e[12] = 0,
                        e[13] = 0,
                        e[14] = 0,
                        e[15] = 1,
                        e
                }
                ,
                t.frustum = function(e, t, r, n, i, a, o) {
                    var s = 1 / (r - t)
                        , d = 1 / (i - n)
                        , l = 1 / (a - o);
                    return e[0] = 2 * a * s,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 0,
                        e[4] = 0,
                        e[5] = 2 * a * d,
                        e[6] = 0,
                        e[7] = 0,
                        e[8] = (r + t) * s,
                        e[9] = (i + n) * d,
                        e[10] = (o + a) * l,
                        e[11] = -1,
                        e[12] = 0,
                        e[13] = 0,
                        e[14] = o * a * 2 * l,
                        e[15] = 0,
                        e
                }
                ,
                t.perspective = function(e, t, r, n, i) {
                    var a = 1 / Math.tan(t / 2)
                        , o = 1 / (n - i);
                    return e[0] = a / r,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 0,
                        e[4] = 0,
                        e[5] = a,
                        e[6] = 0,
                        e[7] = 0,
                        e[8] = 0,
                        e[9] = 0,
                        e[10] = (i + n) * o,
                        e[11] = -1,
                        e[12] = 0,
                        e[13] = 0,
                        e[14] = 2 * i * n * o,
                        e[15] = 0,
                        e
                }
                ,
                t.perspectiveFromFieldOfView = function(e, t, r, n) {
                    var i = Math.tan(t.upDegrees * Math.PI / 180)
                        , a = Math.tan(t.downDegrees * Math.PI / 180)
                        , o = Math.tan(t.leftDegrees * Math.PI / 180)
                        , s = Math.tan(t.rightDegrees * Math.PI / 180)
                        , d = 2 / (o + s)
                        , l = 2 / (i + a);
                    return e[0] = d,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 0,
                        e[4] = 0,
                        e[5] = l,
                        e[6] = 0,
                        e[7] = 0,
                        e[8] = -(o - s) * d * .5,
                        e[9] = (i - a) * l * .5,
                        e[10] = n / (r - n),
                        e[11] = -1,
                        e[12] = 0,
                        e[13] = 0,
                        e[14] = n * r / (r - n),
                        e[15] = 0,
                        e
                }
                ,
                t.ortho = function(e, t, r, n, i, a, o) {
                    var s = 1 / (t - r)
                        , d = 1 / (n - i)
                        , l = 1 / (a - o);
                    return e[0] = -2 * s,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 0,
                        e[4] = 0,
                        e[5] = -2 * d,
                        e[6] = 0,
                        e[7] = 0,
                        e[8] = 0,
                        e[9] = 0,
                        e[10] = 2 * l,
                        e[11] = 0,
                        e[12] = (t + r) * s,
                        e[13] = (i + n) * d,
                        e[14] = (o + a) * l,
                        e[15] = 1,
                        e
                }
                ,
                t.lookAt = function(e, t, r, n) {
                    var i = void 0
                        , o = void 0
                        , s = void 0
                        , d = void 0
                        , l = void 0
                        , u = void 0
                        , c = void 0
                        , f = void 0
                        , h = void 0
                        , R = void 0
                        , m = t[0]
                        , p = t[1]
                        , _ = t[2]
                        , g = n[0]
                        , P = n[1]
                        , v = n[2]
                        , y = r[0]
                        , E = r[1]
                        , M = r[2];
                    return Math.abs(m - y) < a.EPSILON && Math.abs(p - E) < a.EPSILON && Math.abs(_ - M) < a.EPSILON ? mat4.identity(e) : (c = m - y,
                        f = p - E,
                        h = _ - M,
                        i = P * (h *= R = 1 / Math.sqrt(c * c + f * f + h * h)) - v * (f *= R),
                        o = v * (c *= R) - g * h,
                        s = g * f - P * c,
                        (R = Math.sqrt(i * i + o * o + s * s)) ? (i *= R = 1 / R,
                            o *= R,
                            s *= R) : (i = 0,
                            o = 0,
                            s = 0),
                        d = f * s - h * o,
                        l = h * i - c * s,
                        u = c * o - f * i,
                        (R = Math.sqrt(d * d + l * l + u * u)) ? (d *= R = 1 / R,
                            l *= R,
                            u *= R) : (d = 0,
                            l = 0,
                            u = 0),
                        e[0] = i,
                        e[1] = d,
                        e[2] = c,
                        e[3] = 0,
                        e[4] = o,
                        e[5] = l,
                        e[6] = f,
                        e[7] = 0,
                        e[8] = s,
                        e[9] = u,
                        e[10] = h,
                        e[11] = 0,
                        e[12] = -(i * m + o * p + s * _),
                        e[13] = -(d * m + l * p + u * _),
                        e[14] = -(c * m + f * p + h * _),
                        e[15] = 1,
                        e)
                }
                ,
                t.targetTo = function(e, t, r, n) {
                    var i = t[0]
                        , a = t[1]
                        , o = t[2]
                        , s = n[0]
                        , d = n[1]
                        , l = n[2]
                        , u = i - r[0]
                        , c = a - r[1]
                        , f = o - r[2]
                        , h = u * u + c * c + f * f;
                    h > 0 && (u *= h = 1 / Math.sqrt(h),
                        c *= h,
                        f *= h);
                    var R = d * f - l * c
                        , m = l * u - s * f
                        , p = s * c - d * u;
                    return e[0] = R,
                        e[1] = m,
                        e[2] = p,
                        e[3] = 0,
                        e[4] = c * p - f * m,
                        e[5] = f * R - u * p,
                        e[6] = u * m - c * R,
                        e[7] = 0,
                        e[8] = u,
                        e[9] = c,
                        e[10] = f,
                        e[11] = 0,
                        e[12] = i,
                        e[13] = a,
                        e[14] = o,
                        e[15] = 1,
                        e
                }
                ,
                t.str = function(e) {
                    return "mat4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ", " + e[9] + ", " + e[10] + ", " + e[11] + ", " + e[12] + ", " + e[13] + ", " + e[14] + ", " + e[15] + ")"
                }
                ,
                t.frob = function(e) {
                    return Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2) + Math.pow(e[2], 2) + Math.pow(e[3], 2) + Math.pow(e[4], 2) + Math.pow(e[5], 2) + Math.pow(e[6], 2) + Math.pow(e[7], 2) + Math.pow(e[8], 2) + Math.pow(e[9], 2) + Math.pow(e[10], 2) + Math.pow(e[11], 2) + Math.pow(e[12], 2) + Math.pow(e[13], 2) + Math.pow(e[14], 2) + Math.pow(e[15], 2))
                }
                ,
                t.add = function(e, t, r) {
                    return e[0] = t[0] + r[0],
                        e[1] = t[1] + r[1],
                        e[2] = t[2] + r[2],
                        e[3] = t[3] + r[3],
                        e[4] = t[4] + r[4],
                        e[5] = t[5] + r[5],
                        e[6] = t[6] + r[6],
                        e[7] = t[7] + r[7],
                        e[8] = t[8] + r[8],
                        e[9] = t[9] + r[9],
                        e[10] = t[10] + r[10],
                        e[11] = t[11] + r[11],
                        e[12] = t[12] + r[12],
                        e[13] = t[13] + r[13],
                        e[14] = t[14] + r[14],
                        e[15] = t[15] + r[15],
                        e
                }
                ,
                t.subtract = i,
                t.multiplyScalar = function(e, t, r) {
                    return e[0] = t[0] * r,
                        e[1] = t[1] * r,
                        e[2] = t[2] * r,
                        e[3] = t[3] * r,
                        e[4] = t[4] * r,
                        e[5] = t[5] * r,
                        e[6] = t[6] * r,
                        e[7] = t[7] * r,
                        e[8] = t[8] * r,
                        e[9] = t[9] * r,
                        e[10] = t[10] * r,
                        e[11] = t[11] * r,
                        e[12] = t[12] * r,
                        e[13] = t[13] * r,
                        e[14] = t[14] * r,
                        e[15] = t[15] * r,
                        e
                }
                ,
                t.multiplyScalarAndAdd = function(e, t, r, n) {
                    return e[0] = t[0] + r[0] * n,
                        e[1] = t[1] + r[1] * n,
                        e[2] = t[2] + r[2] * n,
                        e[3] = t[3] + r[3] * n,
                        e[4] = t[4] + r[4] * n,
                        e[5] = t[5] + r[5] * n,
                        e[6] = t[6] + r[6] * n,
                        e[7] = t[7] + r[7] * n,
                        e[8] = t[8] + r[8] * n,
                        e[9] = t[9] + r[9] * n,
                        e[10] = t[10] + r[10] * n,
                        e[11] = t[11] + r[11] * n,
                        e[12] = t[12] + r[12] * n,
                        e[13] = t[13] + r[13] * n,
                        e[14] = t[14] + r[14] * n,
                        e[15] = t[15] + r[15] * n,
                        e
                }
                ,
                t.exactEquals = function(e, t) {
                    return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8] && e[9] === t[9] && e[10] === t[10] && e[11] === t[11] && e[12] === t[12] && e[13] === t[13] && e[14] === t[14] && e[15] === t[15]
                }
                ,
                t.equals = function(e, t) {
                    var r = e[0]
                        , n = e[1]
                        , i = e[2]
                        , o = e[3]
                        , s = e[4]
                        , d = e[5]
                        , l = e[6]
                        , u = e[7]
                        , c = e[8]
                        , f = e[9]
                        , h = e[10]
                        , R = e[11]
                        , m = e[12]
                        , p = e[13]
                        , _ = e[14]
                        , g = e[15]
                        , P = t[0]
                        , v = t[1]
                        , y = t[2]
                        , E = t[3]
                        , M = t[4]
                        , b = t[5]
                        , L = t[6]
                        , T = t[7]
                        , x = t[8]
                        , I = t[9]
                        , w = t[10]
                        , D = t[11]
                        , U = t[12]
                        , B = t[13]
                        , G = t[14]
                        , S = t[15];
                    return Math.abs(r - P) <= a.EPSILON * Math.max(1, Math.abs(r), Math.abs(P)) && Math.abs(n - v) <= a.EPSILON * Math.max(1, Math.abs(n), Math.abs(v)) && Math.abs(i - y) <= a.EPSILON * Math.max(1, Math.abs(i), Math.abs(y)) && Math.abs(o - E) <= a.EPSILON * Math.max(1, Math.abs(o), Math.abs(E)) && Math.abs(s - M) <= a.EPSILON * Math.max(1, Math.abs(s), Math.abs(M)) && Math.abs(d - b) <= a.EPSILON * Math.max(1, Math.abs(d), Math.abs(b)) && Math.abs(l - L) <= a.EPSILON * Math.max(1, Math.abs(l), Math.abs(L)) && Math.abs(u - T) <= a.EPSILON * Math.max(1, Math.abs(u), Math.abs(T)) && Math.abs(c - x) <= a.EPSILON * Math.max(1, Math.abs(c), Math.abs(x)) && Math.abs(f - I) <= a.EPSILON * Math.max(1, Math.abs(f), Math.abs(I)) && Math.abs(h - w) <= a.EPSILON * Math.max(1, Math.abs(h), Math.abs(w)) && Math.abs(R - D) <= a.EPSILON * Math.max(1, Math.abs(R), Math.abs(D)) && Math.abs(m - U) <= a.EPSILON * Math.max(1, Math.abs(m), Math.abs(U)) && Math.abs(p - B) <= a.EPSILON * Math.max(1, Math.abs(p), Math.abs(B)) && Math.abs(_ - G) <= a.EPSILON * Math.max(1, Math.abs(_), Math.abs(G)) && Math.abs(g - S) <= a.EPSILON * Math.max(1, Math.abs(g), Math.abs(S))
                }
            ;
            var a = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                return t.default = e,
                    t
            }(r(0));
            t.mul = n,
                t.sub = i
        }
        , function(e, t, r) {
            "use strict";
            function n(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                return t.default = e,
                    t
            }
            function i() {
                var e = new l.ARRAY_TYPE(4);
                return e[0] = 0,
                    e[1] = 0,
                    e[2] = 0,
                    e[3] = 1,
                    e
            }
            function a(e, t, r) {
                r *= .5;
                var n = Math.sin(r);
                return e[0] = n * t[0],
                    e[1] = n * t[1],
                    e[2] = n * t[2],
                    e[3] = Math.cos(r),
                    e
            }
            function o(e, t, r) {
                var n = t[0]
                    , i = t[1]
                    , a = t[2]
                    , o = t[3]
                    , s = r[0]
                    , d = r[1]
                    , l = r[2]
                    , u = r[3];
                return e[0] = n * u + o * s + i * l - a * d,
                    e[1] = i * u + o * d + a * s - n * l,
                    e[2] = a * u + o * l + n * d - i * s,
                    e[3] = o * u - n * s - i * d - a * l,
                    e
            }
            function s(e, t, r, n) {
                var i = t[0]
                    , a = t[1]
                    , o = t[2]
                    , s = t[3]
                    , d = r[0]
                    , l = r[1]
                    , u = r[2]
                    , c = r[3]
                    , f = void 0
                    , h = void 0
                    , R = void 0
                    , m = void 0
                    , p = void 0;
                return (h = i * d + a * l + o * u + s * c) < 0 && (h = -h,
                    d = -d,
                    l = -l,
                    u = -u,
                    c = -c),
                    1 - h > 1e-6 ? (f = Math.acos(h),
                        R = Math.sin(f),
                        m = Math.sin((1 - n) * f) / R,
                        p = Math.sin(n * f) / R) : (m = 1 - n,
                        p = n),
                    e[0] = m * i + p * d,
                    e[1] = m * a + p * l,
                    e[2] = m * o + p * u,
                    e[3] = m * s + p * c,
                    e
            }
            function d(e, t) {
                var r = t[0] + t[4] + t[8]
                    , n = void 0;
                if (r > 0)
                    n = Math.sqrt(r + 1),
                        e[3] = .5 * n,
                        n = .5 / n,
                        e[0] = (t[5] - t[7]) * n,
                        e[1] = (t[6] - t[2]) * n,
                        e[2] = (t[1] - t[3]) * n;
                else {
                    var i = 0;
                    t[4] > t[0] && (i = 1),
                    t[8] > t[3 * i + i] && (i = 2);
                    var a = (i + 1) % 3
                        , o = (i + 2) % 3;
                    n = Math.sqrt(t[3 * i + i] - t[3 * a + a] - t[3 * o + o] + 1),
                        e[i] = .5 * n,
                        n = .5 / n,
                        e[3] = (t[3 * a + o] - t[3 * o + a]) * n,
                        e[a] = (t[3 * a + i] + t[3 * i + a]) * n,
                        e[o] = (t[3 * o + i] + t[3 * i + o]) * n
                }
                return e
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                t.setAxes = t.sqlerp = t.rotationTo = t.equals = t.exactEquals = t.normalize = t.sqrLen = t.squaredLength = t.len = t.length = t.lerp = t.dot = t.scale = t.mul = t.add = t.set = t.copy = t.fromValues = t.clone = void 0,
                t.create = i,
                t.identity = function(e) {
                    return e[0] = 0,
                        e[1] = 0,
                        e[2] = 0,
                        e[3] = 1,
                        e
                }
                ,
                t.setAxisAngle = a,
                t.getAxisAngle = function(e, t) {
                    var r = 2 * Math.acos(t[3])
                        , n = Math.sin(r / 2);
                    return 0 != n ? (e[0] = t[0] / n,
                        e[1] = t[1] / n,
                        e[2] = t[2] / n) : (e[0] = 1,
                        e[1] = 0,
                        e[2] = 0),
                        r
                }
                ,
                t.multiply = o,
                t.rotateX = function(e, t, r) {
                    r *= .5;
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = t[3]
                        , s = Math.sin(r)
                        , d = Math.cos(r);
                    return e[0] = n * d + o * s,
                        e[1] = i * d + a * s,
                        e[2] = a * d - i * s,
                        e[3] = o * d - n * s,
                        e
                }
                ,
                t.rotateY = function(e, t, r) {
                    r *= .5;
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = t[3]
                        , s = Math.sin(r)
                        , d = Math.cos(r);
                    return e[0] = n * d - a * s,
                        e[1] = i * d + o * s,
                        e[2] = a * d + n * s,
                        e[3] = o * d - i * s,
                        e
                }
                ,
                t.rotateZ = function(e, t, r) {
                    r *= .5;
                    var n = t[0]
                        , i = t[1]
                        , a = t[2]
                        , o = t[3]
                        , s = Math.sin(r)
                        , d = Math.cos(r);
                    return e[0] = n * d + i * s,
                        e[1] = i * d - n * s,
                        e[2] = a * d + o * s,
                        e[3] = o * d - a * s,
                        e
                }
                ,
                t.calculateW = function(e, t) {
                    var r = t[0]
                        , n = t[1]
                        , i = t[2];
                    return e[0] = r,
                        e[1] = n,
                        e[2] = i,
                        e[3] = Math.sqrt(Math.abs(1 - r * r - n * n - i * i)),
                        e
                }
                ,
                t.slerp = s,
                t.invert = function(e, t) {
                    var r = t[0]
                        , n = t[1]
                        , i = t[2]
                        , a = t[3]
                        , o = r * r + n * n + i * i + a * a
                        , s = o ? 1 / o : 0;
                    return e[0] = -r * s,
                        e[1] = -n * s,
                        e[2] = -i * s,
                        e[3] = a * s,
                        e
                }
                ,
                t.conjugate = function(e, t) {
                    return e[0] = -t[0],
                        e[1] = -t[1],
                        e[2] = -t[2],
                        e[3] = t[3],
                        e
                }
                ,
                t.fromMat3 = d,
                t.fromEuler = function(e, t, r, n) {
                    var i = .5 * Math.PI / 180;
                    t *= i,
                        r *= i,
                        n *= i;
                    var a = Math.sin(t)
                        , o = Math.cos(t)
                        , s = Math.sin(r)
                        , d = Math.cos(r)
                        , l = Math.sin(n)
                        , u = Math.cos(n);
                    return e[0] = a * d * u - o * s * l,
                        e[1] = o * s * u + a * d * l,
                        e[2] = o * d * l - a * s * u,
                        e[3] = o * d * u + a * s * l,
                        e
                }
                ,
                t.str = function(e) {
                    return "quat(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
                }
            ;
            var l = n(r(0))
                , u = n(r(1))
                , c = n(r(2))
                , f = n(r(3))
                , h = (t.clone = f.clone,
                t.fromValues = f.fromValues,
                t.copy = f.copy,
                t.set = f.set,
                t.add = f.add,
                t.mul = o,
                t.scale = f.scale,
                t.dot = f.dot,
                t.lerp = f.lerp,
                t.length = f.length)
                , R = (t.len = h,
                t.squaredLength = f.squaredLength)
                , m = (t.sqrLen = R,
                t.normalize = f.normalize);
            t.exactEquals = f.exactEquals,
                t.equals = f.equals,
                t.rotationTo = function() {
                    var e = c.create()
                        , t = c.fromValues(1, 0, 0)
                        , r = c.fromValues(0, 1, 0);
                    return function(n, i, o) {
                        var s = c.dot(i, o);
                        return s < -.999999 ? (c.cross(e, t, i),
                        c.len(e) < 1e-6 && c.cross(e, r, i),
                            c.normalize(e, e),
                            a(n, e, Math.PI),
                            n) : s > .999999 ? (n[0] = 0,
                            n[1] = 0,
                            n[2] = 0,
                            n[3] = 1,
                            n) : (c.cross(e, i, o),
                            n[0] = e[0],
                            n[1] = e[1],
                            n[2] = e[2],
                            n[3] = 1 + s,
                            m(n, n))
                    }
                }(),
                t.sqlerp = function() {
                    var e = i()
                        , t = i();
                    return function(r, n, i, a, o, d) {
                        return s(e, n, o, d),
                            s(t, i, a, d),
                            s(r, e, t, 2 * d * (1 - d)),
                            r
                    }
                }(),
                t.setAxes = function() {
                    var e = u.create();
                    return function(t, r, n, i) {
                        return e[0] = n[0],
                            e[3] = n[1],
                            e[6] = n[2],
                            e[1] = i[0],
                            e[4] = i[1],
                            e[7] = i[2],
                            e[2] = -r[0],
                            e[5] = -r[1],
                            e[8] = -r[2],
                            m(t, d(t, e))
                    }
                }()
        }
        , function(e, t, r) {
            "use strict";
            function n() {
                var e = new c.ARRAY_TYPE(2);
                return e[0] = 0,
                    e[1] = 0,
                    e
            }
            function i(e, t, r) {
                return e[0] = t[0] - r[0],
                    e[1] = t[1] - r[1],
                    e
            }
            function a(e, t, r) {
                return e[0] = t[0] * r[0],
                    e[1] = t[1] * r[1],
                    e
            }
            function o(e, t, r) {
                return e[0] = t[0] / r[0],
                    e[1] = t[1] / r[1],
                    e
            }
            function s(e, t) {
                var r = t[0] - e[0]
                    , n = t[1] - e[1];
                return Math.sqrt(r * r + n * n)
            }
            function d(e, t) {
                var r = t[0] - e[0]
                    , n = t[1] - e[1];
                return r * r + n * n
            }
            function l(e) {
                var t = e[0]
                    , r = e[1];
                return Math.sqrt(t * t + r * r)
            }
            function u(e) {
                var t = e[0]
                    , r = e[1];
                return t * t + r * r
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                t.forEach = t.sqrLen = t.sqrDist = t.dist = t.div = t.mul = t.sub = t.len = void 0,
                t.create = n,
                t.clone = function(e) {
                    var t = new c.ARRAY_TYPE(2);
                    return t[0] = e[0],
                        t[1] = e[1],
                        t
                }
                ,
                t.fromValues = function(e, t) {
                    var r = new c.ARRAY_TYPE(2);
                    return r[0] = e,
                        r[1] = t,
                        r
                }
                ,
                t.copy = function(e, t) {
                    return e[0] = t[0],
                        e[1] = t[1],
                        e
                }
                ,
                t.set = function(e, t, r) {
                    return e[0] = t,
                        e[1] = r,
                        e
                }
                ,
                t.add = function(e, t, r) {
                    return e[0] = t[0] + r[0],
                        e[1] = t[1] + r[1],
                        e
                }
                ,
                t.subtract = i,
                t.multiply = a,
                t.divide = o,
                t.ceil = function(e, t) {
                    return e[0] = Math.ceil(t[0]),
                        e[1] = Math.ceil(t[1]),
                        e
                }
                ,
                t.floor = function(e, t) {
                    return e[0] = Math.floor(t[0]),
                        e[1] = Math.floor(t[1]),
                        e
                }
                ,
                t.min = function(e, t, r) {
                    return e[0] = Math.min(t[0], r[0]),
                        e[1] = Math.min(t[1], r[1]),
                        e
                }
                ,
                t.max = function(e, t, r) {
                    return e[0] = Math.max(t[0], r[0]),
                        e[1] = Math.max(t[1], r[1]),
                        e
                }
                ,
                t.round = function(e, t) {
                    return e[0] = Math.round(t[0]),
                        e[1] = Math.round(t[1]),
                        e
                }
                ,
                t.scale = function(e, t, r) {
                    return e[0] = t[0] * r,
                        e[1] = t[1] * r,
                        e
                }
                ,
                t.scaleAndAdd = function(e, t, r, n) {
                    return e[0] = t[0] + r[0] * n,
                        e[1] = t[1] + r[1] * n,
                        e
                }
                ,
                t.distance = s,
                t.squaredDistance = d,
                t.length = l,
                t.squaredLength = u,
                t.negate = function(e, t) {
                    return e[0] = -t[0],
                        e[1] = -t[1],
                        e
                }
                ,
                t.inverse = function(e, t) {
                    return e[0] = 1 / t[0],
                        e[1] = 1 / t[1],
                        e
                }
                ,
                t.normalize = function(e, t) {
                    var r = t[0]
                        , n = t[1]
                        , i = r * r + n * n;
                    return i > 0 && (i = 1 / Math.sqrt(i),
                        e[0] = t[0] * i,
                        e[1] = t[1] * i),
                        e
                }
                ,
                t.dot = function(e, t) {
                    return e[0] * t[0] + e[1] * t[1]
                }
                ,
                t.cross = function(e, t, r) {
                    var n = t[0] * r[1] - t[1] * r[0];
                    return e[0] = e[1] = 0,
                        e[2] = n,
                        e
                }
                ,
                t.lerp = function(e, t, r, n) {
                    var i = t[0]
                        , a = t[1];
                    return e[0] = i + n * (r[0] - i),
                        e[1] = a + n * (r[1] - a),
                        e
                }
                ,
                t.random = function(e, t) {
                    t = t || 1;
                    var r = 2 * c.RANDOM() * Math.PI;
                    return e[0] = Math.cos(r) * t,
                        e[1] = Math.sin(r) * t,
                        e
                }
                ,
                t.transformMat2 = function(e, t, r) {
                    var n = t[0]
                        , i = t[1];
                    return e[0] = r[0] * n + r[2] * i,
                        e[1] = r[1] * n + r[3] * i,
                        e
                }
                ,
                t.transformMat2d = function(e, t, r) {
                    var n = t[0]
                        , i = t[1];
                    return e[0] = r[0] * n + r[2] * i + r[4],
                        e[1] = r[1] * n + r[3] * i + r[5],
                        e
                }
                ,
                t.transformMat3 = function(e, t, r) {
                    var n = t[0]
                        , i = t[1];
                    return e[0] = r[0] * n + r[3] * i + r[6],
                        e[1] = r[1] * n + r[4] * i + r[7],
                        e
                }
                ,
                t.transformMat4 = function(e, t, r) {
                    var n = t[0]
                        , i = t[1];
                    return e[0] = r[0] * n + r[4] * i + r[12],
                        e[1] = r[1] * n + r[5] * i + r[13],
                        e
                }
                ,
                t.str = function(e) {
                    return "vec2(" + e[0] + ", " + e[1] + ")"
                }
                ,
                t.exactEquals = function(e, t) {
                    return e[0] === t[0] && e[1] === t[1]
                }
                ,
                t.equals = function(e, t) {
                    var r = e[0]
                        , n = e[1]
                        , i = t[0]
                        , a = t[1];
                    return Math.abs(r - i) <= c.EPSILON * Math.max(1, Math.abs(r), Math.abs(i)) && Math.abs(n - a) <= c.EPSILON * Math.max(1, Math.abs(n), Math.abs(a))
                }
            ;
            var c = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                return t.default = e,
                    t
            }(r(0));
            t.len = l,
                t.sub = i,
                t.mul = a,
                t.div = o,
                t.dist = s,
                t.sqrDist = d,
                t.sqrLen = u,
                t.forEach = function() {
                    var e = n();
                    return function(t, r, n, i, a, o) {
                        var s, d = void 0;
                        for (r || (r = 2),
                             n || (n = 0),
                                 s = i ? Math.min(i * r + n, t.length) : t.length,
                                 d = n; d < s; d += r)
                            e[0] = t[d],
                                e[1] = t[d + 1],
                                a(e, e, o),
                                t[d] = e[0],
                                t[d + 1] = e[1];
                        return t
                    }
                }()
        }
    ])
}),
    function() {
        var e;
        e = function(e, t, r, n, i) {
            var a, o;
            e.hasOwnProperty(r) && RedGLUtil.throwFunc(t + " - " + r + " : 이미 정의된 속성"),
                i = i || {};
            var s = function() {
                return this["_" + r]
            };
            switch (n) {
                case "hex":
                    a = {
                        get: s,
                        set: function(e) {
                            "string" == typeof e || RedGLUtil.throwFunc(t + " - " + r + " hex 형식만 허용함.", "입력값 : " + e),
                            RedGLUtil.regHex(e) || RedGLUtil.throwFunc(t + " - " + r + " : hex 형식만 허용함.", "입력값 : " + e),
                                this["_" + r] = e,
                            i.callback && i.callback.call(this, e)
                        }
                    };
                    break;
                case "boolean":
                    a = {
                        get: s,
                        set: function(e) {
                            "boolean" != typeof e && RedGLUtil.throwFunc(t + " - " + r + " : boolean만 허용함.", "입력값 : " + e),
                                this["_" + r] = e,
                            i.callback && i.callback.call(this, e)
                        }
                    };
                    break;
                case "number":
                    var d = i.hasOwnProperty("min")
                        , l = i.hasOwnProperty("max")
                        , u = i.min
                        , c = i.max;
                    a = {
                        get: s,
                        set: function(e) {
                            "number" != typeof e && RedGLUtil.throwFunc(t + " - " + r + " : 숫자만 허용함.", "입력값 : " + e),
                            d && e < u && (e = u),
                            l && e > c && (e = c),
                                this["_" + r] = e,
                            i.callback && i.callback.call(this, e)
                        }
                    };
                    break;
                case "uint":
                    d = i.hasOwnProperty("min"),
                        l = i.hasOwnProperty("max"),
                        u = i.min,
                        c = i.max;
                    d && u < 0 && RedGLUtil.throwFunc(t + " - " + r + " : min옵션은 0보다 커야 함.", "입력값 : " + u),
                    l && c < 0 && RedGLUtil.throwFunc(t + " - " + r + " : max옵션은 0보다 커야 함.", "입력값 : " + c),
                    d && l && c <= u && RedGLUtil.throwFunc(t + " - " + r + " : max옵션은 min옵션보다 커야 함.", "min 입력값 : " + u, "max 입력값 : " + c),
                        a = {
                            get: function() {
                                return this["_" + r]
                            },
                            set: function(e) {
                                "number" != typeof e && RedGLUtil.throwFunc(t + " - " + r + " : uint만 허용함.", "입력값 : " + e),
                                d && e < u && (e = u),
                                l && e > c && (e = c),
                                e >= 0 && Math.floor(e) == e || RedGLUtil.throwFunc(t + " - " + r + " : uint만 허용함(소수점은 허용하지 않음).", "입력값 : " + e),
                                    this["_" + r] = e,
                                i.callback && i.callback.call(this, e)
                            }
                        };
                    break;
                case "int":
                    d = i.hasOwnProperty("min"),
                        l = i.hasOwnProperty("max"),
                        u = i.min,
                        c = i.max;
                    d && l && c <= u && RedGLUtil.throwFunc(t + " - " + r + " : max옵션은 min옵션보다 커야 함.", "min 입력값 : " + u, "max 입력값 : " + c),
                        a = {
                            get: s,
                            set: function(e) {
                                "number" != typeof e && RedGLUtil.throwFunc(t + " - " + r + " : int만 허용함.", "입력값 : " + e),
                                d && e < u && (e = u),
                                l && e > c && (e = c),
                                Math.floor(e) != e && RedGLUtil.throwFunc(t + " - " + r + " : int만 허용함(소수점은 허용하지 않음).", "입력값 : " + e),
                                    this["_" + r] = e,
                                i.callback && i.callback.call(this, e)
                            }
                        };
                    break;
                case "sampler2D":
                    o = "RedBaseTexture";
                    break;
                case "samplerCube":
                    o = "RedBitmapCubeTexture";
                    break;
                case "samplerVideo":
                    o = "RedVideoTexture";
                    break;
                default:
                    RedGLUtil.throwFunc(r + " - type : " + n + " / " + r + " : 정의할수없는 타입입니다.")
            }
            if (o) {
                var f = window[o];
                a = i.essential ? {
                    get: s,
                    set: function(e) {
                        f == RedBitmapCubeTexture ? e instanceof f || RedGLUtil.throwFunc(t + " - " + r + " : " + o + " Instance만 허용.", "입력값 : " + e) : !(e instanceof RedBitmapCubeTexture) && e instanceof f || RedGLUtil.throwFunc(t + " - " + r + " : " + o + " Instance만 허용.", "입력값 : " + e),
                            this["_" + r] = e,
                        i.callback && i.callback.call(this)
                    }
                } : {
                    get: s,
                    set: function(e) {
                        e && (f == RedBitmapCubeTexture ? e instanceof f || RedGLUtil.throwFunc(t + " - " + r + " : " + o + " Instance만 허용.", "입력값 : " + e) : !(e instanceof RedBitmapCubeTexture) && e instanceof f || RedGLUtil.throwFunc(t + " - " + r + " : " + o + " Instance만 허용.", "입력값 : " + e)),
                            this["_" + r] = e,
                        i.callback && i.callback.call(this)
                    }
                }
            }
            e["_" + r] = null,
                Object.defineProperty(e, r, a)
        }
            ,
            (RedDefinePropertyInfo = {}).definePrototype = function(t, r, n, i) {
                e(window[t].prototype, t, r, n, i)
            }
            ,
            Object.freeze(RedDefinePropertyInfo)
    }(),
    (RedGLDetect = function(e) {
            if (!(this instanceof RedGLDetect))
                return new RedGLDetect(e);
            var t, r, n, i, a, o = this, s = e.gl;
            for (n in t = {
                basic: ["VENDOR", "VERSION", "SHADING_LANGUAGE_VERSION", "RENDERER"],
                frameBuffer: ["MAX_RENDERBUFFER_SIZE", "MAX_VIEWPORT_DIMS", "RED_BITS", "GREEN_BITS", "BLUE_BITS", "ALPHA_BITS", "DEPTH_BITS", "STENCIL_BITS"],
                vertexShader: ["MAX_VERTEX_ATTRIBS", "MAX_VARYING_VECTORS", "MAX_VERTEX_UNIFORM_VECTORS"],
                fragmentShader: ["MAX_FRAGMENT_UNIFORM_VECTORS"],
                texture: ["MAX_TEXTURE_SIZE", "MAX_CUBE_MAP_TEXTURE_SIZE", "MAX_COMBINED_TEXTURE_IMAGE_UNITS", "MAX_TEXTURE_IMAGE_UNITS", "MAX_VERTEX_TEXTURE_IMAGE_UNITS"]
            })
                for (r = (a = t[n]).length,
                         this[n] = {}; r--; )
                    this[n][i = a[r]] = s.getParameter(s[i]);
            this.BROWSER_INFO = RedGLDetect.getBrowserInfo(),
            "ie" == this.BROWSER_INFO.browser && (console.table = console.log),
                requestAnimationFrame(function() {
                    var t = document.createElement("canvas")
                        , r = t.getContext("2d");
                    t.width = 10,
                        t.height = 20,
                        r.fillStyle = "red",
                        r.fillRect(0, 0, 10, 10),
                        r.fillStyle = "blue",
                        r.fillRect(0, 10, 10, 10),
                        t.style.cssText = "position:fixed;top:0px;left:0px";
                    var n = RedBitmapTexture(e, t)
                        , i = s.createFramebuffer();
                    s.bindFramebuffer(s.FRAMEBUFFER, i),
                        s.framebufferTexture2D(s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, n.webglTexture, 0);
                    var a = new Uint8Array(4);
                    s.readPixels(0, 0, 1, 1, s.RGBA, s.UNSIGNED_BYTE, a),
                        s.bindFramebuffer(s.FRAMEBUFFER, null),
                        o.ableCanvasSourceFlipYonTexture = 255 === a[0],
                        o.BROWSER_INFO.ableCanvasSourceFlipYonTexture = 255 === a[0]
                })
        }
    ).BROWSER_INFO = {},
    RedGLDetect.getBrowserInfo = function() {
        var e, t, r, n, i, a = RedGLDetect.BROWSER_INFO, o = window.navigator, s = o.userAgent.toLowerCase(), d = o.platform.toLowerCase(), l = o.appVersion.toLowerCase(), u = "pc", c = 0, f = function() {
            return s.indexOf("whale") < 0 ? 0 : (t = parseFloat(/whale\/([\d]+)/.exec(s)[1]),
                e = "whale")
        }, h = function() {
            if (!(s.indexOf(i = "chrome") < 0 && s.indexOf(i = "crios") < 0))
                return e = "chrome",
                    t = parseFloat(("chrome" === i ? /chrome\/([\d]+)/ : /crios\/([\d]+)/).exec(s)[1])
        }, R = function() {
            return s.indexOf("firefox") < 0 ? 0 : (e = "firefox",
                t = parseFloat(/firefox\/([\d]+)/.exec(s)[1]))
        }, m = function() {
            return s.indexOf("safari") < 0 ? 0 : (e = "safari",
                t = parseFloat(/safari\/([\d]+)/.exec(s)[1]))
        }, p = function() {
            var r;
            return s.indexOf(r = "opera") < 0 && s.indexOf(r = "opr") < 0 ? 0 : (e = "opera",
                t = "opera" === r ? parseFloat(/version\/([\d]+)/.exec(s)[1]) : parseFloat(/opr\/([\d]+)/.exec(s)[1]))
        }, _ = function() {
            return s.indexOf("naver") < 0 ? 0 : e = "naver"
        };
        if (a || (a = {}),
        s.indexOf("android") > -1)
            e = r = "android",
                u = -1 === s.indexOf("mobile") ? (e += "Tablet",
                    "tablet") : "mobile",
                n = (i = /android ([\d.]+)/.exec(s)) ? (i = i[1].split("."),
                    parseFloat(i[0] + "." + i[1])) : 0,
                c = 1,
            f() || _() || p() || h() || R() || (t = i = /safari\/([\d.]+)/.exec(s) ? parseFloat(i[1]) : 0);
        else if (s.indexOf(i = "ipad") > -1 || s.indexOf(i = "iphone") > -1)
            u = "ipad" === i ? "tablet" : "mobile",
                e = r = i,
                n = (i = /os ([\d_]+)/.exec(s)) ? (i = i[1].split("_"),
                    parseFloat(i[0] + "." + i[1])) : 0,
                c = 1,
            f() || _() || p() || h() || R() || (t = (i = /mobile\/([\S]+)/.exec(s)) ? parseFloat(i[1]) : 0);
        else if (d.indexOf("win") > -1) {
            for (i in g = {
                5.1: "xp",
                "6.0": "vista",
                6.1: "7",
                6.2: "8",
                6.3: "8.1",
                "10.0": "10"
            })
                if (s.indexOf("windows nt " + i) > -1) {
                    n = g[i];
                    break
                }
            r = "win",
            (s.indexOf("edge") > -1 ? (s.indexOf("iemobile") > -1 && (r = "winMobile"),
                e = "edge",
                t = /edge\/([\d]+)/.exec(s)[1]) : s.indexOf("msie") < 0 && s.indexOf("trident") < 0 ? void 0 : (s.indexOf("iemobile") > -1 && (r = "winMobile"),
                e = "ie",
                t = s.indexOf("msie 7") > -1 && s.indexOf("trident") > -1 ? -1 : s.indexOf("msie") < 0 ? 11 : parseFloat(/msie ([\d]+)/.exec(s)[1]))) || f() || p() || h() || R() || m()
        } else
            d.indexOf("mac") > -1 ? (r = "mac",
                i = /os x ([\d._]+)/.exec(s)[1].replace("_", ".").split("."),
                n = parseFloat(i[0] + "." + i[1]),
            f() || p() || h() || R() || m()) : (r = l.indexOf("x11") > -1 ? "unix" : l.indexOf("linux") > -1 ? "linux" : 0,
            f() || h() || R());
        for (i in g = {
            device: u,
            isMobile: c,
            browser: e,
            browserVer: t,
            os: r,
            osVer: n,
            down: c ? "touchstart" : "mousedown",
            move: c ? "touchmove" : "mousemove",
            up: c ? "touchend" : "mouseup",
            click: "click",
            over: "mouseover",
            out: "mouseout"
        })
            g.hasOwnProperty(i) && (a[i] = g[i]);
        if (window.OffscreenCanvas) {
            var g = new window.OffscreenCanvas(2,2);
            try {
                g.getContext("2d")
            } catch (e) {
                window.OffscreenCanvas = null
            }
        }
        return a
    }
    ,
    Object.freeze(RedGLDetect),
    function() {
        var e, t, r, n, i, a, o, s, d, l, u, c, f, h;
        RedGLUtil = {
            throwFunc: function() {
                throw "RedGL Error : " + Array.prototype.slice.call(arguments).join(" ")
            },
            isUint: function(e, t) {
                return "number" == typeof e && e >= 0 || RedGLUtil.throwFunc(t, "입력값 : " + e),
                Math.floor(e) === e || RedGLUtil.throwFunc(t, "입력값 : " + e),
                    !0
            },
            hexToRGB_ZeroToOne: function(e) {
                var t, r;
                if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(e))
                    return r = [],
                    3 === (t = e.substring(1).split("")).length && (t = [t[0], t[0], t[1], t[1], t[2], t[2]]),
                        t = "0x" + t.join(""),
                        r[0] = (t >> 16 & 255) / 255,
                        r[1] = (t >> 8 & 255) / 255,
                        r[2] = (255 & t) / 255,
                        r;
                RedGLUtil.throwFunc("RedGLUtil.hexToRGB_ZeroToOne : 잘못된 hex값입니다.", e)
            },
            rgb2hex: function(e, t, r) {
                return "#" + (16777216 + (r | t << 8 | e << 16)).toString(16).slice(1)
            },
            regHex: (h = /^#(?:[0-9a-fA-F]{3}){1,2}$/,
                    function(e) {
                        return h.test(e)
                    }
            ),
            getStrFromComment: function(e) {
                if ("string" != typeof e && RedGLUtil.throwFunc("getStrFromComment : 해석할 값은 문자열만 가능", e),
                    f = e.replace("@preserve", "").toString().trim().match(/(\/\*)[\s\S]+(\*\/)/g))
                    return f[0].replace(/\/\*|\*\//g, "").trim();
                RedGLUtil.throwFunc("getStrFromComment : 해석할 불가능한 값", e)
            },
            isPowerOf2: function(e) {
                return 0 == (e & e - 1)
            },
            nextHighestPowerOfTwo: function(e) {
                for (--e,
                         c = 1; c < 32; c <<= 1)
                    e |= e >> c;
                return e + 1
            },
            makePowerOf2Source: function(e, t, r) {
                if (u = r,
                RedGLUtil.isPowerOf2(t.width) && RedGLUtil.isPowerOf2(t.height))
                    return t;
                d = RedGLUtil.nextHighestPowerOfTwo(t.width),
                    l = RedGLUtil.nextHighestPowerOfTwo(t.height),
                d > u && (d = u),
                l > u && (l = u);
                var n = window.OffscreenCanvas ? new OffscreenCanvas(d,l) : document.createElement("canvas")
                    , i = n.getContext("2d");
                return window.OffscreenCanvas || (n.width = d,
                    n.height = l),
                    i.drawImage(t, 0, 0, d, l),
                    window.OffscreenCanvas ? n.transferToImageBitmap() : n
            },
            calculateNormals: function(e, t) {
                var r, n, i = [];
                for (r = 0; r < e.length; r += 3)
                    i[r + 0] = 0,
                        i[r + 1] = 0,
                        i[r + 2] = 0;
                for (r = 0; r < t.length; r += 3) {
                    var a, o, s, d, l = [], u = [], c = [];
                    for (a = 3 * t[r],
                             o = 3 * t[r + 1],
                             s = 3 * t[r + 2],
                             l[0] = e[s + 0] - e[o + 0],
                             l[1] = e[s + 1] - e[o + 1],
                             l[2] = e[s + 2] - e[o + 2],
                             u[0] = e[a + 0] - e[o + 0],
                             u[1] = e[a + 1] - e[o + 1],
                             u[2] = e[a + 2] - e[o + 2],
                             c[0] = l[1] * u[2] - l[2] * u[1],
                             c[1] = l[2] * u[0] - l[0] * u[2],
                             c[2] = l[0] * u[1] - l[1] * u[0],
                             n = 0; n < 3; n++)
                        i[(d = 3 * t[r + n]) + 0] = i[d + 0] + c[0],
                            i[d + 1] = i[d + 1] + c[1],
                            i[d + 2] = i[d + 2] + c[2]
                }
                for (r = 0; r < e.length; r += 3) {
                    var f = [];
                    f[0] = i[r + 0],
                        f[1] = i[r + 1],
                        f[2] = i[r + 2];
                    var h = Math.sqrt(f[0] * f[0] + f[1] * f[1] + f[2] * f[2]);
                    0 === h && (h = 1),
                        f[0] = f[0] / h,
                        f[1] = f[1] / h,
                        f[2] = f[2] / h,
                        i[r + 0] = f[0],
                        i[r + 1] = f[1],
                        i[r + 2] = f[2]
                }
                return i
            },
            clamp: function(e, t, r) {
                return Math.max(t, Math.min(r, e))
            },
            quaternionToRotationMat4: function(e, t) {
                var r = e[0]
                    , n = e[1]
                    , i = e[2]
                    , a = e[3]
                    , o = r + r
                    , s = n + n
                    , d = i + i
                    , l = r * o
                    , u = r * s
                    , c = r * d
                    , f = n * s
                    , h = n * d
                    , R = i * d
                    , m = a * o
                    , p = a * s
                    , _ = a * d;
                return t[0] = 1 - (f + R),
                    t[4] = u - _,
                    t[8] = c + p,
                    t[1] = u + _,
                    t[5] = 1 - (l + R),
                    t[9] = h - m,
                    t[2] = c - p,
                    t[6] = h + m,
                    t[10] = 1 - (l + f),
                    t[3] = 0,
                    t[7] = 0,
                    t[11] = 0,
                    t[12] = 0,
                    t[13] = 0,
                    t[14] = 0,
                    t[15] = 1,
                    t
            },
            quaternionToRotation: function(e, t) {
                var r = []
                    , n = e[0]
                    , i = e[1]
                    , a = e[2]
                    , o = e[3]
                    , s = n + n
                    , d = i + i
                    , l = a + a
                    , u = n * s
                    , c = n * d
                    , f = n * l
                    , h = i * d
                    , R = i * l
                    , m = a * l
                    , p = o * s
                    , _ = o * d
                    , g = o * l;
                r[0] = 1 - (h + m),
                    r[4] = c - g,
                    r[8] = f + _,
                    r[1] = c + g,
                    r[5] = 1 - (u + m),
                    r[9] = R - p,
                    r[2] = f - _,
                    r[6] = R + p,
                    r[10] = 1 - (u + h),
                    r[3] = 0,
                    r[7] = 0,
                    r[11] = 0,
                    r[12] = 0,
                    r[13] = 0,
                    r[14] = 0,
                    r[15] = 1;
                var P = [0, 0, 0];
                t = t || "XYZ";
                var v = r[0]
                    , y = r[4]
                    , E = r[8]
                    , M = r[1]
                    , b = r[5]
                    , L = r[9]
                    , T = r[2]
                    , x = r[6]
                    , I = r[10];
                return "XYZ" === t ? (P[1] = Math.asin(RedGLUtil.clamp(E, -1, 1)),
                    Math.abs(E) < .99999 ? (P[0] = Math.atan2(-L, I),
                        P[2] = Math.atan2(-y, v)) : (P[0] = Math.atan2(x, b),
                        P[2] = 0)) : "YXZ" === t ? (P[0] = Math.asin(-RedGLUtil.clamp(L, -1, 1)),
                    Math.abs(L) < .99999 ? (P[1] = Math.atan2(E, I),
                        P[2] = Math.atan2(M, b)) : (P[1] = Math.atan2(-T, v),
                        P[2] = 0)) : "ZXY" === t ? (P[0] = Math.asin(RedGLUtil.clamp(x, -1, 1)),
                    Math.abs(x) < .99999 ? (P[1] = Math.atan2(-T, I),
                        P[2] = Math.atan2(-y, b)) : (P[1] = 0,
                        P[2] = Math.atan2(M, v))) : "ZYX" === t ? (P[1] = Math.asin(-RedGLUtil.clamp(T, -1, 1)),
                    Math.abs(T) < .99999 ? (P[0] = Math.atan2(x, I),
                        P[2] = Math.atan2(M, v)) : (P[0] = 0,
                        P[2] = Math.atan2(-y, b))) : "YZX" === t ? (P[2] = Math.asin(RedGLUtil.clamp(M, -1, 1)),
                    Math.abs(M) < .99999 ? (P[0] = Math.atan2(-L, b),
                        P[1] = Math.atan2(-T, v)) : (P[0] = 0,
                        P[1] = Math.atan2(E, I))) : "XZY" === t && (P[2] = Math.asin(-RedGLUtil.clamp(y, -1, 1)),
                    Math.abs(y) < .99999 ? (P[0] = Math.atan2(x, b),
                        P[1] = Math.atan2(E, v)) : (P[0] = Math.atan2(-L, I),
                        P[1] = 0)),
                    P
            },
            mat4ToEuler: function(e, t, r) {
                t = t || [0, 0, 0],
                    r = r || "XYZ";
                var n = e[0]
                    , i = e[4]
                    , a = e[8]
                    , o = e[1]
                    , s = e[5]
                    , d = e[9]
                    , l = e[2]
                    , u = e[6]
                    , c = e[10];
                return "XYZ" === r ? (t[1] = Math.asin(RedGLUtil.clamp(a, -1, 1)),
                    Math.abs(a) < .99999 ? (t[0] = Math.atan2(-d, c),
                        t[2] = Math.atan2(-i, n)) : (t[0] = Math.atan2(u, s),
                        t[2] = 0)) : "YXZ" === r ? (t[0] = Math.asin(-RedGLUtil.clamp(d, -1, 1)),
                    Math.abs(d) < .99999 ? (t[1] = Math.atan2(a, c),
                        t[2] = Math.atan2(o, s)) : (t[1] = Math.atan2(-l, n),
                        t[2] = 0)) : "ZXY" === r ? (t[0] = Math.asin(RedGLUtil.clamp(u, -1, 1)),
                    Math.abs(u) < .99999 ? (t[1] = Math.atan2(-l, c),
                        t[2] = Math.atan2(-i, s)) : (t[1] = 0,
                        t[2] = Math.atan2(o, n))) : "ZYX" === r ? (t[1] = Math.asin(-RedGLUtil.clamp(l, -1, 1)),
                    Math.abs(l) < .99999 ? (t[0] = Math.atan2(u, c),
                        t[2] = Math.atan2(o, n)) : (t[0] = 0,
                        t[2] = Math.atan2(-i, s))) : "YZX" === r ? (t[2] = Math.asin(RedGLUtil.clamp(o, -1, 1)),
                    Math.abs(o) < .99999 ? (t[0] = Math.atan2(-d, s),
                        t[1] = Math.atan2(-l, n)) : (t[0] = 0,
                        t[1] = Math.atan2(a, c))) : "XZY" === r && (t[2] = Math.asin(-RedGLUtil.clamp(i, -1, 1)),
                    Math.abs(i) < .99999 ? (t[0] = Math.atan2(u, s),
                        t[1] = Math.atan2(a, n)) : (t[0] = Math.atan2(-d, c),
                        t[1] = 0)),
                    t
            },
            screenToWorld: (a = [0, 0, 0],
                    o = mat4.create(),
                    s = mat4.create(),
                    function(d, l) {
                        return e = 2 * d[0] / d[2] - 1,
                            t = -2 * d[1] / d[3] + 1,
                            l = l.camera ? l.camera : l,
                            mat4.multiply(s, l.perspectiveMTX, l.matrix),
                            i = mat4.clone(s),
                            mat4.invert(i, i),
                            a = [e, t, 1],
                            mat4.identity(o),
                            mat4.translate(o, o, a),
                            mat4.multiply(i, i, o),
                            a[0] = i[12],
                            a[1] = i[13],
                            a[2] = i[14],
                        0 !== (r = s[12] * e + s[13] * t + s[15]) && (n = 1 / r,
                            a[0] /= n,
                            a[1] /= n,
                            a[2] /= n,
                            a[0] = a[0] + l.x,
                            a[1] = a[1] + l.y,
                            a[2] = a[2] + l.z),
                            a
                    }
            )
        },
            Object.freeze(RedGLUtil)
    }(),
    function() {
        var e, t, r, n, i, a, o, s, d, l, u, c, f = [];
        window.addEventListener("resize", function() {
            f.forEach(function(e) {
                e.setSize(e._width, e._height)
            })
        }),
            a = {
                alpha: !1,
                depth: !0,
                stencil: !1,
                antialias: !0,
                premultipliedAlpha: !1,
                preserveDrawingBuffer: !1,
                powerPreference: "high-performance",
                failIfMajorPerformanceCaveat: !1
            },
            u = ["OES_element_index_uint", "OES_standard_derivatives", "EXT_texture_filter_anisotropic", "WEBGL_compressed_texture_s3tc", "WEBGL_debug_renderer_info"],
            n = "webkit-3d,moz-webgl,3d,experimental-webgl,webgl".split(","),
            i = [],
            e = function(e, t, r) {
                if (l = JSON.parse(JSON.stringify(a)),
                    t)
                    for (d in t)
                        l[d] = t[d];
                for (r ? (i.length = 0,
                    i.push(r)) : i = n.concat(),
                         d = i.length; d--; )
                    if (o = e.getContext(s = i[d], l))
                        return o.glExtension = {},
                            u.forEach(function(e) {
                                o.glExtension[e] = o.getExtension(e),
                                o.glExtension[e] && "WEBGL_debug_renderer_info" === e && (o.vendor = o.getParameter(o.glExtension[e].UNMASKED_VENDOR_WEBGL),
                                    o.renderer = o.getParameter(o.glExtension[e].UNMASKED_RENDERER_WEBGL))
                            }),
                            o.version = s,
                            o;
                return null
            }
            ,
            t = function(e, t) {
                var r, n, i, a;
                for (r = e.detect.texture.MAX_COMBINED_TEXTURE_IMAGE_UNITS,
                         a = RedBaseTexture.EMPTY_BASE64,
                         n = RedBitmapTexture(e, a),
                         i = RedBitmapCubeTexture(e, [a, a, a, a, a, a]),
                         e._datas.emptyTexture = {
                             "2d": n,
                             "3d": i
                         }; r--; )
                    1 === r ? (t.activeTexture(t.TEXTURE0 + 1),
                        t.bindTexture(t.TEXTURE_CUBE_MAP, i.webglTexture)) : (t.activeTexture(t.TEXTURE0 + r),
                        t.bindTexture(t.TEXTURE_2D, n.webglTexture))
            }
            ,
            (RedGL = function(n, i, a, o) {
                    return this instanceof RedGL ? ("CANVAS" === n.tagName || RedGLUtil.throwFunc("RedGL : Canvas Element만 허용"),
                        d = this,
                        this._datas = {},
                        this._width = "100%",
                        this._height = "100%",
                        this._renderScale = 1,
                        this._viewRect = [0, 0, 0, 0],
                        this._canvas = n,
                        this.gl = s = e(n, a, o),
                        s ? (this.detect = RedGLDetect(this),
                            this._UUID = RedGL.makeUUID(),
                            this.setSize = (p = new Uint32Array(2),
                                    _ = new Uint32Array(2),
                                    c = 0,
                                    h = 0,
                                    function(e, t, r) {
                                        void 0 === e && RedGLUtil.throwFunc("RedGL setSize : width가 입력되지 않았습니다."),
                                        void 0 === t && RedGLUtil.throwFunc("RedGL setSize : height가 입력되지 않았습니다."),
                                            l = this._width = e,
                                            u = this._height = t,
                                            window.HTMLCanvasElement ? ("number" != typeof l && (l.indexOf("%") > -1 ? l = (document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth) * parseFloat(l) / 100 : RedGLUtil.throwFunc("RedGL setSize : width는 0이상의 숫자나 %만 허용.", "입력값 :", l)),
                                            "number" != typeof u && (u.indexOf("%") > -1 ? u = window.innerHeight * parseFloat(u) / 100 : RedGLUtil.throwFunc("RedGL setSize : height는 0이상의 숫자나 %만 허용.", "입력값 :", u)),
                                                R = window.devicePixelRatio || 1,
                                                m = this._canvas,
                                            (c != l || h != u || r) && (m.width = l * R * this._renderScale,
                                                m.height = u * R * this._renderScale,
                                                m.style.width = l + "px",
                                                m.style.height = u + "px",
                                                c = l,
                                                h = u),
                                                this._viewRect[2] = c,
                                                this._viewRect[3] = h) : (l = this._width = e,
                                                u = this._height = t,
                                                p[0] = l * this._renderScale,
                                                _[0] = u * this._renderScale,
                                                this._viewRect[2] = l,
                                                this._viewRect[3] = u)
                                    }
                            ),
                        RedSystemShaderCode.init && RedSystemShaderCode.init(d),
                            t(d, s),
                            f.push(d),
                            void requestAnimationFrame(function() {
                                r || (RedPBRMaterial_System(d),
                                    RedStandardMaterial(d, d._datas.emptyTexture["2d"]),
                                    RedEnvironmentMaterial(d, null, d._datas.emptyTexture["3d"])),
                                    d._mouseEventInfo = [],
                                    [RedGLDetect.BROWSER_INFO.move, RedGLDetect.BROWSER_INFO.down, RedGLDetect.BROWSER_INFO.up].forEach(function(e) {
                                        var t, r;
                                        "ie" === RedGLDetect.BROWSER_INFO.browser && 11 === RedGLDetect.BROWSER_INFO.browserVer ? (t = "offsetX",
                                            r = "offsetY") : (t = "layerX",
                                            r = "layerY"),
                                            d._canvas.addEventListener(e, function(e) {
                                                e.preventDefault(),
                                                    RedGLDetect.BROWSER_INFO.isMobile ? e.changedTouches[0] && (d._mouseEventInfo.push({
                                                        type: e.type,
                                                        x: e.changedTouches[0].clientX,
                                                        y: e.changedTouches[0].clientY,
                                                        nativeEvent: e
                                                    }),
                                                        d._mouseX = e.changedTouches[0].clientX,
                                                        d._mouseY = e.changedTouches[0].clientY) : (d._mouseEventInfo.push({
                                                        type: e.type,
                                                        x: e[t],
                                                        y: e[r],
                                                        nativeEvent: e
                                                    }),
                                                        d._mouseX = e[t],
                                                        d._mouseY = e[r])
                                            }, !1)
                                    }),
                                    d.setSize(d._width, d._height),
                                i && i.call(d, !0)
                            })) : i ? i.call(d, !1) : void 0) : new RedGL(n,i,a,o);
                    var s, d, l, u, c, h, R, m, p, _
                }
            ).makeUUID = (c = 0,
                    function() {
                        return c++
                    }
            ),
            RedGL.prototype = {},
            RedDefinePropertyInfo.definePrototype("RedGL", "renderScale", "number", {
                min: .1,
                max: 1,
                callback: function() {
                    this.setSize(this._width, this._height, !0)
                }
            }),
            RedGL.setDoNotPrepareProgram = function() {
                r = !0
            }
            ,
            Object.freeze(RedGL)
    }(),
    function() {
        var e, t, r, n, i, a = {
            x: 0,
            y: 0
        }, o = {
            x: 0,
            y: 0
        }, s = [];
        i = function(i, d) {
            return RedGLDetect.BROWSER_INFO.isMobile ? i.changedTouches ? (o.x = i.changedTouches[0].clientX,
                o.y = i.changedTouches[0].clientY) : (o.x = a.x,
                o.y = a.y) : (o.x = i.clientX,
                o.y = i.clientY),
                t = o.x - a.x,
                r = o.y - a.y,
                s = [a.x, a.y, t, r],
            t < 0 && (s[2] = Math.abs(t),
                s[0] += t),
            r < 0 && (s[3] = Math.abs(r),
                s[1] += r),
                e.style.left = s[0] + "px",
                e.style.top = s[1] + "px",
                e.style.width = s[2] + "px",
                e.style.height = s[3] + "px",
                n(d.scene, d, s)
        }
            ,
            n = function(e, t, r, i) {
                return i || (i = {
                    selectList: [],
                    unSelectList: []
                }),
                    e.children.forEach(function(e) {
                        var a = e.getScreenPoint(t);
                        r[0] <= a[0] && r[1] <= a[1] && r[0] + r[2] >= a[0] && r[1] + r[3] >= a[1] ? i.selectList.push(e) : i.unSelectList.push(e),
                            n(e, t, r, i)
                    }),
                    i
            }
            ,
            RedBoxSelection = function(t, r, n) {
                return this instanceof RedBoxSelection ? (t instanceof RedGL || RedGLUtil.throwFunc("RedBoxSelection : RedGL Instance만 허용.", t),
                r instanceof RedView || RedGLUtil.throwFunc("RedBoxSelection : RedView Instance만 허용.", r),
                    t._datas.RedBoxSelection ? this : (t._datas.RedBoxSelection = this,
                        void [RedGLDetect.BROWSER_INFO.move, RedGLDetect.BROWSER_INFO.down, RedGLDetect.BROWSER_INFO.up].forEach(function(s) {
                            var d;
                            d = function(e) {
                                var t = i(e, r);
                                n && n(t)
                            }
                                ,
                                t._canvas.addEventListener(s, function(t) {
                                    t.type === RedGLDetect.BROWSER_INFO.down && (o.x = a.x = RedGLDetect.BROWSER_INFO.isMobile ? t.changedTouches[0].clientX : t.clientX,
                                        o.y = a.y = RedGLDetect.BROWSER_INFO.isMobile ? t.changedTouches[0].clientY : t.clientY,
                                    e || ((e = document.createElement("div")).style.cssText = "position:fixed;border:1px dashed red;z-index:0"),
                                        e.style.left = "0px",
                                        e.style.top = "0px",
                                        e.style.width = "0px",
                                        e.style.height = "0px",
                                        document.body.appendChild(e),
                                    r.camera && r.camera.camera && (r.camera.needUpdate = !1),
                                        d({}),
                                        window.addEventListener(RedGLDetect.BROWSER_INFO.move, d),
                                        window.addEventListener(RedGLDetect.BROWSER_INFO.isMobile ? "touchend" : "click", function() {
                                            r.camera.camera && (r.camera.needUpdate = !0),
                                            e.parentNode && document.body.removeChild(e),
                                                window.removeEventListener(RedGLDetect.BROWSER_INFO.move, d)
                                        }))
                                })
                        }))) : new RedBoxSelection(t,r,n)
            }
    }(),
    (RedBaseController = function() {
            if (!(this instanceof RedBaseController))
                return new RedBaseController
        }
    ).prototype = {
        update: function() {
            RedGLUtil.throwFunc("RedBaseController : update - 재정의 해서 써라")
        }
    },
    Object.freeze(RedBaseController),
    function() {
        var e = function(e, t) {
            return createImageBitmap(e, t || {
                imageOrientation: "none"
            })
        };
        RedImageLoader = function(t, r, n, i) {
            var a = this;
            if (!(this instanceof RedImageLoader))
                return new RedImageLoader(t,r,n,i);
            "string" != typeof t && RedGLUtil.throwFunc("RedImageLoader : src는 문자열 만 허용.", "입력값 : " + t),
                a._src = t,
                a._onLoad = r,
                a._onError = n,
                2 === t.split(",").length && "data:" === t.substr(0, 5) ? e(function(e, t) {
                    t = t || "";
                    for (var r = atob(e), n = r.length, i = Math.ceil(n / 1024), a = new Array(i), o = 0; o < i; ++o) {
                        for (var s = 1024 * o, d = Math.min(s + 1024, n), l = new Array(d - s), u = s, c = 0; u < d; ++c,
                            ++u)
                            l[c] = r[u].charCodeAt(0);
                        a[o] = new Uint8Array(l)
                    }
                    return new Blob(a,{
                        type: t
                    })
                }(t.split(",")[1], "image/png"), i || {}).then(function(e) {
                    e.src = t,
                        a.source = e,
                    a._onLoad && (a._onLoad(e),
                        a._onLoad = void 0,
                        a._onError = void 0)
                }) : function(t, r, n, i) {
                    var a = this
                        , o = new XMLHttpRequest;
                    o.open("GET", t, !0),
                        o.responseType = "blob",
                        o.onreadystatechange = function() {
                            4 === o.readyState && (200 === o.status ? e(o.response, i || {
                                imageOrientation: "none"
                            }).then(function(e) {
                                e.src = t,
                                    a.source = e,
                                a._onLoad && (a._onLoad(o),
                                    a._onLoad = void 0,
                                    a._onError = void 0)
                            }).catch(function() {
                                a._onError && (a._onError(o),
                                    a._onLoad = void 0,
                                    a._onError = void 0)
                            }) : a._onError && (a._onError(o),
                                a._onLoad = void 0,
                                a._onError = void 0))
                        }
                        ,
                        o.send()
                }
                    .apply(a, [a._src, r, n, i])
        }
            ,
            Object.freeze(RedImageLoader)
    }(),
    function() {
        var e;
        (RedBaseTexture = function() {}
        ).EMPTY_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzMxRDhBQzRFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzMxRDhBQzVFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MzFEOEFDMkU1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MzFEOEFDM0U1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuojYFUAAAAQSURBVHjaYvj//z8DQIABAAj8Av7bok0WAAAAAElFTkSuQmCC",
            RedImageLoader(RedBaseTexture.EMPTY_BASE64),
            RedBaseTexture.prototype = {
                setEmptyTexture: (e = new Uint8Array([0, 0, 0, 0]),
                        function(t, r) {
                            this instanceof RedBitmapCubeTexture ? (t.activeTexture(t.TEXTURE0),
                                t.bindTexture(t.TEXTURE_CUBE_MAP, r),
                                t.pixelStorei(t.UNPACK_ALIGNMENT, 1),
                                t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X, 0, t.LUMINANCE, 2, 2, 0, t.LUMINANCE, t.UNSIGNED_BYTE, e),
                                t.texImage2D(t.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, t.LUMINANCE, 2, 2, 0, t.LUMINANCE, t.UNSIGNED_BYTE, e),
                                t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, t.LUMINANCE, 2, 2, 0, t.LUMINANCE, t.UNSIGNED_BYTE, e),
                                t.texImage2D(t.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, t.LUMINANCE, 2, 2, 0, t.LUMINANCE, t.UNSIGNED_BYTE, e),
                                t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, t.LUMINANCE, 2, 2, 0, t.LUMINANCE, t.UNSIGNED_BYTE, e),
                                t.texImage2D(t.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, t.LUMINANCE, 2, 2, 0, t.LUMINANCE, t.UNSIGNED_BYTE, e),
                                t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MIN_FILTER, t.NEAREST),
                                t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MAG_FILTER, t.NEAREST),
                                t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
                                t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
                                t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1),
                                t.pixelStorei(t.UNPACK_ALIGNMENT, 4),
                                t.bindTexture(t.TEXTURE_CUBE_MAP, null)) : (t.activeTexture(t.TEXTURE0 + 0),
                                t.bindTexture(t.TEXTURE_2D, r),
                                t.pixelStorei(t.UNPACK_ALIGNMENT, 1),
                                t.texImage2D(t.TEXTURE_2D, 0, t.LUMINANCE, 2, 2, 0, t.LUMINANCE, t.UNSIGNED_BYTE, new Uint8Array([128, 64, 0, 192])),
                                t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1),
                                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST),
                                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST),
                                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
                                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
                                t.generateMipmap(t.TEXTURE_2D),
                                t.pixelStorei(t.UNPACK_ALIGNMENT, 4),
                                t.bindTexture(t.TEXTURE_2D, null))
                        }
                )
            },
            RedBaseTexture.prototype._load = function() {
                RedGLUtil.throwFunc("RedBaseTexture - _load : 반드시 재정의해야함")
            }
            ,
            RedBaseTexture.prototype.src = function() {
                RedGLUtil.throwFunc("RedBaseTexture - src : 반드시 재정의해야함")
            }
            ,
            RedBaseTexture.prototype.dispose = function() {
                this.webglTexture && this._src != RedBaseTexture.EMPTY_BASE64 && (this.webglTexture.gl.deleteTexture(this.webglTexture),
                    this.webglTexture = null)
            }
            ,
            Object.defineProperty(RedBaseTexture.prototype, "callback", {
                get: function() {
                    return this._callback
                },
                set: function(e) {
                    e && "function" != typeof e && RedGLUtil.throwFunc("RedBaseTexture : callback은 함수만 허용.", "입력값 :", e),
                        this._callback = e
                }
            }),
            Object.freeze(RedBaseTexture)
    }(),
    function() {
        var e, t, r, n, i, a, o, s, d;
        (RedBaseObject3D = function() {
                if (!(this instanceof RedBaseObject3D))
                    return new RedBaseObject3D
            }
        ).build = function(e) {
            this.name = "object3D_" + (RedGL.makeUUID() + 1),
                this.useTransparentSort = !1,
                this.useCullFace = !0,
                this.cullFace = e.BACK,
                this.useDepthMask = !0,
                this.useDepthTest = !0,
                this.depthTestFunc = e.LEQUAL,
                this.useBlendMode = !0,
                this.blendSrc = e.SRC_ALPHA,
                this.blendDst = e.ONE_MINUS_SRC_ALPHA,
                this.drawMode = e.TRIANGLES,
                this.pointSize = 1,
                this.x = this.y = this.z = 0,
                this.rotationX = this.rotationY = this.rotationZ = 0,
                this.scaleX = this.scaleY = this.scaleZ = 1,
                this.autoUpdateMatrix = !0,
                this._renderAutoUpdateMatrix = !0,
                this.matrix = mat4.create(),
                this.localMatrix = mat4.create(),
                this.normalMatrix = mat4.create(),
                this.children = [],
                this.useLOD = !1,
                this._lodLevels = {},
                this._mouseColorMaterial = null,
                this._mouseColorID = new Float32Array([parseInt(255 * Math.random()), parseInt(255 * Math.random()), parseInt(255 * Math.random()), 255])
        }
            ,
            RedBaseObject3D.prototype = {
                addLOD: function(e, t, r, n) {
                    r || n || RedGLUtil.throwFunc("RedBaseObject3D - addLOD : geometry, material 둘중하나는 반드시 입력되어야함"),
                    RedGLUtil.isUint(e) || RedGLUtil.throwFunc("RedBaseObject3D - level : uint만 허용함"),
                        a = {
                            level: e,
                            distance: t,
                            geometry: r || this.geometry,
                            material: n || this.material
                        },
                        this._lodLevels[e] = a
                },
                removeLOD: function(e) {
                    RedGLUtil.isUint(e) || RedGLUtil.throwFunc("RedBaseObject3D - removeLOD : level : uint만 허용함"),
                    this._lodLevels[e] && delete this._lodLevels[e]
                },
                localToWorld: (i = mat4.create(),
                        function(e, t, r) {
                            return "number" == typeof e || RedGLUtil.throwFunc("RedBaseObject3D - localToWorld : x - number만 허용함", "입력값 : ", e),
                            "number" == typeof t || RedGLUtil.throwFunc("RedBaseObject3D - localToWorld : y - number만 허용함", "입력값 : ", t),
                            "number" == typeof r || RedGLUtil.throwFunc("RedBaseObject3D - localToWorld : z - number만 허용함", "입력값 : ", r),
                                e = e || 0,
                                t = t || 0,
                                r = r || 0,
                                mat4.identity(i),
                                mat4.translate(i, i, [e, t, r]),
                                mat4.multiply(i, this.matrix, i),
                                [i[12], i[13], i[14]]
                        }
                ),
                worldToLocal: function() {
                    var e, t;
                    return e = mat4.create(),
                        t = mat4.create(),
                        function(r, n, i) {
                            return "number" == typeof r || RedGLUtil.throwFunc("RedBaseObject3D - worldToLocal : x - number만 허용함", "입력값 : ", r),
                            "number" == typeof n || RedGLUtil.throwFunc("RedBaseObject3D - worldToLocal : y - number만 허용함", "입력값 : ", n),
                            "number" == typeof i || RedGLUtil.throwFunc("RedBaseObject3D - worldToLocal : z - number만 허용함", "입력값 : ", i),
                                r = r || 0,
                                n = n || 0,
                                i = i || 0,
                                mat4.translate(e, e, [r, n, i]),
                                mat4.multiply(t, e, this.matrix),
                                [t[0] * r + t[1] * n + t[2] * i + t[3], t[4] * r + t[5] * n + t[6] * i + t[7], t[8] * r + t[9] * n + t[10] * i + t[11]]
                        }
                }(),
                getScreenPoint: (n = mat4.create(),
                        r = {
                            x: 0,
                            y: 0,
                            z: 0,
                            w: 0
                        },
                        function(i) {
                            return mat4.identity(n),
                            i instanceof RedView || RedGLUtil.throwFunc("RedBaseObject3D - getScreenPoint : redView - RedView Instance 만 허용함", "입력값 : ", i),
                                e = i.camera,
                                t = i._viewRect,
                            e instanceof RedBaseController && (e = e.camera),
                                mat4.multiply(n, e.perspectiveMTX, e.matrix),
                                mat4.multiply(n, n, this.matrix),
                                r.x = n[12],
                                r.y = n[13],
                                r.z = n[14],
                                r.w = n[15],
                                r.x = .5 * r.x / r.w + .5,
                                r.y = .5 * r.y / r.w + .5,
                                [(t[0] + r.x * t[2]) / window.devicePixelRatio, (t[1] + (1 - r.y) * t[3]) / window.devicePixelRatio]
                        }
                ),
                disposeAll: function() {
                    this.disposeAllTexture(),
                        this.disposeAllBuffer()
                },
                disposeAllTexture: function() {
                    this.material && this.material.disposeAllTexture()
                },
                disposeTexture: function(e) {
                    this.material && this.material.disposeTexture(e)
                },
                disposeAllBuffer: function() {
                    this.geometry && this.geometry.disposeAllBuffer()
                },
                disposeBuffer: function(e) {
                    this.geometry && this.geometry.disposeBuffer(e)
                }
            },
            d = function(e) {
                var t, r, n, i, a, o, s, d, l, u, c, f, h, R, m, p, _ = e.matrix, g = e.geometry.interleaveBuffer.stride;
                for (t = r = n = i = a = o = 0,
                         u = e.geometry.interleaveBuffer.data,
                         c = 0,
                         f = e.geometry.interleaveBuffer.pointNum; c < f; c++)
                    d = 1 + (s = c * g),
                        l = s + 2,
                        t = (h = _[0] * u[s] + _[4] * u[d] + _[8] * u[l]) < t ? h : t,
                        i = h > i ? h : i,
                        r = (R = _[1] * u[s] + _[5] * u[d] + _[9] * u[l]) < r ? R : r,
                        a = R > a ? R : a,
                        n = (m = _[2] * u[s] + _[6] * u[d] + _[10] * u[l]) < n ? m : n,
                        o = m > o ? m : o;
                return (p = [i - t, a - r, o - n]).minX = t,
                    p.maxX = i,
                    p.minY = r,
                    p.maxY = a,
                    p.minZ = n,
                    p.maxZ = o,
                    p
            }
            ,
            o = function(e) {
                var t = d(e)
                    , r = mat4.create();
                return mat4.translate(r, r, e.localToWorld(0, 0, 0)),
                    mat4.scale(r, r, t),
                    {
                        worldMatrix: r,
                        volume: t
                    }
            }
            ,
            s = function(e) {
                var t = e.geometry.volume
                    , r = mat4.create();
                return mat4.translate(r, r, e.localToWorld(0, 0, 0)),
                    mat4.rotateX(r, r, -e.rotationX * Math.PI / 180),
                    mat4.rotateY(r, r, -e.rotationY * Math.PI / 180),
                    mat4.rotateZ(r, r, -e.rotationZ * Math.PI / 180),
                    mat4.scale(r, r, t),
                    mat4.scale(r, r, [e.scaleX, e.scaleY, e.scaleZ]),
                    {
                        worldMatrix: r,
                        volume: d(e)
                    }
            }
            ,
            RedBaseObject3D.prototype.volumeCalculateAABB = function() {
                return this.volumeInfo = o(this)
            }
            ,
            RedBaseObject3D.prototype.volumeCalculateOBB = function() {
                return this.volumeInfo = s(this)
            }
            ,
            Object.defineProperty(RedBaseObject3D.prototype, "geometry", {
                get: function() {
                    return this._geometry
                },
                set: function(e) {
                    !e || e instanceof RedGeometry || RedGLUtil.throwFunc("geometry : RedGeometry Instance만 허용.", "입력값 : " + e),
                        this._geometry = e
                }
            }),
            Object.defineProperty(RedBaseObject3D.prototype, "material", {
                get: function() {
                    return this._material
                },
                set: function(e) {
                    !e || e instanceof RedBaseMaterial || RedGLUtil.throwFunc("material : RedBaseMaterial Instance만 허용.", "입력값 : " + e),
                        this._material = e
                }
            }),
            Object.freeze(RedBaseObject3D)
    }(),
    function() {
        var e;
        (RedBaseContainer = function() {
                if (!(this instanceof RedBaseContainer))
                    return new RedBaseContainer;
                this.children = []
            }
        ).prototype = new RedBaseObject3D,
            RedBaseContainer.prototype.addChild = function(e) {
                e instanceof RedBaseObject3D || RedGLUtil.throwFunc("addChild", "RedBaseObject3D Instance만 가능", "입력값 : " + e),
                this.children.indexOf(e) > -1 && this.removeChild(e),
                    this.children.push(e)
            }
            ,
            RedBaseContainer.prototype.addChildAt = function(e, t) {
                RedGLUtil.isUint(t, "addChildAt : index는 uint만 입력가능"),
                e instanceof RedBaseObject3D || RedGLUtil.throwFunc("addChildAt", "RedBaseObject3D Instance만 가능", "입력값 : " + e),
                this.children.indexOf(e) > -1 && this.removeChild(e),
                this.children.length < t && (t = this.children.length),
                    null != t ? this.children.splice(t, 0, e) : this.children.push(e)
            }
            ,
            RedBaseContainer.prototype.removeChild = function(t) {
                -1 == (e = this.children.indexOf(t)) ? RedGLUtil.throwFunc("removeChild", "존재하지 않는 RedMesh를 삭제하려고 함") : this.children.splice(e, 1)
            }
            ,
            RedBaseContainer.prototype.removeChildAt = function(e) {
                RedGLUtil.isUint(e, "removeChildAt : index는 uint만 입력가능"),
                    this.children[e] ? this.children.splice(e, 1) : RedGLUtil.throwFunc("removeChildAt", "index 해당인덱스에 위치한 자식이 없음.", "입력값 : " + e)
            }
            ,
            RedBaseContainer.prototype.removeChildAll = function() {
                this.children.length = 0
            }
            ,
            RedBaseContainer.prototype.getChildAt = function(e) {
                return RedGLUtil.isUint(e, "getChildAt : index는 uint만 입력가능"),
                    this.children[e]
            }
            ,
            RedBaseContainer.prototype.getChildIndex = function(e) {
                return this.children.indexOf(e)
            }
            ,
            RedBaseContainer.prototype.numChildren = function() {
                return this.children.length
            }
            ,
            RedBaseContainer.prototype.sortGeometry = function(e) {
                if (e)
                    for (var t = this.children.length; t--; )
                        this.children[t].sortGeometry && this.children[t].sortGeometry(e);
                this.children.sort(function(e, t) {
                    if (e._geometry && t._geometry) {
                        if ((e = e._geometry.interleaveBuffer._UUID) < (t = t._geometry.interleaveBuffer._UUID))
                            return -1;
                        if (e > t)
                            return 1
                    }
                    return 0
                })
            }
            ,
            RedBaseContainer.prototype.sortMaterial = function(e) {
                if (e)
                    for (var t = this.children.length; t--; )
                        this.children[t].sortMaterial && this.children[t].sortMaterial(e);
                this.children.sort(function(e, t) {
                    if (e._geometry && t._geometry) {
                        if ((e = e._material.program._UUID) < (t = t._material.program._UUID))
                            return -1;
                        if (e > t)
                            return 1
                    }
                    return 0
                })
            }
            ,
            RedBaseContainer.prototype.sortGeometryAndMaterial = function(e) {
                if (e)
                    for (var t = this.children.length; t--; )
                        this.children[t].sortGeometryAndMaterial && this.children[t].sortGeometryAndMaterial(e);
                this.children.sort(function(e, t) {
                    if (e._geometry && t._geometry) {
                        if ((e = e._geometry.interleaveBuffer._UUID) == (t = t._geometry.interleaveBuffer._UUID)) {
                            var r = e._material.program._UUID
                                , n = t._material.program._UUID;
                            return r < n ? -1 : r > n ? 1 : 0
                        }
                        if (e < t)
                            return -1;
                        if (e > t)
                            return 1
                    }
                    return 0
                })
            }
            ,
            Object.freeze(RedBaseContainer)
    }(),
    function() {
        var e;
        (RedBaseLight = function() {
                if (!(this instanceof RedBaseLight))
                    return new RedBaseLight
            }
        ).prototype = {},
            RedDefinePropertyInfo.definePrototype("RedBaseLight", "intensity", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedBaseLight", "alpha", "number", {
                min: 0,
                max: 1,
                callback: function(e) {
                    this._lightColor[3] = this._alpha = e
                }
            }),
            RedDefinePropertyInfo.definePrototype("RedBaseLight", "color", "hex", {
                callback: function() {
                    e = RedGLUtil.hexToRGB_ZeroToOne.call(this, this._color),
                        this._lightColor[0] = e[0],
                        this._lightColor[1] = e[1],
                        this._lightColor[2] = e[2],
                        this._lightColor[3] = this._alpha
                }
            }),
            Object.freeze(RedBaseLight)
    }(),
    (RedFrameBuffer = function(e, t, r) {
            if (!(this instanceof RedFrameBuffer))
                return new RedFrameBuffer(e,t,r);
            var n;
            e instanceof RedGL || RedGLUtil.throwFunc("RedFrameBuffer : RedGL Instance만 허용.", e),
            t && ("number" == typeof t || RedGLUtil.throwFunc("RedFrameBuffer : width - 숫자만 허용", "입력값 : ", t)),
            r && ("number" == typeof r || RedGLUtil.throwFunc("RedFrameBuffer : height - 숫자만 허용", "입력값 : ", r)),
                n = e.gl,
                r = r || 1080,
            (t = t || 1920) > e.detect.texture.MAX_TEXTURE_SIZE && (t = e.detect.texture.MAX_TEXTURE_SIZE),
            r > e.detect.texture.MAX_TEXTURE_SIZE && (r = e.detect.texture.MAX_TEXTURE_SIZE),
                this.redGL = e,
                this.width = t,
                this.height = r,
                this.webglFrameBuffer = n.createFramebuffer(),
                this.webglRenderBuffer = n.createRenderbuffer(),
                this.texture = RedBitmapTexture(e),
                this._UUID = RedGL.makeUUID(),
                n.bindFramebuffer(n.FRAMEBUFFER, this.webglFrameBuffer),
                n.activeTexture(n.TEXTURE0),
                n.bindTexture(n.TEXTURE_2D, this.texture.webglTexture),
                n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, this.width, this.height, 0, n.RGBA, n.UNSIGNED_BYTE, null),
                n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !1),
                n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.NEAREST),
                n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.NEAREST),
                n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE),
                n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE),
                n.bindRenderbuffer(n.RENDERBUFFER, this.webglRenderBuffer),
                n.renderbufferStorage(n.RENDERBUFFER, n.DEPTH_COMPONENT16, this.width, this.height),
                n.framebufferTexture2D(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, this.texture.webglTexture, 0),
                n.framebufferRenderbuffer(n.FRAMEBUFFER, n.DEPTH_ATTACHMENT, n.RENDERBUFFER, this.webglRenderBuffer),
                n.bindTexture(n.TEXTURE_2D, null),
                n.bindRenderbuffer(n.RENDERBUFFER, null),
                n.bindFramebuffer(n.FRAMEBUFFER, null)
        }
    ).prototype = {
        bind: function(e) {
            e.bindFramebuffer(e.FRAMEBUFFER, this.webglFrameBuffer),
                e.activeTexture(e.TEXTURE0),
                e.bindTexture(e.TEXTURE_2D, this.texture.webglTexture),
                e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, this.width, this.height, 0, e.RGBA, e.UNSIGNED_BYTE, null),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
                e.bindRenderbuffer(e.RENDERBUFFER, this.webglRenderBuffer),
                e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT16, this.width, this.height),
                e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, this.texture.webglTexture, 0),
                e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, this.webglRenderBuffer)
        },
        unbind: function(e) {
            e.bindTexture(e.TEXTURE_2D, null),
                e.bindRenderbuffer(e.RENDERBUFFER, null),
                e.bindFramebuffer(e.FRAMEBUFFER, null)
        }
    },
    RedDefinePropertyInfo.definePrototype("RedFrameBuffer", "width", "number", {
        min: 2
    }),
    RedDefinePropertyInfo.definePrototype("RedFrameBuffer", "height", "number", {
        min: 2
    }),
    Object.freeze(RedFrameBuffer),
    function() {
        var e, t, r;
        e = function(e, t, r) {
            switch (t) {
                case RedBuffer.ARRAY_BUFFER:
                    if (r instanceof Float32Array)
                        return e.FLOAT;
                    if (r instanceof Float64Array)
                        return e.FLOAT;
                    RedGLUtil.throwFunc("RedBuffer : 올바른 TypedArray(RedBuffer.ARRAY_BUFFER)형식을 사용해야합니다.", "입력값 : " + r);
                    break;
                case RedBuffer.ELEMENT_ARRAY_BUFFER:
                    if (r instanceof Int8Array)
                        return e.BYTE;
                    if (r instanceof Int16Array)
                        return e.SHORT;
                    if (r instanceof Int32Array)
                        return e.INT;
                    if (r instanceof Uint8Array)
                        return e.UNSIGNED_BYTE;
                    if (r instanceof Uint16Array)
                        return e.UNSIGNED_SHORT;
                    if (r instanceof Uint32Array)
                        return e.UNSIGNED_INT;
                    RedGLUtil.throwFunc("RedBuffer : 올바른 TypedArray(RedBuffer.ELEMENT_ARRAY_BUFFER)형식을 사용해야합니다.", "입력값 : " + r);
                    break;
                default:
                    RedGLUtil.throwFunc("RedBuffer : bufferType - 지원하지 않는 버퍼타입입니다. ", "입력값 : " + t)
            }
        }
            ,
            t = function(e, t) {
                switch (t) {
                    case RedBuffer.ARRAY_BUFFER:
                        return e.ARRAY_BUFFER;
                    case RedBuffer.ELEMENT_ARRAY_BUFFER:
                        return e.ELEMENT_ARRAY_BUFFER;
                    default:
                        RedGLUtil.throwFunc("RedBuffer : bufferType - 지원하지 않는 버퍼타입입니다. ")
                }
            }
            ,
            r = function(e, t, r, n) {
                var i, a, o, s, d;
                switch (r instanceof Float32Array ? d = Float32Array.BYTES_PER_ELEMENT : r instanceof Float64Array && (d = Float64Array.BYTES_PER_ELEMENT),
                    i = 0,
                    t) {
                    case RedBuffer.ARRAY_BUFFER:
                        if (e.interleaveDefineInfoList = n,
                            n) {
                            for (n.length || RedGLUtil.throwFunc("RedBuffer : interleaveDefineInfoList의 정보는 1개이상의 RedInterleaveInfo Instance로 구성되어야함.", n),
                                     a = 0,
                                     o = n.length; a < o; a++)
                                (s = n[a])instanceof RedInterleaveInfo || RedGLUtil.throwFunc("RedBuffer : interleaveDefineInfoList의 정보는 RedInterleaveInfo Instance로만 구성되어야함.", n),
                                    s.offset = o < 2 ? 0 : i,
                                    s.offset_BYTES_PER_ELEMENT = o < 2 ? 0 : i * d,
                                    i += s.size,
                                    s._UUID = RedGL.makeUUID(),
                                    n[s.attributeKey] = s;
                            o < 2 ? (e.stride = 0,
                                e.stride_BYTES_PER_ELEMENT = 0,
                                e.pointNum = r.length / 3) : (e.stride = i,
                                e.stride_BYTES_PER_ELEMENT = i * d,
                                e.pointNum = r.length / i),
                            e.pointNum !== parseInt(e.pointNum) && RedGLUtil.throwFunc("RedBuffer : ARRAY_BUFFER의 pointNum이 정수로 떨어지지 않음. 데이터구성과 interleaveDefineInfoList 구성 확인 필요")
                        } else
                            RedGLUtil.throwFunc("RedBuffer : interleaveDefineInfoList는 반드시 정의 되어야함.");
                        break;
                    case RedBuffer.ELEMENT_ARRAY_BUFFER:
                        e.pointNum = r.length
                }
            }
            ,
            (RedBuffer = function(n, i, a, o, s, d) {
                    if (!(this instanceof RedBuffer))
                        return new RedBuffer(n,i,a,o,s,d);
                    n instanceof RedGL || RedGLUtil.throwFunc("RedBuffer : RedGL Instance만 허용.", n),
                    "string" == typeof i || RedGLUtil.throwFunc("RedBuffer : key - 문자열만 허용.", "입력값 : " + i),
                    a || RedGLUtil.throwFunc("RedBuffer : bufferType : 미입력, 반드시 입력해야함."),
                    a === RedBuffer.ARRAY_BUFFER || a === RedBuffer.ELEMENT_ARRAY_BUFFER || RedGLUtil.throwFunc("RedBuffer : bufferType - RedBuffer.ARRAY_BUFFER or RedBuffer.ELEMENT_ARRAY_BUFFER 만 허용함.", "입력값 : " + a);
                    var l = n.gl;
                    if (n._datas.RedBuffer || (n._datas.RedBuffer = {},
                        n._datas.RedBuffer[RedBuffer.ARRAY_BUFFER] = {},
                        n._datas.RedBuffer[RedBuffer.ELEMENT_ARRAY_BUFFER] = {}),
                        n._datas.RedBuffer[a][i])
                        return n._datas.RedBuffer[a][i];
                    n._datas.RedBuffer[a][i] = this,
                    a !== RedBuffer.ARRAY_BUFFER || s || RedGLUtil.throwFunc("RedBuffer : 신규생성시 interleaveDefineInfoList를 반드시 정의해야합니다.", "입력값 : " + s),
                        this.key = i,
                        this.data = o,
                        this.bufferType = a,
                        this.glBufferType = t(l, this.bufferType),
                        this.glArrayType = e(l, this.bufferType, this.data),
                        this.drawMode = d || l.STATIC_DRAW,
                        r(this, this.bufferType, this.data, s),
                        this.webglBuffer = l.createBuffer(),
                        this.webglBuffer.gl = l,
                        this.webglBuffer.redGL = n,
                        this._UUID = RedGL.makeUUID(),
                        this.upload = function(t) {
                            this.glArrayType === e(l, a, t) ? (this.data = t,
                                l.bindBuffer(this.glBufferType, this.webglBuffer),
                                l.bufferData(this.glBufferType, this.data, this.drawMode),
                                r(this, this.bufferType, this.data, this.interleaveDefineInfoList),
                            this.bufferType === RedBuffer.ARRAY_BUFFER && (this.triangleNum = this.data.length / (this.stride ? this.stride : 3)),
                            this.bufferType === RedBuffer.ELEMENT_ARRAY_BUFFER && (this.triangleNum = this.pointNum / 3)) : RedGLUtil.throwFunc("RedBuffer : upload - data형식이 기존 형식과 다름", t)
                        }
                        ,
                        this.upload(this.data)
                }
            ).prototype.dispose = function() {
                this.webglBuffer && !this.isPrimitiveBuffer && (this.webglBuffer.gl.deleteBuffer(this.webglBuffer),
                    delete this.webglBuffer.redGL._datas.RedBuffer[this.bufferType][this.key],
                    this.webglBuffer = null)
            }
            ,
            RedBuffer.ARRAY_BUFFER = "arrayBuffer",
            RedBuffer.ELEMENT_ARRAY_BUFFER = "elementArrayBuffer",
            Object.freeze(RedBuffer)
    }(),
    function() {
        var e, t;
        (RedGeometry = function(e, t) {
                if (!(this instanceof RedGeometry))
                    return new RedGeometry(e,t);
                this._UUID = RedGL.makeUUID(),
                e instanceof RedBuffer || RedGLUtil.throwFunc("RedGeometry : interleaveBuffer - RedBuffer Instance만 허용.", e),
                e.bufferType === RedBuffer.ARRAY_BUFFER || RedGLUtil.throwFunc("RedGeometry : interleaveBuffer - RedBuffer.ARRAY_BUFFER 타입만 허용.", e),
                t && (e || RedGLUtil.throwFunc("RedGeometry : indexBuffer는 반드시 interleaveBuffer와 쌍으로 입력되어야함.", t),
                t instanceof RedBuffer || RedGLUtil.throwFunc("RedGeometry : indexBuffer - RedBuffer Instance만 허용.", t),
                t.bufferType === RedBuffer.ELEMENT_ARRAY_BUFFER || RedGLUtil.throwFunc("RedGeometry : indexBuffer - RedBuffer.ELEMENT_ARRAY_BUFFER 타입만 허용.", t)),
                    this.interleaveBuffer = e,
                    this.indexBuffer = t,
                    this._volume = null
            }
        ).prototype = {
            disposeAllBuffer: function() {
                for (e in this)
                    t = this[e],
                    this && t instanceof RedBuffer && t.dispose()
            },
            disposeBuffer: function(e) {
                this && this[e]instanceof RedBuffer && this[e].dispose()
            },
            volumeCalculate: function() {
                var e, t, r, n, i, a, o, s, d, l, u, c, f = this.interleaveBuffer.stride;
                for (e = t = r = n = i = a = 0,
                         l = this.interleaveBuffer.data,
                         u = 0,
                         c = this.interleaveBuffer.pointNum; u < c; u++)
                    s = (o = u * f) + 1,
                        d = o + 2,
                        e = l[o] < e ? l[o] : e,
                        n = l[o] > n ? l[o] : n,
                        t = l[s] < t ? l[s] : t,
                        i = l[s] > i ? l[s] : i,
                        r = l[d] < r ? l[d] : r,
                        a = l[d] > a ? l[d] : a;
                return this._volume = [n - e, i - t, a - r],
                    this._volume.minX = e,
                    this._volume.maxX = n,
                    this._volume.minY = t,
                    this._volume.maxY = i,
                    this._volume.minZ = r,
                    this._volume.maxZ = a,
                    this._volume
            }
        },
            Object.defineProperty(RedGeometry.prototype, "volume", {
                get: function() {
                    return this._volume || this.volumeCalculate(),
                        this._volume
                }
            }),
            Object.freeze(RedGeometry)
    }(),
    RedInterleaveInfo = function(e, t, r) {
        if (!(this instanceof RedInterleaveInfo))
            return new RedInterleaveInfo(e,t,r);
        "string" == typeof e || RedGLUtil.throwFunc("RedInterleaveInfo : attributeKey - 문자열만 허용", e),
        "a" === e.charAt(0) || RedGLUtil.throwFunc("RedInterleaveInfo : attributeKey 첫글자는 a로 시작해야합니다.", e),
        e.charAt(1) === e.charAt(1).toUpperCase() || RedInterleaveInfo.throwFunc("RedInterleaveInfo : attributeKey 두번째 글자는 대문자 시작해야합니다.", e),
        "number" == typeof t || RedGLUtil.throwFunc("RedInterleaveInfo : size - 숫자만 허용", t),
            this.attributeKey = e,
            this.size = t,
            this.normalize = void 0 !== r,
            this.offset = null
    }
    ,
    Object.freeze(RedInterleaveInfo),
    function() {
        var e, t, r, n, i, a, o, s;
        (RedBaseMaterial = function() {}
        ).prototype = {
            makeProgramList: (s = ["fog", "sprite3D", "skin", "directionalShadow"],
                    s.sort(),
                    a = function(e, t, r, n, s, d, l) {
                        e.basic[t] || (e.basic[t] = new i(r,e,t,n,s)),
                            d.forEach(function(u, c) {
                                d.sort(),
                                    l.sort();
                                var f = d.join("_");
                                e[f] || (e[f] = {}),
                                e[f][t] || (e[f][t] = new i(r,e,t,n,s,d));
                                var h = d.concat();
                                h.splice(c, 1),
                                    o(e, f, t, r, n, s, d, l),
                                    a(e, t, r, n, s, h, l)
                            })
                    }
                    ,
                    o = function(e, t, r, n, a, o, s, d) {
                        function l(e, t) {
                            var r, n, i, a, o;
                            if (t > e.length || t <= 0)
                                return [];
                            if (t === e.length)
                                return [e];
                            if (1 === t) {
                                for (i = [],
                                         r = 0; r < e.length; r++)
                                    i.push([e[r]]);
                                return i
                            }
                            for (i = [],
                                     r = 0; r < e.length - t + 1; r++)
                                for (a = e.slice(r, r + 1),
                                         o = l(e.slice(r + 1), t - 1),
                                         n = 0; n < o.length; n++)
                                    i.push(a.concat(o[n]));
                            return i
                        }
                        (function(e) {
                                var t, r, n, i;
                                for (n = [],
                                         t = 1; t <= e.length; t++)
                                    for (i = l(e, t),
                                             r = 0; r < i.length; r++)
                                        n.push(i[r]);
                                return n
                            }
                        )(d = d || []).forEach(function(d) {
                            var l = d.join("_");
                            e.basic[r + "_" + l] || (e.basic[r + "_" + l] = new i(n,e,r,a,o,null,d)),
                            e[t][r + "_" + l] || (e[t][r + "_" + l] = new i(n,e,r,a,o,s,d))
                        })
                    }
                    ,
                    i = function(e, t, r, n, i, a, o) {
                        0,
                            o = o || [],
                            this.optionList = o.concat(a || []),
                            this.systemKey = (a || ["basic"]).join("_"),
                            this.searchKey = r + (o.length ? "_" + o.join("_") : ""),
                            this.key = r + (this.optionList.length ? "_" + this.optionList.join("_") : ""),
                            this._prepareProgramYn = !0,
                            this._makePrepareProgram = function() {
                                return t[this.systemKey][this.searchKey] = RedProgram.makeProgram(e, r, n, i, this.optionList)
                            }
                    }
                    ,
                    function(e, t, r, n, i, o) {
                        o || (o = []),
                        t._datas.RedProgramGroup || (t._datas.RedProgramGroup = {}),
                            t._datas.RedProgramGroup[r] ? e._programList = t._datas.RedProgramGroup[r] : (e._programList = {
                                basic: {}
                            },
                                a(e._programList, r, t, n, i, s, o),
                                e._programList.basic[r] = RedProgram.makeProgram(t, r, n, i),
                                t._datas.RedProgramGroup[r] = e._programList),
                            e.program = e._programList.basic[r]
                    }
            ),
            _searchProgram: function(e, i) {
                if (n = [],
                    i)
                    for (t = i.length; t--; )
                        this[r = i[t]] && n.push(r);
                n.length ? (n.sort(),
                    n = e + "_" + n.join("_")) : n = e,
                    this.program = this._programList.basic[n]
            },
            checkUniformAndProperty: function() {
                var e, t, r;
                return function() {
                    for (this.program._prepareProgramYn && (this.program = this.program._makePrepareProgram()),
                             t = this.program.uniformLocation,
                             e = t.length; e--; )
                        r = t[e],
                        !r.location || r.materialPropertyName in this || RedGLUtil.throwFunc(this.program.key + "- ", r.materialPropertyName, "속성이 정의 되지않았습니다.")
                }
            }(),
            disposeAllTexture: function() {
                for (e in this)
                    this[e]instanceof RedBaseTexture && this[e].dispose()
            },
            disposeTexture: function(e) {
                this[e]instanceof RedBaseTexture && this[e].dispose()
            }
        },
            Object.freeze(RedBaseMaterial)
    }(),
    RedTextureOptionChecker = {
        check: function(e, t, r) {
            t && (t.min && t.min != r.LINEAR && t.min != r.NEAREST && t.min != r.NEAREST_MIPMAP_NEAREST && t.min != r.LINEAR_MIPMAP_NEAREST && t.min != r.NEAREST_MIPMAP_LINEAR && t.min != r.LINEAR_MIPMAP_LINEAR && RedGLUtil.throwFunc(e + ": min 텍스쳐 옵션에서 사용할수 없는값 입력됨.", "입력값 : " + t.min),
            t.mag && t.mag != r.LINEAR && t.mag != r.NEAREST && RedGLUtil.throwFunc(e + " : mag 텍스쳐 옵션에서 사용할수 없는값 입력됨.", "입력값 : " + t.mag),
            t.wrap_s && t.wrap_s != r.REPEAT && t.wrap_s != r.CLAMP_TO_EDGE && t.wrap_s != r.MIRRORED_REPEAT && RedGLUtil.throwFunc(e + " : wrap_s 텍스쳐 옵션에서 사용할수 없는값 입력됨.", "입력값 : " + t.wrap_s),
            t.wrap_t && t.wrap_t != r.REPEAT && t.wrap_t != r.CLAMP_TO_EDGE && t.wrap_t != r.MIRRORED_REPEAT && RedGLUtil.throwFunc(e + " : wrap_t 텍스쳐 옵션에서 사용할수 없는값 입력됨.", "입력값 : " + t.wrap_t))
        }
    },
    Object.freeze(RedTextureOptionChecker),
    function() {
        var e, t, r;
        t = function(e, t, r, n) {
            e.activeTexture(e.TEXTURE0 + 0),
                e.bindTexture(e.TEXTURE_2D, t),
                e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, r),
                e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 0),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, n.min ? n.min : e.LINEAR_MIPMAP_NEAREST),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, n.mag ? n.mag : e.LINEAR),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, n.wrap_s ? n.wrap_s : e.REPEAT),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, n.wrap_t ? n.wrap_t : e.REPEAT),
            e.glExtension.EXT_texture_filter_anisotropic && n.anisotropic && e.texParameterf(e.TEXTURE_2D, e.glExtension.EXT_texture_filter_anisotropic.TEXTURE_MAX_ANISOTROPY_EXT, n.anisotropic);
            try {
                e.generateMipmap(e.TEXTURE_2D)
            } catch (e) {}
            e.bindTexture(e.TEXTURE_2D, null)
        }
            ,
            e = function(e, n, i, a, o, s) {
                if (o || (o = {}),
                window.OffscreenCanvas && a instanceof OffscreenCanvas || window.HTMLCanvasElement && a instanceof HTMLCanvasElement) {
                    var d = RedGLUtil.makePowerOf2Source(e, a, r);
                    t(e, i, d, o),
                    s && s.call(n, !0)
                } else
                    RedImageLoader(a, function() {
                        var a = RedGLUtil.makePowerOf2Source(e, this.source, r);
                        t(e, i, a, o),
                        s && s.call(n, !0)
                    }, function() {
                        s && s.call(n, !1)
                    })
            }
            ,
            (RedBitmapTexture = function(t, n, i, a) {
                    var o;
                    if (!(this instanceof RedBitmapTexture))
                        return new RedBitmapTexture(t,n,i,a);
                    t instanceof RedGL || RedGLUtil.throwFunc("RedBitmapTexture : RedGL Instance만 허용.", t),
                    a && "function" == typeof a || !a || RedGLUtil.throwFunc("RedBitmapTexture : callback Function만 허용.", a),
                        o = t.gl,
                        r = t.detect.texture.MAX_TEXTURE_SIZE,
                        i = i || {};
                    var s = n + JSON.stringify(i);
                    if ("string" == typeof n && (t._datas.textures || (t._datas.textures = {}),
                        t._datas.textures[s]))
                        return a && setTimeout(function() {
                            a.call(this, !0)
                        }, 1),
                            t._datas.textures[s];
                    this.webglTexture = o.createTexture(),
                        this.webglTexture.gl = o,
                        this._load = function(t) {
                            RedTextureOptionChecker.check("RedBitmapTexture", i, o),
                            t && this.setEmptyTexture(o, this.webglTexture),
                            this._src && e(o, this, this.webglTexture, this._src, this._option, this._callback)
                        }
                        ,
                        this._option = i,
                        this.callback = a,
                        this.src = n,
                        this._UUID = RedGL.makeUUID(),
                        t._datas.textures[s] = this
                }
            ).prototype = new RedBaseTexture,
            Object.defineProperty(RedBitmapTexture.prototype, "src", {
                get: function() {
                    return this._src
                },
                set: function(e) {
                    if (window.OffscreenCanvas)
                        return this._src = e,
                            void this._load(!0);
                    !e || "string" == typeof e || window.HTMLCanvasElement && e instanceof HTMLCanvasElement || RedGLUtil.throwFunc("RedBitmapTexture : src는 문자열 or Canvas Element만 허용.", "입력값 : " + e),
                        this._src = e,
                        this._load(!0)
                }
            }),
            Object.defineProperty(RedBitmapTexture.prototype, "option", {
                get: function() {
                    return this._option
                },
                set: function(e) {
                    this._option = e,
                        this._load(!1)
                }
            }),
            Object.freeze(RedBitmapTexture)
    }(),
    function() {
        var e, t;
        t = function(e, t, r) {
            e.activeTexture(e.TEXTURE0 + 0),
                e.bindTexture(e.TEXTURE_2D, t),
                e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, r),
                e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 0),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR),
                e.bindTexture(e.TEXTURE_2D, null)
        }
            ,
            e = function(e, r, n, i, a) {
                var o, s, d, l;
                d = function(e) {
                    e.removeEventListener("error", o),
                        e.removeEventListener("canplaythrough", s)
                }
                    ,
                    o = function() {
                        d(this),
                        a && a.call(r, !1)
                    }
                    ,
                    s = function() {
                        d(this),
                            this.play(),
                            r._videoDom.loaded = !0,
                            t(e, n, this),
                        a && a.call(r, !0)
                    }
                    ,
                    i instanceof HTMLVideoElement ? l = i : (l = document.createElement("video")).src = i,
                    l.loop = !0,
                    l.muted = !0,
                    l.setAttribute("autoplay", ""),
                    l.style.cssText = "position:absolute;top:0px;left:0px;z-index:200",
                    r._videoDom = l,
                    r._videoDom.loaded = !1,
                    l.addEventListener("error", o),
                    l.addEventListener("canplaythrough", s)
            }
            ,
            (RedVideoTexture = function(t, r, n) {
                    var i;
                    if (!(this instanceof RedVideoTexture))
                        return new RedVideoTexture(t,r,n);
                    t instanceof RedGL || RedGLUtil.throwFunc("RedVideoTexture : RedGL Instance만 허용.", t),
                        i = t.gl,
                        this.webglTexture = i.createTexture(),
                        this.webglTexture.gl = i,
                        this._UUID = RedGL.makeUUID(),
                        this._load = function(t) {
                            t && this.setEmptyTexture(i, this.webglTexture),
                            this._src && e(i, this, this.webglTexture, this._src, this._callback)
                        }
                        ,
                        this.callback = n,
                        this.src = r
                }
            ).prototype = new RedBaseTexture,
            Object.defineProperty(RedVideoTexture.prototype, "src", {
                get: function() {
                    return this._src
                },
                set: function(e) {
                    !e || "string" == typeof e || e instanceof HTMLVideoElement || RedGLUtil.throwFunc("RedVideoTexture : src는 문자열 or HTMLVideoElement만 허용.", "입력값 : " + e),
                        this._src = e,
                        this._load(!0)
                }
            }),
            Object.freeze(RedVideoTexture)
    }(),
    (RedDDSTexture = function(e, t, r, n) {
            var i;
            if (!(this instanceof RedDDSTexture))
                return new RedDDSTexture(e,t,r,n);
            e instanceof RedGL || RedGLUtil.throwFunc("RedDDSTexture : RedGL Instance만 허용.", e),
            (i = e.gl).glExtension.WEBGL_compressed_texture_s3tc || RedGLUtil.throwFunc("RedDDSTexture : WEBGL_compressed_texture_s3tc확장을 지원하지않는 하드웨어입니다."),
                this.webglTexture = i.createTexture(),
                this.webglTexture.gl = i,
                this._load = function(e) {
                    RedTextureOptionChecker.check("RedDDSTexture", r, i),
                    e && this.setEmptyTexture(i, this.webglTexture),
                    this._src && this.loadDDSTexture(i, i.glExtension.WEBGL_compressed_texture_s3tc, this._src, this._callback)
                }
                ,
                this.callback = n,
                this.src = t,
                this._UUID = RedGL.makeUUID()
        }
    ).prototype = new RedBaseTexture,
    Object.defineProperty(RedDDSTexture.prototype, "src", {
        get: function() {
            return this._src
        },
        set: function(e) {
            e && "string" != typeof e && RedGLUtil.throwFunc("RedDDSTexture : src는 문자열만 허용.", "입력값 : " + e),
                this._src = e,
                this._load(!0)
        }
    }),
    function(e) {
        "use strict";
        function t(e) {
            return e.charCodeAt(0) + (e.charCodeAt(1) << 8) + (e.charCodeAt(2) << 16) + (e.charCodeAt(3) << 24)
        }
        var r = t("DXT1")
            , n = t("DXT3")
            , i = t("DXT5")
            , a = e.uploadDDSLevels = function(e, t, a, o) {
                var s, d, l, u, c, f, h, R, m, p = new Int32Array(a,0,31);
                if (542327876 != p[0])
                    return 0;
                if (4 & !p[20])
                    return 0;
                switch (p[21]) {
                    case r:
                        s = 8,
                            d = t.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                        break;
                    case n:
                        s = 16,
                            d = t.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                        break;
                    case i:
                        s = 16,
                            d = t.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                        break;
                    default:
                        return null
                }
                for (R = 1,
                     131072 & p[2] && !1 !== o && (R = Math.max(1, p[7])),
                         l = p[4],
                         u = p[3],
                         f = p[1] + 4,
                         m = 0; m < R; ++m)
                    c = Math.max(4, l) / 4 * Math.max(4, u) / 4 * s,
                        h = new Uint8Array(a,f,c),
                        e.compressedTexImage2D(e.TEXTURE_2D, m, d, l, u, 0, h),
                        f += c,
                        l *= .5,
                        u *= .5;
                return R
            }
        ;
        e.loadDDSTexture = function(e, t, r, n, i) {
            var o = this.webglTexture
                , s = new XMLHttpRequest;
            return s.open("GET", r, !0),
                s.responseType = "arraybuffer",
            n || (n = {}),
                s.onload = function() {
                    e.activeTexture(e.TEXTURE0 + 0),
                        e.bindTexture(e.TEXTURE_2D, o);
                    var r = a(e, t, this.response);
                    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, n.min ? n.min : r > 1 ? e.LINEAR_MIPMAP_NEAREST : e.LINEAR),
                        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, n.mag ? n.mag : e.LINEAR),
                        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
                        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
                        e.bindTexture(e.TEXTURE_2D, null),
                    i && i(!0)
                }
                ,
                s.onerror = function() {
                    i && i(!1)
                }
                ,
                s.send(null),
                o
        }
    }(RedDDSTexture.prototype),
    Object.freeze(RedDDSTexture),
    function() {
        var e;
        e = function(e, t, r, n, i, a) {
            var o, s, d, l, u, c = [];
            for (i = i || {},
                     o = function() {
                         0 === u && a && a.call(t, !1),
                             u++
                     }
                     ,
                     s = function() {
                         if (6 == ++l) {
                             e.activeTexture(e.TEXTURE0),
                                 e.bindTexture(e.TEXTURE_CUBE_MAP, r),
                                 e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 0),
                                 e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_MIN_FILTER, i.min ? i.min : e.LINEAR_MIPMAP_NEAREST),
                                 e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_MAG_FILTER, i.mag ? i.mag : e.LINEAR),
                                 e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_WRAP_S, i.wrap_s ? i.wrap_s : e.CLAMP_TO_EDGE),
                                 e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_WRAP_T, i.wrap_t ? i.wrap_t : e.CLAMP_TO_EDGE),
                                 e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, c[0].source),
                                 e.texImage2D(e.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, c[1].source),
                                 e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, c[2].source),
                                 e.texImage2D(e.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, c[3].source),
                                 e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, c[4].source),
                                 e.texImage2D(e.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, c[5].source),
                                 e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 0);
                             try {
                                 e.generateMipmap(e.TEXTURE_CUBE_MAP)
                             } catch (e) {}
                             e.bindTexture(e.TEXTURE_CUBE_MAP, null),
                             0 === u && a && a.call(t, !0)
                         }
                     }
                     ,
                     d = 6,
                     l = 0,
                     u = 0; d--; )
                c[d] = RedImageLoader(n[d], s, o, {})
        }
            ,
            (RedBitmapCubeTexture = function(t, r, n, i) {
                    var a;
                    if (!(this instanceof RedBitmapCubeTexture))
                        return new RedBitmapCubeTexture(t,r,n,i);
                    t instanceof RedGL || RedGLUtil.throwFunc("RedBitmapCubeTexture : RedGL Instance만 허용.", "입력값 : " + t),
                    i && "function" == typeof i || !i || RedGLUtil.throwFunc("RedBitmapCubeTexture : callback Function만 허용.", i),
                        a = t.gl,
                        n = n || {};
                    var o = r.toString() + JSON.stringify(n);
                    if (r instanceof Array && (t._datas.textures || (t._datas.textures = {}),
                        t._datas.textures[o]))
                        return i && setTimeout(function() {
                            i.call(this, !0)
                        }, 1),
                            t._datas.textures[o];
                    this.webglTexture = a.createTexture(),
                        this.webglTexture.gl = a,
                        this._UUID = RedGL.makeUUID(),
                        this._load = function(t) {
                            RedTextureOptionChecker.check("RedBitmapCubeTexture", n, a),
                            t && this.setEmptyTexture(a, this.webglTexture),
                            this._srcList && e(a, this, this.webglTexture, this._srcList, this._option, this._callback)
                        }
                        ,
                        this._option = n,
                        this.callback = i,
                        this.srcList = r,
                        t._datas.textures[o] = this
                }
            ).prototype = new RedBaseTexture,
            Object.defineProperty(RedBitmapCubeTexture.prototype, "srcList", {
                get: function() {
                    return this._srcList
                },
                set: function(e) {
                    e instanceof Array || RedGLUtil.throwFunc("RedBitmapCubeTexture : srcList는 배열만 허용.", "입력값 : " + e),
                    6 === e.length || RedGLUtil.throwFunc("RedBitmapCubeTexture : srcList 길이는 6이어야함", "입력값 : " + e),
                        this._srcList = e,
                        this._load(!0)
                }
            }),
            Object.defineProperty(RedBitmapCubeTexture.prototype, "option", {
                get: function() {
                    return this._option
                },
                set: function(e) {
                    this._option = e,
                        this._load(!1)
                }
            }),
            Object.freeze(RedBitmapCubeTexture)
    }(),
    function() {
        var e, t, r, n, i = [];
        e = function() {/* @preserve
// 스키닝
//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#
// Sprite3D
//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
void main(void) {
gl_PointSize = uPointSize;
// position 계산
//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
vVertexPosition =  targetMatrix *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
//#REDGL_DEFINE#sprite3D#true# }
//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
//#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter  *  uDirectionalShadowLightMatrix * targetMatrix * vec4(aVertexPosition, 1.0);
}
*/
        }
            ,
            t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
// 그림자
//#REDGL_DEFINE#fragmentShareFunc#decodeFloatShadow#
//#REDGL_DEFINE#fragmentShareFunc#getShadowColor#
uniform vec4 u_color;
void main(void) {
vec4 finalColor = u_color;
if(finalColor.a == 0.0) discard;
//#REDGL_DEFINE#directionalShadow#true# finalColor.rgb *= getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture);
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
}
*/
            }
            ,
            (RedColorMaterial = function(n, a, o) {
                    if (!(this instanceof RedColorMaterial))
                        return new RedColorMaterial(n,a,o);
                    n instanceof RedGL || RedGLUtil.throwFunc("RedColorMaterial : RedGL Instance만 허용.", "입력값 : " + n),
                        this.makeProgramList(this, n, "RedColorMaterialProgram", e, t, i),
                        this._color = new Float32Array(4),
                        this.alpha = null == o ? 1 : o,
                        this.color = a || "#ff0000",
                        this._UUID = RedGL.makeUUID(),
                    r || (this.checkUniformAndProperty(),
                        r = !0)
                }
            ).prototype = new RedBaseMaterial,
            RedColorMaterial.DEFINE_OBJECT_COLOR = {
                get: function() {
                    return this._colorHex
                },
                set: function(e) {
                    this._colorHex = e || "#ff2211",
                        n = RedGLUtil.hexToRGB_ZeroToOne.call(this, this._colorHex),
                        this._color[0] = n[0],
                        this._color[1] = n[1],
                        this._color[2] = n[2],
                        this._color[3] = this._alpha
                }
            },
            RedColorMaterial.DEFINE_OBJECT_ALPHA = {
                min: 0,
                max: 1,
                callback: function(e) {
                    this._color[3] = this._alpha = e
                }
            },
            Object.defineProperty(RedColorMaterial.prototype, "color", RedColorMaterial.DEFINE_OBJECT_COLOR),
            RedDefinePropertyInfo.definePrototype("RedColorMaterial", "alpha", "number", RedColorMaterial.DEFINE_OBJECT_ALPHA),
            Object.freeze(RedColorMaterial)
    }(),
    function() {
        var e, t, r, n = ["useFlatMode"];
        e = function() {/* @preserve
// 스키닝
//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#
// Sprite3D
//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
void main(void) {
gl_PointSize = uPointSize;
// normal 계산
//#REDGL_DEFINE#skin#true# vVertexNormal = (uNMatrix * getSkinMatrix() * vec4(aVertexNormal,0.0)).xyz;
//#REDGL_DEFINE#skin#false# vVertexNormal = (uNMatrix *  vec4(aVertexNormal,1.0)).xyz;
// position 계산
//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
vVertexPosition =  targetMatrix *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
//#REDGL_DEFINE#sprite3D#true# }
//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);
// 쉐도우 계산
//#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
//#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter  *  uDirectionalShadowLightMatrix * vVertexPosition;
}
*/
        }
            ,
            t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
// 그림자
//#REDGL_DEFINE#fragmentShareFunc#decodeFloatShadow#
//#REDGL_DEFINE#fragmentShareFunc#getShadowColor#
// flat노말
//#REDGL_DEFINE#fragmentShareFunc#getFlatNormal#
// 라이트
//#REDGL_DEFINE#fragmentShareFunc#getDirectionalLightColor#
//#REDGL_DEFINE#fragmentShareFunc#getPointLightColor#
uniform float u_shininess;
uniform float u_specularPower;
uniform vec4 u_color;
vec3 N;
vec4 texelColor;
vec4 specularLightColor= vec4(1.0, 1.0, 1.0, 1.0);
float specularTextureValue;
vec4 finalColor;
void main(void) {
texelColor = u_color;
N = normalize(vVertexNormal);
//#REDGL_DEFINE#useFlatMode# N = getFlatNormal(vVertexPosition.xyz);
specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
specularTextureValue = 1.0;
vec4 finalColor = uAmbientLightColor * uAmbientIntensity
+ getDirectionalLightColor(
texelColor,
N,
u_shininess,
specularLightColor,
specularTextureValue,
u_specularPower
)
+ getPointLightColor(
texelColor,
N,
u_shininess,
specularLightColor,
specularTextureValue,
u_specularPower
);
finalColor.a = texelColor.a;
if(finalColor.a == 0.0) discard;
//#REDGL_DEFINE#directionalShadow#true# finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture), 0.5);
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
}
*/
            }
        ;
        var i = {
            callback: function() {
                this._searchProgram("RedColorPhongMaterialProgram", n)
            }
        };
        (RedColorPhongMaterial = function(i, a, o) {
                if (!(this instanceof RedColorPhongMaterial))
                    return new RedColorPhongMaterial(i,a,o);
                i instanceof RedGL || RedGLUtil.throwFunc("RedColorPhongMaterial : RedGL Instance만 허용.", "입력값 : " + i),
                    this.makeProgramList(this, i, "RedColorPhongMaterialProgram", e, t, n),
                    this._color = new Float32Array(4),
                    this.shininess = 16,
                    this.specularPower = 1,
                    this.alpha = null == o ? 1 : o,
                    this.useFlatMode = !1,
                    this.color = a || "#ff0000",
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBaseMaterial,
            Object.defineProperty(RedColorPhongMaterial.prototype, "color", RedColorMaterial.DEFINE_OBJECT_COLOR),
            RedDefinePropertyInfo.definePrototype("RedColorPhongMaterial", "alpha", "number", RedColorMaterial.DEFINE_OBJECT_ALPHA),
            RedDefinePropertyInfo.definePrototype("RedColorPhongMaterial", "shininess", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedColorPhongMaterial", "specularPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedColorPhongMaterial", "useFlatMode", "boolean", i),
            Object.freeze(RedColorPhongMaterial)
    }(),
    function() {
        var e, t, r, n = ["normalTexture", "specularTexture", "displacementTexture", "emissiveTexture", "useFlatMode", "usePreMultiply"];
        e = function() {/* @preserve
// 스키닝
//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#
// Sprite3D
//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
//#REDGL_DEFINE#displacementTexture# uniform sampler2D u_displacementTexture;
//#REDGL_DEFINE#displacementTexture# uniform float u_displacementPower;
//#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedX;
//#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedY;
void main(void) {
gl_PointSize = uPointSize;
vTexcoord = aTexcoord;
// normal 계산
//#REDGL_DEFINE#skin#true# vVertexNormal = (uNMatrix * getSkinMatrix() * vec4(aVertexNormal,0.0)).xyz;
//#REDGL_DEFINE#skin#false# vVertexNormal = (uNMatrix *  vec4(aVertexNormal,1.0)).xyz;
// position 계산
//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
vVertexPosition =  targetMatrix *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#displacementTexture# vVertexPosition.xyz += normalize(vVertexNormal) * texture2D(u_displacementTexture, vTexcoord + vec2(
//#REDGL_DEFINE#displacementTexture#    u_displacementFlowSpeedX * (uTime/1000.0),
//#REDGL_DEFINE#displacementTexture#    u_displacementFlowSpeedY * (uTime/1000.0)
//#REDGL_DEFINE#displacementTexture# )).x * u_displacementPower ;
// 최종 포지션 계산
//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
//#REDGL_DEFINE#sprite3D#true# }
//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * vVertexPosition;
// 쉐도우 계산
//#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
//#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter  *  uDirectionalShadowLightMatrix * vVertexPosition;
}
*/
        }
            ,
            t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
// 그림자
//#REDGL_DEFINE#fragmentShareFunc#decodeFloatShadow#
//#REDGL_DEFINE#fragmentShareFunc#getShadowColor#
// flat노말
//#REDGL_DEFINE#fragmentShareFunc#getFlatNormal#
//#REDGL_DEFINE#fragmentShareFunc#cotangent_frame#
//#REDGL_DEFINE#fragmentShareFunc#perturb_normal#
// 라이트
//#REDGL_DEFINE#fragmentShareFunc#getDirectionalLightColor#
//#REDGL_DEFINE#fragmentShareFunc#getPointLightColor#
//#REDGL_DEFINE#normalTexture# uniform sampler2D u_normalTexture;
//#REDGL_DEFINE#specularTexture# uniform sampler2D u_specularTexture;
//#REDGL_DEFINE#emissiveTexture# uniform sampler2D u_emissiveTexture;
//#REDGL_DEFINE#normalTexture# uniform float u_normalPower;
uniform float u_shininess;
uniform float u_specularPower;
//#REDGL_DEFINE#emissiveTexture# uniform float u_emissiveFactor;
uniform vec4 u_color;
vec4 texelColor;
vec4 emissiveColor;
vec4 finalColor;
vec3 N;
vec4 specularLightColor= vec4(1.0, 1.0, 1.0, 1.0);
float specularTextureValue;
void main(void) {
texelColor = u_color;
N = normalize(vVertexNormal);
vec4 normalColor = vec4(0.0);
//#REDGL_DEFINE#normalTexture# normalColor = texture2D(u_normalTexture, vTexcoord);
//#REDGL_DEFINE#useFlatMode# N = getFlatNormal(vVertexPosition.xyz);
//#REDGL_DEFINE#normalTexture# N = perturb_normal(N, vVertexPosition.xyz, vTexcoord, normalColor.rgb) ;
//#REDGL_DEFINE#emissiveTexture# emissiveColor = texture2D(u_emissiveTexture, vTexcoord);
//#REDGL_DEFINE#emissiveTexture# //#REDGL_DEFINE#usePreMultiply# emissiveColor.rgb *= texelColor.a;
specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
float specularTextureValue = 1.0;
//#REDGL_DEFINE#specularTexture# specularTextureValue = texture2D(u_specularTexture, vTexcoord).r;
vec4 finalColor = uAmbientLightColor * uAmbientIntensity
+ getDirectionalLightColor(
texelColor,
N,
u_shininess,
specularLightColor,
specularTextureValue,
u_specularPower
)
+ getPointLightColor(
texelColor,
N,
u_shininess,
specularLightColor,
specularTextureValue,
u_specularPower
);
//#REDGL_DEFINE#emissiveTexture# finalColor.rgb += emissiveColor.rgb * u_emissiveFactor;
finalColor.a = texelColor.a;
if(finalColor.a == 0.0) discard;
//#REDGL_DEFINE#directionalShadow#true# finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture), 0.5);
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
}
*/
            }
        ;
        var i = {
            callback: function() {
                this._searchProgram("RedColorPhongTextureMaterialProgram", n)
            }
        };
        (RedColorPhongTextureMaterial = function(i, a, o, s, d, l, u) {
                if (!(this instanceof RedColorPhongTextureMaterial))
                    return new RedColorPhongTextureMaterial(i,a,o,s,d,l,u);
                i instanceof RedGL || RedGLUtil.throwFunc("RedColorPhongTextureMaterial : RedGL Instance만 허용.", "입력값 : " + i),
                    this.makeProgramList(this, i, "RedColorPhongTextureMaterialProgram", e, t, n),
                    this._color = new Float32Array(4),
                    this.normalTexture = s,
                    this.specularTexture = d,
                    this.displacementTexture = l,
                    this.emissiveTexture = u,
                    this.normalPower = 1,
                    this.shininess = 16,
                    this.specularPower = 1,
                    this.emissiveFactor = 1,
                    this.displacementPower = .1,
                    this.displacementFlowSpeedX = 0,
                    this.displacementFlowSpeedY = 0,
                    this.alpha = null == o ? 1 : o,
                    this.color = a || "#ff0000",
                    this.usePreMultiply = !1,
                    this.useFlatMode = !1,
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBaseMaterial,
            Object.defineProperty(RedColorPhongTextureMaterial.prototype, "color", RedColorMaterial.DEFINE_OBJECT_COLOR),
            RedDefinePropertyInfo.definePrototype("RedColorPhongTextureMaterial", "alpha", "number", RedColorMaterial.DEFINE_OBJECT_ALPHA),
            RedDefinePropertyInfo.definePrototype("RedColorPhongTextureMaterial", "normalTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedColorPhongTextureMaterial", "specularTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedColorPhongTextureMaterial", "displacementTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedColorPhongTextureMaterial", "emissiveTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedColorPhongTextureMaterial", "normalPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedColorPhongTextureMaterial", "shininess", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedColorPhongTextureMaterial", "specularPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedColorPhongTextureMaterial", "emissiveFactor", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedColorPhongTextureMaterial", "displacementPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedColorPhongTextureMaterial", "displacementFlowSpeedX", "number"),
            RedDefinePropertyInfo.definePrototype("RedColorPhongTextureMaterial", "displacementFlowSpeedY", "number"),
            RedDefinePropertyInfo.definePrototype("RedColorPhongTextureMaterial", "useFlatMode", "boolean", i),
            RedDefinePropertyInfo.definePrototype("RedColorPhongTextureMaterial", "usePreMultiply", "boolean", i),
            Object.freeze(RedColorPhongTextureMaterial)
    }(),
    function() {
        var e, t, r, n = ["diffuseTexture", "normalTexture", "specularTexture", "displacementTexture", "emissiveTexture", "useFlatMode", "usePreMultiply"];
        e = function() {/* @preserve
// 스키닝
//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#
// Sprite3D
//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
//#REDGL_DEFINE#displacementTexture# uniform sampler2D u_displacementTexture;
//#REDGL_DEFINE#displacementTexture# uniform float u_displacementPower;
//#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedX;
//#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedY;
void main(void) {
gl_PointSize = uPointSize;
vTexcoord = aTexcoord;
// normal 계산
//#REDGL_DEFINE#skin#true# vVertexNormal = (uNMatrix * getSkinMatrix() * vec4(aVertexNormal,0.0)).xyz;
//#REDGL_DEFINE#skin#false# vVertexNormal = (uNMatrix *  vec4(aVertexNormal,1.0)).xyz;
// position 계산
//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
vVertexPosition =  targetMatrix *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#displacementTexture# vVertexPosition.xyz += normalize(vVertexNormal) * texture2D(u_displacementTexture, vTexcoord + vec2(
//#REDGL_DEFINE#displacementTexture#    u_displacementFlowSpeedX * (uTime/1000.0),
//#REDGL_DEFINE#displacementTexture#    u_displacementFlowSpeedY * (uTime/1000.0)
//#REDGL_DEFINE#displacementTexture# )).x * u_displacementPower ;
// 최종 포지션 계산
//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
//#REDGL_DEFINE#sprite3D#true# }
//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * vVertexPosition;
// 쉐도우 계산
//#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
//#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter * uDirectionalShadowLightMatrix * vVertexPosition;
}
*/
        }
            ,
            t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
// 그림자
//#REDGL_DEFINE#fragmentShareFunc#decodeFloatShadow#
//#REDGL_DEFINE#fragmentShareFunc#getShadowColor#
// flat노말
//#REDGL_DEFINE#fragmentShareFunc#getFlatNormal#
//#REDGL_DEFINE#fragmentShareFunc#cotangent_frame#
//#REDGL_DEFINE#fragmentShareFunc#perturb_normal#
// 라이트
//#REDGL_DEFINE#fragmentShareFunc#getDirectionalLightColor#
//#REDGL_DEFINE#fragmentShareFunc#getPointLightColor#
//#REDGL_DEFINE#diffuseTexture# uniform sampler2D u_diffuseTexture;
//#REDGL_DEFINE#normalTexture# uniform sampler2D u_normalTexture;
//#REDGL_DEFINE#specularTexture# uniform sampler2D u_specularTexture;
uniform samplerCube u_environmentTexture;
//#REDGL_DEFINE#emissiveTexture# uniform sampler2D u_emissiveTexture;
//#REDGL_DEFINE#normalTexture# uniform float u_normalPower;
uniform float u_shininess;
uniform float u_specularPower;
//#REDGL_DEFINE#emissiveTexture# uniform float u_emissiveFactor;
uniform float u_reflectionPower;
uniform float u_alpha;
uniform bool u_useFlatMode;
vec4 texelColor= vec4(0.0,0.0,0.0,0.0);
vec4 emissiveColor;
vec4 reflectionColor;
vec4 specularLightColor= vec4(1.0, 1.0, 1.0, 1.0);
vec3 N;
float specularTextureValue;
vec4 finalColor;
void main(void) {
texelColor = vec4(0.0,0.0,0.0,0.0);
//#REDGL_DEFINE#diffuseTexture# texelColor = texture2D(u_diffuseTexture, vTexcoord);
//#REDGL_DEFINE#diffuseTexture# //#REDGL_DEFINE#usePreMultiply# texelColor.rgb *= texelColor.a;
//#REDGL_DEFINE#diffuseTexture# if(texelColor.a ==0.0) discard;
//#REDGL_DEFINE#emissiveTexture# emissiveColor = texture2D(u_emissiveTexture, vTexcoord);
//#REDGL_DEFINE#emissiveTexture# //#REDGL_DEFINE#usePreMultiply# emissiveColor.rgb *= texelColor.a;
N = normalize(vVertexNormal);
vec4 normalColor = vec4(0.0);
//#REDGL_DEFINE#normalTexture# normalColor = texture2D(u_normalTexture, vTexcoord);
//#REDGL_DEFINE#useFlatMode# N = getFlatNormal(vVertexPosition.xyz);
//#REDGL_DEFINE#normalTexture# N = perturb_normal(N, vVertexPosition.xyz, vTexcoord, normalColor.rgb) ;
vec3 R = reflect( vVertexPosition.xyz - uCameraPosition, N);
reflectionColor = textureCube(u_environmentTexture, R);
texelColor = mix(texelColor, reflectionColor ,u_reflectionPower);
specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
specularTextureValue = 1.0;
//#REDGL_DEFINE#specularTexture#  specularTextureValue = texture2D(u_specularTexture, vTexcoord).r;
vec4 finalColor = uAmbientLightColor * uAmbientIntensity
+ getDirectionalLightColor(
texelColor,
N,
u_shininess,
specularLightColor,
specularTextureValue,
u_specularPower
)
+ getPointLightColor(
texelColor,
N,
u_shininess,
specularLightColor,
specularTextureValue,
u_specularPower
);
//#REDGL_DEFINE#emissiveTexture# finalColor.rgb += emissiveColor.rgb * u_emissiveFactor;
finalColor.a = texelColor.a * u_alpha;
//#REDGL_DEFINE#directionalShadow#true# finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture), 0.5);
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
}
*/
            }
            ,
            (RedEnvironmentMaterial = function(i, a, o, s, d, l, u) {
                    if (!(this instanceof RedEnvironmentMaterial))
                        return new RedEnvironmentMaterial(i,a,o,s,d,l,u);
                    i instanceof RedGL || RedGLUtil.throwFunc("RedEnvironmentMaterial : RedGL Instance만 허용.", i),
                    o instanceof RedBitmapCubeTexture || RedGLUtil.throwFunc("RedEnvironmentMaterial : environmentTexture - RedBitmapCubeTexture Instance만 허용."),
                        this.makeProgramList(this, i, "RedEnvironmentMaterialProgram", e, t, n),
                        this.diffuseTexture = a,
                        this.environmentTexture = o,
                        this.normalTexture = s,
                        this.specularTexture = d,
                        this.displacementTexture = l,
                        this.emissiveTexture = u,
                        this.normalPower = 1,
                        this.shininess = 8,
                        this.specularPower = 1,
                        this.emissiveFactor = 1,
                        this.reflectionPower = 1,
                        this.displacementPower = .1,
                        this.displacementFlowSpeedX = 0,
                        this.displacementFlowSpeedY = 0,
                        this.alpha = 1,
                        this.useFlatMode = !1,
                        this.usePreMultiply = !1,
                        this._UUID = RedGL.makeUUID(),
                    r || (this.checkUniformAndProperty(),
                        r = !0)
                }
            ).prototype = new RedBaseMaterial;
        var i = {
            callback: function() {
                this._searchProgram("RedEnvironmentMaterialProgram", n)
            }
        };
        RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "alpha", "number", {
            min: 0,
            max: 1
        }),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "diffuseTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "environmentTexture", "samplerCube", {
                essential: !0,
                callback: i.callback
            }),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "normalTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "specularTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "displacementTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "emissiveTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "normalPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "shininess", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "specularPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "emissiveFactor", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "reflectionPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "displacementPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "displacementFlowSpeedX", "number"),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "displacementFlowSpeedY", "number"),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "useFlatMode", "boolean", i),
            RedDefinePropertyInfo.definePrototype("RedEnvironmentMaterial", "usePreMultiply", "boolean", i),
            Object.freeze(RedEnvironmentMaterial)
    }(),
    function() {
        var e, t, r, n = ["usePreMultiply"];
        e = function() {/* @preserve
// 스키닝
//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#
// Sprite3D
//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
void main(void) {
gl_PointSize = uPointSize;
vTexcoord = aTexcoord;
// position 계산
//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
//#REDGL_DEFINE#sprite3D#true# }
//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
//#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter  *  uDirectionalShadowLightMatrix * targetMatrix * vec4(aVertexPosition, 1.0);
}
*/
        }
            ,
            t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
// 그림자
//#REDGL_DEFINE#fragmentShareFunc#decodeFloatShadow#
//#REDGL_DEFINE#fragmentShareFunc#getShadowColor#
uniform sampler2D u_diffuseTexture;
uniform float u_alpha;
void main(void) {
vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
//#REDGL_DEFINE#usePreMultiply# finalColor.rgb *= finalColor.a;
finalColor.a *= u_alpha;
if(finalColor.a == 0.0) discard;
//#REDGL_DEFINE#directionalShadow#true# finalColor.rgb *= getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture);
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
}
*/
            }
            ,
            (RedBitmapMaterial = function(i, a) {
                    if (!(this instanceof RedBitmapMaterial))
                        return new RedBitmapMaterial(i,a);
                    i instanceof RedGL || RedGLUtil.throwFunc("RedBitmapMaterial : RedGL Instance만 허용.", i),
                        this.makeProgramList(this, i, "RedBitmapMaterialProgram", e, t, n),
                        this.diffuseTexture = a,
                        this.alpha = 1,
                        this.usePreMultiply = !1,
                        this._UUID = RedGL.makeUUID(),
                    r || (this.checkUniformAndProperty(),
                        r = !0)
                }
            ).prototype = new RedBaseMaterial;
        var i = {
            callback: function() {
                this._searchProgram("RedBitmapMaterialProgram", n)
            }
        };
        RedDefinePropertyInfo.definePrototype("RedBitmapMaterial", "diffuseTexture", "sampler2D", {
            essential: !0
        }),
            RedDefinePropertyInfo.definePrototype("RedBitmapMaterial", "alpha", "number", {
                min: 0,
                max: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedBitmapMaterial", "usePreMultiply", "boolean", i),
            Object.freeze(RedBitmapMaterial)
    }(),
    function() {
        var e, t, r, n = ["diffuseTexture", "usePreMultiply"];
        e = function() {/* @preserve
const mat4 cMode2D = mat4(
0.5, 0.0, 0.0, 0.0,
0.0, 0.5, 0.0, 0.0,
0.0, 0.0, 0.5, 0.0,
0.0, 0.0, 0.0, 1.0
);
void main(void) {
if(uMode2DYn){
gl_Position = uPMatrix * uCameraMatrix * cMode2D * uMMatrix * vec4(aVertexPosition.x, -aVertexPosition.y, aVertexPosition.z, 1.0);
gl_PointSize = abs(aPointSize)/gl_Position.w;
}else {
gl_Position = uPMatrix * uCameraMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
gl_PointSize = abs(aPointSize)/gl_Position.w * uResolution.y;
}
vVertexColor = aVertexColor;
}
*/
        }
            ,
            t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
//#REDGL_DEFINE#diffuseTexture# uniform sampler2D u_diffuseTexture;
uniform float u_cutOff;
uniform float u_alpha;
void main(void) {
vec4 finalColor = vVertexColor;
//#REDGL_DEFINE#diffuseTexture# finalColor = texture2D(u_diffuseTexture, gl_PointCoord.xy);
//#REDGL_DEFINE#diffuseTexture# //#REDGL_DEFINE#usePreMultiply# finalColor.rgb *= finalColor.a;
//#REDGL_DEFINE#diffuseTexture# finalColor.rgb += vVertexColor.rgb * vVertexColor.a;
//#REDGL_DEFINE#diffuseTexture# finalColor.a *= vVertexColor.a;
finalColor.a *= u_alpha;
//#REDGL_DEFINE#diffuseTexture# if(finalColor.a < u_cutOff) discard;
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
}
*/
            }
        ;
        var i = {
            callback: function() {
                this._searchProgram("particleProgram", n)
            }
        };
        (RedParticleMaterial = function(i, a) {
                if (!(this instanceof RedParticleMaterial))
                    return new RedParticleMaterial(i,a);
                i instanceof RedGL || RedGLUtil.throwFunc("RedParticleMaterial : RedGL Instance만 허용.", i),
                    this.makeProgramList(this, i, "particleProgram", e, t, n),
                    this.diffuseTexture = a,
                    this.alpha = 1,
                    this.cutOff = 0,
                    this.usePreMultiply = !0,
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBaseMaterial,
            RedDefinePropertyInfo.definePrototype("RedParticleMaterial", "diffuseTexture", "sampler2D", {
                callback: function() {
                    this._searchProgram("particleProgram", n)
                }
            }),
            RedDefinePropertyInfo.definePrototype("RedParticleMaterial", "alpha", "number", {
                min: 0,
                max: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedParticleMaterial", "cutOff", "number", {
                min: 0,
                max: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedParticleMaterial", "usePreMultiply", "boolean", i),
            Object.freeze(RedParticleMaterial)
    }(),
    function() {
        var e, t, r, n = ["usePreMultiply"];
        e = function() {/* @preserve
void main(void) {
if(uMode2DYn){
gl_Position = uPMatrix * uCameraMatrix * uMMatrix * vec4(aVertexPosition.x, -aVertexPosition.y, aVertexPosition.z, 1.0);
gl_PointSize = abs(aPointSize)/gl_Position.w;
}else {
gl_Position = uPMatrix * uCameraMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
gl_PointSize = abs(aPointSize)/gl_Position.w * uResolution.y;
}
}
*/
        }
            ,
            t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
uniform sampler2D u_diffuseTexture;
uniform float u_cutOff;
uniform float u_alpha;
void main(void) {
vec4 finalColor = texture2D(u_diffuseTexture, gl_PointCoord.xy);
//#REDGL_DEFINE#usePreMultiply# finalColor.rgb *= finalColor.a;
finalColor.a *= u_alpha;
if(finalColor.a < u_cutOff) discard;
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
}
*/
            }
            ,
            (RedBitmapPointCloudMaterial = function(i, a) {
                    if (!(this instanceof RedBitmapPointCloudMaterial))
                        return new RedBitmapPointCloudMaterial(i,a);
                    i instanceof RedGL || RedGLUtil.throwFunc("RedBitmapPointCloudMaterial : RedGL Instance만 허용.", i),
                        this.makeProgramList(this, i, "bitmapPointCloudProgram", e, t, n),
                        this.diffuseTexture = a,
                        this.alpha = 1,
                        this.cutOff = .1,
                        this.usePreMultiply = !1,
                        this._UUID = RedGL.makeUUID(),
                    r || (this.checkUniformAndProperty(),
                        r = !0)
                }
            ).prototype = new RedBaseMaterial;
        var i = {
            callback: function() {
                this._searchProgram("bitmapPointCloudProgram", n)
            }
        };
        RedDefinePropertyInfo.definePrototype("RedBitmapPointCloudMaterial", "alpha", "number", {
            min: 0,
            max: 1
        }),
            RedDefinePropertyInfo.definePrototype("RedBitmapPointCloudMaterial", "cutOff", "number", {
                min: 0,
                max: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedBitmapPointCloudMaterial", "diffuseTexture", "sampler2D", {
                essential: !0
            }),
            RedDefinePropertyInfo.definePrototype("RedBitmapPointCloudMaterial", "usePreMultiply", "boolean", i),
            Object.freeze(RedBitmapPointCloudMaterial)
    }(),
    function() {
        var e, t, r, n = ["usePreMultiply"];
        e = function() {/* @preserve
// 스키닝
//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#
// Sprite3D
//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
uniform vec4 u_sheetRect;
void main(void) {
gl_PointSize = uPointSize;
vTexcoord = aTexcoord;
vTexcoord = vec2(
vTexcoord.s * u_sheetRect.x + u_sheetRect.z,
vTexcoord.t * u_sheetRect.y - u_sheetRect.w
);
// position 계산
//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
//#REDGL_DEFINE#sprite3D#true# }
//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
//#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter * uDirectionalShadowLightMatrix * targetMatrix * vec4(aVertexPosition, 1.0);
}
*/
        }
            ,
            t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
// 그림자
//#REDGL_DEFINE#fragmentShareFunc#decodeFloatShadow#
//#REDGL_DEFINE#fragmentShareFunc#getShadowColor#
uniform sampler2D u_diffuseTexture;
uniform float u_alpha;
void main(void) {
vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
//#REDGL_DEFINE#usePreMultiply# finalColor.rgb *= finalColor.a;
finalColor.a *= u_alpha;
if(finalColor.a ==0.0) discard;
//#REDGL_DEFINE#directionalShadow#true# finalColor.rgb *= getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture);
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
}
*/
            }
        ;
        var i = {
            callback: function() {
                this._searchProgram("RedSheetMaterialProgram", n)
            }
        };
        (RedSheetMaterial = function(i, a, o, s, d, l) {
                if (!(this instanceof RedSheetMaterial))
                    return new RedSheetMaterial(i,a,o,s,d,l);
                i instanceof RedGL || RedGLUtil.throwFunc("RedSheetMaterial : RedGL Instance만 허용.", i),
                    o = o || 60,
                    s = s || 1,
                    d = d || 1,
                    l = l || 1,
                    this.makeProgramList(this, i, "RedSheetMaterialProgram", e, t, n),
                    this.diffuseTexture = a,
                    this._sheetRect = new Float32Array(4),
                    this.alpha = 1,
                    this.usePreMultiply = !1,
                    this._perFrameTime = 0,
                    this._nextFrameTime = 0,
                    this._playYn = !0,
                    this.segmentW = s,
                    this.segmentH = d,
                    this.totalFrame = l,
                    this.frameRate = o,
                    this.currentIndex = 0,
                    this.loop = !0,
                    this._aniMap = {},
                    this.__RedSheetMaterialYn = !0,
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBaseMaterial,
            RedSheetMaterial.prototype.addAction = function(e, t) {
                this._aniMap[e] = t
            }
            ,
            RedSheetMaterial.prototype.setAction = function(e) {
                this.diffuseTexture = this._aniMap[e].texture,
                    this.segmentW = this._aniMap[e].segmentW,
                    this.segmentH = this._aniMap[e].segmentH,
                    this.totalFrame = this._aniMap[e].totalFrame,
                    this.frameRate = this._aniMap[e].frameRate,
                    this.currentIndex = 0,
                    this._nextFrameTime = 0
            }
            ,
            RedSheetMaterial.prototype.play = function() {
                this._playYn = !0
            }
            ,
            RedSheetMaterial.prototype.stop = function() {
                this._playYn = !1,
                    this.currentIndex = 0
            }
            ,
            RedSheetMaterial.prototype.pause = function() {
                this._playYn = !1
            }
            ,
            RedSheetMaterial.prototype.gotoAndStop = function(e) {
                e > this.totalFrame - 1 && (e = this.totalFrame - 1),
                e < 0 && (e = 0),
                    this._playYn = !1,
                    this.currentIndex = e
            }
            ,
            RedSheetMaterial.prototype.gotoAndPlay = function(e) {
                e > this.totalFrame - 1 && (e = this.totalFrame - 1),
                e < 0 && (e = 0),
                    this._playYn = !0,
                    this.currentIndex = e,
                    this._nextFrameTime = 0
            }
            ,
            RedDefinePropertyInfo.definePrototype("RedSheetMaterial", "diffuseTexture", "sampler2D", {
                essential: !0
            }),
            RedDefinePropertyInfo.definePrototype("RedSheetMaterial", "totalFrame", "number", {
                min: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedSheetMaterial", "loop", "boolean"),
            RedDefinePropertyInfo.definePrototype("RedSheetMaterial", "frameRate", "number", {
                min: 1,
                callback: function() {
                    this._perFrameTime = 1e3 / this._frameRate
                }
            }),
            RedDefinePropertyInfo.definePrototype("RedSheetMaterial", "segmentW", "number", {
                min: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedSheetMaterial", "segmentH", "number", {
                min: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedSheetMaterial", "alpha", "number", {
                min: 0,
                max: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedSheetMaterial", "usePreMultiply", "boolean", i),
            Object.freeze(RedSheetMaterial)
    }(),
    function() {
        var e, t, r, n = ["diffuseTexture", "normalTexture", "specularTexture", "emissiveTexture", "displacementTexture", "useFlatMode", "usePreMultiply"];
        e = function() {/* @preserve
// 스키닝
//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#
// Sprite3D
//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
//#REDGL_DEFINE#displacementTexture# uniform sampler2D u_displacementTexture;
//#REDGL_DEFINE#displacementTexture# uniform float u_displacementPower;
//#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedX;
//#REDGL_DEFINE#displacementTexture# uniform float u_displacementFlowSpeedY;
void main(void) {
gl_PointSize = uPointSize;
vTexcoord = aTexcoord;
// normal 계산
//#REDGL_DEFINE#skin#true# vVertexNormal = (uNMatrix * getSkinMatrix() * vec4(aVertexNormal,0.0)).xyz;
//#REDGL_DEFINE#skin#false# vVertexNormal = (uNMatrix *  vec4(aVertexNormal,1.0)).xyz;
// position 계산
//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
vVertexPosition =  targetMatrix *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#displacementTexture# vVertexPosition.xyz += normalize(vVertexNormal) * texture2D(u_displacementTexture, vTexcoord + vec2(
//#REDGL_DEFINE#displacementTexture#    u_displacementFlowSpeedX * (uTime/1000.0),
//#REDGL_DEFINE#displacementTexture#    u_displacementFlowSpeedY * (uTime/1000.0)
//#REDGL_DEFINE#displacementTexture# )).x * u_displacementPower ;
// 최종 포지션 계산
//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
//#REDGL_DEFINE#sprite3D#true# }
//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * vVertexPosition;
// 쉐도우 계산
//#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
//#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter  *  uDirectionalShadowLightMatrix * vVertexPosition;
}
*/
        }
            ,
            t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
// 그림자
//#REDGL_DEFINE#fragmentShareFunc#decodeFloatShadow#
//#REDGL_DEFINE#fragmentShareFunc#getShadowColor#
// flat노말
//#REDGL_DEFINE#fragmentShareFunc#getFlatNormal#
//#REDGL_DEFINE#fragmentShareFunc#cotangent_frame#
//#REDGL_DEFINE#fragmentShareFunc#perturb_normal#
// 라이트
//#REDGL_DEFINE#fragmentShareFunc#getDirectionalLightColor#
//#REDGL_DEFINE#fragmentShareFunc#getPointLightColor#
// 텍스쳐
uniform sampler2D u_diffuseTexture;
//#REDGL_DEFINE#normalTexture# uniform sampler2D u_normalTexture;
//#REDGL_DEFINE#specularTexture# uniform sampler2D u_specularTexture;
//#REDGL_DEFINE#emissiveTexture# uniform sampler2D u_emissiveTexture;
//#REDGL_DEFINE#normalTexture# uniform float u_normalPower;
uniform float u_shininess;
uniform float u_specularPower;
//#REDGL_DEFINE#emissiveTexture# uniform float u_emissiveFactor;
uniform float u_alpha;
vec4 texelColor;
vec4 emissiveColor;
vec4 specularLightColor= vec4(1.0, 1.0, 1.0, 1.0);
float specularTextureValue;
vec4 finalColor;
vec3 N;
void main(void) {
texelColor = texture2D(u_diffuseTexture, vTexcoord);
//#REDGL_DEFINE#usePreMultiply# texelColor.rgb *= texelColor.a;
if(texelColor.a == 0.0) discard;
//#REDGL_DEFINE#emissiveTexture# emissiveColor = texture2D(u_emissiveTexture, vTexcoord);
//#REDGL_DEFINE#emissiveTexture# //#REDGL_DEFINE#usePreMultiply# emissiveColor.rgb *= texelColor.a;
N = normalize(vVertexNormal);
vec4 normalColor = vec4(0.0);
//#REDGL_DEFINE#normalTexture# normalColor = texture2D(u_normalTexture, vTexcoord);
//#REDGL_DEFINE#useFlatMode# N = getFlatNormal(vVertexPosition.xyz);
//#REDGL_DEFINE#normalTexture# N = perturb_normal(N, vVertexPosition.xyz, vTexcoord, normalColor.rgb) ;
specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
specularTextureValue = 1.0;
//#REDGL_DEFINE#specularTexture# specularTextureValue = texture2D(u_specularTexture, vTexcoord).r;
vec4 finalColor = uAmbientLightColor * uAmbientIntensity
+ getDirectionalLightColor(
texelColor,
N,
u_shininess,
specularLightColor,
specularTextureValue,
u_specularPower
)
+ getPointLightColor(
texelColor,
N,
u_shininess,
specularLightColor,
specularTextureValue,
u_specularPower
);
//#REDGL_DEFINE#emissiveTexture# finalColor.rgb += emissiveColor.rgb * u_emissiveFactor;
finalColor.a = texelColor.a * u_alpha;
//#REDGL_DEFINE#directionalShadow#true# finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture), 0.5);
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
}
*/
            }
        ;
        var i = {
            callback: function() {
                this._searchProgram("RedStandardMaterialProgram", n)
            }
        };
        (RedStandardMaterial = function(i, a, o, s, d, l) {
                if (!(this instanceof RedStandardMaterial))
                    return new RedStandardMaterial(i,a,o,s,d,l);
                i instanceof RedGL || RedGLUtil.throwFunc("RedStandardMaterial : RedGL Instance만 허용.", i),
                    this.makeProgramList(this, i, "RedStandardMaterialProgram", e, t, n),
                    this.diffuseTexture = a,
                    this.normalTexture = o,
                    this.specularTexture = s,
                    this.emissiveTexture = l,
                    this.displacementTexture = d,
                    this.normalPower = 1,
                    this.shininess = 16,
                    this.specularPower = 1,
                    this.emissiveFactor = 1,
                    this.displacementPower = .1,
                    this.displacementFlowSpeedX = 0,
                    this.displacementFlowSpeedY = 0,
                    this.alpha = 1,
                    this._UUID = RedGL.makeUUID(),
                    this.useFlatMode = !1,
                    this.usePreMultiply = !1,
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBaseMaterial,
            RedDefinePropertyInfo.definePrototype("RedStandardMaterial", "alpha", "number", {
                min: 0,
                max: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedStandardMaterial", "diffuseTexture", "sampler2D", {
                essential: !0,
                callback: i.callback
            }),
            RedDefinePropertyInfo.definePrototype("RedStandardMaterial", "normalTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedStandardMaterial", "specularTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedStandardMaterial", "emissiveTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedStandardMaterial", "displacementTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedStandardMaterial", "normalPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedStandardMaterial", "shininess", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedStandardMaterial", "specularPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedStandardMaterial", "emissiveFactor", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedStandardMaterial", "displacementPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedStandardMaterial", "displacementFlowSpeedX", "number"),
            RedDefinePropertyInfo.definePrototype("RedStandardMaterial", "displacementFlowSpeedY", "number"),
            RedDefinePropertyInfo.definePrototype("RedStandardMaterial", "useFlatMode", "boolean", i),
            RedDefinePropertyInfo.definePrototype("RedStandardMaterial", "usePreMultiply", "boolean", i),
            Object.freeze(RedStandardMaterial)
    }(),
    function() {
        var e, t, r;
        e = function() {/* @preserve
// 스키닝
//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#
// Sprite3D
//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
void main(void) {
gl_PointSize = uPointSize;
vTexcoord = aTexcoord;
// position 계산
//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
//#REDGL_DEFINE#sprite3D#true# }
//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
//#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter  *  uDirectionalShadowLightMatrix * targetMatrix * vec4(aVertexPosition, 1.0);
}
*/
        }
            ,
            t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
// 그림자
//#REDGL_DEFINE#fragmentShareFunc#decodeFloatShadow#
//#REDGL_DEFINE#fragmentShareFunc#getShadowColor#
uniform sampler2D u_videoTexture;
uniform float u_alpha;
void main(void) {
vec4 finalColor = texture2D(u_videoTexture, vTexcoord);
if(finalColor.a ==0.0) discard;
finalColor.a = u_alpha;
//#REDGL_DEFINE#directionalShadow#true# finalColor.rgb *= getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture);
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
}
*/
            }
            ,
            (RedVideoMaterial = function(n, i) {
                    if (!(this instanceof RedVideoMaterial))
                        return new RedVideoMaterial(n,i);
                    n instanceof RedGL || RedGLUtil.throwFunc("RedVideoMaterial : RedGL Instance만 허용.", n),
                        this.makeProgramList(this, n, "RedVideoMaterialProgram", e, t),
                        this.videoTexture = i,
                        this.alpha = 1,
                        this._UUID = RedGL.makeUUID(),
                    r || (this.checkUniformAndProperty(),
                        r = !0)
                }
            ).prototype = new RedBaseMaterial,
            RedDefinePropertyInfo.definePrototype("RedVideoMaterial", "alpha", "number", {
                min: 0,
                max: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedVideoMaterial", "videoTexture", "samplerVideo", {
                essential: !0
            }),
            Object.freeze(RedVideoMaterial)
    }(),
    function() {
        var e, t, r, n = ["diffuseTexture", "normalTexture", "environmentTexture", "occlusionTexture", "emissiveTexture", "roughnessTexture", "useFlatMode", "usePreMultiply"];
        e = function() {/* @preserve
// 스키닝
//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#
// Sprite3D
//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
void main(void) {
gl_PointSize = uPointSize;
// UV설정
vTexcoord = aTexcoord;
// normal 계산
//#REDGL_DEFINE#skin#true# vVertexNormal = (uNMatrix * getSkinMatrix() * vec4(aVertexNormal,0.0)).xyz;
//#REDGL_DEFINE#skin#false# vVertexNormal = (uNMatrix *  vec4(aVertexNormal,1.0)).xyz;
// position 계산
//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
vVertexPosition =  targetMatrix *  vec4(aVertexPosition, 1.0);
// 최종 포지션 계산
//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
//#REDGL_DEFINE#sprite3D#true# }
//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * vVertexPosition;
// 쉐도우 계산
//#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
//#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter * uDirectionalShadowLightMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);
}
*/
        }
            ,
            t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
// 그림자
//#REDGL_DEFINE#fragmentShareFunc#decodeFloatShadow#
//#REDGL_DEFINE#fragmentShareFunc#getShadowColor#
// flat노말
//#REDGL_DEFINE#fragmentShareFunc#getFlatNormal#
//#REDGL_DEFINE#fragmentShareFunc#cotangent_frame#
//#REDGL_DEFINE#fragmentShareFunc#perturb_normal#
uniform vec4 uBaseColorFactor;
uniform float u_emissiveFactor;
uniform float u_cutOff;
//#REDGL_DEFINE#diffuseTexture# uniform sampler2D u_diffuseTexture;
//#REDGL_DEFINE#normalTexture# uniform sampler2D u_normalTexture;
//#REDGL_DEFINE#occlusionTexture# uniform sampler2D u_occlusionTexture;
//#REDGL_DEFINE#environmentTexture# uniform samplerCube u_environmentTexture;
//#REDGL_DEFINE#emissiveTexture# uniform sampler2D u_emissiveTexture;
//#REDGL_DEFINE#roughnessTexture# uniform sampler2D u_roughnessTexture;
//#REDGL_DEFINE#normalTexture# uniform float u_normalPower;
uniform float u_specularPower;
uniform float u_metallicFactor;
uniform float u_roughnessFactor;
uniform float u_occlusionPower;
uniform float u_alpha;
vec4 la;
vec4 ld;
vec4 ls;
vec4 texelColor= vec4(0.0,0.0,0.0,0.0);
vec4 emissiveColor;
vec4 roughnessColor;
vec4 occlusionColor;
vec4 reflectionColor;
vec4 specularLightColor= vec4(1.0, 1.0, 1.0, 1.0);
vec4 finalColor;
vec3 N;
vec3 L;
float lambertTerm;
float specular;
float specularTextureValue;
float distanceLength;
float attenuation;
void main(void) {
la = uAmbientLightColor * uAmbientLightColor.a;
ld = vec4(0.0, 0.0, 0.0, 1.0);
ls = vec4(0.0, 0.0, 0.0, 1.0);
float tMetallicPower = u_metallicFactor;
float tRoughnessPower = u_roughnessFactor;
//#REDGL_DEFINE#roughnessTexture# roughnessColor = texture2D(u_roughnessTexture, vTexcoord);
//#REDGL_DEFINE#roughnessTexture# tMetallicPower *= roughnessColor.b; // 메탈릭 산출 roughnessColor.b
//#REDGL_DEFINE#roughnessTexture# tRoughnessPower *= roughnessColor.g; // 거칠기 산출 roughnessColor.g
// diffuse 색상 산출
texelColor = uBaseColorFactor;
//#REDGL_DEFINE#diffuseTexture# texelColor *= texture2D(u_diffuseTexture, vTexcoord);
//#REDGL_DEFINE#usePreMultiply# texelColor.rgb *= texelColor.a;
// 컷오프 계산
if(texelColor.a <= u_cutOff) discard;
// 노멀값 계산
N = normalize(vVertexNormal);
vec4 normalColor = vec4(0.0);
//#REDGL_DEFINE#normalTexture# normalColor = texture2D(u_normalTexture, vTexcoord);
//#REDGL_DEFINE#useFlatMode# N = getFlatNormal(vVertexPosition.xyz);
//#REDGL_DEFINE#normalTexture# N = perturb_normal(N, vVertexPosition.xyz, vTexcoord, normalColor.rgb) ;
// 환경맵 계산
vec3 R = reflect( vVertexPosition.xyz-uCameraPosition, N);
//#REDGL_DEFINE#environmentTexture# reflectionColor = textureCube(u_environmentTexture, R);
//#REDGL_DEFINE#environmentTexture# reflectionColor.rgb *= reflectionColor.a;
// 환경맵 합성
//#REDGL_DEFINE#environmentTexture# texelColor.rgb = mix( texelColor.rgb , reflectionColor.rgb , max(tMetallicPower-tRoughnessPower,0.0)*(1.0-tRoughnessPower));
//#REDGL_DEFINE#environmentTexture# texelColor = mix( texelColor , vec4(0.04, 0.04, 0.04, 1.0) , tRoughnessPower * (tMetallicPower) * 0.5);
// 라이팅 계산
float shininess = 128.0 ;
specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
specularTextureValue =  1.0 ;
for(int i=0; i<cDIRETIONAL_MAX; i++){
if(i == uDirectionalLightNum) break;
L = normalize(-uDirectionalLightPositionList[i]);
lambertTerm = dot(N,-L);
if(lambertTerm > 0.0){
ld += uDirectionalLightColorList[i] * texelColor * lambertTerm * uDirectionalLightIntensityList[i] * uDirectionalLightColorList[i].a;
specular = pow( max(dot(reflect(L, N), -L), 0.0), pow(shininess, 1.0-tRoughnessPower+0.04) );
specular *= pow(1.0-tRoughnessPower+0.04, 2.0 * (1.0-tMetallicPower)) ;
ls +=  specularLightColor * specular * u_specularPower * specularTextureValue * uDirectionalLightIntensityList[i]* uDirectionalLightColorList[i].a * (1.0-tRoughnessPower+0.04);
}
}
for(int i=0;i<cPOINT_MAX;i++){
if(i== uPointLightNum) break;
L =  -uPointLightPositionList[i] + vVertexPosition.xyz;
distanceLength = abs(length(L));
if(uPointLightRadiusList[i]> distanceLength){
attenuation = 1.0 / (0.01 + 0.02 * distanceLength + 0.03 * distanceLength * distanceLength) * 0.5;
L = normalize(L);
lambertTerm = dot(N,-L);
if(lambertTerm > 0.0){
ld += uPointLightColorList[i] * texelColor * lambertTerm * attenuation * uPointLightIntensityList[i] ;
specular = pow( max(dot(reflect(L, N), -N), 0.0), pow(shininess, 1.0-tRoughnessPower+0.04) );
specular *= pow(1.0-tRoughnessPower+0.04, 2.0 * (1.0-tMetallicPower)) ;
ls +=  specularLightColor * specular * uPointLightIntensityList[i]  * uPointLightColorList[i].a * (1.0-tRoughnessPower+0.04) ;
}
}
}
finalColor = la * uAmbientIntensity + ld + ls;
finalColor.a = texelColor.a * u_alpha ;
// 그림자 계산
//#REDGL_DEFINE#directionalShadow#true# finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture), 0.5);
// 이미시브합성
//#REDGL_DEFINE#emissiveTexture# emissiveColor = texture2D(u_emissiveTexture, vTexcoord);
//#REDGL_DEFINE#emissiveTexture# emissiveColor.rgb *= emissiveColor.a * u_emissiveFactor;
//#REDGL_DEFINE#emissiveTexture# emissiveColor.rgb *= u_emissiveFactor;
//#REDGL_DEFINE#emissiveTexture# finalColor.rgb += emissiveColor.rgb;
// 오클루젼 합성
//#REDGL_DEFINE#occlusionTexture# occlusionColor = texture2D(u_occlusionTexture, vTexcoord);
//#REDGL_DEFINE#occlusionTexture# finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * occlusionColor.r, occlusionColor.r * u_occlusionPower);
// 최종결과 산출
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
}
*/
            }
            ,
            (RedPBRMaterial = function(i, a, o, s, d, l, u) {
                    if (!(this instanceof RedPBRMaterial))
                        return new RedPBRMaterial(i,a,o,s,d,l,u);
                    i instanceof RedGL || RedGLUtil.throwFunc("RedPBRMaterial : RedGL Instance만 허용.", i),
                        this.makeProgramList(this, i, "RedPBRMaterialProgram", e, t, n),
                        this.diffuseTexture = a,
                        this.environmentTexture = o,
                        this.normalTexture = s,
                        this.occlusionTexture = d,
                        this.emissiveTexture = l,
                        this.roughnessTexture = u,
                        this.normalPower = 1,
                        this.specularPower = 1,
                        this.occlusionPower = 1,
                        this.metallicFactor = 1,
                        this.roughnessFactor = .1,
                        this.baseColorFactor = [1, 1, 1, 1],
                        this.emissiveFactor = 1,
                        this.alpha = 1,
                        this.cutOff = 0,
                        this.useFlatMode = !1,
                        this.usePreMultiply = !1,
                        this._UUID = RedGL.makeUUID(),
                    r || (this.checkUniformAndProperty(),
                        r = !0)
                }
            ).prototype = new RedBaseMaterial;
        var i = {
            callback: function() {
                this._searchProgram("RedPBRMaterialProgram", n)
            }
        };
        RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "alpha", "number", {
            min: 0,
            max: 1
        }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "cutOff", "number", {
                min: 0,
                max: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "diffuseTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "environmentTexture", "samplerCube", {
                callback: i.callback
            }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "normalTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "occlusionTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "emissiveTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "roughnessTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "normalPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "specularPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "metallicFactor", "number", {
                min: 0,
                max: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "emissiveFactor", "number", {
                min: 0,
                max: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "roughnessFactor", "number", {
                min: 0,
                max: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "occlusionPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "useFlatMode", "boolean", i),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial", "usePreMultiply", "boolean", i),
            Object.freeze(RedPBRMaterial)
    }(),
    function() {
        var e, t, r;
        e = function() {/* @preserve
void main(void) {
vVertexColor = aVertexColor;
if(uMode2DYn){
gl_Position = uPMatrix * uCameraMatrix * uMMatrix * vec4(aVertexPosition.x, -aVertexPosition.y, aVertexPosition.z, 1.0);
gl_PointSize = abs(aPointSize)/gl_Position.w;
}else {
gl_Position = uPMatrix * uCameraMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
gl_PointSize = abs(aPointSize)/gl_Position.w * uResolution.y;
}
}
*/
        }
            ,
            t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
uniform float u_alpha;
void main(void) {
vec4 finalColor = vVertexColor;
finalColor.a *= u_alpha;
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
}
*/
            }
            ,
            (RedColorPointCloudMaterial = function(n) {
                    if (!(this instanceof RedColorPointCloudMaterial))
                        return new RedColorPointCloudMaterial(n);
                    n instanceof RedGL || RedGLUtil.throwFunc("RedColorPointCloudMaterial : RedGL Instance만 허용.", n),
                        this.makeProgramList(this, n, "colorPointCloudProgram", e, t),
                        this.alpha = 1,
                        this._UUID = RedGL.makeUUID(),
                    r || (this.checkUniformAndProperty(),
                        r = !0)
                }
            ).prototype = new RedBaseMaterial,
            RedDefinePropertyInfo.definePrototype("RedColorPointCloudMaterial", "alpha", "number", {
                min: 0,
                max: 1
            }),
            Object.freeze(RedColorPointCloudMaterial)
    }(),
    function() {
        var e, t, r, n = ["diffuseTexture", "normalTexture", "environmentTexture", "occlusionTexture", "emissiveTexture", "roughnessTexture", "useFlatMode", "useMaterialDoubleSide", "useVertexTangent", "useVertexColor_0", "usePreMultiply"];
        e = function() {/* @preserve
// 스키닝
//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#
// Sprite3D
//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
//#REDGL_DEFINE#useVertexColor_0# attribute vec4 aVertexColor_0;
//#REDGL_DEFINE#useVertexColor_0# varying vec4 vVertexColor_0;
//#REDGL_DEFINE#useVertexTangent# attribute vec4 aVertexTangent;
//#REDGL_DEFINE#useVertexTangent# varying vec4 vVertexTangent;
void main(void) {
gl_PointSize = uPointSize;
// UV설정
vTexcoord = aTexcoord;
vTexcoord1 = aTexcoord1;
//#REDGL_DEFINE#useVertexColor_0# vVertexColor_0 = aVertexColor_0;
//#REDGL_DEFINE#useVertexTangent# vVertexTangent = aVertexTangent;
// normal 계산
//#REDGL_DEFINE#skin#true# vVertexNormal = (uNMatrix * getSkinMatrix() * vec4(aVertexNormal,0.0)).xyz;
//#REDGL_DEFINE#skin#false# vVertexNormal = (uNMatrix *  vec4(aVertexNormal,1.0)).xyz;
// position 계산
//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
vVertexPosition =  targetMatrix *  vec4(aVertexPosition, 1.0);
// 최종 포지션 계산
//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
//#REDGL_DEFINE#sprite3D#true# }
//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * vVertexPosition;
// 쉐도우 계산
//#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
//#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter * uDirectionalShadowLightMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);
}
*/
        }
            ,
            t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
// 그림자
//#REDGL_DEFINE#fragmentShareFunc#decodeFloatShadow#
//#REDGL_DEFINE#fragmentShareFunc#getShadowColor#
// flat노말
//#REDGL_DEFINE#fragmentShareFunc#getFlatNormal#
//#REDGL_DEFINE#fragmentShareFunc#cotangent_frame#
//#REDGL_DEFINE#fragmentShareFunc#perturb_normal#
//#REDGL_DEFINE#useVertexColor_0# varying vec4 vVertexColor_0;
//#REDGL_DEFINE#useVertexTangent# varying vec4 vVertexTangent;
uniform vec4 uBaseColorFactor;
uniform vec3 uEmissiveFactor;
uniform float u_cutOff;
//#REDGL_DEFINE#diffuseTexture# uniform sampler2D u_diffuseTexture;
//#REDGL_DEFINE#normalTexture# uniform sampler2D u_normalTexture;
//#REDGL_DEFINE#occlusionTexture# uniform sampler2D u_occlusionTexture;
//#REDGL_DEFINE#environmentTexture# uniform samplerCube u_environmentTexture;
//#REDGL_DEFINE#emissiveTexture# uniform sampler2D u_emissiveTexture;
//#REDGL_DEFINE#roughnessTexture# uniform sampler2D u_roughnessTexture;
//#REDGL_DEFINE#normalTexture# uniform float u_normalPower;
uniform float u_specularPower;
uniform float u_metallicFactor;
uniform float u_roughnessFactor;
uniform float u_occlusionPower;
uniform float u_alpha;
uniform int u_diffuseTexCoordIndex;
uniform int u_occlusionTexCoordIndex;
uniform int u_emissiveTexCoordIndex;
uniform int u_roughnessTexCoordIndex;
uniform int u_normalTexCoordIndex;
vec4 la;
vec4 ld;
vec4 ls;
vec4 texelColor= vec4(0.0,0.0,0.0,0.0);
vec4 emissiveColor;
vec4 roughnessColor;
vec4 occlusionColor;
vec4 reflectionColor;
vec4 specularLightColor= vec4(1.0, 1.0, 1.0, 1.0);
vec4 finalColor;
vec3 N;
vec3 L;
float lambertTerm;
float specular;
float specularTextureValue;
float distanceLength;
float attenuation;
vec2 u_diffuseTexCoord ;
vec2 u_occlusionTexCoord;
vec2 u_emissiveTexCoord;
vec2 u_roughnessTexCoord;
vec2 u_normalTexCoord;
void main(void) {
la = uAmbientLightColor * uAmbientLightColor.a;
ld = vec4(0.0, 0.0, 0.0, 1.0);
ls = vec4(0.0, 0.0, 0.0, 1.0);
u_diffuseTexCoord = u_diffuseTexCoordIndex==0 ? vTexcoord : vTexcoord1;
u_normalTexCoord = u_normalTexCoordIndex==0 ? vTexcoord : vTexcoord1;
u_occlusionTexCoord = u_occlusionTexCoordIndex==0 ? vTexcoord : vTexcoord1;
u_emissiveTexCoord = u_emissiveTexCoordIndex==0 ? vTexcoord : vTexcoord1;
u_roughnessTexCoord  = u_roughnessTexCoordIndex==0 ? vTexcoord : vTexcoord1;
float tMetallicPower = u_metallicFactor;
float tRoughnessPower = u_roughnessFactor;
//#REDGL_DEFINE#roughnessTexture# roughnessColor = texture2D(u_roughnessTexture, u_roughnessTexCoord);
//#REDGL_DEFINE#roughnessTexture# tMetallicPower *= roughnessColor.b; // 메탈릭 산출 roughnessColor.b
//#REDGL_DEFINE#roughnessTexture# tRoughnessPower *= roughnessColor.g; // 거칠기 산출 roughnessColor.g
// diffuse 색상 산출
texelColor = uBaseColorFactor;
//#REDGL_DEFINE#useVertexColor_0# texelColor *= clamp(vVertexColor_0,0.0,1.0) ;
//#REDGL_DEFINE#diffuseTexture# texelColor *= texture2D(u_diffuseTexture, u_diffuseTexCoord);
//#REDGL_DEFINE#usePreMultiply# //#REDGL_DEFINE#diffuseTexture# texelColor.rgb *= texelColor.a;
// 노멀값 계산
N = normalize(vVertexNormal);
//#REDGL_DEFINE#useMaterialDoubleSide# vec3 fdx = dFdx(vVertexPosition.xyz);
//#REDGL_DEFINE#useMaterialDoubleSide# vec3 fdy = dFdy(vVertexPosition.xyz);
//#REDGL_DEFINE#useMaterialDoubleSide# vec3 faceNormal = normalize(cross(fdx,fdy));
bool backFaceYn = false;
//#REDGL_DEFINE#useMaterialDoubleSide# if (dot (vVertexNormal, faceNormal) < 0.0) { N = -N; backFaceYn = true; };
vec4 normalColor = vec4(0.0);
//#REDGL_DEFINE#normalTexture# normalColor = texture2D(u_normalTexture, u_normalTexCoord);
//#REDGL_DEFINE#useFlatMode# N = getFlatNormal(vVertexPosition.xyz);
//#REDGL_DEFINE#normalTexture# N = perturb_normal(N, vVertexPosition.xyz, backFaceYn ?  1.0 - u_normalTexCoord : u_normalTexCoord, vec3(normalColor.r, 1.0- normalColor.g, normalColor.b) );
//#REDGL_DEFINE#useVertexTangent# //#REDGL_DEFINE#normalTexture# vec3 pos_dx = dFdx(vVertexPosition.xyz);
//#REDGL_DEFINE#useVertexTangent# //#REDGL_DEFINE#normalTexture# vec3 pos_dy = dFdy(vVertexPosition.xyz);
//#REDGL_DEFINE#useVertexTangent# //#REDGL_DEFINE#normalTexture# vec3 tex_dx = dFdx(vec3(u_normalTexCoord, 0.0));
//#REDGL_DEFINE#useVertexTangent# //#REDGL_DEFINE#normalTexture# vec3 tex_dy = dFdy(vec3(u_normalTexCoord, 0.0));
//#REDGL_DEFINE#useVertexTangent# //#REDGL_DEFINE#normalTexture# vec3 t = (tex_dy.t * pos_dx - tex_dx.t * pos_dy) / (tex_dx.s * tex_dy.t - tex_dy.s * tex_dx.t);
//#REDGL_DEFINE#useVertexTangent# //#REDGL_DEFINE#normalTexture# vec3 ng = normalize(vVertexNormal);
//#REDGL_DEFINE#useVertexTangent# //#REDGL_DEFINE#normalTexture# t = normalize(t - ng * dot(ng, t));
//#REDGL_DEFINE#useVertexTangent# //#REDGL_DEFINE#normalTexture# vec3 b = normalize(cross(ng, t));
//#REDGL_DEFINE#useVertexTangent# //#REDGL_DEFINE#normalTexture# mat3 tbn = mat3(t, b, ng);
//#REDGL_DEFINE#useVertexTangent# //#REDGL_DEFINE#normalTexture# N = normalize(tbn * ((2.0 * normalColor.rgb - 1.0) * vec3(1.0, 1.0 * vVertexTangent.w,1.0)));
//#REDGL_DEFINE#useVertexTangent# //#REDGL_DEFINE#normalTexture# N = backFaceYn ? -N : N;
// 환경맵 계산
vec3 R = reflect( vVertexPosition.xyz-uCameraPosition, N);
//#REDGL_DEFINE#environmentTexture# reflectionColor = textureCube(u_environmentTexture, R);
//#REDGL_DEFINE#usePreMultiply# //#REDGL_DEFINE#environmentTexture# reflectionColor.rgb *= reflectionColor.a;
// 환경맵 합성
//#REDGL_DEFINE#environmentTexture# texelColor.rgb = mix( texelColor.rgb , reflectionColor.rgb , max(tMetallicPower-tRoughnessPower,0.0)*(1.0-tRoughnessPower));
//#REDGL_DEFINE#environmentTexture# texelColor = mix( texelColor , vec4(0.04, 0.04, 0.04, 1.0) , tRoughnessPower * (tMetallicPower) * 0.5);
// 컷오프 계산
if(texelColor.a <= u_cutOff) discard;
// 라이팅 계산
float shininess = 128.0 ;
specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
specularTextureValue =  1.0 ;
for(int i=0; i<cDIRETIONAL_MAX; i++){
if(i == uDirectionalLightNum) break;
L = normalize(-uDirectionalLightPositionList[i]);
lambertTerm = dot(N,-L);
if(lambertTerm > 0.0){
ld += uDirectionalLightColorList[i] * texelColor * lambertTerm * uDirectionalLightIntensityList[i] * uDirectionalLightColorList[i].a;
specular = pow( max(dot(reflect(L, N), -L), 0.0), pow(shininess, 1.0-tRoughnessPower+0.04) );
specular *= pow(1.0-tRoughnessPower+0.04, 2.0 * (1.0-tMetallicPower)) ;
ls +=  specularLightColor * specular * u_specularPower * specularTextureValue * uDirectionalLightIntensityList[i]* uDirectionalLightColorList[i].a * (1.0-tRoughnessPower+0.04);
}
}
for(int i=0;i<cPOINT_MAX;i++){
if(i== uPointLightNum) break;
L =  -uPointLightPositionList[i] + vVertexPosition.xyz;
distanceLength = abs(length(L));
if(uPointLightRadiusList[i]> distanceLength){
attenuation = 1.0 / (0.01 + 0.02 * distanceLength + 0.03 * distanceLength * distanceLength) * 0.5;
L = normalize(L);
lambertTerm = dot(N,-L);
if(lambertTerm > 0.0){
ld += uPointLightColorList[i] * texelColor * lambertTerm * attenuation * uPointLightIntensityList[i] ;
specular = pow( max(dot(reflect(L, N), -N), 0.0), pow(shininess, 1.0-tRoughnessPower+0.04) );
specular *= pow(1.0-tRoughnessPower+0.04, 2.0 * (1.0-tMetallicPower)) ;
ls +=  specularLightColor * specular * uPointLightIntensityList[i]  * uPointLightColorList[i].a * (1.0-tRoughnessPower+0.04) ;
}
}
}
finalColor = la * uAmbientIntensity + ld + ls;
finalColor.a = texelColor.a * u_alpha ;
// 그림자 계산
//#REDGL_DEFINE#directionalShadow#true# finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture), 0.5);
// 이미시브합성
//#REDGL_DEFINE#emissiveTexture# emissiveColor = texture2D(u_emissiveTexture, u_emissiveTexCoord);
//#REDGL_DEFINE#usePreMultiply# //#REDGL_DEFINE#emissiveTexture# emissiveColor.rgb *= emissiveColor.a;
//#REDGL_DEFINE#emissiveTexture# emissiveColor.rgb *= uEmissiveFactor;
//#REDGL_DEFINE#emissiveTexture# finalColor.rgb += emissiveColor.rgb;
// 오클루젼 합성
//#REDGL_DEFINE#occlusionTexture# occlusionColor = texture2D(u_occlusionTexture, u_occlusionTexCoord);
//#REDGL_DEFINE#occlusionTexture# finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * occlusionColor.r, occlusionColor.r * u_occlusionPower);
// 최종결과 산출
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
}
*/
            }
            ,
            (RedPBRMaterial_System = function(i, a, o, s, d, l, u) {
                    if (!(this instanceof RedPBRMaterial_System))
                        return new RedPBRMaterial_System(i,a,o,s,d,l,u);
                    i instanceof RedGL || RedGLUtil.throwFunc("RedPBRMaterial_System : RedGL Instance만 허용.", i),
                        this.makeProgramList(this, i, "RedPBRMaterialSystemProgram", RedGLUtil.getStrFromComment(e.toString()), RedGLUtil.getStrFromComment(t.toString()), n),
                        this.diffuseTexture = a,
                        this.environmentTexture = o,
                        this.normalTexture = s,
                        this.occlusionTexture = d,
                        this.emissiveTexture = l,
                        this.roughnessTexture = u,
                        this.normalPower = 1,
                        this.specularPower = 1,
                        this.metallicFactor = 1,
                        this.roughnessFactor = 1,
                        this.diffuseTexCoordIndex = 0,
                        this.occlusionTexCoordIndex = 0,
                        this.emissiveTexCoordIndex = 0,
                        this.roughnessTexCoordIndex = 0,
                        this.normalTexCoordIndex = 0,
                        this.occlusionPower = 1,
                        this.baseColorFactor = null,
                        this.emissiveFactor = null,
                        this.alpha = 1,
                        this.cutOff = 0,
                        this.useMaterialDoubleSide = !1,
                        this.useVertexColor_0 = !1,
                        this.useFlatMode = !1,
                        this.useVertexTangent = !1,
                        this.usePreMultiply = !1,
                        this._UUID = RedGL.makeUUID(),
                    r || (this.checkUniformAndProperty(),
                        r = !0),
                        this._needSearchProgram = null
                }
            ).prototype = new RedBaseMaterial;
        var i = {
            callback: function() {
                var e = this;
                cancelAnimationFrame(this._needSearchProgram),
                    this._needSearchProgram = requestAnimationFrame(function() {
                        e._searchProgram("RedPBRMaterialSystemProgram", n),
                            e._needSearchProgram = null
                    })
            }
        };
        RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "alpha", "number", {
            min: 0,
            max: 1
        }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "cutOff", "number", {
                min: 0,
                max: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "diffuseTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "diffuseTexCoordIndex", "number"),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "environmentTexture", "samplerCube", {
                callback: i.callback
            }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "normalTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "normalTexCoordIndex", "number"),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "occlusionTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "occlusionTexCoordIndex", "number"),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "emissiveTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "emissiveTexCoordIndex", "number"),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "roughnessTexture", "sampler2D", i),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "roughnessTexCoordIndex", "number"),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "normalPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "specularPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "metallicFactor", "number", {
                min: 0,
                max: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "roughnessFactor", "number", {
                min: 0,
                max: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "occlusionPower", "number", {
                min: 0
            }),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "useFlatMode", "boolean", i),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "useMaterialDoubleSide", "boolean", i),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "useVertexColor_0", "boolean", i),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "useVertexTangent", "boolean", i),
            RedDefinePropertyInfo.definePrototype("RedPBRMaterial_System", "usePreMultiply", "boolean", i),
            Object.freeze(RedPBRMaterial_System)
    }(),
    function() {
        var e, t, r, n = [];
        e = function() {/* @preserve
// Sprite3D
//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
uniform float u_width;
uniform float u_height;
void main(void) {
gl_PointSize = uPointSize;
vTexcoord = aTexcoord;
// position 계산
mat4 targetMatrix;
if(uMode2DYn){
targetMatrix = uMMatrix * mat4(
u_width, 0.0, 0.0, 0.0,
0.0, u_height, 0.0, 0.0,
0.0, 0.0, 1.0, 0.0,
0.0, 0.0, 0.0, 1.0
) ;
gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);
}else{
targetMatrix = uMMatrix * mat4(
u_width/uResolution.y, 0.0, 0.0, 0.0,
0.0, u_height/uResolution.y, 0.0, 0.0,
0.0, 0.0, 1.0, 0.0,
0.0, 0.0, 0.0, 1.0
) ;
//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
//#REDGL_DEFINE#sprite3D#true# }
//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);
}
//#REDGL_DEFINE#directionalShadow#true# vResolution = uResolution;
//#REDGL_DEFINE#directionalShadow#true# vShadowPos = cTexUnitConverter  *  uDirectionalShadowLightMatrix * targetMatrix * vec4(aVertexPosition, 1.0);
}
*/
        }
            ,
            t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
// 그림자
//#REDGL_DEFINE#fragmentShareFunc#decodeFloatShadow#
//#REDGL_DEFINE#fragmentShareFunc#getShadowColor#
uniform sampler2D u_diffuseTexture;
uniform float u_alpha;
void main(void) {
vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
finalColor.a *= u_alpha;
if(finalColor.a == 0.0) discard;
//#REDGL_DEFINE#directionalShadow#true# finalColor.rgb *= getShadowColor( vShadowPos, vResolution, uDirectionalShadowTexture);
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
}
*/
            }
            ,
            (RedTextMaterial = function(i, a) {
                    if (!(this instanceof RedTextMaterial))
                        return new RedTextMaterial(i,a);
                    i instanceof RedGL || RedGLUtil.throwFunc("RedTextMaterial : RedGL Instance만 허용.", i),
                        this.makeProgramList(this, i, "RedTextMaterialProgram", e, t, n),
                        this.diffuseTexture = a,
                        this.alpha = 1,
                        this.width = 2,
                        this.height = 2,
                        this._UUID = RedGL.makeUUID(),
                    r || (this.checkUniformAndProperty(),
                        r = !0)
                }
            ).prototype = new RedBaseMaterial,
            RedDefinePropertyInfo.definePrototype("RedTextMaterial", "diffuseTexture", "sampler2D", {
                essential: !0
            }),
            RedDefinePropertyInfo.definePrototype("RedTextMaterial", "alpha", "number", {
                min: 0,
                max: 1
            }),
            RedDefinePropertyInfo.definePrototype("RedTextMaterial", "width", "number", {
                min: 2,
                callback: function(e) {
                    this._width = e
                }
            }),
            RedDefinePropertyInfo.definePrototype("RedTextMaterial", "height", "number", {
                min: 2,
                callback: function(e) {
                    this._height = e
                }
            }),
            Object.freeze(RedTextMaterial)
    }(),
    (RedAmbientLight = function(e, t, r, n) {
            if (!(this instanceof RedAmbientLight))
                return new RedAmbientLight(e,t,r,n);
            e instanceof RedGL || RedGLUtil.throwFunc("RedAmbientLight : RedGL Instance만 허용.", "입력값 : " + e),
                this._lightColor = new Float32Array(4),
                this.intensity = null == n ? 1 : n,
                this.alpha = null == r ? .1 : r,
                this.color = t || "#fff",
                this._UUID = RedGL.makeUUID()
        }
    ).TYPE = "RedAmbientLight",
    RedAmbientLight.prototype = new RedBaseLight,
    Object.defineProperty(RedAmbientLight.prototype, "TYPE", {
        configurable: !1,
        writable: !1,
        value: RedAmbientLight.TYPE
    }),
    Object.freeze(RedAmbientLight),
    (RedDirectionalLight = function(e, t, r, n) {
            if (!(this instanceof RedDirectionalLight))
                return new RedDirectionalLight(e,t,r,n);
            e instanceof RedGL || RedGLUtil.throwFunc("RedDirectionalLight : RedGL Instance만 허용.", "입력값 : " + e),
                this._lightColor = new Float32Array(4),
                this.intensity = null == n ? 1 : n,
                this.alpha = null == r ? 1 : r,
                this.color = t || "#fff",
                this.x = 0,
                this.y = -1,
                this.z = 0,
                this._UUID = RedGL.makeUUID(),
                this.debug = !1,
                this._debugObject = RedSprite3D(e, RedBitmapMaterial(e, RedBitmapTexture(e, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozQjcyMEREMTUyMDYxMUU4OTRDNTgzQTBBMEY2MkFFNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDODA1NTI0RjUyMDYxMUU4QkVBQTg3NjZCN0M1OUI2OCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDODA1NTI0RTUyMDYxMUU4QkVBQTg3NjZCN0M1OUI2OCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNmFjYmZjZi05YjBkLThlNGItODZiNy1kNWViYWNjZDg4OGMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0I3MjBERDE1MjA2MTFFODk0QzU4M0EwQTBGNjJBRTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4vVcpuAAAHNUlEQVR42uxbeWyURRT/tiw9OAJYUekfeBCFNmqlkAgRtURQaTywWIhGSfDAAzmkggcoKopKRQXFKKZqNGmkqGAkGEQFhaQenGrAI3iUpKilaiPSytKt74XfF6evM/vN7n67+xn6kl/Sb3bmvTdvZt68eTMNtbe3O8cyhboM0GWALgN0LKkJpUv2lYQFBFbgYcI7aZF6bcf+ZmXI8L0IlYShhBLCbELPTCiSKQOcTRimfA8nFP/fDTCEMJrQw2bpEVqV71ZLXXpARmHQDDCZ8DnhI8IrFkZoI0SVb/77iEXnX4WMzyAzEAbIJSwk9Mb3RMKMFMzWmYQK/N0bMnODYAB2q42i7B5CkY+dZ153i7JGyM64Af4hVIk13cdjFoQsy1yaAZ6qz6iC7ED4gJWEjaLsRkKpoX53MX1zUaajUvBSaSNkBmoXuI/QonyHCXMIeZq6PxJ+Vb5/I/ykqZcHHmGljGXcG8RtcCfhRVFWpjgulfahEzvQjn1GvaZeBXio9AJhV1ADoUcITaJsmKHuKvxWgr91NFx8N0FG2gOhbpb1WMGbxXRd6SE/lg61wrneRPjdT51tDkOTELe3YvrVWPC9CnH+h4SPlfKLCKMQChco/oEN1UD4krAF7Vy6EO14uay2kH0N4XZCDmFJpwEQhyEvAwxF1OV66MOEd8G4znIkuJNTCNcjhO3jUb+ZsIfwOqLKFks5IzFQlxOyURYhnAvjJXQa7Cu2J2Y8gbCBsJhwskf7SzCizxJGWHTejSFGoM0W8IhFA6HLBuiWLbbbvsn4gJ2GKd8T29NWeGodHx6NdXByWQn6pxLwqDT8XgEd5hiO0zXog5HCHkr8QbiO8AMOHwPF78fDUZWL9cmeep6B527CNsK3hAMKn8HYFYo0HX2S0I8wXyRUag0y6nFwWuBl5bDFSPCiuR/WvItwg6bO+YoB7jR0fjthBXxIg0FWAdbwVIy+SvOwyzytyNTRyzDYnlSlxEYh6hunePCLsV75t82aNrx7PCiiv1h0IurfajC2K+t9ZSd5j7AIv1mnxBLNCXJK61KMEiuxCdvOds0U5o48lGCcsgDt5RIqwUGoFMbfAQMcjDcn6GdSlPfe5aJsKWFWksHaM8gFqDSN8HxC3FKUFM3CulXpa2xPydJi8FJpql+6+2WACwiDNCPX4APvBvBSaRBkBsYAY+AXXOItbo2PZ5Y14Kn6oDF+MA7HyPMVI5I6IrI2XPY9Yb9SfpZoX6c5FSZDTeA5OIZM3jnOgL7t4lDUhiN0i40BLkNkVYjGUc0pqxGxQS1m0QBR5xvHf5I8B0A268eJWL5d6q/RNwSD7EYaba2XAZZrIj5J/bA9rYbFszUj5jdJntnoWHfoMtjCT50iDZCpm6HAkG4GTMMSKFKmjzRaI6wewfdhUSc/BbpKnoehXwS6LMQSaNPo24bQuMrGAGuRkChWHIi6nrjNd0pYGxUOkWlICgwgee5X1nstQvDTYZB20ccInGCr7S7A3vLTOJT7inCFSE7k++gL8sFTypQG2Z+pOOADEYezQxrv4+iPF07uIGQGJhD6hLBXlM3C8TZZKtCcJ/ZCZmAMEMVZX6UzCXN94D0XvFRaodnv02qAXkhHLXL+u/6qRrCh0kybrIzHcXim5jhcjb9LocPVIhS3pmM+IRLPDCiE5TcrnXegQDn+ZuGzNW25I5zcvMXDLxSgzjpD52crHSx3Ot47joNu1U4cL0hsZkAIcfbkGCFyKpOiLj3qdEyK8uXL24a65qRonBkhjvmf42YGQQeQCXpL45QqkcxI1tFG4QiXaPzXBJxd+hvaciL3DudodjuhJXCOofN/I6zky8tVBo/MCvPN7vYEPXYUbcs0nXd/XwUdqqBTp/FGHxLeBf5EGOkSJyLfJIzFqPzs0X49nNV0RJbNFh1vRt3paLveo349dBmLmaieSyLoQ1I+QL0c5UTkGxad4PVZgmjNj8vRMfAbNlkmvhy9DUmdpC9H1ZliO41V59SKkTFtTe4Vdpvh9/NgxFyFt22qrZuWb4LboG3n+dDykkitTfTgG4v3JKfjW6LqOI7abekMhV2ar1Fwq6FuBZzcNkf/jEbX9jixFSZNfl6McP6gTgQn6xCmymQkxxP80us05XDDT2D3iXp5cLpl4qg+0kn0nVAKX4s/Jjp/BNuT7oED5+ZOEKHvqYa8RJXTMTOdB1m+kF8GmIQRdMR63WSoH3E6P5aOGOpuUg4/Lo2GzEAYIAc5xFyxly+L0abdssylZSKGyIXMnCAYIKQJRZ/QHI2TIeb1uCjr74f+fhiApy9fkvyFbw5Plzr+E88C90UIy3rAsX9AZaSwT8q9RviCcJJz9FXZIQu5WWIgvN71Mc8pyC384li+AEmXARwoZKtU1On8WNrm6fshp/Oj7EDsAvHSLhHkbMM5IO0UzpAB+Oj6FPJ4IRxaDmZCka5/nOwyQJcBjm0D/CvAAF/S81D+EWScAAAAAElFTkSuQmCC")))
        }
    ).TYPE = "RedDirectionalLight",
    RedDirectionalLight.prototype = new RedBaseLight,
    Object.defineProperty(RedDirectionalLight.prototype, "TYPE", {
        configurable: !1,
        writable: !1,
        value: RedDirectionalLight.TYPE
    }),
    Object.freeze(RedDirectionalLight),
    (RedPointLight = function(e, t, r, n, i) {
            if (!(this instanceof RedPointLight))
                return new RedPointLight(e,t,r,n,i);
            e instanceof RedGL || RedGLUtil.throwFunc("RedPointLight : RedGL Instance만 허용.", "입력값 : " + e),
                this._lightColor = new Float32Array(4),
                this.intensity = null == i ? 1 : i,
                this.alpha = null == r ? 1 : r,
                this.radius = null == n ? 1 : n,
                this.color = t || "#fff",
                this.x = 0,
                this.y = 0,
                this.z = 0,
                this.radius = 1,
                this.debug = !1,
                this._debugObject = RedMesh(e, RedSphere(e, 1, 16, 16, 16), RedColorMaterial(e)),
                this._debugObject.drawMode = e.gl.LINE_STRIP,
                this._UUID = RedGL.makeUUID()
        }
    ).TYPE = "RedPointLight",
    RedPointLight.prototype = new RedBaseLight,
    Object.defineProperty(RedPointLight.prototype, "TYPE", {
        configurable: !1,
        writable: !1,
        value: RedPointLight.TYPE
    }),
    RedDefinePropertyInfo.definePrototype("RedPointLight", "radius", "number", {
        min: 0
    }),
    Object.freeze(RedPointLight),
    function() {
        var e, t;
        t = function() {}
            ,
            RedMTLLoader = function(r, n, i, a) {
                if (!(this instanceof RedMTLLoader))
                    return new RedMTLLoader(r,n,i,a);
                var o = this
                    , s = new XMLHttpRequest;
                s.open("GET", n + i, !0),
                    s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
                    s.onreadystatechange = function() {
                        if (4 == s.readyState) {
                            var n;
                            if (o.complete = !0,
                            200 == s.status)
                                n = e(o, r, s.responseText),
                                    o.parseData = n;
                            else
                                o.parseData = new t;
                            a && a(o.parseData)
                        }
                    }
                    ,
                    s.addEventListener("error", function(e) {}),
                    s.send(),
                    this.path = n,
                    this.fileName = i,
                    this.complete = !1,
                    this.parseData = null
            }
            ,
            e = function(e, r, n) {
                var i, a, o, s, d, l, u, c, f, h, R, m, p, _;
                for (var g in i = {},
                    o = /^(newmtl )/,
                    s = /^(Ns )/,
                    d = /^(Ka )/,
                    l = /^(Kd )/,
                    u = /^(Ks )/,
                    c = /^(Ni )/,
                    f = /^(d )/,
                    h = /^(illum )/,
                    R = /^(map_Kd )/,
                    /^(map_Ks )/,
                    m = /^(map_Ns )/,
                    p = /^(map_bump )/,
                    (n = n.replace(/^\#[\s\S]+?\n/g, "")).split("\n").forEach(function(t) {
                        var r;
                        o.test(t) ? (r = t.replace("newmtl ", "").trim(),
                            _ = {
                                name: r
                            },
                            i[r] = _) : d.test(t) ? _.Ka = t.replace("Ka ", "").split(" ") : l.test(t) ? _.Kd = t.replace("Kd ", "").split(" ") : u.test(t) ? _.Ks = t.replace("Ks ", "").split(" ") : s.test(t) ? _.Ns = +t.replace("Ns ", "") : c.test(t) ? _.Ni = +t.replace("Ni ", "") : f.test(t) ? _.d = +t.replace("d ", "") : h.test(t) ? (_.illum = +t.replace("illum ", ""),
                            _.illum) : R.test(t) ? _.map_Kd = e.path + t.replace("map_Kd ", "") : m.test(t) ? _.map_Ns = e.path + t.replace("map_Ns ", "") : p.test(t) && (_.map_bump = e.path + t.replace("map_bump ", "").split(" ")[2])
                    }),
                    a = new t,
                    i)
                    a[g] = i[g];
                return a
            }
            ,
            Object.freeze(RedMTLLoader)
    }(),
    function() {
        var e, t, r, n, i, a, o, s, d, l, u, c, f, h, R;
        RedOBJLoader = function(t, r, n, i) {
            if (!(this instanceof RedOBJLoader))
                return new RedOBJLoader(t,r,n,i);
            var a = this
                , o = new XMLHttpRequest;
            o.open("GET", r + n, !0),
                o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
                o.onreadystatechange = function() {
                    4 === o.readyState && (a.result = e(a, t, o.responseText),
                        a.modelParsingComplete = !0,
                        a.resultMesh = void 0,
                    i && (a.mtlLoader ? a.mtlLoader.complete && i(a.result) : i(a.result)))
                }
                ,
                o.send(),
                this.path = r,
                this.fileName = n,
                this.mtlLoader = null,
                this.modelParsingComplete = !1,
                this.callback = i,
                this.resultMesh = RedMesh(t),
                this.resultMesh.name = "instanceOfRedOBJLoader_" + RedGL.makeUUID(),
                this.result = null
        }
            ,
            r = function(e, t, r) {
                var n, i, a, o;
                for (n in o = {},
                    t) {
                    var s, d, l, u, c, f;
                    if ((a = t[n]).mesh,
                    a.use && a.resultInterleave.length)
                        f = a.ableLight,
                        (i = r.parseData[a.materialKey]) && (i.map_Kd ? (o[i.map_Kd] ? d = o[i.map_Kd] : (d = RedBitmapTexture(e, i.map_Kd),
                            o[i.map_Kd] = d),
                            s = f ? RedStandardMaterial(e, d) : RedBitmapMaterial(e, d)) : i.Kd && (l = 255 * i.Kd[0],
                            u = 255 * i.Kd[1],
                            c = 255 * i.Kd[2],
                            s = f ? RedColorPhongTextureMaterial(e, RedGLUtil.rgb2hex(l, u, c)) : a.ableNormal ? RedColorPhongMaterial(e, RedGLUtil.rgb2hex(l, u, c)) : RedColorMaterial(e, RedGLUtil.rgb2hex(l, u, c))),
                        s && (i.map_Ns && (o[i.map_Ns] ? d = o[i.map_Ns] : (d = RedBitmapTexture(e, i.map_Ns),
                            o[i.map_Ns] = d),
                            s.specularTexture = d),
                        i.map_bump && (o[i.map_bump] ? d = o[i.map_bump] : (d = RedBitmapTexture(e, i.map_bump),
                            o[i.map_bump] = d),
                            s.normalTexture = d),
                        void 0 !== i.Ns && (s.shininess = i.Ns),
                            a.mesh.material = s))
                }
            }
            ,
            t = function(e, r, n) {
                for (var i in n) {
                    var a, o;
                    if ((a = n[i]).use) {
                        var s, d, l, u = [];
                        a.resultPosition.length && u.push(RedInterleaveInfo("aVertexPosition", 3)),
                        a.resultNormal.length && u.push(RedInterleaveInfo("aVertexNormal", 3)),
                        a.resultUV.length && u.push(RedInterleaveInfo("aTexcoord", 2)),
                            s = RedBuffer(e, i + "_interleave", RedBuffer.ARRAY_BUFFER, new Float32Array(a.resultInterleave.length ? a.resultInterleave : a.resultPosition), u),
                        a.index.length && a.index.length && (d = RedBuffer(e, i + "_index", RedBuffer.ELEMENT_ARRAY_BUFFER, new Uint16Array(a.index))),
                            l = a.resultUV.length && a.resultNormal.length ? RedColorPhongTextureMaterial(e, "#00ff00") : a.resultNormal ? RedColorPhongMaterial(e, "#00ff00") : RedColorMaterial(e, "#0000ff"),
                            o = RedMesh(e, RedGeometry(s, d), l),
                            a.ableUV = !!a.resultUV.length,
                            a.ableNormal = !!a.resultNormal.length,
                            a.ableLight = !!(a.ableUV & a.ableNormal)
                    } else
                        o = RedMesh(e);
                    o.name = i,
                        a.mesh = o,
                        r.addChild(o),
                        t(e, o, a.childrenInfo)
                }
            }
            ,
            h = /^(mtllib )/,
            R = /^(usemtl )/,
            i = /^o /,
            a = /^g /,
            o = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,
            s = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,
            d = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,
            l = /f\s+(([\d]{1,}[\s]?){3,})+/,
            u = /f\s+((([\d]{1,}\/[\d]{1,}[\s]?){3,})+)/,
            c = /f\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){3,})+)/,
            f = /f\s+((([\d]{1,}\/\/[\d]{1,}[\s]?){3,})+)/,
            n = function(e, t, n) {
                var m, p, _, g, P, v, y, E, M, b;
                for (_ = {
                    position: [],
                    normal: [],
                    uv: [],
                    points: [],
                    normalPoints: [],
                    uvPoints: []
                },
                         p = {},
                         m = {},
                         y = n.length; y--; )
                    if (i.test(n[y])) {
                        E = !0;
                        break
                    }
                return E || (b = {
                    name: M = "objModel" + RedGL.makeUUID(),
                    groupName: M,
                    index: [],
                    position: [],
                    resultPosition: [],
                    resultNormal: [],
                    resultUV: [],
                    resultInterleave: [],
                    use: !0,
                    childrenInfo: {}
                },
                    p[M] = g = b,
                    m[M] = g,
                    P = M),
                    n.forEach(function(n) {
                        if (h.test(n))
                            return v = RedMTLLoader(e, t.path, n.split(" ")[1], function(n) {
                                t.mtlLoader = n,
                                t.modelParsingComplete && t.callback && (r(e, m, v),
                                    t.callback(t.result))
                            }),
                                void (t.mtlLoader = v);
                        var y;
                        if (R.test(n))
                            E = n.split(" ").slice(1).join("").trim(),
                                m[P].materialKey = E;
                        else if (a.test(n))
                            E = n.split(" ").slice(1).join("").trim(),
                                p[P].use = !1,
                                M = {
                                    name: E,
                                    groupName: P,
                                    materialKey: E.replace(P + "_", ""),
                                    index: [],
                                    position: g.position,
                                    resultPosition: [],
                                    resultNormal: [],
                                    resultUV: [],
                                    resultInterleave: [],
                                    use: !0,
                                    childrenInfo: {}
                                },
                                m[E] = g = M,
                                p[P].childrenInfo[E] = g;
                        else if (i.test(n)) {
                            var E, M;
                            M = {
                                name: E = n.split(" ").slice(1).join("").trim(),
                                groupName: E,
                                materialKey: E,
                                index: [],
                                position: [],
                                resultPosition: [],
                                resultNormal: [],
                                resultUV: [],
                                resultInterleave: [],
                                use: !0,
                                childrenInfo: {}
                            },
                                p[E] = g = M,
                                m[E] = g,
                                P = E
                        }
                        if (o.test(n))
                            y = n.split(" "),
                                _.position.push(+y[1], +y[2], +y[3]),
                                g.position.push(+y[1], +y[2], +y[3]),
                                _.points[_.points.length] = [+y[1], +y[2], +y[3]];
                        else if (s.test(n)) {
                            var b;
                            b = n.split(" "),
                                _.normal.push(+b[1], +b[2], +b[3]),
                                _.normalPoints[_.normalPoints.length] = [+b[1], +b[2], +b[3]]
                        } else if (d.test(n)) {
                            var L;
                            L = n.split(" "),
                                _.uv.push(+L[1], 1 - L[2]),
                                _.uvPoints[_.uvPoints.length] = [+L[1], 1 - L[2]]
                        } else if (f.test(n))
                            (I = n.split(" ").slice(1, 4)).forEach(function(e) {
                                var t, r, n;
                                n = 0,
                                    e = e.split("/"),
                                    D = +e[0] - 1,
                                    T = +e[2] - 1,
                                    t = _.points[D],
                                    r = _.normalPoints[T],
                                _.position.length && (n += 3),
                                _.normal.length && (n += 3),
                                    g.index.push(g.resultInterleave.length / n),
                                _.position.length && (g.resultPosition.push(t[0], t[1], t[2]),
                                    g.resultInterleave.push(t[0], t[1], t[2])),
                                _.normal.length && (g.resultNormal.push(r[0], r[1], r[2]),
                                    g.resultInterleave.push(r[0], r[1], r[2]))
                            });
                        else if (c.test(n)) {
                            var T;
                            if (4 === (I = n.split(" ").slice(1, 5)).length) {
                                var x = I[3];
                                I[3] = I[0],
                                    I[4] = I[2],
                                    I[5] = x
                            }
                            I.forEach(function(e) {
                                var t, r, n, i;
                                i = 0,
                                    e = e.split("/"),
                                    D = +e[0] - 1,
                                    w = +e[1] - 1,
                                    T = +e[2] - 1,
                                    t = _.points[D],
                                    n = _.uvPoints[w],
                                    r = _.normalPoints[T],
                                _.position.length && (i += 3),
                                _.normal.length && (i += 3),
                                _.uv.length && (i += 2),
                                    g.index.push(g.resultInterleave.length / i),
                                _.position.length && (g.resultPosition.push(t[0], t[1], t[2]),
                                    g.resultInterleave.push(t[0], t[1], t[2])),
                                _.normal.length && (g.resultNormal.push(r[0], r[1], r[2]),
                                    g.resultInterleave.push(r[0], r[1], r[2])),
                                _.uv.length && (g.resultUV.push(n[0], n[1]),
                                    g.resultInterleave.push(n[0], n[1]))
                            })
                        } else if (u.test(n)) {
                            var I, w;
                            (I = n.split(" ").slice(1, 4)).forEach(function(e) {
                                var t, r, n;
                                n = 0,
                                    e = e.split("/"),
                                    D = +e[0] - 1,
                                    w = +e[1] - 1,
                                    t = _.points[D],
                                    r = _.uvPoints[w],
                                _.position.length && (n += 3),
                                _.uv.length && (n += 2),
                                    g.index.push(g.resultInterleave.length / n),
                                _.position.length && (g.resultPosition.push(t[0], t[1], t[2]),
                                    g.resultInterleave.push(t[0], t[1], t[2])),
                                _.uv.length && (g.resultUV.push(r[0], r[1]),
                                    g.resultInterleave.push(r[0], r[1]))
                            })
                        } else if (l.test(n)) {
                            var D;
                            D = n.split(" "),
                                g.resultInterleave = g.resultPosition = g.position,
                                g.index.push(+D[1] - 1, +D[2] - 1, +D[3] - 1),
                                g.index.push(+D[1] - 1, +D[3] - 1, +D[4] - 1)
                        }
                    }),
                    {
                        info: m,
                        infoHierarchy: p
                    }
            }
            ,
            e = function(e, r, i) {
                i = i.replace(/^\#[\s\S]+?\n/g, "");
                var a = n(r, e, i.split("\n"));
                return t(r, e.resultMesh, a.infoHierarchy),
                    new function(e) {
                        for (var t in e)
                            this[t] = e[t]
                    }
                    ({
                        fileName: e.fileName,
                        path: e.path,
                        resultMesh: e.resultMesh,
                        parseRawInfo: a.info,
                        parseInfoHierarchy: a.infoHierarchy,
                        parseInfoMaterial: e.mtlLoader
                    })
            }
            ,
            Object.freeze(RedOBJLoader)
    }(),
    function() {
        var e, t, r, n, i, a, o, s, d, l, u, c, f, h, R, m, p, _, g;
        Red3DSLoader = function(t, r, n, i) {
            if (!(this instanceof Red3DSLoader))
                return new Red3DSLoader(t,r,n,i);
            var a = this
                , o = new XMLHttpRequest;
            o.open("GET", r + n, !0),
                o.responseType = "arraybuffer",
                o.onreadystatechange = function() {
                    4 == o.readyState && 200 === o.status && (a.result = e(a, t, o.response),
                    i && i(a.result))
                }
                ,
                o.send(),
                this.redGL = t,
                this.position = 0,
                this.materials = {},
                this.meshs = [],
                this.path = r,
                this.fileName = n,
                this.callback = i,
                this.resultMesh = RedMesh(t),
                this.resultMesh.name = "instanceOfRed3DSLoader_" + RedGL.makeUUID(),
                this.result = null
        }
            ,
            r = function(e, t) {
                var r = {};
                return r.cur = e.position,
                    r.id = a(e, t),
                    r.size = o(e, t),
                    r.end = r.cur + r.size,
                    r.cur += 6,
                    r
            }
            ,
            n = function(e, t, n) {
                if (n.cur >= n.end)
                    return 0;
                e.position = n.cur;
                try {
                    var i = r(e, t);
                    return n.cur += i.size,
                        i.id
                } catch (e) {
                    return 0
                }
            }
            ,
            i = function(e, t) {
                e.position = t.end
            }
            ,
            a = function(e, t) {
                var r = t.getUint16(e.position, !0);
                return e.position += 2,
                    r
            }
            ,
            o = function(e, t) {
                var r = t.getUint32(e.position, !0);
                return e.position += 4,
                    r
            }
            ,
            d = function(e, t) {
                var r = t.getUint8(e.position, !0);
                return e.position += 1,
                    r
            }
            ,
            s = function(e, t, r) {
                var n, i, a = "";
                for (n = 0; n < r && (i = d(e, t)); n++)
                    a += String.fromCharCode(i);
                return a
            }
            ,
            R = function(e, t) {
                try {
                    var r = t.getFloat32(e.position, !0);
                    return e.position += 4,
                        r
                } catch (e) {}
            }
            ,
            l = function(e, t) {
                var n, a = r(e, t);
                return 17 === a.id || 18 === a.id ? n = RedGLUtil.rgb2hex(d(e, t), d(e, t), d(e, t)) : 16 !== a.id && 19 !== a.id || (n = RedGLUtil.rgb2hex(d(e, t), d(e, t), d(e, t))),
                    i(e, a),
                    n
            }
            ,
            c = function(e) {
                e.position -= 6
            }
            ,
            u = function(e, t, a) {
                for (var o = r(e, t), d = n(e, t, o), l = {}; 0 !== d; ) {
                    switch (d) {
                        case 41728:
                            var u = s(e, t, 128);
                            l = RedBitmapTexture(e.redGL, a + u);
                            break;
                        case 41816:
                            l.offset || (l.offset = {}),
                                l.offset.x = R(e, t);
                            break;
                        case 41818:
                            l.offset || (l.offset = {}),
                                l.offset.y = R(e, t);
                            break;
                        case 41812:
                            l.repeat || (l.repeat = {}),
                                l.repeat.x = R(e, t);
                            break;
                        case 41814:
                            l.repeat || (l.repeat = {}),
                                l.repeat.y = R(e, t)
                    }
                    d = n(e, t, o)
                }
                return i(e, o),
                    l
            }
            ,
            _ = function(e, t, o) {
                for (var f, h = r(e, t), R = n(e, t, h), m = {}; 0 !== R; ) {
                    switch (R) {
                        case 40960:
                            m.name = s(e, t, 64);
                            break;
                        case 41093:
                            m.wireframe = !0;
                            break;
                        case 41095:
                            d(e, t);
                            break;
                        case 41089:
                        case 41091:
                            break;
                        case 40992:
                            m.color = l(e, t);
                            break;
                        case 41008:
                        case 40976:
                            break;
                        case 41024:
                            var p = a(e, t);
                            m.shininess = p;
                            break;
                        case 41472:
                            c(e),
                                m.diffuseTexture = u(e, t, o);
                            break;
                        case 41520:
                            c(e),
                                m.normalTexture = u(e, t, o);
                            break;
                        case 41488:
                            c(e);
                            break;
                        case 41476:
                            c(e),
                                m.specularTexture = u(e, t, o)
                    }
                    R = n(e, t, h)
                }
                m.diffuseTexture ? "shininess"in m ? ((f = RedStandardMaterial(e.redGL, m.diffuseTexture)).normalTexture = m.normalTexture,
                    f.specularTexture = m.specularTexture) : f = RedBitmapTexture(e.redGL, m.diffuseTexture) : (m.normalTexture || m.specularTexture ? f = RedColorPhongTextureMaterial(e.redGL) : "shininess"in m ? f = RedColorPhongMaterial(e.redGL) : RedColorMaterial(e.redGL),
                    f.color = m.color),
                    i(e, h),
                    f.shininess = m.shininess,
                    f.name = m.name,
                    e.materials[m.name] = f
            }
            ,
            f = function(e, t, i) {
                for (var a = r(e, t), s = n(e, t, a); 0 !== s; ) {
                    switch (s) {
                        case 15678:
                            o(e, t);
                            break;
                        case 256:
                            var d = R(e, t);
                            e.resultMesh.scaleX = d,
                                e.resultMesh.scaleY = d,
                                e.resultMesh.scaleZ = d;
                            break;
                        case 16384:
                            c(e),
                                m(e, t);
                            break;
                        case 45055:
                            c(e),
                                _(e, t, i)
                    }
                    s = n(e, t, a)
                }
            }
            ,
            g = function(e, t) {
                r(e, t);
                for (var n = s(e, t, 64), i = a(e, t), o = [], d = 0; d < i; ++d)
                    o.push(a(e, t));
                return {
                    name: n,
                    index: o
                }
            }
            ,
            p = function(e, t, n) {
                for (var o = r(e, t), s = a(e, t), d = [], l = 0; l < s; ++l)
                    d.push(a(e, t), a(e, t), a(e, t)),
                        a(e, t);
                for (; e.position < o.end; ) {
                    if (16688 === (o = r(e, t)).id) {
                        c(e);
                        var u = g(e, t)
                            , f = e.materials[u.name];
                        void 0 !== f && (n.material = f,
                        "" === f.name && (f.name = n.name))
                    }
                    i(e, o)
                }
                return i(e, o),
                    d
            }
            ,
            h = function(e, t) {
                for (var o, s, d, l, u, f = r(e, t), h = n(e, t, f), m = [], _ = RedMesh(e.redGL); 0 !== h; ) {
                    switch (h) {
                        case 16656:
                            var g = a(e, t)
                                , P = [];
                            for (s = 0; s < g; s++)
                                P.push(R(e, t), R(e, t), R(e, t));
                            break;
                        case 16672:
                            c(e),
                                o = p(e, t, _);
                            break;
                        case 16704:
                            var v = a(e, t);
                            for (m = [],
                                     s = 0; s < v; s++)
                                m.push(R(e, t)),
                                    m.push(1 - R(e, t));
                            break;
                        case 16736:
                            var y = [];
                            for (s = 0; s < 12; s++)
                                y[s] = R(e, t);
                            var E = mat4.create();
                            E[0] = y[0],
                                E[1] = y[6],
                                E[2] = y[3],
                                E[3] = y[9],
                                E[4] = y[2],
                                E[5] = y[8],
                                E[6] = y[5],
                                E[7] = y[11],
                                E[8] = y[1],
                                E[9] = y[7],
                                E[10] = y[4],
                                E[11] = y[10],
                                E[12] = 0,
                                E[13] = 0,
                                E[14] = 0,
                                E[15] = 1
                    }
                    h = n(e, t, f)
                }
                i(e, f);
                var M = RedGLUtil.calculateNormals(P, o)
                    , b = [];
                for (s = 0,
                         d = P.length / 3; s < d; s++)
                    b.push(P[3 * s + 0], P[3 * s + 1], P[3 * s + 2]),
                        b.push(M[3 * s + 0], M[3 * s + 1], M[3 * s + 2]),
                    m.length && b.push(m[2 * s + 0], m[2 * s + 1]);
                var L = [];
                L.push(RedInterleaveInfo("aVertexPosition", 3)),
                    L.push(RedInterleaveInfo("aVertexNormal", 3)),
                m.length && L.push(RedInterleaveInfo("aTexcoord", 2)),
                    l = RedBuffer(e.redGL, "testRed3DS", RedBuffer.ARRAY_BUFFER, new Float32Array(b), L),
                    u = RedBuffer(e.redGL, "testRed3DS", RedBuffer.ELEMENT_ARRAY_BUFFER, new Uint16Array(o));
                var T = RedGeometry(l, u);
                return _.geometry = T,
                    _.name = "mesh" + RedGL.makeUUID(),
                    _.matrix = E,
                    _
            }
            ,
            m = function(e, t) {
                var a = r(e, t)
                    , o = s(e, t, 64);
                a.cur = e.position;
                for (var d, l = n(e, t, a); 0 !== l; )
                    16640 === l && (c(e),
                        (d = h(e, t)).name = o,
                        e.meshs.push(d)),
                        l = n(e, t, a);
                i(e, a)
            }
            ,
            t = function(e, t, i) {
                var a = new DataView(t)
                    , o = r(e, a);
                if (15786 === o.id || 49725 === o.id || 19789 === o.id)
                    for (var s = n(e, a, o); 0 !== s; ) {
                        switch (s) {
                            case 2:
                                break;
                            case 15677:
                                c(e),
                                    f(e, a, i)
                        }
                        s = n(e, a, o)
                    }
            }
            ,
            e = function(e, r, n) {
                return t(e, n, e.path),
                    e.meshs.forEach(function(t) {
                        e.resultMesh.addChild(t)
                    }),
                    {
                        fileName: e.fileName,
                        path: e.path,
                        resultMesh: e.resultMesh
                    }
            }
            ,
            Object.freeze(Red3DSLoader)
    }(),
    function() {
        var e, t, r, n, i, a, o;
        RedDAELoader = function(t, r, n, i) {
            if (!(this instanceof RedDAELoader))
                return new RedDAELoader(t,r,n,i);
            var a = r + n
                , o = this
                , s = new XMLHttpRequest;
            s.open("GET", a, !0),
                s.setRequestHeader("Content-Type", "application/xml; charset=UTF-8"),
                s.onreadystatechange = function() {
                    if (4 === s.readyState && 200 === s.status) {
                        var r = new DOMParser;
                        o.result = e(o, t, r.parseFromString(s.responseText, "text/xml")),
                        i && i(o.result)
                    }
                }
                ,
                s.send(),
                this.path = r,
                this.fileName = n,
                this.callback = i,
                this.resultMesh = RedMesh(t),
                this.resultMesh.name = "instanceOfRedDAELoader_" + RedGL.makeUUID(),
                this.result = null
        }
            ,
            n = function(e) {
                var t, r, n, i, a, o, s, d = [], l = [], u = [];
                for (a = (i = e[0].querySelector("float_array")) ? i.textContent.split(" ").map(Number) : null,
                         o = (i = e[1].querySelector("float_array")) ? i.textContent.split(" ").map(Number) : null,
                         s = (i = e[2].querySelector("float_array")) ? i.textContent.split(" ").map(Number) : null,
                         t = 0,
                         r = a.length / 3; t < r; t++)
                    n = 3 * t,
                        d.push([a[n], a[n + 1], a[n + 2]]);
                if (o)
                    for (t = 0,
                             r = o.length / 3; t < r; t++)
                        n = 3 * t,
                            l.push([o[n], o[n + 1], o[n + 2]]);
                if (s)
                    for (t = 0,
                             r = s.length / 2; t < r; t++)
                        n = 2 * t,
                            u.push([s[n], 1 - s[n + 1]]);
                return {
                    pointList: d,
                    normalPointList: l,
                    uvPointList: u
                }
            }
            ,
            i = function(e, t, r) {
                var n = {};
                return r.querySelectorAll("library_images image").forEach(function(r) {
                    n[r.getAttribute("id")] = RedBitmapTexture(e, t.path + r.querySelector("init_from").textContent)
                }),
                    n
            }
            ,
            a = function(e, t) {
                var r = {};
                return e.querySelectorAll("library_effects effect").forEach(function(e) {
                    e.querySelector("newparam init_from") && (r[e.getAttribute("id")] = {
                        texture: t[e.querySelector("newparam init_from").textContent]
                    })
                }),
                    r
            }
            ,
            o = function(e, t) {
                var r = {};
                return e.querySelectorAll("library_materials material").forEach(function(e) {
                    r[e.getAttribute("id")] = {
                        effect: t[e.querySelector("instance_effect").getAttribute("url").replace("#", "")]
                    }
                }),
                    r
            }
            ,
            t = function(e, t, r) {
                var n = i(e, t, r)
                    , s = a(r, n);
                return {
                    textureMap: n,
                    effectMap: s,
                    materialMap: o(r, s)
                }
            }
            ,
            r = function(e, r, i) {
                i.querySelectorAll("library_geometries geometry mesh").forEach(function(a) {
                    var o, s, d;
                    o = a.querySelectorAll("source"),
                        s = n(o),
                        d = t(r, e, i);
                    var l = a.querySelectorAll("source").length;
                    a.querySelectorAll("polylist").forEach(function(t) {
                        var n, i, a, o, u = [], c = t.querySelector("p").textContent.split(" "), f = [], h = [], R = [], m = [];
                        c.forEach(function(e, t) {
                            t % l == 0 ? f.push(+e) : t % l == 1 ? h.push(+e) : t % l == 2 && R.push(+e)
                        });
                        var p = {};
                        if (f.forEach(function(e, t) {
                            u[o = 8 * e] = s.pointList[e][0],
                                u[o + 1] = s.pointList[e][1],
                                u[o + 2] = s.pointList[e][2],
                            p[e] || (p[e] = []),
                                p[e].push(t),
                                u[o + 3] = s.normalPointList[h[t]][0],
                                u[o + 4] = s.normalPointList[h[t]][1],
                                u[o + 5] = s.normalPointList[h[t]][2],
                                u[o + 6] = s.uvPointList[R[t]][0],
                                u[o + 7] = s.uvPointList[R[t]][1],
                                m.push(e)
                        }),
                            n = RedBuffer(r, "daeInterleaveBuffer" + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, new Float32Array(u), [RedInterleaveInfo("aVertexPosition", 3), RedInterleaveInfo("aVertexNormal", 3), RedInterleaveInfo("aTexcoord", 2)]),
                            i = RedBuffer(r, "daeIndexData" + RedGL.makeUUID(), RedBuffer.ELEMENT_ARRAY_BUFFER, new Uint16Array(m)),
                            (a = RedMesh(r)).geometry = RedGeometry(n, i),
                            d.materialMap[t.getAttribute("material")].effect) {
                            var _ = d.materialMap[t.getAttribute("material")].effect.texture;
                            a.material = RedStandardMaterial(r, _)
                        } else
                            a.material = RedColorPhongMaterial(r);
                        e.resultMesh.addChild(a)
                    })
                })
            }
            ,
            e = function(e, t, n) {
                return r(e, t, n),
                    {
                        fileName: e.fileName,
                        path: e.path,
                        resultMesh: e.resultMesh
                    }
            }
            ,
            Object.freeze(RedDAELoader)
    }(),
    function() {
        var e, t, r = {
            5120: Int8Array,
            5121: Uint8Array,
            5122: Int16Array,
            5123: Uint16Array,
            5125: Uint32Array,
            5126: Float32Array
        }, n = (t = {},
                function(e, r, n, i) {
                    if (t[e])
                        requestAnimationFrame(function() {
                            n(t[e])
                        });
                    else {
                        var a = new XMLHttpRequest;
                        a.open("GET", e, !0),
                            a.onreadystatechange = function(r) {
                                4 === a.readyState && 200 === a.status ? (t[e] = a,
                                    n(a)) : i(a, r)
                            }
                            ,
                            a.send()
                    }
                }
        ), i = function() {
            var e = {};
            return function(t, r, n) {
                if (e[t])
                    requestAnimationFrame(function() {
                        r(e[t])
                    });
                else {
                    var i = new XMLHttpRequest;
                    i.open("GET", t, !0),
                        i.overrideMimeType("application/octet-stream"),
                        i.responseType = "arraybuffer",
                        i.onreadystatechange = function(a) {
                            4 === i.readyState && 200 === i.status ? (e[t] = i,
                                r(i)) : n(i, a)
                        }
                        ,
                        i.send()
                }
            }
        }();
        RedGLTFLoader = function(t, r, o, s, d, l) {
            if (!(this instanceof RedGLTFLoader))
                return new RedGLTFLoader(t,r,o,s,d,l);
            var u = this;
            if (o.indexOf(".glb") > -1) {
                var c;
                c = function(e) {
                    var t = "";
                    return e.map(function(e) {
                        t += String.fromCharCode(e)
                    }),
                        t
                }
                    ,
                    i(r + o, function(r) {
                        for (var n = null, i = null, a = null, o = null, d = 0, l = 0, f = null, h = new DataView(r.response,12), R = (c(new Uint8Array(r.response,0,4)),
                            h.getUint32(4, !0),
                            h.getUint32(8, !0),
                            new DataView(r.response,12)); d < R.byteLength; )
                            l = R.getUint32(d, !0),
                                d += 4,
                                f = R.getUint32(d, !0),
                                d += 4,
                                1313821514 === f ? (i = new Uint8Array(r.response,12 + d,l),
                                    n = c(i)) : 5130562 === f && (o = 12 + d,
                                    a = r.response.slice(o, o + l)),
                                d += l;
                        if (null === n)
                            throw new Error("JSON content not found");
                        var m = JSON.parse(n)
                            , p = a;
                        m.images && m.images.forEach(function(e) {
                            if ("image/png" === e.mimeType || "image/jpeg" === e.mimeType || "image/gif" === e.mimeType) {
                                var t;
                                t = m.bufferViews[e.bufferView].byteOffset || 0;
                                var r = p.slice(t, t + m.bufferViews[e.bufferView].byteLength)
                                    , n = new Blob([new Uint8Array(r)],{
                                    type: e.mimeType
                                });
                                e.uri = URL.createObjectURL(n)
                            }
                        }),
                            e(u, t, m, function() {
                                s && s(u)
                            }, p)
                    }, function(e, t) {})
            } else
                n(r + o, null, function(r) {
                    e(u, t, JSON.parse(r.response), function() {
                        s && s(u)
                    })
                }, function(e, t) {});
            this.redGL = t,
                this.path = r,
                this.fileName = o,
                this.resultMesh = RedMesh(t),
                this.resultMesh.name = "instanceOfRedGLTFLoader_" + RedGL.makeUUID(),
                this.parsingResult = {
                    groups: [],
                    materials: [],
                    uris: {
                        buffers: []
                    },
                    textures: {},
                    cameras: [],
                    animations: []
                },
                this.parsingOption = l,
                this.environmentTexture = d || null;
            var f = null;
            this.stopAnimation = function() {
                a.indexOf(f) > -1 && a.splice(a.indexOf(f), 1)
            }
                ,
                this.playAnimation = function(e) {
                    a.push(f = {
                        startTime: performance.now(),
                        targetAnimationData: e
                    })
                }
        }
            ,
            RedDefinePropertyInfo.definePrototype("RedGLTFLoader", "environmentTexture", "samplerCube", {
                callback: function(e) {
                    this.parsingResult.materials.forEach(function(t) {
                        "environmentTexture"in t && (t.environmentTexture = e)
                    })
                }
            });
        var a = [];
        RedGLTFLoader.animationLooper = function(e) {
            for (var t, r, n, i, o, s, d, l, u, c, f, h, R, m, p, _, g, P, v, y, E = a.length; E--; )
                for (i = null,
                         o = null,
                         s = null,
                         d = null,
                         R = (c = (h = a[E]).targetAnimationData).length; R--; ) {
                    for (m = c[R],
                             t = (e - h.startTime) % (1e3 * c.maxTime) / 1e3,
                             p = m.target,
                             P = m.time,
                             Xe = m.time,
                             v = P.length,
                             y = 0,
                             g = P.length - 1,
                             _ = 0,
                             r = P[g],
                             n = P[_]; y < v; y++) {
                        var M = P[y];
                        if (M < t && (r = P[g = y],
                            n = null == P[g + 1] ? P[_ = 0] : P[_ = g + 1]),
                        0 == y && t < P[y]) {
                            r = P[g = v - 1],
                                n = P[_ = y],
                                t = M;
                            break
                        }
                        if (y == v - 1 && t > M) {
                            r = P[g = 0],
                                n = P[_ = v - 1],
                                t = M;
                            break
                        }
                    }
                    if ("CUBICSPLINE" == m.interpolation) {
                        "NaN" == (f = n - r).toString() && (f = 0);
                        var b = (t - r) / f;
                        "NaN" == b.toString() && (b = 0);
                        var L = b * b
                            , T = L * b
                            , x = -2 * T + 3 * L
                            , I = T - L
                            , w = 1 - x
                            , D = I - L + b;
                        if (p) {
                            var U, B, G, S;
                            if ("translation" == m.key) {
                                d = [m.data[9 * g + 3], m.data[9 * g + 4], m.data[9 * g + 5]],
                                    s = [m.data[9 * _ + 3], m.data[9 * _ + 4], m.data[9 * _ + 5]];
                                var A = [m.data[9 * g + 6], m.data[9 * g + 7], m.data[9 * g + 8]]
                                    , F = [m.data[9 * _ + 0], m.data[9 * _ + 1], m.data[9 * _ + 2]];
                                U = s[0],
                                g != v - 1 && (B = A[0] * f,
                                    G = d[0],
                                    S = F[0] * f,
                                    p.x = w * U + D * B + x * G + I * S,
                                    U = s[1],
                                    B = A[1] * f,
                                    G = d[1],
                                    S = F[1] * f,
                                    p.y = w * U + D * B + x * G + I * S,
                                    U = s[2],
                                    B = A[2] * f,
                                    G = d[2],
                                    S = F[2] * f,
                                    p.z = w * U + D * B + x * G + I * S)
                            }
                            if ("rotation" == m.key) {
                                o = [m.data[12 * _ + 4], m.data[12 * _ + 5], m.data[12 * _ + 6], m.data[12 * _ + 7]],
                                    i = [m.data[12 * g + 4], m.data[12 * g + 5], m.data[12 * g + 6], m.data[12 * g + 7]];
                                var C = [m.data[12 * g + 8], m.data[12 * g + 9], m.data[12 * g + 10], m.data[12 * g + 11]]
                                    , O = [m.data[12 * _ + 0], m.data[12 * _ + 1], m.data[12 * _ + 2], m.data[12 * _ + 3]];
                                quat.normalize(i, i),
                                    quat.normalize(o, o),
                                    quat.normalize(C, C),
                                    quat.normalize(O, O);
                                var N = [];
                                if (g != v - 1) {
                                    U = i[0],
                                        B = C[0] * f,
                                        G = o[0],
                                        S = O[0] * f,
                                        N[0] = w * U + D * B + x * G + I * S,
                                        U = i[1],
                                        B = C[1] * f,
                                        G = o[1],
                                        S = O[1] * f,
                                        N[1] = w * U + D * B + x * G + I * S,
                                        U = i[2],
                                        B = C[2] * f,
                                        G = o[2],
                                        S = O[2] * f,
                                        N[2] = w * U + D * B + x * G + I * S,
                                        U = i[3],
                                        B = C[3] * f,
                                        G = o[3],
                                        S = O[3] * f,
                                        N[3] = w * U + D * B + x * G + I * S;
                                    var k = []
                                        , Y = [0, 0, 0];
                                    RedGLUtil.quaternionToRotationMat4(N, k),
                                        RedGLUtil.mat4ToEuler(k, Y),
                                        Y[0] = -180 * Y[0] / Math.PI,
                                        Y[1] = -180 * Y[1] / Math.PI,
                                        Y[2] = -180 * Y[2] / Math.PI,
                                        p.rotationX = Y[0],
                                        p.rotationY = Y[1],
                                        p.rotationZ = Y[2]
                                }
                            }
                            if ("scale" == m.key) {
                                u = [m.data[9 * g + 3], m.data[9 * g + 4], m.data[9 * g + 5]],
                                    l = [m.data[9 * _ + 3], m.data[9 * _ + 4], m.data[9 * _ + 5]];
                                var X = [m.data[9 * g + 6], m.data[9 * g + 7], m.data[9 * g + 8]]
                                    , j = [m.data[9 * _ + 0], m.data[9 * _ + 1], m.data[9 * _ + 2]];
                                U = l[0],
                                g != v - 1 && (B = X[0] * f,
                                    G = u[0],
                                    S = j[0] * f,
                                    p.scaleX = w * U + D * B + x * G + I * S,
                                    U = l[1],
                                    B = X[1] * f,
                                    G = u[1],
                                    S = j[1] * f,
                                    p.scaleY = w * U + D * B + x * G + I * S,
                                    U = l[2],
                                    B = X[2] * f,
                                    G = u[2],
                                    S = j[2] * f,
                                    p.scaleZ = w * U + D * B + x * G + I * S)
                            }
                            "weights" == m.key && m.targets.forEach(function(e) {
                                for (var t, r, n, i, a, o, s, d = e.geometry.interleaveBuffer.data, l = e._morphInfo.origin, u = e.geometry.interleaveBuffer.stride, c = 0, h = d.length / u, R = e._morphInfo.list.length, p = m.data, P = e._morphInfo.list; c < h; c++) {
                                    t = l[s = c * u],
                                        r = l[s],
                                        n = l[s + 1],
                                        i = l[s + 1],
                                        a = l[s + 2],
                                        o = l[s + 2];
                                    for (var v, y, E, M = R; M--; )
                                        M % 3 == 1 && (v = p[g * R + M],
                                            y = p[_ * R + M],
                                            t += v * (E = P[M].interleaveData)[s],
                                            r += y * E[s],
                                            n += v * E[s + 1],
                                            i += y * E[s + 1],
                                            a += v * E[s + 2],
                                            o += y * E[s + 2]);
                                    d[s] = t + f * (r - t),
                                        d[s + 1] = n + f * (i - n),
                                        d[s + 2] = a + f * (o - a)
                                }
                                e.geometry.interleaveBuffer.upload(d)
                            })
                        }
                    } else if ("NaN" == (f = "STEP" == m.interpolation ? 0 : (t - r) / (n - r)).toString() && (f = 0),
                        p) {
                        var z = m.data;
                        switch (m.key) {
                            case "rotation":
                                var V, Z, W, H, q, J, K, Q, $, ee, te, re, ne, ie, ae, oe, se, de;
                                (q = (V = z[4 * g]) * V + (Z = z[4 * g + 1]) * Z + (W = z[4 * g + 2]) * W + (H = z[4 * g + 3]) * H) > 0 && (q = 1 / Math.sqrt(q)),
                                    J = V * q,
                                    K = Z * q,
                                    Q = W * q,
                                    $ = H * q,
                                (q = (V = z[4 * _]) * V + (Z = z[4 * _ + 1]) * Z + (W = z[4 * _ + 2]) * W + (H = z[4 * _ + 3]) * H) > 0 && (q = 1 / Math.sqrt(q)),
                                (ae = J * (ee = V * q) + K * (te = Z * q) + Q * (re = W * q) + $ * (ne = H * q)) < 0 && (ae = -ae,
                                    ee = -ee,
                                    te = -te,
                                    re = -re,
                                    ne = -ne),
                                    1 - ae > glMatrix.EPSILON ? (ie = Math.acos(ae),
                                        oe = Math.sin(ie),
                                        se = Math.sin((1 - f) * ie) / oe,
                                        de = Math.sin(f * ie) / oe) : (se = 1 - f,
                                        de = f);
                                Y = [0, 0, 0];
                                var le = (V = se * J + de * ee) + V
                                    , ue = (Z = se * K + de * te) + Z
                                    , ce = (W = se * Q + de * re) + W
                                    , fe = V * le
                                    , he = V * ue
                                    , Re = V * ce
                                    , me = Z * ue
                                    , pe = Z * ce
                                    , _e = W * ce
                                    , ge = (H = se * $ + de * ne) * le
                                    , Pe = H * ue
                                    , ve = H * ce;
                                (k = [])[0] = 1 - (me + _e),
                                    k[4] = he - ve,
                                    k[8] = Re + Pe,
                                    k[1] = he + ve,
                                    k[5] = 1 - (fe + _e),
                                    k[9] = pe - ge,
                                    k[2] = Re - Pe,
                                    k[6] = pe + ge,
                                    k[10] = 1 - (fe + me),
                                    k[3] = 0,
                                    k[7] = 0,
                                    k[11] = 0,
                                    k[12] = 0,
                                    k[13] = 0,
                                    k[14] = 0,
                                    k[15] = 1;
                                var ye = k[0]
                                    , Ee = k[4]
                                    , Me = k[8]
                                    , be = (k[1],
                                    k[5])
                                    , Le = k[9]
                                    , Te = (k[2],
                                    k[6])
                                    , xe = k[10];
                                Y[1] = Math.asin(Math.max(-1, Math.min(1, Me))),
                                    Math.abs(Me) < .99999 ? (Y[0] = Math.atan2(-Le, xe),
                                        Y[2] = Math.atan2(-Ee, ye)) : (Y[0] = Math.atan2(Te, be),
                                        Y[2] = 0),
                                    Y[0] = -180 * Y[0] / Math.PI,
                                    Y[1] = -180 * Y[1] / Math.PI,
                                    Y[2] = -180 * Y[2] / Math.PI,
                                    p.rotationX = Y[0],
                                    p.rotationY = Y[1],
                                    p.rotationZ = Y[2];
                                break;
                            case "translation":
                                d = [z[3 * _], z[3 * _ + 1], z[3 * _ + 2]],
                                    s = [z[3 * g], z[3 * g + 1], z[3 * g + 2]],
                                    p.x = s[0] + f * (d[0] - s[0]),
                                    p.y = s[1] + f * (d[1] - s[1]),
                                    p.z = s[2] + f * (d[2] - s[2]);
                                break;
                            case "scale":
                                u = [z[3 * _], z[3 * _ + 1], z[3 * _ + 2]],
                                    l = [z[3 * g], z[3 * g + 1], z[3 * g + 2]],
                                    p.scaleX = l[0] + f * (u[0] - l[0]),
                                    p.scaleY = l[1] + f * (u[1] - l[1]),
                                    p.scaleZ = l[2] + f * (u[2] - l[2]);
                                break;
                            case "weights":
                                for (var Ie, we, De, Ue, Be, Ge, Se, Ae, Fe, Ce, Oe, Ne, ke, Ye, Xe, je, ze, Ve, Ze, We, He = m.targets.length; He--; ) {
                                    var qe, Je;
                                    for (we = (Ie = m.targets[He]).geometry.interleaveBuffer.data,
                                             De = Ie._morphInfo.origin,
                                             Ue = Ie.geometry.interleaveBuffer.stride,
                                             y = 0,
                                             Ge = we.length / Ue,
                                             Ye = Ie._morphInfo.list.length,
                                             Xe = m.data,
                                         (je = Ie._morphInfo.list).cacheData || (je.cacheData = {}),
                                             Be = 0; Be < Ge; Be++) {
                                        if (ke = Be * Ue,
                                            qe = je.cacheData[ke + "_" + g + "_" + _])
                                            Se = qe[0],
                                                Ae = qe[1],
                                                Fe = qe[2],
                                                Ce = qe[3],
                                                Oe = qe[4],
                                                Ne = qe[5];
                                        else {
                                            for (Se = De[ke],
                                                     Ae = De[ke],
                                                     Fe = De[ke + 1],
                                                     Ce = De[ke + 1],
                                                     Oe = De[ke + 2],
                                                     Ne = De[ke + 2],
                                                     ze = Ye; ze--; )
                                                Ve = Xe[g * Ye + ze],
                                                    Ze = Xe[_ * Ye + ze],
                                                    Se += Ve * (Je = (We = je[ze].interleaveData)[ke]),
                                                    Ae += Ze * Je,
                                                    Fe += Ve * (Je = We[ke + 1]),
                                                    Ce += Ze * Je,
                                                    Oe += Ve * (Je = We[ke + 2]),
                                                    Ne += Ze * Je;
                                            je.cacheData[ke + "_" + g + "_" + _] = [Se, Ae, Fe, Ce, Oe, Ne]
                                        }
                                        we[ke] = Se + f * (Ae - Se),
                                            we[ke + 1] = Fe + f * (Ce - Fe),
                                            we[ke + 2] = Oe + f * (Ne - Oe)
                                    }
                                    Ie.geometry.interleaveBuffer.upload(we)
                                }
                        }
                    }
                }
        }
            ,
            e = function() {
                var e, t, n, a, o, s, d, l, u, c, f, h, R, m;
                e = function(e) {
                    void 0 === e.asset && RedGLUtil.throwFunc("RedGLTFLoader - asset은 반드시 정의되어야함"),
                    e.asset.version[0] < 2 && RedGLUtil.throwFunc("RedGLTFLoader - asset의 버전은 2.0이상이어야함")
                }
                    ,
                    n = function(e, t, r) {
                        var n = 0
                            , a = 0
                            , o = [];
                        t.buffers.forEach(function(e, t) {
                            e._redURIkey = "buffers",
                                e._redURIIndex = t,
                                o.push(e)
                        }),
                            o.forEach(function(t) {
                                if (n++,
                                t.uri instanceof ArrayBuffer)
                                    a++,
                                        e.parsingResult.uris[t._redURIkey][t._redURIIndex] = new DataView(t.uri),
                                    a == n && r && r();
                                else {
                                    var o = "data:" == t.uri.substr(0, 5) ? t.uri : e.path + t.uri;
                                    i(o, function(i) {
                                        a++,
                                            e.parsingResult.uris[t._redURIkey][t._redURIIndex] = new DataView(i.response),
                                        a == n && r && r()
                                    }, function(e, t) {})
                                }
                            })
                    }
                    ,
                    t = function(e, t, r) {
                        n(e, t, r)
                    }
                    ,
                    l = function(e, t) {
                        t.cameras && t.cameras.forEach(function(t) {
                            var r = RedCamera();
                            "orthographic" == t.type ? r.mode2DYn = !0 : (r.fov = 180 * t.perspective.yfov / Math.PI,
                                r.farClipping = t.perspective.zfar,
                                r.nearClipping = t.perspective.znear),
                                e.parsingResult.cameras.push(r)
                        })
                    }
                    ,
                    a = function(e, t, r) {
                        var n, i, a, o;
                        a = t.scenes[0].nodes,
                            n = 0,
                            i = a.length;
                        var s = function() {
                            o = a[n],
                                d(e, t, o, t.nodes[o], e.resultMesh),
                                ++n === i ? r && r() : requestAnimationFrame(s)
                        };
                        requestAnimationFrame(s)
                    }
                    ,
                    f = mat4.create(),
                    h = [0, 0, 0],
                    R = [],
                    m = [],
                    u = function(e, t) {
                        "matrix"in t && (c = t.matrix,
                            RedGLUtil.mat4ToEuler(c, h),
                            e.rotationX = -180 * h[0] / Math.PI,
                            e.rotationY = -180 * h[1] / Math.PI,
                            e.rotationZ = -180 * h[2] / Math.PI,
                            e.x = c[12],
                            e.y = c[13],
                            e.z = c[14],
                            mat4.getScaling(m, c),
                            e.scaleX = m[0],
                            e.scaleY = m[1],
                            e.scaleZ = m[2]),
                        "rotation"in t && (R = t.rotation,
                            RedGLUtil.quaternionToRotationMat4(R, f),
                            RedGLUtil.mat4ToEuler(f, h),
                            e.rotationX = -180 * h[0] / Math.PI,
                            e.rotationY = -180 * h[1] / Math.PI,
                            e.rotationZ = -180 * h[2] / Math.PI),
                        "translation"in t && (e.x = t.translation[0],
                            e.y = t.translation[1],
                            e.z = t.translation[2]),
                        "scale"in t && (e.scaleX = t.scale[0],
                            e.scaleY = t.scale[1],
                            e.scaleZ = t.scale[2])
                    }
                ;
                var p = function(e, t, r, n) {
                    if (i = r[n].RedMesh) {
                        var i = r[n].RedMesh;
                        t.joints.push(i),
                            i.material = RedColorMaterial(e.redGL, "#ff0000"),
                            i.drawMode = e.redGL.gl.LINE_LOOP,
                            i.depthTestFunc = e.redGL.gl.NEVER
                    } else
                        requestAnimationFrame(function() {
                            p(e, t, r, n)
                        })
                }
                    , _ = function(e, t, r, n) {
                    var i = {
                        joints: [],
                        inverseBindMatrices: []
                    }
                        , a = t.nodes;
                    r.joints.forEach(function(t) {
                        p(e, i, a, t)
                    }),
                    r.skeleton && (i.skeleton = t.nodes[r.skeleton].RedMesh);
                    var o, s = r.inverseBindMatrices, d = new E(e,t,s), l = d.componentType_BYTES_PER_ELEMENT, u = d.bufferViewByteStride, c = d.bufferURIDataView, f = d.getMethod, h = d.accessor.type, R = d.accessor.count, m = 0, _ = u / l, g = d.startIndex;
                    switch (h) {
                        case "MAT4":
                            if (u)
                                for (o = g + R * (u / l); g < o; g++)
                                    m % _ < 16 && i.inverseBindMatrices.push(c[f](g * l, !0)),
                                        m++;
                            else
                                for (o = g + 16 * R; g < o; g++)
                                    i.inverseBindMatrices.push(c[f](g * l, !0)),
                                        m++
                    }
                    i.inverseBindMatrices = new Float32Array(i.inverseBindMatrices),
                        n.skinInfo = i
                };
                d = function(e, t, r, n, i) {
                    if ("mesh"in n) {
                        var a = n.mesh;
                        o(e, t, t.meshes[a]).forEach(function(r) {
                            n.RedMesh = r,
                                i.addChild(r),
                                u(r, n),
                            "children"in n && n.children.forEach(function(n) {
                                d(e, t, n, t.nodes[n], r)
                            }),
                            "skin"in n && requestAnimationFrame(function() {
                                _(e, t, t.skins[n.skin], r)
                            })
                        })
                    } else {
                        var s;
                        if (e.parsingResult.groups[r] ? (s = e.parsingResult.groups[r],
                            n.RedMesh = s) : (s = RedMesh(e.redGL),
                            i.addChild(s),
                            n.RedMesh = s,
                            e.parsingResult.groups[r] = s,
                            e.parsingResult.groups[r].name = n.name),
                            u(s, n),
                        "camera"in n) {
                            e.parsingResult.cameras[n.camera]._parentMesh = i,
                                e.parsingResult.cameras[n.camera]._targetMesh = s;
                            var l = RedMesh(e.redGL);
                            s.addChild(l),
                                e.parsingResult.cameras[n.camera]._cameraMesh = l
                        }
                        "children"in n && n.children.forEach(function(r) {
                            d(e, t, r, t.nodes[r], s)
                        }),
                        "skin"in n && requestAnimationFrame(function() {
                            _(e, t, t.skins[n.skin], s)
                        })
                    }
                }
                ;
                var g, P, v, y = function(e, t, n, i, a, o, s, d, l, u) {
                    if (n.sparse) {
                        var c = []
                            , f = []
                            , h = [];
                        !function() {
                            var a, o, s, d, l, u = n.sparse, R = u.values, m = i.bufferViews[R.bufferView], p = m.buffer;
                            i.buffers[p].uri && (a = e.parsingResult.uris.buffers[p]),
                            (d = r[n.componentType]) == Float32Array && (l = "getFloat32"),
                            d == Uint32Array && (l = "getUint32"),
                            d == Uint16Array && (l = "getUint16"),
                            d == Int16Array && (l = "getInt16"),
                            d == Uint8Array && (l = "getUint8"),
                            d == Int8Array && (l = "getInt8");
                            var _ = n.byteOffset || 0;
                            switch (o = ((m.byteOffset || 0) + _) / d.BYTES_PER_ELEMENT,
                                n.type) {
                                case "VEC3":
                                    for (s = o + d.BYTES_PER_ELEMENT * u.count / d.BYTES_PER_ELEMENT * 3; o < s; o++)
                                        "NORMAL" == t ? f.push(a[l](o * d.BYTES_PER_ELEMENT, !0)) : "POSITION" == t && c.push(a[l](o * d.BYTES_PER_ELEMENT, !0));
                                    break;
                                case "VEC2":
                                    for (s = o + d.BYTES_PER_ELEMENT * u.count / d.BYTES_PER_ELEMENT * 2; o < s; o++)
                                        "TEXCOORD_0" == t && h.push(a[l](o * d.BYTES_PER_ELEMENT, !0))
                            }
                        }();
                        var R, m, p, _, g, P = n.sparse, v = P.indices, y = i.bufferViews[v.bufferView], E = y.buffer;
                        i.buffers[E].uri && (R = e.parsingResult.uris.buffers[E]),
                            (_ = r[v.componentType]) == Uint16Array ? g = "getUint16" : _ == Uint8Array && (g = "getUint8");
                        var M = v.byteOffset || 0;
                        p = (m = ((y.byteOffset || 0) + M) / _.BYTES_PER_ELEMENT) + _.BYTES_PER_ELEMENT * P.count / _.BYTES_PER_ELEMENT;
                        for (var b = 0; m < p; m++) {
                            var L = R[g](m * _.BYTES_PER_ELEMENT, !0);
                            a[3 * L] = c[3 * b],
                                a[3 * L + 1] = c[3 * b + 1],
                                a[3 * L + 2] = c[3 * b + 2],
                                b++
                        }
                    }
                }, E = function(e, t, n) {
                    switch (this.accessor = t.accessors[n],
                        this.bufferView = t.bufferViews[this.accessor.bufferView],
                        this.bufferIndex = this.bufferView.buffer,
                        this.buffer = t.buffers[this.bufferIndex],
                        this.bufferURIDataView = null,
                    this.buffer.uri && (this.bufferURIDataView = e.parsingResult.uris.buffers[this.bufferIndex]),
                        this.componentType = r[this.accessor.componentType],
                        this.componentType_BYTES_PER_ELEMENT = this.componentType.BYTES_PER_ELEMENT,
                        this.componentType) {
                        case Float32Array:
                            this.getMethod = "getFloat32";
                            break;
                        case Uint32Array:
                            this.getMethod = "getUint32";
                            break;
                        case Uint16Array:
                            this.getMethod = "getUint16";
                            break;
                        case Int16Array:
                            this.getMethod = "getInt16";
                            break;
                        case Uint8Array:
                            this.getMethod = "getUint8";
                            break;
                        case Int8Array:
                            this.getMethod = "getInt8";
                            break;
                        default:
                            RedGLUtil.throwFunc("파싱할수없는 타입", this.componentType)
                    }
                    this.accessorBufferOffset = this.accessor.byteOffset || 0,
                        this.bufferViewOffset = this.bufferView.byteOffset || 0,
                        this.bufferViewByteStride = this.bufferView.byteStride || 0,
                        this.startIndex = (this.bufferViewOffset + this.accessorBufferOffset) / this.componentType_BYTES_PER_ELEMENT
                }, M = function(e, t, r, n, i, a, o, s, d, l, u, c) {
                    var f, h = n.componentType_BYTES_PER_ELEMENT, R = n.bufferViewByteStride, m = n.bufferURIDataView, p = n.getMethod, _ = n.accessor.type, g = n.accessor.count, P = 0, v = R / h, y = n.startIndex;
                    switch (_) {
                        case "VEC4":
                            if (R)
                                for (f = y + g * (R / h); y < f; y++)
                                    P % v < 4 && ("WEIGHTS_0" == r ? d.push(m[p](y * h, !0)) : "JOINTS_0" == r ? l.push(m[p](y * h, !0)) : "COLOR_0" == r ? u.push(m[p](y * h, !0)) : "TANGENT" == r && c.push(m[p](y * h, !0))),
                                        P++;
                            else
                                for (f = y + 4 * g; y < f; y++)
                                    "WEIGHTS_0" == r ? d.push(m[p](y * h, !0)) : "JOINTS_0" == r ? l.push(m[p](y * h, !0)) : "COLOR_0" == r ? u.push(m[p](y * h, !0)) : "TANGENT" == r && c.push(m[p](y * h, !0)),
                                        P++;
                            break;
                        case "VEC3":
                            if (R)
                                for (f = y + g * (R / h); y < f; y++)
                                    P % v < 3 && ("NORMAL" == r ? s.push(m[p](y * h, !0)) : "POSITION" == r ? i.push(m[p](y * h, !0)) : "COLOR_0" == r && (u.push(m[p](y * h, !0)),
                                    P % v == 2 && u.push(1))),
                                        P++;
                            else
                                for (f = y + 3 * g; y < f; y++)
                                    "NORMAL" == r ? s.push(m[p](y * h, !0)) : "POSITION" == r ? i.push(m[p](y * h, !0)) : "COLOR_0" == r && (u.push(m[p](y * h, !0)),
                                    P % 3 == 2 && u.push(1)),
                                        P++;
                            break;
                        case "VEC2":
                            if (R)
                                for (f = y + g * (R / h); y < f; y++)
                                    P % v < 2 && ("TEXCOORD_0" == r ? a.push(m[p](y * h, !0)) : "TEXCOORD_1" == r ? o.push(m[p](y * h, !0)) : RedGLUtil.throwFunc("VEC2에서 현재 지원하고 있지 않는 키", r)),
                                        P++;
                            else
                                for (f = y + 2 * g; y < f; y++)
                                    "TEXCOORD_0" == r ? a.push(m[p](y * h, !0)) : "TEXCOORD_1" == r ? o.push(m[p](y * h, !0)) : RedGLUtil.throwFunc("VEC2에서 현재 지원하고 있지 않는 키", r),
                                        P++
                    }
                }, b = function(e, t, r, n) {
                    var i = [];
                    r.targets && r.targets.forEach(function(r) {
                        var n = {
                            vertices: [],
                            verticesColor_0: [],
                            normals: [],
                            uvs: [],
                            uvs1: [],
                            jointWeights: [],
                            joints: [],
                            tangents: []
                        };
                        for (var a in i.push(n),
                            r) {
                            var o = n.vertices
                                , s = n.verticesColor_0
                                , d = n.normals
                                , l = n.uvs
                                , u = n.uvs1
                                , c = n.jointWeights
                                , f = n.joints
                                , h = n.tangents
                                , R = r[a]
                                , m = new E(e,t,R);
                            M(0, 0, a, m, o, l, u, d, c, f, s, h),
                            m.accessor.sparse && y(e, a, m.accessor, t, o)
                        }
                    }),
                        this.list = i,
                        i.weights = n || [],
                        this.origin = null
                }, L = (g = function(e, t, r) {
                        return t.images[r].uri.indexOf("blob:http") > -1 ? t.images[r].uri : (t.images[r].uri.indexOf(";base64,") > -1 ? "" : e.path) + t.images[r].uri
                    }
                        ,
                        P = function(e, t, r) {
                            var n = {};
                            if (t.samplers) {
                                var i = t.samplers[r];
                                "magFilter"in i && (n.mag = i.magFilter),
                                "minFilter"in i && (n.min = i.minFilter),
                                "wrapS"in i && (n.wrap_s = i.wrapS),
                                "wrapT"in i && (n.wrap_t = i.wrapT)
                            }
                            return n.string = JSON.stringify(n),
                                n
                        }
                        ,
                        function(e, t, r) {
                            var n, i, a = !1, o = .5;
                            if ("material"in r) {
                                var s, d, l, u, c, f = r.material, h = t.materials[f];
                                if ("doubleSided"in h && (a = !!h.doubleSided),
                                "alphaMode"in h && (i = h.alphaMode),
                                "alphaCutoff"in h && (o = h.alphaCutoff),
                                "baseColorTexture"in h.pbrMetallicRoughness) {
                                    var R = h.pbrMetallicRoughness.baseColorTexture.index
                                        , m = t.textures[R]
                                        , p = m.source
                                        , _ = g(e, t, p)
                                        , v = m.sampler
                                        , y = _ + (S = P(0, t, v)).string;
                                    s = e.parsingResult.textures[y] ? e.parsingResult.textures[y] : e.parsingResult.textures[y] = RedBitmapTexture(e.redGL, _, S)
                                }
                                if ("metallicRoughnessTexture"in h.pbrMetallicRoughness) {
                                    var E = h.pbrMetallicRoughness.metallicRoughnessTexture.index
                                        , M = t.textures[E]
                                        , b = M.source;
                                    _ = g(e, t, b),
                                        v = M.sampler,
                                        y = _ + (S = P(0, t, v)).string,
                                        l = e.parsingResult.textures[y] ? e.parsingResult.textures[y] : e.parsingResult.textures[y] = RedBitmapTexture(e.redGL, _, S)
                                }
                                var L = h.normalTexture;
                                if (null != L) {
                                    L = L.index;
                                    var T = t.textures[L]
                                        , x = T.source;
                                    _ = g(e, t, x),
                                        v = T.sampler,
                                        y = _ + (S = P(0, t, v)).string,
                                        d = e.parsingResult.textures[y] ? e.parsingResult.textures[y] : e.parsingResult.textures[y] = RedBitmapTexture(e.redGL, _, S)
                                }
                                var I = h.emissiveTexture;
                                if (null != I) {
                                    I = I.index;
                                    var w = t.textures[I]
                                        , D = w.source;
                                    _ = g(e, t, D),
                                        v = w.sampler,
                                        y = _ + (S = P(0, t, v)).string,
                                        u = e.parsingResult.textures[y] ? e.parsingResult.textures[y] : e.parsingResult.textures[y] = RedBitmapTexture(e.redGL, _, S)
                                }
                                var U, B, G = h.occlusionTexture;
                                if (null != G) {
                                    G = G.index;
                                    var S, A = t.textures[G], F = A.source;
                                    _ = g(e, t, F),
                                        v = A.sampler,
                                        y = _ + (S = P(0, t, v)).string,
                                        c = e.parsingResult.textures[y] ? e.parsingResult.textures[y] : e.parsingResult.textures[y] = RedBitmapTexture(e.redGL, _, S)
                                }
                                "metallicFactor"in h.pbrMetallicRoughness && (U = h.pbrMetallicRoughness.metallicFactor),
                                "roughnessFactor"in h.pbrMetallicRoughness && (B = h.pbrMetallicRoughness.roughnessFactor);
                                var C = e.environmentTexture;
                                n = RedPBRMaterial_System(e.redGL, s, C, d, c, u, l, null),
                                    O = h.pbrMetallicRoughness && h.pbrMetallicRoughness.baseColorFactor ? h.pbrMetallicRoughness.baseColorFactor : [1, 1, 1, 1],
                                    n.baseColorFactor = new Float32Array(O),
                                h.pbrMetallicRoughness && (n.metallicFactor = null != U ? U : 1,
                                    n.roughnessFactor = null != B ? B : 1),
                                    n.emissiveFactor = null != h.emissiveFactor ? h.emissiveFactor : new Float32Array([1, 1, 1]),
                                h.pbrMetallicRoughness && (h.pbrMetallicRoughness.metallicRoughnessTexture && (n.roughnessTexCoordIndex = h.pbrMetallicRoughness.metallicRoughnessTexture.texCoord || 0),
                                h.pbrMetallicRoughness.baseColorTexture && (n.diffuseTexCoordIndex = h.pbrMetallicRoughness.baseColorTexture.texCoord || 0)),
                                h.occlusionTexture && (n.occlusionTexCoordIndex = h.occlusionTexture.texCoord || 0,
                                    n.occlusionPower = h.occlusionTexture.strength || 1),
                                h.emissiveTexture && (n.emissiveTexCoordIndex = h.emissiveTexture.texCoord || 0),
                                h.normalTexture && (n.normalTexCoordIndex = h.normalTexture.texCoord || 0)
                            } else {
                                var O = [Math.random(), Math.random(), Math.random(), 1];
                                (n = RedPBRMaterial_System(e.redGL)).baseColorFactor = new Float32Array(O)
                            }
                            return [n, a, i, o]
                        }
                ), T = function(e, t, r, n, i, a, o, s, d) {
                    for (var l = 0, u = t.length / 3, c = 0; l < u; l++)
                        t.length && (e[c++] = t[3 * l + 0],
                            e[c++] = t[3 * l + 1],
                            e[c++] = t[3 * l + 2]),
                            r.length ? (e[c++] = r[4 * l + 0],
                                e[c++] = r[4 * l + 1],
                                e[c++] = r[4 * l + 2],
                                e[c++] = r[4 * l + 3]) : (e[c++] = 0,
                                e[c++] = 0,
                                e[c++] = 0,
                                e[c++] = 0),
                        n.length && (e[c++] = n[3 * l + 0],
                            e[c++] = n[3 * l + 1],
                            e[c++] = n[3 * l + 2]),
                        i.length || i.push(0, 0),
                        i.length && (e[c++] = i[2 * l + 0],
                            e[c++] = i[2 * l + 1]),
                            a.length ? (e[c++] = a[2 * l + 0],
                                e[c++] = a[2 * l + 1]) : i.length && (e[c++] = i[2 * l + 0],
                                e[c++] = i[2 * l + 1]),
                        o.length && (e[c++] = o[4 * l + 0],
                            e[c++] = o[4 * l + 1],
                            e[c++] = o[4 * l + 2],
                            e[c++] = o[4 * l + 3]),
                        s.length && (e[c++] = s[4 * l + 0],
                            e[c++] = s[4 * l + 1],
                            e[c++] = s[4 * l + 2],
                            e[c++] = s[4 * l + 3]),
                            d.length ? (e[c++] = d[4 * l + 0],
                                e[c++] = d[4 * l + 1],
                                e[c++] = d[4 * l + 2],
                                e[c++] = d[4 * l + 3]) : (e[c++] = 0,
                                e[c++] = 0,
                                e[c++] = 0,
                                e[c++] = 0)
                };
                return o = function(e, t, r) {
                    var n, i, a, o;
                    r.name && (n = r.name);
                    var s = [];
                    return r.primitives.forEach(function(d, l) {
                        var u, c, f, h, R = [], m = [], p = [], _ = [], g = [], P = [], v = [], x = [], I = [];
                        if (d.attributes)
                            for (var w in d.attributes) {
                                var D = d.attributes[w]
                                    , U = new E(e,t,D);
                                M(0, 0, w, U, m, _, g, P, v, x, p, I),
                                U.accessor.sparse && y(e, w, U.accessor, t, m)
                            }
                        if ("indices"in d) {
                            D = d.indices;
                            !function(e, t, r, n, i) {
                                var a, o = n.componentType_BYTES_PER_ELEMENT, s = n.bufferURIDataView, d = n.getMethod, l = n.accessor.type, u = n.accessor.count, c = n.startIndex;
                                switch (l) {
                                    case "SCALAR":
                                        for (a = c + u; c < a; c++)
                                            i.push(s[d](c * o, !0))
                                }
                            }(0, 0, 0, U = new E(e,t,D), R)
                        }
                        if (c = L(e, t, d),
                            i = c[1],
                            a = c[2],
                            o = c[3],
                        (c = c[0])instanceof RedPBRMaterial_System && e.parsingResult.materials.push(c),
                        "mode"in d)
                            switch (d.mode) {
                                case 0:
                                    f = e.redGL.gl.POINTS;
                                    break;
                                case 1:
                                    f = e.redGL.gl.LINES;
                                    break;
                                case 2:
                                    f = e.redGL.gl.LINE_LOOP;
                                    break;
                                case 3:
                                    f = e.redGL.gl.LINE_STRIP;
                                    break;
                                case 4:
                                    f = e.redGL.gl.TRIANGLES;
                                    break;
                                case 5:
                                    f = e.redGL.gl.TRIANGLE_STRIP;
                                    break;
                                case 6:
                                    f = e.redGL.gl.TRIANGLE_FAN
                            }
                        h = P.length ? P : RedGLUtil.calculateNormals(m, R);
                        var B, G = [];
                        T(G, m, p, h, _, g, v, x, I);
                        var S = [];
                        if (m.length && S.push(RedInterleaveInfo("aVertexPosition", 3)),
                            S.push(RedInterleaveInfo("aVertexColor_0", 4)),
                        h.length && S.push(RedInterleaveInfo("aVertexNormal", 3)),
                        _.length && S.push(RedInterleaveInfo("aTexcoord", 2)),
                            g.length ? S.push(RedInterleaveInfo("aTexcoord1", 2)) : _.length && S.push(RedInterleaveInfo("aTexcoord1", 2)),
                        v.length && S.push(RedInterleaveInfo("aVertexWeight", 4)),
                        x.length && S.push(RedInterleaveInfo("aVertexJoint", 4)),
                            S.push(RedInterleaveInfo("aVertexTangent", 4)),
                            B = RedGeometry(RedBuffer(e.redGL, "testGLTF_interleaveBuffer_" + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, new Float32Array(G), S), R.length ? RedBuffer(e.redGL, "testGLTF_indexBuffer_" + RedGL.makeUUID(), RedBuffer.ELEMENT_ARRAY_BUFFER, e.redGL.gl.glExtension.OES_element_index_uint ? new Uint32Array(R) : new Uint16Array(R)) : null),
                        c || RedGLUtil.throwFunc("재질을 파싱할수없는경우 ", d),
                            u = RedMesh(e.redGL, B, c),
                        n && (u.name = n,
                            e.parsingOption))
                            for (var A in e.parsingOption)
                                n.toLowerCase().indexOf(A) > -1 && e.parsingOption[A](u);
                        switch (u.drawMode = f || e.redGL.gl.TRIANGLES,
                        i && (u.useCullFace = !1,
                            c.useMaterialDoubleSide = !0),
                            a) {
                            case "BLEND":
                                u.useTransparentSort = !0;
                                break;
                            case "MASK":
                                u.useBlendMode = !1,
                                    c.cutOff = o;
                                break;
                            default:
                                u.useBlendMode = !1,
                                    c._cutOff = -.1
                        }
                        p.length && (c.useVertexColor_0 = !0),
                        I.length && (c.useVertexTangent = !0);
                        var F = new b(e,t,d,r.weights);
                        F.list.forEach(function(e) {
                            var t;
                            t = e.normals.length ? e.normals : RedGLUtil.calculateNormals(e.vertices, R);
                            var r = [];
                            T(r, e.vertices, e.verticesColor_0, t, e.uvs, e.uvs1, e.jointWeights, e.joints, e.tangents),
                                e.interleaveData = r
                        }),
                            u._morphInfo = F,
                            u._morphInfo.origin = new Float32Array(G);
                        var C = u.geometry.interleaveBuffer.data
                            , O = 0;
                        S.forEach(function(e) {
                            O += e.size
                        });
                        u._morphInfo.list.forEach(function(e, t) {
                            for (var r = 0, n = C.length / O, i = null == u._morphInfo.list.weights[t] ? .5 : u._morphInfo.list.weights[t]; r < n; r++)
                                C[r * O + 0] += e.vertices[3 * r + 0] * i,
                                    C[r * O + 1] += e.vertices[3 * r + 1] * i,
                                    C[r * O + 2] += e.vertices[3 * r + 2] * i
                        }),
                            u.geometry.interleaveBuffer.upload(C),
                            u._morphInfo.origin = new Float32Array(C),
                            d.RedMesh = u,
                            s.push(u)
                    }),
                        s
                }
                    ,
                    v = function(e, t, r) {
                        var n, i = [], a = new E(e,t,r), o = a.componentType_BYTES_PER_ELEMENT, s = a.bufferURIDataView, d = a.getMethod, l = a.accessor.type, u = a.accessor.count, c = a.startIndex;
                        switch (l) {
                            case "SCALAR":
                                for (n = c + 1 * u; c < n; c++)
                                    i.push(s[d](c * o, !0));
                                break;
                            case "VEC4":
                                for (n = c + 4 * u; c < n; c++)
                                    i.push(s[d](c * o, !0));
                                break;
                            case "VEC3":
                                for (n = c + 3 * u; c < n; c++)
                                    i.push(s[d](c * o, !0))
                        }
                        return i
                    }
                    ,
                    s = function(e, t) {
                        var r = t.nodes
                            , n = t.meshes;
                        t.accessors,
                        t.animations || (t.animations = []),
                            t.animations.forEach(function(i, a) {
                                var o = i.samplers
                                    , s = [];
                                s.minTime = 1e7,
                                    s.maxTime = -1,
                                    s.name = i.name,
                                    e.parsingResult.animations.push(s),
                                    i.channels.forEach(function(i, a) {
                                        var d, l, u, c, f, h = [];
                                        if (d = o[i.sampler],
                                            l = i.target,
                                        "mesh"in (c = r[l.node]))
                                            u = c.RedMesh,
                                                n[c.mesh].primitives.forEach(function(t) {
                                                    h.push(t.RedMesh),
                                                        t.RedMesh.geometry.drawMode = e.redGL.gl.DYNAMIC_DRAW
                                                });
                                        else {
                                            if (!e.parsingResult.groups[l.node])
                                                return;
                                            u = e.parsingResult.groups[l.node]
                                        }
                                        "scale" != l.path && "rotation" != l.path && "translation" != l.path && "weights" != l.path || s.push(f = {
                                            key: l.path,
                                            time: v(e, t, d.input),
                                            data: v(e, t, d.output),
                                            interpolation: d.interpolation,
                                            target: u,
                                            targets: h
                                        }),
                                        f && (s.minTime > f.time[0] && (s.minTime = f.time[0]),
                                        s.maxTime < f.time[f.time.length - 1] && (s.maxTime = f.time[f.time.length - 1]))
                                    })
                            }),
                        e.parsingResult.animations.length && e.parsingResult.animations.forEach(function(t) {
                            e.playAnimation(t)
                        })
                    }
                    ,
                    function(r, n, i, o, d) {
                        e(i),
                            d ? (i.buffers[0].uri = d,
                                t(r, i, function() {
                                    l(r, i),
                                        a(r, i, function() {
                                            s(r, i),
                                            o && o()
                                        })
                                })) : t(r, i, function() {
                                l(r, i),
                                    a(r, i, function() {
                                        s(r, i),
                                        o && o()
                                    })
                            })
                    }
            }(),
            Object.freeze(RedGLTFLoader)
    }(),
    RedLinePoint = function(e, t, r, n, i, a, o, s, d) {
        if (!(this instanceof RedLinePoint))
            return new RedLinePoint(e,t,r,n,i,a,o,s,d);
        this._inPoint = [n || 0, i || 0, a || 0],
            this._point = [e || 0, t || 0, r || 0],
            this._outPoint = [o || 0, s || 0, d || 0],
            this._UUID = RedGL.makeUUID()
    }
    ,
    Object.freeze(RedLinePoint),
    function() {
        var e, t, r, n, i, a, o, s, d, l, u, c, f, h, R, m, p, _, g;
        t = function(e, t, r) {
            var n, i, a, o = [], s = !1, d = !1, l = 0, u = "", c = [], f = [0, 0], h = [0, 0];
            function R() {
                if (u.length > 0) {
                    var e = parseFloat(u);
                    if (c.push(e),
                    2 === c.length) {
                        if (s && (c[0] += f[0],
                            c[1] += f[1]),
                            o.push(c),
                        d && (h = c.slice()),
                            !--l) {
                            if ("l" === n) {
                                var t = o.pop()
                                    , r = o.pop()
                                    , i = vec2.lerp([0, 0], r, t, .25)
                                    , a = vec2.lerp([0, 0], r, t, .75);
                                o.push(r, i, a, t)
                            }
                            f = h
                        }
                        c = []
                    }
                    u = ""
                }
            }
            var m, p = e.split("");
            for (i = 0,
                     a = p.length; i < a; i++)
                (m = p[i]) >= "0" && m <= "9" || "." === m ? u += m : "-" === m ? (R(),
                    u = "-") : "m" === m ? (R(),
                    d = !0,
                    l = 1,
                    s = !0,
                    n = "m") : "c" === m ? (R(),
                    d = !0,
                    l = 3,
                    s = !0,
                    n = "c") : "l" === m ? (R(),
                    d = !0,
                    l = 1,
                    s = !1,
                    n = "l") : "M" === m ? (R(),
                    d = !0,
                    l = 1,
                    s = !1,
                    n = "m") : "C" === m ? (R(),
                    d = !0,
                    l = 3,
                    s = !1,
                    n = "c") : "L" === m ? (R(),
                    d = !0,
                    l = 1,
                    s = !1,
                    n = "l") : "Z" === m || ("," === m ? R() : " " === m && R());
            R();
            var _ = o[0].slice()
                , g = o[0].slice();
            for (i = 1,
                     a = o.length; i < a; ++i)
                _ = vec2.min([0, 0], _, o[i]),
                    g = vec2.max([0, 0], g, o[i]);
            var P, v = vec2.sub([0, 0], g, _), y = vec2.scale([0, 0], v, .5);
            for (i = 0; i < a; ++i)
                (P = o[i])[0] = t ? g[0] - P[0] : P[0] - _[0],
                    P[1] = r ? y[1] - (P[1] - _[0]) : P[1] - _[0] - y[1];
            return o
        }
            ,
            r = function(e, t, r) {
                return e + (t - e) * r
            }
            ,
            d = function(e) {
                for (c = [],
                         f = 0,
                         h = 0,
                         R = e.length; h < R - 1; ++h)
                    c[h] = f,
                        f += vec2.distance(e[h], e[h + 1]);
                return c.push(f),
                    c = c.map(function(e) {
                        return e / f
                    })
            }
            ,
            l = function() {
                var e, t, n, i, a, o, s = mat4.create();
                return function(d, l, u, c, f, h, R) {
                    var m = []
                        , p = [];
                    for (n = 0; n <= f; ++n) {
                        var _;
                        for (a = r(u, c, i = n / f) % (2 * Math.PI),
                                 o = mat4.fromYRotation(s, a),
                             h && (m.push(0, d[0][1], 0),
                                 p.push(i, 0)),
                                 e = 0,
                                 t = d.length; e < t; e++)
                            _ = d[e],
                                _ = vec3.transformMat4([0, 0, 0], [_[0], _[1], 0], o),
                                m.push(_[0], _[1], _[2]),
                                p.push(i, l[e]);
                        R && (m.push(0, d[d.length - 1][1], 0),
                            p.push(i, 1))
                    }
                    return {
                        positions: m,
                        texcoords: p
                    }
                }
            }(),
            g = 0,
            u = function(e, t, r) {
                var n = [];
                for (g = 0; g < e; ++g)
                    for (p = (m = g * t) + t,
                             _ = 0; _ < r; ++_)
                        n.push(m + _, m + _ + 1, p + _),
                            n.push(m + _ + 1, p + _ + 1, p + _);
                return n
            }
            ,
            n = function(e, t, r, n, i, a, o) {
                var s = i ? 1 : 0
                    , c = e.length + s + (a ? 1 : 0)
                    , f = c - 1
                    , h = d(e)
                    , R = l(e, h, t, r, n, i, a);
                return {
                    position: R.positions,
                    texcoord: R.texcoords,
                    indices: u(n, c, f, o)
                }
            }
            ,
            i = function(e) {
                var t = e.indices
                    , r = 0
                    , n = function() {
                    return t[r++]
                };
                return n.reset = function() {
                    r = 0
                }
                    ,
                    n.numElements = t.length,
                    n
            }
            ,
            a = function(e) {
                var t = 0
                    , r = function() {
                    return t++
                };
                return r.reset = function() {
                    t = 0
                }
                    ,
                    r.numElements = e.positions.length / 3,
                    r
            }
            ,
            o = function(e) {
                return e.indices ? i(e) : a(e)
            }
            ,
            s = function(e, t) {
                for (var r, n = e.position, i = e.texcoord, a = o(e), s = a.numElements, d = e.position.length, l = s / 3, u = [], c = 0; c < l; ++c) {
                    var f = 3 * a()
                        , h = 3 * a()
                        , R = 3 * a()
                        , m = n.slice(f, f + 3)
                        , p = n.slice(h, h + 3)
                        , _ = n.slice(R, R + 3);
                    u.push(vec3.normalize([0, 0, 0], vec3.cross([0, 0, 0], vec3.sub([0, 0, 0], m, p), vec3.sub([0, 0, 0], _, p))))
                }
                var g = {}
                    , P = 0;
                function v(e) {
                    var t = e
                        , r = g[t];
                    if (void 0 !== r)
                        return r;
                    var n = P++;
                    return g[t] = n,
                        n
                }
                var y = [];
                for (c = 0; c < d; ++c) {
                    var E = 3 * c
                        , M = n.slice(E, E + 3);
                    y.push(v(M))
                }
                var b = [];
                for (a.reset(),
                         c = 0; c < l; ++c)
                    for (r = 0; r < 3; ++r) {
                        (S = b[G = y[B = a()]]) || (S = [],
                            b[G] = S),
                            S.push(c)
                    }
                g = {},
                    P = 0;
                var L = []
                    , T = []
                    , x = [];
                function I(e, t, r, n, i, a, o, s) {
                    var d = e + "," + t + "," + r + "," + n + "," + i + "," + a + "," + o + "," + s
                        , l = g[d];
                    if (void 0 !== l)
                        return l;
                    var u = P++;
                    return g[d] = u,
                        L.push(e, t, r),
                        x.push(n, i, a),
                        T.push(o, s),
                        u
                }
                var w = [];
                a.reset();
                var D = Math.cos(t);
                for (c = 0; c < l; ++c) {
                    var U = u[c];
                    for (r = 0; r < 3; ++r) {
                        var B, G, S = b[G = y[B = a()]], A = [0, 0, 0];
                        S.forEach(function(e) {
                            var t = u[e];
                            vec3.dot(U, t) > D && vec3.add(A, A, t)
                        }),
                            vec3.normalize(A, A);
                        var F = 3 * B
                            , C = 2 * B;
                        w.push(I(n[F + 0], n[F + 1], n[F + 2], A[0], A[1], A[2], i[C + 0], i[C + 1]))
                    }
                }
                return {
                    position: L,
                    texcoord: T,
                    normal: x,
                    indices: w
                }
            }
            ,
            e = function(e, t, r) {
                var n, i = [], a = r.position, o = r.normal, s = r.texcoord;
                n = r.indices;
                for (var d, l = 0, u = a.length / 3; l < u; l++)
                    d = 3 * l,
                        i.push(a[d + 0], a[d + 1], a[d + 2]),
                        i.push(o[d + 0], o[d + 1], o[d + 2]),
                        d = 2 * l,
                        i.push(s[d + 0], s[d + 1]);
                return {
                    interleaveData: i,
                    indexData: n,
                    type: t,
                    interleaveBuffer: RedBuffer(e, t + "_interleaveBuffer", RedBuffer.ARRAY_BUFFER, new Float32Array(i), [RedInterleaveInfo("aVertexPosition", 3), RedInterleaveInfo("aVertexNormal", 3), RedInterleaveInfo("aTexcoord", 2)]),
                    indexBuffer: RedBuffer(e, t + "_indexBuffer", RedBuffer.ELEMENT_ARRAY_BUFFER, new Uint16Array(n))
                }
            }
            ,
            (RedLathe = function(r, i, a, o, d, l, u, c, f, h, R, m) {
                    if (!(this instanceof RedLathe))
                        return new RedLathe(r,i,a,o,d,l,u,c,f,h,R,m);
                    var p, _;
                    if (r instanceof RedGL || RedGLUtil.throwFunc("RedLathe : RedGL Instance만 허용.", r),
                        f = void 0 !== f ? f : .4,
                    (h = void 0 !== h ? h : .15) < .1 && (h = .1),
                        p = "RedLathe_" + i + "_" + (a = Math.floor(a) || 16) + "_" + (o = void 0 !== o && o) + "_" + (d = void 0 !== d && d) + "_" + (l = void 0 !== l ? l : 0) + "_" + (u = void 0 !== u ? u : 2 * Math.PI) + "_" + (c = void 0 !== c ? c : Math.PI / 180 * 30) + "_" + f + "_" + h + "_" + R + "_" + m,
                    r._datas.Primitives || (r._datas.Primitives = {}),
                        r._datas.Primitives[p])
                        return r._datas.Primitives[p];
                    r._datas.Primitives[p] = this;
                    var g = t(i, R, m)
                        , P = RedLine.prototype._getPointsOnBezierCurves(g, h)
                        , v = RedLine.prototype._simplifyPoints(P, 0, P.length, f)
                        , y = n(v, l, u, a, o, d);
                    _ = e(r, p, s(y, c)),
                        this.interleaveBuffer = _.interleaveBuffer,
                        this.indexBuffer = _.indexBuffer,
                        this.interleaveBuffer.isPrimitiveBuffer = !0,
                        this.indexBuffer.isPrimitiveBuffer = !0,
                        this._UUID = RedGL.makeUUID()
                }
            ).prototype = Object.create(RedGeometry.prototype),
            Object.freeze(RedLathe)
    }(),
    (RedAxis = function(e) {
            if (!(this instanceof RedAxis))
                return new RedAxis(e);
            var t, r, n, i, a, o, s;
            e instanceof RedGL || RedGLUtil.throwFunc("RedAxis : RedGL Instance만 허용.", e),
                RedBaseObject3D.build.call(this, e.gl),
                n = RedBox(e),
                i = RedCylinder(e, 0, .5),
                a = RedColorMaterial(e, "#ff0000"),
                o = RedColorMaterial(e, "#00ff00"),
                s = RedColorMaterial(e, "#0000ff"),
                t = RedMesh(e, i, a),
                (r = RedMesh(e, n, a)).scaleX = r.scaleY = r.scaleZ = .1,
                r.scaleX = 5,
                t.x = 5,
                t.rotationZ = 90,
                r.x = 2.5,
                this.children.push(r),
                this.children.push(t),
                t = RedMesh(e, i, o),
                (r = RedMesh(e, n, o)).scaleX = r.scaleY = r.scaleZ = .1,
                r.scaleY = 5,
                t.y = 5,
                r.y = 2.5,
                this.children.push(r),
                this.children.push(t),
                t = RedMesh(e, i, s),
                (r = RedMesh(e, n, s)).scaleX = r.scaleY = r.scaleZ = .1,
                r.scaleZ = 5,
                t.z = 5,
                t.rotationX = -90,
                r.z = 2.5,
                this.children.push(r),
                this.children.push(t),
                this.children.push(RedMesh(e, RedSphere(e, .25, 16, 16, 16), RedColorMaterial(e, "#ff00ff"))),
                this._UUID = RedGL.makeUUID()
        }
    ).prototype = new RedBaseContainer,
    Object.freeze(RedAxis),
    function() {
        var e, t, r, n, i, a;
        (RedGrid = function(e, t, r, n, i) {
                if (!(this instanceof RedGrid))
                    return new RedGrid(e,t,r,n,i);
                var a;
                e instanceof RedGL || RedGLUtil.throwFunc("RedGrid : RedGL Instance만 허용.", e),
                    a = e.gl,
                    RedBaseObject3D.build.call(this, a),
                    this._redGL = e,
                    this.size = t || 100,
                    this.divisions = r || 100,
                    this.color1 = n || "#cccccc",
                    this.color2 = i || "#666666",
                    this.geometry = this._makeGridGeometry(),
                    this.material = RedGridMaterial(e),
                    this.drawMode = a.LINES,
                    this._UUID = RedGL.makeUUID()
            }
        ).prototype = new RedBaseContainer,
            RedGrid.prototype._makeGridGeometry = function() {
                if (this.color2) {
                    var o = [];
                    for (e = this._divisions / 2,
                             t = this._size / this._divisions,
                             r = this._size / 2,
                             n = 0,
                             i = -r; n <= this._divisions; n++,
                             i += t)
                        a = n === e ? RedGLUtil.hexToRGB_ZeroToOne(this.color1) : RedGLUtil.hexToRGB_ZeroToOne(this.color2),
                            o.push(-r, 0, i, a[0], a[1], a[2], 1, r, 0, i, a[0], a[1], a[2], 1, i, 0, -r, a[0], a[1], a[2], 1, i, 0, r, a[0], a[1], a[2], 1);
                    return RedGeometry(RedBuffer(this._redGL, "gridInterleaveBuffer_" + this._size + "_" + this._divisions + "_" + this.color1 + "_" + this.color2, RedBuffer.ARRAY_BUFFER, new Float32Array(o), [RedInterleaveInfo("aVertexPosition", 3), RedInterleaveInfo("aVertexColor", 4)]))
                }
            }
            ,
            RedGrid.prototype._update = function() {
                this.geometry = this._makeGridGeometry()
            }
            ,
            RedDefinePropertyInfo.definePrototype("RedGrid", "size", "number", {
                min: 1,
                callback: function() {
                    this._update()
                }
            }),
            RedDefinePropertyInfo.definePrototype("RedGrid", "divisions", "uint", {
                min: 1,
                callback: function() {
                    this._update()
                }
            }),
            Object.defineProperty(RedGrid.prototype, "color1", {
                get: function() {
                    return this._color1
                },
                set: function(e) {
                    return RedGLUtil.regHex(e) || RedGLUtil.throwFunc("RedGrid : color1 hex 형식만 허용.", e),
                        this._color1 = e,
                        this._update(),
                        this._color1
                }
            }),
            Object.defineProperty(RedGrid.prototype, "color2", {
                get: function() {
                    return this._color2
                },
                set: function(e) {
                    return RedGLUtil.regHex(e) || RedGLUtil.throwFunc("RedGrid : color2 hex 형식만 허용.", e),
                        this._color2 = e,
                        this._update(),
                        this._color2
                }
            }),
            Object.defineProperty(RedGrid.prototype, "material", {
                get: function() {
                    return this._material
                },
                set: function(e) {
                    e instanceof RedGridMaterial || RedGLUtil.throwFunc("RedGrid : RedGridMaterial Instance만 허용.", "입력값 : " + e),
                        this._material = e
                }
            }),
            Object.freeze(RedGrid)
    }(),
    (RedMesh = function(e, t, r) {
            if (!(this instanceof RedMesh))
                return new RedMesh(e,t,r);
            e instanceof RedGL || RedGLUtil.throwFunc("RedMesh : RedGL Instance만 허용.", e),
                RedBaseObject3D.build.call(this, e.gl),
                this.geometry = t,
                this.material = r,
                this._UUID = RedGL.makeUUID()
        }
    ).prototype = new RedBaseContainer,
    RedDefinePropertyInfo.definePrototype("RedMesh", "perspectiveScale", "boolean"),
    RedDefinePropertyInfo.definePrototype("RedMesh", "sprite3DYn", "boolean"),
    Object.freeze(RedMesh),
    function() {
        var e, t, r, n, i, a, o, s, d, l;
        s = function(e, t, r) {
            var n = vec2.sqrDist(t, r);
            if (0 === n)
                return vec2.sqrDist(e, t);
            var i = ((e[0] - t[0]) * (r[0] - t[0]) + (e[1] - t[1]) * (r[1] - t[1])) / n;
            return i = Math.max(0, Math.min(1, i)),
                vec2.sqrDist(e, vec2.lerp([0, 0], t, r, i))
        }
            ,
            o = function(e, t, r, n, i) {
                for (var a = i || [], d = e[t], l = e[r - 1], u = 0, c = 1, f = t + 1; f < r - 1; ++f) {
                    var h = s(e[f], d, l);
                    h > u && (u = h,
                        c = f)
                }
                return Math.sqrt(u) > n ? (o(e, t, c + 1, n, a),
                    o(e, c, r, n, a)) : a.push(d, l),
                    a
            }
            ,
            e = function(e, t) {
                null == t && (t = 1);
                for (var r, n, i, a, o = e.length, s = o - 2, d = 0; d < o - 1; d++)
                    r = d ? e[d - 1]._point : e[d]._point,
                        n = e[d]._point,
                        i = e[d + 1]._point,
                        a = d == s ? i : e[d + 2]._point,
                        e[d]._outPoint[0] = n[0] + (i[0] - r[0]) / 6 * t,
                        e[d]._outPoint[1] = n[1] + (i[1] - r[1]) / 6 * t,
                        e[d]._outPoint[2] = n[2] + (i[2] - r[2]) / 6 * t,
                        e[d + 1]._inPoint[0] = i[0] - (a[0] - n[0]) / 6 * t,
                        e[d + 1]._inPoint[1] = i[1] - (a[1] - n[1]) / 6 * t,
                        e[d + 1]._inPoint[2] = i[2] - (a[2] - n[2]) / 6 * t;
                return e
            }
            ,
            r = function(e) {
                var t, r, n, i = [], a = 0;
                for (t = 0,
                         r = e.length; t < r; t++)
                    n = e[t],
                        0 == a ? (i[a++] = n._point,
                            i[a++] = n._outPoint) : (i[a++] = n._inPoint,
                            i[a++] = n._point,
                        e[t + 1] && (i[a++] = n._outPoint));
                return i
            }
            ,
            d = function(e, t) {
                var r = e[t + 0]
                    , n = e[t + 1]
                    , i = e[t + 2]
                    , a = e[t + 3]
                    , o = 3 * n[0] - 2 * r[0] - a[0]
                    , s = 3 * n[1] - 2 * r[1] - a[1]
                    , d = 3 * i[0] - 2 * a[0] - r[0]
                    , l = 3 * i[1] - 2 * a[1] - r[1];
                return (o *= o) < (d *= d) && (o = d),
                (s *= s) < (l *= l) && (s = l),
                o + s
            }
            ,
            l = function(e, t, r, n) {
                var i = n || [];
                if (d(e, t) < r)
                    i.push(e[t + 0]),
                        i.push(e[t + 3]);
                else {
                    var a = .5
                        , o = e[t + 0]
                        , s = e[t + 1]
                        , u = e[t + 2]
                        , c = e[t + 3]
                        , f = vec3.lerp([0, 0], o, s, a)
                        , h = vec3.lerp([0, 0], s, u, a)
                        , R = vec3.lerp([0, 0], u, c, a)
                        , m = vec3.lerp([0, 0], f, h, a)
                        , p = vec3.lerp([0, 0], h, R, a)
                        , _ = vec3.lerp([0, 0], m, p, a);
                    l([o, f, m, _], 0, r, i),
                        l([_, p, R, c], 0, r, i)
                }
                return i
            }
            ,
            t = function(e, t) {
                var r = []
                    , n = (e.length - 1) / 3;
                n = Math.floor(n);
                for (var i = 0; i < n; ++i)
                    l(e, 3 * i, t, r);
                return r
            }
            ,
            a = function(e) {
                e.points.forEach(function(t, r) {
                    var n;
                    t._debugObjectInPointMesh && (t._debugObjectPointMesh.removeChild(n = t._debugObjectInPointMesh),
                        n.disposeAll(),
                        t._debugObjectInPointMesh = null),
                    t._debugObjectOutPointMesh && (t._debugObjectPointMesh.removeChild(n = t._debugObjectOutPointMesh),
                        n.disposeAll(),
                        t._debugObjectOutPointMesh = null),
                    t._debugObjectPointMesh && (e.removeChild(n = t._debugObjectPointMesh),
                        n.disposeAll(),
                        t._debugObjectPointMesh = null)
                })
            }
            ,
            i = function(e) {
                var t, r, n, i = e._redGL;
                a(e),
                    e.points.forEach(function(a, o) {
                        a._debugObjectPointMesh || (a._debugObjectPointMesh = RedMesh(i, RedBox(i, 1, 1, 1), RedColorMaterial(i, "#00ff00")),
                            e.addChild(a._debugObjectPointMesh)),
                            r = a._debugObjectPointMesh,
                        e._type == RedLine.LINEAR || (o && (a._debugObjectInPointMesh || (a._debugObjectInPointMesh = RedMesh(i, RedBox(i, .5, .5, .5), RedColorMaterial(i, e._type == RedLine.BEZIER ? "#0000ff" : "#fff", e._type == RedLine.BEZIER ? 1 : .5)),
                            (n = RedLine(i, RedColorMaterial(i, "#fff", .5))).drawMode = i.gl.LINES,
                            r.addChild(a._debugObjectInPointMesh),
                            a._debugObjectInPointMesh.addChild(n)),
                            (n = a._debugObjectInPointMesh.getChildAt(0))._interleaveData.length = 0,
                            n._interleaveData.push(0, 0, 0),
                            n._interleaveData.push(a._point[0] - a._inPoint[0], a._point[1] - a._inPoint[1], a._point[2] - a._inPoint[2]),
                            n._upload()),
                        o != e.points.length - 1 && (a._debugObjectOutPointMesh || (a._debugObjectOutPointMesh = RedMesh(i, RedBox(i, .5, .5, .5), RedColorMaterial(i, e._type == RedLine.BEZIER ? "#ff0000" : "#fff", e._type == RedLine.BEZIER ? 1 : .5)),
                            (n = RedLine(i, RedColorMaterial(i, "#fff", .5))).drawMode = i.gl.LINES,
                            r.addChild(a._debugObjectOutPointMesh),
                            a._debugObjectOutPointMesh.addChild(n)),
                            (n = a._debugObjectOutPointMesh.getChildAt(0))._interleaveData.length = 0,
                            n._interleaveData.push(0, 0, 0),
                            n._interleaveData.push(a._point[0] - a._outPoint[0], a._point[1] - a._outPoint[1], a._point[2] - a._outPoint[2]),
                            n._upload())),
                        a._debugObjectPointMesh && ((t = a._debugObjectPointMesh).x = a._point[0],
                            t.y = a._point[1],
                            t.z = a._point[2]),
                        a._debugObjectOutPointMesh && (a._debugObjectOutPointMesh.x = a._outPoint[0] - a._point[0],
                            a._debugObjectOutPointMesh.y = a._outPoint[1] - a._point[1],
                            a._debugObjectOutPointMesh.z = a._outPoint[2] - a._point[2]),
                        a._debugObjectInPointMesh && (a._debugObjectInPointMesh.x = a._inPoint[0] - a._point[0],
                            a._debugObjectInPointMesh.y = a._inPoint[1] - a._point[1],
                            a._debugObjectInPointMesh.z = a._inPoint[2] - a._point[2])
                    })
            }
            ,
            n = function(n, a, s, d) {
                switch (n._interleaveData.length = 0,
                    n._type) {
                    case RedLine.CATMULL_ROM:
                        if (n.points.length > 1) {
                            var l = e(n.points, a);
                            n._serializedPoints = r(l),
                                l = t(n._serializedPoints, s);
                            for (var u = 0, c = (l = o(l, 0, l.length, d)).length; u < c; u++)
                                n._interleaveData.push(l[u][0], l[u][1], l[u][2])
                        } else
                            n._interleaveData.push(0, 0, 0);
                        break;
                    case RedLine.BEZIER:
                        if (n.points.length > 1) {
                            n._serializedPoints = r(n.points),
                                l = t(n._serializedPoints, s);
                            for (u = 0,
                                     c = (l = o(l, 0, l.length, d)).length; u < c; u++)
                                n._interleaveData.push(l[u][0], l[u][1], l[u][2])
                        } else
                            n._interleaveData.push(0, 0, 0);
                        break;
                    default:
                        n.points.forEach(function(e) {
                            n._interleaveData.push(e._point[0], e._point[1], e._point[2])
                        })
                }
                n.debug && i(n),
                    n._upload()
            }
            ,
            (RedLine = function(e, t, r) {
                    if (!(this instanceof RedLine))
                        return new RedLine(e,t,r);
                    var n;
                    e instanceof RedGL || RedGLUtil.throwFunc("RedLine : RedGL Instance만 허용.", e),
                    (t = t || RedColorMaterial(e))instanceof RedColorMaterial || RedGLUtil.throwFunc("RedLine : RedColorMaterial Instance만 허용."),
                        n = e.gl,
                        RedBaseObject3D.build.call(this, n),
                        this._redGL = e,
                        this._interleaveData = [0, 0, 0],
                        this._UUID = RedGL.makeUUID(),
                        this._interleaveBuffer = RedBuffer(e, "RedLine_InterleaveBuffer_" + this._UUID, RedBuffer.ARRAY_BUFFER, new Float32Array(this._interleaveData), [RedInterleaveInfo("aVertexPosition", 3)]),
                        this.geometry = RedGeometry(this._interleaveBuffer),
                        this.material = t,
                        this.drawMode = n.LINE_STRIP,
                        this.points = [],
                        this._serializedPoints = [],
                        this._tension = 1,
                        this._tolerance = .01,
                        this._distance = .1,
                        this.type = r || RedLine.LINEAR,
                        this._debug = !1
                }
            ).LINEAR = "linear",
            RedLine.CATMULL_ROM = "catmullRom",
            RedLine.BEZIER = "bezier",
            RedLine.prototype = new RedBaseContainer,
            RedLine.prototype.addPoint = function(e, t, r, i, a, o, s, d, l) {
                "number" == typeof e || RedGLUtil.throwFunc("RedLine : addPoint - x값은 숫자만 허용", "입력값 : " + e),
                "number" == typeof t || RedGLUtil.throwFunc("RedLine : addPoint - y값은 숫자만 허용", "입력값 : " + t),
                "number" == typeof r || RedGLUtil.throwFunc("RedLine : addPoint - z값은 숫자만 허용", "입력값 : " + r),
                    a = a || 0,
                    o = o || 0,
                "number" == typeof (i = i || 0) || RedGLUtil.throwFunc("RedLine : addPoint - inX값은 숫자만 허용", "입력값 : " + i),
                "number" == typeof a || RedGLUtil.throwFunc("RedLine : addPoint - inY값은 숫자만 허용", "입력값 : " + a),
                "number" == typeof o || RedGLUtil.throwFunc("RedLine : addPoint - inZ값은 숫자만 허용", "입력값 : " + o),
                    d = d || 0,
                    l = l || 0,
                "number" == typeof (s = s || 0) || RedGLUtil.throwFunc("RedLine : addPoint - outX값은 숫자만 허용", "입력값 : " + s),
                "number" == typeof d || RedGLUtil.throwFunc("RedLine : addPoint - outY값은 숫자만 허용", "입력값 : " + d),
                "number" == typeof l || RedGLUtil.throwFunc("RedLine : addPoint - outZ값은 숫자만 허용", "입력값 : " + l),
                    this.points.push(RedLinePoint(e, t, r, i, a, o, s, d, l)),
                    n(this, this._tension, this._tolerance, this._distance)
            }
            ,
            RedLine.prototype.addPointAt = function(e, t, r, i, a, o, s, d, l, u) {
                "number" == typeof t || RedGLUtil.throwFunc("RedLine : addPoint - x값은 숫자만 허용", "입력값 : " + t),
                "number" == typeof r || RedGLUtil.throwFunc("RedLine : addPoint - y값은 숫자만 허용", "입력값 : " + r),
                "number" == typeof i || RedGLUtil.throwFunc("RedLine : addPoint - z값은 숫자만 허용", "입력값 : " + i),
                    o = o || 0,
                    s = s || 0,
                "number" == typeof (a = a || 0) || RedGLUtil.throwFunc("RedLine : addPoint - inX값은 숫자만 허용", "입력값 : " + a),
                "number" == typeof o || RedGLUtil.throwFunc("RedLine : addPoint - inY값은 숫자만 허용", "입력값 : " + o),
                "number" == typeof s || RedGLUtil.throwFunc("RedLine : addPoint - inZ값은 숫자만 허용", "입력값 : " + s),
                    l = l || 0,
                    u = u || 0,
                "number" == typeof (d = d || 0) || RedGLUtil.throwFunc("RedLine : addPoint - outX값은 숫자만 허용", "입력값 : " + d),
                "number" == typeof l || RedGLUtil.throwFunc("RedLine : addPoint - outY값은 숫자만 허용", "입력값 : " + l),
                "number" == typeof u || RedGLUtil.throwFunc("RedLine : addPoint - outZ값은 숫자만 허용", "입력값 : " + u),
                "number" == typeof e || RedGLUtil.throwFunc("addPointAt", "index는 숫자만 입력가능", "입력값 : " + e),
                this.points.length < e && (e = this.points.length),
                    null != e ? this.points.splice(e, 0, RedLinePoint(t, r, i, a, o, s, d, l, u)) : this.points.push(RedLinePoint(t, r, i, a, o, s, d, l, u)),
                    n(this, this._tension, this._tolerance, this._distance)
            }
            ,
            RedLine.prototype.removePointAt = function(e) {
                "number" != typeof e && RedGLUtil.throwFunc("removeChildAt", "index가 Number형이 아님 ", "입력값 : " + e),
                    this.points[e] ? this.points.splice(e, 1) : RedGLUtil.throwFunc("removeChildAt", "index 해당인덱스에 위치한 포인트가 없음.", "입력값 : " + e),
                    n(this, this._tension, this._tolerance, this._distance)
            }
            ,
            RedLine.prototype.removeAllPoint = function() {
                this.points.length = 0,
                    n(this, this._tension, this._tolerance, this._distance),
                    this._upload()
            }
            ,
            RedLine.prototype._upload = function() {
                this._interleaveBuffer.upload(new Float32Array(this._interleaveData))
            }
            ,
            Object.defineProperty(RedLine.prototype, "geometry", {
                get: function() {
                    return this._geometry
                },
                set: function(e) {
                    this._geometry && RedGLUtil.throwFunc("RedLine : geometry - 임의로 설정을 허용하지 않음", "입력값 : " + e),
                        this._geometry = e
                }
            }),
            Object.defineProperty(RedLine.prototype, "material", {
                get: function() {
                    return this._material
                },
                set: function(e) {
                    e instanceof RedColorMaterial || RedGLUtil.throwFunc("RedLine : RedColorMaterial Instance만 허용.", "입력값 : " + e),
                        this._material = e
                }
            }),
            Object.defineProperty(RedLine.prototype, "type", {
                get: function() {
                    return this._type
                },
                set: function(e) {
                    e != RedLine.LINEAR && e != RedLine.CATMULL_ROM && e != RedLine.BEZIER && RedGLUtil.throwFunc("RedLine : 허용하지 않는 타입", "입력값 : " + e),
                        this._type = e,
                        n(this, this._tension, this._tolerance, this._distance)
                }
            }),
            RedDefinePropertyInfo.definePrototype("RedLine", "tension", "number", {
                callback: function(e) {
                    n(this, this._tension, this._tolerance, this._distance)
                }
            }),
            RedDefinePropertyInfo.definePrototype("RedLine", "distance", "number", {
                min: 0,
                callback: function(e) {
                    n(this, this._tension, this._tolerance, this._distance)
                }
            }),
            RedDefinePropertyInfo.definePrototype("RedLine", "debug", "boolean", {
                callback: function(e) {
                    e ? i(this) : a(this)
                }
            }),
            RedLine.prototype._simplifyPoints = o,
            RedLine.prototype._getPointsOnBezierCurves = t,
            Object.freeze(RedLine)
    }(),
    function() {
        (RedLatheMesh = function(t, r, n, i, a, o, s, d, l, u, c, f, h) {
                if (!(this instanceof RedLatheMesh))
                    return new RedLatheMesh(t,r,n,i,a,o,s,d,l,u,c,f,h);
                t instanceof RedGL || RedGLUtil.throwFunc("RedPrimitive : RedGL Instance만 허용.", t),
                    RedBaseObject3D.build.call(this, t.gl),
                    this._pathString = r,
                    this._redGL = t,
                    this.numDivisions = i = Math.floor(i) || 16,
                    this.capStart = void 0 !== a && a,
                    this.capEnd = void 0 !== o && o,
                    this.startAngle = void 0 !== s ? s : 0,
                    this.endAngle = void 0 !== d ? d : 2 * Math.PI,
                    this.distance = void 0 !== u ? u : .4,
                    this.maxAngle = void 0 !== l ? l : Math.PI / 180 * 30,
                    this.tolerance = void 0 !== c ? c : .15,
                    this.flipX = !!f,
                    this.flipY = !!h,
                this._tolerance < .1 && (this._tolerance = .1),
                    e.call(this),
                    this.material = n,
                    this.useCullFace = !1,
                    this._UUID = RedGL.makeUUID()
            }
        ).prototype = new RedBaseContainer;
        var e = function() {
            this._geometry = RedLathe(this._redGL, this._pathString, this._numDivisions, this._capStart, this._capEnd, this._startAngle, this._endAngle, this._maxAngle, this._distance, this._tolerance, this._flipX, this._flipY)
        };
        Object.defineProperty(RedLatheMesh.prototype, "pathString", {
            get: function() {
                return this._pathString
            },
            set: function(t) {
                this._pathString = t,
                    e.call(this)
            }
        }),
            RedDefinePropertyInfo.definePrototype("RedLatheMesh", "numDivisions", "number", {
                min: 0,
                callback: e
            }),
            RedDefinePropertyInfo.definePrototype("RedLatheMesh", "capStart", "boolean", {
                callback: e
            }),
            RedDefinePropertyInfo.definePrototype("RedLatheMesh", "capEnd", "boolean", {
                callback: e
            }),
            RedDefinePropertyInfo.definePrototype("RedLatheMesh", "startAngle", "number", {
                min: 0,
                callback: e
            }),
            RedDefinePropertyInfo.definePrototype("RedLatheMesh", "endAngle", "number", {
                min: 0,
                callback: e
            }),
            RedDefinePropertyInfo.definePrototype("RedLatheMesh", "maxAngle", "number", {
                min: 0,
                callback: e
            }),
            RedDefinePropertyInfo.definePrototype("RedLatheMesh", "distance", "number", {
                min: 0,
                callback: e
            }),
            RedDefinePropertyInfo.definePrototype("RedLatheMesh", "tolerance", "number", {
                min: 0,
                callback: e
            }),
            RedDefinePropertyInfo.definePrototype("RedLatheMesh", "flipX", "boolean", {
                callback: e
            }),
            RedDefinePropertyInfo.definePrototype("RedLatheMesh", "flipY", "boolean", {
                callback: e
            }),
            Object.freeze(RedLatheMesh)
    }(),
    (RedSkyBox = function(e, t, r) {
            if (!(this instanceof RedSkyBox))
                return new RedSkyBox(e,t,r);
            e instanceof RedGL || RedGLUtil.throwFunc("RedSkyBox : RedGL Instance만 허용.", e),
                RedBaseObject3D.build.call(this, e.gl),
                this.geometry = RedBox(e),
                this.material = RedSkyBoxMaterial(e, RedBitmapCubeTexture(e, t)),
                this.cullFace = e.gl.FRONT,
                this.alpha = null == r ? 1 : r,
                this._UUID = RedGL.makeUUID()
        }
    ).prototype = new RedBaseObject3D,
    RedDefinePropertyInfo.definePrototype("RedSkyBox", "alpha", "number", {
        min: 0,
        max: 1,
        callback: function(e) {
            this.material.alpha = e
        }
    }),
    Object.defineProperty(RedSkyBox.prototype, "geometry", {
        get: function() {
            return this._geometry
        },
        set: function(e) {
            this._geometry && RedGLUtil.throwFunc("RedSkyBox : geometry - 임의로 설정을 허용하지 않음", "입력값 : " + e),
                this._geometry = e
        }
    }),
    Object.defineProperty(RedSkyBox.prototype, "material", {
        get: function() {
            return this._material
        },
        set: function(e) {
            e instanceof RedSkyBoxMaterial || RedGLUtil.throwFunc("RedSkyBox : RedSkyBoxMaterial Instance만 허용.", "입력값 : " + e),
                this._material = e
        }
    }),
    Object.freeze(RedSkyBox),
    (RedSprite3D = function(e, t) {
            if (!(this instanceof RedSprite3D))
                return new RedSprite3D(e,t);
            e instanceof RedGL || RedGLUtil.throwFunc("RedSprite3D : RedGL Instance만 허용.", e),
                RedBaseObject3D.build.call(this, e.gl),
                this.geometry = RedPlane(e, 1, 1, 0),
                this.material = t,
                this.perspectiveScale = !0,
                this.sprite3DYn = !0,
                this.useCullFace = !1,
                this._UUID = RedGL.makeUUID()
        }
    ).prototype = new RedBaseContainer,
    RedDefinePropertyInfo.definePrototype("RedSprite3D", "perspectiveScale", "boolean"),
    RedDefinePropertyInfo.definePrototype("RedSprite3D", "sprite3DYn", "boolean"),
    Object.defineProperty(RedSprite3D.prototype, "material", {
        get: function() {
            return this._material
        },
        set: function(e) {
            e instanceof RedColorMaterial || e instanceof RedBitmapMaterial || e instanceof RedSheetMaterial || e instanceof RedVideoMaterial || RedGLUtil.throwFunc("RedSprite3D : RedColorMaterial or RedBitmapMaterial or RedSheetMaterial Instance만 허용.", "입력값 : " + e),
                this._material = e
        }
    }),
    Object.freeze(RedSprite3D),
    function() {
        var e = function(e, t) {
            switch (e.boundBoxMode) {
                case RedTransformController.AABB:
                    !function(e, t) {
                        var r = t.volumeCalculateAABB()
                            , n = 0;
                        n < r.volume[0] && (n = r.volume[0]),
                        n < r.volume[1] && (n = r.volume[1]),
                        n < r.volume[2] && (n = r.volume[2]),
                        e.useScale && (e.rotationGroup.scaleX = e.rotationGroup.scaleY = e.rotationGroup.scaleZ = n),
                            e.boundBox.matrix = r.worldMatrix
                    }(e, t);
                    break;
                case RedTransformController.OBB:
                    !function(e, t) {
                        var r = t.volumeCalculateOBB()
                            , n = 0;
                        n < t.scaleX && (n = t.scaleX),
                        n < t.scaleY && (n = t.scaleY),
                        n < t.scaleZ && (n = t.scaleZ),
                        e.useScale && (e.rotationGroup.scaleX = e.rotationGroup.scaleY = e.rotationGroup.scaleZ = n),
                            e.boundBox.matrix = r.worldMatrix
                    }(e, t)
            }
        }
            , t = [];
        (RedTransformController = function(e) {
                if (!(this instanceof RedTransformController))
                    return new RedTransformController(e);
                e instanceof RedGL || RedGLUtil.throwFunc("RedTransformController : RedGL Instance만 허용.", e),
                    RedBaseObject3D.build.call(this, e.gl),
                    this._setRotationGroup(e),
                    this._setScaleGroup(e),
                    this._setPositionGroup(e),
                    this.boundBox = RedMesh(e, RedBox(e), RedColorMaterial(e)),
                    this.boundBox.drawMode = e.gl.LINE_LOOP,
                    this.boundBox.autoUpdateMatrix = !1,
                    this.children.push(this.boundBox),
                    this._boundBoxMode = RedTransformController.AABB,
                    this.downed = !1,
                    this.useScale = !0,
                    this.usePosition = !0,
                    this.useRotation = !0,
                    t.push(this),
                    this._UUID = RedGL.makeUUID()
            }
        ).AABB = "AABB",
            RedTransformController.OBB = "OBB",
            RedTransformController.prototype = new RedBaseContainer,
            Object.defineProperty(RedTransformController.prototype, "boundBoxMode", {
                get: function() {
                    return this._boundBoxMode
                },
                set: function(t) {
                    t !== RedTransformController.AABB && t !== RedTransformController.OBB && RedGLUtil.throwFunc("RedTransformController : boundBoxMode는 RedTransformController.AABB or RedTransformController.OBB만 허용함"),
                        this._boundBoxMode = t,
                        e(this, this._targetMesh)
                }
            }),
            RedDefinePropertyInfo.definePrototype("RedTransformController", "useScale", "boolean", {
                callback: function(e) {
                    t.forEach(function(t) {
                        t.scaleGroup.scaleX = t.scaleGroup.scaleY = t.scaleGroup.scaleZ = e ? 1 : 0
                    })
                }
            }),
            RedDefinePropertyInfo.definePrototype("RedTransformController", "usePosition", "boolean", {
                callback: function(e) {
                    t.forEach(function(t) {
                        t.positionGroup.scaleX = t.positionGroup.scaleY = t.positionGroup.scaleZ = e ? 1 : 0
                    })
                }
            }),
            RedDefinePropertyInfo.definePrototype("RedTransformController", "useRotation", "boolean", {
                callback: function(e) {
                    t.forEach(function(t) {
                        t.rotationGroup.scaleX = t.rotationGroup.scaleY = t.rotationGroup.scaleZ = e ? 1 : 0
                    })
                }
            }),
            RedTransformController.prototype._setScaleGroup = function(e) {
                var t, r, n = RedColorMaterial(e, "#ff0000", .5), i = RedColorMaterial(e, "#00ff00", .5), a = RedColorMaterial(e, "#0000ff", .5);
                r = RedSphere(e, .25),
                    this.scaleGroup = RedMesh(e),
                    this.children.push(this.scaleGroup),
                    (t = RedMesh(e, r, n)).x = 4,
                    t.useCullFace = !1,
                    t.depthTestFunc = e.gl.ALWAYS,
                    this.scalePointX = t,
                    this.scaleGroup.addChild(t),
                    (t = RedMesh(e, r, i)).y = 4,
                    t.useCullFace = !1,
                    t.depthTestFunc = e.gl.ALWAYS,
                    this.scalePointY = t,
                    this.scaleGroup.addChild(t),
                    (t = RedMesh(e, r, a)).z = 4,
                    t.useCullFace = !1,
                    t.depthTestFunc = e.gl.ALWAYS,
                    this.scalePointZ = t,
                    this.scaleGroup.addChild(t)
            }
            ,
            RedTransformController.prototype._setRotationGroup = function(e) {
                var t, r, n, i = RedColorMaterial(e, "#ff0000", 0), a = RedColorMaterial(e, "#00ff00", 0), o = RedColorMaterial(e, "#0000ff", 0);
                this.rotationGroup = RedMesh(e),
                    this.children.push(this.rotationGroup),
                    (t = RedMesh(e, RedSphere(e, 1, 32, 32, 32), i)).scaleZ = 0,
                    t.rotationX = 90,
                    t.rotationY = 90,
                    this.rotationGroup.addChild(t),
                    (r = RedMesh(e, RedSphere(e, 1, 32, 32, 32), a)).scaleZ = 0,
                    r.rotationZ = 90,
                    r.rotationX = 90,
                    this.rotationGroup.addChild(r),
                    (n = RedMesh(e, RedSphere(e, 1, 32, 32, 32), o)).scaleZ = 0,
                    this.rotationGroup.addChild(n),
                    this.rotationXLine = t,
                    this.rotationYLine = r,
                    this.rotationZLine = n,
                    t = RedLine(e, RedColorMaterial(e, "#ff0000", .75)),
                    r = RedLine(e, RedColorMaterial(e, "#00ff00", .75)),
                    n = RedLine(e, RedColorMaterial(e, "#0000ff", .75));
                var s = 36
                    , d = 2 * Math.PI / s;
                for (s = 36; s--; )
                    t.addPoint(Math.sin(d * s), Math.cos(d * s), 0);
                for (t.addPoint(Math.sin(d * s), Math.cos(d * s), 0),
                         s = 36; s--; )
                    r.addPoint(Math.sin(d * s), Math.cos(d * s), 0);
                for (r.addPoint(Math.sin(d * s), Math.cos(d * s), 0),
                         s = 36; s--; )
                    n.addPoint(Math.sin(d * s), Math.cos(d * s), 0);
                n.addPoint(Math.sin(d * s), Math.cos(d * s), 0),
                    this.rotationXLine.addChild(t),
                    this.rotationYLine.addChild(r),
                    this.rotationZLine.addChild(n)
            }
            ,
            RedTransformController.prototype._setPositionGroup = function(e) {
                var t, r, n, i, a, o, s;
                this.positionGroup = RedMesh(e),
                    this.addChild(this.positionGroup),
                    n = RedBox(e),
                    i = RedCylinder(e, 0, .5),
                    a = RedColorMaterial(e, "#ff0000", .5),
                    o = RedColorMaterial(e, "#00ff00", .5),
                    s = RedColorMaterial(e, "#0000ff", .5),
                    t = RedMesh(e, i, a),
                    (r = RedMesh(e, n, a)).depthTestFunc = e.gl.ALWAYS,
                    t.depthTestFunc = e.gl.ALWAYS,
                    r.scaleX = r.scaleY = r.scaleZ = .01,
                    r.scaleX = 5,
                    t.x = 5,
                    t.rotationZ = 90,
                    r.x = 2.5,
                    this.arrowX = t,
                    this.positionGroup.addChild(r),
                    this.positionGroup.addChild(t),
                    t = RedMesh(e, i, o),
                    (r = RedMesh(e, n, o)).depthTestFunc = e.gl.ALWAYS,
                    t.depthTestFunc = e.gl.ALWAYS,
                    r.scaleX = r.scaleY = r.scaleZ = .01,
                    r.scaleY = 5,
                    t.y = 5,
                    r.y = 2.5,
                    this.arrowY = t,
                    this.positionGroup.addChild(r),
                    this.positionGroup.addChild(t),
                    t = RedMesh(e, i, s),
                    (r = RedMesh(e, n, s)).depthTestFunc = e.gl.ALWAYS,
                    t.depthTestFunc = e.gl.ALWAYS,
                    r.scaleX = r.scaleY = r.scaleZ = .01,
                    r.scaleZ = 5,
                    t.z = 5,
                    t.rotationX = -90,
                    r.z = 2.5,
                    this.arrowZ = t,
                    this.positionGroup.addChild(r),
                    this.positionGroup.addChild(t);
                var d = RedMesh(e, RedSphere(e, .1, 32, 32, 32), RedColorMaterial(e, "#5b52aa", 1));
                d.depthTestFunc = e.gl.ALWAYS,
                    this.move = d,
                    this.positionGroup.addChild(d)
            }
            ,
            RedTransformController.prototype.setTarget = function(t, r) {
                var n, i, a = this, o = t.scene, s = t.camera, d = 0, l = [], u = [], c = [], f = 0;
                a._targetMesh = r,
                    a.scaleGroup.rotationX = r.rotationX,
                    a.scaleGroup.rotationY = r.rotationY,
                    a.scaleGroup.rotationZ = r.rotationZ,
                    a.rotationGroup.rotationX = r.rotationX,
                    a.rotationGroup.rotationY = r.rotationY,
                    a.rotationGroup.rotationZ = r.rotationZ,
                    a.x = r.x,
                    a.y = r.y,
                    a.z = r.z;
                var h = function(o) {
                    var h, R, m, p, _, g = RedGLUtil.screenToWorld([o.layerX, o.layerY, t._viewRect[2], t._viewRect[3]], s), P = [u[0] + g[0] - l[0], u[1] + g[1] - l[1], u[2] + g[2] - l[2]];
                    a.usePosition && (3 === d ? (a.x = r.x = P[0],
                        a.y = r.y = P[1],
                        a.z = r.z = P[2]) : 0 === d ? a.x = r.x = P[0] : 1 === d ? a.y = r.y = P[1] : 2 === d && (a.z = r.z = P[2])),
                    a.useScale && (7 === d && (r.scaleX = c[0] + (g[0] - l[0])),
                    8 === d && (r.scaleY = c[1] + (g[1] - l[1])),
                    9 === d && (r.scaleZ = c[2] + (g[2] - l[2]))),
                    a.useRotation && (4 !== d && 5 !== d && 6 !== d || (a.scaleGroup.rotationX = r.rotationX,
                        a.scaleGroup.rotationY = r.rotationY,
                        a.scaleGroup.rotationZ = r.rotationZ,
                        a.rotationGroup.rotationX = r.rotationX,
                        a.rotationGroup.rotationY = r.rotationY,
                        a.rotationGroup.rotationZ = r.rotationZ),
                        4 === d ? (h = f < t._viewRect[2] / 2 ? r.localToWorld(1, 0, 0) : r.localToWorld(-1, 0, 0),
                            R = vec3.dot(h, g),
                            m = vec3.dot(h, l),
                            p = mat4.clone(i),
                            mat4.scale(p, p, [1 / r.scaleX, 1 / r.scaleY, 1 / r.scaleZ]),
                            mat4.rotateX(p, p, -n[0] * Math.PI / 180),
                            mat4.rotateY(p, p, -n[1] * Math.PI / 180),
                            mat4.rotateZ(p, p, -n[2] * Math.PI / 180),
                            mat4.rotateZ(p, p, n[2] * Math.PI / 180),
                            mat4.rotateY(p, p, n[1] * Math.PI / 180),
                            mat4.rotateX(p, p, n[0] * Math.PI / 180 + R - m),
                            RedGLUtil.quaternionToRotationMat4(mat4.getRotation(quat.create(), p), p),
                            _ = RedGLUtil.mat4ToEuler(p, []),
                            r.rotationX = 180 * -_[0] / Math.PI,
                            r.rotationY = 180 * -_[1] / Math.PI,
                            r.rotationZ = 180 * -_[2] / Math.PI) : 5 === d ? (h = f < t._viewRect[2] / 2 ? r.localToWorld(0, -1, 0) : r.localToWorld(0, 1, 0),
                            R = vec3.dot(h, g),
                            m = vec3.dot(h, l),
                            p = mat4.clone(i),
                            mat4.scale(p, p, [1 / r.scaleX, 1 / r.scaleY, 1 / r.scaleZ]),
                            mat4.rotateY(p, p, -n[1] * Math.PI / 180),
                            mat4.rotateZ(p, p, -n[2] * Math.PI / 180),
                            mat4.rotateZ(p, p, n[2] * Math.PI / 180),
                            mat4.rotateY(p, p, n[1] * Math.PI / 180 + R - m),
                            RedGLUtil.quaternionToRotationMat4(mat4.getRotation(quat.create(), p), p),
                            _ = RedGLUtil.mat4ToEuler(p, []),
                            r.rotationX = 180 * -_[0] / Math.PI,
                            r.rotationY = 180 * -_[1] / Math.PI,
                            r.rotationZ = 180 * -_[2] / Math.PI) : 6 === d && (h = f < t._viewRect[2] / 2 ? [0, 0, -1] : [0, 0, 1],
                            R = 180 * vec3.dot(h, g) / Math.PI,
                            m = 180 * vec3.dot(h, l) / Math.PI,
                            r.rotationZ += R - m,
                            l = JSON.parse(JSON.stringify(g)))),
                        e(a, r)
                };
                [a.rotationXLine, a.rotationYLine, a.rotationZLine].forEach(function(e) {
                    o.mouseManager.add(e, "over", function() {
                        a.downed || (a.rotationXLine.material.alpha = 0,
                            a.rotationYLine.material.alpha = 0,
                            a.rotationZLine.material.alpha = 0,
                            this.material.alpha = .25)
                    }),
                        o.mouseManager.add(e, "out", function() {
                            a.downed || (a.rotationXLine.material.alpha = 0,
                                a.rotationYLine.material.alpha = 0,
                                a.rotationZLine.material.alpha = 0)
                        })
                }),
                    [a.arrowX, a.arrowY, a.arrowZ, a.move, a.rotationXLine, a.rotationYLine, a.rotationZLine, a.scalePointX, a.scalePointY, a.scalePointZ].forEach(function(e, R) {
                        o.mouseManager.remove(e, "down"),
                            o.mouseManager.add(e, "down", function(e) {
                                a.downed = !0,
                                    d = R,
                                    u = [a.x, a.y, a.z],
                                    c = [r.scaleX, r.scaleY, r.scaleZ],
                                    n = [r.rotationX, r.rotationY, r.rotationZ],
                                    i = mat4.clone(r.localMatrix),
                                    l = RedGLUtil.screenToWorld([e.nativeEvent.layerX, e.nativeEvent.layerY, t._viewRect[2], t._viewRect[3]], s),
                                    f = e.nativeEvent.layerX,
                                s.camera && (s.needUpdate = !1),
                                    document.body.addEventListener("mousemove", h),
                                    window.addEventListener("click", function() {
                                        s.camera && (s.needUpdate = !0),
                                            a.downed = !1,
                                            a.rotationXLine.material.alpha = 0,
                                            a.rotationYLine.material.alpha = 0,
                                            a.rotationZLine.material.alpha = 0,
                                            document.body.removeEventListener("mousemove", h)
                                    })
                            })
                    }),
                    e(a, r)
            }
            ,
            Object.freeze(RedTransformController)
    }(),
    (RedPointCloud = function() {}
    ).prototype = new RedBaseContainer,
    RedPointCloud.prototype.update = function(e) {
        this._geometry.interleaveBuffer.upload(new Float32Array(e))
    }
    ,
    Object.defineProperty(RedPointCloud.prototype, "geometry", {
        get: function() {
            return this._geometry
        },
        set: function(e) {
            this._geometry && RedGLUtil.throwFunc("RedPointCloud : geometry - 임의 설정을 허용하지 않음", "입력값 : " + e),
                this._geometry = e
        }
    }),
    Object.freeze(RedPointCloud),
    (RedParticleUnit = function(e) {
            this.startTime = null,
                this.age = 0,
                this.lifeTime = 2 == e.length ? Math.random() * (e[1] - e[0]) + e[0] : e[0],
                this.initLifeTime = this.lifeTime,
                this._gravitySum = 0
        }
    ).prototype.addRule = function(e, t) {
        this[e] = {
            startCenter: null,
            start: 2 == t.start.length ? Math.random() * (t.start[1] - t.start[0]) + t.start[0] : t.start,
            end: 2 == t.end.length ? Math.random() * (t.end[1] - t.end[0]) + t.end[0] : t.end,
            ease: t.ease
        },
            this[e].gap = this[e].end - this[e].start
    }
    ,
    Object.freeze(RedParticleUnit),
    (RedColorPointCloud = function(e, t, r) {
            if (!(this instanceof RedColorPointCloud))
                return new RedColorPointCloud(e,t,r);
            var n;
            t instanceof Array || RedGLUtil.throwFunc("RedLine : interleaveData - Array Instance만 허용.", "입력값 :", e),
            e instanceof RedGL || RedGLUtil.throwFunc("RedLine : RedGL Instance만 허용.", e),
                n = e.gl,
                RedBaseObject3D.build.call(this, n),
                this._UUID = RedGL.makeUUID(),
                this.geometry = RedGeometry(RedBuffer(e, "RedColorPointCloud_" + this._UUID, RedBuffer.ARRAY_BUFFER, new Float32Array(t), r, e.gl.DYNAMIC_DRAW)),
                this._material = RedColorPointCloudMaterial(e),
                this.drawMode = n.POINTS,
                this.useDepthMask = !1
        }
    ).prototype = new RedPointCloud,
    Object.defineProperty(RedColorPointCloud.prototype, "material", {
        get: function() {
            return this._material
        },
        set: function(e) {
            e instanceof RedColorPointCloudMaterial || RedGLUtil.throwFunc("RedColorPointCloud : material - RedColorPointCloudMaterial Instance 만 허용."),
                this._material = e
        }
    }),
    Object.freeze(RedColorPointCloud),
    (RedBitmapPointCloud = function(e, t, r, n) {
            if (!(this instanceof RedBitmapPointCloud))
                return new RedBitmapPointCloud(e,t,r,n);
            var i;
            t instanceof Array || RedGLUtil.throwFunc("RedLine : interleaveData - Array Instance만 허용.", "입력값 :", e),
            e instanceof RedGL || RedGLUtil.throwFunc("RedLine : RedGL Instance만 허용.", e),
                i = e.gl,
                RedBaseObject3D.build.call(this, i),
                this._UUID = RedGL.makeUUID(),
                this.geometry = RedGeometry(RedBuffer(e, "RedBitmapPointCloud_" + this._UUID, RedBuffer.ARRAY_BUFFER, new Float32Array(t), r, e.gl.DYNAMIC_DRAW)),
                this.material = n,
                this.drawMode = i.POINTS,
                this.useDepthMask = !1
        }
    ).prototype = new RedPointCloud,
    Object.defineProperty(RedBitmapPointCloud.prototype, "material", {
        get: function() {
            return this._material
        },
        set: function(e) {
            e instanceof RedBitmapPointCloudMaterial || RedGLUtil.throwFunc("RedBitmapPointCloud : material - RedBitmapPointCloudMaterial Instance만 허용."),
                this._material = e
        }
    }),
    Object.freeze(RedBitmapPointCloud),
    (RedParticleEmitter = function(e, t, r) {
            if (!(this instanceof RedParticleEmitter))
                return new RedParticleEmitter(e,t,r);
            RedBaseObject3D.build.call(this, e.gl),
                this.list = [],
                this._interleaveData = [],
                this.info = t,
                this.geometry = RedGeometry(RedBuffer(e, "RedParticleEmitter_Buffer" + RedGL.makeUUID(), RedBuffer.ARRAY_BUFFER, new Float32Array(this._interleaveData), [RedInterleaveInfo("aVertexPosition", 3), RedInterleaveInfo("aPointSize", 1), RedInterleaveInfo("aVertexColor", 4)], e.gl.DYNAMIC_DRAW)),
                this._material = RedParticleMaterial(e, r),
                this.drawMode = e.gl.POINTS,
                this.blendSrc = e.gl.SRC_ALPHA,
                this.blendDst = e.gl.ONE,
                this.useDepthMask = !1,
                this._UUID = RedGL.makeUUID()
        }
    ).TINT_RANDOM = "random",
RedParticleEmitter.QuintIn = 1,
RedParticleEmitter.QuintOut = 2,
RedParticleEmitter.QuintInOut = 3,
RedParticleEmitter.BackIn = 4,
RedParticleEmitter.BackOut = 5,
RedParticleEmitter.BackInOut = 6,
RedParticleEmitter.CircIn = 7,
RedParticleEmitter.CircOut = 8,
RedParticleEmitter.CircInOut = 9,
RedParticleEmitter.CubicIn = 10,
RedParticleEmitter.CubicOut = 11,
RedParticleEmitter.CubicInOut = 12,
RedParticleEmitter.ExpoIn = 13,
RedParticleEmitter.ExpoOut = 14,
RedParticleEmitter.ExpoInOut = 15,
RedParticleEmitter.QuadIn = 16,
RedParticleEmitter.QuadOut = 17,
RedParticleEmitter.QuadInOut = 18,
RedParticleEmitter.QuartIn = 19,
RedParticleEmitter.QuartOut = 20,
RedParticleEmitter.QuartInOut = 21,
RedParticleEmitter.SineIn = 22,
RedParticleEmitter.SineOut = 23,
RedParticleEmitter.SineInOut = 24,
RedParticleEmitter.ElasticIn = 25,
RedParticleEmitter.ElasticOut = 26,
RedParticleEmitter.ElasticInOut = 27,
RedParticleEmitter.prototype = new RedBaseObject3D,
RedParticleEmitter.prototype.reset = function() {
    this.list.length = 0,
        this._interleaveData.length = 0
}
,
RedParticleEmitter.prototype.update = function(e) {
    var t, r, n, i, a, o, s, d, l, u, c, f, h, R, m, p, _, g, P, v;
    if (e += 2e3,
        t = Math.pow,
        r = Math.sin,
        n = Math.cos,
        i = Math.sqrt,
        s = .5 * (a = Math.PI),
        o = 2 * a,
        d = this.list.length,
        R = (h = this.info).particle,
    d < h.max)
        for ((l = h.emitCount) + d > h.max && (l = h.max - d); l--; )
            m = this.list[d + l] = new RedParticleUnit(h.lifeTime),
                this._interleaveData.push(this.x, this.y, this.z),
                this._interleaveData.push(0),
                h.tint == RedParticleEmitter.TINT_RANDOM ? this._interleaveData.push(Math.random(), Math.random(), Math.random(), 1) : this._interleaveData.push(h.tint[0], h.tint[1], h.tint[2], 1),
            h.particle && (R.movementX && m.addRule("movementX", R.movementX),
            R.movementY && m.addRule("movementY", R.movementY),
            R.movementZ && m.addRule("movementZ", R.movementZ),
            R.scale && m.addRule("scale", R.scale),
            R.alpha && m.addRule("alpha", R.alpha));
    for (d = this.list.length,
             _ = "movementX,movementY,movementZ,scale,alpha".split(","); d--; )
        if ((u = this.list[d]).startTime || (u.startTime = e,
            u.age = 0),
            u.age = e - u.startTime,
            f = 8 * d,
        (c = u.age / u.lifeTime) < 1)
            for (v = c,
                 u.startCenter || (u.startCenter = [this.x, this.y, this.z]),
                     l = _.length; l--; )
                v = c,
                (p = u[g = _[l]].ease) && (1 == p ? v *= v * v * v * v : 2 == p ? v = (v -= 1) * v * v * v * v + 1 : 3 == p ? v = (v *= 2) < 1 ? v * v * v * v * v * .5 : .5 * ((v -= 2) * v * v * v * v + 2) : 4 == p ? v = v * v * (1.70158 * v + v - 1.70158) : 5 == p ? v = (v -= 1) * v * (1.70158 * v + v + 1.70158) + 1 : 6 == p ? v = (v *= 2) < 1 ? .5 * v * v * (1.70158 * v + v - 1.70158) : .5 * (v -= 2) * v * (1.70158 * v + v + 1.70158) + 1 : 7 == p ? v = -1 * (i(1 - v * v) - 1) : 8 == p ? v = i(1 - (v -= 1) * v) : 9 == p ? v = (v *= 2) < 1 ? -.5 * (i(1 - v * v) - 1) : .5 * i(1 - (v -= 2) * v) + .5 : 10 == p ? v *= v * v : 11 == p ? v = (v -= 1) * v * v + 1 : 12 == p ? v = (v *= 2) < 1 ? v * v * v * .5 : .5 * ((v -= 2) * v * v + 2) : 13 == p ? v = 0 == v ? 0 : t(2, 10 * (v - 1)) : 14 == p ? v = 1 == v ? 1 : 1 - t(2, -10 * v) : 15 == p ? v = (v *= 2) < 1 ? 0 == v ? 0 : .5 * t(2, 10 * (v - 1)) : 2 == v ? 1 : -.5 * t(2, -10 * (v - 1)) + 1 : 16 == p ? v *= v : 17 == p ? v *= 2 - v : 18 == p ? v = (v *= 2) < 1 ? v * v * .5 : .5 * ((2 - (v -= 1)) * v + 1) : 19 == p ? v *= v * v * v : 20 == p ? v = 1 - (v -= 1) * v * v * v : 21 == p ? v = (v *= 2) < 1 ? v * v * v * v * .5 : 1 - (v -= 2) * v * v * v * .5 : 22 == p ? v = 1 - n(v * s) : 23 == p ? v = r(v * s) : 24 == p ? v = .5 * (1 - n(v * a)) : 25 == p ? v = 0 === v ? 0 : 1 === v ? 1 : -1 * t(2, 10 * (v -= 1)) * r((v - .075) * o / .3) : 26 == p ? v = 0 === v ? 0 : 1 === v ? 1 : t(2, -10 * v) * r((v - .075) * o / .3) + 1 : 27 == p && (0 === v || 1 === v || (v *= 2),
                    v = v < 1 ? -.5 * t(2, 10 * (v -= 1)) * r((v - .075) * o / .3) : .5 * t(2, -10 * (v -= 1)) * r((v - .075) * o / .3) + 1)),
                "movementX" == g && (P = 0),
                "movementY" == g && (P = 1),
                "movementZ" == g && (P = 2),
                "scale" == g && (P = 3),
                "alpha" == g && (P = 7),
                    this._interleaveData[f + P] = P < 3 ? u.startCenter[P] + u[g].start + u[g].gap * v : u[g].start + u[g].gap * v,
                h.gravity && (u._gravitySum -= h.gravity),
                    this._interleaveData[f + 1] += u._gravitySum;
        else
            this._interleaveData[f + 0] = u.startCenter[0] = this.x,
                this._interleaveData[f + 1] = u.startCenter[1] = this.y,
                this._interleaveData[f + 2] = u.startCenter[2] = this.z,
                this._interleaveData[f + 3] = u.scale.start,
                h.tint == RedParticleEmitter.TINT_RANDOM ? (this._interleaveData[f + 4] = Math.random(),
                    this._interleaveData[f + 5] = Math.random(),
                    this._interleaveData[f + 6] = Math.random()) : (this._interleaveData[f + 4] = h.tint[0],
                    this._interleaveData[f + 5] = h.tint[1],
                    this._interleaveData[f + 6] = h.tint[2]),
                this._interleaveData[f + 7] = 0,
                u._gravitySum = 0,
                u.startTime = null,
                u.age = -1;
    this._geometry.interleaveBuffer.upload(new Float32Array(this._interleaveData))
}
,
RedDefinePropertyInfo.definePrototype("RedParticleEmitter", "diffuseTexture", "sampler2D", {
    callback: function(e) {
        this.material.diffuseTexture = e
    }
}),
Object.freeze(RedParticleEmitter),
function() {
    var e, t, r;
    r = function(e, r, n, i, a, o, s, d, l, u, c, f) {
        var h, R, m = d / c, p = l / f, _ = d / 2, g = l / 2, P = u / 2, v = c + 1, y = f + 1, E = 0, M = [];
        for (R = 0; R < y; R++) {
            var b = R * p - g;
            for (h = 0; h < v; h++) {
                var L = h * m - _;
                M[n] = L * o,
                    M[i] = b * s,
                    M[a] = P,
                    e.push(M.x, M.y, M.z),
                    M[n] = 0,
                    M[i] = 0,
                    M[a] = u > 0 ? 1 : -1,
                    e.push(M.x, M.y, M.z),
                    e.push(h / c, R / f),
                    E += 1
            }
        }
        for (R = 0; R < f; R++)
            for (h = 0; h < c; h++) {
                var T = t + h + v * R
                    , x = t + h + v * (R + 1)
                    , I = t + (h + 1) + v * (R + 1)
                    , w = t + (h + 1) + v * R;
                r.push(T, x, w, x, I, w),
                    6
            }
        t += E
    }
        ,
        e = function(e, n, i, a, o, s, d, l) {
            var u = []
                , c = [];
            return t = 0,
                r(u, c, "z", "y", "x", -1, -1, o, a, i, l, d),
                r(u, c, "z", "y", "x", 1, -1, o, a, -i, l, d),
                r(u, c, "x", "z", "y", 1, 1, i, o, a, s, l),
                r(u, c, "x", "z", "y", 1, -1, i, o, -a, s, l),
                r(u, c, "x", "y", "z", 1, -1, i, a, o, s, d),
                r(u, c, "x", "y", "z", -1, -1, i, a, -o, s, d),
                {
                    interleaveData: u,
                    indexData: c,
                    type: n,
                    interleaveBuffer: RedBuffer(e, n + "_interleaveBuffer", RedBuffer.ARRAY_BUFFER, new Float32Array(u), [RedInterleaveInfo("aVertexPosition", 3), RedInterleaveInfo("aVertexNormal", 3), RedInterleaveInfo("aTexcoord", 2)]),
                    indexBuffer: RedBuffer(e, n + "_indexBuffer", RedBuffer.ELEMENT_ARRAY_BUFFER, new Uint16Array(c))
                }
        }
        ,
        (RedBox = function(t, r, n, i, a, o, s) {
                return this instanceof RedBox ? (t instanceof RedGL || RedGLUtil.throwFunc("RedBox : RedGL Instance만 허용.", t),
                    d = "RedBox_" + (r = r || 1) + "_" + (n = n || 1) + "_" + (i = i || 1) + "_" + (a = a || 1) + "_" + (o = o || 1) + "_" + (s = s || 1),
                t._datas.Primitives || (t._datas.Primitives = {}),
                    t._datas.Primitives[d] ? t._datas.Primitives[d] : (t._datas.Primitives[d] = this,
                        l = e(t, d, r, n, i, a, o, s),
                        this.interleaveBuffer = l.interleaveBuffer,
                        this.indexBuffer = l.indexBuffer,
                        this.interleaveBuffer.isPrimitiveBuffer = !0,
                        this.indexBuffer.isPrimitiveBuffer = !0,
                        this._makeInfo = {
                            width: r,
                            height: n,
                            depth: i,
                            wSegments: a,
                            hSegments: o,
                            dSegments: s
                        },
                        void (this._UUID = RedGL.makeUUID()))) : new RedBox(t,r,n,i,a,o,s);
                var d, l
            }
        ).prototype = Object.create(RedGeometry.prototype),
        Object.freeze(RedBox)
}(),
function() {
    var e, t;
    e = function(e, r, n, i, a, o, s, d, l, u) {
        var c = []
            , f = []
            , h = 0
            , R = []
            , m = a / 2;
        return t = function(e) {
            var t, r, a, s = [], d = [], R = !0 === e ? n : i, p = !0 === e ? 1 : -1;
            for (r = h,
                     t = 1; t <= o; t++)
                c.push(0, m * p, 0),
                    c.push(0, p, 0),
                    c.push(.5, .5),
                    h++;
            for (a = h,
                     t = 0; t <= o; t++) {
                var _ = t / o * u + l
                    , g = Math.cos(_)
                    , P = Math.sin(_);
                d[0] = R * P,
                    d[1] = m * p,
                    d[2] = R * g,
                    c.push(d[0], d[1], d[2]),
                    c.push(0, p, 0),
                    s[0] = .5 * g + .5,
                    s[1] = .5 * P * p + .5,
                    c.push(s[0], 1 - s[1]),
                    h++
            }
            for (t = 0; t < o; t++) {
                var v = r + t
                    , y = a + t;
                !0 === e ? f.push(y, y + 1, v) : f.push(y + 1, y, v),
                    3
            }
        }
            ,
            function() {
                var e, t, r = [], d = [], p = (i - n) / a;
                for (t = 0; t <= s; t++) {
                    var _ = []
                        , g = t / s
                        , P = g * (i - n) + n;
                    for (e = 0; e <= o; e++) {
                        var v = e / o
                            , y = v * u + l
                            , E = Math.sin(y)
                            , M = Math.cos(y);
                        d[0] = P * E,
                            d[1] = -g * a + m,
                            d[2] = P * M,
                            c.push(d[0], d[1], d[2]),
                            r[0] = E,
                            r[1] = p,
                            r[2] = M,
                            vec3.normalize(r, r),
                            c.push(r[0], r[1], r[2]),
                            c.push(v, g),
                            _.push(h++)
                    }
                    R.push(_)
                }
                for (e = 0; e < o; e++)
                    for (t = 0; t < s; t++) {
                        var b = R[t][e]
                            , L = R[t + 1][e]
                            , T = R[t + 1][e + 1]
                            , x = R[t][e + 1];
                        f.push(b, L, x),
                            f.push(L, T, x),
                            6
                    }
            }(),
        !1 === d && (n > 0 && t(!0),
        i > 0 && t(!1)),
            {
                interleaveData: c,
                indexData: f,
                type: r,
                interleaveBuffer: RedBuffer(e, r + "_interleaveBuffer", RedBuffer.ARRAY_BUFFER, new Float32Array(c), [RedInterleaveInfo("aVertexPosition", 3), RedInterleaveInfo("aVertexNormal", 3), RedInterleaveInfo("aTexcoord", 2)]),
                indexBuffer: RedBuffer(e, r + "_indexBuffer", RedBuffer.ELEMENT_ARRAY_BUFFER, new Uint16Array(f))
            }
    }
        ,
        (RedCylinder = function(t, r, n, i, a, o, s, d, l) {
                return this instanceof RedCylinder ? (t instanceof RedGL || RedGLUtil.throwFunc("RedPrimitive : RedGL Instance만 허용.", t),
                    u = "RedCylinder_" + (r = void 0 !== r ? r : 1) + "_" + (n = void 0 !== n ? n : 1) + "_" + (i = void 0 !== i ? i : 1) + "_" + (a = Math.floor(a) || 8) + "_" + (o = Math.floor(o) || 1) + "_" + (s = void 0 !== s && s) + "_" + (d = void 0 !== d ? d : 0) + "_" + (l = void 0 !== l ? l : 2 * Math.PI),
                t._datas.Primitives || (t._datas.Primitives = {}),
                    t._datas.Primitives[u] ? t._datas.Primitives[u] : (t._datas.Primitives[u] = this,
                        c = e(t, u, r, n, i, a, o, s, d, l),
                        this.interleaveBuffer = c.interleaveBuffer,
                        this.indexBuffer = c.indexBuffer,
                        this.interleaveBuffer.isPrimitiveBuffer = !0,
                        this.indexBuffer.isPrimitiveBuffer = !0,
                        void (this._UUID = RedGL.makeUUID()))) : new RedCylinder(t,r,n,i,a,o,s,d,l);
                var u, c
            }
        ).prototype = Object.create(RedGeometry.prototype),
        Object.freeze(RedCylinder)
}(),
function() {
    var e, t, r, n, i, a, o, s, d, l, u, c, f, h, R, m, p;
    e = function(e, _, g, P, v, y, E) {
        t = g / 2,
            r = P / 2,
            n = Math.floor(v) || 1,
            i = Math.floor(y) || 1,
            a = n + 1,
            o = i + 1,
            s = g / n,
            d = P / i;
        var M = []
            , b = [];
        for (u = 0; u < o; u++)
            for (f = u * d - r,
                     l = 0; l < a; l++)
                c = l * s - t,
                    M.push(c, -f, 0, 0, 0, 1, l / n, E ? 1 - u / i : u / i);
        for (u = 0; u < i; u++)
            for (l = 0; l < n; l++)
                h = l + a * u,
                    R = l + a * (u + 1),
                    m = l + 1 + a * (u + 1),
                    p = l + 1 + a * u,
                    b.push(h, R, p, R, m, p);
        return {
            interleaveData: M,
            indexData: b,
            type: _,
            interleaveBuffer: RedBuffer(e, _ + "_interleaveBuffer", RedBuffer.ARRAY_BUFFER, new Float32Array(M), [RedInterleaveInfo("aVertexPosition", 3), RedInterleaveInfo("aVertexNormal", 3), RedInterleaveInfo("aTexcoord", 2)]),
            indexBuffer: RedBuffer(e, _ + "_indexBuffer", RedBuffer.ELEMENT_ARRAY_BUFFER, new Uint32Array(b))
        }
    }
        ,
        (RedPlane = function(t, r, n, i, a, o) {
                return this instanceof RedPlane ? (t instanceof RedGL || RedGLUtil.throwFunc("RedPlane : RedGL Instance만 허용.", t),
                    s = "RedPlane_" + (r = r || 1) + "_" + (n = n || 1) + "_" + (i = i || 1) + "_" + (a = a || 1) + "_" + (o = !!o),
                t._datas.Primitives || (t._datas.Primitives = {}),
                    t._datas.Primitives[s] ? t._datas.Primitives[s] : (t._datas.Primitives[s] = this,
                        d = e(t, s, r, n, i, a, o),
                        this.interleaveBuffer = d.interleaveBuffer,
                        this.indexBuffer = d.indexBuffer,
                        this.interleaveBuffer.isPrimitiveBuffer = !0,
                        this.indexBuffer.isPrimitiveBuffer = !0,
                        this._makeInfo = {
                            width: r,
                            height: n,
                            wSegments: i,
                            hSegments: a,
                            flipY: o
                        },
                        void (this._UUID = RedGL.makeUUID()))) : new RedPlane(t,r,n,i,a,o);
                var s, d
            }
        ).prototype = Object.create(RedGeometry.prototype),
        Object.freeze(RedPlane)
}(),
function() {
    var e, t, r, n, i, a, o, s, d, l, u, c;
    l = [],
        u = new Float32Array([0, 0, 0]),
        c = new Float32Array([0, 0, 0]),
        e = function(e, f, h, R, m, p, _, g, P) {
            t = g + P,
                i = 0,
                l.length = 0,
                u[0] = 0,
                u[1] = 0,
                u[2] = 0,
                c[0] = 0,
                c[1] = 0,
                c[2] = 0;
            var v = []
                , y = [];
            for (n = 0; n <= m; n++) {
                var E = []
                    , M = n / m;
                for (r = 0; r <= R; r++) {
                    var b = r / R;
                    u.x = -h * Math.cos(p + b * _) * Math.sin(g + M * P),
                        u.y = h * Math.cos(g + M * P),
                        u.z = h * Math.sin(p + b * _) * Math.sin(g + M * P),
                        v.push(u.x, u.y, u.z),
                        c[0] = u.x,
                        c[1] = u.y,
                        c[2] = u.z,
                        vec3.normalize(c, c),
                        v.push(c[0], c[1], c[2]),
                        v.push(b, M),
                        E.push(i++)
                }
                l.push(E)
            }
            for (n = 0; n < m; n++)
                for (r = 0; r < R; r++)
                    a = l[n][r + 1],
                        o = l[n][r],
                        s = l[n + 1][r],
                        d = l[n + 1][r + 1],
                    (0 !== n || g > 0) && y.push(a, o, d),
                    (n !== m - 1 || t < Math.PI) && y.push(o, s, d);
            return {
                interleaveData: v,
                indexData: y,
                type: f,
                interleaveBuffer: RedBuffer(e, f + "_interleaveBuffer", RedBuffer.ARRAY_BUFFER, new Float32Array(v), [RedInterleaveInfo("aVertexPosition", 3), RedInterleaveInfo("aVertexNormal", 3), RedInterleaveInfo("aTexcoord", 2)]),
                indexBuffer: RedBuffer(e, f + "_indexBuffer", RedBuffer.ELEMENT_ARRAY_BUFFER, new Uint16Array(y))
            }
        }
        ,
        (RedSphere = function(t, r, n, i, a, o, s, d) {
                return this instanceof RedSphere ? (t instanceof RedGL || RedGLUtil.throwFunc("RedPrimitive : RedGL Instance만 허용.", t),
                    l = "RedSphere_" + (r = r || 1) + "_" + (n = Math.max(3, Math.floor(n) || 8)) + "_" + (i = Math.max(2, Math.floor(i) || 6)) + "_" + (a = void 0 !== a ? a : 0) + "_" + (o = void 0 !== o ? o : 2 * Math.PI) + "_" + (s = void 0 !== s ? s : 0) + "_" + (d = void 0 !== d ? d : Math.PI),
                t._datas.Primitives || (t._datas.Primitives = {}),
                    t._datas.Primitives[l] ? t._datas.Primitives[l] : (t._datas.Primitives[l] = this,
                        u = e(t, l, r, n, i, a, o, s, d),
                        this.interleaveBuffer = u.interleaveBuffer,
                        this.indexBuffer = u.indexBuffer,
                        this.interleaveBuffer.isPrimitiveBuffer = !0,
                        this.indexBuffer.isPrimitiveBuffer = !0,
                        this._makeInfo = {
                            radius: r,
                            widthSegments: n,
                            heightSegments: i,
                            phiStart: a,
                            phiLength: o,
                            thetaStart: s,
                            thetaLength: d
                        },
                        void (this._UUID = RedGL.makeUUID()))) : new RedSphere(t,r,n,i,a,o,s,d);
                var l, u
            }
        ).prototype = Object.create(RedGeometry.prototype),
        Object.freeze(RedSphere)
}(),
function() {
    var e, t, r, n, i, a, o, s, d, l, u;
    r = 2,
        e = function(e, t, r, n) {
            if (i = e.createProgram(),
                e.attachShader(i, r.webglShader),
                e.attachShader(i, n.webglShader),
                r.parseData.uniform)
                for (s in a = r.parseData.uniform.map,
                    o = n.parseData.uniform.map,
                    a)
                    o[s] && RedGLUtil.throwFunc("vertexShader와 fragmentShader에 중복된 유니폼 선언이 존재함.", "중복선언 : " + s);
            if (r.parseData.const)
                for (s in a = r.parseData.const.map,
                    o = n.parseData.const.map,
                    a)
                    o[s] && RedGLUtil.throwFunc("vertexShader와 fragmentShader에 중복된 상수 선언이 존재함.", "중복선언 : " + s);
            return e.linkProgram(i),
            e.getProgramParameter(i, e.LINK_STATUS) || RedGLUtil.throwFunc("RedProgram : 프로그램을 초기화 할 수 없습니다.", e.getProgramInfoLog(i)),
                i.key = t,
                i.vShaderKey = r.key,
                i.vShaderOriginSource = r.originSource,
                i.fShaderKey = n.key,
                i.fShaderOriginKey = r.originSource,
                i
        }
        ,
        u = {},
        d = function() {}
        ,
        l = function() {}
        ,
        t = function(e, t, i) {
            var a, o, s, c;
            if (i.parseData.attribute)
                for (a = (s = i.parseData.attribute.list).length; a--; )
                    o = s[a],
                        (p = new d)._UUID = RedGL.makeUUID(),
                        p.location = t.getAttribLocation(e.webglProgram, o.name),
                        -1 == p.location ? (p.msg = "쉐이더 main 함수에서 사용되고 있지 않음",
                            p.use = !1) : p.use = !0,
                        p.attributeType = o.attributeType,
                        p.name = o.name,
                        p.enabled = !1,
                        c = e.attributeLocation.length,
                    -1 != p.location && (e.attributeLocation[c] = p),
                        e.attributeLocation[p.name] = p;
            if (i.parseData.uniform)
                for (a = (s = i.parseData.uniform.list).length; a--; ) {
                    var f, h, R, m, p;
                    switch (o = s[a],
                        (p = new l)._UUID = RedGL.makeUUID(),
                        p.uniformType = o.uniformType,
                        f = o.arrayNum,
                        R = 1e5,
                        o.uniformType) {
                        case "sampler2D":
                            h = "sampler2D",
                                R = 0,
                                m = "uniform1i",
                                p.samplerIndex = r,
                            ++r === n && (r = 2);
                            break;
                        case "samplerCube":
                            h = "samplerCube",
                                R = 1,
                                m = "uniform1i",
                                p.samplerIndex = r,
                            ++r === n && (r = 2);
                            break;
                        case "float":
                            h = "float",
                                R = f ? 12 : 11,
                                m = f ? "uniform1fv" : "uniform1f";
                            break;
                        case "int":
                            h = "int",
                                R = f ? 12 : 11,
                                m = f ? "uniform1iv" : "uniform1i";
                            break;
                        case "bool":
                            h = "bool",
                                R = f ? 12 : 11,
                                m = f ? "uniform1iv" : "uniform1i";
                            break;
                        case "vec4":
                            h = "vec",
                                R = 12,
                                m = "uniform4fv";
                            break;
                        case "vec3":
                            h = "vec",
                                R = 12,
                                m = "uniform3fv";
                            break;
                        case "vec2":
                            h = "vec",
                                R = 12,
                                m = "uniform2fv";
                            break;
                        case "ivec4":
                            h = "vec",
                                R = 12,
                                m = "uniform4iv";
                            break;
                        case "ivec3":
                            h = "vec",
                                R = 12,
                                m = "uniform3iv";
                            break;
                        case "ivec2":
                            h = "vec",
                                R = 12,
                                m = "uniform2iv";
                            break;
                        case "bvec4":
                            h = "vec",
                                R = 12,
                                m = "uniform4iv";
                            break;
                        case "bvec3":
                            h = "vec",
                                R = 12,
                                m = "uniform3iv";
                            break;
                        case "bvec2":
                            h = "vec",
                                R = 12,
                                m = "uniform2iv";
                            break;
                        case "mat4":
                            h = "mat",
                                R = 13,
                                m = "uniformMatrix4fv";
                            break;
                        case "mat3":
                            h = "mat",
                                R = 13,
                                m = "uniformMatrix3fv";
                            break;
                        case "mat2":
                            h = "mat",
                                R = 13,
                                m = "uniformMatrix2fv"
                    }
                    p.location = t.getUniformLocation(e.webglProgram, o.name),
                        p.renderType = h,
                        p.renderMethod = m,
                        p.renderTypeIndex = R,
                        p.name = o.name,
                    u[o.name] || (u[o.name] = o.name.charAt(1).toLowerCase() + o.name.substr(2)),
                        p.materialPropertyName = u[o.name],
                        p.arrayNum = o.arrayNum,
                        p.location ? p.use = !0 : (p.msg = "쉐이더 main 함수에서 사용되고 있지 않음",
                            p.use = !1),
                        o.systemUniformYn ? (c = e.systemUniformLocation.length,
                        p.use && (e.systemUniformLocation[c] = p),
                            e.systemUniformLocation[o.name] = p) : (c = e.uniformLocation.length,
                        p.use && (e.uniformLocation[c] = p),
                            e.uniformLocation[o.name] = p)
                }
        }
        ,
        (RedProgram = function(r, i, a, o) {
                var s, d, l;
                return this instanceof RedProgram ? (r instanceof RedGL || RedGLUtil.throwFunc("RedProgram : RedGL Instance만 허용.", "입력값 : " + r),
                "string" == typeof i || RedGLUtil.throwFunc("RedProgram : key - 문자열만 허용.", "입력값 : " + i),
                    s = r.gl,
                r._datas.RedProgram || (r._datas.RedProgram = {},
                    r._datas.RedProgramList = []),
                    RedProgram.hasKey(r, i) ? r._datas.RedProgram[i] : (d = a ? RedShader(r, i + "_VS", RedShader.VERTEX, a) : null,
                        l = o ? RedShader(r, i + "_FS", RedShader.FRAGMENT, o) : null,
                        d && l ? r._datas.RedProgram[i] = this : RedGLUtil.throwFunc("RedProgram : 신규 생성시 vertexShader, fragmentShader 모두 입력해야함."),
                        r._datas.RedProgramList.push(this),
                        this.key = i,
                        this.webglProgram = e(s, i, d, l),
                        this.attributeLocation = [],
                        this.uniformLocation = [],
                        this.systemUniformLocation = [],
                        s.useProgram(this.webglProgram),
                        n = r.detect.texture.MAX_COMBINED_TEXTURE_IMAGE_UNITS,
                        t(this, s, d),
                        t(this, s, l),
                        void (this._UUID = RedGL.makeUUID()))) : new RedProgram(r,i,a,o)
            }
        ).prototype = {},
        RedProgram.hasKey = function(e, t) {
            return e instanceof RedGL || RedGLUtil.throwFunc("RedProgram : RedGL Instance만 허용.", "입력값 : " + e),
            e._datas.RedProgram || (e._datas.RedProgram = {},
                e._datas.RedProgramList = []),
                !!e._datas.RedProgram[t]
        }
        ,
        RedProgram.makeProgram = function(e, t, r, n, i) {
            var a;
            t.indexOf("_") > -1 && RedGLUtil.throwFunc("RedProgram : 프로그램이름에 _ 는 허용하지 않음.", "입력값 : " + t),
                r = "string" == typeof r ? r : RedGLUtil.getStrFromComment(r.toString()),
                n = "string" == typeof n ? n : RedGLUtil.getStrFromComment(n.toString());
            var o = !1
                , s = !1
                , d = !1
                , l = !1;
            for (var u in RedSystemShaderCode.vertexShareFunc)
                a = new RegExp("//#REDGL_DEFINE#vertexShareFunc#" + u + "#","gi"),
                    r = r.replace(a, RedSystemShaderCode.vertexShareFunc[u]);
            for (var u in RedSystemShaderCode.fragmentShareFunc)
                a = new RegExp("//#REDGL_DEFINE#fragmentShareFunc#" + u + "#","gi"),
                    n = n.replace(a, RedSystemShaderCode.fragmentShareFunc[u]);
            if (i) {
                i.sort(),
                    t += "_" + i.join("_");
                for (var c = i.length; c--; )
                    "fog" === i[c] && (o = !0),
                    "sprite3D" === i[c] && (s = !0),
                    "directionalShadow" === i[c] && (d = !0),
                    "skin" === i[c] && (l = !0),
                    "fog" !== i[c] && "sprite3D" != i[c] && "directionalShadow" != i[c] && "skin" != i[c] && (a = new RegExp("//#REDGL_DEFINE#" + i[c] + "#","gi"),
                        r = r.replace(a, ""),
                        n = n.replace(a, ""))
            }
            return a = new RegExp("//#REDGL_DEFINE#fog#" + (o ? "true" : "false") + "#","gi"),
                r = r.replace(a, ""),
                n = n.replace(a, ""),
                a = new RegExp("//#REDGL_DEFINE#sprite3D#" + (s ? "true" : "false") + "#","gi"),
                r = r.replace(a, ""),
                n = n.replace(a, ""),
                a = new RegExp("//#REDGL_DEFINE#directionalShadow#" + (d ? "true" : "false") + "#","gi"),
                r = r.replace(a, ""),
                n = n.replace(a, ""),
                a = new RegExp("//#REDGL_DEFINE#skin#" + (l ? "true" : "false") + "#","gi"),
                r = r.replace(a, ""),
                n = n.replace(a, ""),
                RedProgram(e, t, r, n, i)
        }
        ,
        Object.freeze(RedProgram)
}(),
(RedSystemShaderCode = {}).init = function(e) {
    var t, r, n = e.detect;
    r = parseInt(Math.floor(Math.min((n.vertexShader.MAX_VERTEX_UNIFORM_VECTORS - 64) / 8, 128))),
        t = parseInt(Math.floor(Math.min((n.fragmentShader.MAX_FRAGMENT_UNIFORM_VECTORS - 64) / 4, 128))),
        (RedSystemShaderCode = {
            vertexShareDeclare: ["attribute vec3 aVertexPosition", "attribute vec3 aVertexNormal", "attribute vec4 aVertexColor", "attribute vec4 aVertexWeight", "attribute vec4 aVertexJoint", "varying vec4 vVertexPosition", "varying vec3 vVertexNormal", "varying vec4 vVertexColor", "attribute float aPointSize", "uniform float uPointSize", "attribute vec2 aTexcoord", "attribute vec2 aTexcoord1", "varying vec2 vTexcoord", "varying vec2 vTexcoord1", "uniform bool uMode2DYn", "uniform float uTime", "varying float vTime", "uniform vec2 uResolution", "varying vec2 vResolution", "uniform mat4 uMMatrix", "uniform mat4 uNMatrix", "uniform mat4 uPMatrix", "uniform mat4 uCameraMatrix", "uniform bool u_PerspectiveScale", "uniform mat4 uDirectionalShadowLightMatrix", "varying highp vec4 vShadowPos", "const mat4 cTexUnitConverter = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0)", "uniform mat4 uJointMatrix[" + r + "]", "uniform mat4 uInverseBindMatrixForJoint[" + r + "]", "uniform mat4 uGlobalTransformOfNodeThatTheMeshIsAttachedTo"],
            fragmentShareDeclare: ["varying vec4 vVertexPosition", "varying vec3 vVertexNormal", "varying vec4 vVertexColor", "varying vec2 vTexcoord", "varying vec2 vTexcoord1", "varying float vTime", "varying vec2 vResolution", "uniform vec3 uCameraPosition", "uniform float u_FogDistance", "uniform float u_FogDensity", "uniform vec4 uFogColor", "const int cDIRETIONAL_MAX = 3", "uniform vec3 uDirectionalLightPositionList[3]", "uniform vec4 uDirectionalLightColorList[3]", "uniform float uDirectionalLightIntensityList[3]", "uniform int uDirectionalLightNum", "const int cPOINT_MAX = " + t, "uniform vec3 uPointLightPositionList[" + t + "]", "uniform vec4 uPointLightColorList[" + t + "]", "uniform float uPointLightRadiusList[" + t + "]", "uniform float uPointLightIntensityList[" + t + "]", "uniform int uPointLightNum", "uniform vec4 uAmbientLightColor", "uniform float uAmbientIntensity", "uniform sampler2D uDirectionalShadowTexture", "varying highp vec4 vShadowPos"],
            systemUniform: {},
            vertexShareFunc: {
                getSkinMatrix: ["//#REDGL_DEFINE#skin#true#  mat4 getSkinMatrix(){", "//#REDGL_DEFINE#skin#true#      mat4 skinMat =", "//#REDGL_DEFINE#skin#true#      aVertexWeight.x * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.x) ] * uInverseBindMatrixForJoint[int(aVertexJoint.x)]+", "//#REDGL_DEFINE#skin#true#      aVertexWeight.y * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.y) ] * uInverseBindMatrixForJoint[int(aVertexJoint.y)]+", "//#REDGL_DEFINE#skin#true#      aVertexWeight.z * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.z) ] * uInverseBindMatrixForJoint[int(aVertexJoint.z)]+", "//#REDGL_DEFINE#skin#true#      aVertexWeight.w * uGlobalTransformOfNodeThatTheMeshIsAttachedTo * uJointMatrix[ int(aVertexJoint.w) ] * uInverseBindMatrixForJoint[int(aVertexJoint.w)];", "//#REDGL_DEFINE#skin#true#      return skinMat;", "//#REDGL_DEFINE#skin#true#  }"].join("\n"),
                getSprite3DMatrix: ["mat4 getSprite3DMatrix(mat4 cameraMTX, mat4 mvMatrix){", "   mat4 cacheScale = mat4(", "      mvMatrix[0][0], 0.0, 0.0, 0.0,", "       0.0, mvMatrix[1][1], 0.0, 0.0,", "      0.0, 0.0, 1.0, mvMatrix[2][2],", "      0.0, 0.0, 0.0, 1.0", "   );", "   mat4 tMTX = cameraMTX * mvMatrix;", "   tMTX[0][0] = 1.0, tMTX[0][1] = 0.0, tMTX[0][2] = 0.0,", "   tMTX[1][0] = 0.0, tMTX[1][1] = 1.0, tMTX[1][2] = 0.0,", "   tMTX[2][0] = 0.0, tMTX[2][1] = 0.0, tMTX[2][2] = 1.0;", "   return tMTX * cacheScale;", "}"].join("\n")
            },
            fragmentShareFunc: {
                getFlatNormal: ["vec3 getFlatNormal(vec3 vertexPosition){", "   vec3 dx = dFdx(vVertexPosition.xyz);", "   vec3 dy = dFdy(vVertexPosition.xyz);", "   return normalize(cross(normalize(dx), normalize(dy)));", "}"].join("\n"),
                getDirectionalLightColor: ["vec4 getDirectionalLightColor(      vec4 texelColor,      vec3 N,      float shininess,      vec4 specularLightColor,      float specularTextureValue,      float specularPower) {", "   vec3 L;", "   float specular;", "   float lambertTerm;", "   vec4 ld = vec4(0.0, 0.0, 0.0, 1.0);", "   vec4 ls = vec4(0.0, 0.0, 0.0, 1.0);", "   for(int i=0; i<cDIRETIONAL_MAX; i++){", "      if(i == uDirectionalLightNum) break;", "      L = normalize(-uDirectionalLightPositionList[i]);", "      lambertTerm = dot(N,-L);", "      if(lambertTerm > 0.0){", "         ld += uDirectionalLightColorList[i] * texelColor * lambertTerm * uDirectionalLightIntensityList[i];", "         specular = pow( max(dot(reflect(L, N), -L), 0.0), shininess) * specularPower * specularTextureValue;", "         ls +=  specularLightColor * specular * uDirectionalLightIntensityList[i] * uDirectionalLightColorList[i].a;", "      }", "   }", "   return ld + ls;", "}"].join("\n"),
                getPointLightColor: ["vec4 getPointLightColor(      vec4 texelColor,      vec3 N,      float shininess,      vec4 specularLightColor,      float specularTextureValue,      float specularPower) {", "   vec3 L;", "   float specular;", "   float lambertTerm;", "   vec4 ld = vec4(0.0, 0.0, 0.0, 1.0);", "   vec4 ls = vec4(0.0, 0.0, 0.0, 1.0);", "   float distanceLength;", "   float attenuation;", "   for(int i=0;i<cPOINT_MAX;i++){", "      if(i== uPointLightNum) break;", "      L =  -uPointLightPositionList[i] + vVertexPosition.xyz;", "      distanceLength = abs(length(L));", "      if(uPointLightRadiusList[i]> distanceLength){", "          attenuation = 1.0 / (0.01 + 0.02 * distanceLength + 0.03 * distanceLength * distanceLength) * 0.5;", "          L = normalize(L);", "          lambertTerm = dot(N,-L);", "          if(lambertTerm > 0.0){", "             ld += uPointLightColorList[i] * texelColor * lambertTerm * attenuation * uPointLightIntensityList[i] ;", "             specular = pow( max(dot( reflect(L, N), -N), 0.0), shininess) * specularPower * specularTextureValue;", "             ls +=  specularLightColor * specular  * uPointLightIntensityList[i]  * uPointLightColorList[i].a ;", "          }", "      }", "   }", "   return ld + ls;", "}"].join("\n"),
                fogFactor: ["float fogFactor(float perspectiveFar, float density){", "   float flog_cord = gl_FragCoord.z / gl_FragCoord.w / perspectiveFar;", "   float fog = flog_cord * density;", "   if(1.0 - fog < 0.0) discard;", "   return clamp(1.0 - fog, 0.0,  1.0);", "}"].join("\n"),
                fog: ["vec4 fog(float fogFactor, vec4 fogColor, vec4 currentColor) {", "   return mix(fogColor, currentColor, fogFactor);", "}"].join("\n"),
                decodeFloatShadow: ["float decodeFloatShadow (vec4 color) {", "   const vec4 cBitShift = vec4(", "       1.0 / (256.0 * 256.0 * 256.0),", "       1.0 / (256.0 * 256.0),", "       1.0 / 256.0,", "       1.0", "   );", "   return dot(color, cBitShift);", "}"].join("\n"),
                getShadowColor: ["float getShadowColor ( vec4 shadowPos, vec2 resolution, sampler2D directionalShadowTexture ) {", "   vec3 fragmentDepth = shadowPos.xyz;", "   fragmentDepth.z -= 0.007; // cShadowAcneRemover", "   float amountInLight = 0.0;", "   for (int x = -1; x <= 1; x++) {", "       for (int y = -1; y <= 1; y++) {", "           vec2 tUV = fragmentDepth.xy + vec2( float(x)/resolution.x, float(y)/resolution.y );", "           if(tUV.x<0.0) return 1.0;", "           if(tUV.x>1.0) return 1.0;", "           if(tUV.y<0.0) return 1.0;", "           if(tUV.y>1.0) return 1.0;", "           float texelDepth = decodeFloatShadow( texture2D(directionalShadowTexture, tUV) );", "           if (fragmentDepth.z < texelDepth ) amountInLight += 1.0;", "      }", "   }", "   amountInLight /= 9.0;", "   amountInLight =  amountInLight;", "   return amountInLight;", "}"].join("\n"),
                cotangent_frame: ["mat3 cotangent_frame(vec3 N, vec3 p, vec2 uv)", "{", "   vec3 dp1 = dFdx( p );", "   vec3 dp2 = dFdy( p );", "   vec2 duv1 = dFdx( uv );", "   vec2 duv2 = dFdy( uv );", "   ", "   vec3 dp2perp = cross( dp2, N );", "   vec3 dp1perp = cross( N, dp1 );", "   vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;", "   vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;", "   ", "   float invmax = inversesqrt( max( dot(T,T), dot(B,B) ) );", "   return mat3( T * invmax, B * invmax, N );", "}"].join("\n"),
                perturb_normal: ["vec3 perturb_normal( vec3 N, vec3 V, vec2 texcoord, vec3 normalColor )", "   {", "   ", "   vec3 map = normalColor;", "   map =  map * 255./127. - 128./127.;", "   map.xy *= u_normalPower;", "   mat3 TBN = cotangent_frame(N, V, texcoord);", "   return normalize(TBN * map);", "}"].join("\n")
            }
        }).MAX_DIRECTIONAL_LIGHT = 3,
        RedSystemShaderCode.MAX_POINT_LIGHT = t,
        RedSystemShaderCode.MAX_JOINT = r,
        [RedSystemShaderCode.vertexShareDeclare, RedSystemShaderCode.fragmentShareDeclare].forEach(function(e) {
            e.forEach(function(e) {
                "uniform" === (e = e.split(" "))[0] && (RedSystemShaderCode.systemUniform[e[2]] = 1)
            })
        });
    var i = []
        , a = []
        , o = {
        bool: 4,
        float: 4,
        int: 4,
        uint: 4,
        sampler2D: 4,
        samplerCube: 4,
        vec2: 4,
        vec3: 4,
        vec4: 4,
        mat2: 4,
        mat3: 8,
        mat4: 16
    };
    RedSystemShaderCode.vertexShareDeclare.forEach(function(e) {
        var t;
        "uniform" === (e = e.split(" "))[0] && (t = {
            value: e,
            type: e[1],
            num: e[2].indexOf("[") > -1 ? +e[2].split("[")[1].replace("]", "") * o[e[1]] : o[e[1]]
        },
            i.push(t))
    }),
        a = [],
        RedSystemShaderCode.fragmentShareDeclare.forEach(function(e) {
            var t;
            "uniform" === (e = e.split(" "))[0] && (t = {
                value: e,
                type: e[1],
                num: e[2].indexOf("[") > -1 ? +e[2].split("[")[1].replace("]", "") * o[e[1]] : o[e[1]]
            },
                a.push(t))
        }),
        Object.freeze(RedSystemShaderCode)
}
,
function() {
    var e, t, r, n, i, a, o, s, d, l;
    e = function(e, t, r) {
        switch (r) {
            case RedShader.VERTEX:
                return (i = e.createShader(e.VERTEX_SHADER)) || (e.isContextLost() ? RedGLUtil.throwFunc("RedShader : 쉐이더를 생성실패! - WebGL 컨텍스트가 손실") : RedGLUtil.throwFunc("RedShader : 쉐이더를 생성실패! - GPU메모리가 부족일 가능성이 큼")),
                    i.key = t,
                    i.type = r,
                    i;
            case RedShader.FRAGMENT:
                return (i = e.createShader(e.FRAGMENT_SHADER)) || (e.isContextLost() ? RedGLUtil.throwFunc("RedShader : 쉐이더를 생성실패! - WebGL 컨텍스트가 손실") : RedGLUtil.throwFunc("RedShader : 쉐이더를 생성실패! - GPU메모리가 부족일 가능성이 큼")),
                    i.key = t,
                    i.type = r,
                    i;
            default:
                RedGLUtil.throwFunc("RedShader : 쉐이더 타입을 확인하세요. RedShader.VERTEX or RedShader.FRAGMENT 만 허용")
        }
    }
        ,
        t = function(e, t, r, n) {
            e.shaderSource(r, n.lastSource),
                e.compileShader(r),
            e.getShaderParameter(r, e.COMPILE_STATUS) || RedGLUtil.throwFunc("RedShader : 쉐이더 컴파일에 실패하였습니다.\n", e.getShaderInfoLog(r))
        }
        ,
        n = function(e, t) {
            var r;
            switch (e) {
                case RedShader.VERTEX:
                    r = RedSystemShaderCode.vertexShareDeclare.concat();
                    break;
                case RedShader.FRAGMENT:
                    r = RedSystemShaderCode.fragmentShareDeclare.concat();
                    break;
                default:
                    RedGLUtil.throwFunc("RedShader : 쉐이더 타입을 확인하세요. RedShader.VERTEX or RedShader.FRAGMENT 만 허용")
            }
            for (a = t.length; a--; )
                o = (o = t[a]).replace(";", ""),
                    -1 === r.indexOf(o) ? r.push(o) : RedGLUtil.throwFunc("RedShader : ", "\n1. 중복 선언 이거나", "\n2. RedSystemShaderCode에 정의된 선언\n", "입력값 : " + o);
            return r
        }
        ,
        r = function(e, t) {
            return t = (t = t.replace(/\s+$/, "")).replace(/  /g, "").trim(),
                s = {
                    etc: ""
                },
                d = t.match(/attribute[\s\S]+?\;|uniform[\s\S]+?\;|varying[\s\S]+?\;|const[\s\S]+?\;|precision[\s\S]+?\;/g),
                (d = n(e, d = d || [])).sort(),
                d.forEach(function(e) {
                    var r, n, i, a, o, d, l, u, c;
                    if (e = e.trim(),
                        t = t.replace(e + ";", ""),
                    ("highp" === (r = e.split(" "))[1] || "mediump" === r[1] || "lowp" === r[1]) && (c = r[1],
                        r.splice(1, 1),
                        r.push(c),
                        u = c),
                        r[2])
                        switch (n = r[0],
                            a = r[1],
                            i = r[2].replace(";", "").split("["),
                            d = (d = e.split("="))[1] ? d[1].trim().replace(";", "") : null,
                            o = i.length > 1 ? +i[1].split("]")[0] : 0,
                            i = i[0],
                            n) {
                            case "precision":
                                break;
                            case "attribute":
                                "a" !== i.charAt(0) && RedGLUtil.throwFunc("RedShader : attribute의 첫글자는 a로 시작해야합니다.", i, r),
                                i.charAt(1) !== i.charAt(1).toUpperCase() && RedGLUtil.throwFunc("RedShader : attribute의 두번째 글자는 대문자 시작해야합니다.", i, r);
                                break;
                            case "uniform":
                                "u" !== i.charAt(0) && RedGLUtil.throwFunc("RedShader : uniform의 첫글자는 u로 시작해야합니다.", i, r),
                                i.charAt(1) !== i.charAt(1).toUpperCase() && RedGLUtil.throwFunc("RedShader : uniform의 두번째 글자는 대문자 시작해야합니다.", i, r);
                                break;
                            case "varying":
                                "v" !== i.charAt(0) && RedGLUtil.throwFunc("RedShader : varying의 첫글자는 v로 시작해야합니다.", i, r),
                                i.charAt(1) !== i.charAt(1).toUpperCase() && RedGLUtil.throwFunc("RedShader : varying의 두번째 글자는 대문자 시작해야합니다.", i, r);
                                break;
                            case "const":
                                "c" !== i.charAt(0) && RedGLUtil.throwFunc("RedShader : const의 첫글자는 c로 시작해야합니다.", i, r),
                                i.charAt(1) !== i.charAt(1).toUpperCase() && RedGLUtil.throwFunc("RedShader : const의 두번째 글자는 대문자 시작해야합니다.", i, r);
                                break;
                            default:
                                RedGLUtil.throwFunc("RedShader : 체크되지 못하는값인데 뭐냐", i, r)
                        }
                    else
                        RedGLUtil.throwFunc("RedShader : 체크되지 못하는값인데 뭐냐", r);
                    s[n] || (s[n] = {},
                        s[n].list = [],
                        s[n].map = {},
                        s[n].source = ""),
                        l = {
                            name: i,
                            arrayNum: o,
                            value: d,
                            precision: u,
                            systemUniformYn: !!RedSystemShaderCode.systemUniform[o ? i + "[" + o + "]" : i]
                        },
                    "uniform" === n && (l.uniformType = a),
                    "attribute" === n && (l.attributeType = a),
                    "varying" === n && (l.varyingType = a),
                        s[n].list.push(l),
                        s[n].map[i] = e,
                        s[n].source += e + ";\n"
                }),
                t = (t += "\n").trim(),
                s.etc = t + "\n",
                l = e === RedShader.FRAGMENT ? "#extension GL_OES_standard_derivatives : enable\n" : "",
            s.precision && (l += s.precision.source + "\n//const\n"),
            s.const && (l += s.const.source + "\n//attribute\n"),
            s.attribute && (l += s.attribute.source + "\n//uniform\n"),
            s.uniform && (l += s.uniform.source + "\n//varying\n"),
            s.varying && (l += s.varying.source + "\n//etc\n"),
            s.etc && (l += s.etc),
                s.lastSource = l,
            e !== RedShader.FRAGMENT || s.precision || RedGLUtil.throwFunc("RedShader : FRAGMENT Shader는 precision를 반드시 선언해야함"),
                s
        }
        ,
        (RedShader = function(n, i, a, o) {
                var s;
                if (!(this instanceof RedShader))
                    return new RedShader(n,i,a,o);
                if (n instanceof RedGL || RedGLUtil.throwFunc("RedShader : RedGL Instance만 허용.", "입력값 : " + n),
                "string" == typeof i || RedGLUtil.throwFunc("RedShader : key - 문자열만 허용.", "입력값 : " + i),
                a !== RedShader.VERTEX && a !== RedShader.FRAGMENT && RedGLUtil.throwFunc("RedShader : type - RedShader.VERTEX or RedShader.FRAGMENT 만 허용.", "입력값 : " + a),
                n._datas.RedShader || (n._datas.RedShader = {},
                    n._datas.RedShader[RedShader.VERTEX] = {},
                    n._datas.RedShader[RedShader.FRAGMENT] = {}),
                    o)
                    "string" == typeof o || RedGLUtil.throwFunc("RedShader : source - 문자열만 허용."),
                        RedShader.hasKey(n, i, a) ? RedGLUtil.throwFunc("RedShader : key - 이미 정의된 키로 생성을 시도.", "\n키 :", i, "\n타입 :" + a) : n._datas.RedShader[a][i] = this;
                else {
                    if (RedShader.hasKey(n, i, a))
                        return n._datas.RedShader[a][i];
                    RedGLUtil.throwFunc("RedShader : " + a + " 타입에 존재하지 않는 key를 검색하려고합니다.", "입력값 : " + i)
                }
                s = n.gl,
                    this.webglShader = e(s, i, a),
                    this.parseData = r(a, o),
                    this.originSource = o,
                    t(s, 0, this.webglShader, this.parseData),
                    this.key = i,
                    this.type = a,
                    this._UUID = RedGL.makeUUID(),
                    Object.freeze(this)
            }
        ).hasKey = function(e, t, r) {
            return !!e._datas.RedShader[r][t]
        }
        ,
        RedShader.FRAGMENT = "fragmentShader",
        RedShader.VERTEX = "vertexShader",
        Object.freeze(RedShader)
}(),
function() {
    var e, t, r, n = [];
    e = function(t) {
        for (var r, i = n.length; i--; )
            (r = n[i]).worldRender(r._redGL, t),
            r._callback && r._callback(t);
        requestAnimationFrame(e)
    }
        ,
        requestAnimationFrame(e),
        (RedRenderer = function() {
                if (!(this instanceof RedRenderer))
                    return new RedRenderer;
                this.world = null,
                    this._tickKey = null,
                    this._callback = null,
                    this._UUID = RedGL.makeUUID(),
                    this.renderInfo = {},
                    this.cacheState = [],
                    this.cacheInfo = {
                        cacheUniformInfo: [],
                        cacheAttrInfo: [],
                        cacheSamplerIndex: [],
                        cacheTexture: [],
                        cacheSystemUniformInfo: []
                    },
                    this.renderDebuger = RedRenderDebuger(),
                    this.worldRect = [],
                    this._glInitialized = !1
            }
        ).prototype = {
            start: function(e, t) {
                e instanceof RedGL || RedGLUtil.throwFunc("RedGL Instance만 허용"),
                e.world instanceof RedWorld || RedGLUtil.throwFunc("RedWorld Instance만 허용");
                this.stop(),
                    this.world = e.world,
                    this._redGL = e,
                    this._callback = t,
                    n.push(this)
            },
            setDebugButton: function() {
                var e, t = this;
                window.document && (document.body.appendChild(e = document.createElement("button")),
                    e.style.cssText = "position:fixed;left:10px;top:10px;background:rgb(91, 82, 170);color:#fff;z-index:10001;border:0;outline:none;cursor:pointer;padding:8px;font-size:11px;border-radius:5px",
                    e.innerHTML = "debugRenderInfo - " + RedGL_VERSION.version,
                    e.addEventListener("click", function() {
                        t.renderDebuger.visible = !t.renderDebuger.visible
                    }))
            },
            render: function(e, t) {
                e instanceof RedGL || RedGLUtil.throwFunc("RedGL Instance만 허용"),
                    t = t || 0,
                    this.world = e.world,
                    this.worldRender(e, t)
            },
            stop: function() {
                -1 === (t = n.indexOf(this)) || n.splice(t, 1)
            }
        };
    var i, a, o, s, d, l, u, c, f, h, R, m = [];
    l = [],
        o = function(e) {
            for (u = e.length; u--; )
                "number" == typeof e[u] ? e[u] = e[u] : e[u] = u < 2 ? i[u + 2] * parseFloat(e[u]) / 100 : i[u] * parseFloat(e[u]) / 100;
            return e
        }
        ,
        s = function(e, t, n) {
            r = RedSystemUniformUpdater.update(e, this, t, n, r, l)
        }
        ,
        d = function(e) {
            e.enable(e.DEPTH_TEST),
                e.depthFunc(e.LEQUAL),
                e.frontFace(e.CCW),
                e.enable(e.CULL_FACE),
                e.cullFace(e.BACK),
                e.enable(e.SCISSOR_TEST),
                e.enable(e.BLEND),
                e.blendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA),
                e.disable(e.DITHER),
                e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1)
        }
        ,
        RedRenderer.prototype.worldRender = function(e, t) {
            var r, n, u, c, f, h, R, p, _;
            for (r = e.gl,
                     a = this,
                 window.RedGLTFLoader && RedGLTFLoader.animationLooper(t),
                     (i = a.worldRect)[0] = 0,
                     i[1] = 0,
                     i[2] = r.drawingBufferWidth,
                     i[3] = r.drawingBufferHeight,
                     r.viewport(0, 0, r.drawingBufferWidth, r.drawingBufferHeight),
                     r.scissor(0, 0, r.drawingBufferWidth, r.drawingBufferHeight),
                     r.clear(r.COLOR_BUFFER_BIT | r.DEPTH_BUFFER_BIT),
                     m.length = 0,
                 a._glInitialized || (d(r),
                     a._glInitialized = !0),
                     a.renderInfo = {},
                     a.cacheInfo.cacheAttrInfo.length = 0,
                     e.gl.activeTexture(e.gl.TEXTURE0),
                     e.gl.bindTexture(e.gl.TEXTURE_2D, e._datas.emptyTexture["2d"].webglTexture),
                     e.gl.activeTexture(e.gl.TEXTURE0 + 1),
                     e.gl.bindTexture(e.gl.TEXTURE_CUBE_MAP, e._datas.emptyTexture["3d"].webglTexture),
                     h = 0,
                     R = a.world._viewList.length; h < R; h++)
                (_ = (p = a.world._viewList[h])._viewRect)[0] = p._x,
                    _[1] = p._y,
                    _[2] = p._width,
                    _[3] = p._height,
                    f = p.camera,
                    n = p.scene,
                    o(_),
                a.renderInfo[p.key] || (a.renderInfo[p.key] = {}),
                    (u = a.renderInfo[p.key]).mode2DYn = f instanceof RedBaseController ? f.camera.mode2DYn : f.mode2DYn,
                    u.x = p._x,
                    u.y = p._y,
                    u.width = p._width,
                    u.height = p._height,
                    u.viewRectX = _[0],
                    u.viewRectY = _[1],
                    u.viewRectWidth = _[2],
                    u.viewRectHeight = _[3],
                    u.key = p.key,
                    u.call = 0,
                    u.triangleNum = 0,
                    u.viewRenderTime = 0,
                    u.postEffectRenderTime = 0,
                    r.viewport(_[0], i[3] - _[3] - _[1], _[2], _[3]),
                    r.scissor(_[0], i[3] - _[3] - _[1], _[2], _[3]),
                    n._useBackgroundColor ? (n._useFog ? r.clearColor(n._fogR, n._fogG, n._fogB, 1) : r.clearColor(n._r, n._g, n._b, 1),
                        r.clear(r.COLOR_BUFFER_BIT | r.DEPTH_BUFFER_BIT)) : (r.clearColor(0, 0, 0, 1),
                        r.clear(r.COLOR_BUFFER_BIT | r.DEPTH_BUFFER_BIT)),
                f instanceof RedBaseController && (f.update(),
                    f = f.camera),
                f.autoUpdateMatrix && f.update(),
                    c = f.perspectiveMTX,
                    mat4.identity(c),
                    f.mode2DYn ? (mat4.ortho(c, -.5, .5, -.5, .5, -f.farClipping, f.farClipping),
                        mat4.translate(c, c, [-.5, .5, 0]),
                        mat4.scale(c, c, [1 / _[2] * e.renderScale * window.devicePixelRatio, -1 / _[3] * e.renderScale * window.devicePixelRatio, 1]),
                        mat4.identity(f.matrix),
                        r.disable(r.CULL_FACE),
                        a.cacheState.useCullFace = !1) : (mat4.perspective(c, f.fov * Math.PI / 180, _[2] / _[3], f.nearClipping, f.farClipping),
                        r.enable(r.CULL_FACE),
                        a.cacheState.useCullFace = !0),
                !a.cacheState.useDepthMask && r.depthMask(a.cacheState.useDepthMask = !0),
                n.mouseManager && (s.apply(a, [e, t, p]),
                    n.mouseManager.render(e, a, p, t, u, h == R - 1)),
                n.shadowManager._directionalShadow && (s.apply(a, [e, t, p]),
                    r.disable(r.BLEND),
                    r.blendFunc(r.ONE, r.ONE),
                    a.cacheState.useBlendMode = !0,
                    a.cacheState.blendSrc = r.ONE,
                    a.cacheState.blendDst = r.ONE,
                    n.shadowManager.render(e, a, p, t, u),
                    r.enable(r.BLEND),
                    r.blendFunc(r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA),
                    a.cacheState.useBlendMode = !0,
                    a.cacheState.blendSrc = r.SRC_ALPHA,
                    a.cacheState.blendDst = r.ONE_MINUS_SRC_ALPHA),
                p.postEffectManager.postEffectList.length && (p.postEffectManager.bind(r),
                    r.viewport(0, 0, p.postEffectManager.frameBuffer.width, p.postEffectManager.frameBuffer.height),
                    r.scissor(0, 0, p.postEffectManager.frameBuffer.width, p.postEffectManager.frameBuffer.height)),
                    s.apply(a, [e, t, p]),
                n.skyBox && (n.skyBox.x = f.x,
                    n.skyBox.y = f.y,
                    n.skyBox.z = f.z,
                    n.skyBox.scaleX = n.skyBox.scaleY = n.skyBox.scaleZ = .6 * f.farClipping,
                    a.sceneRender(e, n, f, f.mode2DYn, [n.skyBox], t, u)),
                n.grid && a.sceneRender(e, n, f, f.mode2DYn, [n.grid], t, u),
                    a.sceneRender(e, n, f, f.mode2DYn, n.children, t, u),
                m.length && a.sceneRender(e, n, f, f.mode2DYn, m, t, u, null, !0),
                n.mirrorManager && n.mirrorManager.render(e, a, p, t, u, s),
                n.axis && a.sceneRender(e, n, f, f.mode2DYn, n.axis.children, t, u),
                l.length && a.sceneRender(e, n, f, f.mode2DYn, l, t, u),
                    u.viewRenderTime = performance.now(),
                p.postEffectManager.postEffectList.length && p.postEffectManager.render(e, r, a, p, t, u),
                    u.postEffectRenderTime = performance.now() - u.viewRenderTime,
                    u.viewRenderTime -= t;
            this.renderDebuger.visible && this.renderDebuger.update(e, a.renderInfo)
        }
        ,
        c = function(e, t, n, i, a, o, s, d, l, u, p, _) {
            var g, P, v, y, E, M, b, L, T, x, I, w, D, U, B, G, S, A, F, C, O, N, k, Y, X, j, z, V, Z, W, H, q, J, K, Q, $, ee, te, re, ne, ie, ae, oe, se, de, le, ue, ce, fe, he, Re, me, pe, _e, ge, Pe, ve, ye, Ee, Me, be, Le, Te, xe, Ie, we, De, Ue, Be, Ge, Se, Ae, Fe, Ce, Oe, Ne, ke, Ye, Xe, je, ze, Ve, Ze, We, He, qe, Je, Ke, Qe, $e = e.gl, et = d.cacheAttrInfo, tt = d.cacheUniformInfo, rt = d.cacheSamplerIndex, nt = d.cacheTexture;
            v = Math.PI / 180,
                Ye = 3.141592653589793,
                Xe = 6.283185307179586,
                je = 1.27323954,
                ze = .405284735,
                Ve = 1.5707963267948966,
                g = n.length;
            var it = n.length - 1;
            for (H = t._useFog,
                     (Je = t.shadowManager._directionalShadow) ? Q = H ? "directionalShadow_fog" : "directionalShadow" : H && (Q = "fog"); g--; ) {
                if (s.call++,
                    N = (y = n[it - g]).matrix,
                    k = y.normalMatrix,
                    Y = y.localMatrix,
                    E = y._geometry,
                    z = y._sprite3DYn,
                    W = y.skinInfo,
                    y.useLOD)
                    for (var at in Ze = i.x - y.x,
                        We = i.y - y.y,
                        He = i.z - y.z,
                        qe = Math.abs(Math.sqrt(Ze * Ze + We * We + He * He)),
                        b = y._lodLevels)
                        (V = b[at]).distance < qe && (y._geometry = V.geometry,
                            y._material = V.material);
                if (E) {
                    if (Z = (M = p || y._material)._RedDirectionalShadowYn,
                    M._RedMouseEventMaterialYn && (M.color = y._mouseColorID),
                        M.__RedSheetMaterialYn) {
                        if (M._nextFrameTime || (M._nextFrameTime = M._perFrameTime + o),
                        M._playYn && M._nextFrameTime < o) {
                            var ot = parseInt((o - M._nextFrameTime) / M._perFrameTime);
                            ot = ot || 1,
                                M._nextFrameTime = M._perFrameTime + o,
                                M.currentIndex += ot,
                            M.currentIndex >= M.totalFrame && (M._loop ? (M._playYn = !0,
                                M.currentIndex = 0) : (M._playYn = !1,
                                M.currentIndex = M.totalFrame - 1))
                        }
                        M._sheetRect[0] = 1 / M._segmentW,
                            M._sheetRect[1] = 1 / M._segmentH,
                            M._sheetRect[2] = M.currentIndex % M._segmentW / M._segmentW,
                            M._sheetRect[3] = Math.floor(M.currentIndex / M._segmentH) / M._segmentH
                    }
                    for ((q = M.program)._prepareProgramYn && (q = M.program = q._makePrepareProgram()),
                             Qe = q.key,
                             W || z ? Je ? J = H && z ? "directionalShadow_fog_sprite3D" : H && W ? "directionalShadow_fog_skin" : W ? "directionalShadow_skin" : z ? "directionalShadow_sprite3D" : H ? "directionalShadow_fog" : "directionalShadow" : H && z ? J = "fog_sprite3D" : H && W ? J = "fog_skin" : W ? J = "skin" : z ? J = "sprite3D" : H && (J = "fog") : J = Q,
                         (Ke = M._programList) && J && ((K = Ke[J][Qe])._prepareProgramYn && (K = Ke[J][Qe] = K._makePrepareProgram()),
                             q = K),
                         r != q._UUID && $e.useProgram(q.webglProgram),
                             r = q._UUID,
                             L = q.attributeLocation,
                             w = q.uniformLocation,
                             D = q.systemUniformLocation,
                             S = E.interleaveBuffer,
                             A = E.indexBuffer,
                             X = S._UUID,
                             P = L.length,
                         w.length > P && (P = w.length),
                             x = S.interleaveDefineInfoList,
                         h != X && $e.bindBuffer($e.ARRAY_BUFFER, S.webglBuffer),
                             h = X; P--; )
                        (T = L[P]) && (I = x[T.name],
                            G = T.location,
                        I && et[G] != I._UUID && (!T.enabled && $e.enableVertexAttribArray(G),
                            T.enabled = 1,
                            $e.vertexAttribPointer(G, I.size, S.glArrayType, I.normalize, S.stride_BYTES_PER_ELEMENT, I.offset_BYTES_PER_ELEMENT),
                            et[G] = I._UUID)),
                        (U = w[P]) && (B = U.location,
                            X = U._UUID,
                            O = U.renderTypeIndex,
                            C = U.renderType,
                            F = M[U.materialPropertyName],
                            O < 2 ? (j = U.samplerIndex,
                                F ? nt[j] != F._UUID && (R != j && $e.activeTexture($e.TEXTURE0 + (R = j)),
                                    F._videoDom ? ($e.bindTexture($e.TEXTURE_2D, F.webglTexture),
                                    F._videoDom.loaded && $e.texImage2D($e.TEXTURE_2D, 0, $e.RGBA, $e.RGBA, $e.UNSIGNED_BYTE, F._videoDom),
                                        nt = []) : $e.bindTexture(0 == O ? $e.TEXTURE_2D : $e.TEXTURE_CUBE_MAP, F.webglTexture),
                                rt[X] != j && $e.uniform1iv(B, [rt[X] = j]),
                                    nt[j] = F._UUID) : nt[j] != O && (rt[X] != O && $e.uniform1iv(B, [rt[X] = O]),
                                    nt[j] = O,
                                    R = O)) : (null == F && RedGLUtil.throwFunc("RedRenderer : Material에 ", U.materialPropertyName, "이 정의 되지않았습니다."),
                                O < 13 ? tt[X] != F && $e[U.renderMethod](B, (tt[X] = 12 == O ? null : F,
                                    F)) : 13 == O ? $e[U.renderMethod](B, !1, F) : RedGLUtil.throwFunc("RedRenderer : 처리할수없는 타입입니다.", "tRenderType -", C)))
                }
                if (M && M._RedMouseEventMaterialYn)
                    E && $e.uniformMatrix4fv(D.uMMatrix.location, !1, N);
                else if (y.autoUpdateMatrix && (de = 1,
                    le = 0,
                    ue = 0,
                    fe = 0,
                    he = 1,
                    Re = 0,
                    pe = 0,
                    _e = 0,
                    ge = 1,
                    Y[12] = y.x,
                    Y[13] = y.y,
                    Y[14] = y.z,
                    Y[15] = 1,
                    z ? ae = oe = se = 0 : (ae = y.rotationX * v,
                        oe = y.rotationY * v,
                        se = y.rotationZ * v),
                    (ke = ae % Xe) < -Ye ? ke += Xe : ke > Ye && (ke -= Xe),
                    $ = (ke = ke < 0 ? je * ke + ze * ke * ke : je * ke - ze * ke * ke) < 0 ? .225 * (ke * -ke - ke) + ke : .225 * (ke * ke - ke) + ke,
                    (ke = (ae + Ve) % Xe) < -Ye ? ke += Xe : ke > Ye && (ke -= Xe),
                    re = (ke = ke < 0 ? je * ke + ze * ke * ke : je * ke - ze * ke * ke) < 0 ? .225 * (ke * -ke - ke) + ke : .225 * (ke * ke - ke) + ke,
                    (ke = oe % Xe) < -Ye ? ke += Xe : ke > Ye && (ke -= Xe),
                    ee = (ke = ke < 0 ? je * ke + ze * ke * ke : je * ke - ze * ke * ke) < 0 ? .225 * (ke * -ke - ke) + ke : .225 * (ke * ke - ke) + ke,
                    (ke = (oe + Ve) % Xe) < -Ye ? ke += Xe : ke > Ye && (ke -= Xe),
                    ne = (ke = ke < 0 ? je * ke + ze * ke * ke : je * ke - ze * ke * ke) < 0 ? .225 * (ke * -ke - ke) + ke : .225 * (ke * ke - ke) + ke,
                    (ke = se % Xe) < -Ye ? ke += Xe : ke > Ye && (ke -= Xe),
                    te = (ke = ke < 0 ? je * ke + ze * ke * ke : je * ke - ze * ke * ke) < 0 ? .225 * (ke * -ke - ke) + ke : .225 * (ke * ke - ke) + ke,
                    (ke = (se + Ve) % Xe) < -Ye ? ke += Xe : ke > Ye && (ke -= Xe),
                    Ie = ne * (ie = (ke = ke < 0 ? je * ke + ze * ke * ke : je * ke - ze * ke * ke) < 0 ? .225 * (ke * -ke - ke) + ke : .225 * (ke * ke - ke) + ke),
                    we = $ * ee * ie - re * te,
                    De = re * ee * ie + $ * te,
                    Ue = ne * te,
                    Be = $ * ee * te + re * ie,
                    Ge = re * ee * te - $ * ie,
                    Se = -ee,
                    Ae = $ * ne,
                    Fe = re * ne,
                    Ce = y.scaleX,
                    Oe = y.scaleY * (a ? -1 : 1),
                    Ne = y.scaleZ,
                    Y[0] = (de * Ie + fe * we + pe * De) * Ce,
                    Y[1] = (le * Ie + he * we + _e * De) * Ce,
                    Y[2] = (ue * Ie + Re * we + ge * De) * Ce,
                    Y[3] = Y[3] * Ce,
                    Y[4] = (de * Ue + fe * Be + pe * Ge) * Oe,
                    Y[5] = (le * Ue + he * Be + _e * Ge) * Oe,
                    Y[6] = (ue * Ue + Re * Be + ge * Ge) * Oe,
                    Y[7] = Y[7] * Oe,
                    Y[8] = (de * Se + fe * Ae + pe * Fe) * Ne,
                    Y[9] = (le * Se + he * Ae + _e * Fe) * Ne,
                    Y[10] = (ue * Se + Re * Ae + ge * Fe) * Ne,
                    Y[11] = Y[11] * Ne,
                    u ? (de = u[0],
                        le = u[1],
                        ue = u[2],
                        ce = u[3],
                        fe = u[4],
                        he = u[5],
                        Re = u[6],
                        me = u[7],
                        pe = u[8],
                        _e = u[9],
                        ge = u[10],
                        Pe = u[11],
                        ve = u[12],
                        ye = u[13],
                        Ee = u[14],
                        Me = u[15],
                        be = Y[0],
                        Le = Y[1],
                        Te = Y[2],
                        xe = Y[3],
                        N[0] = be * de + Le * fe + Te * pe + xe * ve,
                        N[1] = be * le + Le * he + Te * _e + xe * ye,
                        N[2] = be * ue + Le * Re + Te * ge + xe * Ee,
                        N[3] = be * ce + Le * me + Te * Pe + xe * Me,
                        be = Y[4],
                        Le = Y[5],
                        Te = Y[6],
                        xe = Y[7],
                        N[4] = be * de + Le * fe + Te * pe + xe * ve,
                        N[5] = be * le + Le * he + Te * _e + xe * ye,
                        N[6] = be * ue + Le * Re + Te * ge + xe * Ee,
                        N[7] = be * ce + Le * me + Te * Pe + xe * Me,
                        be = Y[8],
                        Le = Y[9],
                        Te = Y[10],
                        xe = Y[11],
                        N[8] = be * de + Le * fe + Te * pe + xe * ve,
                        N[9] = be * le + Le * he + Te * _e + xe * ye,
                        N[10] = be * ue + Le * Re + Te * ge + xe * Ee,
                        N[11] = be * ce + Le * me + Te * Pe + xe * Me,
                        be = Y[12],
                        Le = Y[13],
                        Te = Y[14],
                        xe = Y[15],
                        N[12] = be * de + Le * fe + Te * pe + xe * ve,
                        N[13] = be * le + Le * he + Te * _e + xe * ye,
                        N[14] = be * ue + Le * Re + Te * ge + xe * Ee,
                        N[15] = be * ce + Le * me + Te * Pe + xe * Me) : (N[0] = Y[0],
                        N[1] = Y[1],
                        N[2] = Y[2],
                        N[3] = Y[3],
                        N[4] = Y[4],
                        N[5] = Y[5],
                        N[6] = Y[6],
                        N[7] = Y[7],
                        N[8] = Y[8],
                        N[9] = Y[9],
                        N[10] = Y[10],
                        N[11] = Y[11],
                        N[12] = Y[12],
                        N[13] = Y[13],
                        N[14] = Y[14],
                        N[15] = Y[15])),
                E && ($e.uniformMatrix4fv(D.uMMatrix.location, !1, N),
                D.uNMatrix.location && (de = N[0],
                    le = N[1],
                    ue = N[2],
                    ce = N[3],
                    fe = N[4],
                    he = N[5],
                    Re = N[6],
                    me = N[7],
                    pe = N[8],
                    _e = N[9],
                    ge = N[10],
                    Pe = N[11],
                    ye = N[12],
                    Ee = N[13],
                    Ge = _e * (Me = N[14]) - ge * Ee,
                    Fe = 1 / (Fe = (ve = de * he - le * fe) * (Ge = ge * (be = N[15]) - Pe * Me) - (Le = de * Re - ue * fe) * (Se = _e * be - Pe * Ee) + (Te = de * me - ce * fe) * Ge + (xe = le * Re - ue * he) * (Be = pe * be - Pe * ye) - (Ie = le * me - ce * he) * (Ue = pe * Me - ge * ye) + (we = ue * me - ce * Re) * (De = pe * Ee - _e * ye)),
                    k[0] = (he * Ge - Re * Se + me * Ge) * Fe,
                    k[4] = (-le * Ge + ue * Se - ce * Ge) * Fe,
                    k[8] = (Ee * we - Me * Ie + be * xe) * Fe,
                    k[12] = (-_e * we + ge * Ie - Pe * xe) * Fe,
                    k[1] = (-fe * Ge + Re * Be - me * Ue) * Fe,
                    k[5] = (de * Ge - ue * Be + ce * Ue) * Fe,
                    k[9] = (-ye * we + Me * Te - be * Le) * Fe,
                    k[13] = (pe * we - ge * Te + Pe * Le) * Fe,
                    k[2] = (fe * Se - he * Be + me * De) * Fe,
                    k[6] = (-de * Se + le * Be - ce * De) * Fe,
                    k[10] = (ye * Ie - Ee * Te + be * ve) * Fe,
                    k[14] = (-pe * Ie + _e * Te - Pe * ve) * Fe,
                    k[3] = (-fe * Ge + he * Ue - Re * De) * Fe,
                    k[7] = (de * Ge - le * Ue + ue * De) * Fe,
                    k[11] = (-ye * xe + Ee * Le - Me * ve) * Fe,
                    k[15] = (pe * xe - _e * Le + ge * ve) * Fe,
                    $e.uniformMatrix4fv(D.uNMatrix.location, !1, k))),
                    W) {
                    var st, dt = W.joints, lt = 0, ut = dt.length, ct = new Float32Array(16 * ut), ft = [N[0], N[1], N[2], N[3], N[4], N[5], N[6], N[7], N[8], N[9], N[10], N[11], N[12], N[13], N[14], N[15]], ht = ft, Rt = ft[0], mt = ft[1], pt = ft[2], _t = ft[3], gt = ft[4], Pt = ft[5], vt = ft[6], yt = ft[7], Et = ft[8], Mt = ft[9], bt = ft[10], Lt = ft[11], Tt = ft[12], xt = ft[13], It = ft[14], wt = ft[15], Dt = Mt * It * yt - xt * bt * yt + xt * vt * Lt - Pt * It * Lt - Mt * vt * wt + Pt * bt * wt, Ut = Tt * bt * yt - Et * It * yt - Tt * vt * Lt + gt * It * Lt + Et * vt * wt - gt * bt * wt, Bt = Et * xt * yt - Tt * Mt * yt + Tt * Pt * Lt - gt * xt * Lt - Et * Pt * wt + gt * Mt * wt, Gt = Tt * Mt * vt - Et * xt * vt - Tt * Pt * bt + gt * xt * bt + Et * Pt * It - gt * Mt * It, St = Rt * Dt + mt * Ut + pt * Bt + _t * Gt;
                    if (0 === St)
                        return mat4.identity(ft);
                    var At = 1 / St;
                    for (ht[0] = Dt * At,
                             ht[1] = (xt * bt * _t - Mt * It * _t - xt * pt * Lt + mt * It * Lt + Mt * pt * wt - mt * bt * wt) * At,
                             ht[2] = (Pt * It * _t - xt * vt * _t + xt * pt * yt - mt * It * yt - Pt * pt * wt + mt * vt * wt) * At,
                             ht[3] = (Mt * vt * _t - Pt * bt * _t - Mt * pt * yt + mt * bt * yt + Pt * pt * Lt - mt * vt * Lt) * At,
                             ht[4] = Ut * At,
                             ht[5] = (Et * It * _t - Tt * bt * _t + Tt * pt * Lt - Rt * It * Lt - Et * pt * wt + Rt * bt * wt) * At,
                             ht[6] = (Tt * vt * _t - gt * It * _t - Tt * pt * yt + Rt * It * yt + gt * pt * wt - Rt * vt * wt) * At,
                             ht[7] = (gt * bt * _t - Et * vt * _t + Et * pt * yt - Rt * bt * yt - gt * pt * Lt + Rt * vt * Lt) * At,
                             ht[8] = Bt * At,
                             ht[9] = (Tt * Mt * _t - Et * xt * _t - Tt * mt * Lt + Rt * xt * Lt + Et * mt * wt - Rt * Mt * wt) * At,
                             ht[10] = (gt * xt * _t - Tt * Pt * _t + Tt * mt * yt - Rt * xt * yt - gt * mt * wt + Rt * Pt * wt) * At,
                             ht[11] = (Et * Pt * _t - gt * Mt * _t - Et * mt * yt + Rt * Mt * yt + gt * mt * Lt - Rt * Pt * Lt) * At,
                             ht[12] = Gt * At,
                             ht[13] = (Et * xt * pt - Tt * Mt * pt + Tt * mt * bt - Rt * xt * bt - Et * mt * It + Rt * Mt * It) * At,
                             ht[14] = (Tt * Pt * pt - gt * xt * pt - Tt * mt * vt + Rt * xt * vt + gt * mt * It - Rt * Pt * It) * At,
                             ht[15] = (gt * Mt * pt - Et * Pt * pt + Et * mt * vt - Rt * Mt * vt - gt * mt * bt + Rt * Pt * bt) * At; lt < ut; lt++)
                        st = dt[lt].matrix,
                            ct[16 * lt + 0] = st[0],
                            ct[16 * lt + 1] = st[1],
                            ct[16 * lt + 2] = st[2],
                            ct[16 * lt + 3] = st[3],
                            ct[16 * lt + 4] = st[4],
                            ct[16 * lt + 5] = st[5],
                            ct[16 * lt + 6] = st[6],
                            ct[16 * lt + 7] = st[7],
                            ct[16 * lt + 8] = st[8],
                            ct[16 * lt + 9] = st[9],
                            ct[16 * lt + 10] = st[10],
                            ct[16 * lt + 11] = st[11],
                            ct[16 * lt + 12] = st[12],
                            ct[16 * lt + 13] = st[13],
                            ct[16 * lt + 14] = st[14],
                            ct[16 * lt + 15] = st[15];
                    $e.uniformMatrix4fv(D.uGlobalTransformOfNodeThatTheMeshIsAttachedTo.location, !1, ft),
                        $e.uniformMatrix4fv(D.uJointMatrix.location, !1, ct),
                    W.inverseBindMatrices._UUID || (W.inverseBindMatrices._UUID = JSON.stringify(W.inverseBindMatrices)),
                    tt[X = D.uInverseBindMatrixForJoint._UUID] != W.inverseBindMatrices._UUID && ($e.uniformMatrix4fv(D.uInverseBindMatrixForJoint.location, !1, W.inverseBindMatrices),
                        tt[X] = W.inverseBindMatrices._UUID)
                }
                if (E) {
                    if (l.useCullFace != y.useCullFace && ((l.useCullFace = y.useCullFace) ? $e.enable($e.CULL_FACE) : $e.disable($e.CULL_FACE)),
                    l.useCullFace && (l.cullFace != y.cullFace && $e.cullFace(l.cullFace = y.cullFace)),
                    l.useDepthMask != y.useDepthMask && $e.depthMask(l.useDepthMask = y.useDepthMask),
                    l.useDepthTest != y.useDepthTest && ((l.useDepthTest = y.useDepthTest) ? $e.enable($e.DEPTH_TEST) : $e.disable($e.DEPTH_TEST)),
                    l.useDepthTest && (l.depthTestFunc != y.depthTestFunc && $e.depthFunc(l.depthTestFunc = y.depthTestFunc)),
                    D.uPointSize.use && l.pointSize != y.pointSize && $e.uniform1f(D.uPointSize.location, l.pointSize = y.pointSize),
                    D.u_PerspectiveScale.location && (X = D.u_PerspectiveScale._UUID,
                        F = y._perspectiveScale,
                    tt[X] != F && ($e[D.u_PerspectiveScale.renderMethod](D.u_PerspectiveScale.location, F),
                        tt[X] = F)),
                    Z || (l.useBlendMode != y.useBlendMode && ((l.useBlendMode = y.useBlendMode) ? $e.enable($e.BLEND) : $e.disable($e.BLEND)),
                    l.blendSrc == y.blendSrc && l.blendDst == y.blendDst || ($e.blendFunc(y.blendSrc, y.blendDst),
                        l.blendSrc = y.blendSrc,
                        l.blendDst = y.blendDst)),
                        _)
                        y.autoUpdateMatrix = y._renderAutoUpdateMatrix;
                    else if (y.useTransparentSort) {
                        m.push(y),
                            y._renderAutoUpdateMatrix = y.autoUpdateMatrix,
                            y.autoUpdateMatrix = !1;
                        continue
                    }
                    A ? (f != A._UUID && $e.bindBuffer($e.ELEMENT_ARRAY_BUFFER, A.webglBuffer),
                        $e.drawElements(y.drawMode, A.pointNum, A.glArrayType, 0),
                        f = A._UUID,
                        s.triangleNum += A.triangleNum) : ($e.drawArrays(y.drawMode, 0, S.pointNum),
                        s.triangleNum += S.triangleNum)
                }
                y.children.length && c(e, t, y.children, i, a, o, s, d, l, N, p, _)
            }
        }
        ,
        RedRenderer.prototype.sceneRender = function(e, t, r, n, i, a, o, s, d) {
            this.cacheInfo.cacheTexture.length = 0,
                f = null,
                h = null,
                R = null,
                c(e, t, i, r, n, a, o, this.cacheInfo, this.cacheState, void 0, s, d)
        }
        ,
        Object.freeze(RedRenderer)
}(),
(RedRenderDebuger = function() {
        if (!(this instanceof RedRenderDebuger))
            return new RedRenderDebuger;
        if (window.HTMLCanvasElement && !this.renderResult) {
            this.renderResult = document.createElement("div"),
                this._contentBox = document.createElement("div"),
                this._etcBox = document.createElement("div"),
                this.renderResult.appendChild(this._contentBox),
                this.renderResult.appendChild(this._etcBox),
                this.renderResult.style.cssText = "position:absolute;bottom:0px;left:0px;color:#fff;font:11px Lucida Grande,sans-serif;font-size:11px;background:rgba(0,0,0,0.75);padding:3px;width:300px",
                this._etcBox.style.cssText = "position:relative;color:#fff;font:11px Lucida Grande,sans-serif;font-size:11px;padding:3px;margin-top:10px;";
            var e = document.createElement("a");
            e.style.padding = "5px",
                e.style.borderRadius = "2px",
                e.style.background = "rgba(91, 82, 170,0.8)",
                e.style.color = "#fff",
                e.style.textDecoration = "none",
                e.style.display = "block",
                e.setAttribute("href", "https://redcamel.github.io/RedGL2/redDoc/index.html"),
                e.innerHTML = "API document",
                this._etcBox.appendChild(e),
                (e = document.createElement("a")).style.padding = "5px",
                e.style.borderRadius = "2px",
                e.style.background = "rgba(91, 82, 170,0.8)",
                e.style.color = "#fff",
                e.style.textDecoration = "none",
                e.style.display = "block",
                e.style.marginTop = "2px",
                e.setAttribute("href", "https://github.com/redcamel/RedGL2"),
                e.innerHTML = "GITHUB",
                this._etcBox.appendChild(e)
        }
        this._visible = !1
    }
).prototype = {
    update: function(e, t) {
        if (window.HTMLCanvasElement) {
            this._contentBox.innerHTML = "";
            var r = ""
                , n = 0
                , i = 0;
            for (var a in t)
                r += '<div style="padding:5px"><div><b style="color:rgb(242, 169, 113)">RedView : key - ' + t[a].key + '</b></div> mode2DYn - <b style="color:rgb(191, 82, 170)">' + t[a].mode2DYn + '</b> <br>call - <b style="color:rgb(191, 82, 170)">' + t[a].call + '</b> <br>triangleNum - <b style="color:rgb(191, 82, 170)">' + t[a].triangleNum + '</b> <br> width - <b style="color:rgb(191, 82, 170)">' + t[a].width + '</b> / height - <b style="color:rgb(191, 82, 170)">' + t[a].height + '</b> <br> viewRectWidth - <b style="color:rgb(191, 82, 170)">' + t[a].viewRectWidth + '</b> / viewRectHeight - <b style="color:rgb(191, 82, 170)">' + t[a].viewRectHeight + '</b> <br> x - <b style="color:rgb(191, 82, 170)">' + t[a].x + '</b> / y - <b style="color:rgb(191, 82, 170)">' + t[a].y + '</b><div>renderTime</div><div style="padding:5px 7px 7px 7px;background:rgba(0,0,0, 0.5);"><div>viewRenderTime - <b style="color:rgb(191, 82, 170)">' + t[a].viewRenderTime.toFixed(2) + 'ms</b></div><div>baseRenderTime - <b style="color:rgb(191, 82, 170)">' + (t[a].viewRenderTime - t[a].postEffectRenderTime).toFixed(2) + 'ms</b></div><div>postEffectRenderTime - <b style="color:rgb(191, 82, 170)">' + t[a].postEffectRenderTime.toFixed(2) + "ms</b></div></div></div>",
                    n += t[a].viewRenderTime,
                    i += t[a].postEffectRenderTime;
            r += '<div style="padding:0px 5px">',
                r += '<div>renderScale : <span style="padding:3px;background:#000">' + e.renderScale + "</span></div>",
                r += '<div>totalRenderTime : <span style="padding:3px;background:#000">' + n.toFixed(2) + "ms</span></div>",
                r += '<div>baseRenderTime : <span style="padding:3px;background:#000">' + (n - i).toFixed(2) + "ms</span></div>",
                r += '<div>postEffectRenderTime : <span style="padding:3px;background:#000">' + i.toFixed(2) + "ms</span></div>",
                r += "</div>",
                this._contentBox.innerHTML = r
        }
    }
},
Object.defineProperty(RedRenderDebuger.prototype, "visible", {
    get: function() {
        return this._visible
    },
    set: function(e) {
        this._visible = e,
        window.HTMLCanvasElement && (this._visible ? document.body.appendChild(this.renderResult) : this.renderResult.parentNode && document.body.removeChild(this.renderResult))
    }
}),
Object.freeze(RedRenderDebuger),
function() {
    var e, t, r, n, i, a, o, s, d, l, u, c, f, h, R, m, p, _, g, P, v, y, E, M, b, L, T, x, I, w, D, U, B, G, S, A, F, C, O, N;
    RedSystemUniformUpdater = {
        update: (N = 0,
                v = new Float32Array(3),
                function(k, Y, X, j, z, V) {
                    for (e != k && (M = null),
                             e = k,
                         M || (F = RedSystemShaderCode.MAX_DIRECTIONAL_LIGHT,
                             C = RedSystemShaderCode.MAX_POINT_LIGHT,
                             M = {
                                 uTime: {
                                     cacheData: null,
                                     data: 0
                                 },
                                 uResolution: {
                                     cacheData: null,
                                     data: new Float32Array([0, 0])
                                 },
                                 u_FogDensity: {
                                     cacheData: null,
                                     data: 0
                                 },
                                 uFogColor: {
                                     cacheData: null,
                                     data: new Float32Array([0, 0, 0, 0])
                                 },
                                 u_FogDistance: {
                                     cacheData: null,
                                     data: 0
                                 },
                                 uCameraMatrix: {
                                     cacheData: null,
                                     data: null
                                 },
                                 uCameraPosition: {
                                     cacheData: null,
                                     data: new Float32Array([0, 0, 0])
                                 },
                                 uPMatrix: {
                                     cacheData: null,
                                     data: null
                                 },
                                 uMode2DYn: {
                                     cacheData: null,
                                     data: !1
                                 },
                                 uAmbientLightColor: {
                                     cacheData: null,
                                     data: new Float32Array([0, 0, 0, 0])
                                 },
                                 uAmbientIntensity: {
                                     cacheData: null,
                                     data: 1
                                 },
                                 uDirectionalLightPositionList: {
                                     cacheData: null,
                                     data: []
                                 },
                                 uDirectionalLightColorList: {
                                     cacheData: null,
                                     data: []
                                 },
                                 uDirectionalLightIntensityList: {
                                     cacheData: null,
                                     data: []
                                 },
                                 uDirectionalLightNum: {
                                     cacheData: null,
                                     data: 0
                                 },
                                 uPointLightPositionList: {
                                     cacheData: null,
                                     data: []
                                 },
                                 uPointLightColorList: {
                                     cacheData: null,
                                     data: []
                                 },
                                 uPointLightIntensityList: {
                                     cacheData: null,
                                     data: []
                                 },
                                 uPointLightRadiusList: {
                                     cacheData: null,
                                     data: []
                                 },
                                 uPointLightNum: {
                                     cacheData: null,
                                     data: 0
                                 }
                             },
                             I = new Float32Array(3),
                             L = new Float32Array(16),
                             x = new Float32Array(16),
                             l = new Float32Array(3 * F),
                             u = new Float32Array(4 * F),
                             c = new Float32Array(F),
                             f = new Float32Array(3 * C),
                             h = new Float32Array(4 * C),
                             R = new Float32Array(C),
                             m = new Float32Array(C)),
                             t = k.gl,
                             B = j.scene,
                             G = (G = j.camera)instanceof RedBaseController ? G.camera : G,
                             S = j._viewRect,
                             U = Y.cacheInfo.cacheSystemUniformInfo,
                             D = null,
                             b = {},
                             V.length = 0,
                             A = N != k._datas.RedProgramList.length,
                             N = 0,
                         (O = M.uTime).cacheData != X && (b.uTime = O.data = X,
                             O.cacheData = X),
                             d = JSON.stringify(S),
                         ((O = M.uResolution).cacheData != d || A) && (O.data[0] = S[2],
                             O.data[1] = S[3],
                             b.uResolution = O.data,
                             O.cacheData = d),
                             d = B._fogDensity,
                         ((O = M.u_FogDensity).cacheData != d || A) && (b.u_FogDensity = O.data = d,
                             O.cacheData = d),
                             d = B._fogR + "_" + B._fogG + "_" + B._fogB + "_1",
                         ((O = M.uFogColor).cacheData != d || A) && (O.data[0] = B._fogR,
                             O.data[1] = B._fogG,
                             O.data[2] = B._fogB,
                             O.data[3] = 1,
                             b.uFogColor = O.data,
                             O.cacheData = d),
                             d = B._fogDistance,
                         ((O = M.u_FogDistance).cacheData != d || A) && (b.u_FogDistance = O.data = d,
                             O.cacheData = d),
                             d = JSON.stringify(G.matrix),
                         ((O = M.uCameraMatrix).cacheData != d || A) && (b.uCameraMatrix = O.data = G.matrix,
                             O.cacheData = d),
                             d = G.camera ? [G.camera.x, G.camera.y, G.camera.z] : [G.x, G.y, G.z],
                         ((O = M.uCameraPosition).cacheData != d.join(",") || A) && (b.uCameraPosition = O.data = d,
                             O.cacheData = d.join(",")),
                             d = JSON.stringify(G.mode2DYn),
                         ((O = M.uMode2DYn).cacheData != d || A) && (b.uMode2DYn = O.data = G.mode2DYn,
                             O.cacheData = d),
                             d = JSON.stringify(G.perspectiveMTX),
                         ((O = M.uPMatrix).cacheData != d || A) && (b.uPMatrix = O.data = G.perspectiveMTX,
                             O.cacheData = d),
                         (g = B._lightInfo[RedAmbientLight.TYPE]) && (d = JSON.stringify(g._lightColor),
                         ((O = M.uAmbientLightColor).cacheData != d || A) && (b.uAmbientLightColor = O.data = [g._lightColor[0], g._lightColor[1], g._lightColor[2], g._lightColor[3]],
                             O.cacheData = d,
                             b.uAmbientLightColor[0] *= b.uAmbientLightColor[3],
                             b.uAmbientLightColor[1] *= b.uAmbientLightColor[3],
                             b.uAmbientLightColor[2] *= b.uAmbientLightColor[3]),
                             d = g._intensity,
                         ((O = M.uAmbientIntensity).cacheData != d || A) && (b.uAmbientIntensity = O.data = g._intensity,
                             O.cacheData = d)),
                             p = B._lightInfo[RedDirectionalLight.TYPE],
                             y = p.length; y--; )
                        g = p[y],
                            v[0] = g.x,
                            v[1] = g.y,
                            v[2] = g.z,
                        g.debug && ((P = g._debugObject).x = v[0],
                            P.y = v[1],
                            P.z = v[2],
                            P._material._color = g._lightColor,
                            V.push(P)),
                            vec3.normalize(v, v),
                            l[0 + 3 * y] = v[0],
                            l[1 + 3 * y] = v[1],
                            l[2 + 3 * y] = v[2],
                            u[0 + 4 * y] = g._lightColor[0] * g._lightColor[3],
                            u[1 + 4 * y] = g._lightColor[1] * g._lightColor[3],
                            u[2 + 4 * y] = g._lightColor[2] * g._lightColor[3],
                            u[3 + 4 * y] = g._lightColor[3],
                            c[y] = g._intensity;
                    for (d = JSON.stringify(l),
                         ((O = M.uDirectionalLightPositionList).cacheData != d || A) && (b.uDirectionalLightPositionList = O.data = l,
                             O.cacheData = d),
                             d = JSON.stringify(u),
                         ((O = M.uDirectionalLightColorList).cacheData != d || A) && (b.uDirectionalLightColorList = O.data = u,
                             O.cacheData = d),
                             d = JSON.stringify(c),
                         ((O = M.uDirectionalLightIntensityList).cacheData != d || A) && (b.uDirectionalLightIntensityList = O.data = c,
                             O.cacheData = d),
                             d = p.length,
                         ((O = M.uDirectionalLightNum).cacheData != d || A) && (b.uDirectionalLightNum = O.data = d,
                             O.cacheData = d),
                             p = B._lightInfo[RedPointLight.TYPE],
                             y = p.length; y--; )
                        g = p[y],
                            v[0] = g.x,
                            v[1] = g.y,
                            v[2] = g.z,
                        g.debug && ((P = g._debugObject).x = v[0],
                            P.y = v[1],
                            P.z = v[2],
                            P.scaleX = P.scaleY = P.scaleZ = g._radius,
                            P._material._color = g._lightColor,
                            V.push(P)),
                            f[0 + 3 * y] = v[0],
                            f[1 + 3 * y] = v[1],
                            f[2 + 3 * y] = v[2],
                            h[0 + 4 * y] = g._lightColor[0] * g._lightColor[3],
                            h[1 + 4 * y] = g._lightColor[1] * g._lightColor[3],
                            h[2 + 4 * y] = g._lightColor[2] * g._lightColor[3],
                            h[3 + 4 * y] = g._lightColor[3],
                            R[y] = g._intensity,
                            m[y] = g._radius;
                    for (d = JSON.stringify(f),
                         ((O = M.uPointLightPositionList).cacheData != d || A) && (b.uPointLightPositionList = O.data = f,
                             O.cacheData = d),
                             d = JSON.stringify(h),
                         ((O = M.uPointLightColorList).cacheData != d || A) && (b.uPointLightColorList = O.data = h,
                             O.cacheData = d),
                             d = JSON.stringify(R),
                         ((O = M.uPointLightIntensityList).cacheData != d || A) && (b.uPointLightIntensityList = O.data = R,
                             O.cacheData = d),
                             d = JSON.stringify(m),
                         ((O = M.uPointLightRadiusList).cacheData != d || A) && (b.uPointLightRadiusList = O.data = m,
                             O.cacheData = d),
                             d = p.length,
                         ((O = M.uPointLightNum).cacheData != d || A) && (b.uPointLightNum = O.data = d,
                             O.cacheData = d),
                         B.shadowManager._directionalShadow && (L[1] = L[2] = L[3] = L[4] = L[6] = L[7] = L[8] = L[9] = L[11] = L[12] = L[13] = L[14] = 0,
                             L[0] = L[5] = L[10] = L[15] = 1,
                             T = B.shadowManager._directionalShadow.size,
                             _ = B.shadowManager._directionalShadow._light,
                             mat4.ortho(x, -T, T, -T, T, -T, T),
                             I[0] = 0,
                             I[1] = 0,
                             I[2] = 0,
                         _ && (I[0] = _.x,
                             I[1] = _.y,
                             I[2] = _.z,
                             vec3.normalize(I, I),
                             mat4.lookAt(L, I, [0, 0, 0], [0, 1, 0]),
                             mat4.multiply(L, x, L))),
                             y = k._datas.RedProgramList.length; y--; )
                        for (E in N++,
                            r = k._datas.RedProgramList[y],
                            t.useProgram(r.webglProgram),
                            z = r._UUID,
                            n = r.systemUniformLocation,
                            i = n.uDirectionalShadowLightMatrix,
                            a = i.location,
                            o = i._UUID,
                        a && B.shadowManager._directionalShadow && (_ = B.shadowManager._directionalShadow._light) && (d = JSON.stringify(L),
                        U[o] != d && (t.uniformMatrix4fv(a, !1, L),
                            U[o] = d)),
                        (i = n.uDirectionalShadowTexture) && (a = i.location) && (o = i._UUID,
                            s = B.shadowManager._directionalShadow ? B.shadowManager.directionalShadow.frameBuffer.texture : k._datas.emptyTexture["2d"],
                        (w = i.samplerIndex) != D && (t.activeTexture(t.TEXTURE0 + w),
                            t.bindTexture(t.TEXTURE_2D, s.webglTexture),
                            t[i.renderMethod](a, w)),
                            D = w),
                            b)
                            i = n[E],
                            (a = i.location) && (o = i._UUID,
                                s = b[E],
                                "mat" == i.renderType ? t[i.renderMethod](a, !1, s) : t[i.renderMethod](a, s),
                                U[o] = null);
                    return z
                }
        )
    },
        Object.freeze(RedSystemUniformUpdater)
}(),
function() {
    var e;
    e = {},
        (RedView = function(t, r, n, i) {
                if (e[t]) {
                    if (!n && !i)
                        return e[t];
                    RedGLUtil.throwFunc("RedView : " + t, "는 이미 생성된 RedView key입니다.", "입력값 : " + t)
                }
                if (r instanceof RedGL || RedGLUtil.throwFunc("RedScene : RedGL Instance만 허용.", r),
                    !(this instanceof RedView))
                    return new RedView(t,r,n,i);
                "string" == typeof t || RedGLUtil.throwFunc("RedView : key : 문자열만 허용", "입력값 : " + t),
                n || i || RedGLUtil.throwFunc("RedView : 존재하지 않는 key입니다.", "입력값 : " + t),
                !n || n instanceof RedScene || RedGLUtil.throwFunc("RedView : RedScene Instance만 허용", "입력값 : " + n),
                    i ? !i || i instanceof RedCamera || i instanceof RedBaseController || RedGLUtil.throwFunc("RedView : RedCamera or XXController Instance만 허용") : RedGLUtil.throwFunc("RedView : RedCamera or XXController Instance만 허용", "입력값 : " + i),
                    this.key = t,
                    this.scene = n,
                    this.postEffectManager = RedPostEffectManager(r),
                    this.camera = i,
                    this._width = "100%",
                    this._height = "100%",
                    this._x = 0,
                    this._y = 0,
                    this._viewRect = [0, 0, 0, 0],
                    this._UUID = RedGL.makeUUID(),
                    e[t] = this
            }
        ).prototype = {
            setSize: function(e, t) {
                null == e && RedGLUtil.throwFunc("RedView setSize : width가 입력되지 않았습니다."),
                null == t && RedGLUtil.throwFunc("RedView setSize : height가 입력되지 않았습니다."),
                    "number" == typeof e ? this._width = e < 0 ? 0 : e : e.indexOf("%") > -1 && +e.replace("%", "") >= 0 ? this._width = e : RedGLUtil.throwFunc("RedView setSize : width는 0이상의 숫자나 %만 허용.", e),
                    "number" == typeof t ? this._height = t < 0 ? 0 : t : t.indexOf("%") > -1 && +t.replace("%", "") >= 0 ? this._height = t : RedGLUtil.throwFunc("RedView setSize : height는 0이상의 숫자나 %만 허용.", t)
            },
            setLocation: function(e, t) {
                null == e && RedGLUtil.throwFunc("RedView setLocation : x가 입력되지 않았습니다."),
                null == t && RedGLUtil.throwFunc("RedView setLocation : y가 입력되지 않았습니다."),
                    "number" == typeof e ? this._x = e < 0 ? 0 : e : e.indexOf("%") > -1 && +e.replace("%", "") >= 0 ? this._x = e : RedGLUtil.throwFunc("RedView setLocation : x는 0이상의 숫자나 %만 허용.", e),
                    "number" == typeof t ? this._y = t < 0 ? 0 : t : t.indexOf("%") > -1 && +t.replace("%", "") >= 0 ? this._y = t : RedGLUtil.throwFunc("RedView setLocation : y는 0이상의 숫자나 %만 허용.", t)
            }
        },
        Object.freeze(RedView)
}(),
function() {
    var e, t;
    (RedWorld = function() {
            if (!(this instanceof RedWorld))
                return new RedWorld;
            this._viewList = [],
                this._viewMap = {},
                this._UUID = RedGL.makeUUID()
        }
    ).prototype = {
        addView: function(e) {
            e instanceof RedView || RedGLUtil.throwFunc("RedWorld :addView Instance만 허용함.", "입력값 : " + e),
                this._viewMap[e.key] = e,
                this._viewList.push(e)
        },
        getView: function(e) {
            return "string" == typeof e || RedGLUtil.throwFunc("RedWorld :getView 문자열만 허용함.", "입력값 : " + e),
                this._viewMap[e]
        },
        delView: function(r) {
            "string" == typeof r || RedGLUtil.throwFunc("RedWorld :delView 문자열만 허용함.", "입력값 : " + r),
            (e = this._viewMap[r]) && (t = this._viewList.indexOf(e),
                this._viewList.splice(t, 1),
                delete this._viewMap[r])
        },
        hasView: function(e) {
            return "string" == typeof e || RedGLUtil.throwFunc("RedWorld :hasView 문자열만 허용함.", "입력값 : " + e),
                !!this._viewMap[e]
        },
        getViewList: function() {
            return this._viewList.concat()
        }
    },
        Object.freeze(RedWorld)
}(),
function() {
    RedScene = function(e, t) {
        if (!(this instanceof RedScene))
            return new RedScene(e,t);
        e instanceof RedGL || RedGLUtil.throwFunc("RedScene : RedGL Instance만 허용.", e),
            this.backgroundColor = t || "#000000",
            this.useBackgroundColor = !0,
            this.useFog = !1,
            this.fogDensity = .5,
            this.fogDistance = 25,
            this.fogColor = "#ffffff",
            this.children = [],
            this.shadowManager = RedShadowManager(e),
            this.mouseManager = RedMouseEventManager(e),
            this._lightInfo = {
                RedAmbientLight: null,
                RedDirectionalLight: [],
                RedPointLight: []
            },
            this._UUID = RedGL.makeUUID()
    }
    ;
    var e, t, r = {
        addLight: function(e) {
            switch (e.TYPE) {
                case RedAmbientLight.TYPE:
                    this._lightInfo[e.TYPE] = e;
                    break;
                case RedDirectionalLight.TYPE:
                    this._lightInfo[e.TYPE].length === RedSystemShaderCode.MAX_DIRECTIONAL_LIGHT && RedGLUtil.throwFunc("RedScene : RedDirectionalLight " + RedSystemShaderCode.MAX_DIRECTIONAL_LIGHT + "개 까지 허용."),
                        this._lightInfo[e.TYPE].push(e);
                    break;
                case RedPointLight.TYPE:
                    this._lightInfo[e.TYPE].length === RedSystemShaderCode.MAX_POINT_LIGHT && RedGLUtil.throwFunc("RedScene : RedPointLight " + RedSystemShaderCode.MAX_POINT_LIGHT + "개 까지 허용."),
                        this._lightInfo[e.TYPE].push(e);
                    break;
                default:
                    RedGLUtil.throwFunc("RedScene : RedBaseLight 인스턴스만 가능")
            }
        },
        removeLight: function(t) {
            switch (t.TYPE) {
                case RedAmbientLight.TYPE:
                    this._lightInfo[t.TYPE] === t && (this._lightInfo[t.TYPE] = null);
                    break;
                case RedDirectionalLight.TYPE:
                case RedPointLight.TYPE:
                    (e = this._lightInfo[t.TYPE].indexOf(t)) > -1 && this._lightInfo[t.TYPE].splice(e, 1);
                    break;
                default:
                    RedGLUtil.throwFunc("RedScene : RedBaseLight 인스턴스만 가능")
            }
        },
        removeLightAll: function() {
            this._lightInfo[RedAmbientLight.TYPE] = null,
                this._lightInfo[RedDirectionalLight.TYPE].length = 0,
                this._lightInfo[RedPointLight.TYPE].length = 0
        }
    };
    for (var n in RedScene.prototype = new RedBaseContainer,
        r)
        RedScene.prototype[n] = r[n];
    RedDefinePropertyInfo.definePrototype("RedScene", "backgroundColor", "hex", {
        callback: function() {
            t = RedGLUtil.hexToRGB_ZeroToOne.call(this, this._backgroundColor),
                this._r = t[0],
                this._g = t[1],
                this._b = t[2]
        }
    }),
        RedDefinePropertyInfo.definePrototype("RedScene", "useBackgroundColor", "boolean"),
        RedDefinePropertyInfo.definePrototype("RedScene", "useFog", "boolean"),
        RedDefinePropertyInfo.definePrototype("RedScene", "fogDensity", "number", {
            min: 0
        }),
        RedDefinePropertyInfo.definePrototype("RedScene", "fogDistance", "number", {
            min: 0
        }),
        RedDefinePropertyInfo.definePrototype("RedScene", "fogColor", "hex", {
            callback: function() {
                var e;
                return function() {
                    e = RedGLUtil.hexToRGB_ZeroToOne.call(this, this._fogColor),
                        this._fogR = e[0],
                        this._fogG = e[1],
                        this._fogB = e[2]
                }
            }()
        }),
        Object.defineProperty(RedScene.prototype, "skyBox", {
            get: function() {
                return this._skyBoxMesh
            },
            set: function(e) {
                return !e || e instanceof RedSkyBox || RedGLUtil.throwFunc("RedScene : RedSkyBox Instance만 허용."),
                    this._skyBoxMesh = e,
                    this._skyBoxMesh
            }
        }),
        Object.defineProperty(RedScene.prototype, "grid", {
            get: function() {
                return this._gridMesh
            },
            set: function(e) {
                return !e || e instanceof RedGrid || RedGLUtil.throwFunc("RedScene : RedGrid Instance만 허용."),
                    this._gridMesh = e,
                    this._gridMesh
            }
        }),
        Object.defineProperty(RedScene.prototype, "axis", {
            get: function() {
                return this._axisMesh
            },
            set: function(e) {
                return !e || e instanceof RedAxis || RedGLUtil.throwFunc("RedScene : RedAxis Instance만 허용."),
                    this._axisMesh = e,
                    this._axisMesh
            }
        }),
        Object.freeze(RedScene)
}(),
function() {
    var e, t;
    (RedCamera = function() {
            if (!(this instanceof RedCamera))
                return new RedCamera;
            this.x = this.y = this.z = 0,
                this.targetX = this.targetY = this.targetZ = 0,
                this.fov = 60,
                this.nearClipping = .1,
                this.farClipping = 1e5,
                this.mode2DYn = !1,
                this.matrix = mat4.create(),
                this.perspectiveMTX = mat4.create(),
                this.autoUpdateMatrix = !0,
                this._UUID = RedGL.makeUUID()
        }
    ).prototype.update = function() {
        this.lookAt(this.targetX, this.targetY, this.targetZ)
    }
        ,
        RedCamera.prototype.lookAt = (e = new Float32Array([0, 1, 0]),
                t = [],
                function(r, n, i) {
                    t[0] = this.targetX = r,
                        t[1] = this.targetY = n,
                        t[2] = this.targetZ = i,
                        mat4.identity(this.matrix),
                        mat4.lookAt(this.matrix, [this.x, this.y, this.z], t, e)
                }
        ),
        Object.freeze(RedCamera)
}(),
(RedBasicController = function(e) {
        if (!(this instanceof RedBasicController))
            return new RedBasicController(e);
        this.targetView = null,
            this.keyBuffer = {},
            this.keyNameMapper = {
                moveForward: "w",
                moveBack: "s",
                moveLeft: "a",
                moveRight: "d",
                moveUp: "t",
                moveDown: "g",
                turnLeft: "q",
                turnRight: "e",
                turnUp: "r",
                turnDown: "f"
            },
            this.speed = 1,
            this.delay = .1,
            this.speedRotation = 1,
            this.delayRotation = .1,
            this.maxAcceleration = 3,
            this._currentAcceleration = 0,
            this.camera = RedCamera(),
            this._desirePosition = [0, 0, 0],
            this._desirePan = 0,
            this._desireTilt = 0,
            this._targetObject = RedMesh(e),
            function(t) {
                var r, n, i, a, o, s, d, l, u, c, f, h, R, m, p;
                "ie" == RedGLDetect.BROWSER_INFO.browser && 11 == RedGLDetect.BROWSER_INFO.browserVer ? (R = "offsetX",
                    m = "offsetY") : (R = "layerX",
                    m = "layerY"),
                    p = function(r) {
                        if (r || ((r = {
                            clientX: e._mouseX,
                            clientY: e._mouseY
                        })[R] = e._mouseX,
                            r[m] = e._mouseY),
                            t.targetView) {
                            var n, i;
                            if (RedGLDetect.BROWSER_INFO.isMobile ? (n = r.clientX,
                                i = r.clientY) : (n = r[R],
                                i = r[m]),
                                !(t.targetView._viewRect[0] < n && n < t.targetView._viewRect[0] + t.targetView._viewRect[2]))
                                return;
                            if (!(t.targetView._viewRect[1] < i && i < t.targetView._viewRect[1] + t.targetView._viewRect[3]))
                                return
                        }
                        return !0
                    }
                    ,
                    c = RedGLDetect.BROWSER_INFO.move,
                    f = RedGLDetect.BROWSER_INFO.up,
                    h = RedGLDetect.BROWSER_INFO.down,
                    s = 0,
                    d = 0,
                    l = 0,
                    u = 0,
                    r = function(e) {
                        p() && (t.keyBuffer[e.key] = 1)
                    }
                    ,
                    n = function(e) {
                        t.keyBuffer[e.key] = 0
                    }
                    ,
                    i = function(t) {
                        RedGLDetect.BROWSER_INFO.isMobile && (t = t.targetTouches[0]),
                        p(t) && (RedGLDetect.BROWSER_INFO.isMobile ? (s = t.clientX,
                            d = t.clientY) : (s = t[R],
                            d = t[m]),
                            e._canvas.addEventListener(c, a),
                            window.addEventListener(f, o))
                    }
                    ,
                    a = function(e) {
                        RedGLDetect.BROWSER_INFO.isMobile ? (e = e.targetTouches[0],
                            l = e.clientX - s,
                            u = e.clientY - d,
                            s = e.clientX,
                            d = e.clientY) : (l = e[R] - s,
                            u = e[m] - d,
                            s = e[R],
                            d = e[m]),
                            t._desirePan -= l * t._speedRotation * .1,
                            t._desireTilt -= u * t._speedRotation * .1
                    }
                    ,
                    o = function() {
                        e._canvas.removeEventListener(c, a),
                            window.removeEventListener(f, o)
                    }
                    ,
                    window.addEventListener("keydown", r),
                    window.addEventListener("keyup", n),
                    e._canvas.addEventListener(h, i)
            }(this)
    }
).prototype = new RedBaseController,
RedDefinePropertyInfo.definePrototype("RedBasicController", "speed", "number", {
    min: 0
}),
RedDefinePropertyInfo.definePrototype("RedBasicController", "delay", "number", {
    min: 0
}),
RedDefinePropertyInfo.definePrototype("RedBasicController", "speedRotation", "number", {
    min: 0
}),
RedDefinePropertyInfo.definePrototype("RedBasicController", "delayRotation", "number", {
    min: 0
}),
RedDefinePropertyInfo.definePrototype("RedBasicController", "maxAcceleration", "number", {
    min: 0
}),
Object.defineProperty(RedBasicController.prototype, "x", {
    get: function() {
        return this._targetObject.x
    },
    set: function(e) {
        this._targetObject.x = e,
            this._desirePosition[0] = e
    }
}),
Object.defineProperty(RedBasicController.prototype, "y", {
    get: function() {
        return this._targetObject.y
    },
    set: function(e) {
        this._targetObject.y = e,
            this._desirePosition[1] = e
    }
}),
Object.defineProperty(RedBasicController.prototype, "z", {
    get: function() {
        return this._targetObject.z
    },
    set: function(e) {
        this._targetObject.z = e,
            this._desirePosition[2] = e
    }
}),
Object.defineProperty(RedBasicController.prototype, "tilt", {
    get: function() {
        return this._desireTilt
    },
    set: function(e) {
        this._targetObject.rotationX = e,
            this._desireTilt = e
    }
}),
Object.defineProperty(RedBasicController.prototype, "pan", {
    get: function() {
        return this._desirePan
    },
    set: function(e) {
        this._targetObject.rotationY = e,
            this._desirePan = e
    }
}),
RedBasicController.prototype.update = function() {
    var e, t, r, n, i, a, o, s, d, l, u, c, f, h, R, m, p;
    return new Float32Array([0, 1, 0]),
        c = mat4.create(),
        l = mat4.create(),
        u = mat4.create(),
        f = vec3.create(),
        function() {
            e = 0,
                t = 0,
                n = !1,
                i = !1,
                a = this._speed,
                o = this._speedRotation,
                s = this._delay,
                d = this._delayRotation,
                h = this.camera,
                p = this._desirePosition,
                R = this.keyBuffer,
                m = this.keyNameMapper,
                f[0] = 0,
                f[1] = 0,
                f[2] = 0,
            R[m.turnLeft] && (i = !0,
                e = o),
            R[m.turnRight] && (i = !0,
                e = -o),
            R[m.turnUp] && (i = !0,
                t = o),
            R[m.turnDown] && (i = !0,
                t = -o),
            R[m.moveForward] && (n = !0,
                f[2] = -this._currentAcceleration * a),
            R[m.moveBack] && (n = !0,
                f[2] = this._currentAcceleration * a),
            R[m.moveLeft] && (n = !0,
                f[0] = -this._currentAcceleration * a),
            R[m.moveRight] && (n = !0,
                f[0] = this._currentAcceleration * a),
            R[m.moveUp] && (n = !0,
                f[1] = this._currentAcceleration * a),
            R[m.moveDown] && (n = !0,
                f[1] = -this._currentAcceleration * a),
                i || n ? (this._currentAcceleration += .1,
                this._currentAcceleration > this._maxAcceleration && (this._currentAcceleration = this._maxAcceleration)) : (this._currentAcceleration += -.1,
                this._currentAcceleration < 0 && (this._currentAcceleration = 0)),
                r = this._targetObject,
            i && (this._desirePan += e,
                this._desireTilt += t),
                r.rotationY += (this._desirePan - r.rotationY) * d,
                r.rotationX += (this._desireTilt - r.rotationX) * d,
            (n || i) && (l = r.matrix,
                mat4.identity(c),
                mat4.rotateY(c, c, r.rotationY * Math.PI / 180),
                mat4.rotateX(c, c, r.rotationX * Math.PI / 180),
                mat4.translate(c, c, f),
                mat4.identity(l),
                mat4.translate(l, l, [r.x, r.y, r.z]),
                mat4.multiply(l, l, c),
                p[0] = l[12],
                p[1] = l[13],
                p[2] = l[14]),
                r.x += (p[0] - r.x) * s,
                r.y += (p[1] - r.y) * s,
                r.z += (p[2] - r.z) * s,
                r.rotationY += (this._desirePan - r.rotationY) * d,
                r.rotationX += (this._desireTilt - r.rotationX) * d,
                l = r.matrix,
                mat4.identity(l),
                mat4.translate(l, l, [r.x, r.y, r.z]),
                mat4.rotateY(l, l, r.rotationY * Math.PI / 180),
                mat4.rotateX(l, l, r.rotationX * Math.PI / 180),
                u = mat4.clone(l),
                mat4.translate(u, u, [0, 0, .01]),
                h.x = u[12],
                h.y = u[13],
                h.z = u[14],
                h.lookAt(r.x, r.y, r.z)
        }
}(),
Object.freeze(RedBasicController),
function() {
    var e, t, r, n;
    (RedObitController = function(e) {
            if (!(this instanceof RedObitController))
                return new RedObitController(e);
            this.centerX = 0,
                this.centerY = 0,
                this.centerZ = 0,
                this.distance = 15,
                this.speedDistance = 2,
                this.delayDistance = .1,
                this.speedRotation = 3,
                this.delayRotation = .1,
                this.tilt = 0,
                this.minTilt = -90,
                this.maxTilt = 90,
                this.pan = 0,
                this.camera = RedCamera(),
                this._currentPan = 0,
                this._currentTilt = 0,
                this._currentDistance = 0,
                this.needUpdate = !0,
                this.targetView = null,
                function(t) {
                    var r, n, i, a, o, s, d, l, u, c, f, h, R, m;
                    h = function(e) {
                        if (t.targetView) {
                            var r, n;
                            if (RedGLDetect.BROWSER_INFO.isMobile ? (r = e.clientX,
                                n = e.clientY) : (r = e[R],
                                n = e[m]),
                                !(t.targetView._viewRect[0] < r && r < t.targetView._viewRect[0] + t.targetView._viewRect[2]))
                                return;
                            if (!(t.targetView._viewRect[1] < n && n < t.targetView._viewRect[1] + t.targetView._viewRect[3]))
                                return
                        }
                        return !0
                    }
                        ,
                        u = RedGLDetect.BROWSER_INFO.move,
                        c = RedGLDetect.BROWSER_INFO.up,
                        f = RedGLDetect.BROWSER_INFO.down,
                        o = 0,
                        s = 0,
                        d = 0,
                        l = 0,
                        "ie" == RedGLDetect.BROWSER_INFO.browser && 11 == RedGLDetect.BROWSER_INFO.browserVer ? (R = "offsetX",
                            m = "offsetY") : (R = "layerX",
                            m = "layerY"),
                        r = function(r) {
                            if (t.needUpdate) {
                                if (RedGLDetect.BROWSER_INFO.isMobile && (r = r.targetTouches[0]),
                                    !h(r))
                                    return;
                                RedGLDetect.BROWSER_INFO.isMobile ? (o = r.clientX,
                                    s = r.clientY) : (o = r[R],
                                    s = r[m]),
                                    e._canvas.addEventListener(u, n),
                                    window.addEventListener(c, i)
                            }
                        }
                        ,
                        n = function(e) {
                            t.needUpdate && (RedGLDetect.BROWSER_INFO.isMobile ? (e = e.targetTouches[0],
                                d = e.clientX - o,
                                l = e.clientY - s,
                                o = e.clientX,
                                s = e.clientY) : (d = e[R] - o,
                                l = e[m] - s,
                                o = e[R],
                                s = e[m]),
                                t._pan -= d * t._speedRotation * .1,
                                t._tilt -= l * t._speedRotation * .1)
                        }
                        ,
                        i = function() {
                            e._canvas.removeEventListener(u, n),
                                window.removeEventListener(c, i)
                        }
                        ,
                        a = function(e) {
                            if (t.needUpdate) {
                                if (!h(e))
                                    return;
                                t.distance += e.deltaY / 100 * t._speedDistance
                            }
                        }
                        ,
                        e._canvas.addEventListener(f, r),
                        e._canvas.addEventListener("wheel", a)
                }(this)
        }
    ).prototype = new RedBaseController,
        RedDefinePropertyInfo.definePrototype("RedObitController", "centerX", "number"),
        RedDefinePropertyInfo.definePrototype("RedObitController", "centerY", "number"),
        RedDefinePropertyInfo.definePrototype("RedObitController", "centerZ", "number"),
        RedDefinePropertyInfo.definePrototype("RedObitController", "distance", "number", {
            min: 1
        }),
        RedDefinePropertyInfo.definePrototype("RedObitController", "speedDistance", "number", {
            min: 0
        }),
        RedDefinePropertyInfo.definePrototype("RedObitController", "delayDistance", "number", {
            min: 0
        }),
        RedDefinePropertyInfo.definePrototype("RedObitController", "speedRotation", "number", {
            min: 0
        }),
        RedDefinePropertyInfo.definePrototype("RedObitController", "delayRotation", "number", {
            min: 0
        }),
        RedDefinePropertyInfo.definePrototype("RedObitController", "pan", "number"),
        RedDefinePropertyInfo.definePrototype("RedObitController", "tilt", "number"),
        RedDefinePropertyInfo.definePrototype("RedObitController", "maxTilt", "number", {
            min: -90,
            max: 90
        }),
        RedDefinePropertyInfo.definePrototype("RedObitController", "minTilt", "number", {
            min: -90,
            max: 90
        }),
        RedObitController.prototype.update = (n = Math.PI / 180,
                function() {
                    this.needUpdate && (this._tilt < this._minTilt && (this._tilt = this._minTilt),
                    this._tilt > this._maxTilt && (this._tilt = this._maxTilt),
                        e = this._delayRotation,
                        t = this.camera,
                        r = t.matrix,
                        this._currentPan += (this._pan - this._currentPan) * e,
                        this._currentTilt += (this._tilt - this._currentTilt) * e,
                        this._currentDistance += (this._distance - this._currentDistance) * this._delayDistance,
                        mat4.identity(r),
                        mat4.translate(r, r, [this._centerX, this._centerY, this._centerZ]),
                        mat4.rotateY(r, r, this._currentPan * n),
                        mat4.rotateX(r, r, this._currentTilt * n),
                        mat4.translate(r, r, [0, 0, this._currentDistance]),
                        t.x = r[12],
                        t.y = r[13],
                        t.z = r[14],
                        t.lookAt(this._centerX, this._centerY, this._centerZ))
                }
        ),
        Object.freeze(RedObitController)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vVertexColor = aVertexColor;
gl_Position = uPMatrix * uCameraMatrix* uMMatrix * vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
void main(void) {
vec4 finalColor = vVertexColor;
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
}
*/
        }
        ,
        (RedGridMaterial = function(n) {
                if (!(this instanceof RedGridMaterial))
                    return new RedGridMaterial(n);
                this.makeProgramList(this, n, "RedGridMaterialProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBaseMaterial,
        Object.freeze(RedGridMaterial)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
varying vec3 vReflectionCubeCoord;
void main(void) {
vReflectionCubeCoord = (uMMatrix *vec4(aVertexPosition, 0.0)).xyz;
gl_Position = uPMatrix * uCameraMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
// 안개
//#REDGL_DEFINE#fragmentShareFunc#fogFactor#
//#REDGL_DEFINE#fragmentShareFunc#fog#
uniform samplerCube u_skyBoxTexture;
varying vec3 vReflectionCubeCoord;
uniform float u_alpha;
uniform bool u_mirrorMode;
void main(void) {
vec4 finalColor ;
if(u_mirrorMode) finalColor = textureCube(u_skyBoxTexture, vec3(1.0-vReflectionCubeCoord.x,vReflectionCubeCoord.y,1.0-vReflectionCubeCoord.z));
else finalColor = textureCube(u_skyBoxTexture, vReflectionCubeCoord);
//#REDGL_DEFINE#fog#false# gl_FragColor = finalColor;
//#REDGL_DEFINE#fog#true# gl_FragColor = fog( fogFactor(u_FogDistance, u_FogDensity), uFogColor, finalColor);
gl_FragColor.a = u_alpha;
}
*/
        }
        ,
        (RedSkyBoxMaterial = function(n, i, a) {
                if (!(this instanceof RedSkyBoxMaterial))
                    return new RedSkyBoxMaterial(n,i,a);
                n instanceof RedGL || RedGLUtil.throwFunc("RedSkyBoxMaterial : RedGL Instance만 허용.", n),
                    this.makeProgramList(this, n, "RedSkyBoxMaterialProgram", e, t),
                    this.skyBoxTexture = i,
                    this._UUID = RedGL.makeUUID(),
                    this.alpha = null == a ? 1 : a,
                    this.mirrorMode = !1,
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBaseMaterial,
        RedDefinePropertyInfo.definePrototype("RedSkyBoxMaterial", "skyBoxTexture", "samplerCube", {
            essential: !0
        }),
        RedDefinePropertyInfo.definePrototype("RedSkyBoxMaterial", "alpha", "number", {
            min: 0,
            max: 1
        }),
        RedDefinePropertyInfo.definePrototype("RedSkyBoxMaterial", "mirrorMode", "boolean"),
        Object.freeze(RedSkyBoxMaterial)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
// 스키닝
//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#
// Sprite3D
//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
void main(void) {
// position 계산
//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
//#REDGL_DEFINE#sprite3D#true# gl_Position = getSprite3DMatrix(uDirectionalShadowLightMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
//#REDGL_DEFINE#sprite3D#true# }
//#REDGL_DEFINE#sprite3D#false# gl_Position = uDirectionalShadowLightMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
vec4 encodeFloat (float depth) {
const vec4 cBitShift = vec4(
256.0 * 256.0 * 256.0,
256.0 * 256.0,
256.0,
1.0
);
const vec4 cBitMask = vec4(
0.0,
1.0 / 256.0,
1.0 / 256.0,
1.0 / 256.0
);
vec4 comp = fract(depth * cBitShift);
comp -= comp.xxyz * cBitMask;
return comp;
}
void main(void) {
vec4 finalColor = encodeFloat(gl_FragCoord.z);
// if(finalColor.a < 0.5) finalColor = vec4(0.0, 0.0, 0.0, 1.0);
gl_FragColor = finalColor;
}
*/
        }
        ,
        (RedDirectionalShadowMaterial = function(n) {
                if (!(this instanceof RedDirectionalShadowMaterial))
                    return new RedDirectionalShadowMaterial(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedDirectionalShadowMaterial : RedGL Instance만 허용.", n),
                    this._RedDirectionalShadowYn = !0,
                    this.makeProgramList(this, n, "RedDirectionalShadowMaterialProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBaseMaterial,
        Object.freeze(RedDirectionalShadowMaterial)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
void main(void) {
gl_FragColor = texture2D(u_diffuseTexture, vTexcoord);
}
*/
        }
        ,
        (RedPostEffectMaterial = function(n, i) {
                if (!(this instanceof RedPostEffectMaterial))
                    return new RedPostEffectMaterial(n,i);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffectMaterial : RedGL Instance만 허용.", n),
                    this.diffuseTexture = i,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectMaterialProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBaseMaterial,
        RedDefinePropertyInfo.definePrototype("RedPostEffectMaterial", "diffuseTexture", "sampler2D", {
            essential: !0
        }),
        Object.freeze(RedPostEffectMaterial)
}(),
function() {
    var e;
    (RedDirectionalShadow = function(e, t) {
            if (!(this instanceof RedDirectionalShadow))
                return new RedDirectionalShadow(e,t);
            e instanceof RedGL || RedGLUtil.throwFunc("RedDirectionalShadow : RedGL Instance만 허용.", e),
                this._directionalShadowMaterial = RedDirectionalShadowMaterial(e),
                this.frameBuffer = RedFrameBuffer(e),
                this.light = t,
                this.width = 2048,
                this.height = 2048,
                this.size = 20,
                this._UUID = RedGL.makeUUID(),
                this._castingList = []
        }
    ).prototype.addCasting = function(e) {
        e instanceof RedBaseObject3D || RedGLUtil.throwFunc("addCasting", "RedBaseObject3D Instance만 가능", "입력값 : " + e),
            this._castingList.push(e)
    }
        ,
        RedDirectionalShadow.prototype.removeCasting = function(t) {
            -1 == (e = this._castingList.indexOf(t)) ? RedGLUtil.throwFunc("removeCasting", "존재하지 않는 대상을 삭제하려고 함") : this._castingList.splice(e, 1)
        }
        ,
        Object.defineProperty(RedDirectionalShadow.prototype, "light", {
            get: function() {
                return this._light
            },
            set: function(e) {
                e && e instanceof RedDirectionalLight || RedGLUtil.throwFunc("RedDirectionalShadow - light : RedDirectionalLight Instance만 허용.", e),
                    this._light = e
            }
        }),
        RedDefinePropertyInfo.definePrototype("RedDirectionalShadow", "width", "number", {
            min: 1
        }),
        RedDefinePropertyInfo.definePrototype("RedDirectionalShadow", "height", "number", {
            min: 1
        }),
        RedDefinePropertyInfo.definePrototype("RedDirectionalShadow", "size", "number", {
            min: 1
        }),
        Object.freeze(RedDirectionalShadow)
}(),
function() {
    var e, t, r, n, i, a;
    (RedShadowManager = function(e) {
            if (!(this instanceof RedShadowManager))
                return new RedShadowManager(e);
            e instanceof RedGL || RedGLUtil.throwFunc("RedShadowManager : RedGL Instance만 허용.", e),
                this._UUID = RedGL.makeUUID()
        }
    ).prototype = {
        render: function(o, s, d, l, u) {
            (n = this._directionalShadow) && (e = o.gl,
                r = s.worldRect,
                t = d._viewRect,
                i = n.width,
                a = n.height,
                n.frameBuffer.width = i,
                n.frameBuffer.height = a,
                n.frameBuffer.bind(o.gl),
                e.viewport(0, 0, i, a),
                e.scissor(0, 0, i, a),
                e.clearColor(0, 0, 0, 1),
                e.clearDepth(1),
                e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT),
                s.sceneRender(o, d.scene, d.camera, d.camera.mode2DYn, n._castingList, l, u, n._directionalShadowMaterial),
                n.frameBuffer.unbind(o.gl),
                e.viewport(t[0], r[3] - t[3] - t[1], t[2], t[3]),
                e.scissor(t[0], r[3] - t[3] - t[1], t[2], t[3]))
        }
    },
        Object.defineProperty(RedShadowManager.prototype, "directionalShadow", {
            get: function() {
                return this._directionalShadow
            },
            set: function(e) {
                !e || e instanceof RedDirectionalShadow || RedGLUtil.throwFunc("RedShadowManager - directionalShadow : RedDirectionalShadow Instance만 허용.", e),
                    this._directionalShadow = e
            }
        }),
        Object.freeze(RedShadowManager)
}(),
function() {
    var e, t, r, n;
    t = function(t, r, n) {
        var i;
        i = t._svg.querySelector("td").style,
            t["_" + r] = n,
            Object.defineProperty(t, r, {
                get: function() {
                    return t["_" + r]
                },
                set: function(n) {
                    t["_" + r] = n,
                        i[r] = "number" == typeof n ? n += "px" : n,
                        e(t)
                }
            }),
            t[r] = n
    }
        ,
        e = function(e) {
            e._height = +e._height,
                e._svg.setAttribute("width", e._width),
                e._svg.setAttribute("height", e._height),
                e._svg.querySelector("foreignObject").setAttribute("height", e._height),
                e._svg.querySelector("table").style.height = e._height + "px",
                e._img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(e._svg.outerHTML)
        }
        ,
        (RedText = function(e, r, n) {
                if (!(this instanceof RedText))
                    return new RedText(e,r,n);
                e instanceof RedGL || RedGLUtil.throwFunc("RedText : RedGL Instance만 허용.", e),
                    RedBaseObject3D.build.call(this, e.gl);
                var i = this;
                this._cvs = null,
                    this._ctx = null,
                    this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                    this._svg.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
                    this._svg.style = "position:absolute;top:0px;left:0px;text-align:center;z-index:10",
                    this._svg.innerHTML = '<foreignObject  width="100%" style="position:absolute;top:0;left:0">   <table xmlns="http://www.w3.org/1999/xhtml" style="border-collapse: collapse;position:table;top:0;left:0;width:100%;table-layout:fixed">       <tr xmlns="http://www.w3.org/1999/xhtml">       <td xmlns="http://www.w3.org/1999/xhtml"  > </td>       </tr>   </table></foreignObject>',
                    this.geometry = RedPlane(e, 1, 1),
                    this.material = RedTextMaterial(e, RedBitmapTexture(e, this._cvs)),
                    this.blendSrc = e.gl.ONE,
                    this.blendDst = e.gl.ONE_MINUS_SRC_ALPHA,
                    this.useCullFace = !1,
                    this.perspectiveScale = !0,
                    this.sprite3DYn = !1,
                    this._img = new Image,
                    n = n || 256,
                (r = r || 256) > e.detect.texture.MAX_TEXTURE_SIZE && (r = e.detect.texture.MAX_TEXTURE_SIZE),
                n > e.detect.texture.MAX_TEXTURE_SIZE && (n = e.detect.texture.MAX_TEXTURE_SIZE),
                    this.width = r,
                    this.height = n,
                    t(this, "padding", 0),
                    t(this, "background", ""),
                    t(this, "color", "#000"),
                    t(this, "fontFamily", "Arial"),
                    t(this, "fontSize", 16),
                    t(this, "fontWeight", "normal"),
                    t(this, "fontStyle", "normal"),
                    t(this, "lineHeight", 24),
                    t(this, "letterSpacing", 0),
                    t(this, "wordBreak", "break-all"),
                    t(this, "verticalAlign", "middle"),
                    t(this, "textAlign", "center"),
                    this._img.onload = function() {
                        var t, r;
                        (t = i._width) % 2 == 0 && (t += 1),
                        (r = i._height) % 2 == 0 && (r += 1),
                            i._cvs = window.OffscreenCanvas ? new OffscreenCanvas(t,r) : document.createElement("canvas"),
                            i._ctx = i._cvs.getContext("2d"),
                            i._cvs.width = t,
                            i._cvs.height = r,
                            i._ctx.clearRect(0, 0, t, r),
                            i._ctx.drawImage(i._img, 0, 0, t, r),
                            i.material.width = t,
                            i.material.height = r,
                            i.material.diffuseTexture.src = i._cvs,
                            i.material.diffuseTexture.option = {
                                min: e.gl.LINEAR,
                                mag: e.gl.LINEAR,
                                wrap_s: e.gl.CLAMP_TO_EDGE,
                                wrap_t: e.gl.CLAMP_TO_EDGE
                            }
                    }
                    ,
                    this.useTransparentSort = !0,
                    this._UUID = RedGL.makeUUID()
            }
        ).prototype = new RedBaseObject3D,
        RedDefinePropertyInfo.definePrototype("RedText", "perspectiveScale", "boolean"),
        RedDefinePropertyInfo.definePrototype("RedText", "sprite3DYn", "boolean"),
        RedDefinePropertyInfo.definePrototype("RedText", "width", "uint", {
            min: 2,
            callback: function(t) {
                this._width = t,
                    this.material.width = t,
                    e(this)
            }
        }),
        RedDefinePropertyInfo.definePrototype("RedText", "height", "uint", {
            min: 2,
            callback: function(t) {
                this._height = t,
                    this.material.height = t,
                    e(this)
            }
        }),
        Object.defineProperty(RedText.prototype, "text", {
            get: function() {
                return this._text
            },
            set: function(t) {
                r = this._svg,
                    n = r.querySelector("foreignObject td"),
                    this._text = t.replace(/\<br\>/gi, "<div/>");
                var i = this
                    , a = this._text.match(/<img .*?>/g)
                    , o = []
                    , s = this._text
                    , d = (a = a || []).length
                    , l = 0;
                a.forEach(function(t) {
                    var r = t.match(/src\s*=\s*(\'|\").*?(\'|\")/g)[0];
                    r = r.replace(/src\s*=\s*(\'|\")/g, "").replace(/(\'|\")/g, "");
                    var a = document.createElement("div");
                    a.innerHTML = t;
                    var u = a.querySelector("img");
                    u.onload = function() {
                        var t = document.createElement("canvas");
                        t.width = u.style.width ? +u.style.width : u.width,
                            t.height = u.style.height ? +u.style.height : u.height;
                        var r = t.getContext("2d");
                        r.scale(t.width / u.naturalWidth, t.height / u.naturalHeight),
                            r.drawImage(u, 0, 0),
                            c.result = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink" width="' + u.width + '" height="' + u.height + '" display="inline" style="vertical-align: middle;display: inline-block"><image xlink:href="' + t.toDataURL("image/png") + '" height="' + u.height + 'px" width="' + u.width + 'px" /></svg>',
                        ++l == d && (o.forEach(function(e) {
                            s = s.replace(e.source, e.result)
                        }),
                            n.innerHTML = s,
                            e(i)),
                            u.onload = null
                    }
                    ;
                    var c = {
                        source: t,
                        sourceSrc: r,
                        result: ""
                    };
                    o.push(c)
                }),
                0 == a.length && (n.innerHTML = s,
                    e(this))
            }
        }),
        Object.freeze(RedText)
}(),
function() {
    var e, t, r, n, i, a, o, s, d;
    (RedMouseEventManager = function(e) {
            if (!(this instanceof RedMouseEventManager))
                return new RedMouseEventManager(e);
            e instanceof RedGL || RedGLUtil.throwFunc("RedMouseEventManager : RedGL Instance만 허용.", e),
                this.frameBuffer = RedFrameBuffer(e),
                this._mouseEventMaterial = RedMouseEventMaterial(e),
                this._mouseEventListObject = {},
                this._mouseEventList = [],
                this._prevInfo = {},
                this._UUID = RedGL.makeUUID()
        }
    ).prototype = {
        add: function(e, t, r) {
            var n = e._mouseColorID;
            this._mouseEventListObject[n] || (this._mouseEventListObject[n] = {
                target: e
            },
                this._mouseEventList.push(e)),
                this._mouseEventListObject[n][t] = r
        },
        remove: function(e, t) {
            var r = e._mouseColorID;
            if (this._mouseEventListObject[r]) {
                var n = 0;
                for (var i in this._mouseEventListObject[r][t] && delete this._mouseEventListObject[r][t],
                    this._mouseEventListObject[r])
                    n++;
                if (1 === n) {
                    var a = this._mouseEventList.indexOf(e);
                    a > -1 && (this._mouseEventList.splice(a, 1),
                        delete this._mouseEventListObject[r])
                }
            }
        },
        render: (i = new Uint8Array(4),
                a = 1,
                o = [],
                s = "default",
                d = function() {
                    if (o.length) {
                        var e = o.shift();
                        e.info[e.type].call(e.info.target, {
                            target: e.info.target,
                            type: "out"
                        })
                    }
                }
                ,
                function(l, u, c, f, h, R) {
                    if (this._mouseEventList.length) {
                        a = l.renderScale * window.devicePixelRatio,
                            e = l.gl,
                            t = u.worldRect,
                            c._viewRect,
                            r = t[2],
                            n = t[3],
                            this.frameBuffer.width = r,
                            this.frameBuffer.height = n,
                            this.frameBuffer.bind(l.gl),
                            u.sceneRender(l, c.scene, c.camera, c.camera.mode2DYn, this._mouseEventList, f, h, this._mouseEventMaterial);
                        var m, p, _, g = l._mouseEventInfo;
                        for (m = 0,
                                 p = g.length; m < p; m++) {
                            _ = g[m],
                                e.readPixels(_.x * a, n - _.y * a, 1, 1, e.RGBA, e.UNSIGNED_BYTE, i);
                            var P, v = this._mouseEventListObject[i[0] + "," + i[1] + "," + i[2] + "," + i[3]];
                            v ? (v.target._UUID,
                            _.type == RedGLDetect.BROWSER_INFO.down && (P = "down") && v[P] && v[P].call(v.target, {
                                target: v.target,
                                type: P,
                                nativeEvent: _.nativeEvent
                            }),
                            _.type == RedGLDetect.BROWSER_INFO.up && (P = "up") && v[P] && v[P].call(v.target, {
                                target: v.target,
                                type: P,
                                nativeEvent: _.nativeEvent
                            }),
                            this._prevInfo[c._UUID] && this._prevInfo[c._UUID] != v && (P = "out") && this._prevInfo[c._UUID][P] && this._prevInfo[c._UUID][P].call(this._prevInfo[c._UUID].target, {
                                target: this._prevInfo[c._UUID].target,
                                type: P
                            }),
                            this._prevInfo[c._UUID] != v && (P = "over") && v[P] && v[P].call(v.target, {
                                target: v.target,
                                type: P,
                                nativeEvent: _.nativeEvent
                            }),
                                this._prevInfo[c._UUID] = v) : (P = "out",
                            this._prevInfo[c._UUID] && this._prevInfo[c._UUID][P] && o.push({
                                info: this._prevInfo[c._UUID],
                                type: P,
                                nativeEvent: _.nativeEvent
                            }),
                                this._prevInfo[c._UUID] = null),
                                d()
                        }
                        this._prevInfo[c._UUID] && (s = "pointer"),
                        R && (l._mouseEventInfo.length = 0,
                            document.body.style.cursor = s,
                            s = "default"),
                            this.frameBuffer.unbind(l.gl)
                    }
                }
        )
    },
        Object.freeze(RedMouseEventManager)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
// 스키닝
//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#
// Sprite3D
//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
void main(void) {
gl_PointSize = uPointSize;
// position 계산
//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2((uPMatrix * targetMatrix)[0][0],(uPMatrix * targetMatrix)[1][1]);
//#REDGL_DEFINE#sprite3D#true# }
//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform vec4 uColor;
void main(void) {
gl_FragColor = uColor / 255.0;
}
*/
        }
        ,
        (RedMouseEventMaterial = function(n) {
                if (!(this instanceof RedMouseEventMaterial))
                    return new RedMouseEventMaterial(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedMouseEventMaterial : RedGL Instance만 허용.", n),
                    this._RedMouseEventMaterialYn = !0,
                    this.color = null,
                    this.makeProgramList(this, n, "RedMouseEventMaterialProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBaseMaterial,
        Object.freeze(RedMouseEventMaterial)
}(),
function() {
    var e, t, r, n, i, a, o, s, d, l, u, c, f, h, R, m, p, _, g, P, v, y, E, M, b, L, T, x;
    (RedPostEffectManager = function(e) {
            if (!(this instanceof RedPostEffectManager))
                return new RedPostEffectManager(e);
            e instanceof RedGL || RedGLUtil.throwFunc("RedPostEffectManager : RedGL Instance만 허용.", e),
                Object.defineProperty(this, "frameBuffer", {
                    value: RedFrameBuffer(e)
                }),
                Object.defineProperty(this, "finalMaterial", {
                    value: RedPostEffectMaterial(e, this.frameBuffer.texture)
                }),
                Object.defineProperty(this, "postEffectList", {
                    value: []
                }),
                Object.defineProperty(this, "children", {
                    value: [RedMesh(e, RedPlane(e, 1, 1, 1, 1, !0), this.finalMaterial)]
                }),
                this._UUID = RedGL.makeUUID()
        }
    ).prototype = {
        addEffect: function(e) {
            e instanceof RedBasePostEffect || RedGLUtil.throwFunc("RedPostEffectManager : addEffect - RedBasePostEffect Instance만 허용.", "입력값 : " + e),
                this.postEffectList.push(e)
        },
        removeEffect: function(e) {
            -1 != (x = this.postEffectList.indexOf(e)) && this.postEffectList.splice(x, 1)
        },
        removeAllEffect: function() {
            this.postEffectList.length = 0
        },
        bind: function(e) {
            this.frameBuffer.bind(e)
        },
        unbind: function(e) {
            this.frameBuffer.unbind(e)
        },
        render: (p = mat4.create(),
                m = new Float32Array(2),
                d = function(t, r, n, i, a) {
                    e._material = n,
                        u = e._material.program,
                        t.useProgram(u.webglProgram),
                        f = u.systemUniformLocation,
                    (c = f.uPMatrix) && (h = c.location,
                        R = c._UUID,
                    h && (mat4.ortho(p, -.5, .5, -.5, .5, -r.farClipping, r.farClipping),
                        mat4.scale(p, p, [1, -1, 1]),
                        _ = JSON.stringify(p),
                    l[R] != _ && (t.uniformMatrix4fv(h, !1, p),
                        l[R] = _))),
                    (c = f.uResolution) && (h = c.location,
                        R = c._UUID,
                    h && (m[0] = i,
                        m[1] = a,
                        _ = JSON.stringify(m),
                    l[R] != _ && (t.uniform2fv(h, m),
                        l[R] = _)))
                }
                ,
                n = function(e, t, r, n) {
                    g = r.frameBuffer.width = n[2],
                        P = r.frameBuffer.height = n[3],
                    i == g && a == P || (e.viewport(0, 0, g, P),
                        e.scissor(0, 0, g, P)),
                        d(e, t, r, g, P),
                        i = g,
                        a = P
                }
                ,
                s = function(e, t, d, l, u, c, f) {
                    var h, R, m, p, _, g, P, v, y, E;
                    if (m = e.gl,
                        y = l.scene,
                        E = l._viewRect,
                    t._process && t._process.length)
                        for (h = r,
                                 p = 0,
                                 _ = t._process.length; p < _; p++)
                            s(e, t._process[p], d, l, u, c, f);
                    if ((R = t._subFrameBufferList) && R.length)
                        for (g = 0,
                                 P = R.length; g < P; g++)
                            if ((v = R[g]).frameBuffer.width = E[2],
                                v.frameBuffer.height = E[3],
                                v.frameBuffer.bind(m),
                                m.clear(m.COLOR_BUFFER_BIT | m.DEPTH_BUFFER_BIT),
                                u.sceneRender(e, y, o, o.mode2DYn, y.children, c, f, v.renderMaterial, !0, !0),
                                v.frameBuffer.unbind(m),
                                i = v.frameBuffer.width,
                                a = v.frameBuffer.height,
                            v._process && v._process.length)
                                for (p = 0,
                                         _ = v._process.length; p < _; p++)
                                    s(e, v._process[p], d, y, u, c, f);
                    t.frameBuffer && (n(m, o, t, E),
                        t.bind(m),
                        t.updateTexture(r, h),
                        u.sceneRender(e, y, o, !0, d, c, f, null, !0, !0),
                        t.unbind(m),
                        r = t.frameBuffer.texture)
                }
                ,
                y = [],
                function(n, u, c, f, h, R) {
                    for (v = this,
                             i = null,
                             a = null,
                             b = f.scene,
                             o = f.camera instanceof RedBaseController ? f.camera.camera : f.camera,
                             L = f._viewRect,
                             T = c.worldRect,
                             l = c.cacheInfo.cacheSystemUniformInfo,
                             v.unbind(u),
                             e = v.children[0],
                             r = t = v.frameBuffer.texture,
                             v.frameBuffer.width = L[2],
                             v.frameBuffer.height = L[3],
                             y.length = 0,
                             E = 0,
                             M = v.postEffectList.length; E < M; E++)
                        y[E] = v.postEffectList[E];
                    for (v.antialiasing && y.push(v.antialiasing),
                             E = 0,
                             M = y.length; E < M; E++)
                        s(n, y[E], v.children, f, c, h, R);
                    r != t && (v.finalMaterial.diffuseTexture = r,
                        u.viewport(L[0], T[3] - L[3] - L[1], L[2], L[3]),
                        u.scissor(L[0], T[3] - L[3] - L[1], L[2], L[3]),
                        d(u, o, v.finalMaterial, L[2], L[3], !0),
                        c.sceneRender(n, b, o, !0, v.children, h, R, null, !0)),
                        v.finalMaterial.diffuseTexture = v.frameBuffer.texture
                }
        )
    },
        Object.defineProperty(RedPostEffectManager.prototype, "antialiasing", {
            get: function() {
                return this._antialiasing
            },
            set: function(e) {
                e && (e instanceof RedPostEffect_FXAA || RedGLUtil.throwFunc("RedPostEffectManager : antialiasing - RedPostEffect_FXAA Instance만 허용.", "입력값 : " + e)),
                    this._antialiasing = e
            }
        }),
        Object.freeze(RedPostEffectManager)
}(),
(RedBasePostEffect = function() {}
).prototype = new RedBaseMaterial,
RedBasePostEffect.prototype.bind = RedPostEffectManager.prototype.bind,
RedBasePostEffect.prototype.unbind = RedPostEffectManager.prototype.unbind,
RedBasePostEffect.prototype.updateTexture = function() {
    RedGLUtil.throwFunc("RedBasePostEffect - updateTexture : 반드시 재정의해야함")
}
,
RedBasePostEffect.prototype._process = [],
RedBasePostEffect.prototype._subFrameBufferList = [],
Object.freeze(RedBasePostEffect),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
uniform sampler2D u_blurTexture;
uniform float u_exposure;
uniform float u_bloomStrength;
void main() {
vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
vec4 thresholdColor = finalColor;
vec4 blurColor = texture2D(u_blurTexture, vTexcoord);
finalColor.rgb = (finalColor.rgb  + blurColor.rgb * u_bloomStrength) * u_exposure;
gl_FragColor = finalColor ;
}
*/
        }
        ,
        (RedPostEffect_Bloom = function(n) {
                if (!(this instanceof RedPostEffect_Bloom))
                    return new RedPostEffect_Bloom(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_Bloom : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.blurTexture = null,
                    this.exposure = 1,
                    this.bloomStrength = 1.2,
                    this._process = [RedPostEffect_BloomThreshold(n), RedPostEffect_BlurX(n), RedPostEffect_BlurY(n)],
                    this.blur = 20,
                    this.threshold = 75,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectBloomProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_Bloom.prototype.updateTexture = function(e, t) {
            this.diffuseTexture = t,
                this.blurTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Bloom", "diffuseTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Bloom", "blurTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Bloom", "exposure", "number", {
            min: 0
        }),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Bloom", "bloomStrength", "number", {
            min: 0
        }),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Bloom", "threshold", "number", {
            min: 0,
            callback: function(e) {
                this._process[0].threshold = e,
                    this._threshold = this._process[0].threshold
            }
        }),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Bloom", "blur", "number", {
            min: 0,
            callback: function(e) {
                this._process[1].size = e,
                    this._process[2].size = e
            }
        }),
        Object.freeze(RedPostEffect_Bloom)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision highp float;
uniform sampler2D u_diffuseTexture;
uniform float u_threshold_value;
void main() {
vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
if(0.2126 * finalColor.r + 0.7152 * finalColor.g + 0.0722 * finalColor.b < u_threshold_value)  finalColor.r = finalColor.g = finalColor.b = 0.0;
gl_FragColor = finalColor;
}
*/
        }
        ,
        (RedPostEffect_BloomThreshold = function(n) {
                if (!(this instanceof RedPostEffect_BloomThreshold))
                    return new RedPostEffect_BloomThreshold(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_BloomThreshold : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.threshold = 128,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectBloomThresholdProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_BloomThreshold.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_BloomThreshold", "diffuseTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_BloomThreshold", "threshold", "number", {
            min: 0,
            max: 255,
            callback: function(e) {
                this._threshold_value = e / 255
            }
        }),
        Object.freeze(RedPostEffect_BloomThreshold)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
vResolution = uResolution;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
void main(void) {
vec2 px = vec2(1.0/vResolution.x, 1.0/vResolution.y);
vec4 finalColor = vec4(0.0);
finalColor += texture2D(u_diffuseTexture, vTexcoord + vec2(-7.0*px.x, -7.0*px.y))*0.0044299121055113265;
finalColor += texture2D(u_diffuseTexture, vTexcoord + vec2(-6.0*px.x, -6.0*px.y))*0.00895781211794;
finalColor += texture2D(u_diffuseTexture, vTexcoord + vec2(-5.0*px.x, -5.0*px.y))*0.0215963866053;
finalColor += texture2D(u_diffuseTexture, vTexcoord + vec2(-4.0*px.x, -4.0*px.y))*0.0443683338718;
finalColor += texture2D(u_diffuseTexture, vTexcoord + vec2(-3.0*px.x, -3.0*px.y))*0.0776744219933;
finalColor += texture2D(u_diffuseTexture, vTexcoord + vec2(-2.0*px.x, -2.0*px.y))*0.115876621105;
finalColor += texture2D(u_diffuseTexture, vTexcoord + vec2(-1.0*px.x, -1.0*px.y))*0.147308056121;
finalColor += texture2D(u_diffuseTexture, vTexcoord                             )*0.159576912161;
finalColor += texture2D(u_diffuseTexture, vTexcoord + vec2( 1.0*px.x,  1.0*px.y))*0.147308056121;
finalColor += texture2D(u_diffuseTexture, vTexcoord + vec2( 2.0*px.x,  2.0*px.y))*0.115876621105;
finalColor += texture2D(u_diffuseTexture, vTexcoord + vec2( 3.0*px.x,  3.0*px.y))*0.0776744219933;
finalColor += texture2D(u_diffuseTexture, vTexcoord + vec2( 4.0*px.x,  4.0*px.y))*0.0443683338718;
finalColor += texture2D(u_diffuseTexture, vTexcoord + vec2( 5.0*px.x,  5.0*px.y))*0.0215963866053;
finalColor += texture2D(u_diffuseTexture, vTexcoord + vec2( 6.0*px.x,  6.0*px.y))*0.00895781211794;
finalColor += texture2D(u_diffuseTexture, vTexcoord + vec2( 7.0*px.x,  7.0*px.y))*0.0044299121055113265;
gl_FragColor = finalColor;
}
*/
        }
        ,
        (RedPostEffect_Blur = function(n) {
                if (!(this instanceof RedPostEffect_Blur))
                    return new RedPostEffect_Blur(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_Blur : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectBlurProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_Blur.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Blur", "diffuseTexture", "sampler2D"),
        Object.freeze(RedPostEffect_Blur)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
vResolution = uResolution;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
uniform float u_size;
float random(vec3 scale, float seed) {
return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}
void main() {
vec4 finalColor = vec4(0.0);
vec2 delta;
float total = 0.0;
float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
delta = vec2(u_size/vResolution.x,0.0);
for (float t = -10.0; t <= 10.0; t++) {
float percent = (t + offset - 0.5) / 10.0;
float weight = 1.0 - abs(percent);
vec4 sample = texture2D(u_diffuseTexture, vTexcoord + delta * percent);
sample.rgb *= sample.a;
finalColor += sample * weight;
total += weight;
}
finalColor = finalColor / total;
finalColor.rgb /= finalColor.a + 0.00001;
gl_FragColor =  finalColor ;
}
*/
        }
        ,
        (RedPostEffect_BlurX = function(n) {
                if (!(this instanceof RedPostEffect_BlurX))
                    return new RedPostEffect_BlurX(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_BlurX : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.size = 50,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectBlurXProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_BlurX.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_BlurX", "diffuseTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_BlurX", "size", "number", {
            min: 0
        }),
        Object.freeze(RedPostEffect_BlurX)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
vResolution = uResolution;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
uniform float u_size;
float random(vec3 scale, float seed) {
return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}
void main() {
vec4 finalColor = vec4(0.0);
vec2 delta;
float total = 0.0;
float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
delta = vec2(0.0, u_size/vResolution.y);
for (float t = -10.0; t <= 10.0; t++) {
float percent = (t + offset - 0.5) / 10.0;
float weight = 1.0 - abs(percent);
vec4 sample = texture2D(u_diffuseTexture, vTexcoord + delta * percent);
sample.rgb *= sample.a;
finalColor += sample * weight;
total += weight;
}
finalColor = finalColor / total;
finalColor.rgb /= finalColor.a + 0.00001;
gl_FragColor =   finalColor ;
}
*/
        }
        ,
        (RedPostEffect_BlurY = function(n) {
                if (!(this instanceof RedPostEffect_BlurY))
                    return new RedPostEffect_BlurY(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_BlurY : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.size = 50,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectBlurYProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_BlurY.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_BlurY", "diffuseTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_BlurY", "size", "number", {
            min: 0
        }),
        Object.freeze(RedPostEffect_BlurY)
}(),
(RedPostEffect_GaussianBlur = function(e) {
        if (!(this instanceof RedPostEffect_GaussianBlur))
            return new RedPostEffect_GaussianBlur(e);
        e instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_GaussianBlur : RedGL Instance만 허용.", e),
            this._UUID = RedGL.makeUUID(),
            this._process = [RedPostEffect_BlurX(e), RedPostEffect_BlurY(e)],
            this.radius = 1
    }
).prototype = new RedBasePostEffect,
RedPostEffect_GaussianBlur.prototype.updateTexture = function() {}
,
RedDefinePropertyInfo.definePrototype("RedPostEffect_GaussianBlur", "radius", "number", {
    min: .1,
    max: 255,
    callback: function(e) {
        this._process[0].size = e,
            this._process[1].size = e
    }
}),
Object.freeze(RedPostEffect_GaussianBlur),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
uniform float u_centerX;
uniform float u_centerY;
uniform float u_amount_value;
float random(vec3 scale, float seed) {
return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}
void main(void) {
vec4 finalColor = vec4(0.0);
vec2 center = vec2(u_centerX+0.5,-u_centerY+0.5);
vec2 toCenter = center - vTexcoord ;
float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
float total = 0.0;
for (float t = 0.0; t <= 30.0; t++) {
float percent = (t + offset) / 30.0;
float weight = 3.0 * (percent - percent * percent);
vec4 sample = texture2D(u_diffuseTexture, vTexcoord + toCenter * percent * u_amount_value );
sample.rgb *= sample.a;
finalColor += sample * weight;
total += weight;
}
gl_FragColor = finalColor / total;
gl_FragColor.rgb /= gl_FragColor.a + 0.00001;
}
*/
        }
        ,
        (RedPostEffect_ZoomBlur = function(n) {
                if (!(this instanceof RedPostEffect_ZoomBlur))
                    return new RedPostEffect_ZoomBlur(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_ZoomBlur : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.centerX = 0,
                    this.centerY = 0,
                    this.amount = 38,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectZoomBlurProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_ZoomBlur.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_ZoomBlur", "diffuseTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_ZoomBlur", "centerX", "number"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_ZoomBlur", "centerY", "number"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_ZoomBlur", "amount", "number", {
            min: 1,
            max: 100,
            callback: function(e) {
                this._amount_value = e / 100
            }
        }),
        Object.freeze(RedPostEffect_ZoomBlur)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
uniform float u_brightness_value;
uniform float u_contrast_value;
void main(void) {
vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord );
if (u_contrast_value > 0.0) finalColor.rgb = (finalColor.rgb - 0.5) / (1.0 - u_contrast_value) + 0.5;
else finalColor.rgb = (finalColor.rgb - 0.5) * (1.0 + u_contrast_value) + 0.5;
finalColor.rgb += u_brightness_value;
gl_FragColor = finalColor;
}
*/
        }
        ,
        (RedPostEffect_BrightnessContrast = function(n) {
                if (!(this instanceof RedPostEffect_BrightnessContrast))
                    return new RedPostEffect_BrightnessContrast(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_BrightnessContrast : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.brightness = 0,
                    this.contrast = 0,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectBrightnessContrastProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_BrightnessContrast.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_BrightnessContrast", "diffuseTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_BrightnessContrast", "brightness", "number", {
            min: -150,
            max: 150,
            callback: function(e) {
                this._brightness_value = e / 255
            }
        }),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_BrightnessContrast", "contrast", "number", {
            min: -50,
            max: 100,
            callback: function(e) {
                this._contrast_value = e / 255
            }
        }),
        Object.freeze(RedPostEffect_BrightnessContrast)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision highp float;
uniform sampler2D u_diffuseTexture;
uniform float u_threshold_value;
void main() {
vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
float v;
if(0.2126 * finalColor.r + 0.7152 * finalColor.g + 0.0722 * finalColor.b >= u_threshold_value) v = 1.0;
else v = 0.0;
finalColor.r = finalColor.g = finalColor.b = v;
gl_FragColor = finalColor;
}
*/
        }
        ,
        (RedPostEffect_Threshold = function(n) {
                if (!(this instanceof RedPostEffect_Threshold))
                    return new RedPostEffect_Threshold(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_Threshold : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.threshold = 128,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectThresholdProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_Threshold.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Threshold", "diffuseTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Threshold", "threshold", "number", {
            min: 1,
            max: 255,
            callback: function(e) {
                this._threshold_value = e / 255
            }
        }),
        Object.freeze(RedPostEffect_Threshold)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
void main(void) {
vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
finalColor.r = 1.0 - finalColor.r;
finalColor.g = 1.0 - finalColor.g;
finalColor.b = 1.0 - finalColor.b;
gl_FragColor = finalColor;
}
*/
        }
        ,
        (RedPostEffect_Invert = function(n) {
                if (!(this instanceof RedPostEffect_Invert))
                    return new RedPostEffect_Invert(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_Invert : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectInvertProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_Invert.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Invert", "diffuseTexture", "sampler2D"),
        Object.freeze(RedPostEffect_Invert)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
vResolution = uResolution;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
void main(void) {
vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
highp float gray = (finalColor.r  + finalColor.g + finalColor.b)/3.0;
gl_FragColor = vec4( gray, gray, gray, 1.0);
}
*/
        }
        ,
        (RedPostEffect_Gray = function(n) {
                if (!(this instanceof RedPostEffect_Gray))
                    return new RedPostEffect_Gray(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_Gray : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectGrayProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_Gray.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Gray", "diffuseTexture", "sampler2D"),
        Object.freeze(RedPostEffect_Gray)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
uniform float u_hue_value;
uniform float u_saturation_value;
void main(void) {
vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord );
float angle = u_hue_value * 3.1415926535897932384626433832795;
float s = sin(angle), c = cos(angle);
vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;
float len = length(finalColor.rgb);
finalColor.rgb = vec3(
dot(finalColor.rgb, weights.xyz),
dot(finalColor.rgb, weights.zxy),
dot(finalColor.rgb, weights.yzx)
);
float average = (finalColor.r + finalColor.g + finalColor.b) / 3.0;
if (u_saturation_value > 0.0) finalColor.rgb += (average - finalColor.rgb) * (1.0 - 1.0 / (1.001 - u_saturation_value));
else finalColor.rgb += (average - finalColor.rgb) * (-u_saturation_value);
gl_FragColor = finalColor;
}
*/
        }
        ,
        (RedPostEffect_HueSaturation = function(n) {
                if (!(this instanceof RedPostEffect_HueSaturation))
                    return new RedPostEffect_HueSaturation(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_HueSaturation : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.hue = 0,
                    this.saturation = 0,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectHueSaturationProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_HueSaturation.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_HueSaturation", "diffuseTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_HueSaturation", "hue", "number", {
            min: -180,
            max: 180,
            callback: function(e) {
                this._hue_value = e / 180
            }
        }),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_HueSaturation", "saturation", "number", {
            min: -100,
            max: 100,
            callback: function(e) {
                this._saturation_value = e / 100
            }
        }),
        Object.freeze(RedPostEffect_HueSaturation)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
vResolution = uResolution;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
uniform float u_centerX;
uniform float u_centerY;
uniform float u_angle;
uniform float u_radius;
uniform bool u_grayMode;
float pattern(float angle) {
angle = angle * 3.141592653589793/180.0;
float s = sin(angle), c = cos(angle);
vec2 tex = vTexcoord;
tex.x -= u_centerX + 0.5;
tex.y -= u_centerY + 0.5;
vec2 point = vec2(
c * tex.x - s * tex.y,
s * tex.x + c * tex.y
) * vResolution / u_radius;
return (sin(point.x) * sin(point.y)) * 4.0;
}
void main(void) {
vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
if(u_grayMode) {
float average = (finalColor.r + finalColor.g + finalColor.b) / 3.0;
gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern(u_angle)), finalColor.a);
}else{
vec3 cmy = 1.0 - finalColor.rgb;
float k = min(cmy.x, min(cmy.y, cmy.z));
cmy = (cmy - k) / (1.0 - k);
cmy = clamp(cmy * 10.0 - 3.0 + vec3(pattern(u_angle + 0.26179), pattern(u_angle + 1.30899), pattern(u_angle)), 0.0, 1.0);
k = clamp(k * 10.0 - 5.0 + pattern(u_angle + 0.78539), 0.0, 1.0);
gl_FragColor = vec4(1.0 - cmy - k, finalColor.a);
}
}
*/
        }
        ,
        (RedPostEffect_HalfTone = function(n) {
                if (!(this instanceof RedPostEffect_HalfTone))
                    return new RedPostEffect_HalfTone(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_HalfTone : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.centerX = 0,
                    this.centerY = 0,
                    this.angle = 0,
                    this.radius = 2,
                    this.grayMode = !1,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectHalfToneProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_HalfTone.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_HalfTone", "diffuseTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_HalfTone", "centerX", "number"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_HalfTone", "centerY", "number"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_HalfTone", "angle", "number"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_HalfTone", "grayMode", "boolean"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_HalfTone", "radius", "number", {
            min: 0
        }),
        Object.freeze(RedPostEffect_HalfTone)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
vResolution = uResolution;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
uniform float u_width;
uniform float u_height;
void main(void) {
vec4 finalColor;
float dx = 1.0/vResolution.x * u_width;
float dy = 1.0/vResolution.y * u_height;
vec2 coord = vec2(
dx * (floor(vTexcoord.x / dx) + 0.5),
dy * (floor(vTexcoord.y / dy) + 0.5)
);
finalColor = texture2D(u_diffuseTexture, coord);
gl_FragColor = finalColor;
}
*/
        }
        ,
        (RedPostEffect_Pixelize = function(n) {
                if (!(this instanceof RedPostEffect_Pixelize))
                    return new RedPostEffect_Pixelize(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_Pixelize : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.width = 5,
                    this.height = 5,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectPixelizeProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_Pixelize.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Pixelize", "diffuseTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Pixelize", "width", "number", {
            min: 0
        }),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Pixelize", "height", "number", {
            min: 0
        }),
        Object.freeze(RedPostEffect_Pixelize)
}(),
function() {
    var e, t, r, n, i;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
vResolution = uResolution;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
uniform mat3 u_kernel;
uniform float uKernelWeight;
void main(void) {
vec2 perPX = vec2(1.0/vResolution.x, 1.0/vResolution.y);
vec4 finalColor = vec4(0.0);
finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2(-1.0, -1.0)) * u_kernel[0][0] ;
finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2( 0.0, -1.0)) * u_kernel[0][1] ;
finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2( 1.0, -1.0)) * u_kernel[0][2] ;
finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2(-1.0,  0.0)) * u_kernel[1][0] ;
finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2( 0.0,  0.0)) * u_kernel[1][1] ;
finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2( 1.0,  0.0)) * u_kernel[1][2] ;
finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2(-1.0,  1.0)) * u_kernel[2][0] ;
finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2( 0.0,  1.0)) * u_kernel[2][1] ;
finalColor += texture2D(u_diffuseTexture, vTexcoord + perPX * vec2( 1.0,  1.0)) * u_kernel[2][2] ;
highp float weight;
weight = uKernelWeight;
if (0.01 > weight) {
weight = 1.0;
}
gl_FragColor = vec4((finalColor / uKernelWeight).rgb, 1.0);
}
*/
        }
        ,
        (RedPostEffect_Convolution = function(n, i) {
                if (!(this instanceof RedPostEffect_Convolution))
                    return new RedPostEffect_Convolution(n,i);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_Convolution : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.kernel = i,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectConvolutionProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_Convolution.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Convolution", "diffuseTexture", "sampler2D"),
        Object.defineProperty(RedPostEffect_Convolution.prototype, "kernel", {
            get: function() {
                return this._kernel || (this._kernel = RedPostEffect_Convolution.NORMAL),
                    this._kernel
            },
            set: function(e) {
                this._kernel = e
            }
        }),
        Object.defineProperty(RedPostEffect_Convolution.prototype, "kernelWeight", {
            get: function() {
                for (i in n = 0,
                    this.kernel)
                    n += this.kernel[i];
                return n
            }
        }),
        RedPostEffect_Convolution.NORMAL = [0, 0, 0, 0, 1, 0, 0, 0, 0],
        RedPostEffect_Convolution.SHARPEN = [0, -1, 0, -1, 5, -1, 0, -1, 0],
        RedPostEffect_Convolution.BLUR = [1, 1, 1, 1, 1, 1, 1, 1, 1],
        RedPostEffect_Convolution.EDGE = [0, 1, 0, 1, -4, 1, 0, 1, 0],
        RedPostEffect_Convolution.EMBOSS = [-2, -1, 0, -1, 1, 1, 0, 1, 2],
        Object.freeze(RedPostEffect_Convolution)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
uniform sampler2D u_blurTexture;
uniform sampler2D u_depthTexture;
void main() {
vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord);
vec4 blurColor = texture2D(u_blurTexture, vTexcoord);
vec4 depthColor = texture2D(u_depthTexture, vTexcoord);
finalColor.rgb *= (depthColor.r);
blurColor.rgb *= (1.0-depthColor.r);
gl_FragColor =  (finalColor + blurColor) ;
}
*/
        }
        ,
        (RedPostEffect_DoF = function(n) {
                if (!(this instanceof RedPostEffect_DoF))
                    return new RedPostEffect_DoF(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_DoF : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.blurTexture = null,
                    this.depthTexture = null,
                    this._subFrameBufferList = [{
                        frameBuffer: RedFrameBuffer(n),
                        renderMaterial: RedPostEffect_DoF_DepthMaterial(n),
                        process: []
                    }],
                    this._process = [RedPostEffect_BlurX(n), RedPostEffect_BlurY(n)],
                    this.focusLength = 15,
                    this.blur = 10,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectDoFProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_DoF.prototype.updateTexture = function(e, t) {
            this.diffuseTexture = t,
                this.blurTexture = e,
                this.depthTexture = this._subFrameBufferList[0].frameBuffer.texture
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_DoF", "diffuseTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_DoF", "blurTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_DoF", "depthTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_DoF", "blur", "number", {
            min: 0,
            callback: function(e) {
                this._process[0].size = e,
                    this._process[1].size = e
            }
        }),
        Object.defineProperty(RedPostEffect_DoF.prototype, "focusLength", {
            get: function() {
                return this._subFrameBufferList[0].renderMaterial.focusLength
            },
            set: function(e) {
                this._subFrameBufferList[0].renderMaterial.focusLength = e
            }
        }),
        Object.freeze(RedPostEffect_DoF)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
// 스키닝
//#REDGL_DEFINE#vertexShareFunc#getSkinMatrix#
// Sprite3D
//#REDGL_DEFINE#vertexShareFunc#getSprite3DMatrix#
void main(void) {
gl_PointSize = uPointSize;
//#REDGL_DEFINE#skin#true# mat4 targetMatrix = uMMatrix *  getSkinMatrix() ;
//#REDGL_DEFINE#skin#false# mat4 targetMatrix = uMMatrix;
//#REDGL_DEFINE#sprite3D#true# gl_Position = uPMatrix * getSprite3DMatrix(uCameraMatrix , targetMatrix) *  vec4(aVertexPosition, 1.0);
//#REDGL_DEFINE#sprite3D#true# if(!u_PerspectiveScale){
//#REDGL_DEFINE#sprite3D#true#   gl_Position /= gl_Position.w;
//#REDGL_DEFINE#sprite3D#true#   gl_Position.xy += aVertexPosition.xy * vec2(targetMatrix[0][0],targetMatrix[1][1] * uResolution.x/uResolution.y);
//#REDGL_DEFINE#sprite3D#true# }
//#REDGL_DEFINE#sprite3D#false# gl_Position = uPMatrix * uCameraMatrix * targetMatrix * vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform float u_focusLength;
void main(void) {
float depth = 1.0 - gl_FragCoord.z / gl_FragCoord.w / u_focusLength;
gl_FragColor = vec4(depth, depth, depth, 1.0);
}
*/
        }
        ,
        (RedPostEffect_DoF_DepthMaterial = function(n) {
                if (!(this instanceof RedPostEffect_DoF_DepthMaterial))
                    return new RedPostEffect_DoF_DepthMaterial(n);
                this.focusLength = 15,
                    this.makeProgramList(this, n, "RedPostEffectDoFdepthProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_DoF_DepthMaterial", "focusLength", "number", {
            min: 0
        }),
        Object.freeze(RedPostEffect_DoF_DepthMaterial)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
vTime = uTime;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform bool u_grayMode;
uniform sampler2D u_diffuseTexture;
uniform float u_noiseIntensity; // noise effect intensity value (0 = no effect, 1 = full effect)
uniform float u_scanlineIntensity; // scanlines effect intensity value (0 = no effect, 1 = full effect)
uniform float u_scanlineCount; // scanlines effect count value (0 = no effect, 4096 = full effect)
void main() {
// sample the source
vec4 diffuseColor = texture2D( u_diffuseTexture, vTexcoord );
// make some noise
float x = vTexcoord.x * vTexcoord.y * vTime;
x = mod( x, 13.0 ) * mod( x, 123.0 );
float dx = mod( x, 0.01 );
// add noise
vec3 finalColor = diffuseColor.rgb + diffuseColor.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );
// get us a sine and cosine
vec2 sc = vec2( sin( vTexcoord.y * u_scanlineCount ), cos( vTexcoord.y * u_scanlineCount ) );
// add scanlines
finalColor += diffuseColor.rgb * vec3( sc.x, sc.y, sc.x ) * u_scanlineIntensity;
// interpolate between source and result by intensity
finalColor = diffuseColor.rgb + clamp( u_noiseIntensity, 0.0, 1.0 ) * ( finalColor - diffuseColor.rgb );
// convert to grayscale if desired
if( u_grayMode ) finalColor = vec3( finalColor.r * 0.3 + finalColor.g * 0.59 + finalColor.b * 0.11 );
gl_FragColor =  vec4( finalColor, diffuseColor.a );
}
*/
        }
        ,
        (RedPostEffect_Film = function(n) {
                if (!(this instanceof RedPostEffect_Film))
                    return new RedPostEffect_Film(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_Film : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.grayMode = !1,
                    this.scanlineIntensity = .5,
                    this.noiseIntensity = .5,
                    this.scanlineCount = 2048,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectFilmProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_Film.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Film", "diffuseTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Film", "grayMode", "boolean"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Film", "scanlineIntensity", "number", {
            min: 0
        }),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Film", "noiseIntensity", "number", {
            min: 0
        }),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Film", "scanlineCount", "number", {
            min: 0
        }),
        Object.freeze(RedPostEffect_Film)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
uniform float u_size;
uniform float u_intensity;
void main(void) {
vec4 finalColor = texture2D(u_diffuseTexture, vTexcoord );
float dist = distance(vTexcoord, vec2(0.5, 0.5));
finalColor.rgb *= smoothstep(0.8, u_size * 0.799, dist * (u_intensity + u_size));
gl_FragColor = finalColor;
}
*/
        }
        ,
        (RedPostEffect_Vignetting = function(n) {
                if (!(this instanceof RedPostEffect_Vignetting))
                    return new RedPostEffect_Vignetting(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_Vignetting : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.size = .1,
                    this.intensity = .85,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectVignettingProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_Vignetting.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Vignetting", "diffuseTexture", "sampler2D"),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Vignetting", "intensity", "number", {
            min: 0
        }),
        RedDefinePropertyInfo.definePrototype("RedPostEffect_Vignetting", "size", "number", {
            min: 0
        }),
        Object.freeze(RedPostEffect_Vignetting)
}(),
function() {
    var e, t, r;
    e = function() {/* @preserve
void main(void) {
vTexcoord = aTexcoord;
vResolution = uResolution;
gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
}
*/
    }
        ,
        t = function() {/* @preserve
precision mediump float;
uniform sampler2D u_diffuseTexture;
const float cFXAA_REDUCE_MIN = 1.0/ 128.0;
const float cFXAA_REDUCE_MUL = 1.0 / 8.0;
const float cFXAA_SPAN_MAX = 8.0;
void main() {
vec4 finalColor;
vec2 inverseVP = vec2(1.0 / vResolution.x, 1.0 / vResolution.y);
vec2 fragCoord = gl_FragCoord.xy;
vec3 rgbNW = texture2D(u_diffuseTexture, (fragCoord + vec2(-1.0, -1.0)) * inverseVP).xyz;
vec3 rgbNE = texture2D(u_diffuseTexture, (fragCoord + vec2(1.0, -1.0)) * inverseVP).xyz;
vec3 rgbSW = texture2D(u_diffuseTexture, (fragCoord + vec2(-1.0, 1.0)) * inverseVP).xyz;
vec3 rgbSE = texture2D(u_diffuseTexture, (fragCoord + vec2(1.0, 1.0)) * inverseVP).xyz;
vec3 rgbM  = texture2D(u_diffuseTexture, fragCoord  * inverseVP).xyz;
vec3 luma = vec3(0.299, 0.587, 0.114);
float lumaNW = dot(rgbNW, luma);
float lumaNE = dot(rgbNE, luma);
float lumaSW = dot(rgbSW, luma);
float lumaSE = dot(rgbSE, luma);
float lumaM  = dot(rgbM,  luma);
float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));
vec2 dir;
dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));
float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * cFXAA_REDUCE_MUL), cFXAA_REDUCE_MIN);
float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);
dir = min(
vec2(cFXAA_SPAN_MAX, cFXAA_SPAN_MAX),
max( vec2(-cFXAA_SPAN_MAX, -cFXAA_SPAN_MAX), dir * rcpDirMin)
) * inverseVP;
vec3 rgbA = 0.5 * (
texture2D(u_diffuseTexture, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +
texture2D(u_diffuseTexture, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz
);
vec3 rgbB = rgbA * 0.5 + 0.25 * (
texture2D(u_diffuseTexture, fragCoord * inverseVP + dir * -0.5).xyz +
texture2D(u_diffuseTexture, fragCoord * inverseVP + dir * 0.5).xyz
);
float lumaB = dot(rgbB, luma);
if ((lumaB < lumaMin) || (lumaB > lumaMax)) finalColor = vec4(rgbA, 1.0);
else finalColor = vec4(rgbB, 1.0);
gl_FragColor = finalColor;
}
*/
        }
        ,
        (RedPostEffect_FXAA = function(n) {
                if (!(this instanceof RedPostEffect_FXAA))
                    return new RedPostEffect_FXAA(n);
                n instanceof RedGL || RedGLUtil.throwFunc("RedPostEffect_FXAA : RedGL Instance만 허용.", n),
                    this.frameBuffer = RedFrameBuffer(n),
                    this.diffuseTexture = null,
                    this.program = RedProgram.makeProgram(n, "RedPostEffectFXAAProgram", e, t),
                    this._UUID = RedGL.makeUUID(),
                r || (this.checkUniformAndProperty(),
                    r = !0)
            }
        ).prototype = new RedBasePostEffect,
        RedPostEffect_FXAA.prototype.updateTexture = function(e) {
            this.diffuseTexture = e
        }
        ,
        RedDefinePropertyInfo.definePrototype("RedPostEffect_FXAA", "diffuseTexture", "sampler2D"),
        Object.freeze(RedPostEffect_FXAA)
}(),
function() {
    var e, t, r, n, i, a;
    (RedGLOffScreen = function(e, t, r, n, i) {
            if (!(this instanceof RedGLOffScreen))
                return new RedGLOffScreen(e,t,r,n,i);
            RedGLDetect.getBrowserInfo();
            var a = this;
            a.htmlCanvas = e,
                a.redGLSrc = n,
                fetch(i).then(function(e) {
                    e.text().then(function(e) {
                        a.hostCode = "\ncanvas.tagName = 'CANVAS';\nreturn RedGL(canvas, function (v) {\nvar _host_ = " + e + ";\n_host_.call(this);\n\n});",
                            a.setSize(t, r)
                    })
                }).catch(function(e) {})
        }
    ).prototype.updatePostMessage = function(e) {
        if (!e)
            throw "RedGLOffScreen.prototype['updatePostMessage'] - run을 정의해야합니다." + e;
        if (!e.name)
            throw "RedGLOffScreen.prototype['updatePostMessage'] - run객체의 name을 정의해야합니다." + e.name;
        this.worker.postMessage({
            state: "update",
            run: e
        })
    }
        ,
        RedGLOffScreen.prototype._init = function(r, n, i) {
            var a = this;
            this.worker && this.worker.terminate();
            var o = this.htmlCanvas.parentNode
                , s = r.cloneNode(!0);
            o.replaceChild(s, this.htmlCanvas),
                this.htmlCanvas = s;
            var d = "x,y,clientX,clientY,pageX,pageY,screenX,screenY,layerX,layerY,detail,shiftKey,altKey,ctrlKey,movementX,movementY,button,type,which,deltaX,deltaY,deltaZ,timeStamp,targetTouches".split(",")
                , l = "shiftKey,altKey,ctrlKey,key,keyCode,location,code,charCode,detail,timeStamp,which,type".split(",")
                , u = [RedGLDetect.BROWSER_INFO.move, RedGLDetect.BROWSER_INFO.down, RedGLDetect.BROWSER_INFO.up]
                , c = "keydown,keyup,keypress".split(",");
            u.forEach(function(e) {
                a.htmlCanvas.addEventListener(e, function(e) {
                    var t = {};
                    d.forEach(function(r) {
                        if ("targetTouches" == r && e[r]) {
                            for (var n = [], i = e[r].length; i--; ) {
                                var a = e[r][i];
                                n.push({
                                    clientX: a.clientX,
                                    clientY: a.clientY,
                                    force: a.force,
                                    identifier: a.identifier,
                                    pageX: a.pageX,
                                    pageY: a.pageY,
                                    radiusX: a.radiusX,
                                    radiusY: a.radiusY,
                                    rotationAngle: a.rotationAngle,
                                    screenX: a.screenX,
                                    screenY: a.screenY
                                })
                            }
                            t[r] = n
                        } else
                            t[r] = e[r]
                    }),
                        a.worker.postMessage({
                            state: e.type,
                            event: t
                        })
                })
            }),
                c.forEach(function(e) {
                    window.addEventListener(e, function(e) {
                        var t = {};
                        l.forEach(function(r) {
                            t[r] = e[r]
                        }),
                            a.worker.postMessage({
                                state: e.type,
                                event: t
                            })
                    })
                }),
                this.offScreenCanvas = this.htmlCanvas.transferControlToOffscreen(),
                this.offScreenCanvas.width = n,
                this.offScreenCanvas.height = i,
                this.worker = null,
                t = new Blob([e],{
                    type: "application/javascript"
                }),
                this.worker = new Worker(URL.createObjectURL(t));
            var f = document.location.pathname.split("/");
            f[f.length - 1].indexOf(".") > -1 && f.pop();
            var h = this.redGLSrc.split("/");
            h.forEach(function(e, t) {
                ".." === e && (f.pop(),
                    h[t] = ""),
                "." === e && (h[t] = "")
            }),
                this.worker.postMessage({
                    canvas: this.offScreenCanvas,
                    state: "init",
                    redGLSrc: document.location.origin + f.join("/") + "/" + h.join("/"),
                    hostCode: this.hostCode.toString()
                }, [this.offScreenCanvas])
        }
        ,
        RedGLOffScreen.prototype.setSize = (i = 0,
                a = 0,
                function(e, t, o) {
                    void 0 === e && RedGLUtil.throwFunc("RedGL setSize : width가 입력되지 않았습니다."),
                    void 0 === t && RedGLUtil.throwFunc("RedGL setSize : height가 입력되지 않았습니다."),
                        r = this._width = e,
                        n = this._height = t,
                    "number" != typeof r && (r.indexOf("%") > -1 ? r = (document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth) * parseFloat(r) / 100 : RedGLUtil.throwFunc("RedGL setSize : width는 0이상의 숫자나 %만 허용.", r)),
                    "number" != typeof n && (n.indexOf("%") > -1 ? n = window.innerHeight * parseFloat(n) / 100 : RedGLUtil.throwFunc("RedGL setSize : height는 0이상의 숫자나 %만 허용.", n)),
                        window.devicePixelRatio,
                        this._canvas,
                    (i !== r || a !== n || o) && (i = r,
                        a = n),
                        r = parseInt(r),
                        n = parseInt(n),
                        this._init(this.htmlCanvas, r, n)
                }
        ),
        e = (e = function() {
                var e, t;
                this.window = this,
                    onmessage = function(r) {
                        switch (r.data.state) {
                            case "init":
                                e || (importScripts(r.data.redGLSrc),
                                    e = new Function("canvas",r.data.hostCode)),
                                    t = new e(r.data.canvas);
                                break;
                            case "update":
                                var n = r.data.run.args;
                                t.userInterface[r.data.run.name]["array" == typeof n ? "apply" : "call"](t, r.data.run.args);
                                break;
                            case RedGLDetect.BROWSER_INFO.move:
                                var i = new Event(RedGLDetect.BROWSER_INFO.move)
                                    , a = r.data.event;
                                for (var o in a)
                                    i[o] = a[o];
                                t._canvas.dispatchEvent(i);
                                break;
                            case RedGLDetect.BROWSER_INFO.down:
                                for (var o in i = new Event(RedGLDetect.BROWSER_INFO.down),
                                    a = r.data.event)
                                    i[o] = a[o];
                                t._canvas.dispatchEvent(i);
                                break;
                            case RedGLDetect.BROWSER_INFO.up:
                                for (var o in i = new Event(RedGLDetect.BROWSER_INFO.up),
                                    a = r.data.event)
                                    i[o] = a[o];
                                this.window.dispatchEvent(i);
                                break;
                            case "wheel":
                                for (var o in i = new Event("wheel"),
                                    a = r.data.event)
                                    i[o] = a[o];
                                t._canvas.dispatchEvent(i);
                                break;
                            case "keydown":
                                for (var o in i = new Event("keydown"),
                                    a = r.data.event)
                                    i[o] = a[o];
                                this.window.dispatchEvent(i);
                                break;
                            case "keyup":
                                for (var o in i = new Event("keyup"),
                                    a = r.data.event)
                                    i[o] = a[o];
                                this.window.dispatchEvent(i);
                                break;
                            case "keypress":
                                for (var o in i = new Event("keypress"),
                                    a = r.data.event)
                                    i[o] = a[o];
                                this.window.dispatchEvent(i)
                        }
                    }
            }
        ).toString().replace(/^function ?. ?\) ?\{|\}\;?$/g, "")
}();
var RedGL_VERSION = {
    version: "RedGL Release. last update( 2019-05-21 10:53:44)"
};
