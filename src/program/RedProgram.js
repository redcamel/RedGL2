"use strict";
var RedProgram;
(function () {
    var makeProgram, updateLocation;
    var samplerIndex;
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
        var AttributeLocationInfo;
        var UniformLocationInfo;
        AttributeLocationInfo = function () { }
        UniformLocationInfo = function () { }
        return function (self, gl, shader) {
            if (shader['parseData']['attribute']) {
                shader['parseData']['attribute']['list'].forEach(function (v) {
                    var t0 = new AttributeLocationInfo();
                    t0['_UUID'] = RedGL.makeUUID()
                    t0['location'] = gl.getAttribLocation(self['webglProgram'], v['name']);
                    if (t0['location'] == -1) {
                        t0['msg'] = '쉐이더 main 함수에서 사용되고 있지 않음';
                    } else {
                        t0['attributeType'] = v['attributeType'];
                        t0['name'] = v['name'];
                        t0['enabled'] = false;
                        self['attributeLocation'].push(t0);
                        self['attributeLocation'][v['name']] = t0;
                        // Object.seal(t0);
                    }
                })
            }
            if (shader['parseData']['uniform']) {
                shader['parseData']['uniform']['list'].forEach(function (v) {
                    var t0 = new UniformLocationInfo();
                    t0['_UUID'] = RedGL.makeUUID()
                    // console.log(v)
                    // console.log(v['name'],tGL.getUniformLocation(self['webglProgram'], v['name']))
                    t0['location'] = gl.getUniformLocation(self['webglProgram'], v['name']);
                    if (!t0['location']) t0['msg'] = '쉐이더 main 함수에서 사용되고 있지 않음';
                    t0['uniformType'] = v['uniformType'];
                    // renderType 조사
                    var arrayNum, tRenderType, tRenderMethod;
                    arrayNum = v['arrayNum']
                    switch (v['uniformType']) {
                        case 'sampler2D':
                            //TODO: 인덱스를 고유 번호로 인식하도록 변경
                            tRenderType = 'sampler2D';
                            tRenderMethod = 'uniform1f';
                            t0['samplerIndex'] = samplerIndex
                            samplerIndex++
                            if (samplerIndex == 8) samplerIndex = 2

                            break
                        case 'samplerCube':
                            tRenderType = 'samplerCube';
                            tRenderMethod = 'uniform1f';
                            t0['samplerIndex'] = samplerIndex
                            samplerIndex++
                            if (samplerIndex == 8) samplerIndex = 2
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
                    t0['renderType'] = tRenderType
                    t0['renderMethod'] = tRenderMethod

                    //
                    t0['name'] = v['name']
                    t0['materialPropertyName'] = v['name'].charAt(1).toLowerCase() + v['name'].substr(2)
                    t0['arrayNum'] = v['arrayNum']
                    if (v['systemUniformYn']) {
                        self['systemUniformLocation'].push(t0)
                        self['systemUniformLocation'][v['name']] = t0
                    } else {
                        self['uniformLocation'].push(t0)
                        self['uniformLocation'][v['name']] = t0
                    }
                    // Object.seal(t0)
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
                    {type:'RedGL'}
                ],
                key : [
                    {type:'String'},
                    `고유키`
                ],
                vertexShader : [
                    {type:'RedShader Instance'},
                    `버텍스 쉐이더(RedShader.VERTEX 타입)`
                ],
                fragmentShader : [
                    {type:'RedShader Instance'},
                    `프레그먼트 쉐이더(RedShader.FRAGMENT 타입)`
                ]
            },
            return : 'RedProgram Instance'
        }
    :DOC*/
    RedProgram = function (redGL, key, vertexShader, fragmentShader) {
        var tGL;
        if (!(this instanceof RedProgram)) return new RedProgram(redGL, key, vertexShader, fragmentShader)
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedProgram : RedGL Instance만 허용됩니다.', redGL);
        if (typeof key != 'string') RedGLUtil.throwFunc('RedProgram : key - 문자열만 허용됩니다.');
        if (!vertexShader instanceof RedShader) RedGLUtil.throwFunc('RedProgram : vShaderInfo - RedShader만 허용됩니다.');
        if (!fragmentShader instanceof RedShader) RedGLUtil.throwFunc('RedProgram : fShaderInfo - RedShader만 허용됩니다.');
        if (vertexShader && vertexShader['type'] != RedShader.VERTEX) RedGLUtil.throwFunc('RedProgram : vShaderInfo - VERTEX 타입만 허용됩니다.');
        if (fragmentShader && fragmentShader['type'] != RedShader.FRAGMENT) RedGLUtil.throwFunc('RedProgram : fShaderInfo - FRAGMENT 타입만 허용됩니다.');

        tGL = redGL.gl;

        // 데이터 공간확보
        if (!redGL['_datas']['RedProgram']) redGL['_datas']['RedProgram'] = {};

        // 소스 쉐이더가 모두 없으면 기존에서 검색
        if (!vertexShader && !fragmentShader) {
            if (redGL['_datas']['RedProgram'][key]) return redGL['_datas']['RedProgram'][key]
            else RedGLUtil.throwFunc('RedShader : 존재하지않는 key를 검색하려고합니다.', key);
        } else {
            if (!vertexShader || !fragmentShader) RedGLUtil.throwFunc('RedProgram : 신규 생성시 vertexShader, fragmentShader 모두 입력해야함.');
            if (RedProgram['hasKey'](redGL, key)) RedGLUtil.throwFunc('RedProgram : key - 이미 정의된 키로 생성을 시도.', '\n키 :', key);
            else redGL['_datas']['RedProgram'][key] = this;
            console.log('신규생성', key)
        }
        /**DOC:
            {
                title :`key`,
                description : `고유키`,
                return : 'String'
            }
        :DOC*/
        this['key'] = key;
        /**DOC:
            {
                title :`webglProgram`,
                description : `실제 프로그램(WebGLProgram Instance)`,
                return : 'WebGLShader'
            }
        :DOC*/
        this['webglProgram'] = makeProgram(tGL, key, vertexShader, fragmentShader);
        /**DOC:
            {
                title :`attributeLocation`,
                description : `어리뷰트 로케이션 정보`,
                return : 'Array'
            }
        :DOC*/
        this['attributeLocation'] = [];
        /**DOC:
            {
                title :`uniformLocation`,
                description : `유니폼 로케이션 정보`,
                return : 'Array'
            }
        :DOC*/
        this['uniformLocation'] = [];
        /**DOC:
            {
                title :`systemUniformLocation`,
                description : `시스템 유니폼 로케이션 정보`,
                return : 'Array'
            }
        :DOC*/
        this['systemUniformLocation'] = [];

        // 쉐이더 로케이션 찾기
        tGL.useProgram(this['webglProgram'])
        samplerIndex = 2
        updateLocation(this, tGL, vertexShader);
        updateLocation(this, tGL, fragmentShader);
        this['_UUID'] = RedGL['makeUUID']();
        // Object.freeze(this)
        console.log(this)
    }
    RedProgram.prototype = {};
    /**DOC:
        {
            title :`RedProgram.hasKey`,
            code: 'STATIC',
            description : '키에 해당하는 쉐이더 존재 여부 반환',
            params : {
                redGL : [
                    {type:'RedGL'}
                ],
                key : [
                    {type:'String'},
                    `고유키`
                ]
            },
            example : `
                RedProgram.haskey(RedGL Instance, '찾고자하는키')
            `,
            return : 'Boolean'
        }
    :DOC*/
    RedProgram['hasKey'] = function (redGL, key) {
        if (!redGL['_datas']['RedProgram']) redGL['_datas']['RedProgram'] = {};
        return redGL['_datas']['RedProgram'][key] ? true : false
    }
    Object.freeze(RedProgram)
})();