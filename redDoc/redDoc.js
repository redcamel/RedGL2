"use strict";
var DocJS = {
    init: function (srcList) {
        var reg = /\/\*\*DOC\:[\s\S]+?\:\DOC\*\//g;
        (function () {
            var selectBox;
            var tList;
            var parseDoc;
            var rootBox
            var leftBox;
            var dedent = function (callSite, ...args) {
                function format(str) {
                    let size = -1;
                    return str.replace(/\n(\s+)/g, (m, m1) => {
                        if (size < 0)
                            size = m1.replace(/\t/g, "    ").length;
                        return "\n" + m1.slice(Math.min(m1.length, size));
                    });
                }
                if (typeof callSite === "string") return format(callSite);
                if (typeof callSite === "function") return (...args) => format(callSite(...args));
                let output = callSite
                    .slice(0, args.length + 1)
                    .map((text, i) => (i === 0 ? "" : args[i - 1]) + text)
                    .join("");
                return format(output);
            }
            parseDoc = function (url) {
                var tLoader;
                console.log('멀부르는거냐!', url)
                tLoader = Recard.AjaxLoader(
                    null,
                    {
                        url: url,
                        method: 'GET'
                    }
                )

                tLoader.onAllLoaded(function (rsList) {
                    console.log('전체로딩성공!', rsList)
                    var groupBox, propertybox, methodBox, eventBox, descripttionBox, listBox, constBox, staticMethodBox, extendsMethodBox
                    var makeBox;
                    var makeDocObject;
                    var descriptionParser, methodParser, paramsParser, propertyParser, exampleParser;
                    rootBox.S('html', '')
                    descriptionParser = function (v, parentBox) {
                        Recard.Dom('ul').S(
                            '>', Recard.Dom('li').S(
                                'html', v.trim().replace(/\n/g, '<br>')
                            ),
                            '<', parentBox
                        )
                    }
                    exampleParser = function (v, parentBox, noTitle) {
                        var tTitle, t1, t2;
                        if (!noTitle) {
                            parentBox.S(
                                '>', tTitle = Recard.Dom('div').S(
                                    '@className', 'paramTitle',
                                    'html', 'Example'
                                )
                            )
                        }
                        parentBox.S(
                            '>', Recard.Dom('pre').S(
                                'borderRadius', 5,
                                'background', '#333',
                                'padding', 20,
                                '>', t2 = Recard.Dom('code').S(
                                    '@className', 'language-javascript'
                                )
                            )
                        )
                        t2.S('html', Prism.highlight(dedent(v), Prism.languages.javascript).trim())
                    }
                    paramsParser = (function () {
                        var parser;
                        parser = function (k, v, parentBox) {
                            var tCon, keyName, typeName;
                            tCon = Recard.Dom('li').S(
                                '>', keyName = Recard.Dom('span').S(
                                    '@className', 'paramTitle',
                                    'html', k.trim() + ' : '
                                ),
                                '>', typeName = Recard.Dom('span'),
                                '<', parentBox
                            )
                            v.forEach(function (tData) {
                                var t3;
                                t3 = Recard.Dom('div')

                                if (typeof tData == 'object' && tData['type']) typeName.S('html+', tData['type'])
                                else {
                                    tData = tData.trim()
                                    if (tData.indexOf('<code>') == -1) {
                                        Recard.Dom('div').S(
                                            'html', tData,
                                            '<', tCon
                                        )
                                    } else {
                                        tData = tData.replace('<code>', '')
                                        tData = tData.replace('</code>', '')
                                        exampleParser(tData, Recard.Dom('div').S('<', tCon), true)
                                    }

                                }
                            })
                        }
                        return function (v, parentBox) {
                            var t2;
                            Recard.Dom('div').S(
                                '>', Recard.Dom('div').S(
                                    '@className', 'paramTitle',
                                    'html', 'Parameters'
                                ),
                                '>', t2 = Recard.Dom('ul'),
                                '<', parentBox
                            )
                            for (var k in v) parser(k, v[k], t2)
                        }
                    })()
                    methodParser = (function () {
                        return function (k, v, parentBox) {
                            var t0, t1;
                            var tParams;
                            tParams = []
                            t0 = Recard.Dom('div').S(
                                '>', t1 = Recard.Dom('div').S(
                                    '@className', 'title',
                                    'html', `${k.replace(/\n/g, '<br>')}${v['params'] ? '' : '<span style="font-weight:normal"> ( )</span>'}
                                    <span style='font-size:11px;background:${v['state'] == 'FINAL' ? 'green' : 'red'};color:white;padding:4px 10px 5px 10px;border-radius:4px;vertical-align:middle;'>STATE : ${v['state'] ? v['state'] : 'DRAFT'}</span>`,
                                ),
                                '<', parentBox
                            )
                            for (var k in v) {
                                if (k == 'description') descriptionParser(v[k], t0)
                                if (k == 'params') {
                                    paramsParser(v[k], t0)
                                    for (var k2 in v[k]) {
                                        if (v[k][k2][0]['type']) tParams.push(k2 + " : <span style='color:red'>" + v[k][k2][0]['type'] + '</span>')
                                        else tParams.push(k2)
                                    }
                                    tParams = tParams.join(', ')
                                    Recard.Dom('span').S(
                                        'fontWeight', 'normal',
                                        'html+', ' ( ' + tParams + ' )',
                                        '<', t1
                                    )
                                }
                                if (k == 'example') exampleParser(v[k], t0)
                            }
                            t0.S(
                                '>', Recard.Dom('div').S(
                                    'fontWeight', 'normal',
                                    'html', `<span style='font-weight:bold'>return</span> : ${v['return'] != undefined ? v['return'] : '<span style="color:red">DOC에 정의하지 않았습니다.</span>'}`
                                ),
                                '>', Recard.Dom('div').S(
                                    'position', 'absolute',
                                    'html', 'top',
                                    'bottom', 0,
                                    'right', 0,
                                    'on', ['down', function () {
                                        Recard.WIN.scroll(0, 0)
                                    }]
                                )
                            )
                        }
                    })()
                    propertyParser = (function () {
                        return function (k, v, parentBox) {
                            var t0, t1;
                            var tParams;
                            tParams = []
                            t0 = Recard.Dom('div').S(
                                'position', 'relative',
                                '>', t1 = Recard.Dom('div').S(
                                    '@className', 'title',
                                    'html', k.replace(/\n/g, '<br>')
                                    + `<span style='margin-left:10px;font-size:11px;background:${v['state'] == 'FINAL' ? 'green' : 'red'};color:white;padding:4px 10px 5px 10px;border-radius:4px;vertical-align:middle;'>STATE : ${v['state'] ? v['state'] : 'DRAFT'}</span>`
                                ),
                                '<', parentBox
                            )
                            for (var k in v) {
                                if (k == 'description') descriptionParser(v[k], t0)
                                if (k == 'params') {
                                    paramsParser(v[k], t0)
                                    for (var k2 in v[k]) {
                                        if (v[k][k2][0]['type']) tParams.push(k2 + " : <span style='color:red'>" + v[k][k2][0]['type'] + '</span>')
                                        else tParams.push(k2)
                                    }
                                    tParams = tParams.join(', ')
                                    Recard.Dom('span').S(
                                        'fontWeight', 'normal',
                                        '<', t1
                                    )

                                }
                                if (k == 'example') exampleParser(v[k], t0)
                            }
                            t0.S(
                                '>', Recard.Dom('div').S(
                                    'fontWeight', 'normal',
                                    'html', `<span style='font-weight:bold'>return</span> : ${v['return'] != undefined ? v['return'] : '<span style="color:red">DOC에 정의하지 않았습니다.</span>'}`
                                ),
                                '>', Recard.Dom('div').S(
                                    'position', 'absolute',
                                    'html', 'top',
                                    'bottom', 0,
                                    'right', 0,
                                    'cursor', 'pointer',
                                    'on', ['down', function () {
                                        Recard.WIN.scroll(0, 0)
                                    }]
                                )
                            )
                        }
                    })()
                    makeDocObject = function (data) {
                        var comments = JSON.parse(data)
                        console.log(comments)
                        var extendList = comments.filter(function (v) {
                            if (v.hasOwnProperty('extendDoc')) return true
                        })
                        extendList.forEach(function (v) {
                            Recard.Dom('div').S(
                                'html', v['extendDoc'],
                                'display', 'inline-block',
                                '@className', 'defineBox',
                                'cursor', 'pointer',
                                'on', ['down', function () {
                                    console.log('test')
                                    parseDoc(document.querySelector('option[key="' + v['extendDoc'] + '"]').value)
                                }],
                                '<', extendsMethodBox
                            )
                        })
                        comments = comments.filter(function (v) {
                            if (!v.hasOwnProperty('extendDoc')) return true
                        })
                        comments.sort(function (a, b) {
                            a = a['title'].toLowerCase().replace(/[^a-z]/gi, '') // 정렬할때, 일단은 알파벳만 가지고 비교하는걸로~
                            b = b['title'].toLowerCase().replace(/[^a-z]/gi, '')
                            if (a > b) return 1
                            if (a < b) return -1
                            return 0
                        })
                        // console.log(comments)
                        comments.forEach(function (v, index) {
                            var tContainer, vTitle;
                            vTitle = v['title'];

                            // 앵커 생성
                            Recard.Dom('a').S(
                                '@href', '#' + vTitle,
                                'display', 'inline-block',
                                'padding', 10,
                                'html', vTitle,
                                '<', listBox
                            )

                            tContainer = Recard.Dom('div').S(
                                '@id', vTitle,
                                '@className', 'defineBox',
                                '<', v['constructorYn'] ? descripttionBox
                                    : v['code'] == 'METHOD' ? methodBox
                                        : v['code'] == 'CONST' ? constBox
                                            : v['code'] == 'STATIC' ? staticMethodBox
                                                : propertybox
                            )
                            propertyParser(vTitle, v, tContainer)
                        })
                    }
                    makeBox = function (title, parentBox) {
                        var t0, titleBox;
                        t0 = Recard.Dom('div').S('<', parentBox)
                        title = title ? (title = title.split('/'), title = title[title.length - 1]) : title


                        if (title) {
                            titleBox = Recard.Dom('div').S(
                                '@className', 'topTitle',
                                'margin', '1.6rem 0 1.6rem 0',
                                'border', '1px solid #eee',
                                'padding', '1.6rem',
                                'html', title,
                                '<', t0
                            )
                        }
                        return t0
                    }
                    /////
                    console.log(rsList)
                    console.log('파싱할대상!', rsList[0])
                    groupBox = makeBox(rsList[0]['requestURL'].replace('.json', ''), rootBox, 20)
                    descripttionBox = makeBox(null, groupBox)
                    extendsMethodBox = makeBox('Extend List', groupBox)
                    listBox = makeBox('API', groupBox)
                    staticMethodBox = makeBox('Static Methods', groupBox)
                    constBox = makeBox('Const', groupBox)
                    propertybox = makeBox('properties', groupBox)
                    methodBox = makeBox('Methods', groupBox)
                    eventBox = makeBox('Events', groupBox)
                    makeDocObject(rsList[0]['content'])
                    if (!constBox.__dom__.querySelector('.defineBox')) constBox.remove()
                    if (!methodBox.__dom__.querySelector('.defineBox')) methodBox.remove()
                    if (!propertybox.__dom__.querySelector('.defineBox')) propertybox.remove()
                    if (!eventBox.__dom__.querySelector('.defineBox')) eventBox.remove()
                    if (!staticMethodBox.__dom__.querySelector('.defineBox')) staticMethodBox.remove()
                    if (!extendsMethodBox.__dom__.querySelector('.defineBox')) extendsMethodBox.remove()
                    /////

                })
                tLoader.start()
            }
            tList = Array.prototype.slice.call(srcList)
            tList.sort()
            leftBox = Recard.Dom('ul').S(
                'position', 'absolute',
                'top', 0,
                'left', 0,
                'width', 250,
                'padding', '10px 10px 10px 10px',
                '<', 'body'
            )
            selectBox = Recard.Dom('select').S(
                'position', 'fixed',
                'top', 10,
                'right', 10,
                'on', ['change', function (e) {
                    console.log(selectBox.__dom__.selectedIndex)
                    parseDoc(selectBox.__dom__.options[selectBox.__dom__.selectedIndex].value)
                }],
                '<', 'body'
            )
            var leftStr = ''
            tList.forEach(function (v, index) {
                var HD_click;
                var title
                title = v
                HD_click = function () {
                    console.log(this)
                    console.log(index)
                    selectBox.__dom__.selectedIndex = index
                    parseDoc(selectBox.__dom__.options[index].value)
                }
                title = title ? (title = title.split('/'), title = title[title.length - 1]) : title
                selectBox.S(
                    '>', Recard.Dom('option').S(
                        '@value', v,
                        '@key', title.replace('.json', ''),
                        'html', title.replace('.json', '')
                    )
                )

                title = title ? (title = title.split('/'), title = title[title.length - 1]) : title

                Recard.Dom('li').S(
                    'cursor', 'pointer',
                    '@value', index,
                    'html', title.replace('.json', ''),
                    'on', ['click', HD_click],
                    '<', leftBox
                )
            });
            rootBox = Recard.Dom('div').S(
                'marginLeft', 251,
                '<', 'body'
            )
            Recard.Dom('div').S(
                'html', '<hr style="border:0px;border-top:1px solid #eee;margin-left:251px">' +
                '<div style="font-size:11px;color:#222;margin-left:251px;text-align:right;padding-right:10px">By Redcamel' +
                '</div>',
                '<', 'body'
            )

            var t0, tValue;
            t0 = window.location.href
            t0 = t0.split('#')
            if (t0[1]) t0 = t0[1] + '.json'
            else t0 = t0[0]
            tValue = selectBox.__dom__.options[0].value
            Array.prototype.slice.call(selectBox.__dom__.options).forEach(function (v, index) {
                console.log(v.value.split('/')[1], ',,,', t0)
                if (v.value.split('/')[1] == t0) tValue = v.value
            })
            console.log(tValue)
            parseDoc(tValue)
        })();

    }
}