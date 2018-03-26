"use strict";
var RedProgram;
(function () {
    var makeProgram, updateLocation;
    makeProgram = (function () {
        var program;
        return function (gl, key, vs, fs) {
            program = gl.createProgram();
            gl.attachShader(program, vs['webglShader']);
            gl.attachShader(program, fs['webglShader']);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) RedGLUtil.throwFunc("프로그램을 초기화 할 수 없습니다.");
            program['key'] = key;
            program['vShaderKey'] = vs['key'];
            program['fShaderKey'] = vs['key'];
            gl.useProgram(program);
            return program;
        }
    })();
    updateLocation = (function () {
        // TODO: 정보를 객체화시키자
        return function (self, gl, shader) {
            if (shader['parseData']['attribute']) {
                shader['parseData']['attribute']['list'].forEach(function (v) {
                    var tInfo = {};
                    tInfo = {}
                    tInfo['_UUID'] = RedGL.makeUUID()
                    tInfo['location'] = gl.getAttribLocation(self['webglProgram'], v['name']);
                    if (!tInfo['location'] == -1) tInfo['msg'] = '쉐이더 main 함수에서 사용되고 있지 않음'
                    tInfo['attributeType'] = v['attributeType']
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
                    tInfo['location'] = gl.getUniformLocation(self['webglProgram'], v['name']);
                    if (!tInfo['location']) tInfo['msg'] = '쉐이더 main 함수에서 사용되고 있지 않음'
                    tInfo['uniformType'] = v['uniformType']
                    // renderType 조사
                    // TODO: 데이터 타입조사를 이놈이 하는게 맞는건가..
                    var arrayNum, tRenderType, tRenderMethod;
                    arrayNum = v['arrayNum']
                    switch (v['uniformType']) {
                        case 'sampler2D':
                            tRenderType = 'sampler2D';
                            tRenderMethod = 'uniform1f';
                            break
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
                    tInfo['materialPropertyName'] = v['name'].charAt(1).toLowerCase() + v['name'].substr(2)
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
    })();
    /**DOC:
        {
            constructorYn : true,
            title :`RedProgram`,
            description : `
                RedProgram Instance 생성기
            `,
            params : {
                redGL : [
                    {type:'RedGL Instance'}
                ],
                key : [
                    {type:'String'},
                    `고유키`
                ],
                vs : [
                    {type:'RedShader Instance'},
                    `버텍스 쉐이더(RedShader.VERTEX 타입)`
                ],
                fs : [
                    {type:'RedShader Instance'},
                    `프레그먼트 쉐이더(RedShader.FRAGMENT 타입)`
                ]
            },
            return : 'RedProgram Instance'
        }
    :DOC*/
    RedProgram = function (redGL, key, vs, fs) {
        var tGL;
        if (!(this instanceof RedProgram)) return new RedProgram(redGL, key, vs, fs)
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedProgram : RedGL Instance만 허용됩니다.');
        if (typeof key != 'string') RedGLUtil.throwFunc('RedProgram : key - 문자열만 허용됩니다.');
        if (!vs instanceof RedShader) RedGLUtil.throwFunc('RedProgram : vShaderInfo - RedShader만 허용됩니다.');
        if (!fs instanceof RedShader) RedGLUtil.throwFunc('RedProgram : fShaderInfo - RedShader만 허용됩니다.');
        if (vs['type'] != RedShader.VERTEX) RedGLUtil.throwFunc('RedProgram : vShaderInfo - VERTEX 타입만 허용됩니다.');
        if (fs['type'] != RedShader.FRAGMENT) RedGLUtil.throwFunc('RedProgram : fShaderInfo - FRAGMENT 타입만 허용됩니다.');

        tGL = redGL.gl;
        // TODO: 유일키 방어
        if (!redGL['_datas']['RedProgram']) redGL['_datas']['RedProgram'] = {};
        if (redGL['_datas']['RedProgram'][key]) return redGL['_datas']['RedProgram'][key]
        else redGL['_datas']['RedProgram'][key] = this
        /**DOC:
            {
                title :`key`,
                description : `고유키`,
                example : `Instance.key`,
                return : 'String'
            }
        :DOC*/
        this['key'] = key;
        /**DOC:
            {
                title :`webglProgram`,
                description : `실제 프로그램(WebGLProgram Instance)`,
                example : `// TODO:`,
                return : 'WebGLShader'
            }
        :DOC*/
        this['webglProgram'] = makeProgram(tGL, key, vs, fs);
        /**DOC:
            {
                title :`attributeLocation`,
                description : `어리뷰트 로케이션 정보`,
                example : `// TODO:`,
                return : 'Array'
            }
        :DOC*/
        this['attributeLocation'] = [];
        /**DOC:
            {
                title :`uniformLocation`,
                description : `유니폼 로케이션 정보`,
                example : `// TODO:`,
                return : 'Array'
            }
        :DOC*/
        this['uniformLocation'] = [];
        /**DOC:
            {
                title :`systemUniformLocation`,
                description : `시스템 유니폼 로케이션 정보`,
                example : `// TODO:`,
                return : 'Array'
            }
        :DOC*/
        this['systemUniformLocation'] = [];

        // 쉐이더 로케이션 찾기
        tGL.useProgram(this['webglProgram'])
        updateLocation(this, tGL, vs);
        updateLocation(this, tGL, fs);
        this['_UUID'] = RedGL['makeUUID']();
        Object.freeze(this)
        console.log(this)
    }
    RedProgram.prototype = {}
    Object.freeze(RedProgram)
})();