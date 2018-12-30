# RedGL
[![Software License](https://img.shields.io/github/license/swisnl/build-size.svg)](LICENSE)

#### JavaScript 3D library ####
```javascript
    var canvas;
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    RedGL(canvas, function (v) {
        if (v) {
            console.log('초기화 성공!');
            var tWorld, tView, tScene, tController, tRenderer;
            // 월드 생성
            this['world'] = tWorld = RedWorld();
            // 씬 생성
            tScene = RedScene(this);
            // 카메라 생성
            tController = RedObitController(this);
            tController.pan = 45;
            tController.tilt = -45;
            // 렌더러 생성
            tRenderer = RedRenderer();
            // 뷰생성 및 적용
            tView = RedView('HelloRedGL', this, tScene, tController);
            tWorld.addView(tView);
            // 그리드 설정
            tScene['grid'] = RedGrid(this);
            // axis 설정
            tScene['axis'] = RedAxis(this);
            // 렌더시작
            tRenderer.start(this, function (time) {
              console.log(time)
            });
            // 렌더 디버거 활성화
            tRenderer.setDebugButton();
            console.log(this);
        } else {
            alert('초기화 실패!')
        }
    });
```

## Documentation
- [Documentation](https://redcamel.github.io/RedGL2/redDoc/index.html)
- [Examples](https://redcamel.github.io/RedGL2/example/index.html)
- [TestCase](https://redcamel.github.io/RedGL2/testCase/index.html)

This project is maintained by [RedCamel](mailto:webseon@gmail.com)
