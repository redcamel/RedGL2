"use strict";
RedGL.setDoNotPrepareProgram();
RedGL(document.createElement('canvas'), function (v) {
    var tRedGL = this;
    var tGL = tRedGL.gl
    redSuite(
        "RedFrameBuffer 테스트",
        redGroup(
            "RedFrameBuffer( redGL, width, height )",
            redTest("성공테스트 : 기본 생성 테스트", function (unit, title) {
                try {
                    var t0 = RedFrameBuffer(tRedGL)
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, true)
        ),
        redGroup(
            "RedFrameBuffer( <b>redGL</b>, width, height )",
            redTest("실패테스트 : RedGL Instance만 허용하는지", function (unit, title) {
                try {
                    var t0 = RedFrameBuffer(1)
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "RedFrameBuffer( redGL, <b>width, height</b> )",
            redTest("성공테스트 : width 반영되는지", function (unit, title) {
                var t0 = RedFrameBuffer(tRedGL, 123)
                console.log(t0)
                unit.run(t0['width'])
            }, 123),
            redTest("성공테스트 : width - 2보다 작은 숫자입력시 2로 치환되는지", function (unit, title) {
                var t0 = RedFrameBuffer(tRedGL, 1, 512)
                unit.run(t0['width'])
            }, 2),
            redTest("성공테스트 : height 반영되는지", function (unit, title) {
                var t0 = RedFrameBuffer(tRedGL, 123, 512)
                console.log(t0)
                unit.run(t0['height'])
            }, 512),
            redTest("성공테스트 : height - 2보다 작은 숫자입력시 2로 치환되는지", function (unit, title) {
                var t0 = RedFrameBuffer(tRedGL, 512, 1)
                unit.run(t0['height'])
            }, 2),
            redTest("성공테스트 : 2보다 큰 숫자만 허용", function (unit, title) {
                var t0 = RedFrameBuffer(tRedGL, 123, 512)
                console.log(t0)
                unit.run(t0['height'])
            }, 512),
            redTest("실패테스트 : width - 문자입력시", function (unit, title) {
                try {
                    var t0 = RedFrameBuffer(tRedGL, 'failTest', 512)
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false),
            redTest("실패테스트 : height - 문자입력시", function (unit, title) {
                try {
                    var t0 = RedFrameBuffer(tRedGL, 512, 'failTest')
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', t0)
                    unit.run(true)
                } catch (error) {
                    console.log('///////////////////////////////////////////////////////////')
                    console.log(title, '\n', error)
                    unit.run(false)
                }
            }, false)
        ),
        redGroup(
            "webglFrameBuffer - (RedFrameBuffer Instance).<b>bind</b>( gl ), (RedFrameBuffer Instance).<b>unbind</b>( gl )",
            redTest("성공테스트 : bind - 소유하고있는 webglFrameBuffer가 등록되는지 확인", function (unit, title) {
                var t0 = RedFrameBuffer(tRedGL)
                t0.bind(tGL)
                console.log(tGL.getParameter(tGL.FRAMEBUFFER_BINDING))
                unit.run(tGL.getParameter(tGL.FRAMEBUFFER_BINDING) == t0['webglFrameBuffer'])
                t0.unbind(tGL)
            }, true),
            redTest("성공테스트 : unbind - webglFrameBuffer가 unbind 되는지 확인", function (unit, title) {
                var t0 = RedFrameBuffer(tRedGL)
                t0.bind(tGL)
                t0.unbind(tGL)
                unit.run(tGL.getParameter(tGL.FRAMEBUFFER_BINDING) != t0['webglFrameBuffer'])
            }, true)
        ),
        redGroup(
            "webglTexture - (RedFrameBuffer Instance).<b>bind</b>( gl ), (RedFrameBuffer Instance).<b>unbind</b>( gl )",
            redTest("성공테스트 : bind - 소유하고있는 webglTexture가 등록되는지 확인", function (unit, title) {
                var t0 = RedFrameBuffer(tRedGL)
                t0.bind(tGL)
                // console.log(tGL.TEXTURE)
                // console.log(tGL.getFramebufferAttachmentParameter(tGL.FRAMEBUFFER, tGL.COLOR_ATTACHMENT0, tGL.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE))
                // console.log(tGL.getFramebufferAttachmentParameter(tGL.FRAMEBUFFER, tGL.COLOR_ATTACHMENT0, tGL.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME))
                // console.log(tGL.getFramebufferAttachmentParameter(tGL.FRAMEBUFFER, tGL.COLOR_ATTACHMENT0, tGL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL))
                // console.log(tGL.getFramebufferAttachmentParameter(tGL.FRAMEBUFFER, tGL.COLOR_ATTACHMENT0, tGL.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE))
                console.log(tGL.getParameter(tGL.TEXTURE_BINDING_2D) == t0['texture']['webglTexture'])
                unit.run(tGL.getParameter(tGL.TEXTURE_BINDING_2D) == t0['texture']['webglTexture'])
                t0.unbind(tGL)
            }, true),
            redTest("성공테스트 : unbind - 소유하고있는 webglTexture가 unbind 되는지 확인", function (unit, title) {
                var t0 = RedFrameBuffer(tRedGL)
                t0.bind(tGL)
                t0.unbind(tGL)
                console.log(t0['texture']['webglTexture'])
                unit.run(tGL.getParameter(tGL.TEXTURE_BINDING_2D) != t0['texture']['webglTexture'])
            }, true)
        ),
        redGroup(
            "webglRenderBuffer - (RedFrameBuffer Instance).<b>bind</b>( gl ), (RedFrameBuffer Instance).<b>unbind</b>( gl )",
            redTest("성공테스트 : bind - 소유하고있는 webglRenderBuffer가 등록되는지 확인", function (unit, title) {
                var t0 = RedFrameBuffer(tRedGL)
                t0.bind(tGL)
                console.log(tGL.getParameter(tGL.RENDERBUFFER_BINDING))
                unit.run(tGL.getParameter(tGL.RENDERBUFFER_BINDING) == t0['webglRenderBuffer'])
                t0.unbind(tGL)
            }, true),
            redTest("성공테스트 : unbind -  소유하고있는 webglRenderBuffer가 unbind 되는지 확인", function (unit, title) {
                var t0 = RedFrameBuffer(tRedGL)
                t0.bind(tGL)
                console.log(tGL.getParameter(tGL.RENDERBUFFER_BINDING))
                t0.unbind(tGL)
                unit.run(tGL.getParameter(tGL.RENDERBUFFER_BINDING) != t0['webglRenderBuffer'])
            }, true)
        )
    )
})
