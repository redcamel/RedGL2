"use strict";
var DocJS = (function () {
	var setBaseBox, setLeftBox, setRightBox;
	var rootBox, leftBox, rightBox;
	var callDoc;
	var dedent = function (callSite, ...args) {
		function format(str) {
			let size = -1;
			return str.replace(/\n(\s+)/g, (m, m1) => {
				if ( size < 0 )
					size = m1.replace(/\t/g, "    ").length;
				return "\n" + m1.slice(Math.min(m1.length, size));
			});
		}

		if ( typeof callSite === "string" ) return format(callSite);
		if ( typeof callSite === "function" ) return (...args) => format(callSite(...args));
		let output = callSite
			.slice(0, args.length + 1)
			.map((text, i) => (i === 0 ? "" : args[i - 1]) + text)
			.join("");
		return format(output);
	}
	Recard.Css('.redDoc').S(
		'user-select', 'none'
	)
	Recard.Css('.redDoc li').S(
		'list-style-type', 'none',
		'margin-left', 10
	)
	Recard.Css('.redDoc li[directory]').S(
	)
	Recard.Css('.redDoc .redDocBox').S(
		'position', 'relative',
		'padding', '15px 15px 15px 15px',
		'background', 'rgba(0,0,0,0.01)'
	)
	Recard.Css('.redDoc .redDocConstructorBox').S(
		'position', 'relative',
		'padding', '15px 5px',
		'background', '#fff'
	)
	Recard.Css('.redDoc h1[titleBox]').S(
		'font-size', '3em',
		'line-height', '1em',
		'color', '#111'
	)
	Recard.Css('.redDoc h2[titleBox]').S(
		'font-size', '2.5em',
		'color', '#111'
	)
	Recard.Css('.redDoc h3[titleBox]').S(
		'font-size', '1.5em',
		'color', '#36b334'
	)
	Recard.Css('.redDoc .redDocBox .paramTD').S(
		'padding', '5px 10px',
		'border', '1px solid #ddd'
	)
	Recard.Css('.redDoc .redDocBox .paramTD:nth-child(odd)').S(
		'background', '#f2f2f2'
	)
	setBaseBox = function () {
		Recard.Dom('div').S(
			'position', 'fixed',
			'top', 0,
			'left', 0,
			'right', 0,
			'height', 85,
			'padding-left', 20,
			'z-index', 1,
			'border-bottom', '1px solid #ddd',
			'background', '#fff',
			'>', Recard.Dom('h1').S(
				'font-size', 40,
				'html', 'RedGL2 DOC'
			),
			'>', Recard.Dom('div').S(
				'position', 'fixed',
				'top', 18,
				'right', 20,
				'>', Recard.Dom('div').S(
					'text-align', 'right',
					'>', Recard.Dom('span').S(
						'html', '<a href = "https://redcamel.github.io/RedGL2/example">example</a> / '
					),
					'>', Recard.Dom('span').S(
						'html', '<a href = "https://redcamel.github.io/RedGL2/testCase">testCase</a> / '
					),
					'>', Recard.Dom('span').S(
						'html', '<a href = "https://github.com/redcamel/RedGL2/">github</a>'
					)
				),
				'>', Recard.Dom('div').S(
					'text-align', 'right',
					'html', 'This project is maintained by <a href = "https://github.com/redcamel/">Redcamel</a>'
				)
			),
			'<', 'body'
		)
		Recard.Dom('table').S(
			'@className', 'redDoc',
			'width', '100%',
			'margin-top', 100,
			'>', rootBox = Recard.Dom('tr').S(
				'font-size', 12,
				'line-height', 20
			),
			'<', 'body'
		)
	};
	setLeftBox = (function () {
		var getTargetDir;
		var dirMAP;
		dirMAP = {};
		// 주어진 정보에 따라 경로를 생성관리한다.
		getTargetDir = function (v) {
			console.log(v)
			var len;
			len = v.length
			if ( len == 1 ) {
				// 최상위
				return leftBox;
			} else {
				// 하위 디렉토리가 있다고 판단
				var path = '';
				var tParent;
				v.pop();
				tParent = leftBox;
				v.forEach(function (v2, index) {
					console.log(v, v2)
					path += v2;
					if ( !dirMAP[path] ) dirMAP[path] = Recard.Dom('li').S(
						'@open', false,
						'@depth', index,
						'position', 'relative',
						'cursor', 'pointer',
						'display', 'none',
						'on', ['down', function (e) {
							if ( e.nativeEvent.target == this.__dom__ ) {
								var tOpen = this.S('@open') == 'true' ? 1 : 0
								this.queryAll('li').forEach(function (v) {
									v.S('display', tOpen ? 'none' : 'list-item')
								})
								this.S('@open', (!tOpen) ? true : false)
							}
						}],
						'html', v2,
						'>', Recard.Dom('div').S(
							'@directory', '',
							'position', 'absolute',
							'top', 5,
							'left', -15,
							'background', '#d0a4a4',
							'width', 10,
							'height', 10
						),
						'<', tParent
					)
					;
					tParent = dirMAP[path];
				})
				return dirMAP[path];
			}
		}
		return function (srcList) {
			leftBox = Recard.Dom('td').S(
				'vertical-align', 'top',
				'padding-left', 15,
				'width', 300,
				'<', rootBox
			)
			srcList.forEach(function (v) {
				var src = v.join('/') + '.json';
				var tTitle = v[v.length - 1]
				var tParent = getTargetDir(v)
				Recard.Dom('li').S(
					'html', tTitle,
					'cursor', 'pointer',
					'display', tParent.__dom__ == leftBox.__dom__ ? 'list-item' : 'none',
					'on', ['down', function () {
						document.body.scrollTop = 0
						callDoc(src)
					}],
					'<', tParent
				)
			})
			leftBox.queryAll('li').forEach(function (v) {
				console.log(v, v.S('@depth'))
				if ( v.S('@depth') == '0' ) v.S('display', 'list-item')
				else console.log('뭔데')
			})
		}
	}());
	setRightBox = function () {
		rightBox = Recard.Dom('td').S(
			'vertical-align', 'top',
			'html', '초기화면 넣자',
			'<', rootBox
		)
	}
	callDoc = (function () {
		var setConstructor;
		var setContent;
		var setTitle, setDescription, setReturn, setParam, setExample, setTestCase, setState, setExtends;
		setTitle = function (data, tag, key) {
			console.log(data['title'])
			var tTitle = data['title'] ? data['title'] : 'DOC에 title이 정의 되지 않았습니다.'
			if ( key == 'METHOD' || key == 'STATIC METHOD' ) {
				var paramList = []
				if ( data['params'] ) {
					for ( var k in data['params'] ) {
						paramList.push('<span style="font-weight:normal;font-size:14px;vertical-align: top"> <span style="color:#666;font-weight:bold;vertical-align: top">' + k + '</span>' + (data['params'][k][0]['type'] ? ' : ' + data['params'][k][0]['type'] : '') + ' </span>')
					}
				}
				tTitle += '(' + paramList.join(', ') + ')'
			}
			return Recard.Dom(tag ? tag : 'div').S(
				'@titleBox', '',
				'margin', 0,
				'padding', '10px 0',
				'html', tTitle
			)
		}
		setExtends = function (data, tag) {
			console.log(data['extends'])
			data = data['extends'];
			var t0 = [];
			if ( data ) {
				data.forEach(function (v) {
					t0.push(v)
				});

			}
			if(t0.length){
				t0 = t0.join(' >> ');
				return Recard.Dom(tag ? tag : 'div').S(
					'margin', '8px 0px 0px 0px',
					'font-weight', 'bold',
					'font-size', 14,
					'margin-left', 3,
					'color', '#059aab',
					'html', '<b>extends</b> : ' + t0
				)
			}else return Recard.Dom('div')

		}
		setState = function (data, tag) {
			console.log(data['title'])
			return Recard.Dom(tag ? tag : 'div').S(
				'margin', 0,
				'font-weight', 'bold',
				'font-size', 11,
				'html', '<b>state</b> : ' + '<span style="color:' + (data['state'] == 'FINAL' ? 'green' : 'red') + '">' + (data['state'] ? data['state'] : 'DRAFT') + '</span>'
			)
		}
		setDescription = function (data, tag) {
			console.log(data['description'])
			var t0;
			t0 = '<b>description</b> : ';
			if ( data['description'] ) t0 += data['description'].replace(/\n/g, '<br>')
			else t0 += 'DOC에 description이 정의 되지 않았습니다.';
			return Recard.Dom(tag ? tag : 'div').S(
				'html', t0
			)
		}
		setParam = function (data, tag) {
			console.log(data['setParam'])
			var box, boxContent, paramsBox, paramItemBox;
			var k, tData;
			box = Recard.Dom(tag ? tag : 'div').S(
				'>', Recard.Dom('div').S('html', '<b>params : </b>'),
				'>', boxContent = Recard.Dom('div')
			);
			if ( data['params'] ) {
				paramsBox = Recard.Dom('table').S(
					'border-collapse', 'collapse',
					'@cellSpacing', 0,
					'@cellPadding', 0,
					'margin-top', 5,
					'margin-bottom', 5,
					'font-size', 12,
					'line-height', 20,
					'<', boxContent
				)
				for ( k in data['params'] ) {
					tData = data['params'][k];
					Recard.Dom('tr').S(
						'>', Recard.Dom('td').S(
							'@className', 'paramTD',
							'vertical-align', 'top',
							'html', '<b>' + k + '</b>'
						),
						'>', paramItemBox = Recard.Dom('td').S(
							'@className', 'paramTD',
							'vertical-align', 'top'
						),
						'<', paramsBox
					)
					tData.forEach(function (v) {
						if ( v['type'] ) {
							Recard.Dom(tag ? tag : 'div').S(
								'font-weight', 'bold',
								'color', '#0795b7',
								'html', (v['type'] ? 'type : ' + v['type'] : v),
								'<', paramItemBox
							)
						} else {
							Recard.Dom(tag ? tag : 'div').S(
								'html', v,
								'<', paramItemBox
							)
						}
					})
				}
				return box;
			} else return Recard.Dom('div')
		}
		setExample = function (data, tag) {
			console.log(data['example'])
			if ( data['example'] ) {
				return Recard.Dom(tag ? tag : 'div').S(
					'>', Recard.Dom('div').S(
						'html', '<b>example</b> :'
					),
					'>', Recard.Dom('div').S(
						'margin', '5px 0',
						'>', Recard.Dom('code').S(
							'@className', 'language-javascript',
							'display', 'block',
							'padding', 10,
							'html', Prism.highlight(dedent(data['example'] ? data['example'] : 'DOC에 example이 정의 되지 않았습니다.'), Prism.languages.javascript).trim()
						)
					)
				)
			} else return Recard.Dom('div')
		}
		setReturn = function (data, tag) {
			console.log(data['return'])
			return Recard.Dom(tag ? tag : 'div').S(
				'html', '<b>return</b> : ' + (data['return'] ? data['return'] : 'DOC에 return이 정의 되지 않았습니다.')
			)
		}
		setTestCase = function (src) {
			console.log(src)
			var tIframe;
			var tLoader
			tLoader = Recard.AjaxLoader(
				null,
				{
					url: '../testCase/' + src.replace('.json', '.html'),
					method: 'GET'
				}
			)
			tLoader.onAllLoaded(function (v) {
				if ( v[0]['resultType'] != 'FAIL' ) {
					rightBox.S(
						'>', Recard.Dom('h1').S('html', 'TestCase'),
						'>', tIframe = Recard.Dom('iframe').S(
							'@src', '../testCase/' + src.replace('.json', '.html'),
							'border', 0,
							'width', '100%',
							'height', 500
						)
					)
					tIframe.__dom__.onload = function () {
						console.log('오오옹오', this.contentWindow.document)
						console.log(this.contentWindow.document.documentElement.clientHeight)
						var self = this
						setTimeout(function () {
							tIframe.S(
								'height', self.contentWindow.document.documentElement.clientHeight
							)
						}, 500)
					}
					console.log(tIframe.__dom__)
				}
			})
			tLoader.start()
		}
		setConstructor = function (data) {
			if ( data.length ) {
				data = data[0];
				Recard.Dom('div').S(
					'>', setTitle(data, 'h1'),
					'>', setExtends(data),
					'>', Recard.Dom('div').S(
						'@className', 'redDocBox redDocConstructorBox',
						'>', setState(data),
						'>', setDescription(data),
						'>', setParam(data),
						'>', setExample(data),
						'>', setReturn(data)
					),
					'<', rightBox
				)
			}
		};
		setContent = function (content, key) {
			var box;
			var dataList;
			dataList = content.filter(function (v) {
				if ( v['code'] == key ) return true
			});
			rightBox.S(
				'>', Recard.Dom('hr'),
				'>', Recard.Dom('h2').S(
					'@titleBox', '',
					'html', key ? key : '비정의'
				),
				'>', box = Recard.Dom('div')
			)
			dataList.forEach(function (v) {
				var tContentBox;
				setTitle(v, 'h3', key).S(
					'@titleBox', '',
					'cursor', 'pointer',
					'on', ['down', function () {
						tContentBox.S('display', tContentBox.S('display') == 'none' ? 'block' : 'none')
					}],
					'<', box
				)
				tContentBox = Recard.Dom('div').S(
					'@className', 'redDocBox',
					// 'display', 'none',
					'>', setState(v),
					'>', setDescription(v),
					'>', setParam(v),
					'>', setExample(v),
					'>', setReturn(v),
					'<', box
				)
			})
		}
		return function (src) {
			rightBox.S('html', src + ' loading..')
			var tLoader
			tLoader = Recard.AjaxLoader(
				null,
				{
					url: 'docs/' + src,
					method: 'GET'
				}
			)
			tLoader.onAllLoaded(function (v) {
				var content = JSON.parse(v[0]['content'])
				console.log(content)
				rightBox.S('html', '');
				var codeKEYList;
				codeKEYList = {};
				setConstructor(content.filter(function (v) {
					if ( !v['constructorYn'] ) {
						if ( !v['code'] ) codeKEYList['none'] = -1
						else if ( !codeKEYList[v['code']] ) codeKEYList[v['code']] = 1;
					}
					if ( v['constructorYn'] ) return true
				}));
				console.log(codeKEYList)
				for ( var k in codeKEYList ) {
					setContent(content, k == 'none' ? null : k, src);
				}
				setTestCase(src)
				// for ( var k in content ) {
				// 	console.log(content[k])
				// }
			})
			tLoader.start()
		}
	})();
	return {
		init: function (srcList) {
			console.log(srcList)
			setBaseBox()
			setLeftBox(srcList);
			setRightBox();
		}
	}
})();