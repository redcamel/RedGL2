"use strict";
var DocJS = (function () {
	var setBaseBox, setLeftBox, setRightBox;
	var rootBox, leftBox, rightBox;
	var callDoc;
	Recard.Css('.redDoc li').S('margin-left', 10)
	Recard.Css('.redDoc .redDocBox').S(
		'position', 'relative',
		'padding', '15px 15px 15px 15px',
		'background', 'rgba(0,0,0,0.01)'
	)
	Recard.Css('.redDoc h1[titleBox]').S(
		'font-size', '3em',
		'color', '#111'
	)
	Recard.Css('.redDoc h2[titleBox]').S(
		'font-size', '2.5em',
		'color', '#111'
	)
	Recard.Css('.redDoc h3[titleBox]').S(
		'font-size', '1.5em',
		'color', '#0795b7'
	)
	setBaseBox = function () {
		Recard.Dom('table').S(
			'@className', 'redDoc',
			'width', '100%',
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
						'html', path,
						'<', tParent
					);
					tParent = dirMAP[path];
				})
				return dirMAP[path];
			}
		}
		return function (srcList) {
			leftBox = Recard.Dom('td').S(
				'vertical-align', 'top',
				'width', 300,
				'<', rootBox
			)
			srcList.forEach(function (v) {
				var src = v.join('/') + '.json';
				Recard.Dom('li').S(
					'html', v[v.length - 1],
					'cursor', 'pointer',
					'on', ['down', function () {
						document.body.scrollTop = 0
						callDoc(src)
					}],
					'<', getTargetDir(v)
				)
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
		var setTitle, setDescription, setReturn, setParam, setExample;
		setTitle = function (data, tag) {
			console.log(data['title'])
			return Recard.Dom(tag ? tag : 'div').S(
				'@titleBox', '',
				'margin', 0,
				'padding', '10px 0',
				'html', data['title'] ? data['title'] : 'DOC에 title이 정의 되지 않았습니다.'
			)
		}
		setDescription = function (data, tag) {
			console.log(data['description'])
			var t0;
			t0 = '<b>description</b> : ';
			if ( data['description'] ) {
				if ( data['description'] instanceof Array ) {
					data['description'].forEach(function (v) {
						t0 += '<br>' + v
					})
				} else t0 += data['description']
			} else t0 += 'DOC에 description이 정의 되지 않았습니다.';
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
					'margin-top', 5,
					'margin-bottom', 5,
					'width', '100%',
					'font-size', 12,
					'line-height', 20,
					'border', '1px solid #ccc',
					'<', boxContent
				)
				for ( k in data['params'] ) {
					tData = data['params'][k];
					Recard.Dom('tr').S(
						'>', Recard.Dom('td').S(
							'vertical-align', 'top',
							'html', '<b>' + k + '</b>'
						),
						'>', paramItemBox = Recard.Dom('td').S('vertical-align', 'top'),
						'<', paramsBox
					)
					tData.forEach(function (v) {
						Recard.Dom(tag ? tag : 'div').S(
							'html', (v['type'] ? 'type : ' + v['type'] : v),
							'<', paramItemBox
						)
					})
				}
			}
			return box;
		}
		setExample = function (data, tag) {
			console.log(data['example'])
			return Recard.Dom(tag ? tag : 'div').S(
				'>', Recard.Dom('div').S(
					'html', '<b>example</b> :'
				),
				'>', Recard.Dom('div').S(
					'>', Recard.Dom('code').S(
						'@className', 'language-javascript',
						'display', 'block',
						'padding', 10,
						'html', Prism.highlight(data['example'] ? data['example'] : 'DOC에 example이 정의 되지 않았습니다.', Prism.languages.javascript).trim()
					)
				)
			)
		}
		setReturn = function (data, tag) {
			console.log(data['return'])
			return Recard.Dom(tag ? tag : 'div').S(
				'html', '<b>return</b> : ' + (data['return'] ? data['return'] : 'DOC에 return이 정의 되지 않았습니다.')
			)
		}
		setConstructor = function (data) {
			if ( data.length ) {
				data = data[0];
				Recard.Dom('div').S(
					'>', setTitle(data, 'h1'),
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
				setTitle(v, 'h3').S(
					'@titleBox', '',
					'<', box
				),
					Recard.Dom('div').S(
						'@className', 'redDocBox',
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
					if ( !v['contructorYn'] ) {
						if ( !v['code'] ) codeKEYList['none'] = -1
						else if ( !codeKEYList[v['code']] ) codeKEYList[v['code']] = 1;
					}
					if ( v['constructorYn'] ) return true
				}));
				for ( var k in codeKEYList ) {
					setContent(content, k == 'none' ? null : k);
				}
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