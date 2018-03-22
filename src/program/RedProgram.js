"use strict";

var RedProgram;
(function () {
    var makeProgram;
    var tGL;
    makeProgram = (function () {
        var tProgram;
        return function (gl, key, vs, fs) {
            tProgram = gl.createProgram();
            gl.attachShader(tProgram, vs['webglShader']);
            gl.attachShader(tProgram, fs['webglShader']);
            gl.linkProgram(tProgram);
            if (!gl.getProgramParameter(tProgram, gl.LINK_STATUS)) throw "프로그램을 초기화 할 수 없습니다.";
            tProgram.key = key;
            tProgram.vShaderKey = vs.key;
            tProgram.fShaderKey = vs.key;
            gl.useProgram(tProgram);
            return tProgram;
        }
    })()
    RedProgram = function (redGL, key, vs, fs) {
        if (!(this instanceof RedProgram)) return new RedProgram(redGL, key, vs, fs)
        if (!(redGL instanceof RedGL)) throw 'RedProgram : RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'RedProgram : key - 문자열만 허용됩니다.'
        if (!vs instanceof RedShader) throw 'RedProgram : vShaderInfo - RedShader만 허용됩니다.'
        if (!fs instanceof RedShader) throw 'RedProgram : fShaderInfo - RedShader만 허용됩니다.'
        if (vs['type'] != RedShader.VERTEX) throw 'RedProgram : vShaderInfo - VERTEX 타입만 허용됩니다.'
        if (fs['type'] != RedShader.FRAGMENT) throw 'RedProgram : fShaderInfo - FRAGMENT 타입만 허용됩니다.'
        tGL = redGL.gl;

        if (!redGL['_datas']['RedProgram']) redGL['_datas']['RedProgram'] = {};
        if(redGL['_datas']['RedProgram'][key]) return redGL['_datas']['RedProgram'][key]
        else redGL['_datas']['RedProgram'][key] = this


        this['key'] = key;
        this['webglProgram'] = makeProgram(tGL, key, vs, fs);
        tGL.useProgram(this['webglProgram'])



        this.attributeLocation = [];
        this.uniformLocation = [];
        this.systemUniformLocation = [];
        this.updateLocation(vs);
        this.updateLocation(fs);
        console.log(this)
        this['_UUID'] = RedGL['makeUUID']();
        Object.freeze(this)
    }


    RedProgram.prototype = {
        updateLocation: (function () {
            var self;
            return function (shader) {
                self = this;
                if (shader['parseData']['attribute']) {
                    shader['parseData']['attribute']['list'].forEach(function (v) {
                        var tInfo = {};
                        tInfo = {}
                        tInfo['_UUID'] = RedGL.makeUUID()
                        tInfo['location'] = tGL.getAttribLocation(self['webglProgram'], v['name']);
                        if (!tInfo['location']==-1) tInfo['msg'] = '쉐이더 main 함수에서 사용되고 있지 않음'
                        tInfo['uniformType'] = v['uniformType']
                        tInfo['name'] = v['name']
                        self['attributeLocation'].push(tInfo)
                        self['attributeLocation'][v['name']] = tInfo
                    })
                }
                if (shader['parseData']['uniform']) {
                    shader['parseData']['uniform']['list'].forEach(function (v) {
                        var tInfo = {};
                        tInfo['_UUID'] = RedGL.makeUUID()
                        // console.log(v)
                        // console.log(v['name'],tGL.getUniformLocation(self['webglProgram'], v['name']))
                        tInfo['location'] = tGL.getUniformLocation(self['webglProgram'], v['name']);
                        if (!tInfo['location']) tInfo['msg'] = '쉐이더 main 함수에서 사용되고 있지 않음'
                        tInfo['uniformType'] = v['uniformType']
                        // renderType 조사
                        // TODO: 데이터 타입조사를 이놈이 하는게 맞는건가..
                        var arrayNum, tRenderType, tRenderMethod;
                        arrayNum = v['arrayNum']
                        switch (v['uniformType']) {
                            case 'float':
                                tRenderType = 'float';
                                tRenderMethod = 'uniform1f';
                                break
                            case 'int':
                                tRenderType = 'int';
                                tRenderMethod = 'uniform1i';
                                break
                            case 'mat4':
                                tRenderType = 'mat';
                                tRenderMethod = 'uniformMatrix4fv';
                                break
                            case 'mat3':
                                tRenderType = 'mat';
                                tRenderMethod = 'uniformMatrix3fv';
                                break
                            case 'mat2':
                                tRenderType = 'mat';
                                tRenderMethod = 'uniformMatrix2fv';
                                break
                            case 'vec4':
                                tRenderType = 'vec';
                                tRenderMethod = 'uniform4fv';
                                break
                            case 'vec3':
                                tRenderType = 'vec';
                                tRenderMethod = 'uniform3fv';
                                break
                            case 'vec2':
                                tRenderType = 'vec';
                                tRenderMethod = 'uniform2fv';
                                break

                        }
                        tInfo['renderType'] = tRenderType
                        tInfo['renderMethod'] = tRenderMethod
                        //
                        tInfo['name'] = v['name']
                        tInfo['materialPropertyName'] = v['name'].charAt(1).toLowerCase()+v['name'].substr(2)
                        tInfo['arrayNum'] = v['arrayNum']
                        if (v['systemUniformYn']) {
                            self['systemUniformLocation'].push(tInfo)
                            self['systemUniformLocation'][v['name']] = tInfo
                        } else {
                            self['uniformLocation'].push(tInfo)
                            self['uniformLocation'][v['name']] = tInfo
                        }

                    })

                }
            }
        })()
    }
    Object.freeze(RedProgram)
})();