"use strict";
var RedBuffer;
(function () {
    var checkGlArrayType, checkBufferType, parseInterleaveDefineInfo;
    checkGlArrayType = function (gl, bufferType, v) {
        switch (bufferType) {
            case RedBuffer.ARRAY_BUFFER:
                if (v instanceof Float32Array || v instanceof Float64Array) {
                    if (v instanceof Float32Array) return gl.FLOAT;
                    if (v instanceof Float64Array) return gl.FLOAT;
                } else RedGLUtil.throwFunc('RedBuffer : 올바른 TypedArray(RedBuffer.ARRAY_BUFFER)형식을 사용해야합니다.')
                break
            case RedBuffer.ELEMENT_ARRAY_BUFFER:
                if (
                    v instanceof Uint8Array || v instanceof Uint16Array || v instanceof Uint32Array
                    || v instanceof Int8Array || v instanceof Int16Array || v instanceof Int32Array
                ) {
                    if (v instanceof Int8Array) return gl.BYTE
                    if (v instanceof Uint8Array) return gl.UNSIGNED_BYTE
                    if (v instanceof Uint16Array) return gl.UNSIGNED_SHORT
                    if (v instanceof Uint32Array) return gl.UNSIGNED_INT
                    if (v instanceof Int16Array) return gl.SHORT
                    if (v instanceof Int32Array) return gl.INT
                } else RedGLUtil.throwFunc('RedBuffer : 올바른 TypedArray(RedBuffer.ELEMENT_ARRAY_BUFFER)형식을 사용해야합니다.')
                break
            default:
                RedGLUtil.throwFunc('RedBuffer : bufferType - 지원하지 않는 버퍼타입입니다. ')
        }
    }
    checkBufferType = function (gl, bufferType) {
        switch (bufferType) {
            case RedBuffer.ARRAY_BUFFER:
                return gl.ARRAY_BUFFER
                break
            case RedBuffer.ELEMENT_ARRAY_BUFFER:
                return gl.ELEMENT_ARRAY_BUFFER
                break
            default:
                RedGLUtil.throwFunc('RedBuffer : bufferType - 지원하지 않는 버퍼타입입니다. ')
        }
    }
    parseInterleaveDefineInfo = (function () {
        var t0, k;
        return function (self, bufferType, data, interleaveDefineInfo) {
            // console.log(self,bufferType)
            t0 = 0;
            switch (bufferType) {
                case RedBuffer.ARRAY_BUFFER:
                    self['interleaveDefineInfo'] = interleaveDefineInfo;
                    if (interleaveDefineInfo) {
                        for (k in interleaveDefineInfo) {
                            interleaveDefineInfo[k]['offset'] = interleaveDefineInfo.length<2 ? 0 :t0
                            t0 += interleaveDefineInfo[k]['size']
                            interleaveDefineInfo[k]['_UUID'] = RedGL['makeUUID']();
                        }
                        interleaveDefineInfo.forEach(function (v) {
                            interleaveDefineInfo[v['attributeKey']] = v
                        })
                        if(interleaveDefineInfo.length<2){
                            self['stride'] = 0;
                            self['pointNum'] = data.length / 3;
                        }else{
                            self['stride'] = t0;
                            self['pointNum'] = data.length / t0;
                        }
                      
                        
                    } else RedGLUtil.throwFunc('RedBuffer : interleaveDefineInfo는 반드시 정의 되어야합니다.')
                    break
                case RedBuffer.ELEMENT_ARRAY_BUFFER:
                    self['pointNum'] = data.length;
                    break
            }
        }
    })();
    /**DOC:
        {
            constructorYn : true,
            title :`RedBuffer`,
            description : `
                RedBuffer Instance 생성자
            `,
            params : {
                redGL : [
                    {type:'RedGL Instance'}
                ],
                key : [
                    {type:'String'},
                    `고유키`
                ],
                data : [
                    {type:'TypedArray'},
                    `버퍼 구성 데이터`
                ],
                bufferType : [
                    {type:'String'},
                    `RedBuffer.ARRAY_BUFFER or RedBuffer.ELEMENT_ARRAY_BUFFER`
                ],
                interleaveDefineInfo : [
                    {type:'Object'},
                    `
                    버퍼의 인터리브 구성 정보
                    RedBuffer.ARRAY_BUFFER 일때만 필요
                    `
                ],
            },
            example : `
                // TODO:
            `,
            return : 'RedBuffer Instance'
        }
    :DOC*/
    RedBuffer = function (redGL, key, data, bufferType, interleaveDefineInfo) {
        if (!(this instanceof RedBuffer)) return new RedBuffer(redGL, key, data, bufferType, interleaveDefineInfo)
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedBuffer : RedGL Instance만 허용됩니다.')
        if (typeof bufferType != 'string') RedGLUtil.throwFunc('RedBuffer : bufferType - 문자열만 허용됩니다.')
        if (typeof key != 'string') RedGLUtil.throwFunc('RedBuffer : key - 문자열만 허용됩니다.')
        var tGL = redGL.gl;

         // TODO: 유일키 방어
         if (!redGL['_datas'][bufferType]) redGL['_datas'][bufferType] = {};
         if (redGL['_datas'][bufferType][key]) return redGL['_datas'][bufferType][key]
         else redGL['_datas'][bufferType][key] = this
        /**DOC:
           {
               code : 'PROPERTY',
               title :`key`,
               description : `고유키`,
               example : `
                   // TODO:
               `,
               return : 'String'
           }
       :DOC*/
        this['key'] = key
        /**DOC:
           {
               code : 'PROPERTY',
               title :`data`,
               description : `data`,
               example : `
                   // TODO:
               `,
               return : 'TypedArray'
           }
       :DOC*/
        this['data'] = data
        /**DOC:
           {
               code : 'PROPERTY',
               title :`bufferType`,
               description : `bufferType 상수`,
               example : `
                   // TODO:
               `,
               return : 'RedBuffer.ARRAY_BUFFER or RedBuffer.ELEMENT_ARRAY_BUFFER'
           }
       :DOC*/
        this['bufferType'] = bufferType;
        /**DOC:
           {
               code : 'PROPERTY',
               title :`glArrayType`,
               description : `
               data의 type의 gl.XXX 상수
               ex) gl.FLOAT, gl.BYTE
               `,
               example : `
                   // TODO:
               `,
               return : 'gl.XXX 상수'
           }
       :DOC*/
        this['glArrayType'] = checkGlArrayType(tGL, this['bufferType'], this['data']);
        /**DOC:
           {
               code : 'PROPERTY',
               title :`glBufferType`,
               description : `bufferType에 대응하는 gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER 상수`,
               example : `
                   // TODO:
               `,
               return : 'gl.ARRAY_BUFFER or glELEMENT_ARRAY_BUFFER 상수'
           }
       :DOC*/
        this['glBufferType'] = checkBufferType(tGL, this['bufferType']);
        /**DOC:
           {
               code : 'PROPERTY',
               title :`drawMode`,
               description : `gl.STATIC_DRAW 상수`,
               example : `
                   // TODO:
               `,
               return : 'gl.STATIC_DRAW or gl.DYNAMIC_DRAW'
           }
       :DOC*/
        this['drawMode'] = tGL.STATIC_DRAW;
        parseInterleaveDefineInfo(this, this['bufferType'], this['data'], interleaveDefineInfo);
        /**DOC:
           {
               code : 'PROPERTY',
               title :`webglBuffer`,
               description : `WebGLBuffer`,
               example : `
                   // TODO:
               `,
               return : 'WebGLBuffer'
           }
       :DOC*/
        this['webglBuffer'] = tGL.createBuffer();
        this['_UUID'] = RedGL['makeUUID']();
        /**DOC:
           {
               code : 'PROPERTY',
               title :`upload`,
               description : `
                   버퍼 데이터 갱신
                   기존 버퍼의 타입과 다른 타입의 값이 들어올경우 에러. 
               `,
               params : {
                   data : [
                       {type:'TypedArray'},
                       `갱신 할 데이터`
                   ]
               },
               example : `
                   // TODO:
               `,
               return : 'RedBuffer Instance'
           }
       :DOC*/
        this.upload = function (data) {
            if (this['glArrayType'] == checkGlArrayType(tGL, bufferType, data)) {
                this['data'] = data
                tGL.bindBuffer(this['glBufferType'], this['webglBuffer']);
                tGL.bufferData(this['glBufferType'], this['data'], this['drawMode']);
            } else RedGLUtil.throwFunc('RedBuffer : upload - data형식이 기존 형식과 다름', data)

        }
        this.parseInterleaveDefineInfo = function(){
            parseInterleaveDefineInfo(this, this['bufferType'], this['data'], this['interleaveDefineInfo']);
        }
        this.upload(this['data']);
        // Object.seal(this);
        console.log(this);
    }
    /**DOC:
        {
            code: 'CONST',
            title :`RedBuffer.ARRAY_BUFFER`,
            description : `
                ARRAY_BUFFER 버퍼상수
            `,
            example : `
                // TODO:
            `,
            return : 'RedBuffer Instance'
        }
    :DOC*/
    RedBuffer.ARRAY_BUFFER = 'arrayBuffer';
    /**DOC:
        {
            code: 'CONST',
            title :`RedBuffer.ELEMENT_ARRAY_BUFFER`,
            description : `
                ELEMENT_ARRAY_BUFFER 버퍼상수
            `,
            example : `
                // TODO:
            `,
            return : 'RedBuffer Instance'
        }
    :DOC*/
    RedBuffer.ELEMENT_ARRAY_BUFFER = 'elementArrayBuffer';
    Object.freeze(RedBuffer);
})()