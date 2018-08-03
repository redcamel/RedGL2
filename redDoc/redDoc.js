"use strict";
var DocJS = (function () {
	var setBaseBox, setLeftBox, setRightBox;
	var rootBox, leftBox, rightBox;
	var callDoc;
	Recard.Css('li').S('margin-left', 10)
	setBaseBox = function () {
		Recard.Dom('table').S(
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
				var src;
				var path = '';
				var tParent;
				src = v.join('/') + '.json'
				v.pop();
				tParent = leftBox;
				v.forEach(function (v2) {
					console.log(v, v2)
					path += v2;
					if ( !dirMAP[path] ) dirMAP[path] = Recard.Dom('li').S(
						'html', path,
						'cursor', 'pointer',
						'on', ['down', function () {
							console.log(src)
							callDoc(src)
						}],
						'<', tParent
					);
					tParent = dirMAP[path];
				})
				return dirMAP[path];
			}
		}
		return function (srcList) {
			leftBox = Recard.Dom('td').S(
				'<', rootBox
			)
			srcList.forEach(function (v) {
				Recard.Dom('li').S(
					'html', v[v.length - 1],
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
		var setTitle, setDescription, setReturn, setParam;
		setTitle = function (data, tag) {
			console.log(data['title'])
			return Recard.Dom(tag ? tag : 'div').S(
				'html', data['title'] ? data['title'] : 'DOC에 title이 정의 되지 않았습니다.'
			)
		}
		setDescription = function (data, tag) {
			console.log(data['description'])
			return Recard.Dom(tag ? tag : 'div').S(
				'html', '<b>description</b> : ' + (data['description'] ? data['description'] : 'DOC에 description이 정의 되지 않았습니다.')
			)
		}
		setParam = function (data, tag) {
			console.log(data['setParam'])
			var box, boxContent;
			var k, tData;
			box = Recard.Dom(tag ? tag : 'div').S(
				'>', Recard.Dom('div').S('html', '<b>params</b>'),
				'>', boxContent = Recard.Dom('div').S(
					'margin-left', 10
				)
			);
			if ( data['params'] ) {
				for ( k in data['params'] ) {
					tData = data['params'][k];
					Recard.Dom(tag ? tag : 'div').S(
						'html', k + ' : ' + tData[0]['type'],
						'<', boxContent
					)
				}
			}
			return box;
		}
		setReturn = function (data, tag) {
			console.log(data['return'])
			return Recard.Dom(tag ? tag : 'div').S(
				'html', '<b>return</b> : ' + (data['return'] ? data['return'] : 'DOC에 description이 정의 되지 않았습니다.')
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
				'>', Recard.Dom('h2').S(
					'html', key ? key : '비정의'
				),
				'>', box = Recard.Dom('div').S(
					'margin-left', 10
				)
			)
			dataList.forEach(function (v) {
				Recard.Dom('div').S(
					'>', setTitle(v, 'h3'),
					'>', setDescription(v),
					'>', setParam(v),
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
				rightBox.S(
					'html', content
				);
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