// 호스트는 함수로만 선언한다
// 실제로는 RedGLInstance생성이후 발동되는 호스트이다.
function () {
    if ( v ) {
        console.log('초기화 성공!')
        var tWorld, tScene, tController, tRenderer;
        // 월드 생성
        this['world'] = tWorld = RedWorld();
        // 씬 생성
        tScene = RedScene(this);
        // 카메라 생성
        tController = RedObitController(this);
        tController.tilt = -45
        tController.pan = 45
        // 렌더러 생성
        tRenderer = RedRenderer();
        // 뷰생성 및 적용
        tWorld.addView(RedView('test', this, tScene, tController));
        // 그리드 설정
        tScene['grid'] = RedGrid(this)
        // axis 설정
        tScene['axis'] = RedAxis(this)
        // 렌더시작
        tRenderer.start(this, function (time) {
        })
        // 렌더 디버거 활성화
        tRenderer['renderDebuger']['visible'] = true
        //
        this.userInterface = {
            addObject: function (num) {
                var t0;
                while (num--) {
                    tScene.addChild(t0 = RedMesh(this, RedSphere(this), RedColorMaterial(this)))
                    t0.scaleX = t0.scaleY = t0.scaleZ = 1
                    t0.x = Math.random() * 100 - 50
                    t0.y = Math.random() * 100 - 50
                    t0.z = Math.random() * 100 - 50
                }
            }
        }
    } else {
        console.log('초기화 실패!')
    }
}